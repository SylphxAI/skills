---
name: steam-launch-readiness
description: Prepare Steam launch readiness for PC games including store page, capsule art, trailer, screenshots, tags, wishlist funnel, demo, playtest, achievements, cloud saves, controller support, localization, pricing, discounts, refund expectations, community hub, patch notes, reviews, and launch operations. Use when launching, auditing, or improving a game on Steam.
---

# Steam Launch Readiness

Use this skill to turn a Steam release into a coordinated product, store, community, and live-ops launch.

## Workflow

1. Identify game genre, audience, launch stage, monetization model, languages, and release strategy.
2. Read `references/steam-launch-systems.md`.
3. Audit store page promise, wishlist funnel, demo/playtest plan, build quality, community readiness, pricing, and support.
4. Separate pre-launch, launch-day, first-week, and post-launch operations.
5. Convert vague launch advice into decision gates: technical release gates, commercial policy gates, community response gates, and first-week learning gates with numeric or pre-agreed thresholds.
6. Verify store promise details against build proof: capsule, short description, tags, trailer, screenshots, achievements, cloud saves, controller support, settings, localization, system requirements, demo scope, and DLC wording.
7. Produce a readiness matrix with blockers, assets, telemetry, and review-risk mitigations.

## Guardrails

- Do not ship a store promise the build cannot fulfill.
- Do not treat wishlists as a vanity metric; connect them to demo, updates, launch timing, and conversion.
- Do not ignore refund, save loss, performance, controller, or community issues during launch week.
- Do not claim pricing, discount, DLC, compatibility, anti-cheat, or platform feature support unless the build, store page, and support plan prove it.
- Treat first-session crashes, save corruption, misleading store claims, and unowned moderation as launch blockers, not polish items.
- Do not leave refund, review, crash, demo, support, or server-health monitoring as qualitative. Use the studio's target if supplied; otherwise provide clearly labeled starter thresholds to replace before launch.
- Do not use starter thresholds as platform policy. They are internal operating tripwires for hotfix, rollback, copy changes, support escalation, or promotion pause decisions.

## Output format

```text
Game/launch context:
Release strategy:
Launch calendar:
- <pre-launch/demo/embargo/launch/day-1/week-1 beat> -> owner, decision gate

Readiness matrix:
- Store page:
- Build/platform:
- Community/support:
- Launch operations:
- Creator/press readiness:

Technical gates:
- <gate> -> metric/threshold, owner, proof

First-week decision thresholds:
- <signal> -> <numeric/pre-agreed threshold>, segment, owner, action

P0 blockers:
- <blocker> -> owner, proof needed

Commercial policy:
- <pricing/discount/DLC/refund risk decision> -> rationale, evidence, rollback/communication path
- Creator keys / embargo / press kit -> build version, known-issues note, support owner, embargo time, content guidance

Wishlist/review/learning plan:
- <action> -> metric, timing

Review-bombing / incident response:
- <signal> -> valid-defect triage, moderation/reporting path, player communication
```
