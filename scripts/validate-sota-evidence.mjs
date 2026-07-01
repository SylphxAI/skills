import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const taskDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'tasks');
const resultDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'results');

const MIN_CURRENT_SAMPLES = 26;
const MIN_SKILL_SCORE = 5;
const MIN_AVERAGE_DELTA = 1;

function rel(file) {
  return path.relative(repoRoot, file).split(path.sep).join('/');
}

async function listJson(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => path.join(dir, entry.name))
    .sort();
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

function skillRecord(sample) {
  return sample.skillLoaded || sample.skill;
}

function timestamp(row) {
  return Date.parse(row.completedAt || row.startedAt || '') || 0;
}

function isClean(row) {
  return row.sourceDirty === false;
}

function compareCurrentRows(a, b) {
  if (isClean(a) !== isClean(b)) return isClean(a) ? 1 : -1;
  const timeDelta = timestamp(a) - timestamp(b);
  if (timeDelta !== 0) return timeDelta;
  const runDelta = String(a.runId || '').localeCompare(String(b.runId || ''));
  if (runDelta !== 0) return runDelta;
  return String(a.file).localeCompare(String(b.file));
}

async function loadTasks(errors) {
  const tasks = new Map();
  for (const file of await listJson(taskDir)) {
    const suite = await readJson(file);
    for (const task of suite.tasks || []) {
      if (tasks.has(task.id)) errors.push(`${rel(file)}: duplicate task id ${task.id}`);
      tasks.set(task.id, { ...task, suite: suite.suite, file: rel(file) });
    }
  }
  if (!tasks.size) errors.push('No benchmark tasks found');
  return tasks;
}

async function loadRows(errors) {
  const rows = [];
  const triggerChecks = [];
  for (const file of await listJson(resultDir)) {
    const result = await readJson(file);
    const source = result.runner?.source || {};
    const runner = result.runner || {};
    for (const sample of result.samples || []) {
      rows.push({
        file: rel(file),
        runId: result.runId,
        suite: result.suite,
        taskId: sample.taskId,
        skill: sample.skill,
        baseline: sample.baseline,
        skillLoaded: skillRecord(sample),
        preference: sample.preference,
        sourceDirty: source.dirty,
        sourceHead: source.head,
        runnerPartial: runner.partial,
        startedAt: runner.startedAt,
        completedAt: runner.completedAt,
      });
    }
    for (const check of result.triggerChecks || []) {
      triggerChecks.push({ ...check, file: rel(file), runId: result.runId, completedAt: runner.completedAt });
    }
  }
  if (!rows.length) errors.push('No benchmark result samples found');
  return { rows, triggerChecks };
}

function selectCurrentRows(rows) {
  const byTask = new Map();
  for (const row of rows) {
    const existing = byTask.get(row.taskId);
    if (!existing || compareCurrentRows(row, existing) > 0) byTask.set(row.taskId, row);
  }
  return [...byTask.values()].sort((a, b) => a.taskId.localeCompare(b.taskId));
}

function selectedTriggerChecksFor(row, triggerChecks) {
  return triggerChecks.filter((check) => check.taskId === row.taskId && check.file === row.file && check.runId === row.runId);
}

function score(record) {
  return Number(record?.score);
}

function criticalFailureCount(record) {
  return Array.isArray(record?.criticalFailures) ? record.criticalFailures.length : 0;
}

async function main() {
  const errors = [];
  const tasks = await loadTasks(errors);
  const { rows, triggerChecks } = await loadRows(errors);
  const selected = selectCurrentRows(rows);

  if (selected.length < MIN_CURRENT_SAMPLES) {
    errors.push(`current suite has ${selected.length} samples; expected at least ${MIN_CURRENT_SAMPLES}`);
  }

  const selectedIds = new Set(selected.map((row) => row.taskId));
  for (const taskId of tasks.keys()) {
    if (!selectedIds.has(taskId)) errors.push(`current suite is missing benchmark task ${taskId}`);
  }
  for (const row of selected) {
    const task = tasks.get(row.taskId);
    if (!task) errors.push(`${row.file}: selected unknown task ${row.taskId}`);
    if (task && row.skill !== task.skill) errors.push(`${row.file}: ${row.taskId} selected skill ${row.skill} does not match task skill ${task.skill}`);
    if (row.sourceDirty !== false) errors.push(`${row.file}: ${row.taskId} current result is not clean-provenance (dirty=${row.sourceDirty})`);
    if (row.runnerPartial === true) errors.push(`${row.file}: ${row.taskId} current result is partial`);

    const baselineScore = score(row.baseline);
    const skillScore = score(row.skillLoaded);
    if (!Number.isFinite(baselineScore) || !Number.isFinite(skillScore)) {
      errors.push(`${row.file}: ${row.taskId} has non-numeric scores`);
      continue;
    }
    if (skillScore < MIN_SKILL_SCORE) errors.push(`${row.file}: ${row.taskId} skill-loaded score ${skillScore.toFixed(2)} is below ${MIN_SKILL_SCORE.toFixed(2)}`);
    if (skillScore < baselineScore) errors.push(`${row.file}: ${row.taskId} regressed (${baselineScore.toFixed(2)} -> ${skillScore.toFixed(2)})`);
    if (row.preference !== 'skill') errors.push(`${row.file}: ${row.taskId} preference is ${row.preference}, expected skill`);
    const skillFailures = criticalFailureCount(row.skillLoaded);
    if (skillFailures) errors.push(`${row.file}: ${row.taskId} has ${skillFailures} skill-loaded critical failure(s)`);

    const checks = selectedTriggerChecksFor(row, triggerChecks);
    const positive = checks.find((check) => check.promptType === 'positive');
    const negative = checks.find((check) => check.promptType === 'negative-control');
    if (!positive) {
      errors.push(`${row.file}: ${row.taskId} missing positive trigger check`);
    } else if (!positive.triggeredSkills?.includes(row.skill)) {
      errors.push(`${row.file}: ${row.taskId} positive trigger did not include ${row.skill}`);
    }
    if (!negative) {
      errors.push(`${row.file}: ${row.taskId} missing negative-control trigger check`);
    } else if ((negative.triggeredSkills || []).length !== 0) {
      errors.push(`${row.file}: ${row.taskId} negative-control over-triggered: ${negative.triggeredSkills.join(', ')}`);
    }
  }

  const deltas = selected.map((row) => score(row.skillLoaded) - score(row.baseline)).filter(Number.isFinite);
  const averageDelta = deltas.reduce((sum, value) => sum + value, 0) / (deltas.length || 1);
  if (averageDelta < MIN_AVERAGE_DELTA) {
    errors.push(`current suite average delta ${averageDelta.toFixed(2)} is below ${MIN_AVERAGE_DELTA.toFixed(2)}`);
  }

  if (errors.length) {
    console.error(`SOTA evidence validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `Validated SOTA evidence gate: ${selected.length} current samples, `
      + `${averageDelta.toFixed(2)} average delta, `
      + `${MIN_SKILL_SCORE.toFixed(2)} min skill score, 0 regressions, 0 over-triggers, clean provenance`,
  );
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
