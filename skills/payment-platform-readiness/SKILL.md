---
name: payment-platform-readiness
description: Prepare payment platform integration for Apple Pay, Google Pay, Google Play Billing, App Store IAP, web checkout, subscriptions, one-time purchases, refunds, restore purchases, receipts, tax, entitlement grants, and support traces. Use when designing or auditing payment flows for apps, games, SaaS, desktop utilities, stores, or marketplaces.
---

# Payment Platform Readiness

Use this skill to make payments reliable, compliant, supportable, replayable, and product-friendly across app stores, web checkout, wallets, subscriptions, refunds, disputes, promos, and entitlement systems.

## Workflow

1. Identify payment channel, product type, billing model, provider identifiers, catalog mapping, entitlement semantics, refund/dispute policy, settlement/fee model, support surfaces, and reconciliation owner.
2. Read `references/payment-platform-patterns.md`; load `references/billing-reconciliation-patterns.md` when settlement, finance close, or cross-system reconciliation is in scope.
3. Map catalog, checkout, receipt/webhook processing, idempotent ledger ingestion, entitlement projection, refund/revoke/dispute handling, support corrections, settlement, and reconciliation.
4. Define provider-specific precedence for Apple IAP, Google Play Billing, Stripe/web checkout, wallets, promo/admin grants, restore purchases, renewals, refunds, chargebacks, and delayed events.
5. Check platform-specific constraints, sandbox/live separation, fallback paths, customer messaging, finance close, and operational rollback.
6. For outages or backlogs, define explicit ingestion states: paused, quarantined, deduplicated, ordered by provider effective time, replaying, projector-repaired, finance-reconciled, and resumed.
7. For invoice/tax/finance-close launches, model invoice, tax, coupon, credit note, refund, dispute, fee, settlement, revenue export, entitlement, dunning, and manual adjustment as separate events with owners and exception queues.
8. For finance close, name numeric tolerances, cadence, owner, source systems, exception queue, and close blocker for every money/tax/settlement/revenue check.
9. Produce payment state model, ledger schema, event precedence rules, reconciliation plan, support tooling, blockers, observability dashboards, rollback controls, and launch checklist.

## When not to use

- Use `saas-subscription-pricing` when the primary decision is packaging, price, value metric, or commercial experimentation.
- Use `marketplace-payouts-review` when the primary authority is seller/creator earnings, holds, reserves, and payout.
- Use `refund-and-support-flow-review` for a refund/chargeback/restore support state machine that does not require redesigning the payment platform.

## Source verification

- Verify current Apple, Google, wallet, processor, tax, invoice, settlement, and dispute requirements from official sources at use.
- Record provider, API/policy version, jurisdiction, access date, and source URL for any requirement that can block money movement or customer access.
- Treat remembered numeric thresholds, fee schedules, review rules, and platform policies as unverified until read back from the authority.

## Guardrails

- Do not grant durable value from client-only confirmation.
- Keep payment records, entitlement state, and support cases reconcilable.
- Do not use payment confusion as retention.
- Do not collapse refund, cancellation, revocation, dispute, chargeback, grace, billing retry, restore, promo, and manual adjustment into one generic state.
- Do not silently edit entitlements; append corrective ledger events and replay the projector.
- Do not let support agents change provider truth. Support corrections must be role-gated, reason-coded, expiring where appropriate, and auditable.
- Do not ship payments without fee, tax, settlement, invoice, refund, dispute, and entitlement reconciliation evidence.
- Do not call release gates complete unless every gate names the fixture, dashboard/alert, rollback or kill-switch path, owner, and approval evidence.
- Do not describe webhook replay as a generic queue drain; every replay state needs required evidence, ordering/idempotency rule, exit gate, dead-letter handling, customer/support impact, and incident-review artifact.

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
