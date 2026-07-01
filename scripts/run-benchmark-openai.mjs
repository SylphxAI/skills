import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import crypto from 'node:crypto';
import path from 'node:path';
import { promisify } from 'node:util';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const defaultBaseUrl = 'https://api.openai.com/v1';
const execFileAsync = promisify(execFile);

function usage() {
  console.error(`Usage: node scripts/run-benchmark-openai.mjs <tasks.json> --out <result.json> [options]\n\nOptions:\n  --run-id <id>              Stable run identifier. Defaults to timestamp.\n  --model <model>            Answer model. Defaults to OPENAI_MODEL or gpt-5.5.\n  --judge-model <model>      Judge/trigger model. Defaults to BENCHMARK_JUDGE_MODEL or --model.\n  --base-url <url>           OpenAI-compatible API base URL. Defaults to https://api.openai.com/v1.\n  --output-dir <dir>         Directory for raw outputs. Defaults to /tmp/skill-benchmark-<run-id>.\n  --temperature <number>     Answer temperature. Defaults to 0.2.\n  --max-output-tokens <n>    Answer token cap. Defaults to 3500.\n  --answer-word-limit <n>    Add the same concise-answer budget to baseline and skill prompts.\n  --max-attempts <n>         API attempts per model call. Defaults to 5.\n  --retry-base-ms <n>        Base retry delay in milliseconds. Defaults to 1500.\n  --request-timeout-ms <n>   Per-attempt HTTP timeout. Defaults to 90000.\n  --start <n>                Zero-based task offset after optional task-id filtering. Defaults to 0.\n  --limit <n>                Run only n selected tasks. Useful for smoke tests and shards.\n  --task-id <id>             Run a specific task id. Repeat or comma-separate for multiple tasks.\n  --no-references            Do not include skill reference files in skill-loaded prompts.\n  --skip-trigger-checks      Do not run positive/negative trigger classifier checks.\n  --resume                   Reuse an existing result file and skip completed samples.\n  --dry-run                  Validate inputs and print planned calls without contacting the API.\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    model: process.env.OPENAI_MODEL || 'gpt-5.5',
    judgeModel: process.env.BENCHMARK_JUDGE_MODEL,
    baseUrl: process.env.OPENAI_BASE_URL || defaultBaseUrl,
    temperature: 0.2,
    maxOutputTokens: 3500,
    maxAttempts: 5,
    retryBaseMs: 1500,
    requestTimeoutMs: 90000,
    includeReferences: true,
    triggerChecks: true,
    taskIds: [],
    start: 0,
    resume: false,
    dryRun: false,
  };
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--run-id') args.runId = argv[++i];
    else if (arg === '--model') args.model = argv[++i];
    else if (arg === '--judge-model') args.judgeModel = argv[++i];
    else if (arg === '--base-url') args.baseUrl = argv[++i];
    else if (arg === '--out') args.out = argv[++i];
    else if (arg === '--output-dir') args.outputDir = argv[++i];
    else if (arg === '--temperature') args.temperature = Number(argv[++i]);
    else if (arg === '--max-output-tokens') args.maxOutputTokens = Number(argv[++i]);
    else if (arg === '--answer-word-limit') args.answerWordLimit = Number(argv[++i]);
    else if (arg === '--max-attempts') args.maxAttempts = Number(argv[++i]);
    else if (arg === '--retry-base-ms') args.retryBaseMs = Number(argv[++i]);
    else if (arg === '--request-timeout-ms') args.requestTimeoutMs = Number(argv[++i]);
    else if (arg === '--start') args.start = Number(argv[++i]);
    else if (arg === '--limit') args.limit = Number(argv[++i]);
    else if (arg === '--task-id') args.taskIds.push(...argv[++i].split(',').map((value) => value.trim()).filter(Boolean));
    else if (arg === '--no-references') args.includeReferences = false;
    else if (arg === '--skip-trigger-checks') args.triggerChecks = false;
    else if (arg === '--resume') args.resume = true;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg.startsWith('--')) usage();
    else positional.push(arg);
  }
  if (positional.length !== 1 || !args.out) usage();
  if (!Number.isFinite(args.temperature)) throw new Error('--temperature must be a number');
  if (!Number.isInteger(args.maxOutputTokens) || args.maxOutputTokens < 1) throw new Error('--max-output-tokens must be a positive integer');
  if (args.answerWordLimit !== undefined && (!Number.isInteger(args.answerWordLimit) || args.answerWordLimit < 50)) throw new Error('--answer-word-limit must be an integer of at least 50');
  if (!Number.isInteger(args.maxAttempts) || args.maxAttempts < 1) throw new Error('--max-attempts must be a positive integer');
  if (!Number.isInteger(args.retryBaseMs) || args.retryBaseMs < 0) throw new Error('--retry-base-ms must be a non-negative integer');
  if (!Number.isInteger(args.requestTimeoutMs) || args.requestTimeoutMs < 1000) throw new Error('--request-timeout-ms must be at least 1000');
  if (!Number.isInteger(args.start) || args.start < 0) throw new Error('--start must be a non-negative integer');
  if (args.limit !== undefined && (!Number.isInteger(args.limit) || args.limit < 1)) throw new Error('--limit must be a positive integer');
  args.taskFile = positional[0];
  args.judgeModel ||= args.model;
  args.runId ||= `openai-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  args.outputDir = path.resolve(repoRoot, args.outputDir || path.join('/tmp', `skill-benchmark-${args.runId}`));
  args.out = path.resolve(repoRoot, args.out);
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

function extractSkillDescription(skillMarkdown) {
  const match = skillMarkdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return '';
  const description = match[1].match(/^description:\s*(.+)$/m);
  return description ? description[1].replace(/^['"]|['"]$/g, '') : '';
}

function answerBudgetInstruction(answerWordLimit) {
  if (!answerWordLimit) return '';
  return `\n\n## Answer budget\nKeep the answer concise and audit-friendly. Do not exceed ${answerWordLimit} words. Prioritize the requested artifacts and rubric-critical decisions over explanation.`;
}

function userTaskPrompt(task, answerWordLimit) {
  return `${task.prompt}${answerBudgetInstruction(answerWordLimit)}`;
}

function skillLoadedPrompt({ task, skillMarkdown, references, answerWordLimit }) {
  const referenceBlock = references.length
    ? references.map((ref) => `\n### ${ref.path}\n\n${ref.content}`).join('\n')
    : '\nNo reference files included.';
  return `Use the following skill context to answer the user task. Do not mention the benchmark setup.\n\n## Skill: ${task.skill}\n\n${skillMarkdown}\n\n## Skill references\n${referenceBlock}\n\n## User task\n\n${userTaskPrompt(task, answerWordLimit)}`;
}

function skillContextText({ skillMarkdown, references }) {
  return JSON.stringify({
    skillMarkdown,
    references: references.map((ref) => ({ path: ref.path, content: ref.content })),
  });
}

function outputText(response) {
  if (typeof response.output_text === 'string') return response.output_text;
  const parts = [];
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === 'string') parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

async function gitText(args) {
  const { stdout } = await execFileAsync('git', args, { cwd: repoRoot });
  return stdout.trim();
}

async function sourceMetadata() {
  try {
    const [head, branch, status] = await Promise.all([
      gitText(['rev-parse', 'HEAD']),
      gitText(['rev-parse', '--abbrev-ref', 'HEAD']),
      gitText(['status', '--porcelain']),
    ]);
    return {
      type: 'git',
      head,
      branch,
      dirty: status.length > 0,
    };
  } catch (error) {
    return {
      type: 'unknown',
      error: error.message,
    };
  }
}

function outputRef(file) {
  const rel = path.relative(repoRoot, file);
  return rel.startsWith('..') ? file : rel;
}

function callLabel(metadata) {
  return [metadata?.taskId, metadata?.condition].filter(Boolean).join(' ') || 'api-call';
}

function warnRetry({ metadata, attempt, maxAttempts, error, retryDelayMs }) {
  console.warn(`[benchmark-runner] ${callLabel(metadata)} attempt ${attempt}/${maxAttempts} failed; retrying in ${retryDelayMs}ms: ${error.message}`);
}

async function callResponses({ apiKey, baseUrl, model, input, maxOutputTokens, temperature, textFormat, metadata, maxAttempts, retryBaseMs, requestTimeoutMs }) {
  const body = {
    model,
    input,
    max_output_tokens: maxOutputTokens,
    store: false,
    metadata,
  };
  if (temperature !== undefined) body.temperature = temperature;
  if (textFormat) body.text = { format: textFormat };

  const startedAt = Date.now();
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
    let response;
    let raw;
    try {
      response = await fetch(`${baseUrl.replace(/\/$/, '')}/responses`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      raw = await response.text();
    } catch (error) {
      clearTimeout(timeout);
      lastError = new Error(`OpenAI Responses API request failed (attempt ${attempt}/${maxAttempts}): ${error.name === 'AbortError' ? `timeout after ${requestTimeoutMs}ms` : error.message}`);
      if (attempt < maxAttempts) {
        const retryDelayMs = retryBaseMs * attempt;
        warnRetry({ metadata, attempt, maxAttempts, error: lastError, retryDelayMs });
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        continue;
      }
      throw lastError;
    } finally {
      clearTimeout(timeout);
    }
    const latencyMs = Date.now() - startedAt;
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { raw };
    }
    if (!response.ok) {
      const message = String(parsed?.error?.message || raw).slice(0, 800);
      lastError = new Error(`OpenAI Responses API failed (${response.status}, attempt ${attempt}/${maxAttempts}): ${message}`);
      if ((response.status === 429 || response.status >= 500) && attempt < maxAttempts) {
        const retryDelayMs = retryBaseMs * attempt;
        warnRetry({ metadata, attempt, maxAttempts, error: lastError, retryDelayMs });
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        continue;
      }
      throw lastError;
    }
    if (parsed.status && parsed.status !== 'completed') {
      const details = parsed.incomplete_details ? ` ${JSON.stringify(parsed.incomplete_details)}` : '';
      throw new Error(`OpenAI Responses API returned status=${parsed.status}; increase --max-output-tokens or use another model.${details}`);
    }
    const text = outputText(parsed);
    if (!text.trim()) {
      throw new Error('OpenAI Responses API returned no output text despite a successful HTTP response.');
    }
    return { response: parsed, text, latencyMs };
  }
  throw lastError || new Error('OpenAI Responses API failed without a response');
}

function criterionScoreSchema(rubric) {
  const properties = {};
  const required = [];
  for (const criterion of rubric || []) {
    properties[criterion.id] = { type: 'number', description: 'Score from 0 to 5 for this criterion.' };
    required.push(criterion.id);
  }
  return { type: 'object', properties, required, additionalProperties: false };
}

function judgmentSchema(task) {
  const scoreRecord = {
    type: 'object',
    properties: {
      score: { type: 'number', description: 'Overall weighted score from 0 to 5.' },
      criterionScores: criterionScoreSchema(task.rubric),
      criticalFailures: { type: 'array', items: { type: 'string' } },
      rationale: { type: 'string', description: 'Short rationale, 40 words or fewer.' },
    },
    required: ['score', 'criterionScores', 'criticalFailures', 'rationale'],
    additionalProperties: false,
  };
  return {
    type: 'json_schema',
    name: 'skill_benchmark_judgment',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        winner: { type: 'string', enum: ['a', 'b', 'tie'] },
        a: scoreRecord,
        b: scoreRecord,
      },
      required: ['winner', 'a', 'b'],
      additionalProperties: false,
    },
  };
}

function triggerSchema() {
  return {
    type: 'json_schema',
    name: 'skill_trigger_check',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        shouldTrigger: { type: 'boolean' },
        rationale: { type: 'string' },
      },
      required: ['shouldTrigger', 'rationale'],
      additionalProperties: false,
    },
  };
}

