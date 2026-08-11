# Pricing and Packaging Decision — B2B Project-Management SaaS

Date: 2026-08-11
Owner: Commercial lead (decision); Finance (discount approvals); Legal (terms review)
Status: Recommendation — not implemented. All internal cost/usage inputs are stated assumptions to be validated from owning systems before Phase 1 (see "Experiment/rollout plan").

## Decision, buyer, and value metric

**Decision being made:** Which plans, list prices, usage meters, limits, and discount rules monetize the current ~10,000-user base while holding a 70% gross-margin floor — and in what bounded sequence.

**Assumed base (validate before Phase 1):** ~10,000 active users across ~2,000 organizations, currently on a free product. Monetization targets are placeholders: 20% of orgs convert to paid, averaging 12 paid seats → ~4,800 paid seats, plus metered overage.

**Buyers:**
- Team: team lead / project manager, bottom-up, self-serve.
- Business: department or operations owner, admin approval, annual default.
- Enterprise: procurement + security buyer, sales-led.

**Users:** PMs, engineers, and operations staff. Users influence; the buyer above signs.

**Value metric (one clear, already-understood pair):** **paid seats** (collaboration surface) + **automation runs** (value-producing volume). Both are already countable by customers; the cost drivers are the same two meters, so price and cost stay aligned (patterns `pricing-1`).

## Recommended model

**Hybrid: seat-based core with metered automation-run usage, free trial, no freemium.**

Why:
- Seats anchor predictable recurring revenue and match how teams buy PM tools.
- Runs align marginal cost (compute + integrations) with the value meter; a pure seat model would subsidize heavy automation and a pure usage model would create bill shock and forecasting pain.
- Freemium is rejected: at ~10k users it exposes the most expensive customers to the biggest cost without a commitment gate.
- Per-seat pricing uses an explicit **minimum paid-seat commitment**, not an ambiguous "includes N seats" bundle (patterns `pricing-9`).

## Plan architecture

### Free (existing base)
- 3 seats, 30 automation runs/month total, community support, standard data export.
- No custom contracts; no SLA.

### Trial
- 14 days, up to 10 seats, 150 automation runs total, watermarked exports.
- Auto-converts to the chosen paid plan (or Free) at expiry; no card required to start, card required to continue past expiry.

### Team
- $12/seat/month; **minimum 5 paid seats** per account. Additional seats at the same $12/seat/month, prorated on seat additions.
- Included usage: **100 automation runs per paid seat per month** (prorated on mid-cycle seat changes).
- Overage: **$0.025/run**, billed at cycle end with alerts at 80% / 90% / 100% of inclusion.
- Concurrency: 5 concurrent runs. Support: email, 2-business-day response. No SAML, no audit log.

### Business
- $20/seat/month; **minimum 10 paid seats** per account. Additional seats at the same $20/seat/month.
- Included usage: **400 automation runs per paid seat per month**.
- Overage: **$0.0225/run** (volume tier), alerts at 80% / 90% / 100%.
- Concurrency: 20 concurrent runs. Adds SAML/SSO, audit log, advanced permissions, priority support (1-business-day), annual default.
- Rationale: the Business overage rate is below the Team rate, so heavy-automation teams save money by upgrading — the upgrade reason is visible before the paywall moment (`pricing-3`).

### Enterprise
- Negotiated annual or multi-year commitment: **100+ paid seats and a committed automation-run band** (e.g., 50k–500k runs/month).
- True-up at cycle end at the **negotiated floor of $0.020/run** (never below).
- Requires proof before offer (`pricing-6`): SSO/SCIM, audit log, DPA/MSA, SLA, security review, PO/invoice, named support and escalation path.

### Usage and overages (all paid plans)
- Included runs are granted per paid seat per month; overage is metered per run and billed at cycle end.
- Alert levels: 80% (email + in-app), 90% (email), 100% (in-app banner + email).
- Degrade mode: runs are **queued, never dropped**. If a customer sets a hard cap, additional runs queue and execute at the start of the next cycle. If no cap is set, runs continue at the published overage rate.
- Abuse/cost controls: per-plan concurrency caps, run-anomaly detection, API-key rotation, and a 150%-of-inclusion review trigger for automated approval workflows.

### Procurement
- Self-serve: card, monthly or annual prepay. Business/Enterprise: PO/invoice, DPA/MSA, tax handling, security review, SLA, billing contact, approval owner named per deal.

### Support and sales enablement
- Approved objections: "Why are runs metered?" → automation runs have direct compute/integration cost; inclusion + alerts keep bills predictable; heavy users get cheaper rates on Business/Enterprise.
- Approved concessions: standard annual prepay (20%), seat additions at list, 30-day refund on annual prepay, true-up grace of 5 business days. Anything else escalates (see Discount rules).

## Upgrade moments

