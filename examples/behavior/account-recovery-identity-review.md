# account-recovery-identity-review behavior example

skill: account-recovery-identity-review

## Positive prompt

> Design MFA recovery for a SaaS workspace admin who lost their phone without creating an account takeover path.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies recovery scenario and asset sensitivity before choosing proof and friction.
- Includes anti-enumeration, rate limits, cooldowns, notifications, session invalidation, and audit logs.
- Defines support escalation boundaries without allowing support to bypass identity proof.

It should also produce the artifact shape requested by `skills/account-recovery-identity-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a creator marketplace payout schedule.

The skill should not load for this prompt unless the user adds an explicit account-recovery-identity-review context.

## Expected behavior

- Classifies recovery scenario and asset sensitivity before choosing proof and friction.
- Includes anti-enumeration, rate limits, cooldowns, notifications, session invalidation, and audit logs.
- Defines support escalation boundaries without allowing support to bypass identity proof.
