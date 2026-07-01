# Steam Next Fest Demo & Launch Page Audit

## 1. Store / Demo Promise Audit

| Claim Channel | Promise Made | Reality | Verdict | Action |
|---|---|---|---|---|
| Trailer | Feature X, Y shown in action | Only X in demo build | **MISMATCH** | Cut footage or re-cut trailer to demo-scope |
| Trailer | Boss fight shown | Not playable in demo | **MISMATCH** | Move to launch trailer |
| Screenshots | Controller UI overlays | Partial mapping, no glyphs | **OVERPROMISE** | Replace or tag "full support at launch" |
| Screenshots | Cloud-save icon | Not implemented | **FALSE** | Remove or replace |
| Store blurb | 12 languages | 8 verified, 4 unverified | **PARTIAL** | Remove unverified languages or list "coming at launch" |
| Capsule | "60+ hours of content" | 12h launch + 48h DLC roadmap | **AMBIGUOUS** | Split: "12h at launch, roadmap below" |
| Demo UI | Tutorial card "Master the loop" | 3 prompts, no practice | **UNDER** | See §4 |

## 2. Build / Platform Gates (Demo Blockers)

- [ ] **B1** Demo build hash matches Steam depots; no debug cheats exposed
- [ ] **B2** Controller mapping tested: Xbox, PS, generic HID → demo-scope features only
- [ ] **B3** Cloud-save: either ship in demo OR remove visual evidence
- [ ] **B4** Locale parity: every listed language passes pseudo-loc, no clipped UI
- [ ] **B5** Save/load round-trip clean across crash + alt-tab
- [ ] **B6** First-run flow ≤ 90s to first "aha" of core loop
- [ ] **B7** FPS stable on min-spec (GTX 1060 / Steam Deck Verified target)

## 3. Expectation-Setting Fixes (Before Fest)

1. **Re-cut trailer** to demo-scope only, OR add persistent watermark: "Trailer contains launch content"
2. **Store page banner** above description: "Demo includes: A, B, C. Launch adds: D, E (see roadmap)"
3. **Capsule swap** to remove cloud icon; replace controller screenshot with demo-accurate one
4. **Tag screenshots** with corner badge if they show post-demo content
5. **FAQ block** explicitly separating "In Demo" vs "At Launch" vs "DLC Roadmap"
6. **Reddit/Discord pre-pins** aligning with store copy to avoid community trust loss

## 4. Demo Tutorial Patch (Core Loop Teaching)

| Minute | Player Goal | Teach | Verify |
|---|---|---|---|
| 0:00 | Move, look | Input glyphs + 1 safe room | Reach marker |
| 0:30 | Resource gather | One verb, one result | Inventory tick |
| 1:00 | Core verb combine | Cause→effect with sound | Successful craft |
| 1:30 | Loop payoff | Reward, risk feedback | Score/feedback UI |
| 2:00 | Failure state | What loss looks like | Die once, recover |
| 2:30 | Hand-off | "You've got it" → sandbox | Free play |

Add **contextual hint chips** (toggleable) and a **demo-specific "What's Next" poster** in the hub pointing to wishlist.

## 5. Refund / Review Risk Controls

- **Refund triggers to monitor:** "didn't match trailer," "no controller," "missing languages," "too short / tutorial"
- **Response SOPs:**
  - Trailer mismatch → acknowledge, link demo-scope list
  - Feature missing → confirm roadmap date, offer DLC code if delay >2 wk post-launch
  - No auto-bans on negative reviews; flag for comms review only
- **Pre-emptive mitigations:**
  - Pin Steam Community post listing what's in/out of demo
  - Patch demo mid-Fest if tutorial data shows <60% loop completion
  - Block reviews that cite missing DLC content (not refundable grounds) via Steam's "off-topic" flag where policy allows
- **Tracking:** weekly sentiment scrape (English + listed locales); alert if negative >25% on any gated topic

## 6. Wishlist Measurement

| Metric | Target | Source |
|---|---|---|
| Demo plays → wishlist conversion | ≥ 12% | Steamworks demo telemetry |
| Wishlist → launch purchase | ≥ 18% | Marketing dashboard |
| Trailer view-through (demo re-cut) | ≥ 45% | YouTube analytics |
| Steam Deck verified badge | Required | Valve review |
| Wishlist net add / day during Fest | +200% baseline | Steamworks |
| Trailer-to-store CTR | ≥ 4% | UTM + pixel |

## 7. Launch Blockers (Hard Gates)

🛑 **Must fix before launch:**
1. All §2 build gates green
2. Store copy reconciled with actual ship content; DLC clearly marked
3. Tutorial completion telemetry ≥ 75% on demo
4. All store-advertised languages QA'd (or removed)
5. Cloud-save shipped OR visual evidence removed
6. Refund-reasons dashboard set up; CS trained on demo/launch split

⚠️ **Soft gates (acceptable to ship if disclosed):**
- DLC roadmap not final
- Additional controller haptics not tuned
- One secondary locale deferred with notice

**Ship / No-ship rule:** Any 🛑 open = no launch until resolved or copy corrected.
