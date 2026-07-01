Recommended model:  
Hybrid tiered SaaS pricing: free trial + seat-based team plan + usage-based overages + enterprise contract tier.

Value metric:  
Primary: monthly analytics events or queried rows, depending on product architecture.  
Secondary: seats, workspaces, data connectors, retention period, governance, and support level.  
Cost driver: data ingestion, query compute, storage/retention, scheduled reports, AI/advanced processing if applicable.  
Expansion path: more users → more data volume → longer retention → advanced governance/security → enterprise contract.

Plan architecture:

- Free/trial:
  - 14-day free trial of Team plan.
  - No credit card required for self-serve trial; credit card required to continue after trial.
  - Trial limits:
    - Up to 5 seats.
    - Up to 1 workspace.
    - Up to 3 data sources/connectors.
    - Up to 250k events or equivalent query volume.
    - 30-day data retention.
    - Standard dashboarding and reporting.
  - Trial expiration:
    - Account becomes read-only for 30 days.
    - Users can export data and dashboards.
    - Data deleted after 60 days unless converted or legally required otherwise.
  - Do not gate first value: allow users to connect data, build dashboards, invite teammates, and see core analytics before hitting limits.

- Core paid:
  - Team Plan: $499/month or $4,990/year.
  - Annual discount: approximately 17%, shown clearly as “2 months free.”
  - Includes:
    - 10 seats.
    - 2 workspaces.
    - 10 data connectors.
    - 2M monthly analytics events or defined usage units.
    - 12-month data retention.
    - Scheduled reports.
    - Email support with 2-business-day response target.
  - Additional seats: $39/seat/month.
  - Usage overages:
    - $20 per additional 100k events, or equivalent usage unit.
    - Overage alerts at 70%, 90%, and 100%.
    - Soft cap by default; customers can set a hard cap.
    - No surprise billing: require admin opt-in for overages above 150% of included usage.
  - Best for: growing teams that need shared analytics, recurring reporting, and moderate data volume.

- Team/business:
  - Business Plan: $1,499/month or $14,990/year.
  - Includes:
    - 25 seats.
    - 5 workspaces.
    - 25 data connectors.
    - 10M monthly analytics events.
    - 24-month data retention.
    - Advanced permissions.
    - Shared templates.
    - API access.
    - Priority email support with 1-business-day response target.
    - Quarterly usage review.
  - Additional seats: $49/seat/month.
  - Usage overages:
    - $15 per additional 100k events.
    - Optional prepaid usage blocks at discounted rates.
  - Best for: departments or multi-team organizations with higher data volume and governance needs.

- Enterprise:
  - Custom annual contract, starting at $30k/year.
  - Includes:
    - Custom seat packages.
    - Custom usage commit and overage schedule.
    - Multi-workspace or multi-region deployment options.
    - SSO/SAML.
    - SCIM provisioning.
    - Role-based access control.
    - Audit logs.
    - DPA.
    - Security documentation.
    - Vendor risk review support.
    - Custom data retention.
    - SLA.
    - Dedicated customer success manager.
    - Premium support with defined response times.
    - Optional private cloud/VPC deployment if supported.
  - Procurement requirements:
    - Annual invoicing.
    - PO support.
    - MSA/DPA review.
    - SOC 2 or security package.
    - SLA attachment.
    - Vendor onboarding documentation.
  - Best for: regulated, security-sensitive, or high-volume organizations.

Upgrade moments:
- Trial user reaches seat, connector, or usage limit.
- Team needs more than 10 seats or 2 workspaces.
- Usage consistently exceeds included monthly volume.
- Admin needs SSO, SCIM, audit logs, custom retention, SLA, or DPA.
- Multiple departments request separate workspaces or centralized governance.
- Customer wants invoice billing, procurement review, or custom contract terms.
- Product should surface upgrade prompts before hard limits: e.g. “You are at 80% of included monthly events.”

Cancellation/downgrade:
- Cancellation effective at end of paid billing period.
- Downgrades take effect at next renewal unless customer requests immediate downgrade.
- On downgrade, excess seats become inactive until removed or upgraded.
- Features above the new plan become read-only where possible.
- Data retention follows new plan after a 30-day grace period.
- Data export available for 30 days after cancellation.
- Data deleted after 60–90 days unless contract or law requires otherwise.
- Do not use aggressive save discounts that train churn behavior.
- Win-back offers should be limited, time-bound, and based on churn reason.

