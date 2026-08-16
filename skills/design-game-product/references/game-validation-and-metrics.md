# Game Validation And Metrics

## Contents

1. Sources and assumptions
2. Metric tree
3. Telemetry contract
4. Playtesting and experiments
5. Validation methods and automated exposure
6. Bounded risk-reward decisions
7. Blueprint outline
8. Blueprint quality
9. Research and authority routes

## 1. Sources and assumptions

State supplied direction, observed results, working assumptions, hypotheses,
and product decisions in ordinary language. Include source and date for current
facts, the expected observation for a hypothesis, and the product reason for a
decision.

- Attribute causal effects through an identified experiment or analysis rather than feature presence in a successful game.
- Record metric definition, cohort, platform, archetype, acquisition mix, market, stage, window, sample, source date and uncertainty before using a benchmark.
- Qualitative observation explains mechanisms; quantitative evidence estimates prevalence and causal effect. Neither replaces the other.
- Retrieve current platform, law, ratings, ads, child-safety, privacy, payments, random-reward, UGC and cross-network authority before release claims.
- Unknown demand does not defer requested or promise-essential construction. It limits exposure and certainty. It also does not force genre-incoherent optional systems into the game.
- A prototype proves only its scoped claim. A green simulation does not prove human fun, perceived fairness, cultural meaning, belonging or willingness to pay.

## 2. Metric tree

Choose a primary product outcome consistent with the success contract, then attach mechanism measures and guardrails.

| Branch | Candidate measures | Necessary interpretation |
| --- | --- | --- |
| Acquisition/message | qualified impression, store/trailer comprehension, install/wishlist, creative-product match | cheap acquisition with poor retention may be mismatch |
| Startup/activation | first frame/input/play/fun, tutorial/account/permission funnel, first self-chosen goal | define each milestone behaviorally |
| Core experience | action success, strategy variety, comprehension, fairness, retry reason, mastery | session time needs behavioral or qualitative context to distinguish delight from friction |
| Engagement | active days, meaningful actions, content breadth/depth, voluntary stop/return | more minutes can increase fatigue or harm |
| Retention | cohort return, rolling retention, resurrection, churn/return reason | segment by source, version, market, platform, payer/social/device state |
| Progression/content | goal completion, choice/build diversity, velocity, content burn, stuck state, catch-up | completion can mean ease, grind or good pacing |
| Commercial | offer intent/purchase/fulfillment, payer conversion/retention, net LTV, IAP/IAA mix | include fees, refunds, fraud, support, content and cannibalization |
| Economy/gacha | source/sink, inflation, balances, odds/pity/duplicates, spend distribution | inspect upper-tail cost, fairness, regret and refunds |
| Social/viral | co-play, reciprocity, invite/share funnel, recipient activation/retention | count retained recipient value, not sends |
| Trust/safety | opt-out, refund, complaint, report/block/mute, moderation/appeal outcome | trust and safety floors prevail over revenue lift |
| Accessibility/reach | setup/task completion by mode/device/locale and exclusion reason | option presence is not successful access |
| Technical | startup stages, frame pacing, crash/hang/OOM, save/reconnect, thermal/battery/network | use sustained real-device distributions |
| Live operations | content value/cadence, defect/rollback, localization/moderation/support, compensation | event activity alone may be novelty or pressure |

For every decision metric define:

```text
name and semantic definition
decision/exposure transition informed
population/cohort and exclusions
event/query source and owner
baseline and external context
decision threshold and uncertainty
window, maturity, sample and uncertainty
guardrails and countermetrics
owner action for each observed outcome and for missing data
reevaluation trigger and expiry
```

Inspect distributions and cohorts. Means hide spend concentration, rare startup failure, low-end exclusion and small harmed groups. Measure reasons for return, purchase, share, quit, refund and report instead of inferring motivation from events alone.

## 3. Telemetry contract

Design events from decisions, not “track everything.”

```text
event_name/version
semantic trigger and authoritative producer
required properties/enumerations/units
session, content, economy and experiment versions
dedupe, late/offline and out-of-order behavior
consent, age, purpose, access, retention, deletion and residency
quality checks and decision consumers
```

Candidate families:

- startup, FTUE, first value and self-chosen goal;
- action, encounter, failure, retry, recovery and mastery;
- quest, progression, inventory, currency, reward and economy mutation;
- offer, purchase, fulfillment, restore, refund and support correction;
- ad eligibility/request/impression/completion/reward/suppression/complaint;
- notification eligibility/send/expiry/open/suppression/opt-out;
- party, match, invite, share, recipient activation, report/block/moderation/appeal;
- performance, crash, memory, thermal, network, save and conflict;
- event eligibility, participation, claims, compensation and end state.

