# Foothold — Mobile Habit-Tracking App Blueprint

> Working title **Foothold** (changeable; does not affect contracts).
> Blueprint-only artifact: this document specifies targets, contracts, evidence, and
> handoffs. It does not claim implementation, delivery, or live availability.

## 0. Artifact identity and evidence ledger

```text
schemaVersion:    1
artifactId:       app-blueprint.foothold
productId:        foothold
artifactKind:     app-design-blueprint
ownerSkill:       design-product (references/app/METHOD.md)
artifactVersion:  1.0.0
artifactRevision: 1
artifactState:    draft
inputArtifacts:   design-product SKILL.md (given); references/app/METHOD.md,
                  references/app-thesis-and-experience.md, app-system-portfolio.md,
                  app-quality-and-reach.md, app-validation-and-automation.md (given;
                  installed catalog copy read in full; no digest — inputs not sealed)
proofState:       design-validated target, unbuilt
```

Evidence labels used throughout: `given` = supplied constraint or skill text;
`observed` = public mechanism-level observation (reachability recorded 2026-07-11 in
the skill references; re-verify before release); `decision` = chosen action under
constraints; `hypothesis` = falsifiable relationship; `assumed` = necessary but
unverified input with owner.

---

## 1. Frame

### 1.1 Promise

> For an adult (18+) who repeatedly starts habits and drops them on the first bad
> day, **Foothold helps them keep a habit alive on its worst days — through a
> floor small enough to always do** — with first value evidenced by their first
> floor check-in within the first session, and durable value evidenced by their
> first **honest kept-week (7 consecutive kept days)** within 30 days.

- **Wedge:** honesty-first continuity. The product survives a bad day by design
  (tiny floors, honest misses, no streak freezes, no rewritten history), not by
  punishment, grace, or gamified pressure.
- **Falsifiable:** if a validated cohort does not reach first-floor check-in at
  ≥80% of installs in the first session, or first kept-week in ≤30 days for ≥40%
  of retained users, the promise (or its mechanism) is failing. (`hypothesis`,
  owner: product analytics)

### 1.2 Users, triggers, context

| Item | Definition |
| --- | --- |
| Primary user | Adult 18–45 with 1–3 target habits (fitness, reading, writing, language, health routines); has attempted habit apps before; drops at first miss or relapse. Non-primary: quantified-self power users, social-accountability seekers, children. |
| Trigger | A remembered intention with no reliable system; the moment of choosing "do it or not" at a low-energy moment; the morning/evening routine boundary. |
| Context | Mobile phone, often offline (commute, gym, travel), one hand, ≤60 seconds of attention, low motivation on bad days. |
| Frequency | Daily for most habits (the natural cadence); weekly for low-frequency habits. App returns on scheduled habit days, not on an arbitrary daily-open metric. |
| Desired outcome | A habit still alive after bad days; honest record the user trusts; voluntary return. |
| Current alternative | Pen-and-paper lists, calendar reminders, generic check-off apps (Streaks, Habitica, Loop, Fabulous), or nothing. Switching friction: low — data is fresh; no lock-in. |
| Economic buyer | The user; v1 is free (see monetization disposition). |
| Lead platform | iOS + Android native mobile, offline-first. Minimum device: mid-range 2019-class Android (4 GB RAM) and iPhone SE 2-class. Locale: English v1; i18n contracts built in. |
| Data entrusted | Habit definitions, daily check-in history, streaks, settings — the user's honest self-record. Sensitivity: high (reveals goals and failures). |

### 1.3 Surfaces

- **Mobile (iOS, Android)** — the complete product (`integrate-now`). One semantic
  model, two platform ports with native input, lifecycle, storage, and notification
  behavior (no stretched shared layout).
- **Tablet** — same semantic model, adaptive layout (`integrate-now`, adaptive
  quality floor).
- **HTML5/PWA, desktop, wearables, watch** — not v1; `contract-ready` extension
  boundaries with zero runtime (see §6). Rationale: the promise is an in-the-moment
  mobile interaction; other surfaces add reach later without teaching a second model.

### 1.4 Non-goals

- No social features, friends, groups, leaderboards, or public sharing — habit data
  is sensitive and external accountability is a different promise (§6).
- No gamification: no points, coins, XP, levels, badges, or reward currency — a
  second mental model that teaches a different motivation than the floor.
- No streak freezes, streak repair, or purchased/sentimental streak continuity —
  honesty is the product.
