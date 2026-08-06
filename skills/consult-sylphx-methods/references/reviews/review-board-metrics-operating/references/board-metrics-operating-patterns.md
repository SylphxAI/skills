# Board Metrics Operating Patterns

## Contents

- [Current-authority-at-use protocol](#current-authority-at-use-protocol)
- [State model](#state-model)
- [Rule IDs](#rule-ids)
- [Metric family contract](#metric-family-contract)
- [Reconciliation patterns](#reconciliation-patterns)
- [Signoff and release ledger](#signoff-and-release-ledger)
- [Decision quality bar](#decision-quality-bar)
- [Events](#events)

## Current-authority-at-use protocol

Board data is current only when tied to the reporting period and released source
versions. For each cycle:

1. Obtain the current metric dictionary and reporting policy.
2. Record source extract/query/report IDs, lock timestamps, time zone, currency,
   FX policy, entity scope, exclusions, and restatement state.
3. Reconcile cross-system identities and boundary metrics before calculating
   derivatives. Retain the query or controlled report reference, not pasted
   spreadsheet values without lineage.
4. Obtain metric-owner, source-owner, and finance/data-reviewer attestations for
   the exact packet version.
5. Label each cell `released`, `released_with_caveat`, `not_released`, or
   `not_provided`. Missing data never becomes an estimate unless an authorized
   forecast methodology explicitly owns it and labels it forecast.

## State model

```text
cycle_scoped -> definitions_locked -> sources_locked -> boundaries_reconciled
boundaries_reconciled -> metrics_released -> variance_reconciled
variance_reconciled -> narrative_tied -> decisions_recorded -> actions_closed

definition_drift -> metric_blocked
source_unlocked -> release_blocked
bridge_not_reconciled -> narrative_blocked
action_overdue -> escalated_to_next_cycle
```

## Rule IDs

- `board-metrics-1` — Version every metric definition with formula, population,
  period, currency, source, owner, cadence, segment cuts, and caveats.
- `board-metrics-2` — Preserve accounting, billing, subscription, CRM, product,
  support, incident, people, cash, and forecast boundaries; reconcile, do not
  silently blend them.
- `board-metrics-3` — Release only exact period/source versions with explicit
  confidence and signoff state.
- `board-metrics-4` — Use cohorts and segments where blended totals can hide
  acquisition mix, churn, expansion, margin, channel, geography, or quality.
- `board-metrics-5` — Reconcile every material variance bridge from opening to
  closing value; label residual and data-quality effects explicitly.
- `board-metrics-6` — Separate actual, plan, forecast, scenario, and target.
  Never present one as another.
- `board-metrics-7` — State both absolute and relative movement with the correct
  denominator and comparable window.
- `board-metrics-8` — Tie every narrative claim and ask to released metrics,
  counterevidence, material caveats, and a decision implication.
- `board-metrics-9` — Capture signoff as versioned evidence: owner, source
  owner, reviewer, timestamp, caveat, and release decision.
- `board-metrics-10` — When data is missing, emit a blocked cell and exact
  source request; do not fabricate illustrative board values.
- `board-metrics-11` — Track decisions, dissent, action owners, due dates,
  evidence required, next review, and close condition.
- `board-metrics-12` — Restate history when definitions materially change or
  show a visible comparability break; never splice incompatible series.
- `board-metrics-13` — Protect sensitive customer, employee, and deal data with
  minimum necessary aggregation and access controls.
- `board-metrics-14` — Distinguish observed causal evidence from management
  judgment; a variance decomposition is not automatically causal proof.

## Metric family contract

Use only families relevant to the business model, but explicitly dispose of
every board-requested metric as `included`, `not_applicable:<reason>`, or
`blocked:<evidence needed>`.

| Family | Definition questions | Required reconciliation/cuts |
| --- | --- | --- |
| ARR/MRR | contracted, billed, recognized, usage-based, pause/ramp/FX treatment | opening + new + expansion - contraction - churn = closing |
| NRR/GRR/churn | starting population, logo/revenue, cohort window, reactivation | plan, segment, tenure, product, reason, denominator |
| CAC/payback | spend scope, attribution, new ARR basis, gross-margin basis | blended vs segment/channel; lag and sales-cycle caveat |
| Gross margin | revenue and COGS policy, support/infra/payment allocation | product, region, services, volume/mix/cost drivers |
| Pipeline/forecast | stage definition, probability, commit/best case, slips | source, segment, rep/region, coverage, conversion, age |
| Product usage | identity, active/value event, event version, bot filtering | cohort, plan, role, activation, retained vs churned |
| Support/reliability | ticket denominator, severity, SLA/SLO, repeat causes | customer/ARR impact, product/segment, recurrence |
| Cash/burn/runway | unrestricted cash, gross/net burn, averaging policy | actual vs plan, one-offs, downside scenario |
| Marketplace | GMV/revenue, take rate, liquidity, buyer/seller quality | category, side, geography, refunds/disputes, concentration |
| Game/app | active/value users, payer conversion, bookings/revenue, retention | platform, version, cohort, geography, acquisition channel |

## Reconciliation patterns

### Recurring revenue bridge

```text
closing recurring revenue
= opening recurring revenue
+ new
+ expansion
- contraction
- churn
+/- FX or approved classification adjustments
```

Every term must use the same period, entity scope, currency policy, and recurring
revenue definition. Put unreconciled residual in its own row; never bury it in
"other" without an owner and due date.

### Variance driver tree

```text
observed variance
-> price | volume | mix | acquisition | activation | expansion | contraction
-> churn | unit cost | timing | one-off | classification | data-quality change
```

For each driver record amount, evidence, controllability, confidence, owner, and
proposed action. If amount is unavailable, use `not_provided` and block the
reconciliation; do not assign a plausible number.

## Signoff and release ledger

| Pack | Metric owner | Source owner | Reviewer | Source lock | Caveat | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Revenue | Finance leader | Billing/revenue ops | close owner | exact report/version | FX, ramp, usage, restatement | release/block |
| Pipeline | Sales leader | RevOps | FP&A | CRM snapshot/version | stale stages, slips | release/block |
| Product | Product leader | Analytics | data owner | dataset/query version | event/identity drift | release/block |
| Support/reliability | CS/engineering leader | support/incident owner | operating reviewer | report version | severity or impact gap | release/block |
| Cash/runway | Finance leader | accounting/treasury | FP&A | close/cash version | one-offs, forecast basis | release/block |

## Decision quality bar

Each board ask includes:

- the released metric trigger and material caveat;
- the decision deadline and consequence of no decision;
- at least two credible options, or why only one is admissible;
- recommendation, expected metric mechanism, downside, reversibility, and owner;
- dissent or counterevidence;
- follow-up evidence, due date, next review, and close condition.

## Events

Track `board_cycle_opened`, `board_definition_locked`, `board_source_locked`,
`board_metric_blocked`, `board_metric_released`, `board_bridge_reconciled`,
`board_signoff_recorded`, `board_decision_recorded`, `board_action_overdue`, and
`board_action_closed` with cycle, packet version, metric version, period, source
reference, confidence, caveat, owner, and decision. Do not put sensitive raw
customer, employee, or deal-level payloads into generic analytics events.
