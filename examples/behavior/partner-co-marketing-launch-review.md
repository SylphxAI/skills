# partner-co-marketing-launch-review behavior example

skill: partner-co-marketing-launch-review

## Positive prompt

> Plan a partner co-marketing launch for a new integration with joint messaging, assets, approvals, attribution, lead routing, and support readiness.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies partner motion and defines shared audience, joint value, proof, CTA, and success metric.
- Includes assets, approvals, channel calendar, attribution, lead routing, enablement, support readiness, and post-launch review.
- Flags unsupported partner claims, privacy/lead-sharing risk, weak attribution, and missing follow-up ownership.

It should also produce the artifact shape requested by `skills/partner-co-marketing-launch-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design data quality alerts for a dashboard.

The skill should not load for this prompt unless the user adds an explicit partner-co-marketing-launch-review context.

## Expected behavior

- Classifies partner motion and defines shared audience, joint value, proof, CTA, and success metric.
- Includes assets, approvals, channel calendar, attribution, lead routing, enablement, support readiness, and post-launch review.
- Flags unsupported partner claims, privacy/lead-sharing risk, weak attribution, and missing follow-up ownership.
