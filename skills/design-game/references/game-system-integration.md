# Game Capability Integration

## Contents

1. Capability sweep
2. Three independent states
3. Capability record
4. Cross-system interaction map
5. Commercial hierarchy
6. Retention and durable ownership
7. Automated exposure
8. Specialist handoffs
9. Integration checklist

## 1. Capability sweep

Evaluate every row and every user-requested addition. A sweep prevents omission; it does not force a genre-incoherent feature into the game.

| Domain | Questions | Detailed owner |
| --- | --- | --- |
| Core play/content | Which verbs, encounters, challenge, content grammar and mastery create the promise? | Game Design |
| Progression/quests | Which layers create choice, competence, expression and reachable goals? | `game-progression-and-quests.md` |
| Economy/rewards | Which values flow, accumulate, convert, expire, refund and remain fair? | `game-economy-review` |
| IAP/IAA/gacha | What value exchange fits the audience and platform, and what stays off? | Economy + Ad Monetization + Payment |
| Return loops | What real value changes by session/day/week/season/comeback? | Game Design + Daily Reward/Streak |
| Notifications | Which user-requested or stateful value deserves interruption? | Notification Strategy |
| Friends/co-op/social | Which relationships, shared decisions, governance and safety create value? | `game-social-systems.md` |
| Referral/cross-promotion | How does recipient-valued discovery qualify and attribute? | Referral + Promotion |
| UGC/creators/community | What can players make, discover, share, own and moderate safely? | Social + Live Operations |
| Live operations | How do seasons, events, passes, content and state end safely? | `game-live-operations.md` |
| Platform/reach | How do input, lifecycle, services, commerce, performance and presentation adapt? | Experience Quality + Distribution |
| Accessibility/localization | Can supported players understand, control, purchase, socialize and recover? | Experience Quality |
| Analytics/feedback/support | What decisions need evidence and how do players recover or influence the product? | Analytics + Review/Feedback + Support |

### Disposition

```text
integrate-now
reuse-scale-ready
contract-ready
not-applicable
floor-blocked
```

- `integrate-now` is mandatory for requested and player-promise-essential capabilities. Complete it now; no future hardening or manual phase.
- `reuse-scale-ready` consumes a complete shared primitive with a game-specific contract and proof.
- `contract-ready` preserves an extension boundary but adds no runtime, SDK, permission, asset, telemetry, job, memory, network, or attack-surface cost.
- `not-applicable` needs a semantic, player-value, business-model, platform, attention, safety, or physical reason. Human effort and speculative ROI are invalid.
- `floor-blocked` cites the exact authority or harm boundary and still designs the safe alternative.

## 2. Three independent states

Never compress these into one include/defer/exclude label:

```text
Design/build: absent | contract-ready | implementing | built | integrated | retired
Evidence: hypothesis | design-tested | implementation-verified | live-observed
Exposure: off | internal | progression-gated | population-gated | test-cohort | opt-in | default-on | degraded
```

A system can be built and integrated while exposure remains off. A design test is not implementation proof; implementation proof is not evidence of player value; live exposure is not proof of causality.

## 3. Capability record

Keep the whole-game record concise and send detailed tuning to the specialist:

```text
Capability and draft ID:
Player value, pillar and verb:
Disposition and reason:
Canonical player/state semantics:
Dependencies and collisions:
Complete selected target; explicit no-later debt:
Verified delivery slices:
Exposure eligibility and safe missing-signal action:
Experience, attention, platform, device and accessibility constraints:
Trust, safety, age, consent, fairness and rights floors:
Success measure, countermetrics and failure signal:
Disable/degrade/recovery and durable-state treatment:
Specialist owner, required input/output and acceptance questions:
```

Use draft IDs during design. A downstream deterministic process may seal serialized artifacts. Never fabricate digests or evidence.

## 4. Cross-system interaction map

Review at least these dangerous edges:

| Edge | Required question | Typical failure |
| --- | --- | --- |
| challenge ↔ progression | Does growth create new decisions while challenge remains legible? | stat inflation replaces mastery |
| progression ↔ economy | Can every required goal be reached through understandable sources/sinks? | hidden wall or dead currency |
| economy ↔ IAP/gacha | Is paid value clear, bounded and compatible with baseline access? | pay-to-win, regret, concentration |
| IAA ↔ IAP | Does ad exposure add incremental value without damaging purchase trust? | payer surprise or cannibalization |
| quests ↔ core play | Do quests teach, vary or deepen real play? | checklist wrapper replaces the game |
| streak ↔ health/economy | Can ordinary absence recover without inflation or anxiety? | hostage continuity or dominant faucet |
| notifications ↔ return value | Is there truthful time-sensitive value and a stop rule? | spam compensates for weak retention |
| social ↔ progression | Can mixed-progression friends contribute meaningfully? | carrying, exclusion or forced grind |
| sharing ↔ privacy/safety | Does the recipient receive value with user control? | spam, covert contacts or harassment |
| live event ↔ durable state | Is expiry, conversion, compensation and late entry defined? | stranded purchases/rewards |
| refund ↔ economy/entitlement | Is only affected value reconciled with appeal and support evidence? | surprise debt or unrelated ban |
| low-end/accessibility ↔ effects | Are critical cues preserved when quality/effects change? | hidden threats or exclusion |

