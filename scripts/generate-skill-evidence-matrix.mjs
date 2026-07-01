import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const registryPath = path.join(repoRoot, 'registry', 'skills.json');
const taskDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'tasks');
const resultDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'results');
const outputPath = path.join(repoRoot, 'docs', 'skill-evidence-matrix.md');
const check = process.argv.includes('--check');

const MIN_INDIVIDUAL_TASKS = 5;
const MIN_WIN_RATE = 0.7;
const MIN_AVERAGE_DELTA = 0.5;
const MAX_OVER_TRIGGER_RATE = 0.05;

function rel(file) {
  return path.relative(repoRoot, file).split(path.sep).join('/');
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

async function listJson(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => path.join(dir, entry.name))
    .sort();
}

function pct(value) {
  return Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : '—';
}

function number(value) {
  return Number.isFinite(value) ? value.toFixed(2) : '—';
}

function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function escapeCell(value) {
  return String(value ?? '—').replaceAll('|', '\\|').replace(/\s+/g, ' ').trim() || '—';
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

function skillRecord(sample) {
  return sample.skillLoaded || sample.skill;
}

async function loadTasks() {
  const tasks = new Map();
  for (const file of await listJson(taskDir)) {
    const suite = await readJson(file);
    for (const task of suite.tasks || []) {
      tasks.set(task.id, { ...task, suite: suite.suite });
    }
  }
  return tasks;
}

async function loadRows() {
  const rows = [];
  const triggerChecks = [];
  for (const file of await listJson(resultDir)) {
    const result = await readJson(file);
    const source = result.runner?.source || {};
    for (const sample of result.samples || []) {
      const loaded = skillRecord(sample);
      rows.push({
        file: rel(file),
        runId: result.runId,
        model: result.model,
        suite: result.suite,
        startedAt: result.runner?.startedAt || null,
        completedAt: result.runner?.completedAt || null,
        sourceDirty: typeof source.dirty === 'boolean' ? source.dirty : null,
        runnerPartial: result.runner?.partial === true,
        taskId: sample.taskId,
        skill: sample.skill,
        baselineScore: sample.baseline?.score,
        skillScore: loaded?.score,
        delta: Number.isFinite(sample.baseline?.score) && Number.isFinite(loaded?.score) ? loaded.score - sample.baseline.score : null,
        preference: sample.preference,
        baselineCriticalFailures: Array.isArray(sample.baseline?.criticalFailures) ? sample.baseline.criticalFailures.length : 0,
        skillCriticalFailures: Array.isArray(loaded?.criticalFailures) ? loaded.criticalFailures.length : 0,
      });
    }
    for (const check of result.triggerChecks || []) {
      triggerChecks.push({
        ...check,
        file: rel(file),
        runId: result.runId,
        completedAt: result.runner?.completedAt || null,
        sourceDirty: typeof source.dirty === 'boolean' ? source.dirty : null,
        runnerPartial: result.runner?.partial === true,
      });
    }
  }
  return { rows, triggerChecks };
}

function selectCurrentRows(rows, triggerChecks) {
  const byTask = new Map();
  for (const row of rows) {
    const existing = byTask.get(row.taskId);
    if (!existing || compareCurrentRows(row, existing) > 0) byTask.set(row.taskId, row);
  }
  const selectedRows = [...byTask.values()].sort((a, b) => a.taskId.localeCompare(b.taskId));
  const selectedKeys = new Set(selectedRows.map((row) => `${row.file}\0${row.taskId}`));
  const selectedTriggerChecks = triggerChecks.filter((trigger) => selectedKeys.has(`${trigger.file}\0${trigger.taskId}`));
  return { selectedRows, selectedTriggerChecks };
}

function checksForSkill(skill, selectedTriggerChecks) {
  const checks = selectedTriggerChecks.filter((check) => check.expectedSkill === skill);
  const negative = checks.filter((check) => check.promptType === 'negative-control');
  const positive = checks.filter((check) => check.promptType === 'positive');
  const overTriggers = negative.filter((check) => (check.triggeredSkills || []).includes(skill)).length;
  const positiveHits = positive.filter((check) => (check.triggeredSkills || []).includes(skill)).length;
  return {
    positiveRecall: positive.length ? positiveHits / positive.length : null,
    overTriggerRate: negative.length ? overTriggers / negative.length : null,
  };
}

function summarizeSkill(skill, rows, triggerStats) {
  const taskCount = rows.length;
  const deltas = rows.map((row) => row.delta).filter(Number.isFinite);
  const wins = rows.filter((row) => row.skillScore > row.baselineScore).length;
  const nonRegressions = rows.filter((row) => row.skillScore >= row.baselineScore).length;
  const baselineCriticalFailures = rows.reduce((sum, row) => sum + row.baselineCriticalFailures, 0);
  const skillCriticalFailures = rows.reduce((sum, row) => sum + row.skillCriticalFailures, 0);
  const winRate = taskCount ? wins / taskCount : null;
  const nonRegressionRate = taskCount ? nonRegressions / taskCount : null;
  const avgDelta = mean(deltas);
  const negativeOk = triggerStats.overTriggerRate !== null && triggerStats.overTriggerRate < MAX_OVER_TRIGGER_RATE;
  const usefulGatesPass = taskCount >= MIN_INDIVIDUAL_TASKS
    && winRate >= MIN_WIN_RATE
    && avgDelta >= MIN_AVERAGE_DELTA
    && skillCriticalFailures <= baselineCriticalFailures
    && negativeOk;

  let status = 'preview-structural';
  let note = 'Install/eval/reference validated; no current behavioral benchmark task.';
  if (usefulGatesPass) {
    status = 'individual-useful';
    note = 'Individual skill usefulness gates pass on current public benchmark tasks.';
  } else if (taskCount > 0) {
    status = 'benchmarked-suite-support';
    note = taskCount < MIN_INDIVIDUAL_TASKS
      ? `Supports repository-level suite evidence; needs ${MIN_INDIVIDUAL_TASKS - taskCount} more current task(s) for an individual-useful claim.`
      : 'Benchmarked, but one or more individual-useful gates do not pass.';
  }

  return {
    skill,
    status,
    taskCount,
    avgDelta,
    winRate,
    nonRegressionRate,
    overTriggerRate: triggerStats.overTriggerRate,
    positiveRecall: triggerStats.positiveRecall,
    baselineCriticalFailures,
    skillCriticalFailures,
    tasks: rows.map((row) => row.taskId).sort(),
    note,
  };
}

function statusRank(status) {
  return {
    'individual-useful': 0,
    'benchmarked-suite-support': 1,
    'preview-structural': 2,
  }[status] ?? 99;
}

function render({ registry, tasks, selectedRows, selectedTriggerChecks }) {
  const rowsBySkill = new Map();
  for (const row of selectedRows) {
    if (!rowsBySkill.has(row.skill)) rowsBySkill.set(row.skill, []);
    rowsBySkill.get(row.skill).push(row);
  }

  const taskSuites = new Set(selectedRows.map((row) => row.suite).filter(Boolean));
  const summaries = registry.skills.map((skill) => summarizeSkill(
    skill.name,
    rowsBySkill.get(skill.name) || [],
    checksForSkill(skill.name, selectedTriggerChecks),
  ));

  const byStatus = new Map();
  for (const summary of summaries) byStatus.set(summary.status, (byStatus.get(summary.status) || 0) + 1);
  const benchmarked = summaries.filter((summary) => summary.taskCount > 0).length;
  const individual = byStatus.get('individual-useful') || 0;
  const preview = byStatus.get('preview-structural') || 0;

  const lines = [];
  lines.push('# Skill Evidence Matrix');
  lines.push('');
  lines.push('<!-- Generated by `node scripts/generate-skill-evidence-matrix.mjs`. Do not edit by hand. -->');
  lines.push('');
  lines.push('This matrix prevents repository-level benchmark evidence from being over-read as proof for every individual skill. It maps every published skill to its current public behavioral evidence status.');
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Published skills: ${registry.skills.length}`);
  lines.push(`- Current benchmark tasks selected: ${selectedRows.length}`);
  lines.push(`- Current benchmark suites represented: ${taskSuites.size}`);
  lines.push(`- Skills with current behavioral benchmark coverage: ${benchmarked}`);
  lines.push(`- Skills with individual-useful evidence: ${individual}`);
  lines.push(`- Skills still structural-preview only: ${preview}`);
  lines.push('');
  lines.push('## Status definitions');
  lines.push('');
  lines.push('| Status | Meaning | Public claim allowed |');
  lines.push('| --- | --- | --- |');
  lines.push(`| individual-useful | At least ${MIN_INDIVIDUAL_TASKS} current positive tasks for this skill plus win-rate, average-delta, critical-failure, and over-trigger gates pass. | This individual skill has public usefulness evidence. |`);
  lines.push('| benchmarked-suite-support | The skill appears in current benchmark tasks, but does not yet have enough task depth or gate coverage for an individual claim. | It supports the repository-level suite claim only. |');
  lines.push('| preview-structural | The skill passes structural repository gates but has no current behavioral benchmark task. | Preview/unproven; do not market as behavior-proven. |');
  lines.push('');
  lines.push('The repository-level SOTA-candidate claim is validated separately by the current-suite summary and CI gates. This file deliberately keeps individual skill claims stricter: repository-wide improvement does not imply every skill is individually proven.');
  lines.push('');
  lines.push('## Matrix');
  lines.push('');
  lines.push('| Skill | Evidence status | Current tasks | Avg delta | Win rate | Non-regression | Positive trigger recall | Negative over-trigger | Critical failures | Current task IDs | Note |');
  lines.push('| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |');

  for (const summary of summaries.sort((a, b) => statusRank(a.status) - statusRank(b.status) || b.taskCount - a.taskCount || a.skill.localeCompare(b.skill))) {
    const critical = summary.taskCount ? `${summary.baselineCriticalFailures}→${summary.skillCriticalFailures}` : '—';
    lines.push(`| ${escapeCell(summary.skill)} | ${summary.status} | ${summary.taskCount} | ${number(summary.avgDelta)} | ${pct(summary.winRate)} | ${pct(summary.nonRegressionRate)} | ${pct(summary.positiveRecall)} | ${pct(summary.overTriggerRate)} | ${critical} | ${escapeCell(summary.tasks.join(', ') || '—')} | ${escapeCell(summary.note)} |`);
  }

  lines.push('');
  lines.push('## How to improve the matrix');
  lines.push('');
  lines.push('- Promote one skill at a time from `benchmarked-suite-support` to `individual-useful` by adding enough distinct current benchmark tasks and retaining the quality gates.');
  lines.push('- Treat `preview-structural` skills as backlog candidates: either add benchmark tasks, merge overlapping skills, or remove weak skills.');
  lines.push('- Prefer benchmark tasks that exercise concrete product decisions, edge cases, state machines, support flows, and measurable business impact.');
  lines.push('- Rerun the matrix after benchmark changes with `npm run evidence:matrix`.');
  lines.push('');

  // Keep the task map read as a guard against silently generating a matrix when task fixtures disappear.
  if (!tasks.size && selectedRows.length) throw new Error('selected benchmark rows exist, but no benchmark tasks were loaded');
  return `${lines.join('\n')}\n`;
}

async function main() {
  const registry = await readJson(registryPath);
  const tasks = await loadTasks();
  const { rows, triggerChecks } = await loadRows();
  const { selectedRows, selectedTriggerChecks } = selectCurrentRows(rows, triggerChecks);
  const content = render({ registry, tasks, selectedRows, selectedTriggerChecks });

  if (check) {
    const current = existsSync(outputPath) ? await readFile(outputPath, 'utf8') : '';
    if (current !== content) {
      console.error(`${rel(outputPath)} is stale. Regenerate with: npm run evidence:matrix`);
      process.exit(1);
    }
    console.log(`Validated ${rel(outputPath)} for ${registry.skills.length} skills and ${selectedRows.length} current benchmark tasks`);
    return;
  }

  await writeFile(outputPath, content);
  console.log(`Wrote ${rel(outputPath)} for ${registry.skills.length} skills and ${selectedRows.length} current benchmark tasks`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
