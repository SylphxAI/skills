<think>
The user wants me to review a daily reward and streak system for a mobile game. I need to use the daily-reward-and-streak-review skill and follow the output format. The answer budget is 650 words max, so I need to be concise and audit-friendly.

Let me think about the key components to address:
- Login bonuses
- Streak freezes
- Calendar rewards
- Gacha currency
- Comeback bonuses
- Time-zone changes
- Offline play
- Abuse via clock manipulation
- VIP multipliers
- Notifications
- Monetization pressure

I need to follow the output format exactly:
- Core return behavior:
- Reward promise:
- Loop design (cadence, trigger, reward, recovery, cap)
- State model (states with entry, exit, user message)
- Economy/support risks (risk -> mitigation)
- Metrics

Let me draft a comprehensive but concise response within 650 words. I need to be audit-friendly and focus on artifacts and rubric-critical decisions.
</think>

```text
Core return behavior:
Reconnect players to a satisfying session each day by anchoring a low-friction login, then pulling them into one meaningful action (a quest, a run, a match, a chapter) that gives the reward meaning. Streaks celebrate continuity of play, not app opens.

Reward promise:
Visible, predictable, economy-safe progression and cosmetic value. Never promise gacha pulls as a streak payoff unless pool and rate are transparent; never let a missed day erase paid or earned progress.

Loop design:
- Cadence: 24h rolling window anchored to the player's home timezone, with a 4h late-claim grace after rollover.
- Trigger: first meaningful session action of the local day, not cold launch.
- Reward: layered daily ladder (Day 1–6 small utility, Day 7 milestone), 28-day monthly calendar with one premium slot reserved for a player-chosen item, weekly mission set tied to core modes.
- Recovery: 1 free streak freeze per 14 days, 1 paid repair (premium currency, capped at 1 per 30 days), 48h grace after first miss before reset, soft reset preserves 50% of streak length rounded down.
- Cap: VIP multiplier max 1.5x, daily claim once per local day, calendar repeats with a +10% bonus slot after a full month instead of escalating payouts.

State model:
- eligible_today -> entry: local-day rollover reached and no claim yet; exit: claim or window expires. Message: "Today's reward is ready when you are."
- claimed_today -> entry: valid claim recorded; exit: next local-day rollover. Message: confirm receipt, show next milestone.
- missed_day -> entry: 24h elapsed without claim; exit: claim within 48h grace, or freeze consumes, or soft reset fires. Message: neutral, "You can still keep your streak."
- grace_available -> entry: first miss only; exit: claim or expiry. Message: time-remaining indicator.
- streak_repaired -> entry: freeze or paid repair applied; exit: next eligible day. Message: shows repair count this period.
- soft_reset -> entry: miss beyond grace with no repair; exit: new day claim. Message: "Fresh start, your prior Day 7 rewards are kept."
- suspicious_claim -> entry: clock delta, device re-install cluster, or abnormal velocity; exit: reviewed or claim capped. Message: silent, support-only.
- live_event_active -> entry: event window open and player eligible; exit: event_claimed or event_close. Message: event-scoped, never blends with daily streak.

Economy/support risks:
- Gacha currency in daily ladder -> mitigation: cap at low single-digit, never a multi-pull; rate-up token only as Day-28 choice.
- VIP multiplier inflating payouts -> mitigation: hard cap 1.5x, multiplier applied to cosmetic slots and XP, not gacha currency.
- Comeback reward training churn -> mitigation: once per 60-day absence, paired with a new content hook, capped value, expires in 7 days.
- Clock tampering -> mitigation: server-authoritative claim time, detect >2h device clock delta vs. server, require network sync, soft-hold suspicious claims for review.
- Timezone hopping -> mitigation: bind to registered home timezone, change allowed once per 30 days, 7-day cooldown on streak changes after switch.
- Offline play edge cases -> mitigation: count an offline day as eligible only if a saved session occurred during the local day; never auto-claim rewards offline.
- Notification pressure -> mitigation: one daily reminder inside a user-set window, quiet hours respected, opt-out per channel, no streak-loss threat copy.
- Monetization coercion -> mitigation: paid repair priced above equivalent ad/daily value, never the only recovery path, no FOMO timers in the daily flow.

Metrics:
- Activation: D1 claim rate, D1 to D7 funnel on the first meaningful action.
- Repeat: 7/30-day return rate, streak length distribution, repair usage rate, freeze usage rate.
- Long-term retention: D30/D90 retained, retention delta between streak-keepers and non-keepers.
- Fatigue: claim-without-play rate, notification opt-out, churn within 72h of a streak break.
- Economy: gacha currency issued via daily vs. paid ratio, calendar inflation index, VIP payout delta, comeback bonus redemption cost, abuse-flag rate and false-positive rate.
- Trust: refund/support tickets tied to streak, timezone, or clock events; survey sentiment on streak pressure.

Review checklist (pass/fail): behavior-anchored rewards, humane missed-day path, economy-safe payouts, quiet-hour notifications, abuse controls reviewed for honest travel, depth metrics instrumented.
```
