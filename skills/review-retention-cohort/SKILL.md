---
name: review-retention-cohort
description: "Review: retention cohorts—measurement, drivers, interventions."
---

# Review Retention Cohort Review

Explain who returned for which value and what evidence-backed product action
should change. Do not optimize a chart whose denominator or value event is wrong.

## Workflow

1. Define the decision, analysis unit, cohort-entry event, eligibility rule,
   retained value event, product-loop cadence, observation window, time zone,
   identity model, and comparison population.
2. Read `references/retention-cohort-systems.md`.
3. Verify current telemetry authority at use: event dictionary/revision, query or
   dataset version, bot/test filtering, consent and deletion treatment, identity
   stitching, late events, release calendar, and instrumentation changes.
4. Select and label the metric family: exact-period/classic retention, rolling
   retention, bracket/bounded return, survival, hazard, renewal, repeat purchase,
   or frequency. Do not compare different definitions as one series.
5. Audit denominator eligibility, cohort maturity, right censoring, interval
   boundaries, duplicate identities, reinstall/account merges, and sample
   uncertainty before diagnosing movement.
6. Decompose the change into acquisition/segment mix and within-segment movement.
   Inspect activation, feature exposure, performance, content, collaboration,
   social, lifecycle messaging, pricing, support, seasonality, and version effects.
7. Separate observation from causality. Tie candidate mechanisms to product or
   operational changes, then rank hypotheses by evidence, reach, reversibility,
   expected movement, and harm guardrails.
8. Define experiments or observational follow-ups with eligible population,
   expected cohort movement, measurement window, power/precision requirement,
   interference risk, and quality/economic guardrails.
9. Produce the metric contract, data-quality verdict, cohort decomposition,
   diagnosis, hypotheses, experiment plan, and instrumentation handoff.

## Source verification

- Resolve the exact event dictionary and revision, query or dataset version,
  identity rules, eligibility, bot/test filters, consent/deletion treatment,
  time zone, late-event handling, release exposure, and observation cutoff for
  every cohort compared.
- Prefer canonical event contracts, reproducible queries, locked extracts, and
  observed product/release records. A dashboard screenshot or remembered metric
  definition is a lead, not current authority.
- Mark immature, censored, underpowered, non-comparable, stale, or mixed-source
  cohorts explicitly. Do not fabricate causality, statistical confidence, or a
  current value to complete the analysis.

## Guardrails

- Never use app open, login, or an active subscription as the retained action by
  default when they do not prove recurring value.
- Never count not-yet-observable users as churned or silently drop unfavorable
  users from the denominator.
- Never infer product causality from a blended pre/post curve alone.
- Never compare cohorts across changed event definitions, identity rules, time
  zones, or eligibility without a visible comparability break or restatement.
- Never improve short-term return through spam, dark patterns, unwanted
  notifications, exploitative rewards, or cancellation friction.
- Pair retention with user value, satisfaction/trust, support, refunds, safety,
  accessibility, performance, margin, and notification opt-out as applicable.

## Output

```text
Decision and metric contract:
- unit / cohort entry / eligibility / retained value / cadence / metric type / window

Authority and data-quality ledger:
| Input | Version/source | Status | Comparability issue | Decision effect | Owner |
| --- | --- | --- | --- | --- | --- |

Cohort readout:
| Cohort/segment | Eligible N | Observable N | Retention/hazard | Uncertainty | Delta | Caveat |
| --- | ---: | ---: | ---: | --- | ---: | --- |

Mix and mechanism decomposition:
- acquisition/segment mix / within-segment movement / lifecycle mechanism / evidence

Actions and experiments:
| Hypothesis | Mechanism | Target cohort | Change | Expected movement | Guardrails | Evidence plan |
| --- | --- | --- | --- | --- | --- | --- |

Instrumentation and authority gaps:
- requirement / owning specialist / exact evidence / blocked conclusion
```
