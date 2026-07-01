import { readFile } from 'node:fs/promises';

function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function pct(value) {
  return Number.isFinite(value) ? `${(value * 100).toFixed(1)}%` : 'n/a';
}

function round(value) {
  return Number(value).toFixed(2);
}

function makeRng(seed = 123456789) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function bootstrapMeanDelta(deltas, iterations = 2000) {
  if (deltas.length < 2) return null;
  const rng = makeRng();
  const estimates = [];
  for (let i = 0; i < iterations; i += 1) {
    let sum = 0;
    for (let j = 0; j < deltas.length; j += 1) {
      sum += deltas[Math.floor(rng() * deltas.length)];
    }
    estimates.push(sum / deltas.length);
  }
  estimates.sort((a, b) => a - b);
  return {
    low: estimates[Math.floor(iterations * 0.025)],
    high: estimates[Math.floor(iterations * 0.975)],
  };
}

function skillRecord(sample) {
  return sample.skillLoaded || sample.skill;
}

function duplicateTaskIds(rows) {
  const counts = new Map();
  for (const row of rows) counts.set(row.taskId, (counts.get(row.taskId) || 0) + 1);
  return [...counts.entries()].filter(([, count]) => count > 1).map(([taskId]) => taskId).sort();
}

function claimAssessment({ rows, triggerChecks, avgDelta, skillWinRate, baselineCritical, skillCritical, ci, duplicateIds }) {
  const skillCounts = new Map();
  const skillTaskIds = new Map();
  const suiteNames = new Set();
  const modelNames = new Set();
  const uniqueTaskIds = new Set();
  for (const row of rows) {
    skillCounts.set(row.skill, (skillCounts.get(row.skill) || 0) + 1);
    if (!skillTaskIds.has(row.skill)) skillTaskIds.set(row.skill, new Set());
    skillTaskIds.get(row.skill).add(row.taskId);
    uniqueTaskIds.add(row.taskId);
    if (row.suite) suiteNames.add(row.suite);
    if (row.model) modelNames.add(row.model);
  }

  const negativeChecks = triggerChecks.filter((check) => check.promptType === 'negative-control');
  const overTriggers = negativeChecks.filter((check) => (check.triggeredSkills || []).includes(check.expectedSkill)).length;
  const overTriggerRate = negativeChecks.length ? overTriggers / negativeChecks.length : null;
  const positiveChecks = triggerChecks.filter((check) => check.promptType === 'positive');
  const positiveHits = positiveChecks.filter((check) => (check.triggeredSkills || []).includes(check.expectedSkill)).length;
  const positiveRecall = positiveChecks.length ? positiveHits / positiveChecks.length : null;

  const singleSkill = skillCounts.size === 1 ? [...skillCounts.keys()][0] : null;
  const hasDuplicates = duplicateIds.length > 0;
  const hasPerSkillDepth = singleSkill && skillTaskIds.get(singleSkill).size >= 5;
  const hasSuiteDepth = uniqueTaskIds.size >= 20;
  const sampleDepthOk = !hasDuplicates && (hasPerSkillDepth || hasSuiteDepth);
  const winRateOk = skillWinRate >= 0.7;
  const deltaOk = avgDelta >= 0.5;
  const criticalOk = skillCritical <= baselineCritical;
  const triggerOk = overTriggerRate !== null && overTriggerRate < 0.05;
  const useful = sampleDepthOk && winRateOk && deltaOk && criticalOk && triggerOk;
  const sotaCandidate = useful && suiteNames.size >= 2 && modelNames.size >= 2 && ci && ci.low > 0;

  return {
    tier: sotaCandidate ? 'SOTA candidate' : useful ? 'Useful' : 'Benchmarked',
    sampleDepthScope: hasDuplicates ? 'duplicate-tasks' : hasSuiteDepth ? 'suite' : hasPerSkillDepth ? `single-skill:${singleSkill}` : 'insufficient',
    uniqueTaskCount: uniqueTaskIds.size,
    duplicateTaskIds: duplicateIds,
    checks: {
      sampleDepthOk,
      winRateOk,
      deltaOk,
      criticalOk,
      triggerOk,
    },
    overTriggerRate,
    positiveRecall,
  };
}