- No AI coach, chatbot, or adaptive personalization model in v1 (a second system;
  `contract-ready` boundary only).
- No complex scheduling engine (multi-week recurrence, per-day reminder schedules,
  arbitrary calendars) — deliberate configuration sacrifice (§2.4).
- No monetization, ads, or data selling in v1 — zero-cost boundary (§6).
- No child mode / family accounts in v1 (13+ only); no fitness-wearable or health-app
  integrations in v1.
- No hostage mechanics: no account required for value, no streak-loss guilt replay,
  no data lock-in; export and deletion are first-class.

### 1.5 Success criteria (six dimensions)

| Dimension | Success contract | Primary signal | Countermetrics |
| --- | --- | --- | --- |
| User outcome | Bad days stop ending the habit; user reports the app "survives" their worst days | First kept-week ≤30 days for ≥40% of retained cohort; kept-day rate ≥60% in week 4 | Rework/undo rate; habit abandonment within 14 days |
| Experience | First floor check-in in the first session with no account/permission toll | ≥80% of installs reach first check-in in session 1; median time-to-first-check-in ≤2 min | Onboarding abandonment; permission denial; support "confused" tickets |
| Retention | Voluntary return on scheduled habit days, not notification pressure | 30-day cadence return ≥35% of activated users; reason-for-return survey | Notification-dependent opens share; uninstall after reminder fatigue |
| Commercial | Zero-cost v1; no payment surface | No ads, no tracking revenue, no entitlement SDK in runtime (dormant-state proof) | N/A v1 (monetization `contract-ready`) |
| Trust | User can always see the truth: no rewritten history, no freeze, easy export/delete | Export success ≥95%; delete/closure completes within SLA; 0 "history was changed" reports | Privacy complaints; delete-blocked support tickets; distrust feedback |
| Operability | Sync converges without loss; day boundaries correct across timezones | 0 data-loss incidents in canary; sync convergence ≤5 s after network restore | Conflict anomalies; timezone rollover bugs; crash rate |

---

## 2. Stance — ONE deep core concept: the Floor

### 2.1 Concept

**Every habit is defined by a floor — the smallest complete version of the habit
that counts as a kept day — and optionally a stretch, the fuller version. A day is
kept when the floor is met; history is never rewritten; streaks are derived honestly
from kept days and simply restart after a miss.**

- **Simple:** one user-facing idea — "what is the smallest thing that still counts?"
  One primary path: see today's floor, do it, check it.
- **Integrated:** every screen deepens the same concept. Reminders protect the floor.
  Planning sets floors. Reflection adjusts floors. Statistics measure floor-kept days
  and honest streaks. Templates are pre-set floors. Recovery is "run the floor now."
  There is no second product inside the product.
- **Deep:** the material states are resolved — floor vs stretch vs skipped-by-choice
  vs missed-silently; end-of-day rollover; timezone anchoring; undo; recovery;
  floor editing without rewriting history; streak restart semantics.
- **Strong:** day-state truth is the engineering spine (Correctness/Reliability), and
  the whole app is built to its production shape from the first slice, not a toy shell.
- **Extensible without proliferation:** growth is new depth on the floor — habit
  templates from floors, recurrence as a floor schedule, "suggest a floor" from
  history — never a new concept per release. Obsolete concepts are hard-cut, not
  layered.

**Rejected half-concepts (why):** streaks as the core concept (a derived measure, not
a mechanism — optimizing it creates freeze/punishment dynamics); reminders as the
core (a delivery channel, not value); analytics as the core (a dashboard is not a
behavior change); AI coaching (a second system with its own trust surface).

### 2.2 Why it wins the promise

A habit dies at the moment "the full version is too much today." A floor makes the
worst-day version the *defined* requirement, so the bad day is the designed-for day,
not the exception. Streaks and statistics become honest side effects, which is what
makes the record trustworthy — and trust is the retention engine, not notifications
or guilt.

### 2.3 Mechanism benchmark (synthesis; `observed`, re-verify before release)

