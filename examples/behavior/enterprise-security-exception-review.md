# enterprise-security-exception-review behavior example

skill: enterprise-security-exception-review

## Positive prompt

> Review an enterprise buyer security exception asking for custom retention, broader audit logs, regional processing limits, SSO enforcement, encryption evidence, and a contractual SLA before signature.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps customer asks to controls, policies, product capabilities, data classes, contracts, evidence, compensating controls, owners, expiry, and remediation.
- Separates standard-met, documentation gap, configurable control, compensating control, roadmap request, contract redline, and unacceptable-risk states.
- Flags indefinite exceptions, sales security promises, cross-tenant risk, roadmap-as-control, missing evidence, and no renewal review.

It should also produce the artifact shape requested by `skills/enterprise-security-exception-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design product-led sales routing for trial users.

The skill should not load for this prompt unless the user adds an explicit enterprise-security-exception-review context.

## Expected behavior

- Maps customer asks to controls, policies, product capabilities, data classes, contracts, evidence, compensating controls, owners, expiry, and remediation.
- Separates standard-met, documentation gap, configurable control, compensating control, roadmap request, contract redline, and unacceptable-risk states.
- Flags indefinite exceptions, sales security promises, cross-tenant risk, roadmap-as-control, missing evidence, and no renewal review.
