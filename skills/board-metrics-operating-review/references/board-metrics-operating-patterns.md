# Board Metrics Operating Review Patterns

## Board Metrics Operating Review state machine

```text
metrics_scoped -> sources_reconciled -> owners_signed_off -> narrative_reviewed -> board_decisions_recorded -> actions_closed
       |                |                    |                   |                    |                         |
       v                v                    v                   v                    v                         v
 metric_sprawl    reconciliation_gap    owner_gap          vanity_narrative     decision_gap              action_drift
```

## Rule IDs

- `board-metrics-1` — Define every board metric with formula, source system, owner, update cadence, segment cut, historical comparability, and known caveats.
- `board-metrics-2` — Separate accounting, billing, CRM, product analytics, support, incident, hiring, and forecast data so reconciliation gaps are visible.
- `board-metrics-3` — Require owner signoff for revenue, retention, margin, pipeline, product usage, customer health, incidents, burn, runway, and forecast metrics.
- `board-metrics-4` — Present cohort and segment views where aggregate metrics hide retention, margin, channel, geography, enterprise, or marketplace quality shifts.
- `board-metrics-5` — Explain variance from plan through price, volume, mix, churn, expansion, cost, timing, data quality, one-time events, and operating decisions.
- `board-metrics-6` — Tie narrative to decisions: resource allocation, pricing, GTM, product bets, risk acceptance, fundraising, hiring, or customer commitments.
- `board-metrics-7` — Track board questions, decisions, action owners, due dates, follow-up evidence, and unresolved assumptions.
- `board-metrics-8` — Audit metric drift after schema changes, billing migrations, CRM process changes, product event changes, or finance close updates.
- `board-metrics-9` — Include a current-period board snapshot for each board-critical metric: actual, plan, prior period, variance, status, owner, signoff, confidence, and decision implication.
- `board-metrics-10` — Treat owner signoff as an artifact, not a sentence: metric owner, source owner, finance/data reviewer, lock time, unresolved caveat, and release decision.
- `board-metrics-11` — When period values are missing, do not invent release-ready facts. Use clearly prefixed `illustrative_not_source_of_truth:<value>` examples, open a data-request action, and block release.
- `board-metrics-12` — Avoid a blank board review: when source values are absent, include a compact illustrative current-period snapshot and driver bridge, then block release until real actuals, plan, prior, and owner signoff replace it.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Metric definition dispute | Freeze dictionary | Formula and owner | Board mistrust |
| Missed forecast | Bridge variance | Plan vs actual driver tree | Narrative spin |
| Fundraising prep | Audit comparability | Historical metric package | Diligence failure |
| Product usage drop | Segment cohort view | Usage/retention analysis | Aggregate blind spot |
| Board action open | Assign follow-up | Action register | Decision drift |
| Unsigned board pack | Block release or mark caveat | Signoff ledger | Board mistrust |
| Missing period value | Data request before release | Source owner and due date | Spreadsheet theater |

## Minimum current-period board snapshot

Every board pack needs a compact current-period view before the narrative. If values are not supplied, use clearly prefixed `illustrative_not_source_of_truth:<value>` examples rather than pretending they are source facts; keep signoff blocked and create a data-request action.

| Metric | Formula / source | Required current-period fields | Board implication |
| --- | --- | --- | --- |
| ARR / MRR | Contracted recurring subscription value; billing plus finance close | actual, plan, prior, variance, new/expansion/contraction/churn bridge | growth target, hiring, fundraising timing |
| NRR / GRR | NRR = (starting ARR + expansion - contraction - churn) / starting ARR; GRR excludes expansion | current cohort, prior cohort, segment, churn/expansion bridge | save plan, expansion motion, CS capacity |
| Churn cohorts | Logo and revenue churn by cohort, plan, segment, geography, acquisition channel | cohort actual, prior, plan, reason-code mix | retention investment and product/CS fixes |
| CAC / payback | Fully loaded sales and marketing spend divided by new ARR; payback = CAC / gross-profit ARR | blended and segment values, spend period, attribution caveat | GTM spend, channel mix, hiring |
| Gross margin | (revenue - COGS) / revenue, split subscription, services, support, infra, payment, third-party costs | actual, plan, prior, cost-driver bridge | pricing, infra/vendor spend, services strategy |
| Pipeline | coverage, stage conversion, commit, best case, slips, sales cycle | current pipeline, coverage to target, stale opp rate, stage hygiene | forecast confidence and sales capacity |
| Product usage | activation, WAU/MAU or relevant active orgs, feature adoption, seat utilization, retained-vs-churned usage | actual, plan, prior, segment/cohort cut, event confidence | roadmap, onboarding, packaging |
| Support load | ticket rate, backlog, SLA/FRT, reopen rate, CSAT, top themes | actual, plan, prior, severity and ARR/customer impact | support headcount, quality fixes, deflection |
| Incidents | Sev1/2 count, MTTA/MTTR, SLO, customer/ARR impact, RCA closure | actual, plan/SLO, prior, repeat-cause count | reliability investment and risk acceptance |
| Burn / runway | net burn, gross burn, cash, runway = unrestricted cash / average net burn | actual, plan, prior, downside scenario | hiring, fundraising, vendor commitments |
| Forecast variance | plan to actual bridge by price, volume, mix, churn, expansion, cost, timing, one-time, data quality | amount, percent, owner, controllable/uncontrollable | reforecast, plan reset, board ask |

