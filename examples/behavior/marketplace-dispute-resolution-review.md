# marketplace-dispute-resolution-review behavior example

skill: marketplace-dispute-resolution-review

## Positive prompt

> Design marketplace dispute resolution for an AI skill marketplace handling buyer refund claims, creator payout holds, quality mismatch evidence, chargebacks, appeals, reviewer independence, fraud risk, and fairness monitoring.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies dispute type, parties, listing or transaction, policy claim, evidence, financial exposure, temporary action, reviewer role, appeal path, and fraud risk.
- Includes payout/refund rules, communication templates, reviewer independence, sensitive-signal protection, fairness metrics, and policy feedback loops.
- Flags biased dispute economics, enforcement without evidence, exposed fraud signals, missing appeals, and unresolved patterns outside quality/ranking improvements.

It should also produce the artifact shape requested by `skills/marketplace-dispute-resolution-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan security changelog disclosure.

The skill should not load for this prompt unless the user adds an explicit marketplace-dispute-resolution-review context.

## Expected behavior

- Classifies dispute type, parties, listing or transaction, policy claim, evidence, financial exposure, temporary action, reviewer role, appeal path, and fraud risk.
- Includes payout/refund rules, communication templates, reviewer independence, sensitive-signal protection, fairness metrics, and policy feedback loops.
- Flags biased dispute economics, enforcement without evidence, exposed fraud signals, missing appeals, and unresolved patterns outside quality/ranking improvements.
