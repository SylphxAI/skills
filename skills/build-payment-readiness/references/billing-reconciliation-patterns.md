# Billing Reconciliation Patterns

## Billing reconciliation state machine

```text
order_created -> payment_authorized -> payment_captured -> ledger_posted -> entitlement_granted -> invoice_issued -> settled
       |                 |                  |                |                   |
       v                 v                  v                v                   v
payment_failed     capture_failed    ledger_mismatch   entitlement_mismatch  refund_or_dispute
```

Refund/dispute path: `refund_or_dispute -> ledger_adjusted -> entitlement_adjusted -> customer_notified -> support_closed`.

## Operating principles

- Define the authoritative ledger and derived read models before reconciling.
- Use stable correlation keys: customer, order, invoice, provider transaction, entitlement, refund, payout.
- Separate order state, payment state, invoice state, ledger entry, entitlement state, tax record, and payout state.
- Money movement and access changes must be idempotent and auditable.
- Exceptions need severity by money risk, access risk, customer impact, and accounting impact.
- App store receipts, web payments, manual invoices, credits, and marketplace payouts need channel-specific handling.
- Refunds, chargebacks, disputes, failed renewals, and partial captures must update both ledger and entitlement projections.
- Support needs a single timeline, not raw provider dashboards only.
- Automated repair must record before/after state and preserve exactly-once credits.
- Reconciliation metrics should track exception rate, age, money at risk, access at risk, repair success, and repeat causes.

## Decision table

| Mismatch | User impact | Repair action | Audit evidence |
| --- | --- | --- | --- |
| Payment captured, no ledger entry | Possible accounting gap | Replay ledger posting | Provider txn and idempotency key |
| Ledger paid, entitlement missing | User blocked | Rebuild entitlement projection | Order, ledger, entitlement event |
| Refund detected, access still active | Revenue/access mismatch | Adjust entitlement by policy | Refund event and access decision |
| Chargeback pending | Dispute risk | Limit commerce or access by policy | Dispute case and notice |
| Payout balance mismatch | Creator trust risk | Recompute payout ledger | Sales, fees, refunds, payouts |
| Tax/invoice mismatch | Compliance/accounting risk | Route to finance/legal owner | Invoice, tax rate, jurisdiction |

## Reconciliation checks

- Every money event has idempotency key, provider reference, ledger entry, and status.
- Entitlements derive from durable commerce events, not UI assumptions.
- Exception queue includes severity, owner, SLA, repair action, and customer copy.
- Admin/support view shows order, invoice, payment, refund, dispute, entitlement, and messages in one timeline.
- Metrics surface aged mismatches and repeated root causes.

## Event schema

Track: `billing_order_created`, `payment_authorized`, `payment_captured`, `ledger_entry_posted`, `entitlement_granted_from_billing`, `invoice_issued`, `refund_detected`, `chargeback_opened`, `billing_reconciliation_mismatch_found`, `billing_reconciliation_repair_applied`, `billing_exception_closed`.

Minimum properties: customer, account, provider, order ID, invoice ID, transaction ID, ledger entry ID, entitlement ID, amount, currency, tax class, mismatch class, owner, repair action, and audit ID.
