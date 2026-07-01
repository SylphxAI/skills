Game/launch context:  
Indie multiplayer PC game on Steam; likely premium base game with planned DLC. Launch depends on matchmaking/session stability, anti-cheat trust, first-session fun, and community sentiment.

Release strategy:  
Coming Soon → demo/playtest beat → creator preview under embargo → launch with regional pricing + launch discount → first-week hotfix cadence → DLC roadmap only after base-game stability is proven.

Readiness matrix:
- Store page:
  - Capsule, short description, screenshots, trailer, tags must communicate the same promise: multiplayer genre, match/session format, player count, core loop, tone, and progression.
  - Trailer must show real gameplay in the first 5–10 seconds: combat/co-op/competition, UI, match flow, win/loss state.
  - Tags must match actual player intent; avoid misleading tags that create refund/review risk.
  - Store page must clearly state: online multiplayer requirements, solo/offline availability if any, controller support, anti-cheat requirement, supported languages, DLC positioning.
  - DLC plan should be framed as future optional content, not content withheld from the base game.
  - Achievements/cloud saves claims must match launch build.

- Build/platform:
  - Multiplayer launch blockers: matchmaking failures, disconnects, party issues, region latency, server capacity, progression loss, desync, crashes, anti-cheat false positives.
  - Anti-cheat must be tested for install friction, false positives, Steam Deck/Linux compatibility claims, privacy expectations, and uninstall behavior.
  - Cloud saves must protect progression/config where applicable; test conflict resolution and save corruption recovery.
  - Achievements should unlock reliably, avoid grind-only launch achievements, and not encourage toxic play.
  - Demo should teach the core loop quickly and expose real match quality; do not overpromise final population or content volume.
  - Regional pricing and launch discount must be documented before release to avoid reactive price changes.

- Community/support:
  - Community hub must be ready before traffic: pinned FAQ, bug report format, known issues, server status, rules, moderation escalation, ban/appeal path.
  - Support macros needed for crashes, refunds, anti-cheat errors, matchmaking, DLC questions, controller/cloud/achievement issues.
  - Review bombing plan: distinguish legitimate issue spikes from coordinated abuse; respond with facts, patch timelines, and Steam reporting only when appropriate.
  - Moderation owner must be assigned for launch day and first weekend.

- Launch operations:
  - Hotfix path must be rehearsed: branch management, rollback plan, server config toggles, save/progression migration safety.
  - Patch cadence: launch day monitoring, first 24h emergency hotfix window, first-week daily triage, public patch notes for every player-facing change.
  - Creator/influencer embargo should lift after servers are stable or with clear preview-server constraints. Do not embargo so late that creators cannot prepare launch coverage.
  - Telemetry required: store views, wishlists, demo starts/completions, matchmaking success, crash rate, disconnects, first-session completion, refunds, review themes.

P0 blockers:
- Store page promises features not in launch build -> Product/Marketing owner, proof: store copy vs build feature checklist.
- Multiplayer instability: matchmaking, parties, disconnects, server capacity, desync -> Engineering/Backend owner, proof: load test, soak test, launch capacity plan.
- Crash/performance issues in first session -> Engineering/QA owner, proof: crash-free session rate target met across min/recommended specs.
- Save/progression loss or cloud save conflicts -> Engineering/QA owner, proof: save migration/conflict test matrix.
- Anti-cheat false positives or unclear install/runtime behavior -> Engineering/Community owner, proof: false-positive test results, FAQ, appeal process.
- Demo misrepresents final game or fails onboarding -> Product/QA owner, proof: demo completion, survey themes, tutorial funnel.
- No launch-week moderation/support coverage -> Community owner, proof: schedule, macros, escalation rules, SLA.
- Regional pricing/launch discount undecided -> Business owner, proof: approved price table, discount rule, future sale posture.
- Creator embargo timing unclear -> Marketing/Comms owner, proof: embargo date, allowed footage rules, review/preview key list.
- No review-bombing/sentiment triage process -> Community/Comms owner, proof: theme tracker, response templates, Steam escalation criteria.

Wishlist/review plan:
- Demo before launch -> metric: demo start-to-completion rate, wishlist add rate after demo, top complaint themes; timing: 4–8 weeks pre-launch.
- Steam festival/dev update beat -> metric: wishlist velocity, store page CTR, demo conversion; timing: pre-launch beat tied to playable proof.
- Creator preview under embargo -> metric: creator coverage volume, demo/key redemption, wishlist lift by source; timing: embargo lifts 3–7 days before launch unless server risk demands launch-day lift.
- Launch discount -> metric: wishlist-to-purchase conversion, regional sales mix, refund rate; timing: launch week only, with documented future discount strategy.
- First-session satisfaction -> metric: matchmaking success, crash-free rate, session length, tutorial completion, first achievement unlock; timing: launch day + first 72h.
- Refund-risk tracking -> metric: refunds by playtime bucket and reason theme; timing: daily first week.
- Review triage -> metric: review sentiment by theme/build version, response-needed count, resolved issue count; timing: every 4–6 hours launch day, daily after.
- Patch notes cadence -> metric: known issue closure rate, review sentiment recovery, support ticket reduction; timing: hotfix as needed, public notes for every patch.
- DLC communication -> metric: negative review mentions of “cut content” or monetization; timing: mention roadmap lightly at launch, detail DLC only after base stability.
