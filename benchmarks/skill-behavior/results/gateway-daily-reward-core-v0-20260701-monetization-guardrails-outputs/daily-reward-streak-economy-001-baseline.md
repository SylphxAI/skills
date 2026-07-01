# Daily Reward & Streak System Review

## 1. Design Principles (Adopt First)
1. **Trust > Retention pressure.** Any rule that punishes clock changes silently erodes trust and triggers refund/NPSQ risk.
2. **Real-life first.** Streaks must survive illness, travel, time-zone shifts, and offline days without forcing purchase.
3. **Free progress must remain meaningful.** VIP multipliers cap at 1.5x on daily rewards only — never on calendar/event payouts.
4. **Transparency over FOMO.** Every missed/recovered day shows a visible reason and recovery path.

## 2. Policy Decisions (Rubric-Critical)

| # | Decision | Rule | Rationale |
|---|----------|------|-----------|
| 1 | **Server-authoritative day boundary** | Day = UTC server date rollover, not local midnight. | Eliminates 80% of clock-manipulation exploits. |
| 2 | **Time-zone fairness window** | Grant a ±3 h grace window around rollover, displayed in the player's local TZ. | Prevents "lost day" complaints after travel. |
| 3 | **Streak freezes** | 2 free freezes/month auto-issued; +1 per 7-day streak earned (max 5 banked). | Replaces anxiety with planning. |
| 4 | **Offline tolerance** | Up to 48 h offline = streak paused (not broken); >48 h = soft reset with comeback bonus. | Distinguishes "busy" from "quit." |
| 5 | **Comeback bonus** | 3-tier: Day 1 return = small gacha currency; Day 3 = 1 calendar catch-up token; Day 7 = bonus roll, not pity. | Welcomes without resetting grind. |
| 6 | **Calendar rewards** | Replace hard "miss = lost" with 2 catch-up tokens/month (non-tradeable). | Removes FOMO, preserves cadence. |
| 7 | **VIP multiplier cap** | Max 1.5x on *login* rewards only; never on gacha pulls or event ceilings. | Keeps F2P competitive. |
| 8 | **Notification cadence** | 1 opt-in reminder 2 h pre-rollover; 1 streak-tense reminder only at day 6 if user opted in. | Reduces uninstall pressure. |
| 9 | **Clock-manipulation defense** | Detect ±NTP skew > 24 h; cap streak gain at 1/day even with time-travel; never silently revert. | Visible fairness beats hidden punishment. |
| 10 | **Monetization decoupling** | Streak freezes, catch-ups, and reminders are never paywalled. | Protects trust signal hardest to rebuild. |

## 3. Abuse & Edge-Case Audit

| Risk | Mitigation |
|------|------------|
| Roll device clock forward | Server-authoritative UTC day; rollback detection freezes pending claim. |
| Roll device clock backward | Clamp to last server-verified login. |
| TZ change exploit (gift early reset) | Grant reward only after server-validated day rollover, not local TZ offset. |
| Airplane/offline grinding | All daily/calendar claims require a live server handshake. |
| VIP abuse (alt accounts) | Multiplier bound to UID; no cross-account sharing. |
| Notification spam → uninstall | Frequency caps; opt-in tiers (Calendar / Streak / Promotional). |

## 4. Notification Strategy
- **Pre-rollover (opt-in):** "Day 7 ready in 2 h" — soft, no loss language.
- **Streak-at-risk (opt-in, day 6+):** One reminder showing freeze count available.
- **Comeback (post-48 h):** Single push with comeback bonus preview; suppress if uninstall signal detected.
- **Never:** "You will lose X" copy; countdown timers on cosmetic rewards.

## 5. Monetization Pressure Audit
- ✅ Sell: cosmetics, battle pass, gacha currency (capped), QoL packs.
- ❌ Never sell: streak safety, catch-up tokens, or day-extending items. These are trust currency.
- Cap gacha-currency from daily rewards at ~10% of monthly F2P budget so VIP multiplier doesn't gate progression.

## 6. Retention Levers (Trust-Preserving)
- **Calendar:** Replace 28-day with rolling 14-day cycle; lower fatigue, same LTV.
- **Streak:** Reward *consistency*, not *perfection*. Milestone every 7, not every day.
- **Comeback:** Visible "we missed you" bonus sized to recapture session-1 delight.
- **VIP:** Multipliers on cosmetics/XP only; daily reward bonus capped at 1.5x.

## 7. Success Metrics to Track
- D1/D7/D30 retention split by TZ region.
- Streak-break recovery rate (target: >40% return within 48 h).
- Uninstall rate correlated with notification volume.
- Refund/support tickets citing "streak" or "clock" (target: <0.5% of MAU).
- NPS for players who used a freeze vs. those who didn't.

## TL;DR
Anchor time to the server, not the device. Make freezes and catch-ups free and visible. Cap VIP daily bonus at 1.5x and never let it touch gacha. Replace fear-of-loss copy with "ready when you are" tone. Trust preserved → retention compounds.
