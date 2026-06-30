# usage-metering-accuracy-review behavior example

skill: usage-metering-accuracy-review

## Positive prompt

> Audit usage metering for an AI SaaS product billing tokens, API calls, storage, credits, overages, quota enforcement, customer usage dashboards, invoice lines, and disputes.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines billable unit, source event, identity, idempotency, rating rule, grain, quota/estimate/final invoice boundaries, and event-to-invoice lineage.
- Includes duplicate/late/backfill handling, reconciliation, customer visibility, correction workflow, audit trail, alerts, replay tests, and dispute support.
- Flags untraceable invoices, silent corrections, mixed estimate/final truth, missing dispute handling, and usage pricing without metering controls.

It should also produce the artifact shape requested by `skills/usage-metering-accuracy-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review enterprise account expansion health.

The skill should not load for this prompt unless the user adds an explicit usage-metering-accuracy-review context.

## Expected behavior

- Defines billable unit, source event, identity, idempotency, rating rule, grain, quota/estimate/final invoice boundaries, and event-to-invoice lineage.
- Includes duplicate/late/backfill handling, reconciliation, customer visibility, correction workflow, audit trail, alerts, replay tests, and dispute support.
- Flags untraceable invoices, silent corrections, mixed estimate/final truth, missing dispute handling, and usage pricing without metering controls.
