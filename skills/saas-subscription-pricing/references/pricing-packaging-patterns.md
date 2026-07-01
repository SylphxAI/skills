# Pricing and Packaging Patterns

## Model selection

| Model | Good for | Risks |
| --- | --- | --- |
| Free trial | Fast time-to-value, clear paid product | low-intent trials, support load |
| Freemium | viral/team products, habit formation | free users consume cost without conversion |
| Seat-based | collaboration and admin value | punishes adoption if overused |
| Usage-based | variable value and cost | bill shock, hard forecasting |
| Tiered | simple buying and packaging | arbitrary limits if not value-aligned |
| Enterprise | security, compliance, procurement | sales complexity and long cycles |
| Hybrid | complex products with usage + seats | pricing comprehension risk |

## Packaging rules

- `pricing-1` — Choose a value metric customers already understand.
- `pricing-2` — Gate scale, collaboration, compliance, automation, or advanced control; do not gate first value too early.
- `pricing-3` — Make the upgrade reason visible before the paywall moment.
- `pricing-4` — Put cancellation and renewal truth near subscription actions.
- `pricing-5` — Do not train loyal users to churn for discounts.
- `pricing-6` — Enterprise pricing needs proof: SSO/SAML, audit, DPA, support/SLA, security docs, admin controls.
- `pricing-7` — Any pricing change needs a rollout plan: audience, hypothesis, holdout or staged exposure, guardrail metrics, rollback trigger, owner, and review date.
- `pricing-8` — Migration must name who is grandfathered, for how long, what changes at renewal, what support can offer, and how customers export or downgrade before enforcement.

## Pricing page requirements

- Who each plan is for.
- Monthly and annual price, including discount clarity.
- Trial length and renewal behavior.
- Usage limits and overage behavior.
- Cancellation and downgrade consequences.
- Data export and retention after cancellation.
- Support level by plan.
- Security/compliance route for enterprise.

## Rollout and migration plan

Include this whenever creating or changing subscription pricing:

```text
Hypothesis:
Audience:
Excluded users:
Experiment or staged rollout:
- Control / holdout:
- Exposure ramp:
- Success metrics:
- Guardrails:
Grandfathering:
- Existing paid customers:
- Existing trials:
- Annual contracts:
- Enterprise contracts:
Communications:
- In-product notice:
- Email sequence:
- Sales/support enablement:
Rollback trigger:
Decision date:
Owner:
```

Default rules:

- Do not force existing annual or enterprise customers onto new terms mid-contract unless the contract allows it and support/legal review is complete.
- Prefer renewal-bound migration for paid customers; use clear notice windows and explain exact changes.
- Grandfather forever only when the operational cost is low; otherwise set a sunset date, migration offer, and support exception path.
- Hold out a comparable cohort or run a staged rollout when price sensitivity, churn risk, or sales-cycle impact is uncertain.
- Give support approved save offers, objection handling, refund boundaries, and escalation criteria before launch.

## Metrics

Track:

```text
pricing_page_viewed
pricing_experiment_assigned
plan_compared
trial_started
checkout_started
subscription_started
upgrade_clicked
upgrade_completed
downgrade_started
cancellation_started
cancellation_completed
winback_offer_shown
winback_accepted
pricing_notice_seen
pricing_notice_acknowledged
pricing_migration_started
pricing_migration_completed
```

Evaluate pricing by activation, conversion, retention, expansion, support load, refund rate, and long-term revenue.
