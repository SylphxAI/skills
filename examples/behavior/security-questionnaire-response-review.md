# security-questionnaire-response-review behavior example

skill: security-questionnaire-response-review

## Positive prompt

> Prepare security questionnaire responses for an enterprise buyer asking about SSO, encryption, subprocessors, retention, incident response, and audit logs.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies answers as current fact, partial, not applicable, compensating control, roadmap, unknown, or review-required.
- Requires evidence and owner review for material security, privacy, compliance, SLA, and subprocessor claims.
- Avoids inventing certifications or commitments and creates a gap register.

It should also produce the artifact shape requested by `skills/security-questionnaire-response-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a community launch content calendar.

The skill should not load for this prompt unless the user adds an explicit security-questionnaire-response-review context.

## Expected behavior

- Classifies answers as current fact, partial, not applicable, compensating control, roadmap, unknown, or review-required.
- Requires evidence and owner review for material security, privacy, compliance, SLA, and subprocessor claims.
- Avoids inventing certifications or commitments and creates a gap register.
