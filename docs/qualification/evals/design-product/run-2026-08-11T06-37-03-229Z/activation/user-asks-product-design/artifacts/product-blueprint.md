# Product Blueprint — Pulse (working name)

A calm, forgiving mobile habit tracker.

> Artifact: `product-blueprint.md` · kind: app-design-blueprint · owner-skill: `design-product`/`design-app` · state: draft · revision 1 · proof: hypothesis-to-design-validated. Working name "Pulse" is not a trademark clearance; verify storefront availability before release. Evidence labels used throughout: `given`, `observed`, `assumed`, `hypothesis`, `decision`.

---

## 1. Frame

### Promise

**For an adult (25–45) who keeps starting habits and quitting after one missed day**, Pulse helps them **stay on a 1–3 habit plan through the weeks 2–6 churn window** — the period where the novelty dies and results haven't arrived — **through a forgiving pulse-and-recovery mechanism instead of fragile streaks**, with first value evidenced by **a first Done tap within 90 seconds of a cold install** (`decision`).

- Primary user: self-directed adult building personal habits (health, work, learning). Not a children's product, not a team/accountability product.
- Trigger & context: the daily moment of choosing whether to do the thing — morning, lunch, commute, or before bed; phone in hand, 10 seconds available.
- Current alternative: Streaks-style chain trackers, paper habit grids, notes apps, or nothing. Switching friction: they have failed before; the cost of a "broken chain" is the main reason they quit (`observed` — market pattern).
- Objects entrusted to the product: the user's plan, their honest day-by-day record, and their history.
- Business model: free core forever; one-time Pro purchase for depth features. No ads, no subscriptions in v1 (`decision`).
- Platforms: iOS + Android native, phone-first; home-screen widget as a primary surface for the check-in ritual. Tablet = responsive stretch. Web/desktop = not in v1 (see §6).
- Minimum device: mid-tier phone from ~2019, current OS, intermittent connectivity.
- Frequency: the natural loop is daily check-in + weekly recap; sessions are designed to be under 10 seconds.

### Mechanism research (what we benchmarked, and the transfer hypothesis)

| Comparator | Observed mechanism | Tradeoff/harmed cohort | Transfer hypothesis |
| --- | --- | --- | --- |
| Streaks-class apps | Unbroken daily chain, pride of the number | One miss resets everything; users churn in weeks 2–6 rather than face the reset (`observed`) | A forgiving number keeps the same "progress is visible" benefit without the reset cliff |
| Duolingo streak system | Streak + paid/flexible freeze mechanics; first-party research shows early streak days matter most for retention | Loss aversion drives sessions but creates anxiety; flexibility tools are a patch on the same cliff (`observed`) | Build forgiveness into the core metric so no patch is needed |
| Beeminder / commitment contracts | Money stakes, bright red line | Works for a small driven segment; high friction, punishes failure financially (`observed`) | Out of scope on a trust floor — never monetize or punish failure |
| Habitica / RPG trackers | Levels, XP, avatar, parties | Motivation decays after ~a month ("gamification fatigue"); losing avatar health creates anxiety (`observed`) | Gamification economy is a second concept; it does not make the habit healthier |
| Habify / Biksie (2026) | Momentum score instead of streak; miss = small dip, not zero | Validate the direction but stop at a score — no recovery path, no plan right-sizing (`observed`) | Go deeper: pulse is a governed state with rescue, rest, and forecast, not just a number |

Context, not proof: these are `observed` market patterns informing hypotheses; none of them prove what Pulse's users will do. All numeric targets in §5 and §7 are `hypothesis` until measured.

### Success contract (six dimensions)

| Dimension | Required question | Example evidence |
| --- | --- | --- |
| User outcome | Did the user stay on the plan through the churn window? | median plan hit rate in weeks 3–6 ≥ 70% |
| Experience | Was the ritual fast, understandable, recoverable? | first Done ≤ 90s; correction/undo success; rescue comprehension |
| Retention | Did they return for value, not pressure? | week-4 D1 retention of activated users ≥ 35%; return reason = recap/pulse, not just notifications |
| Commercial | Does Pro convert without gating the core? | ≥ 2% activated → Pro; refund rate < 5% |
| Trust | Agency, honesty, portability? | export/deletion success; no loss-shaming copy; zero fudged numbers |
| Operability | Correct at scale, recovers? | pulse math property-tested; offline/rollover correct; ≤ 50 habits fast |