Metrics:
- pricing_page_viewed
- pricing_experiment_assigned
- plan_compared
- trial_started
- checkout_started
- subscription_started
- upgrade_clicked
- upgrade_completed
- downgrade_started
- cancellation_started
- cancellation_completed
- winback_offer_shown
- winback_accepted
- pricing_notice_seen
- pricing_notice_acknowledged
- pricing_migration_started
- pricing_migration_completed

Business metrics:
- Trial-to-paid conversion.
- Activation rate by data connector completion.
- Seat expansion rate.
- Usage expansion rate.
- Gross margin by plan.
- Net revenue retention.
- Logo retention.
- Support tickets per account.
- Refund rate.
- Overage opt-out rate.
- Enterprise sales cycle length.
- Discount rate by segment.

Experiment/rollout plan:

- Test design:
  - Hypothesis: hybrid seat + usage pricing will improve expansion revenue without materially increasing churn or billing disputes.
  - Audience: new self-serve and sales-assisted customers.
  - Excluded users: existing annual contracts, enterprise contracts, strategic accounts in active negotiation, customers with custom pricing.
  - Control / holdout: keep 10–20% of new eligible accounts on current pricing if available.
  - Exposure ramp:
    - Week 1: 10% of new accounts.
    - Week 2–3: 25%.
    - Week 4–6: 50%.
    - Full rollout only after review.
  - Success metrics:
    - Trial-to-paid conversion.
    - ARPA.
    - Paid activation.
    - Expansion revenue.
    - Gross margin.
    - NRR.
  - Guardrails:
    - Cancellation rate does not increase by more than 10%.
    - Refund rate does not increase by more than 20%.
    - Support tickets about billing do not increase by more than 25%.
    - Gross margin remains above target threshold, e.g. 75–80%.
    - Overage-related complaints remain below defined threshold.

- Grandfathering/migration:
  - Existing paid monthly customers: keep current terms for 90 days, then migrate at next billing cycle with notice.
  - Existing annual customers: keep current terms until renewal.
  - Enterprise customers: no mid-contract changes unless explicitly allowed and reviewed by legal/support.
  - Existing trials: honor terms shown at trial start.
  - High-risk customers: offer temporary usage credits or migration support, not permanent blanket discounts.
  - Grandfathering forever only if operational cost is low.

- Customer communications:
  - Pricing page must clearly show:
    - Monthly and annual prices.
    - Annual discount.
    - Seat limits.
    - Included usage.
    - Overage rate.
    - Overage alerts and caps.
    - Trial length.
    - Renewal behavior.
    - Cancellation, downgrade, export, and retention rules.
    - Support tier by plan.
    - Enterprise procurement/security route.
  - Email sequence:
    - 30-day pricing change notice.
    - 14-day reminder.
    - 3-day reminder before enforcement or renewal.
  - In-product:
    - Usage meter.
    - Forecasted monthly usage.
    - Upgrade prompts before limits.
    - Admin-only billing controls.
  - Sales/support enablement:
    - Approved objection handling.
    - Refund boundaries.
    - Save offer policy.
    - Escalation path for procurement, legal, and high-risk churn.

- Guardrails:
  - Maintain gross margin by pricing overages above marginal compute/storage cost.
  - Monitor customers with high usage but low seat count.
  - Prevent bill shock with alerts, caps, and admin approval.
  - Avoid seat pricing that discourages broad adoption; include enough seats in each tier.
  - Do not gate core analytics too early.
  - Review discounting monthly; require approval for discounts above defined threshold.

Risks:
- Usage metric may be hard for buyers to forecast.
- Overage charges may create billing anxiety.
- Seat limits may discourage team adoption if too restrictive.
- Enterprise procurement can slow sales cycles.
- Support load may spike during pricing migration.
- Gross margin can erode if high-volume customers stay on Team plans without appropriate usage pricing.
- Too many plan dimensions may reduce pricing comprehension.
