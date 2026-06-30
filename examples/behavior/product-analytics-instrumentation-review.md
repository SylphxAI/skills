# product-analytics-instrumentation-review behavior example

skill: product-analytics-instrumentation-review

## Positive prompt

> Design analytics instrumentation for SaaS onboarding, activation, checkout, subscription upgrade, support contact, experiment exposure, identity merge, and dashboard QA across web and server events.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines decision questions, event contracts, properties, identity/session/account rules, source reliability, consent/privacy, QA fixtures, dashboard owners, and drift monitoring.
- Separates client, server, billing/support joins, experiment exposures, attribution, lifecycle events, errors, and derived metric inputs.
- Flags track-everything analytics, client-only critical truth, missing schemas, bad identity merges, PII properties, and dashboard-defined metrics.

It should also produce the artifact shape requested by `skills/product-analytics-instrumentation-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review legal terms for refund and auto-renewal notices.

The skill should not load for this prompt unless the user adds an explicit product-analytics-instrumentation-review context.

## Expected behavior

- Defines decision questions, event contracts, properties, identity/session/account rules, source reliability, consent/privacy, QA fixtures, dashboard owners, and drift monitoring.
- Separates client, server, billing/support joins, experiment exposures, attribution, lifecycle events, errors, and derived metric inputs.
- Flags track-everything analytics, client-only critical truth, missing schemas, bad identity merges, PII properties, and dashboard-defined metrics.
