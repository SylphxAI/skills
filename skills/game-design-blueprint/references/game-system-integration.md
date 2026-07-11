# Game System Integration

## Contents

1. Agent-first capability portfolio
2. Growth and progression
3. Quest system
4. Economy and rewards
5. IAP-led monetization and optional IAA
6. Paid randomized rewards and gacha
7. Retention and notifications
8. Social, co-op, sharing, and virality
9. UGC, community safety, and abuse
10. Live operations
11. Integration checklist

## 1. Agent-first capability portfolio

Do not use conventional studio scarcity or a subjective “not relevant” label to cut the system surface. In a whole-game program, the canonical portfolio is progression, quests, economy, IAP, IAA, gacha, streaks, notifications, multiplayer/co-op, friends, sharing, guilds, chat, UGC, referrals, live events, platform adapters, localization, accessibility, low-end tiers, telemetry, safety, and autonomous operations. Every item receives a complete production-shaped, scale-ready implementation in the initial architecture unless its behaviour is hard-floor-blocked. Add every requested capability beyond the canonical portfolio. Genre fit and player value govern configuration and exposure, not construction.

Demand evidence is not a construction prerequisite, and later hardening is not the plan. Build the capability, scale architecture, automation, observability, state migration, operational control plane, and exposure policy together. Deliver small verified slices to parallelize work and contain faults, then finish the declared scale-ready target without leaving a follow-up phase. Live signals feed automated exposure and rollback; they do not trigger a future human project to finish the system.

### Three-axis state model

Never collapse construction, proof, and exposure into `include`, `defer`, or `exclude`:

```text
Build disposition:
build-to-scale-now | queued-by-dependency | reuse-scale-ready | floor-blocked | retired

Proof level:
contracted | delivery-slices-verified | integrated | scale-verified | production-proven

Exposure state:
off | internal | progression-gated | population-gated | test-cohort | opt-in | default-on | degraded
```

- `build-to-scale-now` is the default for every canonical and additionally requested reversible capability. Its Definition of Done includes production structure, autonomous operations, declared and measured load/failure proof, policy-controlled exposure, and migration/recovery—not a prototype that needs later rebuilding.
- `queued-by-dependency` names the exact prerequisite, owner, and unblock condition; it cannot mean “too much work.”
- `floor-blocked` cites a trust, safety, legal, platform, authority, irreversibility, rights, or physical-resource floor. Build the legitimate compliant capability and controls, but make prohibited transitions such as hidden odds, vulnerability targeting, deceptive price/scarcity, consent bypass, or unsafe child communication unrepresentable; do not implement dormant abuse merely to keep its flag off.
- `retired` requires evidence, migration, state disposition, and a reusable learning record.
- Human effort, team size, calendar estimates, absent users, uncertain demand, and speculative ROI are forbidden blocker reasons.

`scale-verified` requires measured exact-candidate proof against a declared numeric envelope. `production-proven` requires the deployed candidate identity plus runtime readback from the live environment. Architecture, simulation, authored fixtures, or CI alone cannot earn either label.

An `off` capability must be modular and non-reachable: no asset download, SDK initialization, permission request, background job, telemetry collection, service dependency, memory reservation, startup work, or public attack surface. A correctness-critical exception is deny-by-default, resource-by-resource allowlisted, cannot initialize a third-party SDK, request permission, or expose a public endpoint, and needs automated bundle/startup/memory/network/attack-surface regression proof.

### Capability record

Complete this record for every capability:

```text
Capability:
Player hypothesis, pillar, verb, and reusable primitive:
Loop entry and exit:
Canonical contract and state authority:
Dependencies and collision boundary:
Complete scale-ready target and explicit no-later debt:
Verified delivery slices and integration order:
Declared scale envelope: eligible/peak concurrent users, QPS/TPS, sessions/rooms/guilds/UGC/content cadence:
Envelope evidence label and automatic recalibration policy; this is a capacity target, not a demand forecast:
Data volume/retention, regions, consistency/residency, p50/p95/p99 SLOs, error budget, RPO/RTO:
Compute/storage/network ceiling, abuse-amplification ceiling, headroom, overload/degradation behaviour:
Exact load/soak/chaos candidate, method, and measured evidence:
Build disposition and proof level:
Flag/configuration and automated exposure matrix by progression/mode/cohort/platform/locale/territory/age:
Automated tests, adversarial evals, simulation, and interaction tests:
Telemetry, success metric, countermetrics, and failure signal:
Runtime/device/network/server capacity, autoscaling, backpressure, and failure budget:
Trust, safety, fairness, rights, and platform floors:
Autonomous content, localization, moderation, support, anti-abuse, and incident operations:
Kill switch, runtime rollback, compensating transition, forward-fix, state migration, and retirement:
Specialist handoff:
```

