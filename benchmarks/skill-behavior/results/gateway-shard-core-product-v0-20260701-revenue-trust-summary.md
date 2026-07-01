# Gateway Shard: Revenue Trust and Entitlements

This shard adds four unique `core-product-v0` tasks covering release freeze controls, subscription price increases, payment webhook/ledger readiness, and cross-platform subscription entitlements. It increases unique suite coverage from 10 to 14 tasks.

It does **not** prove the repository is useful or SOTA. This shard exposed a regression on `subscription-entitlement-review`, so it should be used as benchmark evidence for the next improvement pass.

## Run

- Result file: `gateway-shard-core-product-v0-20260701-revenue-trust.json`
- Raw outputs: `gateway-shard-core-product-v0-20260701-revenue-trust-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Source commit: `0d1ce50626d427cd322c77f2d6ba8fc3dff570fb`
- Source dirty: `false`
- Answer budget: 650 words applied equally to baseline and skill-loaded prompts
- Unique tasks added: 4

## Summary

- Samples: 4
- Unique task coverage in this shard: 4
- Average baseline score: 4.35
- Average skill-loaded score: 4.56
- Average delta: +0.21
- Skill win rate: 75.0%
- Non-regression rate: 75.0%
- Critical failure delta: 0 fewer failures; neither condition had critical failures
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked

## Per-task results

| Task | Skill | Baseline | Skill-loaded | Delta | Interpretation |
| --- | --- | ---: | ---: | ---: | --- |
| `release-freeze-control-001` | `release-freeze-change-control-review` | 4.10 | 4.90 | +0.80 | Strong uplift on release-freeze controls. |
| `subscription-price-increase-retention-001` | `subscription-price-increase-retention-review` | 4.55 | 4.80 | +0.25 | Positive but modest uplift over a strong baseline. |
| `payment-platform-webhook-ledger-001` | `payment-platform-readiness` | 4.20 | 4.30 | +0.10 | Weak uplift; baseline already covered much of the rubric. |
| `subscription-entitlement-cross-platform-001` | `subscription-entitlement-review` | 4.55 | 4.24 | -0.31 | Regression; the skill-loaded answer underperformed the baseline and needs targeted improvement. |

## Useful-claim gates for this shard

| Gate | Status | Evidence |
| --- | --- | --- |
| Sample depth | Fail | Four unique tasks only; repository-level Useful requires 20 unique suite tasks. |
| Win rate | Pass | Skill-loaded output won 3 of 4 tasks. |
| Average delta | Fail | +0.21 is below the +0.50 threshold. |
| Critical failures | Pass | Neither condition had critical failures. |
| Over-trigger | Pass | All positive triggers passed; no negative-control over-triggering. |

## Follow-up

Prioritize `subscription-entitlement-review`. The benchmark showed a real non-regression failure, so the next pass should inspect the raw outputs, improve the skill around cross-platform entitlement source-of-truth, restore flows, grace periods, refund/revocation, and reconciliation, then rerun this task as before/after evidence.
