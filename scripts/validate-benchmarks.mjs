import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const skillsDir = path.join(repoRoot, 'skills');
const taskDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'tasks');
const resultDir = path.join(repoRoot, 'benchmarks', 'skill-behavior', 'results');

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

async function readJson(file, errors) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    errors.push(`${path.relative(repoRoot, file)}: invalid JSON: ${error.message}`);
    return null;
  }
}

async function listJson(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && entry.name.endsWith('.json')).map((entry) => path.join(dir, entry.name)).sort();
}

function validateRubric(task, file, errors) {
  const rubric = asArray(task.rubric);
  if (rubric.length < 4) errors.push(`${file}: task ${task.id} must have at least 4 rubric criteria`);
  const ids = new Set();
  let requiredCount = 0;
  let totalWeight = 0;
  for (const [index, criterion] of rubric.entries()) {
    const prefix = `${file}: task ${task.id} rubric[${index}]`;
    if (!criterion.id || !/^[a-z0-9-]+$/.test(criterion.id)) errors.push(`${prefix}: missing or invalid id`);
    if (ids.has(criterion.id)) errors.push(`${prefix}: duplicate criterion id ${criterion.id}`);
    ids.add(criterion.id);
    if (!Number.isInteger(criterion.weight) || criterion.weight < 1 || criterion.weight > 5) errors.push(`${prefix}: weight must be integer 1-5`);
    totalWeight += criterion.weight || 0;
    if (criterion.required === true) requiredCount += 1;
    if (!criterion.description || criterion.description.length < 24) errors.push(`${prefix}: description is too short`);
  }
  if (requiredCount < 2) errors.push(`${file}: task ${task.id} must have at least 2 required criteria`);
  if (totalWeight < 5) errors.push(`${file}: task ${task.id} total rubric weight is too low`);
}

function validateTask(task, file, knownSkills, taskIds, taskIndex, errors) {
  if (!task.id || !/^[a-z0-9-]+-\d{3}$/.test(task.id)) errors.push(`${file}: task id must end with -NNN and use lowercase hyphen-case`);
  if (taskIds.has(task.id)) errors.push(`${file}: duplicate task id ${task.id}`);
  taskIds.add(task.id);
  if (!task.skill || !knownSkills.has(task.skill)) errors.push(`${file}: task ${task.id || '<missing>'} references unknown skill ${task.skill}`);
  if (!task.category || !/^[a-z0-9-]+$/.test(task.category)) errors.push(`${file}: task ${task.id} category must be lowercase hyphen-case`);
  if (!task.prompt || task.prompt.length < 120) errors.push(`${file}: task ${task.id} prompt should be a realistic, detailed prompt`);
  if (!task.negativeControlPrompt || task.negativeControlPrompt.length < 24) errors.push(`${file}: task ${task.id} missing negativeControlPrompt`);
  if (task.negativeControlPrompt && task.skill && task.negativeControlPrompt.includes(task.skill)) errors.push(`${file}: task ${task.id} negative control appears to mention the target skill`);
  if (asArray(task.expectedArtifacts).length < 3) errors.push(`${file}: task ${task.id} needs at least 3 expectedArtifacts`);
  if (asArray(task.failureModes).length < 3) errors.push(`${file}: task ${task.id} needs at least 3 failureModes`);
  validateRubric(task, file, errors);
  if (task.id) taskIndex.set(task.id, { ...task, file });
}

function hasOutputReference(record) {
  return ['outputRef', 'outputPath', 'outputSha256'].some((field) => typeof record[field] === 'string' && record[field].trim().length > 0);
}

function validateExistingReference(reference, prefix, errors) {
  if (typeof reference !== 'string' || !reference.trim()) return;
  const file = path.isAbsolute(reference) ? reference : path.join(repoRoot, reference);
  if (!existsSync(file)) errors.push(`${prefix}: referenced output file does not exist: ${reference}`);
}

function validateScoredRecord(record, condition, prefix, task, errors) {
  if (!record || typeof record !== 'object') {
    errors.push(`${prefix}: missing ${condition} record`);
    return;
  }
  const recordPrefix = `${prefix}.${condition}`;
  if (typeof record.score !== 'number' || record.score < 0 || record.score > 5) errors.push(`${recordPrefix}: score must be number 0-5`);
  if (!isObject(record.criterionScores)) {
    errors.push(`${recordPrefix}: criterionScores object is required for auditable rubric scoring`);
  } else {
    for (const criterion of asArray(task.rubric)) {
      const value = record.criterionScores[criterion.id];
      if (typeof value !== 'number' || value < 0 || value > 5) errors.push(`${recordPrefix}.criterionScores.${criterion.id}: score must be number 0-5`);
    }
  }
  if (!Array.isArray(record.criticalFailures)) errors.push(`${recordPrefix}: criticalFailures must be an array`);
  if (!hasOutputReference(record)) errors.push(`${recordPrefix}: outputRef, outputPath, or outputSha256 is required for auditability`);
  validateExistingReference(record.outputRef, `${recordPrefix}.outputRef`, errors);
  validateExistingReference(record.outputPath, `${recordPrefix}.outputPath`, errors);
}

