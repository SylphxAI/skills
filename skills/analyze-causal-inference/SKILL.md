---
name: analyze-causal-inference
description: "Estimate a causal effect with an explicit estimand, identification assumptions, design, diagnostics, and sensitivity. Use when the user asks whether a change caused an outcome, for difference-in-differences, IV, or target-trial emulation. Do not use to register a product experiment, forecast an unresolved future event, or critique a present explanation."
---

# Analyze Causal Inference

Name the estimand before choosing an estimator. If identification fails, say `not identified` instead of reporting a number. A narrow interval around a biased estimate is not strong causal evidence.

Open [causal inference methods](references/causal-inference-methods.md) when choosing an adjustment set, design, or sensitivity method.

Use `design-product-experiment` when assignment can still be designed. Use `forecast-with-calibration` for a future event. Use `analyze-system-dynamics` when the question is mechanism over time rather than one contrast.
