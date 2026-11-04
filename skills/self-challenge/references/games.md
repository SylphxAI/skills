# Games standard

Trigger: designing or completing a game, or a remaster of one.

A finished game delivers a coherent player promise, satisfying play, complete
supported journeys, and an economy that earns without taking purchased value.
Shared interaction lives in [experience.md](experience.md), sensory feedback in
[feedback.md](feedback.md), budgets in [performance.md](../../deliver-and-verify/references/performance.md), and
known monetisation and retention patterns in
[the mechanics catalogue](mechanics-catalogue.md) and
[mechanics.md](mechanics.md).

## Hard lines

- Preserve purchased and promised value. Define how skill, randomness and paid
  advantages affect each mode, and honor the advertised competitive contract.
  Money follows [commercial.md](commercial.md).
- Display caches do not authorize an economy effect. Re-read price, eligibility,
  stock and limits at the authoritative transaction boundary, with conditional
  writes or locks and a unique grant key. Save agreed order terms before an
  external charge; settlement honors the verified payment against that durable
  order. Select regression cases for the changed boundary, including applicable
  concurrency, expiry, stale-price and callback cases.
- Claim a durable effect only after its authoritative commit. Asynchronous work
  returns a durable accepted or pending receipt. This prevents progress loss
  when a process fails between a response and its write.
- Plan maintenance around active matches and preserve them during a planned
  release. Test the actual drain and rollout mechanism, durable recovery and
  startup budget. Disruption budgets alone do not guarantee session continuity.
  Give disruption notices according to the product's current policy.
- Sell currency or items only when their promised use is available on the
  contracted delivery terms. Verify that use end to end; a granted balance
  without a usable spending path does not establish a finished purchase.
