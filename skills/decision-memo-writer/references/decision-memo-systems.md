# Decision Memo Systems

A decision memo is a coordination artifact. It records what is being decided, why now, what was considered, what evidence exists, and what would change the decision later.

## Rule IDs

- `decision-memo-1` — State one decision in one sentence; avoid bundling unrelated choices.
- `decision-memo-2` — Name owner, deadline, stakeholders, and decision type: one-way door, two-way door, experiment, policy, or architecture.
- `decision-memo-3` — Separate facts, assumptions, preferences, constraints, and unresolved unknowns.
- `decision-memo-4` — Compare at least two real options plus the cost of doing nothing.
- `decision-memo-5` — Use evidence proportional to decision risk; high-blast-radius choices need stronger proof.
- `decision-memo-6` — Include second-order effects: support load, user trust, revenue, operational complexity, accessibility, and policy risk.
- `decision-memo-7` — Make the recommendation falsifiable with success metrics, guardrails, and revisit triggers.
- `decision-memo-8` — Record rejected options respectfully with why they lost.
- `decision-memo-9` — Convert the decision into owner/action/date follow-through.
- `decision-memo-10` — If evidence is insufficient, recommend the smallest decision or experiment that reduces uncertainty.

## Decision table

| Decision type | Evidence bar | Memo emphasis | Follow-up |
| --- | --- | --- | --- |
| Two-way door | medium | speed, reversible learning | date-based review |
| One-way door | high | risk, stakeholder alignment, rollback absence | explicit approval |
| Experiment | medium | hypothesis, sample, guardrails | readout date |
| Policy | high | fairness, enforcement, appeals | governance review |
| Pricing | high | value, revenue, trust, support | cohort/retention readout |
| Product scope | medium | user value, dependency, focus | roadmap update |

## State machine

```text
problem_identified -> decision_framed -> evidence_collected -> options_compared
options_compared -> recommendation_written -> decision_made -> actions_assigned
evidence_collected -> uncertainty_too_high -> experiment_defined -> readout -> decision_framed
decision_made -> metric_review -> keep_or_adjust_or_reverse
```

## Event schema

Recommended tracking fields:

- `decision_memo_created`: decision_id, owner, deadline, decision_type, blast_radius.
- `decision_option_evaluated`: option_id, decision_id, evidence_strength, risk_score.
- `decision_made`: decision_id, selected_option, approver, reversible, revisit_date.
- `decision_readout`: decision_id, success_metric_result, guardrail_result, next_action.

## Checklist

- Decision, owner, deadline, options, recommendation, and non-goals are explicit.
- Evidence and assumptions are separated.
- Tradeoffs include user, revenue, support, operational, accessibility, and trust impact.
- Success metrics and revisit triggers are measurable.
- The memo ends with actions, owners, and dates.
