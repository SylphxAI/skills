# Skill Behavior Benchmark

This benchmark exists to answer one question: does loading a skill produce better agent work than the same model answering without the skill?

It is intentionally separate from the existing schema validators. Validators prove that a skill is installable and documented. This benchmark is for behavioral evidence.

## Experimental design

For each benchmark task, run the same model under two paired conditions:

1. **Baseline** — the user prompt only. The model does not receive the target skill body or references.
2. **Skill-loaded** — the same user prompt plus explicit access to the target skill and its linked references.

Judge outputs using the task rubric without revealing which condition produced which output. Randomize answer order before judging. Keep raw outputs, per-criterion scores, critical failures, and trigger checks so results can be audited.

## Metrics

Report at minimum:

- `avgBaselineScore` and `avgSkillScore` on a 0-5 scale.
- `avgDelta` = skill score minus baseline score.
- `skillWinRate` = share of paired tasks where the skill-loaded output scores higher.
- `nonRegressionRate` = share where skill-loaded output scores at least as high as baseline.
- `criticalFailureDelta` = baseline critical failures minus skill critical failures.
- `overTriggerRate` on negative-control prompts.
- token/cost/latency overhead when runners can measure it.

## Public claim threshold

Do not market a skill as proven useful until it has a public result file showing:

- at least 5 positive tasks for that skill or 20 tasks for a benchmark suite;
- `skillWinRate >= 0.70`;
- `avgDelta >= 0.50` on a 0-5 scale;
- no safety or policy regressions;
- negative-control over-trigger rate below 5%.

Before that, call the skill **Preview / unproven** even if it passes repository validation.

## Files

- `tasks/*.json` — task prompts, skill names, expected artifacts, and scoring rubrics.
- `results/*.json` — scored paired runs from a model and judge.
- `scripts/create-benchmark-jobs.mjs` — exports provider-neutral JSONL jobs for baseline, skill-loaded, and negative-control runs.
- `scripts/run-benchmark-openai.mjs` — optional OpenAI Responses API runner that generates raw outputs, blind judge scores, and result JSON.
- `scripts/merge-benchmark-results.mjs` — merges non-overlapping shard result files into a full-suite result.
- `scripts/validate-benchmarks.mjs` — validates task/result file shape and skill references.
- `scripts/summarize-benchmark-results.mjs` — computes score deltas, win rates, trigger rates, answer token/latency overhead, and supported claim tier from result files.

Prepare a run pack:

```bash
npm run benchmark:prepare -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0.jobs.jsonl --run-id <run-id>
```

Prepare or run a shard when the suite is too large for one sitting:

```bash
npm run benchmark:prepare -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0-shard.jobs.jsonl --run-id <run-id> --start 0 --limit 5
npm run benchmark:run:openai -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0-shard.result.json --run-id <run-id> --start 0 --limit 5
```

Use repeated `--task-id` values, or a comma-separated `--task-id`, to rerun failed tasks without changing the suite.
Use `--resume` with the same `--out` path to skip already-scored tasks and continue after a transient gateway failure. The runner checkpoints the result file after every completed task.
Duplicate task reruns are useful for before/after analysis, but they do not increase repository-level sample depth. The summarizer reports duplicate task IDs and blocks claim upgrades for duplicate-containing summaries.

Summarize the current suite after reruns by selecting one current sample per task:

```bash
npm run benchmark:summarize:current -- benchmarks/skill-behavior/results/*.json
```

Current-suite mode prefers clean git provenance, then newest runner completion time, then deterministic run/file order. It excludes superseded reruns from sample depth.
The summary prints SOTA-candidate gates separately, so a Useful result cannot be mistaken for SOTA without multiple-suite depth and shared-task multi-model evidence.

Merge completed shards:

```bash
npm run benchmark:merge -- --out /tmp/core-product-v0.result.json /tmp/core-product-v0-shard-*.json
```

Run a scored OpenAI Responses API benchmark:

```bash
OPENAI_API_KEY=... npm run benchmark:run:openai -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0.result.json --run-id <run-id>
```

Use `--dry-run` first to confirm task count, model, judge model, output path, and expected API calls without sending data to the API.
For long-form tasks, use `--answer-word-limit <n>` to apply the same concise-answer budget to both baseline and skill-loaded prompts. The runner records the limit in result metadata, so budgeted runs stay reproducible and are not mixed silently with unbudgeted runs.

## Result evidence requirements

A result file is accepted only when it includes:

- `runner.name`, `model`, `judge.name`, and `judge.blinded`;
- the benchmark `suite` and task IDs from `tasks/*.json`;
- matching `skill` names for each task;
- baseline and skill-loaded `score`, `criterionScores`, `criticalFailures`, and an output reference (`outputRef`, `outputPath`, or `outputSha256`);
- optional `triggerChecks` for positive and negative-control prompts so over-trigger rate can be reported.

Do not commit a generated result unless raw outputs or output hashes are reviewable and the run configuration is reproducible.
New runner outputs also include `runner.source`, prompt hashes, and skill body/reference hashes so future skill edits do not blur which context produced a historical result.
When available, usage and latency fields are summarized as answer-generation overhead. Judge and trigger-classifier overhead are audit costs, not skill-loaded answer overhead.

## Current suite coverage

`core-product-v0` contains 20 broad paired tasks. `hard-product-v0` adds 5 edge-case tasks for lower-delta, commercially sensitive product workflows. Together, current public results can support a repository-level usefulness claim only when the current-suite summary passes win-rate, average-delta, critical-failure, and over-trigger gates. They do not prove any individual skill useful unless that skill has enough task depth on its own.

When summarizing mixed result files, per-skill depth is not allowed to upgrade the aggregate repository claim. A mixed summary needs 20+ suite samples; a 5+ sample Useful claim applies only when the summarized rows all target the same skill.
