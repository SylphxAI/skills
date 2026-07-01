# admin-audit-log-review behavior example

skill: admin-audit-log-review

## Positive prompt

> Design admin audit logs for enterprise SaaS covering role changes, SSO settings, API tokens, billing admins, data exports, support impersonation, retention, SIEM export, alerting, and tamper evidence.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines privileged event coverage, event contract, actor/target/context, redaction, retention, tamper evidence, customer UI/API/SIEM export, alerting, and release-gate tests.
- Covers identity, roles, billing, security, integrations, API tokens, data export/delete, configuration, support access, and system changes.
- Flags secret logging, mutable evidence, incomplete coverage claims, missing actor/target/result context, and unusable customer audit exports.

It should also produce the artifact shape requested by `skills/admin-audit-log-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan an account-based marketing campaign.

The skill should not load for this prompt unless the user adds an explicit admin-audit-log-review context.

## Expected behavior

- Defines privileged event coverage, event contract, actor/target/context, redaction, retention, tamper evidence, customer UI/API/SIEM export, alerting, and release-gate tests.
- Covers identity, roles, billing, security, integrations, API tokens, data export/delete, configuration, support access, and system changes.
- Flags secret logging, mutable evidence, incomplete coverage claims, missing actor/target/result context, and unusable customer audit exports.
