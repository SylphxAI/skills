# content-policy-appeals-review behavior example

skill: content-policy-appeals-review

## Positive prompt

> Design policy enforcement and appeals for a plugin marketplace with takedowns, warnings, creator trust, evidence, and restoration.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates policy definition, detection, review, enforcement, notice, appeal, restoration, QA, and transparency.
- Includes severity ladders, evidence packages, notices, appeal SLA, reviewer independence, restoration side effects, and metrics.
- Flags vague rules, leaked abuse signals, automation false positives, and missing restoration paths.

It should also produce the artifact shape requested by `skills/content-policy-appeals-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a release train calendar.

The skill should not load for this prompt unless the user adds an explicit content-policy-appeals-review context.

## Expected behavior

- Separates policy definition, detection, review, enforcement, notice, appeal, restoration, QA, and transparency.
- Includes severity ladders, evidence packages, notices, appeal SLA, reviewer independence, restoration side effects, and metrics.
- Flags vague rules, leaked abuse signals, automation false positives, and missing restoration paths.
