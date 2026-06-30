# Daily Reward And Streak Systems

Daily loops work when they reconnect users to real product value. They fail when they become chores, pressure, or exploitable reward faucets.

## Rule IDs

- `streak-1` — Tie the reward to a meaningful product behavior, not just opening the app.
- `streak-2` — Use streaks to celebrate continuity; do not turn missed days into shame or irreversible punishment.
- `streak-3` — Define missed-day handling: freeze, grace, repair, soft reset, or true reset.
- `streak-4` — Balance rewards against the economy, subscription value, ad value, and progression speed.
- `streak-5` — Show the next reward and progress only when it clarifies motivation without excessive pressure.
- `streak-6` — Notifications should remind users of value, not merely threaten streak loss.
- `streak-7` — Cap claims and detect clock tampering, duplicate devices, reinstall abuse, and bot-like claiming.
- `streak-8` — Live events need timezone, calendar, eligibility, and compensation rules for outages.
- `streak-9` — Avoid making users choose between sleep/health and streak preservation.
- `streak-10` — Measure long-term retention and product depth, not just day-1 claim rate.

## Reward design table

| Pattern | Best for | Risk | Safer design |
| --- | --- | --- | --- |
| Daily check-in | Casual return ritual | Opens without meaningful use | Require one valuable action or show useful next step |
| Streak multiplier | Habit-forming products | Anxiety and compulsion | Add freeze/repair and cap multiplier growth |
| Calendar rewards | Games and learning apps | Users wait for rewards only | Mix utility, cosmetic, and progression-safe rewards |
| Missions | Teaching product depth | Arbitrary chores | Link missions to activation or mastery milestones |
| Comeback reward | Lapsed reactivation | Training users to churn | Limit frequency and pair with new value |

## State machine

```text
eligible_today -> reward_available -> claimed_today -> streak_advanced -> cooldown_until_next_day
eligible_today -> missed_day -> grace_available -> streak_repaired
missed_day -> soft_reset -> new_streak_started
claimed_today -> suspicious_claim -> review_or_cap
live_event_active -> event_reward_available -> event_claimed -> event_complete
```

## Event schema

Required events:

- `daily_reward_available`: user_id/session_id, streak_day, calendar_day, reward_id, timezone.
- `daily_reward_claimed`: reward_id, streak_before, streak_after, claim_source, device_id.
- `streak_missed`: streak_length, missed_reason_if_known, timezone, grace_available.
- `streak_repaired`: repair_type, cost, streak_length, repair_count.
- `mission_completed`: mission_id, behavior_category, reward_id, completion_latency.
- `reward_abuse_flagged`: reason, device_count, clock_delta, claim_velocity.

## Review checklist

- The loop reinforces a behavior that improves user success or game enjoyment.
- Missed-day handling is explicit and humane.
- Reward amounts are economy-safe and do not cannibalize paid value unintentionally.
- Notifications have quiet hours, fatigue caps, and a user-facing reason.
- Abuse controls do not punish honest timezone travel or offline use without review.
- Metrics include retention depth, churn after missed streak, notification opt-out, and economy inflation.
