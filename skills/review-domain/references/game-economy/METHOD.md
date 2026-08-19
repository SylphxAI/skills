# Game Economy

Assess whether the game's sources, sinks, prices, odds, and progression
reinforce play without hostage progress, unfair tails, or silent confiscation
of purchased value.

## Method

1. Map every currency, item, and entitlement: purpose, sources, sinks, caps,
   expiry, tradeability, refund treatment, and abuse risk.
2. Open [game economy patterns](game-economy-patterns.md) for invariants,
   affordability math, IAP/IAA interaction, gacha/pity modeling, passes, and
   cohort simulation.
3. Check core invariants: every source has a sink; baseline play remains
   viable without paid acceleration; grants are idempotent; purchased value is
   not silently reduced; late entry has a renewable path to essentials.
4. For randomized rewards, model the actual state machine (pity, featured loss,
   duplicates), not only displayed base rates. Report expected, median, and
   upper-tail real-money cost.
5. Segment new, typical, returning, non-payer, payer, and high-spend cohorts.
   A revenue lift concentrated in a harmed tail is not health.
6. Return ranked economy findings and the tuning or policy action each needs.

## Output

Economy map, invariant failures, cohort affordability, odds/cost tails if
applicable, and owner actions.
