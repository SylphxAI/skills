# Search Discovery Relevance Patterns

## Discovery state machine

```text
query_received -> intent_parsed -> candidates_retrieved -> eligibility_filtered -> ranked -> results_presented -> feedback_collected -> quality_reviewed
       |              |                    |                    |          |                   |                    |
       v              v                    v                    v          v                   v                    v
 no_query        intent_unknown       retrieval_empty      policy_blocked  low_confidence     no_engagement      ranking_regressed
```

## Rule IDs

- `search-relevance-1` — Separate retrieval, eligibility, ranking, personalization, editorial curation, paid placement, and moderation.
- `search-relevance-2` — Define primary intents: known-item, category browse, comparison, troubleshooting, local search, creator discovery, or exploratory search.
- `search-relevance-3` — Build eval queries from real logs, support cases, zero-results, new items, tail queries, and strategic categories.
- `search-relevance-4` — Measure relevance beyond clicks: successful action, dwell, refinement, saves, retained use, refunds, reports, and support contacts.
- `search-relevance-5` — Zero-results needs spelling, synonyms, category fallback, filters reset, and helpful empty state.
- `search-relevance-6` — Sponsored and editorial results need visible labels and limits so trust is not confused with ranking quality.
- `search-relevance-7` — Fairness and cold-start policies should protect quality without permanently burying new supply.
- `search-relevance-8` — Ranking changes need offline eval, shadow/canary, guardrails, and rollback.
- `search-relevance-9` — Search debug tools should show query parse, filters, eligibility, ranking signals, and reason for exclusion.
- `search-relevance-10` — Moderation and policy eligibility must happen before ranking exposure.

## Decision table

| Problem | Likely cause | Product response | Quality proof |
| --- | --- | --- | --- |
| Many zero-results | Missing synonyms or over-filtering | Query expansion and filter reset | Zero-result rate down, action rate up |
| Popular bad results | Clickbait signal overweighted | Add retained-value and reports guardrail | Refund/report decrease |
| New creators invisible | Cold-start penalty | Exploration slots and quality thresholds | New supply activation without trust loss |
| Paid items look organic | Placement ambiguity | Labels and cap sponsored density | Trust/support objections decrease |
| Tail queries fail | Sparse eval coverage | Add query clusters and examples | Eval pass and manual sampled review |

## Relevance checklist

- Corpus, intents, and eligible result types are defined.
- Ranking signals include quality, relevance, freshness, trust, and retained value.
- Zero-results and low-confidence states are intentionally designed.
- Paid/editorial/moderation boundaries are explicit.
- Offline evals and online guardrails exist before rollout.
- Debug tools explain why results appear or are excluded.

## Event schema

Track: `search_query_submitted`, `search_results_returned`, `search_zero_results`, `search_result_clicked`, `search_refined`, `search_result_reported`, `ranking_policy_changed`, `ranking_guardrail_triggered`, `search_eval_completed`.

Recommended properties: `surface`, `query_class`, `result_count`, `filter_count`, `personalized`, `sponsored_count`, `zero_result_reason`, `ranker_version`, `eval_set`, `guardrail`, `clicked_rank`, `successful_action`, `report_reason`.
