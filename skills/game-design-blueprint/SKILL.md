---
name: game-design-blueprint
description: "Design or critically review a complete, agent-first Game Design Blueprint: player promise and fantasy, differentiation, verbs and loops, challenge and mastery, content and progression, first-time experience, evergreen late-entry fairness, scale-ready capability portfolio, autonomous build/maintenance and exposure policy, game feel, platforms and inputs, accessibility, performance, localization, and validation. Use for new games, whole-game redesigns, persistent-world/seasonal fairness, game-design documents, agent production plans, and audits of gameplay, progression, commercial, retention, social, and technical coherence. For one economy, refund, campaign, rating/feedback, soft-launch, store release, notification, or implementation artifact, use the specialist unless whole-game coherence is also being decided."
---

# Game Design Blueprint

Create a game as one coherent experience backed by a broad, reusable, scale-ready capability portfolio. Work backward from the player promise and use autonomous agents to complete progression, monetization, retention, social, platform, and live-operations capabilities in the initial program; verified slices organize parallel delivery, while a policy engine automatically configures a coherent player experience.

## Objective

Maximize durable player value, voluntary retention, commercial upside, and franchise optionality by making a differentiated game that players confidently play, share, and pay for, subject to trust, health, fairness, legal, platform, accessibility, performance, and operational-sustainability floors.

Treat revenue, retention, reach, and virality as outcomes of player value. Never optimize addiction, compulsion, fear, shame, fake scarcity, hidden cost, vulnerable-player spend, or engagement at any cost.

## Agent-first invariant

Assume development is performed by autonomous agents and that construction capacity is elastic. Traditional estimates of headcount, human-hours, calendar time, manual production load, uncertain demand, or speculative return on investment must not reject or postpone a reversible capability. For a whole-game program, every capability in the canonical portfolio sweep receives a complete scale-ready implementation unless its behaviour is hard-floor-blocked; add every user-requested capability beyond that sweep as well. Genre fit, current demand, and player-value fit control configuration and exposure, not construction.

Default to `build-to-scale-now`: implement the complete production-shaped capability and its autonomous operating plane in the initial architecture. Deliver it through small verified vertical slices for parallelism and fault isolation, but do not mistake a slice for reduced final scope. No known initial-scope hardening, automation, port, capacity, migration-mechanism, or replatform debt may be deferred. Versioned expand/contract migration machinery and future evolutionary compatibility remain mandatory.

Build breadth is cheap; player exposure is scarce. Separate capability availability from what a player sees. A capability may be complete, verified, scale-ready, and reusable while disabled for a mode, cohort, platform, locale, territory, age group, or player-progression state. `off` means modular and non-reachable: no asset download, SDK initialization, permission request, background job, telemetry collection, service dependency, memory reservation, startup work, or public attack surface. Any correctness-critical exception is deny-by-default, resource-by-resource allowlisted, excludes third-party SDKs/permissions/public endpoints, and needs automated zero-cost regression proof.

Player attention, experience coherence, runtime budgets, accessibility, trust, safety, law, and platform policy govern exposure through an automated policy control plane. Live signals are machine inputs to versioned gates, not a reason to wait for a future human decision. The controller must automatically unlock, promote, suppress, degrade, or roll back exposure from player progression, eligible-population/liquidity, device capability, locale/age/territory eligibility, service health, quality, safety, and guardrail state.

Agent-first does not mean default-enabling everything, ignoring physical budgets, replacing customer evidence with simulation, or allowing unlimited colliding edits. It means complete scale-ready construction, machine-verifiable delivery slices, autonomous operations, and automatically governed coherent exposure. Target-player research remains a signal about the product, not a human development or approval gate.

“Build everything” applies to legitimate capability classes, not prohibited abuse. Build the reusable compliant primitive and its controls; make hidden odds, vulnerability targeting, deceptive pricing, fake scarcity, unsafe child communication, consent bypass, and other hard-floor-blocked transitions unrepresentable rather than implementing dormant harm.

## Composition contract