All six have hard floors; no dimension is traded below its floor (§5).

---

## 2. The deep core concept: **The Pulse**

One concept, one number, one daily action. Everything in the app deepens it; nothing teaches a second product.

> **Every habit has a pulse: a single 0–100 number that says how alive the habit is, measured against the plan you chose. You tap Done when you do it. When you don't, the pulse dips — it never dies in one miss. The app's whole job is to keep pulses healthy, and to help you right-size a habit when one is dying — not to guilt you.**

### 2.1 The rules (deterministic, transparent, user-computable)

- A habit is **name + trigger context + weekly target** (1–7 planned days/week). One plan, one number.
- **Pulse** = `min(100, round_half_up(100 × done_days_in_last_28 / (weekly_target × 4 − rested_days_in_window)))`. A 28-day trailing window: the pulse is simply "how your last 4 weeks match the plan you set." No hidden weighting, no randomness, no fudge factor (`decision` — correctness floor).
- **One miss is a dip, not a death.** Worst-case single-miss dip is 25 points (weekly target 1); for a daily target it is ~3.6 points. The pulse can only reach 0 by sustained non-practice, and 0 is a *state to recover from*, not a shame event.
- **Doing more than planned never inflates the pulse beyond 100** — it measures plan health, not raw volume, so it cannot reward over-commitment (`decision`).
- **The pulse is lazy-computed.** No background math, no jobs, no polling. On app open, missed days since last visit are rolled and the pulse recomputed in < 5 ms for 50 habits. Battery and storage are part of the ritual design (`decision`).
- **Transparency is a floor:** every pulse is shown with its reason ("12 of your last 12 planned days") and a preview ("if you miss tomorrow: 89"). The number is never adjusted to motivate (`floor-blocked`: fudged motivation is unrepresentable).

### 2.2 Pulse states (health axis)

| Band | Range | What the app does |
| --- | --- | --- |
| Steady | 80–100 | Quiet support. Listed lower on Today; no rescue; recap celebrates calmly |
| Building | 40–79 | Normal effort; shown above Steady; reminders on |
| Fading | 10–39 | Rises to the top of Today; **rescue card** appears; reminders on |
| Dormant | 0–9 | **Rescue card is the primary action**; habit still checkable (a Done tap is a valid rescue) |

Lifecycle axis (independent): **Warming** — the first 7 days after creation, during which the band is hidden behind "warming up" and the rescue card is suppressed, so a brand-new habit is never immediately diagnosed as dying. After 7 days the health band governs.

### 2.3 The recovery arc (the deep half of the concept)

The pulse alone is a score; the recovery arc is what makes it a product.

1. A habit crosses into **Fading** → a rescue card appears on Today: "Your pulse for *Walk* is 32 (8 of your last 12 planned days). Back to Steady by Thu if you hit 2 of the 3 days left this week."
2. Four one-tap options, all equally valid (`decision` — autonomy):
   - **Make it smaller** — drop the weekly target (e.g., 5 → 3). Pulse re-derives against the new plan immediately. This is the app's core lesson: shrink the ask, keep the habit.
   - **Change when** — edit the trigger context/time (cue redesign; e.g., "after dinner" → "right after lunch").
   - **Rest it** — planned pause (trip, illness, season). Pulse freezes, no decay, no reminders, days marked `rested` not `missed`. Rest is a healthy stop, never a failure.
   - **Archive it** — it wasn't the right habit right now. History is preserved, pulse frozen at archive, unarchive restores everything.
3. If the pulse crosses into **Dormant** and the user ignores the rescue card for 7 days, the card becomes the primary screen action — but the checkbox still works, because doing the thing is always the best rescue.

### 2.4 Why this concept, and why it is one concept

