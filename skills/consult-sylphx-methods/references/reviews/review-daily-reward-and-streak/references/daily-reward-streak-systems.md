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
- `streak-11` — Paid repair must be optional, capped, non-punitive, and paired with free or earned recovery paths.
- `streak-12` — VIP multipliers and gacha-currency rewards need explicit economy ceilings so payer benefits do not become pay-to-win or inflation.
- `streak-13` — Abuse prevention should cover clock manipulation, reinstall/device farming, multi-accounting, emulator/bot patterns, duplicate claims, and account-sharing without punishing honest travel or offline play.

## Reward design table

| Pattern | Best for | Risk | Safer design |
| --- | --- | --- | --- |
| Daily check-in | Casual return ritual | Opens without meaningful use | Require one valuable action or show useful next step |
| Streak multiplier | Habit-forming products | Anxiety and compulsion | Add freeze/repair and cap multiplier growth |
| Calendar rewards | Games and learning apps | Users wait for rewards only | Mix utility, cosmetic, and progression-safe rewards |
| Missions | Teaching product depth | Arbitrary chores | Link missions to activation or mastery milestones |
| Comeback reward | Lapsed reactivation | Training users to churn | Limit frequency and pair with new value |
| Paid streak repair | Long-term streak trust | Panic purchase or coercive monetization | Offer free freeze first, cap paid repairs, use neutral copy, no last-second pressure |
| VIP reward multiplier | Subscriber/player-status value | Pay-to-win, inflation, unfair calendar progression | Cap multiplier, exclude scarce gacha currency, prefer cosmetics/XP/convenience |

## State machine

```text
eligible_today -> reward_available -> claimed_today -> streak_advanced -> cooldown_until_next_day
eligible_today -> missed_day -> grace_available -> streak_repaired
missed_day -> soft_reset -> new_streak_started
claimed_today -> suspicious_claim -> review_or_cap
live_event_active -> event_reward_available -> event_claimed -> event_complete
suspicious_claim -> soft_hold -> review_passed -> claim_restored
suspicious_claim -> capped_or_denied -> appeal_available
```

## Event schema

Required events:

- `daily_reward_available`: user_id/session_id, streak_day, calendar_day, reward_id, timezone.
- `daily_reward_claimed`: reward_id, streak_before, streak_after, claim_source, device_id.
- `streak_missed`: streak_length, missed_reason_if_known, timezone, grace_available.
- `streak_repaired`: repair_type, cost, streak_length, repair_count.
- `mission_completed`: mission_id, behavior_category, reward_id, completion_latency.
- `reward_abuse_flagged`: reason, device_count, clock_delta, claim_velocity.
- `repair_offer_viewed`: repair_type, free_option_available, paid_option_visible, copy_variant, streak_length.
- `repair_used`: repair_type, cost, streak_length, repair_count, days_since_last_repair.
- `vip_reward_applied`: tier, multiplier, reward_category, excluded_currency_amount, cap_hit.
- `duplicate_claim_blocked`: user_id/session_id, account_cluster_id, device_hash, claim_window, reason.

## Streak recovery policy

Use recovery to preserve trust, not to sell anxiety.

| Scenario | Preferred handling | Avoid |
| --- | --- | --- |
| First miss after a healthy streak | Free grace or earned freeze if available | Immediate reset or paid-only repair |
| Repeated misses | Soft reset with milestone history preserved | Shame copy or permanent loss framing |
| Long streak at risk | One clear neutral repair screen with free option first | Countdown pressure, red panic UI, bundled purchase upsell |
| Outage or server incident | Automatic compensation and status message | Making players contact support one by one |
| Travel/timezone change | Home-timezone lock plus limited manual change and support appeal | Silent fraud flag or instant reset |
| Offline session | Queue proof of meaningful play, reconcile on next sync, never auto-grant unearned rewards | Rejecting all offline play or allowing unlimited offline claims |

Paid repair rules:

- Always provide a free or earned recovery path before paid repair.
- Cap paid repair frequency and total streak length protected by paid repair.
- Do not offer paid repair inside a notification; show it only after the player opens the reward screen.
- Use neutral copy: "Restore this streak" instead of "Don't lose everything."
- Exclude paid repair from A/B tests that optimize short-term spend without monitoring churn, complaints, and refund/support signals.

## Economy balance controls

| Surface | Inflation risk | Control |
| --- | --- | --- |
| Gacha currency | Daily faucet becomes dominant acquisition path | Low fixed cap, no escalating multi-pull ladder, monthly budget limit |
| VIP multiplier | Payers accelerate scarce rewards too fast | Apply to XP/cosmetics/convenience first; exclude premium/gacha currency or cap tightly |
| Comeback bonus | Players learn to churn for better rewards | Cooldown by absence length, attach to new content, lower value than steady play |
| Calendar completion | Missed days cause month-end pressure | Allow catch-up tokens, preview next month, keep final reward progression-safe |
| Live event compensation | Duplicate grants after outages | Idempotent grant ledger and incident-scoped eligibility |

## Abuse and remediation ladder

Start with caps and review, not immediate punishment.

| Signal | Detection | Proportionate action |
| --- | --- | --- |
| Clock manipulation | device/server delta, repeated rollback, impossible claim spacing | require server sync, hold claim, explain if user-facing |
| Reinstall/device farming | device hash cluster, repeated new installs, same account/device graph | cap claims, require account binding |
| Multi-accounting | account cluster, payment/device/IP overlap, synchronized claims | limit reward transferability, review before sanctions |
| Bot/emulator velocity | claim timing, session length, input pattern, emulator fingerprint | rate limit, captcha only if necessary, support appeal |
| Duplicate offline claims | local claim queue collision or replay | reconcile idempotently, keep legitimate play, deny duplicates |
| Account sharing | distant simultaneous claims or impossible travel | step-up verification, timezone lock, support appeal |

Never remove purchased items or unrelated earned progress as a streak-abuse penalty unless the product has clear policy, evidence, and appeal handling.

## Review checklist

- Complete audits should cover, in this order: retention ethics, precise state rules, economy balance, abuse/remediation, measurement, then support copy. If answer space is limited, compress bullets instead of dropping a category.
- The loop reinforces a behavior that improves user success or game enjoyment.
- Missed-day handling is explicit and humane.
- Reward amounts are economy-safe and do not cannibalize paid value unintentionally.
- Paid repair has a free/earned alternative, neutral copy, frequency caps, and complaint/churn monitoring.
- VIP and gacha rewards have ceilings, exclusions, and payer/non-payer fairness checks.
- Notifications have quiet hours, fatigue caps, and a user-facing reason.
- Abuse controls cover clock, reinstall/device farming, multi-accounting, bot/emulator, duplicate offline claims, and account sharing without punishing honest timezone travel or offline use without review.
- Metrics include retention depth, churn after missed streak, notification opt-out, and economy inflation.
