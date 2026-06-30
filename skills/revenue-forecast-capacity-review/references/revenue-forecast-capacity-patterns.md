# Revenue Forecast Capacity Patterns

## Forecast state machine

```text
decision_defined -> assumptions_listed -> data_pulled -> scenarios_built -> capacity_checked -> forecast_reviewed -> decision_made -> variance_reviewed
       |                    |             |                 |                  |                 |              |
       v                    v             v                 v                  v                 v              v
 vague_decision       missing_owner  data_stale       single_scenario    capacity_blocked   confidence_low  model_revised
```

## Rule IDs

- `revenue-forecast-1` — Start with the decision: hiring, infrastructure, launch spend, pricing, quota, inventory, partner campaign, or runway.
- `revenue-forecast-2` — Classify forecast type: bookings, recognized revenue, usage, GMV, ad revenue, game monetization, support demand, infra load, or supply capacity.
- `revenue-forecast-3` — State assumptions for traffic, conversion, activation, retention, churn, expansion, refunds, discounts, fees, support load, and margin.
- `revenue-forecast-4` — Use cohort behavior where retention or monetization changes over time.
- `revenue-forecast-5` — Include base, upside, downside, and capacity-constrained scenarios.
- `revenue-forecast-6` — Capacity includes infra, support, sales, onboarding, creator/seller supply, inventory, and compliance review where relevant.
- `revenue-forecast-7` — Leading indicators should be measurable before revenue lands: qualified pipeline, activation, usage, retention, waitlist quality, or support demand.
- `revenue-forecast-8` — Gross margin and cash timing matter as much as top-line revenue.
- `revenue-forecast-9` — Variance review should compare assumptions to actuals and update the model.
- `revenue-forecast-10` — Forecast outputs should show confidence and decision thresholds, not false precision.

## Decision table

| Planning decision | Required scenario | Capacity check | Stop signal |
| --- | --- | --- | --- |
| Launch campaign spend | Base/downside conversion | Support and infra load | CAC payback too long |
| Enterprise sales hiring | Pipeline and win-rate | Onboarding/security review capacity | Low qualified pipeline |
| AI feature pricing | Usage and margin | Inference cost and quota | Margin negative at p95 usage |
| Marketplace expansion | GMV and supply | Seller quality/support | Demand without supply quality |
| Game live event forecast | ARPDAU and retention | Economy/support capacity | Refunds or economy inflation |

## Forecast checklist

- Forecast decision and threshold are clear.
- Assumptions have owners, sources, and confidence.
- Scenarios include capacity-constrained downside.
- Revenue includes churn, expansion, refunds, discounts, fees, cash timing, and margin.
- Leading indicators and variance review cadence exist.
- Forecast changes hiring, spend, pricing, launch, or capacity decisions.

## Event schema

Track: `forecast_model_created`, `forecast_assumption_updated`, `forecast_scenario_reviewed`, `capacity_constraint_detected`, `forecast_decision_made`, `forecast_variance_reviewed`, `forecast_model_revised`.

Recommended properties: `forecast_type`, `decision_type`, `segment`, `horizon_days`, `scenario`, `assumption_type`, `confidence`, `revenue_bucket`, `gross_margin_bucket`, `capacity_type`, `constraint_severity`, `leading_indicator`, `variance_percent`, `decision`.
