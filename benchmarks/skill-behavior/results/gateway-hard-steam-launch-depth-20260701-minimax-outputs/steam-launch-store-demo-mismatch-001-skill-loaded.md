```text
Game/launch context:
Genre/audience: <TBD>. Stage: Next Fest demo live, launch page draft. Monetization: base game + planned DLC.

Release strategy: Demo first, festival-driven wishlists, launch at "ready" not "dated." DLC framed as post-launch content.

Launch calendar:
- T-8 to T-6 weeks -> Marketing/product: align trailer/screenshot promises with demo and launch build; re-cut trailer to demo scope
- T-6 to T-4 weeks -> Eng/QA: instrument crash/perf/save; controller and cloud-save test matrix; localization audit
- T-4 to T-2 weeks -> Production: close P0 onboarding/tutorial gaps; finalize known-issues; demo-to-launch delta list
- T-14 to T-7 days -> Release/business: regional price, launch discount, DLC wording, creator-key embargo signed off
- Launch day -> Release/community: hourly ledger (crash, refund, review, support, servers)
- Days 1-3 -> Release manager: 2x daily hotfix/rollback review
- Days 4-7 -> Product/live ops: retention, wishlist-to-purchase, refund review, roadmap note

Readiness matrix:
- Store page: trailer overshoots demo/launch scope; screenshots imply controller/cloud; DLC content may read as launch-day
- Build/platform: tutorial under-teaches loop; controller/cloud-save claims need build proof; localization scope unverified
- Community/support: bug-report format, known-issue pin, refund/refund-rate owner needed
- Launch operations: hotfix/rollback rehearsed; review-bombing playbook pending
- Creator/press readiness: press kit, locked demo build, known-issues note required before keys ship

Technical gates:
- Crash reporting live with build/HW/driver/scene tags -> owner Eng -> proof: dashboard + sample payload
- Perf budget: first session, worst scene, loading, settings menu -> owner Eng/QA -> proof: budget sheet + pass on min-spec
- Controller glyphs, remap, pause, text legibility verified on Steam Deck + pad -> owner QA -> proof: test matrix + screenshot
- Cloud save: create/load/delete/conflict/restore across devices and build upgrades -> owner Eng -> proof: restore test + rollback plan
- Localization: verified list with audio vs text vs UI parity -> owner Localization -> proof: coverage matrix
- Tutorial completion tracks the core loop; end-of-loop reward visible -> owner Design/QA -> proof: cohort funnel + playtest video

Store/build promise audit:
- Trailer: cuts imply features not in demo or launch -> fix: re-cut to demo scope, mark "more in final game" card, sync with launch trailer later
- Capsule/short description: must match demo experience -> fix: rewrite to match shipped loop, not roadmap
- Screenshots: imply full controller + cloud-save UI -> fix: confirm claims; if true, keep; if partial, retake or add disclaimer
- Tags: match player search intent -> fix: audit against refund/review themes; remove misleading tags
- Achievements/cloud/controller/lang claims -> fix: gate against build test matrix
- Demo scope vs launch build: features only in demo must ship; features only in launch must be flagged
- DLC wording: anything in screenshots/trailer that is post-launch -> fix: relabel "coming post-launch" or remove from launch assets
- System requirements: derived from measured perf, not assumed
- Settings claim: rebind, accessibility, HDR, ultrawide verified

Expectation-setting fixes:
- Add end-of-demo card: "what's in the full game" vs "what's post-launch DLC"
- Pin known issues covering demo-only tutorial gap, missing controller glyphs, partial localization
- Dev log before Next Fest close: "demo scope vs launch scope vs DLC" with screenshots
- Store FAQ: confirm cloud save, controller, languages at launch; honest DLC list

Refund/review risk controls:
- Symptom tree: tutorial confusion, missing controller glyphs, cloud-save loss, promised-but-missing feature, DLC confusion, regional price shock
- Segment refund rate by playtime bucket, country, source, hardware, build
- Bug-report format: build, OS/HW, region, repro, save/log attach, expected vs actual, severity
- ETA policy ladder: investigating -> fix identified -> hotfix in test -> rollback live -> roadmap
- Response macro: acknowledge, classify, ETA bracket, next update time; no policy invention

Wishlist measurement:
- Track: store_page_viewed, wishlist_added (source: festival/influencer/devlog), demo_started, demo_completed, demo_to_wishlist, demo_to-purchase post-launch
- Decision triggers (internal starter, replace before launch):
  - demo_to_wishlist <8-12% from high-intent source -> fix end-card + trailer promise
  - demo completion <50% or median session <core loop proof -> onboarding redesign
  - negative review theme >10 credible reviews or >15% of 24h negatives -> public response + patch or copy fix

P0 blockers:
- Trailer shows features not in demo or launch build -> owner Marketing -> proof: re-cut + side-by-side demo/build checklist
- Controller/cloud-save claims unverified by build -> owner QA -> proof: test matrix or remove claims
- Localization scope unverified -> owner Localization -> proof: coverage matrix
- Tutorial under-teaches core loop -> owner Design -> proof: completion funnel + playtest
- DLC content implied as launch-day -> owner Product/Marketing -> proof: updated copy + relabeled assets

Commercial policy:
- Launch discount: avoid training "wait for sale"; set conversion goal + threshold to change
- Regional pricing: review tiers; document rationale; no unsupported parity claims
- DLC roadmap: explicitly post-launch; base game must feel complete; no perceived cut content
- Creator keys/embargo: ship only after stable build + press kit + known-issues note; document build version, support owner, content guidance, fallback if build changes
- Refund/review response: no defensive replies; do not invent platform policy; route real defects to hotfix/rollback/copy fix

Review-bombing / incident response:
- Signal: sudden negative cluster, low playtime, off-theme -> separate valid defects from coordinated abuse
- Path: freeze defensive replies, group by theme/source/time, publish calm clarification or known-issue, preserve moderation evidence, keep patch communication separate
```
