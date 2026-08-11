# Listing Plan — Habit-Tracking App (iOS App Store)

## Artifact info

| Field | Value |
| --- | --- |
| `artifactId` | `habit-tracker-store-listing-plan` |
| `productId` | `habit-tracker` (placeholder — set to real product id) |
| `artifactKind` | `store-listing-plan` |
| `ownerSkill` | `optimize-store-listing` |
| `artifactVersion` | `1` |
| `artifactRevision` | `2026-08-11-a` |
| `artifactState` | `draft` |
| `proofState` | `hypothesis` |
| `supersedes` | none (new listing plan) |
| `inputArtifacts` | none — feature truth supplied in request; no canonical product artifact in workspace |
| `canonicalFactsOwned` | iOS App Store listing metadata, screenshot order, claim-evidence mapping, localization briefs, conversion experiment design for this product revision |

This document is a draft plan. A sealed JSON artifact envelope (with `artifactDigest` recorded by a downstream index, never self-hashed) is produced only when the final listing revision is published.

---

## 1. Product identity and audience

- **Product:** iOS habit-tracking app. Shipped feature set is the claim ceiling:
  - Streaks (check-in chains with streak counter and reset behavior)
  - Daily reminders per habit
  - Weekly reports (days completed, current streaks)
  - **Explicitly not shipped:** social features (feeds, sharing, challenges, friends) and coaching (bots, AI advice, personalized plans)
- **Channel:** Apple App Store, iOS. Google Play and other channels are out of scope for this plan.
- **Primary audience:** self-motivated adults (approx. 18–45) who want a simple daily-routine tracker without social pressure or subscription-style coaching layers.
- **Job to be done:** "Help me keep a daily habit going by making the chain visible, reminding me on time, and showing me I made progress."
- **Positioning promise:** *A private, simple habit tracker that keeps your chain alive — streaks, on-time reminders, and a plain-language weekly report. Nothing social, nothing coached.*
- **Conversion event:** product page view → install. Countermetrics (Section 8) must not regress.
- **Non-goals:** social/sharing claims, coaching/AI claims, rankings, awards, "scientifically proven" claims, review counts, or any UI not in the shipped build.

### Assumptions (verify before finalizing)

| Id | Assumption | Status |
| --- | --- | --- |
| A1 | App display name is not supplied; plan uses placeholder **"Streaks — Habit Tracker"** and notes alternatives | unverified |
| A2 | Pricing model (free / IAP / subscription) not supplied; description contains no pricing claims and a `[PRICE MODEL]` placeholder is inserted if needed | unverified |
| A3 | App is free to use without account, or handles accounts in a way we must describe exactly | unverified |
| A4 | Habit data is stored locally (no cloud sync); claim "data stays on your device" must be confirmed against build and Data Safety form | unverified |
| A5 | Current live listing (title, subtitle, description, keywords, screenshots, price, IAPs, Data Safety, age rating) not supplied; capture before shipping (Section 9) | unverified |
| A6 | Target locales for launch are `en-US`, `es-ES`/`es-419`, `de-DE`, `fr-FR`, `ja-JP`, `pt-BR`, `zh-Hans`, `ar` — adjust to actual installed-locale data | unverified |
| A7 | Baseline metrics (product page views, installs, retention, refunds, support) not yet captured | unverified |

---

## 2. Narrative sequence

Objection → proof order used for both description and screenshots:

1. **Outcome / core loop** — never break the chain (streak visibility).
2. **First-value interaction** — one-tap daily check-in.
3. **Workflow** — reminders at times you choose.
4. **Depth / proof** — weekly report in plain numbers.
5. **Trust / differentiator** — private by design; no social, no coaching.
6. **Call to action** — start today, free-form habit list.

---

## 3. Metadata contract (App Store Connect)

### 3.1 Title (≤ 30 characters)

**Recommended: `Streaks — Habit Tracker`** (23 chars)
- Contains the two highest-intent search terms (streaks, habit tracker).
- Truthful: app is a habit tracker whose core mechanism is streaks.
- If the app must keep a different brand name, use `<Brand> — Habit Tracker` and keep it ≤ 30 chars; do not add hype words ("ultimate", "pro", "best").

Alternates (same truth ceiling):
- `Habit Streak Tracker` (21 chars) — plainest, lowest risk.
- `<Brand> — Daily Habits` (≤ 30) — only if "daily habits" matches the shipped build's language.

