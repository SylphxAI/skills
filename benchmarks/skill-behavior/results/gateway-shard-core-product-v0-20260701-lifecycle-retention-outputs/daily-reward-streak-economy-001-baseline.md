## Review: Daily Reward & Streak System

### Goals
Improve retention without eroding trust. The system should feel generous, predictable, and forgiving—not coercive. Players should understand what they earn, why, and how to recover missed days.

---

## 1. Core Reward Structure

### Recommended model
Use a **hybrid system**:

- **Daily login bonus**: small, reliable reward every day.
- **Streak bonus**: additional reward for consecutive days.
- **Calendar rewards**: monthly track with visible milestone rewards.
- **Comeback bonus**: generous return path after absence.
- **Streak freezes**: limited forgiveness for missed days.

This avoids making the entire economy depend on perfect daily attendance.

### Key rule
Do not reset all progress harshly. If a player misses a day:
- Consume a streak freeze if available.
- Otherwise reduce streak to a safe checkpoint, e.g. 7-day streak becomes 5, 30-day becomes 21.
- Calendar progress should continue by claim count, not strict date, where possible.

---

## 2. Login Bonuses

### Recommendations
- Give low-to-medium value rewards daily: soft currency, boosters, energy, upgrade materials.
- Reserve premium/gacha currency for milestones, not every single day.
- Use a clear weekly loop: Days 1–6 normal, Day 7 higher-value reward.
- Avoid making Day 30 so valuable that missing it feels punitive.

### Trust safeguard
Show the full reward table upfront. Avoid hidden reward changes.

---

## 3. Streaks & Streak Freezes

### Streak design
- Streak increases once per server-defined reward day.
- A player can claim once per day after eligibility.
- Streak rewards should be additive, not mandatory for core progression.

### Streak freezes
- Earnable through play and occasional login milestones.
- Purchasable only with strict limits to avoid pay-to-maintain pressure.
- Suggested cap: 2–3 active freezes.
- Auto-consume on missed day.
- Notify player when a freeze was used.

### Avoid
- “Pay now or lose your 100-day streak” prompts.
- Expensive last-minute freeze purchases.
- Permanent loss of major rewards due to one missed day.

---

## 4. Calendar Rewards

### Recommended design
Use a **monthly calendar with catch-up**:
- Players claim one tile per eligible day.
- Missed claims remain available through limited catch-up.
- End-of-month rewards should have alternative access via play, not only perfect attendance.

### VIP handling
VIP may increase reward quantity but should not create exclusive calendar-only power rewards.

Good:
- VIP +10–25% soft currency/materials.
- Extra cosmetic shard.
- Bonus reroll ticket.

Risky:
- VIP-exclusive gacha currency milestones.
- VIP-only streak protection.
- Multipliers that make non-VIP players feel punished.

---

## 5. Gacha Currency Economy

### Recommendations
- Keep daily premium currency predictable and modest.
- Put meaningful gacha currency on weekly/monthly milestones.
- Publish approximate monthly earnable premium currency from logins.
- Avoid variable or personalized rewards that feel manipulative.

### Economy review questions
- How many free pulls per month come from login systems?
- Does missing 1–2 days meaningfully reduce a player’s chance at a banner?
- Are VIP multipliers inflating the gacha economy or creating unfairness?

---

## 6. Comeback Bonuses

### Trigger
Activate after meaningful absence, e.g. 7, 14, or 30 days.

### Design
- Welcome-back reward on first return.
- 3–7 day comeback track.
- Include progression help: energy, upgrade materials, limited gacha currency.
- Do not exceed rewards of consistent players over the same period.

### Important
Comeback bonuses should reduce shame, not teach players that quitting is optimal.

---

## 7. Time Zones & Daily Reset

### Recommended rule
Use a **server-authoritative daily reset**, with player-facing local display.

Options:
1. Fixed global reset, e.g. 00:00 UTC.
2. Regional reset based on account region.
3. Player-selected time zone locked after selection.

Best compromise:
- Let players choose/reset their reward time zone rarely, e.g. once every 30–90 days.
- Changing time zone must not grant extra claims.
- Use cooldowns and server timestamps.

### UX
Always show:
- Next reset time in local time.
- Whether today’s reward has been claimed.
- Streak freeze status.

---

## 8. Offline Play & Clock Manipulation

### Offline support
Allow offline play, but do not grant login/streak/calendar rewards until server validation.

If offline:
- Queue gameplay progress locally.
- Mark daily reward as “pending sync.”
- On reconnect, server determines eligible claims.

### Anti-abuse
- Server time is authoritative.
- Local device time is only for display.
- Detect repeated clock jumps, timezone changes, reinstall loops, and emulator anomalies.
- Do not punish false positives aggressively.

### Response ladder
1. Ignore minor drift.
2. Block duplicate claims.
3. Show friendly sync error.
4. Temporarily require online validation.
5. Escalate only for repeated abuse.

Avoid accusing players unless evidence is strong.

---

## 9. Notifications

### Recommended approach
Use respectful reminders:
- Opt-in by default only where legally allowed.
- Let players choose reminder time.
- Send reminders for unclaimed meaningful rewards, not constant streak pressure.
- Avoid guilt language.

Good:
- “Your daily reward is ready.”
- “A streak freeze will protect you today.”

Bad:
- “Don’t lose everything!”
- “Your guild is counting on you.”
- “Last chance before your streak dies.”

---

## 10. Monetization Pressure

### Guardrails
- Never sell emergency streak recovery with dark-pattern urgency.
- Do not make login rewards the primary source of competitive power.
- Avoid exclusive VIP streak mechanics.
- Cap purchasable recovery.
- Keep free recovery options available.

Monetization should enhance convenience and celebration, not exploit loss aversion.

---

## 11. Metrics & Monitoring

Track:
- D1, D7, D30 retention.
- Claim rate by day.
- Streak loss rate.
- Freeze usage.
- Time-zone change frequency.
- Offline claim conflicts.
- Comeback conversion.
- Notification opt-out rate.
- Reward economy inflation.
- Sentiment/support tickets around “lost streak” or “missing reward.”

Red flags:
- Players churn immediately after losing streak.
- High support volume on reset timing.
- VIP users have materially better competitive outcomes from login rewards.
- Clock manipulation becomes a dominant reward source.

---

## 12. Final Recommended Policy

Use a forgiving, transparent system:

- Server-authoritative daily eligibility.
- Visible monthly calendar.
- Earnable streak freezes.
- Soft streak decay instead of full reset.
- Modest gacha currency via milestones.
- Limited VIP multipliers, no exclusive power.
- Comeback tracks for lapsed users.
- Respectful notifications.
- Offline play allowed, rewards validated online.

This preserves fun and trust while supporting retention without coercive monetization.