| Comparator | Observed mechanism | Value | Tradeoff / harmed cohort | Transfer hypothesis |
| --- | --- | --- | --- | --- |
| Streaks (iOS) | Minimal list + streak identity | Beautiful simplicity, low setup | Streak as identity → freeze/guilt; no recovery path | Adopt list simplicity and calm feedback; reject freeze |
| Loop Habit Tracker | Local-first, config-flexible tracking + charts | Deep configurability, privacy | Setup burden; sparse emotional feedback; all-or-nothing defaults | Adopt local-first privacy; reject flexibility-first (see sacrifice) |
| Habitica | Gamified RPG with HP-loss punishment | Novelty engagement | Second mental model; punishment teaches avoidance | Reject gamification wholesale |
| Fabulous | Guided ritual sessions | Emotional care, structure | Content-heavy setup; expensive; reduces user authorship | Adopt emotional care in copy/feedback; reject guided content library |
| Duolingo (adjacent) | Streak + streak-freeze mechanics | First-party evidence streak changes moved metrics | Freeze breaks honest continuity; anxiety | Streak as honest derived metric; freeze is not-applicable by design |

Synthesis: winners each do one loop deeply. Foothold's loop is "floor → keep → adjust,"
combining Loop's privacy and data honesty, Streaks' simplicity, Fabulous' care — with
an honest recovery path none of them provide.

### 2.4 Quality attributes strengthened / sacrificed (with rollback conditions)

**Strengthened 1 — Correctness/Reliability of day-state truth.** One state authority
(append-only check-in event log), timezone-anchored day keys, idempotent sync, no
history rewrite, streaks always recomputable from the log. Cost: a real sync engine
and timezone model in v1.
- *Rollback condition:* if, in the first 90 days after canary, data-loss or
  "my check-in disappeared" reports exceed 0.1% of synced accounts/month, or sync
  convergence fails its envelope twice in a week, revert to **single-device
  authority** (device is sole truth; account provides encrypted backup only, no
  multi-device merge) until the merge model is re-proven. This sacrifices
  multi-device editing, not honesty.

**Strengthened 2 — Simplicity (cognitive load).** Three tabs max, one concept, one
primary path; default states are calm and legible.
- *Rollback condition:* if comprehension (first-check-in success, task-completion
  without help) falls below 80% in usability validation, the simplification has gone
  too far; restore guided context (not new concepts) and re-validate before further
  launch.

**Sacrificed — Configuration flexibility.** No recurrence engine, no per-day
reminder schedules, no custom metric types, no multi-habit bundling in v1. This is a
deliberate trade: flexibility is the top churn cause in Loop-style apps (setup burden)
and it erodes the single-concept model and day-state correctness (more ways to express
a day = more ways to get it wrong).
- *Rollback condition (measured, additive):* if ≥15% of users retained 90 days request
  a constrained set — recurring weekday patterns ("3×/week"), reminder windows, or
  weekly habits — add **recurrence as a schedule on the floor model** (a day pattern,
  not a new object): same event log, same kept-day semantics. If demand is instead for
  custom metrics or bundling, treat it as evidence the concept is unclear — investigate
  before adding surface. No expansion without the demand threshold and a re-validated
  comprehension gate.

---

## 3. Jobs, IA, objects, tenancy

### 3.1 Jobs → workflows

| Job | Workflow | First value |
| --- | --- | --- |
| Start something without setup pain | Cold start → pick template or create → set floor → first check-in | ≤2 min, no account |
| Keep it alive today | Today queue → floor/stretch/skip → honest state | One tap |
| Survive a missed day | Miss rollover → recovery banner → run today's floor | Cascade prevention |
| Understand and grow | Reflect: kept vs missed, streak, floor adjust | Weekly digest |
| Come back after a gap | Comeback state restore → today's floors pre-staged | Continuity, no guilt |
| Own the data | Export, delete, account closure | ≤1 min, full purge |

### 3.2 Information architecture

```text
Today (primary)            Plan (secondary)          Reflect (secondary)
├─ habit cards, each:      ├─ habit list             ├─ calendar (honest days)
│   floor · stretch ·      ├─ add / edit habit       ├─ weekly digest
│   state chip · streak    │   (floor, stretch,      ├─ floor adjust (user-only)
│   next-step hint         │    days, reminder)      └─ archived habits
├─ end-of-day summary      ├─ templates
└─ recovery banner         └─ archived
                                  Settings (sheet): account · notifications ·
                                  accessibility · export/delete · privacy · help
```

- Navigation: bottom tabs `Today | Plan | Reflect`; Settings as a sheet. No nested
  tab stacks. Search: not needed at ≤50 habits; list filter by state is enough
  (search is `contract-ready`).
- Deep links: `foothold://today/<habitId>` for notifications and future sharing.

### 3.3 Objects and state authority