### Real scarcity and execution graph

Treat autonomous construction capacity as elastic. The remaining scarce resources are verification and integration complexity; CPU/GPU, memory, startup, storage, network, server, battery, and thermal budgets; player attention, cognitive load, session time, and screen space; trust, safety, privacy, law, ratings, and storefront constraints; content rights and localized/cultural correctness; autonomous operational control; and real-player evidence for claims about fun, vibe, retention, demand, or commercial success. Construction complexity changes the execution graph and verification plan; it does not veto a capability.

Produce a dependency DAG with canonical contract owners, disjoint agent work packets, collision boundaries, parallel capability lanes, and serialized edits to shared state. The graph must converge on the full scale-ready target in the initial program rather than stop at an MVP. Assign gameplay-bot, economy-simulation, content, localization, moderation, support, performance, capacity, resilience, and live-operations agents where applicable. Require exact-candidate checks, dangerous-feature interaction matrices, property/model tests, load/soak/chaos tests, post-integration telemetry, rollback, and kill switches.

### Automated exposure controller

Maintain one canonical versioned policy source with the first capability portfolio, implemented through domain-scoped evaluators so it is not a runtime single point of failure. Enforce authority precedence:

```text
immutable trust, legal, safety, privacy, and consent floors
-> platform, territory, ratings, and age policy
-> entitlement, purchased-value, progression, and fairness invariants
-> reliability, capacity, device, and operational guardrails
-> product experiments and optimization
```

Lower layers cannot override higher layers. Models may score or propose only inside a pre-admitted action envelope; they cannot rewrite hard floors, eligibility, price, odds, spend limits, moderation severity, or their own evaluation gates. Use separate scoped identities and permissions for candidate proposal, independent validation, promotion/actuation, and an independent watchdog that can suppress the primary controller.

Domain evaluators continuously apply deterministic rules and bounded models without routine human review:

```text
policy_id, version, authority, effective window, and rollback version:
capability build/proof/config compatibility preconditions:
player progression, mastery, account-state, and prerequisite predicates:
eligible population, concurrency, matchmaking liquidity, and social-density gates:
mode, platform, app version, device tier, network, locale, territory, age, and consent eligibility:
service health, latency, error, capacity, economy, content, moderation, support, and safety guardrails:
state transitions: off -> internal -> gated -> test-cohort/opt-in -> default-on | degraded -> surface-specific recovery
hysteresis, minimum dwell time, cooldown, anti-flapping, maximum exposure step, and canary budget:
pass action, watch action, fail action, degradation ladder, and automatic recovery mode:
event/config/model inputs, freshness, missing-data defaults, drift checks, and fallback:
shadow evaluation, policy-diff check, signed provenance, decision trace, player-visible explanation, audit, and replay:
atomic policy snapshot, monotonic version, sticky assignment, propagation bound, and cross-device consistency:
last-known-good cache, controller outage, split-brain detection, watchdog, and controller SLO:
break-glass kill switch and machine-tested recovery:
```

Use player progression gates to reveal complexity when the individual is ready. Use eligible-population and liquidity gates to open multiplayer, guild, marketplace, or social layers when enough compatible players exist. Use device and service-health gates to select quality, topology, or degraded modes. Hard legal, safety, age, consent, and platform floors remain non-overridable. Missing or stale signals fail to a declared safe state; positive revenue or activity cannot lift a hard floor.

`exposure-1` — Data is a machine input, not a meeting. No annual review, manual cohort promotion, or future implementation project may be the normal exposure path.

