# Gateway Rerun: Subscription Entitlement Improvement

This rerun measures whether the benchmark-driven update to `subscription-entitlement-review` fixed the regression found in `subscription-entitlement-cross-platform-001`. It is before/after evidence for one duplicate task, not additional unique suite coverage.

It does **not** prove the repository is useful or SOTA. Repository-level usefulness still requires 20 unique suite tasks and no unresolved non-regression problems.

## Run

- Result file: `gateway-rerun-core-product-v0-20260701-entitlement-improved.json`
- Raw outputs: `gateway-rerun-core-product-v0-20260701-entitlement-improved-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Source commit: `4eb73bd793e6f2f71e27c28373eee62465c6b02e`
- Source dirty: `false`
- Answer budget: 650 words applied equally to baseline and skill-loaded prompts

## Rerun summary

- Samples: 1
- Average baseline score: 4.10
- Average skill-loaded score: 4.90
- Average delta: +0.80
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 0; neither condition had critical failures
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked
- Claim depth scope: Insufficient; this is a duplicate-task rerun

## Before/after comparison

| Task | Previous skill score | New skill score | Previous delta | New delta | Preference change |
| --- | ---: | ---: | ---: | ---: | --- |
| `subscription-entitlement-cross-platform-001` | 4.24 | 4.90 | -0.31 | +0.80 | baseline -> skill |

## Interpretation

The targeted skill update appears to fix the regression. The new judge score credits the skill-loaded answer for explicit channel precedence, conflict scoping, restore/offline rules, detailed audit events, and support diagnostics.

Keep this result as iteration evidence. Do not count it as new repository-level sample-depth coverage because the same task already exists in `gateway-shard-core-product-v0-20260701-revenue-trust.json`.
