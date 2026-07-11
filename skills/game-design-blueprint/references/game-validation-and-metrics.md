# Game Validation And Metrics

## Contents

1. Evidence discipline
2. Metric tree
3. Telemetry contract
4. Playtesting and causal experiments
5. Agent-first validation and exposure gates
6. Blueprint template
7. Blueprint quality rubric
8. Research and authority map

## 1. Evidence discipline

Keep claims auditable:

| Label | Meaning | Allowed use |
| --- | --- | --- |
| `given` | constraint or direction supplied by the principal | design input; not external fact |
| `observed` | directly measured, read, played, or retrieved with source and date | evidence within its scope |
| `assumed` | working premise selected to proceed | must name risk and automated reevaluation trigger |
| `hypothesis` | falsifiable causal or behavioural prediction | needs test and kill/iterate decision |
| `decision` | chosen option under current evidence and constraints | must name agent/policy authority, tradeoff, and reevaluation trigger |

`evidence-1` — Do not claim that a mechanic causes revenue, retention, or virality because a successful game contains it. Separate observation, mechanism hypothesis, confounders, and transfer test.

`evidence-2` — Do not use one benchmark as a universal target. Record metric definition, cohort, platform, genre/archetype, acquisition mix, market, stage, window, sample, source date, and uncertainty.

`evidence-3` — Qualitative observation and quantitative telemetry answer different questions. Use playtests to understand why and instrumentation/experiments to estimate how often or whether a change caused an outcome.

`evidence-4` — Current platform policy, law, ratings, advertising, child safety, privacy, notifications, payments, random rewards, UGC, and cross-network requirements must be retrieved from primary authority for the exact territory/storefront before release. A source URL saved here is a route, not a compliance verdict.

`evidence-5` — Unknown demand, retention, or revenue does not block complete scale-ready construction. It becomes a typed missing-signal condition in the automated exposure policy; the controller takes its declared safe action until the signal becomes available. Never turn “no users yet” into “do not build” or “wait for a future team to harden it.”

## 2. Metric tree

Choose one primary product outcome that matches the success contract, then attach leading indicators and guardrails. Do not optimize every metric at once.

| Branch | Candidate measures | Necessary interpretation |
| --- | --- | --- |
| Acquisition/message | qualified impression, store/trailer comprehension, install/wishlist, creative-to-product match | low acquisition cost with poor retention can be audience mismatch |
| Startup/activation | first frame/input/play/fun, tutorial/guest/account/permission funnel, first self-chosen goal | define each milestone from observed behaviour |
| Core experience | action success, strategy variety, comprehension, perceived fairness, retry reason, mastery, fun reasons | session time alone cannot distinguish delight from friction |
| Engagement | active days, sessions, meaningful actions, content breadth/depth, voluntary stop/return | more minutes may increase fatigue or harm |
| Retention | cohort return, rolling retention, resurrection, churn reason, return reason | segment by version, source, market, platform, skill, payer/social state |
| Progression/content | goal completion, choice distribution, build diversity, content burn, stuck state, catch-up | completion can signal ease, grind, or good pacing |
| Commercial | offer exposure/intent/purchase/fulfilment, payer conversion/retention, net LTV, margin, IAP/IAA mix | include fees, refunds, fraud, support, content, infra, acquisition |
| Economy/gacha | source/sink balance, inflation, balances, disclosed/observed odds, pity/duplicates, spend distribution | monitor upper-tail cost, fairness, regret, refund, minors controls |
| Social/viral | party success, co-play, reciprocity, invite/share funnel, recipient activation/retention | count recipient value, not messages sent |
| Trust/safety | opt-out, uninstall after exposure, refund/chargeback, complaint, report/block/mute, response outcome, appeal | a revenue lift with degraded safety/trust fails |
| Accessibility/reach | setup and task completion by mode/device/locale, assist usage, defect and exclusion reason | option presence is not successful access |
| Technical | startup stages, frame-time distribution, crash/hang/OOM, save loss, reconnect, thermal/battery/network | use real-device percentiles and sustained sessions |
| Operations | autonomous content throughput, validation/localization/moderation/support coverage, rollback, event defects, incident recovery | a cadence without a verified autonomous control plane is not viable for exposure |

