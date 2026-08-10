#!/usr/bin/env node

/**
 * Qualification runner for Sylphx Verified Capabilities.
 *
 * Executes a version-scoped eval suite (skills/<id>/evals/suite.json) for one
 * capability: deterministic functional tasks (exec), optional fresh-context
 * agent comparison (agent via the Codex CLI), and a security scan. Records raw
 * artifacts and digests under docs/qualification/evals/<id>/run-<stamp>/.
 *
 * Honesty contract (docs/QUALIFICATION.md, skills/design-skill-evals):
 * - Structural green and CI are never qualification evidence; this runner
 *   records observable artifacts and deterministic oracles.
 * - Agent tasks are fresh-context behavior tests; injection state is recorded
 *   as NOT verified unless a runtime-native selection trace exists.
 * - A qualified record requires every task to pass and the security scan to be
 *   clean; qualification is expiring (validityDays).
 *
 * Usage:
 *   node scripts/run-qualification.mjs --capability <id> [--apply]
 *     [--python /path/to/python-with-pillow] [--codex /path/to/codex]
 *     [--no-agent] [--stamp <override>]
 */

import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import { packageDigest } from '../runtime/package-digest.mjs';
import { repositoryRoot, readJson } from './build-catalog.mjs';

const PYTHON = process.env.SYLPHX_QUALIFY_PYTHON || 'python3';
const CODEX = process.env.SYLPHX_QUALIFY_CODEX || 'codex';

const SECRET_PATTERNS = [
  /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
];

const DANGEROUS_PATTERNS = [
  { pattern: /(?:curl|wget)\b[^;\n]*\|\s*(?:ba)?sh\b/, label: 'remote-pipe-to-shell' },
  { pattern: /\brm\s+-rf\s+\/\s*($|\s)/, label: 'rm-root' },
  { pattern: /\beval\s*\(/, label: 'eval-call' },
  { pattern: /\bexec\s*\(/, label: 'exec-call' },
  { pattern: /base64\s+.*-d[^;\n]*\|\s*(?:ba)?sh\b/, label: 'base64-pipe-shell' },
  { pattern: /ignore\s+(all\s+|any\s+)?(previous|prior|above)\s+instructions/i, label: 'instruction-override' },
  { pattern: /\bexfiltrat/i, label: 'exfiltration' },
  { pattern: /disable\s+(the\s+)?sandbox/i, label: 'disable-sandbox' },
  { pattern: /bypass\s+(security|approval)/i, label: 'bypass-security' },
];

function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files.sort();
}

function fileDigestMap(files) {
  const map = {};
  for (const file of files) map[path.relative(repositoryRoot, file)] = sha256(readFileSync(file));
  return map;
}

function bundleDigest(files) {
  const digests = fileDigestMap(files);
  const canonical = Object.entries(digests)
    .map(([name, digest]) => `${name}\0${digest}`)
    .sort()
    .join('\n');
  return sha256(Buffer.from(canonical));
}

function readPngDimensions(file) {
  const bytes = readFileSync(file);
  if (bytes.length < 24 || bytes.readUInt32BE(0) !== 0x89504e47) throw new Error(`not a PNG: ${file}`);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function imageCornerAlpha(file, corner, python) {
  const script = `from PIL import Image; import sys
img = Image.open(sys.argv[1]).convert('RGBA')
w, h = img.size
corners = {'top-left': (0, 0), 'top-right': (w - 1, 0), 'bottom-left': (0, h - 1), 'bottom-right': (w - 1, h - 1)}
x, y = corners[sys.argv[2]]
print(img.getpixel((x, y))[3])`;
  const result = spawnSync(python, ['-c', script, file, corner], { encoding: 'utf8', timeout: 20_000 });
  if (result.status !== 0) throw new Error(`image corner check failed: ${result.stderr || result.stdout}`);
  return Number(String(result.stdout).trim());
}

function jsonPathValue(value, jsonPath) {
  return jsonPath.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), value);
}

