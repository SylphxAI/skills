---
name: design-product-experiment
description: "Turn a product uncertainty into a pre-registered experiment protocol with an estimand, assignment, guardrails, and a decision rule. Use when the result must be able to change a decision. A staged rollout is not automatically an experiment. Do not use to estimate an already-identified observational effect or to run a demo without assignment."
---

# Design Product Experiment

A staged rollout is not an experiment. Seal the decision metric and rule before movement. Analyze the assigned cohort. Inconclusive is a legal result; peeking a winner is not.

Open [product experiment systems](references/product-experiment-systems.md) for assignment, guardrails, and readout. Open [counterfactual evaluation](references/counterfactual-evaluation.md) for logged-policy evaluation.

Use `prototype-product` when the cheapest discriminating probe is not a randomized assignment. Use `analyze-causal-inference` when the assignment already happened and must be identified after the fact.
