```text
Game/launch context:
- Genre/audience: not supplied — treat as unknown; flag assumptions.
- Stage: launch window, with active regional-pricing controversy.
- Monetization: base + planned DLC roadmap; 10% launch discount.
- Languages: shipped with a small localization bug.
- Risk surface: regional pricing backlash, balance-driven review bomb, low-end perf refunds, streamer embargo under unstable build, mod concern about toxic threads.

Release strategy: Hold launch only if P0 perf and loco fix land before T-7d; otherwise slip launch rather than ship a refund-magnet and refund-driven negative review spike.

Launch calendar:
- T-8 to T-6w: regional price sheet reviewed, DLC wording proofed, embargo build targeted. Owner: business/release.
- T-6 to T-4w: press kit, known-issues draft, moderation rules, perf budget on low-end class. Owner: community/eng.
- T-4 to T-2w: P0 perf, save, controller, loco closed; demo-to-store claim audit. Owner: QA/production.
- T-14 to T-7d: embargo lifted on locked build only; discount/region policy signed; creator keys dispatched with known-issues note. Owner: release manager.
- Launch day: hourly crash, refund, review, server, moderation sweep. Owner: release/community.
- D1-D3: 2x daily hotfix/rollback review. Owner: release manager.
- D4-D7: daily learning review → week-1 readout, roadmap adjustment. Owner: product/live ops.

Verified policy matrix (label as studio-approved or starter; do not assert Steam policy from memory):
- Regional pricing -> per-tier rationale, parity audit, documented owner; rollback path = re-price tiers, post clarification, pause regional ads.
- 10% launch discount -> conversion goal stated; future sale posture documented; pause trigger = promo while refunds elevated.
- DLC roadmap -> base game complete proof; DLC marked optional; rollback = soften roadmap copy, defer DLC marketing.
- Creator keys/embargo -> locked build, known-issues note, content guidance, support owner, fallback if build slips.
- Refund posture -> symptom tree owned, no policy invention; refund dashboard by playtime/build/country.
- Review-response -> no defensive replies, themed responses, escalation owner; review-bomb playbook live.
- Localization bug -> severity-graded; ship-blocking if user-visible on store or first session.
- Moderation -> rules, reporting, escalation, toxic-thread containment, mod support channel.

Pricing/DLC/creator-key decisions:
- Regional pricing: publish per-tier rationale; if controversy is parity-related, post data, pause affected-region ads, do not silently re-price without comms.
- 10% discount: keep only if D1 crash-free and refund signals hold; otherwise extend grace by shortening sale window or ending early.
- DLC: verify base-game completion proof in store copy; ensure DLC wording avoids "cut content" framing.
- Creator keys: distribute only on locked build + known-issues note; embargo lift tied to build hash; support macro ready for creator crash reports.

Community moderation and review-response plan:
- Pinned known-issue thread with build, repro, ETA state (investigating/fix-identified/hotfix-in-test/rollback-live/roadmap).
- Bug-report template: build, OS/hardware class, region, repro, save/log, expected vs actual, severity.
- Mod support channel + weekly mod sync; thread containment rules; clear reporting path.
- Review response: group by theme, acknowledge real defects, avoid public arguments, keep patch comms separate from abuse reporting.

Refund-risk triage (symptom tree):
- Crashes/save loss -> hotfix or rollback; pin known issue.
- Low-end perf -> settings + min-spec copy fix; perf hotfix; possible min-spec raise.
- Onboarding -> tutorial/difficulty patch.
- Store mismatch -> adjust capsule/trailer/tags/trailer promise before buying more traffic.
- Multiplayer disconnects -> capacity/matchmaking incident post.
- Region price shock -> clarification + re-tier review.
- Loc bug -> ship only after fix or after store copy clarifies scope.

Promotion-pause triggers:
- Crash-free < starter threshold (99.0% launch) or >0.5 pp drop post-patch.
- Refund rate >25% above plan or defect cluster >20% of sampled refunds.
- Negative review theme >10 credible reports or >15% of new negatives in 24h.
- Multiplayer disconnects >2% or p95 matchmaking >120s.
- Support top theme >25% of tickets twice; SLA miss twice.

First-week decision ledger:
- Crash-free by build/hardware/scene -> starter <99.0% -> hotfix/rollback/known issue. Owner: release.
- Refund rate by playtime/country/source -> starter >25% over plan or defect cluster >20% -> defect fix, copy change, macro. Owner: live ops.
- Negative review themes by build/feature claim -> starter repeated theme >10 or >15% new negatives/24h -> public response, patch, roadmap note. Owner: community.
- Demo-to-wishlist by source -> starter high-intent <8-12% or end-card CTR <20% -> improve end-card, store CTA, trailer. Owner: marketing.
- Demo completion/tutorial -> starter <50% or median session below loop proof -> onboarding fix, balance patch. Owner: design/QA.
- Cohort D1/D7 return by source/country/tutorial -> starter D1 <target-20% or completers ≤ non-completers -> onboarding/matchmaking/balance priority. Owner: product.
- Multiplayer health by region/match type -> starter disconnects >2% or p95 MM >120s -> capacity/incident post. Owner: eng.
- Support tickets by theme/severity -> starter top theme >25% or SLA miss x2 -> pinned post, FAQ, macro, patch priority. Owner: support.
- Patch outcome before/after -> starter no improvement in 24h or worsens signals -> rollback, pause promo, explain next step. Owner: release manager.

P0 blockers:
- Low-end perf budget unmet or store claim oversells hardware. Owner: eng, proof: perf matrix + min-spec copy.
- Localization bug user-visible on store/first session. Owner: loc, proof: build screenshot + string audit.
- Crash reporting/save integrity not wired by build version. Owner: eng, proof: dashboard + restore test.
- Embargo keys sent on unstable build. Owner: release, proof: build hash + known-issues note.
- Moderation rules/owner not staffed for launch traffic. Owner: community, proof: rota + macro set.
- Region-pricing rationale undocumented. Owner: business, proof: price sheet + comms draft.

Wishlist/review/learning plan:
- Demo/embargo beats feed wishlist; weekly dev update tied to fix cadence. Metric: wishlist delta by source.
- Review themes logged daily; week-1 readout converts themes into roadmap items or copy fixes.
- Review-bombing playbook: freeze defensive replies, separate valid defects from coordinated abuse, preserve evidence, publish calm clarification, keep patch comms separate.
```
