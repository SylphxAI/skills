# Search and Discovery Quality Systems

## Contents

- [Current-authority protocol](#current-authority-protocol)
- [Discovery layer contract](#discovery-layer-contract)
- [Intent and slice system](#intent-and-slice-system)
- [Rule IDs](#rule-ids)
- [Judgment and offline evidence](#judgment-and-offline-evidence)
- [Online outcomes and bias](#online-outcomes-and-bias)
- [Result and recovery states](#result-and-recovery-states)
- [Cold start, fairness, and incentives](#cold-start-fairness-and-incentives)
- [Diagnostics contract](#diagnostics-contract)
- [Agent-first quality loop](#agent-first-quality-loop)
- [Decision table and handoffs](#decision-table-and-handoffs)

## Current-authority protocol

At use time retrieve the exact corpus and schema snapshot, index/retrieval and
ranker versions, eligibility/moderation policy, filters/facets, query and browse
logs, judgment set, metric definitions, personalization configuration, paid and
editorial rules, experiments/releases, incident/support signals, and current
serving state. Record version, period, scope, owner, and freshness.

Use these evidence states:

- `observed_current` — exact current production or governed dataset evidence;
- `adjudicated` — judgment with rubric, assessor process, and version;
- `synthetic` — authored case for coverage, never user-demand evidence;
- `inferred` — hypothesis with supporting and contradicting evidence;
- `stale` — predates a material corpus, policy, or ranker change;
- `not_verified` — current source unavailable; affected conclusion is blocked.

## Discovery layer contract

```text
corpus_source -> indexed_candidate -> query_or_context_interpreted
indexed_candidate -> retrieved_candidate -> eligibility_decided -> ranked
ranked -> organic_editorial_sponsored_composed -> presented -> outcome_observed
outcome_observed -> feedback_validated -> quality_learning

no_candidates -> zero_result_recovery
low_confidence -> honest_low_confidence_state
policy_ineligible -> excluded_with_safe_reason
stale_or_unavailable -> status_and_alternative
```

| Layer | Owns | Must not silently own |
| --- | --- | --- |
| Corpus/index | what can technically be found | policy eligibility or ranking worth |
| Retrieval | candidate recall for intent/context | final order or paid influence |
| Eligibility/moderation | whether a result may appear | organic quality preference |
| Ranking | order among eligible candidates | enforcement or hidden sponsorship |
| Personalization | authorized contextual ordering | sensitive inference without control |
| Editorial | explicit curated placement | disguised organic relevance |
| Sponsored | paid placement with eligibility floor | unlabelled organic rank |
| Presentation | labels, snippets, filters, confidence, recovery | fabricated support for a result |

## Intent and slice system

Start from recurring jobs rather than one global relevance score:

| Intent | Success evidence | Common failure |
| --- | --- | --- |
| Known item | exact intended item/entity reached | alias, identity, typo, freshness gap |
| Navigational | correct destination or workflow | taxonomy and intent mismatch |
| Attribute/filter | all required constraints respected | over-filtering, facet drift, unavailable stock |
| Comparison | credible alternatives and differentiators | popularity lock-in or missing attributes |
| Troubleshooting | resolves the stated problem safely | stale docs, wrong version, unsupported workaround |
| Exploratory/browse | useful breadth and progressive refinement | repetitive popularity, filter bubble |
| Local/availability | current region/time/inventory fit | stale availability or boundary mistake |
| Creator/seller/app discovery | relevant trustworthy supply and fair opportunity | cold-start burial, spam, paid confusion |

Slice by intent, frequency/head-tail, locale/language, geography where relevant,
platform/device, new versus returning user, signed-in state, corpus category,
fresh versus stale content, new/long-tail supply, zero-result reason, query
complexity, and affected-party risk. Only use authorized, sufficiently supported
segments; never invent demand distributions.

## Rule IDs

- `discovery-quality-1` — Version corpus, schema, retrieval, eligibility, ranker,
  personalization, paid/editorial, judgment, metric, and serving authority.
- `discovery-quality-2` — Separate corpus, retrieval, eligibility, ranking,
  personalization, editorial, sponsored, presentation, and enforcement decisions.
- `discovery-quality-3` — Define quality by user intent and successful value,
  not one global click or popularity score.
- `discovery-quality-4` — Build query/task evidence from current logs, support,
  zero results, product jobs, new supply, incidents, and clearly labeled synthetic cases.
- `discovery-quality-5` — Govern judgments with rubric, source, version,
  assessor/adjudication process, uncertainty, privacy, and leakage controls.
- `discovery-quality-6` — Match offline measures to the intent and candidate
  stage; retrieval coverage and ranked-order quality are different questions.
- `discovery-quality-7` — Correct for position, exposure, selection, and
  feedback-loop bias before treating clicks or engagement as quality labels.
- `discovery-quality-8` — Design zero-result, low-confidence, over-filtered,
  unavailable, stale, and policy-blocked states with truthful recovery.
- `discovery-quality-9` — Give new and long-tail supply bounded exploration and
  evidence opportunity without relaxing eligibility or trust floors.
- `discovery-quality-10` — Label and govern paid/editorial placement separately;
  measure its trust and organic-displacement effects.
- `discovery-quality-11` — Monitor relevance, completion, retained value,
  reports/refunds/support, diversity, concentration, supply health, and latency.
- `discovery-quality-12` — Protect personalization through purpose, minimization,
  user control, sensitive-category limits, fairness, and non-personalized fallback.
- `discovery-quality-13` — Provide versioned diagnostics for why candidates were
  retrieved, excluded, ranked, labelled, or unavailable without leaking abuse logic.
- `discovery-quality-14` — Bind quality drift and guardrails to predeclared
  hold, rollback-request, judgment-refresh, and owner-handoff states.
- `discovery-quality-15` — Keep implementation, instrumentation, experiments,
  moderation, seller interventions, and campaigns in their canonical owners.

## Judgment and offline evidence

A judgment case records query/context, intent, locale, applicable corpus/index
snapshot, eligible candidate pool, result or pair, graded label, rationale,
rubric/version, source class, assessor/adjudication state, uncertainty, and slice.

Use blind, independently reviewable adjudication for material cases. Prevent
training/eval leakage and overfitting to a fixed head-query set. Refresh when
corpus, policy, user vocabulary, product jobs, or ranker behavior changes.

Choose evidence by question:

| Question | Evidence family | Warning |
| --- | --- | --- |
| Did retrieval include useful candidates? | coverage/recall at a bounded candidate set | incomplete judgment pool biases result |
| Did top ranks order graded relevance well? | precision or graded-ranking measure | metric choice depends on intent and labels |
| Did filters preserve required constraints? | constraint satisfaction and eligible recall | relevance cannot excuse a broken hard filter |
| Did browse provide useful breadth? | coverage, diversity, novelty, quality floor | novelty alone can surface junk |
| Did zero-result recovery help? | successful reformulation or alternate path | filler clicks are not recovery |
| Did a model/ranker change regress critical slices? | paired cases and slice deltas | aggregate gains can hide severe tails |

Do not hard-code one universal offline metric or threshold. Record the approved
metric contract, practical effect, critical slices, and uncertainty for the
current surface.

## Online outcomes and bias

Clicks and dwell are shaped by rank position, snippet attractiveness, prior
exposure, defaults, paid placement, and existing popularity. Treat them as
behavioral signals, not direct relevance truth.

Pair exposure-aware engagement with successful task completion, refinement,
re-query, add/save/purchase/use, retained value, returns/refunds, reports,
support, abandonment, creator/seller outcomes, diversity/concentration, and
latency. Use `product-experiment-review` for causal online comparisons and keep
long-term ecosystem guardrails through their maturity window.

## Result and recovery states

| State | Product response | Evidence to retain |
| --- | --- | --- |
| Good confident match | present organic result with truthful metadata | versions, candidate/rank trace, outcome |
| Ambiguous intent | ask or expose useful intent/refinement choices | ambiguity class and selected path |
| Over-filtered | identify removable filters without violating hard constraints | filter/exclusion trace |
| True zero result | say none; offer spelling, synonym, category, request, or support path | zero-result reason |
| Low confidence | label uncertainty and show bounded alternatives | confidence source and fallback |
| Stale/unavailable | explain state and current alternative | freshness/availability authority |
| Policy blocked | safe reason category and appeal/support where applicable | policy version and owner |
| Sponsored/editorial | visible placement label and quality/eligibility floor | placement authority and density |

Never fill empty space with unrelated results merely to reduce zero-result rate.

## Cold start, fairness, and incentives

New items lack exposure, not necessarily quality. Give bounded exploration based
on eligibility, metadata completeness, category need, verified quality evidence,
or randomized opportunity, then update from mature outcomes. Do not treat missing
traffic as failure.

Audit feedback loops: popularity, reviews, installs, prior rank, paid spend, and
editorial exposure can become self-reinforcing. Monitor opportunity and error by
legitimate category, locale, geography, lifecycle, and other authorized segments.
Do not infer sensitive attributes. Keep supply enforcement and appeals with the
marketplace policy/performance owner.

## Diagnostics contract

For a versioned request, expose to authorized operators:

- normalized query/context and detected intent with confidence;
- corpus/index, retrieval, eligibility, filter, ranker, personalization, and
  composition versions;
- candidate counts at each boundary and safe exclusion reason categories;
- organic/editorial/sponsored classification;
- freshness, availability, locale, and policy state;
- result-level safe reason features or evidence categories;
- trace/experiment ID and fallback path.

Do not expose exact fraud, spam, moderation, or rank-gaming thresholds to users or
unauthorized operators.

## Agent-first quality loop

```text
logs_and_cases -> privacy_safe_sampling -> intent_and_slice_assignment
assignment -> judgment_needed_or_existing -> evidence_validated -> scorecard
scorecard -> no_change | owner_handoff | experiment | release_hold_request
production_signals -> drift_or_guardrail_check -> continue | rollback_request
material_change -> stale_evidence -> judgment_refresh
```

Automation may sample authorized failures, deduplicate/query-cluster, detect
coverage gaps, validate evidence versions, compute sealed scorecards, flag drift,
open exact owner work, and invoke pre-authorized hold/rollback requests. It must
not fabricate judgments, change eligibility policy, tune production ranking, or
infer sensitive user intent without authority.

## Decision table and handoffs

| Finding | Product decision | Canonical handoff |
| --- | --- | --- |
| Retrieval misses known eligible item | block/narrow affected surface | search engineering with exact cases |
| Eligibility excludes allowed item | policy or implementation diagnosis | moderation/policy owner |
| Rank order weak but candidate set good | ranker improvement hypothesis | search engineering; experiment owner |
| Zero results caused by content gap | truthful empty state and content request | corpus/content owner |
| Click gain but refunds/reports worsen | hold/rollback request | `product-experiment-review` and delivery |
| Seller/creator quality action needed | emit evidence and ranking impact | marketplace performance owner |
| Query/outcome events untrustworthy | block conclusion | `product-analytics-instrumentation-review` |
| Sponsored influence unclear | label/separate or stop placement | commercial/campaign owner |

Every handoff contains exact query/case IDs, artifact versions, affected slices,
decision impact, acceptance evidence, owner, and expiry. Do not send a generic
"improve relevance" ticket.
