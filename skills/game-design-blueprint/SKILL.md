---
name: game-design-blueprint
description: "Design or critically review a complete, agent-first game as one coherent player experience: player promise, verbs and loops, challenge, progression and quests, content, economy and monetization, retention, social play and virality, first-time experience, game feel, evergreen late-entry fairness, platforms, accessibility, localization, performance, live operations, automation, and validation. Use for new games, whole-game redesigns, game design documents, persistent or seasonal world strategy, or audits where several gameplay and commercial systems must work together. Use a specialist when one economy, ad system, return loop, notification policy, referral, campaign, soft launch, payment, refund, review, analytics, or release artifact is the primary job."
---

# Game Design Blueprint

Design a game whose systems reinforce one player promise. Produce enough precise state, pacing, interaction, evidence, and handoff detail for autonomous agents to build it once without turning the blueprint into an infrastructure specification.

## Objective

Maximize durable player value, voluntary retention, commercial upside, advocacy, and franchise optionality subject to trust, health, fairness, legal, platform, accessibility, performance, and operational floors.

Treat revenue, retention, reach, and virality as outcomes of player value. Never optimize addiction, compulsion, fear, shame, fake scarcity, hidden cost, vulnerable-player spend, or difficulty leaving.

## Agent-first invariant

Assume autonomous construction capacity is elastic. Human headcount, conventional studio calendar, absent users, uncertain demand, or speculative pre-build ROI must not defer a requested or product-essential reversible capability.

Run an exhaustive capability sweep, but do not force every possible system into every game. Give each capability one disposition:

- `integrate-now` — requested or required by the player promise; build the complete production-shaped, scale-ready capability and its automation now;
- `reuse-scale-ready` — consume an already complete shared primitive and design the exact game-specific integration;
- `contract-ready` — preserve a tested extension boundary because future compatibility is valuable, while keeping the capability absent from the runtime and player experience;
- `not-applicable` — cite a player-promise, genre, business-model, platform, attention, safety, or physical reason; human effort and speculative ROI are invalid reasons;
- `floor-blocked` — cite the exact legal, platform, trust, safety, rights, consent, or physical floor and make the prohibited transition unrepresentable.

For every `integrate-now` capability, default to `build-to-scale-now`: no MVP rewrite, manual operating phase, later hardening, deferred accessibility/localization/performance, or future replatform plan. Deliver through small verified slices for parallelism and learning, but do not shrink the declared final state.

Separate `designed`, `built`, `integrated`, `exposed`, and `production-proven`. A complete capability may remain off for a mode, progression state, cohort, platform, device, locale, territory, age mode, population/liquidity state, or service condition. Off means no user-facing reachability and no undeclared startup, SDK, permission, telemetry, asset, background, memory, network, or attack-surface cost.

Use automation for exposure and routine operation. Game progression, mastery, population/liquidity, device, locale/age/territory eligibility, service health, quality, economy, safety, and trust signals may unlock, promote, suppress, degrade, or close a capability inside declared bounds. Missing signals take a safe explicit action; positive revenue never overrides a hard floor.

## Composition contract

Own the whole-game thesis, player-facing semantics, system interaction, experience budgets, capability dispositions, and specialist handoffs. Use draft artifact IDs while designing. A deterministic downstream tool may seal versions and digests after serialization; never invent a digest or claim proof that was not observed.

For every handoff state the owner skill, input facts, output required, acceptance questions, and unresolved authority. Do not copy a specialist rulebook into this blueprint.

## Resource routing

- Read `references/game-thesis-and-loops.md` for every whole-game task.
- Read `references/game-progression-and-quests.md` when progression, levels, characters, equipment, mastery, quests, achievements, catch-up, or content unlocks matter.
- Read `references/game-system-integration.md` for the capability sweep, cross-system interactions, retention, commercial hierarchy, durable ownership, and specialist handoffs.
- Read `references/game-social-systems.md` when friends, co-op, matchmaking, guilds, chat, sharing, UGC, creators, community, or virality matter.
- Read `references/game-live-operations.md` for seasons, events, passes, content cadence, remote configuration, autonomous content operations, compensation, and shutdown.
- Read `references/game-evergreen-world.md` for persistent, seasonal, competitive, social, or economy-bearing worlds and late-entry fairness.
- Read `references/game-experience-quality.md` for game feel, audiovisual feedback, input, platform adaptation, accessibility, startup, low-end performance, networking, and localization.
- Read `references/game-validation-and-metrics.md` when defining evidence, KPIs, telemetry, experiments, risk decisions, validation stages, or the final blueprint.

