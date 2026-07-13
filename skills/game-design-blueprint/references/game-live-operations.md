# Game Live Operations

## Contents

1. Live-operations promise
2. Content and cadence portfolio
3. Event and season contract
4. Autonomous content lifecycle
5. Economy, progression, and player state
6. Exposure, incidents, and compensation
7. Learning and longevity
8. Live-operations output

## 1. Live-operations promise

Live operations is a continuing player-value and content system, not a calendar of offers. Define what changes, why it remains true to the player promise, and what stable baseline remains understandable when no event is active.

The live promise may provide:

- fresh mastery, encounters, stories or world states;
- renewed fair competition;
- social moments and shared goals;
- collection, expression and creator opportunities;
- meaningful return paths for new, active and returning players;
- improvements and repaired pain points.

Revenue is an outcome of valuable cadence. Do not let overlapping promotions replace content or make the base game unreadable.

## 2. Content and cadence portfolio

Inventory each live surface:

| Surface | Player job | Required end state |
| --- | --- | --- |
| Daily/weekly objectives | varied short return path | choice, cap, reset and incident handling |
| Live event | novelty/shared moment | expiry, claims, conversion and archive |
| Season | renewed goals/competition/story | durable versus seasonal state rollover |
| Pass | transparent recurring value path | reachability, purchase timing, catch-up and post-season state |
| Content drop | new play/story/system | compatibility, localization, support and preservation |
| World change | consequence and shared history | migration, recap and late-entry access |
| Challenge/ladder | mastery and status | seeding, normalization, anti-cheat and history |
| Community/creator event | expression and belonging | moderation, rights, attribution and fallback |
| Offer/cross-promotion | relevant value exchange | separate campaign contract and shutdown |

Build a cadence map across first launch, ordinary weeks, events, seasons, updates and comeback periods. Budget player attention, content novelty, economy sources/sinks, localization, moderation, support, downloads, startup, device performance and experimentation collisions.

Preserve quiet baselines. Constant overlapping events can raise activity while destroying comprehension, experiment validity and trust.

## 3. Event and season contract

```text
event_id/version and draft artifact ID
player value, pillar and audience
eligibility: progression, mode, platform/version, locale/territory/age
start/end/timezone, recurrence and late-entry/catch-up
content/assets/config dependencies and compatibility
objectives, difficulty, accessibility and social behavior
reward/economy budget, caps, sources/sinks and duplicates
IAP/IAA/pass/promotion interactions
durable, seasonal and ephemeral state
unclaimed rewards, temporary inventory, leaderboard and guild state
post-event conversion, archive/return path and content sunset
support, moderation, fraud/anti-cheat and appeals
success metric, countermetrics, holdout and failure signal
pause, extend, degrade, end, compensate and recover behavior
```

State model:

```text
draft -> validated -> scheduled -> previewable -> active -> ending -> reconciled -> archived
validated/scheduled -> incompatible_or_authority_stale -> held
active -> incident -> paused | degraded | extended | ended_early
ending -> claims_open -> claims_closed -> converted/compensated -> reconciled
```

Define all ending transitions before activation. Never leave temporary currency, purchases, quests, unclaimed rewards, rankings, guild assets or player creations without a declared state.

## 4. Autonomous content lifecycle

Build the complete content operating capability for every selected cadence:

```text
brief from player promise and live state
-> candidate generation or authoring
-> provenance/rights and source validation
-> semantic, solvability, balance and abuse checks
-> accessibility, localization and cultural review
-> performance/download/device checks
-> moderation and age/territory checks
-> representative simulation/playtest
-> bounded exposure
-> live quality/readback
-> promote, revise, suppress or retire
```

Agent-generated content needs constrained grammars, source/provenance records, novelty/repetition checks, deterministic reward validation, unsafe-content rejection, locale/font/input coverage, device budgets and rollback. A generation model cannot approve its own candidate or rewrite the gates judging it.

Define content throughput as a capability hypothesis: candidate volume, validation capacity, rejection/repair rate, locale coverage, download size, support/moderation load and sustainable exposed cadence. More generated content is not more value.

