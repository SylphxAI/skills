---
name: developer-quota-credit-abuse-review
description: Design and audit developer quota and credit abuse controls for API, AI, compute, storage, marketplace, and sandbox products covering free credits, trial limits, quota ladders, promo codes, account linking, token churn, expensive endpoints, fraud signals, risk-based throttling, appeal paths, cost guardrails, and legitimate developer activation. Use when generous developer programs risk abuse or runaway cost.
---

# Developer Quota Credit Abuse Review

Use this skill to convert developer quota, API credit, free trial, promo credit, AI token abuse, compute/storage abuse, expensive endpoint throttling, multi-accounting, account linking, cost guardrail, and appeal questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify credit sources, quota units, costly operations, developer identity, account linking signals, promo mechanics, trust tiers, abuse signals, support/appeal routes, cost exposure, and activation metrics.
2. Read `references/developer-quota-credit-abuse-patterns.md`.
3. Classify the situation as free trial program, promo-credit campaign, API quota launch, AI token credit, compute/storage sandbox, suspected multi-accounting, expensive endpoint abuse, or legitimate scale-up request.
4. Define quota ladder, credit ledger, trust-tier gating, fraud controls, throttling policy, reviewer queue, appeal path, cost monitoring, developer messaging, and upgrade/graduation path.
5. Produce quota and credit abuse review, state machine, decision table, event schema, control checklist, support policy, and cost/activation monitoring plan.

## Guardrails

- Do not stop abuse by making legitimate developer activation impossible.
- Do not expose exact abuse signals, account-linking logic, or thresholds in developer-facing copy.
- Do not issue credits without a ledger that supports reversals, expiry, attribution, and cost reporting.
- Do not let automated throttles become final high-impact decisions without review and appeal.

## Output format

```text
Developer quota/credit context:
Audience / source of truth / risk boundary:

Quota abuse control plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Credits, quota tiers, costly operations, trust signals, throttles, reviews, appeals, and cost guardrails:
- <trigger> -> <policy, metric, edge case, support note>
```
