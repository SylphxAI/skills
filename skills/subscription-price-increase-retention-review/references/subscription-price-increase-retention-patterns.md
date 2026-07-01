# Subscription Price Increase Retention Review Patterns

## Subscription Price Increase Retention Review state machine

```text
increase_scoped -> cohorts_segmented -> value_message_prepared -> notice_delivered -> renewal_observed -> retention_learned
       |                 |                    |                        |                 |                 |
       v                 v                    v                        v                 v                 v
 scope_gap        cohort_blindspot      weak_value_story         consent_gap       churn_spike      learning_gap
```

## Rule IDs

- `price-retention-1` — Segment cohorts by plan, tenure, usage depth, feature adoption, price sensitivity, billing channel, region, renewal date, and support history.
- `price-retention-2` — Model net revenue through uplift, churn, refunds, payment failures, save-offer cost, support load, annual migration, and long-term LTV.
- `price-retention-3` — Align value narrative to real product improvements, customer outcomes, plan differences, and future investment without exaggeration.
- `price-retention-4` — Map consent, notice, cancellation, renewal, refund, and platform-disclosure requirements for each billing channel and region.
- `price-retention-5` — Define grandfathering, phased increases, annual migration, loyalty credits, save offers, and hardship exceptions with eligibility and expiry.
- `price-retention-6` — Prepare cancellation recovery flows that are transparent, reversible, accessible, and measurable without dark patterns.
- `price-retention-7` — Instrument notice delivered, consent accepted, renewal success, cancellation intent, save offer shown, save accepted, refund, support contact, complaint, churn, and expansion.
- `price-retention-8` — Run post-change readback by cohort and channel, then update pricing, packaging, support, and lifecycle messaging based on evidence.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| High-tenure cohort | Consider phased increase | LTV and loyalty analysis | Trust breach |
| Low-usage cohort | Improve value or save | Usage and churn risk | Churn spike |
| Store-billed users | Check platform consent | Channel rule matrix | Compliance issue |
| Save offer | Gate eligibility | Offer experiment | Margin leakage |
| Support spike | Activate macros | Issue taxonomy | Refund confusion |

## Price-increase retention checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `subscription_price_increase_scoped`, `subscription_price_increase_cohort_segmented`, `subscription_price_increase_notice_delivered`, `subscription_price_increase_consent_recorded`, `subscription_save_offer_shown`, `subscription_save_offer_accepted`, `subscription_price_increase_renewal_observed`, `subscription_price_increase_retention_reviewed`.

Recommended properties: `subscription_id, account_id, plan_id, billing_channel, cohort_id, old_price, new_price, notice_version, consent_required, renewal_date, save_offer_id, cancellation_reason, refund_status, support_topic, churn_status, net_revenue_status, decision`.
