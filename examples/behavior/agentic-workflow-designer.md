# agentic-workflow-designer behavior example

skill: agentic-workflow-designer

## Positive prompt

> Design an agent workflow that turns market research into new public skills with evals and PRs.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies autonomy and risk before designing steps.
- Defines state machine, tool contracts, approval gates, evidence, recovery, and evals.
- Produces durable handoff artifacts rather than relying on hidden context.

It should also produce the artifact shape requested by `skills/agentic-workflow-designer/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write pricing page hero copy.

The skill should not load for this prompt unless the user adds an explicit agentic-workflow-designer context.

## Expected behavior

- Classifies autonomy and risk before designing steps.
- Defines state machine, tool contracts, approval gates, evidence, recovery, and evals.
- Produces durable handoff artifacts rather than relying on hidden context.
