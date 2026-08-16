---
name: prototype-product
description: "Run the smallest real prototype that can change a product decision. Use when a cheap interactive probe is needed before committing to a build; use explore-product-space for concept families and build-product for an accepted vertical slice."
---

# Prototype Product

Run the smallest real probe that can change a product decision.

## Method

1. State one hypothesis or open question, the target users or players, the
   observation that changes the decision, the time box, and the scope.
2. Review prior work and analogues until the probe choice is clear.
3. Compare two or three probe options and select the lowest-cost one that
   exposes the important uncertainty.
4. Build the minimum interactive or observable slice in the real product
   environment when practical. Mark placeholder and disposable work clearly.
5. Run or show the slice to the relevant system or participants.
6. Record the observation and choose `continue`, `stop`, `pivot`, or
   `run another probe`.

## Output

Return the hypothesis, probe, observed result, decision, and next work kind.

A public demo can use `deploy-ephemeral-web-preview`. A probe that specifically
tests managed infrastructure can use `wire-managed-backend-services`.
