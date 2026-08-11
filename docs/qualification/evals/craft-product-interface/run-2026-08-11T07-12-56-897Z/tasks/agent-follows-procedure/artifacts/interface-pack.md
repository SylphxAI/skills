# Interface Pack — Habit-Tracking App Onboarding (Direction mode)

**Mode:** Direction (greenfield concept; no implementation performed, no render claimed)
**Surface:** Onboarding flow — from first launch to the first completed check-in
**Platform:** Mobile app (iOS + Android), touch-first, portrait compact baseline
**Product working title:** `[App]` — placeholder only; not a brand decision

---

## 1. Scope, user job, supplied truth, assumptions, non-goals

### Scope

The onboarding flow covers five screens and the transitions between them:

- **S1 Welcome** — problem → outcome → how it works → Start
- **S2 Choose habits** — pick 1–5 habits from a curated catalog (or add a custom one)
- **S3 Tune habit** — name, frequency, reminder time (one habit at a time when several were chosen)
- **S4 Reminder permission** — value-explained pre-prompt, then the OS prompt, then every resulting path
- **S5 Ready + first check-in** — summary, light the first day on the day strip, enter the app

### User and primary job

A new user who just installed the app. Primary job: **stand up a small set of habits they can actually start today, without being overwhelmed, and leave onboarding having already completed one real check-in.** Secondary job: understand what the product is for and what it will do with their data, well enough to trust it.

### Supplied truth (approved sources only)

- App name, category, and the habit/streak domain model come from the product brief; placeholder `[App]` until supplied.
- Catalog content (habit names, one-line "why it matters", suggested time cost) is product/content truth and must be supplied before build; no invented habits or statistics.
- Any proof claim on S1 (e.g., success statistics, testimonials) is marketing truth with an available source; if no source exists, the claim is omitted — no placeholder that implies a claim.

### Assumptions (labeled)

- Reminder notifications are the **only** permission in this flow (no contacts, health, location, or photo access).
- The habit catalog is fetched remotely with a cached offline copy; everything else in the flow is local-first.
- No account/sign-in is required during onboarding; habits are stored locally (cross-device sync is out of scope for this pack).
- The weakest supported device fixture is provisional (see Performance contract) until product/engineering ratifies the support matrix.
- Dark mode is a non-goal for v1; tokens are structured so it can be added without rework.

### Non-goals

- Sign-in, account creation, pricing, payments, social features, full habit management, settings screens.
- Teaching the whole app's information architecture; onboarding must not compensate for broken IA.
- Permission, privacy, or marketing policy decisions — the pack only presents approved truth.
- Formal accessibility certification (VPAT) — baseline floors only, per the skill boundary.

### Flow-level acceptance criteria (this pack's definition of done for the direction)

1. A first-time user can go from launch to a completed first check-in in ≤ 5 decisions (one per screen), with every screen carrying exactly one primary action.
2. Every screen the flow can actually enter has a named state model — default, empty, error, loading, disabled, success, interruption — plus flow-specific states (zero-result, offline, permission allowed/denied/deferred, draft recovery).
3. No step ever discards user input on error, interruption, or back-navigation; the draft survives app kill and resumes in place.
4. Every state, copy string, and behavior below is implementable from this pack without re-deriving the direction.

---

## 2. Direction

### Design thesis

> Onboarding trades screen count for the first completed day: a calm, one-decision-at-a-time walk from "I want a better habit" to a lit first check-in, where every screen teaches the **day strip** — the product's core mental model — instead of teaching the interface.

### Archetype

**Conversion clarity** (primary) with **friendly utility** as modifier. Source of trust: explicit value, honest consequence, one primary action per decision plane, and useful empty/recovery states — never fake urgency, shame, or hidden terms.

### Compact direction record

