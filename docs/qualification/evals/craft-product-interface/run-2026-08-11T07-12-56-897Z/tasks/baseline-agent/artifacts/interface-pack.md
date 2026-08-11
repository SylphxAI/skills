# Interface Pack — First-Run Onboarding for a Habit-Tracking App

| | |
| --- | --- |
| Mode | Direction (greenfield; no implementation in this pack) |
| Surface | First-run onboarding flow (install → first completed check-in → home) |
| Primary user & job | A new user converts from "installed the app" to "committed one real habit and completed Day 1" |
| Platform / inputs | Mobile-first (iOS + Android); touch primary, keyboard + assistive technology parity; web/desktop can host the same flow |
| Status | Draft v0.1 — design direction ready for implementation review |

---

## 1. Scope

### Supplied truth

- Product is a habit-tracking app. No brand name, palette, typeface, pricing, or platform stack is supplied — those are out of scope and marked as placeholders.
- No account/auth requirement is specified. This pack assumes onboarding can start without login; if an account becomes required, an auth step must be inserted **after** value is shown, not before (see Unresolved evidence).

### In scope

- The 5-step first-run flow, its screens, layouts, hierarchy, copy roles, and actions.
- The full state model per screen and across the flow (loading, empty, partial, offline, permission, error, success, destructive, interrupt/resume).
- Baseline accessibility, responsive, input, motion, and performance contracts for the flow.
- Recovery: draft persistence, resume, undo, settings recovery, non-nagging permission paths.

### Non-goals

- Whole-app information architecture, retention loops, analytics product design, or the post-onboarding home screen (only its first-run shape is sketched as the terminal artifact).
- Brand identity, pricing, marketing claims, or formal accessibility certification (see §11).
- Login/account recovery, cross-device sync implementation, or billing.
- Design-system extraction; this pack only defines the local tokens the flow needs.

### Assumptions (labeled, must be confirmed)

- A1. Onboarding should take ≤ ~2 minutes and end with a **real** first check-in, not a promise.
- A2. Notifications are optional and requested at the value moment (after habit + schedule exist), never at cold start.
- A3. The user's first habit is created in-flow (no import) for v1; import/restore is future work.
- A4. Offline behavior: the flow must remain completable offline; sync semantics depend on whether cloud sync exists (unresolved).
- A5. Working copy strings below are drafts; truth owners are listed in §10.

---

## 2. Direction

### Compact direction record

```text
User / job / surface:
  New user / commit one real habit and complete Day 1 / first-run onboarding

Primary archetype + modifier:
  Conversion clarity (explicit value, next step, honest consequence)
  + Friendly utility (forgiving, warm, no shame)

Design thesis:
  Onboarding never shows mock data — every decision renders immediately into
  the user's real week strip, which becomes their actual home row. The strip
  is the habit's identity; configuring is seeing.

Hierarchy and content order:
  Step heading (what am I deciding) → one decision control set
  → helper (why / format / consequence) → one primary action → quiet secondary.

Density and layout grammar:
  Sparse focus. One step per screen. Single centered column on all sizes
  (max ~560px on wide). 4/8px spacing scale. Concentric radii
  (outer ≈ inner + padding). ≤3 text sizes per screen (display, body, label/meta).

Color roles (placeholders pending brand tokens):
  canvas (warm neutral) · surface · elevated · primary text · muted text
  · border · primary action + focus (one restrained accent) · success/danger
  (status only, small badges/states). ≤5 colors total.

Type roles:
  Display (step heading, weight 500–600, tight tracking) · Body (400, lh 1.5)
  · Label/meta (smaller, 500, muted for secondary only). Tabular nums for
  step numbers and streak/day counts.

Interaction and motion rhythm:
  Micro 80–150ms press feedback · step change 250ms ease-out (opacity +
  6–12px translate on the heading group only) · strip/check-in fills 200–300ms
  · rare celebration only on first check-in, gated by reduced motion.
  Motion explains change or confirms outcome; never blocks input.

One signature move and its meaning:
  The living week strip. From Step 3 onward, a 7-day strip renders the user's
  real habit name, real days, and real time. On Step 5 it becomes the
  check-in surface and later the actual home row. Meaning: a habit is a
  pattern across days, not a setting — and what you configure is what you get.

Anti-patterns:
  Fake streak/achievement counters before any real check-in; confetti on
  every step; permission wall at cold start; login wall before value;
  progress dots as the only step indicator; every section as a rounded card;
  emoji-as-icons; purple-gradient/AI-generic palette; placeholder or lorem
  data in the strip; hidden or buried "skip"; shame copy about missed days.
```

