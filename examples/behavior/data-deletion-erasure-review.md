# data-deletion-erasure-review behavior example

skill: data-deletion-erasure-review

## Positive prompt

> Design data deletion and erasure operations for SaaS covering user deletion, workspace deletion, DSAR/RTBF, retention, backups, logs, analytics, billing records, legal holds, subprocessors, and proof.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps data subjects, systems, data classes, derived stores, exports, logs, backups, billing/legal records, subprocessors, and deletion methods.
- Includes authority checks, shared-scope risk, retention/legal holds, fraud/security exceptions, execution order, retries, proof, customer communication, and audit drills.
- Flags false backup deletion promises, unauthorized irreversible deletes, unmapped derived data, missing subprocessor workflow, and deletion without ownership checks.

It should also produce the artifact shape requested by `skills/data-deletion-erasure-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a customer success QBR playbook.

The skill should not load for this prompt unless the user adds an explicit data-deletion-erasure-review context.

## Expected behavior

- Maps data subjects, systems, data classes, derived stores, exports, logs, backups, billing/legal records, subprocessors, and deletion methods.
- Includes authority checks, shared-scope risk, retention/legal holds, fraud/security exceptions, execution order, retries, proof, customer communication, and audit drills.
- Flags false backup deletion promises, unauthorized irreversible deletes, unmapped derived data, missing subprocessor workflow, and deletion without ownership checks.