`exposure-2` — Build pass, watch, fail, hysteresis, rollback, and player-state migration before the first exposure. An automation that can open but cannot safely close is incomplete.

`exposure-3` — Plan for peak and failure from the start: canonical state ownership, partitioning/sharding, versioned schemas and compatibility, deterministic migration, capacity envelopes, autoscaling, queues/backpressure, caching, rate limits, idempotency, reconciliation, graceful degradation, regional failure, recovery objectives, load/soak/chaos tests, and compute/abuse guards belong to the capability contract.

`exposure-4` — Safe fallback is surface-specific. Paid, stranger-social, UGC, privacy, and consent expansion fail closed. Purchased entitlements, earned progress, refunds, and ledger state fail preserving. Gameplay and services fail degraded or last-known-good. In-flight matches, parties, events, purchases, and reward claims drain or reconcile before closure. Never revoke purchased value, erase progress, strand groups, change committed odds, break assignment, or create cross-device inconsistency; define grandfathering, compensation, idempotent migration, and player-visible remediation.

`exposure-5` — Use `runtime rollback` only for truly reversible runtime state. Use compensating transitions for committed ledger, purchase, entitlement, reward, or externally visible state, and forward-fix for irreversible schema/state mutations.

### Autonomous maintenance loop

Every capability ships with a bounded closed loop rather than a future maintenance queue:

```text
observe versioned telemetry, authority freshness, incidents, drift, and player-state outcomes
-> diagnose with reproducible evidence and candidate identity
-> propose code/config/content/economy/localization/moderation/capacity changes
-> simulate and adversarially test interactions, abuse, migration, load, and rollback
-> validate exact candidate against quality, safety, platform, and runtime floors
-> canary through the exposure controller
-> promote, degrade, or roll back automatically
-> record outcome, update models/policies, and preserve replay evidence
```

Every code, config, policy, model, content, economy, dependency, moderation, or infrastructure mutation is a versioned candidate with signed provenance. Agents use scoped, short-lived authority; the proposer cannot be the sole validator or promoter. Contract, safety, abuse, migration, interaction, load, recovery, and exact-candidate gates run before promotion. Repository and runtime changes follow GitOps, merge queue, canary, live readback, and automated recovery. Hard floors and the gates judging a candidate remain outside that candidate's mutation authority.

Declare allowed mutations, budgets, schemas, policy source, escalation between agents, and non-overridable floors. Dependency/security updates, content generation, balance, localization, moderation, support, capacity, incident response, compensation, and deprecation follow the same loop. Break-glass control is for exceptional containment, never the normal release or maintenance path.

`maintenance-1` — Automation is incomplete if it only detects or recommends. It must safely execute the bounded response, verify the resulting state, and roll back on failed readback.

`maintenance-2` — Learned policy or model changes are new candidates: version, simulate, evaluate, canary, audit, and roll back them. Never allow self-modification to bypass hard floors or exact-candidate gates.

`integration-1` — Build fully; expose automatically and coherently. A broad scale-ready capability portfolio is compatible with a focused game because unexposed capabilities remain independently verified and policy-disabled rather than competing for player attention.

`integration-2` — No system may make the non-payer, returning player, new player, disabled player, low-end-device player, or child-safety path worse merely to increase a local metric.

`integration-3` — Agent-first does not mean one giant branch, one monolithic state machine, or every flag on. Parallelize only across explicit contracts and serialize shared-authority changes.

## 2. Growth and progression

Growth is not one experience. Design a progression graph across the axes that fit:

| Axis | Player value | Good unlock consequence | Failure mode |
| --- | --- | --- | --- |
| Skill/knowledge | mastery and competence | player sees or executes new possibilities | stat growth masks no learning |
| Power/capability | efficacy and new strategy | changes viable decisions or challenge relationship | treadmill, power creep, pay-to-win |
| Breadth | discovery and agency | new verbs, builds, routes, modes, or content | choice overload or dead options |
| Collection/expression | identity and completion | visible ownership, customization, stories | clutter, duplicates, status pressure |
| Narrative/world | curiosity and meaning | characters, places, consequences, perspective | exposition gates play |
| Social status/contribution | belonging and recognition | role, shared achievement, mentorship | obligation, exclusion, purchased rank |

