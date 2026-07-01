# integration-sandbox-certification-review behavior example

skill: integration-sandbox-certification-review

## Positive prompt

> Review integration sandbox certification for a marketplace app using OAuth scopes, webhooks, SDKs, synthetic tenants, rate limits, retries, error handling, data deletion/export behavior, security review, certification badge, and production promotion gate.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines integration type, sandbox environment, OAuth scopes, API/webhook surfaces, synthetic data, certification criteria, test evidence, production gate, support docs, and recertification cadence.
- Includes happy path, error path, retries, idempotency, pagination, rate limits, auth expiry, webhook verification, security, privacy, and version compatibility tests.
- Flags happy-path-only certification, real customer data in sandbox, overbroad scopes, production credentials before evidence, missing support readiness, and certification drift.

It should also produce the artifact shape requested by `skills/integration-sandbox-certification-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review pricing contract exceptions.

The skill should not load for this prompt unless the user adds an explicit integration-sandbox-certification-review context.

## Expected behavior

- Defines integration type, sandbox environment, OAuth scopes, API/webhook surfaces, synthetic data, certification criteria, test evidence, production gate, support docs, and recertification cadence.
- Includes happy path, error path, retries, idempotency, pagination, rate limits, auth expiry, webhook verification, security, privacy, and version compatibility tests.
- Flags happy-path-only certification, real customer data in sandbox, overbroad scopes, production credentials before evidence, missing support readiness, and certification drift.
