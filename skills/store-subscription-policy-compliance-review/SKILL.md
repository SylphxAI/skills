---
name: store-subscription-policy-compliance-review
description: Design and audit App Store, Google Play, Microsoft Store, and marketplace subscription policy compliance covering paywalls, pricing, trials, intro offers, renewal disclosures, cancellation, restore purchase, entitlement access, refunds, family sharing, screenshots, metadata, receipt validation, server notifications, price changes, grace periods, and review evidence. Use when mobile or store-distributed subscriptions risk rejection or customer harm.
---

# Store Subscription Policy Compliance Review

Use this skill to convert store subscription policy, app subscription compliance, IAP review, trial disclosure, cancellation flow, restore purchase, entitlement, and store rejection-prevention questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify store, subscription product, paywall copy, price/trial terms, entitlement behavior, cancellation/restore path, metadata/screenshots, receipt/server notification flow, and review evidence.
2. Read `references/store-subscription-policy-compliance-patterns.md`.
3. Classify the situation as new subscription launch, price change, intro offer, trial change, renewal disclosure, entitlement bug, restore issue, refund/grace period issue, metadata mismatch, or review rejection risk.
4. Define policy checklist, paywall requirements, entitlement tests, receipt validation, restore/cancel evidence, metadata alignment, reviewer notes, support readiness, and monitoring.
5. Produce subscription compliance plan, state machine, decision table, event schema, store checklist, reviewer evidence pack, and support handoff.

## Guardrails

- Do not launch subscription paywalls with unclear price, billing period, trial, renewal, cancellation, or entitlement terms.
- Do not rely only on client state for subscription entitlements, refunds, renewals, or grace periods.
- Do not mismatch store metadata, screenshots, privacy labels, product IDs, and in-app paywall behavior.
- Do not hide cancellation, restore purchase, or refund expectations from users or reviewers.

## Output format

```text
Store subscription context:
Audience / source of truth / risk boundary:

Subscription compliance plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Paywall, products, entitlements, restore/cancel, metadata, reviewer evidence, and support:
- <trigger> -> <policy, metric, edge case, support note>
```