## No-data response pattern

If the prompt asks for a board review but supplies no actual period data, produce two clearly separated artifacts:

1. Current-period snapshot with illustrative values prefixed as `illustrative_not_source_of_truth:<value>` in the actual, plan, prior, and variance columns.
2. Driver bridge with sample actuals, plan variance, and drivers, so the reader can see what a completed board review looks like. The example must say it is not board-release evidence and must create data-request actions.

Illustrative example rows should cover at least revenue, retention, gross margin, pipeline, product usage, support/incidents, burn/runway, and forecast variance. Use driver language such as new ARR shortfall, expansion beat, churn cohort deterioration, hosting cost pressure, pipeline slippage, incident repeat cause, hiring timing, or data-quality change.

When space is limited, do not spend the budget on a full blank table. Prefer a filled illustrative snapshot plus a release block, but keep dictionary coverage complete across ARR, MRR, NRR, GRR, churn cohorts, CAC/payback, gross margin, pipeline, product usage, support load, incidents, burn, runway, and forecast variance:

```text
Release status: blocked until source-tied actuals, plan, prior, variance, owner signoff, and confidence replace illustrative values.
```

## Owner signoff ledger

Use this table shape when preparing or auditing a board pack:

| Metric pack | Metric owner | Source owner | Finance/data reviewer | Signed or blocked | Caveat | Release decision |
| --- | --- | --- | --- | --- | --- | --- |
| Revenue / ARR | CFO or VP Finance | Billing/revenue ops | Finance close owner | signed / blocked | reconciliation gap, FX, ramp, pause, usage-based caveat | release, release-with-caveat, block |
| Pipeline | CRO | RevOps / CRM admin | FP&A | signed / blocked | stale stages, slipped deals, rep forecast bias | release, caveat, block |
| Product usage | CPO | Data/product analytics | Data owner | signed / blocked | event schema drift, identity join gap | release, caveat, block |
| Support / incidents | VP CS / CTO | Support ops / incident owner | COO or chief of staff | signed / blocked | severity inflation, missing RCA | release, caveat, block |
| Burn / runway | CFO | Accounting / treasury | FP&A | signed / blocked | one-time cash movement, hiring timing | release, caveat, block |

Signoff is complete only when the owner accepts the formula, source, current-period value, caveat, and board narrative. A metric with a blocked or unknown signoff can appear only with a visible caveat and action owner.

## Decision and action quality bar

Board asks should not be generic discussion topics. Each ask needs:

- decision required: approve, reject, defer, accept risk, change plan, fund initiative, or request diligence;
- metric trigger: the board-critical metric and variance causing the ask;
- options: at least two credible paths or a clear reason only one path is acceptable;
- recommendation: owner-backed choice with risk and expected metric movement;
- follow-up: action owner, due date, evidence required, next review, and close condition.

## Board metrics checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `board_metric_defined`, `board_metric_source_reconciled`, `board_metric_owner_signed_off`, `board_variance_explained`, `board_question_logged`, `board_decision_recorded`, `board_action_created`, `board_action_closed`.

Recommended properties: `board_cycle_id, metric_name, metric_owner, source_system, metric_version, reporting_period, segment, variance_type, plan_delta, confidence_status, board_question_id, action_owner, action_due_at, decision`.
