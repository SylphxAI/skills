<think>
The user wants a "Steam launch readiness" report for an indie multiplayer game with many specific concerns. They want it concise, audit-friendly, under 650 words. They want artifacts and rubric-critical decisions prioritized over explanation.

Let me structure this as a launch readiness checklist with clear go/no-go decisions, risk assessments, and concrete artifacts needed for each item. I'll use a tabular/structured format for audit-friendliness.

Key areas:
1. Wishlist conversion
2. Demo
3. Achievements
4. Cloud saves
5. DLC plan
6. Regional pricing
7. Launch discount
8. Anti-cheat
9. Community hub moderation
10. Refund risk
11. Review bombing
12. Patch cadence
13. Creator/influencer embargo timing

I'll make this tight, decision-oriented, with explicit owners and deadlines implied. Let me draft within 650 words.

Format plan:
- Header with status legend
- Per-item: Status (Ready/At Risk/Blocked), Artifact, Decision/Rationale, Owner
- Closing: Top 3 risks, sign-off line

Let me writethis concisely.
</think>

# Steam Launch Readiness — Indie Multiplayer Title

**Status legend:** 🟢 Ready · 🟡 At Risk · 🔴 Blocked · **Target launch:** T-14 days gate

| # | Area | Status | Required Artifact | Decision / Rationale |
|---|---|---|---|---|
| 1 | **Wishlist conversion** | 🟡 | Pre-launch email blast (T-21d, T-7d, T-1d); Steam Announcement post; store page A/B on hero art | Decision: trigger announcement + email at T-7d. Convert at 12–18% historical indie benchmark; flag if <8% by T-3d. |
| 2 | **Demo** | 🟢 | Steam Playtest → Demo (T-21d); demo build on default branch; Discord "Demo Feedback" channel | Decision: ship demo at T-21d to capture UGC and review-bomb buffer. Require ≥500 concurrent peak or hold. |
| 3 | **Achievements** | 🟢 | 25–40 achievements, ≤5% hidden; localization keys confirmed; icon set (16×16, 64×64) | Decision: 30 achievements, 3 hidden (story spoilers). API schema locked T-10d. |
| 4 | **Cloud saves** | 🟢 | Steamworks Cloud API enabled per-platform quota; conflict-resolution = newest-wins; manual override docs | Decision: enable on PC; disable on Linux if quota conflict. Document restore path in store page FAQ. |
| 5 | **DLC plan** | 🟡 | DLC store pages drafted (2 cosmetic, 1 season pass); parent app ID linked; pricing tier matrix | Decision: cosmetic DLC ship +14d post-launch; season pass +60d. No DLC on launch day (avoid refund clustering). |
| 6 | **Regional pricing** | 🟡 | Steam recommended-price matrix for 30 regions; purchasing-power parity verified for LATAM/SEA/CIS | Decision: adopt Valve recommended tiers; manually floor Argentina/Türkiye to avoid abuse. Review exchange vs USD weekly. |
| 7 | **Launch discount** | 🟢 | -10% launch week (Steam rule: max -10% in first 14 days post-launch); countdown copy localized | Decision: -10% week 1, -20% week 4 (first eligible window). No deeper cut until >500 reviews. |
| 8 | **Anti-cheat** | 🔴 | EAC or BattlEye integration; server-side validation; kick + ban telemetry | **Blocker:** integration incomplete. Mitigation: ship with EAC server-authoritative build at T-7d. If not green by T-5d → soft-launch in opted-in beta, delay public. |
| 9 | **Hub moderation** | 🟡 | Moderator roster (≥4, timezone-spread); keyword filter list; escalation SOP; Valve moderation tool access | Decision: 4 mods + 1 lead; publish Community Guidelines in hub pinned post; zero tolerance for doxxing/cheat-selling. |
| 10 | **Refund risk** | 🟡 | Playtime <2h refund exposure model; known-issue list; Day-1 patch scope | Decision: cap launch feature set to remove top-3 refund causes (crash, save loss, matchmaking dead). Track refund rate target <5% week 1, <2% steady. |
| 11 | **Review bombing** | 🟡 | Historical-burst detection (≥3× baseline in 24h); non-reviewable toggle via Steamworks; comms playbook | Decision: pre-write templated response; enable review-score histogram view; do **not** toggle off reviews unless threat = off-topic/DMCA. |
| 12 | **Patch cadence** | 🟡 | Public roadmap (T-0, T+3, T+7, T+14, T+30); hotfix branch rules; rollback tested | Decision: Day-1 hotfix guaranteed; bi-weekly cadence month 1; monthly thereafter. Each patch: notes + community vote thread. |
| 13 | **Creator/influencer embargo** | 🟢 | Embargo T-7d; key distribution via Steam Curator Connect + Keymailer; NDA + non-compete in clips; asset kit (4K, vertical, captions) | Decision: 75 keys tiered (Tier 1 = 48h early, Tier 2 = simultaneous). Pre-approve 10 long-form videos. |

---

## Top 3 launch risks (ranked)

1. **🔴 Anti-cheat integration** — server-authoritative build must be green by **T-5d**. Delay = soft-launch only.
2. **🟡 Refund clustering on multiplayer dead rooms** — require Day-1 server cost plan for ≥6 months of 24/7 regional coverage or risk quick-collapse perception.
3. **🟡 Review bombing on first major patch** — pre-stage comms, do not disable reviews reflexively.

## Sign-off

- Producer: ______  Date: ______
- Anti-cheat lead: ______  Date: ______
- Community lead: ______  Date: ______

**Go / No-Go gate at T-3d:** all 🔴 must be 🟢; ≥10 of 13 🟡 acceptable with mitigation owners assigned.
