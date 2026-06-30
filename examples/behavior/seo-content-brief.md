# seo-content-brief behavior example

skill: seo-content-brief

## Positive prompt

> Create an SEO content brief for a developer tool alternatives page that should convert without sounding spammy.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from intent and original value, not keyword stuffing.
- Includes outline, proof, internal links, CTA, freshness, and qualified metrics.

It should also produce the artifact shape requested by `skills/seo-content-brief/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit a payment entitlement state machine.

The skill should not load for this prompt unless the user adds an explicit seo-content-brief context.

## Expected behavior

- Starts from intent and original value, not keyword stuffing.
- Includes outline, proof, internal links, CTA, freshness, and qualified metrics.