Begin the blueprint with an envelope conforming to [`references/product-artifact-envelope.schema.json`](references/product-artifact-envelope.schema.json). Own the player promise, game capability semantics, exposure policy, and evergreen fairness contract. Reference provider payment, refund, campaign, review/feedback, distribution, and marketing artifacts by ID/version/digest rather than copying their live facts. A missing sibling produces a typed handoff request.

## Resource guide

- Read `references/game-thesis-and-loops.md` for the success contract, comparator research, player promise, pillars, nested loops, challenge, learning, content, and first-time experience.
- Read `references/game-system-integration.md` when the game needs progression, quests, economy, IAP, IAA, random rewards, retention, notifications, social systems, virality, UGC, or live operations.
- Read `references/game-evergreen-world.md` for persistent-world identity, late-entry reachability, no-fresh-server fairness, power/economy compression, seasons, population fallback, and simulations.
- Read `references/game-experience-quality.md` for feedback, audio, input, platform adaptation, accessibility, startup, low-end performance, networking, and localization.
- Read `references/game-validation-and-metrics.md` for evidence labels, KPI trees, telemetry, experiments, prototype gates, live-policy research, and the complete blueprint template.

Read every reference for a whole-game design. For a bounded redesign, read only the references touched by the request, then state what remains unassessed.

## Operating rules

1. Label important inputs as `given`, `observed`, `assumed`, `hypothesis`, or `decision`. Do not turn taste, a competitor feature, or an industry benchmark into fact.
2. Select a primary audience, play context, emotional promise, commercial archetype, lead platform, minimum device, and validation stage. “Everyone on every platform” is not a target segment.
3. Benchmark three to five relevant games by mechanism and tradeoff: a direct genre leader, an adjacent experience leader, and leaders in any commercial, social, or technical dimension that materially affects this game. Synthesize; do not clone.
4. Map desired player experience to runtime dynamics and implementable mechanics. Every system must support a design pillar and a player verb.
5. Treat the core loop as the integration spine and first default-on experience. Prove its smallest risk before hard-coupling, default-enabling, scaling, or claiming production readiness for the full stack; modular capability slices may proceed in parallel.
6. Give every capability in the canonical sweep and every additional requested system a capability record:
   - player value and pillar served;
   - canonical contract, state authority, dependencies, and collision boundary;
   - expected experience and commercial effect;
   - complete scale-ready target plus verified delivery slices, automated proof, telemetry, flag, rollback/compensation/forward-fix, migration, and autonomous operations;
   - declared workload/failure envelope: concurrency, throughput, state/content volume, regions, latency/error SLOs, RPO/RTO, resource ceiling, headroom, overload behaviour, and exact load/soak/chaos proof. Label the initial envelope as a design assumption rather than a demand forecast; automation may recalibrate it without reopening build scope;
   - verification/integration, runtime/device, player-attention, trust/safety/platform, rights/localization, and autonomous-operability constraints;
   - build disposition, proof level, and automated exposure policy. Human effort, absent users, uncertain demand, and speculative ROI are forbidden blocker reasons.
