# usage-based-pricing-review behavior example

skill: usage-based-pricing-review

## Positive prompt

> Design usage-based pricing for an AI API with tokens, credits, free allowance, and enterprise controls.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates value metric, cost driver, metered event, billable unit, entitlement, and invoice line.
- Defines spend controls, thresholds, anomaly handling, disputes, and support evidence.
- Evaluates pricing by retained revenue, margin, support load, and customer trust.

It should also produce the artifact shape requested by `skills/usage-based-pricing-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review our Steam capsule art and demo plan.

The skill should not load for this prompt unless the user adds an explicit usage-based-pricing-review context.

## Expected behavior

- Separates value metric, cost driver, metered event, billable unit, entitlement, and invoice line.
- Defines spend controls, thresholds, anomaly handling, disputes, and support evidence.
- Evaluates pricing by retained revenue, margin, support load, and customer trust.
