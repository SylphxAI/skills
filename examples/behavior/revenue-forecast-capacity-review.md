# revenue-forecast-capacity-review behavior example

skill: revenue-forecast-capacity-review

## Positive prompt

> Review a revenue forecast for an AI SaaS launch with funnel assumptions, retention, gross margin, inference cost, support capacity, and scenarios.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from the planning decision and classifies forecast type before modeling assumptions.
- Includes base/upside/downside scenarios, churn, expansion, refunds, fees, margin, cash timing, leading indicators, and capacity constraints.
- Flags single optimistic forecasts, stale pipeline, ignored support/infra/supply capacity, and false precision.

It should also produce the artifact shape requested by `skills/revenue-forecast-capacity-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a content policy appeals notice.

The skill should not load for this prompt unless the user adds an explicit revenue-forecast-capacity-review context.

## Expected behavior

- Starts from the planning decision and classifies forecast type before modeling assumptions.
- Includes base/upside/downside scenarios, churn, expansion, refunds, fees, margin, cash timing, leading indicators, and capacity constraints.
- Flags single optimistic forecasts, stale pipeline, ignored support/infra/supply capacity, and false precision.
