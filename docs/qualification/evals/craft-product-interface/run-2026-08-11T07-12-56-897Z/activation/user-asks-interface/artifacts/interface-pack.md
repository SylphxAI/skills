# Interface Pack — Onboarding Flow

Habit-tracking mobile app · iOS + Android native · Direction mode

## 1. Scope and mode

| Field | Value |
| --- | --- |
| Mode | **Direction** — this pack defines the flow, direction, state model, accessibility floors, and verification plan. It does not claim implementation or rendered evidence. |
| Surface | Onboarding: cold launch → welcome → first habit → schedule + reminder permission → ready → handoff to Home |
| Primary user job | Turn an intention into the first committed habit with a clear place in the day, in one calm pass, without being asked for anything that does not help |
| Platform & input | iOS / Android native, portrait-locked onboarding, touch-first with full keyboard, screen-reader, switch, and voice parity |
| Supplied truth | None beyond the product category. Everything else is labeled `[assumption]` or `[truth owner: …]`. No claims, metrics, prices, or testimonials are invented. |
| Non-goals | Account creation/sign-in, home-screen design, habit editing or analytics beyond v1 daily habits, notification settings screens, design-system extraction, brand identity, marketing media |
| Completion definition | Every reachable state defined and recoverable, input never lost, permission optional and reversible, baseline accessibility floors met, concrete render-verification plan in §7 |

## 2. Flow map

```
S0 Launch ─► S1 Welcome ─► S2 First habit ─► S3 Schedule + reminder ─► S4 Ready ─► Home
  │             │              │                   │
  │             └─ How it works (sheet, non-blocking)
  │              └─ validation errors / save errors / permission paths / back / resume
  └─ returning user ───────────► Home (handoff)
```

- 4 interactive screens; typical completion ≤ 2 minutes `[provisional target]`.
- **Skip policy:** the flow is short, so whole-flow skip is not offered; the only skip is reminders ("No reminder"). Abandonment resumes at the last reached step with all input intact (§5.1).
- **Handoff:** S4 → Home with one habit placed on today's plan. Home's empty state (reachable only if a future skip-onboarding path is added) is contracted in §4.6.

## 3. Design direction

### 3.1 Compact direction record

```text
User / job / surface:     New user making the first habit real, with a time and a nudge
Primary archetype + modifier: Friendly utility + Conversion clarity (onboarding)
Design thesis:            Onboarding feels like setting a bead on the day — one calm
                          decision per screen, and by the end the user can see their
                          habit already sitting in tomorrow
Hierarchy:                One headline, one decision, one primary action per screen;
                          value beats and helpers rank below the decision, never beside it
Density:                  Sparse focus — one decision per screen, no carousel, no clutter
Color roles:              Warm paper canvas, ink text, muted meta, one growth-green
                          primary, one error red (status only)
Type roles:               One system family; display, body, meta — ≤3 sizes per screen
Spacing/radius/elevation: 4pt grid; concentric radii (fields 12, buttons 16, sheets 24);
                          flat canvas, hairline surfaces, soft sheet shadow
Interaction rhythm:       Short quiet transitions (250–350ms); the bead placement is the
                          only emphasized motion; everything else is micro
Signature move:           The Day Arc — a horizon line across the day; the habit is a bead
                          placed on it in S3 and locked into it in S4
Anti-patterns:            Carousel welcome, fake progress meters, confetti, fake streaks,
                          mandatory account, permission at cold start, emoji icons,
                          gradients/glass, "one more screen" padding
Existing-system constraints: None discovered — greenfield. Direction must be portable to
                          both platform design languages without forking either.
```

### 3.2 Subject vocabulary

The product's real objects are **habits**, **days**, **times**, **reminders/nudges**, **check-ins**, and **streaks**. The interface speaks that language: a habit is not a card in a feed, it is a bead on the day. No "quests", "points", or "levels" — invented game vocabulary would falsify the product's promise.

### 3.3 The signature move: Day Arc

- A thin line (code-drawn, not an image) curves like a horizon from morning to night. Three **beads** sit on it: Morning 7:00, Midday 12:30, Evening 18:00.
- **Meaning:** a habit only works when it has a place in the day. Selecting a bead is "placing" the habit; S4 shows the bead **locked** on the arc with the habit's name and time — the user sees the habit already sitting in tomorrow.
- The arc is the spatial anchor reused across S3 and S4 (shared element). It is decorative line art; the beads are the interactive control (radio-group semantics, §6).
- This is the one emphasized motif. Everything else — buttons, fields, sheets — stays quiet.

