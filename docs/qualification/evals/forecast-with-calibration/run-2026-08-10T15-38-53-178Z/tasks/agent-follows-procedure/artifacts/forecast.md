# Probabilistic Forecast Record

Method: `forecast-with-calibration` (SKILL.md + `references/probabilistic-forecasting-methods.md`).
Forecaster: /root (single estimator; see Aggregation note in Resolution and learning).
File created: 2026-08-10T15:38:53Z.

---

## Question contract

- **Outcome (YES):** The company publicly releases its mobile app — evidenced by a public release announcement — with announcement timestamp strictly **before 2026-12-31T00:00:00.000Z**. Outcome is binary: YES or NO.
- **Horizon:** 2026-08-10T15:38Z → 2026-12-30T23:59:59Z ≈ 142 days (≈ 4.7 months) remain.
- **Resolution source:** The public release announcement — an official company channel stating the app is publicly available. Official channels: company press release, official blog or newsroom post, official social media account, or an app-store listing (iOS App Store / Google Play) marked publicly available. Third-party news reports alone do not resolve.
- **Ambiguity rules:**
  - *Referent:* "The company" and "the mobile app" are not named in this record. The owner must name the company and the specific app; if no unambiguous referent is registered with the owner by the deadline, the question resolves **NO** (fail-closed — no referent, no verifiable announcement).
  - *Launch:* Public availability to the general public in at least one app store. Invite-only TestFlight/beta or staged soft-launch in a test market does **not** count unless the announcement describes it as a public release.
  - *Intent vs. launch:* An announcement of intent, roadmap, or "coming soon" does not count. The announcement must declare the app launched/available.
  - *Timing:* Earliest official announcement timestamp wins. An announcement before the deadline that declares public availability resolves YES even if the store listing appears after the deadline; a store listing appearing before the deadline also resolves YES (store availability is inherently public).
  - *Cancellation or no-show:* If the company publicly cancels the app, or no qualifying official announcement exists by 2026-12-31T00:00Z, the question resolves **NO** at the deadline (early NO only if the company makes an official cancellation announcement).
  - *Disputed authenticity:* Only official channels count; if the only evidence is unofficial, resolves NO.
- **Owner:** The question author (commissioning party) owns the question and must register the referent. The forecaster owns maintenance (updates, resolution, scoring) until the deadline.

---

## Forecast

- **Probability:** P(YES) ≈ **0.30** (central estimate). 80% credible interval **[0.12, 0.48]**. This is a coarse prior, not a precise number; precision is unsupported by evidence at this time.
- **Timestamp:** 2026-08-10T15:38:53Z (initial estimate).
- **Base rate (outside view, established before vivid details):**
  - Standish CHAOS reports (2004–2009): only ~29–32% of software projects deliver on time, on budget, with required features; most are late or cut scope (sources: HBS faculty research citing CHAOS 2004; IEEE paper citing CHAOS Summary 2009).
  - Industry claims (2026, weak provenance — marketing blogs): ~70% of mobile app projects fail to launch, launch with critical issues, or are abandoned mid-development (Stackademic, 2026-06); typical app development is 3–9 months from kickoff to launch, with simple/MVP apps at 2–4 months and complex apps stretching to 18 months (MobiLoud, 2026-05); idea-to-launch for a startup MVP ≈ 14–22 weeks (TimelineDigi, 2026-06).
  - Relevance limits: CHAOS figures are older and cover all project sizes; the 2026 figures are directional only. The ~4.7-month window is feasible for an MVP-scope app but tight for complex ones, and end-of-year targets are frequently aspirational (Q4 crunch, store review 3–7 days, holiday-season queue).
  - Adjusted base rate for "launch by an announced end-of-year target": ≈ 0.30–0.35 on-time delivery, slightly better than raw CHAOS because the deadline permits feature cuts and single-platform MVP scope; capped below 0.5 because late delivery is the modal outcome.
- **Model / decomposition (no double-counting):** P(YES) = P(A) × P(B|A) × P(C|B)
  - A — Referent exists and is committed to a mobile app program: **0.85**. The question's wording presupposes a real program, but identity and commitment are unverified.
  - B|A — Reaches public launch before the deadline: **0.38**. Anchored on the ~0.30–0.35 base rate, nudged up for scope-cut flexibility; capped below 0.5.
  - C|B — A public release announcement accompanies the launch: **0.92**. Launches are almost always publicly announced; small residual chance of a silent release or delayed announcement.
  - Product: 0.85 × 0.38 × 0.92 ≈ **0.30**. Dependence noted: B and C are weakly coupled (announced launch dates correlate with launch readiness); treating them as independent is an approximation whose error is inside the stated interval.