Map every node with prerequisites, cost, choice, new possibility, content dependency, visibility, pacing hypothesis, catch-up, reset/season behavior, and irreversible consequences.

`progression-1` — Use short, medium, and long goals without making every horizon a numerical power ladder.

`progression-2` — Preserve meaningful choices. If every player must unlock the same nodes in the same order, explain why the line is teaching or narrative rather than pretending it is agency.

`progression-3` — Provide returning-player reorientation and catch-up that restores participation without invalidating loyal play.

`progression-4` — Model the content burn and maximum useful lifespan of each progression layer before launch.

## 3. Quest system

Quests should teach, reveal meaningful choices, deliver story, coordinate relationships, test mastery, or create a reason to explore. “Perform arbitrary taps for currency” is a chore, not a quest purpose.

### Quest taxonomy

| Type | Primary job | Guardrail |
| --- | --- | --- |
| Main/narrative | frame world and consequential progress | do not block core play behind exposition or missable state |
| Side/discovery | reward curiosity, expression, or alternate play | avoid completion-list overload |
| Teaching/mastery | introduce and remix a real verb | evaluate understanding, not only repetition count |
| Daily/weekly | surface a varied return path | cap obligation; allow choice; do not punish healthy absence |
| Seasonal/event | create shared novelty and cadence | state expiry, catch-up, compensation, and post-event conversion |
| Social/co-op | coordinate roles or shared goals | avoid forcing strangers, spam invites, or free-rider conflict |
| Comeback | reorient and reveal new value | do not teach players to churn for superior rewards |

### Quest contract

```text
quest_id and version:
purpose and player-facing premise:
eligibility and prerequisites:
objectives and acceptable variants:
progress authority and attribution:
visibility and feedback:
difficulty and accessibility:
party/offline/cross-device behavior:
expiry, timezone, pause, abandon, retry, and compensation:
reward and economy budget:
localization and content dependencies:
anti-abuse and support correction:
events and success/guardrail metrics:
```

### State model

```text
locked -> eligible -> offered -> accepted -> active -> objective_complete -> reward_claimable -> claimed
offered -> declined_or_expired
active -> paused | abandoned | failed_recoverable | expired
active -> service_incident -> compensated_or_extended
objective_complete -> duplicate_event -> idempotent_noop
```

`quest-1` — Define progress from authoritative gameplay events; retries, reconnects, duplicated messages, and party attribution must not double-grant or erase legitimate progress.

`quest-2` — Give daily/weekly systems a choice set or reroll/skip path when variety and autonomy matter. Do not turn all available quests into a mandatory checklist.

`quest-3` — Budget quest rewards against economy sources and sinks. A quest layer must not become the dominant activity while the core game becomes a reward-delivery wrapper.

`quest-4` — Measure whether a quest improves comprehension, breadth, mastery, social play, or return quality—not claim rate alone.

## 4. Economy and rewards

Maintain one versioned model of currencies, resources, items, and entitlements.

| Resource | Earn/purchase sources | Sinks/converters | Cap/expiry | Transfer | Refund/support | Purpose | Abuse/inflation risk |
| --- | --- | --- | --- | --- | --- | --- | --- |

Model sources, pools, sinks, converters, trades, gates, and reinforcing/balancing feedback loops. Simulate plausible new, regular, skilled, returning, non-paying, typical-paying, and high-spend profiles over representative horizons.

Audit:

- inflation, hoarding, dead currencies, forced leftovers, confusing exchange rates;
- dominant sources, sinks, builds, and conversions;
- progression walls, content gating, power creep, and catch-up;
- negative balances, refunds after spend, duplicate grants, rollback, and reconciliation;
- multi-accounting, bots, clock/device manipulation, trading and referral abuse;
- purchased-value nerfs, content sunset, server shutdown, and compensation.

`economy-1` — Every source needs a player purpose and a credible sink or ceiling. Every sink should express choice or progression, not tax basic enjoyment.