Start with the thesis reference, perform the capability sweep, then load only the references implicated by the brief and sweep. State which dimensions remain unassessed in bounded reviews. Do not load every reference by default.

## Operating rules

1. Label material inputs as `given`, `observed`, `assumed`, `hypothesis`, or `decision`.
2. Select a primary audience, play context, emotional promise, commercial archetype, lead platform, minimum device, age modes, and validation stage. Broad reach does not mean a design for an undefined “everyone.”
3. Research three to five current comparators by mechanism: direct genre, adjacent experience, commercial, social/viral, or technical leaders as relevant. Record source/date, context, downside, transfer hypothesis, and falsification test; never infer causation from success.
4. Map intended experience to observable player behavior, dynamics, mechanics, content, feedback, and failure risk. Every integrated system must serve a pillar and player verb.
5. Make the moment and encounter loop understandable and satisfying before extrinsic rewards carry the game. Treat the core loop as the integration spine, not an excuse to omit selected supporting systems.
6. Give every capability a concise record: player value, disposition, state owner, dependencies/collisions, complete target, verified slices, exposure predicate, experience/runtime/trust constraints, telemetry, failure/recovery, and specialist owner.
7. Preserve IAP-led revenue as `given` when the brief requires it. Design understandable player-chosen value first; use IAA as a measured supplement, not a tax. Gacha, ads, streaks, notifications, chat, UGC, and social graphs require explicit player value, audience eligibility, controls, and exposure decisions.
8. Define progression, challenge, economy, monetization, retention, and social systems together so no local metric damages the core experience, late-entry viability, non-payer path, accessibility, low-end path, or player trust.
9. Define game feel through an action-feedback hierarchy across visual, audio, haptic, animation, camera, and UI channels. Effects must improve causality and impact without obscuring play or exceeding accessibility/performance budgets.
10. Design platform/input adaptation, startup, localization, accessibility, cross-save/play, offline/reconnect, and quality tiers from the first architecture. “Responsive” alone is not cross-platform.
11. Validate with rules analysis, gameplay agents, simulations, property/model tests, representative devices, target-player observation, qualitative playtests, telemetry, and controlled experiments. Synthetic evidence cannot prove human fun, comprehension, cultural meaning, belonging, willingness to pay, or vibe.
12. Retrieve current law, platform/store, ratings, ads, payment, random-reward, privacy, child-safety, UGC, chat, and notification authority before release/compliance claims.
13. For persistent or seasonal games, define an Evergreen World Fairness Contract. Separate logical progression/economy identity from physical shards; recurring fresh-start servers or destructive durable resets are not the normal fairness, acquisition, or inflation solution.

## Workflow

### 1. Frame the thesis

Define target player/context, fantasy, genre, commercial archetype, age modes, geographies, lead platform/input, session shape, networking model, differentiation, non-goals, and ruin boundaries. Write one falsifiable player promise.

### 2. Define success and loops

Choose three to five pillars and anti-pillars. Map verbs and moment, encounter, session, meta, and optional social/live loops. Define why a player chooses another session and why the game is worth discussing.

### 3. Design challenge, learning, and FTUE

Specify information, teach-practice-test-remix, difficulty variables, mastery ceiling, fair failure, fast retry/recovery, assists, and content grammar. Storyboard cold start through first input, understood response, meaningful choice, competence, payoff, self-chosen goal, and clean stopping point.

### 4. Design progression and content

Map character/account/build/equipment/mastery/collection/social progression as applicable; short/medium/long goals; unlock graph; quest roles; pacing curves; content burn; return/catch-up; seasonal state; and progression-economy-challenge interactions.

### 5. Sweep and compose capabilities

Evaluate progression, quests, content, economy, IAP, IAA, gacha, return loops, notifications, co-op, friends, sharing, guilds, chat, UGC, referrals, live operations, platform adapters, localization, accessibility, low-end tiers, analytics, safety, support, and every requested addition. Assign dispositions and specialist handoffs; fully specify every `integrate-now` item.

### 6. Design durable retention, social spread, and evergreen fairness

Create reasons to return across session/day/week/season/comeback horizons. Build belonging from identity, mastery, creation, history, and relationships rather than hostage value. Design known-friend value, recipient-valued sharing, natural discussion/creation moments, moderation, late-entry reachability, horizontal veteran value, catch-up, population fallback, and economy longevity.

### 7. Engineer experience quality and reach

