# risk-register-governance-review behavior example

skill: risk-register-governance-review

## Positive prompt

> Create a risk register for launching an AI billing assistant with product, privacy, revenue, support, and model-quality risks.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates risks from assumptions, issues, incidents, dependencies, and decisions.
- Defines severity, likelihood, detectability, controls, mitigations, owners, evidence, review cadence, and accepted-risk authority.
- Flags unowned, stale, or vanity risks that cannot change launch decisions.

It should also produce the artifact shape requested by `skills/risk-register-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write SDK installation instructions.

The skill should not load for this prompt unless the user adds an explicit risk-register-governance-review context.

## Expected behavior

- Separates risks from assumptions, issues, incidents, dependencies, and decisions.
- Defines severity, likelihood, detectability, controls, mitigations, owners, evidence, review cadence, and accepted-risk authority.
- Flags unowned, stale, or vanity risks that cannot change launch decisions.
