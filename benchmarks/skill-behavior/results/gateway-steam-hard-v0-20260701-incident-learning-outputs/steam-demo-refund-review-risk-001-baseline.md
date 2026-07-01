## Steam Next Fest Launch Plan Audit — Indie Game Demo

### Executive Verdict
**Status: Conditionally ready** if the team can lock the demo build, Steam page, pricing metadata, support coverage, and rollback process before Next Fest begins. The highest-risk areas are **demo stability, refund-triggering expectation gaps, streamer/key abuse, moderation readiness, and live-ops response time**.

---

## 1. Critical Go / No-Go Criteria

| Area | Requirement | Status Decision |
|---|---:|---|
| Public demo | Playable, stable, representative, no major blockers | **Go only after QA signoff** |
| Steam page | Capsule art, trailer, tags, screenshots, CTA to wishlist | **Mandatory** |
| Wishlists | Visible CTA in demo, main menu, end screen, Steam page | **Mandatory** |
| Cloud saves | Works across devices or explicitly disabled | **Must verify** |
| Controller support | Accurate Steam labeling; tested on Xbox, DualSense, Steam Deck if relevant | **Must verify** |
| Regional pricing | Reviewed against Steam suggestions and key markets | **Before launch** |
| Build rollback | Known-good branch ready | **Mandatory** |
| Moderation | Discord/Steam forums staffed during festival | **Mandatory** |
| Streamer keys | Controlled distribution and tracking | **Mandatory** |
| First-week ops | Daily triage, hotfix window, comms owner | **Mandatory** |

---

## 2. Demo Readiness Audit

### Must-Haves
- Demo has a **clear start, satisfying end, and wishlist prompt**.
- No save corruption, soft locks, progression blockers, or crash loops.
- Demo content reflects the final game honestly; avoid overpromising.
- Include:
  - Main menu wishlist button.
  - End-of-demo wishlist CTA.
  - Link to Discord/newsletter if applicable.
  - Settings menu with audio, graphics, controls, language if localized.
- Add analytics if compliant:
  - Start demo.
  - Complete tutorial.
  - Reach end.
  - Crash rate.
  - Wishlist CTA click.
  - Average session length.

### Red Flags
- Demo longer than necessary with weak pacing.
- Missing exit path after demo end.
- Unclear whether progress carries to full game.
- Poor onboarding causing early churn.

---

## 3. Wishlist Strategy

### Required
- Steam page optimized before festival traffic arrives.
- Trailer should show gameplay within first 5–10 seconds.
- Use end-card: **“Wishlist now to support launch.”**
- Pin Steam announcement: demo availability, feedback link, known issues.
- Include wishlist ask in:
  - Demo end screen.
  - Pause menu.
  - Main menu.
  - Social posts.
  - Streamer talking points.

### KPI Targets
- Demo-to-wishlist conversion.
- Page visit-to-wishlist conversion.
- End-of-demo completion rate.
- Trailer clickthrough and retention.

---

## 4. Regional Pricing Audit

### Actions
- Use Steam’s regional pricing recommendations as baseline.
- Manually inspect high-volume regions: US, EU, UK, Brazil, China, Japan, Korea, LATAM, Turkey/MENA if available.
- Avoid extreme underpricing that encourages cross-region arbitrage.
- Confirm DLC pricing philosophy matches base game value.

### Decision
Do **not** change prices reactively during festival unless there is a major error. Pricing instability can reduce trust.

---

## 5. DLC Roadmap

### Safe Approach
- Announce DLC only if it will not make the base game feel incomplete.
- Prefer wording: **“post-launch content roadmap”** over aggressive monetization.
- Clarify:
  - What is free update content.
  - What is paid DLC.
  - Approximate timing.
  - No paywalled core features.

### Refund/Review Risk
Avoid launching Next Fest messaging that implies the demo is a teaser for a game dependent on future DLC.

---

## 6. Cloud Saves and Controller Support

### Cloud Saves
- Test install/play/save/uninstall/reinstall on at least two machines.
- Confirm save path is included in Steam Cloud config.
- Test offline-to-online sync conflict.
- If unsupported, say so clearly on Steam.

### Controller Support
- Verify actual support against Steam labels:
  - Full Controller Support only if launcher-free and fully navigable.
  - Partial if keyboard/mouse required.
- Test remapping, glyphs, pause menu, UI scaling, disconnect/reconnect.

---

## 7. Early Reviews and Visibility

### Recommendations
- Use preview coverage, not paid review manipulation.
- Send press/creator demo access before Next Fest if possible.
- Encourage honest feedback; never request positive reviews.
- For the full game later, ensure review timing does not conflict with major bugs.

### Steam Reviews Note
Demo feedback does not equal full-game review score, but public sentiment will shape wishlists and discussion quality.

---

## 8. Refund Risk Audit

### Primary Causes
- Game shorter than implied.
- Performance worse than demo.
- Missing features suggested in marketing.
- Controller/cloud save claims inaccurate.
- DLC roadmap makes base game seem incomplete.

### Mitigations
- Align trailer, screenshots, tags, and demo with final product.
- Publish clear feature list.
- Maintain known-issues post.
- Avoid ambiguous claims like “open world,” “roguelike,” or “co-op” unless fully true.

---

## 9. Community Moderation

### Required Setup
- Steam Discussions categories:
  - Bug Reports
  - Feedback
  - FAQ
  - Known Issues
  - Suggestions
- Pin moderation rules.
- Assign coverage during peak hours.
- Escalation path for:
  - Crashes/save loss.
  - Offensive content.
  - Review bombing.
  - Refund complaints.
  - Streamer/public bug discoveries.

### Tone
Fast, calm, transparent. Do not argue with players.

---

## 10. Streamer Keys

### Controls
- Use Steam Curator Connect or trusted key platform.
- Limit key batches.
- Track recipient, region, date, purpose.
- Never send large untracked key dumps.
- Prepare streamer kit:
  - Trailer.
  - Screenshots.
  - Fact sheet.
  - Embargo/permissions.
  - Music copyright status.
  - Wishlist link.
  - Known issues.

### Fraud Risk
Expect fake creator emails. Verify channels manually.

---

## 11. Build Rollback and Release Safety

### Required
- Keep a **known-good demo branch**.
- Tag every release build.
- Maintain changelog per build.
- Smoke test before pushing public.
- Confirm rollback permissions and process.

### Hotfix Rules
Hotfix only:
- Crashes.
- Save/progression blockers.
- Severe performance issues.
- Broken controls.
- Major localization or store-breaking errors.

Avoid risky balance/content changes mid-festival.

---

## 12. First-Week Live Operations Plan

### Daily Cadence
- Morning: review crashes, Steam forums, Discord, analytics.
- Midday: triage bug severity.
- Afternoon: patch decision.
- Evening: community update if needed.

### Owners
- Build/release owner.
- Community/moderation owner.
- QA triage owner.
- Analytics owner.
- Press/streamer owner.

### Severity Matrix
| Severity | Example | Response |
|---|---|---|
| S1 | Crash on launch, save loss | Same-day hotfix/rollback |
| S2 | Progress blocker, broken controller path | Hotfix within 24–48h |
| S3 | Balance, typo, minor UI bug | Batch later |
| S4 | Suggestions | Track only |

---

## Final Audit Decision
Proceed with Next Fest **only if** the demo build is locked, rollback is tested, Steam claims match reality, moderation coverage is scheduled, and wishlist conversion points are implemented. The plan should prioritize **stability, clear expectations, fast support, and clean wishlist capture** over feature expansion.
