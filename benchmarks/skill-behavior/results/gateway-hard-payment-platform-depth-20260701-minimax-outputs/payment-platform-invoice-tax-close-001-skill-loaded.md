```
Payment surfaces: Stripe Checkout/Invoices, card, ACH/SEPA, tax (Stripe Tax), coupons, Customer Portal, hosted invoices, webhook + polling reconciliation, revenue export, support console.
Billing model: Per-seat SaaS subscriptions with usage metered components; monthly/annual terms; mid-cycle upgrades/downgrades with proration; multi-currency; tax-exempt B2B flow.
Authority boundary: Stripe events = money truth; entitlements = derived projection from ledger; support = role-gated adjustment only, never mutates Stripe payloads.
```

```text
Readiness matrix:
- Catalog: Stripe Prices/Products tied to internal plan_id + entitlement_id; regions, tax behavior, currency, proration mode declared per price.
- Checkout: Stripe Tax on/off per region, invoice email, Customer Portal enabled, payment method update + dunning copy verified, bank-transfer SLAs documented.
- Confirmation: signed webhooks via durable queue; idempotency on (event.id, invoice.id, charge.id, subscription.id); Stripe object poller hourly as backstop.
- Entitlement projection: append-only ledger → projector rebuilds active/grace/dunning/revoked per (account_id, entitlement_id); projection_version stored.
- Refund/revoke/dispute: refund+dispute ledger events drive access recompute; partial refund leaves access; full refund shortens paid-through; chargeback → manual_review.
- Support: lookup by account, invoice, sub, payment_intent, charge, credit_note, support_case; correction = ledger event only.
```

```text
Payment and entitlement state model:
- trialing → payment_pending → active → dunning → grace → past_due → suspended → revoked_or_canceled
- refund_requested → refund_completed → access_shortened
- dispute_opened → manual_review → dispute_won|lost → access_reinstated|revoked
- tax_pending → tax_calculated → invoice_finalized
```

```text
Ledger events (append-only): invoice_created, tax_calculated, coupon_applied, payment_succeeded, payment_failed, dunning_started, refund_issued, dispute_opened, dispute_closed, credit_note_issued, fee_recorded, settlement_received, revenue_exported, entitlement_granted, entitlement_revoked, manual_adjustment.
Each: provider_event_id, idempotency_key, effective_at, received_at, processed_at, raw_payload_hash, projection_version, actor, reason_code, source_case_id.
```

```text
Reconciliation and finance close (close-blockers enforced):
- Invoice→ledger: daily + close; tol 0; owner billing-ops; blocker = paid invoice without ledger event.
- Tax: Stripe Tax report vs invoice lines; tol 0 unowned; tax owner; blocker = mismatched jurisdiction/rate.
- Settlement/fees: payout vs invoices–refunds–disputes–fees; tol = FX rounding only; finance/treasury; blocker = unexplained shortfall >$50 or ≥0.1%.
- Refunds/disputes/credit notes: 0 unmatched; finance/support; blocker = any unmatched.
- Entitlement exposure: hourly launch, daily steady; 0 paid-no-access, 0 unpaid-active outside grace SLO; entitlement owner; blocker = stale access.
- Revenue export: close; export total = approved ledger total ± $1; controller; blocker = unapproved delta.
- Bank-transfer aging: open invoices 7/14/30d cadence; owner AR; blocker = no dunning progression.
```

```text
Support correction flow: required actor, reason_code, approval (L1/L2), expiry, source_case_id, customer-visible note. Allowed: re-send invoice, apply manual credit (credit_note_issued), extend due date (invoice_updated), temporary grace (manual_adjustment with expiry), retry failed payment. Forbidden: editing Stripe payload, deleting ledger events, lifting dispute without evidence.
```

```text
Webhook outage replay states: ingestion_paused → events_quarantined → events_deduplicated (Stripe event.id, invoice.charge IDs) → events_ordered (effective_at within customer) → ledger_replaying (compensating append) → projector_repaired (rebuild from zero, diff before/after) → finance_reconciled → resumed. Customer messaging: "Payment being verified" not "failed" until Stripe evidence.
```

```text
Observability & rollback: dashboards = webhook lag, duplicate rate, DLQ depth, grant latency, mismatch count, refund-to-revoke p95, dispute-to-review p95, restore failure, settlement mismatch, tax mismatch, false-revoke tickets. Thresholds with on-call owners listed. Kill switches: provider kill (pause new grants), projector rollback (pin prev version), auto-revoke pause, promo kill, support grace (expiring temp access), customer notice banner.
```

```text
Release gates (fixture → dashboard/alert → rollback/kill → owner → approval):
1. Card success + ACH/SEPA success → grant latency ≤60s + mismatch=0 → provider kill → payments on-call → sign-off.
2. Upgrade/downgrade proration → invoice & ledger match → projector rollback → payments lead → sign-off.
3. Tax calc + invoice finalize → tax report match → kill new invoice → tax owner → sign-off.
4. Coupon overlap (paid+coupon) → discount approved → promo kill → growth+finance → sign-off.
5. Failed payment → dunning → grace → suspend → dunning latency p95 → auto-revoke pause → billing ops → sign-off.
6. Full/partial refund, dispute opened/closed → access recompute → refund-to-revoke dashboard → manual_review → support+finance → sign-off.
7. Credit note (manual + auto) → revenue export tie → block finance signoff → controller → sign-off.
8. Webhook outage backlog + projector rebuild from zero → DLQ depth, projector diff → projector rollback, kill → payments on-call + incident review → sign-off.
9. Idempotency/out-of-order/duplicate events → duplicate rate → no-op path → n/a → payments on-call → sign-off.
10. Support correction w/ & w/o approval → adjustment count, missing-approval alerts → revoke override, ledger audit → support lead + SOX → sign-off.
11. Bank-transfer SLA aging → dunning progression → dunning pause → AR → sign-off.
12. Month-close dry run (full reconciliation) → all close checks green, exceptions owned → block close → controller + payments lead → sign-off.

Blockers: tax owner not assigned; bank-transfer aging owner not assigned; close tolerance thresholds not numerically signed; on-call rotation not pagable; Stripe sandbox credentials not isolated from live.
```
