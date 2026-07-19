---
name: product-experiment-review
description: "Design or audit one decision-grade product experiment protocol and learning memo covering the decision, mechanism, estimand, eligibility, assignment, exposure, interference, metrics, maturity, sample plan, guardrails, stopping, analysis, and action rule. Use for A/B tests, holdouts, switchbacks, cluster or staged experiments in product, growth, pricing, lifecycle, marketplace, game, and AI surfaces. Do not use for feature-flag engineering, instrumentation implementation, rollout without a causal question, or choosing the underlying product strategy."
---

# Product Experiment Review

Turn a product uncertainty into a valid decision protocol. Prefer no experiment
over an experiment that cannot change a decision or support its causal claim.

## Workflow

1. State the decision, treatment, target population, mechanism, plausible harm,
   decision deadline, and what action follows positive, negative, harmful,
   invalid, and inconclusive results.
2. Establish current authority: product treatment spec, governed metric
   definitions, assignment/exposure capabilities, baseline and variance data,
   overlapping tests, release calendar, policy constraints, and domain-owner
   approvals. Mark missing inputs; do not invent sample sizes or thresholds.
3. Read `references/product-experiment-systems.md`.
   For logged-policy or counterfactual evaluation, also read
   `references/counterfactual-evaluation.md`.
4. Define the estimand and unit: eligible population, assignment unit, exposure,
   analysis unit, comparison, outcome window, noncompliance handling, and whether
   spillover, network effects, carryover, or shared inventory violate independence.
5. Select a design—individual or cluster randomization, holdout, switchback,
   interleaving, geo/time design, qualitative pilot, observational follow-up, or
   no test—whose assumptions match the product system.
6. Pre-register one decision metric, invariant checks, harm guardrails,
   diagnostics, maturity window, minimum detectable effect or precision target,
   sequential/peeking policy, segment plan, and exact decision rule.
7. Specify assignment and analysis integrity: stable experiment ID, mutual
   exclusion, sticky assignment, exposure semantics, sample-ratio mismatch,
   contamination, late events, attrition, bot/test traffic, and intention-to-treat.
8. Define agent-first operation: machine-validate the spec, auto-block invalid
   launch, auto-pause breached guardrails, wait for maturity, run the sealed
   analysis, apply only predeclared decisions, retain the trace, and expire test
   artifacts. Engineering owns flags, allocation, deployment, and rollback.
9. Produce the experiment protocol, implementation handoffs, machine decision
   contract, analysis/learning memo, and cleanup or follow-up action.

## Source verification

Use the current treatment artifact, governed metric dictionary, assignment and
exposure contract, baseline/variance dataset, active-experiment map, and domain
policy as authority. Preserve exact versions and periods. Missing or stale inputs
block sizing or launch; authored examples and prior test results are not current
evidence for this experiment.

## Routing boundaries

- The owning engineering project and `delivery-standard` own feature flags, assignment
  services, exposure infrastructure, deployment, rollback, and production proof.
- `product-analytics-instrumentation-review` owns event, identity, warehouse,
  metric-pipeline, and QA implementation; this skill states measurement needs.
- Domain specialists own the treatment: pricing, notifications, game economy,
  marketplace policy, AI behavior, accessibility, privacy, and support.
- Use `market-research-synthesis` when the uncertainty requires sourced market
  research rather than controlled product exposure.
- A staged rollout is not automatically an experiment. Use this skill only when
  a causal or comparative learning decision is explicitly designed.

## Guardrails

- Do not experiment when the result cannot change the decision, the effect is
  too slow or rare to observe, or the treatment is unsafe, deceptive, unlawful,
  non-consensual, or impractical to reverse and contain.
- Do not choose metrics after seeing movement, repeatedly peek without a sealed
  sequential rule, or search segments until one wins.
- Do not filter post-assignment users, analyze only accepters/completers, or hide
  sample-ratio mismatch, contamination, missingness, attrition, or crossover.
- Do not call a pre/post rollout causal without a credible comparison and tested
  assumptions. Novelty, seasonality, interference, and concurrent changes matter.
- Do not let a primary-metric win override trust, safety, privacy, accessibility,
  payment, support, retention, fairness, or reliability guardrails.
- Do not keep harmful, stale, or decision-complete exposure running merely to
  collect more data; apply the predeclared pause/stop/cleanup state.

## Output

```text
Decision and treatment:
- decision / mechanism / population / alternatives / domain-owner artifact

Experiment contract:
| Field | Decision |
| --- | --- |
| Estimand | population / comparison / outcome / window |
| Assignment and exposure | unit / eligibility / sticky rule / exposure event |
| Design assumptions | independence / spillover / carryover / contamination |
| Metrics | decision metric / invariants / guardrails / diagnostics / maturity |
| Precision | baseline source / MDE or precision target / approved plan |
| Decision rule | invalid / harm / positive / negative / inconclusive actions |

Machine operation and handoffs:
- preflight / launch block / guardrail pause / mature close / analysis / cleanup
- owner / exact artifact / acceptance condition / blocked fact

Learning memo:
- assignment integrity / effect and uncertainty / guardrails / caveats / decision
```
