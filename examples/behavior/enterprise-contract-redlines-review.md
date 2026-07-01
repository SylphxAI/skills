# enterprise-contract-redlines-review behavior example

skill: enterprise-contract-redlines-review

## Positive prompt

> Review enterprise contract redlines requesting higher liability, custom SLA credits, data residency, subprocessor notice, security audit rights, AI data-use limits, and non-standard renewal terms.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies redlines by clause type, risk, owner, standard fallback, required evidence, approval path, accepted obligation, and renewal review.
- Includes legal, commercial, finance, privacy/security, support/SLA, product capability, and operational impacts without giving legal advice.
- Flags hidden obligations, roadmap promises, false security/data commitments, unbounded liability, unsupported support terms, and missing obligation tracking.

It should also produce the artifact shape requested by `skills/enterprise-contract-redlines-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Prioritize feature requests from support tickets.

The skill should not load for this prompt unless the user adds an explicit enterprise-contract-redlines-review context.

## Expected behavior

- Classifies redlines by clause type, risk, owner, standard fallback, required evidence, approval path, accepted obligation, and renewal review.
- Includes legal, commercial, finance, privacy/security, support/SLA, product capability, and operational impacts without giving legal advice.
- Flags hidden obligations, roadmap promises, false security/data commitments, unbounded liability, unsupported support terms, and missing obligation tracking.