Version rules/content/economy/offers/experiments needed to compare outcomes. Select a path free of raw personal data and open text by default. Validate missing, duplicate, reordered, late, impossible and schema-drifted events before commercial or safety use.

## 4. Playtesting and experiments

### Playtest protocol

```text
hypothesis and stage
target participant and exclusion rationale
build/device/input/locale/accessibility configuration
task or natural-play prompt
what the study agent may say
observable behavior and timestamps
post-play questions separated from observation
severity, uncertainty, decision and next test
```

Use naive players for comprehension, repeated sessions for progression/return hypotheses, matched skill groups for challenge, representative devices for performance, disabled-player research for accessibility, language/cultural review for locales, and real relationship contexts for social play.

Use neutral facilitation unless coaching is the tested variable. Ask players to describe goals, causality, choices, cost, and feelings in their own words. Preserve failure examples and minority experiences; severe safety or access failures retain priority.

### Experiment design

```text
id, draft candidate, start/review/expiry
decision and falsifiable hypothesis
eligible population and randomization unit
control/variants and stable assignment
primary metric, guardrails and stop rule
sample/duration rationale, novelty and seasonality risk
instrumentation and sample-ratio checks
interaction with other events/experiments
exposure, recovery and player remediation
analysis, segments, uncertainty and result
```

Run experiments with visible prices and odds, full consent, refund and report controls, age-appropriate targeting, and bounded safety exposure. Stop when trust, safety, fairness, accessibility, or reliability materially worsens. Use holdouts for persistent notifications, events, offers, and recommendations where feasible.

## 5. Validation methods and automated exposure

Build every selected/requested capability to its declared complete target. Small slices are delivery and learning units, not permission for a later rewrite.

Choose the validation method from the claim:

- Use rules, arithmetic, property checks, and simulation for system dynamics.
- Use a playable core and representative players for comprehension, control,
  mastery, enjoyment, trust, cultural meaning, and willingness to pay.
- Use integrated tests and representative devices for state, recovery,
  accessibility, startup, frame time, memory, network, and platform behavior.
- Use a bounded real cohort for retention, economy, commercial, service,
  safety, and support effects.
- Use released-candidate readback for live claims.

For each claim, state the hypothesis, sample or fixture, observed result,
decision, owner action, and safe behavior for missing data. The core loop is the
first playable spine, and selected supporting capabilities keep their complete
target.

Exposure design:

```text
eligibility: progression/mastery/account, population/liquidity,
             platform/version/device/network, locale/territory/age/consent
guardrails: service quality, economy, content, moderation/support and safety
stability: sticky cohort, minimum dwell/cooldown, maximum step, safe missing signal
actions: open, promote, hold, suppress, degrade, close and recover
```

Automation must preserve purchases, earned progress, committed odds, party/match state, reward claims and cross-device consistency. Use compensation or forward-fix when rollback is unavailable for committed state.

## 6. Bounded risk-reward decisions

Risk and reward are proportional only inside non-negotiable floors.

Hard stop:

- unlawful or criminal behavior;
- child-safety or severe physical/psychological harm;
- deception, hidden material cost/odds, consent bypass or unauthorized data;
- explicit platform/store prohibition with material account/customer impact;
- irreversible/existential loss outside the declared ruin budget.

For genuinely ambiguous but admissible options:

```text
expected_net_value
= P(success) * incremental_retained_player_and_commercial_value
- sum(P(loss_i) * direct_and_secondary_loss_i)
- trust/reputation cost
- recovery and opportunity cost

maximum_loss <= ruin_budget
CVaR_at_selected_confidence <= risk_budget
exposure <= blast_radius_cap
detect_time + contain_time <= recovery_window
```

Record probability ranges, evidence and sensitivity. Include platform action, refunds/remedy, support, reputation, reversibility, detection lag and opportunity cost. Unknown material facts widen the risk range; they are not zero.

A bounded test requires truthful presentation, intact consent/remedies, capped cohort/spend, observable stop signals, tested recovery, and policy eligibility. Law, platform-account safety, child safety, privacy, and customer trust remain hard floors at every company size.

## 7. Blueprint outline