## 5. Economy, progression, and player state

For every event/season simulate:

- new, active, returning, baseline/non-payer, payer and high-spend cohorts;
- late start, missed days, timezone, outage and low-population paths;
- reward completion ranges and pass reachability;
- inflation, stockpiles, sink demand and post-event conversion;
- duplicate/owned items, refunds, chargebacks and support corrections;
- leaderboard/guild/market manipulation and multi-account abuse;
- content prerequisite and catch-up load.

Do not tune the base game into frustration to make an event, pass or offer attractive. Preserve essential acquisition paths after limited content. Paid purchases and durable earned value survive ordinary rollover; renewable competitive state may reset only with disclosed seeding, history and rewards.

Pass rules:

- show duration, price, contents, effort and expiry before purchase;
- calculate baseline and realistic completion, late-purchase and catch-up paths;
- avoid impossible end pressure, paid-only repair and reward cliffs that erase value;
- define premium/free track overlap, duplicate ownership, refund and post-season claims;
- never sell a pass whose continuing content/operations capacity is unproven.

## 6. Exposure, incidents, and compensation

Use versioned player-facing predicates:

```text
content/config compatible
and eligibility/current authority passes
and economy/reward simulation passes
and localization/accessibility/performance coverage passes
and moderation/support/service capacity passes
-> bounded activation
```

Define safe missing-signal behavior, maximum exposure step, cohort stickiness, dwell/cooldown and event interaction exclusions. Automation may pause, extend, reduce cadence, disable a reward/offer, rotate a mode, degrade nonessential effects or end early within predeclared player-state rules.

Incident plan:

```text
detect affected event/version/cohort/state
-> stop new risky commitments
-> preserve or drain in-flight play/purchases/claims
-> reconcile authoritative rewards and progression
-> choose resume, extend, degrade, end or forward-fix
-> grant idempotent proportionate compensation where warranted
-> communicate truthful state and support route
-> verify final state and archive learning
```

Compensation is not generic currency spray. Define eligibility, harm, amount/type, economy budget, duplicate prevention, claim/auto-grant, expiry, offline behavior, support correction and abuse controls. Widespread incidents should not require one-by-one support requests.

## 7. Learning and longevity

Measure together:

- unique content/encounter breadth and mastery;
- participation, completion, late-entry and return reasons;
- session quality, healthy stops, fatigue and missed-event sentiment;
- progression and economy impact;
- IAP/IAA/pass incremental retained contribution and cannibalization;
- social reciprocity, matchmaking and moderation outcomes;
- content defect/rejection/rollback and repeated-template rate;
- localization/accessibility/device coverage;
- support load, compensation, refund and complaint rate;
- baseline/holdout retention and post-event displacement.

Do not infer lasting retention from event-period activity. Preserve holdouts or quiet windows where feasible and distinguish novelty, content value, promotion pressure and acquisition mix.

Evergreen rules:

- archive, recap, rotate or provide alternative access to essential story/mechanics;
- keep old content useful through scaling, mentorship, collections or systemic remix;
- avoid years of mandatory obsolete prerequisites before current social play;
- preserve season history and veteran identity while keeping late-entry viable;
- retire content with purchase, rights, support, localization and shutdown treatment.

## 8. Live-operations output

Return:

1. live promise, stable baseline and cadence/attention map;
2. surface portfolio and event/season/pass contracts;
3. autonomous content generation/validation/localization/moderation lifecycle;
4. progression/economy/purchase/refund simulations and state rollover;
5. exposure, interaction, pause/extend/end and low-population policies;
6. incident, reconciliation, compensation, support and communication plan;
7. telemetry, holdouts, countermetrics, learning and evergreen archive/retirement;
8. campaign, economy, social, analytics, distribution and support handoffs.

Complete only when every live surface provides real player value, every ending state is valid, generated content is independently constrained and verified, purchases/earned state survive incidents and rollover, cadence fits attention and operational capacity, and live learning can distinguish durable value from novelty or pressure.
