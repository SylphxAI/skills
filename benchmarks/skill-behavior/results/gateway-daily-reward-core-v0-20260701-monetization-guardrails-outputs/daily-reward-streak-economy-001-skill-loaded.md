```text
Core return behavior:
Open the app, perform one meaningful in-game action (start a match, complete a daily mission, or claim one calendar tile), and return tomorrow. Streak rewards reinforce habit, not just app opens.

Reward promise:
Visible today, achievable tomorrow, never punitive if a day is missed. Show the next 3 days' rewards so users plan, but never show a countdown-to-loss clock.

Loop design:
- Cadence: 1 daily claim window (home timezone, rolls over at 04:00 local). Calendar = 28-day cycle, resets after full completion.
- Trigger: server-side eligibility check on first meaningful action of the local day.
- Reward: Day 1–6 small utility (energy, gold); Day 7 mid cosmetic; Day 14 small premium-currency grant; Day 28 milestone cosmetic + small currency bundle.
- Recovery: 1 free Streak Freeze auto-consumed on first miss; 1 earned Freeze per week via missions; paid repair capped at 1/week, 4/calendar.
- Cap: daily reward grants fixed; VIP multiplier excluded from premium/gacha currency, capped at 1.5x on XP and cosmetics only.

State model:
- eligible_today -> claim when first qualifying action fires; cooldown until next local day.
- claimed_today -> streak_advanced, push notification eligible.
- eligible_today + no action by 04:00 -> missed_day, freeze auto-applied if available, otherwise soft_reset (streak=1, milestone badges retained).
- suspicious_claim -> soft_hold, support review, never auto-punish.
- live_event_active -> event_tile available only during event window; outage triggers idempotent compensation.

Metrics:
- Activation: D1 claim rate, D7 retention.
- Repeat: streak length distribution, freeze usage rate, repair conversion rate (free vs paid).
- Long-term retention: 30/60/90-day return rate segmented by VIP vs F2P.
- Fatigue: notification opt-out rate, ignored-claim rate, post-streak-loss churn.
- Economy: daily currency faucet as % of monthly gacha currency supply; VIP multiplier cap-hit rate; calendar completion rate.
- Trust/support: refund/complaint rate on paid repair, appeal resolution time.
- Abuse: false-positive penalty rate, duplicate-claim block rate, clock-delta flag rate.

Economy/support risks:
- Gacha currency faucet inflation -> cap currency grants at 200/month from daily sources, exclude from VIP multiplier, monthly budget review.
- VIP pay-to-win drift -> multiplier applies only to XP, cosmetics, energy regen; never to premium currency, drop rates, or PvP power.
- Comeback bonus churn training -> cooldown 14 days absence, capped at 1/quarter, value < 7-day steady streak, attach to new content only.
- Calendar month-end pressure -> allow catch-up tokens (max 2), preview next month, never escalate final-day stakes.
- Outage duplicate grants -> idempotent ledger keyed by (user_id, event_id, day_key).
- Timezone churn -> home timezone locks for 30 days, 1 manual change/quarter, support appeal for travel.

Trust and monetization pressure:
- Paid repair: free freeze first; neutral copy ("Restore this streak" not "Don't lose everything"); capped 1/week and 4/calendar; never inside a notification, only inside the reward screen; excluded from short-term-revenue A/B tests; monitor churn and complaint deltas.
- VIP/gacha impact: multiplier 1.5x on cosmetics/XP/energy only; premium currency always fixed; explicit monthly ceiling on VIP-boosted rewards to protect non-payer fairness and marketplace pricing.
- Notification copy: lead with value ("Your Day 5 reward is ready"), never with loss ("Streak expires in 2 hours"); quiet hours 22:00–09:00 local; max 1 push/day; opt-out respected.
- Player support path: in-app appeal for any soft_hold or freeze dispute, <48h SLA, auto-restore for documented outages, written policy that purchased items and unrelated progress are never confiscated as streak-abuse penalties.
- Abuse ladder: clock-delta >4h or repeated rollback -> require server sync (silent); reinstall/device farm cluster -> cap claims, require account binding; bot/emulator velocity -> rate limit and step-up verify; account sharing -> timezone lock + appeal, never silent ban; honest travel and offline play (single queued claim per day, verified next sync) preserved without penalty.
```