### 3.4 Visual system

**Tokens** (semantic roles first; values are provisional direction, to be confirmed against the real brand `[truth owner: brand]` and measured in verification):

| Role | Light (provisional) | Dark (provisional) | Notes |
| --- | --- | --- | --- |
| Canvas | `#F6F4EF` warm paper | `#121412` | flat, no gradient |
| Surface | `#FFFFFF` | `#1C201C` | fields, sheets, chips |
| Ink (primary text) | `#1F231F` | `#EDEFEB` | body ≥ 4.5:1 on its surface |
| Muted (meta/labels) | `#5C625C` | `#9AA09A` | secondary labels only, never instructions |
| Border | ink @ 12% | ink @ 18% | hairline surfaces |
| Primary (action, focus, selected bead) | `#2E6B4F` | `#7FC8A0` | one primary, no second accent |
| On-primary | `#FFFFFF` | `#121412` | button label |
| Error | `#B3261E` | `#E3918C` | status only, never decoration |

Palette discipline: neutrals + one primary + one error. Success reuses primary green with a check icon (never color-only). No purple gradients, no glass, no emoji icons.

**Type** — one system family (SF Pro / Roboto). Per screen ≤ 3 sizes: display 28/600, body 17/400 (leading 1.45), meta 13/500. Legal microcopy 12. Times use `tabular-nums` so the digits do not reflow when values change.

**Spacing** — 4pt grid: 4/8/12/16/20/24/32/40/48. Screen gutters 20pt; step label 12pt above the headline; primary CTA zone pinned to the bottom safe area.

**Radius & elevation** — concentric: fields 12, buttons 16, sheet top corners 24; pills only for small chips. Canvas flat; surfaces get a hairline border; the "How it works" sheet and pre-prompt get a soft shadow; toasts float. One elevation system, no stacked glass.

**Illustration** — only the Day Arc, drawn in code with the token palette. Decorative for screen readers; never a stock image, never emoji.

**Motion & haptics** — §5.4.

### 3.5 Anti-pattern checklist

Rejected unless a future brief reverses them: swipeable feature carousel; "one more screen" padding; fake progress/urgency; confetti or streak animations on routine completion; permission prompts before value; mandatory account; emoji-as-icons; gradients/glass/neon; slogan hero that fits any product; multiple primary buttons on one decision plane.

## 4. Screens and states

**State convention.** Every screen defines **Default, Empty, Loading, Error, Success**, plus reachable special states (focus, permission, resume). "Not reachable" rows state the reason — they are not omitted. All error and loading states preserve valid input (§5.2).

### 4.1 S0 — Launch

**Purpose:** route the user; initialize the local store. **Decisions:** none.

**Layout:** centered brand mark on canvas. No buttons, no progress text.

| State | Trigger | UI & behavior | User actions | Truth / retention |
| --- | --- | --- | --- | --- |
| Loading | Cold start | Brand mark; quiet, no spinner noise. Routes: first run → S1; onboarded → Home; interrupted onboarding → last reached step (§5.1) | none | — |
| Error | Local store fails (disk/corrupt) | "We couldn't open [AppName]." + `Try again` + `Get help` `[truth owner: support]` | Retry; support | No data assumed |
| Empty / Success | — | Not reachable: launch has no empty or success presentation; success is routing to the next screen | — | — |

If accounts/sync exist in v1 `[product decision]`, add a sync-check loading row and an offline row here — until then onboarding is local-first (§5.5).

### 4.2 S1 — Welcome

**Purpose:** state the value in one screen and start. **Decisions:** begin, or learn how it works. **Layout (top → bottom):** brand mark / step context (none — first screen) → H1 → subline → 3 value beats (icon + one line) → secondary link + legal line → primary CTA pinned to safe area.

