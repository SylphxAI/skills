# marketplace-seller-performance-review behavior example

skill: marketplace-seller-performance-review

## Positive prompt

> Review marketplace seller performance for an AI app marketplace with new sellers, quality scores, refunds, disputes, support burden, ranking demotions, badges, warnings, payout holds, appeals, fraud signals, and fairness monitoring.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines seller categories, lifecycle stage, quality dimensions, signal freshness, thresholds, confidence, interventions, ranking impact, appeal path, and fairness metrics.
- Includes cold-start handling, category normalization, coaching, warnings, demotion, payout holds, suspension, reinstatement, and policy feedback loops.
- Flags opaque punishment, revenue bias, cold-start burying, leaked fraud signals, no appeal path, and volume rewarded despite buyer harm.

It should also produce the artifact shape requested by `skills/marketplace-seller-performance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design enterprise account governance.

The skill should not load for this prompt unless the user adds an explicit marketplace-seller-performance-review context.

## Expected behavior

- Defines seller categories, lifecycle stage, quality dimensions, signal freshness, thresholds, confidence, interventions, ranking impact, appeal path, and fairness metrics.
- Includes cold-start handling, category normalization, coaching, warnings, demotion, payout holds, suspension, reinstatement, and policy feedback loops.
- Flags opaque punishment, revenue bias, cold-start burying, leaked fraud signals, no appeal path, and volume rewarded despite buyer harm.
