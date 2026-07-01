<think>
The user is asking for a payment platform readiness review for a SaaS product. They want me to cover: Stripe, Apple Pay, Google Pay, invoices, tax, coupons, asynchronous webhooks, delayed settlement, failed payments, disputes, refunds, entitlement updates, and finance reconciliation. They want the highest-risk launch gates before accepting real customer money.

This is a security/payment infrastructure review request. It's a legitimate business/engineering architecture question. I'll provide a concise, audit-friendly response within 650 words, focused on launch gates.

Let me structure this as a launch gate checklist with risk levels, focusing on the highest-risk items first. I should use tables/lists for audit-friendliness.

Key areas to cover:
1. Idempotency and webhook reliability (async webhook risk)
2. Payment method coverage (Stripe, Apple Pay, Google Pay)
3. Failed payment handling and dunning
4. Refund flow integrity
5. Dispute/chargeback workflow
6. Entitlement sync (the most critical business risk - never give access without confirmed payment)
7. Tax calculation (Stripe Tax) compliance
8. Coupons/promo code edge cases
9. Delayed settlement and reconciliation
10. PCI/scope, data handling
11. Observability and incident response

Highest risk gates for real money:
- Idempotency on all money-moving endpoints
- Webhook signature verification + replay protection
- Webhook handler idempotency (dedupe by event_id)
- Entitlement grant only on confirmed payment (not checkout session creation)
- Failed payment → grace period → entitlement downgrade
- Refund → entitlement revocation logic
- Chargeback notification handling
- Reconciliation job comparing Stripe ledger vs internal ledger
- PCI scope minimization
- Tax calculation on invoice line items
- Coupon stacking/edge cases
- Test cards / 3DS / SCA flows
- Async retries and dead letter handling
- Time-zone and currency handling
- Audit logs for all money movement

Let me write this concisely. Target ~600 words.

Structure:
1. Top launch gates table (highest risk first)
2. Brief notes on each
3. Pre-launch checklist

Let me draft:

**Launch Gates (ordered by risk)**

Gate 1: Webhook correctness
- Signature verification (Stripe-Signature), timestamp tolerance
- Idempotent processing by event.id; persistent dedupe table
- Replay protection; raw body preserved
- 5xx retry handling; DLQ for poison events
- Out-of-order delivery tolerated (e.g., dispute arrives before charge.succeeded?)

Gate 2: Entitlement integrity
- Source of truth = payment provider state, not local DB write
- Grant access only on charge.succeeded / invoice.paid
- Revoke on refund.created, charge.refunded, subscription.deleted
- Reconciliation worker re-checks entitlement vs Stripe every N hours
- Dunning: failed payment → grace period (T+3, T+7) → downgrade
- No trial → paid upgrade edge case

Gate 3: Money movement
- Idempotency-Key on all create operations (charges, refunds, subscriptions)
- Refund: full/partial; metadata linking to original txn
- Partial refunds preserve entitlement proportionally
- Dispute: webhook listened; account flagged; auto-evidence if applicable
- Delayed settlement: ledger reflects authorized vs captured separately

Gate 4: Tax & invoicing
- Stripe Tax enabled for all taxable jurisdictions
- Tax IDs validated (VAT, GST)
- Invoice finalized; sequential numbering preserved; voiding rules
- Refunded invoice credit notes generated

Gate 5: Coupons/promos
- Single-use vs multi-use; customer-restricted correctly applied
- Stacking rules explicit (no double-discount with referral)
- Duration (once/repeating/forever) honored in renewals
- Expiration and redemption caps

Gate 6: Wallet payments (Apple/Google Pay)
- Domain verification file (apple-developer-merchantid-domain-association)
- Merchant ID registered for all production domains
- 3DS/SCA flow tested with test cards
- Fallback to card if wallet declines

Gate 7: Async reliability
- All money-moving endpoints have idempotency
- All webhook handlers are idempotent
- Retry policy: exponential backoff with jitter
- DLQ alerts; replay tool

Gate 8: Reconciliation
- Daily job: Stripe balance vs internal ledger (cents exact)
- Per-subscription state diff (status, period_end, plan)
- Discrepancy alert + on-call runbook
- Finance export: month-end CSV for accounting

Gate 9: Security/compliance
- No PAN stored; use Stripe Elements/Checkout
- API keys in secrets manager; rotated quarterly
- Audit log of all money movement with actor, reason
- PII minimization

Pre-launch go/no-go:
- Synthetic test plan executed end-to-end
- Negative test cases: failed card, 3DS challenge, network timeout, webhook out-of-order, partial refund
- Load test on webhook ingress
- Runbook for: failed payment spike, dispute, refund storm, webhook outage

