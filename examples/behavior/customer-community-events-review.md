# customer-community-events-review behavior example

skill: customer-community-events-review

## Positive prompt

> Design a customer community event program for SaaS with onboarding workshops, office hours, champion roundtables, roadmap feedback, accessibility, moderation, consent, follow-up, and product learning loops.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines event purpose, audience, format, agenda, moderation, accessibility/localization, consent, product/support owners, feedback capture, content reuse, follow-up, and metrics.
- Separates onboarding workshops, office hours, webinars, roundtables, meetups, roadmap feedback, support remediation, launch education, and advisory sessions.
- Flags attendance vanity, surprise sales pitches, unapproved roadmap promises, recording consent gaps, exclusion risks, and events masking product problems.

It should also produce the artifact shape requested by `skills/customer-community-events-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit data lineage for analytics events.

The skill should not load for this prompt unless the user adds an explicit customer-community-events-review context.

## Expected behavior

- Defines event purpose, audience, format, agenda, moderation, accessibility/localization, consent, product/support owners, feedback capture, content reuse, follow-up, and metrics.
- Separates onboarding workshops, office hours, webinars, roundtables, meetups, roadmap feedback, support remediation, launch education, and advisory sessions.
- Flags attendance vanity, surprise sales pitches, unapproved roadmap promises, recording consent gaps, exclusion risks, and events masking product problems.