### 3.2 Subtitle (≤ 30 characters)

**Recommended: `Reminders & weekly reports`** (26 chars)
- Lists the two shipped features the title doesn't name.
- No claims about social, coaching, AI, science, or awards.

### 3.3 Keywords (≤ 100 characters, one field per locale)

`streak, habit tracker, daily habits, reminders, weekly report, routine, self improvement` (88 chars)
- Every keyword is a real user query that the app's shipped features satisfy.
- No competitor trademarks, no irrelevant stuffing, no "cheat"/"game" terms.

### 3.4 Description (≤ 4,000 characters; first ~3 lines are the hook)

> **Never break the chain.**
>
> Streaks is a simple habit tracker built around one idea: keep your streak alive. Log a habit with one tap, get a reminder at the time you choose, and see a plain-language weekly report. No feed, no sharing, no coaching bots — just your habits.
>
> **Keep your streak**
> Every habit is a chain of check-ins. The app shows your current streak and how long you've kept it, so you always know what you're protecting.
>
> **Reminders that fit your day**
> Set one daily reminder per habit and pick the time that works for you. Your phone does the remembering; you do the doing.
>
> **Weekly reports in plain numbers**
> Each week, the report shows days completed and current streaks. No charts to decode — just a clear picture of your progress.
>
> **Private by design**
> No social features. No coaching. Your habit data stays on your device [VERIFY A4 — adjust if iCloud sync exists: "syncs privately to your iCloud account"].
>
> **Start in seconds**
> Pick a habit (or add your own), set a reminder, and log your first check-in today. Works for fitness, reading, water, sleep, mindfulness, or anything you want to do daily.
>
> [PRICE MODEL — insert exact pricing/auto-renew disclosure if the app sells anything]
>
> Questions or feedback? Contact us at [SUPPORT EMAIL] — we read every message.

Notes:
- Every sentence maps to a shipped behavior (Section 6 claim map). "No feed, no sharing, no coaching bots" is a true negative based on the shipped feature set.
- Replace "Streaks" with the shipped display name throughout.
- Do not add: "best", "top-rated", "#1", "award-winning", "scientifically proven", "AI", "coach", "community", "share with friends".
- If the app has IAP/subscription, the required auto-renewable subscription disclosure (link, terms, cancellation path) goes here and must match App Store Connect pricing settings.

---

## 4. Screenshot plan

Primary device: 6.7" (iPhone 15 Pro Max class), 1290 × 2796 px. Also produce 6.5" (1242 × 2688) and 5.5" (1242 × 2208) at 1:1 layout where needed; iPad only if the app ships on iPad. Up to 10 screenshots allowed; plan ships **6**, all from the **shipped build**, real data, localized per locale (Section 7). No unreleased UI, no mockups, no fake user names.

| # | Screenshot content (real UI) | Overlay copy (short) | Claim it proves | Why here |
| --- | --- | --- | --- | --- |
| 1 | Streak view: today's check-ins and current streak count on a week/chain layout | "Never break the chain." | Streaks | Core value in first frame (rule `store-listing-1`) |
| 2 | One-tap check-in: habit row with check button (mid-interaction) | "Log a habit in one tap." | Streaks / core loop | Core interaction — first-value (rule `store-listing-3`) |
| 3 | Reminder settings: one habit with time picker / scheduled reminder | "A reminder at the time you choose." | Reminders | Workflow proof |
| 4 | Weekly report: days completed + current streaks | "Your week at a glance." | Weekly reports | Depth/proof |
| 5 | Privacy: settings screen or data-on-device illustration consistent with build | "Private by design. No social. No coaching." | True negative (trust) | Trust marker (rule `store-listing-5`); only if A4 verifies |
| 6 | New-habit creation / onboarding screen | "Build any habit. Start today." | Getting started | CTA final frame |

Screenshot rules:
- Frame 1 must never be a generic logo or hero graphic; it shows the core loop (rule `store-listing-1`).
- Sequence tells a story: outcome → interaction → workflow → proof → trust → CTA (rule `store-listing-3`).
- Every overlay is a claim → each must appear in the claim map (Section 6).
- Keep text inside safe zones; respect Apple's screenshot requirements (no misleading overlays, correct status bar, real device chrome).
- Alt text per screenshot describes what the screen shows (accessibility + App Review).

