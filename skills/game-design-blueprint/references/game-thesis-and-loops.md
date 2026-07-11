# Game Thesis And Loops

## Contents

1. Success contract
2. Evidence and comparator research
3. Player promise, pillars, and anti-pillars
4. Experience-to-mechanics map
5. Nested loop architecture
6. Challenge, learning, failure, and recovery
7. First-time experience
8. Content, pacing, and distinctiveness
9. Review checklist

## 1. Success contract

A successful game creates the intended experience for a specific audience, earns voluntary repeat play or advocacy appropriate to its archetype, monetizes real value sustainably, runs well on its promised devices, protects player trust, and operates, scales, and recovers autonomously.

Define success as a constrained scorecard rather than one metric:

| Dimension | Design question | Candidate evidence | Failure signal |
| --- | --- | --- | --- |
| Player value | Does the intended audience understand and desire the experience? | naive playtests, repeat choice, qualitative reasons, mastery signals | confusion, indifference, coerced continuation |
| Distinctiveness | Can players explain why this game is worth choosing or discussing? | recall, comparison language, organic clips/stories, store-message comprehension | interchangeable pitch or copied feature set |
| Commercial viability | Does the business model convert perceived value into sustainable contribution? | payer conversion, net LTV, margin, payer retention, purchase reasons | refunds, regret, concentration risk, acquisition payback failure |
| Product quality | Is play responsive, stable, readable, accessible, and available on the target device? | startup, frame pacing, crash-free play, accessibility tests, device matrix | jank, heat, input lag, blocked players, lost progress |
| Trust and safety | Can players understand cost and state, take healthy breaks, control contact, and recover from harm? | sentiment, opt-outs, reports, support outcomes, spend controls | deception, pressure, abuse, unresolved reports, child-safety breach |
| Autonomous operability | Can the agent control plane sustain content, balance, support, moderation, experiments, scale, and incidents without a routine human gate? | verified throughput, coverage, error rate, capacity, rollback, recovery | manual queues, deferred automation, brittle scaling, unowned moderation |

`thesis-1` — Choose metric semantics by commercial archetype. A premium narrative game may optimize completion, satisfaction, reviews, sequels, and referrals; a live-service collector may depend on cohort retention and recurring spend. Do not force one KPI tree onto both.

`thesis-2` — Define baseline, cohort, market, platform, window, target, guardrails, confidence, and decision for every numeric goal. An external benchmark is context, not a guarantee.

`thesis-3` — Treat durable net value as the commercial outcome: gross revenue minus platform fees, acquisition, infrastructure/compute, rights, fraud, refunds, tax, and autonomous operations, constrained by trust and ruin floors. Measure it for automated pricing, exposure, and scale policy; do not use speculative pre-build ROI or conventional human labour as a construction veto.

## 2. Evidence and comparator research

Start with a source-bounded comparator set. Use current product builds, primary developer material, platform data, public filings where relevant, and measured play. Do not rely on memory or a feature-list article.

| Comparator role | Selection rule | Extract | Do not infer |
| --- | --- | --- | --- |
| Direct genre leader | Same primary fantasy and audience/job | core verbs, session arc, friction, differentiation, player language | that its systems caused revenue |
| Adjacent experience leader | Excels at one intended feeling | feedback timing, learning, pacing, expressive identity | that the mechanic transfers unchanged |
| Commercial leader | Similar business and content economics | offer surfaces, value framing, payer/non-payer experience | private conversion or LTV without evidence |
| Social/viral leader | Similar relationship or share context | recipient value, co-play structure, artifact, safety burden | that raw shares equal retained users |
| Technical/reach leader | Similar devices, inputs, locales, or accessibility needs | quality tiers, UI/input adaptation, settings, startup path | hidden engine architecture |

For each borrowed idea, write:

```text
Observed mechanism:
Source and date:
Player job served:
Dynamics it appears to create:
Player-attention, runtime, verification, rights, safety, and autonomous-operability implications:
Why it may transfer here:
What experiment could disprove transfer:
Capability plan: build-to-scale | reuse-scale-ready | floor-blocked
Automated exposure hypothesis:
```

