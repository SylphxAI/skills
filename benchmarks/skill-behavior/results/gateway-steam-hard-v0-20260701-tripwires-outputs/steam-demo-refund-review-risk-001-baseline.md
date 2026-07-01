# Next Fest Launch Audit — Indie Title

**Scope:** Demo, wishlists, regional pricing, DLC roadmap, cloud saves, controller support, early reviews, refund risk, moderation, streamer keys, build rollback, week-1 ops.

---

### 1. Public Demo
- **Risk:** Demo on default branch may cause save-schema conflicts and refund spike if demo ≠ launch build.
- **Action:**
  - Ship demo on separate `demo` branch, no cross-save with main.
  - Lock build 2 weeks pre–Next Fest; tag `demo-1.0`.
  - Telemetry: session length, level reached, crash rate → feeds back to dev.

### 2. Wishlists
- **Risk:** Low conversion without update cadence.
- **Action:**
  - Weekly devlog via Steam Events + email opt-in.
  - Target ≥10% wishlist → sale conversion week 1.
  - Refresh capsule/screenshots at T-7 days pre-fest.

### 3. Regional Pricing
- **Risk:** Mispriced LATAM/SEA → low conversion; low-tier countries → chargeback risk.
- **Action:**
  - Use Valve "Suggested" tier baseline; override only with $/hour data.
  - Audit India, Brazil, Turkey, Argentina monthly.
  - Avoid regional pricing on microtransactions <$1.

### 4. DLC Roadmap
- **Risk:** Hard public dates lock scope; missed dates damage trust.
- **Action:**
  - Publish **soft** roadmap (theme + quarter), no fixed dates.
  - Hold scope for post-launch DLC until week 4 retrospective.
  - Pre-design Steam DLC app metadata shells now.

### 5. Cloud Saves
- **Risk:** Multi-device save conflicts → data loss → refund/complaint.
- **Action:**
  - Enable Steam Cloud with per-slot quota.
  - "Newer timestamp wins" + explicit conflict warning UI.
  - Document cloud behavior on store page.

### 6. Controller Support
- **Risk:** "Partial support" tag reduces discoverability; broken glyphs hurt reviews.
- **Action:**
  - Promote to **Full** via Steam Input or native XInput/SDL.
  - Verify PS/Xbox/Switch glyphs in Steam overlay.
  - Re-test DualSense haptics if claimed.

### 7. Early Reviews
- **Risk:** Negative pre-launch reviews from mixed-key streamers leak to page.
- **Action:**
  - Curator-only pre–Next Fest (NDA + 4-week embargo).
  - Reviewer keys via Keymailer/Woovit request form.
  - Provide asset kit: logos, 4K screenshots, key art.

### 8. Refund Risk
- **Risk:** Spike if playtime >2h or crash loops.
- **Action:**
  - Monitor daily; alert threshold >5%.
  - Triage: bug vs expectation vs pricing.
  - Pre-write public responses for top 3 refund causes.

### 9. Community Moderation
- **Risk:** Unmoderated forums/Discord becomes hostile → visibility damage.
- **Action:**
  - 2 mods + 1 escalation owner before launch.
  - Steam forum: enable upvotes, hide abuse, weekly FAQ.
  - Discord: auto-mod + rules + documented ban SOP.

### 10. Streamer Keys
- **Risk:** Leaked keys → resellers → review-bomb risk.
- **Action:**
  - Tiered key requests via approved partner only.
  - Streamers get keys only after demo live.
  - Offer region-locked keys for restricted creators.

### 11. Build Rollback
- **Risk:** Bad hotfix breaks main; no clean rollback path.
- **Action:**
  - Maintain `default` and `beta` branches.
  - Rollback SOP: pin previous depots, redeploy <60 min.
  - Schema migrations additive/forward-compatible for ≥1 release.

### 12. First-Week Live Ops
- **Risk:** Slow response to crashes; missed sales window.
- **Action:**
  - On-call rota 24/7 for first 72h, then business hours.
  - Hotfix SLA: P1 <4h, P2 <24h.
  - Daily dashboard: DAU, crash-free %, refund %, store traffic, wishlist→sale.
  - Day-7 post-mortem + public changelog.

---

### Top 5 Pre-Fest Priorities
1. Lock demo branch + Cloud save conflict UI.
2. Confirm **Full** controller support + glyph pass.
3. Pricing audit on tier-2/3 regions.
4. Stand up reviewer/streamer program with embargo.
5. Pre-stage rollback branch + on-call rota.