```text
User / job / surface:        New user; stand up a small set of habits and complete the first check-in
Primary archetype + modifier: Conversion clarity + friendly utility
Design thesis:               One decision per screen; teach the day strip, not the UI
Hierarchy and content order: Why it matters → what you'll do → your choices → consequence → one action
Density and layout grammar:  Sparse focus; content column max 480pt; bottom-anchored primary action;
                             top-left back; minimal step dots (S2–S4)
Color roles:                 Paper canvas; ink text; one leaf-green primary (actions/focus/success);
                             one ember accent (streak/current-day mark only); error red for status
Type roles:                  One family; display / section / body / label-meta (≤3 effective sizes);
                             tabular numerals for counts and day numbers
Spacing / radius / elevation: 4/8 scale; surface 16, inner control 12, pill only for small chips;
                             flat canvas + hairline borders, one soft shadow on overlays only
Interaction and motion rhythm: Press feedback 80–120ms; step transition = horizontal push 250–300ms
                             ease-out; first-check-in settle 400–500ms once; no per-leaf stagger
One signature move:          The day strip — a 7-slot strip that fills left to right; onboarding ends
                             by lighting slot 1 (today) on the user's first habit
Anti-patterns:               Feature tour, fake progress, cold-start permission, preselected habits,
                             shame/fake urgency, competing CTAs, AI-generic palette, confetti per step
Existing-system constraints: iOS HIG and Android Material conventions as platform baselines;
                             no established product grammar exists yet (greenfield)
```

### Rationale map — why each direction choice improves a named outcome

| Choice | Improves | How |
| --- | --- | --- |
| One decision per screen, one primary action | **Comprehension / task completion** | A single decision plane removes choice conflict; the user always knows the next step and its consequence. |
| Day strip as the recurring motif | **Comprehension / identity** | The strip is the product's model of consistency (a sequence of small completions). Learning it once in onboarding makes every later habit row instantly readable, and it gives the app a distinctive, subject-shaped visual language. |
| Sparse focus, paper-and-ink palette | **Trust / comprehension** | Calm surfaces and restrained color signal a low-stakes, honest tool for daily life; hierarchy comes from scale, weight, and order, not decoration. |
| Explicit value + honest consequence copy | **Trust** | Every primary action states what happens next ("Turn on reminders", "Mark today's check-in"); no hidden terms, no fake proof. |
| Bottom-anchored primary, micro press feedback | **Task completion / feedback** | Primary action sits in the thumb zone; 80–120ms press feedback confirms intent without delaying input. |
| Draft saved at every step, resume in place | **Trust / task completion** | Interruption is normal on phones; the flow never punishes it, and never erases entered values. |
| Rare first-check-in settle + one haptic | **Feedback / identity** | The only expressive moment in onboarding is the durable outcome (day 1 lit), so it stays meaningful; routine steps stay quiet. |
| Stable skeletons, reserved geometry | **Performance / trust** | No layout shift or flash between loading and content; waiting states look like the final screen. |
| Skip/defer for reminders and permission | **Trust / task completion** | Permission is asked at its value moment with a working fallback (in-app check-in), and declining never blocks the flow. |

### Visual system roles

- **Canvas** — warm paper (`#FAF8F4`-family neutral; exact token at build, measured against contrast floors). Flat; no gradients.
- **Surface** — white/warm-white panels with hairline borders; radius 16 outer.
- **Text** — ink (primary) and muted ink (secondary labels only, never primary instructions); muted still meets 4.5:1 on its surface.
- **Primary action / focus / success** — one leaf-green. White text on green must measure ≥ 4.5:1. Used for the primary button, focus ring, checked day strips, and success status only.
- **Accent (ember)** — current-day mark and streak count only; never competes with the primary action.
- **Error** — status-only red; always paired with text/icon (never color alone).
- **Divider** — translucent ink at low opacity so light/dark stay consistent.

### Type, spacing, layout

- One type family; ≤ 3 effective sizes on any screen: display (28–32, weight 600), body (16, weight 400, leading 1.5), label/meta (13, weight 500). Section titles 20/600.
- **Tabular numerals** for the selected-habit count, day numbers, and streak values (no digit reflow).
- 4/8 spacing scale; screen padding 24; 16 between decision groups; no ad-hoc values.
- Concentric radius: surface 16 → control 12 → chips pill (small chips only). Never identical radius on parent and padded child.
- Elevation: one system — flat canvas, hairline borders, one soft shadow on overlays only. No glass, no stacked shadows.
- Layout: content column ≤ 480pt, centered on larger screens; primary action bottom-anchored and never hidden by keyboard, safe areas, or the home indicator.

