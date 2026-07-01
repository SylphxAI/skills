---
name: subscription-price-increase-retention-review
description: Design and audit subscription price-increase retention programs for SaaS, mobile apps, games, and digital subscriptions covering cohort segmentation, value narrative, grandfathering, save offers, annual-plan migration, cancellation recovery, consent/notice timing, support scripts, refund paths, churn monitoring, revenue lift, fairness, and platform compliance. Use when price changes must protect trust and net revenue.
---

# Subscription Price Increase Retention Review

Use this skill to convert subscription price increase, retention plan, grandfathering, save offer, annual migration, churn risk, consent notice, cancellation recovery, support script, refund path, and price-change experiment questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify affected plans, cohorts, tenure, usage, willingness-to-pay, renewal timing, platform rules, consent/notice requirements, grandfathering choices, save offers, support paths, churn forecast, and guardrail metrics.
2. Read `references/subscription-price-increase-retention-patterns.md`.
3. Classify the situation as broad price increase, cohort-specific increase, grandfathering sunset, annual-plan migration, packaging change, trial-to-paid price change, regional adjustment, or high-risk churn recovery.
4. Define cohort strategy, value narrative, notice timeline, consent path, grandfathering/save-offer policy, cancellation recovery, support macros, refund handling, experiment/holdout plan, and revenue/churn monitoring.
5. Produce subscription price-increase retention review, state machine, decision table, event schema, cohort checklist, support plan, and net-revenue monitoring plan.

## Guardrails

- Do not optimize headline revenue lift while ignoring churn, refunds, support load, trust, or long-term LTV.
- Do not hide price increases in vague lifecycle messaging or make cancellation/recovery paths deceptive.
- Do not use save offers that train customers to threaten churn unless eligibility, fairness, and measurement are explicit.
- Do not assume store-billed and direct-billed subscriptions have identical consent, renewal, or cancellation behavior.

## Output format

```text
Subscription price-increase context:
Audience / source of truth / risk boundary:

Retention and trust plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Cohorts, value narrative, notices, save offers, cancellation recovery, support, refunds, metrics, and guardrails:
- <trigger> -> <policy, metric, edge case, support note>
```
