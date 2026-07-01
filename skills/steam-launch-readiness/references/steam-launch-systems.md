# Steam Launch Systems

A Steam launch is a funnel from first impression to wishlist to purchase to first-session satisfaction to review. Treat each surface as part of one operating system.

## Rule IDs

- `steam-1` — Capsule art, short description, trailer, screenshots, and tags must communicate the same genre promise within seconds.
- `steam-2` — The first trailer segment should show real gameplay, not only mood or logos, unless the genre convention strongly supports it.
- `steam-3` — Wishlists need reasons to accumulate: demo, festival, dev updates, influencer beat, launch date, or feature proof.
- `steam-4` — Demo and playtest builds should teach the core loop quickly and set expectations for final quality.
- `steam-5` — Store tags should match player search intent and expectation; misleading tags increase refund and negative review risk.
- `steam-6` — Cloud saves, achievements, controller support, language support, and system requirements must match the shipped build.
- `steam-7` — Launch discount and pricing should be intentional, region-aware, and compatible with future discount strategy.
- `steam-8` — Community hub, bug reports, patch notes, and moderation need an owner before traffic arrives.
- `steam-9` — Review-risk issues such as crashes, performance, save loss, confusing onboarding, and missing settings are launch blockers.
- `steam-10` — First-week operations should include hotfix path, known issues, support macros, sentiment triage, and patch cadence.
- `steam-11` — Crash reporting, performance telemetry, server health, and save integrity must be wired before public demo or launch traffic.
- `steam-12` — Pricing, discount, DLC, embargo, creator-key, refund, and review-response decisions need a verified policy matrix; do not invent platform policy or make unsupported promises.
- `steam-13` — First-week learning must produce decisions: hotfix now, rollback, change store copy, pin known issue, adjust regional price, retarget creators, or defer to roadmap.
- `steam-14` — First-week operating metrics need numeric or pre-agreed thresholds. If studio-specific targets are missing, provide starter tripwires labeled as internal defaults to replace before launch.
- `steam-15` — Store promise audits must explicitly verify capsule, short description, tags, trailer, screenshots, achievements, settings, controller support, cloud saves, localization, system requirements, demo scope, and DLC wording against the shipped build.
- `steam-16` — Creator keys and embargo plans need a press kit, locked build version, known-issues note, content guidance, support owner, review/coverage monitoring, and fallback if the build or policy changes before embargo lift.
- `steam-17` — Player communication during launch incidents needs a bug-report format, known-issue state, ETA policy, support macro, public update cadence, owner, and explicit decision type: hotfix, rollback, store-copy change, promotion pause, or roadmap clarification.
- `steam-18` — Commercial launch advice must avoid unsupported platform policy claims. Verify current Steamworks/store-console behavior for pricing, discounts, refunds, reviews, creator keys, and DLC before treating it as policy.

## Readiness decision table

| Area | Ready signal | Blocker signal | Evidence |
| --- | --- | --- | --- |
| Store promise | Assets show real loop and audience fit | Trailer/screens misrepresent game | Store draft review and player test |
| Wishlist funnel | Clear beats before launch | No reason to wishlist before release | demo/festival/update calendar |
| Demo/playtest | Teaches loop and captures feedback | Confusing tutorial or unstable build | completion, crash, survey, forum themes |
| Platform features | Achievements/cloud/controller work | Claims not matched by build | test matrix and user-facing settings |
| Technical telemetry | Crash/performance/server/save data is actionable by build version | No crash reporting, no rollback signal, or no save-loss detection | crash-free sessions, FPS/loading budgets, server error rate, save restore tests |
| Support/community | Bug report and moderation flow exists | No owner for launch-week traffic | macros, triage board, response SLA |
| Pricing | Price matches value and region expectations | Discount trains immediate waiting | pricing rationale and launch discount rule |
| Commercial policy | Price/discount/DLC/key/embargo/refund posture is documented | Unsupported policy claims or bait-and-switch roadmap | policy matrix, owner approval, communication draft |
| Creator/press readiness | Press kit, known-issues note, key list, embargo timing, build version, and support coverage are aligned | Unstable keys, unclear embargo, no support owner, or missing known-issues context | press kit, creator key register, embargo note, support macro |

## State machine

```text
store_page_draft -> store_page_reviewed -> coming_soon_live -> wishlist_growth
wishlist_growth -> demo_released -> feedback_collected -> launch_build_locked
launch_build_locked -> release_live -> first_week_triage -> patch_or_hotfix
release_live -> refund_or_negative_review_risk -> known_issue_response
first_week_triage -> review_response -> post_launch_roadmap_update
first_week_triage -> rollback_or_hotfix_decision -> patch_notes_published
refund_or_negative_review_risk -> store_claim_or_build_gate_fix
```