`thesis-4` — Research for differentiation, not blind default exposure. Build requested reversible capabilities to scale, but let the current game's promise and constraints determine their configuration, progression gate, mode, and automated exposure policy.

## 3. Player promise, pillars, and anti-pillars

Write the promise in one sentence:

> For `<target player in context>`, this is a `<archetype>` where they `<distinctive verbs and fantasy>`, producing `<specific feelings or social meaning>` within `<session and platform constraints>`.

Then define three to five pillars. Each pillar needs observable consequences.

| Pillar | Player should say/do | Required dynamics | Candidate mechanics | Evidence |
| --- | --- | --- | --- | --- |
| Example: readable improvisation | “I saw the opening and made my own plan” | clear state, multiple viable actions, recoverable surprise | telegraphs, tool combinations, short undo window | plan explanation, varied successful strategies |

Anti-pillars state what the game refuses to become. Examples: no inventory administration during two-minute sessions; no social obligation that punishes missed days; no competitive power sold through uncapped randomness.

`thesis-5` — Pillars choose player-facing tradeoffs. If a phrase does not help configure or gate a capability, alter content, or decide a metric, it is a slogan rather than a pillar.

## 4. Experience-to-mechanics map

Design in both directions:

```text
player experience wanted
  -> observable decisions and relationships during play
  -> mechanics, content, controls, rules, feedback, and economy

implemented mechanic
  -> runtime interactions and dominant strategies
  -> intended and unintended player experience
```

Use this map:

| Intended experience | Observable player behaviour | Dynamic | Mechanic/content | Feedback | Risk/test |
| --- | --- | --- | --- | --- | --- |

`thesis-6` — Name experiences precisely: mastery, tension, discovery, fellowship, expression, power fantasy, curiosity, relief, awe, humour, or contemplation is more actionable than “fun.”

`thesis-7` — Treat autonomy, competence, and relatedness as useful hypotheses, not mandatory meters or a complete player taxonomy.

## 5. Nested loop architecture

Every loop must end in a meaningful updated state and a reason for the next choice.

| Loop | Typical shape | Design output | Common failure |
| --- | --- | --- | --- |
| Moment | perceive -> decide -> act -> immediate feedback -> update mental model | input-response and action-feedback matrix | delayed, ambiguous, or decorative response |
| Encounter | choose goal -> face challenge -> outcome -> recovery/reward -> next choice | encounter grammar and difficulty variables | one dominant solution or arbitrary loss |
| Session | enter with intent -> progress/variation -> climax -> closure -> future hook | session beat map and exit promise | chores before value or no clean stopping point |
| Meta | invest/unlock/express -> gain possibility -> face changed challenge -> choose next goal | progression graph and content unlock logic | numbers grow while play stays identical |
| Social/live, if selected | relationship/event -> coordinated or expressive action -> persistent consequence | relationship loop and operating cadence | obligation, spam, empty guilds, moderation debt |

For every loop, specify entry trigger, player question, choices, state, feedback, reward meaning, failure/recovery, variation, exit, and dependency on another loop.

`loop-1` — The moment and encounter loops must remain understandable and satisfying before extrinsic rewards carry the experience.

`loop-2` — Give players stopping points. Endless pressure can raise session length while lowering trust, return quality, and long-term value.

`loop-3` — Progression should create new decisions, expression, access, mastery, or story—not merely larger numbers against proportionally larger enemies.

## 6. Challenge, learning, failure, and recovery

Model challenge as demand placed on a known skill or decision under readable conditions.

### Learning sequence

```text
introduce one idea -> allow safe practice -> test recognition -> combine with known ideas
-> add pressure or variation -> invite mastery/expression -> revisit in a new context
```

Specify:

- assumed motor, cognitive, strategic, social, language, and genre literacy;
- information available before commitment;
- timing, precision, planning, memory, resource, and coordination demands;
- accessibility or assist options that preserve the intended decision;
- mastery signals and advanced depth;
- when the game adapts difficulty, offers help, or lets the player choose.

### Failure taxonomy

