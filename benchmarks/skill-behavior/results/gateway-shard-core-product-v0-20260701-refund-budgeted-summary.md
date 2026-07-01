# Gateway Shard: Refund Entitlement Support

This is a public shard result for the `refund-and-support-flow-review` skill. It shows that the benchmark runner can execute a longer monetization/support task through the Sylphx Gateway when both baseline and skill-loaded answers receive the same explicit answer budget.

It does **not** prove the skill or repository is useful. This run contains one task, and the average-delta gate is below the Useful threshold. The honest claim tier is **Benchmarked**.

## Run

- Result file: `gateway-shard-core-product-v0-20260701-refund-budgeted.json`
- Raw outputs: `gateway-shard-core-product-v0-20260701-refund-budgeted-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Task: `refund-entitlement-support-001`
- Skill: `refund-and-support-flow-review`
- Answer budget: 900 words applied equally to baseline and skill-loaded prompts

## Summary

- Samples: 1
- Average baseline score: 4.35
- Average skill-loaded score: 4.80
- Average delta: +0.45
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 2 fewer failures with skill-loaded output
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked

## Useful-claim gates

| Gate | Status | Evidence |
| --- | --- | --- |
| Sample depth | Fail | One task only; Useful requires at least 5 positive tasks for one skill or 20 tasks for the suite. |
| Win rate | Pass | Skill-loaded output won the paired comparison. |
| Average delta | Fail | +0.45 is below the +0.50 threshold. |
| Critical failures | Pass | Baseline had 2 critical failures; skill-loaded had 0. |
| Over-trigger | Pass | Positive trigger passed; negative control did not trigger. |

## Interpretation

The skill-loaded answer improved the task by adding a clearer refund state machine and stronger support/taxonomy coverage. The baseline was already strong, so this one-task delta is positive but not enough for a usefulness claim.

Next step: run more refund/support tasks and adjacent negative controls. If the average delta stays below +0.50, improve the skill from the observed failure modes before promoting it beyond Benchmarked.
