# HabitStreak — App Store Channel Listing and Creative Sequence (Plan)

- Artifact: `listing-plan.habitstreak.app-store.v1`
- Owner skill: `optimize-store-listing`
- Version / revision / state: `0.1.0` / `draft-2026-08-11-r1` / `draft`
- Channel: Apple App Store (iOS); territories and locales per Assumptions A2–A3
- Written: 2026-08-11

This is a **draft plan**, not a sealed listing and not a publication authority.
Nothing here is submitted to App Store Connect. Every gate marked `GATE` must
resolve against a specific shipped build revision before this plan can be
sealed. No `artifactDigest` appears on this top-level artifact; sealed upstream
asset digests are recorded only in the Asset QA Register (Section 7), which is
the downstream index for those packages.

---

## 1. Artifact envelope (typed identity)

```json
{
  "schemaVersion": 2,
  "artifactId": "listing-plan.habitstreak.app-store.v1",
  "productId": "habitstreak",
  "artifactKind": "listing-plan",
  "ownerSkill": "optimize-store-listing",
  "artifactVersion": "0.1.0",
  "artifactRevision": "draft-2026-08-11-r1",
  "artifactState": "draft",
  "inputArtifacts": [],
  "canonicalFactsOwned": [
    "streaks-tracking-shipped",
    "reminders-shipped",
    "weekly-reports-shipped",
    "no-social-features",
    "no-coaching-features",
    "app-store-channel-ios"
  ],
  "handoffOutputs": [
    {
      "handoffId": "asset-request.habitstreak.app-store.v1",
      "consumerSkill": "produce-product-assets",
      "artifactKind": "product-asset-pack",
      "contract": "Produce and seal the App Store asset pack for listing-plan.habitstreak.app-store.v1: icon, six screenshot slots by device, and localized captures per Section 6, captured only from the exact shipped build revision recorded in the request.",
      "acceptanceTests": [
        { "testId": "AST-01", "assertion": "Every asset is captured from the exact shipped build revision listed in the request; no unreleased UI appears in any frame." },
        { "testId": "AST-02", "assertion": "Each asset ships with artifactVersion, artifactRevision, artifactState=sealed, and a sha256 digest in the pack manifest." },
        { "testId": "AST-03", "assertion": "Localized screenshot sets are re-captured per locale; no single translated set is reused across locales." }
      ]
    },
    {
      "handoffId": "listing-final.habitstreak.app-store.v1",
      "consumerSkill": "build-distribution-readiness",
      "artifactKind": "store-listing-revision",
      "contract": "Accept the sealed listing revision for HabitStreak on the App Store: exact metadata fields, accepted sealed asset pack, localization packs that passed native QA, and the completed Asset QA Register.",
      "acceptanceTests": [
        { "testId": "DIST-01", "assertion": "Every metadata claim maps to a verified shipped behavior in the recorded build revision." },
        { "testId": "DIST-02", "assertion": "All accepted assets match the QA Register revisions and digests; no unregistered asset is submitted." },
        { "testId": "DIST-03", "assertion": "Privacy labels, age rating, price/IAP disclosures, and support links are complete and truthful before submission." }
      ]
    }
  ],
  "assumptions": [
    { "assumptionId": "A1", "statement": "Working title 'HabitStreak' is a placeholder pending trademark and identity clearance; the finalized name must be swapped consistently across every field and asset.", "status": "unverified" },
    { "assumptionId": "A2", "statement": "Launch territories are US, GB, CA, AU, DE, FR, ES, JP, KR, BR, TW, HK, and UAE; other territories deferred.", "status": "unverified" },
    { "assumptionId": "A3", "statement": "Initial localization locales are en-US (base), en-GB, de-DE, fr-FR, es-ES, ja-JP, ko-KR, pt-BR, zh-Hant, zh-Hans, ar, and he.", "status": "unverified" },
    { "assumptionId": "A4", "statement": "The app is free with no IAP, no subscription, and no ads at the recorded build revision.", "status": "unverified" },
    { "assumptionId": "A5", "statement": "App Store screenshots are captured on iPhone (6.7-inch and 6.5-inch); iPad screenshots are optional and deferred.", "status": "unverified" },
    { "assumptionId": "A6", "statement": "Core tracking requires no account and works offline; privacy copy depends on this.", "status": "unverified" },
    { "assumptionId": "A7", "statement": "The shipped build contains the specific views used for Screenshots S1–S6 (Today/check-in, reminder scheduling, weekly report, streak detail, settings/privacy, completed-day state).", "status": "unverified" },
    { "assumptionId": "A8", "statement": "App Store product-page experiments (PPO) are available in the intended launch territories; E1 runs only where PPO is available.", "status": "unverified" },
    { "assumptionId": "A9", "statement": "No prior listing revision exists for this app on the App Store; if one exists, it must be consumed as a typed input in the next revision.", "status": "unverified" }
  ],
  "proofState": "hypothesis",
  "proofEvidence": []
}
```

