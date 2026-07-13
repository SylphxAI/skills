---
name: game-economy-review
description: "Design or audit one complete game economy artifact for mobile, PC, console, web, casual, premium, or live-service games: currencies, inventory, sources/sinks, progression pacing, rewards, gacha/pity, battle passes, IAP/ads, events, refunds/revocation, inflation, concentration, anti-abuse, newcomer/veteran fairness, simulations, and live tuning. Use for economy ownership and balance; use Game Design for whole-game coherence and Payment Readiness for provider transactions."
---

# Game Economy Review

Produce a **Game Economy Specification** whose fun, progression, scarcity,
fairness, and monetization remain sustainable across launch, seasons, veteran
accumulation, late joiners, refunds, and low population.

## Atomic boundary

Own currency/inventory authority, sources/sinks, price/reward tables, pacing,
chance/pity guarantees, purchase/ad/event projections, refund adjustment,
inflation/concentration, simulations, tuning controls, and live observability.
Do not own the complete core game, provider payment ledger, one daily loop, one
campaign, or release/distribution program.

Use a draft artifact ID, named assumptions, and explicit sibling handoffs while
designing. Let deterministic delivery tooling seal serialized versions and
digests later; never invent a digest or proof state.

## Agent-first invariant

For every selected economy capability, build the full versioned model,
deterministic simulator, replayable value history, tuning bounds, fraud controls,
migrations, kill switches, and cohort readbacks now. Use verified slices and
exposure gates for safety, not a thin launch economy followed by manual
hardening. Autonomous tuning may act only inside declared bounds; prices, odds,
pity, entitlements, grants, and material value semantics require an independently
validated candidate.

## Workflow

1. Define genre, core/session/meta loops, mastery/fantasy promise, audience and
   age modes, business model, content cadence, progression horizon, baseline
   access without optional paid acceleration, and ruin boundaries.
2. Read `references/game-economy-patterns.md`. Inventory every durable,
   seasonal, premium, earned, purchased, social, event, and ephemeral value;
   name its authority, transferability, expiry, refund treatment, and recovery.
3. Map sources and sinks by loop, cohort, payer state, progression, season, and
   time. Quantify faucets, drains, stock, velocity, concentration, unmet demand,
   and dead/mandatory currency.
4. Model price/reward/pacing curves, upgrade/crafting/repair, duplicate items,
   caps, exchange, gacha odds/pity/guarantees, battle-pass reachability,
   advertisements, offers, events, and comeback/catch-up. Calculate
   distributions and sensitivities using the equations and fixtures in the
   reference rather than supplying one average path.
5. Define append-only ledger and projections for grant, spend, transfer,
   reserve, expire, convert, refund/revoke, chargeback, rollback, restore,
   migration, compensation, and support correction with idempotency.
6. Simulate day-0, day-30, year-1, late-joiner, returning, baseline/non-payer,
   payer, high-skill, low-population, concentrated-wealth, exploit, and content
   drought cohorts. Include stochastic uncertainty and sensitivity ranges.
7. Set bounded tuning parameters, independent validation, anomaly/fraud
   detection, canaries, pause/rollback/forward-fix, and live readback.

## Source verification

Retrieve current store/payment, chance-based item/odds, child/age, advertising,
promotion, refund, virtual-currency, marketplace/trading, territory, and tax
authority for the exact platforms and audience modes. Unknown authority blocks
the affected exposure, not construction of the dormant adapter.

## When not to use

- Use `game-design-blueprint` when core play, progression, challenge, social,
  content, retention, feel, and platform experience must be designed together.
- Use `daily-reward-and-streak-review` for one recurring calendar/streak state
  machine and its economy handoff.
- Use `payment-platform-readiness` for checkout, receipts, provider events,
  settlement, entitlement projection, reconciliation, and finance close.
- Use `promotion-campaign-review` for one time-bounded offer/event and its
  audience/placement/fulfillment experiment.

## Guardrails

- Fun and meaningful choice come before extraction; monetization cannot repair
  weak gameplay or make the baseline path non-viable.
- Publish exact odds/pity where required and never use fake scarcity, hidden
  odds, misleading value anchors, or loss threats.
- Bound vertical dominance; give veterans horizontal identity/mastery/social
  value while keeping newcomers contributive and late entry viable.
- Ordinary refunds enter declared value adjustment/reconciliation; automatic
  bans, surprise debt, and deletion of unrelated progress are forbidden.
- Never tune from aggregate ARPDAU alone. Track progression, scarcity,
  inflation, concentration, completion, fairness, support, churn, abuse false
  positives, and long-term retained value by cohort.

## Output contract

Return one typed Game Economy Specification containing:

1. draft artifact ID, economy thesis, loops, audiences, baseline reachability, horizons, and ruin
   boundaries;
2. asset/currency/inventory authority map and ledger/projection state machine;
3. sources/sinks/stock/velocity/concentration matrix by cohort and season;
4. progression, price, reward, gacha/pity, battle-pass, ad, offer, event,
   catch-up, duplicate, expiry, and conversion tables;
5. refund/revoke/chargeback/restore/migration/support rules;
6. deterministic simulation fixtures, equations, distribution/quantile results,
   sensitivities, invariants, and limits;
7. tuning/admin authority, anomaly/fraud controls, event schema, dashboards,
   canaries, rollback/forward-fix, and live readback;
8. payment, campaign, daily loop, analytics, and game-blueprint handoffs with
   draft IDs, required inputs, acceptance questions, and no fabricated proof.

Complete only when ledgers replay, simulated cohorts remain viable, every
tuning parameter has bounds/authority, and the system can pause or recover
without corrupting durable player value.
