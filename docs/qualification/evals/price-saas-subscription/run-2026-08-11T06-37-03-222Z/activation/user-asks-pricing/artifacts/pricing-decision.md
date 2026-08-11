# Pricing and Packaging Decision — B2B SaaS Project-Management Tool

**Decision owner:** Head of Growth (commercial owner); Head of Finance (margin approval)
**Date:** 2026-08-11
**Status:** Recommendation for a bounded experiment; all unit costs are placeholders to validate before launch.

## 1. Decision, buyer, user, purchasing motion

- **Decision:** What plans to offer, the value metric, exact plan boundaries, and a price set that is internally consistent with our costs.
- **Buyer:** Team leads and department owners (Team/Business, self-serve); procurement and security buyers (Enterprise, assisted).
- **User:** Project managers, engineers, and ops staff who plan work and automate recurring project tasks.
- **Purchasing motion:** Credit-card self-serve for Team; annual PO/invoice and admin review for Business; procurement process (DPA/MSA, security review, SLA) for Enterprise.
- **Value metric:** **Paid seats (users)** as the primary value metric, with **automation runs** as a metered secondary usage metric. Both are our real cost drivers, so a hybrid seat + usage model maps price to cost without punishing normal collaboration.
- **Cost drivers:** Seat count (infrastructure, storage, support allocation) and automation runs (compute per run). Confirmed by the business case; exact unit costs are assumptions below.

## 2. Recommended model

**Hybrid:** seat-based tiers (Team, Business, Enterprise) with a metered automation-run overage, plus a 14-day free trial. No permanent freemium tier — free usage consumes compute without a conversion path and would pull down gross margin.

## 3. Plan architecture

### Trial (free)
- **Who:** Evaluators and small teams proving value before paying.
- **Boundaries:** 14 days; up to 10 seats; 500 automation runs total; no credit card required.
- **Behavior:** Full Team feature set; exports watermarked; at trial end, data is retained read-only for 30 days until conversion or deletion.

### Team (core paid)
- **Who:** Small teams that need shared project planning and automations.
- **Price:** **$12/seat/month** (monthly billing) or **$9.60/seat/month effective** on annual prepay ($115.20/seat/year, 20% off).
- **Seat rule (explicit):** **Minimum 5 paid seats.** Additional seats are the same $12/seat/month. There are no "bundled included seats"; the minimum is an invoice commitment. Admin/viewer seats are not sold separately at this tier.
- **Usage:** **1,000 automation runs/month included per workspace** (plan-level allowance, not per seat).
- **Overage:** **$0.01/run** after included runs, billed monthly.
- **Alerts and cap:** Usage alerts at 80%, 90%, and 100% of included runs; overage is metered and customers may set an optional hard cap; automations throttle at 3x included runs until the cap is raised or the plan is upgraded.

### Business
- **Who:** Departments with admin, compliance, and support needs; annual default.
- **Price:** **$14/seat/month** (monthly billing) or **$11.20/seat/month effective** on annual prepay ($134.40/seat/year, 20% off).
- **Seat rule (explicit):** **Minimum 25 paid seats.** Additional seats at $14/seat/month.
- **Usage:** **10,000 automation runs/month included per workspace.**
- **Overage:** **$0.01/run** (same list rate; the value is the larger included allowance).
- **Gates:** SAML SSO, audit log, admin roles, 99.9% SLA, priority support, annual default with PO/invoice.
- **Alerts and cap:** Same 80/90/100% alerts; optional hard cap; throttle at 3x included runs.

### Enterprise
- **Who:** Procurement/security buyers needing contracts, compliance, and committed usage.
- **Price:** **Negotiated, minimum 100 paid seats, annual or multi-year.** Seat rate target **$10–$14/seat/month** (floor: $6.13/seat/month annual-adjusted, see §8).
- **Usage:** Committed automation-run band (e.g., 50k–2M runs/year) with **true-up at $0.008/run** above the band; custom caps and burst policies negotiated.
- **Gates:** SSO/SAML + SCIM, audit log + API exports, DPA/MSA, SOC 2 Type II and security review, 99.9% SLA with named support escalation, PO/invoice and tax handling, billing contact and approval owner.