function judgePrompt({ task, aOutput, bOutput }) {
  const rubric = (task.rubric || []).map((criterion) => `- ${criterion.id} (weight ${criterion.weight}${criterion.required ? ', required' : ''}): ${criterion.description}`).join('\n');
  const criterionShape = Object.fromEntries((task.rubric || []).map((criterion) => [criterion.id, 0]));
  const artifacts = (task.expectedArtifacts || []).map((item) => `- ${item}`).join('\n');
  const failureModes = (task.failureModes || []).map((item) => `- ${item}`).join('\n');
  return `You are judging two anonymized answers to the same benchmark task. Return JSON only. Do not infer which answer used a skill. Score each answer from 0 to 5 using every rubric criterion. Keep each rationale to 40 words or fewer. Penalize generic advice, missing required artifacts, unsafe policy claims, and unsupported assumptions.

Return exactly this JSON shape, preserving the criterionScores keys:
{
  "winner": "a|b|tie",
  "a": {"score": 0, "criterionScores": ${JSON.stringify(criterionShape)}, "criticalFailures": [], "rationale": ""},
  "b": {"score": 0, "criterionScores": ${JSON.stringify(criterionShape)}, "criticalFailures": [], "rationale": ""}
}

## Task
${task.prompt}

## Expected artifacts
${artifacts}

## Failure modes
${failureModes}

## Rubric
${rubric}

## Answer A
${aOutput}

## Answer B
${bOutput}`;
}

