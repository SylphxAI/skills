import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

function usage() {
  console.error('Usage: node scripts/merge-benchmark-results.mjs --out <merged.json> [--run-id <id>] <result-a.json> <result-b.json> ...');
  process.exit(1);
}

function parseArgs(argv) {
  const args = { files: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') args.out = argv[++i];
    else if (arg === '--run-id') args.runId = argv[++i];
    else if (arg.startsWith('--')) usage();
    else args.files.push(arg);
  }
  if (!args.out || !args.files.length) usage();
  args.out = path.resolve(repoRoot, args.out);
  return args;
}

function sameOrThrow(label, first, next, file) {
  if (first !== next) throw new Error(`${file}: ${label} mismatch: expected ${first}, got ${next}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const loaded = [];
  for (const file of args.files) {
    const abs = path.resolve(repoRoot, file);
    const result = JSON.parse(await readFile(abs, 'utf8'));
    loaded.push({ file, result });
  }

  const first = loaded[0].result;
  if (first.schemaVersion !== 1 || first.benchmark !== 'skill-behavior') throw new Error('Input files must be skill-behavior result files');

  const samples = [];
  const sampleTaskIds = new Set();
  const triggerChecks = [];
  const triggerKeys = new Set();
  const sourceRunIds = [];

  for (const { file, result } of loaded) {
    sameOrThrow('schemaVersion', first.schemaVersion, result.schemaVersion, file);
    sameOrThrow('benchmark', first.benchmark, result.benchmark, file);
    sameOrThrow('suite', first.suite, result.suite, file);
    sameOrThrow('model', first.model, result.model, file);
    sameOrThrow('judge.model', first.judge?.model, result.judge?.model, file);
    sourceRunIds.push(result.runId);

    for (const sample of result.samples || []) {
      if (sampleTaskIds.has(sample.taskId)) throw new Error(`${file}: duplicate sample taskId ${sample.taskId}`);
      sampleTaskIds.add(sample.taskId);
      samples.push(sample);
    }

    for (const check of result.triggerChecks || []) {
      const key = `${check.taskId}:${check.promptType}`;
      if (triggerKeys.has(key)) throw new Error(`${file}: duplicate trigger check ${key}`);
      triggerKeys.add(key);
      triggerChecks.push(check);
    }
  }

  const now = new Date().toISOString();
  const merged = {
    schemaVersion: 1,
    benchmark: 'skill-behavior',
    suite: first.suite,
    runId: args.runId || `merged-${now.replace(/[:.]/g, '-')}`,
    model: first.model,
    runner: {
      name: 'merged-results',
      version: 1,
      sourceRunIds,
      sourceFiles: args.files,
      mergedAt: now,
    },
    judge: first.judge,
    samples,
    triggerChecks,
  };

  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`Merged ${samples.length} sample(s) and ${triggerChecks.length} trigger check(s) into ${args.out}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
