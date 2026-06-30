# revops-crm-governance-review behavior example

skill: revops-crm-governance-review

## Positive prompt

> Design RevOps CRM governance for a SaaS company with lead routing, lifecycle stages, opportunity hygiene, attribution, required fields, dashboards, integrations, dedupe, permissions, and forecast reporting.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines CRM object ownership, lifecycle stages, stage criteria, routing, required fields, attribution, permissions, integrations, reporting contracts, and change control.
- Includes data-quality checks for stale stages, missing owners, duplicates, invalid sources, forecast risk, integration drift, and report certification.
- Flags undefined fields, stage sprawl, spreadsheet truth, automation side effects, unreconciled systems, and low-value rep admin burden.

It should also produce the artifact shape requested by `skills/revops-crm-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a customer community event calendar.

The skill should not load for this prompt unless the user adds an explicit revops-crm-governance-review context.

## Expected behavior

- Defines CRM object ownership, lifecycle stages, stage criteria, routing, required fields, attribution, permissions, integrations, reporting contracts, and change control.
- Includes data-quality checks for stale stages, missing owners, duplicates, invalid sources, forecast risk, integration drift, and report certification.
- Flags undefined fields, stage sprawl, spreadsheet truth, automation side effects, unreconciled systems, and low-value rep admin burden.
