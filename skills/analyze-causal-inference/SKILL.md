---
name: analyze-causal-inference
description: Estimate the causal effect of an intervention using an explicit estimand, identification assumptions, suitable design, diagnostics, and sensitivity analysis.
---

# Analyze Causal Inference

Turn a causal question into an identified analysis whose assumptions and limits are visible.

## Method

1. Define the intervention, comparator, population, outcome, time zero, follow-up horizon, and target estimand.
2. Establish temporal order and draw the causal assumptions. Mark confounders, mediators, colliders, selection, interference, measurement error, and time-varying treatment where relevant.
3. Describe the target experiment: eligibility, assignment, follow-up, outcome, contrast, and analysis plan.
4. Select a design that matches the assignment process and available data: randomized experiment, adjustment, matching, target-trial emulation, difference-in-differences, regression discontinuity, instrumental variables, or another identified strategy.
5. State the identification assumptions and data requirements before estimation.
6. Check overlap, balance, exposure integrity, missingness, model dependence, design-specific diagnostics, negative controls, alternative specifications, and sensitivity to unmeasured bias.
7. Estimate the effect with uncertainty and explain the population, time, and settings to which it can transport.
8. Label the result according to the design's actual identification strength.

Read [Causal inference methods](references/causal-inference-methods.md) when selecting adjustment sets, study designs, estimators, or sensitivity methods. A product A/B or holdout protocol belongs to `design-product-experiment`.

## Output

Return the causal question, estimand, causal model, design, assumptions, diagnostics, estimate, uncertainty, sensitivity, transportability, and conclusion.

Use `analyze-critically` for competing explanations about a specific event and `analyze-system-dynamics` for feedback, delays, and accumulations over time.
