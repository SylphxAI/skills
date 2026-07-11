# Game Economy Patterns

## Economy map

Document each currency and item with: source, sink, storage cap, tradeability, expiration, purchaseability, refund behavior, support adjustment policy, and abuse risk.

## Rule IDs

- `economy-1` — Every reward source needs a matching sink or progression purpose; uncontrolled sources create inflation and destroy motivation.
- `economy-2` — Sinks should feel like meaningful choices, not taxes on basic enjoyment.
- `economy-3` — Daily check-ins should reward return without making missed days feel like permanent loss.
- `economy-4` — Battle passes and events need clear time cost, catch-up, purchase value, and end-state handling.
- `economy-5` — Ads should be optional value exchange where possible; rewarded ads must grant predictable value.
- `economy-6` — IAP offers need eligibility, price fairness, purchase limits, cooldowns, and support/refund semantics.
- `economy-7` — Random rewards need odds clarity, pity/guarantee design where appropriate, and jurisdiction-aware review.
- `economy-8` — Refunds should revoke remaining value where possible without surprise punitive account bans.
- `economy-9` — Anti-abuse should protect economy integrity through ledgers, rate limits, anomaly detection, and review ladders.
- `economy-10` — Live-ops tuning should preserve player trust; do not nerf purchased value without compensation or communication.

## Decision table

| System | Key risk | Better pattern |
| --- | --- | --- |
| Soft currency | Inflation | Multiple sinks, caps, seasonal drains, price review |
| Premium currency | Refund abuse or distrust | Immutable ledger, clear grants/spends/refunds, support visibility |
| Daily reward | Chore fatigue | Flexible streak protection and meaningful milestone rewards |
| Live event | New-player exclusion | Segmented goals, catch-up, clear end conversion |
| Ads | Retention damage | Frequency caps, opt-in reward, no forced ad after failure |
| Offers | Pay-to-win perception | Cosmetic/convenience/value framing appropriate to genre |

## Event schema

Track: `session_started`, `level_started`, `level_completed`, `currency_earned`, `currency_spent`, `reward_claimed`, `ad_offer_shown`, `ad_watched`, `iap_offer_shown`, `purchase_started`, `purchase_completed`, `refund_detected`, `event_joined`, `battle_pass_progressed`, `support_adjustment_applied`.