| State | Trigger | UI & behavior | User actions | Truth / retention |
| --- | --- | --- | --- | --- |
| Default | First run | H1 "Habits that fit your day." Sub: "Pick one habit, set when it happens, and get a quiet nudge on time. No clutter, no guilt." Beats: "One habit at a time — focus beats a list of ten." · "Your habit gets a place on your day, not just a checkbox." · "Gentle reminders — change or turn them off anytime." | `Get started` → S2; `How it works` → sheet | Static; `[assumption]` product promise `[truth owner: product]` |
| Sheet (education) | `How it works` | Non-blocking sheet: "1 Choose one habit · 2 Place it on your day · 3 Get a nudge and check in" with the arc motif; dismissible by close, scrim tap, or back | Close → focus returns to the link | Education never blocks experts |
| Loading | — | Not reachable: content is static. If remote config is added later, fall back to defaults silently and note it | — | — |
| Error | — | Not reachable: no server truth on this screen | — | — |
| Empty | — | Not reachable: there is nothing to be empty; the "empty" of this flow is Home with no habits (§4.6) | — | — |
| Success | Continue | Advance to S2; the arc's first bead appears briefly as the transition anchor | — | — |

Legal line: "By continuing, you agree to the [Terms] and [Privacy Policy]." `[truth owner: legal]`. Account link `[product decision]` only if accounts exist in v1; otherwise omit.

### 4.3 S2 — First habit

**Purpose:** collect exactly one thing — the habit name — plus an optional note. **Decisions:** what to make a habit. **Layout:** step label "Step 2 of 4" → H1 "What will you make a habit?" → field (label "Habit name", example placeholder "e.g. Drink a glass of water" — placeholder is never the label) → helper "You'll see this name every day. Keep it short." → optional note expander ("Add a note (optional)", helper "A few words to remember why.") → primary CTA pinned to safe area.

| State | Trigger | UI & behavior | User actions | Truth / retention |
| --- | --- | --- | --- | --- |
| Default | First entry | Empty field; CTA enabled (never a silent disabled dead end — §5.2) | Type; tap note expander | Draft autosaved on change §5.1 |
| Focus | Field tapped | Native keyboard, correct input mode; CTA and field stay above the keyboard; Return key = "Next" → same as Continue | Enter submits | IME/paste/autocomplete preserved `[ic-form-5]` |
| Empty | Continue with no name | Inline error "Name your habit first."; focus moves to field; announced | Correct and retry | Field value retained |
| Validation error | Name > 40 chars | "Keep it under 40 characters."; counter appears near the limit (34/40); focus moves to field | Shorten and retry | Value retained |
| Loading | Continue valid | CTA shows "Saving…" and is disabled; idempotent guard against double-tap; ≤ ~300ms locally `[provisional]` | none | Draft retained |
| Error | Save fails | Banner: "We couldn't save this habit yet. Your name is still here — try again." + `Try again` | Retry; back | Name and note fully retained — never cleared |
| Success | Save durable | Advance to S3; bead lock-in micro-motion on the arc preview | — | Saved habit is the source of truth for S3/S4 |

Note field: optional, ≤ 2 lines, not required — asking for only what the current goal needs `[ic-form-1]`.

### 4.4 S3 — Schedule + reminder

**Purpose:** place the habit on the day and arm (or decline) the nudge at the value moment. **Decisions:** time slot, exact time, reminder on/off. **Layout:** step label "Step 3 of 4" → H1 "When will it happen?" → Day Arc with three beads (Morning 7:00 / Midday 12:30 / Evening 18:00 — default times `[product decision]`, each editable via native time picker) → helper "Tap a time to change it." → "No reminder — I'll check in from the app" → primary CTA ("Set reminder" when a reminder is armed, "Continue" when not).

