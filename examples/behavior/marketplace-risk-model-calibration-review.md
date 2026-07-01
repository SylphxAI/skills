# marketplace-risk-model-calibration-review behavior example

skill: marketplace-risk-model-calibration-review

## Positive prompt

> Calibrate a marketplace risk model for fraud, payout holds, fake listings, buyer abuse, seller scams, low-quality submissions, review priority, false positives, appeals, fairness, drift, reviewer QA, and policy feedback.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines affected actions, label sources, ground truth, thresholds, queue routing, human review, appeals, fairness checks, drift monitoring, reviewer QA, policy feedback, and safe rollout plan.
- Separates fraud, abuse, quality, payout, listing, buyer, seller, ranking, dispute, account takeover, and policy-violation risk signals.
- Flags automated final decisions, loss-only optimization, threshold leakage, label noise, queue overload, fairness blind spots, appeal gaps, reviewer drift, and calibration drift.

It should also produce the artifact shape requested by `skills/marketplace-risk-model-calibration-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review enterprise role lifecycle.

The skill should not load for this prompt unless the user adds an explicit marketplace-risk-model-calibration-review context.

## Expected behavior

- Defines affected actions, label sources, ground truth, thresholds, queue routing, human review, appeals, fairness checks, drift monitoring, reviewer QA, policy feedback, and safe rollout plan.
- Separates fraud, abuse, quality, payout, listing, buyer, seller, ranking, dispute, account takeover, and policy-violation risk signals.
- Flags automated final decisions, loss-only optimization, threshold leakage, label noise, queue overload, fairness blind spots, appeal gaps, reviewer drift, and calibration drift.
