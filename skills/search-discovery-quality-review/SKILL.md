---
name: search-discovery-quality-review
description: "Design or audit one search, browse, recommendation, or marketplace-discovery quality contract covering corpus and intent, retrieval and eligibility boundaries, ranking evidence, query/result slices, zero and low-confidence recovery, freshness, cold start, personalization, sponsored/editorial separation, abuse, fairness, diagnostics, and release decisions. Use when the primary artifact is a discovery-quality scorecard and improvement plan. Do not use for search implementation, SEO, seller enforcement, analytics instrumentation, or campaign merchandising alone."
---

# Search Discovery Quality Review

Determine whether a discovery surface helps the right user find a trustworthy,
eligible result for the intended job—and why it fails when it does not.

## Workflow

1. Define the decision, surface, user and affected parties, searchable corpus,
   result types, primary intents, locales, business incentives, and harm from a
   missed, irrelevant, unsafe, stale, biased, or misleading result.
2. Establish current authority: corpus/index and schema versions, eligibility
   and moderation policy, query/browse logs, judgment data, ranker/configuration,
   personalization controls, sponsored/editorial rules, telemetry definitions,
   known incidents, and release state. Mark absent facts `not_verified`.
3. Read `references/search-discovery-quality-systems.md`.
4. Map the complete decision path: corpus inclusion -> retrieval -> policy
   eligibility -> ranking -> personalization -> organic/editorial/sponsored
   composition -> presentation -> user outcome -> feedback and recovery.
5. Build an evidence-backed intent and slice inventory from current logs, support,
   catalog state, known-item tasks, tail queries, zero results, new/long-tail
   supply, languages, devices, accessibility needs, and strategic product jobs.
6. Define offline judgment, coverage, relevance, diversity, freshness, safety,
   and diagnostic evidence plus online success, refinement, abandonment, report,
   refund/support, retained-value, and ecosystem guardrails. Separate observed,
   synthetic, inferred, and adjudicated cases.
7. Design zero-result, low-confidence, over-filtered, stale, unavailable, and
   policy-blocked states. Never hide uncertainty behind random or paid filler.
8. Review cold start, popularity feedback, exposure, review manipulation,
   duplicate/spam supply, sensitive personalization, paid influence, creator or
   seller impact, and support/debug explainability.
9. Define an agent-first quality loop that samples failures, refreshes judgments,
   detects drift, blocks invalid evidence, triggers predeclared hold/rollback
   requests, and opens owner handoffs without directly implementing the ranker.
10. Produce the discovery contract, slice/eval scorecard, failure diagnosis,
    product changes, implementation handoffs, and quality release decision.

## Source verification

Use current corpus/index, policy, ranker/configuration, logs, judgments, metric,
paid/editorial, experiment, and serving sources. Label synthetic and inferred
cases explicitly. If exact production state cannot be retrieved, produce a
bounded investigation plan rather than asserting current quality or behavior.

## Routing boundaries

- Search/index/retrieval/ranker implementation, model tuning, serving, latency,
  and rollback belong to the owning engineering project and `delivery-standard`.
- `product-analytics-instrumentation-review` owns event, identity, query-log,
  outcome-pipeline, and data-QA implementation.
- `product-experiment-review` owns online causal experiment design.
- Marketplace seller performance and enforcement are a separate artifact; this
  skill consumes eligible quality evidence and reports ranking impact.
- Marketing SEO, app-store listing conversion, and paid campaign operations do
  not become organic search-quality work merely because they use keywords.
- Moderation/policy owners decide eligibility. Ranking cannot override an
  ineligible item or silently become enforcement.

## Guardrails

- Do not blend organic relevance, editorial curation, paid placement, policy
  eligibility, and enforcement into one unexplained score or result stream.
- Do not optimize clicks, dwell, installs, or revenue alone when successful
  completion, retained value, refunds, reports, support, trust, diversity, or
  supply health contradict them.
- Do not invent current queries, corpus coverage, relevance judgments, weights,
  thresholds, policy states, or ranker behavior.
- Do not treat missing or sparse feedback as negative quality, or permanently
  bury new/long-tail supply through popularity feedback loops.
- Do not personalize sensitive topics or infer sensitive attributes without
  verified purpose, authority, user control, fairness, and privacy boundaries.
- Give operators and affected supply actionable reason categories without
  exposing evasion-sensitive ranking, moderation, or fraud mechanisms.

## Output

```text
Discovery decision and current authority:
- surface / corpus / intents / versions / affected parties / verified facts

Layer contract:
| Layer | Owner | Input | Decision | Evidence | Failure state |
| --- | --- | --- | --- | --- | --- |

Intent and quality scorecard:
| Slice | User job | Query/browse source | Eligibility/coverage | Relevance/quality | Online outcome | Guardrail | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

Failure diagnosis and product response:
- retrieval / eligibility / ranking / composition / presentation / feedback
- zero-low-confidence recovery / cold start / paid-editorial / abuse-fairness

Release and handoffs:
- hold / narrow / experiment / expand / rollback request
- exact owner artifact / acceptance condition / unresolved fact / automation state
```
