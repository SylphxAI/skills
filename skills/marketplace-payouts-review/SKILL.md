---
name: marketplace-payouts-review
description: Design and audit marketplace payout, earnings, fee, revenue share, seller balance, creator payout, refund, chargeback, hold, clawback, split payment, ledger, tax/compliance handoff, payout support, and dispute flows for creator marketplaces, app/plugin stores, gig marketplaces, game marketplaces, affiliate programs, and two-sided platforms. Use when money moves from buyers through the platform to sellers or creators.
---

# Marketplace Payouts Review

Use this skill to make marketplace payouts traceable, fair, supportable, and resilient to refunds or abuse.

## Workflow

1. Identify marketplace type, parties, transaction model, fee model, payout schedule, risk window, and provider constraints.
2. Read `references/marketplace-payout-systems.md`.
3. Map buyer payment, platform fee, seller earnings, pending balance, holds, refunds, disputes, adjustments, payout, and reconciliation.
4. Separate ledger truth, displayed balances, provider state, policy decisions, and support evidence.
5. Define reserve/hold governance: reason codes, release criteria, SLA, owner, evidence, escalation, and appeal path.
6. Cover tax forms, named form/status examples when relevant, tax-form lifecycle states, withholding, statutory reporting handoff, sanctions screening, country eligibility, payout provider constraints, failed transfers, and negative balances.
7. Make payout policy concrete: clearing delay, reserve percent/duration, payout cadence, minimum threshold, supported currencies, provider fees, conversion policy, and fee responsibility.
8. Produce formal payout state machine, fee table, risk controls, compliance readiness matrix, seller dashboard/support workflow, trust metrics, audit invariants, and reconciliation checks.
9. For provider outages, partial payout files, webhook replays, or manual finance workarounds, name operational states explicitly: queued, paused, provider-pending, partially-submitted, failed, retry-blocked, reconciled, released, reversed, and manual-review.

## Guardrails

- Do not treat displayed balance as ledger truth.
- Do not pay out funds that remain within a refund, fraud, chargeback, or delivery-risk window unless risk is explicitly accepted.
- Do not make opaque holds or clawbacks without reason, evidence, and appeal/support path.
- Do not approve global payouts without tax/compliance handoff, provider eligibility constraints, and creator-visible support status.
- Do not give tax or sanctions advice; route jurisdiction, form, withholding, reporting, and sanctions decisions to a qualified owner while still defining product states, evidence, and payout blockers.

## Output format

```text
Marketplace/payout context:
Fee and risk model:
Payout policy:
- Cadence / clearing delay / minimum threshold / currencies / provider fees:

Payout flow:
- <state> -> owner, evidence, user message

Formal state machine:
- <from_state> -> <event> -> <to_state>, ledger effect, audit invariant
- Outage/retry branch when relevant: queued -> paused -> provider-pending/partially-submitted -> failed/retry-blocked/manual-review -> reconciled -> released or reversed

Decision table:
- <scenario> -> balance action, payout action, support action

Seller dashboard and support workflow:
- <seller-visible status> -> explanation, evidence, next action, SLA, support/admin control

Reserve/hold governance:
- <hold/reserve type> -> trigger, scope, release criteria, SLA, owner, appeal/support path

Compliance/provider readiness:
- <tax form / withholding / statutory reporting / sanctions / country / provider constraint> -> product state, payout effect, evidence, support message, qualified-review owner
- Named examples to verify, not legal advice: W-9, W-8BEN, W-8BEN-E, 1099-K, 1042-S, VAT/GST tax ID or local equivalent

Ledger/events:
- <event> with properties

Audit invariants:
- <invariant that must always hold across ledger, balances, provider state, and support evidence>

Open risks:
- <risk> -> mitigation

Trust metrics:
- <creator trust, support load, reversal loss, payout latency, reconciliation health metric>
```
