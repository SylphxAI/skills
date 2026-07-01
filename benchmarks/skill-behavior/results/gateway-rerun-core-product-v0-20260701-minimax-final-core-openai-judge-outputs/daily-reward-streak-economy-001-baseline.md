## Daily Reward & Streak System — Audit Review

**Verdict:** Moderate-High risk. Strong retention potential, but current design extracts via fear (streak loss, FOMO) more than it earns via fun. Trust erosion is the #1 churn driver.

---

### Risk Matrix

| # | Issue | Severity | Fun | Trust |
|---|---|---|---|---|
| 1 | Client clock trusted for streak math (manipulation vector) | Critical | Low | High |
| 2 | Single missed day = full streak reset (punitive) | Critical | High | High |
| 3 | VIP multiplier > 1.5x on main daily track (visible pay-to-progress) | High | Med | High |
| 4 | Gacha currency in daily login (FOMO spiral) | High | Med | Med |
| 5 | Notifications retarget near sleep hours | High | Med | Med |
| 6 | Time-zone travel breaks streak (no locked player TZ) | Med | High | High |
| 7 | Comeback bonus has a harsh "cliff" after day 4-5 | Med | Low | Med |
| 8 | Calendar locks 28 consecutive days (no flex) | Med | Med | Med |
| 9 | Streak freeze is paid/consumable, not auto-issued | Low | Med | Low |
| 10 | Offline play grants rewards *and* fires notifications | Low | Low | Low |

---

### P0 — Trust (ship first)

- **Server-authoritative time only.** Clamp client skew >4h forward to last server-seen. Never punish legitimate travelers.
- **Lock player timezone at first login.** Device TZ changes never affect eligibility.
- **Soft grace:** one missed day = 24h recovery window; second consecutive miss = reset. Eliminates "I lost 60 days because I was sick" rage.
- **Auto-issue 2 streak freezes/month**, visible in inventory. Sell more as convenience, never as recovery necessity.
- **No pay-to-skip-streak-loss.** Trust killer.

### P1 — Fun & Retention

- **Replace 28-consecutive-day calendar with rolling 28-day window** (claim 20 of 28). Industry-typical uplift: +15–25% claimed-reward rate, +3-5pp D7 retention.
- **Decouple gacha from login.** Move it to an opt-in 48h "Daily Deal." Login grants chips/scrolls/cosmetics, not pity-bait.
- **Milestone rewards (day 7/14/28) must be cosmetic or progression** — never currency that feeds back into FOMO loops.
- **Comeback bonus caps at 3 missed days of value**, then flat small reward. Avoid the "miss 5 = jackpot, miss 6 = nothing" cliff.

### P2 — Monetization Pressure

- **Cap VIP daily multiplier at 1.5x** on the main track. Give VIPs a *separate* bonus calendar so non-VIP never feels penalized in their own track.
- **Visible gap > 1.5x drives resentment, not spend.** Trust-preserving spend ceiling.
- Premium currency sinks live in shop/events, not in the login funnel.

### P3 — Notifications & Offline

- Max **1 notification/day**, fired at player's *median historical play time* (server-computed). Respect a global quiet window (e.g., 23:00–09:00 local).
- Offline play: rewards tick at **half-rate or pause cleanly** — never grant *and* ping.

---

### Clock-Manipulation Defense

- All streak math server-side; client clock = display only.
- Silently clamp forward skew >4h; log but don't ban — false positives are worse than the abuse.
- Rely on locked player TZ, not device TZ, for all daily windows.

---

### Trust Principles (Non-Negotiable)

1. Player time is sacred — never lose progress for offline/legitimate reasons.
2. Pay-to-progress gaps are visible but tasteful (≤1.5x).
3. Free milestones reachable in 2 weeks of normal play.
4. Comeback > churn: reward returners generously, but never so much it trains skipping.

---

### KPIs to Track (90 days post-launch)

| Metric | Target |
|---|---|
| D7 retention | +5pp |
| D30 retention | +3pp |
| Daily claim rate | ≥75% |
| 30-day streak completion | ≥40% |
| "Do Not Disturb" opt-in | ≥30% |
| Clock-skew flag rate | <0.5% |
| Lost-streak support tickets | −60% |
| Negative reviews mentioning "streak" | −50% |

**One-line principle:** *Retention earned through respect beats retention extracted through fear.*
