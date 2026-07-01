# marketplace-fraud-review-queue-review behavior example

skill: marketplace-fraud-review-queue-review

## Positive prompt

> Review a marketplace fraud queue for an AI app marketplace with payout holds, refund abuse, fake reviews, chargebacks, seller scams, account takeover signals, queue priority, reviewer evidence, appeals, QA sampling, and fairness monitoring.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines fraud surfaces, signal sources, entities, risk tiers, financial exposure, evidence packages, queue priority, reviewer actions, SLAs, appeals, QA, and policy/model feedback.
- Separates payout holds, refund abuse, fake reviews, chargebacks, account takeover, collusion, listing scams, buyer abuse, and seller abuse.
- Flags leaked fraud signals, revenue-biased decisions, automated scores as final decisions, loss-only optimization, weak appeals, and false-positive blind spots.

It should also produce the artifact shape requested by `skills/marketplace-fraud-review-queue-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review enterprise admin permissions.

The skill should not load for this prompt unless the user adds an explicit marketplace-fraud-review-queue-review context.

## Expected behavior

- Defines fraud surfaces, signal sources, entities, risk tiers, financial exposure, evidence packages, queue priority, reviewer actions, SLAs, appeals, QA, and policy/model feedback.
- Separates payout holds, refund abuse, fake reviews, chargebacks, account takeover, collusion, listing scams, buyer abuse, and seller abuse.
- Flags leaked fraud signals, revenue-biased decisions, automated scores as final decisions, loss-only optimization, weak appeals, and false-positive blind spots.
