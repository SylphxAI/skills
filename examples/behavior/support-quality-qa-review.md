# support-quality-qa-review behavior example

skill: support-quality-qa-review

## Positive prompt

> Design a support QA scorecard and coaching loop for SaaS billing, refunds, account access, and technical support tickets.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines QA dimensions beyond speed: accuracy, policy, evidence, tone, resolution, escalation, safety, and prevention.
- Creates sampling, calibration, coaching, macro update, automation QA, and product feedback loops.
- Protects customer privacy and separates agent coaching from product/system defects.

It should also produce the artifact shape requested by `skills/support-quality-qa-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a partner app directory launch.

The skill should not load for this prompt unless the user adds an explicit support-quality-qa-review context.

## Expected behavior

- Defines QA dimensions beyond speed: accuracy, policy, evidence, tone, resolution, escalation, safety, and prevention.
- Creates sampling, calibration, coaching, macro update, automation QA, and product feedback loops.
- Protects customer privacy and separates agent coaching from product/system defects.
