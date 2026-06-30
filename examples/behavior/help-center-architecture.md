# help-center-architecture behavior example

skill: help-center-architecture

## Positive prompt

> Design help center architecture for a SaaS app with onboarding, billing, refunds, privacy, and troubleshooting.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Structures help by user problem/lifecycle and includes escalation, search, ownership, analytics, and product feedback.
- Makes billing, refund, deletion, privacy, and account routes findable.

It should also produce the artifact shape requested by `skills/help-center-architecture/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create an app-store screenshot experiment.

The skill should not load for this prompt unless the user adds an explicit help-center-architecture context.

## Expected behavior

- Structures help by user problem/lifecycle and includes escalation, search, ownership, analytics, and product feedback.
- Makes billing, refund, deletion, privacy, and account routes findable.