async function main() {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error('Usage: node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/*.json');
    process.exit(1);
  }

  const rows = [];
  const triggerChecks = [];
  for (const file of files) {
    const result = JSON.parse(await readFile(file, 'utf8'));
    for (const sample of result.samples || []) {
      const loaded = skillRecord(sample);
      rows.push({
        file,
        runId: result.runId,
        model: result.model,
        suite: result.suite,
        taskId: sample.taskId,
        skill: sample.skill,
        baselineScore: sample.baseline.score,
        skillScore: loaded.score,
        delta: loaded.score - sample.baseline.score,
        preference: sample.preference,
        baselineCriticalFailures: (sample.baseline.criticalFailures || []).length,
        skillCriticalFailures: (loaded.criticalFailures || []).length,
      });
    }
    for (const check of result.triggerChecks || []) {
      triggerChecks.push(check);
    }
  }

  if (!rows.length) {
    console.error('No scored samples found in result files.');
    process.exit(1);
  }

  const deltas = rows.map((row) => row.delta);
  const duplicates = duplicateTaskIds(rows);
  const ci = bootstrapMeanDelta(deltas);
  const skillWins = rows.filter((row) => row.skillScore > row.baselineScore).length;
  const nonRegressions = rows.filter((row) => row.skillScore >= row.baselineScore).length;
  const baselineCritical = rows.reduce((sum, row) => sum + row.baselineCriticalFailures, 0);
  const skillCritical = rows.reduce((sum, row) => sum + row.skillCriticalFailures, 0);
  const avgDelta = mean(deltas);
  const skillWinRate = skillWins / rows.length;
  const nonRegressionRate = nonRegressions / rows.length;
  const criticalDelta = baselineCritical - skillCritical;
  const assessment = claimAssessment({ rows, triggerChecks, avgDelta, skillWinRate, baselineCritical, skillCritical, ci, duplicateIds: duplicates });

  console.log('# Skill Behavior Benchmark Summary');
  console.log('');
  console.log(`- Samples: ${rows.length}`);
  console.log(`- Unique task coverage: ${assessment.uniqueTaskCount}`);
  if (assessment.duplicateTaskIds.length) console.log(`- Duplicate task IDs: ${assessment.duplicateTaskIds.join(', ')}`);
  console.log(`- Average baseline score: ${round(mean(rows.map((row) => row.baselineScore)))}`);
  console.log(`- Average skill-loaded score: ${round(mean(rows.map((row) => row.skillScore)))}`);
  console.log(`- Average delta: ${round(avgDelta)}${ci ? ` (95% bootstrap CI ${round(ci.low)} to ${round(ci.high)})` : ''}`);
  console.log(`- Skill win rate: ${pct(skillWinRate)}`);
  console.log(`- Non-regression rate: ${pct(nonRegressionRate)}`);
  console.log(`- Critical failure delta: ${criticalDelta} (${baselineCritical} baseline vs ${skillCritical} skill-loaded)`);
  console.log(`- Positive trigger recall: ${assessment.positiveRecall === null ? 'not reported' : pct(assessment.positiveRecall)}`);
  console.log(`- Negative-control over-trigger rate: ${assessment.overTriggerRate === null ? 'not reported' : pct(assessment.overTriggerRate)}`);
  console.log(`- Claim tier supported by this data: ${assessment.tier}`);
  console.log(`- Claim depth scope: ${assessment.sampleDepthScope}`);
  console.log(`- Useful-claim gates: sampleDepth=${assessment.checks.sampleDepthOk ? 'pass' : 'fail'}, winRate=${assessment.checks.winRateOk ? 'pass' : 'fail'}, avgDelta=${assessment.checks.deltaOk ? 'pass' : 'fail'}, criticalFailures=${assessment.checks.criticalOk ? 'pass' : 'fail'}, overTrigger=${assessment.checks.triggerOk ? 'pass' : 'fail'}`);
  console.log('');
  console.log('| Task | Skill | Baseline | Skill-loaded | Delta | Preference |');
  console.log('| --- | --- | ---: | ---: | ---: | --- |');
  for (const row of rows) {
    console.log(`| ${row.taskId} | ${row.skill || ''} | ${round(row.baselineScore)} | ${round(row.skillScore)} | ${round(row.delta)} | ${row.preference} |`);
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
