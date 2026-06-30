# data-quality-observability-review behavior example

skill: data-quality-observability-review

## Positive prompt

> Design data quality observability for product analytics and billing dashboards with freshness, schema drift, reconciliation, alerts, and backfills.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies datasets by decision impact before choosing checks and severity.
- Includes freshness, schema, volume, uniqueness, reconciliation, lineage, dashboard trust states, alerts, and backfill proof.
- Protects sensitive data and creates owner-routed incident paths for wrong metrics.

It should also produce the artifact shape requested by `skills/data-quality-observability-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Draft a partner launch email.

The skill should not load for this prompt unless the user adds an explicit data-quality-observability-review context.

## Expected behavior

- Classifies datasets by decision impact before choosing checks and severity.
- Includes freshness, schema, volume, uniqueness, reconciliation, lineage, dashboard trust states, alerts, and backfill proof.
- Protects sensitive data and creates owner-routed incident paths for wrong metrics.
