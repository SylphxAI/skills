---
name: design-product-experiment
description: 'Turn a product uncertainty into a pre-registered experiment protocol with an estimand, assignment, guardrails, and a decision rule. Use when the result must be able to change a decision, not when the job is only a go/no-go review.'
---

# Design Product Experiment

Turn a product uncertainty into a valid decision protocol. Run an experiment
only when its result can change a decision and its design supports the causal claim.

## Workflow

1. State the decision, treatment, target population, mechanism, plausible harm,
   decision deadline, and what action follows positive, negative, harmful,
   invalid, and inconclusive results.
2. Confirm the current sources: product treatment spec, governed metric
   definitions, assignment/exposure capabilities, baseline and variance data,
   overlapping tests, release calendar, policy constraints, and domain-owner
   approvals. Mark missing inputs; sample sizes and thresholds require the
   current authorized statistical inputs.
3. Read [product experiment systems](references/product-experiment-systems.md).
   For logged-policy or counterfactual evaluation, also read
   [counterfactual evaluation](references/counterfactual-evaluation.md).
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
8. Define experiment operations: validate the spec, hold an invalid launch,
   pause breached guardrails, wait for maturity, run the predeclared analysis,
   apply the stated decision rule, retain the trace, and expire test artifacts.
   Engineering owns flags, allocation, deployment, and rollback.
9. Produce the experiment protocol, implementation handoffs, machine decision
   contract, analysis/learning memo, and cleanup or follow-up action.

## Current sources

Use the current treatment artifact, governed metric dictionary, assignment and
exposure contract, baseline/variance dataset, active-experiment map, and domain
policy as authority. Preserve exact versions and periods. Missing or stale inputs
block sizing or launch; authored examples and prior test results are not current
evidence for this experiment.

## Routing boundaries

- The owning product repository and release path own feature flags, assignment
  services, exposure infrastructure, deployment, rollback, and production proof.
- The owning product repository owns event, identity, warehouse,
  metric-pipeline, and QA implementation; this pack states measurement needs.
- Domain specialists own the treatment: pricing, notifications, game economy,
  marketplace policy, AI behavior, accessibility, privacy, and support.
- Use `synthesize-market-research` when the uncertainty requires sourced market
  research rather than controlled product exposure.
- A staged rollout is not automatically an experiment. Use this skill only when
  a causal or comparative learning decision is explicitly designed.

## Principles

- Run an experiment when the result can change the decision, the effect is observable, and the treatment is safe, consented, lawful, and containable.
- Metrics and sequential rules are sealed before movement. Segments are predeclared.
- Analyze the assigned cohort. Report sample-ratio mismatch, contamination, missingness, attrition, and crossover.
- Causal claims use a credible comparison and tested assumptions. Novelty, seasonality, interference, and concurrent changes stay in the readout.
- A primary-metric win keeps trust, safety, privacy, accessibility, payment, support, retention, fairness, and reliability level or better.
- Pause, stop, and cleanup follow the predeclared state when exposure is harmful, stale, or decision-complete.

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