### Generic-default check

- Not a card grid: steps use one decision plane with a quiet header and a single surface panel.
- Not a slogan hero: copy names the concrete outcome ("What do you want to make a habit?").
- Motion is only for step change, check-in confirmation, and the one celebration.
- The signature move is data-true: it renders the user's own choices, never mock content.

---

## 3. Flow map

```text
launch ── has_active_habit? ── yes → home (onboarding never re-runs)
   │ no
   ▼
S1 Welcome ──────────────► S2 Choose habit ──► S3 Schedule ──► S4 Reminders ──► S5 First week
   │ (no account wall)      │ templates or       │ frequency +   │ permission at  │ live strip +
   │                        │ create your own    │ time          │ value moment   │ first check-in
   └── "Not sure?" ──► S2 suggestion focus       │               │                │
                                                 └─ skip → explicit default      │
                                     any step ── interrupt/kill ──► resume at saved draft ──┘
```

| Step | Job (what the user decides) | Primary action | Quiet secondary | Distinct states |
| --- | --- | --- | --- | --- |
| S1 Welcome | Buy in to a 2-minute setup | "Choose your first habit" | "Not sure? See suggestions" | first use, returning launch (skip flow) |
| S2 Choose habit | Pick or create the core object | Template tap → continue; "Create habit" | Back; "I'll do this later" → no-op (blocked? no — see §5) | loading, empty, selecting, editing, validating, error, offline |
| S3 Schedule | When it happens (days + time) | "Continue to reminders" | "Skip — Every day at 8:00 AM" | editing, defaulted, locale/time-zone note |
| S4 Reminders | Consent to notifications | "Allow reminders" (triggers OS prompt) | "Not now" | pre-prompt, granted, denied, limited, skipped |
| S5 First week | Confirm and complete Day 1 | "Mark today done" → "See your home screen" | "Not now — go to home" | idle, checking-in, checked, undo, success |

---

## 4. Screen specs

### S1 — Welcome

- **Job:** set expectation, show concrete outcome, remove friction ("no account needed").
- **Hierarchy:** h1 → one body sentence → "what you'll set in ~2 minutes" (3-item list: your habit, its schedule, a reminder) → primary → quiet secondary → microcopy.
- **Draft copy (truth owner: product brief):**
  - h1: "One habit at a time."
  - Body: "Choose something small, set when it happens, and check it off. We'll remind you and keep your count honest. You can change everything later."
  - List: "Your habit", "A schedule that fits", "A reminder you can turn off".
  - Primary: "Choose your first habit". Secondary: "Not sure? See suggestions". Microcopy: "Takes about two minutes · Skip or change anything later".
- **States:** first use (this screen); returning-with-draft (→ resume, §5); returning-with-habit (→ home, never shown again).
- **Accessibility specifics:** h1 is the step landmark; "Step 1 of 5" announced on entry via live region; list is a real `<ul>`; both actions ≥44px; no decorative animation on entry (calm start).

### S2 — Choose habit

- **Job:** capture the core object with one tap (template) or one short form (custom).
- **Hierarchy:** h1 → template grid (radio-group semantics) → "Create your own" row → primary is the selected template/created habit; helper shows the resulting default ("Every day · 8:00 AM") so the selection is concrete.
- **Templates (draft content, owner: product):** Drink water · Read 10 minutes · Walk 20 minutes · Meditate 5 minutes · Stretch · Write 100 words. Each row: single-accent icon + name + cadence label. No emoji, no fake counts.
- **Custom form:** one field ("Habit name", max 60 chars, wraps — no clipping), optional icon picker (same accent icon set), "Create habit" button.
- **States:**
  - Loading: skeleton grid matching final geometry (no layout shift).
  - Empty/zero result: not applicable in v1 (no search); if added, preserve query + clear affordance.
  - Offline: templates served from a bundled/cached set; custom creation fully functional; badge "Works offline — saved on this device".
  - Error (template fetch failed): retry + "Create your own" still enabled; never block the whole step on a network failure.
  - Editing: IME composition, paste, autocomplete all preserved; Enter submits the single-line form.
  - Validation: empty name → error on submit ("Name the habit so you can recognize it"), focus moves to the field, values retained.
  - Success: selection/creation renders into the week strip immediately (signature move starts here).
- **Accessibility specifics:** template grid is a `radiogroup` with arrow-key navigation; selection announced ("Drink water, Every day at 8:00 AM, selected"); icon never carries meaning alone (name text always present); error uses `role=alert` + `aria-describedby`.

### S3 — Schedule

