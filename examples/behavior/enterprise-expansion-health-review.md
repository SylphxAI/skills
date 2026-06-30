# enterprise-expansion-health-review behavior example

skill: enterprise-expansion-health-review

## Positive prompt

> Review enterprise expansion readiness for an account with rising usage, open support issues, a QBR next month, a possible new department, renewal in 120 days, and uncertain executive sponsorship.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Assesses adoption, value outcomes, support burden, incident history, relationship strength, renewal risk, product fit, whitespace, and procurement timing.
- Separates stabilize-first, renewal-only, expansion-suspect, expansion-qualified, executive-alignment, and procurement-ready states.
- Flags pushing expansion into unhealthy accounts, raw-usage-only upsell, QBR sales pitches, weak champion, and uncoordinated commercial changes.

It should also produce the artifact shape requested by `skills/enterprise-expansion-health-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a data residency architecture for EU customers.

The skill should not load for this prompt unless the user adds an explicit enterprise-expansion-health-review context.

## Expected behavior

- Assesses adoption, value outcomes, support burden, incident history, relationship strength, renewal risk, product fit, whitespace, and procurement timing.
- Separates stabilize-first, renewal-only, expansion-suspect, expansion-qualified, executive-alignment, and procurement-ready states.
- Flags pushing expansion into unhealthy accounts, raw-usage-only upsell, QBR sales pitches, weak champion, and uncoordinated commercial changes.
