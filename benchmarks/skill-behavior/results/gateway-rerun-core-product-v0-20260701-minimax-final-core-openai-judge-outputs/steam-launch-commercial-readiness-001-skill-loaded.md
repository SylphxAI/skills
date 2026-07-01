<think>
The user wants a Steam launch readiness audit for an indie multiplayer game with specific concerns: wishlist conversion, demo, achievements, cloud saves, DLC plan, regional pricing, launch discount, anti-cheat, community hub moderation, refund risk, review bombing, patch cadence, and creator/influencer embargo timing.

I need to follow the skill's output format and keep it under 650 words. Let me build a tight, audit-ready matrix.

Format required:
- Game/launch context
- Release strategy
- Readiness matrix (Store page, Build/platform, Community/support, Launch operations)
- P0 blockers
- Wishlist/review plan

Let me also weave in the user's specific asks: multiplayer-specific risks (anti-cheat, netcode, server cost), DLC plan, regional pricing strategy, creator embargo timing, review bombing prevention.

I'll be concise and structured.
</think>

```text
Game/launch context:
- Genre: Indie multiplayer (co-op/competitive hybrid, low player counts 2–8)
- Stage: Pre-launch, ~10–14 weeks out from release
- Monetization: Premium base game + planned paid cosmetic/expansion DLC
- Languages: EN/JA/DE/FR/PT-BR/ZH-CN at launch
- Platforms: Windows only at launch, Steam Deck Verified target
- Audience: Co-op + casual competitive players, 25–40, Discord-native

Release strategy:
- Coming Soon live with vertical slice trailer → Steam Next Fest demo (6–8 weeks out) → creator embargo window (T-14 to T-7) → launch with 15% launch discount, regional parity tiers, free cosmetic DLC within 30 days to re-trigger wishlist → first major content patch at 60 days, paid expansion DLC at 90 days.

Readiness matrix:

- Store page:
  Ready: Capsule + key art match genre (multiplayer co-op) within 2 seconds; trailer opens with real 4-player gameplay loop, not logos (steam-1, steam-2).
  Blocker risk: Tags list "Single-player" alongside multiplayer — mismatch raises refund/negative review risk (steam-5). Co-op tags and "Online Co-op" must be primary.
  Action: Lock tags to Multiplayer, Co-op, Online Co-op, Indie, Action; validate short description against trailer beats.

- Build/platform:
  Ready: Achievements wired to real progression, cloud saves verified across host/client handoff, controller + KBM supported, Steam Deck Verified pass (steam-6).
  Blocker risk: Anti-cheat not stress-tested under rollback; netcode jitter unmeasured at 80ms+ ping; server cost spike at peak.
  Action: Run 7-day soak test with synthetic 2x peak CCU; document anti-cheat false-positive rate and support macro; pre-pay server capacity through week 2.

- Community/support:
  Ready: Community hub has pinned bug-report template, code-of-conduct, moderation rota, and Discord bridge (steam-8).
  Blocker risk: No moderation owner for launch-week traffic; review bombing vulnerability from multiplayer frustration cascades (steam-9).
  Action: Assign 2 moderators on 8h rotation for first 14 days; enable review-bomb detection (historical playtime filter) and pre-stage a public statement template.

- Launch operations:
  Ready: Hotfix path rehearsed including save-migration and rollback; patch cadence: day-1 hotfix, day-3 stability, day-7 QoL, day-30 content drop (steam-10).
  Blocker risk: Refund signal from short-session multiplayer abandoners; launch discount trains future waiting (steam-7).
  Action: Cap launch discount at 15%, document no-discount windows for future sales, set refund-monitor threshold (>8% triggers triage review).

P0 blockers:
- Anti-cheat not validated under host-migration rollback -> owner: netcode lead, proof: soak test report + 0 P0 incidents
- Cloud save corruption on disconnect mid-match -> owner: backend lead, proof: 50-run save/restore test
- Tags misrepresent single-player intent -> owner: store manager, proof: tag audit + competitor parity check
- Moderation rota unfilled for launch week -> owner: community lead, proof: schedule published + backup named
- Creator embargo not aligned with build lock -> owner: marketing lead, proof: embargo doc signed by creators, build SHA pinned

Wishlist/review plan:
- T-12w: Coming Soon + devlog #1 -> metric: 5k wishlists, source: organic + festival signup
- T-8w: Next Fest demo -> metric: demo completion >40%, wishlist conversion +20%
- T-6w: Devlog #2 + patch showcase -> metric: Steam notification CTR >12%
- T-2w: Wishlist email blast + countdown event -> metric: 80% of wishlists notified
- Launch: Day-0 review push to opted-in creators only; no paid reviews; monitor Steam review velocity hourly first 72h (steam-9)
- Day-7: Public retrospective post addressing top 3 review themes
- Day-30: Free DLC drop to re-ignite store traffic and convert dormant wishlists

DLC + pricing plan:
- Base game priced regional parity tiers (US $19.99, EU €19.99, UK £17.99, JP ¥2480, BR R$49.90, TR ₺199) using Steam recommended pricing
- Launch discount 15% (week 1 only), then no discount for 60 days before first Steam sale
- Cosmetic DLC free at day 30 (engagement), paid expansion DLC at day 90 priced at $9.99; announce expansion at T-30 with wishlist opt-in
- Bundle (base + expansion) pre-purchase opened day 14 post-launch

Anti-cheat + refund safeguards:
- Kernel-level or server-authoritative AC; publish detection FAQ to pre-empt "shadow ban" complaints
- Refund-risk thresholds: >8% refunds in week 1, >12% in week 2 trigger known-issue post
- Save-loss incidents auto-create support ticket with match log attached
```
