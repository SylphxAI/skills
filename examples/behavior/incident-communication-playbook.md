# incident-communication-playbook behavior example

skill: incident-communication-playbook

## Positive prompt

> Draft incident communications for a payment outage that caused entitlement delays and support tickets.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates known facts, unknowns, mitigation, workaround, next update, support macro, and follow-up.
- Handles payment/data/privacy/security incidents with higher review and precise wording.

It should also produce the artifact shape requested by `skills/incident-communication-playbook/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a product positioning statement.

The skill should not load for this prompt unless the user adds an explicit incident-communication-playbook context.

## Expected behavior

- Separates known facts, unknowns, mitigation, workaround, next update, support macro, and follow-up.
- Handles payment/data/privacy/security incidents with higher review and precise wording.
