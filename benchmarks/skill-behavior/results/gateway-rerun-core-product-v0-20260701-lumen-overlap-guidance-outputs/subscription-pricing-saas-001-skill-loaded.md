```text
Recommended model: Hybrid (Seat-based + Usage-based)
Value metric: Active user seats and Monthly Tracked Events (MTE)

Plan architecture:
- Free/trial: 14-day Pro Trial. Full feature access, 5-seat limit, capped at 500k MTE. No credit card required.
- Core paid (Growth): $99/mo per seat ($990/yr per seat). Includes 1M MTE baseline, 10 seats max, standard data connectors.
- Team/business: $79/mo per seat ($790/yr per seat), minimum 5 seats. Includes 5M MTE baseline, 50 seats max, advanced dashboard sharing, and priority support.
- Enterprise: Custom base + flat seat rate. Unlimited seats, custom MTE, on-premise connectors. Requires annual contract.
- Usage and overages: Overage rate: $15 per 100k MTE. Alerts triggered at 80%, 90%, and 100% of limit. Ingestion auto-pauses at 100% unless "auto-bill overages" is enabled.
- Procurement: SOC 2 Type II report, DPA, custom MSA, ACH/Wire/Invoicing (Net 30), and security questionnaire support included for Team and Enterprise tiers.
- Support and sales enablement: 
  - Support: Growth (Email, 24hr SLA), Team (Priority Email & Chat, 4hr SLA), Enterprise (Dedicated CSM, 99.9% uptime SLA, 24/7 support).
  - Sales Enablement: Standard objection handling guide. Discount authority capped at 15% for reps; 25% requires VP approval.

Upgrade moments:
- Seat limit reached (admin attempts to invite user over the plan cap).
- MTE reaches 80% alert threshold (in-app nudge to auto-bill or upgrade tier).

Cancellation/downgrade:
- Users can cancel or downgrade anytime in the billing portal.
- Upon cancellation, data shifts to a 30-day read-only retention window before permanent deletion.
- Data export available via CSV/API during the retention window.

Metrics:
- pricing_page_viewed, trial_started, checkout_started, upgrade_clicked, overage_alert_triggered, cancellation_started, winback_offer_accepted.

Unit economics:
- Gross margin target: 85%
- CAC payback / NRR target: 12 months / 115% NRR
- Cost and abuse controls: Throttle ingestion on free trials exceeding 500k MTE; bot/abuse detection on signup; auto-pause infrastructure for inactive enterprise workspaces.

Experiment/rollout plan:
- Test design: A/B test annual discount framing (16% off vs "2 months free") on 50% of new pricing page visitors.
- Grandfathering/migration: Existing Growth customers grandfathered at current MTE baseline for 6 months. At renewal, they migrate to the new MTE limits with a 10% loyalty discount applied to overages for the first year.
- Customer communications: 30-day and 7-day pre-renewal emails detailing MTE usage. In-product banners at 80% MTE limit.
- Guardrails: Conversion rate > 3.5%, Trial-to-Paid > 15%, Churn rate < 4%.
- Rollback trigger: If gross conversion drops > 10% versus control for 14 consecutive days.

Risks:
- Bill shock from usage spikes (mitigated by auto-pause default and 80% alerts).
- Procurement friction delaying Enterprise deals (mitigated by pre-built security/compliance templates).
```
