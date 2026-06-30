# support-workforce-planning-review behavior example

skill: support-workforce-planning-review

## Positive prompt

> Forecast support staffing for a SaaS product launching annual plans, a data migration, and a new enterprise tier across email, chat, billing, technical escalation, and two languages.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Forecasts volume by channel, severity, language, segment, issue type, arrival pattern, handle time, seasonality, and launch/incident drivers.
- Includes shrinkage, occupancy, backlog aging, SLA risk, escalation lanes, QA, macros, deflection quality, hiring/vendor triggers, and burnout risk.
- Flags average-volume staffing, hidden human support, interchangeable-agent assumptions, QA drift, and unowned product defects.

It should also produce the artifact shape requested by `skills/support-workforce-planning-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a contract renewal workflow for enterprise accounts.

The skill should not load for this prompt unless the user adds an explicit support-workforce-planning-review context.

## Expected behavior

- Forecasts volume by channel, severity, language, segment, issue type, arrival pattern, handle time, seasonality, and launch/incident drivers.
- Includes shrinkage, occupancy, backlog aging, SLA risk, escalation lanes, QA, macros, deflection quality, hiring/vendor triggers, and burnout risk.
- Flags average-volume staffing, hidden human support, interchangeable-agent assumptions, QA drift, and unowned product defects.
