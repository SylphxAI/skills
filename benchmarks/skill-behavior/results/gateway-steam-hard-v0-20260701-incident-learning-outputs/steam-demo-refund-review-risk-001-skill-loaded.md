Game/launch context:  
Indie PC game entering Steam Next Fest with public demo, wishlist campaign, streamer outreach, regional pricing, DLC roadmap messaging, cloud saves, controller support, early review planning, and launch-week live operations.

Release strategy:  
Use Next Fest as the expectation-setting and wishlist-conversion beat. Do not scale traffic, keys, or launch discount until the demo proves stability, onboarding clarity, store-page accuracy, and support readiness.

Launch calendar:
- T-8 to T-6 weeks: Store page, trailer, screenshots, tags, short description, demo scope reviewed -> Owner: product/marketing -> Gate: store promise matches playable build.
- T-6 to T-4 weeks: Telemetry, crash reporting, cloud save tests, controller QA, community rules, support macros ready -> Owner: engineering/community -> Gate: demo can generate actionable feedback.
- T-4 to T-2 weeks: Next Fest demo lock, onboarding test, performance pass, creator list, streamer key policy -> Owner: production/QA/community -> Gate: no P0 crash/save/controller/performance blockers.
- T-14 to T-7 days: Regional pricing, launch discount, DLC wording, refund/review response, embargo/key messaging signed off -> Owner: business/release -> Gate: commercial policy matrix approved.
- Next Fest live: Monitor demo starts, crashes, completion, wishlists, forum themes, streamer issues daily -> Owner: release/community -> Gate: demo defects triaged into fix/store-copy/roadmap buckets.
- Launch day: Hourly checks on crash rate, reviews, refunds, support, community, cloud saves, controller issues -> Owner: release manager -> Gate: hotfix/rollback decision ledger active.
- Days 1-3: Twice-daily hotfix review and patch notes -> Owner: release/engineering/community -> Gate: critical issues resolved or publicly acknowledged.
- Days 4-7: Daily learning review -> Owner: product/live ops -> Gate: roadmap, store copy, pricing, and patch cadence adjusted from evidence.

Readiness matrix:
- Store page:
  - Audit capsule, trailer, screenshots, tags, short description, languages, controller/cloud/achievement claims.
  - Trailer must show real gameplay early.
  - Tags must match player search intent, not aspiration.
  - DLC roadmap must not imply missing base-game content.
- Build/platform:
  - Demo and launch build need crash reporting, performance telemetry, save integrity checks, controller verification, cloud save migration/restore tests, and rollback rehearsal.
  - Claimed features must be tested: controller support, cloud saves, achievements, localization, system requirements.
- Community/support:
  - Community hub needs pinned bug report format, known issues, moderation rules, FAQ, patch-note cadence, and escalation owner.
  - Streamer keys should go out only after a stable demo/build and with known-issues notes.
- Launch operations:
  - Define thresholds for hotfix, rollback, store-copy change, pinned issue, and public post.
  - Maintain first-week decision ledger by build version, hardware class, country, source, and review/refund theme.

Technical gates:
- Crash reporting -> Metric/threshold: reports include build, hardware, driver, scene/state, repeat count; target crash-free sessions agreed before public demo -> Owner: engineering -> Proof: dashboard tested with seeded crash.
- Demo onboarding -> Metric/threshold: tutorial/core loop completion rate meets internal target; top confusion themes triaged -> Owner: design/product -> Proof: playtest report and forum/survey synthesis.
- Performance -> Metric/threshold: first session, worst scene, loading, and settings menu tested on min/recommended specs -> Owner: QA/engineering -> Proof: hardware matrix and FPS/loading budget.
- Cloud saves -> Metric/threshold: create/load/delete/conflict/restore and version upgrade tested across devices -> Owner: engineering/QA -> Proof: save integrity test log and rollback plan.
- Controller support -> Metric/threshold: menus, gameplay, pause, remap, glyphs, text legibility verified -> Owner: QA -> Proof: controller test matrix.
- Hotfix/rollback -> Metric/threshold: build promotion, rollback, patch notes, and save compatibility rehearsed -> Owner: release manager -> Proof: dry-run record.
- Community triage -> Metric/threshold: response SLA, duplicate-ticket grouping, moderation escalation path live -> Owner: community -> Proof: macros, pinned posts, triage board.

P0 blockers:
- First-session crash spike or no crash telemetry -> Owner: engineering -> Proof needed: crash-free session dashboard.
- Save loss, corrupt migration, or unsafe rollback -> Owner: engineering/QA -> Proof needed: restore and upgrade tests.
- Store claims not supported by build, including cloud, controller, localization, achievements, DLC wording -> Owner: product/marketing -> Proof needed: claim-to-build audit.
- Confusing demo onboarding that prevents understanding the core loop -> Owner: design -> Proof needed: completion/playtest data.
- No community/moderation owner during Next Fest or launch week -> Owner: studio lead/community -> Proof needed: rota and escalation plan.
- Streamer keys planned for unstable or unreviewed build -> Owner: marketing/release -> Proof needed: key approval gate.

Commercial policy:
- Regional pricing -> Rationale: price should match value, audience, and regional expectations -> Evidence: region price sheet and approval owner -> Rollback/communication: adjust only with clear rationale; monitor country-specific refund/review themes.
- Launch discount -> Rationale: conversion goal, not automatic discounting -> Evidence: launch discount calendar and future sale posture -> Rollback/communication: avoid surprise deeper discounts immediately post-launch.
- DLC roadmap -> Rationale: optional future content; base game must feel complete -> Evidence: roadmap wording review -> Rollback/communication: revise copy if players perceive cut content.
- Refund/review risk -> Rationale: treat as signal of defects or mismatch -> Evidence: refund themes by playtime, hardware, country, source -> Rollback/communication: known-issues post, hotfix, or store-copy correction.
- Streamer keys/embargo -> Rationale: keys only after stable build and support coverage -> Evidence: key list, build version, known-issues note -> Rollback/communication: pause keys if defect emerges.

Wishlist/review/learning plan:
- Next Fest demo CTA -> Metric: demo-to-wishlist conversion, source, session length, tutorial completion -> Timing: daily during festival.
- Store page audit -> Metric: page views to wishlist, tag/source/country split -> Timing: before and after trailer/copy changes.
- Demo feedback triage -> Metric: crash rate, completion, top forum/survey themes -> Timing: daily during Next Fest, final report within 72 hours.
- Launch conversion -> Metric: wishlist-to-purchase by wishlist age, country, discount, source -> Timing: launch day and week one.
- Reviews -> Metric: sentiment/theme by build version and feature claim -> Timing: hourly launch day, twice daily days 1-3, daily days 4-7.
- Refunds -> Metric: playtime bucket, crash/performance/save/controller/store-mismatch theme -> Timing: daily first week.

Review-bombing / incident response:
- Sudden negative review spike -> Triage valid defects separately from coordinated abuse -> Path: freeze defensive replies, group by theme/time/source, preserve evidence, escalate moderation/reporting, publish calm status post.
- Repeated defect theme in reviews -> Action: acknowledge, give fix/rollback ETA if known, pin known issue, ship patch notes.
- Store-expectation mismatch -> Action: change tags/copy/trailer/screenshots before buying more traffic.
- Community abuse or misinformation -> Action: enforce posted rules, keep moderation separate from defect communication, maintain transparent patch cadence.