- **Sensitivity:**
  - Referent confirmed (named company + funded app team) → 0.40–0.50.
  - Visible progress (beta, screenshots, jobs, roadmap) → 0.40–0.55.
  - No evidence of any program by 2026-11-01 → ≤ 0.15.
  - Official delay/cancellation → ≤ 0.05.

---

## Evidence and assumptions

- **Supports (raises P):**
  - Timeline is feasible: 4.7 months is inside the typical 3–9 month build range for MVP-scope apps.
  - The question presupposes an existing app program ("the mobile app"), implying the referent has intent.
  - App-store availability is inherently public, making the resolution source almost always present at a real launch (C ≈ 0.92).
- **Objections (lowers P):**
  - Base rates: only ~29–35% of projects deliver on time; ~70% of app projects reportedly fail to launch or get abandoned.
  - Referent is unnamed and unverified — if there is no committed program, P collapses.
  - End-of-year deadline adds Q4 risk: holiday store-review queues, QA/staffing competition, and a common pattern of slipping launches into Q1.
  - Resolution rule is strict: an app that launches but is never officially announced, or announced only via third parties, resolves NO.
- **Unknowns:**
  - Company identity; app scope/complexity; team size and funding; existing progress; platform(s); regulatory or compliance requirements (payments, privacy, age rating); whether an internal launch date exists; whether "the mobile app" is even in development.
- **Update triggers (evidence changes, not preference changes):**
  - Owner registers company/app identity → recompute A (and sharpen B).
  - Public beta, TestFlight, screenshots, roadmap, or launch-date announcement → raise to 0.40–0.55.
  - Store "coming soon" / pre-registration page → intent confirmed (A → ~1), modest raise.
  - Official delay, cancellation, layoffs in the app team, or funding problems → lower sharply.
  - Checkpoints: **2026-11-01** (if no credible progress signals, set ≤ 0.15) and **2026-12-15** (if no announcement yet, set ≤ 0.05; late-window launches are rare).
  - Deadline: resolve at 2026-12-31T00:00Z against the predeclared source.

---

## History

| Timestamp (Z) | Estimate | Interval | Evidence causing change |
|---|---|---|---|
| 2026-08-10T15:38:53 | 0.30 | 80% [0.12, 0.48] | Initial estimate: base-rate-first (CHAOS ~29–35% on-time; ~70% app-project launch failure), decomposition A×B×C, no vivid case details available because referent is unnamed. |

Rule: every estimate is stored with timestamp and reason; material evidence updates the record; the original question and resolution rule are never rewritten.

---

## Resolution and learning

- **Resolution procedure (predeclared):** At 2026-12-31T00:00Z, check the owner-registered company's official channels (press/blog/social) and app stores for the named app. Any official announcement with timestamp < 2026-12-31T00:00:00.000Z declaring public availability → YES; otherwise NO. Two independent lookups; record evidence links and announcement timestamps in this file.
- **Scoring (predeclared, never changed after seeing the outcome):** Brier score for the binary event, (f − o)², primary; logarithmic score secondary. If the referent was never registered, the forecast is voided and scored as a resolution defect, not as a calibration failure.
- **Calibration context:** This is a single forecast. One outcome does not establish skill; calibration and discrimination are judged across a set of ≥10 comparable launch-timing forecasts maintained by the owner.
- **Aggregation note:** Skill step 5 (independent elicitation from multiple estimators before sharing numbers) was deferred: this forecast is non-material — no decision value or stakes were identified. If the owner attaches a decision to it, re-elicit with ≥2 estimators using distinct reference classes before updating.
- **Failure analysis (to run after resolution):** Attribute any error to one of: base rate miss, decomposition error (dependence misweighting), misread evidence, stale update, overconfidence (interval too narrow), or resolution defect (ambiguous referent, announcement not found). Record the finding here.
- **Reusable update for future forecasts:** (a) app-launch-by-announced-target base rate ≈ 0.30 (on-time delivery) — reuse for similar launch-timing questions; (b) resolve referent identity before eliciting — unnamed referents force wide intervals and fail-closed NO rules; (c) end-of-year deadlines carry Q4 slippage risk worth a structural discount.
