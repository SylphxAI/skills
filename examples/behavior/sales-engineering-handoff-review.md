# sales-engineering-handoff-review behavior example

skill: sales-engineering-handoff-review

## Positive prompt

> Design a sales engineering handoff for an enterprise SaaS deal with technical discovery, POC success criteria, integration scope, security commitments, demo caveats, CRM updates, implementation kickoff, and customer success ownership.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Captures customer context, technical environment, success criteria, commitments, caveats, evidence, CRM source of truth, and owner map.
- Separates demo, POC, integration, security, commercial, implementation, and customer success handoff work.
- Flags hidden demo promises, unvalidated POC success, integration surprises, roadmap fiction, and handoff truth split across tools.

It should also produce the artifact shape requested by `skills/sales-engineering-handoff-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review app store policy changes.

The skill should not load for this prompt unless the user adds an explicit sales-engineering-handoff-review context.

## Expected behavior

- Captures customer context, technical environment, success criteria, commitments, caveats, evidence, CRM source of truth, and owner map.
- Separates demo, POC, integration, security, commercial, implementation, and customer success handoff work.
- Flags hidden demo promises, unvalidated POC success, integration surprises, roadmap fiction, and handoff truth split across tools.