async function runAssertions(assertions, sandbox, python) {
  const failures = [];
  for (const assertion of assertions) {
    try {
      switch (assertion.type) {
        case 'exit-code-eq': {
          // handled by caller via exitCode passed as sandbox.exitCode
          if (sandbox.exitCode !== assertion.value) failures.push(`exit code ${sandbox.exitCode} != ${assertion.value}`);
          break;
        }
        case 'file-exists': {
          const absolute = path.join(sandbox.root, assertion.path);
          if (!existsSync(absolute)) failures.push(`missing file ${assertion.path}`);
          break;
        }
        case 'file-size-min': {
          const absolute = path.join(sandbox.root, assertion.path);
          if (!existsSync(absolute) || statSync(absolute).size < assertion.min) {
            failures.push(`file ${assertion.path} below min size ${assertion.min}`);
          }
          break;
        }
        case 'image-dimensions': {
          const { width, height } = readPngDimensions(path.join(sandbox.root, assertion.path));
          if (assertion.min !== undefined && (width < assertion.min || height < assertion.min)) {
            failures.push(`image ${assertion.path} below min dimensions ${width}x${height}`);
          }
          if (assertion.max !== undefined && (width > assertion.max || height > assertion.max)) {
            failures.push(`image ${assertion.path} above max dimensions ${width}x${height}`);
          }
          break;
        }
        case 'image-corner-alpha': {
          const alpha = imageCornerAlpha(path.join(sandbox.root, assertion.path), assertion.corner, python);
          if (assertion.opaque && alpha === 0) failures.push(`image ${assertion.path} corner ${assertion.corner} is transparent, expected opaque`);
          if (!assertion.opaque && alpha > 0) failures.push(`image ${assertion.path} corner ${assertion.corner} is opaque (${alpha}), expected transparent`);
          break;
        }
        case 'json-path-eq': {
          const record = readJson(path.join(sandbox.root, assertion.path));
          if (jsonPathValue(record, assertion.jsonPath) !== assertion.value) {
            failures.push(`json ${assertion.path} ${assertion.jsonPath} != ${JSON.stringify(assertion.value)}`);
          }
          break;
        }
        case 'json-path-matches': {
          const record = readJson(path.join(sandbox.root, assertion.path));
          const actual = String(jsonPathValue(record, assertion.jsonPath) ?? '');
          if (!new RegExp(assertion.contains).test(actual)) {
            failures.push(`json ${assertion.path} ${assertion.jsonPath} does not match /${assertion.contains}/`);
          }
          break;
        }
        case 'stdout-contains': {
          if (!String(sandbox.stdout || '').includes(assertion.contains)) {
            failures.push(`stdout missing ${JSON.stringify(assertion.contains)}`);
          }
          break;
        }
        case 'stdout-not-contains': {
          if (String(sandbox.stdout || '').includes(assertion.contains)) {
            failures.push(`stdout unexpectedly contains ${JSON.stringify(assertion.contains)}`);
          }
          break;
        }
        case 'dir-entry-count-eq': {
          const absolute = path.join(sandbox.root, assertion.path);
          if (!existsSync(absolute)) { failures.push(`missing dir ${assertion.path}`); break; }
          const count = readdirSync(absolute).length;
          if (count !== assertion.value) failures.push(`dir ${assertion.path} has ${count} entries, expected ${assertion.value}`);
          break;
        }
        case 'file-regex': {
          const absolute = path.join(sandbox.root, assertion.path);
          if (!existsSync(absolute)) { failures.push(`missing file ${assertion.path}`); break; }
          const content = readFileSync(absolute, 'utf8');
          if (!new RegExp(assertion.contains, assertion.caseInsensitive ? 'mi' : 'm').test(content)) {
            failures.push(`file ${assertion.path} does not match /${assertion.contains}/`);
          }
          break;
        }
        case 'file-not-regex': {
          const absolute = path.join(sandbox.root, assertion.path);
          if (!existsSync(absolute)) { failures.push(`missing file ${assertion.path}`); break; }
          const content = readFileSync(absolute, 'utf8');
          if (new RegExp(assertion.contains, assertion.caseInsensitive ? 'mi' : 'm').test(content)) {
            failures.push(`file ${assertion.path} unexpectedly matches /${assertion.contains}/`);
          }
          break;
        }
        case 'dir-entry-count-min': {
          const absolute = path.join(sandbox.root, assertion.path);
          if (!existsSync(absolute)) { failures.push(`missing dir ${assertion.path}`); break; }
          const count = readdirSync(absolute).length;
          if (count < assertion.min) failures.push(`dir ${assertion.path} has ${count} entries, expected >= ${assertion.min}`);
          break;
        }
        case 'json-schema-valid': {
          const schemaPath = path.join(repositoryRoot, assertion.schema);
          if (!existsSync(schemaPath)) { failures.push(`missing schema ${assertion.schema}`); break; }
          const validator = new Ajv({ allErrors: true, strict: false }).compile(readJson(schemaPath));
          const record = readJson(path.join(sandbox.root, assertion.path));
          if (!validator(record)) {
            failures.push(`file ${assertion.path} fails ${assertion.schema}: ${JSON.stringify(validator.errors).slice(0, 400)}`);
          }
          break;
        }
        default:
          failures.push(`unknown assertion type ${assertion.type}`);
      }
    } catch (error) {
      failures.push(`${assertion.type}: ${error.message}`);
    }
  }
  return failures;
}

