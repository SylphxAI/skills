# skill-marketplace-creator behavior example

skill: skill-marketplace-creator

## Positive prompt

> Design a public repository for sharing AI agent skills.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts repository-first unless a heavier marketplace is justified.
- Separates skills from MCP tools.
- Includes validation, safety, license, and eval gates.

It should also produce the artifact shape requested by `skills/skill-marketplace-creator/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a SQL query for monthly revenue.

The skill should not load for this prompt unless the user adds an explicit skill-marketplace-creator context.

## Expected behavior

- Starts repository-first unless a heavier marketplace is justified.
- Separates skills from MCP tools.
- Includes validation, safety, license, and eval gates.
