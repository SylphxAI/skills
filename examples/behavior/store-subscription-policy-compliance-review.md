# store-subscription-policy-compliance-review behavior example

skill: store-subscription-policy-compliance-review

## Positive prompt

> Review store subscription policy compliance for an iOS and Android app with trial paywalls, intro offers, restore purchase, cancellation disclosure, receipt validation, server notifications, refunds, grace periods, metadata screenshots, reviewer notes, and support macros.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines store, product IDs, pricing, trial/intro terms, paywall copy, entitlement behavior, receipt/server notification tests, cancellation/restore evidence, metadata/screenshots, reviewer notes, and support readiness.
- Covers purchase, renewal, cancellation, restore, refund, grace period, billing retry, upgrade/downgrade, price changes, family sharing, and account deletion expectations.
- Flags unclear subscription terms, client-only entitlement truth, metadata/paywall mismatch, hidden cancellation/restore paths, missing reviewer evidence, and post-launch monitoring gaps.

It should also produce the artifact shape requested by `skills/store-subscription-policy-compliance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Assemble a release evidence pack.

The skill should not load for this prompt unless the user adds an explicit store-subscription-policy-compliance-review context.

## Expected behavior

- Defines store, product IDs, pricing, trial/intro terms, paywall copy, entitlement behavior, receipt/server notification tests, cancellation/restore evidence, metadata/screenshots, reviewer notes, and support readiness.
- Covers purchase, renewal, cancellation, restore, refund, grace period, billing retry, upgrade/downgrade, price changes, family sharing, and account deletion expectations.
- Flags unclear subscription terms, client-only entitlement truth, metadata/paywall mismatch, hidden cancellation/restore paths, missing reviewer evidence, and post-launch monitoring gaps.