- **Simple:** one number, one action (tap Done), one plan (days/week). No chains, no XP, no currency, no coins, no levels.
- **Integrated:** Today ordering, recap, reminders, widget, rescue, forecast — every surface reads and writes the pulse. There is no second mental model.
- **Deep:** decay math, rollover, 48-hour correction, rest semantics, right-sizing, forecasts, archive — the concept is resolved at its edges, not toured.
- **Strong:** the math is deterministic and property-testable; the data model is small and offline-first; nothing depends on a server, SDK, or background job to be correct.
- **Extensible without proliferation:** growth is depth on the pulse — history trends (Pro), 12-month recap, forecast in the widget, accountability partner (a second pulse the user can see) — never a new system.

---

## 3. Main flows and states

### 3.1 Information architecture (three tabs, nothing else)

| Surface | Job |
| --- | --- |
| **Today** (primary) | The check-in ritual: today's habits, pulses, rescue cards, forecast. ≤ 10 seconds. |
| **Pulse** (list) | Every habit with its band, reason line, and 28-day sparkline; create/edit/rest/archive live here. |
| **Recap** (weekly) | The 5-second weekly review: pulse movement, plan hit rate, one forecast, next week starts now. |

Settings: habits' reminders, day boundary, recap day, appearance (Pro), export/delete, privacy.

### 3.2 Flow: cold start → first value (friction budget)

```
launch → Today renders (≤ 2.5 s mid-tier) → sample habit visible (0 taps)
→ create habit: name + trigger + target (≤ 3 taps; "Drink water · after waking · daily" default offered)
→ first Done tap (1 tap) → pulse preview "warming up" (0 taps) → optional reminder (1 tap, contextually)
```

Budget (`decision`): **first Done ≤ 90 s, ≤ 5 taps, zero mandatory permissions, zero account, works offline.** No questionnaire, no avatar, no tutorial. Every onboarding step can be skipped; the sample habit proves the loop.

### 3.3 Flow: the daily check-in (core loop)

```
open Today → habits sorted by need (Fading first) → tap Done on what you did
→ optimistic local commit (< 100 ms), haptic, pulse preview updates in place
→ today's list shrinks; tomorrow's plan is already visible → close (or 5-second Recap glance)
```

State chain per day entry: `pending → done | missed | rested`, with:
- **Rollover:** at the app day boundary (default midnight, user-settable), not-done habits roll to `missed` exactly once, lazily on next open. Idempotent — reopening never double-rolls or double-decays.
- **Correction (honesty window):** within 48 h of a missed day, `missed → done` (and `done → missed`) are one tap, and the pulse re-derives. After 48 h the day locks with an explanatory message. There is **no paid repair, no freeze item, no way to alter a locked day** (`floor-blocked`: paying to rewrite history is unrepresentable).
- **Undo:** a Done tap is undoable in-session and within the 48 h window.

Feedback chain (every state-changing action): intent → optimistic local state → durable write → consequence ("pulse 68 → 71 · back to Steady in 4 days") → undo/correction path. No confetti; the calm pulse movement is the reward (`decision`).

### 3.4 Flow: miss, fade, and rescue

```
miss a day → pulse dips (reason line explains) → Fading band reached
→ rescue card on Today (4 options, one tap each)
→ Make it smaller: target 5→3, pulse re-derives, "You're back to Steady at 84"
→ Rest it: pulse freezes at current value, badge "resting until Aug 20", no reminders
→ Archive: history preserved, out of rotation
→ ignore for 7 days in Dormant: rescue card becomes primary, checkbox still works
```

### 3.5 Flow: weekly recap

```
recap day (default Monday) → 5-second summary:
per habit: pulse start → end, plan hit rate ("3 of 4"), one forecast
("Steady by Fri if you hit 2 of 3 remaining days")
→ one highlight ("Read · first Steady week in a month") → next week starts now
```

Copy rules (`decision`): neutral language — "not done", never "missed opportunity", "broken", "lost". No streak count anywhere. A missed week is shown as data and a forecast, not a eulogy.

### 3.6 Flow: reminders (delivery, not the reason to return)

- Per-habit reminder at the chosen trigger time; fires only when the habit is active, today not yet done, and not resting. Deep link opens Today with that habit highlighted.
- OS notification permission requested only at the moment the first reminder is created (contextual, skippable).
- Local notifications only in v1 — no push service, no server, nothing running in the background except the scheduled notification (`decision` — economy).
- **Fatigue guard:** if a user opens via reminder, completes nothing, for 3 consecutive days, the app suggests reducing reminders. It never auto-disables without consent and never uses loss-shaming copy in a notification.

