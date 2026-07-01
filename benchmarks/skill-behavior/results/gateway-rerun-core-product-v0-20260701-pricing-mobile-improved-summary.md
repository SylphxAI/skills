# Gateway Rerun: Pricing and Mobile Skill Improvements

This rerun measures whether benchmark-driven edits to `saas-subscription-pricing` and `mobile-first-ui-review` improved the two weakest tasks from the previous shard. It is a before/after evidence artifact, not additional unique suite coverage.

It does **not** prove the repository is useful or SOTA. These two task IDs already existed in the prior shard, so repository-level sample depth must use unique task coverage and remains below the 20-task threshold.

## Run

- Result file: `gateway-rerun-core-product-v0-20260701-pricing-mobile-improved.json`
- Raw outputs: `gateway-rerun-core-product-v0-20260701-pricing-mobile-improved-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Source commit: `dd8896fed1af72ca0f414dce7417088cbb7cda1e`
- Source dirty: `false`
- Answer budget: 900 words applied equally to baseline and skill-loaded prompts

## Rerun summary

- Samples: 2
- Average baseline score: 3.85
- Average skill-loaded score: 4.65
- Average delta: +0.80
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 3 fewer failures with skill-loaded outputs
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked
- Claim depth scope: Insufficient; these are duplicate task reruns

## Before/after comparison

| Task | Skill | Previous skill score | New skill score | Previous delta | New delta | Critical failure change |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `subscription-pricing-saas-001` | `saas-subscription-pricing` | 4.10 | 4.70 | +0.20 | +0.70 | Removed missing rollout/grandfathering/comms failure. |
| `mobile-first-permission-onboarding-001` | `mobile-first-ui-review` | 3.90 | 4.60 | +0.30 | +0.90 | Removed missing accessibility guidance failure. |

## Interpretation

The targeted skill edits appear to fix the observed benchmark failures on rerun: both skills improved materially and the rerun judge found zero skill-loaded critical failures. Because this is a duplicate-task rerun, it should be used as skill-iteration evidence, not as new repository-level sample-depth evidence.

Next step: continue the remaining unique `core-product-v0` suite tasks. Use reruns only when a task exposes a concrete skill failure that has been fixed.