function triggerPrompt({ task, skillDescription, prompt }) {
  return `Decide whether this skill should be used for the user prompt. Return JSON only.\n\n## Skill name\n${task.skill}\n\n## Skill description\n${skillDescription}\n\n## User prompt\n${prompt}\n\nUse shouldTrigger=true only when the skill is directly relevant, not merely adjacent.`;
}

function parseModelJson(text, label) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  try {
    return JSON.parse(candidate);
  } catch (error) {
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(candidate.slice(start, end + 1));
      } catch {
        // Fall through to the clearer error below.
      }
    }
    throw new Error(`${label} did not return parseable JSON: ${error.message}`);
  }
}

function weightedScore(task, criterionScores) {
  let weighted = 0;
  let total = 0;
  for (const criterion of task.rubric || []) {
    const score = Number(criterionScores?.[criterion.id]);
    if (!Number.isFinite(score)) continue;
    weighted += score * criterion.weight;
    total += criterion.weight;
  }
  return total ? weighted / total : 0;
}

function coerceScoreRecord(task, record, label) {
  const criterionScores = {};
  let validCriterionScoreCount = 0;
  for (const criterion of task.rubric || []) {
    const underscoredId = criterion.id.replaceAll('-', '_');
    const rawValue = record?.criterionScores?.[criterion.id] ?? record?.criterionScores?.[underscoredId] ?? record?.[criterion.id] ?? record?.[underscoredId];
    const value = rawValue && typeof rawValue === 'object' ? rawValue.score : rawValue;
    const score = Number(value);
    if (Number.isFinite(score)) validCriterionScoreCount += 1;
    criterionScores[criterion.id] = Number.isFinite(score) ? score : 0;
  }
  if ((task.rubric || []).length && validCriterionScoreCount === 0) {
    throw new Error(`Judge response for ${task.id} ${label} is missing per-criterion scores`);
  }
  const score = Number.isFinite(Number(record?.score)) ? Number(record.score) : weightedScore(task, criterionScores);
  return {
    score,
    criterionScores,
    criticalFailures: Array.isArray(record?.criticalFailures) ? record.criticalFailures : [],
    rationale: record?.rationale || '',
  };
}

