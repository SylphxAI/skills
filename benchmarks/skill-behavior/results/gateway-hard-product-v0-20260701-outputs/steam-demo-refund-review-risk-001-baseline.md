## Steam Next Fest Launch Plan Audit (Indie Game)

### Executive Readiness Verdict
**Status: Conditional Go / Needs validation before Next Fest.**  
The plan covers the right launch pillars, but success depends on demo polish, wishlist conversion, build stability, pricing accuracy, community readiness, and first-week response discipline.

---

## 1. Public Demo Readiness

### Must Pass
- Demo is **representative of the final game**, not a throwaway slice.
- Clear ending with CTA:
  - “Wishlist now”
  - “Join Discord”
  - “Follow developer”
  - “Try full release / coming soon”
- Save data behavior is clear:
  - Demo saves separate from full game, or
  - Confirmed upgrade path into full game.
- Demo length: ideally **20–45 minutes** for Next Fest.
- No major blockers, soft locks, save corruption, or performance spikes.

### Audit Risks
- Demo gives away too much content.
- Demo starts too slowly.
- No wishlist prompt after the strongest moment.
- Demo build differs too much from store screenshots/trailer.

### Required Artifact
- Demo test matrix covering:
  - First launch
  - Save/load
  - Controller
  - Steam Deck if applicable
  - Common resolutions
  - Quit/relaunch
  - End-of-demo CTA

---

## 2. Wishlist Strategy

### Must Pass
- Store page is live and polished before Next Fest traffic arrives.
- Capsule art is competitive at small sizes.
- Short description clearly states genre, hook, and fantasy.
- Trailer shows gameplay in first 5–10 seconds.
- Demo links back to wishlist CTA.

### KPIs to Monitor
- Demo downloads → wishlists
- Store visits → wishlists
- Impressions → store visits
- Trailer completion rate if available
- Wishlist velocity during event

### Audit Risks
- Generic capsule art.
- Trailer is cinematic-heavy and gameplay-light.
- Store page lacks clear player promise.

---

## 3. Regional Pricing

### Must Pass
- Pricing reviewed before launch using Steam’s regional recommendations as baseline.
- Key markets checked manually:
  - US
  - EU
  - UK
  - Brazil
  - Turkey/MENA
  - LATAM
  - CIS
  - China
  - Japan
  - Korea
- Discounting plan does not train players to wait immediately.

### Audit Risks
- Overpricing in lower-income regions harms launch volume.
- Underpricing enables gray-market abuse.
- Launch discount too steep and damages perceived value.

### Recommendation
Use Steam suggested regional pricing unless there is a specific market reason to deviate.

---

## 4. DLC Roadmap

### Must Pass
- DLC roadmap does not make base game feel incomplete.
- Cosmetic/content DLC clearly separated from core gameplay.
- No paid DLC messaging during demo unless tasteful and non-disruptive.
- Roadmap wording avoids overpromising.

### Audit Risks
- Players perceive cut content.
- Roadmap promises features not yet validated.
- DLC announced before the core game proves value.

### Required Artifact
- Public roadmap with:
  - Free updates
  - Paid DLC, if any
  - Approximate windows, not exact dates unless locked

---

## 5. Cloud Saves

### Must Pass
- Steam Cloud configured for correct save path.
- Tested across:
  - Same OS, different machines
  - Offline to online sync
  - Conflict resolution
  - Demo/full version interaction, if applicable

### Audit Risks
- Save corruption.
- Demo saves overwriting full-game saves.
- Cloud path includes config files that should remain local.

### Gate
No launch without verified save integrity.

---

## 6. Controller Support

### Must Pass
- Store claims match reality:
  - Partial Controller Support
  - Full Controller Support
  - Steam Deck compatibility, if applicable
- UI has controller glyphs.
- Rebinding/default layouts tested.
- No mouse-only menus if claiming full support.

### Audit Risks
- Incorrect Steam store tag causes negative reviews.
- Controller works in gameplay but not menus.
- Text too small on handhelds.

