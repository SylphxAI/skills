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
