---
name: design-ad-monetization
description: "Design in-product ad placements and rewarded-ad grants. Use when the user asks about rewarded ads, mediation, ad-free purchase, or interrupting the core loop. Do not use for buyer checkout or store listings."
---

# Design Ad Monetization

Place ads only at natural breaks. A disabled placement starts no SDK, network, or background work.

Rewarded grants follow eligible → requested → loaded → started → completed → verified → granted. No-fill, timeout, and duplicate callbacks do not grant.

Open [ad monetization systems](references/ad-monetization-systems.md) when the mediation or reward machine needs depth.
