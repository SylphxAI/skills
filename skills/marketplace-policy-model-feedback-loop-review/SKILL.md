---
name: marketplace-policy-model-feedback-loop-review
description: Design and audit marketplace policy and model feedback loops for AI, app, creator, plugin, and seller marketplaces covering policy taxonomy, model signals, reviewer labels, enforcement actions, appeals, dispute outcomes, false positives, false negatives, drift, policy changes, model retraining, release gates, and user-facing explanations. Use when automated or assisted enforcement must learn without becoming opaque or unfair.
---

# Marketplace Policy Model Feedback Loop Review

Use this skill to convert marketplace policy, model feedback loop, enforcement model, reviewer labels, appeal outcomes, policy taxonomy, false positives, false negatives, model drift, policy rollout, and marketplace trust questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify policy taxonomy, model outputs, reviewer workflow, enforcement actions, appeal paths, label sources, policy changes, affected segments, release gates, monitoring metrics, and user-facing explanation boundaries.
2. Read `references/marketplace-policy-model-feedback-loop-patterns.md`.
3. Classify the situation as new policy launch, model-assisted enforcement, appeal reversal spike, policy taxonomy cleanup, model drift review, reviewer-label QA, new abuse pattern, or enforcement rollout.
4. Define policy-model contract, label schema, reviewer QA, appeal feedback, drift monitoring, retraining criteria, policy change release gate, explanation policy, and marketplace health guardrails.
5. Produce policy/model feedback-loop review, state machine, decision table, event schema, label checklist, release gate, and enforcement learning plan.

## Guardrails

- Do not let model scores silently redefine marketplace policy.
- Do not retrain on reviewer labels without auditing label quality, appeal reversals, and policy-version context.
- Do not expose adversarial signals, thresholds, or evasion tactics in user-facing explanations.
- Do not optimize enforcement only for violation catch rate while ignoring false positives, appeals, fairness, creator trust, and marketplace liquidity.

## Output format

```text
Marketplace policy/model context:
Audience / source of truth / risk boundary:

Feedback-loop governance plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Policy taxonomy, model signals, labels, appeals, drift, release gates, explanations, and marketplace guardrails:
- <trigger> -> <policy, metric, edge case, support note>
```
