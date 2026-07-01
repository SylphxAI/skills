import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const defaultBaseUrl = 'https://api.openai.com/v1';

function usage() {
  console.error(`Usage: node scripts/run-benchmark-openai.mjs <tasks.json> --out <result.json> [options]\n\nOptions:\n  --run-id <id>              Stable run identifier. Defaults to timestamp.\n  --model <model>            Answer model. Defaults to OPENAI_MODEL or gpt-5.5.\n  --judge-model <model>      Judge/trigger model. Defaults to BENCHMARK_JUDGE_MODEL or --model.\n  --base-url <url>           OpenAI-compatible API base URL. Defaults to https://api.openai.com/v1.\n  --output-dir <dir>         Directory for raw outputs. Defaults to /tmp/skill-benchmark-<run-id>.\n  --temperature <number>     Answer temperature. Defaults to 0.2.\n  --max-output-tokens <n>    Answer token cap. Defaults to 1800.\n  --limit <n>                Run only the first n tasks. Useful for smoke tests.\n  --no-references            Do not include skill reference files in skill-loaded prompts.\n  --skip-trigger-checks      Do not run positive/negative trigger classifier checks.\n  --dry-run                  Validate inputs and print planned calls without contacting the API.\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    model: process.env.OPENAI_MODEL || 'gpt-5.5',
    judgeModel: process.env.BENCHMARK_JUDGE_MODEL,
    baseUrl: process.env.OPENAI_BASE_URL || defaultBaseUrl,
    temperature: 0.2,
    maxOutputTokens: 1800,
    includeReferences: true,
    triggerChecks: true,
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
    else if (arg === '--limit') args.limit = Number(argv[++i]);
    else if (arg === '--no-references') args.includeReferences = false;
    else if (arg === '--skip-trigger-checks') args.triggerChecks = false;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg.startsWith('--')) usage();
    else positional.push(arg);
  }
  if (positional.length !== 1 || !args.out) usage();
  if (!Number.isFinite(args.temperature)) throw new Error('--temperature must be a number');
  if (!Number.isInteger(args.maxOutputTokens) || args.maxOutputTokens < 1) throw new Error('--max-output-tokens must be a positive integer');
  if (args.limit !== undefined && (!Number.isInteger(args.limit) || args.limit < 1)) throw new Error('--limit must be a positive integer');
  args.taskFile = positional[0];
  args.judgeModel ||= args.model;
  args.runId ||= `openai-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  args.outputDir = path.resolve(repoRoot, args.outputDir || path.join('/tmp', `skill-benchmark-${args.runId}`));
  args.out = path.resolve(repoRoot, args.out);
  return args;
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

function skillLoadedPrompt({ task, skillMarkdown, references }) {
  const referenceBlock = references.length
    ? references.map((ref) => `\n### ${ref.path}\n\n${ref.content}`).join('\n')
    : '\nNo reference files included.';
  return `Use the following skill context to answer the user task. Do not mention the benchmark setup.\n\n## Skill: ${task.skill}\n\n${skillMarkdown}\n\n## Skill references\n${referenceBlock}\n\n## User task\n\n${task.prompt}`;
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

function outputRef(file) {
  const rel = path.relative(repoRoot, file);
  return rel.startsWith('..') ? file : rel;
}

async function callResponses({ apiKey, baseUrl, model, input, maxOutputTokens, temperature, textFormat, metadata }) {
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
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/responses`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  const raw = await response.text();
  const latencyMs = Date.now() - startedAt;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { raw };
  }
  if (!response.ok) {
    const message = parsed?.error?.message || raw;
    throw new Error(`OpenAI Responses API failed (${response.status}): ${message}`);
  }
  return { response: parsed, text: outputText(parsed), latencyMs };
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
      rationale: { type: 'string' },
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
  const artifacts = (task.expectedArtifacts || []).map((item) => `- ${item}`).join('\n');
  const failureModes = (task.failureModes || []).map((item) => `- ${item}`).join('\n');
  return `You are judging two anonymized answers to the same benchmark task. Return JSON only. Do not infer which answer used a skill. Score each answer from 0 to 5 using the rubric. Penalize generic advice, missing required artifacts, unsafe policy claims, and unsupported assumptions.\n\n## Task\n${task.prompt}\n\n## Expected artifacts\n${artifacts}\n\n## Failure modes\n${failureModes}\n\n## Rubric\n${rubric}\n\n## Answer A\n${aOutput}\n\n## Answer B\n${bOutput}`;
}

function triggerPrompt({ task, skillDescription, prompt }) {
  return `Decide whether this skill should be used for the user prompt. Return JSON only.\n\n## Skill name\n${task.skill}\n\n## Skill description\n${skillDescription}\n\n## User prompt\n${prompt}\n\nUse shouldTrigger=true only when the skill is directly relevant, not merely adjacent.`;
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
  if (winner === 'tie') return 'tie';
  return order[winner] === 'skillLoaded' ? 'skill' : 'baseline';
}

async function writeOutput(outDir, taskId, condition, text) {
  await mkdir(outDir, { recursive: true });
  const file = path.join(outDir, `${taskId}-${condition}.md`);
  await writeFile(file, `${text.trim()}\n`);
  return file;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const taskPath = path.resolve(repoRoot, args.taskFile);
  const suite = JSON.parse(await readFile(taskPath, 'utf8'));
  const tasks = (suite.tasks || []).slice(0, args.limit || undefined);
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
    answerCalls: tasks.length * 2,
    judgeCalls: tasks.length,
    triggerCheckCalls: args.triggerChecks ? tasks.length * 2 : 0,
    outputDir: args.outputDir,
    out: args.out,
  };

  if (args.dryRun) {
    console.log(JSON.stringify(plan, null, 2));
    return;
  }

  const samples = [];
  const triggerChecks = [];
  const startedAt = new Date().toISOString();

  for (const task of tasks) {
    const skillDir = path.join(repoRoot, 'skills', task.skill);
    const skillMarkdown = await readTextIfExists(path.join(skillDir, 'SKILL.md'));
    if (!skillMarkdown) throw new Error(`Missing SKILL.md for ${task.skill}`);
    const references = args.includeReferences ? await readReferenceFiles(skillDir) : [];
    const skillDescription = extractSkillDescription(skillMarkdown);

    const baseline = await callResponses({
      apiKey,
      baseUrl: args.baseUrl,
      model: args.model,
      input: task.prompt,
      maxOutputTokens: args.maxOutputTokens,
      temperature: args.temperature,
      metadata: { runId: args.runId, taskId: task.id, condition: 'baseline' },
    });
    const skillLoaded = await callResponses({
      apiKey,
      baseUrl: args.baseUrl,
      model: args.model,
      input: skillLoadedPrompt({ task, skillMarkdown, references }),
      maxOutputTokens: args.maxOutputTokens,
      temperature: args.temperature,
      metadata: { runId: args.runId, taskId: task.id, condition: 'skill-loaded' },
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
      maxOutputTokens: 1600,
      temperature: 0,
      textFormat: judgmentSchema(task),
      metadata: { runId: args.runId, taskId: task.id, condition: 'judge' },
    });
    const judgmentJson = JSON.parse(judgment.text);
    const baselineJudgment = order.a === 'baseline' ? judgmentJson.a : judgmentJson.b;
    const skillJudgment = order.a === 'skillLoaded' ? judgmentJson.a : judgmentJson.b;

    samples.push({
      taskId: task.id,
      skill: task.skill,
      baseline: normalizeRecord(baselineJudgment, baselineFile, baseline),
      skillLoaded: normalizeRecord(skillJudgment, skillFile, skillLoaded),
      preference: preferenceFromWinner(judgmentJson.winner, order),
      blindOrder: { a: 'hidden', b: 'hidden' },
      judgeLatencyMs: judgment.latencyMs,
      judgeUsage: judgment.response.usage || null,
    });

    if (args.triggerChecks) {
      for (const [promptType, prompt] of [['positive', task.prompt], ['negative-control', task.negativeControlPrompt]]) {
        const check = await callResponses({
          apiKey,
          baseUrl: args.baseUrl,
          model: args.judgeModel,
          input: triggerPrompt({ task, skillDescription, prompt }),
          maxOutputTokens: 300,
          temperature: 0,
          textFormat: triggerSchema(),
          metadata: { runId: args.runId, taskId: task.id, condition: `trigger-${promptType}` },
        });
        const parsed = JSON.parse(check.text);
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
      }
    }
  }

  const completedAt = new Date().toISOString();
  const result = {
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
      includeReferences: args.includeReferences,
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

  await mkdir(path.dirname(path.resolve(repoRoot, args.out)), { recursive: true });
  await writeFile(path.resolve(repoRoot, args.out), `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Wrote benchmark result with ${samples.length} sample(s) to ${args.out}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