## Event schema

Track or request these metrics when available:

- `store_page_viewed`: source, country, language, tag set, device class.
- `wishlist_added`: source, campaign, demo_exposed, festival_exposed.
- `demo_started`: build, source, session_length, tutorial_completed.
- `demo_feedback_theme_recorded`: source, forum_theme, review_theme, support_theme, severity, owner.
- `purchase_started`: country, price, discount, wishlist_age_days.
- `first_session_completed`: crash, settings_changed, achievement_unlocked, save_created.
- `crash_reported`: build_version, hardware_class, driver_version, scene_or_match_state, fatality, repeat_count.
- `server_health_sampled`: region, match_id, latency_bucket, disconnect_count, error_rate, capacity_utilization.
- `save_integrity_checked`: build_version, device_count, conflict_detected, restore_success, data_loss_risk.
- `cohort_retention_sampled`: cohort_date, source, country, tutorial_completed, day1_returned, day7_returned, party_or_solo.
- `refund_signal`: playtime_bucket, reason_theme, crash_or_performance_related.
- `review_theme_logged`: sentiment, theme, build_version, response_needed.
- `hotfix_decision_logged`: decision, trigger_metric, owner, shipped_at, rollback_available, player_message_url.

## Launch calendar skeleton

Use concrete beats so "launch ops" does not become generic advice.

| Window | Gate | Owner | Output |
| --- | --- | --- | --- |
| T-8 to T-6 weeks | Coming-soon page, demo scope, tags, trailer promise, pricing draft reviewed | product/marketing | store-claim audit and demo acceptance list |
| T-6 to T-4 weeks | Creator list, press kit, community rules, telemetry, crash reporting, server soak plan ready | community/engineering | embargo note, support macros, telemetry dashboard |
| T-4 to T-2 weeks | Demo feedback triaged; P0 crashes, save loss, onboarding, controller, and performance issues closed | production/QA | go/no-go report and known-issues draft |
| T-14 to T-7 days | Creator keys only after stable build; discount, regional price, DLC wording, and refund/review plan signed off | release/business | key list, policy matrix, public messaging pack |
| Launch day | Monitor checkout, server, crash, refund, review, support, and community signals hourly | release/community | decision ledger and player-facing status |
| Days 1-3 | Twice-daily hotfix/rollback review and patch-note communication | release manager | hotfix decisions, rollback/no-rollback rationale |
| Days 4-7 | Daily learning review: retention, wishlist-to-purchase, refunds, reviews, support, patch outcomes | product/live ops | week-1 readout and roadmap adjustment |

## Technical launch gates

| Gate | Pass signal | Blocker signal | Decision |
| --- | --- | --- | --- |
| Crash reporting | Crash reports include build, hardware, driver, scene/match state, and frequency | Crashes only appear through reviews/support tickets | Block public demo or launch until instrumented |
| Performance | Target hardware budgets are defined and measured for first session, worst combat/scene, loading, and menu/settings | Unknown low-end performance, shader stutter, or settings missing | Fix, lower claims, or raise minimum spec before traffic |
| Multiplayer/server | Soak/load test covers expected peak, reconnect, host migration, matchmaking, and degraded-region behavior | First-week capacity or disconnect risk is unknown | Run test or narrow launch scope |
| Cloud save | Create/load/delete/conflict/restore works across devices and build upgrades | Save corruption, irreversible migration, or no rollback plan | Block release until safe migration/rollback exists |
| Controller/Steam Deck | Menu, gameplay, remap, glyphs, pause, and text legibility are verified | Store claims exceed actual support | Remove claim or fix before launch |
| Hotfix/rollback | Build promotion, patch notes, rollback, and save compatibility are rehearsed | Team cannot safely revert or communicate | Block launch until release manager signs off |

## Commercial policy matrix

Use a matrix instead of ad hoc launch opinions.

