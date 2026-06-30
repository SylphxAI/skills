# data-warehouse-metrics-layer-review behavior example

skill: data-warehouse-metrics-layer-review

## Positive prompt

> Design a data warehouse metrics layer for SaaS KPIs covering activation, conversion, churn, ARR, support SLA, AI cost, experiments, lineage, freshness, and dashboard certification.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines canonical metric contracts with owner, formula, grain, dimensions, filters, timezone, identity, lineage, freshness SLA, tests, and access tier.
- Includes certified/exploratory/deprecated status, quality checks, backfill/change log, consumer notification, and finance/product/support reconciliation.
- Flags duplicated BI formulas, ownerless KPIs, missing grain/timezone, silent backfills, sensitive dimension exposure, and dashboard mistrust.

It should also produce the artifact shape requested by `skills/data-warehouse-metrics-layer-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan localization QA for Japanese and Arabic app releases.

The skill should not load for this prompt unless the user adds an explicit data-warehouse-metrics-layer-review context.

## Expected behavior

- Defines canonical metric contracts with owner, formula, grain, dimensions, filters, timezone, identity, lineage, freshness SLA, tests, and access tier.
- Includes certified/exploratory/deprecated status, quality checks, backfill/change log, consumer notification, and finance/product/support reconciliation.
- Flags duplicated BI formulas, ownerless KPIs, missing grain/timezone, silent backfills, sensitive dimension exposure, and dashboard mistrust.