function coerceJudgment(task, judgmentJson) {
  const a = coerceScoreRecord(task, judgmentJson.a || judgmentJson.A || judgmentJson.answer_a || judgmentJson.answer_A || judgmentJson.answerA || judgmentJson.AnswerA || judgmentJson['Answer A'], 'answer A');
  const b = coerceScoreRecord(task, judgmentJson.b || judgmentJson.B || judgmentJson.answer_b || judgmentJson.answer_B || judgmentJson.answerB || judgmentJson.AnswerB || judgmentJson['Answer B'], 'answer B');
  let winner = typeof judgmentJson.winner === 'string' ? judgmentJson.winner.toLowerCase() : null;
  if (!['a', 'b', 'tie'].includes(winner)) {
    if (a.score > b.score) winner = 'a';
    else if (b.score > a.score) winner = 'b';
    else winner = 'tie';
  }
  return { a, b, winner };
}

function normalizeRecord(record, outputFile, apiCall) {
  return {
    score: Number(record.score),
    criterionScores: record.criterionScores || {},
    criticalFailures: Array.isArray(record.criticalFailures) ? record.criticalFailures : [],
    rationale: record.rationale || '',
    outputRef: outputRef(outputFile),
    outputSha256: sha256(apiCall.text),
    latencyMs: apiCall.latencyMs,
    usage: apiCall.response.usage || null,
  };
}

