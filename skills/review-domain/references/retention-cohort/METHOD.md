# Review a Retention Cohort

Explain who returned for which value and what evidence-backed product action
should change. Validate the denominator and value event before optimization.

## Workflow

1. Define the decision, analysis unit, cohort-entry event, eligibility rule,
   retained value event, product-loop cadence, observation window, time zone,
   identity model, and comparison population.
2. Read `retention-cohort-systems.md`.
3. Verify current telemetry authority at use: event dictionary/revision, query or
   dataset version, bot/test filtering, consent and deletion treatment, identity
   stitching, late events, release calendar, and instrumentation changes.
4. Select and label the metric family: exact-period/classic retention, rolling
   retention, bracket/bounded return, survival, hazard, renewal, repeat purchase,
   or frequency. Compare series only when they share the same definition.
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

## Current sources

- Resolve the exact event dictionary and revision, query or dataset version,
  identity rules, eligibility, bot/test filters, consent/deletion treatment,
  time zone, late-event handling, release exposure, and observation cutoff for
  every cohort compared.
- Prefer canonical event contracts, reproducible queries, locked extracts, and
  observed product/release records. A dashboard screenshot or remembered metric
  definition is a lead; the current metric owner supplies the operational definition.
- Mark immature, censored, underpowered, non-comparable, stale, or mixed-source
  cohorts explicitly. Causality, statistical confidence, and current values stay
  unset until their required evidence is available.

## Principles

- The retained action is recurring value. App open, login, and subscription are supporting context unless they prove that value.
- Not-yet-observable users stay in the denominator as not-yet-observable. Unfavorable users stay in the cohort.
- Causal claims use a comparison beyond a blended pre/post curve.
- Changed event definitions, identity rules, time zones, or eligibility get a visible comparability break or restatement.
- Return comes from product value. Pair retention with satisfaction/trust, support, refunds, safety, accessibility, performance, margin, and notification opt-out.

## Output

```text
Decision and metric contract:
- unit / cohort entry / eligibility / retained value / cadence / metric type / window

Data sources and quality:
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
