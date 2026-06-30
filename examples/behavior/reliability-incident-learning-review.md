# reliability-incident-learning-review behavior example

skill: reliability-incident-learning-review

## Positive prompt

> Run an incident learning review for a release regression that caused API downtime, late status updates, and repeat support tickets.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates incident trigger, contributing factors, latent conditions, detection gaps, response gaps, and customer communication gaps.
- Includes timeline, impact, action owners, due dates, evidence, SLO/error budget linkage, recurrence checks, and learning distribution.
- Flags blameful root-cause narratives, shallow actions, closed-without-proof follow-up, and hidden customer impact.

It should also produce the artifact shape requested by `skills/reliability-incident-learning-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Prepare a procurement DPA response.

The skill should not load for this prompt unless the user adds an explicit reliability-incident-learning-review context.

## Expected behavior

- Separates incident trigger, contributing factors, latent conditions, detection gaps, response gaps, and customer communication gaps.
- Includes timeline, impact, action owners, due dates, evidence, SLO/error budget linkage, recurrence checks, and learning distribution.
- Flags blameful root-cause narratives, shallow actions, closed-without-proof follow-up, and hidden customer impact.