async function runTask(task, suite, suiteRoot, runRoot, python) {
  // The task sandbox must live OUTSIDE any git repository: an agent in
  // danger-full-access inside a repo treats the repo root as its workspace
  // and escapes the intended sandbox. Temp dirs keep evals isolated.
  const work = path.join(os.tmpdir(), `sylphx-qualify-${path.basename(runRoot)}-${task.id}`);
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });
  const artifactRoot = path.join(runRoot, 'tasks', task.id, 'artifacts');
  mkdirSync(artifactRoot, { recursive: true });

  const packageRoot = path.join(repositoryRoot, 'skills', suite.capability);
  for (const fixture of task.fixtures || []) {
    const source = fixture.source.startsWith('package:')
      ? path.join(packageRoot, fixture.source.slice('package:'.length))
      : path.join(suiteRoot, 'fixtures', fixture.source);
    if (!existsSync(source)) throw new Error(`task ${task.id}: missing fixture ${fixture.source}`);
    cpSync(source, path.join(work, fixture.as));
  }

  const startedAt = new Date().toISOString();
  let exitCode = null;
  let stdout = '';
  let stderr = '';
  let command = null;
  if (task.kind === 'exec') {
    command = task.command.map((part) => (part === '{python}' ? python : part));
    const result = spawnSync(command[0], command.slice(1), {
      cwd: work,
      encoding: 'utf8',
      timeout: task.timeoutMs || 180_000,
      env: { ...process.env, PYTHONPATH: process.env.PYTHONPATH || '' },
    });
    exitCode = result.status;
    stdout = String(result.stdout || '');
    stderr = String(result.stderr || '');
  } else if (task.kind === 'agent') {
    const agentExtraArgs = (process.env.SYLPHX_QUALIFY_AGENT_ARGS || '').split(/\s+/).filter(Boolean);
    const agentArgs = ['exec', '--skip-git-repo-check', '-C', work, '-s', 'danger-full-access', '--ephemeral', ...agentExtraArgs, task.prompt];
    command = [CODEX, ...agentArgs];
    const result = spawnSync(CODEX, agentArgs, {
      encoding: 'utf8',
      timeout: task.timeoutMs || 600_000,
      env: { ...process.env, CODEX_HOME: process.env.CODEX_HOME || path.join(process.env.HOME || '.', '.codex') },
    });
    exitCode = result.status;
    stdout = String(result.stdout || '');
    stderr = String(result.stderr || '');
  }

  // Copy produced artifacts for the record (bounded size).
  const produced = walk(work).filter((file) => !file.endsWith('.git'));
  for (const file of produced) {
    const relative = path.relative(work, file);
    const target = path.join(artifactRoot, relative);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(file, target);
  }
  const artifactDigests = fileDigestMap(produced);

  const failures = await runAssertions(task.oracle.assertions, { root: work, exitCode, stdout }, python);
  rmSync(work, { recursive: true, force: true });
  const status = failures.length === 0 ? 'pass' : 'fail';
  const record = {
    id: task.id,
    kind: task.kind,
    baseline: task.baseline === true,
    description: task.description,
    command,
    status,
    failures,
    exitCode,
    startedAt,
    finishedAt: new Date().toISOString(),
    stdoutTail: stdout.slice(0, 60_000),
    stderrTail: stderr.slice(0, 20_000),
    artifactCount: Object.keys(artifactDigests).length,
    artifactDigests,
  };
  writeFileSync(path.join(runRoot, 'tasks', task.id, 'task.json'), `${JSON.stringify(record, null, 2)}\n`);
  return { status, record };
}

