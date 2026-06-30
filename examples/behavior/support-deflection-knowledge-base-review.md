# support-deflection-knowledge-base-review behavior example

skill: support-deflection-knowledge-base-review

## Positive prompt

> Audit a help center and chatbot for reducing refund, account access, and integration tickets without trapping unresolved users.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates deflection targets by contact driver and stakes before choosing articles, search, macros, or chatbot answers.
- Includes article ownership, freshness, search QA, source citation, escalation triggers, diagnostics, and product feedback loop.
- Warns against optimizing deflection rate while unresolved users churn, refund, or recontact.

It should also produce the artifact shape requested by `skills/support-deflection-knowledge-base-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Model AI SaaS unit economics.

The skill should not load for this prompt unless the user adds an explicit support-deflection-knowledge-base-review context.

## Expected behavior

- Separates deflection targets by contact driver and stakes before choosing articles, search, macros, or chatbot answers.
- Includes article ownership, freshness, search QA, source citation, escalation triggers, diagnostics, and product feedback loop.
- Warns against optimizing deflection rate while unresolved users churn, refund, or recontact.
