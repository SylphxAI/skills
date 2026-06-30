# observability-cost-governance-review behavior example

skill: observability-cost-governance-review

## Positive prompt

> Review observability cost for logs, metrics, traces, session replay, retention, sampling, cardinality, privacy redaction, and incident usefulness.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies telemetry by decision value and incident/support/audit need before reducing cost.
- Includes owners, budgets, cardinality, sampling, retention, redaction, cost allocation, dashboard cleanup, and exception rules.
- Flags unbounded labels, raw sensitive logs, cutting critical evidence, and forever debug telemetry.

It should also produce the artifact shape requested by `skills/observability-cost-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit a customer advisory board agenda.

The skill should not load for this prompt unless the user adds an explicit observability-cost-governance-review context.

## Expected behavior

- Classifies telemetry by decision value and incident/support/audit need before reducing cost.
- Includes owners, budgets, cardinality, sampling, retention, redaction, cost allocation, dashboard cleanup, and exception rules.
- Flags unbounded labels, raw sensitive logs, cutting critical evidence, and forever debug telemetry.
