import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');

process.stdout.on('error', (error) => {
  if (error.code === 'EPIPE') process.exit(0);
  throw error;
});

function usage() {
  console.error('Usage: node scripts/create-benchmark-jobs.mjs benchmarks/skill-behavior/tasks/<suite>.json [--out <jobs.jsonl>] [--run-id <id>] [--start <n>] [--limit <n>] [--task-id <id>] [--no-references]');
  process.exit(1);
}

function parseArgs(argv) {
  const args = { includeReferences: true, taskIds: [], start: 0 };
  const rest = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') args.out = argv[++i];
    else if (arg === '--run-id') args.runId = argv[++i];
    else if (arg === '--start') args.start = Number(argv[++i]);
    else if (arg === '--limit') args.limit = Number(argv[++i]);
    else if (arg === '--task-id') args.taskIds.push(...argv[++i].split(',').map((value) => value.trim()).filter(Boolean));
    else if (arg === '--no-references') args.includeReferences = false;
    else if (arg.startsWith('--')) usage();
    else rest.push(arg);
  }
  if (rest.length !== 1) usage();
  if (!Number.isInteger(args.start) || args.start < 0) throw new Error('--start must be a non-negative integer');
  if (args.limit !== undefined && (!Number.isInteger(args.limit) || args.limit < 1)) throw new Error('--limit must be a positive integer');
  args.taskFile = rest[0];
  return args;
}

function selectTasks(tasks, args) {
  let selected = tasks;
  if (args.taskIds.length) {
    const wanted = new Set(args.taskIds);
    selected = tasks.filter((task) => wanted.has(task.id));
    const found = new Set(selected.map((task) => task.id));
    const missing = [...wanted].filter((taskId) => !found.has(taskId));
    if (missing.length) throw new Error(`Unknown task id(s): ${missing.join(', ')}`);
  }
  return selected.slice(args.start, args.limit ? args.start + args.limit : undefined);
}

async function readTextIfExists(file) {
  return existsSync(file) ? readFile(file, 'utf8') : '';
}

async function readReferenceFiles(skillDir) {
  const referencesDir = path.join(skillDir, 'references');
  if (!existsSync(referencesDir)) return [];
  const entries = await readdir(referencesDir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name).sort();
  const references = [];
  for (const file of files) {
    references.push({ path: `references/${file}`, content: await readFile(path.join(referencesDir, file), 'utf8') });
  }
  return references;
}

function skillPrompt({ task, skillMarkdown, references }) {
  const referenceBlock = references.length
    ? references.map((ref) => `\n### ${ref.path}\n\n${ref.content}`).join('\n')
    : '\nNo reference files included.';
  return `Use the following skill context to answer the user task. Do not mention the benchmark setup.\n\n## Skill: ${task.skill}\n\n${skillMarkdown}\n\n## Skill references\n${referenceBlock}\n\n## User task\n\n${task.prompt}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const runId = args.runId || `local-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  const taskPath = path.resolve(repoRoot, args.taskFile);
  const suite = JSON.parse(await readFile(taskPath, 'utf8'));
  const jobs = [];

  const tasks = selectTasks(suite.tasks || [], args);
  if (!tasks.length) throw new Error('No benchmark tasks selected');

  for (const task of tasks) {
    const skillDir = path.join(repoRoot, 'skills', task.skill);
    const skillMarkdown = await readTextIfExists(path.join(skillDir, 'SKILL.md'));
    if (!skillMarkdown) throw new Error(`Missing SKILL.md for ${task.skill}`);
    const references = args.includeReferences ? await readReferenceFiles(skillDir) : [];
    const common = {
      schemaVersion: 1,
      benchmark: 'skill-behavior',
      suite: suite.suite,
      runId,
      taskId: task.id,
      skill: task.skill,
      rubric: task.rubric,
    };
    jobs.push({
      ...common,
      jobType: 'answer',
      condition: 'baseline',
      prompt: task.prompt,
    });
    jobs.push({
      ...common,
      jobType: 'answer',
      condition: 'skill-loaded',
      prompt: skillPrompt({ task, skillMarkdown, references }),
    });
    jobs.push({
      ...common,
      jobType: 'trigger-check',
      condition: 'negative-control',
      expectedSkill: task.skill,
      prompt: task.negativeControlPrompt,
    });
  }

  const jsonl = `${jobs.map((job) => JSON.stringify(job)).join('\n')}\n`;
  if (args.out) {
    await writeFile(path.resolve(repoRoot, args.out), jsonl);
    console.log(`Wrote ${jobs.length} benchmark job(s) to ${args.out}`);
  } else {
    process.stdout.write(jsonl);
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