| State | Trigger | UI & behavior | User actions | Truth / retention |
| --- | --- | --- | --- | --- |
| Default | Arrival | Morning 7:00 preselected `[progressive default]`; bead states visible (selected = filled primary, others = surface + border); color never the only selected cue (weight + checkmark) | Select bead; open time picker; choose "No reminder" | Selection retained |
| Empty | "No reminder" selected | Reminder off by explicit choice — the only empty in this flow; helper clarifies the app still tracks check-ins | Continue | Choice retained |
| Pre-prompt | Continue with reminder on, first time only | In-app sheet: "Nudge you at 7:00?" / "We'll send one notification when it's time. Change or turn it off anytime in Settings." Actions: `Allow notifications` / `Not now`. The sheet is in-app and never imitates the OS dialog | Allow → OS dialog; Not now → reminder off | Answer remembered; never re-ask in this flow |
| Loading | OS dialog shown / save | OS dialog is authoritative; on return the app **reconciles the actual permission state** — never assumes the in-app result `[permission rule]` | — | Reconcile on every foreground |
| Success (granted) | OS grant | Status line under the arc: "Reminders on — we'll nudge you at 7:00." (icon + text, polite announcement) | Continue → S4 | Grant + slot saved |
| Error (denied) | OS denial | Inline note: "Reminders are off. You can still check in from the app." + `Turn on in Settings` (app settings; direct `Open Settings` when OS blocks in-app redirect) | Continue; settings recovery | Denial saved; slot still saved |
| Error (not now) | Pre-prompt declined | "No problem — check in from the app whenever you're ready." Less prominent than denied; no settings link | Continue | Reminder off; slot saved |
| Error (save) | Schedule save fails | "We couldn't save your schedule yet. Your choice is still here — try again." + `Try again` | Retry; back | Slot + reminder choice retained |
| Success | Continue | Advance to S4; the selected bead is the shared element that carries into S4 | — | Slot + permission state durable |

Permission policy: asked at the value moment, never at cold start; optional with a functional no-reminder path; recoverable from Settings; background/analytic permissions are out of scope for this flow.

### 4.5 S4 — Ready (success)

**Purpose:** make the commitment durable and visible, then hand off. **Decisions:** go to plan, or add another habit. **Layout:** H1 "It's in your day." → the Day Arc with the bead **locked**: habit name + "Morning · 7:00" → next-step line "First reminder tomorrow at 7:00. Check it off in the app and your streak starts with day one." → secondary `Add another habit` → primary `See my plan` pinned to safe area.

| State | Trigger | UI & behavior | User actions | Truth / retention |
| --- | --- | --- | --- | --- |
| Success | Arrival | Quiet lock-in: bead settles on the arc (250–350ms, reduced-motion: opacity only); optional light success haptic `[not unique meaning]`; no confetti | `See my plan` → Home; `Add another habit` → S2 (prefilled with nothing — fresh habit) | Habit + slot + reminder durable |
| Loading | Plan preview needs data (only if sync exists `[product decision]`) | Skeleton of the arc only; no text shift | none | Habit already saved |
| Error | Plan load fails after save | "Your habit is saved, but we couldn't load your plan." + `Try again` + `Go to my plan` | Retry; proceed anyway | Habit never lost; error never blocks the saved result |
| Empty | — | Not reachable: arrival requires a saved habit. If the store lost it, that is the Error row, not a blank screen | — | — |

### 4.6 Handoff — Home (bounded contract)

Home is out of pack scope; the contract at the boundary:

- **With a habit:** today's plan shows the habit at its time with the reminder state reflected. The arc motif may continue on Home for spatial continuity, decided in the Home pack.
- **Empty (only reachable via a future skip-onboarding path):** "No habits yet." + helper "Add your first habit and it will appear here." + primary `Add your first habit` → S2. Never a blank screen; never "looks fine" filler.

## 5. Flow-level contracts

### 5.1 Interruption, resume, and back

- Drafts (S2 name/note, S3 slot/reminder choice) autosave locally on change, keyed by the onboarding session; process death resumes at the last reached step with drafts restored.
- Back: S1 has no back on first run (system back exits the app as the platform defines); S2↔S1, S3↔S2, S4↔S3 back always returns one step with all input intact. Back never silently discards work.
- Reinstall/returning user: skip to Home; onboarding is never replayed. Version upgrades never force re-onboarding.

### 5.2 Form and recovery rules

- CTA is never a silent dead end: an empty submit produces a focused, announced inline error rather than a disabled button with no explanation `[ic-form-11]`.
- All validation is at the least disruptive truthful time: on submit (not per keystroke), except the near-limit counter `[ic-form-3]`.
- Errors state what failed, whether work was retained, and the next action — without color alone `[ic-form-4]`.
- Duplicate-submit protection: CTA disabled while pending; save is idempotent via draft id; the second tap is ignored.
- Long values: the 40-char cap is enforced with visible guidance; no clipped input, no lost carets `[ic-form-9]`.

### 5.3 Permission model