7. Treat IAP as the primary commercial hypothesis only when it fits the audience, genre, platform, and value exchange. When the brief explicitly makes IAP-led revenue a hard constraint, preserve it as `given` unless it conflicts with a trust, safety, legal, platform, or physical-viability floor; surface that conflict instead of silently changing the goal. IAA, gacha, streaks, notifications, chat, UGC, guilds, and cross-platform adapters belong to the canonical build sweep, but need not be default-on. Build the complete compliant capability; floor-block only abusive behaviour or exposure that lacks required authority and controls.
8. Define platform, accessibility, localization, startup, frame-pacing, memory, network, battery, and thermal budgets against measured target devices. Do not invent universal numeric thresholds.
9. Validate with gameplay agents, simulations, property/model tests, target-player observation, qualitative playtests, telemetry, and controlled experiments. Synthetic evidence can expand coverage but cannot prove human fun, comprehension, cultural meaning, fairness, or vibe by itself.
10. Produce an autonomous build graph: complete scale-ready target state, dependency DAG, contract ownership, disjoint work packets, collision boundaries, parallel lanes, serialized shared-state changes, exact-candidate gates, telemetry, rollback, and post-integration verification. Ban temporary architecture whose plan is to harden, automate, migrate, or replatform later.
11. Define the automated exposure control plane in the first design. Maintain one canonical policy source implemented by domain-scoped evaluators with precedence: immutable trust/legal/safety/consent floors; platform/territory/age policy; entitlement/fairness invariants; reliability/capacity guardrails; then product experiments. Lower layers cannot override higher ones. Models may score or propose only inside pre-admitted action envelopes; separate proposer, validator, promoter, and independent watchdog identities and permissions.
12. Require versioned eligibility predicates, player-progression and population gates, safe missing-signal defaults, sticky assignment, hysteresis/cooldowns, maximum exposure-step and canary budgets, shadow evaluation, signed policy diffs, atomic snapshots, monotonic versions, cross-device consistency, last-known-good cache, outage/split-brain handling, audit/replay, automatic degradation, surface-specific rollback/compensation/forward-fix, and a break-glass kill switch. No routine human approval or annual dashboard review may sit on the path.
13. Close the autonomous maintenance loop for every capability: `observe -> diagnose -> propose -> simulate -> validate -> canary -> promote_or_rollback -> live_readback -> learn`. Every material code, config, policy, model, content, economy, dependency, moderation, or infrastructure mutation is a versioned candidate with provenance and scoped short-lived authority. The proposer cannot be its sole validator or promoter; gates and hard floors remain outside candidate mutation authority. Use GitOps, merge queue, exact-candidate gates, canary, runtime readback, and automated recovery.
14. Target players are evidence-producing customers or research participants, not developers, approvers, reviewers, or operational gatekeepers. Agents run studies, ingest qualitative signals, execute policy transitions, and preserve uncertainty mechanically.
15. Retrieve current platform, legal, ratings, advertising, privacy, child-safety, and randomized-reward authority before making a release or compliance claim. Static skill text is not current authority, and automation may not override a hard authority floor.
16. For any persistent, seasonal, competitive, social, or economy-bearing game, define an Evergreen World Fairness Contract. Separate physical region/shard topology from progression/economy cohorts; never use repeated fresh-start servers or destructive durable resets as the normal fairness, acquisition, or economy-repair mechanism.

## Workflow

### 1. Frame the game thesis

Capture the target player and context, fantasy, genre and commercial archetype, age range and geographies, lead platform and inputs, session context, autonomous content/operations capability, networking model, business model, differentiation, non-goals, and ruin boundaries.

Write one falsifiable player promise: who does what, why it feels distinctive, and why they choose another session.

### 2. Define success and coherence

Choose three to five experience pillars plus anti-pillars. Define success across player value, commercial viability, trust, product quality, operability, and distinctiveness. Build the player-verb vocabulary and map moment, encounter, session, meta, and optional social/live loops.

### 3. Design the learning and challenge arc

Specify control assumptions, information available to the player, teach-practice-test-remix sequencing, demand curve, failure causes, retry and recovery, assist options, skill ceiling, and fairness signals. Distinguish meaningful challenge from grind, stat padding, obscurity, and monetized frustration.

### 4. Storyboard first-time experience

Map cold start to first rendered state, input, understood feedback, meaningful choice, competence moment, payoff, and self-chosen goal. Budget account creation, download, permission, notification, and tutorial friction. Prefer guest-first, resumable, skippable, contextual teaching where the product permits it.

### 5. Build the capability portfolio, then configure the experience

Sweep progression, quests, content, economy, IAP, IAA, gacha, retention, notifications, co-op, friends, sharing, guilds, chat, UGC, live operations, platform adapters, localization, accessibility, and low-end tiers. Every item receives a complete scale-ready target delivered through verified slices, or an exact hard-floor blocker; add any requested capability not listed. Keep construction, proof, and automated player exposure as separate state machines. Design integration interfaces here; route detailed tuning to the owning specialist procedure.

### 6. Design evergreen late-entry fairness

