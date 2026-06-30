# live-event-ops-review behavior example

skill: live-event-ops-review

## Positive prompt

> Plan a two-week mobile game live event with rewards, offers, notifications, and support readiness.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Treats a live event as a versioned operating system with setup, launch, monitoring, support, shutdown, and review.
- Balances engagement and monetization with economy, fairness, compensation, and rollback risk.
- Defines eligibility, event events, metrics, support macros, and post-event decisions.

It should also produce the artifact shape requested by `skills/live-event-ops-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a Microsoft Store package identity checklist.

The skill should not load for this prompt unless the user adds an explicit live-event-ops-review context.

## Expected behavior

- Treats a live event as a versioned operating system with setup, launch, monitoring, support, shutdown, and review.
- Balances engagement and monetization with economy, fairness, compensation, and rollback risk.
- Defines eligibility, event events, metrics, support macros, and post-event decisions.
