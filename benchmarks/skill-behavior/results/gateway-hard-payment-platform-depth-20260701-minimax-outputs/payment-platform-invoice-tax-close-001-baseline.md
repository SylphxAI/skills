## Launch Gates (Go/No‑Go)

- All P0/P1 cases pass: invoice finalization, tax calc, proration, dunning, refunds, disputes, RBE export.
- Idempotency proven for every money‑moving endpoint; replay of 10k Stripe events succeeds with zero duplicate ledger entries.
- Parallel‑run vs legacy ≥ 5 business days; per‑invoice variance ≤ $0.01 on subtotal, tax, total.
- Tri‑way recon (Stripe Dashboard ↔ internal ledger ↔ GL export) = 100% on a 1k‑invoice sample.
- Tax engine validated against real invoices from 3 jurisdictions (US, EU, UK) and edge cases (exempt, reverse‑charge, multi‑currency).
- Dunning schedule live with smart retries and entitlement suspension at terminal failure.
- Support correction tool audit‑logged, role‑scoped, dual‑approval on >$1k or tax‑impacting actions.
- Rollback drill executed in staging; RTO ≤ 30 min.

## Ledger Events (append‑only, immutable)

| Event ID | Source | Trigger | Reversal |
|---|---|---|---|
| ENT_ACTIVATED | Billing svc | Plan change effective | ENT_REVERSED |
| ENT_REVERSED | Billing svc | Refund / dispute / chargeback | — |
| INVOICE_ISSUED | Stripe | invoice.created | VOID |
| INVOICE_PAID | Stripe | invoice.payment_succeeded | — |
| INVOICE_FAILED | Stripe | invoice.payment_failed | — |
| PRORATION_ADJUSTED | Billing svc | Upgrade / downgrade | — |
| TAX_CALCULATED | Tax engine | invoice.finalized | TAX_AMENDED |
| TAX_AMENDED | Tax engine | Rate change / correction | — |
| CREDIT_NOTE_ISSUED | Stripe | Refund / correction | VOID |
| REFUND_SETTLED | Stripe | charge.refunded | — |
| DISPUTE_OPENED | Stripe | charge.dispute.created | DISPUTE_CLOSED |
| DISPUTE_CLOSED | Stripe | charge.dispute.closed | — |
| RBE_EXPORTED | RBE job | Monthly close | — |

Each event carries: `event_id` (UUID), `invoice_id`, `customer_id`, `amount_minor` (integer cents), `currency`, `tax_amount`, `fx_rate`, `source_ts`, `ledger_ts`, `idempotency_key`, `actor`. Stripe IDs preserved on every internal record.

## Reconciliation Schedule

- **Hourly (T+0..T+1):** Stripe event ingest health; mismatches auto‑flag.
- **Daily 06:00 UTC:** Invoices (count, total, tax) vs Stripe by currency/status; failed‑payment dunning state vs Stripe; settlement delta vs bank statement.
- **T+3 (week 1 of close):** Full tri‑way recon. Variance > $0.50/invoice blocks close until ticketed.
- **Quarterly:** Tax engine retrospective spot‑check — 5% sample, 100% of high‑value, and any invoice corrected by support.
- **Close‑day cutoff:** 23:59 UTC; RBE export frozen; subsequent events route to next period.

## Support Correction Controls

- Single internal tool `/billing/admin`; **no direct Stripe dashboard writes**.
- `billing.support_l2` role required; `billing.lead` dual‑approval for >$1k, tax‑impacting, dispute withdrawals, or entitlement backdates > 7 days.
- Allowed: reissue invoice, apply credit note, issue refund, void invoice, extend dunning, grant courtesy credit. Disallowed without eng ticket: tax‑rate edits, payout config, dispute submit, plan price changes.
- Every action emits a ledger event + audit log entry (actor, ticket, before/after). Soft delete only; Stripe IDs retained.

## Observability

- **SLOs:** webhook ingest p95 < 30s; EOD recon done by 02:00 UTC; RBE first‑try success > 99%; tax‑calc failure rate < 0.1%.
- **Page on:** ledger/Stripe count delta > 0.5%, settlement variance > $100, webhook lag > 5 min, dispute opened on active sub, tax engine error spike, RBE job failure.
- **Dashboards:** MRR waterfall, dunning funnel, refund/dispute aging, tax liability by jurisdiction, recon exception queue, support‑correction volume.

## Rollback Plan

- **Triggers:** tax miscalc > 1% of invoices, ledger drift unresolvable in 4h, sustained webhook backlog, settlement mismatch > $5k, RBE export failure on close.
- **Procedure:**
  1. `flag.auto_provision=false` — pause new signups.
  2. Flip writes back to `legacy_billing`; keep new stack read‑only.
  3. Continue ingesting Stripe webhooks into queue (do not apply); reconcile against legacy.
  4. Route support corrections through legacy tool.
  5. Declare incident; daily status to Finance + Exec.
- **Data:** dual‑write shim retained 30 days post‑cutover; any straggler events reconcile back to legacy.
- **Exit criteria:** 3 consecutive clean daily recon runs + Finance sign‑off.
