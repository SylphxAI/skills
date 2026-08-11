# Product Blueprint — "Kept" (working title)

Mobile habit-tracking app · v1 design blueprint

**One-line promise:** Kept is the place you visit once a day to keep a promise to yourself — decide your habits once, check them off in under 30 seconds, and let the app hold the memory so you don't have to.

---

## 1. Core idea

### The user job

"When I want to change a behavior reliably, help me stop spending willpower on remembering and recording, so my energy goes into the doing."

- **Trigger:** morning/evening routine, right after an existing habit ("after I brush my teeth"), feeling scattered, or a failed streak in another app.
- **Alternative today:** generic habit dashboards (punishing streaks, logging friction → collapse), sticky notes (no continuity), or elaborate habit "systems" (ceremony becomes the burden).

### Promised outcome

Within two weeks, a user reliably completes 1–3 chosen habits most days, knows truthfully where they stand, and spends no more than ~30 seconds per day in the app.

### The one core concept: the daily check-in loop

Everything in the product is one concept: **"Today's list. One tap each. Done."** Streaks, stats, reminders, and recaps are outputs of the loop — never parallel mini-products. There is no feed, no social layer, no points shop, no second mental model. Depth is spent on the loop's edge states (missed days, late logs, rest days, travel, time zones, notification handoff), not on breadth.

Why this concept:

- **Simple** — one screen is the whole product.
- **Integrated** — every selected capability deepens the same loop.
- **Deep** — recovery and honesty mechanics are fully resolved, not a shallow tour.
- **Strong** — built to the quality bar in §3 from day one, not a toy shell.
- **Extensible without proliferation** — growth is depth on the loop (scheduling, review, sync), not new concepts.

### Design stances (the spine)

1. **Forgiveness over punishment.** Streaks are honest, derived, never debt. A missed day marks a gap; it never zeroes history and the app never shames.
2. **Decide once, act daily.** Setup is a one-time decision (what, when, tiny size, anchor); the daily surface is pure acknowledgment.
3. **Under 30 seconds.** The primary path is one tap per habit. Any feature that makes the daily visit longer must justify itself.
4. **Local-first, private by default.** Habit data lives on the device; sync is optional and encrypted. No ads, no behavioral profiling — trust is the moat.
5. **Tiny by default.** New habits start small ("floss one tooth", "2-minute walk") with an explicit "size up when it's boring" path. The app refuses overload: new users start with at most 3 habits.

### Quality stance

Intentionally strengthened: **Simplicity** (one path, ≤30s visits) and **Privacy/Trust** (local-first, no surveillance). Intentionally sacrificed: **Breadth** (feature reach) and **Social virality** — consciously traded, with a revisit trigger if voluntary retention proves unreachable without them.

### Non-goals (hard cuts)

- No social feed, sharing, or public leaderboards (pressure/attention cut).
- No gamified currency, badge shops, or streaks-as-punishment.
- No AI coach in v1 (kept as a tested extension boundary only).
- No habit marketplace, template wall, or content feed.
- No advertising; no data selling.

---

## 2. Main flows

### 2.0 First-run storyboard — first value in under 2 minutes

Cold launch → 3-question setup (pick 1–3 habits from suggestions or write your own; pick an anchor/trigger; pick a time) → land directly on **Today** with the first habit already checkable → user taps it → honest celebration micro-moment → "Done for today". No account required to start; no permission demanded before value. Every interruption past the first check-in must earn its place.

### Flow A — The daily check-in (the primary path)

States: Today's list → per-habit tap (`pending → done`, subtle animation) → optional note/photo (secondary, behind a `+`) → all-done state ("Kept — come back tomorrow") → next-day reset (local midnight, configurable day boundary).

- Alternates: **skip with reason** ("travel", "rest", "not today" — recorded, not punished); **late log** (marking yesterday, honestly flagged "late"); **notification deep-link** opens to the item itself, not a dashboard.
- Feedback contract: a tap commits optimistically and instantly, is never lost, and sync conflicts resolve by last-write with per-item history preserved. Nothing is silently dropped.

### Flow B — Missed-day recovery (the loop's depth)

Next open after a gap → a banner states the truth ("You missed Thu — X was 1 day off") → choices: **log late** (flagged), **forgive** (the gap stays in the data; the streak restarts honestly), or **do today only**. The app never offers retroactive rewrites of history; forgiveness is recorded as its own event so recaps stay truthful. Recovery is one tap, not a guilt ritual.

### Flow C — Decide-once setup (habit creation/editing)

Name → smallest version? (tiny by default) → anchor ("after I brush my teeth") → schedule (daily / weekdays / rest-day pattern) → reminder (optional, default off).

Edit anytime: size up, reschedule, **pause** (pause ≠ delete; preserved, not counted), or delete (permanent, with export offered first).

### Flow D — The weekly recap (insight, not judgment)