### Motion rhythm

- Micro (80–120ms): press feedback at the control.
- Step transitions (250–300ms, ease-out): horizontal push that preserves spatial continuity of the sequence; interruptible, never blocks input.
- First-check-in (400–500ms): single settle of the day-strip slot + one light haptic — the rare reward, used exactly once in this flow.
- Reduced motion: opacity-only (≤ 150ms) or instant swap; state, hierarchy, and completion feedback preserved.
- Animate transform/opacity only; no layout-triggering animation, no font/icon swaps that shift geometry.

### Anti-patterns (rejected explicitly)

- Feature tour ("Learn about streaks!") — onboarding teaches the model, not the chrome.
- Fake progress (8 steps labeled "3 of 3"), decorative step dots that lie.
- Notification permission at cold start before value is shown; preselected habits; required sign-in.
- Shame or coercion ("Don't break your streak!"), fake urgency ("Only 3 habits today!"), hidden consequences.
- Competing CTAs on one plane (Start + Sign in + Pricing).
- AI-generic tells: purple gradients, emoji-as-icons, glass stacks, confetti on every step, slogan hero that fits any product.
- Card-everything layout; identical parent/child radius; motion without meaning.
- Collapsing "no data", "no result", permission denial, offline, and server failure into one blank state.

---

## 3. Screens and state contract

Every screen below lists all states it can actually enter. States marked **n/a** are not reachable and are labeled with the reason. Transitions are truthful: optimistic UI never claims durable success, and no transition erases input.

### Flow map

```text
launch → S1 Welcome ──► S2 Choose habits ──► S3 Tune habit ──► S4 Reminder permission ──► S5 Ready + first check-in ──► Main
           ▲                │  ▲                │  ▲                 │  ▲                    │
           └── resume ──────┘  └── draft ───────┘  └── draft ───────┘  └── draft ────────────┘
              (interruption / kill resumes in place; back never discards work)
```

### S1 Welcome

Purpose: establish the problem, the concrete outcome, how it works, and one action.

| State | Behavior | Acceptance |
| --- | --- | --- |
| Default | Hero mark, headline, 2–3 line "how it works", one primary "Start"; secondary "How reminders work" expander (supplied truth only) | Hierarchy test: the primary action is the only strong element on the decision plane |
| Loading | Cold-start bootstrap (local config/remote config): stable skeleton of hero + Start disabled with reason | Skeleton geometry matches final layout; no layout shift |
| Empty | n/a — no user data on S1 | — |
| Error | Bootstrap failed: inline message + "Retry"; Start stays disabled with reason | Retry restores default; no dead end |
| Disabled | Start disabled while bootstrap pending or after terminal error, with nearby accessible text stating why | `ic-form-11`: disabled control explains the unmet requirement |
| Success | Draft "onboarding started" created; transition to S2 | Advance only after draft write succeeds |
| Interruption | Backgrounding/kill during bootstrap: resume at S1 with no data loss; stale remote config reconciled silently on return | Resume never re-runs the permission or loses state |

### S2 Choose habits

Purpose: select 1–5 habits from a curated catalog or add a custom one.

