# procurement-security-review behavior example

skill: procurement-security-review

## Positive prompt

> Prepare an enterprise procurement security response with questionnaire answers, SOC evidence access, DPA/subprocessor review, AI data-use wording, and gap handling.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies procurement request type and maps each answer to evidence, owner, date, scope, caveat, and approval status.
- Includes gated evidence access, gap wording, redline decision owners, DPA/subprocessor handling, AI data-use boundaries, and post-signature tracking.
- Flags invented controls, uncontrolled sensitive evidence, sales-only commitments, and stale answer libraries.

It should also produce the artifact shape requested by `skills/procurement-security-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a community moderation ladder.

The skill should not load for this prompt unless the user adds an explicit procurement-security-review context.

## Expected behavior

- Classifies procurement request type and maps each answer to evidence, owner, date, scope, caveat, and approval status.
- Includes gated evidence access, gap wording, redline decision owners, DPA/subprocessor handling, AI data-use boundaries, and post-signature tracking.
- Flags invented controls, uncontrolled sensitive evidence, sales-only commitments, and stale answer libraries.
