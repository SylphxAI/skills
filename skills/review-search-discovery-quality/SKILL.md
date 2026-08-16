---
name: review-search-discovery-quality
description: "Review search discovery quality and produce one actionable assessment."
---

# Review Search and Discovery Quality

Determine whether a discovery surface helps the right user find a trustworthy,
eligible result for the intended job—and why it fails when it does not.

## Workflow

1. Define the decision, surface, user and affected parties, searchable corpus,
   result types, primary intents, locales, business incentives, and harm from a
   missed, irrelevant, unsafe, stale, biased, or misleading result.
2. Confirm the current sources: corpus/index and schema versions, eligibility
   and moderation policy, query/browse logs, judgment data, ranker/configuration,
   personalization controls, sponsored/editorial rules, telemetry definitions,
   known incidents, and release state. State unavailable facts and leave their
   dependent conclusions open.
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
   policy-constrained states. Show uncertainty explicitly; random and paid results
   retain their own labeled selection reasons.
8. Review cold start, popularity feedback, exposure, review manipulation,
   duplicate/spam supply, sensitive personalization, paid influence, creator or
   seller impact, and support/debug explainability.
9. Define a quality loop that samples failures, refreshes judgments,
   detects drift, blocks invalid evidence, triggers predeclared hold/rollback
   requests, and opens owner handoffs without directly implementing the ranker.
10. Produce the discovery contract, slice evaluation, failure diagnosis,
    product changes, implementation handoffs, and quality release decision.

## Current sources

Use current corpus/index, policy, ranker/configuration, logs, judgments, metric,
paid/editorial, experiment, and serving sources. Label synthetic and inferred
cases explicitly. When exact production state is unavailable, produce a
bounded investigation plan rather than asserting current quality or behavior.

## Routing boundaries

- Search/index/retrieval/ranker implementation, model tuning, serving, latency,
  and rollback belong to the owning product repository and release path.
- `review-product-analytics-instrumentation` owns event, identity, query-log,
  outcome-pipeline, and data-QA implementation.
- `review-product-experiment` owns online causal experiment design.
- Marketplace seller performance and enforcement are a separate artifact; this
  skill consumes eligible quality evidence and reports ranking impact.
- Marketing SEO, app-store listing conversion, and paid campaign operations
  remain with their marketing and distribution owners.
- Moderation/policy owners decide eligibility. Ranking stays within an
  ineligible item or silently become enforcement.

## Principles

- Organic relevance, editorial curation, paid placement, policy eligibility, and enforcement stay labeled streams.
- Rank for successful completion, retained value, refunds, reports, support, trust, diversity, and supply health alongside clicks and revenue.
- Queries, corpus coverage, judgments, weights, thresholds, policy states, and ranker behavior come from current sources.
- Missing or sparse feedback stays unknown. New and long-tail supply keep an exploration path.
- Sensitive personalization carries verified purpose, authority, user control, fairness, and privacy.
- Operators and supply get actionable reason categories. Evasion-sensitive ranking, moderation, and fraud mechanisms stay operator-only.

## Output

```text
Discovery decision and current sources:
- surface / corpus / intents / versions / affected parties / verified facts

Layer contract:
| Layer | Owner | Input | Decision | Evidence | Failure state |
| --- | --- | --- | --- | --- | --- |

Intent and quality assessment:
| Slice | User job | Query/browse source | Eligibility/coverage | Relevance/quality | Online outcome | Guardrail | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

Failure diagnosis and product response:
- retrieval / eligibility / ranking / composition / presentation / feedback
- zero-low-confidence recovery / cold start / paid-editorial / abuse-fairness

Release and handoffs:
- hold / narrow / experiment / expand / rollback request
- exact owner artifact / acceptance condition / unresolved fact / automation state
```
