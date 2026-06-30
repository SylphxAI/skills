# customer-training-academy-review behavior example

skill: customer-training-academy-review

## Positive prompt

> Design a customer training academy for enterprise SaaS with admin onboarding, end-user workflows, certification, sandbox labs, webinars, partner training, localization, accessibility, and adoption metrics.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines learner personas, jobs, role-based curricula, formats, labs/templates, assessments, certification, lifecycle triggers, localization, accessibility, content ownership, and release versioning.
- Connects academy metrics to activation, time-to-value, adoption depth, support deflection quality, retention, expansion, partner quality, and learner satisfaction.
- Flags training-as-UX-bandage, completion-only metrics, stale certification, missing localization/accessibility, and deflection that hides unresolved issues.

It should also produce the artifact shape requested by `skills/customer-training-academy-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit usage metering for token billing.

The skill should not load for this prompt unless the user adds an explicit customer-training-academy-review context.

## Expected behavior

- Defines learner personas, jobs, role-based curricula, formats, labs/templates, assessments, certification, lifecycle triggers, localization, accessibility, content ownership, and release versioning.
- Connects academy metrics to activation, time-to-value, adoption depth, support deflection quality, retention, expansion, partner quality, and learner satisfaction.
- Flags training-as-UX-bandage, completion-only metrics, stale certification, missing localization/accessibility, and deflection that hides unresolved issues.
