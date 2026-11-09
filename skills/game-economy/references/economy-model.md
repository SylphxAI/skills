# Economy model

Read when choosing pack contents, diagnosing inflation, raising a cap, adding
progression, or configuring or announcing a server-wide currency grant. The
equations below are accounting identities or chosen approximations; the
[sources](sources.md) support the modeling approach, not universal numerical
limits.

## Reconcile each resource

Map sources, stores, transfers, conversions and permanent sinks. Machinations
provides a useful representation for this: its Sources generate resources,
Pools hold them and Drains remove them. Include coins, materials, protection,
retry rights and progression rather than modeling the main currency alone.

For a fixed population, currency and complete window:

```text
closing stock = opening stock + external creation - permanent destruction
               + transfers into population - transfers out of population
```

When population membership changes, show the entering and leaving balances
separately. Reconcile against authoritative balances and settled events; name
unexplained differences. Include paid and free issuance, gifts, offline
production, refunds, reserves, conversion outputs and overlapping campaigns.
Count a box when its contents are created, not again when mail delivers it.
Track the unopened box as a separate outstanding claim.

A player-to-player loss transfers value. A payout from a finite reserve
transfers it from that reserve. A fee destroys currency only if it leaves the
modeled economy permanently. A conversion consumes one resource and supplies
another: it is not evidence that total economic pressure disappeared.

Read the full population where available. Segment active and dormant players,
tenure, progression, paying status and relevant modes. Report balance and use
quantiles, upper-tail concentration and the share unable to afford normal
play. Averages can hide both depleted newcomers and saturated veterans.

Set the future net issuance path from active population, desired access and
meaningful progression demand; a growing game need not have zero net issuance.
Use wanted voluntary sinks and new goals where they address the measured surplus.

## Admit a grant by progression, not delivery

Mechanical redemption proof establishes that a route credited the configured
assets exactly once. It does not establish economic admission. This assessment
is non-retroactive: it governs undocumented proposals and future communications,
never the fulfillment of an existing player-visible written commitment; see the
[Non-Retroactive Commitment Boundary](offers-gifts-and-experiments.md#non-retroactive-commitment-boundary).
Before
configuring or announcing any server-wide currency grant, read authoritative
balance and remaining-progression-cost distributions by tenure, progression and
payer band, plus the target currency's current source-minus-sink direction over
a complete comparable window. Do not substitute aggregate balances or a
successful first grant for these measurements: the decision can otherwise skip
newcomers past early play or reverse the intended stock trajectory.

Compare the fixed amount and plausible full-uptake issuance with the intended
progression pace, remaining useful goals and desired opening-to-closing stock
path. When the measured objective is to reduce currency stock, a large new
currency grant is inadmissible even if every account can claim only once.
Evaluate a progression-proportional amount or a non-currency reward instead,
including the alternative's acceleration and purchase-displacement effects;
binding an item does not make those effects free.

Production acceptance must prove both the intended asset deltas and **exactly
zero unwanted-currency delta** on first and duplicate redemption attempts. A
no-op duplicate and a single successful credit are useful execution checks,
not evidence that the reward was economically admissible or free of side effects.

Synthetic contrast:

| ❌ Bad | ✅ Good |
| --- | --- |
| New players hold a median of 40 coins and need 200 more for early progression; a fixed grant of 10,000 credits exactly once and the duplicate attempt is a no-op. The perfectly idempotent grant still skips the intended early game and reverses a measured deflation objective. | Choose a quantity bounded by the measured next progression step, or a non-currency reward whose acceleration remains within the intended band. First and duplicate checks confirm the intended items and zero additional coins, preserving progression and the stock objective. |

## Distinguish three problems

| Observation | Disconfirming check | Candidate response |
| --- | --- | --- |
| Tradable items cost more currency | Track a fixed-quality transaction-price basket; check volume, supply shocks, composition and market rules | Tune future sources or wanted sinks after identifying the mechanism |
| Currency stock rises while posted prices stay fixed | Check useful actions affordable per balance, mandatory costs, spendable hoards and reachable goals | Address purchasing-power saturation or progression compression; do not label every stock increase price inflation |
| A small group holds most resources | Check active circulation, transferability, participation and which players experience scarcity | Target the actual access or concentration effect instead of cutting everyone's holdings |

CCP's economic reporting illustrates why money supply, activity and price
indices deserve separate measurements; its traded-world results do not set
limits for a closed, fixed-price game. A stable price index also does not prove
healthy progression or enjoyable play.

For content packs or randomized rewards, expand every reachable conversion,
bonus, duplicate compensation and repeat-purchase path. Model expected outcomes
and plausible high-issuance tails. A cosmetic, booster or protection item can
replace paid demand or change winning resources despite issuing no coins.

## Detect a road that is too short

Measure, for each meaningful progression line:

- The share of eligible active players and eligible active payers at the cap;
  report both denominators and the capped payers' share of receipts.
- Time from eligibility to cap by cohort and spending pattern. Keep players
  who have not reached it in the analysis as incomplete observations; an
  average of finishers alone understates the road.
- Remaining reachable goals, their resource costs, prerequisite gates and
  actual rate of progress. Distinguish a storage cap from the end of worthwhile
  content and a voluntary prestige reset from losing purchased value.
- Time until the next quality-checked content release, including observed
  delivery uncertainty, and what a capped player can enjoy in the meantime.

A rough projection is `remaining usable cost / net resources available per day`
when the rate is positive and stable. Respect nonfungible resources, parallel
goals, prerequisite paths, bonuses and playtime limits; simulate when this
approximation fails. Use fast-progressing cohorts as well as the median.

The road is provisionally too short when a material cohort exhausts meaningful
goals before fresh content can arrive and has no satisfying alternative.
Set materiality from the players and contribution exposed. Check return,
enjoyment and buying after reaching the cap against comparable cohorts;
reaching a cap alone does not prove it caused churn. Intentional short games
and players who enjoy a completed build are counterexamples to test.

## Extend worthwhile play

Prefer new challenges, mastery, collections, creative expression or social
goals that reuse earned strength. Forecast their reachable costs and the next
content interval together. Raising a numeric ceiling without useful choices
adds little; forcing existing players to re-earn a bought finish can break
trust.

Separate spendable progression resources from prestige and status rewards.
Collections or optional prestige can give a completed build another useful
goal; make any reset explicit and player-chosen, preserving purchased promises.

Test whether players choose and enjoy the extension. The motivation research
in [sources](sources.md#motivation) supports examining autonomy, competence and
relatedness; it does not show that endless grind retains players. Improve or
remove an extension when completion, return, feedback or contribution show it
is making play worse.

When changing issuance, calculate all concurrent claims and the replacement
content together. Preserve existing assets and bought promises. Derive the
limit from time to exhaustion, circulation, desired access and funded delivery
capacity; replace it when those inputs change. Neither a large nominal number
nor a fixed fraction of purchase price establishes economic harm by itself;
idempotent delivery does not establish economic admission either.

## Evaluate a resource bottleneck

Measure the cohort's reach rate, resource balances, time to the next useful
upgrade, available free recovery, offer exposure, paid conversion and abandonment.
Compare affordable acceleration or funded care with the baseline over complete
windows. Judge return play and contribution across all eligible players; higher
conversion among the remaining payers does not establish that scarcity helped.
Revise the bottleneck when it blocks enjoyable play or reduces contribution.