function preferenceFromWinner(winner, order) {
  winner = typeof winner === 'string' ? winner.toLowerCase() : winner;
  if (winner === 'tie') return 'tie';
  return order[winner] === 'skillLoaded' ? 'skill' : 'baseline';
}

async function writeOutput(outDir, taskId, condition, text) {
  await mkdir(outDir, { recursive: true });
  const file = path.join(outDir, `${taskId}-${condition}.md`);
  await writeFile(file, `${text.trim()}\n`);
  return file;
}


async function readExistingResult(file) {
  if (!existsSync(file)) return null;
  return JSON.parse(await readFile(file, 'utf8'));
}

function makeResult({ suite, args, startedAt, completedAt, samples, triggerChecks, selectedTaskIds, partial }) {
  return {
    schemaVersion: 1,
    benchmark: 'skill-behavior',
    suite: suite.suite,
    runId: args.runId,
    model: args.model,
    runner: {
      name: 'openai-responses',
      version: 1,
      baseUrl: args.baseUrl,
      temperature: args.temperature,
      maxOutputTokens: args.maxOutputTokens,
      answerWordLimit: args.answerWordLimit || null,
      maxAttempts: args.maxAttempts,
      retryBaseMs: args.retryBaseMs,
      requestTimeoutMs: args.requestTimeoutMs,
      includeReferences: args.includeReferences,
      selectedTaskIds,
      partial,
      source: args.sourceMetadata,
      startedAt,
      completedAt,
    },
    judge: {
      name: 'openai-responses-structured-judge',
      model: args.judgeModel,
      blinded: true,
      structuredOutput: true,
    },
    samples,
    triggerChecks,
  };
}

