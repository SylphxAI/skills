# Retention Cohort Systems

Retention is a product loop measurement. A good retention review asks which user returned, for what value, under what context, and what action should change.

## Rule IDs

- `retention-1` — Define the retained action as meaningful product value, not app open, page view, or accidental session by default.
- `retention-2` — Separate acquisition cohort, activation cohort, payer cohort, feature cohort, lifecycle cohort, and resurrection cohort.
- `retention-3` — Use the time grain that matches the product loop: daily habit, weekly workflow, monthly billing, seasonal game event, or production API usage.
- `retention-4` — Segment by source, platform, version, geography, persona, plan, payer state, feature adoption, and onboarding path before diagnosing.
- `retention-5` — Watch denominator drift, instrumentation changes, bot/fraud, deleted users, reinstall/device identity, and seasonality.
- `retention-6` — Pair retention with quality metrics: depth, success, support contacts, refunds, opt-outs, gross margin, and satisfaction.
- `retention-7` — Resurrection should be measured separately from retained existing users.
- `retention-8` — Retention interventions should state mechanism: activation clarity, habit loop, notification, reward, content, collaboration, performance, pricing, or support.
- `retention-9` — Experiments should predefine movement expected by cohort and guardrail metrics.
- `retention-10` — Never hide a weak core loop behind blended averages.

## Cohort decision table

| Product | Retained action | Useful cuts | Bad default |
| --- | --- | --- | --- |
| SaaS | completes weekly job or collaborates | role, team size, import, plan | login only |
| Mobile app | meaningful session outcome | onboarding path, notification consent, platform | app open |
| Game | plays core loop or progresses | level, economy state, payer, event exposure | launch only |
| Developer tool | production usage or successful run | language, API key type, error rate | docs visit |
| Marketplace | repeat purchase/sale/listing success | category, buyer/seller, trust state | page view |
| Subscription | renewal with value use | trial cohort, plan, cancellation reason | active billing only |

## State machine

```text
acquired -> activated -> retained_period_1 -> retained_period_2 -> habit_or_workflow_established
activated -> churned -> resurrected -> retained_after_resurrection
acquired -> never_activated -> onboarding_intervention
retained_period_1 -> monetized -> retained_payer_or_churned_payer
retention_drop_detected -> segment_diagnosed -> hypothesis_tested -> product_change_or_no_change
```

## Event schema

Recommended events:

- `activation_achieved`: activation_event, activation_latency, onboarding_path, source.
- `retained_action_completed`: retained_action, cohort_id, period_index, depth_value.
- `cohort_segment_assigned`: source, platform, version, plan, persona, payer_state.
- `churn_signal_detected`: signal_type, last_value_action, support_contacted, cancel_reason.
- `resurrection_event`: return_source, days_inactive, action_completed, message_or_offer_id.
- `retention_experiment_exposed`: hypothesis_id, cohort, variant, guardrail_scope.

## Review checklist

- Cohort definition maps to product value and correct time grain.
- Activation, retention, resurrection, monetization, and churn are separated.
- Segment cuts rule out acquisition mix and instrumentation artifacts.
- Actions map to product mechanisms, not generic reminders.
- Guardrails include fatigue, refunds, support, margin, and low-quality usage.