| State | Behavior | Acceptance |
| --- | --- | --- |
| Default | Catalog list (checkbox rows: name, one-line "why", suggested time), "Add your own" entry, selected count in meta, primary "Continue (n)" | Primary shows the exact consequence ("Continue (2)"); selection is a toggle, never a counter that can double-add |
| Empty | Catalog returned zero items: explicit empty state — "Add your own" as primary, "Try again" secondary | Empty ≠ zero-result ≠ error; each has distinct copy and action |
| Zero result | Search (optional in scope) matched nothing: query preserved, "Add your own" CTA, "Clear search" | Query retained; user can recover without retyping |
| Loading | Catalog fetch: stable skeleton list (shape = final rows); Continue disabled; Back remains active | No shimmer-dependent geometry; cancel-safe |
| Error | Fetch failed: distinguish offline (cached copy shown, "Offline copy" note) vs server failure ("Try again"); selection retained | Retry is idempotent; offline fallback never hides that data may be stale |
| Disabled | Continue disabled with 0 selected — nearby text: "Choose at least one habit"; disabled while submitting | Reason is accessible text, not a silent dead end |
| Success | Selection persisted to draft; advance to S3 | Draft write completes before advance |
| Interruption | Backgrounding/kill: resume at S2 with selection intact | Resume test: kill app mid-selection, relaunch, selection present |
| Limit reached (additional) | 5 selected: 6th attempt blocked with explanation and replace affordance | No silent truncation of selection |

### S3 Tune habit

Purpose: name, frequency, reminder time for one habit (step dots show position among selected habits).

| State | Behavior | Acceptance |
| --- | --- | --- |
| Default | Name prefilled from catalog (editable), frequency Daily by default, "Custom days" optional (day chips), reminder Off by default, time picker only when reminder On | No permission asked here; reminder defaults off — value moment comes at S4 |
| Empty | Name cleared: inline "Add a name" on blur/submit; Continue disabled with reason | Placeholder is never the label; error is associated with the field |
| Error | Validation: empty name, name > 40 chars, reminder On without a time; save failure → retry with all values retained | Focus moves to first invalid field; every valid value retained |
| Loading | Draft save (local, fast): Continue disabled, "Saving…" | Save is local-first; remote sync never blocks |
| Disabled | Continue while invalid or saving; day chips disabled when Custom days is Off, with accessible reason | Disabled controls explain why |
| Success | Draft saved; advance to next habit or to S4 | Per-habit drafts all retained |
| Interruption | Keyboard dismissal, backgrounding, kill: resume on the same screen with the same field focus and values | No input lost; resume test per step |
| Step navigation (additional) | Back goes to previous habit with its values retained; step dots reflect completed habits only | Back never discards work; dots never claim more progress than exists |

### S4 Reminder permission

Purpose: value-explained pre-prompt, then the OS prompt, then every resulting path — with a working fallback so declining never blocks the flow.

| State | Behavior | Acceptance |
| --- | --- | --- |
| Default | Explanation of what reminders do and what data is used; primary "Turn on reminders"; honest secondary "Skip for now" | Pre-prompt does not imitate the OS dialog; no claim of a grant before the OS returns |
| Loading | Awaiting OS prompt result: primary disabled, status "Waiting for system…" | No duplicate prompt; cancel-safe |
| Empty | n/a — no user data on S4 | — |
| Error | OS prompt unavailable/failed: explain + "Continue without reminders" | Never fabricate a denial; error ≠ user choice |
| Disabled | Primary disabled while prompt pending, with reason | State exposed via accessibility tree |
| Success (allowed) | Status "Reminders on" + "Continue" | Status announced; advance enabled |
| Success (denied) | Status "Reminders off — you can turn them on later in Settings" + "Continue"; primary becomes "Enable in Settings" (settings recovery) | No nagging, no shame, no fake prompt loop; settings deep-link only when retrying in context is no longer authoritative |
| Success (skipped) | "Reminders off — you can change this anytime in Settings" + "Continue" | Skip is a first-class, dignified path |
| Interruption | App switched away during OS prompt: on return, reconcile the **actual** OS state (never assume the last in-app result); continue | External permission changes are detected, not assumed |

Permission inventory (supplied to engineering): notifications → optional enhancement for reminders; fallback = in-app check-in; settings path = OS notification settings; privacy owner = product. Copy must match canonical collection/retention/control behavior.

### S5 Ready + first check-in

Purpose: summary of chosen habits, complete the first real check-in, light the first day, enter the app.

