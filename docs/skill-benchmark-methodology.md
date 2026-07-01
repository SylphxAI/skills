# Skill Benchmark Methodology

This document defines how Sylphx Skills proves that a skill is useful. A valid claim must compare agent behavior with and without the skill. Repository validation alone is not proof of usefulness.

## Current proof status

The repository currently has strong **structural proof**:

- every skill has installable `SKILL.md` metadata;
- every skill has references, eval fixtures, behavior examples, registry entries, and catalog pages;
- `npm run check` validates schema, catalog, eval, reference, launch-kit, and benchmark-fixture coverage;
- `npm run verify:install` proves the public install surface.

This is not the same as behavioral proof. A calibration result under `benchmarks/skill-behavior/results/` proves the benchmark pipeline can produce paired behavioral evidence, but it does not prove repository-level usefulness. Until complete suite or per-skill results pass the claim gates, the honest public claim is: **the skills are preview skills with benchmark fixtures and calibration evidence, not proven SOTA skills**.

## Scientific benchmark design

Use a paired experiment.

| Condition | Context given to model | Purpose |
| --- | --- | --- |
| Baseline | User prompt only | Measures what the base model already does. |
| Skill-loaded | Same prompt plus the target skill and linked references | Measures incremental value from the skill. |

Keep the model, temperature, prompt, and tool availability constant. Randomize answer order before judging. Judges should not know whether an answer is baseline or skill-loaded.

## What to measure

### 1. Trigger quality

- Positive trigger recall: the skill should load for benchmark prompts that need it.
- Negative-control precision: the skill should not load for unrelated prompts.
- Over-trigger rate: unrelated prompts that cause the skill to be used.

### 2. Output quality uplift

Score baseline and skill-loaded answers with the same task rubric on a 0-5 scale.

Report:

- average baseline score;
- average skill-loaded score;
- average paired delta;
- skill win rate;
- non-regression rate;
- bootstrap confidence interval for score delta.

### 3. Critical omissions

Count high-impact failures, for example:

- missing rollback/appeal/support path;
- unsafe or deceptive recommendation;
- missing source-of-truth boundary;
- generic answer with no decision table, state model, or concrete artifact;
- hallucinated policy or unsupported legal/security claims.

### 4. Cost and latency overhead

When runners can measure it, record:

- input tokens added by skill body and references;
- output tokens;
- latency;
- model cost;
- whether the quality uplift justifies the context overhead.

## Claim tiers

| Tier | Evidence required | Public wording |
| --- | --- | --- |
| Preview | Installs and passes schema/reference/eval checks | "Preview skill" |
| Benchmarked | Public paired benchmark result exists | "Benchmarked on <suite>" |
| Useful | Win rate >= 70%, avg delta >= 0.50/5, no safety regression | "Improves output on benchmark tasks" |
| SOTA candidate | Multiple suites/models, stable confidence interval, low over-trigger rate | "SOTA candidate" |

Do not call a skill SOTA based on volume, catalog coverage, or a single hand-written example.

## Minimum useful benchmark

A useful benchmark for one skill needs at least:

- 5 positive tasks;
- 5 negative-control prompts;
- rubric criteria with required items and weights;
- baseline and skill-loaded model outputs;
- blind scoring or at least independent scoring;
- public result JSON and summary.

A useful benchmark for the whole repository needs at least:

- 20+ tasks across major categories;
- coverage of UI/design, monetization, distribution, support/trust, developer/marketplace, and skill operations;
- separate results by skill category;
- a public statement of which skills are unproven.

Do not mix these depth rules. A 5+ sample result can support a single-skill claim only when every summarized row targets that skill. Mixed repository summaries need the 20+ suite threshold before the aggregate claim can move beyond Benchmarked.

## How to run the current benchmark fixtures

Validate task and result schema:

```bash
npm run validate:benchmarks
```

Prepare provider-neutral JSONL jobs for a benchmark run:

```bash
npm run benchmark:prepare -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0.jobs.jsonl --run-id <run-id>
```

Shard large runs:

```bash
npm run benchmark:prepare -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0-shard.jobs.jsonl --run-id <run-id> --start 0 --limit 5
npm run benchmark:run:openai -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0-shard.result.json --run-id <run-id> --start 0 --limit 5
```

Use `--task-id <id>` to rerun a specific failed or suspicious task. Multiple task IDs can be repeated or comma-separated.
Use `--resume` with the same output path to continue a shard after a transient provider or gateway failure. The runner writes a checkpoint after each completed task, so a failed full-suite run should not lose already-scored samples.

Merge completed shards:

```bash
npm run benchmark:merge -- --out /tmp/core-product-v0.result.json /tmp/core-product-v0-shard-*.json
```

The merge tool rejects duplicate task IDs so a full-suite summary cannot accidentally double-count a rerun.
The summarizer also reports duplicate task IDs and treats duplicate-containing summaries as claim-blocked. Reruns can prove before/after improvement, but they do not increase sample-depth coverage.

To summarize the current repository state after reruns, select one current sample per task:

```bash
npm run benchmark:summarize:current -- benchmarks/skill-behavior/results/*.json
```

Current-suite mode prefers clean git provenance, then the newest runner completion time, then deterministic run/file order. It excludes superseded reruns from sample depth and filters trigger checks to the selected samples.

Summarize one or more scored runs:

```bash
npm run benchmark:summarize -- benchmarks/skill-behavior/results/*.json
```

Run a scored OpenAI Responses API benchmark when an API key is available:

```bash
OPENAI_API_KEY=... npm run benchmark:run:openai -- benchmarks/skill-behavior/tasks/core-product-v0.json --out /tmp/core-product-v0.result.json --run-id <run-id>
```

Use `--dry-run` before a paid run. The runner records raw baseline and skill-loaded outputs, blind structured judge scores, usage, latency, and optional trigger classifier checks.
For longer tasks that risk provider or gateway timeouts, use `--answer-word-limit <n>` rather than manually shortening only one condition. The same answer budget is injected into both baseline and skill-loaded prompts and recorded under `runner.answerWordLimit`.

The summarizer expects scored result files. It reports the strongest public claim tier supported by the data; it does not upgrade a result to "Useful" unless sample depth, win rate, average delta, critical-failure, and over-trigger gates pass.
When result files include usage and latency metadata, the summary also reports answer-generation token overhead, latency overhead, and score delta per 1k added input tokens. These are not claim gates yet, but they are required context for deciding whether a higher-quality skill is commercially and operationally worth the extra prompt budget.

Valid result files must be audit-grade: they need runner identity, model, blind-judge status, per-criterion scores, critical failures, and output references for both baseline and skill-loaded answers. New runner output also records source metadata plus prompt and skill-context hashes so historical results remain interpretable after a skill changes. A single aggregate score without raw-output traceability is not enough evidence for a usefulness claim.

`core-product-v0` has 20 tasks, so a complete suite result can support a repository-level "Useful" claim only if all other gates pass. It does not prove every individual skill useful; individual skill claims still need at least 5 positive tasks for that skill.

## What this changes in repository strategy

The next high-leverage work is not adding more skills. It is:

1. benchmark the top skills against baseline;
2. demote or mark unproven skills that do not improve output;
3. deepen the highest-demand skills with targeted rules from benchmark failures;
4. delete or merge skills that remain generic after evaluation.