`proofState: hypothesis` is honest: no channel readback exists yet. It becomes
`design-validated` only after the gates in Section 8 pass, and
`production-proven` only after a `live-readback` evidence record of the
submitted/live metadata and assets.

---

## 2. Product and channel identity

- **Product**: HabitStreak (working title, A1), a habit-tracking iOS app.
- **Shipped capabilities** (source: product owner statement; each must be
  re-verified against a specific build revision before sealing):
  1. Streak tracking — daily check-in; streaks grow per consecutive day.
  2. Reminders — per-habit scheduled local notifications.
  3. Weekly reports — per-week summary of completions, consistency, best streak.
- **Explicitly out of scope (shipped as non-features)**: social features
  (feeds, sharing, leaderboards, friends), coaching/mentorship, AI coaching,
  gamified competition, cross-user data. The listing never implies these.
- **Channel**: Apple App Store, iOS only. Not Google Play, not web, not Steam.
- **Primary audience**: individual adults (18–49) who want personal consistency
  for daily habits without social or coaching overhead.
- **Job to be done**: "Keep my habit going day after day, know when it's time,
  and see honest weekly progress — without a social feed or a coach."
- **Positioning promise**: *Private, streak-first habit tracking: check in
  daily, get reminded on time, and see your week in one honest report. No
  social. No coaching.*
- **Conversion event (primary)**: product page view → install (first-run
  completed within 24 h is the post-install success event).
- **Price/model**: free, no IAP, no subscription, no ads (A4). Price/claim
  changes require a new listing revision and a human authority; this plan does
  not authorize price changes.
- **Device/input/age**: iPhone, touch, 4+ provisional age rating pending the
  App Review questionnaire (GATE: complete questionnaire at submission; 4+ is
  a hypothesis until the data-collection answers are filed).

## 3. Positioning-to-asset narrative

Sequence (per pattern `store-listing-3`: outcome, workflow, proof, trust,
differentiator, call to action):

1. **Distinctive outcome / mechanism** — "Your streak, kept day by day."
   First visual is the core loop: Today screen with streak counter and the
   habit list (`store-listing-1`: value first, never a brand graphic).
2. **First-value / core interaction** — "Check in daily." One tap closes the
   day; the streak visibly grows.
3. **Workflow** — "Reminders fit your day." Per-habit reminder scheduling is
   the second screen so the mechanism is concrete, not abstract.
4. **Depth / progression proof** — "See your week in one report." Weekly
   report proves progress without social comparison.
5. **Trust / quality** — "Private. No social, no coaching." The differentiator
   is a trust marker (`store-listing-5`): honest streaks, no account, no feed.
6. **Call to action** — "Start your streak today." Completed-day state invites
   the install.

Every narrative beat is assigned to a screenshot slot in Section 5 and a
claim-behavior mapping in Section 4.2. Anything not shipped (social,
coaching, sync, cloud, cross-device) is absent from all copy and visuals.

## 4. Metadata field contract

