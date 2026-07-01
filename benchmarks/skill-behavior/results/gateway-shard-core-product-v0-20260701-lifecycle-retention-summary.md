# Gateway Shard: Lifecycle Retention and Backup

This shard adds three unique `core-product-v0` tasks covering notification lifecycle strategy, daily reward/streak economy, and customer-data backup/restore. It moves suite coverage from 14 to 17 unique tasks.

It does **not** prove the repository is useful or SOTA. Repository-level usefulness still requires a duplicate-free 20-task summary that passes all claim gates.

## Run

- Result file: `gateway-shard-core-product-v0-20260701-lifecycle-retention.json`
- Raw outputs: `gateway-shard-core-product-v0-20260701-lifecycle-retention-outputs/`
- Model: `openai/gpt-5.5@openai-codex` via `https://api.sylphx.ai/v1`
- Source commit: `abfce3b43725f957067a1900a133be9311d4f3d1`
- Source dirty: `false`
- Answer budget: 650 words applied equally to baseline and skill-loaded prompts
- Unique tasks added: 3

## Summary

- Samples: 3
- Unique task coverage in this shard: 3
- Average baseline score: 4.27
- Average skill-loaded score: 4.87
- Average delta: +0.60
- Skill win rate: 66.7%
- Non-regression rate: 100.0%
- Critical failure delta: 0; neither condition had critical failures
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Benchmarked

## Per-task results

| Task | Skill | Baseline | Skill-loaded | Delta | Interpretation |
| --- | --- | ---: | ---: | ---: | --- |
| `notification-lifecycle-growth-001` | `notification-strategy-review` | 4.70 | 4.70 | +0.00 | Tie; baseline was already very strong. |
| `daily-reward-streak-economy-001` | `daily-reward-and-streak-review` | 3.90 | 4.90 | +1.00 | Strong uplift on economy design and abuse/retention controls. |
| `backup-restore-customer-data-001` | `backup-restore-design` | 4.20 | 5.00 | +0.80 | Strong uplift; skill-loaded reached full rubric score. |

## Follow-up

The notification task should be made harder in a later benchmark revision because the baseline already matched the skill-loaded answer. Keep this shard as valid unique coverage but do not overclaim it as per-skill proof.
