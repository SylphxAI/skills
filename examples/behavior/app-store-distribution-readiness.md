# app-store-distribution-readiness behavior example

skill: app-store-distribution-readiness

## Positive prompt

> Prepare my iOS app and Android app for store launch.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Identifies target distribution channels first.
- Covers metadata, privacy, payments, testing, review, release, and support.
- For subscription apps, maps disclosure parity, restore/refund/revoke handling, server entitlement truth, reviewer packages, and support ownership.
- Separates Apple and Google testing, review notes, privacy forms, IAP products, notification permission timing, staged rollout gates, and durable evidence.
- Includes OS integration details and launch blockers.

It should also produce the artifact shape requested by `skills/app-store-distribution-readiness/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a Python function to parse JSON.

The skill should not load for this prompt unless the user adds an explicit app-store-distribution-readiness context.

## Expected behavior

- Identifies target distribution channels first.
- Covers metadata, privacy, payments, testing, review, release, and support.
- For subscription apps, maps disclosure parity, restore/refund/revoke handling, server entitlement truth, reviewer packages, and support ownership.
- Separates Apple and Google testing, review notes, privacy forms, IAP products, notification permission timing, staged rollout gates, and durable evidence.
- Includes OS integration details and launch blockers.