### 4.1 Exact metadata (base locale: en-US)

| Field | Value (exact) | Constraint check |
| --- | --- | --- |
| Name (title) | `HabitStreak: Streak Tracker` | 27/30 chars |
| Subtitle | `Reminders & weekly reports` | 26/30 chars |
| Keywords | `habit,habits,tracker,streak,streaks,reminder,weekly,report,productivity,daily,consistency,goal` | 94/100 chars, comma-separated, no spaces |
| Promotional text | `Honest streaks, reminders, and a weekly report — no social, no coaching.` | 74/170 chars; may change without review, still claim-gated |
| Description | See 4.3 | <= 3000 chars; first three lines carry the value |
| Support URL | `https://[support.example]/habitstreak` | GATE: real URL, reachable, no 404 |
| Privacy policy URL | `https://[privacy.example]/habitstreak` | GATE: real URL; policy matches privacy labels |
| Price | Free (no IAP, no subscription) | A4; re-verify at submission |
| App availability | iPhone only (A5) | Compatibility list matches shipped device support |
| Age rating | 4+ (provisional) | GATE: complete App Review questionnaire truthfully |
| Release notes | Per release, specific and user-facing (`store-listing-10`): e.g. "Added custom week-start for weekly reports" — only if shipped | GATE: notes list only shipped changes |

Title and subtitle state category and features; they never promise social or
coaching, and never use competitor names (`store-listing-2`, guardrail:
search optimization must not reduce clarity or stuff terms).

### 4.2 Claim → shipped-behavior map (every claim, one row)

| Claim in listing | Where it appears | Shipped behavior to verify (GATE) |
| --- | --- | --- |
| "Streak Tracker" / "Streaks" | Title, subtitle, keywords, description, S1, S6 | Streak counter increments on consecutive daily check-ins; missed day ends streak honestly |
| "Reminders" | Subtitle, keywords, description, S2 | Per-habit reminder time and weekday schedule exists; local notification fires at set time |
| "Weekly reports" | Subtitle, description, S3 | Weekly report shows completions, consistency, best streak for the completed week |
| "No social, no coaching" | Promotional text, description, S5 | No social/coaching features in the build; no account/social screens exist |
| "No account" (privacy) | Description, S5 | App runs without account creation; privacy labels say "Data Not Collected" (or exact collected set) |
| "Works offline" | Description | Core tracking functions with network disabled; if false, delete this claim |
| "Honest streaks — no fake resets" | Description, S1 | No streak-repair/freeze behavior exists in the build |

Resolution rule: a claim whose GATE fails is **removed**, not softened into a
new promise. No claim may be added without a new mapping row.

### 4.3 Description (exact draft, en-US base)

> Build streaks one day at a time.
>
> HabitStreak is a private habit tracker built around three things: daily
> streaks, reminders, and weekly reports.
>
> **Streaks.** Check in each day and watch your streak grow. Miss a day and
> your streak is honest about it — no fake resets, no social pressure, just
> your real progress.
>
> **Reminders.** Set a reminder for each habit at the time that fits your day.
> HabitStreak notifies you when it is time to check in.
>
> **Weekly reports.** Every week, get one clear report: what you completed,
> your consistency, and your best streak for the week.
>
> No social feed. No coaching. No noise. Your habits are yours.
>
> Privacy
> HabitStreak does not require an account and does not show ads. Your habit
> data stays on your device. [GATE: A6 — if any clause is false, delete that
> clause]
>
> Support
> Questions or feedback? Contact us at [support email] — we respond within
> two business days. [GATE: real address and actual response SLA]

The first three visible lines (before "More") are: the headline, the one-line
positioning, and the three-feature lead — no claim there that is not in the
map above.

## 5. Screenshot order, captions, and alt text

Order rationale: S1 outcome/mechanism → S2 workflow → S3 proof → S4
progression → S5 trust/differentiator → S6 CTA. Captions <= 32 chars; alt text
describes the real UI for accessibility (App Store Connect supports
per-screenshot accessibility descriptions).

