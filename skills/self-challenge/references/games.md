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
- A remaster replaces its original only when its parity sheet shows every
  original screen and feature equal or better. Capture the shipped reference,
  compare visuals, sound and interactions, and keep unknown facts as open gaps.
  Show the sheet to the owner. Judge experience parity across the whole sheet.
- Keep sensory effects separate from economy, simulation and network truth.
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
promised behavior, and removal of the old paths. An engine gap is fixed in the
engine; a title keeps no private copy, compatibility fallback, or second engine.
When a workspace retires a legacy engine generation (such as an older 2D Lua or
Solar2D stack) in favor of its active engines, remasters replace the legacy
titles once the parity sheet passes, and the retired engine is flagged as a
stack departure until every legacy project is retired.

Load game resources on demand and version each asset individually (by content
hash or manifest revision, like the web) rather than shipping one monolithic
asset bundle, keeping the initial download minimal and letting individual assets
update independently.

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

For randomness, difficulty, matchmaking and AI opponents:

- Define ranked fairness separately from the genre's inherent chance. Test any
  tuning or paid advantage against the advertised rules and applicable
  market/store requirements, including paid-randomness disclosures.
- Model currency sources, sinks, balances and purchasing power. Reconcile
  material value movements. Use a house bankroll when the game's transfer model
  requires it; choose issuance rules from the economy model.
- Test onboarding protection, difficulty and opponent design against actual
  player outcomes rather than assuming a fixed number of protected days.
- Protect purchased promises. State a material outcome and rollback rule with
  uncertainty and trade-offs; phase a change when its exposure warrants it.

## How it is judged

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
