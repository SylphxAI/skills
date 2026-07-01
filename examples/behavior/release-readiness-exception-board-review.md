# release-readiness-exception-board-review behavior example

skill: release-readiness-exception-board-review

## Positive prompt

> Run a release readiness exception board for a SaaS launch with missing performance evidence, incomplete docs, feature flags, support macros, customer-limited rollout, rollback trigger, monitoring dashboard, approval authority, expiry, and post-release review.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines exception intake, unmet gates, evidence gaps, customer scope, risk tier, approval authority, mitigation owners, rollout limits, rollback triggers, monitoring, support communication, expiry, and post-release review.
- Separates gate waiver, risk acceptance, feature-flag mitigation, customer-specific exception, hotfix, migration, compliance-sensitive exception, and release-freeze override paths.
- Flags hidden gate bypass, weak evidence, authority gaps, feature-flag theater, missing support/rollback/monitoring, zombie exceptions, and repeated process debt.

It should also produce the artifact shape requested by `skills/release-readiness-exception-board-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review partner incentive payouts.

The skill should not load for this prompt unless the user adds an explicit release-readiness-exception-board-review context.

## Expected behavior

- Defines exception intake, unmet gates, evidence gaps, customer scope, risk tier, approval authority, mitigation owners, rollout limits, rollback triggers, monitoring, support communication, expiry, and post-release review.
- Separates gate waiver, risk acceptance, feature-flag mitigation, customer-specific exception, hotfix, migration, compliance-sensitive exception, and release-freeze override paths.
- Flags hidden gate bypass, weak evidence, authority gaps, feature-flag theater, missing support/rollback/monitoring, zombie exceptions, and repeated process debt.