| Slot | Device size (px) | Shipped UI to capture (GATE) | Caption (exact) | Alt text (exact) | Narrative beat |
| --- | --- | --- | --- | --- | --- |
| S1 | 6.7" 1290x2796 | Today screen: streak counter + habit list with unchecked items | `Check in to grow your streak` | "Today screen with a streak counter and a list of daily habits to check off" | Outcome / core loop |
| S2 | 6.7" 1290x2796 | Reminder settings for one habit: time + weekday schedule | `Get reminded when it's time` | "Reminder settings for a habit showing a chosen time and selected weekdays" | Workflow |
| S3 | 6.7" 1290x2796 | Weekly report: completions, consistency %, best streak | `See your week in one report` | "Weekly report showing completions, a consistency percentage, and best streak" | Proof / depth |
| S4 | 6.7" 1290x2796 | Streak detail/history for one habit (fallback S4b: real notification banner from the shipped build) | `Watch your real streak grow` | "Streak detail showing consecutive-day history for one habit" | Progression |
| S5 | 6.7" 1290x2796 | Settings/About screen showing no-account, no-ads state (fallback S5b: Today screen with trust caption) | `Private. No social, no coaching.` | "Settings screen showing that no account is required and no ads are shown" | Trust / differentiator |
| S6 | 6.7" 1290x2796 | Today screen, all items checked (completed-day state) | `Start your streak today` | "Today screen with every habit checked off for the day" | Call to action |

Rules:
- If any GATE view does not exist in the shipped build, that slot uses its
  defined fallback; if no fallback is shippable, the slot is dropped and the
  narrative re-ordered — never a mocked or unreleased screen (guardrail).
- Sample data in captures is clearly sample data; no fabricated user identity,
  ranking, or review appears in any frame.
- S5's privacy sentence is a caption, not artwork text: it must be true per
  privacy labels and the build (A6).
- No video/trailer in this revision. A preview video is deferred until a real
  usage capture exists; none is claimed now.
- Icon: 1024x1024, opaque, flame-and-check motif, **no text**, no rounded
  corners in the source file (store masks it). Icon is captured/designed by
  `produce-product-assets`, not hand-edited here.

## 6. Localization plan (per-locale briefs + native QA)

Principle (`store-listing-7`): localization adapts value proposition,
screenshots, and policy language — it is not translation of one English set.
Screenshots are **re-captured with the localized shipped UI** per locale;
translated English screenshots are never reused.

| Locale | Intent / search language | Cultural notes | RTL | Typography / text-fit | Date / week-start | Screenshot set |
| --- | --- | --- | --- | --- | --- | --- |
| en-US (base) | Native English search terms | "Streak" is the hook | No | Latin; captions <= 32 chars | M/D/Y; Sun start (verify shipped) | Re-captured en-US set |
| en-GB | UK spellings ("colour", "recognise"), "streak" | Keep "no social, no coaching" tone | No | Latin | D/M/Y; Mon start (verify shipped) | Own capture |
| de-DE | "Gewohnheit", "Serie", "Erinnerung" | Long compound words; captions re-sized | No | Latin, longer strings; recheck safe zones | T.M.J; Mon start | Own capture |
| fr-FR | "habitude", "série", "rappel" | Formal register for trust copy | No | Latin; watch line breaks | J/M/A; Mon start | Own capture |
| es-ES | "hábito", "racha", "recordatorio" | Neutral register | No | Latin | D/M/A; Mon start | Own capture |
| ja-JP | "習慣", "継続", "リマインダー" | Compact text; trust tone | No | CJK density; vertical overflow risk | Y/M/D; Sun start | Own capture |
| ko-KR | "습관", "스트릭", "알림" | Honorifics in support copy | No | CJK density | Y/M/D; Sun start | Own capture |
| pt-BR | "hábito", "sequência", "lembrete" | Casual-consistent register | No | Latin | D/M/A; Sun start | Own capture |
| zh-Hant | "習慣", "連續天數", "提醒" | Traditional Chinese; HK/TW registers differ | No | CJK density | Y/M/D; Sun start | Own capture |
| zh-Hans | "习惯", "连续天数", "提醒" | Simplified Chinese; **China store only if ICP registration exists** (compliance gate) | No | CJK density | Y/M/D; Sun start | Own capture |
| ar | "عادة", "سلسلة", "تذكير" | Right-to-left; trust phrasing | Yes | RTL mirroring; digits | D/M/Y; Sat/Sun start (verify) | Own RTL capture |
| he | "הרגל", "רצף", "תזכורת" | Right-to-left; informal support tone | Yes | RTL mirroring; digits | D/M/Y; Sun start | Own RTL capture |

