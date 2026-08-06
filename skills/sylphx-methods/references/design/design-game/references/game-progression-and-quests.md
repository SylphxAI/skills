# Game Progression And Quests

## Contents

1. Progression promise and topology
2. Progression layers and node contract
3. Curves, pacing, and power budgets
4. Quest architecture
5. Challenge and content interaction
6. Catch-up, seasons, and durable state
7. Simulation and measurement
8. Progression/quest output

## 1. Progression promise and topology

Progression should create new decisions, competence, expression, access, relationships, or story meaning. Bigger numbers against proportionally bigger enemies are not sufficient.

Define the intended emotional sequence:

```text
understand next goal -> choose path -> act and learn -> receive legible progress
-> unlock a meaningful possibility -> recombine old and new mastery -> choose again
```

Select and combine topologies deliberately:

| Topology | Useful for | Risk to test |
| --- | --- | --- |
| Linear track | teaching, narrative order, clear power bands | false choice, grind wall |
| Branching tree | build identity and strategic commitment | trap choices, respec anxiety |
| Loadout/deck/roster | recombination and counterplay | collection dominance, complexity |
| Mastery track | post-cap skill and breadth | disguised infinite vertical power |
| Collection/set | expression, discovery and completion | duplicate clutter, FOMO |
| Reputation/faction | world meaning and social identity | mutually exclusive regret |
| Achievement/challenge | optional mastery and prestige | chore list, inaccessible conditions |
| Prestige/rebirth | renewed goals and compression | destructive reset, churn optimization |
| Account-wide breadth | alt/role experimentation and catch-up | removes character identity |
| Social/guild contribution | belonging and shared history | obligation, exclusion, leader abuse |

Use one visible primary progression spine and a limited number of secondary layers per stage. Reveal complexity through player readiness, not simultaneous menus.

## 2. Progression layers and node contract

Inventory every layer that may apply:

- player knowledge and execution mastery;
- account, character, roster, class or role;
- level, stats, skills, talents and abilities;
- equipment, crafting, enhancement and loadouts;
- content, map, narrative, mode and difficulty access;
- collection, cosmetics, housing and creation;
- achievements, rank, prestige and seasonal competition;
- friendship, mentorship, guild and community contribution.

For each layer define:

```text
Layer purpose and player promise:
Durable, seasonal-competitive, renewable or ephemeral state:
Entry and visibility:
Nodes, prerequisites and mutually exclusive choices:
Earned/purchased inputs and authoritative state:
New verb, decision, expression, access or social value unlocked:
Respec, retry, downgrade, refund and correction:
Power budget and interaction with challenge:
Catch-up, returning-player and late-entry behavior:
Content demand and useful lifetime:
Completion, extension and retirement:
```

Node contract:

```text
node_id/version
prerequisite expression
visible requirement and progress
cost and source classes
unlock result and affected verbs
choice permanence/respec
party/account/season scope
duplicate/overlap treatment
offline/cross-device behavior
telemetry and support correction
```

Do not hide a required dependency inside a different currency, unknown drop, social obligation, or purchase. Show why the next goal matters before asking for investment.

## 3. Curves, pacing, and power budgets

Use curves as hypotheses, not decoration. For every quantitative track define units, horizon, target cohorts, assumptions, sensitivity and guardrails.

### Core curve relationships

```text
cumulative_cost(level n) = sum(incremental_cost[1..n])
time_to_node = required_value / observed_eligible_value_rate
progress_velocity = value_earned / active_or_elapsed_time
power_gain_per_cost = delta_effective_power / marginal_cost
content_burn = available_meaningful_content / cohort_consumption_rate
```

Model distributions, not only averages. Include new, typical, skilled, returning, accessibility-needs, low-connectivity, baseline-access, payer, high-spend and late-entry cohorts.

### Curve choices

- Linear: predictable teaching or bounded track.
- Sublinear/diminishing returns: vertical compression and long-term fairness.
- Piecewise: intentional chapters, caps or changing systems; explain each breakpoint.
- Exponential: use cautiously for bounded costs or score displays; never let it create an opaque mandatory wall.
- Logistic/S-curve: fast early competence, meaningful middle, bounded mature state.

For each curve inspect:

- first meaningful unlock and early competence;
- choice cadence and dead time between decisions;
- difficulty/power relationship and viable build diversity;
- currency/source volatility and worst-case time;
- content prerequisites and sequence breaks;
- paid acceleration, ads, random rewards and non-payer baseline;
- cap, expansion compression and year-one/year-three behavior.

### Power budget

Separate theoretical rating from effective power in real encounters. Allocate power across level, equipment, skills, team composition, mastery and temporary effects. Define a reachable viability band, vertical cap or diminishing returns, horizontal post-viability value, normalization/sync modes, and acceptable skill expression.

Never make optional payment the only practical way to close a deliberately unbounded veteran gap.

## 4. Quest architecture

A quest must teach, reveal choice, deliver story, coordinate relationships, test mastery, encourage exploration, or expose meaningful content. “Perform arbitrary actions for currency” is a chore.

### Quest graph

Model quests as a versioned graph:

```text
prerequisite state -> offered/visible -> accepted/active
-> objective progress -> complete -> reward claim -> downstream unlock

offered -> declined/expired
active -> paused/abandoned/failed_recoverable/expired
active -> incident -> extended/compensated
complete -> duplicate event -> idempotent no-op
```

Quest contract:

```text
quest_id/version and purpose
premise, giver/source and player-facing goal
eligibility, prerequisites and visibility
objectives, ordering, optional branches and acceptable variants
authoritative progress events and party attribution
difficulty, accessibility, hints and failure/retry
offline/reconnect/cross-device behavior
expiry, timezone, abandon and incident compensation
reward, economy budget, duplicate ownership and post-quest unlock
localization, narrative/content dependencies and moderation
anti-abuse, support correction and migration
success evidence and countermetrics
```

### Quest families

| Family | Primary job | Guardrail |
| --- | --- | --- |
| Main/narrative | world, consequence and progression spine | do not bury core play in exposition |
| Side/discovery | curiosity, expression and alternate paths | avoid map/checklist overload |
| Teaching/mastery | introduce then remix a verb | test understanding, not repetition count |
| Daily/weekly | varied return path | choice, reroll/skip and healthy absence |
| Seasonal/event | shared novelty and cadence | expiry, catch-up, conversion, compensation |
| Social/co-op | shared roles and goals | no forced strangers, spam or free-rider trap |
| Comeback | reorientation and new value | do not make churn optimal |
| Generated/systemic | scalable contextual goals | provenance, novelty, validity and repetition bounds |

For generated quests, define allowed templates, world-state predicates, semantic validation, solvability, localization, reward budgets, duplication/repetition limits, safety/rights, and rollback. Agents may generate candidates; deterministic rules validate state and rewards before exposure.

## 5. Challenge and content interaction

Progression should change what the player can consider, not remove the need to play.

Review:

- whether new power opens strategy or only cancels inflated enemy stats;
- whether old skills remain useful and combinable;
- whether advanced content tests taught decisions;
- whether difficulty options and accessibility assists preserve intended agency;
- whether failures identify knowledge, execution, strategy, variance or coordination gaps;
- whether retries are fast enough for learning;
- whether one build, item, quest route or purchase dominates;
- whether content cadence can sustain each layer without repetitive filler.

Use encounter/content grammars so new mechanics remix prior knowledge. Forecast content burn for the first session/day/week, early mastery, mid-game, endgame, season and returning path.

## 6. Catch-up, seasons, and durable state

Classify progression state:

- durable ownership/history/identity;
- durable breadth/mastery;
- seasonal competitive state;
- renewable world control;
- ephemeral event state;
- operational state.

Catch-up closes distance to viable participation while preserving veteran mastery, prestige and history. Candidate mechanisms include guided goals, recap, curated builds, faster obsolete vertical progression, world-age multipliers with caps, normalized kits, party sync, deterministic essentials, mentor contribution, account-wide convenience and archived content.

Define:

```text
baseline-access time to core competence
time to viable build/loadout
time to known-friend co-play without carrying
time to useful social contribution
time to normalized competitive eligibility
```

These are contextual hypotheses, not universal targets. Never create paid-only catch-up after designing an excessive gap. Never make leaving and returning the optimal reward strategy.

Prestige/rebirth may reset a declared renewable layer only when durable ownership, purchased value, history, relationships and meaningful mastery survive or convert transparently.

## 7. Simulation and measurement

Simulate:

- day-0, day-30, year-1 and mature-world starts;
- new, regular, skilled, returning and low-skill paths;
- baseline/non-payer, typical payer and high-spend paths;
- lucky, median and unlucky random-reward paths;
- solo, known-friend, guildless and organized-group paths;
- low-population, offline/poor-network, low-end and accessibility cohorts;
- dominant build, content drought, inflation, exploit and progression migration.

Measure:

- time and active choices to meaningful unlocks;
- goal comprehension and self-chosen next goal;
- build/route diversity and respec regret;
- stuck states, abandonment, retry reason and mastery;
- progression velocity distribution and content burn;
- payer/non-payer reachability and purchase regret;
- catch-up success, veteran invalidation and churn incentives;
- quest purpose outcomes, not only acceptance/claim rate.

Simulation can falsify arithmetic and state assumptions. Target-player evidence is still required for perceived meaning, fairness, motivation and fun.

## 8. Progression/quest output

Return:

1. progression promise, topology and layer map;
2. node/prerequisite/unlock graph and state-class matrix;
3. cost, time, power, choice and content-burn curves with assumptions;
4. first-session/day/week/season/return goal ladder;
5. quest taxonomy, graph, contract and generation rules;
6. challenge/content/economy/IAP/IAA/gacha/social interactions;
7. catch-up, sync, normalization, prestige/season and late-entry policy;
8. simulations, metrics, countermetrics, stop conditions and specialist handoffs.

Complete only when progression changes meaningful possibilities, every required path is legible and reachable, quests have a non-chore purpose, paid value does not repair a manufactured gap, and durable player investment survives ordinary season, return, migration and support paths.