| Object | Fields | Authority |
| --- | --- | --- |
| `Habit` | id, name, icon/color, floor spec (behavior + unit + count), stretch spec (optional), days pattern (daily or weekdays subset), reminder time (optional), anchor timezone, created/archived timestamps | Device is authoritative for definition; sync mirror when account exists; edits are versioned (LWW with version counter for settings) |
| `CheckInEvent` (append-only) | eventId (UUID), habitId, dayKey (ISO date in anchor tz), kind (`floor` \| `stretch`), occurredAt (UTC), deviceId, source | Device event log is authoritative; server mirrors idempotently; never mutated |
| `UndoEvent` (tombstone) | eventId, refs a CheckInEvent, occurredAt, deviceId | Same as above; history preserved for audit |
| `DayState` (derived, never stored as truth) | per habit+dayKey: `pending` \| `floor-done` \| `stretch-done` \| `skipped-by-choice` \| `missed-silently` | Recomputed from event log; no mutable "current streak" field (prevents freeze/purchase mechanics by construction) |
| `UserSettings` | anchor timezone, accessibility prefs, notification prefs, display prefs | Local + sync mirror, LWW |

**Feedback chain for every state-changing action** (skill rule 10): intent
acknowledged → local pending (optimistic, visibly un-synced when offline) →
authoritative commit or failure → user-understandable consequence → undo/retry/
reconcile path. Optimistic UI never claims history changes, deletion, or sync
completion before they are true.

### 3.4 Tenancy

- **Tenant = one human on one device.** v1 default tenant is **device-local guest**:
  full utility with zero account, zero permissions, zero network calls.
- **Optional account** (email/passkey) upgrades the same tenant to **synced**:
  encrypted multi-device mirror of the event log + settings. One human, one event
  log; no workspaces, teams, or shared spaces.
- **Isolation:** no data leaves the device before explicit account creation and
  consent. Tenant boundary enforced server-side by account id; event IDs are
  globally unique; device IDs are random non-PII.
- **Ownership:** export (JSON/CSV), delete, and closure are first-class at any
  time, in any state, and purge local + remote + backups within SLA (§5, Flow G).
- **States:** `guest-local` → `synced` → `closed`; `synced` → `guest-local`
  (logout keeps local data, encrypted); data is never hostage to any state.

---

## 4. Core loops

**Daily loop (recurring value):** plan already staged → Today shows floors →
act (floor or stretch, one tap) → state commits honestly → end-of-day rollover →
summary → tomorrow pre-staged. Natural cadence = scheduled habit days; no forced
daily-open metric.

**Recovery loop (bad-day survival):** midnight rollover marks `missed-silently`
(streak honestly restarts) → next open shows a calm recovery banner → run today's
floor now → cascade prevented; history untouched. Recovery is restorative, never
punitive and never rewriting.

**Growth loop (meta, user-owned):** weekly Reflect digest (kept vs missed, trend)
→ app *suggests* raising or lowering a floor (never auto-adjusts — autonomy is the
trust floor) → user decides → floors evolve with real life.

**Comeback loop (return):** after ≥7 days away, continuity state restores intact
(no data decay), today's queue is pre-staged, and copy is forward-looking ("You
were on a 12-day run. Today starts a new one."). No guilt replay, no loss
theater, no resurrection mechanics.

**Countermetric discipline:** notifications, streaks, and digest are delivery
systems with value hypotheses and neutral controls (§7.4), not retention goals in
themselves.

---

## 5. Critical flows with states