For each decision metric define:

```text
name and semantic definition:
automated policy and transition it informs:
population/cohort and exclusions:
event/query source and owner:
baseline and external context:
target/watch/stop hypothesis:
window, maturity, sample/confidence:
guardrails and countermetrics:
known bias/confounders:
machine action on pass/watch/fail, hysteresis, and fallback:
automated reevaluation trigger and expiry:
```

`metrics-1` — Always inspect distributions and cohorts. Means can hide high-spend concentration, rare startup failures, low-end exclusion, or a small harmed group.

`metrics-2` — Retention, revenue, and virality require countermetrics for trust, fatigue, fairness, refund, abuse, support, accessibility, and technical quality.

`metrics-3` — Measure the reason for return, purchase, share, quit, refund, and report through research or structured signals; do not infer motivation from the event alone. Encode operational responses in versioned policies rather than a recurring human dashboard ritual.

## 3. Telemetry contract

Design events from decisions, not from a desire to “track everything.”

```text
event_name and version:
semantic trigger and authoritative producer:
required properties and enumerations:
correlation/session/experiment/content/economy versions:
user/device/locale/platform fields with minimization:
deduplication and late/offline behavior:
consent, age, purpose, access, retention, deletion, and residency:
quality checks and owner:
downstream decisions/queries:
```

Candidate event families:

- startup and FTUE milestones;
- input, action, encounter, failure, retry, recovery, and mastery;
- content, quest, progression, inventory, currency, reward, and economy mutation;
- offer exposure, purchase intent, authorization, fulfilment, restore, refund, and support correction;
- ad eligibility, request, impression, completion, reward, suppression, and complaint;
- notification eligibility, send, expiry, delivery, open, deep-link result, opt-out, and uninstall proxy;
- party, match, invite, share, recipient activation, chat/report/block/mute, moderation, and appeal;
- performance, crash, hang, memory, thermal, network, save, reconnect, and state conflict;
- live-config exposure, event eligibility, participation, compensation, rollback, and incident version.

`telemetry-1` — Version game rules, economy tables, content, offers, experiments, and configuration in the events needed to compare outcomes. A metric without candidate identity is difficult to act on.

`telemetry-2` — Avoid raw personal data and open text by default. Hashing does not make identity or sensitive content harmless; define purpose, access, retention, and deletion.

`telemetry-3` — Validate missing, duplicate, reordered, late, impossible, and schema-drifted events before using them for commercial or safety decisions.

## 4. Playtesting and causal experiments

### Playtest protocol

```text
hypothesis and stage:
target participant and exclusion rationale:
build/device/input/locale/accessibility configuration:
task or natural-play prompt:
what the study agent may say:
observable behaviours and timestamps:
post-play questions separated from observation:
severity and confidence:
decision and next test:
```

Use naive-player tests for comprehension, repeated sessions for progression/retention hypotheses, matched skill groups for challenge, representative devices for performance, disabled-player research for accessibility, independent language/cultural agents plus target-participant signals for locales, and real relationship contexts for social play. Target players produce product evidence; they are not development, approval, or operational gates.

`playtest-1` — Do not coach unless the experiment is explicitly testing coached use. A hint changes the evidence.

`playtest-2` — Ask players to describe goals, causality, choices, cost, and feelings in their own words. Avoid leading questions such as “Was the reward satisfying?”

`playtest-3` — Preserve failure examples and minority experiences. A majority score cannot override a severe safety, accessibility, or comprehension failure.

### Experiment manifest

```text
id, owner, candidate version, start/review/expiry:
decision and falsifiable hypothesis:
target population and eligibility:
randomization unit and assignment persistence:
control and variants:
primary metric and expected direction:
guardrails, safety floors, and stop rule:
sample/duration rationale and novelty/seasonality risk:
sample-ratio-mismatch and instrumentation checks:
interaction risk with other events/experiments:
rollout, kill switch, rollback, and player remediation:
analysis method, segments, uncertainty, and multiple-testing policy:
result, caveats, decision, and follow-up:
```

`experiment-1` — Never experiment by hiding price or odds, weakening consent/refund/cancel/report controls, targeting minors or vulnerability, or exposing players to an unbounded safety risk.