- **Free → Team:** need > 3 seats, > 30 runs/month, or automation + priority support. Paywall shows the in-use meters (seats and runs) at 80% to make the reason visible before the limit.
- **Team → Business:** any of: sustained usage above **~356 runs/seat/month for 2 consecutive months** (annual-priced crossover where Business becomes equal-or-cheaper; see arithmetic), 25+ paid seats, or a need for SAML/audit log/advanced permissions. In-product nudge shows the projected annual cost on each plan.
- **Business → Enterprise:** 100+ seats, or security/procurement requirements (SSO/SCIM, DPA, SLA, audit retention); sales-assist trigger at 80+ seats.
- Expansion paths are explicit per plan (seat additions at list, usage overage, feature gates) — no dead end from Team to Enterprise.

## Cancellation and downgrade promises

- **Monthly:** cancel anytime, effective end of billing cycle; no retroactive charges.
- **Annual prepay:** 30-day money-back window from invoice date; after that, no prorated refund, service continues to term end. Renewal date and refund boundary are shown on the checkout and invoice.
- **Downgrade:** effective at the next billing cycle (monthly) or at renewal (annual). Downgrade keeps all project data and history; the new plan's limits apply from the effective date. If usage exceeds the new inclusion, runs continue at the new plan's overage rate — nothing is deleted.
- **Overage true-up:** billed at cycle end; late-payment grace 5 business days before queuing new runs.
- **Cancellation data:** full export available for 90 days after cancellation, then data deletion per DPA.
- **Pricing changes:** apply at renewal only; in-product notice + email 60 days before renewal (`pricing-4`, `pricing-8`).

## Metrics

Track (with owners): pricing_page_viewed, pricing_experiment_assigned, plan_compared, trial_started, checkout_started, subscription_started, upgrade_clicked, upgrade_completed, downgrade_started, cancellation_started/completed, pricing_notice_seen/acknowledged, pricing_migration_started/completed, refund rate, support load on pricing, annual take rate, discount leakage (avg discount per deal), NRR, blended gross margin.

Evaluate pricing by activation, conversion, retention, expansion, support load, refund rate, and long-term revenue — not by checkout conversion alone.

## Unit economics

- **Gross margin target:** ≥ 70% blended, all plans, after the 20% annual prepay discount.
- **Cost assumptions (validate before Phase 1):** $2.00 fully loaded marginal cost per seat/month (infra, storage, allocated support); $0.006 marginal cost per automation run (compute, integration API calls, logging, variable support).
- **CAC payback target:** ≤ 18 months. **NRR target:** ≥ 105% at 12 months.
- **Cost and abuse controls:** concurrency caps, run-anomaly detection, queue-don't-drop degrade, overage alert levels, 150%-of-inclusion review trigger.
- **Support guardrail:** support cost ≤ 10% of plan revenue per tier; if exceeded for two consecutive months, shift to self-serve/onboarding before raising prices.

## Pricing arithmetic (internally consistent pass)

### Seat minimums / included seats
- Team: $12/seat/month, **minimum 5 paid seats**, same price for additional seats. No "included seats" language.
- Business: $20/seat/month, **minimum 10 paid seats**, same price for additional seats.
- Enterprise: 100+ committed seats, negotiated.

### Included usage and overage rate
- Team: 100 runs/paid seat/month included; overage $0.025/run.
- Business: 400 runs/paid seat/month included; overage $0.0225/run.
- Enterprise: committed band; true-up floor $0.020/run.

### Overage margin floor (patterns `pricing-10`)
Required price at target GM = marginal cost / (1 − 0.70) = $0.006 / 0.30 = **$0.020/run**.

| Rate | GM on overage |
| --- | --- |
| $0.025/run (Team) | 76.0% |
| $0.0225/run (Business) | 73.3% |
| $0.020/run (Enterprise floor) | 70.0% — hard floor, not a default |

All proposed rates clear the floor; Enterprise concessions may approach but never cross $0.020/run.

### Annual discount and contract term
- Annual prepay: **20% off seat fees only** (not overage). Monthly-equivalent prices: Team $9.60/seat/month (invoice $115.20/seat/year; minimum account $576/year); Business $16.00/seat/month (invoice $192/seat/year; minimum account $1,920/year).
- Overage is never discounted — the metered rate is identical on monthly and annual terms, so the discount cannot leak into below-floor usage revenue.
- Renewal date = term end; 30-day refund boundary stated at checkout; annual take rate is a tracked metric, not a target forced on customers.

### Margin sanity check

Seat-only margin:
| Plan | List monthly | Annual effective | GM list | GM annual |
| --- | --- | --- | --- | --- |
| Team | $12.00 | $9.60 | 83.3% | 79.2% |
| Business | $20.00 | $16.00 | 90.0% | 87.5% |

Worst-case account margin (minimum seats, 100% of included runs consumed, annual discounted price):
| Plan | Monthly revenue | Cost (seats + included runs) | GM |
| --- | --- | --- | --- |
| Team min (5 seats, 500 runs) | $48.00 | $10.00 + $3.00 = $13.00 | 72.9% |
| Business min (10 seats, 4,000 runs) | $160.00 | $20.00 + $24.00 = $44.00 | 72.5% |

At realistic ~50% inclusion utilization: Team GM ≈ 76%, Business ≈ 80%. The tightest tier clears 70% even at full inclusion utilization, so the 20% annual discount is margin-safe.

