---
name: design-ad-monetization
description: 'Design ad placements and rewarded-ad grants so attention is not an interruption tax and rewards are granted only after a verified completion. Use for in-product ads, not for buyer checkout.'
---

# Design Ad Monetization

Maximize incremental retained contribution without turning core utility into an interruption tax.

## Method

1. Place ads at natural breaks. Disabled placements must initialize no SDK, network, or background work.
2. For rewarded ads, use an explicit state machine: eligible → requested → loaded → started → completed → verified → granted. No-fill, timeout, and duplicate callbacks must not double-grant.
3. Payers and ad-free purchasers follow the promised suppression rule.
4. Ad rewards must not dominate play or inflate a scarce currency. Hand economy effects to `review-domain` game-economy or `design-product` game shape.
5. Open [ad monetization systems](references/ad-monetization-systems.md) for the reward and mediation state machines.

## Output

Ad contract: placements, eligibility, reward state machine, suppression, and shutdown proof.
