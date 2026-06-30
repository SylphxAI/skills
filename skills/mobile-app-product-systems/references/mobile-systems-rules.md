# Mobile App Product Systems Rules

These are product-system rules for mobile apps and games. Use them as design constraints, not a checklist to force every app into the same economy.

## Commerce and refunds

- `mobile-commerce-1` — Treat entitlement as a state machine: unknown, pending, active, grace, expired, refunded, revoked, restored.
- `mobile-commerce-2` — Always provide a restore path for purchases and subscriptions where platform norms expect it.
- `mobile-commerce-3` — Refund UX should explain what the app can do, what the store controls, and what happens to entitlement after refund.
- `mobile-commerce-4` — Never show paid value as active until receipt verification or platform confirmation is durable enough for the app's risk level.
- `mobile-commerce-5` — Support should see purchase IDs, product IDs, platform, entitlement state, and last verification time without asking users to screenshot everything.

## Subscriptions

- `mobile-subscription-1` — Show billing period, renewal behavior, trial end, cancellation route, and included value near the subscribe action.
- `mobile-subscription-2` — Design grace, billing retry, expired, and resubscribed states explicitly.
- `mobile-subscription-3` — Win-back offers should target lapsed users with a reason to return, not punish loyal subscribers with worse pricing.
- `mobile-subscription-4` — Do not bury cancellation education; trust increases conversion quality.

## In-app purchases

- `mobile-iap-1` — Separate consumable, non-consumable, and subscription products in code, analytics, copy, and support tools.
- `mobile-iap-2` — Make purchase confirmation proportional to risk: low-friction for small repeat consumables, extra clarity for expensive or irreversible purchases.
- `mobile-iap-3` — Reward delivery must be idempotent; retrying receipt processing must not duplicate grants.
- `mobile-iap-4` — Bundles should explain individual value, bundle value, and ownership overlap.

## In-app advertising

- `mobile-ads-1` — Rewarded ads should be user-initiated and clearly state the reward before playback.
- `mobile-ads-2` — Interstitials should appear at natural breaks, never during input, payment, onboarding trust-building, or critical failure recovery.
- `mobile-ads-3` — Frequency caps should be user-state aware: new users, payers, subscribers, and recently frustrated users deserve quieter ad load.
- `mobile-ads-4` — Track ad fatigue signals: session depth, close rate, churn after impression, and reward claim rate.

## Promotions

- `mobile-promo-1` — Promotions need eligibility, start/end, cooldown, inventory, and conflict rules.
- `mobile-promo-2` — Do not fake countdowns, scarcity, or personalized discounts. If a timer resets, do not present it as final.
- `mobile-promo-3` — Promotional copy should say what changes, for whom, until when, and what happens after.
- `mobile-promo-4` — Avoid stacking offers that teach users never to pay full price unless discounting is the explicit strategy.

## Daily check-in and retention loops

- `mobile-retention-1` — Daily check-in should create a positive return ritual, not a punishment machine.
- `mobile-retention-2` — Provide streak repair, pause, or soft reset when the product benefits from long-term trust.
- `mobile-retention-3` — Rewards should support the core loop; do not create a parallel economy that users farm but do not value.
- `mobile-retention-4` — Missions should introduce meaningful product behaviors, not arbitrary taps.
- `mobile-retention-5` — Show progress toward the next reward when it increases motivation without adding pressure.

## Notifications

- `mobile-notification-1` — Ask for notification permission after demonstrating value, not on first launch by default.
- `mobile-notification-2` — Separate transactional, social, lifecycle, and promotional notification channels.
- `mobile-notification-3` — Rate-limit by user state, local time, recent engagement, and channel fatigue.
- `mobile-notification-4` — Every promotional notification should have a product reason, not just a marketing calendar reason.
- `mobile-notification-5` — Respect quiet hours and make notification settings understandable in product language.

## Analytics and experiments

- `mobile-analytics-1` — Track exposure, intent, conversion, fulfillment, failure, refund, and support contact as separate events.
- `mobile-analytics-2` — Attach product ID, offer ID, campaign ID, placement, user state, and platform to monetization events.
- `mobile-analytics-3` — Evaluate monetization experiments by long-term value and trust metrics, not only immediate revenue.
- `mobile-analytics-4` — Guard experiments from harming payers, minors, or support-heavy cohorts without explicit review.