function validateResult(result, file, taskIndex, errors) {
  if (result.schemaVersion !== 1) errors.push(`${file}: schemaVersion must be 1`);
  if (result.benchmark !== 'skill-behavior') errors.push(`${file}: benchmark must be skill-behavior`);
  if (!result.suite || !/^[a-z0-9-]+$/.test(result.suite)) errors.push(`${file}: suite must be lowercase hyphen-case`);
  if (!result.runId || !/^[a-zA-Z0-9._:-]+$/.test(result.runId)) errors.push(`${file}: missing or invalid runId`);
  if (!result.model) errors.push(`${file}: missing model`);
  if (!isObject(result.runner) || !result.runner.name) errors.push(`${file}: missing runner.name`);
  if (!isObject(result.judge) || !result.judge.name) errors.push(`${file}: missing judge.name`);
  if (!isObject(result.judge) || typeof result.judge.blinded !== 'boolean') errors.push(`${file}: judge.blinded boolean is required`);
  if (!Array.isArray(result.samples) || result.samples.length === 0) errors.push(`${file}: samples must be non-empty`);

  for (const [index, sample] of asArray(result.samples).entries()) {
    const prefix = `${file}: samples[${index}]`;
    const task = taskIndex.get(sample.taskId);
    if (!task) {
      errors.push(`${prefix}: unknown taskId ${sample.taskId}`);
      continue;
    }
    if (result.suite && result.suite !== task.suite) errors.push(`${prefix}: task ${sample.taskId} belongs to suite ${task.suite}, not ${result.suite}`);
    if (sample.skill !== task.skill) errors.push(`${prefix}: skill must be ${task.skill}`);
    validateScoredRecord(sample.baseline, 'baseline', prefix, task, errors);
    validateScoredRecord(sample.skillLoaded || sample.skill, 'skillLoaded', prefix, task, errors);
    validateExistingReference(sample.judgeOutputRef, `${prefix}.judgeOutputRef`, errors);
    if (!['skill', 'baseline', 'tie'].includes(sample.preference)) errors.push(`${prefix}: preference must be skill, baseline, or tie`);
  }

  for (const [index, check] of asArray(result.triggerChecks).entries()) {
    const prefix = `${file}: triggerChecks[${index}]`;
    const task = taskIndex.get(check.taskId);
    if (!task) {
      errors.push(`${prefix}: unknown taskId ${check.taskId}`);
      continue;
    }
    if (!['positive', 'negative-control'].includes(check.promptType)) errors.push(`${prefix}: promptType must be positive or negative-control`);
    if (!Array.isArray(check.triggeredSkills)) errors.push(`${prefix}: triggeredSkills must be an array`);
    if (check.expectedSkill && check.expectedSkill !== task.skill) errors.push(`${prefix}: expectedSkill must be ${task.skill}`);
  }
}

async function main() {
  const errors = [];
  const skillEntries = existsSync(skillsDir) ? await readdir(skillsDir, { withFileTypes: true }) : [];
  const knownSkills = new Set(skillEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name));
  const taskFiles = await listJson(taskDir);
  const taskIds = new Set();
  const taskIndex = new Map();

  if (!taskFiles.length) errors.push('benchmarks/skill-behavior/tasks: no benchmark task files found');

  for (const file of taskFiles) {
    const rel = path.relative(repoRoot, file);
    const suite = await readJson(file, errors);
    if (!suite) continue;
    if (suite.schemaVersion !== 1) errors.push(`${rel}: schemaVersion must be 1`);
    if (suite.benchmark !== 'skill-behavior') errors.push(`${rel}: benchmark must be skill-behavior`);
    if (!suite.suite || !/^[a-z0-9-]+$/.test(suite.suite)) errors.push(`${rel}: suite must be lowercase hyphen-case`);
    const tasks = asArray(suite.tasks);
    if (tasks.length < 5) errors.push(`${rel}: suite should contain at least 5 tasks`);
    for (const task of tasks) validateTask({ ...task, suite: suite.suite }, rel, knownSkills, taskIds, taskIndex, errors);
  }

  const resultFiles = await listJson(resultDir);
  for (const file of resultFiles) {
    const rel = path.relative(repoRoot, file);
    const result = await readJson(file, errors);
    if (!result) continue;
    validateResult(result, rel, taskIndex, errors);
  }

  if (errors.length) {
    console.error(`Benchmark validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Validated ${taskIds.size} benchmark tasks and ${resultFiles.length} result file(s)`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
