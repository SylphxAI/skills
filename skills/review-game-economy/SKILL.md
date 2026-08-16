---
name: review-game-economy
description: "Review a game economy so fun, progression, scarcity, fairness, and monetization stay sustainable across seasons, refunds, and population swings."
---

# Review Game Economy

Produce a **Game Economy Specification** whose fun, progression, scarcity,
fairness, and monetization remain sustainable across launch, seasons, veteran
accumulation, late joiners, refunds, and low population.

## Atomic boundary

Own currency/inventory authority, sources/sinks, price/reward tables, pacing,
chance/pity guarantees, purchase/ad/event projections, refund adjustment,
inflation/concentration, simulations, applicable tuning controls, and economy
observability selected for the actual authority and business model.
The complete core game, provider payment ledger, daily loops, campaigns, and release/distribution program
remain with their respective owners.

Use a named draft and revision, named assumptions, and explicit sibling
handoffs while designing.

## Economy implementation

For every selected economy capability, build the full versioned model,
deterministic simulator, authority-appropriate value history, migration and
recovery contract, and bounded controls now. A locally authoritative offline
premium game may satisfy this with deterministic local history, save migration,
backup/restore, and corruption recovery. Purchased, shared, remote-authoritative,
tradable, or live-tuned value additionally requires an append-only server
ledger, fraud/abuse controls, kill switches, canaries, and cohort readback. Mark
machinery omitted for an exact authority or business-model reason. Add a
service when the selected product model requires it. Use verified slices and
exposure conditions for safety and a complete launch economy with applicable
automation. Autonomous tuning may act only inside declared bounds; prices, odds,
pity, entitlements, grants, and material value semantics require an
independently validated candidate.

## Workflow

1. Define genre, core/session/meta loops, mastery/fantasy promise, audience and
   age modes, business model, content cadence, progression horizon, baseline
   access without optional paid acceleration, and ruin boundaries.
2. Read `references/game-economy-patterns.md`. Inventory every durable,
   seasonal, premium, earned, purchased, social, event, and ephemeral value;
   name its authority, transferability, expiry, refund treatment, and recovery.
3. Map sources and sinks by loop, cohort, payer state, progression, season, and
   time. Quantify faucets, drains, stock, velocity, concentration, unmet demand,
   and dead or forced-use currency.
4. Model price/reward/pacing curves, upgrade/crafting/repair, duplicate items,
   caps, exchange, gacha odds/pity/guarantees, battle-pass reachability,
   advertisements, offers, events, and comeback/catch-up. Calculate
   distributions and sensitivities using the equations and fixtures in the
   reference rather than supplying one average path.
5. Define the value-history authority and projections for every applicable
   grant, spend, transfer, reserve, expire, convert, refund/revoke, chargeback,
   rollback, restore, migration, compensation, and support correction. Use an
   append-only server ledger with idempotency for purchased, shared,
   remote-authoritative, or tradable value; use deterministic local save/history
   and migration/recovery invariants for a strictly offline local economy.
6. Simulate day-0, day-30, year-1, late-joiner, returning, baseline/non-payer,
   payer, high-skill, low-population, concentrated-wealth, exploit, and content
   drought cohorts. Include stochastic uncertainty and sensitivity ranges.
7. Set bounded tuning parameters and independent validation. Add anomaly/fraud
   detection, canaries, pause/rollback/forward-fix, and live readback wherever
   remote, purchased, shared, or live-authoritative effects make them
   applicable; otherwise define deterministic local validation and recovery.

## Source verification

Retrieve current store/payment, chance-based item/odds, child/age, advertising,
promotion, refund, virtual-currency, marketplace/trading, territory, and tax
authority for the exact platforms and audience modes. Unknown authority blocks
the affected exposure, not construction of the dormant adapter.

## Path

- Fun and meaningful choice come first. The baseline path stays viable. Monetization sits on that path.
- Exact odds and pity are published where required. Scarcity, odds, value anchors, and loss language stay truthful.
- Vertical dominance is bounded. Veterans get horizontal identity, mastery, and social value. Newcomers stay contributive.
- Ordinary refunds enter declared value adjustment. Unrelated progress stays.
- Tune from progression, scarcity, inflation, concentration, completion, fairness, support, churn, abuse false positives, and long-term retained value by cohort.

## Output contract

Return one typed Game Economy Specification containing:

1. draft name and revision, economy thesis, loops, audiences, baseline reachability, horizons, and ruin
   boundaries;
2. asset/currency/inventory authority map and value-history/projection state
   machine, using a server ledger only where the authority model requires it;
3. sources/sinks/stock/velocity/concentration matrix by cohort and season;
4. progression, price, reward, gacha/pity, battle-pass, ad, offer, event,
   catch-up, duplicate, expiry, and conversion tables;
5. refund/revoke/chargeback/restore/migration/support rules;
6. deterministic simulation fixtures, equations, distribution/quantile results,
   sensitivities, invariants, and limits;
7. tuning/admin authority and the applicable anomaly/fraud controls, event
   schema, dashboards, canaries, rollback/forward-fix, live readback, or
   deterministic local validation and recovery, with explicit reasons for
   omitted components;
8. payment, campaign, daily loop, analytics, and game-blueprint handoffs with
   draft names and revisions, required inputs, acceptance questions, and
   observed state.

Complete only when the selected value history can be deterministically replayed
or reconstructed at its declared authority, simulated cohorts remain viable,
every tuning parameter has bounds/authority, and the system can pause or
recover without corrupting durable player value. Server-ledger and live-cohort
proof apply only to the economy classes that require those surfaces.
