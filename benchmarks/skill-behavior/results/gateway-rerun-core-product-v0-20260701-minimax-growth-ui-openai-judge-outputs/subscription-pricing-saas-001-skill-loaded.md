<think>
The user wants a SaaS subscription pricing design for a B2B analytics product. Let me use the skill's output format and stay within 650 words. I need to include: free trial, team plan, enterprise plan, seat limits, usage-based overages, annual discount, procurement requirements, support tiers, expansion path, unit economics.

Let me structurethis tightly.
</think>

```text
Recommended model:
Hybrid seat-based + usage-based (events ingested / rows scanned). Seats fund predictable revenue; usage aligns price to value for analytics workloads. Annual prepay with 20% discount; monthly allowed for Team only.

Value metric:
"Seats" for access and collaboration; "analyzed rows/month" for compute value. Aligns to how customers budget (FTEs + data volume).

Plan architecture:
- Free trial: 14-day full-feature trial, no credit card, 5 seats, 10M rows, watermarked exports. Auto-downgrade to Free at day 15; data retained 30 days, then deleted.
- Free: 3 seats, 5M rows/mo, 7-day retention, community support. No SSO. Purpose: evaluator foot in door.
- Team: $49/seat/mo (annual $39/seat/mo billed yearly) or $490/seat/yr. Includes 20 seats base, 25M rows/mo included, SSO via Google/Okta, email support (next-business-day).
- Business: $99/seat/mo (annual $79/seat/mo) or $990/seat/yr. 50 seats base, 100M rows, SAML SSO, audit logs, scheduled reports, 4-hour email support.
- Enterprise: Quote-based. Unlimited seats, custom row volume, SAML + SCIM, DPA/MSA, SSO, audit log export, private VPC option, 99.9% SLA, named CSM, 1-hour 24x5 support, security review.
- Usage and overages:
  - Tiered metered rate: $8 per additional 10M rows (Team), $6 per additional 10M rows (Business).
  - 80% alert at email; 100% soft cap continues billing; 120% hard cap throttles queries (read-only mode) until next cycle.
  - Annual contracts may pre-purchase row packs at 15% discount to reduce shock.
- Procurement: PO/invoice billing, NET-30, multi-year (up to 3yr, 5% per additional year), tax exemption handling, vendor security questionnaire library, signed DPA standard.
- Support and sales enablement:
  - Tiers: Team → email NBD; Business → email 4hr; Enterprise → 1hr 24x5 + Slack channel + named CSM.
  - Approved concessions: max 10% extra discount (CRO approval above), 1-time row-pack credit for migration, 60-day pilot for >$50k deals.
  - Objection playbook, refund boundary (no refunds post 30 days, prorated annual), escalation to Finance/Legal for procurement blockers.

Upgrade moments:
- Seat cap hit → in-product "add seat" CTA with annual vs monthly toggle.
- Row usage hits 80% → email + in-app; 100% → upgrade prompt to next tier or row pack.
- Admin attempts SAML/audit/SCIM → enterprise-gated.
- Collaboration friction (shared dashboards >10 viewers) → Business prompt.
- Annual renewal: usage-based true-up summary drives tier or seat expansion conversation.

Cancellation/downgrade:
- Self-serve cancel in billing portal; effective end of current period. Truth panel shows: data retention (30/60/90 days by tier), export options (CSV, Parquet, API), reactivation terms.
- Downgrade at renewal only mid-contract via CSM; protects revenue and trust.
- Win-back: 30-day 25% off email if canceled; 60-day reactivation preserves historical data; 90-day then archive.

Metrics:
pricing_page_viewed, plan_compared, trial_started, checkout_started, subscription_started, upgrade_clicked, upgrade_completed, downgrade_started, cancellation_started, winback_offer_shown, winback_accepted, pricing_notice_seen, rows_consumed (by tenant).

Unit economics:
- Gross margin target: 75%+ (cloud egress + storage dominant cost).
- Cost driver: rows scanned; per-tenant row cost ceiling $0.004/1k rows.
- CAC payback target: 12 months Team, 18 months Enterprise.
- NRR target: 115% (seat expansion 8%, usage expansion 7%).
- Support-cost guardrail: <18% of ARR; auto-flag tenants with >5 tickets/mo for CSM outreach.
- Abuse controls: anomaly detection on row volume; throttled tenants reviewed weekly.

Experiment/rollout plan:
- Hypothesis: Hybrid pricing lifts ARPU vs seat-only by ≥12% without raising churn >2pp.
- Audience: new self-serve signups; staged 50/50 for 60 days.
- Holdout: 50% see seat-only pricing with usage as add-on.
- Success metrics: ARPU, conversion, rows/revenue, support tickets/tenant.
- Guardrails: churn, NPS, refund rate, gross margin.
Grandfathering: existing annual/enterprise customers locked at current terms until renewal; renewal-bound migration only. Trials converted pre-launch keep legacy pricing 12 months.
Communications: in-app banner 30 days pre-launch; 2-email sequence (T-30, T-7); sales playbook + objection doc.
Rollback trigger: churn +3pp or margin drop >5pp within 30 days.
Decision date: 60 days post-launch. Owner: Head of Monetization.

Risks:
Bill shock at high usage → mitigated by alerts, row packs, soft/hard caps.
Pricing comprehension (seats + rows) → mitigated by interactive calculator on pricing page.
Enterprise cycle slowdown → mitigated by self-serve Business tier with SAML.
Free-tier abuse → row cap, retention cap, anomaly detection.
Discount leakage → enforced approval matrix and CRM logging.
```