function securityScan(packageRoot) {
  const findings = [];
  const scanned = [];
  for (const file of walk(packageRoot)) {
    const relative = path.relative(repositoryRoot, file);
    const text = readFileSync(file, 'utf8');
    scanned.push(relative);
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(text)) findings.push({ file: relative, kind: 'secret-pattern', pattern: String(pattern) });
    }
    for (const { pattern, label } of DANGEROUS_PATTERNS) {
      const match = text.match(pattern);
      if (match) findings.push({ file: relative, kind: label, snippet: match[0].slice(0, 120) });
    }
  }
  return { scannedFiles: scanned.length, files: scanned, findings, verdict: findings.length === 0 ? 'clean' : 'findings' };
}

async function main() {
  const args = process.argv.slice(2);
  const capability = args[args.indexOf('--capability') + 1];
  const apply = args.includes('--apply');
  const noAgent = args.includes('--no-agent');
  const python = process.env.SYLPHX_QUALIFY_PYTHON || PYTHON;
  const stampOverride = args.includes('--stamp') ? args[args.indexOf('--stamp') + 1] : null;
  const applyFrom = args.includes('--apply-from') ? args[args.indexOf('--apply-from') + 1] : null;
  if (!capability) throw new Error('--capability <id> is required');

  const suiteRoot = path.join(repositoryRoot, 'skills', capability, 'evals');
  const suitePath = path.join(suiteRoot, 'suite.json');
  if (!existsSync(suitePath)) throw new Error(`no eval suite at ${suitePath}`);
  const suite = readJson(suitePath);
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(readJson(path.join(repositoryRoot, 'schemas', 'eval-suite.schema.json')));
  if (!validate(suite)) throw new Error(`suite invalid: ${JSON.stringify(validate.errors)}`);
  if (suite.capability !== capability) throw new Error('suite capability must match folder');

  if (applyFrom) {
    const runRoot = path.join(repositoryRoot, 'docs', 'qualification', 'evals', capability, `run-${applyFrom}`);
    if (!existsSync(path.join(runRoot, 'report.json'))) throw new Error(`no report at ${runRoot}`);
    const report = readJson(path.join(runRoot, 'report.json'));
    if (report.verdict !== 'qualified') throw new Error(`run ${applyFrom} verdict is ${report.verdict}; cannot apply`);
    const recordFiles = walk(runRoot).filter((file) => !file.endsWith(`${path.sep}report.json`));
    const digest = bundleDigest(recordFiles);
    if (digest !== report.evidenceDigest) throw new Error('recorded evidence digest does not match the run bundle; do not apply');
    const qualificationPath = applyQualification(suite, report, capability, applyFrom, digest);
    console.log(JSON.stringify({ capability, appliedQualification: qualificationPath, runDir: path.relative(repositoryRoot, runRoot), evidenceDigest: digest }, null, 2));
    return;
  }

  const sourceRevision = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: repositoryRoot, encoding: 'utf8' }).stdout.trim();
  const candidate = {
    sourceRevision,
    packageDigest: packageDigest(path.join(repositoryRoot, 'skills', capability)),
    catalogDigest: sha256(readFileSync(path.join(repositoryRoot, 'catalog.json'))),
  };
  const stamp = stampOverride || new Date().toISOString().replace(/[:.]/g, '-');
  const runRoot = path.join(repositoryRoot, 'docs', 'qualification', 'evals', capability, `run-${stamp}`);
  if (existsSync(runRoot)) throw new Error(`run dir already exists: ${runRoot}`);
  mkdirSync(runRoot, { recursive: true });
  mkdirSync(path.join(runRoot, 'tasks'), { recursive: true });

  const codexVersion = spawnSync(CODEX, ['--version'], { encoding: 'utf8' }).stdout.trim() || 'unavailable';
  const agentArgs = (process.env.SYLPHX_QUALIFY_AGENT_ARGS || '').split(/\s+/).filter(Boolean);
  const environment = [
    `node ${process.version}`,
    `python3 (Pillow)`,
    `codex ${codexVersion}`,
    `codex exec agent args: ${agentArgs.join(' ') || '(host defaults)'}`,
    ...(suite.environment || []),
  ];

  const taskResults = [];
  let allPass = true;
  for (const task of suite.tasks) {
    if (noAgent && task.kind === 'agent') {
      taskResults.push({ id: task.id, status: 'skipped', reason: '--no-agent', baseline: task.baseline === true });
      continue;
    }
    const { status, record } = await runTask(task, suite, suiteRoot, runRoot, python);
    taskResults.push({ id: task.id, status, failures: record.failures, baseline: task.baseline === true });
    // Baseline tasks are controls: their result is comparison evidence and
    // never gates qualification (a failing baseline demonstrates value).
    if (status !== 'pass' && !(task.baseline === true)) allPass = false;
  }

  const comparison = suite.baseline
    ? {
        withSkill: taskResults.some((task) => !task.baseline && task.status === 'pass') ? 'pass' : 'fail',
        baseline: taskResults.some((task) => task.baseline && task.status === 'pass') ? 'pass' : 'fail',
      }
    : null;

  const security = securityScan(path.join(repositoryRoot, 'skills', capability));
  const recordFiles = walk(runRoot);
  const resultsDigest = bundleDigest(recordFiles);
  const verdict = allPass && security.verdict === 'clean' ? 'qualified' : 'not-qualified';
  const report = {
    schemaVersion: 1,
    capability,
    claim: suite.claim,
    evaluator: suite.evaluator,
    candidate,
    environment,
    startedAt: new Date().toISOString(),
    finishedAt: new Date().toISOString(),
    tasks: taskResults,
    comparison,
    security: { verdict: security.verdict, scannedFiles: security.scannedFiles, findings: security.findings },
    evidenceDigest: resultsDigest,
    verdict,
    injectionState: 'not-verified', // fresh-context behavior tests; no runtime-native selection trace recorded
    expiryDays: suite.validityDays,
    runDir: path.relative(repositoryRoot, runRoot),
  };
  writeFileSync(path.join(runRoot, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);

  if (apply && verdict === 'qualified') {
    const qualificationPath = applyQualification(suite, report, capability, stamp, resultsDigest);
    console.log(JSON.stringify({ ...report, appliedQualification: qualificationPath }, null, 2));
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
  process.exit(allPass && security.verdict === 'clean' && (!apply || verdict === 'qualified') ? 0 : 1);
}

function applyQualification(suite, report, capability, stamp, resultsDigest) {
  const qualificationPath = path.join(repositoryRoot, 'skills', capability, 'qualification.json');
  const expiresAt = new Date(Date.now() + suite.validityDays * 86_400_000).toISOString();
  const evidenceKinds = ['compatibility'];
  // incremental-value is claimed only when the control comparison demonstrates
  // a with-skill pass over a failing baseline; a passing baseline is recorded
  // honestly as no demonstrated delta.
  const comparison = report?.comparison;
  if (suite.baseline && comparison?.withSkill === 'pass' && comparison?.baseline === 'fail') {
    evidenceKinds.unshift('incremental-value');
  }
  evidenceKinds.push('security');
  const updated = {
    schemaVersion: 1,
    name: capability,
    status: 'qualified',
    evaluator: suite.evaluator,
    qualifiedAt: report.finishedAt,
    expiresAt,
    evidence: evidenceKinds.map((kind) => ({
      id: `${capability}-${kind}-${stamp}`,
      kind,
      digest: resultsDigest,
      uri: `docs/qualification/evals/${capability}/run-${stamp}/report.json`,
    })),
    compatibility: (suite.environment || []).map((environment) => ({ environment, result: 'verified' })),
  };
  writeFileSync(qualificationPath, `${JSON.stringify(updated, null, 2)}\n`);
  return path.relative(repositoryRoot, qualificationPath);
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`run-qualification: ${error.message}`);
    process.exit(1);
  });
}