### 3.7 Flow: data, portability, exit

- **Local-first:** all core function works with zero network, zero account, zero permissions. Day entries are the authoritative local record (`decision`).
- **Export:** full history (habits, entries, pulse series) to CSV/JSON in one tap, complete and machine-readable. Offered prominently before any delete.
- **Delete:** archive (history preserved) vs delete (all data removed after a confirm-with-type). Account/data deletion (future sync) purges server copies within 30 days, local immediately.
- **Sync:** `contract-ready` in v1 — a tested zero-runtime boundary (see §6). When enabled (Pro), sync is per-`(habitId, date)` last-write-wins with idempotent keys, a visible local/synced indicator, and never silent overwrite of a conflict — a conflicted entry shows as such. Unblocked by evidence in §5.

### 3.8 State authority map

| Object | Authority | Derived? |
| --- | --- | --- |
| Day entry `(habitId, date, state)` | local device (canonical); sync LWW later | no — the only stored truth |
| Pulse value/band | derived — computed from entries + rules on demand | yes — never stored, so it can never disagree with history |
| Forecast ("Steady by…") | derived — forward simulation of the same math | yes |
| Recap | derived — from entries at recap time | yes |
| Reminders/settings/day boundary | local device | no |
| Rest/archive markers | local device, with history preserved | no |

Because pulse is derived from entries, every correction, resize, and rest instantly and honestly re-derives the whole history. There is no separate "score table" to get out of sync — this is the correctness core of the design.

---

## 4. What we deliberately trade off — and when we roll back

Each row: what we give up, why it's deliberate, the exact evidence that triggers a rollback, and what the rollback is. Triggers are `hypothesis` thresholds to be validated. The right column is always an opt-in extension on the same concept — never a second product and never a default-on reversal.

| # | We deliberately trade off | Why | Rollback trigger (evidence) | Rollback action |
| --- | --- | --- | --- | --- |
| T1 | **All-or-nothing streaks.** No chain counter, no reset event, no streak-shaming anywhere | The reset cliff is the documented reason habit-tracker users churn in weeks 2–6; a miss is a dip, not a death | "Driven" segment (interviews: users who explicitly want a chain) shows week-4 D1 retention < 25% **and** no pulse-based challenge satisfies them | Ship **opt-in "Chain mode"** (feature-flagged, default off): a chain is just "pulse at 100 for N consecutive days" — same math, same object, no second system. Never default-on |
| T2 | **No social, no accountability, no leaderboards, no sharing** | The job is a private 10-second ritual; social layers add feeds, permission sprawl, and privacy burden that tax the core | Median plan hit rate in weeks 3–6 plateaus < 70% in cohort analysis **and** structured interviews rank "someone to answer to" as the top unmet need (≥ 60% of respondents) | Opt-in **accountability partner** (mutual Done-taps only, no feed, no posts, no leaderboard) — a second pulse the partner can see, built on the same day-entry object |
| T3 | **No gamification: no XP, levels, coins, pets, streak freezes, or repair economy** | Gamified layers lose motivational power after ~a month (observed in RPG-style trackers) and add a second concept; paid repairs violate the honesty floor | Week-4 D1 retention of activated users < 35% **and** reminder fatigue is ruled out as the cause | Add **pulse milestone cards** (pure celebration: "30 days Steady", "Recovery: back from Dormant") — no currency, no economy, no paid repairs. Paid repairs remain `floor-blocked` forever |
| T4 | **No AI coach, no content feed, no mood journaling, no photo logging in v1** | Different jobs would split the concept; a feed destroys the 10-second ritual | ≥ 25% of Pro-era interview participants request coaching **and** a design study shows it does not lengthen sessions or cannibalize check-ins | Build the `contract-ready` coach boundary as an optional module (see §6) — never a feed |
| T5 | **No money stakes, no punishment mechanics** (Beeminder-style) | Trust floor: the product must never profit from or weaponize failure; this is `floor-blocked`, not a preference | No trigger exists. This is not rolled back | N/A — permanent floor. If a future owner proposes it, it is rejected at design review |
| T6 | **No ads, and engagement time is not a goal.** Sessions should end after 10 seconds; we optimize for shortest useful session, not session length | Ads would tax the ritual and create a metric that fights the promise | n/a — this is a stance, not a feature. Revisited only if the business model fails (below) | If Pro under-earns, revisit monetization via the pricing specialist — never ads inside the check-in moment |
| T7 | **Local-first; no forced account; sync deferred** | An account wall kills the cold-start promise; most habit data is single-device | Multi-device sync becomes a top-3 support complaint after release (measured, ≥ 15% of support tickets) | Promote sync + optional account from `contract-ready` to default-on with migration preserving all local history |
| T8 | **One-time Pro as the only commerce** (sync when it ships, long-range trends, appearance) | The entire core concept — unlimited habits, pulse, rescue, recap — is free forever; Pro is depth on the same concept | Activated-user Pro conversion < 2% **or** refund rate ≥ 5% after 90 days | Evaluate subscription packaging via `price-saas-subscription` specialist with the value exchange re-derived from user evidence; core concept stays free |

