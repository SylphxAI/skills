# Gateway Shard: Growth, Pricing, Mobile, and App Store

This is a public shard result for four high-demand product operating skills: promotion planning, SaaS pricing, mobile onboarding UI, and App Store launch readiness. It uses the same paired baseline-vs-skill method as the other benchmark results and applies the same 900-word answer budget to both baseline and skill-loaded prompts.

It does **not** prove the repository is useful or SOTA. The aggregate result is still below the 20-sample suite-depth threshold, and the lower-delta tasks identify improvement work for individual skills.

## Run

- Result file: `gateway-shard-core-product-v0-20260701-growth-pricing-mobile.json`
- Raw outputs: `gateway-shard-core-product-v0-20260701-growth-pricing-mobile-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Tasks: 4
- Answer budget: 900 words applied equally to baseline and skill-loaded prompts

## Summary

- Samples: 4
- Average baseline score: 3.94
- Average skill-loaded score: 4.46
- Average delta: +0.53
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 3 fewer failures with skill-loaded outputs
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked
- Claim depth scope: Insufficient for repository-level Useful claim

## Per-task results

| Task | Skill | Baseline | Skill-loaded | Delta | Interpretation |
| --- | --- | ---: | ---: | ---: | --- |
| `promotion-campaign-subscription-001` | `promotion-campaign-review` | 3.75 | 4.95 | +1.20 | Strong uplift; skill removed the observed critical failures. |
| `subscription-pricing-saas-001` | `saas-subscription-pricing` | 3.90 | 4.10 | +0.20 | Weak uplift; both answers missed an explicit experiment, grandfathering, and communications rollout plan. |
| `mobile-first-permission-onboarding-001` | `mobile-first-ui-review` | 3.60 | 3.90 | +0.30 | Weak uplift; skill-loaded output improved ergonomics but still missed explicit accessibility detail. |
| `app-store-launch-readiness-001` | `app-store-distribution-readiness` | 4.50 | 4.90 | +0.40 | Positive but modest uplift because the baseline was already strong. |

## Useful-claim gates

| Gate | Status | Evidence |
| --- | --- | --- |
| Sample depth | Fail | Four tasks only; mixed repository summaries need 20+ suite samples. |
| Win rate | Pass | Skill-loaded output won all four paired comparisons. |
| Average delta | Pass | +0.53 average delta across this shard. |
| Critical failures | Pass | Baseline had 5 critical failures; skill-loaded had 2. |
| Over-trigger | Pass | All positive triggers passed; no negative-control over-triggering. |

## Follow-up

Use the observed failures to improve `saas-subscription-pricing` and `mobile-first-ui-review`, then rerun those tasks. Do not promote the repository beyond Benchmarked until the full suite or a valid single-skill 5-task result passes the claim gates.