`value-explained (S1–S3) → requested (pre-prompt + OS dialog) → granted | denied | blocked | skipped`, reconciled on every foreground return. Inventory: one permission (notifications), purpose (nudge at habit time), optional, fallback (no-reminder path + Settings recovery). No other permissions are requested in onboarding.

### 5.4 Motion and haptics

- Screen transitions 250–350ms, ease-out; groups (title / arc / CTA) stagger ~80–100ms — never per-leaf.
- The bead placement (S3→S4 shared element) is the only emphasized motion: transform/opacity only, compositor-friendly, no layout animation `[ic-motion-5]`.
- Micro press feedback 80–120ms on controls; sheets 250–350ms; toasts float quietly.
- `prefers-reduced-motion`: bead placement becomes an instant opacity swap; travel and blur cut; state, hierarchy, and completion feedback preserved `[ic-motion-4]`.
- Haptics: optional light success on lock-in only; never the unique carrier of meaning; error states are visual + announced, not haptic.

### 5.5 Offline and network

Onboarding is **local-first** `[assumption]`: creating a habit and scheduling never require network. If sync/accounts are added in v1 `[product decision]`, saving becomes queued-and-synced with a visible status, and onboarding must never block on the network (§4.1 note).

## 6. Accessibility floors

Baseline implementation floor for this bounded flow — not formal conformance or certification `[specialist decision for VPAT]`.

| Boundary | Floor | Verification evidence |
| --- | --- | --- |
| Structure | Native screen headers; every field labeled (placeholder is never the label); step indicator exposed ("Step 2 of 4"); sheets are dialogs with labelled titles | Accessibility tree inspection per screen |
| Name/role/state | Accessible names match visible text; the Day Arc is a radio group (3 slots + "No reminder") with selected state; CTA exposes busy while saving; errors set `invalid`; status lines are polite live regions | Screen-reader smoke test; tree snapshots |
| Keyboard/focus | Complete path: tab order follows visual order; visible focus ring ≥ 3:1; sheet focuses on open and returns focus to its trigger on close; no traps; Enter submits; hardware keyboards (iPad/Android) fully supported | Keyboard walkthrough of the full flow |
| Perception | Body ≥ 4.5:1, large text and focus ≥ 3:1 on their surfaces; color never the sole carrier (selected = weight + checkmark, error = text + icon); decorative arc hidden from assistive tech; no emoji-as-icon | Contrast measurement; grayscale render |
| Reflow | Dynamic Type through largest accessibility size (iOS), 200% font scale (Android); no horizontal scroll; fields, banners, and status lines wrap and grow; safe areas (notch, home indicator, keyboard) respected; keyboard never covers the CTA | Text-scale stress renders on all matrix viewports |
| Dynamic feedback | Saving, errors, success, and permission results announced once, politely; no duplicate announcements on re-render | Live-region behavior check |
| Motion/sensory | Reduced motion preserves meaning; no flashing; no autoplay; haptics optional and never unique | Preference-mode render + timing inspection |
| Input parity | Touch targets ≥ 44×44pt with separation; gestures (back swipe) have button alternatives; VoiceOver/TalkBack and Switch Control reach every action; voice-control labels match visible names | Touch-target audit; switch + voice smoke test |

RTL: mirroring the arc (right-to-left day) is specified for any v1 RTL locale; if v1 ships LTR-only, that is an explicit evidence gap, not an assumption `[product decision]`.

## 7. Verification plan (how we verify it renders correctly)

Mode is Direction, so this is the plan an implementation pass must execute before claiming completion. No screenshot or mockup substitutes for these checks.

### 7.1 Render matrix

| Axis | Cells to inspect | Notes |
| --- | --- | --- |
| Viewport | 390×844 (iPhone 15), 375×667 (iPhone SE), 360×800 (Pixel 7) | Landscape/split: N/A — portrait-locked `[decision]`; record as skipped with reason |
| Content | Shortest ("Drink water"), typical ("Read 10 pages"), longest (40-char name), long locale (German if v1 localizes), RTL if supported | Longest name must wrap, not clip |
| State | Per §4: default, focus, empty-submit, validation, loading, save error, permission granted/denied/blocked/not-now, success, resume-after-kill | Every state row rendered and inspected, not just happy path |
| Input | Touch, hardware keyboard, VoiceOver/TalkBack, Switch Control, Voice Control | Declared input modes all exercised |
| Preference | Reduced motion, 200% text/Dynamic Type, dark mode (if v1 supports `[product decision]`) | Preference cells rendered, not assumed |
| Runtime | Cold launch, slow network/offline (only if sync added), background/foreground return, process kill | §5.1 resume contract |