`economy-2` — Prefer simple, legible value. Additional currencies must earn their cognitive and support cost; purchased value should show a local real-money equivalent wherever current authority or player clarity requires it.

`economy-3` — Entitlement grants, reward claims, refunds, support adjustments, and ad rewards require idempotent ledger semantics and reconciliation appropriate to risk.

`economy-4` — Economy tuning is a versioned change with cohort impact, rollback/compensation, and communication. Never silently reduce purchased value.

## 5. IAP-led monetization and optional IAA

IAP-led means the primary revenue hypothesis is player-chosen purchase of understandable value. It does not mean putting purchase pressure into every loop or making free play deliberately bad.

### Offer ladder

Build a scale-ready generic offer, entitlement, pricing, eligibility, fulfilment, refund, support, and policy engine capable of the full ladder; configure and expose only value exchanges that fit the game:

| Offer | Value hypothesis | Key guardrail |
| --- | --- | --- |
| Cosmetic/expression | identity, collection, social display | preview accurately; avoid status harassment |
| Content/expansion | more authored or systemic play | explain scope, ownership, compatibility |
| Horizontal variety | new style or options | avoid disguised competitive dominance |
| Convenience | less repetition or administration | do not first create the pain being sold away |
| Starter/curated bundle | clear value after the player understands the game | no launch ambush, fake anchor, or forced leftovers |
| Season/battle pass | recurring goals, content, expression | disclose time, effort, expiry, catch-up, post-season state |
| Subscription/membership | genuinely continuing service/value | renewal clarity, restore/cancel/support, ongoing value |
| Paid randomness | collection surprise where approved | separate gacha gate below |

For every offer define audience and exclusion, prerequisite value moment, contents and ownership overlap, price and real-money clarity, eligibility, purchase limits, cooldown, start/end, inventory/content sunset, entitlement state, restore, refund/revocation, support trace, experiment, and kill switch.

`monetization-1` — Optimize contribution LTV and trust, not gross revenue, ARPDAU, purchase count, or session time in isolation.

`monetization-2` — Monitor payer/non-payer enjoyment, payer retention, revenue concentration, refunds, chargebacks, fraud, complaints, spend regret, support cost, and competitive fairness.

`monetization-3` — Ban fake scarcity, resetting countdowns represented as final, fabricated reference prices, disguised costs, shame, loss threats, accidental purchase paths, and offers personalized from distress or overspending propensity.

`monetization-4` — Develop store, consent, analytics, and ad adapters in parallel behind explicit boundaries where architecture and current platform rules permit; do not make them startup dependencies or default exposure before the value path works.

### Policy-gated advertising

Build IAA as a canonical complete scale-ready portfolio lane with consent, age, privacy, mediation, failure, performance, grant, suppression, audit, and recovery controls. Player exposure remains an optional non-payer value exchange, not a tax required by “free-to-play.”

- Prefer player-initiated rewarded ads with reward, eligibility, limits, duration expectation, failure/no-fill behavior, and grant state clear before opt-in.
- Place any approved interstitial only at a natural break after value; never at launch, first trust-building, active input, checkout, permission flow, or failure recovery.
- Segment caps and suppression by new-player state, payer promise, recent frustration, age/consent, session context, and fatigue.
- Make ad failure non-blocking. Reconcile verified completion and grant idempotently.
- Measure incremental ad value against IAP cannibalization, retention, churn after impression, complaints, accidental taps, privacy, battery, startup, and low-end performance.
- Provide per-placement kill switches plus automated current-authority freshness, policy, consent, and age gates.

## 6. Paid randomized rewards and gacha

Default exposure: off until the fantasy, collection depth, economy, audience, territory, platform, and trust gates pass. Build the canonical complete scale-ready transparent system now: parameterized economy simulation, banner lifecycle, pity, ledger, reconciliation, disclosure, audit, geo/age disable, spend controls, refunds, support, and deterministic alternatives behind policy gates. Connect paid value only in eligible exposure states. Platform odds disclosure is not proof that a mechanic is lawful, safe, or strategically sound.

### Automated paid-exposure gate

Require:

- a player-value reason stronger than revenue or habit pressure;
- current territory, storefront, ratings, age, and consumer-protection authority retrieved and checked by the policy pipeline;
- a non-random or bounded acquisition path appropriate to the game;
- payer/non-payer and competitive-fairness analysis;
- exact cost-distribution and economy simulation, including the upper tail;
- spend controls, history, support, refunds, minors policy, auditability, and geo-disable capability;
- explicit comparison with direct purchase, crafting, earnable selection, season pass, and mixed models.

### Banner contract

```text
banner_id, version, territory/platform eligibility, start/end:
pool and item/rarity probabilities:
featured split and guarantees:
price and real-money equivalent:
free/earned versus paid currency:
pity/guarantee state, visibility, reset, and carry-over:
duplicate prevention/conversion:
deterministic alternatives:
age/spend controls:
RNG and probability-table authority:
receipt, ledger, refund, audit, rollback, and support:
localized disclosure and accessible presentation:
```

### State model

```text
eligible -> disclosure_viewed -> purchase_authorized -> draw_committed -> result_recorded -> grant_reconciled
draw_committed -> timeout -> authoritative_readback -> grant_or_refund
result_recorded -> pity_updated -> next_state_visible
purchase_refunded -> remaining_value_reconciled -> support_or_abuse_ladder
```

`gacha-1` — Disclose probabilities, pool, guarantees, pity, duplicate behavior, currency cost, and real-money meaning immediately before purchase in accessible localized form, subject to current authority.

`gacha-2` — Never personalize odds by spend, failures, churn risk, social status, distress, age, or inferred vulnerability. Version and audit probability tables and all state transitions.

`gacha-3` — Use a visible hard guarantee where the model proceeds; define carry-over and duplicate handling. Do not use misleading near-miss, false rarity, hidden pity, or outcome-dependent pressure to induce another pull.

`gacha-4` — Paid random rewards for known or likely minors are a default stop. Any proposed exception needs explicit guardian controls and current legal/platform authority, not designer judgment alone.

`gacha-5` — Validate deterministic pity transitions plus statistical conformance sized to the rarest disclosed outcomes and chosen confidence. Record the method; do not invent a universal sample count.

## 7. Retention and notifications

Retention starts with reasons to return:

| Cadence | Return value | Candidate mechanism | Failure to avoid |
| --- | --- | --- | --- |
| Within session | curiosity, mastery, choice, closure | next encounter, build decision, story beat | cliffhanger without agency |
| Next session/day | unfinished self-chosen goal, new possibility | saved plan, refreshed choice, friend response | punishment for healthy absence |
| Week/event | novelty, mastery, relationship, shared moment | varied quests, event, co-op goal | chores or fear of missing essential value |
| Season/long term | identity, collection, status, story, community | new content/systemic variation | reset that erases meaningful investment |
| Comeback | reorientation and genuinely new value | catch-up, recap, returning path | superior rewards that teach churn |

`retention-1` — Measure return because of value, not only return occurrence. Segment by acquisition, version, platform, market, skill, payer state, social state, and relevant accessibility/device cohorts.

`retention-2` — Streaks celebrate continuity; they must not make sleep, health, travel, outages, or ordinary absence feel like irreversible loss. Define grace, pause, earned repair, soft reset, and incident compensation.

### Durable investment and belonging

Translate “sunk cost” into earned ownership, identity, mastery, creation, history, and relationships. The goal is that the next session remains valuable, not that leaving destroys prior value.

```text
player-owned or earned state:
utility, authorship, identity, mastery, history or relationship meaning:
canonical authority, sync, version and account-merge rules:
recovery, portability/export where applicable, deletion and privacy:
returning-player restoration/recap:
visibility, sharing and harassment controls:
purchase/entitlement, season rollover and shutdown treatment:
```

Good surfaces include optional character/avatar expression, builds/loadouts, collections, creations/UGC, housing, records, mastery, guild contribution, relationships and mentor reputation. Use a fast default/skip and offer deeper creation after the first competence or fantasy moment; do not make a long avatar editor a compulsory toll before play unless character creation is the core fantasy.

`retention-3` — Measure reuse, restoration, expression, perceived ownership, social contribution, mastery and trust. Do not target “time already spent” or difficulty leaving.

