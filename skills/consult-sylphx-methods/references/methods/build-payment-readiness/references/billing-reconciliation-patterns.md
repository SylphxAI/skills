# Billing Reconciliation Patterns

## Billing reconciliation state machine

```text
order_created -> payment_authorized -> payment_captured -> ledger_posted -> entitlement_granted -> invoice_issued -> settled
       |                 |                  |                |                   |
       v                 v                  v                v                   v
payment_failed     capture_failed    ledger_mismatch   entitlement_mismatch  refund_or_dispute
```

Refund/dispute path: `refund_or_dispute -> ledger_adjusted -> entitlement_adjusted -> customer_notified -> support_closed`.

## Rule IDs

- `billing-recon-1` — Define the authoritative ledger and derived read models before reconciling.
- `billing-recon-2` — Use stable correlation keys: customer, order, invoice, provider transaction, entitlement, refund, payout.
- `billing-recon-3` — Separate order state, payment state, invoice state, ledger entry, entitlement state, tax record, and payout state.
- `billing-recon-4` — Money movement and access changes must be idempotent and auditable.
- `billing-recon-5` — Exceptions need severity by money risk, access risk, customer impact, and accounting impact.
- `billing-recon-6` — App store receipts, web payments, manual invoices, credits, and marketplace payouts need channel-specific handling.
- `billing-recon-7` — Refunds, chargebacks, disputes, failed renewals, and partial captures must update both ledger and entitlement projections.
- `billing-recon-8` — Support needs a single timeline, not raw provider dashboards only.
- `billing-recon-9` — Automated repair must leave before/after evidence and avoid double credits.
- `billing-recon-10` — Reconciliation metrics should track exception rate, age, money at risk, access at risk, repair success, and repeat causes.

## Decision table

| Mismatch | User impact | Repair action | Audit evidence |
| --- | --- | --- | --- |
| Payment captured, no ledger entry | Possible accounting gap | Replay ledger posting | Provider txn and idempotency key |
| Ledger paid, entitlement missing | User blocked | Rebuild entitlement projection | Order, ledger, entitlement event |
| Refund detected, access still active | Revenue/access mismatch | Adjust entitlement by policy | Refund event and access decision |
| Chargeback pending | Dispute risk | Limit commerce or access by policy | Dispute case and notice |
| Payout balance mismatch | Creator trust risk | Recompute payout ledger | Sales, fees, refunds, payouts |
| Tax/invoice mismatch | Compliance/accounting risk | Route to finance/legal owner | Invoice, tax rate, jurisdiction |

## Reconciliation checklist

- Every money event has idempotency key, provider reference, ledger entry, and status.
- Entitlements derive from durable commerce events, not UI assumptions.
- Exception queue includes severity, owner, SLA, repair action, and customer copy.
- Admin/support view shows order, invoice, payment, refund, dispute, entitlement, and messages in one timeline.
- Metrics surface aged mismatches and repeated root causes.

## Event schema

Track: `billing_order_created`, `payment_authorized`, `payment_captured`, `ledger_entry_posted`, `entitlement_granted_from_billing`, `invoice_issued`, `refund_detected`, `chargeback_opened`, `billing_reconciliation_mismatch_found`, `billing_reconciliation_repair_applied`, `billing_exception_closed`.

Minimum properties: customer, account, provider, order ID, invoice ID, transaction ID, ledger entry ID, entitlement ID, amount, currency, tax class, mismatch class, owner, repair action, and audit ID.