Skipped cells must be recorded with an exact reason — "looks fine" is not a result.

### 7.2 Checkpoints per screen

1. **Hierarchy:** one headline, one decision, one primary action; value beats do not compete with the CTA; grayscale squint test passes.
2. **Geometry:** 4pt rhythm, concentric radii, safe areas, no overflow at any content length; CTA reachable with keyboard open.
3. **State truth:** empty, loading, error, success, permission, resume states visually distinct and semantically aligned; no generic blank states.
4. **Feedback:** motion explains placement only; input never blocked; reduced-motion path preserves meaning; no layout shift on save/load.
5. **A11y:** labels, focus, announcements, contrast, color independence, touch targets, text scaling per §6.
6. **Distinctiveness:** the Day Arc carries the flow; no generic cards/gradients/slogans.

### 7.3 Tests

- **Unit (state machine):** every transition in §4–§5 — default→loading→success, each error→retry, back, resume-after-kill, permission granted/denied/blocked/reconcile — with input-retention assertions.
- **Widget/UI tests:** each screen × each state row with realistic fixtures; assert copy, focus placement, live-region announcements, disabled-while-pending, idempotent double-tap.
- **Integration:** full first-run path; no-reminder path; permission-denied then enabled-in-Settings (reconciliation); process-death resume; returning-user route.
- **Accessibility in CI:** contrast checks, touch-target audit, accessibility-tree snapshot per screen, recorded screen-reader walkthrough, keyboard walkthrough.
- **Performance (provisional budgets, labeled):** cold launch → S1 interactive ≤ 1.5s iOS / ≤ 2.0s mid-tier Android; transitions steady 60fps on the low-end fixture; zero avoidable layout shift; onboarding assets < 200KB (line art + system fonts). Budgets require engineering confirmation before they become commitments.
- **Manual device matrix:** the three viewports above with real notification dialogs and Settings recovery.

### 7.4 Evidence record (to fill at implementation)

```text
Surface / revision:
Mode: Build
Environment and fixture:
Rendered route/commands:
Matrix cells inspected (with results):
Screenshots/recordings:
Static/test commands and exact results:
Keyboard/assistive/device checks:
Performance/resilience observations:
Failures found and corrections made:
Unavailable evidence and residual risk:
Delivery state: local | committed | PR | merged | released
```

### 7.5 Acceptance gates

- All §4 state rows rendered and checked; no silent dead ends; input never lost on error/resume.
- Permission optional, reversible, reconciled with the OS on foreground; no-reminder path fully functional.
- §6 floors pass on the matrix devices; reduced motion and text scaling verified, not assumed.
- Performance budgets met on the declared fixture or the gap is reported with measurements.
- Copy truth-owned (§4 tables); no invented claims; no generic styling per §3.5.

## 8. Open questions and truth owners

| Question | Owner | Impact on this pack |
| --- | --- | --- |
| App name and brand colors | Brand/product | Replace `[AppName]` and provisional token values |
| Accounts/sync in v1? | Product/backend | Adds S0 sync/offline states and S4 plan-load states |
| Notifications required or optional? (recommended: optional) | Product | Pack assumes optional — §4.4 |
| v1 languages, RTL support | Product/localization | §6 RTL note; matrix content cells |
| Dark mode in v1 | Product | Token table already defines both; confirmation gates §7.1 |
| Habit frequency beyond daily | Product | v1 is daily-only; future states out of scope |
| Default slot times (7:00 / 12:30 / 18:00) | Product | §4.4 default values |
| Minimum OS versions | Engineering | Provisional iOS 16+ / Android 13+ |
| Time zone / DST for "tomorrow at 7:00" | Engineering/product | First-reminder copy and S4 line |
| Support contact, Terms, Privacy | Legal/support | S0 `Get help`, S1 legal line |
| Performance budget approval | Engineering | §7.3 provisional budgets |

## 9. Delivery state

Direction only — no implementation, renders, or test evidence are claimed. The pack is ready for product review of the flagged decisions, then a Build pass that executes §7 before claiming completion.
