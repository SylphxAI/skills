# Gateway Shard: Marketplace and Operating Controls

This shard adds four unique `core-product-v0` tasks covering marketplace payouts, skill marketplace design, board metrics, and developer quota/credit abuse controls. It increases unique suite coverage from 6 to 10 tasks.

It does **not** prove the repository is useful or SOTA. Repository-level usefulness still requires 20 unique suite tasks plus the win-rate, average-delta, critical-failure, and over-trigger gates.

## Run

- Result file: `gateway-shard-core-product-v0-20260701-marketplace-ops.json`
- Raw outputs: `gateway-shard-core-product-v0-20260701-marketplace-ops-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Source commit: `cd99f36a0d5e334f5a8adfeb0096d55b3a4727bf`
- Source dirty: `false`
- Answer budget: 650 words applied equally to baseline and skill-loaded prompts
- Unique tasks added: 4

## Summary

- Samples: 4
- Unique task coverage in this shard: 4
- Average baseline score: 3.90
- Average skill-loaded score: 4.69
- Average delta: +0.79
- Skill win rate: 75.0%
- Non-regression rate: 100.0%
- Critical failure delta: 3 fewer failures with skill-loaded outputs
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked

## Per-task results

| Task | Skill | Baseline | Skill-loaded | Delta | Interpretation |
| --- | --- | ---: | ---: | ---: | --- |
| `marketplace-payouts-creator-001` | `marketplace-payouts-review` | 4.80 | 4.80 | +0.00 | Tie; baseline was already very strong. Use future harder payout edge cases to test incremental skill value. |
| `skill-marketplace-creator-001` | `skill-marketplace-creator` | 4.50 | 4.75 | +0.25 | Positive but modest uplift; skill improved the answer without removing critical failures because none were present. |
| `board-metrics-operating-001` | `board-metrics-operating-review` | 2.00 | 4.40 | +2.40 | Strong uplift; skill-loaded output removed missing formulas, source-of-truth map, and data-quality failures. |
| `developer-quota-credit-abuse-001` | `developer-quota-credit-abuse-review` | 4.30 | 4.80 | +0.50 | Positive uplift; skill improved quota/credit abuse controls over an already solid baseline. |

## Useful-claim gates for this shard

| Gate | Status | Evidence |
| --- | --- | --- |
| Sample depth | Fail | Four unique tasks only; repository-level Useful requires 20 unique suite tasks. |
| Win rate | Pass | Skill-loaded output won 3 of 4 tasks; the remaining task tied. |
| Average delta | Pass | +0.79 average delta. |
| Critical failures | Pass | Baseline had 3 critical failures; skill-loaded had 0. |
| Over-trigger | Pass | All positive triggers passed; no negative-control over-triggering. |

## Follow-up

The low-uplift marketplace payout and skill-marketplace tasks should be expanded later with harder edge cases. They are not regressions, but the current prompts may be too easy for a strong baseline model to show large incremental skill value.
