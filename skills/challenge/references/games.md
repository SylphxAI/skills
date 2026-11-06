# Games standard

Trigger: designing, building, tuning, or operating a game.

## Hard lines

- **Server authority:** The server validates authoritative match outcomes, random seeds, economy balances and rewards. Clients may simulate under the [interaction model below](#simulation-and-networking-by-interaction-model); payouts, rankings and purchases require server verification under the [platform authority boundary](architecture.md#hard-lines).
- **Protect purchased value and progress:** A player never loses paid currency, items, VIP status, or progression. Never claw back delivered items, levels, or guild progress to resolve an internal grant mistake or a fairness complaint; use additive remedies and upward progression expansion instead (`#player-joy-and-content-expansion`).
- **Verified odds and rules:** Published gacha/draw probabilities and tournament rules match the actual server implementation (`commercial.md#legal-surface`).
- **Category-leader craft:** Visuals, shaders, procedural meshes/3D models, animations, particle juice, camera response, and synthesized/spatial audio are built to category-leader quality (`../../deliver-and-verify/references/parity.md`), never flat placeholder boxes.

## Simulation and networking by interaction model

Choose from the interaction model and information boundary. A genre label alone
does not establish whether a persistent simulation process is needed.

| Interaction model | Decision rule | Why |
| --- | --- | --- |
| Turn-based play | Use per-request APIs, checkpoint state in PostgreSQL with compare-and-swap, and represent turn deadlines as durable timers. No game process remains alive between requests. | Idle turns need durable state, not reserved compute. |
| Single-player real-time play | Run a deterministic simulation locally. Before accepting rewards or rankings, replay the input log on the server against the authorized rules, seed and input/deadline constraints. | A client-reported result does not establish an earned payout. |
| Multiplayer frame relay (lockstep) | Use a server-clocked input relay only with no hidden gameplay information and proven deterministic simulation: integer or fixed-point arithmetic, a shared match seed and canonical ordering. Require matching replay hashes in CI across every supported target, including iOS ARM64, Android ARM64, Web WASM and the server where supported. | Divergent simulations desynchronize; distributing hidden state exposes it. |
| Multiplayer authoritative state sync | Run simulation on the server by default whenever the relay conditions remain unproven. Keep game rules in the title or shared game engine. | Unproven determinism or hidden state requires a trusted simulation authority. |

Use the shared realtime platform for logical rooms and matchmaking; verify its
served capabilities separately from simulation hosting. Build shared per-match
compute only for a concrete title with a launch date that needs it, as a
game-image runtime bound to the matchmaking assignment with an authenticated
join endpoint, active-match drain protection and release when the match ends.
Why: a logical room or assignment receipt does not allocate a game process.

Scale idle game compute to zero; retain active matches, and allow a recorded,
traffic-driven warm replica only for live player paths during active hours.
Measure cold activation and fix the responsible startup span; with Knative,
verify its [aggressive readiness probing](https://knative.dev/docs/serving/services/configure-probing/)
(read 2026-11-06) before attributing delay to the simulation or adding warm
capacity.
Why: permanent warm capacity hides cold-start defects and charges for idle time.

## Character proportions

New characters use a four-heads-tall proportion (3.8–4.5 heads), an
international style with a light Japanese influence, and one shared rig across
titles and apps. Shared proportions keep faces readable and the cast, clothing
and furniture visually consistent.

Check at the table on a 390×844 phone: an opponent's face must read in 3D
without a 2D avatar frame. A full body must fit at 9:19.5, 16:9, 4:3 and 1:1.
Size the cast, chairs and table to look right together; adjust the scene when
these checks fail rather than masking the character with a portrait frame.

One world has one proportion. Switch a game's whole cast and wardrobe together,
never mixing proportions on screen, and preserve ownership of owned items.
Prefer one repeatable batch conversion from the shared rig over remaking items
by hand.

## Access and economy

- **Play first, sign in to save:** Let new players enter the first playable loop immediately as a guest, and preserve that exact guest account when they link an identity or make a purchase (`../../deliver-and-verify/references/auth.md#guests-and-linking-logins`).
- **Ship monetization with the first playable loop:** Ship store packs, paywalls, starter offers, VIP/pass tracks, and checkout as soon as the core loop is playable so the title can earn and validate unit economics while deeper content continues in parallel (`commercial.md`, `../../game-economy/SKILL.md`).
- **Model sources, pools, and sinks:** Reconcile currency and material issuance against progression caps and content velocity using [`../../game-economy/references/economy-model.md`](../../game-economy/references/economy-model.md).

## Player joy and content expansion

Our objective is that players enjoy the game, stay long-term, and willingly pay—never that an arbitrary spreadsheet ceiling is preserved at the expense of player trust:

1. **Extend the progression runway upward:** When active cohorts or top spenders approach the end of existing levels, equipment tiers, or guild milestones, ship new upward tiers, prestige collections, mastery challenges, and seasonal goals ahead of exhaustion (`../../game-economy/references/economy-model.md#detect-a-road-that-is-too-short`). With agent-native content and code velocity, expanding content depth is cheaper and far more profitable than throttling players.
2. **Additive remedies over clawbacks:** When a bug, configuration error, or support mistake grants extra progression or items to a player or guild, **preserve their existing gains** and lift affected peers through generous bound care packs and new upward goals. Taking back items or downgrading a guild destroys trust and triggers immediate churn among top payers.
3. **Generous bound care within measured budgets:** Use bound progression materials, upgrade protection, and cosmetics (`../../ambassador/references/behavioral-operations-and-retention.md#2-three-tier-support-and-retention-grant-matrix`) to soothe bad-beat frustration and celebrate milestones while tracking cohort net contribution (`../../game-economy/references/offers-gifts-and-experiments.md`).

## End-to-end belief and fandom

Combine responsive gameplay, rapid visible updates, and warm ambassador companionship (`../../ambassador/references/behavioral-operations-and-retention.md#fan-belonging-psychological-ownership-and-earned-trust`) so players feel like respected insiders whose feedback shapes the world they play in.

## How it is judged

Judge a game by live parity against its category leader (`../../deliver-and-verify/references/parity.md`), cold/warm startup and frame-time budgets (`../../deliver-and-verify/references/performance.md`), Day-1/7/30 retention, payer conversion, and cohort net contribution.

## First-person immersion across aspect ratios

Use the [immersive-scene and UI-proxy principle](experience.md#immersive-scenes-and-ui-proxies)
for the game view: first-person immersion keeps visible entities in 3D, while
engine-provided UI proxies expose important entities that cannot currently be
seen, read or tapped. Portrait, landscape, tablet, foldable and desktop are
frustum changes, not separate title layouts. Verify the full interaction through
live resize using the [parity method](../../deliver-and-verify/references/parity.md#continuous-aspect-ratios-and-visibility).
