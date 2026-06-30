# marketplace-trust-safety-economics-review behavior example

skill: marketplace-trust-safety-economics-review

## Positive prompt

> Review trust-safety economics for a creator marketplace with ranking boosts, payouts, refunds, disputes, ratings, quality gates, fraud risk, appeals, take rate, and moderation cost.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Models buyer/seller/platform incentives, quality gates, ranking/payout guardrails, disputes, refunds, enforcement ladder, appeals, and trust-health unit economics.
- Includes fraud, spam, review manipulation, refund abuse, payout abuse, low-quality supply, collusion, moderation cost, false positives, and liquidity metrics.
- Flags GMV-only optimization, harmful incentives, payout-before-risk controls, no appeals, hidden moderation costs, and ranking gaming.

It should also produce the artifact shape requested by `skills/marketplace-trust-safety-economics-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design admin audit logs for SSO changes.

The skill should not load for this prompt unless the user adds an explicit marketplace-trust-safety-economics-review context.

## Expected behavior

- Models buyer/seller/platform incentives, quality gates, ranking/payout guardrails, disputes, refunds, enforcement ladder, appeals, and trust-health unit economics.
- Includes fraud, spam, review manipulation, refund abuse, payout abuse, low-quality supply, collusion, moderation cost, false positives, and liquidity metrics.
- Flags GMV-only optimization, harmful incentives, payout-before-risk controls, no appeals, hidden moderation costs, and ranking gaming.