| State | Behavior | Acceptance |
| --- | --- | --- |
| Default | "You're set"; habit list with day strips (all empty, today's slot marked with ember); primary "Mark today's check-in"; secondary "Add more habits" (back to S2) | The strip is explained in one line: "Each slot is a day. Light today's." |
| Empty | Guard: zero habits (only reachable via data loss) — explain + "Choose habits" primary | A success screen can never render empty; this is not a generic blank |
| Error | Final persistence failed: "Retry"; all values retained | Retry idempotent; no partial success shown as durable |
| Loading | Finalizing local store: primary disabled, "Saving…", stable geometry | No layout shift; no double submit possible |
| Disabled | Primary while saving; after first check-in, primary becomes "Enter app" | One decision changes at a time; duplicate taps impossible |
| Success | First check-in completed: day-strip slot 1 lights (400–500ms settle + one haptic), status "Day 1 starts now", primary → "Enter app" | The only expressive celebration in onboarding; idempotent (second tap: "Already checked in") |
| Interruption | Killed after check-in before entering: resume at S5 with the real check-in state, no double check-in | Reconcile from stored truth, never from memory |
| Offline (additional) | Local-first: check-in records locally; sync status ambient (non-blocking) if sync is later added | Offline never blocks the check-in |

### Flow-level states (all screens)

- **Draft recovery** — every entered/selected value is persisted at each step; resume-in-place after kill, app switch, or back.
- **Duplicate-submit protection** — primary disabled during submit; all submit/check-in actions idempotent.
- **Back behavior** — platform back (Android) and visible top-left back never discard work; matches platform expectations.
- **Offline** — catalog uses cached copy with an honest "Offline copy" note; everything else local-first.

---

## 4. Adaptation and input contract

Declared surface: portrait compact (390×844 primary), small compact stress (320×568), medium (tablet portrait ~768×1024), wide/landscape (≥1024). RTL and longest supported locale are in scope; dark mode is out of scope (tokens structured for it).

| Axis | Required response |
| --- | --- |
| Content | Reorder by task, never shrink: on medium/wide, content column stays ≤ 480pt centered; no stretched rows |
| Actions | Primary stays bottom-anchored and near its decision on all postures; never under keyboard, notch, or home indicator |
| Text/locale | 200% text scaling and longest-locale strings reflow without clipping, truncation of meaning, or horizontal scroll; no fixed-height text containers |
| RTL | UI mirrors (step dots, layout); day-strip time direction documented and verified in the RTL stress render |
| Virtual keyboard | Focused field and its error scroll into view; submit remains reachable; entered data preserved |
| Safe areas | Notch/rounded corners/status bar/home indicator respected on both platforms; critical controls never behind system gestures |

Input parity: touch is primary; every action has a keyboard/switch-access and screen-reader route; hover carries no unique information; correct input types (text for name, time picker for reminder); Enter submits single-line forms; platform back always works; gestures (if any) have visible affordances and non-gesture alternatives.

---

## 5. Accessibility floors

Baseline floors only — not formal conformance or certification.

### Contrast

- Body text ≥ 4.5:1 on its surface; large text (≥18pt, or ≥14pt bold) ≥ 3:1; UI component boundaries and focus indicators ≥ 3:1 against adjacent colors.
- Muted text only for secondary labels, never primary instructions; when a surface color changes, its foreground changes with it.
- Status is never color-only: error/success always carry icon + text.

### Touch targets

- All interactive targets ≥ 44×44 CSS px (48dp where the platform recommends), with ≥ 8px separation to prevent slips.
- Primary action in the lower thumb zone, out of safe-area insets; destructive-adjacent controls (e.g., remove habit) need explicit confirmation or a larger separation, not a small X.

### Labels

- Every control's accessible name matches its visible label; placeholder is never a label.
- Helper text and errors are programmatically associated with their field; errors state what failed, whether work was retained, and the next valid action — without relying on color.
- One `h1`-equivalent heading per screen; status changes (saving, error, success, permission result) announced via polite live regions without repetitive announcements.
- On submit error, focus moves to the first invalid field; on screen change, focus moves deliberately (screen-reader navigation to the new screen title).

### Keyboard / assistive technology

- Complete focus path with visible focus (≥ 3:1 ring, 2px offset); focus order follows visual and task order; no traps.
- Overlay/OS-prompt entry and return is deliberate: OS dialogs keep native semantics; returning restores focus to a meaningful origin.
- Full touch-navigation path works with VoiceOver and TalkBack; hardware/bluetooth keyboard and switch access can complete the critical task (choose habits → Continue; mark first check-in).
- Reduced motion: non-essential movement removed; opacity/instant swap preserves state, hierarchy, and completion feedback.
- Haptics/audio never carry unique meaning; animations never block input; 200% text scaling stays operable.

---

## 6. Performance and recovery contract

- First useful path free of non-essential SDK, font, media, and analytics blocking; catalog is the only network dependency and renders a stable skeleton.
- Reserved geometry for skeletons and async regions; no avoidable layout shift; no event storms or duplicate requests; icons vector or lightweight.
- Degrade fidelity, not truth: under slow networks reduce nothing below state clarity and input feedback.
- **Provisional fixture (assumption to ratify):** entry iPhone (SE-class) + 4-year-old mid-range Android, slow-3G network profile, cold and warm start, background/foreground return. Provisional budgets: cold start to interactive < 2.5s on fixture; input latency < 100ms; no long task > 200ms during step transitions. These are risk-exposing fixtures, not approved product budgets.
- Recovery: drafts at every step; resume-in-place; idempotent retries and check-ins; permission reconciled from OS truth; success confirms durable outcomes instead of disappearing.

---

## 7. Rendered verification evidence (defined contract)

Direction mode: nothing below has been executed. This section is the **evidence plan and acceptance contract** the Build mode must satisfy. Evidence classes are reported separately; a green test suite never closes visual, device, or assistive acceptance by itself.

### 7.1 Screenshot matrix (rendered product states, not mockups)

Capture and inspect each reachable cell. Skipped cells require an exact non-applicability or gap reason.

| Axis | Cells |
| --- | --- |
| Viewport | 390×844 (primary), 320×568 (small stress), 768×1024 (tablet portrait), 1024×768 landscape, 390×844 at 200% text scale |
| Screen × state | S1: default, loading, error; S2: default, empty, zero-result, loading, error, offline, limit-reached, disabled-Continue; S3: default, empty-name error, validation error, loading, disabled; S4: default, loading, allowed, denied, skipped, error; S5: default, error, loading, success (strip lit), empty guard, interruption-resume |
| Content | Shortest, typical, longest supported locale, dense (5 habits) |
| Preference | Default, reduced motion (still frames of key transitions), light mode only |
| Runtime | Cold start, slow network (catalog), background/foreground resume, offline |

### 7.2 Device checks

| Check | Coverage |
| --- | --- |
| Devices | iOS: entry iPhone + current iPhone; Android: entry-class + current Pixel-class; one tablet per platform; notched device for safe-area proof |
| Assistive tech | VoiceOver and TalkBack smoke of the critical task; accessibility-tree inspection of names/roles/states per screen |
| Input | Hardware keyboard and switch access complete the critical task; touch target audit (≥44px, ≥8px separation) |
| Orientation / scaling | Portrait and landscape on tablet; 200% text scaling without horizontal scroll; RTL render of S2–S5 |
| Motion | Reduced-motion renders preserve state/hierarchy/completion; transition timing measured (80–300ms steps, 400–500ms first-check-in settle) |

### 7.3 Tests

- **State-machine tests**: per-screen transitions; validation timing; duplicate-submit guard; idempotent check-in; draft recovery after kill at each step; permission reconcile on return; back never discards work.
- **Accessibility tests**: accessibility-tree assertions (names, roles, expanded/invalid/busy states, headings); live-region announcement checks; focus-order walkthrough on the critical task; reduced-motion branch tests.
- **Contrast**: measured per token pair against the floors in §5.
- **Visual regression**: golden screenshots over the matrix in 7.1.
- **Performance**: cold/warm start, catalog slow-network fetch, input latency, layout stability, repeated navigation (leak/stale-state check) on the provisional fixture.

### 7.4 Acceptance checks for the declared flow

| ID | Check | Pass criterion | Evidence class |
| --- | --- | --- | --- |
| AC-1 | Complete flow | Launch → first check-in in ≤ 5 decisions; one primary action per plane | Device walkthrough + video |
| AC-2 | State coverage | Every state in §3 rendered and distinct; empty ≠ zero-result ≠ offline ≠ error | Screenshots 7.1 |
| AC-3 | Input retention | Error, interruption, and kill at any step retain every value; resume in place | State-machine tests + resume video |
| AC-4 | Duplicate safety | Double-tap on Continue/check-in produces one effect; "Already checked in" on repeat | Component test |
| AC-5 | Permission truth | Allowed/denied/skipped/deferred all continue with working fallback; denial shows settings recovery, no nag | Screenshots + permission reconcile test |
| AC-6 | First-check-in reward | Strip lights once, haptic once, "Day 1 starts now" announced; reduced-motion path preserves the same meaning | Screenshots + reduced-motion render + announcement check |
| AC-7 | Contrast | §5 floors measured on every token pair | Contrast report |
| AC-8 | Touch | Every target ≥44×44, ≥8px separation; primary in thumb zone, clear of insets | Touch audit |
| AC-9 | Labels/AT | Accessible names == visible labels; placeholder never a label; errors associated; live regions announce state changes once | Accessibility-tree + screen-reader smoke |
| AC-10 | Keyboard/focus | Critical task completes by keyboard and switch access; visible focus throughout; no traps | Keyboard walkthrough |
| AC-11 | Text scaling/RTL | 200% scaling and longest locale: no clipping, no horizontal scroll; RTL day-strip direction documented and correct | Stress renders |
| AC-12 | Performance | Provisional fixture budgets met or exceeded risk recorded (cold start, input latency, no layout shift) | Profile logs |

### 7.5 Evidence record (template filled at Build time)

```text
Surface / revision:          Onboarding S1–S5 / <commit>
Mode:                        Build (this pack is Direction)
Environment and fixture:     <devices, OS versions, network profile>
Rendered route/story:        <exact command or story path>
Matrix cells inspected:      <list from 7.1>
Screenshots / recordings:    <paths>
Static/test commands:        <exact commands and results>
Keyboard/assistive/device:   <checks from 7.2>
Performance observations:    <fixture values vs 7.3 budgets>
Failures found/corrected:    <list>
Unavailable evidence:        <exact gaps, e.g., no tablet, no RTL content>
Delivery state:              local | committed | PR | merged | released | deployed | live-verified
```

---

## 8. Implementation acceptance criteria and unresolved evidence

### Implementation acceptance criteria (when Build is requested)

- All five screens exist with the §3 state model; every reachable state renders distinctly and semantically aligned.
- Tokens (canvas, surface, ink, muted, divider, primary, accent, focus, error) are used throughout; no raw hex or ad-hoc spacing inside the flow.
- Draft persistence, resume-in-place, duplicate-submit guards, and permission reconciliation are implemented and tested.
- The day strip and first-check-in settle match §2 motion rhythm, including the reduced-motion path.
- Accessibility floors §5 are implemented and evidenced per §7; any gap is reported as a gap, not closed by assumption.

### Unresolved evidence (must be supplied before or during Build)

- Catalog content and S1 proof claims: owned by product/content truth; placeholders `[App]`, `[why it matters]` block publication of those strings.
- Notification permission behavior per OS version: verify against current platform behavior at execution (prompt states, limited/deferred paths).
- Weakest-device fixture and performance budgets: provisional in §6 until product/engineering ratifies the support matrix.
- Dark mode, sign-in, and cross-device sync: out of scope; any later scope change re-opens this pack's adaptation and state contracts.
- Formal accessibility certification: not claimed by this pack; only baseline floors are defined.
