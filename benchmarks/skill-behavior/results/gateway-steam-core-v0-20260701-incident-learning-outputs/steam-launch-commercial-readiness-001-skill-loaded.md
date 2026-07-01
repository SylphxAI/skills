```text
Game/launch context:
- Genre/audience: indie multiplayer (party-friendly, low-friction onboarding, online co-op/versus).
- Monetization: premium base + post-launch cosmetic DLC roadmap (no pay-to-win).
- Languages: EN/JA/DE/FR/PT-BR/ES (subtitles; EN/JA voice).
- Release strategy: Coming-Soon T-8w → Steam Next Fest demo (T-6w) → closed beta (T-3w) → launch at stable peak → Day-7 hotfix cadence → DLC drop at week 6.

Launch calendar:
- T-8w: store promise, capsule/trailer/tags audit, regional price draft, anti-cheat vendor eval -> product/marketing, gate: store-claim audit signed.
- T-6w: Next Fest demo, crash/perf telemetry live, community rules, moderation owner, anti-cheat kernel-mode sign-off -> engineering/community, gate: telemetry + moderation live.
- T-5w: creator/influencer shortlist, press kit, embargo note (lift at T-48h), known-issues draft -> community, gate: embargo list + kit ready.
- T-3w: closed beta to top wishlist cohort; triage crashes, save loss, controller, onboarding -> production, gate: P0 defect burndown.
- T-14d: pricing/discount/DLC/refund/review-response policy signed; creator keys after stable build -> release/business, gate: policy matrix approved.
- T-7d: build lock, rollback rehearsed, save-migration test, Deck Verified -> release manager, gate: hotfix/rollback rehearsal pass.
- Launch day: hourly monitoring of checkout, server, crash, refund, review, tickets -> release/community.
- Days 1-3: twice-daily hotfix/rollback review; patch notes same day -> release manager.
- Days 4-7: daily decision ledger; D1/D7 retention, wishlist-to-purchase, refund clusters -> product/live ops.

Readiness matrix:
- Store page: capsule, trailer, screenshots, short description, tags aligned to multiplayer/party promise within seconds (steam-1, steam-2). Tags audited against refund history of genre (steam-5).
- Build/platform: cloud saves across devices, achievements (≤20, real triggers), controller + Steam Deck glyphs, EN/JA voices + 6 subtitles (steam-6). Anti-cheat server-authoritative + kernel-mode driver with public disclosure page.
- Community/support: hub pinned known-issues, bug-report template, moderation rules, response SLA ≤12h weekday, ≤24h weekend (steam-8).
- Launch operations: hotfix path rehearsed, rollback tested, save-migration safe, decision ledger owners assigned (steam-10, steam-11).

Technical gates:
- Crash reporting → free ≥99.5% first session, build+hw+driver+scene tagged → engineering → crash dashboard.
- Performance → 1080p/60 on min-spec, 40/60 on Deck, ≤3s load → engineering → FPS/load telemetry per scene.
- Multiplayer/server → soak at 1.5× projected peak, host migration + reconnect + degraded-region behavior → netcode → server report.
- Cloud save → create/load/delete/conflict/restore across PC and Deck, build-upgrade migration safe → engineering → migration test.
- Controller/Deck → menu, remap, glyphs, pause, text legible on Deck → QA → Deck Verified status.
- Anti-cheat → kernel driver disclosed, VAC/ BattlEye-equivalent vendor, ban appeal path documented → security → disclosure page.
- Hotfix/rollback → revert + save compatibility rehearsed → release manager → rehearsal log.

P0 blockers:
- Crash >0.5% first-session → fix or block.
- Save corruption or irreversible migration → block.
- Anti-cheat driver uncertified or undisclosed → block.
- Deck Verified fails for claimed features → fix or remove claim.
- Onboarding confusion surfaced in beta ≥20% → fix tutorial.
- Store claim (e.g., cross-play) not in build → fix or remove.

Commercial policy:
- Regional pricing → parity tiers reviewed vs PPP + genre norms; LATAM/EU/SEA bands approved by business.
- Launch discount → ≤10% only if paired with future sale cadence; no train-to-wait stacking.
- DLC roadmap → cosmetic only, free base updates for first 90 days; no perceived cut content.
- Demo scope → teaches core loop in ≤10 min; honest quality bar; demo-to-store claim audit (steam-4, steam-12).
- Creator/influencer embargo → keys at T-7d only after stable build; embargo lifts T-48h with known-issues pack.
- Refund posture → refund-by-cause matrix; no policy invention; macro library ready.
- Review response → acknowledge valid defects, no defensive replies, escalation owner named.

Wishlist/review/learning plan:
- Wishlist beats → Next Fest demo, devlog #1 (T-5w), devlog #2 (T-2w), beta invite top 10% wishlists, launch-date trailer (T-7d). Track `wishlist_added` by source and `demo_started` → wishlist delta.
- Review plan → monitor `review_theme_logged` by build/language; respond only to fixable or factual issues; public patch notes same day as fixes.
- Learning plan → D1/D7 retention, refund cluster by playtime bucket + country + hardware, cohort by source; outputs feed roadmap and copy changes.

Review-bombing / incident response:
- Signal: sudden review spike unrelated to build.
- Triage: separate valid defects (crash, save, perf, anti-cheat false-positive) from coordinated abuse; preserve evidence; do not defensively reply.
- Moderation: report via Steam tools, freeze non-essential replies, group reviews by theme/time/source, calm clarification post if abuse + defect overlap.
- Communication: pinned known-issue + ETA, separate patch note, escalation owner named; rollback decision logged with player message URL.
```
