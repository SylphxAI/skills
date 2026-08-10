# Forecast: Mobile app launch before 2026-12-31

- **Forecast:** 35% probability of launch before 2026-12-31 (credible range 15–60%)
- **Timestamp:** 2026-08-10 (UTC) — horizon ~143 days

## Question contract

- **Event:** The company will launch the mobile app before 2026-12-31, where "launch" means publicly available on a major app store (Apple App Store or Google Play) by 2026-12-31T23:59:59Z.
- **Resolution source:** Official company announcement and/or live store listing.
- **Ambiguity rules:** This workspace defines neither "the company" nor "the mobile app". I assume a generic company with an active initiative to ship a consumer mobile app. If no such initiative exists, the probability is near zero. Partial launches (beta-only, private TestFlight, or web app) do not count.

## Base rate (outside view)

- Reference class: software product / first mobile app launches attempted on a ~4–5 month horizon. Industry project data (Standish CHAOS) shows roughly 30–40% of projects deliver on time within scope, and first-time app launches frequently slip or get canceled; base rate for a 5-month ship from a committed team is roughly 35–40%.
- Provenance/limits: base rates are from general industry data (memory-derived, not re-verified this session); company-specific factors would shift this materially.

## Decomposition (conditional branches, not independent)

1. Company has a defined, committed mobile app initiative: ~65%
2. Development + QA completes in time for submission (by ~mid-November): ~60% conditional on 1
3. Store submission and approval clear by the deadline (holiday-season review slowdowns possible): ~85% conditional on 2

Combined ≈ 0.65 × 0.60 × 0.85 ≈ 0.33 → rounded to **35%**. The range is wide because the branches are dependent and no company-specific evidence exists.

## Evidence and assumptions

- **For:** 4.5 months is enough for a scoped MVP; store approval typically takes days to weeks; the deadline creates a forcing function.
- **Against:** Most app projects miss announced dates; scope, team size, and prioritization are unknown; end-of-year internal slowdowns and app-review queues add risk.
- **Assumptions:** a committed team of at least 1–3 engineers, defined scope, no regulatory or backend dependencies, and launch means public store availability.
- **Update triggers:** defined roadmap or beta release raises the estimate; canceled initiative, no team, or scope freeze lowers it toward 5–15%.

## Resolution and learning

- Score with Brier score at resolution. One forecast is not calibration evidence; treat this as one point in a broader set.
