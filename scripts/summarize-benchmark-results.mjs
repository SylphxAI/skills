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
  const ci = bootstrapMeanDelta(deltas);
  const skillWins = rows.filter((row) => row.skillScore > row.baselineScore).length;
  const nonRegressions = rows.filter((row) => row.skillScore >= row.baselineScore).length;
  const baselineCritical = rows.reduce((sum, row) => sum + row.baselineCriticalFailures, 0);
  const skillCritical = rows.reduce((sum, row) => sum + row.skillCriticalFailures, 0);
  const negativeTriggerChecks = triggerChecks.filter((check) => check.promptType === 'negative-control');
  const overTriggers = negativeTriggerChecks.filter((check) => (check.triggeredSkills || []).includes(check.expectedSkill)).length;

  console.log('# Skill Behavior Benchmark Summary');
  console.log('');
  console.log(`- Samples: ${rows.length}`);
  console.log(`- Average baseline score: ${round(mean(rows.map((row) => row.baselineScore)))}`);
  console.log(`- Average skill-loaded score: ${round(mean(rows.map((row) => row.skillScore)))}`);
  console.log(`- Average delta: ${round(mean(deltas))}${ci ? ` (95% bootstrap CI ${round(ci.low)} to ${round(ci.high)})` : ''}`);
  console.log(`- Skill win rate: ${pct(skillWins / rows.length)}`);
  console.log(`- Non-regression rate: ${pct(nonRegressions / rows.length)}`);
  console.log(`- Critical failure delta: ${baselineCritical - skillCritical} fewer failures with skill-loaded outputs (${baselineCritical} baseline vs ${skillCritical} skill)`);
  console.log(`- Negative-control over-trigger rate: ${negativeTriggerChecks.length ? pct(overTriggers / negativeTriggerChecks.length) : 'not reported'}`);
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
