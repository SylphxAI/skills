# data-lineage-impact-review behavior example

skill: data-lineage-impact-review

## Positive prompt

> Review data lineage impact for changing a SaaS activation event schema used by warehouse models, dashboards, experiments, customer exports, AI datasets, and revenue reports.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps source systems, events, tables, transformations, models, metrics, dashboards, exports, reverse ETL, AI datasets, owners, and consumers.
- Includes compatibility, semantic/privacy/SLA/cost impact, tests, owner approvals, backfill plan, communication, rollback, and monitoring.
- Flags tribal lineage, silent semantic change, risk-free additive assumptions, uncontrolled backfills/deletions, PII drift, and AI dataset regressions.

It should also produce the artifact shape requested by `skills/data-lineage-impact-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design product-led sales routing for trial users.

The skill should not load for this prompt unless the user adds an explicit data-lineage-impact-review context.

## Expected behavior

- Maps source systems, events, tables, transformations, models, metrics, dashboards, exports, reverse ETL, AI datasets, owners, and consumers.
- Includes compatibility, semantic/privacy/SLA/cost impact, tests, owner approvals, backfill plan, communication, rollback, and monitoring.
- Flags tribal lineage, silent semantic change, risk-free additive assumptions, uncontrolled backfills/deletions, PII drift, and AI dataset regressions.
