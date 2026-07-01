# marketplace-policy-model-feedback-loop-review behavior example

skill: marketplace-policy-model-feedback-loop-review

## Positive prompt

> Review a marketplace policy/model feedback loop for AI app enforcement with policy taxonomy, model risk signals, reviewer labels, fake listings, seller scams, appeal reversals, false positives, drift, policy changes, retraining gates, user explanations, and marketplace health metrics.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines policy taxonomy, model-signal mapping, label schema, reviewer QA, enforcement actions, appeals, dispute feedback, drift monitoring, retraining criteria, release gates, explanation boundaries, and marketplace health guardrails.
- Separates policy wording, model output, threshold calibration, reviewer guidance, enforcement action, appeal learning, retraining, and product-control changes.
- Flags model-score-as-policy, label noise, appeal gaps, threshold leakage, loss-only optimization, fairness blind spots, overfitting, reviewer drift, and trust/liquidity harm.

It should also produce the artifact shape requested by `skills/marketplace-policy-model-feedback-loop-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review partner SPIF disputes.

The skill should not load for this prompt unless the user adds an explicit marketplace-policy-model-feedback-loop-review context.

## Expected behavior

- Defines policy taxonomy, model-signal mapping, label schema, reviewer QA, enforcement actions, appeals, dispute feedback, drift monitoring, retraining criteria, release gates, explanation boundaries, and marketplace health guardrails.
- Separates policy wording, model output, threshold calibration, reviewer guidance, enforcement action, appeal learning, retraining, and product-control changes.
- Flags model-score-as-policy, label noise, appeal gaps, threshold leakage, loss-only optimization, fairness blind spots, overfitting, reviewer drift, and trust/liquidity harm.
