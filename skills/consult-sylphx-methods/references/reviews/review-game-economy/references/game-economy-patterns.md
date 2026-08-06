# Game Economy Patterns And Quantitative Methods

## Contents

1. Economy map and invariants
2. Sources, sinks, stock, and velocity
3. Progression and affordability curves
4. IAP-led monetization and IAA interaction
5. Gacha and randomized-reward math
6. Passes, events, catch-up, and late entry
7. Refunds, abuse, and durable value
8. Cohort simulation and tuning

## 1. Economy map and invariants

Document every currency, item, entitlement and resource:

```text
value_id/type and player purpose
earned, purchased, granted and converted sources
sinks, converters and exchange rates
storage cap, expiry and overflow
tradeability, gifting and account/character scope
duplicate ownership and replacement value
refund/revoke/support treatment
durable, seasonal or ephemeral state
abuse, inflation and concentration risks
```

Core invariants:

- every source has a player purpose and a credible sink, ceiling or conversion;
- every sink expresses meaningful choice or progression rather than taxing basic enjoyment;
- authoritative grants/spends/transfers/conversions are idempotent and replayable;
- balances never silently diverge across devices or after retries;
- purchased value is not silently reduced or confiscated;
- baseline access remains viable without optional paid acceleration;
- late entry has renewable/non-monopolizable paths to essential resources;
- material tuning states its affected cohorts, compensation and communication.

## 2. Sources, sinks, stock, and velocity

Use one consistent unit and time horizon per calculation.

```text
net_flow[c,t] = total_sources[c,t] - total_sinks[c,t]
closing_stock[c,t] = opening_stock[c,t] + net_flow[c,t]
source_share[s,c,t] = source_amount[s,c,t] / total_sources[c,t]
sink_share[k,c,t] = sink_amount[k,c,t] / total_sinks[c,t]
velocity[c,t] = total_spent_or_transferred[c,t] / average_stock[c,t]
real_affordability[item,cohort,t] = item_price / eligible_earning_rate
```

Inspect medians and tails by cohort. Aggregate balance can hide wealthy veterans, trapped newcomers, dead currencies, one dominant faucet, forced leftovers or a small harmed payer group.

For tradable economies also track price index, spread, depth/liquidity, item/currency concentration, wealth mobility, bot/RMT/fraud share and guild/market monopolies.

Stress:

- event faucet without matching demand;
- sink removal or content drought;
- item duplication or reward replay;
- player migration/merge;
- high-spend grant followed by refund;
- low-population market and manipulation;
- expansion compression or obsolete inventory.

## 3. Progression and affordability curves

```text
cumulative_cost[n] = sum(incremental_cost[1..n])
time_to_goal = required_value / eligible_value_rate
completion_ratio = obtainable_value_in_window / required_value
marginal_power_efficiency = delta_effective_power / marginal_cost
```

For every progression, crafting, upgrade, duplicate-conversion or collection goal, report:

- first meaningful use and next visible goal;
- active and elapsed time distributions;
- deterministic minimum and stochastic/loss tail;
- currency opportunity cost and competing sinks;
- baseline/non-payer, typical payer and high-spend paths;
- content, skill and social prerequisites;
- late-start, return, catch-up and season-end behavior;
- cap, diminishing return, compression and long-horizon power creep.

Do not hide a mandatory wall behind an average rate when variance or schedule makes the real tail materially worse.

## 4. IAP-led monetization and IAA interaction

IAP-led means player-chosen purchase of understandable value is the primary commercial hypothesis. It does not authorize pressure in every loop or a deliberately weak baseline.

Model each offer:

```text
eligible cohort and prerequisite value moment
contents, ownership overlap and local real-money meaning
price, tax/storefront, purchase limit and cooldown
expected utility and comparison with ordinary earn path
entitlement, restore, refund/revoke and support state
cannibalization against other offers, subscription/pass and ads
retention, regret, fairness and concentration countermetrics
```

Net retained contribution:

```text
incremental purchase or ad revenue
- storefront/provider fees and tax borne by product
- reward/content/service cost
- refunds, chargebacks and fraud
- support and moderation cost
- IAP/subscription/ad cannibalization
- incremental churn and trust loss
```

Segment payer conversion, payer retention, repeat purchase, refund/chargeback, offer regret, concentration and non-payer experience. A revenue lift concentrated in a small harmed tail is not automatically healthy.

IAA interaction:

- rewarded ads state value, cap and failure before opt-in;
- interstitials occur only at natural breaks after value;
- payers, subscribers and ad-free purchasers follow the promised suppression rule;
- ad reward rate does not dominate play or inflate scarce currency;
- compare ad contribution with IAP conversion, retention, complaints, battery, startup and low-end performance.

