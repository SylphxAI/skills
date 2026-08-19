# Board Metrics Operating Patterns

## Contents

- [Current source check](#current-source-check)
- [Reporting cycle](#reporting-cycle)
- [Metric family contract](#metric-family-contract)
- [Reconciliation patterns](#reconciliation-patterns)
- [Source review](#source-review)
- [Decision quality bar](#decision-quality-bar)

## Current source check

Board data is current only when tied to the reporting period and released source
versions. For each cycle:

1. Obtain the current metric dictionary and reporting policy.
2. Record source extract/query/report IDs, lock timestamps, time zone, currency,
   FX policy, entity scope, exclusions, and restatement state.
3. Reconcile cross-system identities and boundary metrics before calculating
   derivatives. Retain the query or controlled report reference alongside every
   spreadsheet projection.
4. Record metric-owner, source-owner, and finance or data review for the exact
   reporting version.
5. Show whether each value is measured, reported, forecast, preliminary, or
   unavailable, together with its source and material caveat.

## Reporting cycle

1. Scope the meeting, reporting period, and decisions.
2. Confirm definitions and source versions.
3. Reconcile boundaries and calculate the metric table.
4. Explain material variances from the reconciled figures.
5. Tie the narrative and recommendation to those figures.
6. Record decisions, dissent, owners, dates, and follow-up.

Definition changes, preliminary sources, and unreconciled bridges stay visible
beside the affected value. Overdue actions return as named items in the next
cycle.

## Operating method

- Version every metric definition with formula, population,
  period, currency, source, owner, cadence, segment cuts, and caveats.
- Preserve accounting, billing, subscription, CRM, product,
  support, incident, people, cash, and forecast boundaries; reconcile each
  boundary explicitly.
- Publish exact period and source versions with explicit confidence and owner
  review.
- Use cohorts and segments where blended totals can hide
  acquisition mix, churn, expansion, margin, channel, geography, or quality.
- Reconcile every material variance bridge from opening to
  closing value; label residual and data-quality effects explicitly.
- Separate actual, plan, forecast, scenario, and target.
  Label each value with its true class.
- State both absolute and relative movement with the correct
  denominator and comparable window.
- Tie every narrative claim and ask to released metrics,
  counterevidence, material caveats, and a decision implication.
- Capture review with owner, source owner, reviewer,
  timestamp, caveat, and publication decision.
- Show unavailable data with an exact source request;
  board values come from the named source.
- Track decisions, dissent, action owners, due dates,
  evidence required, next review, and close condition.
- Restate history when definitions materially change or
  show a visible comparability break; series joins require compatible definitions.
- Protect sensitive customer, employee, and deal data with
  minimum necessary aggregation and access controls.
- Distinguish observed causal evidence from management
  judgment; a variance decomposition is not automatically causal proof.

## Metric family contract

Use only families relevant to the business model. For every board-requested
metric, state whether it is included, omitted for a business-model reason, or
waiting on an exact source or owner.

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
revenue definition. Put unreconciled residual in its own row with an owner and due date;
`other` remains an explicit, traceable category.

### Variance driver tree

```text
observed variance
-> price | volume | mix | acquisition | activation | expansion | contraction
-> churn | unit cost | timing | one-off | classification | data-quality change
```

For each driver record amount, source, controllability, confidence, owner, and
proposed action. When an amount is unavailable, show the gap and source owner;
complete the reconciliation when the authoritative amount arrives.

## Source review

| Area | Metric owner | Source owner | Reviewer | Source version | Caveat | Ready for board use |
| --- | --- | --- | --- | --- | --- | --- |
| Revenue | Finance leader | Billing/revenue ops | close owner | exact report/version | FX, ramp, usage, restatement | yes / pending source |
| Pipeline | Sales leader | RevOps | FP&A | CRM snapshot/version | stale stages, slips | yes / pending source |
| Product | Product leader | Analytics | data owner | dataset/query version | event/identity drift | yes / pending source |
| Support/reliability | CS/engineering leader | support/incident owner | operating reviewer | report version | severity or impact gap | yes / pending source |
| Cash/runway | Finance leader | accounting/treasury | FP&A | close/cash version | one-offs, forecast basis | yes / pending source |

## Decision quality bar

Each board ask includes:

- the released metric trigger and material caveat;
- the decision deadline and consequence of no decision;
- at least two credible options, or why only one is admissible;
- recommendation, expected metric mechanism, downside, reversibility, and owner;
- dissent or counterevidence;
- follow-up evidence, due date, next review, and close condition.
