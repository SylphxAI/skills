```text
Recommended model:
Hybrid tiered + usage-based. Free trial → Team (seat-based with usage allowance) → Business → Enterprise (committed usage with negotiated seat tiers). Analytics products need hybrid because seat cost (licensing/admin) and event/row cost (compute) scale differently.

Value metric:
Per-seat licenses (editors/viewers) + metered data rows queried / dashboards refreshed. Seat = admin/collaboration value metric; rows = customer value metric.

Plan architecture:
- Free/trial: 14-day trial, full Team features, capped at 5 seats and 100K rows/period, watermarked exports, no SSO.
- Core paid (Team): $49/editor-seat/mo, $15/viewer-seat/mo, minimum 3 paid editor seats, includes 500K rows/mo, dashboards, alerts, email support, public docs.
- Team/Business: $79/editor-seat/mo, minimum 10 paid editor seats, includes 2M rows/mo, scheduled reports, role-based access, audit log, in-product support, SLA 99.9%, optional SAML add-on.
- Enterprise: Negotiated annual, committed seat band + committed row band, SSO/SCIM, DPA/MSA, audit export, dedicated CSM, SLA 99.95%, custom DPAs, security review.
- Usage and overages: Overage metered at $X per 100K rows after 80% / 90% / 100% alerts; hard throttle at 120% unless prepay pack or enterprise true-up applies.
- Procurement: PO/invoice, NET-30, tax handling, DPA/MSA, security review checklist, procurement contact form; Business+ only.
- Support and sales enablement: L1 email all paid; L2 chat Business+; named CSM Enterprise. Approved save offers, discount authority bands, escalation to finance/legal before terms move.

Upgrade moments:
- Triggered at 80% usage alert with in-product upsell to prepaid row pack or Business tier.
- Editor seat count crossing Business minimum (10) prompts sales-assist.
- SSO/SAML/DPA request routes to Enterprise.
- Annual renewal preview shows tier comparison and discount.

Cancellation/downgrade:
- Self-serve cancel inside account; effective end-of-period; no pro-rata refund on monthly.
- Annual contracts: cancel at renewal boundary; refund per contract; data export window 30 days; then read-only 60 days, then delete.
- Downgrade shows exact loss of features, seats, included rows, and audit log retention before confirm.
- Win-back: 30/60/90 day email with one-time 20% off 3-month offer (capped, logged in CRM).

Metrics:
pricing_page_viewed → pricing_experiment_assigned → plan_compared → trial_started → checkout_started → subscription_started → upgrade_clicked → upgrade_completed → downgrade_started → cancellation_started → cancellation_completed → winback_offer_shown → winback_accepted → pricing_notice_seen → pricing_notice_acknowledged → pricing_migration_started → pricing_migration_completed.

Unit economics:
- Gross margin target: 75–80% blended; 82%+ on seat revenue.
- Marginal cost driver: warehouse compute per 100K rows scanned.
- Overage floor: price ≥ marginal cost / (1 − target margin) including burst + support load.
- CAC payback target: ≤ 12 months blended; ≤ 9 months for self-serve Team.
- NRR target: 115% (logo retention ≥ 92%, seat expansion ≥ 8%, price escalator at renewal on Enterprise).
- Cost and abuse controls: per-tenant row cap, query timeout, export rate limit, anomaly alert on row spikes, refuse unverified self-serve >2× included.

Pricing arithmetic:
- Seat minimums / included seats: Team min 3 paid editors; no bundled "included editors." Business min 10 paid editors. Viewers billed separately at $15. No "20 seats included with X seat price" pattern.
- Included usage and overage rate: Team 500K rows included, metered in 100K units, three-tier overage (first 1M, next 4M, above). Overage auto-throttles at 120% unless prepaid pack applied. Discount-adjusted overage floor held.
- Annual discount and contract term: 16% annual prepay (2 months free), shown as monthly equivalent and total invoice; multi-year at 22% only with finance approval and documented support cost.
- Margin sanity check: marginal cost per 100K rows, required overage price at target GM, proposed rate, and discount-adjusted floor all named before publish.

Experiment/rollout plan:
- Test design: A/B new pricing page on inbound traffic; holdout 20%; primary metric trial→paid conversion; guardrails refund rate, support tickets/seat, gross margin.
- Grandfathering/migration: existing monthly Team customers held at legacy price for 12 months or until second renewal, whichever later; annual contracts honored to term; Enterprise never moved without legal review.
- Customer communications: 60-day in-product banner, 2 emails, sales-led notice for accounts >$5K ARR, dedicated FAQ, support macros.
- Guardrails: rollback if GM <70%, support load >1.2× baseline, refund rate >1.5× baseline, downgrade spike >10% in cohort.

Risks:
- Per-seat ambiguity in invoice line items (clarified with min-commit language).
- Bill shock on row overages (mitigated by alerts, throttle, prepaid pack).
- Enterprise procurement friction (mitigated by security docs, DPA templates, named CSM).
- Churn from forced migration (mitigated by grandfathering and renewal-bound move).
```