### Usage and overage summary
| Plan | Included runs/month | Overage rate | Alerts | Cap/throttle |
| --- | --- | --- | --- | --- |
| Trial | 500 total | — | 80/90/100% | hard stop at 500 |
| Team | 1,000 | $0.01/run | 80/90/100% | optional cap; throttle at 3x |
| Business | 10,000 | $0.01/run | 80/90/100% | optional cap; throttle at 3x |
| Enterprise | committed band | $0.008/run true-up | 80/90/100% | negotiated |

### Procurement
- Business: PO/invoice, tax docs, standard DPA, billing contact, 5-business-day review.
- Enterprise: MSA + DPA, security questionnaire/SOC 2, SLA, legal review, approval owner named per deal; deals must not stall on the pricing page — sales owns the checklist.

### Support and sales enablement
- Trial: community + help center. Team: email support, 2-business-day response. Business: priority support, 1-business-day response. Enterprise: named escalation and SLA.
- Enablement pack before launch: approved objection handling (price vs ClickUp/Asana, annual lock-in, overage fear), save offers (one-cycle 10% credit, max $500, CRM-logged, finance approval above), refund/credit boundary (30-day annual refund window, one-time), escalation path to finance/legal.

## 4. Upgrade moments

- **Trial → Team:** prompted at the 5th seat, at 80% of trial runs, or at trial end (upgrade reason visible on the paywall screen).
- **Team → Business:** shown when sustained >1,000 runs/month for 3 months (cheaper via 10,000 included), when admin needs SAML/audit/roles appear, or when the workspace approaches the 25-seat Business minimum (the prompt states the minimum-seat commitment up front).
- **Business → Enterprise:** sales-assist trigger at >100 seats, sustained >100k runs/month, or procurement needs (DPA/MSA, SLA, PO).
- **Usage upgrade moment:** in-product notice at 80% and 90% of included runs shows the projected overage cost vs the next plan — no bill shock.

## 5. Cancellation and downgrade promises

- **Cancel anytime**, effective at the end of the current billing period; no mid-cycle refunds. Annual prepay: one-time full refund within 30 days of purchase or renewal; after that, no mid-term refunds — unused prepaid time is forfeited and terms reset at renewal.
- **Downgrade** takes effect at the next billing period. Business → Team drops SSO/audit/admin at the effective date, with a 14-day export notice and read-only access during that window.
- **Data:** retained read-only for 60 days after cancellation; CSV/API export available until retention ends. Final invoice includes overage true-up for the closing period.
- **Renewal truth:** renewal date, price, and included usage are shown next to subscription actions and on every invoice (no silent changes at renewal).

## 6. Metrics

Track: `pricing_page_viewed`, `pricing_experiment_assigned`, `plan_compared`, `trial_started`, `checkout_started`, `subscription_started`, `upgrade_clicked`, `upgrade_completed`, `downgrade_started`, `cancellation_started`, `cancellation_completed`, `winback_offer_shown`, `winback_accepted`, `overage_alert_sent`, `overage_alert_acknowledged`, `overage_invoice_disputed`, `pricing_notice_seen`, `pricing_migration_started`, `pricing_migration_completed`.

Evaluate by activation, trial→paid conversion, retention, expansion (NRR), support load, refund rate, and blended gross margin.

## 7. Unit economics

- **Gross margin target:** ≥ 70% blended (seat + overage revenue, net of support and burst infrastructure).
- **CAC payback target:** ≤ 18 months. **NRR target:** ≥ 110% (seat expansion + overage growth).
- **Cost assumptions (placeholders to validate with Finance/Engineering before launch):** marginal cost $2.00/seat/month (infrastructure, storage, per-seat ops); marginal cost $0.002/automation run (compute + monitoring). Support load (≤ 8% of revenue) and burst infrastructure are modeled inside the 15% margin buffer used for all floors (§8).
- **Cost and abuse controls:** per-run timeout and concurrency limits, per-seat rate limits, throttle at 3x included runs, optional hard caps, trial fraud checks (org email/phone verification, one trial per domain), prepaid packs only via Enterprise contract.

## 8. Pricing arithmetic pass (must be internally consistent)

**Floors at target margin, including a 15% support/burst buffer** (buffered unit costs: $2.30/seat, $0.0023/run):

- Seat floor: $2.00 / (1 − 0.70) = $6.67; with buffer = **$7.67/seat/month**; annual-discount-adjusted floor = $7.67 × 0.8 = **$6.13**.
- Run floor: $0.002 / (1 − 0.70) = $0.0067; with buffer = **$0.0077/run**; annual-discount-adjusted floor = $0.0077 × 0.8 = **$0.0061**.

