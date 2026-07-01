# developer-quota-credit-abuse-review behavior example

skill: developer-quota-credit-abuse-review

## Positive prompt

> Review developer quota and credit abuse controls for an API/AI platform with free trial credits, promo codes, token usage, expensive endpoints, multi-accounting, trust tiers, throttling, manual review, appeals, support messaging, and cost guardrails.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines quota units, credit ledger, trust tiers, costly operations, abuse signals, throttling actions, review queues, appeals, developer messaging, upgrade path, cost monitoring, and feedback loops.
- Separates trial credits, promo credits, API quotas, AI token usage, compute/storage, expensive endpoints, multi-accounting, manual review, legitimate scale-up, and appeal paths.
- Defines explicit activation, conversion, cost, abuse-loss, false-positive, appeal, support-load, exception-health, and developer-retention metrics.
- Flags ledger gaps, exposed thresholds, activation-killing friction, automated final actions, promo cycling, cost runaway, false positives, weak appeals, and unmeasured developer harm.
- Avoids inventing or revealing exact abuse thresholds, risk cutoffs, cluster counts, spend caps, percentage triggers, and SLA-hour targets unless supplied by an authorized internal source.

It should also produce the artifact shape requested by `skills/developer-quota-credit-abuse-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review contract amendment approvals.

The skill should not load for this prompt unless the user adds an explicit developer-quota-credit-abuse-review context.

## Expected behavior

- Defines quota units, credit ledger, trust tiers, costly operations, abuse signals, throttling actions, review queues, appeals, developer messaging, upgrade path, cost monitoring, and feedback loops.
- Separates trial credits, promo credits, API quotas, AI token usage, compute/storage, expensive endpoints, multi-accounting, manual review, legitimate scale-up, and appeal paths.
- Defines explicit activation, conversion, cost, abuse-loss, false-positive, appeal, support-load, exception-health, and developer-retention metrics.
- Flags ledger gaps, exposed thresholds, activation-killing friction, automated final actions, promo cycling, cost runaway, false positives, weak appeals, and unmeasured developer harm.
- Avoids inventing or revealing exact abuse thresholds, risk cutoffs, cluster counts, spend caps, percentage triggers, and SLA-hour targets unless supplied by an authorized internal source.
