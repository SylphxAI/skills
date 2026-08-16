---
name: build-payment-readiness
description: Build production payment readiness across checkout, provider events, ledger, entitlements, refunds, disputes, settlement, reconciliation, support, and finance close.
---

# Build Payment Readiness

Create a payment path whose money, access, provider, support, and finance states remain reconcilable.

## Method

1. Define the payment channels, products, billing model, currencies, jurisdictions, provider identifiers, catalog mapping, entitlement rules, refund policy, fee and tax model, and owners.
2. Read current official provider, app-store, wallet, tax, invoice, settlement, and dispute requirements for the selected channels.
3. Model checkout, authorization, capture, receipt or webhook ingestion, ledger entry, entitlement projection, renewal, cancellation, refund, revocation, dispute, chargeback, dunning, and settlement as explicit events.
4. Assign authority and idempotency keys for every provider event and internal projection.
5. Keep the money ledger append-only and derive entitlement, invoice, support, and finance views from owned events.
6. Define provider precedence, effective timestamps, ordering, duplicate handling, replay, quarantine, and dead-letter recovery.
7. Build role-limited support corrections as new reason-coded ledger events with customer communication.
8. Reconcile provider transactions, ledger totals, entitlements, fees, tax documents, invoices, payouts, and revenue exports on a named cadence.
9. Exercise sandbox and production-shaped success, decline, retry, restore, refund, dispute, delayed-event, and outage-replay paths.
10. Assign dashboards, alerts, runbooks, pause controls, exception queues, and finance-close ownership.

Read [Payment platform patterns](references/payment-platform-patterns.md) for channel behavior and [Billing reconciliation patterns](references/billing-reconciliation-patterns.md) for settlement and close design.

## Output

Return the authority map, payment and entitlement state model, event precedence, ledger and projection design, reconciliation controls, support flow, operational checks, and launch blockers.
