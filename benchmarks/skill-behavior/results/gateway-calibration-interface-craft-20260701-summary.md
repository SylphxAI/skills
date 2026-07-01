# Gateway Calibration: Interface Craft Checkout Review

This is a public calibration result for the benchmark pipeline. It proves that the repository can run a paired baseline-vs-skill benchmark through the Sylphx Gateway, store raw outputs, score with a blind judge, and summarize claim gates.

It does **not** prove the `interface-craft` skill or the repository is useful. The sample depth gate fails because this run contains one task.

## Run

- Result file: `gateway-calibration-interface-craft-20260701.json`
- Raw outputs: `gateway-calibration-interface-craft-20260701-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Task: `interface-craft-checkout-review-001`
- Skill: `interface-craft`

## Summary

- Samples: 1
- Average baseline score: 3.80
- Average skill-loaded score: 4.60
- Average delta: +0.80
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 2 fewer failures with skill-loaded output
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked

## Useful-claim gates

| Gate | Status |
| --- | --- |
| Sample depth | Fail |
| Win rate | Pass |
| Average delta | Pass |
| Critical failures | Pass |
| Over-trigger | Pass |

Next step: run the complete 20-task `core-product-v0` suite, or at least 5 positive tasks for an individual skill, before making usefulness claims.
