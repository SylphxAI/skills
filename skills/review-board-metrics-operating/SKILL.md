---
name: review-board-metrics-operating
description: "Review board metrics operating and produce one actionable assessment."
---

# review-board-metrics-operating

# Review Board Metrics Operating Review

Turn source-backed operating metrics into decisions. Missing data remains explicitly marked until its
authoritative source supplies the board number.

## Workflow

1. Define the meeting, audience, reporting period, decision calendar, prior
   commitments, material risks, and board decisions required.
2. Read `references/board-metrics-operating-patterns.md`.
3. Confirm current sources at use: metric dictionary/version, locked source
   extracts, finance close state, billing/CRM/product/support/incident sources,
   forecast version, currency/FX policy, and owner attestations.
4. Build the board metric table. For every requested metric, record definition,
   source, period, actual, plan, prior comparator, segment/cohort cut, caveat,
   confidence, owner, and release status.
5. Reconcile boundary metrics before narrating them: accounting versus billing,
   bookings versus revenue, contracts versus subscriptions, product identity
   versus CRM account, gross margin cost allocation, and pipeline forecast.
6. Explain material variance through a driver bridge and counterfactual: price,
   volume, mix, acquisition, activation, expansion, contraction, churn, cost,
   timing, one-offs, or data-quality change. Preserve arithmetic reconciliation.
7. Link each narrative claim and board ask to released evidence. Present credible
   alternatives, recommendation, downside, owner, due date, and close condition.
8. Show unavailable or preliminary values with the reason, source owner, and
   expected resolution. Use symbolic formulas until the source value is ready.
   Fictional demonstrations use a clearly identified user-supplied dataset.
9. Produce the board snapshot, variance bridge, confidence notes, decision memo,
   and action list.

## Source verification

- Require exact locked extracts, metric and forecast versions, reporting
  periods, identity and currency rules, close state, derivation queries, and
  named owner signoff for every released value or claim.
- Treat current finance, billing, CRM, analytics, support, and incident owners
  as separate authorities. Reconcile them explicitly; each metric cites its owning system rather than
  inheriting authority from a dashboard or prior board deck.
- Preserve supplied source bytes and calculation lineage. Show missing,
  preliminary, stale, irreconcilable, or unsigned facts with their source issue
  and owner.

## Path

- Current-period values, benchmarks, forecasts, confidence, signoff, and variance drivers come from locked sources.
- A derived metric ships with definition, period, population, source, and reconciliation status.
- Missed plan stays visible. Growth, percentages, denominators, and cohort windows stay comparable.
- Signoff records who signed which version, when, against which caveat and source lock.
- Financial/accounting classifications stay distinct from product-operating judgment. Authorized finance review is named where required.
- The cycle ends with decisions, dissent, actions, owners, due dates, required evidence, and close conditions.

## Output

```text
Board cycle and decision context:
- period / audience / prior commitments / decisions required / release status

Board metric table:
| Metric | Definition/version | Source lock | Actual | Plan | Prior | Variance | Confidence | Owner signoff | Release |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
Unavailable values show their reason and source owner; published values come from their authoritative source.

Reconciliation and variance bridge:
| Bridge | Opening | Drivers | Closing | Reconciles | Evidence | Owner |
| --- | ---: | --- | ---: | --- | --- | --- |

Segment/cohort and forecast readback:
- cut / signal / caveat / decision implication

Board decisions and asks:
| Decision | Trigger evidence | Options | Recommendation | Downside | Owner | Due |
| --- | --- | --- | --- | --- | --- | --- |

Data requests and actions:
| Item | Source owner | Exact evidence/version | Due | Release effect | Close condition |
| --- | --- | --- | --- | --- | --- |
```
