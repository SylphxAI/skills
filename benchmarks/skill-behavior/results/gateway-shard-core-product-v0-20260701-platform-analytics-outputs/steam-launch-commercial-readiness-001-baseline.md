## Steam Launch Readiness — Indie Multiplayer Game

### Executive Decision
**Launch status: CONDITIONAL GO**

Proceed only if the following are green before release:

1. Multiplayer stability tested under expected launch load.
2. Demo-to-wishlist funnel is live and tracked.
3. Anti-cheat and moderation escalation paths are operational.
4. Regional pricing, launch discount, achievements, and cloud saves are verified in Steamworks.
5. Day-0 and Day-7 patch plans are locked.

---

## 1. Store Page & Wishlist Conversion

### Required Checks
- Steam capsule art, trailer, screenshots, short description, and tags finalized.
- Clear multiplayer value proposition in first 10 seconds of trailer.
- CTA priority:
  1. Wishlist
  2. Play demo
  3. Join Discord / community

### Wishlist Conversion Targets
| Metric | Target |
|---|---:|
| Store page visit → wishlist | 8–15% |
| Demo player → wishlist | 20–35% |
| Wishlist → launch purchase | 10–20% |
| Demo completion → purchase | 15–30% |

### Decision
**Go if:** demo players can wishlist from in-game menu, pause screen, and end screen.

---

## 2. Demo Readiness

### Demo Scope
- 20–40 minutes of gameplay.
- Includes multiplayer onboarding.
- Includes one polished map/mode/core loop.
- No major progression wipe confusion.

### Demo Requirements
- Separate Steam demo app configured.
- Demo has analytics events:
  - install
  - first launch
  - tutorial completion
  - first match completed
  - session length
  - wishlist CTA click
- End screen says: **“Wishlist now to play at launch.”**

### Decision
**Go if:** demo is stable, fun within 5 minutes, and has no dead matchmaking.

---

## 3. Achievements

### Launch Set
Recommended: **20–35 achievements**

Include:
- First match completed
- First win
- Party up with friend
- Complete tutorial
- Use each class / weapon / faction
- Skill-based achievements
- Long-term progression achievements

### Avoid
- Excessive grind
- Broken multiplayer-only achievements
- RNG-only achievements

### Decision
**Go if:** all achievements unlock correctly in Steam overlay and test branches.

---

## 4. Cloud Saves

### Required
- Steam Cloud enabled for:
  - settings
  - keybinds
  - progression
  - cosmetic unlocks, if applicable
- Do **not** rely on local saves for competitive state if multiplayer progression matters.

### Risk
Cloud conflicts can trigger negative reviews.

### Decision
**Go if:** cloud sync tested across two machines and fresh install.

---

## 5. DLC Plan

### Launch Recommendation
Do **not** launch with paid gameplay DLC unless base game value is clearly complete.

### Recommended DLC Roadmap
| Timing | DLC Type | Purpose |
|---|---|---|
| Launch | Free cosmetic / supporter pack optional | Monetization without splitting players |
| 30–60 days | Free content update | Review and retention boost |
| 60–120 days | Cosmetic DLC / soundtrack | Low backlash |
| 3–6 months | Major expansion only if player base stable | Revenue extension |

### Decision
**Go if:** no paid DLC fragments matchmaking or creates pay-to-win perception.

---

## 6. Regional Pricing

### Required
- Use Steam recommended regional pricing as baseline.
- Manually review high-sensitivity regions:
  - Brazil
  - Turkey
  - Argentina / LATAM-USD
  - MENA-USD
  - South Asia
  - CIS
  - China

### Decision
**Go if:** pricing avoids extreme underpricing/overpricing and supports regional affordability.

---

## 7. Launch Discount

### Recommendation
- Launch discount: **10%**
- Duration: **7 days**
- Use **15%** only if wishlist volume is weak and price sensitivity is high.
- Avoid 20%+ unless strategically needed.

