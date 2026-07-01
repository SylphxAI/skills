# release-risk-exception-review behavior example

skill: release-risk-exception-review

## Positive prompt

> Review a release exception where a SaaS launch wants to ship with a failing non-critical test, a performance regression, incomplete rollback proof, feature flags, customer impact, monitoring, and remediation commitments.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies the blocked gate, risk type, customer impact, authority, evidence, compensating controls, rollout guardrails, monitoring, rollback, expiry, and remediation owner.
- Includes stricter treatment for security, privacy, data loss, payment, availability, compliance, and contractual risks.
- Flags silent risk acceptance, generic approval, unobservable failures, missing rollback, unlimited exceptions, and stale remediation.

It should also produce the artifact shape requested by `skills/release-risk-exception-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design partner support certification.

The skill should not load for this prompt unless the user adds an explicit release-risk-exception-review context.

## Expected behavior

- Classifies the blocked gate, risk type, customer impact, authority, evidence, compensating controls, rollout guardrails, monitoring, rollback, expiry, and remediation owner.
- Includes stricter treatment for security, privacy, data loss, payment, availability, compliance, and contractual risks.
- Flags silent risk acceptance, generic approval, unobservable failures, missing rollback, unlimited exceptions, and stale remediation.