One screen, Monday: last 7 days as a compact grid; consistency % per habit; honest gaps shown; one pattern sentence ("You keep X best right after Y"). No guilt headlines, no streak morality. The recap is the only "review" surface in v1, and it is an output of the loop.

### Flow E — Reminders (delivery system, permission-earned)

Permission is asked in context — after the first check-in, with a plain-language benefit and an easy "later". Tap-to-check-in works from the notification itself (full action, no open required). Quiet hours, snooze, per-habit on/off. Countermetric: notification opt-out rate vs. retention — reminders must serve the loop, and the app must degrade gracefully to zero value-loss when permission is denied (local-first means it fully works without notifications).

### Flow F — Data lifecycle (trust / durable ownership)

One-tap export (CSV/JSON), full delete (with export prompt), local-only default, optional end-to-end encrypted sync, and export as the account-recovery path. History belongs to the user: portable, never hostage, never used as leverage.

### Capability disposition (v1 sweep)

| Capability | Disposition |
|---|---|
| Identity / account | Not required to start; optional for sync (contract-ready) |
| Offline | **Integrate now** — app is 100% functional without network |
| Sync | Contract-ready — designed boundary, absent from v1 runtime |
| Notifications | **Integrate now** — permission-earned, default off |
| Social / community | Not applicable — pressure contradicts the promise |
| AI / automation | Contract-ready — absent in v1 |
| Commerce / payments | Not in v1; future monetization must never paywall history or export |
| Analytics | Aggregate, opt-in, no behavioral profiling |
| Accessibility / i18n | **Integrate now** — AA, Dynamic Type, RTL-ready, l10n for launch locales |

---

## 3. What good looks like

### User outcomes (the real definition of done)

- A new user completes their first check-in within 2 minutes of install and returns the next day (D1 → D2 retention).
- A user with 3 active habits completes the loop in **<30 seconds on ≥80% of days they open it**.
- After 2 weeks, users say the app "helps me remember without nagging" — never "makes me feel guilty."
- A missed day is resolved in one tap, and users who miss a day return (gap-recovery rate above baseline).
- Retention is voluntary: D30 retention in top-quartile health/fitness range, and notification-opt-out users retain at a floor that proves reminders are not the retention mechanism.

### Product quality bar (non-negotiable)

- **Performance:** cold start <2s on a mid-range phone; the daily screen renders before the user's thumb finishes the tap; no jank on low-end tiers.
- **Reliability:** a check-in is never lost or double-counted; the primary path has no server round-trip.
- **Accessibility:** WCAG AA, Dynamic Type/large fonts, VoiceOver/TalkBack labels, 44pt touch targets, no time pressure anywhere.
- **Privacy/security:** no behavioral tracking; opt-in aggregate analytics; encryption at rest in sync.
- **Battery/network:** background work ≈ 0 (no polling); notifications via OS scheduling only.
- **Honesty:** a forgiven day is counted as a gap, never a success — metrics cannot be gamed by design.

### Metrics

- **North star:** on-time check-ins completed (habits × days kept on schedule), with honesty flags first-class.
- **Activation:** first check-in in session 1; D1 return.
- **Retention:** D7 / D30; weekly active days; median session time (<60s is a feature, not a bug).
- **Loop health:** median time-to-check-in; per-habit 1-week consistency; gap-recovery rate; late-log rate.
- **Countermetrics:** abandonment after first miss (streak-anxiety signal), notification opt-out rate, delete rate, "guilt" sentiment in feedback. Every reinforcement system ships with a neutral control.

### Build-ready acceptance (v1)

1. Install → create 3 habits → complete the first check-in with no account and no permission prompt.
2. Missed-day recovery is ≤2 taps and never offers history rewriting.
3. The app is 100% functional offline; enabled sync reconciles without loss.
4. Tapping a reminder completes the check-in without opening the app.
5. Export and delete work and are discoverable in Settings.
6. Every state-changing action has an immediate, truthful response: optimistic commit, honest failure, undo where applicable.

---

## 4. Risks & open questions

- **Streak psychology** — streaks motivate some and depress others. v1 ships honest streaks with a "hide streaks" setting; kill criterion: if miss-triggered abandonment exceeds baseline, streak emphasis is cut.
- **Rest days** — how to represent "deliberately not today" without lying to data: resolved by explicit rest-day scheduling, never auto-grace.
- **Travel/time zones** — the day boundary follows the user's current local day, with an explicit "I'm traveling" mode so gaps stay honest.
- **Local-first vs. multi-device** — sync is the largest v1 complexity; single-device local-first ships first, sync stays contract-ready.
- **Monetization** — one honest plan (subscription or one-time) for recap depth / multi-device sync; history and export are never paywalled.
- **Notification fatigue** — reminders default off; the opt-out metric loop decides whether default-on is ever justified.

Open for the next cycle: does tiny-habit sizing need a coaching moment at setup? Should the recap be pushed (Monday digest) or pulled (open when ready)? What is the honest handling of a habit the user wants to retire (archive vs. delete)?
