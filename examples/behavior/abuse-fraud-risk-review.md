# abuse-fraud-risk-review behavior example

skill: abuse-fraud-risk-review

## Positive prompt

> Review refund and promotion abuse risks for a mobile game with premium currency and referral rewards.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from incentives/assets and proposes a control ladder with review and appeal.
- Balances abuse prevention with privacy, false positives, support, and user trust.

It should also produce the artifact shape requested by `skills/abuse-fraud-risk-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write release notes for a UI bug fix.

The skill should not load for this prompt unless the user adds an explicit abuse-fraud-risk-review context.

## Expected behavior

- Starts from incentives/assets and proposes a control ladder with review and appeal.
- Balances abuse prevention with privacy, false positives, support, and user trust.
