# Creator Ranking Quality Patterns

## Ranking lifecycle state machine

```text
item_submitted -> eligibility_checked -> quality_signals_collected -> ranked_or_featured -> user_interacts -> creator_feedback -> ranking_reviewed
       |                    |                         |                 |
       v                    v                         v                 v
 rejected             moderation_hold           demoted_or_removed   abuse_investigation
```

## Rule IDs

- `creator-rank-1` — Start from user intent and marketplace job, not one global popularity score.
- `creator-rank-2` — Separate eligibility, ranking, editorial featuring, paid promotion, and enforcement.
- `creator-rank-3` — Use a portfolio of signals: relevance, quality, freshness, reliability, retention, reviews, support, policy, and creator trust.
- `creator-rank-4` — Guard against rich-get-richer loops, review manipulation, spam, duplicate listings, and paid-placement confusion.
- `creator-rank-5` — Ranking should reward retained user value, not only clicks or installs.
- `creator-rank-6` — New creators need fair discovery lanes without lowering quality standards.
- `creator-rank-7` — Creator dashboards should explain actionable improvement areas without exposing exploit recipes.
- `creator-rank-8` — Demotion/removal needs policy reason, appeal path, and support evidence.
- `creator-rank-9` — Ranking experiments need guardrails for diversity, revenue, complaints, conversion, and quality.
- `creator-rank-10` — Governance should review concentration, abuse, creator churn, user satisfaction, and support load.

## Decision table

| Scenario | Eligibility | Ranking action | Creator feedback | Guardrail |
| --- | --- | --- | --- | --- |
| High installs, poor retention | Eligible | Demote quality weight | Show retention/support issues | User satisfaction |
| New high-quality creator | Eligible | Explore/boost in new lane | Explain quality signals | Avoid spam exploitation |
| Paid promotion | Eligible if labeled | Separate sponsored placement | Paid placement terms | Label and quality floor |
| Review manipulation | Hold or demote | Remove fake signal | Policy notice and appeal | Abuse investigation |
| Outdated integration | Eligible with warning or demote | Freshness penalty | Update checklist | Reliability metric |
| Policy violation | Ineligible pending review | Remove/demote | Enforcement reason | Appeal and evidence |

## Signal checklist

- Signals map to user outcomes and can be audited for abuse.
- Paid, editorial, and organic surfaces are clearly separated.
- New/small creators have a fair quality-based path.
- Ranking changes have experiment guardrails and rollback.
- Creator and support teams understand demotion/removal reasons.

## Event schema

Track: `marketplace_item_submitted`, `ranking_eligibility_checked`, `ranking_signal_updated`, `marketplace_item_ranked`, `marketplace_item_featured`, `ranking_experiment_started`, `creator_ranking_feedback_viewed`, `ranking_abuse_signal_detected`, `marketplace_item_demoted`, `ranking_governance_review_completed`.

Minimum properties: item ID, creator ID, surface, query/intent, eligibility reason, signal version, rank bucket, promotion type, user outcome, abuse signal, feedback category, and governance decision.
