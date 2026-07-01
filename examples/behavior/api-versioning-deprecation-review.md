# api-versioning-deprecation-review behavior example

skill: api-versioning-deprecation-review

## Positive prompt

> Design API versioning and deprecation for a public SaaS API changing schemas, webhooks, SDKs, rate limits, docs, changelog, migration guides, customer notifications, and sunset timelines.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies additive, behavior, breaking schema, auth/rate-limit, webhook, SDK, deprecated field, endpoint sunset, and emergency security changes.
- Includes compatibility tests, schemas/OpenAPI, SDKs, docs, changelog, migration guide, usage analytics, notifications, exceptions, support runbook, and sunset monitoring.
- Flags behavior breaks mislabeled as additive, surprise sunsets, inconsistent docs/SDKs, permanent exceptions, and missing customer migration proof.

It should also produce the artifact shape requested by `skills/api-versioning-deprecation-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review marketplace quality scoring.

The skill should not load for this prompt unless the user adds an explicit api-versioning-deprecation-review context.

## Expected behavior

- Classifies additive, behavior, breaking schema, auth/rate-limit, webhook, SDK, deprecated field, endpoint sunset, and emergency security changes.
- Includes compatibility tests, schemas/OpenAPI, SDKs, docs, changelog, migration guide, usage analytics, notifications, exceptions, support runbook, and sunset monitoring.
- Flags behavior breaks mislabeled as additive, surprise sunsets, inconsistent docs/SDKs, permanent exceptions, and missing customer migration proof.