### What we refuse to trade (hard floors, no rollback)

- The pulse is never fudged to motivate; every number is user-computable from history.
- No paid repair, no streak freeze, no altering a locked day.
- No loss-shaming copy ("broken", "lost", "failed") anywhere, including notifications.
- Core utility is never gated by tenure, usage, or purchase: unlimited habits, full history, export, and deletion are free.
- No data leaves the device without explicit consent; no SDK runs at startup.

---

## 5. Capability sweep (boundary-complete, proportionate)

`integrate-now` = build production-shaped in v1. `contract-ready` = tested zero-runtime boundary, absent from UX. `not-applicable` = exact reason. `floor-blocked` = prohibited transition made unrepresentable.

| Capability | Disposition | Reason / target |
| --- | --- | --- |
| Habit CRUD, trigger, weekly target | integrate-now | core object; 3-tap creation, templates with defaults |
| Day check-in + 48 h correction + undo | integrate-now | the core action; optimistic, idempotent, offline |
| Pulse engine (bands, rollover, forecast) | integrate-now | the core concept; deterministic, property-tested |
| Rescue flow (smaller / change when / rest / archive) | integrate-now | the recovery arc; one tap per option |
| Weekly recap | integrate-now | the second beat of the loop; 5-second surface |
| Local notifications + fatigue guard | integrate-now | delivery only; local, permission-contextual |
| Home-screen widget (Today + pulses) | integrate-now | the ritual belongs on the home screen; deep link to Today |
| Export / archive / delete / data wipe | integrate-now | portability floor; export before delete |
| Accessibility + dynamic type + reduced motion | integrate-now | cross-cutting floor on every selected surface |
| i18n foundation (message IDs, locale dates, RTL-ready) | integrate-now | cross-cutting floor; en-US first, structure never locked |
| Privacy: no startup SDKs, consent-gated diagnostics | integrate-now | trust floor; zero third-party at launch |
| Sync + optional account | contract-ready | boundary designed (per-entry LWW, conflict visibility); unblocked by T7 evidence |
| AI coach / automation / wearables / web | contract-ready | boundary preserved; unblocked by T4 evidence and demand |
| Gamification economy (XP, coins, pets, repairs) | not-applicable | second concept; trust and concept-purity reasons (T3) |
| Social feed, community, leaderboards, sharing | not-applicable | second product; privacy + attention (T2) |
| Money stakes / commitment contracts | floor-blocked | trust floor — punishing failure is unrepresentable (T5) |
| Ads | not-applicable | business model: one-time Pro; ads tax the ritual (T6) |
| Mood journaling / photo logging / notes as first-class | not-applicable | different job; splits the concept (T4) |
| Child mode | not-applicable | audience is adults; no UGC, no social, no commerce for minors; minimal data by design |
| Cloud push, remote config, A/B SDKs at startup | not-applicable | economy + privacy: local notifications only; experiments ship as released builds with counters |