`experiment-2` — Stop or reverse when a declared trust, safety, fairness, accessibility, or reliability floor materially worsens even if a revenue metric rises.

`experiment-3` — Use holdouts where persistent notifications, events, offers, recommendations, or live configuration would otherwise make incremental effect unknowable.

`experiment-4` — Short experiments can capture novelty and displacement rather than durable LTV or retention. State which mature outcome remains unknown.

## 5. Agent-first validation and exposure gates

Build every requested capability to its declared production-scale target now. Small vertical slices are delivery and verification units, not a smaller end state. Parallelize them when contracts are disjoint, then integrate and scale-verify the whole target before calling the capability complete. The core loop remains the integration spine and first default-on experience; it is not a reason to leave the broader portfolio, automation, or operating plane unfinished. Sequence shared-contract mutations and dangerous interactions, not independent construction.

| Stage | Highest-risk claim | Smallest useful artifact | Evidence | Next build/exposure decision |
| --- | --- | --- | --- | --- |
| Thesis/comparator | intended promise and capability hypotheses are coherent enough to falsify | pitch, references, paper rules, complete capability sweep | comprehension, contradictions, transfer assumptions | refine contracts; commit the scale-ready target regardless of demand certainty |
| Contract/build graph | agents can complete once without hidden scale or state debt | capability records, numeric workload/failure envelope, production contracts, state authorities, capacity model, dependency DAG, work packets, interaction matrix, exposure policy | contract, dependency/collision, floor, failure, and no-later-debt audit | parallelize verified slices; serialize shared authority; finish the declared target now |
| Paper/mechanical prototype | choices and system dynamics have potential | cards, board, spreadsheet, simulation | decision variety, dominant strategy, economy ranges | refine mechanism while code/content/operations agents continue the full implementation |
| Graybox core | moment/encounter loop is understandable and desirable | playable core with minimal presentation | gameplay agents, naive observation, retry reasons, fairness, mastery signals | choose the default-on spine; do not block independent portfolio construction |
| Verified delivery slices | each work packet satisfies its contract without masking unfinished scope | progression, economy, commercial, social, platform, content, automation, and operations slices behind flags | contract/property/model tests, simulations, abuse, load, failure, and performance tests | machine-merge passing slices; continue until the scale-ready target is complete |
| Complete integration | all capabilities, autonomous operations, scale architecture, and dangerous combinations cohere | full integrated candidate plus versioned exposure control plane | target-player signals, accessibility, interaction, migration, measured exact-candidate load/soak/chaos against the declared envelope, startup/frame/memory/device proof | mark scale-verified only on measured pass; controller selects safe exposure state |
| Autonomous limited exposure | policies and operations survive real cohorts without a human gate | instrumented market/platform/progression/population slice | machine-read cohort, service, safety, support, economics, and policy signals | controller promotes, holds, degrades, suppresses, or rolls back with hysteresis |
| Autonomous scale | marginal population/platform/content expansion preserves floors | prebuilt scale path plus staged policy transitions | guardrailed canary/cohort and capacity readback | controller promotes, pauses, degrades, or rolls back |

`gate-1` — Prove the smallest core risk before hard-coupling or default-enabling the full stack. Build economy, content, multiplayer, chat, live operations, platform adapters, their scale paths, and their policy gates in parallel behind contracts and flags; do not postpone their completion.

`gate-2` — Every stage has pass, watch, and fail predicates, hysteresis, safe missing-signal behaviour, and machine actions. “Learn more” or “wait for annual review” without an automated transition is not a gate.

`gate-3` — A successful prototype proves only its scoped claim. Graybox fun does not prove content capacity, monetization, retention, moderation, or production performance.

`gate-4` — A failed value hypothesis changes automated exposure or the configuration hypothesis; it does not reveal permission to leave scale, automation, or operations unfinished. Retire only through a policy-driven migration with evidence and a learning record.

`gate-5` — Gameplay bots, simulations, generated content tests, and automated judges expand coverage. Target-audience signals are still required before claiming human fun, vibe, comprehension, social meaning, demand, retention, or willingness to pay, but those signals feed automation rather than routine human approval.