Native QA (mandatory before any locale is sealed; status must be recorded per
locale in the register):
- Native-speaker proofread of every metadata field, caption, and alt text.
- **Claim-equivalence check**: translated copy must promise exactly the same
  shipped behaviors — no added "sync", "AI", "community", or "coach" words.
- Screenshot QA on-device: text fits, no truncation, safe zones respected,
  RTL screenshots genuinely mirrored in the UI (never text-flip in an editor).
- Date, week-start, and number formats in weekly reports match the shipped
  locale settings; screenshots show the locale's real format.
- Privacy/support strings reviewed per region (e.g., DE/FR legal tone) before
  sealing.
- Result: per-locale `artifactState=sealed` only with an evidence record of a
  native reviewer's sign-off (Section 8.3).

## 7. Asset QA — exact revisions by digest

Single source of truth: only assets from the accepted
`produce-product-assets` pack (`asset-request.habitstreak.app-store.v1`) enter
this register. No hand-editing, no re-rendering, no second production source.
Digests are recorded **by the pack manifest into this register** — this
listing artifact never self-hashes, and no digest is invented.

Asset QA Register (filled only from the delivered pack; `TBD` is the honest
state until then):

| artifactId | artifactVersion | artifactRevision | artifactState | sha256 digest (`sha256-exact-bytes`) | Acceptance checks passed |
| --- | --- | --- | --- | --- | --- |
| `asset.icon.habitstreak.app-store` | TBD | TBD | `sealed` (after pack) | TBD | 1024x1024, opaque, no text, no alpha, motif matches S1/S6 UI, rights/provenance ok |
| `asset.screenshot.S1.habitstreak.app-store` | TBD | TBD | `sealed` | TBD | 1290x2796; safe zones; real shipped UI; legibility; claim evidence S1 row; alt/caption match |
| `asset.screenshot.S2.habitstreak.app-store` | TBD | TBD | `sealed` | TBD | same checks as S1 against S2 row |
| `asset.screenshot.S3.habitstreak.app-store` | TBD | TBD | `sealed` | TBD | same checks as S1 against S3 row |
| `asset.screenshot.S4.habitstreak.app-store` | TBD | TBD | `sealed` | TBD | same checks as S1 against S4 row |
| `asset.screenshot.S5.habitstreak.app-store` | TBD | TBD | `sealed` | TBD | same checks as S1 against S5 row; privacy caption claim verified |
| `asset.screenshot.S6.habitstreak.app-store` | TBD | TBD | `sealed` | TBD | same checks as S1 against S6 row |
| `asset.screenshot.S1..S6.<locale>.habitstreak.app-store` (x12 locales) | TBD | TBD | `sealed` | TBD | localized UI capture; native QA sign-off; locale format/date check; RTL check for ar/he |

Per-asset acceptance checklist (all must pass to seal):
1. Exact bytes match pack manifest digest; revision equals the pack's revision.
2. Dimensions and safe zones per App Store Connect current requirements
   (verify at submission time; pixel sizes above are the current plan).
3. Compression/color: no visible artifacts, sRGB profile, no oversharpening.
4. Legibility: captions and in-UI text readable at 100% on the target device;
   no clipped text; adequate contrast.
