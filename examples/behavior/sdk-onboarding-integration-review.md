# sdk-onboarding-integration-review behavior example

skill: sdk-onboarding-integration-review

## Positive prompt

> Review SDK onboarding for a payments API with auth keys, sandbox data, webhooks, quickstart, errors, telemetry, and version migration.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines first success and maps docs discovery through production readiness.
- Includes runnable quickstart, sandbox data, credentials, examples, structured errors, webhooks, telemetry, versioning, and migration.
- Flags production-secret, real-money, opaque-error, and breaking-change risks.

It should also produce the artifact shape requested by `skills/sdk-onboarding-integration-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit brand trust claims on a landing page.

The skill should not load for this prompt unless the user adds an explicit sdk-onboarding-integration-review context.

## Expected behavior

- Defines first success and maps docs discovery through production readiness.
- Includes runnable quickstart, sandbox data, credentials, examples, structured errors, webhooks, telemetry, versioning, and migration.
- Flags production-secret, real-money, opaque-error, and breaking-change risks.