Define one logical world/account/progression identity, durable versus renewable state, vertical-power bounds, horizontal veteran value, dynamic scaling/normalization, newcomer protection, mentorship/contribution, catch-up, economy concentration controls, content preservation, season rollover, low-population fallback, and cross-region/shard portability. Declare a baseline-access-without-optional-paid-acceleration time-to-meaningful-social-and-competitive-participation target as a hypothesis and simulate day-0, late, returning, baseline/payer, guildless, low-population, veteran, and concentrated-wealth cohorts.

### 7. Engineer feel, reach, and resilience

Define the action-feedback hierarchy across visual, audio, haptic, animation, camera, and UI channels. Produce platform/input adaptations, scalable quality tiers, accessibility modes, localization/culturalization plan, cross-save/play decisions, offline/reconnect behavior, and low-end performance budgets.

### 8. Specify trust and operations

Threat-model spending, refunds, economy abuse, cheating, friend discovery, chat, UGC, minors, privacy, moderation, reporting, blocking, support, content production, live incidents, and rollback. Build the scale-ready autonomous generation, validation, moderation, support, anti-abuse, and incident-control plane with each risky capability; connect it to automated exposure gates in the same delivery, not a later maintenance phase.

### 9. Build the execution and validation roadmap

Produce the scale-ready target architecture, dependency DAG, agent work packets, and automated exposure policy, then sequence paper/mechanical prototype, graybox, parallel verified slices, full capability integration, representative progression/economy simulation, closed playtest, limited release, and autonomous scale transitions. Give each stage a hypothesis, exact artifact, automated and customer signals, pass/watch/stop criteria, guardrails, machine-triggered exposure action, and rollback.

## Hard gates

Reject or redesign an output that:

- rejects, postpones, or omits a requested reversible capability because a conventional studio would need more people, time, budget, uncertain demand, or pre-build ROI;
- proposes an MVP, temporary manual operation, deferred automation, future hardening, or later replatform/migration for a capability that can be built to scale now;
- conflates `built`, `integrated`, `enabled`, and `production-proven`, or uses one `include/defer/exclude` label for all four decisions;
- adds gacha, ads, notifications, streaks, multiplayer, chat, or social graphs without a player-value hypothesis, control plane, and exposure decision;
- default-enables or pressures monetization before identifying player value and core-loop desirability;
- sells relief from deliberately created frustration or uses opaque price/value framing;
- targets minors or vulnerable players with paid randomness, pressure, or behavioural profiling;
- calls one responsive layout a cross-platform design without input and platform-service adaptation;
- uses effects that obscure state, add input latency, exclude players, or break the low-end budget;
- opens recurring fresh progression/economy servers, destroys durable earned/purchased ownership, or strands late/returning players as the normal solution to world age, population, competition, or inflation;
- lets veteran value accumulate primarily as uncapped irreversible combat/economic dominance without bounded vertical power, horizontal value, normalized modes, newcomer reachability, mentorship/contribution, and economy controls;
- gives universal retention, conversion, revenue, startup, or frame targets without context and evidence;
- claims current legal or store compliance from memory;
- omits accessibility, localization, autonomous moderation/support, content capability, feature flags, telemetry, rollback, or kill criteria when those surfaces apply;
- relies on a future human review to enable, tune, suppress, or scale a capability instead of a versioned automated policy with safe defaults and rollback;
- leaves routine content, balance, localization, moderation, support, capacity, dependency maintenance, or incident response in a human queue instead of a bounded autonomous maintenance loop;
- claims `scale-verified` without a declared numeric envelope and measured exact-candidate load/soak/chaos evidence, or `production-proven` without live candidate identity and runtime readback;
- lets a model, experiment, lower policy layer, or proposing agent rewrite hard floors, eligibility, prices, odds, spend limits, moderation severity, evaluation gates, or its own promotion authority;
- treats rollback as deletion of purchases, entitlements, earned progress, committed odds, party/match state, reward claims, experiment assignment, or cross-device consistency instead of surface-specific drain, reconciliation, compensation, or forward-fix;
- allows an `off` capability to add startup, bundle, memory, permission, telemetry, service, or attack-surface cost outside its declared off-state contract;
- ships an unverified mega-drop, hard-couples every capability, or default-enables the full stack before coherence, safety, and runtime budgets are proven.