`retention-4` — Never threaten deletion after inactivity, erase history to sell restoration, force payment solely to preserve player-created work, or use permanent streak/status loss as the primary return mechanism.

### Release benefits, cross-promotion, reviews, and feedback

- Update/release benefits require a verified signed-version value event, authoritative idempotent grant, cap, retry/offline/reversal, economy budget, fraud/support and rollback. Never condition them on rating, review, permission, ad click, spend, forced share/contact upload, referral or another-game install.
- Cross-promotion uses a disclosed portfolio-fit edge, recipient value, age/territory/consent, frequency/dismissal, universal/app/web link and store fallback, attribution/holdout, cannibalization, support and any campaign/referral specialist artifact. It cannot obstruct cold start or critical play.
- Public ratings/reviews and private feedback are separate state machines owned by `review-solicitation-and-feedback-loop`. Use platform-specific current authority and neutral meaningful-value eligibility where allowed; never sentiment-gate, star-steer, reward reviews or copy Apple/Google prompting into Steam.
- Feed private feedback, reviews, support, refunds, behavior, quality, economy, safety and accessibility into the independently validated product-learning loop while preserving source, privacy, cohort and uncertainty.

### Notification eligibility

```text
product_state_has_real_value
-> category_enabled_in_product
-> OS_permission_available
-> truthful_and_current_message
-> user_state_and_age_eligible
-> quiet_hours_and_frequency_pass
-> fatigue_and_recent_failure_pass
-> send_with_expiry_and_deep_link
-> measure_play plus opt_out/uninstall/complaint/retention countermetrics
```

Ask permission in context after value or an explicit reminder request. Separate transactional, social, event, reward, and promotional controls. Use truthful state, local time, expiry, localization, accessibility, deep-link recovery, rate limits, suppression, and holdout measurement. Ban guilt, shame, fake friend activity, fake urgency, and notification-only paid repair.

## 8. Social, co-op, sharing, and virality

Build every relationship model below and its scale/safety operations now. At runtime, expose the smallest coherent set for each player-progression, population/liquidity, age, locale, and safety state:

| Pattern | Player/recipient value | Required design | Risk |
| --- | --- | --- | --- |
| Known-friend co-op | shared achievement and time | party, roles, skill gaps, reconnect, rewards | coordination failure, exclusion |
| Asynchronous help/gifts | lightweight reciprocity | limits, useful item/action, expiry, abuse controls | spam, obligation, farming |
| Challenges/ghosts/replays | skill comparison and story | comparable rules, privacy, share artifact | cheating, harassment |
| Guild/clan | persistent belonging and goals | roles, governance, contribution, inactive recovery | labour, exclusion, leader abuse |
| Spectating/streaming | learning and entertainment | readable state, privacy, delay/anti-cheat | sniping, consent, moderation |
| UGC/creation | expression and content supply | tools, discovery, rights, safety, moderation | harmful content, IP, creator exploitation |
| Friend discovery/chat | relationship formation | consent, age assurance, block/mute/report | grooming, PII, harassment |

`social-1` — Co-op needs role complementarity or shared decisions, not merely parallel grinding. Specify join, leave, rejoin, host migration, latency, failure, rewards, skill disparity, and offline member behavior.

`social-2` — Shares are user-initiated, previewable, editable, and valuable to the recipient. Prefer native share/deep-link or code flows; never auto-post or require contact upload.

`social-3` — Instrument the complete funnel:

```text
shareable moment/invite created -> previewed -> sent -> opened -> accepted
-> recipient activated -> co-play/value reached -> recipient retained
```

Also track cancellation, block/report, spam complaints, failed joins, referral fraud, and retention of both sides. Raw share count and incentivized installs are not virality.

`social-4` — Referral rewards should be bounded, single-level, tied to genuine recipient activation, useful to both sides, and protected from bot/multi-account abuse. Never reward positive reviews or misleading endorsements.

## 9. UGC, community safety, and abuse

The automated policy engine increases interaction exposure only when the already-built safety capability passes its gates:

```text
known-friend play
-> asynchronous/preset communication
-> managed groups and creation
-> open discovery/chat/trading only with mature controls
```

