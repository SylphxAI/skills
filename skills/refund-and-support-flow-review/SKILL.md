---
name: refund-and-support-flow-review
description: Design and audit refund, cancellation, chargeback, dispute, entitlement revocation, repurchase, appeal, and customer support flows for SaaS, mobile apps, games, utilities, marketplaces, and subscriptions. Use when handling refund policy, abuse ladders, support macros, account restrictions, trust recovery, or post-refund product access.
---

# Refund And Support Flow Review

Use this skill to handle refunds without damaging trust or letting abuse break the product.

## Workflow

1. Identify purchase type, provider/store, entitlement type, refund authority, and support ownership.
2. Read `references/refund-support-flow-patterns.md`.
3. Map provider-specific signals, refund detection, entitlement source of truth, entitlement adjustment, user messaging, support triage, appeal, and abuse review.
4. Separate ordinary refunds, goodwill refunds, fraud, chargebacks, and repeated abuse.
5. Define abuse scoring, false-positive controls, support dashboards, metrics, and approval thresholds before account restrictions.
6. Produce a provider table, state machine, decision table, support macros, event schema, and risk ladder.

## Guardrails

- Do not auto-ban after a normal refund.
- Do not coerce repurchase with threats.
- Keep immutable ledger evidence for support and audit.
- Do not collapse Apple, Google, Stripe, chargebacks, and internal goodwill into one policy.
- Do not revoke durable access without a server-side entitlement truth source and reversible audit trail.

## Output format

```text
Purchase/refund context:
Authority:

Provider table:
- <provider/channel> -> signal, authority, dedupe key, refund state, entitlement action

Entitlement state machine:
- <from_state> -> <event> -> <to_state>, grace/hold timing, audit evidence

Decision table:
- <scenario> -> entitlement action, account action, support action

Abuse and trust ladder:
- <score/tier> -> evidence, action, approval, appeal path, false-positive guard

Support macros/events:
- <macro or event>

Metrics/dashboard:
- <metric/event> -> owner, decision it supports
```
