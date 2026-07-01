# Lifecycle Pricing Experiment Patterns

## Lifecycle Pricing Experiment Review state machine

```text
hypothesis_written -> cohort_selected -> billing_qa_passed -> experiment_live -> guardrail_checked -> readout_completed -> policy_decided
       |                   |                  |                  |                  |                     |
       v                   v                  v                  v                  v                     v
 weak_hypothesis    eligibility_bias    invoice_bug       metric_delay       guardrail_breach     inconclusive
```

## Rule IDs

- `pricing-experiment-1` — Define lifecycle stage, target behavior, offer mechanics, eligibility, control or holdout, and customer-facing surface before launch.
- `pricing-experiment-2` — Separate acquisition, activation, upgrade, expansion, renewal, winback, and retention experiments because metrics and harms differ.
- `pricing-experiment-3` — QA coupons, invoices, taxes, entitlements, proration, refunds, and analytics before exposing a pricing experiment.
- `pricing-experiment-4` — Measure revenue quality with conversion, ARPA, margin, churn, downgrade, refund, support contacts, and customer sentiment.
- `pricing-experiment-5` — Use holdouts or causal readouts when seasonality, sales intervention, or lifecycle timing can fake uplift.
- `pricing-experiment-6` — Create stop conditions for trust complaints, billing defects, refund spikes, support overload, or margin erosion.
- `pricing-experiment-7` — Document winning offer policy, rollout path, support macros, customer messaging, and sunset of losing variants.
- `pricing-experiment-8` — Retire experiments that cannot produce a decision because of bad instrumentation or ambiguous cohorts.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Upgrade discount | Test with holdout and margin guardrail | Cohort and billing QA | Short-term upgrade, long-term downgrade |
| Renewal save offer | Restrict to risk segment | Churn model and policy | Training customers to threaten churn |
| Regional price | Run fairness/legal review | Country and tax evidence | Perceived unfairness |
| Annual conversion | Track retention and cash impact | Invoice/proration proof | False ARR quality |
| Guardrail breach | Pause and investigate | Refund/support metrics | Trust damage |

## Pricing experiment checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `pricing_experiment_hypothesis_created`, `pricing_experiment_cohort_assigned`, `pricing_offer_viewed`, `pricing_offer_accepted`, `pricing_guardrail_breached`, `pricing_experiment_readout_completed`, `pricing_policy_updated`.

Recommended properties: `experiment_id, lifecycle_stage, segment, offer_type, variant, holdout, eligibility_reason, invoice_status, entitlement_status, conversion, revenue_delta, churn_delta, refund_rate, support_contact_rate, decision`.
