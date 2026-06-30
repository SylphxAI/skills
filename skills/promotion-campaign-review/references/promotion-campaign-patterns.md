# Promotion Campaign Patterns

## Campaign architecture

```text
objective -> audience -> offer -> eligibility -> placement -> message -> fulfillment -> measurement -> learning
```

## Rule IDs

- `promo-1` — Define the campaign objective before choosing the discount or creative.
- `promo-2` — Eligibility rules should be deterministic, explainable, and support-visible.
- `promo-3` — Offers need clear value, expiration, limits, renewal effect, refund effect, and stacking rules.
- `promo-4` — Placement should match user intent: onboarding, pricing page, checkout, lifecycle message, store listing, or in-product moment.
- `promo-5` — Fulfillment must be idempotent and traceable through ledger or campaign events.
- `promo-6` — Promotions should have fraud/abuse controls for coupon sharing, multi-accounting, refund cycling, and geographic arbitrage.
- `promo-7` — Win-back campaigns should restore value and trust, not shame users for leaving.
- `promo-8` — Game/app events need event calendar, reward economy impact, support macros, and post-event conversion handling.
- `promo-9` — Measure incremental value with guardrails: margin, refund rate, churn, support load, complaint rate.
- `promo-10` — Document rollback and sunset behavior before launch.

## Decision table

| Objective | Offer pattern | Guardrail |
| --- | --- | --- |
| First purchase | Trial, intro price, setup bonus | Activation and refund monitoring |
| Upgrade | Feature unlock, annual discount | Existing-plan comparison clarity |
| Win-back | Time-limited return offer | Respect unsubscribe and cancellation reason |
| Game event | Reward multiplier, battle pass boost | Economy inflation and fairness check |
| Referral | Credit or perk for both sides | Fraud, self-referral, payout threshold |
| Store launch | Wishlist/demo/launch discount | Store policy and support readiness |

## Event schema

Track: `campaign_eligible`, `offer_shown`, `offer_clicked`, `offer_redeemed`, `fulfillment_succeeded`, `fulfillment_failed`, `coupon_rejected`, `campaign_conversion`, `campaign_refund`, `campaign_support_contact`, `campaign_unsubscribed`.