Define age and privacy defaults, identity exposure, personal-information prevention, content rules, proactive and reactive moderation, block/mute/report access, severity classes, response and escalation targets, evidence retention, appeals, repeat-offender policy, trusted-contact/support routes, anti-cheat, trading fraud, and moderator tooling.

`safety-1` — For minors or likely-child audiences, default profiles and discovery to private, stranger communication off, behavioural ads off, and purchases/spend/social expansion behind appropriate guardian and current-authority controls.

`safety-2` — Build and instrument autonomous proactive and reactive moderation, escalation, audit, appeal, and incident controls with the interaction capability. Keep open exposure off wherever language, age, locale, severity, recovery, or current-authority coverage fails. Shipping open chat and waiting for reports is not a safety system.

`safety-3` — High-spend, repeated-failure, or long-session signals may trigger safety friction, breaks, budgets, or support; never more aggressive monetization.

## 10. Live operations

Live operations is a product and production system, not a calendar of offers.

Every event requires:

- player value, novelty, pillar, audience, eligibility, and return path;
- start/end/timezone, version, locale, platform, and dependency compatibility;
- content and economy budget, sources/sinks, catch-up, expiry, and post-event conversion;
- agent-generated or sourced assets with provenance, localization, accessibility, moderation, automated QA, support, and store-review readiness;
- remote configuration with schema, automated validation, policy-authorized promotion, staged rollout, kill switch, rollback, and audit;
- outage, extension, compensation, duplicate-grant, and communication policy;
- baseline/holdout, primary metric, guardrails, cannibalization, and learning record.

`liveops-1` — Preserve a stable baseline long enough to learn. Constant overlapping events can lift activity while making the core product, economy, and experiments unreadable.

`liveops-2` — Measure content throughput, defect/rollback rate, localization lead time, support/moderation load, economy impact, and event fatigue alongside revenue and retention.

`liveops-3` — Every live event ends in a valid state. Define unclaimed rewards, temporary inventory, quests, leaderboards, purchases, and player compensation before start.

## 11. Integration checklist

- Every canonical and additionally requested system has a capability record, declared/measured scale envelope, complete target or exact hard-floor blocker, verified delivery slices, build disposition, proof level, exposure policy, zero-cost off contract, telemetry, migration, and recovery; none is blocked by genre fit, human effort, absent demand, or speculative ROI.
- The agent-first build graph declares contracts, dependencies, disjoint work packets, collision boundaries, shared-state serialization, exact-candidate gates, interaction/load/failure tests, and autonomous operations, and converges now rather than in a later hardening phase.
- One canonical policy SSOT with resilient domain evaluators automatically unlocks, promotes, suppresses, degrades, and recovers capabilities from progression, population/liquidity, device, platform/locale/age/territory, service-health, quality, safety, and operational gates without routine human approval.
- Every capability owns a bounded observe-to-learn maintenance loop that executes, verifies, and safely recovers content, balance, localization, moderation, support, capacity, dependency, and incident changes without routine human queues.
- Progression changes choices or meaning across appropriate growth axes.
- Quests have precise state, recovery, authority, reward budget, and non-chore purpose.
- Economy has one model, simulated profiles, idempotent value movement, refund/support, and inflation/abuse review.
- IAP sells understandable value without worsening free play; requested IAA infrastructure is built to scale while exposure remains contextual, suppressible, and non-blocking.
- A requested gacha capability is built to scale with simulation, ledger, reconciliation, disclosure, guarantee, audit, geo/age gates, spend controls, support, and rollback; automated paid/default exposure remains off unless every applicable gate passes.
- Retention reasons exist without notifications; streak recovery and healthy stopping are designed.
- Social systems create reciprocal/recipient value and own reconnect, privacy, moderation, child safety, spam, cheating, and fraud.
- Virality is measured through retained recipient value, not sender actions alone.
- Live operations has autonomous content, validation, localization, moderation, support, versioned configuration, rollback, compensation, and learning ownership.
- Detailed economy, launch, mobile entitlement, notification, ad, safety, or payment tuning is handed to the owning specialist rather than duplicated.