`gate-6` — `scale-verified` requires measured exact-candidate proof against the declared numeric workload/failure envelope. `production-proven` requires deployed candidate identity and live runtime readback. Architecture prose, simulation, CI, or generated fixtures cannot substitute.

## 6. Blueprint template

```text
# Game Design Blueprint: <working title>

## 0. Evidence boundary
- Given:
- Observed sources/builds and dates:
- Assumptions:
- Hypotheses:
- Decisions and review triggers:
- Unavailable evidence:

## 1. Executive thesis
- Target player and play context:
- Fantasy, genre, and commercial archetype:
- Lead platform, minimum device, inputs, geographies, age:
- One-sentence player promise:
- Differentiation and comparator synthesis:
- Non-goals and ruin boundaries:
- Success contract and primary outcome:

## 2. Experience coherence
| Pillar/anti-pillar | Player behaviour/language | Dynamics | Mechanics/content | Evidence |
- Player verbs:
- Mechanics -> dynamics -> experience risks:

## 3. Loop architecture
- Moment loop:
- Encounter loop:
- Session arc:
- Meta loop:
- Social/live loop, if selected:
- Loop dependency diagram:

## 4. Challenge, learning, and content
- Skill assumptions and demand curve:
- Teach/practice/test/remix:
- Failure/recovery/assist model:
- Mastery and skill ceiling:
- Encounter/content grammar and pacing:
- Content production/burn model:

## 5. First-time experience
| Beat | Dependency/friction | Player understanding/action | Event/evidence | Recovery |
- First five minutes, first session, first-day path:
- Guest/account/download/permission/notification timing:

## 6. System applicability and integration
| Capability | Player value/pillar | Scale-ready target | Contract/state authority | Dependencies/collisions | Build disposition | Proof level | Automated exposure policy | Flag/migration/recovery | Metrics/floors | Specialist |
- Progression and quest summary:
- Economy/reward summary:
- IAP/IAA/gacha decision:
- Retention/notification decision:
- Social/co-op/share/UGC decision:
- Live-ops decision:

## 7. Agent-first execution
- Capability sweep: progression, quests, economy, IAP, IAA, gacha, notifications, co-op, friends, sharing, guilds, chat, UGC, live ops, platform adapters, localization, accessibility, low-end tiers.
- Complete production target and explicit no-later debt per capability:
- Numeric scale envelope: CCU/QPS/TPS/rooms/guilds/UGC/content cadence, data/regions/consistency/residency, p50/p95/p99 SLOs, error budget, RPO/RTO, resource/abuse ceilings, headroom, overload/degradation:
- Exact load/soak/chaos candidate and measured evidence:
- Dependency DAG and canonical contract owners:
- Disjoint agent work packets and collision boundaries:
- Parallel lanes and serialized shared-state mutations:
- Gameplay-bot, simulation, content, localization, moderation, support, performance, capacity, resilience, and live-ops agents:
- Exact-candidate, interaction, property/model, load/soak/chaos, integration, and postsubmit gates:
- No MVP, manual-operation, future-hardening, deferred-automation, migration, or replatform debt:

## 8. Automated exposure controller
- Canonical policy ID/version, source authority, effective window, prior version, signed provenance, and audit:
- Authority precedence: immutable trust/legal/safety/consent -> platform/territory/age -> entitlement/fairness -> reliability/capacity -> experiments:
- Domain-scoped evaluators, proposer/validator/promoter permission separation, bounded model action envelope, and independent watchdog:
- Build/proof/config compatibility preconditions:
- Player progression/mastery/account prerequisites:
- Eligible population, concurrency, matchmaking liquidity, and social-density gates:
- Mode/platform/version/device/network/locale/territory/age/consent eligibility:
- Service-health, capacity, economy, content, moderation, support, quality, and safety guardrails:
- State transitions, pass/watch/fail actions, hysteresis, cooldown, anti-flapping, maximum exposure step, canary budget, and safe missing-signal defaults:
- Shadow evaluation, policy-diff checks, atomic snapshots, monotonic versions, sticky assignment, propagation bounds, cross-device consistency, and replay:
- Last-known-good cache, controller outage/split-brain behaviour, watchdog action, and controller SLO:
- Automatic unlock, promotion, suppression, degradation, runtime rollback, compensating transition, forward-fix, and player-state migration:
- Surface-specific fallback: fail-closed risk expansion; fail-preserving purchased/earned value; degraded/last-known-good play; drain/reconcile in-flight state; grandfathering and remediation:
- Break-glass kill switch and machine-tested recovery:

## 9. Autonomous maintenance loop
- Observe/diagnose evidence and candidate identity:
- GitOps/merge-queue path, signed provenance, scoped short-lived agent authority, allowed mutations, budgets, and non-overridable floors:
- Separate proposer, independent validator, promoter, and watchdog; gates outside candidate mutation authority:
- Code/config/content/economy/localization/moderation/support/capacity candidate generation:
- Simulation, adversarial interaction, migration, load, and rollback tests:
- Exact-candidate contract/safety/abuse/migration/interaction/load/recovery validation, canary, promotion/degradation/recovery, and live readback:
- Learning record, policy/model versioning, drift, replay, and retirement:

## 10. Experience and reach
- Action-feedback and audiovisual grammar:
- Platform/input/UI capability matrix:
- Startup and first-playable path:
- Low/mid/high quality tiers and budgets:
- Network/save/offline/cross-play:
- Accessibility modes and evidence:
- Locale/platform plan and cultural review:
- Zero-cost/non-reachable off-state contract per optional runtime module:

## 11. Trust and operations
- Payments/refunds/economy abuse/anti-cheat:
- Minors/privacy/spend/random rewards:
- Friends/chat/UGC/moderation/report/block/appeal:
- Autonomous support, content, localization, moderation, and live-ops control plane:
- Current authority to retrieve:
- Incident, compensation, rollback, and shutdown considerations:

## 12. Measurement and validation
- KPI tree and metric contracts:
- Event/version/experiment plan:
- Playtest cohorts and protocol:
| Stage | Hypothesis | Artifact | Pass/watch/fail predicates | Guardrails | Automated action |

## 13. Completion
- Top risks and unresolved questions:
- Capabilities queued by exact dependency, floor-blocked, or retired, and why:
- Capabilities built to scale but policy-disabled, and their automatic unlock predicates:
- Specialist handoffs:
- Next proof, not deferred build scope:
- Kill/recovery criteria and automated policy reevaluation trigger:
```