**Flow A — Cold start to first value.** States: `install` → `welcome` (one screen:
"What do you want to keep going?") → `pick-template | create-custom` (bundled
templates, offline-safe) → `set-floor` (guided "smallest version you could do on
your worst day"; floor must be concrete: unit + minimum count ≥1) → `reminder-opt-in`
(optional, skipped silently) → `Today(pending)`. **First check-in commit = first
value beat.** Errors: template list is bundled (never fetched); custom validation is
inline; no account, no permission, no profile before value. Undo: first-check-in
mis-tap undoable within 5 minutes (30 min with accessibility timing setting).

**Flow B — Daily check-in.** Card states: `pending` → `floor-done` (kept) |
`stretch-done` (kept; stretch semantically includes the floor) | `skipped-by-choice`
(not kept, explicitly labeled) | `missed-silently` (not kept, set by rollover).
Transitions: check-in floor/stretch (optimistic → committed; failure → retryable,
never silently dropped); skip (confirmation: "Skip today? It counts as a missed
day. Your floor is still here." — one tap either way, no guilt framing);
midnight rollover (anchor timezone) → `missed-silently`; undo within window →
`pending` with tombstone. Feedback: calm confirmation for floor, warmer for
stretch, never celebration for skip; haptic + state chip + screen-reader
announcement.

**Flow C — Missed-day recovery.** `missed-silently` (streak resets at rollover;
no freeze, no repair) → next open: "Yesterday was missed. Run today's floor now?"
→ today kept, new run starts at 1. Reflect shows the miss honestly in trend data.
Repeated misses (3 of last 7) trigger a gentle digest suggestion to *lower the
floor* — the only "intervention," and it is a suggestion.

**Flow D — Timezone and day rollover.** Day keys are local dates in the **anchor
timezone** (set at first launch; changeable only via explicit re-anchor). Travel
changes display clock, never the day boundary; within 1 hour of boundary a context
chip shows "Home time 23:40 — today ends in 20 minutes." Re-anchor recomputes
*future* keys; past history keeps its original keys (immutable). Acceptance:
UTC-11…UTC+14, half-hour zones, DST transitions (§7 A4–A5).

**Flow E — Offline check-in + sync.** Check-in offline → committed locally
immediately (authoritative), visible `pending-sync` indicator → sync on network
restore via idempotent event log; deterministic conflict order by
(occurredAt, eventId); settings conflicts LWW by version; **no check-in is ever
lost or double-counted.** No account → zero network calls (dormant-state proof).
Full convergence ≤5 s after restore.

**Flow F — Habit edit / archive.** Floor edits apply to future days; history and
stats for past days unchanged. Archive removes the card from Today (no streak
freeze — archived habits simply stop accruing; Reflect shows "archived: last kept
date"). Undo archive within 5 minutes. Delete: offers export first, then purge
local + remote + backups.

**Flow G — Account / export / closure.** Guest → account: event log uploads with
idempotent merge (no duplicates on any retry or device). New device: sign-in →
event log restore → same tenant. Logout: local data stays (encrypted), no wipe.
Closure: purge all tenant data local + remote, including backups, ≤30 days, with
confirmation receipt. Export: JSON (full) and CSV (per-habit day summary),
available offline with no account.

**Flow H — Notification deep links.** Reminder tap → Today card for that habit.
Habit archived/deleted at tap time → lands on Today with an informational chip
("This habit was archived"), never a crash or stale state. Permission denied →
app fully functional; reminder section shows the off state honestly.

**Flow I — Comeback.** ≥7 days without open → continuity restore (all data
intact), today's queue pre-staged, forward-looking copy. No streak-loss replay.

**Error/undo/recovery summary:** every write has optimistic → committed → failed
(retryable) semantics; check-ins undoable in window with tombstones; history
immutable everywhere else; export/delete idempotent; sync self-heals with
deterministic merge; all destructive actions require explicit confirmation and
offer export first.

---

## 6. Capability portfolio (proportionate sweep)

Dispositions per method: `integrate-now`, `reuse-scale-ready`, `contract-ready`,
`not-applicable`, `floor-blocked`. Availability follows the deterministic
controller (no engagement gating, no tenure/spend gates). Cross-cutting floors
(accessibility, privacy, security, recovery, observability, localization,
performance, migration) attach to every selected row below.

| Capability | Disposition | Reason | Proof / availability / presentation |
| --- | --- | --- | --- |
| Identity & account | `integrate-now` (guest-first; optional email/passkey) | Promise needs cross-device continuity but never account-before-value | `implementation-verified` target; guest default, account optional in Settings |
| Data lifecycle (CRUD, history, export, delete) | `integrate-now` | Durable investment + trust floor; export/delete are the honesty contract | Full target; always available; Settings + Reflect |
| Offline / sync | `integrate-now` | Promise is in-the-moment mobile; offline is the normal state | Event-log model; visible pending-sync; specialist `review-offline-sync-conflict` |
| Core IA (Today/Plan/Reflect, states, rollover) | `integrate-now` | This IS the product | Full target; primary presentation |
| Templates | `integrate-now` (bundled, offline) | Fastest credible path to first value | 12 starter templates with floors; no network |
| Notifications (one reminder per habit, default off) | `integrate-now` (opt-in) | Protects the floor; consent-first, fatigue-measured | Specialist `review-notification-strategy`; opt-in after first habit |
| Private feedback | `integrate-now` | Universal intake, no sentiment gating | Always available in Settings/help; close-loop to product |
| Analytics/telemetry | `integrate-now` (consent-gated, privacy-minimal) | Learning requires evidence; no third-party SDK in v1 | Typed port contract; opt-in; specialist `review-product-analytics-instrumentation` |
| Monetization | `contract-ready` (zero-cost v1) | Wedge is trust; payment SDK/entitlement engine absent from runtime; revisit only with retention evidence | Dormant-state proof required; no ads, no tracking revenue |
| Gamification (points/coins/XP/badges) | `not-applicable` | Second mental model contradicts the floor concept; punishment/reward mechanics erode honest motivation | Zero runtime surface; countermetric: 0 gamification UI |
| Streak freeze / repair / purchase | `not-applicable` | Honesty invariant; a frozen streak is a false record | Unrepresentable by construction (streak is derived, no mutable field) |
| Social / sharing / leaderboards | `not-applicable` | Habit data is sensitive; external accountability is a different promise; population-liquidity features add moderation/abuse floors | No runtime; no invite, share, or feed surface |
| AI coach / personalization model | `not-applicable` (v1); `contract-ready` boundary | Second system with its own trust surface; "suggest a floor" later can be rule-based from history | No model, no data collection for profiling |
| Wearable / health integrations | `contract-ready` | Health-data authority must be retrieved per territory before any integration | Zero runtime; typed port contract |
| i18n | `integrate-now` (contracts); English v1, one pilot locale after activation evidence | Global reach without data-model rework; locales are a presentation layer | Message IDs, plurals, RTL-ready data, locale-aware dates |
| Accessibility | `integrate-now` | Cross-cutting floor | 48 dp targets, screen-reader state announcements, reduce-motion, high-contrast, no color-only status |
| Age modes | `not-applicable` (v1, 13+ only); family/guardian `contract-ready` | Child privacy authority per territory must be retrieved before any child surface; absent it, no child mode exists | Age gate at install/store metadata; no child data model |
| Desktop / PWA / watch | `contract-ready` | In-the-moment mobile promise; extension boundaries only | Zero runtime; dormant-state proof |
| Search | `contract-ready` | ≤50 habits; state filters suffice in v1 | Zero runtime |

---

## 7. Build-ready acceptance criteria

Evidence states: acceptance below is at `implementation-verified` level unless
stated; scale/live labels require separate observed evidence (never inferred from
green CI). A builder can run each criterion as an automated or scripted test.

### 7.1 Functional acceptance

**A. Day-state correctness (P0 — the core invariant)**
- A1. Given a habit with a floor, checking in once sets that day to `floor-done`;
  the day counts as kept and the streak increments by 1. Re-check-in the same day
  is idempotent (no double count, no streak +2).
- A2. Stretch check-in sets `stretch-done` and also satisfies the floor (counts as
  kept exactly once).
- A3. Skip-by-choice sets `skipped-by-choice`; it does NOT count as kept; the streak
  resets; the label is distinguishable from `missed-silently` in UI and export.
- A4. Rollover: for every timezone in UTC-11…UTC+14 including half-hour zones, at
  the user's anchor-midnight the day transitions exactly once from `pending` to
  `missed-silently`, and the *next* calendar day's cards appear pre-staged. No
  double rollover, no skipped day.
- A5. DST: a spring-forward/fall-back transition never duplicates or skips a
  dayKey, and rollover still occurs exactly once per local date.
- A6. Streak is always derivable from the event log: any UI streak value equals a
  recomputation from log state at all times (property test over randomized logs).

**B. Check-in feedback and undo (P0)**
- B1. Check-in shows optimistic state in ≤200 ms; committed state reflects the
  authoritative event; on sync failure the UI shows `retryable` and never a false
  "synced" confirmation.
- B2. Undo within the 5-minute window (30 min with accessibility timing) restores
  `pending`, writes a tombstone, and is reflected identically after offline→sync.
- B3. Undo outside the window is rejected with a clear explanation and a
  "correct history" path that preserves the original event (audit).
- B4. Every state change announces itself to assistive tech (screen-reader live
  region) with text, not color alone.
- B5. Skip confirmation requires one explicit tap on "Skip" — the alternative
  "Do the floor" is equally prominent; no guilt or punitive copy passes review.

**C. Offline and sync (P0)**
- C1. Check-ins made offline commit locally and sync after restore; after
  convergence, server and all devices have identical event sets — no loss, no
  duplicates, regardless of retry/interruption patterns.
- C2. Two devices checking in offline for the same day converge to the same final
  state via deterministic (occurredAt, eventId) ordering; neither event is lost.
- C3. Setting edits (reminder time, floor spec) resolve LWW by version; a stale
  client never resurrects an older setting after sync.
- C4. Convergence completes ≤5 s after network restore on the p95 envelope.
- C5. Guest mode performs zero network calls — proven by a network-call harness
  across the full critical path.
- C6. App relaunch during pending sync resumes the queue without dropping or
  duplicating events.

**D. Honesty invariants (P0)**
- D1. There is no code path that mutates or backdates a historical CheckInEvent or
  dayKey; history is immutable except tombstones.
- D2. No streak freeze, repair, purchase, or manual override exists at any layer
  (UI, model, API) — a search-level gate fails the build if such a concept appears.
- D3. Floor edits change future days only; past days' states and stats are
  byte-identical after edit (property test).
- D4. Recovery banner never claims to restore a missed day; copy is validated for
  no-loss-theater framing.
- D5. Archive stops day accrual, preserves history, and shows "last kept date";
  unarchive resumes on the habit's schedule without retroactive days.

**E. Data ownership (P0)**
- E1. Export produces valid JSON (full log) and CSV (per-habit days) offline,
  with no account; import round-trip is lossless for JSON.
- E2. Delete habit or entire account purges local + remote + backups and returns a
  confirmation receipt; purge completes ≤30 days (SLA) and is idempotent.
- E3. Guest→account merge and device restore never duplicate events and never lose
  local-only history.
- E4. Logout keeps local data encrypted; re-login restores the same tenant with
  convergence ≤5 s.
- E5. No telemetry or third-party SDK initializes before consent; consented
  analytics is anonymized and deletable with the account.

**F. Notifications (P1)**
- F1. Reminder is default-off; enabling requires explicit consent; one per habit.
- F2. Reminder tap deep-links to the correct Today card; archived/deleted habit at
  tap time lands safely on Today with an explanatory chip — no crash, no stale UI.
- F3. Permission denied: app fully functional, reminder UI shows the off state.
- F4. Fatigue countermetric: notification-driven opens as a share of total opens is
  logged and capped by the notification specialist contract.

**G. Performance / quality envelopes (P1, measured on minimum devices)**
- G1. Cold start to first non-blank render: p95 ≤ 2.5 s; first responsive input
  p95 ≤ 3.0 s on mid-range device; warm resume ≤ 500 ms.
- G2. Check-in tap-to-committed feedback ≤ 200 ms; Today scroll jank ≤ 16 ms p95.
- G3. App size ≤ 25 MB (store artifact); no optional module (settings, reflect
  charts, templates detail) loads on the cold path.
- G4. Crash-free sessions ≥ 99.5%; no main-thread hangs ≥ 1 s in critical path
  during 30-min soak.
- G5. Battery: background work is zero without an account; with account, sync is
  event-triggered, not polled; no wakelock beyond notification delivery.
- G6. Offline queue handles ≥10,000 events with export still completing ≤10 s.
- G7. Storage: full history for 50 habits × 5 years fits in ≤25 MB app-data;
  quota-exhaustion shows an honest state with export-first guidance.

**H. Accessibility (P1)**
- H1. All touch targets ≥48 dp; every state chip readable by screen reader with
  text label; color is never the only status signal.
- H2. Reduced-motion mode disables celebratory animation; no flashing content.
- H3. WCAG 2.2 AA contrast in light/dark/high-contrast themes for all text and
  states (automated + visual checks).
- H4. Full keyboard/switch navigation for all flows; undo window and reminder
  timing adjustable in Settings.
- H5. Font scaling to 200% without clipped or overlapping critical content.
- H6. Plain-language copy; error messages state what happened, why, and the next
  action.

**I. Security / privacy (P1)**
- I1. Local data encrypted at rest (device keystore); sync transport TLS; account
  uses passkeys or OAuth with no password storage.
- I2. No habit data in analytics or crash payloads; event IDs and device IDs are
  non-PII; consent store is itself auditable.
- I3. Threat model covers session/recovery, local storage, sync API, export
  files, and support diagnostics; findings closed before canary.
- I4. Support diagnostics never include other tenants' data; admin tooling
  requires two-person access and is audited.
- I5. Deletion is a hard purge — no resurrect path in backup restore for closed
  accounts.

**J. Dangerous interaction tests (P1, from method §5)**
- J1. Offline check-in + second-device archive of the habit + sync → deterministic
  state, no lost check-in, no resurrected Today card.
- J2. Timezone re-anchor while events pending sync → no dayKey collision; history
  immutable; UI explains future-only effect.
- J3. Notification deep link into deleted habit during offline mode → safe landing
  state.
- J4. App downgrade/upgrade with user-created data → no schema corruption;
  migration is backward/forward compatible; corrupted store shows recovery
  guidance with export intact.
- J5. Consent revoked mid-session → SDKs and telemetry stop immediately; app
  remains fully functional.

### 7.2 Validation roadmap (evidence gates)

| Stage | Primary proof | Pass predicate | Fail → action |
| --- | --- | --- | --- |
| Contract/model | State-machine + property tests (A1–A6, D1–D3) | 100% green incl. randomized logs | Fix model before UI work |
| Exact slice (canary) | A/B on 1,000 users: activation, kept-week, sync convergence, timezone matrix | ≥80% first-session check-in; 0 data loss; envelope pass | Roll back sync engine per §2.4 or pause exposure |
| User study | Comprehension, trust, recovery usefulness | ≥80% comprehension; trust interview signals; no anxiety reports | Harden copy/flows; re-validate |
| Production readback | 30-day cohort: cadence return, kept-week ≤30d ≥40%, countermetrics | All success contracts + no hard-gate countermetric breach | Bound exposure; diagnose; recover |

---

## 8. Handoff manifest (conditional specialist artifacts)

| Artifact | Owner | Contract summary | Trigger |
| --- | --- | --- | --- |
| Notification channel strategy | `review-notification-strategy` | Reminder fatigue caps, deep-link safety, default-off consent | Before canary |
| Offline/sync conflict | `review-offline-sync-conflict` | Conflict rules C1–C6, deterministic ordering, tombstone semantics | Before canary |
| Daily streak honesty | `review-daily-reward-and-streak` | No freeze/repair/purchase; derived-only streak; fatigue/health countermetrics | Before canary |
| Analytics instrumentation | `review-product-analytics-instrumentation` | Event schemas, consent, no-PII, KPI tree §1.5 + §7.4 | Before canary |
| Private feedback loop | `operate-customer-support` | Universal intake, close-loop to product, no sentiment gating | Before canary |
| Review solicitation | `review-solicitation-policy` | Neutral eligibility, only after release evidence | At release |
| Monetization (if triggered) | `price-saas-subscription` + payment readiness | Only on retention evidence (§6), zero runtime in v1 | Conditional, not now |
| Finish pass | `build-product` (finish) | Whole-app finish, platform release evidence | After build slices |

---

## 9. Unresolved hypotheses and hard blockers

- **Hypotheses to validate:** (1) floor-first framing raises first-session check-in
  vs. generic setup (activation test); (2) honest misses + recovery retain better
  than freeze-based streaks (30-day cohort, neutral controls); (3) digest-suggested
  floor adjustment improves week-8 kept-day rate without user coercion.
- **Hard blockers before release:** live platform/store/notification/child-privacy
  authority re-fetch (skill rule 14 — static text is a route, not a verdict);
  timezone/rollover evidence on real devices; scale envelope measurement.
- **Assumptions:** 18–45 primary cohort (owner: market research, expires at canary);
  English v1 acceptable to first cohort; template floors do not need localization
  before the pilot locale.

## 10. Unassessed areas (bounded-task statement)

This blueprint was produced with the app thesis, system portfolio, quality/reach,
and validation references loaded. `desktop-os-experience.md` was **not** assessed:
desktop is `contract-ready` and out of scope for the mobile promise. Monetization,
social, AI, and PWA full contracts are dispositioned but intentionally not expanded
— they are `contract-ready` or `not-applicable` with zero runtime, per §6. Specialist
artifacts listed in §8 are conditional handoffs, not shipped evidence.

---

## Self-check against the skill rubric

Forward-test target ≥17/20 with no hard-gate failure. Intended scores: user/promise 2,
objects/workflows/IA/recovery 2, first value 2, recurring value/durable investment 2,
sweep/dispositions/availability 2, commerce/social/feedback dispositions 2,
platform/offline quality 2, a11y/i18n/privacy 2, metrics/evidence 2, scale-ready
handoff 2. Honest residuals: cohort numbers in §1.1/§2.4 are hypotheses pending
validation; no scale or production claim is made — `unqualified` until observed.
