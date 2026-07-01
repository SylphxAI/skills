# store-price-change-communication-review behavior example

skill: store-price-change-communication-review

## Positive prompt

> Plan store price change communication for iOS, Android, Steam, Microsoft Store, and direct subscribers across regions with price increases, FX adjustments, grandfathering, consent requirements, paywall copy, emails, in-app notices, support macros, refund/cancel routes, and churn monitoring.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines affected products, channels, regions, cohorts, old/new prices, consent/notice rules, timeline, paywall/store metadata, messaging surfaces, support macros, refund/cancel paths, analytics, and post-change monitoring.
- Separates price increase, decrease, FX adjustment, intro/trial transition, grandfathering sunset, package migration, store-mandated change, and direct-plus-store billing paths.
- Flags vague price-increase communication, channel rule assumptions, paywall/metadata/support mismatch, missing cancellation/refund routes, cohort confusion, support spikes, and churn blind spots.

It should also produce the artifact shape requested by `skills/store-price-change-communication-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review developer sandbox abuse prevention.

The skill should not load for this prompt unless the user adds an explicit store-price-change-communication-review context.

## Expected behavior

- Defines affected products, channels, regions, cohorts, old/new prices, consent/notice rules, timeline, paywall/store metadata, messaging surfaces, support macros, refund/cancel paths, analytics, and post-change monitoring.
- Separates price increase, decrease, FX adjustment, intro/trial transition, grandfathering sunset, package migration, store-mandated change, and direct-plus-store billing paths.
- Flags vague price-increase communication, channel rule assumptions, paywall/metadata/support mismatch, missing cancellation/refund routes, cohort confusion, support spikes, and churn blind spots.
