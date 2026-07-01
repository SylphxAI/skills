import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resultDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'results');

function rel(file) {
  return path.relative(repoRoot, file).split(path.sep).join('/');
}

async function listFiles(dir, predicate) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && predicate(entry.name)).map((entry) => path.join(dir, entry.name)).sort();
}

function summaryBody(markdown, source) {
  const text = markdown.replace(/\r\n/g, '\n').trimStart();
  const headingIndex = text.indexOf('# Skill Behavior Benchmark Summary');
  if (headingIndex === -1) throw new Error(`${source}: missing benchmark summary heading`);
  return `${text.slice(headingIndex).trimEnd()}\n`;
}

function extractLine(summary, label) {
  const prefix = `- ${label}: `;
  const line = summary.split('\n').find((candidate) => candidate.startsWith(prefix));
  if (!line) throw new Error(`current benchmark summary missing "${label}" line`);
  return line.slice(prefix.length).trim();
}

function extractMetric(summary) {
  const avgDeltaLine = extractLine(summary, 'Average delta');
  const avgDelta = avgDeltaLine.match(/^(-?\d+\.\d+)/)?.[1];
  if (!avgDelta) throw new Error('current benchmark summary has unparseable Average delta line');

  return {
    samples: extractLine(summary, 'Samples'),
    tier: extractLine(summary, 'Claim tier supported by this data'),
    avgDelta,
    skillWinRate: extractLine(summary, 'Skill win rate'),
    nonRegressionRate: extractLine(summary, 'Non-regression rate'),
    overTriggerRate: extractLine(summary, 'Negative-control over-trigger rate'),
    usefulGates: extractLine(summary, 'Useful-claim gates'),
    sotaGates: extractLine(summary, 'SOTA-candidate gates'),
  };
}

async function readText(file) {
  return readFile(file, 'utf8');
}

async function docsToScan() {
  const docs = [path.join(repoRoot, 'README.md'), path.join(repoRoot, 'benchmarks', 'skill-behavior', 'README.md')];
  const docsDir = path.join(repoRoot, 'docs');
  docs.push(...(await listFiles(docsDir, (name) => name.endsWith('.md'))));
  return docs;
}

function positiveSotaClaim(line) {
  if (!/SOTA[- ]candidate/i.test(line)) return false;
  if (/\b(requires?|requirement|gates?|can support|do not call|not prove|not an?|not the same|cannot|without)\b/i.test(line)) return false;
  return /\b(Current public status|supports?|supported by|repository-level|claim tier|status:)\b/i.test(line);
}

function unsafeUniversalSotaClaim(line) {
  const match = line.match(/\b(all|every|each)\b.*\bskills?\b.*\bSOTA\b/i);
  if (!match) return false;
  if (/\brejects? universal claims\b|\bunless\b.*\bnegat|\bnot an? unqualified claim\b/i.test(line)) return false;
  return !/\b(not|no|never|without|do not|does not|cannot)\b/i.test(match[0]);
}

function assertSotaGates(metrics, errors) {
  if (metrics.tier !== 'SOTA candidate') return;
  const required = ['useful=pass', 'suiteDepth=pass', 'modelOverlap=pass', 'ciLowerAboveZero=pass', 'overTrigger=pass'];
  for (const gate of required) {
    if (!metrics.sotaGates.includes(gate)) errors.push(`SOTA candidate tier is reported, but SOTA gate ${gate} is missing from the summary`);
  }
}

async function validateDocs(metrics, errors, currentSummaryFile) {
  const readmePath = path.join(repoRoot, 'README.md');
  const readme = await readText(readmePath);
  const signedDelta = Number(metrics.avgDelta) > 0 ? `+${metrics.avgDelta}` : metrics.avgDelta;

  if (metrics.tier === 'SOTA candidate') {
    const requiredReadmeSnippets = [
      'Current public status:',
      'repository-level **SOTA candidate**',
      `${metrics.samples} current task samples`,
      `${signedDelta} average skill uplift`,
      `${metrics.skillWinRate} skill win rate`,
      `${metrics.nonRegressionRate} non-regression rate`,
      `${metrics.overTriggerRate} negative-control over-trigger rate`,
      currentSummaryFile ? rel(currentSummaryFile) : 'current-suite summary',
      'bounded benchmark claim',
    ];
    for (const snippet of requiredReadmeSnippets) {
      if (!readme.includes(snippet)) errors.push(`README.md current benchmark claim is missing: ${snippet}`);
    }
  } else if (/Current public status:.*SOTA[- ]candidate/i.test(readme)) {
    errors.push(`README.md claims SOTA candidate, but current benchmark tier is ${metrics.tier}`);
  }

  for (const file of await docsToScan()) {
    const text = await readText(file);
    const lines = text.split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      const location = `${rel(file)}:${index + 1}`;
      if (unsafeUniversalSotaClaim(line)) errors.push(`${location}: unsafe universal SOTA claim: ${line.trim()}`);
      if (metrics.tier !== 'SOTA candidate' && positiveSotaClaim(line)) {
        errors.push(`${location}: claims SOTA candidate, but current benchmark tier is ${metrics.tier}: ${line.trim()}`);
      }
    }
  }
}

async function main() {
  const errors = [];
  const resultFiles = await listFiles(resultDir, (name) => name.endsWith('.json'));
  if (!resultFiles.length) errors.push('benchmarks/skill-behavior/results: no benchmark result JSON files found');

  const summaryFiles = await listFiles(resultDir, (name) => /^current-suite-\d{8}-summary\.md$/.test(name));
  if (summaryFiles.length !== 1) {
    errors.push(`Expected exactly one repository current-suite summary, found ${summaryFiles.length}: ${summaryFiles.map(rel).join(', ') || '<none>'}`);
  }

  let generatedSummary = '';
  if (resultFiles.length) {
    const run = spawnSync(process.execPath, ['scripts/summarize-benchmark-results.mjs', '--current-suite', ...resultFiles.map(rel)], {
      cwd: repoRoot,
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
    });
    if (run.status !== 0) {
      errors.push(`current-suite summarizer failed:\n${run.stderr || run.stdout}`.trim());
    } else {
      generatedSummary = summaryBody(run.stdout, 'generated current-suite summary');
    }
  }

  if (generatedSummary && summaryFiles.length === 1) {
    const committedSummary = summaryBody(await readText(summaryFiles[0]), rel(summaryFiles[0]));
    if (committedSummary !== generatedSummary) {
      errors.push(`${rel(summaryFiles[0])}: stale current-suite summary; regenerate with: node scripts/summarize-benchmark-results.mjs --current-suite benchmarks/skill-behavior/results/*.json > ${rel(summaryFiles[0])}`);
    }
  }

  if (generatedSummary) {
    const metrics = extractMetric(generatedSummary);
    assertSotaGates(metrics, errors);
    await validateDocs(metrics, errors, summaryFiles[0]);
  }

  if (errors.length) {
    console.error(`Benchmark claim validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  const metrics = extractMetric(generatedSummary);
  console.log(`Validated benchmark claims: ${metrics.tier}, ${metrics.samples} samples, ${metrics.avgDelta} average delta`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