### Rationale
Discount improves wishlist conversion without training players to wait for deep sales.

### Decision
**Go with 10% launch discount.**

---

## 8. Anti-Cheat & Multiplayer Integrity

### Required
- Steam authentication enabled.
- Server-side validation for critical gameplay events.
- Basic detection for:
  - speed hacks
  - impossible movement
  - impossible fire rate
  - modified clients
  - abnormal win/loss or XP gain
- Ban policy documented.

### Anti-Cheat Options
- Casual/co-op: lightweight server validation may be enough.
- Competitive PvP: use stronger solution such as Easy Anti-Cheat or equivalent.

### Decision
**No-go if:** client-authoritative combat or progression can be exploited.

---

## 9. Community Hub Moderation

### Required Before Launch
- Steam forum categories:
  - Announcements
  - Bug Reports
  - Feedback
  - Looking for Group
  - Technical Support
- Pinned posts:
  - Known Issues
  - Roadmap
  - Bug Reporting Template
  - Code of Conduct
  - Server Status
- Assign moderators for first 72 hours.

### Response SLA
| Issue | Response Target |
|---|---:|
| Server outage | 15–30 min |
| Game-breaking bug | 1–2 hrs |
| Refund/review complaint | same day |
| Balance feedback | 24–48 hrs |

### Decision
**Go if:** moderation coverage exists for launch weekend.

---

## 10. Refund Risk

### Main Refund Triggers
- Matchmaking failure
- Crashes in first 30 minutes
- Poor onboarding
- Misleading store page
- Performance issues
- Empty servers
- Forced account creation

### Mitigations
- Bot match / solo fallback if matchmaking fails.
- Clear system requirements.
- Launch-day server status page.
- First-session tutorial under 5 minutes.
- Avoid unsupported feature claims.

### Decision
**No-go if:** average first-session crash rate exceeds 2–3%.

---

## 11. Review Bombing Risk

### Triggers
- Server downtime
- Anti-cheat false positives
- Regional pricing backlash
- Balance nerfs
- Discord/community controversy
- Perceived pay-to-win DLC

### Prepared Responses
- “We are investigating.”
- “Here is the ETA.”
- “Here is what changed.”
- “Here is compensation, if applicable.”

### Rule
Do not argue in reviews. Reply calmly with fixes and links.

### Decision
**Go if:** incident comms template and escalation owner are assigned.

---

## 12. Patch Cadence

### Recommended Cadence
| Timing | Patch Type |
|---|---|
| Day 0 | Critical fixes only |
| Day 1–3 | Hotfixes for crashes, matchmaking, blockers |
| Day 7 | Stability + balance patch |
| Day 14 | Quality-of-life patch |
| Day 30 | Content/retention update |

### Branching
- `release`
- `hotfix`
- `staging`
- `internal`

### Decision
**Go if:** hotfix pipeline can ship within 24 hours.

---

## 13. Creator / Influencer Embargo Timing

### Recommended Timeline
| Timing | Action |
|---|---|
| T-21 days | Send preview keys to trusted creators |
| T-14 days | Demo/content capture allowed |
| T-7 days | Review/preview embargo lifts for impressions |
| T-3 days | Sponsored creator content goes live |
| T-1 day | Streamer launch reminder |
| Launch hour | Embargo fully lifted |

### Multiplayer Requirement
Schedule creator play sessions so matchmaking looks alive.

### Decision
**Go if:** creators have stable build at least 7 days before embargo lift.

---

## Final Launch Gates

### Must Be Green
- Matchmaking stable
- Server capacity tested
- Anti-cheat baseline active
- Demo funnel working
- Achievements verified
- Cloud saves verified
- Regional prices reviewed
- 10% launch discount configured
- Moderation staffed
- Hotfix process ready
- Influencer embargo calendar locked

### Final Verdict
**Conditional GO.**  
Hold launch if multiplayer reliability, anti-cheat integrity, or first-session stability are not production-ready.