- **Job:** when does it happen (frequency + time).
- **Hierarchy:** h1 → frequency control → time control (with presets) → helper (time zone note) → primary → skip link.
- **Controls:**
  - Frequency: "Every day" (default) | "Specific days" → expands a 7-day checkbox grid (M T W T F S S, locale-first day order).
  - Time: native time input (locale 12/24h) + presets "Morning 7:00", "Midday 12:30", "Evening 19:00" (times displayed in the device's local format).
  - Helper: "Reminders use your device time zone."
- **Skip (explicit, never hidden):** "Skip — use Every day at 8:00 AM" states the exact default it applies.
- **States:** editing; defaulted (skip); time-zone change detected between steps (re-derive from device clock, note it); keyboard open (time control and primary stay visible/scrollable into view on compact).
- **Accessibility specifics:** day chips are a checkbox group (color + check mark, not color alone); each chip ≥44px with full label "Monday"; native time input announced with its format ("8:00 AM"); focus order: heading → frequency → days → time → primary.

### S4 — Reminders

- **Job:** request notification permission **after** value exists, with an honest skip.
- **Hierarchy (pre-prompt, before any OS prompt):** h1 → one concrete benefit sentence naming the actual scheduled time → consent body (what data/behavior, how to change it) → primary "Allow reminders" (then OS prompt — platform-owned copy) → secondary "Not now".
- **Draft copy (truth owner: privacy/notification policy):**
  - h1: "Get a nudge at the right moment."
  - Body: "We'll send a notification at 8:00 AM on your habit days. You can change the time or turn reminders off anytime in Settings."
- **States (permission journey):**
  - `pre-prompt → requested → granted → continue`
  - `denied` → explain actual behavior: "Reminders are off. You can still check in when you open the app, and turn reminders on later in Settings → Notifications." Primary: "Continue without reminders" + settings link (only where the platform supports deep-linking; otherwise in-app guidance).
  - `limited` (platform variants) → same recovery copy, honest about what is limited.
  - `skipped` → no repeat prompt during onboarding; reminders can be enabled contextually later (e.g., first time a check-in is missed, per retention policy — not automated in this pack).
  - No fake prompt loop; never imitate the OS dialog in-app.
- **Accessibility specifics:** pre-prompt is a normal step (no modal); when focus returns from the OS permission sheet it returns to the triggering button; denial state is a normal page with a single primary; status text in a live region ("Reminders on at 8:00 AM").

### S5 — First week (terminal step)

- **Job:** confirm the commitment, complete Day 1, and orient to home.
- **Hierarchy:** h1 → the living week strip (today = "Today · Day 1", the user's real name, time, and days; off-days dimmed) → check-in action → honest streak ("1") → primary.
- **The strip (signature move):** rendered from the user's actual choices made in S2–S3. It is not a mockup — it becomes the home row after this step. On specific-day schedules, non-habit days are visibly dimmed with labels.
- **Primary path:** "Mark today done" → checked state (quiet 300ms fill + status "Day 1 marked done") → primary becomes "See your home screen". Undo link next to the check ("Undo") — persistent, not a 5-second toast.
- **Quiet path:** "Not now — go to home" → Day 1 stays unchecked; home's empty state offers the same check-in as the first action.
- **Celebration (rare, optional):** one restrained confirmation only for the **first** check-in; disabled entirely under `prefers-reduced-motion`; never on other steps.
- **States:** idle → checking-in (button busy, guarded against double-tap) → checked → undo → success (terminal); offline (check-in queued: "Saved — will sync" if sync exists; otherwise local "Saved", per A4).
- **Accessibility specifics:** strip cells are a list with day labels; "Today" is `aria-current="date"`; check-in is one large button (≥48px); result announced via live region without stealing focus; streak uses tabular numerals and is announced as "1 day" — honest, derived from real check-ins.

---

## 5. Global state model

### Taxonomy (never collapse distinct states into one blank)

| State | Communicated by | Action |
| --- | --- | --- |
| First use | S1 value framing | start flow |
| Empty (no habits) | home empty state (post-flow) | check in / add habit |
| Loading | skeleton matching final geometry | wait; no layout shift |
| Partial | templates loaded, custom still usable | continue with available data |
| Offline | badge + local-save copy | complete flow locally; queue sync if it exists |
| Permission blocked | explicit denial copy, no nag loop | continue without / settings recovery |
| Error | what failed, what was retained, next action | correct, retry (idempotent), or continue |
| Success | durable outcome + destination | continue / undo |
| Destructive | (post-onboarding only) exact scope + consequence | cancel / confirm / restore |

### Transition models

```text
Create habit:  idle → editing → validating → submitting → saved
                          |              |              └→ (renders strip, step advances)
                          v              v
                    correctable     retryable (values retained; no double-submit)

Check-in:      idle → checking_in → checked → undoing → restored
                          |            └→ home (terminal success)
                          v
                     retryable

Permission:    value-explained → requested → granted | limited | denied → settings-recovery | skipped
               (reconcile external OS changes; never assume the last in-app result is current)

Interrupt:     step_n → backgrounded/killed → draft persisted → relaunch → resume at step_n
               (draft = habit name, icon, schedule, reminder choice; progress "Step n of 5" reflects it)
```

### Rules

- **Draft persistence:** S2+ values are saved locally before the user leaves a step, so back, app-switch, kill, and crash all resume at the exact step with values intact. "Start over" is available only as a quiet text action on S5.
- **No data loss:** never erase valid input because a network, permission, or validation transition failed.
- **Duplicate submit:** submit buttons disable while in flight and are idempotent on retry.
- **Returning users:** a completed flow sets `has_active_habit`; onboarding is never re-run on launch or app update.

---

## 6. Accessibility contract (baseline)

This is a baseline implementation floor, **not** formal conformance (see §11).

| Boundary | Floor | Verification for this flow |
| --- | --- | --- |
| Structure | Semantic landmarks, h1 per step, real lists, labeled controls, buttons for actions | Accessibility-tree inspection per step |
| Name/role/state | Accessible names match visible text; `selected`, `checked`, `aria-current="step"`, `busy`, `invalid` exposed | Screen-reader smoke test of the full flow |
| Keyboard/focus | Complete path with visible focus; focus moves to the step h1 on step change; back returns to meaningful origin; no traps | Keyboard walkthrough: all 5 steps + skip + undo |
| Perception | Body text ≥4.5:1; muted only for secondary meta; color never the sole carrier (day chips, selection, success all have text/icon companions); focus ring visible (2px offset) | Contrast measurement; grayscale squint test |
| Reflow | 200% text scaling, longest locale, and RTL remain operable without horizontal scroll; strip cells wrap | Zoom + locale stress render |
| Dynamic feedback | Step change, check-in result, errors, and save status announced without repetitive disruption | Live-region behavior check |
| Motion/sensory | `prefers-reduced-motion` removes travel + celebration; fills become opacity/color only; no flashing | Preference-mode render |
| Complex representation | N/A for this flow (no charts/maps/media) | — |

### Focus map per step

- Step change: focus lands on the step h1 (`tabindex="-1"`), announced as "Step n of 5: <heading>".
- S2: template grid = radiogroup with arrow keys; custom form focus goes to the name field when opened; error → focus first actionable error.
- S3: day chips = checkbox group; time presets are buttons; native time input reachable by keyboard.
- S4: OS permission return → focus returns to "Allow reminders" (or the next step if granted elsewhere).
- S5: check-in button; after check, focus stays on the primary (now "See your home screen"); Undo is a reachable adjacent control.
- Touch targets ≥44px everywhere (check-in and primary ≥48px).

### Motion plan

| Event | Treatment | Duration |
| --- | --- | --- |
| Press feedback | brief state change at the control | 80–150ms |
| Step change | opacity + 6–12px translate on heading group only; content fades 200ms | ~250ms ease-out |
| Strip update (S2→S3) | color/opacity fill on the real cells | 200ms |
| Check-in success | quiet fill + status text; no travel | 300ms |
| First-check-in celebration | optional, one time only, removed under reduced motion | ≤500ms |
| Reduced motion | keep opacity/state swaps, remove travel, blur, celebration | instant/80ms |

Motion never blocks input, is interruptible, and animates only transform/opacity/color (no layout-triggering animation, no content jumps).

---

## 7. Responsive & input contract

| Axis | Compact (360–430px) | Medium (tablet / landscape) | Wide (web/desktop ≥1024px) |
| --- | --- | --- | --- |
| Layout | Single column; one step per screen; primary above home indicator | Centered column (max ~480px) | Centered column (max ~560px); flow never stretches |
| Time control | Native picker on compact | Inline | Inline |
| Keyboard | Focused control + error scroll into view; primary stays reachable | same | same |
| Safe areas | Respect notch, status bar, home indicator insets; no critical control behind system gestures | — | — |
| Orientation change | Preserves step + entered values (draft) | same | same |
| Zoom / locale | 200% zoom and RTL without horizontal scroll; long habit names wrap in strip cells | same | same |

Input parity: every action is pointer- and keyboard-reachable; hover never carries unique information; gestures (if any, e.g., swipe-back) have visible alternatives; correct input modes (time, text with autocomplete) are used; voice-control labels match visible action names.

---

## 8. Performance contract (provisional)

No approved budgets or telemetry exist — the fixture below is **provisional** and must be measured, not assumed.

- Fixture: mid-range 2019 Android-class device, 4G, cold start, empty cache; compact viewport.
- Provisional targets: first interactive step (S1 h1 + primary) ≤ 2.5s; template grid usable ≤ 1.5s after shell; zero layout shift on the week strip; onboarding route assets ≤ ~400KB gzip (provisional); no analytics, font, or SDK blocking the first useful path.
- Checklist: static/local fonts; template list bundled or cached (offline-safe); no continuous offscreen animation; no oversized images; fidelity degradation (not truth) under low power: remove travel/celebration before removing state clarity.
- Evidence needed: device trace + reported measured values; report gaps as residual risk.

---

## 9. Recovery contract

- Back: returns to previous step with all values retained; back never discards work silently.
- Kill/crash: relaunch resumes at the saved step with the draft intact.
- Error: states what failed, that work was retained, and the next valid action; retry is idempotent.
- Permission denial: one explanation, settings-recovery path, no nagging; skip is always visible.
- Undo: check-in undo is persistent (not a toast timeout).
- Offline: flow completable; queue/sync status shown only where sync truth exists (A4).
- Destructive actions: none in this flow; the post-onboarding delete-habit surface must state exact scope + consequence (noted as a future surface).

---

## 10. Copy contract (drafts — truth owners listed)

| Role | Draft (S1–S5) | Truth owner | Status |
| --- | --- | --- | --- |
| Heading | "One habit at a time." / "What do you want to make a habit?" / "When does it happen?" / "Get a nudge at the right moment." / "Here's your first week." | product brief | draft |
| Label | "Habit name", "Every day", "Specific days", "Remind at", "Today · Day 1" | domain model | draft |
| Action | "Choose your first habit", "Create habit", "Continue to reminders", "Allow reminders", "Mark today done", "See your home screen", "Undo" | implemented behavior | draft |
| Helper | "Reminders use your device time zone." / "You can change the time or turn reminders off anytime in Settings." | product/policy truth | draft |
| Status | "Step 2 of 5", "Day 1 marked done", "Saved — will sync" (only if sync exists) | runtime state | draft |
| Error | "Name the habit so you can recognize it." / "Habits didn't load — retry or create your own." | failure/recovery contract | draft |
| Consent | "We'll send a notification at 8:00 AM on your habit days. Change or turn off anytime in Settings." | privacy/notification policy | pending owner |
| Claim | "Takes about two minutes" · "We'll keep your count honest" | product/marketing truth | pending owner |

Rules applied: concrete verbs; actions match outcomes; no shame, coercion, fake urgency, or hidden conditions; strings short, complete, localizable (no concatenation), with room for expansion and RTL; no fake testimonials, counters, or scarcity.

---

## 11. Acceptance criteria & unresolved evidence

### Implementation acceptance criteria (for the future Build mode)

- [ ] Flow completes in 5 steps on compact touch, keyboard-only, and with a screen reader.
- [ ] The living week strip renders only the user's real choices and becomes the home row.
- [ ] Every state in §5 is reachable and truthful; no collapsed blank states.
- [ ] One primary action per decision plane; skip and "not now" are visible on every step where they exist.
- [ ] Permission requested only at S4, with granted/denied/limited/skipped paths and settings recovery; no loops.
- [ ] Draft resume verified after kill, back, and orientation change; no input ever lost.
- [ ] Reduced-motion render verified (travel + celebration removed, state preserved).
- [ ] 44px targets, 4.5:1 contrast, visible focus, live-region announcements verified.
- [ ] 200% zoom, longest locale, and RTL render without horizontal scroll.
- [ ] Provisional performance fixture measured and reported with the exact device/profile.

### Unresolved evidence (explicitly not claimed)

- Brand name, palette, typeface, and exact tokens (roles only are defined here).
- Final template list and all copy sign-off (product owner).
- Platform notification behavior (iOS/Android channels, provisional/limited states) — must be verified at execution time.
- Whether cloud sync/accounts exist (affects "saved on this device" vs "will sync" copy).
- Approved analytics events and privacy-safe instrumentation of step completion/abandonment.
- Locale set for the first release and time-zone-change handling mid-flow.
- Formal accessibility conformance: requires declared standards, representative scope, specialist testing, and current evidence — out of this pack's scope.
