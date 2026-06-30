# Ad Monetization Systems

Good ad monetization is a portfolio decision: revenue, retention, payer conversion, UX trust, privacy, and support load must be measured together.

## Rule IDs

- `ads-1` — Use rewarded ads for user-initiated value exchanges; state reward, limits, and failure handling before playback.
- `ads-2` — Use interstitials only at natural breaks where interruption does not corrupt input, purchases, onboarding, or recovery.
- `ads-3` — Suppress or reduce ads for paying users, trial users in a trust-building moment, recently failed users, and users showing fatigue.
- `ads-4` — Frequency caps should consider session count, minutes since last impression, placement, format, user value, and frustration signals.
- `ads-5` — Mediation changes must be observable by network, placement, country, device, consent state, fill rate, eCPM, and error class.
- `ads-6` — Privacy consent and age-sensitive rules are product states, not banner copy; ad eligibility must respect them consistently.
- `ads-7` — Reward grants must be idempotent and recoverable if the ad network callback is delayed or duplicated.
- `ads-8` — Do not let ad revenue cannibalize higher-quality revenue without an explicit strategy.
- `ads-9` — Track negative signals: rage closes, churn after impression, support complaints, low-quality ads, and payer downgrade.
- `ads-10` — Keep a kill switch for each placement and format.

## Placement decision table

| Placement | Good use | Avoid | Metrics |
| --- | --- | --- | --- |
| Rewarded ad | Extra lives, bonus currency, optional unlock, retry boost | Required progression, hidden reward, no-fill dead end | opt-in rate, completion, reward claim, next-session return |
| Interstitial | Level end, article boundary, completed task | First launch, mid-input, checkout, error state, permission request | impressions/session, close rate, churn after impression |
| Banner | Low-attention persistent content | Dense productivity UI, forms, premium screens | viewability, accidental tap rate, layout shift |
| Native ad | Feed or content list with clear labeling | Confusing ad with user content | CTR, report rate, scroll depth |
| Offerwall | High-intent earn-more path | Core progression dependency | start, completion, fraud, support tickets |

## State machine

```text
session_started -> placement_eligible -> consent_checked -> ad_requested
ad_requested -> ad_loaded -> ad_shown -> ad_completed -> reward_pending -> reward_granted
ad_requested -> no_fill -> fallback_offered
ad_shown -> ad_closed_early -> cooldown_applied
reward_pending -> callback_delayed -> reward_reconciled
placement_eligible -> suppressed_by_user_state
```

## Event schema

Required events:

- `ad_placement_eligible`: placement_id, user_state, session_index, payer_state, fatigue_score.
- `ad_requested`: placement_id, format, network_stack, consent_state, country, device_class.
- `ad_shown`: impression_id, placement_id, format, network, ecp_micros_estimate.
- `ad_completed`: impression_id, completed, close_reason, watch_seconds.
- `ad_reward_granted`: impression_id, reward_type, reward_amount, idempotency_key.
- `ad_suppressed`: placement_id, suppression_reason, user_state.
- `ad_complaint`: placement_id, creative_category, reason, support_ticket_id.

## Review checklist

- Every ad has a user-state eligibility rule and kill switch.
- Rewarded ads state reward and handle no-fill or callback failure gracefully.
- Payers/subscribers are not surprised by ads after paying unless the value proposition says so.
- Consent, age, and region constraints are enforced before ad request.
- Experiments measure ARPDAU with retention, conversion, refund, complaint, and support guardrails.
