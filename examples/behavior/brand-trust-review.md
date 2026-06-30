# brand-trust-review behavior example

skill: brand-trust-review

## Positive prompt

> Audit a SaaS landing page and pricing flow for trust signals, proof quality, claim risk, cancellation clarity, and support expectations.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps user skepticism to specific claims, proof, risk reducers, and trust surfaces.
- Flags unsupported claims, hidden pricing/cancellation risk, fake urgency, and weak privacy/support promises.
- Adds metrics for conversion quality, refunds, support trust questions, sentiment, and churn reasons.

It should also produce the artifact shape requested by `skills/brand-trust-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design an offline sync conflict resolver.

The skill should not load for this prompt unless the user adds an explicit brand-trust-review context.

## Expected behavior

- Maps user skepticism to specific claims, proof, risk reducers, and trust surfaces.
- Flags unsupported claims, hidden pricing/cancellation risk, fake urgency, and weak privacy/support promises.
- Adds metrics for conversion quality, refunds, support trust questions, sentiment, and churn reasons.
