# privacy-consent-preference-center-review behavior example

skill: privacy-consent-preference-center-review

## Positive prompt

> Review a privacy consent preference center covering cookies, marketing email, push, SMS, AI data use, sale/share opt-outs, regional defaults, consent proof, downstream sync, accessibility, localization, and audit evidence.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines choice taxonomy, legal basis, region, defaults, copy, consent proof, downstream systems, sync SLA, revocation, accessibility, and audit evidence.
- Separates transactional, security, marketing, product, analytics, cookie, sale/share, and AI data-use preferences.
- Flags unenforceable consent, dark patterns, bundled choices, missing proof events, failed downstream sync, and region-inconsistent defaults.

It should also produce the artifact shape requested by `skills/privacy-consent-preference-center-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a release rollback drill.

The skill should not load for this prompt unless the user adds an explicit privacy-consent-preference-center-review context.

## Expected behavior

- Defines choice taxonomy, legal basis, region, defaults, copy, consent proof, downstream systems, sync SLA, revocation, accessibility, and audit evidence.
- Separates transactional, security, marketing, product, analytics, cookie, sale/share, and AI data-use preferences.
- Flags unenforceable consent, dark patterns, bundled choices, missing proof events, failed downstream sync, and region-inconsistent defaults.
