Game/launch context:  
Indie PC game entering Steam Next Fest with public demo, wishlist campaign, launch pricing/discount planning, DLC roadmap, streamer outreach, early reviews, cloud saves, controller support, and first-week live ops.

Release strategy:  
Use Next Fest as the main validation and wishlist-conversion beat. Demo must prove the core loop, set accurate expectations for full release, collect feedback, and reduce refund/review risk before launch. Do not overpromise DLC, controller/cloud support, or roadmap items unless they are verified in build.

Readiness matrix:

- Store page:
  - Capsule, short description, trailer, screenshots, tags, and demo must communicate the same genre promise within seconds.
  - First trailer segment should show real gameplay, UI, combat/puzzle/building/etc. loop, not only mood or logos.
  - Tags must match actual play experience; avoid broad/misleading tags that invite refunds.
  - DLC roadmap should be framed as planned/post-launch, not required to complete the base game.
  - Regional pricing rationale needed before launch discount approval.
  - Required evidence: store page review, tag audit, trailer/screenshot checklist, pricing sheet.

- Build/platform:
  - Demo must teach the core loop within the first session and end with a clear wishlist call-to-action.
  - Cloud saves, controller support, achievements, localization, and system requirements must match actual shipped/demo behavior.
  - Build rollback must be tested before Next Fest traffic.
  - Save compatibility plan needed if demo saves carry into full game.
  - Required evidence: QA pass, controller matrix, cloud save test, crash/performance report, rollback rehearsal, known-issues list.

- Community/support:
  - Community hub needs pinned posts before Next Fest: demo feedback, bug report format, known issues, roadmap expectations, moderation rules.
  - Assign owner for Steam forums, Discord, reviews, streamer issues, and bug triage.
  - Prepare support macros for crashes, save issues, controller problems, performance, refunds, and roadmap questions.
  - Streamer keys should use controlled distribution with embargo/coverage timing, key abuse monitoring, and a press kit.
  - Required evidence: moderation rota, response SLA, support templates, streamer list, key policy.

- Launch operations:
  - First-week plan must include triage cadence, hotfix criteria, rollback owner, patch notes, review response policy, and telemetry review.
  - Separate Next Fest demo issues from full-launch blockers.
  - Early reviews should be monitored by theme, not answered defensively.
  - Refund risk must be tracked by crashes, performance, onboarding confusion, misleading expectations, and missing settings.
  - Required evidence: live-ops calendar, triage board, hotfix checklist, rollback runbook, review/refund dashboard.

P0 blockers:

- Demo crashes, save loss, or progression blockers -> owner: tech lead; proof needed: clean QA pass and crash telemetry below agreed threshold.
- Store page promises features not present in demo/full build -> owner: marketing/product; proof needed: feature-claim audit against latest build.
- Controller support claimed but incomplete across menus/gameplay -> owner: engineering/QA; proof needed: controller test matrix and remapping/settings validation.
- Cloud saves enabled without restore/conflict testing -> owner: platform engineer; proof needed: cross-device save-create/load/delete/conflict test.
- No rollback/hotfix path before Next Fest -> owner: release manager; proof needed: successful rollback rehearsal and deployment checklist.
- No community moderation owner during festival traffic -> owner: community lead; proof needed: rota, escalation path, response SLA.
- Regional pricing unreviewed or inconsistent with value/discount plan -> owner: business/product; proof needed: pricing table and launch discount rationale.
- Demo onboarding unclear or core loop not reached quickly -> owner: design; proof needed: demo completion/tutorial metrics and playtest notes.
- Misleading tags, trailer, or screenshots creating refund risk -> owner: marketing; proof needed: tag/store asset review with corrections.
- Streamer keys sent without build stability or guidance -> owner: PR/community; proof needed: key list, press kit, known-issues note, contact path.

Wishlist/review plan:

- Launch Next Fest demo with a clear end-card and in-game wishlist prompt -> metric: demo-to-wishlist conversion; timing: festival start.
- Post a Steam event/update before, during, and after Next Fest -> metric: page visits, wishlists, comments; timing: T-7, mid-fest, T+1.
- Track demo funnel: start, tutorial complete, session length, crash, wishlist click -> metric: completion and drop-off; timing: daily during festival.
- Run rapid feedback triage into must-fix, expectation-setting, and roadmap buckets -> metric: top 10 issue themes; timing: daily.
- Use streamer beat to drive demo traffic, not vague awareness -> metric: source-attributed demo starts/wishlists; timing: first 72 hours of festival.
- Keep DLC roadmap visible but nonessential -> metric: sentiment/questions about content value; timing: store/community updates.
- Prepare launch discount and regional pricing communication internally -> metric: conversion by region, refund rate by region; timing: pre-launch and first week.
- Monitor early reviews by theme and build version -> metric: negative-review themes, response-needed count; timing: hourly launch day, daily first week.
- Publish known issues and patch notes quickly -> metric: reduced duplicate reports, sentiment recovery; timing: launch day and each hotfix.
- Track refund signals by playtime bucket and reason -> metric: crash/performance/onboarding/misexpectation share; timing: first week.