| Decision | Good posture | Risk to avoid | Evidence |
| --- | --- | --- | --- |
| Regional pricing | Price tiers are reviewed against value, audience, and conversion expectations | Unsupported parity assumptions or surprise region backlash | region price sheet and approval owner |
| Launch discount | Discount has a clear conversion goal and future sale posture | Training players to wait, stacking discounts without plan | discount calendar and threshold for change |
| DLC roadmap | DLC is optional, post-launch, and not required to make the base game feel complete | Perceived cut content or bait-and-switch | roadmap wording review and base-game value proof |
| Demo scope | Demo teaches the core loop and sets honest quality expectations | Demo promises features missing from launch | demo-to-store claim audit |
| Creator keys/embargo | Embargo timing matches stable build, press kit, and support coverage | Sending unstable keys or unclear content rules | key list, embargo note, known-issues note |
| Refund/review response | Team can identify causes and respond with fixes or truthful known issues | Defensive replies, policy invention, or blaming players | refund dashboard, response macros, escalation owner |

## Refund and review-risk controls

- Treat high refund rate as a symptom tree, not a moral judgment: crashes, poor performance, confusing onboarding, store mismatch, multiplayer disconnects, save loss, missing settings, regional price shock, or unmet language/controller expectations.
- Break refund/review monitoring by playtime bucket, build version, hardware class, country/price tier, source campaign, and first-session outcome.
- If negative reviews cite a real defect, acknowledge the issue, publish the known-issue state, give a fix/rollback ETA when known, and avoid arguing in public threads.
- If review bombing is suspected, still separate valid product defects from coordinated abuse; moderation and reporting should not replace fixing real launch quality issues.
- Prepare a review-bombing playbook before launch: freeze defensive replies, group reviews by theme/source/time, identify valid product defects, preserve evidence for moderation/reporting, publish a calm known-issue or clarification post, and keep patch/update communication separate from abuse reporting.
- If store copy created wrong expectations, change copy/trailer/tags before buying more traffic.
- Bug-report format should request build version, OS/hardware class, region/server, reproduction steps, save/log attachment, screenshot/video when safe, expected vs actual result, and severity. Public ETA language should separate "investigating", "fix identified", "hotfix in test", "rollback live", and "roadmap clarification"; do not promise exact timing unless the release owner approved it.

## First-week decision ledger

Run launch week as a decision system. Review these twice daily on days 0-3 and daily through day 7:

| Signal | Segment | Decision threshold | Likely action |
| --- | --- | --- | --- |
| Crash-free sessions | build, hardware, scene | Starter: below 99.5% demo / 99.0% launch or >0.5 pp drop after patch | hotfix, rollback, known issue |
| Refund rate | playtime bucket, country, source | Starter: above plan by >25%, or defect cluster >20% of sampled refunds | fix defect, adjust store copy, support macro |
| Negative review themes | build, language, feature claim | Starter: repeated theme reaches 10+ credible reviews or >15% of new negatives in 24h | public response, patch, roadmap clarification |
| Demo-to-wishlist | source, festival day, session length | Starter: high-intent source converts below 8-12%, or end-card CTR below 20% | improve end-card, store CTA, trailer promise |
| Demo completion | source, first-session outcome | Starter: tutorial/core-loop completion below 50%, or median session below intended loop proof | onboarding fix, difficulty/balance patch |
| Cohort retention | source, country, party/solo, tutorial complete | Starter: D1 return below internal target by >20%, or tutorial completers do not outperform non-completers | onboarding, matchmaking, balance, roadmap priority |
| Multiplayer health | region, match type, time of day | Starter: disconnects >2%, p95 matchmaking >120s, or latency complaint spike | capacity, matchmaking, incident post |
| Support tickets | theme, severity, duplicate count | Starter: top duplicate theme >25% of tickets or first response SLA misses twice | pinned post, FAQ, macro, patch priority |
| Patch outcome | before/after metric | Starter: hotfix fails to improve target within 24h or worsens crash/refund/review signal | rollback, pause promotion, explain next step |

Starter thresholds are not platform policy and are not promises to players. Replace them with studio-specific targets before launch and keep threshold ownership in the launch room.

## Launch checklist

- Store page assets align: capsule, trailer, screenshots, description, tags, languages.
- Build supports claimed OS, controller, cloud save, achievements, localization, and settings.
- Crash reporting, performance budgets, server health, and save integrity checks are live and owned.
- Demo/playtest feedback is triaged into must-fix, expectation-setting, and roadmap buckets.
- Launch discount, regional pricing, and future sale posture are documented.
- DLC, creator-key, embargo, refund, and review-response policy are documented without unsupported platform claims.
- Community hub has pinned known issues, bug report format, moderation rules, and patch-note cadence.
- Hotfix path is rehearsed, including rollback or save-migration safety.
- First-week decision ledger is ready with owners, thresholds, and public communication paths.
