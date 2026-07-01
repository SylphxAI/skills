# release-rollback-drill-review behavior example

skill: release-rollback-drill-review

## Positive prompt

> Design a rollback drill for a SaaS release involving feature flags, backend deploys, database migrations, queues, mobile phased rollout, monitoring triggers, incident roles, customer communication, and recovery proof.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies rollback surface, trigger, owners, environment, irreversible steps, data compatibility, communication, monitoring, and proof artifacts.
- Includes drills for code, config, flags, migrations, mobile/store, desktop/updater, dependencies, and customer communication.
- Flags untested stateful rollback, unsafe production mutation, health-check-only proof, mobile rollback limits, and lessons not turned into gates.

It should also produce the artifact shape requested by `skills/release-rollback-drill-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review consent preference center.

The skill should not load for this prompt unless the user adds an explicit release-rollback-drill-review context.

## Expected behavior

- Classifies rollback surface, trigger, owners, environment, irreversible steps, data compatibility, communication, monitoring, and proof artifacts.
- Includes drills for code, config, flags, migrations, mobile/store, desktop/updater, dependencies, and customer communication.
- Flags untested stateful rollback, unsafe production mutation, health-check-only proof, mobile rollback limits, and lessons not turned into gates.
