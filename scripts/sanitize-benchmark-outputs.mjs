import { readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const resultDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'results');
const checkOnly = process.argv.includes('--check');

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function rel(file) {
  return path.relative(repoRoot, file);
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

function sanitizeText(text) {
  return `${text.replace(/\s*<think>[\s\S]*?<\/think>\s*/gi, '\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

function hasReasoningTrace(text) {
  return /<think>[\s\S]*?<\/think>/i.test(text) || /<\/?think>/i.test(text);
}

function resolveOutputRef(reference) {
  if (typeof reference !== 'string' || !reference.trim()) return null;
  return path.isAbsolute(reference) ? reference : path.join(repoRoot, reference);
}

async function sanitizeOutputFiles() {
  let changed = 0;
  const outputFiles = await listFiles(resultDir, (file) => file.endsWith('.md'));
  for (const file of outputFiles) {
    const original = await readFile(file, 'utf8');
    if (!hasReasoningTrace(original)) continue;
    const sanitized = sanitizeText(original);
    if (sanitized !== original) {
      changed += 1;
      if (!checkOnly) await writeFile(file, sanitized);
      console.log(`${checkOnly ? 'would sanitize' : 'sanitized'} ${rel(file)}`);
    }
  }
  return changed;
}

async function updateResultHashes() {
  let changed = 0;
  const resultFiles = await listFiles(resultDir, (file) => file.endsWith('.json'));
  for (const file of resultFiles) {
    const result = JSON.parse(await readFile(file, 'utf8'));
    let dirty = false;
    for (const sample of Array.isArray(result.samples) ? result.samples : []) {
      for (const record of [sample.baseline, sample.skillLoaded || sample.skill]) {
        const outputFile = resolveOutputRef(record?.outputRef || record?.outputPath);
        if (!outputFile || !existsSync(outputFile)) continue;
        const hash = sha256(await readFile(outputFile, 'utf8'));
        if (record.outputSha256 !== hash) {
          record.outputSha256 = hash;
          dirty = true;
        }
      }
      const judgeFile = resolveOutputRef(sample.judgeOutputRef);
      if (judgeFile && existsSync(judgeFile)) {
        const hash = sha256(await readFile(judgeFile, 'utf8'));
        if (sample.judgeOutputSha256 !== hash) {
          sample.judgeOutputSha256 = hash;
          dirty = true;
        }
      }
    }
    if (dirty) {
      changed += 1;
      if (!checkOnly) await writeFile(file, `${JSON.stringify(result, null, 2)}\n`);
      console.log(`${checkOnly ? 'would update hashes in' : 'updated hashes in'} ${rel(file)}`);
    }
  }
  return changed;
}

const sanitized = await sanitizeOutputFiles();
const hashUpdates = await updateResultHashes();
if (checkOnly && (sanitized || hashUpdates)) process.exit(1);
console.log(`${checkOnly ? 'Checked' : 'Updated'} benchmark outputs: ${sanitized} sanitized file(s), ${hashUpdates} result file(s) with hash updates`);
