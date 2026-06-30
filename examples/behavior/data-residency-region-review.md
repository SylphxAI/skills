# data-residency-region-review behavior example

skill: data-residency-region-review

## Positive prompt

> Design data residency for EU enterprise customers covering storage, processing, backups, logs, analytics, support access, AI providers, subprocessors, failover, deletion, and customer evidence.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines residency promise by data class, system, storage, processing, replication, backup, logs, analytics, support, AI providers, and subprocessors.
- Includes allowed transfers, access controls, failover/restore, migration, deletion, drift monitoring, contract evidence, and customer proof plan.
- Flags false residency claims, hidden metadata/log/AI transfers, support access drift, unapproved failover, and unsupported customer answers.

It should also produce the artifact shape requested by `skills/data-residency-region-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Build a sales discovery call script.

The skill should not load for this prompt unless the user adds an explicit data-residency-region-review context.

## Expected behavior

- Defines residency promise by data class, system, storage, processing, replication, backup, logs, analytics, support, AI providers, and subprocessors.
- Includes allowed transfers, access controls, failover/restore, migration, deletion, drift monitoring, contract evidence, and customer proof plan.
- Flags false residency claims, hidden metadata/log/AI transfers, support access drift, unapproved failover, and unsupported customer answers.
