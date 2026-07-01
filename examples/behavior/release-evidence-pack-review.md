# release-evidence-pack-review behavior example

skill: release-evidence-pack-review

## Positive prompt

> Assemble a release evidence pack for a SaaS launch with backend changes, feature flags, database migration, accessibility QA, security review, performance test, observability dashboard, rollback proof, support macros, release notes, known risks, and approval record.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines release scope, changed surfaces, risk tier, required gates, durable proof links, owners, rollout guardrails, rollback proof, support/docs readiness, known risks, and approval record.
- Separates CI, QA, migration, performance, security, privacy, accessibility, observability, support, docs, rollout, rollback, and post-release evidence.
- Flags aggregate-only CI proof, missing rollback/support/observability evidence, ephemeral proof, unowned known risks, and deployment-success-only verification.

It should also produce the artifact shape requested by `skills/release-evidence-pack-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review partner renewal health.

The skill should not load for this prompt unless the user adds an explicit release-evidence-pack-review context.

## Expected behavior

- Defines release scope, changed surfaces, risk tier, required gates, durable proof links, owners, rollout guardrails, rollback proof, support/docs readiness, known risks, and approval record.
- Separates CI, QA, migration, performance, security, privacy, accessibility, observability, support, docs, rollout, rollback, and post-release evidence.
- Flags aggregate-only CI proof, missing rollback/support/observability evidence, ephemeral proof, unowned known risks, and deployment-success-only verification.
