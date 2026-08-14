---
name: build-payment-readiness
description: "Build production payments: providers, ledger, webhooks, reconciliation."
---

# Build Payment Readiness

Use this skill to make payments reliable, compliant, supportable, replayable, and product-friendly across app stores, web checkout, wallets, subscriptions, refunds, disputes, promos, and entitlement systems.

## Composition contract

Own provider authority/readback, ingestion, money ledger, entitlement
projection, settlement, reconciliation, and finance-close facts. In particular,
this artifact owns whether a provider-confirmed refund, revocation, dispute, or
chargeback event occurred and how it projects into ledger/entitlement truth.
`../review-domain/references/refund-and-support-flow/` consumes that authority and owns customer
messaging, grace, repayment, restrictions, appeal, and account consequences.

Write the payment readiness record in markdown. Name owners and sources in
prose. Do not add a parallel JSON envelope. Emit payment, entitlement,
refund-authority, support, and finance handoffs without copying sibling facts.

## Workflow

1. Identify payment channel, product type, billing model, provider identifiers, catalog mapping, entitlement semantics, refund/dispute policy, settlement/fee model, support surfaces, and reconciliation owner.
2. Read `references/payment-platform-patterns.md`; load `references/billing-reconciliation-patterns.md` when settlement, finance close, or cross-system reconciliation is in scope. On Sylphx Platform, open `../build-product/references/sylphx-platform-first-policy/references/commerce.md` for the ledger owner map.
3. Map catalog, checkout, receipt/webhook processing, idempotent ledger ingestion, entitlement projection, refund/revoke/dispute handling, support corrections, settlement, and reconciliation.
4. Define provider-specific precedence for Apple IAP, Google Play Billing, Stripe/web checkout, wallets, promo/admin grants, restore purchases, renewals, refunds, chargebacks, and delayed events.
5. Check platform-specific constraints, sandbox/live separation, fallback paths, customer messaging, finance close, and operational rollback.
6. For outages or backlogs, define explicit ingestion states: paused, quarantined, deduplicated, ordered by provider effective time, replaying, projector-repaired, finance-reconciled, and resumed.
7. For invoice/tax/finance-close launches, model invoice, tax, coupon, credit note, refund, dispute, fee, settlement, revenue export, entitlement, dunning, and manual adjustment as separate events with owners and exception queues.
8. For finance close, name numeric tolerances, cadence, owner, source systems, exception queue, and close blocker for every money/tax/settlement/revenue check.
9. Produce payment state model, ledger schema, event precedence rules, reconciliation plan, support tooling, blockers, observability dashboards, rollback controls, and launch checklist.

## Source verification

- Verify current Apple, Google, wallet, processor, tax, invoice, settlement, and dispute requirements from official sources at use.
- Record provider, API/policy version, jurisdiction, access date, and source URL for any requirement that can block money movement or customer access.
- Treat remembered numeric thresholds, fee schedules, review rules, and platform policies as unverified until read back from the authority.

## Path

- Durable value starts from provider confirmation, then ledger, then entitlement.
- Keep payment records, entitlement state, and support cases reconcilable.
- Name refund, cancellation, revocation, dispute, chargeback, grace, retry, restore, promo, and adjustment as separate states.
- Entitlement corrections are new ledger events; replay the projector.
- Customer consequence policy lives in `../review-domain/references/refund-and-support-flow/`. This skill emits refund and entitlement facts there.
- Support corrections are role-gated, reason-coded, expiring, and auditable. Provider truth stays with the provider owner.
- Ship with fee, tax, settlement, invoice, refund, dispute, and entitlement reconciliation.
- Each release gate names fixture, dashboard or alert, rollback or kill-switch, owner, and approval.
- Webhook replay is a named state machine: evidence, order and idempotency, exit, dead-letter, customer impact, incident review.


## Progressive disclosure

- [references/billing-reconciliation-patterns.md](references/billing-reconciliation-patterns.md) — open when needed for depth
- [references/payment-platform-patterns.md](references/payment-platform-patterns.md) — open when needed for depth

## Output format

```text
Payment surfaces:
Billing model:
Authority boundary:

Readiness matrix:
- Catalog:
- Checkout:
- Confirmation and ledger:
- Entitlement projection:
- Refund/revoke/dispute:
- Support/reconciliation:

Payment and entitlement state model:
- <state> -> <provider evidence, internal projection, customer access, support note>

Provider precedence rules:
- <Apple/Google/Stripe/promo/admin/restore event> -> <idempotency key, effective timestamp, ledger event, entitlement effect>

Reconciliation and finance close:
- <money/settlement/tax/fee/entitlement check> -> <source, cadence, owner, exception action>
- Close control table -> check, source systems, cadence, numeric tolerance, owner, exception queue, close blocker
- Explicit close events -> invoice_created / tax_calculated / coupon_applied / credit_note_issued / payment_succeeded_or_failed / refund_or_dispute / fee_recorded / settlement_received / revenue_exported / entitlement_granted_or_revoked / dunning_started_or_exhausted / manual_adjustment

Support-safe correction flow:
- <case> -> lookup keys (account_id, user_id, invoice_id, payment_intent/charge, subscription, entitlement_id, tax document, support_case_id), evidence, allowed action, approval, ledger event, customer message

Webhook outage replay flow:
- Use a table: state, owner, required evidence, ordering/idempotency rule, dead-letter handling, exit gate, customer/support impact
- Include incident review: provider timeline, retry/dead-letter metrics, projector diff, false-revoke/over-grant disposition, finance exceptions, control fix, approval artifact

Blockers:
- <blocker>

Observability and rollback controls:
- <dashboard/alert> -> <signal, threshold, owner, runbook>
- <rollback/kill switch> -> <scope, trigger, customer impact, recovery proof>

Release gates:
- <gate> -> <test fixture, dashboard/alert, rollback or kill switch, owner approval>
```
