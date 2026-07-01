# Gateway Shard: Platform Distribution and Product Analytics

This shard adds the final three unique `core-product-v0` tasks: Steam launch readiness, desktop OS integration, and product analytics instrumentation. Together with the lifecycle shard, the public benchmark corpus now covers all 20 unique tasks.

It does **not** prove the repository is useful or SOTA. This shard exposed a non-regression failure on `desktop-os-integration`, and its average delta is below the Useful threshold.

## Run

- Result file: `gateway-shard-core-product-v0-20260701-platform-analytics.json`
- Raw outputs: `gateway-shard-core-product-v0-20260701-platform-analytics-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Source commit: `5003d234ead9bf2cfc05ea28d36e0a191c7f0b61`
- Source dirty: `false`
- Answer budget: 650 words applied equally to baseline and skill-loaded prompts
- Unique tasks added: 3

## Summary

- Samples: 3
- Unique task coverage in this shard: 3
- Average baseline score: 4.42
- Average skill-loaded score: 4.63
- Average delta: +0.21
- Skill win rate: 66.7%
- Non-regression rate: 66.7%
- Critical failure delta: -1; skill-loaded had one critical failure while baseline had none
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked

## Per-task results

| Task | Skill | Baseline | Skill-loaded | Delta | Interpretation |
| --- | --- | ---: | ---: | ---: | --- |
| `steam-launch-commercial-readiness-001` | `steam-launch-readiness` | 4.44 | 4.69 | +0.25 | Positive but modest uplift over a strong baseline. |
| `desktop-os-integration-release-001` | `desktop-os-integration` | 4.62 | 4.45 | -0.17 | Regression; skill-loaded missed an explicit regression test plan. |
| `product-analytics-revenue-funnel-001` | `product-analytics-instrumentation-review` | 4.19 | 4.74 | +0.55 | Positive uplift and clears the +0.50 per-task delta threshold. |

## Useful-claim gates for this shard

| Gate | Status | Evidence |
| --- | --- | --- |
| Sample depth | Fail | Three unique tasks only; shard-level depth is insufficient. |
| Win rate | Fail | Skill-loaded won 2 of 3 tasks. |
| Average delta | Fail | +0.21 is below the +0.50 threshold. |
| Critical failures | Fail | Skill-loaded introduced one critical failure on desktop OS integration. |
| Over-trigger | Pass | All positive triggers passed; no negative-control over-triggering. |

## Follow-up

Prioritize `desktop-os-integration`. The skill needs stronger regression-test and cross-OS compatibility guidance, then the task should be rerun as before/after evidence.
