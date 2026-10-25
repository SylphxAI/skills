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

- A player never loses purchased value, and play against real people stays
  skill-based. Money and conserved value follow [commercial.md](commercial.md).
- A live game backend answers success only after the write has committed,
  because a 200 before commit loses progress when the process dies. A
  single-replica backend crashed once when a Cilium roll reset its database
  connections.
- A maintenance, restart or fix that live multiplayer game players
  would see is announced in-game first. The Fun titles get no notices
  (the repository's agent instructions), and a title with no real players
  needs none.
- A live match is never ended by the platform. A real-time room host declares
  that it holds sessions. While a session is open, the host is in use: it is not
  evicted, a release waits for the old revision's sessions to end, and it gets a
  PodDisruptionBudget at two or more replicas and a drain on shutdown through
  its one drain setting. When no session is open, the host sleeps. The client
  sends a join intent as the player opens the lobby or asks for a match, so the
  host wakes while the player waits, and the join reaches a room within 5
  seconds (p95). State that outlives a match lives in Postgres, never in the
  process. This is the platform's managed room service, which follows Agones
  allocation and disruption control without its warm buffer
  . A title takes no
  `min-scale` floor. A floor already on a launched title stays until that title
  passes the room-service production verification (session protection live, join intent sent,
  join from zero within target, a room kept through a release), so live players
  see no churn.
- Everything a player can buy has a use in the live game: a paid product grants
  only currency or items that a shipped feature spends or applies, and is sold
  only once that use is live; three titles once priced packs whose currency or
  content nothing in the game could spend.
- A remaster is equal to or better than the shipped original on every screen,
  feature, animation and sound, and never worse. Better means clearly better to
  a player: the same rules and flows, no lost feature, and at least the same
  polish. Different but plainer counts as worse. A remaster may upgrade the
  monetisation (heavier, better-designed IAP within these hard lines) and add
  what the old engine could not do; parity of experience is the floor, earning
  more is the goal. A remaster replaces the
  original only when its parity sheet (each original screen and feature
  captured from the store build beside the remake, graded equal, better or
  worse) has zero worse rows; the sheet is shown to the owner, not held for his
  approval. A missing fact stays an open gap, not license to invent, and parity is not claimed from a green
  subset; a game remake must never show a generic dark result box with a
  flat green button where the original had finished art.
- A visual or sensory effect writes no economy, simulation, or network truth.
- Every title has a real art direction and game feel (motion, sound, haptics,
  a living lobby), never a developer UI, judged by screenshots against the
  top-grossing titles in its genre; a missing Keel capability is filed as
  priority, and nothing below the bar is promoted .
- Every title is playable by people and by agents, built once in Keel: a
  headless deterministic simulation, an agent API, replay-verified scores, and
  separate human and AI leaderboards .

## Choosing what to build

A new title starts as a proposal with market evidence: the genre's revenue,
the competition, our edge, monetisation, and cost. A saturated clone market
where we have no edge is not built (a 2048 remake was stopped for that
reason).
Proven-revenue genres come first, and titles are built in parallel as capacity
grows.

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

Device input maps to abstract actions so simulation stays separate from
presentation, and each supported platform gets a complete adapter and a usable
input path.

Every title, legacy titles included, is a standard serverless project on
the platform and deploys through it. A title touches no
cluster directly: no raw TCP port, hand sync or special route for rescue.
Follow the [recovery procedure](../../deliver-and-verify/references/security.md#recovery-procedure). A legacy backend is
rewritten as a standard platform project in Rust ([stack.md](stack.md)), not
ported, because few players remain and a rewrite is cheap for agents. Legacy
titles still get the cheap updates that earn: the client on the platform's
WebSocket, the current SDK and company name, in-app purchases through the platform billing service
Money, an economy redesigned for revenue, then a repackaged store release.
Whether to do each piece is decided by the money it earns and its fit with the
platform, not by human effort. A legacy externally operated original stays with its own
operations team.

## Access and economy

The goal is in-app purchase revenue optimised to the limit; ad revenue is not
chased , because a payer is worth far more than ad
impressions and paid promotion pays back only on purchases; top-grossing titles
such as Royal Match earn almost entirely from purchases.

- **Legacy titles** (the live games and their remasters): light ads, heavy
  in-app purchases. Ads stay light: rewarded ads kept at their current caps or
  lower, interstitials only for players who have never paid, and a remove-ads
  purchase. The economy is redesigned around purchases: currency packs, VIP,
  month card, offers and event packs.
- **New titles:** no ads at all, rewarded ads included. Pure in-app purchases
  on a deep economy: a currency price points of six or more, first-purchase
  bonus, starter pack, month card, VIP by spend, chain offers, piggy bank,
  growth fund, and gacha or a season pass where the genre fits
  ([the catalogue's monetisation
  section](mechanics-catalogue.md#monetisation)). The free
  path is daily rewards and earned currency, never ads.

Events, limited-time offers, sales and gifts are campaigns: they run on the
platform's campaign capability under
[growth.md](growth.md#campaigns-and-gifts) (holdout, cost and frequency
caps, truthful reference prices, each market's consent), not on title code.

Place ads (legacy titles only), store prompts, and social requests at natural
breaks, because an interruption mid-action reads as a defect. Required
multiplayer identity, entitlement, age, safety, and paid access have clear
denial, cancellation, retry, and recovery, including promised offline behavior.

Monetisation, randomness, difficulty, and AI opponents are designed for retention
and revenue (business judgement):
gacha, adaptive difficulty, progression- or spend-aware matchmaking outside
ranked play, skills that help against the computer, and AI opponents that look
like players are normal tools. A design reviews the
[mechanics catalogue](mechanics-catalogue.md) once and states
target metrics.

These tools follow five rules :

- **Ranked stays fair, casual is tuned.** Play with a leaderboard or ranked
  reward (rank seasons, guild wars) uses skill only. Casual tables may tune
  luck, difficulty and opponents by spend, progression and retention.
- **AI chips are a closed account.** AI players win and lose from one house
  account that is reconciled daily against a drift band, with an alarm. Never
  top an AI player up from nothing; that mints currency and devalues every
  pack a player bought.
- **New players are protected.** For their first days new players do not meet
  boosted payers, and adaptive difficulty favours them, so they stay long
  enough to buy.
- **A payer advantage may be sold openly.** VIP luck, skill and relief
  boosts can be named on the VIP page and marketed; hidden tuning is kept for
  casual tables.
- **Change by evidence, gradually.** A change that takes something players
  are used to is measured first, offset by something they can feel improving,
  rolled out in steps and reverted when payer retention, revenue or support
  complaints worsen. Players must never feel something was taken away.

## How it is judged

Agent play and deterministic tests verify rules, journeys, and defects. A player
understands the goal, explains success and failure, and repeats, exits, or
recovers within the latency and startup budgets. Enjoyment and return willingness
are empirical: target-player evidence and retention and revenue metrics answer
them. Release claims follow [product.md](product.md); title release numbering
follows the owning release channel.

Before a store or production release, an automated gate checks the release
build. It plays the first session against a real server and database, and fails
when the expected scene or on-screen positions are wrong. It keeps the first
frame inside the title's start-up byte budget, with a poster shown before the
game loads. It finds every declared server path answered by the server, not by
the web page. Green offline checks once hid a first-session crash, a 4.5 MB
first download and 14-30 s blank screens.