Dangerous-interaction fixtures to build (automated): correction after rest window; archive during an active week's recap; rollover across timezone change; notification deep link after habit archived; export during storage-pressure; restore after uninstall (local backup/export prompt).

---

## 6. Acceptance criteria a builder can test

Every criterion is `given/when/then`, deterministic where possible, and covers the concept's correctness, the flows, and the rollback triggers. "Builder" = the implementing engineer or test agent; each item is executable as a unit/integration/UI test.

### Core concept: pulse math

- **AC-1 (determinism)** — Given a habit with weekly target 3 and exactly 12 done days in the trailing 28-day window, then pulse = 100 exactly; flipping any single day done→missed changes the pulse by exactly the defined per-credit delta; the result is identical across recomputations (property test across exhaustive 28-day windows for targets 1–7; rounding = half-up, specified in one module).
- **AC-2 (one miss never kills)** — Given any pulse ≥ 10, after exactly one missed day the pulse ≥ max(0, pulse − 25), and for daily-target habits ≥ pulse − 4; the pulse can only enter Dormant after sustained non-practice, never from a single miss.
- **AC-3 (recovery is provable)** — Given pulse 50, target 3, and 7 consecutive on-plan days, the pulse is strictly higher each day until it caps at 100; the "Back to Steady by {date}" forecast, when computed, matches a forward simulation of the same rules.
- **AC-4 (rollover idempotence)** — Given a habit not marked done and the clock past the day boundary, then reopening the app 1× and 10× produces exactly one `missed` entry and exactly one pulse recomputation; no duplicate entries, no double decay, and changing timezone never creates two entries for one physical day.
- **AC-5 (correction honesty)** — Given a `missed` day within 48 h of rollover, one tap converts it to `done` and re-derives the pulse; after 48 h the day is locked with an explanatory message; no in-app purchase, code path, or store receipt can unlock it (`floor-blocked` — test asserts the path does not exist).
- **AC-6 (rest semantics)** — Given a habit set to Rest for a period, then no decay accrues, no reminders fire, days are recorded `rested` (not `missed`), the pulse displays as frozen with a "resting" badge, and ending rest early resumes from the frozen value with the window math unchanged.
- **AC-7 (resize)** — Given a habit resized from target 5 to 3 in the rescue flow, then the pulse re-derives against target 3 using the same history, and the reason line shows the new plan ("12 of your last 12 planned days").

### Flows and states

- **AC-8 (cold start)** — Given a fresh install with no network and no account, a user can create a habit and register a Done tap within 90 seconds at ≤ 5 taps, with the sample habit visible on the first screen and every onboarding step skippable.
- **AC-9 (optimistic commit)** — Given a Done tap, the UI reflects it in < 100 ms on a mid-tier device, the entry survives an immediate app kill, and 5 rapid taps on the same habit produce exactly one credit.
- **AC-10 (ordering)** — Given habits in Steady, Building, and Fading bands on the same day, Today lists them Fading → Building → Steady, and Dormant habits show the rescue card as the primary action while the checkbox still works.
- **AC-11 (rescue)** — Given a habit first crossing into Fading (age ≥ 7 days), a rescue card appears with exactly four one-tap options; each option applies immediately and re-derives the pulse per §2.3; a habit aged < 7 days never shows a rescue card (Warming).
- **AC-12 (recap)** — Given a completed week, the recap renders in ≤ 2 s on a mid-tier device with 50 habits and shows per-habit pulse start→end, plan hit rate, and exactly one forecast; copy contains none of the prohibited words (broken, lost, failed, miss* as shame — assert against the copy dictionary).
- **AC-13 (reminders)** — Given a reminder set at a trigger time, it fires only when the habit is active, today not done, and not resting; the deep link opens Today with the habit highlighted; after 3 consecutive reminder-opened sessions with no completions, the app suggests (never enforces) reducing reminders.
- **AC-14 (offline)** — Given airplane mode from install, all of AC-1–AC-13 still pass; the only UI difference is a local/synced indicator where applicable; reconnecting changes nothing about correctness.
- **AC-15 (export/delete)** — Given a 90-day history, one tap produces a complete CSV and JSON export (habits, entries, pulse series) with no data loss; delete requires confirm-with-type and offers export first; archive vs delete are distinct and history-preserving vs history-removing as documented.

