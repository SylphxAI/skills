---
name: board-metrics-operating-review
description: Design and audit board metrics operating systems for SaaS, marketplace, app, and game businesses covering metric definitions, source-of-truth datasets, cohort views, ARR/MRR, retention, gross margin, CAC, pipeline, product usage, incidents, forecast, board narrative, owner signoff, variance analysis, and action follow-up. Use when executive teams need board-ready truth instead of spreadsheet theater.
---

# Board Metrics Operating Review

Use this skill to convert board metrics, board pack, investor reporting, operating metrics, ARR/MRR, retention, CAC, gross margin, forecast, variance analysis, metric source of truth, and board action follow-up questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify board audience, decision calendar, metric definitions, data sources, owner signoff, reporting cadence, historical baselines, forecast assumptions, segment/cohort cuts, narrative risks, and action register.
2. Read `references/board-metrics-operating-patterns.md`.
3. Classify the situation as monthly operating review, quarterly board pack, financing prep, missed-plan review, metric definition cleanup, investor update, budget review, or strategic pivot discussion.
4. Define metric dictionary, source-of-truth map, data-quality checks, owner signoff, variance narrative, forecast bridge, risk register, board asks, and follow-up actions.
5. Produce board metrics operating review, state machine, decision table, event schema, metric pack checklist, owner signoff plan, and board action register.

## Guardrails

- Do not let board metrics be manually curated without source-of-truth definitions, owner signoff, and variance explanation.
- Do not mix GAAP/accounting, billing, product analytics, CRM, support, and finance metrics without clear reconciliation boundaries.
- Do not hide missed-plan drivers behind vanity growth narratives.
- Do not end board reporting without explicit decisions, asks, owners, and follow-up dates.

## Output format

```text
Board metrics context:
Audience / source of truth / risk boundary:

Operating metrics plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Definitions, sources, owners, variance narrative, board asks, risks, and follow-up actions:
- <trigger> -> <policy, metric, edge case, support note>
```