### Upgrade crossover (visible reason, `pricing-3`)
At annual prices, per seat, with R runs/seat/month:
- Team = 9.60 + 0.025 × max(0, R − 100)
- Business = 16.00 + 0.0225 × max(0, R − 400)
- Crossover at **R ≈ 356 runs/seat/month**; above that, Business is equal or cheaper.
- Example: a 25-seat org running 12,000 runs/month → Team $477.50 vs Business $445.00 (saves $32.50/month). The dashboard shows this projection before the nudge.

## Margin guardrails

1. **Overage floor:** no rate below $0.020/run at list or after any discount; no discount applies to overage.
2. **Blended GM:** every account and every deal must hold ≥ 70% gross margin after all concessions; computed at signature for any custom deal.
3. **Seat floor:** no seat price below the $9.60 effective annual floor (Team) without a blended-GM check and finance sign-off.
4. **Inclusion guardrail:** if a renewal cohort averages > 80% of included runs for 3+ months, rebalance inclusion or price at renewal (never mid-term).
5. **Discount ladder:** standard annual prepay 20% is the only listed discount at launch. Additional: < 5% off list — sales lead; 5–10% — pricing owner; > 10% — finance/CEO, logged in CRM with renewal impact and rollback terms.
6. **Support guardrail:** support cost ≤ 10% of plan revenue per tier (see Unit economics).

## Experiment/rollout plan

**Kill criteria must be green before any discounting — including the standard 20% annual prepay discount — ships beyond a controlled holdout.**

- **Phase 0 (weeks 0–2) — validate inputs, no pricing exposure:** confirm marginal cost per seat and per run from owning cost systems; pull usage distribution (p50/p90/p99 runs per seat, seats per org); legal review of DPA/MSA, refund, and cancellation terms; build alerts, cap controls, and the upgrade-cost projection UI. Gate: cost and usage assumptions within ±15% of plan, or redo arithmetic.
- **Phase 1 (weeks 3–6) — 10% of new signups, monthly list prices only, no discounts:** Free/Trial/Team/Business live; Enterprise by application with proof checklist. Hypothesis: hybrid pricing converts ≥ 3% of trial starts to paid while holding blended GM ≥ 70% and refunds ≤ 3%.
- **Phase 2 (weeks 7–10) — expand to 50% of new signups** if Phase 1 kill criteria hold; keep no-discount exposure; measure support load and bill-shock complaints.
- **Phase 3 (weeks 11–14) — annual prepay holdout:** 25% of new signups get the 20% annual prepay option vs 75% monthly-only control. Success: annual take rate ≥ 30% with no GM regression; NRR leading indicator ≥ 100% at 90 days.
- **Phase 4 (weeks 15–22) — 100% + existing-base migration:** pricing notice + email to existing users 60 days before their plan end; grandfathering: existing free users keep current feature level through a 90-day window, existing annual contracts run to term, then renew on new terms; export path and support exception documented. No existing customer is forced onto new terms mid-contract.

**Kill criteria (any one triggers pause or rollback of that phase):**
1. Trial→paid < 2.5% (vs 3% target) over any 4-week phase-1/2 window.
2. Refund rate > 3% of paid starts in a month.
3. Bill-shock complaints (usage/overage) > 1% of active paid accounts/month.
4. Blended GM < 70% for 2 consecutive months.
5. NRR < 100% at 90 days on the annual cohort (Phase 3).
6. Cancel/downgrade rate > 1.5× pre-pricing baseline.
7. Pricing-related support tickets > 15% of all tickets for 2 consecutive weeks.

Rollback: revert to prior exposure for new signups within 24 hours; paid and annual customers are never changed mid-term; the 60-day notice window is preserved for any renewal-bound change.

**Handoffs:** Payment Platform Readiness owns billing, ledger, entitlement, invoices, tax, reconciliation after this decision is approved. Market Research Synthesis supplies competitor price check before Phase 1 (record source URL, access date, geography, plan). Store Listing / Interface Craft own pricing-page copy and UI only after the commercial decision is stable.

**Decision date and owner:** commercial decision review at week 8 (end of Phase 2) and week 14 (end of Phase 3); owner is the commercial lead; Finance approves any discount beyond the standard ladder.

## Risks

- **Hybrid comprehension:** two meters are harder to read than one. Mitigation: cost projection UI, per-plan calculator, alerts, and clear invoice line items.
- **Bill shock:** mitigated by inclusion + 80/90/100% alerts, queue-not-drop degrade, and customer-set caps.
- **Discount leakage:** annual discount applies to seat fees only; overage never discounted; ladder + CRM logging.
- **Enterprise dilution:** negotiated overage and seat concessions could push blended GM below 70%; blocked by the at-signature blended-GM check and finance approval.
- **Seat-minimum friction:** small teams may stall on Free. Mitigation: trial includes 10 seats; Team minimum of 5 is stated plainly at checkout.
- **Grandfathering cost:** 10k free users carry support/infra cost during the 90-day window — bounded, time-boxed, with a support-cost guardrail.
- **Migration trust:** any renewal-bound change is announced 60 days ahead; export and downgrade paths stay available; `pricing-8` migration rules apply.
