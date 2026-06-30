# Experimentation Platform Governance Patterns

## Experimentation Platform Governance state machine

```text
experiment_proposed -> risk_classified -> design_reviewed -> launched -> monitored -> analyzed -> decision_recorded -> cleaned_up
       |                    |                 |          |             |            |                  |
       v                    v                 v          v             v            v                  v
 rejected            ethics_review_needed design_blocked paused guardrail_failed inconclusive stale_holdout
```

## Rule IDs

- `experiment-gov-1` — Classify experiment by product risk, affected user rights, revenue impact, and reversibility.
- `experiment-gov-2` — Define exposure unit, eligibility, randomization, holdout, metric hierarchy, and guardrails before launch.
- `experiment-gov-3` — Overlapping tests need conflict detection and ownership.
- `experiment-gov-4` — Pricing, ranking, safety, accessibility, AI, and privacy experiments require elevated review.
- `experiment-gov-5` — Analysis should include segments, novelty effects, instrumentation QA, and guardrail outcomes.
- `experiment-gov-6` — Decision records should capture ship, iterate, stop, inconclusive, or follow-up experiment.
- `experiment-gov-7` — Experiment flags, holdouts, dashboards, and docs need cleanup owner.
- `experiment-gov-8` — Ethics review should address manipulation, vulnerable users, fairness, and consent expectations.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Pricing test | Elevated review | Revenue, refunds, support guardrails | Trust damage |
| Ranking test | Fairness and abuse review | Creator/user segment metrics | Supply harm |
| Onboarding UX | Standard review | Activation and support metrics | False positive |
| AI feature test | Safety and cost review | Eval and live guardrails | Unsafe autonomy |
| Overlapping lifecycle test | Conflict policy | Exposure map | Metric contamination |

## Experiment governance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `experiment_proposed`, `experiment_design_approved`, `experiment_launched`, `experiment_guardrail_triggered`, `experiment_analyzed`, `experiment_decision_recorded`, `experiment_cleaned_up`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