| Failure class | Player interpretation to seek | Recovery | Avoid |
| --- | --- | --- | --- |
| Knowledge gap | “I learned what mattered” | clearer cue, safe retry, optional explanation | hidden rule or unexplained counter |
| Execution gap | “I can improve that action” | fast retry, practice, input options | long reload or lost paid resource |
| Strategy gap | “I chose poorly and see alternatives” | readable post-state, loadout/plan change | one secret viable build |
| Variance | “I accepted a bounded risk” | known distribution, mitigation, bad-luck protection where needed | disguised inevitability or paid escape |
| Social coordination | “Our roles/timing can improve” | rejoin, communication tools, role clarity | public blame or unrecoverable mismatch |

`challenge-1` — Challenge requires agency, legibility, and a plausible improvement path. Grind, obscurity, inflated health, and paid relief are not substitutes.

`challenge-2` — Measure comprehension, perceived fairness, confidence, frustration cause, strategy diversity, and mastery—not win rate alone.

`challenge-3` — Assistance can change timing, information, input burden, damage, checkpoints, or complexity. State which decision or feeling must remain intact.

## 7. First-time experience

Storyboard the activation chain:

```text
launch
-> first rendered interactive state
-> first meaningful input
-> first understood response
-> first meaningful choice
-> first competence moment
-> first emotional or social payoff
-> first self-chosen goal
-> clean stop or next-session promise
```

For every beat record target context, dependency, maximum tolerated friction hypothesis, observable success, confusion risk, recovery, and measurement event.

`ftue-1` — Ask for account, download, tracking, contacts, notification, microphone, camera, or purchase permission only after its value is understandable and when current platform rules allow. Do not stack permission prompts at launch.

`ftue-2` — Prefer playable guest state, background/lazy loading, resumable progress, contextual teaching, skip/replay, and safe experimentation where the game permits them.

`ftue-3` — Test with genuinely naive players. Designer narration invalidates evidence about comprehension.

`ftue-4` — Track time to first input, understood feedback, choice, competence, and payoff separately. Fast rendering does not prove fast time-to-fun.

## 8. Content, pacing, and distinctiveness

Define a content grammar rather than a list of levels:

- atomic mechanics and verbs;
- encounter ingredients and combination rules;
- intensity, novelty, mastery, narrative, and recovery beats;
- authored versus systemic variation;
- reuse that changes decisions rather than only presentation;
- agent-generation compute, verification/QA surface, rights/provenance, localization coverage, and content burn;
- scale-ready autonomous cadence, tooling, policy, rollback, and recovery needed from launch.

Use a pacing map across the first five minutes, first session, first day, early mastery, mid-game, endgame, and returning-player path. Times are project-specific; the sequence must show tension, relief, novelty, choice, goal visibility, and clean exits.

`content-1` — A live-service promise is also an autonomous content and operations contract. Build generation, provenance, localization, testing, moderation, capacity, rollback, and recovery to the declared scale now; let the policy engine automatically adjust exposed cadence when quality, safety, capacity, or freshness gates change.

`content-2` — “Vibe” is coherent authorship: fantasy, colour, shape, motion, sound, music, writing, reward ceremony, community language, and shareable moments reinforce the same promise.

`content-3` — Topic-worthiness comes from distinctive player stories, skill, expression, surprise, relationships, creation, or cultural relevance. A referral reward alone does not make a game discussable.

## 9. Review checklist

- The target player and play context are narrow enough to make tradeoffs.
- The promise, pillars, and anti-pillars configure and gate plausible capabilities without using them to justify unbuilt scale or automation debt.
- Comparator evidence separates observation from causation and transfer hypothesis.
- Mechanics, dynamics, and intended experience map in both directions.
- Moment, encounter, session, meta, and selected social/live loops have clear states and dependencies.
- Challenge is readable, fair, recoverable, accessible, and deep enough for mastery.
- FTUE reaches meaningful play before unnecessary account, permission, download, or monetization friction.
- Content variety has a production and localization model.
- The game has a coherent signature worth remembering or sharing.
- Every canonical capability has a contextual numeric scale/failure envelope and exact-candidate proof plan; “scale-ready” is not architecture prose.
- The smallest proof tests the highest-risk part of the thesis while the agent build graph still converges on the complete scale-ready target.