Test pairwise edges for every selected high-risk capability and add higher-order tests where three systems combine, such as gacha + leaderboard + minors or referral + reward economy + multi-accounting.

## 5. Commercial hierarchy

Choose the commercial archetype explicitly: premium, premium+DLC, IAP-led free-to-play, subscription, ad-supported, creator/marketplace, or hybrid.

When IAP-led revenue is a hard constraint:

1. make the core free path desirable and viable;
2. sell understandable value: expression, content, breadth, convenience, service, or bounded collection surprise;
3. define payer and non-payer promises before offer placement;
4. use IAA as a measured supplement with payer/ad-free suppression and IAP-cannibalization analysis;
5. measure net retained contribution after fees, refunds, fraud, support, content, infrastructure, churn and trust effects;
6. prevent revenue concentration, paid-only catch-up, purchased dominance and deliberate frustration from becoming hidden dependencies.

Gacha is not a default requirement. If selected, the economy specialist owns probabilities, cost distributions, pity, duplicates, guarantees, deterministic alternatives, spend/age/territory controls, ledgers, refunds and simulations. Ads are not a default requirement; the ad specialist owns placements, consent, caps, mediation, grants, suppression and shutdown.

## 6. Retention and durable ownership

Design reasons to return before notifications:

| Horizon | Valuable return reason | Avoid |
| --- | --- | --- |
| Session | curiosity, mastery, variation, choice and closure | chores before value |
| Next session/day | self-chosen goal, new possibility or friend response | punishment for absence |
| Week/event | novelty, mastery and shared moments | mandatory checklist/FOMO |
| Season/long term | identity, collection, expression, story and community | destructive durable reset |
| Comeback | reorientation, repaired state and genuinely new value | teaching players to churn |

Translate “sunk cost” into earned ownership and belonging:

```text
identity + mastery + creation + collection + history + relationships
-> meaningful next-session value
```

Use optional avatar/character expression, builds, collections, creations, housing, records, guild contribution, mentorship and relationship history where they serve the fantasy. Offer fast defaults and skip paths; do not make a long setup ritual a compulsory toll before play unless creation is the core fantasy.

Never threaten deletion after inactivity, erase history to sell restoration, make a streak the authority for unrelated progress, or force payment to preserve player-created work.

### Updates, cross-promotion, reviews and feedback

- Reward verified activation or meaningful use of real update value, not installation, permission, review/rating, ad click, spend, forced share, or contact upload.
- Cross-promotion must identify the other product, fit the current context, preserve dismissal, minimize consented attribution data, and measure retained target-product value and source-product cannibalization.
- Public review solicitation and universal private feedback remain independent. Never sentiment-gate, star-steer, reward ratings, or import one platform's review behavior into another.
- Feed feedback, reviews, behavior, quality, accessibility, refunds and support into source-preserving product learning without treating loudness, payer value, or star count as sole priority.

## 7. Automated exposure

Define the player-facing exposure rules:

```text
eligibility: progression, mastery, account state, mode, population/liquidity,
             platform/version/device/network, locale/territory/age/consent
guardrails: service quality, economy, content readiness, moderation/support and safety
states: off -> internal/gated -> test/opt-in -> default-on | degraded/off
stability: sticky assignment, safe missing signal, minimum dwell/cooldown, maximum step
recovery: preserve purchases/earned state, drain or reconcile in-flight actions,
          compensate or forward-fix irreversible commitments
```

Game gates may use progression or population. Individual readiness gates reveal complexity; liquidity gates open matchmaking, guild, market or open-social surfaces only when a coherent experience exists. Device and service signals select quality or degraded behavior. Hard legal, safety, age, consent and platform floors are non-overridable.

Automation must be able to close safely, not only open. Paid, stranger-social, UGC, privacy and consent expansion fail closed. Purchased entitlements, earned progress and refund state fail preserving. Gameplay may use a tested degraded or last-known-good mode.

## 8. Specialist handoffs

For each detailed system emit:

```text
Draft artifact ID:
Owner skill:
Whole-game facts supplied:
Decision or contract required:
Acceptance questions:
Player-state and recovery constraints:
Current authority to retrieve:
Unresolved assumptions:
```

Do not duplicate price tables, gacha math, provider facts, notification caps, referral attribution, promotion eligibility, review platform policy, refund consequences, analytics schemas, or store submission rules in the blueprint.

## 9. Integration checklist

- Every requested and promise-essential capability is fully selected, not postponed for human scarcity.
- Every swept capability has a defensible disposition; no feature exists merely because another successful game has it.
- Core play remains satisfying without extrinsic reward pressure.
- Progression, economy, monetization, retention, social and live operations have explicit interaction tests.
- IAP/IAA/gacha choices preserve baseline value, fairness, trust and age/territory/platform authority.
- Return systems create real value and healthy stopping points.
- Social systems create reciprocal and recipient value with safety and low-population behavior.
- Updates, cross-promotion, reviews and feedback remain truthful and causally measurable.
- Exposure gates preserve committed player state and define safe close/degrade behavior.
- Detailed facts have one specialist owner and no fabricated digest or proof.
