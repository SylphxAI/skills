---
name: analyze-causal-inference
description: "Estimate causal effects: identification, estimators, robustness bounds."
---

# Analyze Causal Inference

Turn a causal claim into an explicit intervention, estimand, identification
argument, and falsifiable analysis. Read
[references/causal-inference-methods.md](references/causal-inference-methods.md)
before choosing a design or adjustment strategy.

## Workflow

1. Define the intervention or exposure, comparator, population, outcome, time
   zero, follow-up horizon, and target estimand. Reject vague verbs such as
   “impact” until the counterfactual contrast is clear.
2. Establish temporal ordering and draw the causal assumptions. Distinguish
   confounders, mediators, colliders, selection mechanisms, measurement error,
   interference, and time-varying treatment or confounding.
3. Emulate the target experiment conceptually even when only observational data
   are available: eligibility, assignment strategy, follow-up, outcome, causal
   contrast, and analysis plan.
4. Select a design whose assumptions fit the data and assignment process.
   Prefer randomized evidence when ethical and feasible; otherwise justify
   adjustment, matching, target-trial emulation, difference-in-differences,
   regression discontinuity, instrumental variables, or another identified
   strategy rather than choosing by fashion.
5. State the identification assumptions and data requirements before analysis.
   Never adjust mechanically for every observed variable or condition on a
   mediator or collider without a causal reason.
6. Check overlap, balance, assignment and exposure integrity, missingness,
   model dependence, pre-trends or design-specific diagnostics, negative
   controls, alternative specifications, and sensitivity to unmeasured bias.
7. Report the estimate with uncertainty, assumptions, diagnostics, limits on
   transportability, and plausible alternative explanations. `Not identified`
   is a valid result when the evidence cannot support the causal claim.

## Output

Produce a **Causal Inference Record**:

- **Causal question** — intervention, comparator, population, outcome, horizon,
  and estimand.
- **Causal model** — DAG or equivalent assumptions, timing, assignment,
  interference, measurement, and selection.
- **Identification and design** — strategy, required assumptions, data, and
  why alternatives were rejected.
- **Analysis and diagnostics** — estimate, uncertainty, robustness, negative
  controls, sensitivity, and unresolved threats.
- **Claim boundary** — supported causal statement, non-supported statements,
  transportability, and evidence that would change the conclusion.


## Progressive disclosure

- [references/causal-inference-methods.md](references/causal-inference-methods.md) — open when needed for depth

## Boundaries

- Use `../review-domain/references/product-experiment/` to design or audit a product A/B test,
  holdout, switchback, or staged experiment protocol.
- Use `analyze-critically` for competing explanations or software root-cause
  diagnosis without a population-level intervention estimand.
- Use `analyze-system-dynamics` for feedback, delay, accumulation, and policy
  resistance over time.
- Use `../review-domain/references/product-analytics-instrumentation/` for event definitions and data pipelines;
  measurement availability alone does not identify a causal effect.
- Never convert association, prediction accuracy, temporal order, or a causal
  diagram by itself into a causal claim.