async function writeResultCheckpoint({ suite, args, startedAt, samples, triggerChecks, selectedTaskIds, partial }) {
  const result = makeResult({
    suite,
    args,
    startedAt,
    completedAt: new Date().toISOString(),
    samples,
    triggerChecks,
    selectedTaskIds,
    partial,
  });
  await mkdir(path.dirname(args.out), { recursive: true });
  await writeFile(args.out, `${JSON.stringify(result, null, 2)}
`);
  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  args.sourceMetadata = await sourceMetadata();
  const taskPath = path.resolve(repoRoot, args.taskFile);
  const suite = JSON.parse(await readFile(taskPath, 'utf8'));
  const tasks = selectTasks(suite.tasks || [], args);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!tasks.length) throw new Error('No benchmark tasks found');
  if (!args.dryRun && !apiKey) throw new Error('OPENAI_API_KEY is required unless --dry-run is used');

  const plan = {
    schemaVersion: 1,
    benchmark: 'skill-behavior',
    suite: suite.suite,
    runId: args.runId,
    model: args.model,
    judgeModel: args.judgeModel,
    taskCount: tasks.length,
    selectedTaskIds: tasks.map((task) => task.id),
    answerCalls: tasks.length * 2,
    judgeCalls: tasks.length,
    triggerCheckCalls: args.triggerChecks ? tasks.length * 2 : 0,
    answerWordLimit: args.answerWordLimit || null,
    maxAttempts: args.maxAttempts,
    retryBaseMs: args.retryBaseMs,
    requestTimeoutMs: args.requestTimeoutMs,
    source: args.sourceMetadata,
    outputDir: args.outputDir,
    out: args.out,
  };

  if (args.dryRun) {
    console.log(JSON.stringify(plan, null, 2));
    return;
  }

  const existing = args.resume ? await readExistingResult(args.out) : null;
  const samples = existing?.samples ? [...existing.samples] : [];
  const triggerChecks = existing?.triggerChecks ? [...existing.triggerChecks] : [];
  const completedTaskIds = new Set(samples.map((sample) => sample.taskId));
  const startedAt = existing?.runner?.startedAt || new Date().toISOString();
  const selectedTaskIds = tasks.map((task) => task.id);
  const triggerCheckKeys = new Set(triggerChecks.map((check) => `${check.taskId}\0${check.promptType}`));

  async function checkpoint(partial = true) {
    const result = await writeResultCheckpoint({ suite, args, startedAt, samples, triggerChecks, selectedTaskIds, partial });
    if (partial) console.log(`Checkpointed ${samples.length}/${tasks.length} selected sample(s) to ${args.out}`);
    return result;
  }

  async function runMissingTriggerChecks(task, skillDescription) {
    if (!args.triggerChecks) return;
    for (const [promptType, prompt] of [['positive', task.prompt], ['negative-control', task.negativeControlPrompt]]) {
      const key = `${task.id}\0${promptType}`;
      if (triggerCheckKeys.has(key)) continue;
      const check = await callResponses({
        apiKey,
        baseUrl: args.baseUrl,
        model: args.judgeModel,
        input: triggerPrompt({ task, skillDescription, prompt }),
        maxOutputTokens: 600,
        temperature: 0,
        textFormat: triggerSchema(),
        metadata: { runId: args.runId, taskId: task.id, condition: `trigger-${promptType}` },
        maxAttempts: args.maxAttempts,
        retryBaseMs: args.retryBaseMs,
        requestTimeoutMs: args.requestTimeoutMs,
      });
      const parsed = parseModelJson(check.text, `trigger ${promptType}`);
      triggerChecks.push({
        taskId: task.id,
        promptType,
        expectedSkill: task.skill,
        triggeredSkills: parsed.shouldTrigger ? [task.skill] : [],
        method: 'skill-description-binary-classifier',
        rationale: parsed.rationale,
        latencyMs: check.latencyMs,
        usage: check.response.usage || null,
      });
      triggerCheckKeys.add(key);
      await checkpoint(true);
    }
  }

  for (const task of tasks) {
    const skillDir = path.join(repoRoot, 'skills', task.skill);
    const skillMarkdown = await readTextIfExists(path.join(skillDir, 'SKILL.md'));
    if (!skillMarkdown) throw new Error(`Missing SKILL.md for ${task.skill}`);
    const skillDescription = extractSkillDescription(skillMarkdown);

    if (completedTaskIds.has(task.id)) {
      console.log(`Skipping completed task ${task.id}`);
      await runMissingTriggerChecks(task, skillDescription);
      continue;
    }
    const references = args.includeReferences ? await readReferenceFiles(skillDir) : [];
    const baselineInput = userTaskPrompt(task, args.answerWordLimit);
    const skillInput = skillLoadedPrompt({ task, skillMarkdown, references, answerWordLimit: args.answerWordLimit });

    const baseline = await callResponses({
      apiKey,
      baseUrl: args.baseUrl,
      model: args.model,
      input: baselineInput,
      maxOutputTokens: args.maxOutputTokens,
      temperature: args.temperature,
      metadata: { runId: args.runId, taskId: task.id, condition: 'baseline' },
      maxAttempts: args.maxAttempts,
      retryBaseMs: args.retryBaseMs,
      requestTimeoutMs: args.requestTimeoutMs,
    });
    const skillLoaded = await callResponses({
      apiKey,
      baseUrl: args.baseUrl,
      model: args.model,
      input: skillInput,
      maxOutputTokens: args.maxOutputTokens,
      temperature: args.temperature,
      metadata: { runId: args.runId, taskId: task.id, condition: 'skill-loaded' },
      maxAttempts: args.maxAttempts,
      retryBaseMs: args.retryBaseMs,
      requestTimeoutMs: args.requestTimeoutMs,
    });

    const baselineFile = await writeOutput(args.outputDir, task.id, 'baseline', baseline.text);
    const skillFile = await writeOutput(args.outputDir, task.id, 'skill-loaded', skillLoaded.text);

    const flip = Number.parseInt(sha256(`${args.runId}:${task.id}`).slice(0, 2), 16) % 2 === 0;
    const order = flip ? { a: 'skillLoaded', b: 'baseline' } : { a: 'baseline', b: 'skillLoaded' };
    const judgment = await callResponses({
      apiKey,
      baseUrl: args.baseUrl,
      model: args.judgeModel,
      input: judgePrompt({
        task,
        aOutput: order.a === 'skillLoaded' ? skillLoaded.text : baseline.text,
        bOutput: order.b === 'skillLoaded' ? skillLoaded.text : baseline.text,
      }),
      maxOutputTokens: Math.max(4000, args.maxOutputTokens),
      temperature: 0,
      textFormat: judgmentSchema(task),
      metadata: { runId: args.runId, taskId: task.id, condition: 'judge' },
      maxAttempts: args.maxAttempts,
      retryBaseMs: args.retryBaseMs,
      requestTimeoutMs: args.requestTimeoutMs,
    });
    const judgeFile = await writeOutput(args.outputDir, task.id, 'judge-raw', judgment.text);
    const judgmentJson = coerceJudgment(task, parseModelJson(judgment.text, 'judge'));
    const judgmentA = judgmentJson.a;
    const judgmentB = judgmentJson.b;
    const baselineJudgment = order.a === 'baseline' ? judgmentA : judgmentB;
    const skillJudgment = order.a === 'skillLoaded' ? judgmentA : judgmentB;

    samples.push({
      taskId: task.id,
      skill: task.skill,
      promptSha256: sha256(baselineInput),
      skillContextSha256: sha256(skillContextText({ skillMarkdown, references })),
      skillBodySha256: sha256(skillMarkdown),
      skillReferenceSha256: references.map((ref) => ({ path: ref.path, sha256: sha256(ref.content) })),
      skillLoadedPromptSha256: sha256(skillInput),
      baseline: normalizeRecord(baselineJudgment, baselineFile, baseline),
      skillLoaded: normalizeRecord(skillJudgment, skillFile, skillLoaded),
      preference: preferenceFromWinner(judgmentJson.winner, order),
      blindOrder: { a: 'hidden', b: 'hidden' },
      judgeOutputRef: outputRef(judgeFile),
      judgeOutputSha256: sha256(judgment.text),
      judgeLatencyMs: judgment.latencyMs,
      judgeUsage: judgment.response.usage || null,
    });
    completedTaskIds.add(task.id);
    await checkpoint(true);

    await runMissingTriggerChecks(task, skillDescription);
  }

  const result = await checkpoint(false);
  console.log(`Wrote benchmark result with ${result.samples.length} sample(s) to ${args.out}`);

}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
