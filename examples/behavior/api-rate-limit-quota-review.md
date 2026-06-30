# api-rate-limit-quota-review behavior example

skill: api-rate-limit-quota-review

## Positive prompt

> Design rate limits and monthly quotas for a public AI API with cost-weighted endpoints, headers, dashboards, and upgrades.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates rate limits, quotas, concurrency caps, payload caps, spend caps, and entitlement gates.
- Specifies principal, unit, headers, error shape, dashboard, alerts, support override, and migration comms.
- Aligns quotas with abuse prevention, billing, usage metering, and tenant isolation.

It should also produce the artifact shape requested by `skills/api-rate-limit-quota-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a mobile app onboarding animation.

The skill should not load for this prompt unless the user adds an explicit api-rate-limit-quota-review context.

## Expected behavior

- Separates rate limits, quotas, concurrency caps, payload caps, spend caps, and entitlement gates.
- Specifies principal, unit, headers, error shape, dashboard, alerts, support override, and migration comms.
- Aligns quotas with abuse prevention, billing, usage metering, and tenant isolation.
