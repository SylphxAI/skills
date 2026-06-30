# trust-center-readiness-review behavior example

skill: trust-center-readiness-review

## Positive prompt

> Prepare a trust center for an AI SaaS product with security, privacy, subprocessors, compliance claims, gated evidence, and sales handoffs.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates public claims, gated evidence, sales answers, legal commitments, and internal controls.
- Maps each trust claim to owner, evidence, scope, date, qualifier, access policy, and review cadence.
- Flags unsupported certifications, stale subprocessors, overbroad AI/privacy claims, and public leakage of sensitive evidence.

It should also produce the artifact shape requested by `skills/trust-center-readiness-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a mobile game live event economy.

The skill should not load for this prompt unless the user adds an explicit trust-center-readiness-review context.

## Expected behavior

- Separates public claims, gated evidence, sales answers, legal commitments, and internal controls.
- Maps each trust claim to owner, evidence, scope, date, qualifier, access policy, and review cadence.
- Flags unsupported certifications, stale subprocessors, overbroad AI/privacy claims, and public leakage of sensitive evidence.
