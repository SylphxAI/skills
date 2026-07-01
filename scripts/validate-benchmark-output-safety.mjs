import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const resultDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'results');

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function rel(file) {
  return path.relative(repoRoot, file);
}

function isWithinRepo(file) {
  const relative = path.relative(repoRoot, file);
  return Boolean(relative) && !relative.startsWith('..') && !path.isAbsolute(relative);
}

async function listFiles(dir, predicate = () => true) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(file, predicate));
    else if (entry.isFile() && predicate(file)) files.push(file);
  }
  return files.sort();
}

async function readJson(file, errors) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    errors.push(`${rel(file)}: invalid JSON: ${error.message}`);
    return null;
  }
}

function hasReasoningTrace(text) {
  return /<think>[\s\S]*?<\/think>/i.test(text) || /<\/?think>/i.test(text);
}

async function validateOutputFile(file, label, expectedSha256, errors) {
  if (!isWithinRepo(file)) {
    errors.push(`${label}: output reference must stay inside the repository: ${file}`);
    return;
  }
  if (!existsSync(file)) {
    errors.push(`${label}: output reference does not exist: ${rel(file)}`);
    return;
  }

  const text = await readFile(file, 'utf8');
  if (hasReasoningTrace(text)) {
    errors.push(`${label}: output contains a model reasoning trace; sanitize <think>...</think> blocks before committing: ${rel(file)}`);
  }

  if (expectedSha256 !== undefined) {
    if (typeof expectedSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(expectedSha256)) {
      errors.push(`${label}: outputSha256 must be a lowercase sha256 hex string`);
      return;
    }
    const actual = sha256(text);
    if (actual !== expectedSha256) {
      errors.push(`${label}: outputSha256 does not match referenced file ${rel(file)}; expected ${expectedSha256}, actual ${actual}`);
    }
  }
}

function resolveOutputRef(reference) {
  if (typeof reference !== 'string' || !reference.trim()) return null;
  return path.isAbsolute(reference) ? reference : path.join(repoRoot, reference);
}

async function validateResultFile(file, errors) {
  const result = await readJson(file, errors);
  if (!result) return;
  const resultLabel = rel(file);

  for (const [index, sample] of (Array.isArray(result.samples) ? result.samples : []).entries()) {
    const prefix = `${resultLabel}: samples[${index}] ${sample?.taskId || '<unknown-task>'}`;
    for (const [condition, record] of [['baseline', sample?.baseline], ['skillLoaded', sample?.skillLoaded || sample?.skill]]) {
      const outputFile = resolveOutputRef(record?.outputRef || record?.outputPath);
      if (outputFile) await validateOutputFile(outputFile, `${prefix}.${condition}`, record?.outputSha256, errors);
    }
    const judgeFile = resolveOutputRef(sample?.judgeOutputRef);
    if (judgeFile) await validateOutputFile(judgeFile, `${prefix}.judge`, sample?.judgeOutputSha256, errors);
  }
}

async function main() {
  const errors = [];
  const outputFiles = await listFiles(resultDir, (file) => file.endsWith('.md'));
  for (const file of outputFiles) {
    const text = await readFile(file, 'utf8');
    if (hasReasoningTrace(text)) errors.push(`${rel(file)}: output contains a model reasoning trace; sanitize <think>...</think> blocks before committing`);
  }

  const resultFiles = await listFiles(resultDir, (file) => file.endsWith('.json'));
  for (const file of resultFiles) await validateResultFile(file, errors);

  if (errors.length) {
    console.error(`Benchmark output safety validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Validated benchmark output safety for ${resultFiles.length} result file(s) and ${outputFiles.length} output file(s)`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