## 5. Gacha and randomized-reward math

Define the exact probability process, not only displayed base rates.

### Required variables

```text
pool and rarity/item probabilities by pull index
featured split and guarantee state
soft-pity schedule and hard-pity ceiling
guarantee loss/win and carry-over rules
duplicate prevention/conversion
pull price and local real-money equivalent
earnable pulls per relevant window
free/paid currency precedence
```

For a constant independent probability `p` without pity:

```text
P(success by n pulls) = 1 - (1 - p)^n
P(first success at n) = (1 - p)^(n-1) * p
E[pulls to success] = 1 / p
```

Do not apply those formulas unchanged when pity, guarantees, changing pools, no-replacement draws or featured-loss states exist. Use state-machine enumeration or deterministic Monte Carlo with a fixed seed and convergence checks.

Report:

- probability of desired result by 10/50/90/95/99 percentiles or project-relevant points;
- expected, median and upper-tail pulls and real-money cost;
- maximum cost under hard guarantee;
- probability and cost of featured item, complete set and duplicate outcomes;
- pity/guarantee state before and after each transition;
- carry-over value across banners;
- earnable-currency time to one guarantee for baseline and returning cohorts;
- sensitivity to pool, rate, pity, price and duplicate conversion changes.

Validate deterministic pity transitions for every boundary and statistical conformance sized to the rarest disclosed outcome and chosen confidence. Never personalize odds from spend, failures, churn risk, social status, distress, age or inferred vulnerability.

Use visible hard guarantees and deterministic alternatives where the model proceeds. Paid random rewards for known or likely minors remain off unless exact current authority and guardian safeguards explicitly permit them.

## 6. Passes, events, catch-up, and late entry

Battle/season pass reachability:

```text
required_points
available_points_by_source_and_window
realistic_completion = obtainable_points / required_points
missed_day/week sensitivity
late_purchase and late_start paths
free/premium overlap and duplicate ownership
post-season unclaimed/temporary value state
```

Show active effort and elapsed calendar constraints. Do not sell a pass whose ordinary target cohort cannot reasonably complete or whose end pressure depends on paid repair.

Event economy defines start/end/timezone, eligibility, sources/sinks, caps, catch-up, late entry, purchase interactions, temporary inventory, unclaimed rewards, conversion, compensation and archive/return path.

Catch-up should close obsolete vertical distance to viable participation, not grant top prestige, erase veteran history or make churn the optimal earning strategy. Keep essential resources renewable and non-monopolizable.

## 7. Refunds, abuse, and durable value

Value transitions:

```text
grant -> available -> reserve -> spend/consume/transfer/convert
grant -> refund/revoke -> remaining_value_reconciled
spent value + ordinary refund -> declared product consequence and support path
repeated/high-confidence abuse -> proportionate commerce restriction/review/appeal
duplicate/out-of-order event -> idempotent no-op or deterministic correction
```

Ordinary refunds reconcile the affected entitlement or remaining value. Do not auto-ban, delete unrelated progress or create surprise debt. Chargebacks, repeated spent-value refunds, duplication and fraud may trigger evidence-based graduated controls with false-positive recovery and appeal.

Test multi-accounting, bots, clock/device manipulation, trading, referral rings, ad callback replay, support overrides and migration duplication.

## 8. Cohort simulation and tuning

Minimum simulation matrix:

| Cohort/state | Required questions |
| --- | --- |
| Day-0/new | activation, first goals, affordability, currency comprehension |
| Regular/typical | sustainable sources/sinks, choice cadence, content burn |
| Skilled | efficiency ceiling, dominant strategy, exploit boundary |
| Returning/late | recap, catch-up, obsolete value, viable participation |
| Baseline/non-payer | core viability, deterministic essentials, ad pressure |
| Typical payer | value, acceleration, overlap, regret and retention |
| High-spend | concentration, tail cost, spend controls and fairness |
| Veteran/wealthy | stockpiles, market power, sinks and horizontal value |
| Low population | liquidity, prices, renewable sources and fallback |
| Exploit/refund | duplicate grants, rings, spent-value reversal, false positives |

Run deterministic baseline plus stochastic trials with fixed seeds. Record inputs, formulas, run count/convergence rationale, outputs, invariants, sensitivity and limitations. Simulations prove arithmetic/state behavior, not human fun, fairness or willingness to pay.

Bound autonomous tuning by named parameters, maximum step, cooldown, cohorts, countermetrics and rollback/compensation. Never let a revenue optimizer rewrite prices, odds, pity, entitlement meaning, spend limits, fairness floors or its own promotion gate.