Let me count words and tighten. I'll aim for under 650.

Actually let me also include a concise table of the top gates with risk/owner/evidence columns to make it audit-friendly.
</think>

# Payment Platform Launch Gates — Real Money Go-Live

Ordered by blast radius if broken. All gates are **must-pass**; deferred items require a risk-acceptance memo with an owner and date.

## Tier 1 — Loss-of-money / loss-of-trust risks (block launch)

| # | Gate | Evidence required |
|---|---|---|
| 1 | **Webhook authenticity + idempotency** — `Stripe-Signature` verified on raw body; every handler dedupes by `event.id`; 5xx retries; DLQ for poison events; out-of-order events tolerated | Replay test, dedupe table, replay runbook |
| 2 | **Entitlement source-of-truth** — access is granted only on `charge.succeeded` / `invoice.paid`, never on Checkout session creation; revoked on `refund.created`, `charge.refunded`, `subscription.deleted`; reconciliation worker re-checks state hourly | End-to-end test with Stripe CLI replay; reconciliation diff report |
| 3 | **Idempotency on every money-moving call** — `Idempotency-Key` on charges, refunds, subscription create/update, invoice finalize; safe to retry | Test matrix of duplicate requests |
| 4 | **Dunning + failed-payment downgrade** — Smart Retries + grace window (recommend 3 retries / 7 days), then entitlement downgrade; customer notified at each step; no silent access loss without notice | Failed-card simulation; downgrade E2E test |
| 5 | **Reconciliation job** — daily Stripe balance vs internal ledger (cents-exact); per-subscription state diff; finance-export CSV; alert on any mismatch | One week of clean daily reports |

## Tier 2 — Regulatory and financial correctness

| # | Gate | Evidence required |
|---|---|---|
| 6 | **Stripe Tax enabled** in all selling jurisdictions; tax IDs validated (VAT/GST); invoices include tax breakdown; credit notes on refund | Test invoice in 2+ jurisdictions |
| 7 | **Refund integrity** — full/partial; partial preserves entitlement proportionally or revokes by policy (documented); refund metadata links to original txn; ledger signed | Partial-refund E2E |
| 8 | **Disputes/chargebacks** — `charge.dispute.*` webhooks consumed; account flagged; evidence submitted per `RADAR`/Verifi rules; finance team notified | Test dispute via Stripe test mode |
| 9 | **Coupons/promos** — single vs multi-use, customer restriction, stacking policy explicit, duration honored across renewals, redemption caps, no double-discount with referrals | Matrix of 6+ edge cases |
| 10 | **Delayed settlement** — authorized vs captured modeled separately; ledger reflects both; reconciles at payout | Auth-then-capture flow test |

## Tier 3 — Coverage and surface area

| # | Gate | Evidence required |
|---|---|---|
| 11 | **Apple Pay** — `apple-developer-merchantid-domain-association` on every prod domain; Merchant ID registered; tested in Safari iOS+macOS | Live wallet test in staging |
| 12 | **Google Pay** — gateway integration reviewed by Google; prod env approval; tested in Chrome | Same |
| 13 | **3DS / SCA** — exemption logic reviewed; challenge flows tested for EEA, India, Brazil | Test cards for each region |

## Cross-cutting (apply to all)

- **Idempotency** at every layer (client, server, provider).
- **Audit log** for every money movement: actor, request id, idempotency key, before/after state, reason.
- **PCI scope**: Stripe Elements/Checkout only; no PAN touches our servers; keys in secret manager, rotated quarterly.
- **Observability**: per-event SLO (handler p99, dedupe hit rate, DLQ depth, recon diff count, refund rate, dispute rate) with alerts.
- **Runbooks**: failed-payment spike, dispute, refund storm, webhook outage, double-charge incident, recon break.

## Pre-launch go/no-go checklist

1. Negative test set passes: failed card, 3DS challenge, network timeout, webhook out-of-order, partial refund, disputed charge, expired coupon, tax-ID invalid.
2. Load test on webhook ingress at 5× expected peak.
3. One full week of clean Tier 1 reconciliation reports in staging mirroring prod.
4. Finance owner sign-off on ledger mapping and month-end export.
5. On-call rota staffed; runbooks rehearsed via game day.
6. Risk register signed by Eng, Finance, Legal, Security with owners and dates.

Any Tier 1 fail or unreviewed Tier 2/3 item = **no-go for real customer money**. Soft launch (capped cohort, kill switch on dashboard) may be used to retire remaining Tier 3 items within 30 days.
