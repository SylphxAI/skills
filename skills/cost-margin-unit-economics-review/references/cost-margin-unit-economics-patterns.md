# Cost Margin Unit Economics Patterns

## Economics state machine

```text
model_drafted -> cost_drivers_listed -> usage_measured -> margin_calculated -> sensitivity_tested -> pricing_guardrails_defined -> experiment_launched -> model_reviewed
      |                    |                 |                  |                  |                         |                    |
      v                    v                 v                  v                  v                         v                    v
 missing_cost        data_unavailable    margin_negative   outlier_dominates   hostile_limit_risk       experiment_failed   repricing_needed
```

## Rule IDs

- `unit-econ-1` — Classify monetization model: subscription, usage-based, marketplace, IAP/IAA game, API, AI feature, desktop license, services-assisted, or freemium.
- `unit-econ-2` — Separate revenue, variable cost, fixed cost allocation, gross margin, contribution margin, CAC, retention, expansion, and payback.
- `unit-econ-3` — Include payment fees, app-store commissions, taxes where relevant, refunds, chargebacks, credits, support cost, abuse/fraud, and partner payouts.
- `unit-econ-4` — Usage-heavy products need marginal cost curves, percentile usage, outlier policy, spend caps, and cost alerts.
- `unit-econ-5` — AI products need model/provider cost, caching, retries, eval cost, latency tradeoffs, safety review, and quality guardrails.
- `unit-econ-6` — Games need ARPDAU/ARPPU, ad fill/eCPM, platform fees, event cost, economy inflation, and payer concentration.
- `unit-econ-7` — Marketplaces need take rate, creator payout, refunds/disputes, payment reserves, fraud loss, and support burden.
- `unit-econ-8` — Freemium needs activation-to-paid conversion, free-tier cost ceiling, abuse controls, and upgrade trigger quality.
- `unit-econ-9` — LTV/CAC needs cohort retention, payback window, channel quality, gross margin, and discounting assumptions.
- `unit-econ-10` — Pricing changes need customer trust review, grandfathering policy, migration comms, and churn/refund monitoring.

## Decision table

| Product model | Key margin risk | Required metric | Better lever than panic repricing |
| --- | --- | --- | --- |
| AI SaaS | Heavy user inference cost | Cost per successful task and p95 usage | Caching, model routing, quotas, plan packaging |
| Usage API | Burst abuse or underpriced units | Gross margin by endpoint and tier | Cost-weighted units and spend controls |
| Mobile game | Paid acquisition below payback | LTV by cohort and platform fee | Soft launch tuning and event economy balancing |
| Marketplace | Disputes and support outweigh take rate | Contribution margin per transaction | Holds, quality gates, dispute prevention |
| Freemium SaaS | Free users consume paid infrastructure | Free-tier cost per activated account | Activation gates and usage caps with upgrade value |

## Economics checklist

- Revenue units match value and cost drivers.
- Variable costs include fees, refunds, support, abuse, and platform/partner take.
- Margin is segmented by plan, cohort, channel, region, and usage percentile.
- Sensitivity analysis covers high usage, low retention, high CAC, and discounting.
- Pricing guardrails protect trust while preventing unlimited loss.
- Experiments validate willingness to pay, retention, cost reduction, and expansion.

## Event schema

Track: `unit_economics_model_created`, `cost_driver_measured`, `margin_guardrail_triggered`, `usage_outlier_detected`, `pricing_experiment_started`, `pricing_experiment_decided`, `free_tier_cost_alerted`, `payback_window_reviewed`, `repricing_notice_sent`.

Recommended properties: `model_type`, `plan`, `segment`, `channel`, `region`, `revenue_unit`, `variable_cost_unit`, `gross_margin_bucket`, `contribution_margin_bucket`, `usage_percentile`, `cac_bucket`, `payback_months`, `refund_rate_bucket`, `support_cost_bucket`, `decision`.