**Seat minimums / included seats:** minimum paid seats are explicit (Team 5, Business 25, Enterprise 100). No "included seats" language — every paid seat is billed at the seat rate.

**Included usage and overage rate:**
- Team: 1,000 runs/month included; overage $0.01/run → margin = ($0.01 − $0.002)/$0.01 = **80%** ≥ 70% ✓ (annual-adjusted effective $0.008 → 75% ✓, still above floor $0.0061).
- Business: 10,000 runs/month included; same $0.01/run overage → 80% ✓.
- Enterprise true-up $0.008/run → ($0.008 − $0.002)/$0.008 = **75%** ✓ (floor $0.0061).

**Annual discount and contract term:**
- Team: $12 → $9.60 effective ($115.20/seat/year). Margin check: ($9.60 − $2.00)/$9.60 = **79.2%** ✓ (floor $6.13).
- Business: $14 → $11.20 effective ($134.40/seat/year). Margin check: ($11.20 − $2.00)/$11.20 = **82.1%** ✓ (floor $6.13).
- Overage is billed at list rate regardless of billing term; the 20% annual discount applies to the seat subscription only, stated on the pricing page.

**Worst-case plan-level checks (minimum seats, full included-run usage, annual discount, buffered costs $2.30/seat and $0.0023/run):**
- Team: 5 × $9.60 = $48.00/month revenue; cost 5 × $2.30 + 1,000 × $0.0023 = $13.80 → **71.3%** ✓.
- Business: 25 × $11.20 = $280.00/month revenue; cost 25 × $2.30 + 10,000 × $0.0023 = $80.50 → **71.3%** ✓.
- Sensitivity: worst-case margin holds ≥ 70% until real run cost reaches ~$0.0026–$0.0029/run (+30–45% vs assumption). Re-meter actual run cost at day 60; if it exceeds $0.0023/run, reduce allowances or adjust prices before the experiment ends.

**Blended margin sanity (workspace level):**
- Team workspace, 10 seats, 2,500 runs (1,000 included + 1,500 overage): revenue $120 + $15 = $135; cost $20 + $5 = $25 → **81.5%** ✓.
- Business workspace, 30 seats, 14,000 runs, monthly: revenue $420 + $40 = $460; cost $60 + $28 = $88 → **80.9%** ✓.
- Business, annual, 30 seats, 14,000 runs/month: revenue $4,032 + $480 = $4,512/yr; cost $720 + $336 = $1,056/yr → **76.6%** ✓.
- Enterprise, 100 seats, annual, 200,000 runs/year billed at the effective $0.008/run rate: revenue $13,440 + $1,600 = $15,040/yr; cost $2,400 + $400 = $2,800/yr → **81.4%** ✓.

**Margin guardrails (enforced before any discount is approved):**
- Blended gross margin must stay ≥ 70%; finance signs off monthly.
- No discount below $6.13/seat/month effective or $0.0061/run effective without finance + legal approval.
- Sales discounts: max one-cycle 10% credit (≤ $500) without finance; every concession CRM-logged with renewal impact and rollback criteria.

**Market anchor (US list prices, accessed 2026-08-11; full source list in Appendix A):** Asana Starter $10.99/user/month annual ($13.49 monthly) and Advanced $24.99; ClickUp Unlimited ~$7–10/user/month and Business ~$12; Linear Basic $10/user/month and Business $16; Monday.com (May 2026) moved to a hybrid seat + usage-credit model with $0.01/credit overage on yearly plans and $0.0125 monthly — direct support for our hybrid model and for the $0.01 overage rate. Our Team $12 ($9.60 annual) and Business $14 ($11.20 annual) sit mid-pack with a visible usage allowance, consistent with the 70% margin target.

## 9. Experiment / rollout plan (before any discounting)