---

## 7. Early Reviews

### Must Pass
- Review keys distributed early enough for coverage.
- Embargo terms are clear.
- Demo and release builds are labeled properly.
- Reviewers are informed of known issues and planned patches.

### Audit Risks
- Reviewers receive unstable build.
- Misaligned expectations from trailer/store page.
- No review monitoring during launch week.

### Required Artifact
- Reviewer brief:
  - Game description
  - Build version
  - Embargo date
  - Contact
  - Known issues
  - Content warning, if relevant

---

## 8. Refund Risk

### Main Drivers
- Performance problems
- Misleading store page
- Short or repetitive content
- Crashes in first hour
- Unsupported controllers/Steam Deck despite claims
- Incorrect language support claims

### Mitigations
- Put core fun in first 15 minutes.
- Accurately state content length.
- Avoid inflated tags.
- Fix first-hour bugs before all else.
- Monitor refund comments if accessible through Steam reporting.

### Red Flags
- Median playtime under 20 minutes.
- Negative reviews mention “not as advertised.”
- High crash rate during tutorial/onboarding.

---

## 9. Community Moderation

### Must Pass
- Steam Discussions are staffed during Next Fest and launch week.
- Moderation policy is published.
- Bug report template pinned.
- Known issues thread pinned.
- FAQ pinned.

### Moderation Rules
- Do not argue with negative reviews.
- Acknowledge issues quickly.
- Move bug reports into tracking.
- Remove hate, harassment, spam, and spoilers according to policy.

### Required Roles
- Community lead
- Technical triage owner
- Escalation owner for emergencies

---

## 10. Streamer Keys

### Must Pass
- Keys distributed through controlled channels:
  - Steam Curator Connect
  - Keymailer
  - Lurkit
  - Woovit
  - Direct verified outreach
- Key requests manually vetted.
- Use limited batches to reduce resale risk.

### Audit Risks
- Fake creator requests.
- Over-distribution before launch.
- No streamer-friendly settings.

### Required Features
- Streamer mode if licensed music or spoilers are an issue.
- Press kit with logos, screenshots, trailer, game description, and contact.

---

## 11. Build Rollback

### Must Pass
- Previous stable branch preserved.
- Hotfix branch prepared.
- Steam depots and branches documented.
- Rollback owner assigned.
- Build numbers visible in-game and in crash reports.

### Required Artifact
- Rollback runbook:
  - Trigger criteria
  - Who approves rollback
  - How to revert branch
  - How to communicate to players
  - How to preserve saves

### Rollback Triggers
- Save corruption
- Crash-on-launch spike
- Progression blocker affecting many users
- Major platform-specific breakage

---

## 12. First-Week Live Operations

### Daily Operating Rhythm
**Day 0–1**
- Monitor reviews, discussions, Discord, crash reports.
- Prioritize:
  1. Crashes
  2. Save issues
  3. Progression blockers
  4. Performance
  5. UX confusion

**Day 2–3**
- Release first hotfix if needed.
- Publish known issues update.
- Share thank-you/community post.

**Day 4–7**
- Patch remaining high-impact issues.
- Review wishlist/sales/refund signals.
- Adjust FAQ and store copy if players are confused.

### Required Dashboards
- Sales
- Wishlists
- Demo downloads
- Review sentiment
- Refund indicators
- Crash reports
- Top discussion topics
- Regional performance

---

## Final Go/No-Go Checklist

### Go Only If
- Demo is stable and compelling.
- Store page is accurate and conversion-ready.
- Regional pricing is reviewed.
- Cloud saves tested.
- Controller claims verified.
- Community moderation staffed.
- Streamer/reviewer outreach controlled.
- Rollback plan tested.
- First-week live ops schedule assigned.

### No-Go If
- Save corruption exists.
- Crash-on-launch unresolved.
- Store page misrepresents content.
- Controller/cloud save claims are untested.
- No rollback path exists.
- No one is assigned to monitor launch channels.