```text
# Game Design Blueprint: <title>

## Source basis
Supplied direction / current sources and dates / assumptions / hypotheses / decisions / open questions

## Executive thesis
Player/context / fantasy/archetype / platform/device/age/markets / promise / differentiation / non-goals / success

## Experience and loops
Design pillars and limits / verbs / mechanics-dynamics-experience / moment/encounter/session/meta/social loops

## Challenge, learning, content and FTUE
Demand curve / teach-practice-test-remix / failure/recovery/assists / mastery / content grammar / first-value beats

## Progression and quests
Layers/topology / graph / curves / quest contract / catch-up / content burn / economy handoff

## Selected capabilities
Player value / reason / target / dependencies / availability / recovery / measures / specialist owner

## Commercial, retention and social integration
Economy / IAP-IAA-gacha / return loops / notifications / ownership / refunds / update-cross-promo / review-feedback / friends-co-op-sharing-UGC

## Evergreen fairness, when applicable
State classes / world topology / late-entry reachability / power/economy bounds / seasons / population fallback

## Experience quality and reach
Feedback/audio/effects / platform-input / startup-performance / accessibility / localization / network-save-offline

## Trust and operations
Age/privacy/spend/randomness / moderation/report/block/appeal / support / live events and valid ending state / policy-owner routes

## Validation and risk
Metrics/events / simulations/playtests/experiments / observed results and actions / bounded risk / open questions / handoffs
```

Use draft revisions during design. Deterministic tooling may later supply actual digests, source identities, benchmarks, and run results for serialized artifacts.

## 8. Blueprint acceptance

A blueprint is ready for forward testing when it coherently connects:

- the target players, promise, and success conditions;
- differentiated loops, challenge, learning, onboarding, and game feel;
- progression, quests, content, economy, commerce, and player trust;
- retention, social value, live operations, and late-entry fairness where relevant;
- platform behavior, performance, accessibility, localization, safety, and support;
- telemetry, playtests, experiments, recovery, and specialist ownership.

Open questions stay explicit and become the first forward tests.

## 9. Research and authority routes

Retrieve current facts at use. These are mechanism and authority routes, not universal solutions or compliance verdicts.

### Design and evidence

- [MDA](https://users.cs.northwestern.edu/~hunicke/MDA.pdf) — mechanics, dynamics and intended aesthetics.
- [The Motivational Pull of Video Games](https://doi.org/10.1007/s11031-006-9051-8) — autonomy, competence and relatedness as hypotheses.
- [GameFlow](https://doi.org/10.1145/1077246.1077253) and [Player Experience Inventory](https://doi.org/10.1016/j.ijhcs.2019.102370) — experience lenses and measurement.
- [Game Feel](https://doi.org/10.1201/9781482267334) and [Juice It or Lose It](https://www.gdcvault.com/play/1016487/Juice-It-or-Lose) — feedback craft; more effects are not automatically better.
- [Creating Social Contagion Through Viral Product Design](https://doi.org/10.1287/mnsc.1110.1421) — contextual diffusion evidence.
- [Trustworthy Online Controlled Experiments](https://doi.org/10.1017/9781108653985) — causal experiment and guardrail discipline.

### Platform and reach

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), [Google Play policy](https://support.google.com/googleplay/android-developer/), and [Steamworks](https://partner.steamgames.com/doc/) — retrieve exact current commerce, ads, random reward, UGC, review and platform requirements.
- [Xbox Accessibility Guidelines](https://learn.microsoft.com/en-us/gaming/accessibility/guidelines), [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/), and [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for applicable web/UI surfaces.
- [Android game optimization](https://developer.android.com/games/optimize), [Apple launch-time guidance](https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time), [W3C Internationalization](https://www.w3.org/International/), and [Unicode CLDR](https://cldr.unicode.org/).

### Consumer, child and randomized reward

- [EU CPC in-game virtual-currency principles](https://commission.europa.eu/document/download/8af13e88-6540-436c-b137-9853e7fe866a_en?filename=Key%20principles%20on%20in-game%20virtual%20currencies.pdf).
- [ICO Children’s Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/) and current territory-specific child/privacy law.
- [WHO gaming-disorder explanation](https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder) and [FTC Epic/Fortnite enforcement](https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations) as harm/enforcement context, not universal law.

Authority record:

```text
surface and behavior
territory/storefront/platform/audience
primary authority URL/section
effective/update/retrieval date
requirement or uncertainty
design/exposure action and test
disable/mitigation and reevaluation trigger
```