Specify feedback hierarchy, vibe, audio/music/effects, inputs, platform lifecycle, startup path, quality tiers, minimum devices, accessibility modes, localization/culturalization, networking/save/offline, and real-device budgets.

### 8. Validate and hand off

Produce a dependency and learning sequence from paper model to graybox, verified system slices, integrated playtest, representative progression/economy/social simulation, limited exposure, and scale. Each stage has a claim, artifact, evidence, countermetrics, pass/watch/stop decision, and recovery. Handoff implementation detail to the owning specialist without inventing proof.

## Hard gates

Reject or redesign an output that:

- defers a requested or essential reversible capability because of human staffing, calendar, absent users, or speculative ROI;
- forces a genre-incoherent capability into a game without player value, or treats a feature checklist as design coherence;
- proposes later hardening, automation, accessibility, localization, low-end optimization, migration, or replatforming for an integrated capability;
- conflates designed, built, integrated, exposed, and production-proven;
- monetizes before defining value, or sells relief from deliberately created frustration;
- uses hidden odds, fake scarcity, fabricated price anchors, shame, loss threats, vulnerability targeting, unsafe child communication, consent bypass, or review manipulation;
- makes missed days, inactivity, refunds, or social obligation erase unrelated earned/purchased value, creations, identity, history, or relationships;
- uses recurring fresh servers, uncapped veteran dominance, or paid-only catch-up as the normal late-entry strategy;
- calls one responsive UI cross-platform or omits input, lifecycle, entitlement, performance, accessibility, localization, or support differences;
- uses effects that obscure state, increase input latency, break low-end budgets, or lack reduced-motion/flash/clarity alternatives;
- gives universal retention, conversion, revenue, startup, frame, or notification targets without context and evidence;
- relies on a future human dashboard meeting for routine exposure, tuning, content, moderation, support, or recovery;
- claims current compliance, scale, production behavior, or player enjoyment from static text, architecture prose, simulation, or invented evidence.

## Output contract

Produce one **Game Design Blueprint** containing:

1. draft artifact ID, scope, evidence labels, executive thesis, player promise, audience/context, archetype, differentiation, non-goals, and success contract;
2. pillars, anti-pillars, verbs, mechanics-dynamics-experience map, nested loops, and session arc;
3. challenge, learning, failure/recovery, mastery, content grammar, pacing, and FTUE beat map;
4. progression/quest/content model with curves, state classes, catch-up, and specialist handoff;
5. capability matrix with disposition, complete selected target, dependencies, exposure predicate, constraints, telemetry, recovery, and owner;
6. economy, IAP/IAA/gacha, retention, notification, durable-ownership, refund, update/cross-promotion, review/feedback, social, and live-ops integration decisions without duplicated specialist rules;
7. Evergreen World Fairness Contract where applicable;
8. game-feel/audio/effects, platform/input, startup/performance, accessibility, localization, network/save/offline matrix;
9. trust, safety, moderation, support, current-authority, and abuse boundaries;
10. validation and risk record with hypotheses, metrics/countermetrics, simulations/playtests/experiments, pass/watch/stop decisions, and specialist handoffs.

Use diagrams and tables only where they reduce ambiguity. Preserve uncertainty; never fabricate a digest, benchmark, policy fact, or proof state.

## Routing boundaries

- `game-design-blueprint` owns whole-game coherence.
- `game-economy-review` owns currencies, sources/sinks, pacing, IAP/IAA economics, gacha math, refunds/economy adjustment, simulations, and tuning.
- `game-soft-launch-review` owns bounded real-player cohort learning and scale/hold/pause/withdraw decisions for an already-designed game.
- `daily-reward-and-streak-review`, `ad-monetization-review`, `notification-strategy-review`, `referral-loop-review`, and `promotion-campaign-review` own their detailed state machines.
- Payment, refund, review/feedback, analytics, distribution, listing, marketing, support, and engineering procedures own their independent artifacts.

Compound work may use multiple procedures. Name one primary artifact owner, pass draft IDs while designing, and let deterministic delivery tooling seal exact versions and digests later.

## Completion check

The blueprint is ready when another agent can explain the promised experience, why each selected system belongs, how loops and systems interact, what is fully built versus only contract-ready or exposed, how late and returning players reach meaningful participation, which evidence could falsify each major hypothesis, and where every specialist decision lives. No requested capability may be deferred for conventional human scarcity, and no genre-incoherent feature, implementation-control-plane boilerplate, fabricated digest, or invented proof may substitute for game design.
