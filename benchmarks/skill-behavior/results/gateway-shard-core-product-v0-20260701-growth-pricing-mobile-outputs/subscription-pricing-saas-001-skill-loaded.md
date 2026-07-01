Recommended model:  
Hybrid tiered SaaS pricing: seat-based base plans + usage-based analytics/event overages + Enterprise contract pricing.

Value metric:  
Primary: tracked events / queries / data volume analyzed per month.  
Secondary: seats for collaboration, admin, and governance.  
Rationale: analytics value scales with data analyzed and number of stakeholders using insights, while infrastructure cost is driven by ingestion, storage, and query volume.

Plan architecture:

- Free/trial:
  - 14-day free trial of Team plan.
  - No credit card required for product-led motion; credit card required if enabling production data above trial limits.
  - Includes:
    - Up to 5 seats.
    - Up to 250k events or equivalent data rows.
    - 30-day data retention.
    - Standard dashboards, alerts, and integrations.
    - Email support.
  - Trial expiration:
    - Workspace becomes read-only after trial ends.
    - User can export data and dashboards for 30 days.
    - Upgrade required to resume ingestion, alerts, and collaboration.
  - Renewal behavior:
    - If card is entered, make auto-renewal explicit before checkout.

- Core paid:
  - “Team” plan for startups and growing analytics teams.
  - Example pricing:
    - $499/month monthly.
    - $399/month billed annually, shown as “$4,788/year, save 20%.”
  - Includes:
    - 10 seats included.
    - Additional seats: $25/seat/month.
    - 5M events/month included.
    - 90-day data retention.
    - 10 connected data sources.
    - Shared dashboards, scheduled reports, alerts, basic role permissions.
    - API access with standard rate limits.
    - Email support with 1-business-day response.
  - Usage overages:
    - Additional events: $50 per additional 1M events.
    - Overage alerts at 50%, 80%, 100%, and 120%.
    - Admin can set hard cap, soft cap, or auto-scale.
    - No surprise billing: overage policy displayed in checkout and usage dashboard.

- Team/business:
  - “Business” plan for larger teams needing governance and scale.
  - Example pricing:
    - $1,499/month monthly.
    - $1,199/month billed annually, shown as “$14,388/year, save 20%.”
  - Includes:
    - 25 seats included.
    - Additional seats: $35/seat/month.
    - 25M events/month included.
    - 12-month data retention.
    - Unlimited dashboards.
    - Advanced permissions, team workspaces, audit history, priority integrations.
    - Data quality monitoring and advanced alerts.
    - Priority support with 4-business-hour first response.
    - Quarterly business review optional for annual customers.
  - Usage overages:
    - Additional events: $35 per additional 1M events.
    - Volume discounts available above 100M events/month.
  - Best upgrade point from Team:
    - More than 10 seats.
    - Sustained usage above 8M–10M events/month.
    - Need longer retention, advanced permissions, or priority support.

- Enterprise:
  - Custom annual contract for regulated, high-scale, or procurement-heavy customers.
  - Starts at a clear floor, e.g. “From $40,000/year.”
  - Includes:
    - Custom seat pool.
    - Committed event volume with negotiated overage bands.
    - Multi-year volume discounts.
    - Custom retention, often 24–84 months.
    - SSO/SAML, SCIM, advanced RBAC, audit logs.
    - Dedicated customer success manager.
    - SLA, security review, DPA, SOC 2 report access, vendor risk documentation.
    - Custom data residency or private cloud option if economically viable.
    - Invoice billing, purchase orders, MSAs, DPAs, and procurement workflows.
    - Premium support: named support channel, escalation path, optional 24/7 critical issue support.
  - Enterprise should not just be “more usage”; it should package procurement, security, compliance, control, and service guarantees.

Upgrade moments:
- Trial → Team:
  - User creates recurring dashboard.
  - Connects production data source.
  - Invites third teammate.
  - Hits 70% of trial event limit.
  - Schedules report or alert.
- Team → Business:
  - Seat count exceeds 10.
  - Event usage repeatedly exceeds included limit.
  - Admin attempts advanced permissions, audit history, or longer retention.
  - Team needs priority support or more integrations.
- Business → Enterprise:
  - Security review requested.
  - SSO/SAML or SCIM needed.
  - Legal/procurement requires MSA, DPA, SLA, PO, invoice billing.
  - Usage exceeds predictable self-serve bands.
  - Customer needs custom retention, data residency, or dedicated success.

Cancellation/downgrade:
- Cancellation:
  - Keep access until end of paid term.
  - Ingestion, alerts, and scheduled reports stop at term end.
  - Workspace becomes read-only for 30 days after cancellation.
  - Data export available during read-only period.
  - Data deletion occurs after stated retention window unless legal hold or enterprise terms apply.
- Downgrade:
  - Show exactly what will be lost before confirmation:
    - Seats removed or deactivated.
    - Retention reduced.
    - Dashboards, alerts, or integrations over new limit paused.
    - Advanced permissions or audit features disabled.
  - Annual contracts can downgrade at renewal, not mid-term, unless contract permits.
- Win-back:
  - Avoid automatic “cancel to get a discount” behavior.
  - Use targeted win-back based on reason:
    - Too expensive: offer lower usage commit or annual plan.
    - Missing feature: notify when shipped.
    - Low usage: offer onboarding or dashboard setup.
  - Do not offer blanket last-minute discounts to all cancellers.

Metrics:
- Funnel:
  - pricing_page_viewed
  - plan_compared
  - trial_started
  - checkout_started
  - subscription_started
- Expansion:
  - usage_limit_warning_seen
  - seat_limit_reached
  - upgrade_clicked
  - upgrade_completed
  - overage_enabled
  - annual_plan_selected
- Retention:
  - downgrade_started
  - cancellation_started
  - cancellation_completed
  - winback_offer_shown
  - winback_accepted
- Unit economics:
  - gross margin by plan.
  - infrastructure cost per 1M events.
  - storage cost per retained GB/month.
  - query cost per active account.
  - support tickets per account by plan.
  - CAC payback by segment.
  - expansion revenue from seats vs usage.
  - overage margin.
  - refund and billing dispute rate.
  - annual prepay mix.
  - net revenue retention.

Risks:
- Usage-based overages can create bill shock; mitigate with alerts, caps, and clear admin controls.
- Seat pricing can discourage broad adoption; include enough seats in each plan and charge for admin/collaboration value, not casual viewers only.
- Free trial can attract low-intent users; require activation milestones before heavy compute features.
- Long retention can damage margins; align retention limits with plan price and storage cost.
- Enterprise can create delivery drag; only offer custom data residency, private cloud, or bespoke SLA when contract value supports it.
- Annual discount improves cash flow but should not exceed margin comfort; 15–20% is reasonable.
- Avoid arbitrary feature gates that block first value. Gate scale, governance, security, automation, and support instead.
