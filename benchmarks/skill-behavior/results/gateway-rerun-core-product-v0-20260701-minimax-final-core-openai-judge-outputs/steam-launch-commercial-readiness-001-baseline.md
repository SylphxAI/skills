# Steam Launch Readiness — Indie Multiplayer Game

**Verdict: CONDITIONAL GO** — proceed to launch if items marked *Blocker* resolve within 72h; *At Risk* must have a written mitigation before T-7.

## 1. Domain Status Matrix

| # | Domain | Status | Critical Decision / Note |
|---|---|---|---|
| 1 | Wishlist conversion | 🟡 At Risk | Need ≥8–10× wishlist count of first-week sales target. Confirm storefront asset CTR ≥4% and capsule A/B test concluded. |
| 2 | Demo | 🟢 Ready | Playable demo published ≥30 days pre-launch; Next Fest slot locked. |
| 3 | Achievements | 🟢 Ready | 30–50 total, ≤5 hidden; multiplayer-specific flags server-side to prevent spoofing. |
| 4 | Cloud saves | 🟡 At Risk | Per-user cloud enabled. **Disable cross-device sync for ranked/competitive** to prevent save-rollback cheating. |
| 5 | DLC plan | 🟡 At Risk | At minimum a "Season 1 content roadmap" Steam event + Coming Soon page; otherwise "no DLC" must be explicit to avoid negative reviews. |
| 6 | Regional pricing | 🟢 Ready | Follow Steam recommended price tier matrix within ±10%. Verify LATAM, CIS, SEA tiers manually. |
| 7 | Launch discount | 🟢 Ready | -10% to -15% launch-week discount; avoid >20% (trains users to wait). |
| 8 | Anti-cheat | 🔴 Blocker | Server-authoritative model **or** signed EAC/BattlEye kernel client. Client-trust = refund/ban-wave risk. |
| 9 | Community hub moderation | 🟡 At Risk | ≥2 mods appointed, mod guidelines posted, rule pinned in Discussions before launch. |
| 10 | Refund risk | 🟡 At Risk | Auto-refund under 2h. Multiplayer = high if matchmaking broken at T-0. Hold marketing scale-up until Day 3 stability confirmed. |
| 11 | Review bombing | 🟡 At Risk | Enable Steam's review score history view; pre-draft transparency post for any outage; rate-limit on-launch reveals of unrelated controversy. |
| 12 | Patch cadence | 🟢 Ready | Hotfix capability <4h; scheduled patches D1 / D3 / D7 / D14 / D30; public Trello/Discord tracker live at launch. |
| 13 | Creator/influencer embargo | 🟢 Ready | T-14 day review-embargo lift, T-7 streaming embargo lift; NDAs signed; 2–3× AAA-tier creators + 5–8× micro-creators (5k–50k). |

## 2. Rubric-Critical Decisions (must be in writing before launch)

- **Anti-cheat tier:** choose and document on store page. Silent downgrade is the #1 trust-killer for multiplayer indies.
- **Cloud save scope:** competitive = server-state only; casual co-op = client cloud OK.
- **Refund policy language:** publish a 1-line "known issues" disclaimer on store page if matchmaking/queue times are unstable at launch.
- **Review-bomb shield:** nominate a community manager with 4h-response SLA in first 14 days.

## 3. Pre-Launch Timeline (audit checkpoints)

- **T-30:** Demo live, wishlist funnel verified, creator outreach started.
- **T-14:** Review-embargo lifts, store page final, pricing tiers locked, refund policy published.
- **T-7:** Streaming embargo lifts, patch hotfix path tested, mod team live, review-bomb monitor dashboard active.
- **T-3:** Full server-load test (1.5× peak projected CCU), rollback drill, DLC/roadmap page published.
- **T-0:** Launch discount active, achievements visible, Day-0 patch notes posted, community manager on-shift for 72h straight.
- **T+1 to T+7:** Daily stability review, daily refund-rate review, postmortem on any >10-min outage, no marketing spend pause until refund rate <2%.

## 4. Go / No-Go Gate

Proceed **only if**: anti-cheat integrated & tested in prod build; community mods onboarded; refund-risk disclaimer live; Day-0 patch queued. Otherwise **delay by one patch cycle** — one clean launch beats two botched ones for indie multiplayer.