## Output contract

Produce one **Game Design Blueprint** with:

1. typed artifact envelope, executive thesis, and evidence labels;
2. target player, fantasy, context, archetype, differentiation, non-goals, and success contract;
3. pillars, anti-pillars, player verbs, and mechanics-dynamics-experience map;
4. nested loop and session-arc diagram;
5. challenge, learning, failure, recovery, and content-variety model;
6. first-time-experience beat map and friction budgets;
7. capability portfolio with complete scale-ready target, declared workload/failure envelope, exact scale proof, verified delivery slices, build disposition, proof level, exposure state, zero-cost off contract, telemetry, migration, rollback/compensation/forward-fix, and specialist handoffs;
8. progression, economy, commercial, retention, durable-investment, refund, release-benefit, cross-promotion, review/feedback, social, platform, and live-ops integration summaries and specialist handoffs;
9. Evergreen World Fairness Contract covering state classes, world/shard topology, late-entry reachability, power/economy bounds, seasons, content, social contribution, low-population fallback, migration, simulations, and countermetrics;
10. autonomous build graph with scale architecture, dependency DAG, agent work packets, collision boundaries, gates, and dangerous-interaction tests;
11. feedback, audio, input, platform, accessibility, localization, and performance matrix;
12. trust, safety, moderation, support, anti-abuse, and autonomous operating model, including least privilege, independent validation, GitOps, exact-candidate gates, live readback, and the observe-to-learn maintenance loop;
13. telemetry and experiment plan;
14. versioned automated exposure policy using progression, population, device, locale/age/territory, service-health, quality, and safety gates with strict authority precedence, shadow/canary/watchdog controls, hysteresis, audit, and surface-specific degradation/recovery;
15. staged build-to-scale validation roadmap with machine actions and kill criteria;
16. top risks, unresolved questions, and next proofs.

Use tables and state diagrams where they reduce ambiguity. Preserve uncertainty instead of filling every section with invented detail.

## Routing boundaries

- `game-design-blueprint` owns whole-game coherence and the integration-level blueprint.
- `game-economy-review` owns detailed currencies, sources/sinks, reward pacing, IAP/IAA, random-reward math, refunds, anti-abuse, and economic tuning.
- `game-soft-launch-review` owns detailed cohort predicates and automated scale, hold, degrade, rollback, or kill policy for an already-built game.
- `payment-platform-readiness` owns provider transaction/ledger correctness; `refund-and-support-flow-review` owns refund consequence, repurchase, restrictions, support, and appeal.
- `review-solicitation-and-feedback-loop` owns platform-specific public review plus private feedback/product-learning behavior; `notification-strategy-review`, `daily-reward-and-streak-review`, `referral-loop-review`, and `promotion-campaign-review` own their detailed state machines.
- `app-store-distribution-readiness` owns channel release evidence; `marketing-automation-blueprint` owns the multi-channel marketing control plane.
- Use a market-research procedure when the primary artifact is market evidence, an interface procedure when it is a file-level UI review, and a payment procedure when it is provider transaction correctness.

Compound work may use multiple procedures, but name one primary artifact owner and avoid duplicating a specialist rulebook inside this blueprint.

## Completion check

A blueprint is ready for agent execution only when it is coherent enough to falsify and complete enough to build once: a reader can identify the promised experience, the mechanics expected to create it, the complete scale-ready target and verified delivery path for every requested capability, the evergreen path by which late and returning players reach meaningful participation without fresh-reset worlds, exact dependency or hard-floor blockers, parallel work packets and collision boundaries, automated exposure predicates/actions, and stop/rollback conditions. No blocker may be a disguised human staffing, schedule, demand, or speculative-ROI assumption, and no planned scale, hardening, automation, migration, port, or replatform debt may be deferred to “later.”
