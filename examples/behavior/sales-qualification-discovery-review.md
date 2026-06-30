# sales-qualification-discovery-review behavior example

skill: sales-qualification-discovery-review

## Positive prompt

> Design a sales qualification and discovery workflow for enterprise SaaS leads with ICP fit, buyer pain, budget, authority, procurement, security review, technical validation, and mutual action plans.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines ICP fit, pain, impact, urgency, buying committee, budget/process, technical fit, next commitment, disqualification reasons, and CRM hygiene.
- Separates no-fit, nurture, discovery-needed, qualified, technical validation, procurement, and stalled states.
- Flags enthusiasm-only qualification, fake urgency, hidden no-fit, weak champion, unsupported promises, and pipeline zombies.

It should also produce the artifact shape requested by `skills/sales-qualification-discovery-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan localization QA for Arabic and Japanese releases.

The skill should not load for this prompt unless the user adds an explicit sales-qualification-discovery-review context.

## Expected behavior

- Defines ICP fit, pain, impact, urgency, buying committee, budget/process, technical fit, next commitment, disqualification reasons, and CRM hygiene.
- Separates no-fit, nurture, discovery-needed, qualified, technical validation, procurement, and stalled states.
- Flags enthusiasm-only qualification, fake urgency, hidden no-fit, weak champion, unsupported promises, and pipeline zombies.
