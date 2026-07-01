Core return behavior:  
Return daily to play at least one meaningful session action: collect energy, complete a mission/battle, progress an event, or advance account goals.

Reward promise:  
“Check in and play a little each day to receive helpful, economy-safe bonuses. Your streak celebrates consistency, but missing a day is recoverable.”

Loop design:
- Cadence: daily reset based on account home timezone, with server-authoritative time.
- Trigger: reward becomes available after login plus one lightweight meaningful action, e.g. finish 1 battle, claim idle loot, complete 1 daily mission.
- Reward: mix of soft currency, energy, upgrade materials, cosmetics, small gacha currency, and event tokens. Avoid making gacha currency the dominant faucet.
- Recovery: 1 free streak freeze earned weekly or through play; limited repair within 48 hours; soft reset after grace expires.
- Cap: one claim per account per reset window; VIP multipliers capped and excluded from high-value premium/gacha rewards.

State model:
- `eligible_today` -> entry: new server day begins; exit: player logs in and completes qualifying action; user message: “Today’s bonus is ready after one quick mission.”
- `reward_available` -> entry: qualifying action completed; exit: claim or day expires; user message: “Claim today’s reward.”
- `claimed_today` -> entry: reward granted; exit: next reset; user message: “Nice! Come back tomorrow for the next bonus.”
- `streak_advanced` -> entry: successful daily claim; exit: cooldown; user message: “Streak +1. Your next reward: X.”
- `cooldown_until_next_day` -> entry: daily reward claimed; exit: next account reset; user message: “Daily reward resets in Xh.”
- `missed_day` -> entry: no claim during reset window; exit: freeze, repair, or soft reset; user message: “You missed a day. Use a freeze or repair to continue.”
- `grace_available` -> entry: freeze/repair eligible; exit: repaired or timer expires; user message: “You can keep your streak with a freeze.”
- `streak_repaired` -> entry: freeze/repair used; exit: normal cadence resumes; user message: “Streak protected.”
- `soft_reset` -> entry: missed day without recovery; exit: new streak starts; user message: “New streak started. Your calendar progress continues.”
- `suspicious_claim` -> entry: clock/device/velocity anomaly; exit: allow, cap, or review; user message: “Reward timing is being verified.”

Reward table:
- Day 1: soft currency + energy.
- Day 2: upgrade materials.
- Day 3: small gacha currency.
- Day 4: energy + mission skip/light convenience item.
- Day 5: cosmetic shard or collection item.
- Day 6: materials bundle.
- Day 7: larger capped reward, preferably choice chest; limited gacha currency.
- 28/30-day calendar: predictable rewards with 4 weekly highlights; missed days can be caught up with freezes or low-pressure repair.
- Comeback bonus: for 7+ days inactive; 3-day reactivation path with energy, materials, and guided missions. Limit to once per 30–45 days to avoid teaching churn.

VIP multipliers:
- Apply VIP multiplier to soft currency, energy, and materials only.
- Do not multiply rare cosmetics, pity-affecting gacha currency, leaderboard/event tokens, or first-clear rewards.
- Show clear math: base reward + VIP bonus.
- Cap daily VIP bonus value to protect economy and avoid pay-pressure.

Time-zone and offline rules:
- Use server time with an account home timezone selected at account creation or inferred after onboarding.
- Allow limited timezone changes, e.g. once every 30 days or after support-approved travel.
- Offline play may queue qualifying actions, but claims are finalized only when reconnecting to server.
- If offline across reset, grant based on server receipt and last trusted session time; do not allow multiple offline claims.
- For outages or live-event timing issues, provide standardized compensation and streak protection.

Economy/support risks:
- Gacha currency inflation -> cap daily premium currency; model monthly free income against pity, offers, battle pass, and event rewards.
- Monetization pressure -> avoid “buy now or lose streak” messaging; allow earned freezes; do not sell unlimited repairs.
- Streak anxiety -> use celebratory language, freezes, quiet hours, and soft reset instead of shame.
- Login-only farming -> require one meaningful but short action before claim.
- Comeback abuse -> cooldown comeback bonuses and exclude recently rewarded accounts.
- Clock manipulation -> server-authoritative reset, device clock delta tracking, claim velocity checks, and duplicate device detection.
- Reinstall/device abuse -> account-based state, device fingerprint risk scoring, no reset on reinstall.
- VIP unfairness -> cap multiplier, exclude competitive/event rewards, disclose rules.
- Support burden from travel -> clear home timezone rules, limited self-serve timezone change, support override.
- Notification fatigue -> opt-in controls, quiet hours, frequency caps, value-based copy.

Abuse controls:
- Track `device_id`, account age, claim timestamps, server/client clock delta, timezone changes, IP region drift, offline duration, and duplicate device counts.
- Flag, do not instantly punish, edge cases like travel or poor connectivity.
- Cap suspicious claims pending verification.
- Prevent multiple claims per account/day even across devices.
- Rate-limit repair purchases and freeze usage.

Notifications:
- Good: “Your event energy is full—finish a quick mission to claim today’s bonus.”
- Avoid: “Log in now or lose everything.”
- Rules: quiet hours, max 1 daily reward reminder/day, suppress after claim, suppress after repeated ignores, localize reset time, include notification settings.

Metrics:
- Activation: first daily reward claim, first meaningful action before claim, calendar understanding.
- Repeat: D1/D3/D7/D14/D30 retention, streak continuation, mission completion after claim.
- Long-term retention: retained players at 30/60/90 days, depth of play, event participation, payer/non-payer cohorts.
- Fatigue/trust: notification opt-out, streak-loss churn, repair frustration, support tickets, negative reviews mentioning pressure.
- Economy impact: monthly gacha currency issued, VIP bonus issuance, inflation, conversion cannibalization, progression acceleration.
- Abuse: suspicious claim rate, clock-delta flags, duplicate device claims, offline claim reversals.
- Comeback: reactivation rate, 7/14-day post-comeback retention, repeat-lapse rate.

Experiment guardrails:
- Optimize for meaningful play and long-term retention, not just claim rate.
- No test should increase churn after missed streaks, notification opt-outs, refund requests, or economy inflation.
- Segment VIP/non-VIP, new/mid/endgame, payer/non-payer, and regions.
- Ship with kill switches for reward amounts, VIP multiplier, repair pricing, and notification cadence.
