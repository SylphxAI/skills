# partner-risk-due-diligence-review behavior example

skill: partner-risk-due-diligence-review

## Positive prompt

> Run partner risk due diligence for an AI integration partner with data sharing, privacy, support, fallback, co-marketing claims, and exit planning.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies partner motion and dependency depth before weighing upside.
- Includes data boundaries, security/privacy/legal review, support ownership, incentives, contracts, monitoring, degradation, and exit plan.
- Flags revenue-over-risk bias, unsupported co-marketing claims, customer data sharing risk, and hidden support burden.

It should also produce the artifact shape requested by `skills/partner-risk-due-diligence-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design accessibility conformance testing.

The skill should not load for this prompt unless the user adds an explicit partner-risk-due-diligence-review context.

## Expected behavior

- Classifies partner motion and dependency depth before weighing upside.
- Includes data boundaries, security/privacy/legal review, support ownership, incentives, contracts, monitoring, degradation, and exit plan.
- Flags revenue-over-risk bias, unsupported co-marketing claims, customer data sharing risk, and hidden support burden.
