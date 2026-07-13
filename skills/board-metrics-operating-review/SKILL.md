---
name: board-metrics-operating-review
description: "Prepare or audit the operating-metrics evidence packet behind a board or executive review: metric definitions, source reconciliation, period snapshots, cohort and segment cuts, variance bridges, forecast confidence, owner signoff, decisions, and action closure. Use when leadership needs board-ready operating truth. Do not use to invent company numbers, produce audited financial statements, design product analytics instrumentation, analyze one retention chart, or write investor persuasion detached from evidence."
---

# Board Metrics Operating Review

Turn source-backed operating metrics into decisions. Never turn missing data into
plausible-looking board numbers.

## Workflow

1. Define the meeting, audience, reporting period, decision calendar, prior
   commitments, material risks, and board decisions required.
2. Read `references/board-metrics-operating-patterns.md`.
3. Establish current authority at use: metric dictionary/version, locked source
   extracts, finance close state, billing/CRM/product/support/incident sources,
   forecast version, currency/FX policy, and owner attestations.
4. Build a metric-release ledger. For every requested metric, record definition,
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
8. If values are absent or unlocked, emit `not_provided`/`not_released` cells,
   a source request register, symbolic formulas, and a blocked release decision.
   Do not generate example values unless the user explicitly supplies a sealed
   fictional dataset and asks for a fictional demonstration.
9. Produce the released snapshot or blocked release packet, variance bridge,
   confidence ledger, board decision memo, and action register.

## When not to use

- For a single retention diagnosis, use `retention-cohort-review`.
- For analytics event design or pipeline QA, use
  `product-analytics-instrumentation-review`.
- For subscription pricing/packaging decisions, use `saas-subscription-pricing`;
  consume its approved decision rather than recreating it here.
- For audited accounts, tax, securities disclosure, or legal assurance, prepare
  source mappings and open questions but defer authoritative conclusions.
- For narrative-only rewriting, preserve the released facts and use the
  appropriate editing skill; do not let prose change metric meaning.

## Source verification

- Require exact locked extracts, metric and forecast versions, reporting
  periods, identity and currency rules, close state, derivation queries, and
  named owner signoff for every released value or claim.
- Treat current finance, billing, CRM, analytics, support, and incident owners
  as separate authorities. Reconcile them explicitly; never use one dashboard
  or prior board deck as silent authority for another system.
- Preserve supplied source bytes and calculation lineage. Missing, unlocked,
  stale, irreconcilable, or unsigned facts remain blocked cells rather than
  estimates generated for narrative completeness.

## Guardrails

- Never fabricate or interpolate a current-period value, benchmark, forecast,
  confidence, signoff, or variance driver.
- Never release a derived metric whose definition, period, population, source,
  or reconciliation status is unresolved.
- Never hide a missed plan behind blended growth, percentage-only reporting,
  changed denominators, or selective cohort windows.
- Never present owner signoff as a sentence; retain who signed which version,
  when, against which caveat and source lock.
- Keep financial/accounting classifications distinct from product-operating
  judgment, and identify where authorized finance review is required.
- Never end with discussion themes only. Record decisions, dissent, actions,
  owners, due dates, required evidence, and close conditions.

## Output

```text
Board cycle and decision context:
- period / audience / prior commitments / decisions required / release status

Metric release ledger:
| Metric | Definition/version | Source lock | Actual | Plan | Prior | Variance | Confidence | Owner signoff | Release |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
Use `not_provided` or `not_released:<reason>`; never substitute illustrative values.

Reconciliation and variance bridge:
| Bridge | Opening | Drivers | Closing | Reconciles | Evidence | Owner |
| --- | ---: | --- | ---: | --- | --- | --- |

Segment/cohort and forecast readback:
- cut / signal / caveat / decision implication

Board decisions and asks:
| Decision | Trigger evidence | Options | Recommendation | Downside | Owner | Due |
| --- | --- | --- | --- | --- | --- | --- |

Data requests and action register:
| Item | Source owner | Exact evidence/version | Due | Release effect | Close condition |
| --- | --- | --- | --- | --- | --- |
```
