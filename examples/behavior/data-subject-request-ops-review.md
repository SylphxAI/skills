# data-subject-request-ops-review behavior example

skill: data-subject-request-ops-review

## Positive prompt

> Design DSAR operations for a SaaS product handling access, export, correction, deletion, consent withdrawal, workspace data, identity verification, legal holds, subprocessors, backups, logs, analytics, and SLA evidence.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies request type, jurisdiction, authority, identity, scope, systems, exceptions, subprocessors, SLA deadline, and response obligations.
- Includes execution order, evidence tracking, response wording, audit trails, retries, legal holds, and privacy architecture feedback.
- Flags irreversible action without authority, wrong-subject disclosure, unmapped systems, false deletion promises, and ticket-only status tracking.

It should also produce the artifact shape requested by `skills/data-subject-request-ops-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design lifecycle pricing experiments.

The skill should not load for this prompt unless the user adds an explicit data-subject-request-ops-review context.

## Expected behavior

- Classifies request type, jurisdiction, authority, identity, scope, systems, exceptions, subprocessors, SLA deadline, and response obligations.
- Includes execution order, evidence tracking, response wording, audit trails, retries, legal holds, and privacy architecture feedback.
- Flags irreversible action without authority, wrong-subject disclosure, unmapped systems, false deletion promises, and ticket-only status tracking.
