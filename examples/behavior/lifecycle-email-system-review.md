# lifecycle-email-system-review behavior example

skill: lifecycle-email-system-review

## Positive prompt

> Design lifecycle email for SaaS onboarding and retention with consent, segmentation, triggers, suppression, deliverability, frequency caps, and activation metrics.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies message type and consent basis before designing triggers or content.
- Includes eligibility, suppression, preference handling, frequency caps, deliverability, localization, event tracking, support visibility, and negative guardrails.
- Flags transactional/promotional mixing, open-rate-only optimization, emailing deleted/churned users, and fatigue risk.

It should also produce the artifact shape requested by `skills/lifecycle-email-system-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review platform certification badge criteria.

The skill should not load for this prompt unless the user adds an explicit lifecycle-email-system-review context.

## Expected behavior

- Classifies message type and consent basis before designing triggers or content.
- Includes eligibility, suppression, preference handling, frequency caps, deliverability, localization, event tracking, support visibility, and negative guardrails.
- Flags transactional/promotional mixing, open-rate-only optimization, emailing deleted/churned users, and fatigue risk.