- For a remaster, use the shared
  [screen-and-feature parity method](../../deliver-and-verify/references/parity.md#keep-a-screen-and-feature-parity-sheet)
  to establish that it can replace its original.
- Follow the [sensory separation rules](feedback.md#hard-lines).
- Give the title a coherent art direction and game feel, checked against its
  category leaders: visuals run in the engine, drawn by code or made in Blender
  and imported as glTF/GLB on the same animator, never flat placeholder boxes.
  Choose agent-play APIs, deterministic simulation, replay
  verification and leaderboard separation for the title's rules and competition.
  The workspace specifies the engine and any stronger product commitments.

## Choosing what to build

Compare the genre's market, competition, differentiation, acquisition costs,
expected contribution and lifecycle cost. Choose the title from those inputs;
parallel development follows available capacity and computed priority.

## Player promise and loops

Map the applicable moment, encounter, session, progression, social, and live
loops to the product promise ([product.md](product.md)). Know the target players,
the meaningful choices, how skill and randomness decide outcomes, and how input
runs through simulation and feedback to a result. Teaching, failure explanation,
progression, retry, accessibility, and device support complete the promised play.

Multiple modes, fantasies, sides, and player relationships strengthen one game
when their loops and state boundaries stay coherent; a split or removal needs a
product reason. Mastery, creation, continuity, and relationships give reasons to
return, and a late or lapsed player reaches meaningful play without hostage
value. Where the genre allows, a population-zero path exists and bots fill a thin
queue.

## Engine and platforms

A remaster uses the original or an accepted reference implementation as its
reference. A title binds the exact consumer revision of its engine generation, or
is an independent parallel build of another generation ([stack.md](stack.md)). An
engine upgrade is one coordinated outcome covering the affected titles, their
promised behavior, and removal of the old paths. Every title in a portfolio meets the same player standard: first open, first game,
purchase path and release checks. Fix a shared gap in the engine or shared template
once, then sweep every title for it. An engine gap is fixed in the
engine; a title keeps no private copy, compatibility fallback, or second engine.
When a workspace retires a legacy engine generation (such as an older 2D Lua or
Solar2D stack) in favor of its active engines, remasters replace the legacy
titles once the parity sheet passes, and the retired engine is flagged as a
stack departure until every legacy project is retired.

### Content delivery independent of client size

An agent-native studio can continuously expand its catalog without expanding the
base client with every new cosmetic. Keep the base binary (IPA, AAB or initial
WebAssembly bundle) small and bounded independently of catalog size. Decouple
content publication from client releases and monolithic engine build queues;
catalog additions alone must not require another full application build.

Serve fine-grained, content-addressed remote bundles through a content delivery
network (CDN), per item or coherent set, with a versioned compatibility manifest.
Load a lightweight 2D icon first; fetch the 3D mesh, textures, animation or shader
bundle only when previewed or present at the active table. Verify compatibility
and content hashes before use. Cache downloaded assets on disk with a bounded
least-recently-used (LRU) policy, protecting currently used resources and evicting
downloadable cache data rather than user saves or ownership records.

Measure cold download, first-preview and table-entry latency, base-client size,
network use and peak cache size as the catalog grows by 10x and 100x. Keep those
budgets independent of total catalog size; a manifest that downloads every item
or preloads the whole catalog fails this design. A runtime/format change can
require a client release; ordinary compatible content does not.

Device input maps to abstract actions so simulation stays separate from
presentation, and each supported platform gets a complete adapter and a usable
input path.

For a legacy backend, compare repair, port and rewrite by full lifecycle cost,
including integration, account continuity, data migration and operating cost.
Respect the actual project boundary and existing writer. Fix a missing shared
engine capability upstream, then consume it. Keep an externally operated title
with its operations team until the authorized handover.

## Access and economy

Compare feasible ads, purchases, subscriptions and hybrid offers using a
finite-horizon cohort contribution model:

$$V(M)=\sum_{t=0}^{T} d_t S(t\mid M)\,[r_t(M)-c_t(M)]-a(M)$$

Here `M` is the offer, `S` the probability an acquired player is active on day
`t`, `r` net receipts per active player-day after refunds and payment/store fees,
`c` variable service cost per active player-day, `d` the discount factor and `a`
acquisition cost per acquired player. Define the horizon, population and units;
mark assumed inputs and show sensitivity. Validate the chosen model against
the title's actual cohort and candidate offers.

Deep purchase economies and recurring subscriptions are candidate strategies.
Choose the offer mix and price menu from measured or explicit assumed demand,
retention, contribution and player impact. When a title or portfolio shares a
character creator and cosmetic economy across engines, define one portable
cosmetic contract covering outfits with cloth or spring physics, skins, pets,
emotes, voices and animations, so items authored or sold once render and animate
consistently across every target engine and platform. Apply the workspace's ad
policy. Review relevant [mechanisms](mechanics-catalogue.md#monetisation), then
build only those that fit the title and objective. Place ads, store prompts and
social requests at natural breaks. Paid access, multiplayer identity and other
required controls need clear denial, cancellation and recovery states.

Events, offers and gifts follow [growth.md](growth.md#campaigns-and-gifts).
Reuse the owning shared campaign capability when one exists.

### End-to-end belief and fandom

Connect product design, content, scarcity, social homes, gifts and companionship
to one player promise (`每一個動作、決定、產品設計同送禮都串連埋一齊`). Each
decision should strengthen the player's reason to enjoy the product, trust the
team and belong to its community. Use this chosen causal model as a hypothesis
to test, rather than treating isolated engagement tactics as an outcome:

1. **Earn confidence:** Deliver enjoyable play, rapid useful improvements and
   kept promises, giving players visible evidence that continued support matters.
2. **Give confidence a lasting expression:** Offer meaningful progression,
   numbered scarce collectibles, personal identity and decorated social homes.
   Continued content expands the next goal while preserving existing value;
   remote on-demand delivery keeps the base client bounded.
3. **Make expression social:** Let friends experience the host's home, table,
   collection and reactions. Connect authentic recognition, collective milestones
   and referral exclusives to voluntary participation and word of mouth.
4. **Care for the relationship:** Warm companionship reads the person's mood,
   resolves real trouble promptly and offers approved useful gifts when they
   help. A gift complements the player's goals and sense of belonging; it never
   replaces attention, requires another purchase or licenses a clawback.
5. **Fund the next useful improvement:** Willing purchases and return play fund
   further depth and care. Measure economy sources/sinks and cohort net
   contribution so generosity and scarcity sustain the same player promise.

Trace an actual player journey across these steps. Track trusted delivery,
return play, social participation, qualified referrals, voluntary purchases and
contribution together. If a tactic raises short-term spend while trust, return
play or belonging falls, revise the broken link. Participation supplies feedback
and social proof; factual claims still require evidence. The
[ambassador method](../../ambassador/references/behavioral-operations-and-retention.md#fan-belonging-psychological-ownership-and-earned-trust)
owns the relationship practices within this loop.

### Player joy and content expansion

Use agent-native tools and reusable assets to make additional content, tiers and
progression depth fast and near-zero in marginal authoring effort, with daily
delivery when verification and release capacity permit. Measure actual authoring,
verification, serving and delivery costs; the premise changes when those inputs
do. Losing a player is an irreversible loss of that relationship and its revenue.
Verify and release new content through the normal product path. When players progress quickly,
extend the progression runway upward (`加長成長嘅路`) with meaningful new goals,
tiers and optional prestige. Preserve completed progress and existing item
utility; never throttle a player's earned growth or claw back gains to stretch
the old content.

When a player or guild is unhappy, delight them with generous bound in-product
gifts (`送禮令佢開心`) within pre-approved retention budgets. Choose useful
personal materials, protection, cosmetics or other valued assets from their
actual needs, without demanding legalistic proof of loss. Delivery or restoration
of paid value is an immediate obligation separate from a discretionary gift.
[Ambassador](../../ambassador/SKILL.md) owns warm companionship and gift advocacy;
[customer-support](../../customer-support/SKILL.md) owns formal billing remedies.

**Fairness is a means to player joy (`公平只係手段，唔係第一要素`).** Judge a
fairness intervention by enjoyment, retention and willingness to pay. A measure
that makes players unhappy by taking away their items, levels or guild progress
puts the means ahead of the goal (`本末倒置`) and is prohibited. Correct an
internal grant mistake or imbalance by lifting up or compensating affected
players and adding progression depth, never by clawing back items or downgrading
a guild. Preserve advertised competitive rules and purchased promises while
designing the additive remedy; replacement gifts do not license a reduction.

### Catalog purpose, scarcity and acquisition

Give every new item a distinct player purpose, aesthetic identity, numerical
role and acquisition path. Organize the catalog as a coherent portfolio; never
dump all items into a flat direct-buy shop or create filler without useful or
collectible value. Cheap authoring supports depth, while designed scarcity and
visible status support demand. Calibrate prices and thresholds from actual
collector demand, cohort contribution and the economy model rather than copying
a product's currency amounts.

- **Unique and numbered editions:** Apply luxury-watchmaking (haute horlogerie)
  principles to one-of-one and ultra-limited numbered collections: immutable
  serial numbers, an explicit issuance limit and unmistakable table-wide
  prestige. Support very high anchor prices and spend milestones for collectors
  with exceptional budgets, including seven-figure capacity where demand
  supports it. Honor scarcity after sale; never expand a promised edition or
  dilute it with indistinguishable copies.
- **Shard collection and crafting:** Create multi-stage collection and crafting
  paths with meaningful material sinks, useful intermediate progress and a
  valuable completion goal. Measure time to completion and abandonment; deepen
  the runway without making earned materials useless.
- **Referral exclusives:** Reserve desirable items for verified friend referrals
  under the [referral mechanisms](mechanics-catalogue.md), turning item demand into
  organic acquisition. Keep the exclusive acquisition promise and verify the
  qualifying referral before the idempotent grant.
- **Guild and competitive milestones:** Use collective and tournament unlocks
  to build social pride, shared goals and return play. State the qualification
  and competitive rules clearly and preserve unlocked rewards.

Map the acquisition vectors and upgrade/currency flows before publishing an
item. Judge the portfolio by demand, retention, referral activation, voluntary
spend and concentration; revise future supply and content from those signals
while preserving already delivered value and edition promises.

### Asset portfolio and social homes

Design complementary monetizable and collectible assets across these layers,
choosing those that fit the genre and the player's goals:

| Layer | Assets and player value |
| --- | --- |
| Character, companions and tactical depth | Pets, skill cards, layered outfits, jewelry/accessories, tactical tools and protection items; preserve each mode's advertised rules for paid advantages |
| Expressive presence | Emotes, voice lines, table banter, custom sound effects, gestures and interactive reactions that other players can see or hear |
| Social identity and chat/table flair | Custom emojis, animated stickers, avatar frames, prestige titles/badges, and colored, gradient or glowing player names visible across chat, leaderboards and the table |
| Personal home and hosted environment | Customizable rooms, furniture, tables and backgrounds that give ownership, creative expression and a social place to invite friends |
| Collections and synthesis | Card albums, multi-tier shards, crafting recipes, coordinated sets and disclosed set bonuses that make individual finds useful toward a longer goal |

Make the personal home a social display surface: an invited match takes place in
the host's decorated room and at their chosen table, or uses that decorated space
as the match backdrop where the genre requires another play surface. Every guest
sees the host's choices. This creates a hypothesis to test: visible self-expression
and peer recognition increase demand for decoration, earning and spending currency
or gems. Expand furniture and room collections as a renewable voluntary sink;
measure visits, invitations, repeat hosted play, decoration spend and retention.
If guests cannot see the purchases or players do not return, revise the social
loop instead of assuming a larger furniture catalog will monetize itself.

### Excitement, synthesis and abundance

Where the product and applicable market/store rules permit them, consider wheels,
slots, lucky draws and treasure chests as varied reward presentations that create
a festival atmosphere. Use the title's disclosed randomness and paid-outcome
rules. Pair reveals with card albums, multi-stage shard crafting and meaningful
set completion so rewards lead to useful goals rather than isolated inventory.

Bundle the core item with generous quantities of purposeful, low-impact extras:
small cosmetics, decorative variations, basic crafting pieces or collection
fragments. The purchase should feel plentiful and celebratory (`買一得十`)
without issuing excess core currency or diluting promised top-tier scarcity.
Every extra needs a visible use or collection/crafting destination; abundance
does not justify worthless filler. Keep these extras bound where appropriate,
model all conversion and crafting paths, and measure their economic effect
rather than assuming a non-currency item has zero inflation impact. Calibrate
composition against enjoyment, conversion, repeat purchase and retention; a pile
of unwanted scraps or faster abandonment falsifies the abundance hypothesis.

### Scientific economy balance

Use a source–sink model for the macro economy and telemetry to test it. Cheap
content authoring enables generous care; it does not make every virtual asset's
economic effect zero. The following is the chosen game-economy method, informed
by Machinations' primary documentation for
[sources](https://www-content.machinations.io/docs/sources/),
[drains](https://www-content.machinations.io/docs/drains/) and
[converters versus traders](https://www-content.machinations.io/docs/converters/)
(read 2026-11-04).

- **Faucets and drains:** Inventory sources, sinks, balances and conversion paths
  per currency, including shop delivery, gameplay, events, protection and manual
  gifts. Reconcile `closing balance = opening balance + issuance - consumption`
  across the full population; player-to-player transfers redistribute value and
  do not create aggregate currency. Set a target net issuance path from active
  population and progression demand; equilibrium need not mean zero issuance in
  a growing game. Add attractive voluntary sinks and new uses to absorb surplus.
- **Dual progression loops:** Separate spendable progression resources from
  prestige/status rewards. Extend the core upgrade path and add long-lived
  collection, cosmetic or prestige goals so fast progress opens another useful
  loop. Make an optional prestige reset explicit and player-chosen; never use
  prestige to disguise an involuntary loss of purchased or earned value.
- **Pinch-point conversion:** Model each resource bottleneck using the cohort's
  reach rate, balance distribution, time to the next useful upgrade, offer price,
  paid conversion and abandonment. Estimate incremental net receipts alongside
  retention and free recovery; a bottleneck that drives players away fails even
  if surviving payers convert more often. Test affordable acceleration and
  generous care against the baseline rather than assuming scarcity earns more.
- **Inflation and wealth concentration:** Track issuance/consumption by source,
  currency balances by cohort and percentile, purchasing power for a stable
  basket, time to progression milestones, top-holder wealth shares and a Gini
  coefficient where meaningful. Include stockpiled bound materials: a bound item
  can accelerate progression even when it cannot be traded. Compare complete
  time windows, retention and net contribution before changing future grants or
  sinks. A large grant or fast progression alone does not establish churn.

Product configuration owns pre-approved budgets and server-side grant limits.
Deliver gifts idempotently through that path, record their economic effect and
read the result back. Escalate a larger gift through the company application
path instead of raising a global safety cap. Recalibrate the model when live
cohort data disproves its assumptions; preserve delivered value throughout.

For randomness, difficulty, matchmaking and AI opponents:

- Measure tap-to-actionable-first-hand on the serving build. Successful-match
  wait logs omit queues that never filled and do not measure first-hand latency;
  report their population and missing events rather than treating them as the
  new-player experience. A config file on disk does not prove the loaded policy.
- For a coin-neutral table, reconcile human, AI, house and reserve deltas in the
  same currency over a complete hand. Stake modifiers paid by losing players
  are transfers, not automatically issuance. Classify loss shields, reserve
  payouts, fees and host rebates separately; preserve paid promises by funding
  them rather than silently removing them. Require crash/replay-safe commits,
  not only an arithmetic sum of intended wins and losses.
- For points-only play, check admission, packet serialization, manual and timeout
  actions, results, replay, reconnect and exit for economy effects. Execute the
  actual lifecycle with disallowed storage and commerce calls configured to fail;
  repair a missed boundary instead of weakening the refusal. Keep neutral-mode
  behavior separate from test-fixture authorization. Hidden controls or isolated
  constructors and settlement tests do not prove the remaining lifecycle safe.
- Define ranked fairness separately from the genre's inherent chance. Test any
  tuning or paid advantage against the advertised rules and applicable
  market/store requirements, including paid-randomness disclosures.
- Use the [scientific economy model](#scientific-economy-balance) to set future
  issuance and voluntary sinks. Fund a house bankroll when the transfer model
  requires it, and run milestone fulfillment from versioned server tables rather
  than private scripts. Apply [player joy and content expansion](#player-joy-and-content-expansion)
  when growth is fast or a grant causes imbalance; expand upward and preserve gains.
- A new player's first game starts at once. Set a maximum wait, fill seats with
  AI players, and read the fill logic end to end: a table that needs two humans,
  or adds one AI per tick with a long timer, fails this with no error. Practice
  play that moves no currency can ship first; AI seats on currency tables play
  from a finite house bankroll, so they add no net currency. Count every source
  when balancing, manual grants included. Measure through the human's first legal
  action from every possible starting seat: CPU warm-up timers and simulated
  hesitation can consume the budget after all seats are full. Count legal prerequisite
  actions as well as turns; avoid adding a timer between already-ready CPU actions.
  Bound each batch and preserve human input windows. Keep advertised dealer and turn
  rules rather than changing them to make the measurement pass.
- Test onboarding protection, difficulty and opponent design against actual
  player outcomes rather than assuming a fixed number of protected days.
- Protect purchased promises. State a material outcome and rollback rule with
  uncertainty and trade-offs; phase a change when its exposure warrants it.

## How it is judged

Walk the first session as a new player on a real or emulated device before paid
acquisition: fresh install, wait for download, first table, first settled hand,
then what the game does after the player's first loss. A new balance must survive
one losing hand at the default table, and free recovery comes before any paid
offer. Automated checks that seed an account skip exactly these failures.

Machine checks verify rules, journeys and defects. Test the release build's
first session against the real server path: expected scene, actionable controls,
startup budget, and recovery. Assert the journey across supported layouts rather
than fixed coordinates. A route returning the web page instead of the declared
server response fails the check.

Evaluate enjoyment and willingness to return with actual audience evidence when
available, together with retention and contribution. For a product without real
users, machine checks supply the release verdict; production evidence follows
rollout. Do not claim observed enjoyment from a synthetic test. Release numbering
follows the owning channel.
