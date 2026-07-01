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
const MIN_SUITES_WITH_DEPTH = 2;
const MIN_ROWS_PER_SUITE = 5;
const MAX_REQUIRED_MODEL_OVERLAP = 20;

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
        model: result.model,
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

function suiteDepth(rows) {
  const counts = new Map();
  for (const row of rows) counts.set(row.suite || '<missing>', (counts.get(row.suite || '<missing>') || 0) + 1);
  const qualifying = [...counts.entries()].filter(([, count]) => count >= MIN_ROWS_PER_SUITE);
  return { counts, qualifying };
}

function intersectionSize(left, right) {
  let count = 0;
  const [smaller, larger] = left.size <= right.size ? [left, right] : [right, left];
  for (const value of smaller) {
    if (larger.has(value)) count += 1;
  }
  return count;
}

function modelOverlap(rows) {
  const modelTaskIds = new Map();
  for (const row of rows) {
    if (!row.model) continue;
    if (!modelTaskIds.has(row.model)) modelTaskIds.set(row.model, new Set());
    modelTaskIds.get(row.model).add(row.taskId);
  }
  let bestOverlap = 0;
  let bestPair = [];
  const entries = [...modelTaskIds.entries()];
  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      const overlap = intersectionSize(entries[i][1], entries[j][1]);
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        bestPair = [entries[i][0], entries[j][0]];
      }
    }
  }
  return { modelTaskIds, bestOverlap, bestPair };
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
  const selectedSuiteDepth = suiteDepth(selected);
  if (selectedSuiteDepth.qualifying.length < MIN_SUITES_WITH_DEPTH) {
    const detail = [...selectedSuiteDepth.counts.entries()].map(([suite, count]) => `${suite}=${count}`).join(', ');
    errors.push(`current suite has ${selectedSuiteDepth.qualifying.length} suites with >=${MIN_ROWS_PER_SUITE} rows; expected at least ${MIN_SUITES_WITH_DEPTH} (${detail})`);
  }

  const overlapRows = rows.filter((row) => row.sourceDirty === false && row.runnerPartial !== true);
  const overlap = modelOverlap(overlapRows);
  const requiredModelOverlap = Math.min(MAX_REQUIRED_MODEL_OVERLAP, selectedIds.size);
  if (overlap.bestOverlap < requiredModelOverlap) {
    const modelCounts = [...overlap.modelTaskIds.entries()].map(([model, taskIds]) => `${model}=${taskIds.size}`).join(', ');
    errors.push(`best clean shared-task model overlap is ${overlap.bestOverlap}; expected at least ${requiredModelOverlap} (${modelCounts})`);
  }

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
      + `${MIN_SKILL_SCORE.toFixed(2)} min skill score, `
      + `${selectedSuiteDepth.qualifying.length} suite-depth groups, `
      + `${overlap.bestOverlap}/${requiredModelOverlap} best clean shared-task model overlap, `
      + '0 regressions, 0 over-triggers, clean provenance',
  );
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
