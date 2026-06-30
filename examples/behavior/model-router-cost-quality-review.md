# model-router-cost-quality-review behavior example

skill: model-router-cost-quality-review

## Positive prompt

> Design a model router for an AI SaaS product that must balance support-chat quality, coding-agent reasoning, summarization cost, provider outages, privacy constraints, and premium-tier promises.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines task taxonomy, quality bar, latency SLO, privacy tier, user tier, cost ceiling, eval matrix, and rollback gates.
- Separates cheap default, premium, specialist, cascade, fallback, cache, budget throttle, and human-review paths.
- Flags cost-only routing, unsafe fallback, missing evals, opaque route decisions, and provider/privacy contract gaps.

It should also produce the artifact shape requested by `skills/model-router-cost-quality-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan enterprise customer kickoff and data migration.

The skill should not load for this prompt unless the user adds an explicit model-router-cost-quality-review context.

## Expected behavior

- Defines task taxonomy, quality bar, latency SLO, privacy tier, user tier, cost ceiling, eval matrix, and rollback gates.
- Separates cheap default, premium, specialist, cascade, fallback, cache, budget throttle, and human-review paths.
- Flags cost-only routing, unsafe fallback, missing evals, opaque route decisions, and provider/privacy contract gaps.
