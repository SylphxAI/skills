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

## Pricing page requirements

- Who each plan is for.
- Monthly and annual price, including discount clarity.
- Trial length and renewal behavior.
- Usage limits and overage behavior.
- Cancellation and downgrade consequences.
- Data export and retention after cancellation.
- Support level by plan.
- Security/compliance route for enterprise.

## Metrics

Track:

```text
pricing_page_viewed
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
```

Evaluate pricing by activation, conversion, retention, expansion, support load, refund rate, and long-term revenue.
