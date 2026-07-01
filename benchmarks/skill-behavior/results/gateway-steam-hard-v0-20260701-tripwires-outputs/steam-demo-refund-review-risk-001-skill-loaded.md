```text
Game/launch context: Indie title entering Steam Next Fest with public demo, launch planned post-festival. Single-player focus with planned DLC. Markets: NA, EU, LATAM, SEA, JP, KR, CN (price-tier sensitive).

Release strategy: Festival demo → wishlist conversion → launch at full price with no launch discount. Two cosmetic DLCs in months 2-3; no gameplay DLC.

Launch calendar:
- T-8w: Coming-soon live, capsule/trailer/tags audit, demo scope locked, pricing matrix drafted -> product/marketing, gate: store-claim audit signed
- T-6w: Crash/perf/save telemetry live, support macros, community rules, creator shortlist -> eng/community, gate: telemetry dashboard owned
- T-4w: Demo build frozen, Next Fest submission -> production, gate: P0 crash/save/onboarding closed
- T-3w to T-1w: Streamer keys after stable build, embargo note, refund/review playbook, hotfix rehearsal -> release/community, gate: policy matrix approved
- Next Fest (3-7 days): Hourly demo health, daily end-card/wishlist review, daily bug triage -> live ops, gate: demo-to-wishlist starter ≥8-12%
- Launch day: Hourly checkout/server/crash/refund/review/support -> release mgr, gate: hotfix/rollback decision ledger live
- Days 1-3: Twice-daily triage; days 4-7 daily readout -> live ops/product, gate: every starter threshold has an owner

Readiness matrix:
- Store page: Capsule + trailer segment 1 show real loop, not mood. Tags match demo scope (rule steam-1, steam-5). Screenshot 1 = first 60s gameplay.
- Build/platform: Cloud save create/load/delete/conflict/restore across two devices and one build upgrade (steam-6). Controller glyphs, remap, pause, font legibility on Deck and desktop. Localization claims match shipped strings.
- Community/support: Pinned known-issues, bug-report template, moderation rules with one named owner, response SLA <24h on launch week (steam-8).
- Launch operations: Crash report includes build/hw/driver/scene; perf budget for first session, worst scene, loading (steam-11). Hotfix + rollback rehearsed with save-migration safety.

Technical gates:
- Crash reporting -> reports carry build, hw, driver, scene; owner Eng; proof: sample payload + dashboard link
- Performance -> first-session and worst-scene FPS/loading budgets met on min-spec and Deck; owner Tech; proof: perf log per scene
- Cloud save -> restore + rollback tested across build upgrade; owner Eng; proof: test matrix
- Controller/Steam Deck -> menus, gameplay, remap, glyphs, pause verified; owner QA; proof: build verification + Deck session
- Hotfix/rollback -> promotion, patch notes, rollback, save compat rehearsed; owner Release; proof: rehearsal log
- Server/multiplayer (if any) -> soak covers peak + degraded region; owner SRE; proof: load-test report

First-week decision thresholds (replace with studio targets before launch):
- Crash-free sessions -> below 99.0% launch or >0.5pp drop post-patch -> hotfix/rollback, owner Eng
- Refund rate -> >25% above plan or defect cluster >20% of sampled refunds -> fix defect or store-copy change, owner Release
- Negative review themes -> repeated theme in 10+ credible reviews or >15% of new negatives in 24h -> public response + patch, owner Community
- Demo-to-wishlist -> high-intent source <8-12% or end-card CTR <20% -> retune end-card + store CTA, owner Marketing
- D1 cohort retention -> below target by >20% or tutorial completers not outperforming -> onboarding fix, owner Design
- Support tickets -> top duplicate theme >25% or SLA miss twice -> pinned FAQ/macro, owner Support
- Patch outcome -> no improvement in target metric within 24h -> rollback or pause promotion, owner Release

P0 blockers:
- Any unowned crash reporting, save migration, or rollback rehearsal -> owner Release, proof: rehearsal log
- Demo promising features absent at launch -> owner Design, proof: demo-to-store audit
- Store tags exceeding build reality (controller, cloud, language, Deck) -> owner Product, proof: settings audit
- No moderation owner for festival/launch traffic -> owner Community, proof: rules + roster

Commercial policy:
- Regional pricing -> tiers reviewed per region; avoid parity shock in LATAM/SEA; rollback path = price update + comms; evidence: region sheet + owner approval
- Launch discount -> no launch discount; first sale ≥6 weeks post-launch to avoid training wait; rationale doc; rollback path = sale calendar adjustment
- DLC roadmap -> cosmetic-only at launch; base game must read complete; wording audited to avoid "cut content" perception; rollback = roadmap comms
- Streamer keys/embargo -> keys released only after stable build + known-issues note + support coverage; one page embargo brief
- Refund/review posture -> triage by playtime, country, source, build; truthful known-issue posts over defensive replies; never invent platform policy (steam-12)

Wishlist/review/learning plan:
- Next Fest beats: demo launch, mid-fest dev log, end-card CTA, festival close recap -> metric: wishlist added per beat and source
- Post-fest: 2 dev updates before launch with new footage + controller/Deck proof -> metric: reactivation of aged wishlists
- Launch: hold first review wave 48h, no paid review solicitation -> metric: review volume vs sales, theme mix
- Days 4-7: cohort retention + refund + patch outcome readout -> output: roadmap adjustment or copy/price change

Review-bombing / incident response:
- Signal: review velocity spike unrelated to defect -> action: group by theme/source/time, freeze defensive replies, separate valid defects from abuse, preserve evidence, file Steam reporting, publish calm clarification or known-issue, keep patch notes independent from abuse response; if valid defect found, fix first, then moderation.
```