## 7. Blueprint quality rubric

Score proposal quality from 0 (missing or contradictory), 1 (plausible but unproven/incomplete), or 2 (coherent, evidence-labelled, and testable):

1. player and success contract;
2. differentiated thesis and coherent loops;
3. first-time experience and time-to-fun;
4. challenge, feedback, and accessibility;
5. progression and content integration;
6. commercial fit and player trust;
7. retention, social, and live-ops fit;
8. platform, performance, and localization;
9. evidence, telemetry, and experiments;
10. build-to-scale capability portfolio, no-later-debt graph, automated exposure and maintenance controllers, handoffs, and rollback criteria.

A forward-test candidate should reach at least 17/20 with no hard gate failure. This threshold evaluates the blueprint artifact, not whether the game will succeed; only product evidence can do that.

## 8. Research and authority map

The following sources informed this original synthesis and were reachable or source-verified on 2026-07-11. Foundational frameworks are lenses, not laws. Living platform and regulatory sources must be re-fetched for the exact task; record URL, scope, effective/update date, retrieval date, policy authority, machine action, and geo/platform mitigation.

### Design, motivation, systems, and experimentation

- [MDA: A Formal Approach to Game Design and Game Research](https://users.cs.northwestern.edu/~hunicke/MDA.pdf) — map intended experience, runtime dynamics, and mechanics; useful for iteration, not a formula for fun.
- [The Motivational Pull of Video Games](https://doi.org/10.1007/s11031-006-9051-8) — evidence for autonomy, competence, and relatedness as relevant motivational hypotheses.
- [GameFlow](https://doi.org/10.1145/1077246.1077253) — challenge, skill, control, goals, feedback, immersion, and social interaction; limited initial validation means use as a lens.
- [Player Experience Inventory](https://doi.org/10.1016/j.ijhcs.2019.102370) — validated player-experience measurement dimensions.
- [Simulating Mechanics to Study Emergence in Games](https://doi.org/10.1609/aiide.v7i3.12477) and [Integrating Emergence and Progression](https://doi.org/10.26503/dl.v2011i1.593) — model resource flow, feedback, emergence, and progression before full implementation.
- [Game Feel](https://doi.org/10.1201/9781482267334) and [Juice It or Lose It](https://www.gdcvault.com/play/1016487/Juice-It-or-Lose) — practitioner lenses for response and sensory reinforcement, not evidence that more effects always improve a game.
- [Creating Social Contagion Through Viral Product Design](https://doi.org/10.1287/mnsc.1110.1421) — experimental evidence that viral features can affect diffusion in context; validate transfer.
- [Game Analytics](https://doi.org/10.1007/978-1-4471-4769-5) and [Trustworthy Online Controlled Experiments](https://doi.org/10.1017/9781108653985) — telemetry, guardrails, validity, and causal experiment discipline.

### Platform, performance, accessibility, and localization routes

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — living authority for payments, random items, notifications, children, privacy, and UGC on Apple storefronts.
- [Google Play Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en), [Monetization and Ads policy](https://support.google.com/googleplay/android-developer/answer/9857753?hl=en), [Families Policies](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en), and [UGC policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) — living Google Play authority; resolve audience and territory.
- [Steamworks Microtransactions](https://partner.steamgames.com/doc/features/microtransactions), [implementation guide](https://partner.steamgames.com/doc/features/microtransactions/implementation), and [Steam Deck compatibility](https://partner.steamgames.com/doc/steamdeck/compat) — commerce, reconciliation/fraud, controller, readability, launcher, and performance routes for Steam releases.
- [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines) and [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/) — game-specific design and testing routes.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — applicable web and interface accessibility requirements; not a complete game-accessibility standard.
- [Android app startup](https://developer.android.com/topic/performance/vitals/launch-time), [game optimization](https://developer.android.com/games/optimize), [frame pacing](https://developer.android.com/games/sdk/frame-pacing), [adaptive performance](https://developer.android.com/games/optimize/adpf), and [notification permission](https://developer.android.com/develop/ui/compose/notifications/notification-permission) — measured startup, smooth rendering, sustained device adaptation, and contextual notification routes.
- [Apple launch-time guidance](https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time) and [notification permission guidance](https://developer.apple.com/documentation/usernotifications/asking-permission-to-use-notifications) — startup and permission routes for Apple platforms.
- [W3C Internationalization](https://www.w3.org/International/) and [Unicode CLDR](https://cldr.unicode.org/) — internationalization techniques and locale data.

### Consumer, child-safety, random-reward, and wellbeing routes

- [CPC Network Key Principles on In-game Virtual Currencies](https://commission.europa.eu/document/download/8af13e88-6540-436c-b137-9853e7fe866a_en?filename=Key%20principles%20on%20in-game%20virtual%20currencies.pdf) — EU consumer-authority route for price/value clarity, currency design, withdrawal/fair terms, parental controls, and vulnerability; re-check application and law.
- [ICO Children’s Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/) — UK child best interests, privacy defaults, minimization, and nudge risks.
- [US Children’s Online Privacy Protection Rule](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule) — current US federal rule text and dates; obtain legal interpretation for the product.
- [WHO: Gaming disorder](https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder) — explains harm and impaired control; supports rejecting addiction as a product objective.
- [ESRB random-item purchase label](https://www.esrb.org/blog/in-game-purchases-includes-random-items/) and [UK loot-box protection update](https://www.gov.uk/guidance/loot-boxes-in-video-games-update-on-improvements-to-industry-led-protections) — ratings and policy routes; ratings, platform policy, and law remain separate.
- [FTC Epic/Fortnite enforcement announcement](https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations) — enforcement case study for privacy, child communication defaults, and unwanted charges; not a universal legal summary.

### Authority record required at use

```text
surface: payment | gacha | ads | notification | child | privacy | UGC | chat | cross-play | ratings | other
territory, storefront, platform, and audience:
primary authority URL and section:
effective/update date and retrieval date:
material requirement or uncertainty:
policy action and agent authority:
test/evidence:
geo/platform disable or mitigation:
automated reevaluation trigger and expiry:
```

If a target territory or storefront lacks this record for a high-risk surface, the blueprint must mark release blocked rather than infer current authority from this reference.
