# Analytics Event Taxonomy Patterns

## Taxonomy principles

| Concept | Rule |
| --- | --- |
| Event | A meaningful user/system action at a point in time |
| Property | Bounded context needed to analyze the event |
| Identity | Stable user/account/device/workspace mapping with privacy constraints |
| Funnel | Ordered decision path with clear conversion definition |
| Cohort | Group defined by behavior or lifecycle state |
| Metric | Decision-supporting aggregation with owner and caveats |

## Rule IDs

- `analytics-1` — Start from decision questions before naming events.
- `analytics-2` — Use verb-past-tense event names such as `checkout_started` or `first_value_reached`.
- `analytics-3` — Events should have one trigger owner and one semantic meaning.
- `analytics-4` — Properties need bounded cardinality unless explicitly approved.
- `analytics-5` — Do not put raw PII, secrets, payment tokens, or sensitive content in analytics properties.
- `analytics-6` — Track both success and failure states for critical flows: signup, activation, payment, entitlement, refund, backup, support.
- `analytics-7` — Include guardrail metrics for growth experiments: churn, refund, complaint, latency, support contact, unsubscribe.
- `analytics-8` — Define identity merge rules for anonymous, signed-in, workspace, team, and device identities.
- `analytics-9` — Version or deprecate event changes; do not silently repurpose names.
- `analytics-10` — Instrumentation QA should compare expected event sequences against actual traces.

## Core lifecycle event set

```text
visitor_arrived -> signup_started -> signup_completed -> onboarding_started -> first_value_reached -> subscription_started -> payment_confirmed -> retained_user_returned -> support_contacted -> churned_or_canceled
```

## Decision table

| Question | Events needed |
| --- | --- |
| Are users activating? | onboarding_started, setup_step_completed, first_value_reached |
| Why checkout fails? | checkout_started, payment_failed, entitlement_grant_failed, support_contacted |
| Are notifications healthy? | notification_sent/opened, preference_changed, unsubscribe_clicked, complaint_signal |
| Is promotion incremental? | offer_shown, offer_redeemed, conversion, refund, churn guardrail |
| Is support improving product? | support_case_opened, category, resolution, product_feedback_created |

## QA checklist

Check naming, trigger definition, owner, properties, cardinality, privacy, identity behavior, duplicate firing, missing failure events, dashboard usage, and deprecation plan.