- **Hypothesis:** Seat + metered-run hybrid with explicit overage raises blended ARPU by ≥ 15% within 6 months of launch without hurting trial→paid conversion or raising churn vs the holdout.
- **Audience:** New signups only, exposed in a staged ramp. **Excluded:** the ~10k existing users — existing paid customers move at renewal (renewal-bound migration), existing trials are grandfathered 90 days, annual/Enterprise contracts are honored to term.
- **Test design:** 10% holdout cohort on current pricing; new-pricing exposure 10% → 25% → 50% → 100% over 6 weeks; randomized by signup cohort.
- **Success metrics:** trial→paid conversion ≥ baseline; blended GM ≥ 70%; NRR ≥ 110%; overage invoice dispute rate < 1%.
- **Guardrails:** cancellation rate ≤ holdout +0.5pp; support tickets per $1k MRR ≤ 15/week; GM never < 65% for 2 consecutive weeks.
- **Kill criteria (pre-defined, tested weekly):** roll back new pricing for the affected cohort if (a) blended GM < 65% for 2 consecutive weeks, (b) cancellation rate > holdout +1.5pp for 2 consecutive weeks, (c) trial→paid conversion drops > 20% relative to holdout, or (d) overage disputes > 2% of invoices in any week. On rollback: grandfather affected new customers to prior pricing, honor annual contracts, re-test with revised boundaries (e.g., higher included runs or lower seat minimum).
- **Grandfathering:** existing paid customers move at renewal with a 60-day in-product and email notice; allowances are set to the greater of old or new included usage for the first year; annual and Enterprise contracts hold to term.
- **Customer communications:** in-product notice (60 days pre-renewal for changes), email sequence (T-60, T-30, T-7), updated pricing page with per-plan who-for, trial length, overage, cancellation, export, support level, and security/compliance route.
- **Handoff for any approved migration:** billing/entitlement (Payment Platform Readiness) implements value metric, limits, prices, renewal, cancellation, and downgrade semantics exactly as approved; Store Listing/Interface Craft owns pricing page copy and UI; a separate migration artifact is required if any already-approved price increase is layered on later.
- **Owner and review date:** Head of Growth; weekly guardrail review, decision date at end of the 8-week experiment (2026-10-06), finance sign-off before any discount.

## 10. Risks

- **Hybrid comprehension:** seat + usage can confuse buyers; mitigated by explicit pricing page language, alerts, and one-line examples ("10 seats + 2,500 runs ≈ $135/month").
- **Bill shock:** overage surprises; mitigated by 80/90/100% alerts, optional hard cap, and throttle-at-3x default.
- **Seat minimum friction:** 5-seat minimum may deter micro-teams; monitored via trial→paid conversion guardrail; mitigation is a lower minimum (3) or starter bundle, only if the experiment data supports it.
- **Competitor price pressure:** ClickUp/Asana discounting and annual lock-in complaints; mitigated by usage allowance differentiation and approved save offers rather than unpublished list-price erosion.
- **Discount leakage:** sales concessions eroding margin; mitigated by the discount approval rules, CRM logging, and margin guardrails above.
- **Migration trust:** silent renewal changes would break trust; mitigated by renewal-bound migration, 60-day notices, and export/downgrade promises enforced in product.

## Appendix A — Competitor pricing sources (accessed 2026-08-11, US list prices)

| Tool | Plans verified | Source |
| --- | --- | --- |
| Linear | Free; Basic $10/user/month; Business $16/user/month; Enterprise custom, annual only | https://linear.app/pricing |
| Asana | Personal free; Starter $10.99/user/month annual ($13.49 monthly); Advanced $24.99 annual ($30.49 monthly) | https://asana.com/pricing; https://costbench.com/software/project-management/asana/ (2026-05-22); https://lifestack.ai/blog/asana-pricing (2026-07-02) |
| ClickUp | Unlimited ~$7–10/user/month; Business ~$12/user/month | https://clickup.com/pricing; https://www.vendr.com/marketplace/clickup; https://www.smartsuite.com/blog/clickup-pricing (2026-03-24); https://www.capterra.com/p/158833/ClickUp/pricing/ |
| Monday.com | Hybrid seats + credits: Basic 1,000 / Standard 2,000 / Pro 3,000 credits included; overage $0.01/credit yearly, $0.0125 monthly; seat rates ~$9–14 | https://forkast.news/monday-com-just-changed-how-enterprise-saas-gets-priced-the-per-seat-model-is-not-coming-back/ (2026-07-31); https://finance.yahoo.com/technology/ai/articles/monday-com-just-changed-enterprise-123041861.html |

All anchors are list-price context only; the price set above is derived from our own cost structure and margin target, not from competitor copying.
