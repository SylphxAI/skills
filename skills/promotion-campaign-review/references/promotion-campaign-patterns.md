# Promotion Campaign Systems

Promotion is a stateful system of audience, eligibility, offer economics,
placement, messaging, fulfillment, measurement, trust, and recovery. It is not
just a banner, coupon, notification, or discount code.

## Campaign architecture

```text
objective -> audience -> offer -> eligibility -> placement -> message
objective -> economics -> fulfillment -> measurement -> learning -> sunset
```

Specify in this order:

1. **Objective:** activation, verified update adoption, first purchase,
   subscription conversion, win-back, expansion, event participation,
   cross-promotion, or referral.
2. **Audience:** user and payer state, lifecycle, geography, platform, age mode,
   cohort, inventory/ownership, consent, exclusions, and reason code.
3. **Offer:** discount, trial, bundle, bonus currency, rewarded boost, cosmetic,
   time-bounded event, referral reward, update benefit, or upgrade.
4. **Eligibility:** who may see, redeem, or receive it; cooldown, conflict,
   stacking, expiry, abuse, and authority rules.
5. **Placement:** pricing/paywall, store, home, level/task end, inbox, push,
   email, checkout, return intent, or partner product.
6. **Message:** exact benefit, qualification, start/end, renewal/normal state,
   limits, ownership overlap, and support route.
7. **Fulfillment:** purchase/qualification authority, idempotent grant,
   entitlement/inventory ledger, verification, reversal, rollback, and support
   visibility.
8. **Measurement:** eligible, exposure, click, redeem, purchase, verified grant,
   refund/reversal, renewal, retention, fatigue, support, and incremental value.
9. **Guardrails:** margin, loyal-customer fairness, economy inflation, fatigue,
   platform policy, consent, minors, fraud, and long-term trust.

## Offer decision table

| Offer | Useful for | Do not use when | Required contract |
| --- | --- | --- | --- |
| Intro trial/price | New subscription conversion | Renewal is not understandable | eligibility, duration, renewal price/date, cancel route |
| Win-back | Genuine lapse and return intent | Active users learn to churn for a better price | lapse definition, user+offer cooldown, renewal price, loyal-user comparison |
| Bundle | Increasing basket value | Ownership overlap is ambiguous | items, owned-item treatment, value arithmetic, stacking |
| Bonus currency/item | First purchase or event | Inflation/sinks are uncontrolled | base/bonus amount, economy source/sink, expiry, reversal |
| Rewarded boost | Optional acceleration | Core play/work becomes ad or offer farming | placement, cap, cooldown, baseline path, fatigue |
| Referral reward | Qualified network growth | Attribution or fraud controls are weak | inviter/invitee state, qualification, pending grant, reversal |
| Update benefit | Verified use of new value | Only installation/restart is observable | eligible version, activation event, idempotent claim, rollback |
| Cross-promotion | Relevant value in another product | It is forced, deceptive, or context-free | source/target, audience fit, deep link, attribution, dismiss/suppress |
| Seasonal/live event | Re-engagement and shared moments | Urgency is fake or rollover is undefined | start/end, calendar, reward/economy effect, post-event conversion |

## Eligibility and fairness invariants

- `promo-eligibility-1` — Never show an offer the user cannot redeem.
- `promo-eligibility-2` — Eligibility is deterministic, versioned,
  support-visible, and explainable by reason code.
- `promo-eligibility-3` — Cooldowns attach to both user and offer/campaign, not
  only device, session, or last impression.
- `promo-eligibility-4` — Define conflict and stacking precedence across trial,
  subscription, coupon, bundle, platform, referral, event, and partner offers.
- `promo-eligibility-5` — Active loyal customers must not receive a materially
  worse outcome solely because churners receive an aggressive win-back deal;
  measure and explicitly decide the loyal-payer effect.
- `promo-eligibility-6` — Users in refund, payment dispute, chargeback, or abuse
  review do not enter aggressive cycling loops; ordinary refunds alone do not
  justify unrelated punishment.
- `promo-eligibility-7` — Regional/platform differences must be lawful,
  contractually permitted, and explainable to support and analytics.
- `promo-eligibility-8` — Age, child, consent, notification, advertising, store,
  payment, and promotion authority is retrieved at execution time.
- `promo-eligibility-9` — A qualification event and a grant event are separate;
  both are idempotent and replay-safe.

