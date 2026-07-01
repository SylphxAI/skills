```text
Game/launch context: Co-op multiplayer, day-one traffic spike risk, matchmaking capacity, anti-cheat false-positive risk, save-migration corruption, refund pressure in first 2h, disconnect complaints.
Release strategy: Staged regional enablement, hotfix-on-call, known-issue transparency, no promised launch discount while infrastructure proves out.
Launch calendar:
- T-24h: Build lock, save-migration freeze, anti-cheat whitelist dry-run -> release manager
- T-4h: Region-by-region matchmaking enable, anti-cheat monitor live, rollback rehearsal -> SRE/live-ops
- T-0: Patch notes, known-issues pin, support rotation, sentiment monitor -> community
- +2h: First refund/crash/disconnect review -> product/release
- +24h/+72h: Twice-daily decision ledger reviews -> release manager
- D4-D7: Daily learning review, roadmap or copy changes -> product

Readiness matrix:
- Store page: Tags/capsule/trailer must promise co-op loop honestly; disconnect/migration disclaimers in known-issue only, not copy.
- Build/platform: Matchmaking capacity, anti-cheat precision, save integrity, controller glyphs verified.
- Community/support: Bug-report template, disconnect/migration macros, moderation owner, hourly hub sweeps.
- Launch operations: Decision ledger owner, hotfix/rollback path, regional enable/reduce-traffic switch.
- Creator/press readiness: Embargo includes anti-cheat and migration note; no early keys if anti-cheat calibration incomplete.

Technical gates:
- Crash reporting -> crash-free sessions >=99.0% launch / 99.5% demo (starter); build+hardware+scene tagged -> SRE
- Matchmaking capacity -> peak load tested to 1.5x expected DAU peak; p95 queue <120s; auto-throttle enabled -> SRE
- Anti-cheat precision -> false-positive rate <0.5% of sessions; per-build whitelist; appeals channel ready -> security
- Save migration -> dry-run restore on representative saves; conflict + rollback path tested -> engineering
- Cloud save -> create/load/conflict/restore across build upgrade verified -> QA
- Hotfix/rollback -> rehearsed; save downgrade-safe; rollback rehearsed within 30 min -> release manager

Store/build promise audit:
- Anti-cheat claim -> only if precision proven; remove if false-positive cluster >0.5% -> product/eng
- Co-op/multiplayer promise -> must match real session stability; otherwise soften copy -> marketing
- Save progression claim -> migration gate must be green or copy suppressed -> product
- System requirements/controller/Deck -> verified against build, not spec sheet -> QA
- DLC wording -> base game complete-feeling; no cut-content perception -> product

First-week decision thresholds (starter; replace with studio targets):
- Crash-free sessions <99.0% or >0.5pp drop post-patch -> hotfix or rollback -> SRE
- Matchmaking disconnects >2% or p95 queue >120s -> capacity add, regional throttle, incident post -> SRE
- Anti-cheat false-positive >0.5% of sessions -> whitelist fix, hotfix, unblock script, public note -> security
- Save-corruption reports >=3 distinct users -> freeze migration, rollback path, pinned known-issue -> engineering
- Refund rate in <2h playtime bucket >25% above plan -> defect triage by theme, store copy or build fix -> product
- Negative review theme (disconnect/migration/anti-cheat) >=10 credible or >15% of new negatives in 24h -> public response + patch or copy change -> community
- Support top theme >25% of tickets or SLA miss twice -> pinned FAQ + macro + patch -> support

P0 blockers:
- Save-migration corruption on launch build -> owner: engineering; proof: migration dry-run + restore log
- Anti-cheat false-positive on common configs -> owner: security; proof: telemetry + whitelist coverage
- Matchmaking overload at peak -> owner: SRE; proof: load test report + throttling path
- Refund surge <2h driven by first-session defect -> owner: product; proof: refund-by-theme dashboard
- Disconnect cluster not yet root-caused -> owner: SRE; proof: server/log sample

Commercial policy:
- No launch discount during stability proof window; region pricing unchanged -> rationale: avoid training wait + masking defects -> rollback: can resume promotions after D7 readout
- Creator keys only after anti-cheat + migration gates green; embargo notes anti-cheat calibration and disconnect risk -> build version + known-issue note + support owner + embargo lift at launch
- DLC language audited: no perceived cut content -> evidence: base-game scope doc + copy review

Wishlist/review/learning plan:
- Wishlist-to-purchase conversion tracked by region, demo exposure, age -> metric: post-launch D1/D7 conversion vs demo-exposed cohort
- Reviews themed daily; legitimate defects get fix or roadmap post; coordinated abuse reported separately
- Patch outcome reviewed within 24h; if no improvement, rollback or pause promotion

Review-bombing / incident response:
- Signal: sudden disconnect/anti-cheat theme spike -> separate valid defects from coordinated posting; publish calm known-issue or clarification; freeze defensive replies; preserve evidence; escalate moderation -> report path: Steam moderation + studio comms
- Bug-report format: build, OS/hardware, region/server, repro steps, save/log attach, screenshot/video, expected vs actual, severity
- Support macro: acknowledge, request template, set ETA policy (investigating/fix identified/hotfix in test/rollback live/roadmap), no unapproved timing
- Public update cadence: pinned known-issue refreshed every 6h; patch notes per release; roadmap item if not hotfix-able in 72h
```
