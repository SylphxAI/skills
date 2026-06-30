# Promotion System Patterns

Promotion is a system of eligibility, offer economics, placement, fulfillment, measurement, and trust. It is not just a banner or discount code.

## Promotion design flow

Use this sequence:

1. **Objective**: activation, first purchase, subscription conversion, win-back, expansion, event participation, or referral.
2. **Audience**: user state, payer state, lifecycle stage, geography, platform, cohort, inventory, and exclusions.
3. **Offer**: discount, trial, bundle, bonus currency, rewarded boost, cosmetic item, time-limited event, referral reward, or upgrade.
4. **Eligibility**: who can see it, who can redeem it, cooldown, conflict rules, and abuse limits.
5. **Placement**: paywall, store, home, level-end, inbox, push, email, modal, toast, or checkout.
6. **Message**: what changes, why it matters, what expires, and what happens after.
7. **Fulfillment**: grant path, entitlement, receipt, inventory, rollback, and support visibility.
8. **Measurement**: exposure, click, redeem, purchase, fulfillment, refund, retention, and long-term value.
9. **Guardrails**: margin, fatigue, fairness, platform policy, minors, and payer trust.

## Offer types

| Offer type | Best for | Avoid when | Required details |
| --- | --- | --- | --- |
| Intro trial | New subscription conversion | Users cannot understand renewal | trial length, renewal price, cancel route, eligibility |
| Win-back discount | Lapsed subscriber or payer return | Loyal active users see worse pricing | lapsed definition, cooldown, renewal price |
| Bundle | Increasing basket size | Ownership overlap is confusing | included items, owned-item compensation, bundle value |
| Bonus currency | First purchase or event | Economy inflation is uncontrolled | base amount, bonus amount, expiry if any |
| Rewarded boost | Game/session engagement | Core loop becomes ad farming | reward, cap, placement, cooldown |
| Referral reward | Network effects | Fraud controls are weak | inviter/invitee reward, qualification, fraud checks |
| Seasonal event | Re-engagement | It becomes fake urgency | start/end, event currency, post-event conversion |

## Eligibility rules

- `promo-eligibility-1` — A user should not see an offer they cannot redeem.
- `promo-eligibility-2` — Active subscribers should not be trained to churn for better win-back pricing.
- `promo-eligibility-3` — Cooldowns must be attached to user and offer, not only session.
- `promo-eligibility-4` — Exclude users in refund review, payment dispute, or abuse review from aggressive discount loops.
- `promo-eligibility-5` — If offers differ by region/platform, support and analytics must be able to explain why.

## Placement rules

- `promo-placement-1` — Put first-purchase offers near the moment users understand value, not immediately on cold launch.
- `promo-placement-2` — Put win-back offers at a return intent moment: app open after lapse, paywall revisit, content lock, or campaign link.
- `promo-placement-3` — Use level-end or task-complete placements for games; do not interrupt skill/input moments.
- `promo-placement-4` — Avoid stacking modal + push + inbox for the same offer in a short window.
- `promo-placement-5` — Let users dismiss promotions without losing navigation control.

## Promotion copy formula

Use:

```text
For <audience>, get <specific benefit> until <deadline/condition>. After that, <normal state/price> applies.
```

Examples:

```text
Welcome offer: get 50% off your first month. Renews at $9.99/month after the first month. Cancel anytime in store settings.
```

```text
Come back this week and keep your saved premium filters with 30% off your first month back. Renews at the standard monthly price after the offer period.
```

Avoid:

- fake final warnings;
- timers that reset while claiming finality;
- unclear renewal prices;
- mystery discounts that support cannot explain;
- offers that punish existing loyal users.

## Promotion state machine

```text
draft -> scheduled -> eligible -> exposed -> clicked -> redeemed
                                      |          |
                                      v          v
                                  dismissed   expired
                                      |
                                      v
                                  cooldown
```

Fulfillment state:

```text
redeemed -> purchase_confirmed -> reward_granted -> grant_verified
                         |              |
                         v              v
                      failed        rollback_required
```

## Events

```text
promo_eligible
promo_exposed
promo_dismissed
promo_clicked
promo_redeemed
promo_purchase_confirmed
promo_grant_succeeded
promo_grant_failed
promo_expired
promo_cooldown_started
promo_refund_detected
```

Properties:

```text
offer_id, campaign_id, audience_id, placement, product_id, price,
currency, discount_type, discount_value, starts_at, ends_at,
eligibility_reason, ineligibility_reason, user_state, platform
```

## Experiment metrics

Measure:

- immediate conversion;
- incremental revenue, not gross revenue only;
- refund rate;
- subscription renewal after promo period;
- retention after 7/14/30 days;
- ad fatigue or notification opt-out if promotion used those channels;
- support contact rate;
- effect on loyal payer cohort.

A promotion that increases day-0 revenue but increases refunds, churn, or support load may be negative quality.