## Placement, interruption, and suppression

- Put first-purchase offers after the user understands value, not on cold
  launch before useful interaction.
- Put win-back at genuine return intent: reopen after lapse, paywall revisit,
  relevant content lock, or a user-chosen campaign link.
- Use level-end, task-complete, or natural transition moments for games; never
  interrupt skill/input, payment confirmation, safety, or recovery moments.
- Do not stack modal, push, email, and inbox impressions for the same offer
  inside one short window. Use a cross-channel dedupe key and global fatigue
  budget.
- Dismissal preserves navigation and starts a declared suppression/cooldown.
  Repeated reopening, countdown reset, or blocked exit is forbidden.
- Cross-promotion must be contextually relevant, clearly identify the other
  product, preserve choice, and work without exposing the user's private state
  to the target before consent and authority.

## Message contract

Use:

```text
For <eligible audience>, receive <specific benefit> until/after <condition>.
Then <normal price/state/expiry/reversal rule> applies. <Control/support route>.
```

Always disclose the normal renewal price/state, material limits, expiration,
ownership overlap, and what happens after refund, cancellation, downgrade, or
event end. Forbid fake final warnings, timers that reset while claiming
finality, mystery discounts, shame, loss threats, and terms support cannot
explain.

## Exposure and fulfillment state machines

```text
draft -> approved -> scheduled -> eligible -> exposed -> clicked -> qualified
                                  |            |          |
                                  v            v          v
                              suppressed   dismissed   expired
                                  |            |
                                  +------> cooldown
```

```text
qualified -> pending_authority -> grant_pending -> grant_committed -> verified
                    |                   |               |
                    v                   v               v
                 rejected          retryable       reversal_pending
                                                        |
                                                        v
                                               reversed_or_compensated
```

Purchase, referral, update, cross-promotion, and event authorities stay
separate. Never confirm a reward before its authoritative qualification and
grant commit. Refund, chargeback, fraud, duplicate, cancellation, or rollback
events enter the declared reversal/compensation path without deleting unrelated
user data or value.

## Update and cross-promotion rules

- Reward verified activation or meaningful use of new value, not download,
  installation, restart, permission grant, review/rating, ad click, purchase,
  or forced referral.
- Update benefits are version-bounded, idempotent, restorable, and safe across
  rollback/downgrade. A failed update never strands an entitlement.
- A cross-promotion reward, if any, is tied to a legitimate target-product value
  event with transparent terms. It is not tied to review, rating, contact
  upload, deceptive share, or involuntary invite.
- Source and target products exchange only minimal consented attribution data;
  each has independent opt-out, deletion, support, fraud, and reconciliation.

## Event and evidence contract

Track at minimum:

```text
campaign_eligible
campaign_ineligible
offer_exposed
offer_suppressed
offer_dismissed
offer_clicked
offer_qualified
grant_pending
grant_committed
grant_verified
grant_failed
grant_reversed
campaign_expired
campaign_cooldown_started
campaign_refund_or_dispute
campaign_support_contact
campaign_unsubscribed
```

Required properties include:

```text
campaign_id, offer_id, policy_version, audience_id, placement, channel,
dedupe_key, product_id, source_product_id, target_product_id, price, currency,
discount_type, discount_value, starts_at, ends_at, eligibility_reason,
ineligibility_reason, user_state, payer_state, platform, region, age_mode,
qualification_event_id, authority_event_id, grant_id, reversal_reason
```

Events carry idempotency keys, causal/source event, occurred/received time,
actor, experiment/campaign version, and privacy classification.

## Economics and experiment gates

Evaluate incremental retained contribution, not gross conversion alone:

```text
incremental retained value
- discount and reward cost
- platform/payment fees
- refunds, chargebacks, fraud, and reversals
- ad/notification fatigue and opt-out cost
- support and operational cost
- economy inflation or loyal-customer harm
```

Measure immediate conversion plus post-offer renewal, D7/D14/D30 retention,
baseline cannibalization, loyal-payer effect, refund/chargeback rate, fraud,
support contact rate, complaint/unsubscribe, fatigue, fairness, economy health,
and long-term value. Define scale, hold, pause, rollback, and sunset thresholds
before activation. A day-zero revenue win that increases churn, refunds, support,
or trust loss is not a successful campaign.