5. Device chrome: standard status bar/content; no third-party watermark or
   unrelated UI.
6. Motion/captions: N/A (no video in this revision).
7. No unreleased UI: every frame matches the recorded shipped build revision.
8. Rights/provenance: sample data owned/licensed; no person's real data; icon
   rights cleared.
9. Claim evidence: every caption maps to its Section 4.2 row with GATE green.
10. Channel rules: no price/rank/review imagery, no competitor marks, no
    misleading gameplay or feature implication.

## 8. Conversion experiment (E1) with trust and retention countermetrics

### 8.1 Design — one variable (`store-listing-8`)

- Platform: native App Store Product Page Optimization (PPO), where available
  (A8). E1 does not run where PPO is unavailable.
- **Variable**: subtitle only.
  - Control (A): `Reminders & weekly reports`
  - Variant (B): `Streaks, reminders & reports`
  - Rationale: tests whether naming the primary differentiator ("streaks")
    first lifts conversion, without touching screenshots, description, or
    price. One major variable at a time; a second experiment (screenshot
    order, S1 vs S4 first) is designed but **blocked until E1 resolves**.
- Immutability: variants are frozen at exact revisions
  (`variant-e1-a` / `variant-e1-b`); no mid-flight edits. Traffic identity is
  Apple's per-Apple-ID assignment; the app does not read or store variant
  assignment (privacy: no device-level fingerprinting).
- Exposure/contamination controls: no other listing field changes during the
  run; no overlapping PPO experiment; release-note cadence unchanged during
  the run; keyword edits frozen.

### 8.2 Metrics

| Kind | Metric | Definition / source |
| --- | --- | --- |
| Primary | Page-view to install conversion | App Store Connect PPO report, 7-day attribution window |
| Retention | Day-1 and Day-7 retention | Analytics: users who open the app on D1/D7 after install |
| Retention | First value reached | First habit check-in completed within 24 h of install |
| Trust | Uninstall / refund rate | Store + analytics; refund rate per Apple reports |
| Trust | Review sentiment | Star distribution and theme extraction (observed evidence only — no review manipulation, `store-listing-6`) |
| Trust | Support contacts | Contacts mentioning "misleading", "reminders broken", or "weekly report missing" vs total |
| Quality | Crash-free sessions | Crash reporter during and 7 days after experiment |

### 8.3 Stop rules, confidence, rollback

- Minimum runtime: 14 days; minimum sample: 5,000 page views and 2,000
  installs per variant (from PPO traffic estimates).
- Declare winner only at >= 95% confidence with >= 5% relative lift on the
  primary metric **and** no countermetric degradation.
- Early stop: never before 14 days. Early **kill** at any time if D7 retention
  degrades >= 0.5 pt absolute or support contacts tripling on trust themes, at
  >= 80% confidence — kill returns the listing to control, even if conversion
  is higher (creative conversion must not trade away product quality).
- Rollback: control remains the default; losing/immutable variant archived;
  listing superseded to the winner's revision; live readback of the submitted
  metadata within 48 h (evidence record: `live-readback`).
- Result rule: a conversion win with retention/trust loss is **no win** — the
  next experiment retests positioning copy that better matches first-run
  experience rather than shipping the higher-converting but misleading asset.

### 8.4 Disclosures and compliance limits

- The experiment changes listing presentation only: never price, IAP,
  privacy labels, age rating, or shipped behavior. Any such change requires a
  new product/listing revision with separate authority.
- Every variant stays inside the Section 4.2 claim map; B's subtitle claims
  only shipped features (streaks, reminders, reports).
- Privacy labels and data-safety answers match actual collection
  (`store-listing-9`); no data-share or account claims without exact evidence.
- No fake rankings, awards, reviews, or usage numbers in any variant.
- No incentivized or steered ratings; reviews are observed, not manipulated.
- China territory (zh-Hans) blocked until ICP registration exists (compliance
  gate); EU/UK price and consumer-rights copy reviewed before any paid model
  change (none planned, A4).