**Stable production request (handoff to asset production):**
- Render all 6 screenshots for each locale in Section 7 from the localized shipped build (never stamp English text on translated images).
- Resolutions: 1290×2796 (6.7"), 1242×2688 (6.5"), 1242×2208 (5.5"); 1:1 layout parity.
- Acceptance tests: exact pixel dims, safe-zone compliance, overlay copy matches claim map, no truncated strings, no unreleased UI, localized date/number formats, device chrome correct.
- Deliver as a versioned pack with per-file digests for the sealed listing revision.

---

## 5. Claim-evidence map (every claim must be true)

| Claim (title/subtitle/description/screenshot) | Shipped behavior it maps to | Verify against build |
| --- | --- | --- |
| "Streaks" / "Never break the chain" / "current streak" | Streak counter + chain display; reset when a day is missed | Walk the build: check streak increments and reset rules match copy |
| "Habit tracker" / "add your own habit" | Add/edit/delete habit tracking | Habit CRUD exists in shipped build |
| "Log a habit in one tap" | Check-in control completes a day in one action | Confirm no multi-step flow |
| "Reminders that fit your day" / "daily reminder per habit" | Per-habit notification with chosen time | Notification permission flow + scheduling work; permission copy is accurate |
| "Weekly report: days completed and current streaks" | Weekly report screen with those exact fields | Report screen shows days completed + current streaks; no overclaim (no "compare to last week" unless shipped) |
| "No social features. No coaching." | No social or coaching code paths, UI, or services | Code/UI audit + App Privacy / Data Safety form shows no such features |
| "Your habit data stays on your device" | Local-only storage | Confirm no analytics/cloud sync (A4); otherwise rewrite claim |
| "Private by design" screenshot | Settings/privacy surface shown is real | Screenshot shows shipped settings screen |

**Explicit non-claims (never appear):** social feeds, sharing, challenges, friends, leaderboards, coaching, AI/ML guidance, personalized plans, "scientifically proven", rankings, awards, "best/top", review counts, offline if not offline, iCloud if not iCloud, "free" if paid, any screenshot of UI not in the shipped build.

---

## 6. Localization plan

Goal: adapt value proposition per market, not machine-translate (rule `store-listing-7`). Do not reuse one translated screenshot set — re-render per locale (Section 4).

1. **Locale set (A6):** `en-US` (US/CA/UK/AU), `es-ES` + `es-419`, `de-DE`, `fr-FR`, `ja-JP`, `pt-BR`, `zh-Hans`, `ar`. Adjust from App Analytics installs-by-territory before finalizing.
2. **Per-locale metadata:** title/subtitle/description/keywords each localized by a native speaker who understands the app; run per-market keyword research (e.g., Spanish "racha" vs "secuencia", German "Gewohnheiten", Japanese streak/habit vocabulary) — choose the term real users search, then keep title/subtitle ≤ 30 chars in that language (German and Spanish expand; cut words, not truth).
3. **Screenshots:** re-render all 6 from the localized build per locale; localize overlay copy, date formats (weekly report), reminder times (12h/24h), and notification text; mirror layout for RTL (`ar`, and `he`/`fa` if added).
4. **Cultural meaning check:** verify "streak" and "weekly report" concepts read naturally and don't carry unintended meaning (e.g., gambling/game connotations); keep copy factual in all locales.
5. **Native QA:** a native speaker reviews each locale's metadata + screenshots on-device: no truncation, no untranslated strings, no wrong dates/units, screenshots match the shipped localized build, App Review wording passes.
6. **Localization testing:** treat each locale's listing as an artifact; verify after publish (readback, Section 8) that the live page per territory shows the localized set.
7. **Privacy/legal:** Data Safety, age rating, and subscription disclosures must be localized and identical in meaning to the English versions.

---

## 7. Conversion testing (App Store Product Page Optimization)

### 7.1 Baseline (before any change)
- Capture 2–4 weeks of current-listing metrics (A7): product page views, installs, install rate (installs ÷ page views), D1/D7 retained installs, first-value rate (first check-in or streak ≥ 2 — define from analytics), refunds, crash-free, support contacts, review sentiment.
- Save the current live listing (metadata + screenshots) as the control.

### 7.2 Experiment design — one variable at a time (rule `store-listing-8`)
Use App Store Connect Product Page Optimization (PPO). Each test: control vs **one** treatment, up to 3 treatment slots available — use 1 per test to keep attribution clean. Tests require App Review approval; default duration 90 days; estimated time/impressions are shown in App Store Connect based on your traffic.

| Test | Variable | Control | Treatment |
| --- | --- | --- | --- |
| T1 | Title + subtitle (pair, as one positioning change) | Current listing | `Streaks — Habit Tracker` + `Reminders & weekly reports` |
| T2 | Screenshot order / frame 1 | Current screenshots | Section 4 order (all 6) |
| T3 | Description | Current description | Section 3.4 description |

- Traffic: start with ~30% treatment share; include all launched locales initially, then enable per-locale tests for high-traffic markets (PPO supports selecting localizations).
- Do not run T1/T2/T3 concurrently — overlapping tests contaminate page-view assignment and attribution.

### 7.3 Metrics
- **Primary:** install rate (installs ÷ product page views), per variant, per locale.
- **Countermetrics (guardrails — conversion gains must survive quality):** D1/D7 retained installs, first-value rate, crash-free sessions, refund rate, support contacts, review sentiment/rating delta. Creative lift that hurts these is not a win (rule `store-listing-8`).

### 7.4 Decision and stop rules (pre-register before each test)
- Minimum run: 90 days or until each variant has enough impressions (Apple estimates this in PPO; small apps may need the full 90 days). Do not stop early because a variant "looks" ahead.
- Win: treatment install rate ≥ +5% relative vs control with 95% confidence interval excluding zero (p < 0.05), **and** no countermetric regression beyond pre-set tolerance (e.g., D1 retention or first-value rate not worse than −2 pp; refund/support not worse than +10% relative).
- Early stop only for clear harm: guardrail regression beyond tolerance with significance, or App Review/compliance issue.
- Tie or ambiguous: keep control, don't ship the treatment.

### 7.5 Rollback and readback
- Keep control live until a test wins under 7.4; then submit the winning metadata/screenshots via App Store Connect (metadata-only change needs review; no new build required unless screenshots require one).
- Rollback: if within 4 weeks post-ship any countermetric breaches tolerance, revert to the previous listing via App Store Connect and re-test.
- Readback: after publish, verify the live page per territory shows the exact shipped metadata, screenshot pack, and localization set (region-matched device check); re-measure install rate and countermetrics at 30/60/90 days to confirm the gain persisted and quality held.

---

## 8. Compliance and source verification checklist (before submitting)

- [ ] Capture current live listing from App Store Connect (title, subtitle, description, keywords, screenshots, price, IAPs, Data Safety, age rating) — A5.
- [ ] Walk the shipped build and confirm each claim in Section 5, including streak reset behavior and weekly-report fields.
- [ ] Audit for social/coaching code paths or third-party services; confirm absence matches the "no social / no coaching" claims.
- [ ] Confirm Data Safety form and privacy policy match "data stays on your device" (A4) or rewrite the claim.
- [ ] Confirm pricing/subscription disclosures (if any) match App Store Connect settings and local law per territory.
- [ ] Validate all screenshot dimensions, safe zones, overlays, alt text, and localized variants against the production pack acceptance tests.
- [ ] Confirm title ≤ 30 chars and subtitle ≤ 30 chars in every launched locale; description ≤ 4,000 chars.
- [ ] Age rating and content rating consistent with screenshots and description.

## 9. Handoffs

| Handoff | Consumer | Contract |
| --- | --- | --- |
| Screenshot production pack (6 screenshots × locales, resolutions in Section 4) | `produce-product-assets` | Exact rendered files, per-file digests, localized/accessibility variants, safe zones, claim-evidence match |
| Final sealed listing revision (metadata + accepted asset pack) | `build-distribution-readiness` | Digest-pinned package; submitted/live readback verification |
| Experiment results | analytics/retention owners | Variant wins + countermetric guardrail data, 30/60/90-day readback |

## 10. Open questions

1. Real app display name and current live listing (A1, A5).
2. Pricing model and whether IAP/subscription disclosure is required (A2).
3. Local vs iCloud storage for the privacy claim (A4).
4. Installed-locale data to confirm launch locales (A6).
5. Analytics capability for first-value rate and retained-install guardrails (A7).

Once these are answered, update this plan's assumptions to `supported`, produce the asset pack, and seal the listing revision.