### Quality floors

- **AC-16 (privacy)** — Given a fresh install, zero third-party SDKs initialize at startup, zero network requests occur before the first user action, and no permission is requested before its value moment (notification permission only at first reminder creation).
- **AC-17 (accessibility)** — All core flows pass with VoiceOver/TalkBack, 44 pt minimum targets, dynamic type up to 200%, high-contrast, and reduced-motion enabled; no action has a visible countdown (the 48 h correction window is informational, not timed UI).
- **AC-18 (performance)** — Cold start → interactive Today ≤ 2.5 s on a 2019-era mid-tier Android and ≤ 1.5 s on mid-tier iOS; app size < 25 MB; pulse computation for 50 habits < 5 ms; no background work other than scheduled local notifications (battery overhead < 1%/day).
- **AC-19 (fatigue/trust countermetrics instrumented)** — The app records, with consent: sessions triggered by reminder vs open, reminder opt-outs, correction misuse (backfilled share of done days), rescue option adoption, rest usage, and export/deletion completions — each with an owner and an action contract (see §7). No loss-anxiety telemetry (streak-loss events do not exist).

### Rollback triggers, as testable gates

- **AC-20 (T3 gate)** — Week-4 D1 retention of activated users (≥ 3 done days in week 1) is reported with 90-day confidence intervals; if the lower bound < 35% and fatigue is ruled out, the milestone-card experiment ships feature-flagged.
- **AC-21 (T1 gate)** — The "driven" segment is identified by an in-app, opt-in one-question survey at week 2; if that segment's week-4 retention < 25% and no pulse-based challenge satisfies them in interview, Chain mode ships opt-in, default off.
- **AC-22 (T2 gate)** — Median plan hit rate weeks 3–6 is reported per cohort; if < 70% and ≥ 60% of interviews rank accountability as the top unmet need, the accountability-partner slice is scoped on the existing day-entry object (never a feed).
- **AC-23 (T7 gate)** — Sync-related support tickets are tagged and counted; if multi-device sync is a top-3 ticket topic at ≥ 15% of tickets after release, sync + optional account promote from `contract-ready` with a migration that preserves all local history.

---

## 7. Metrics, countermetrics, and next proofs

| Branch | Signals | Countermetrics (guardrails) |
| --- | --- | --- |
| Activation | first Done ≤ 90 s; setup abandonment; sample-habit adoption | permission denials, storage errors, support on creation |
| Core value | median plan hit rate weeks 3–6; pulse distribution; rescue option adoption; back-to-Steady rate | correction misuse (> 30% of done days backfilled = honesty flag → gentle nudge, never punishment) |
| Retention | week-4 D1 of activated users; return reason (recap/pulse vs notification) | notification dependence (share of sessions started by reminder), opt-outs, uninstalls after first miss |
| Trust | export/deletion success; locked-day complaints; copy-dictionary violations | regret/complaints, "number doesn't match my history" reports (correctness bugs) |
| Commercial | Pro conversion of activated users; refund rate | support cost per payer, feature-gating complaints (must be zero) |
| Operability | crash-free rate, rollover/offline fixture pass rate, pulse property-test pass rate | battery/thermal complaints, sync conflict visibility (post-launch) |

Validation roadmap (`hypothesis`): contract/property tests for pulse math (AC-1–AC-7) → 5-user prototype for rescue comprehension → exact slice build of Today + pulse engine → 50-user canary measuring AC-20–AC-23 gates → production readback on the KPI tree above. Hard blockers: none known; unresolved hypotheses: rescue-card comprehension on first Fading encounter, one-time-Pro willingness for sync/trends, and whether the 48 h correction window is long enough for real schedules (measured, adjustable before launch).

Handoffs: pricing/packaging of Pro → `price-saas-subscription` (when sync and trends exist); payment/refund → `build-product` payment-readiness; release/store evidence → distribution-readiness; notification fatigue and reminder strategy → `review-notification-strategy` before release; offline/sync conflict semantics → `review-offline-sync-conflict` when sync promotes. No digest fields: all inputs are draft.
