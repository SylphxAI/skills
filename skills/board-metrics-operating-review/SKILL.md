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
4. Define metric dictionary, current-period metric snapshot, source-of-truth map, data-quality checks, owner signoff ledger, variance narrative, forecast bridge, risk register, board asks, and follow-up actions.
5. If the user supplies no period values, produce a non-release illustrative draft: fill the current-period snapshot with clearly prefixed `illustrative_not_source_of_truth` values, set signoff to blocked, and add data-request actions. Do not leave the board review as blank `value_required` tables unless the user specifically asks for a data-request checklist only.
6. Produce board metrics operating review, state machine, decision table, event schema, metric pack checklist, signed metric-release plan, board decision memo, and board action register.

## Guardrails

- Do not let board metrics be manually curated without source-of-truth definitions, owner signoff, and variance explanation.
- Do not mix GAAP/accounting, billing, product analytics, CRM, support, and finance metrics without clear reconciliation boundaries.
- Do not hide missed-plan drivers behind vanity growth narratives.
- Do not end board reporting without explicit decisions, asks, owners, and follow-up dates.
- Do not publish a board pack without a current-period snapshot: actual, plan, prior period, variance, owner, signoff status, confidence, and decision implication for each board-critical metric.
- Do not invent release-ready period values when the user has not supplied data. Use clearly prefixed `illustrative_not_source_of_truth` values for examples, set signoff/confidence to blocked or illustrative, and create a data-request register.
- Do not accept owner signoff as a vague plan. Show the signoff artifact: metric owner, source owner, finance/data reviewer, lock time, confidence status, unresolved caveat, and release decision.
- Do not leave variance as a blank template. If source values are missing, provide an illustrative_not_source_of_truth bridge with sample driver deltas and explicitly block release until source-tied actuals replace it.
- Under tight word limits, prioritize: current-period snapshot, compact full-coverage metric dictionary for every requested board-critical metric, driver-based variance bridge, signoff ledger, board asks, action register. Do not drop MRR, GRR, support load, incidents, burn, runway, or forecast variance.

## Output format

```text
Board metrics context:
Audience / source of truth / risk boundary:

Current-period board snapshot:
| Metric | Actual | Plan | Prior | Variance | Status | Owner | Signoff | Confidence | Decision implication |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- |
Use `illustrative_not_source_of_truth:<value>` in value cells when source values are absent; keep signoff blocked.

Operating metrics plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Metric dictionary and reconciliation map:
- <metric> -> <formula, source, cadence, segment, caveat, owner>
Required coverage: ARR, MRR, NRR, GRR, churn cohorts, CAC/payback, gross margin, pipeline, product usage, support load, incidents, burn, runway, forecast variance.

Variance narrative:
- <driver> -> <plan delta, evidence, operating implication, owner action>
- If data is absent: <illustrative_not_source_of_truth driver> -> <sample delta, source value required, implication, release block>

Owner signoff ledger:
| Metric pack | Metric owner | Source owner | Reviewer | Signed/blocked | Caveat | Release decision |
| --- | --- | --- | --- | --- | --- | --- |

Board decisions and asks:
- <decision required> -> <options, recommendation, metric evidence, risk, owner, follow-up>

Definitions, sources, owners, variance narrative, board asks, risks, and follow-up actions:
- <trigger> -> <policy, metric, edge case, support note>

Action register:
| Action | Owner | Due | Evidence needed | Status | Next review |
| --- | --- | --- | --- | --- | --- |
```