- Autonomous generators cannot publish, change price/claims, or promote a
  variant; a human with channel authority enables every PPO variant and every
  submission (skill guardrail + constitution authority rule).
- If any new compliance rule changes between plan date and submission
  (e.g., App Store policy), the listing revision is re-validated before
  sealing.

## 9. Proof and evidence plan

| Evidence | Type | Required before | Recorded in |
| --- | --- | --- | --- |
| Shipped build revision identified; every Section 4.2 GATE verified on that build | implementation-test | Sealing metadata | Proof evidence (envelope) |
| Asset pack accepted; QA Register complete with real digests | contract-test | Submission | QA Register Section 7 |
| Native QA sign-off per locale (12 locales) | other | Sealing each locale pack | Section 6 register |
| Submitted metadata + assets read back from App Store Connect | live-readback | `production-proven` | Proof evidence |
| E1 result with countermetrics | other / live-readback | Winner promotion or rollback | Section 8 archive |

`proofState` advances in order: hypothesis → design-validated (gates 4.2 and
5 pass) → implementation-verified (assets sealed) → production-proven
(live-readback of submitted listing). Until then, all claims in this plan are
plan-level, not live claims.

## 10. Artifact register (every artifact carries version/revision/state)

No top-level artifact carries `artifactDigest`; sealed asset digests live only
in the Section 7 index, as the envelope schema requires.

| Artifact | artifactVersion | artifactRevision | artifactState |
| --- | --- | --- | --- |
| `listing-plan.habitstreak.app-store.v1` (this file) | `0.1.0` | `draft-2026-08-11-r1` | `draft` |
| `listing-metadata.habitstreak.app-store.v1` (metadata contract Section 4) | `0.1.0` | `draft-2026-08-11-r1` | `draft` -> `sealed` after 4.2 gates |
| `experiment-def.e1.habitstreak.app-store` (variant A/B, Section 8) | `0.1.0` | `draft-2026-08-11-r1` | `draft` -> `sealed` when enabled by human authority |
| `asset-request.habitstreak.app-store.v1` (handoff) | `0.1.0` | `draft-2026-08-11-r1` | `draft` -> `sealed` when pack accepted |
| `product-asset-pack.habitstreak.app-store.v1` (producer-owned) | pack's | pack's | `sealed`; digests indexed in Section 7 |
| `asset.icon.habitstreak.app-store` | pack's | pack's | `sealed` after QA Section 7 |
| `asset.screenshot.S1..S6.habitstreak.app-store` | pack's | pack's | `sealed` after QA Section 7 |
| `asset.screenshot.S1..S6.<locale>.habitstreak.app-store` (x12) | pack's | pack's | `sealed` after QA Section 7 + native QA |
| `localization-pack.<locale>.habitstreak.app-store` (x12) | `0.1.0` | `draft-2026-08-11-r1` | `draft` -> `sealed` after Section 6 native QA |
| `qa-register.habitstreak.app-store` (Section 7) | `0.1.0` | `draft-2026-08-11-r1` | `draft` -> `sealed` when every TBD resolves |
| `listing-final.habitstreak.app-store.v1` (handoff to build-distribution-readiness) | `0.1.0` | next revision | `sealed` only at submission time |

## 11. Next actions

1. Confirm product identity/name (A1) and identify the exact shipped build
   revision for capture and claim verification.
2. Resolve every `GATE` in Sections 4.2 and 5 against that build; delete
   claims whose gates fail.
3. Send `asset-request.habitstreak.app-store.v1` to `produce-product-assets`
   and consume the returned pack in the **next** listing revision (this
   revision intentionally does not consume it).
4. Run per-locale localization with native QA (Section 6); block zh-Hans until
   the ICP gate is resolved.
5. Enable E1 in PPO-available territories with human authority (Section 8),
   with countermetric monitoring from day 1.
6. After gates pass, hand `listing-final.habitstreak.app-store.v1` and the
   accepted pack to `build-distribution-readiness`; never submit from this
   draft.
