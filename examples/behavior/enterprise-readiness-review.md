# enterprise-readiness-review behavior example

skill: enterprise-readiness-review

## Positive prompt

> Audit whether our B2B SaaS is ready for enterprise buyers asking for SSO, SCIM, audit logs, DPA, and SLA.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates identity/admin, security, legal, procurement, support, implementation, and product gaps.
- Avoids unsupported compliance or SLA claims and asks for proof.
- Produces blocker levels, owner, buyer impact, and pilot rollout gates.

It should also produce the artifact shape requested by `skills/enterprise-readiness-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a daily reward streak system for a casual game.

The skill should not load for this prompt unless the user adds an explicit enterprise-readiness-review context.

## Expected behavior

- Separates identity/admin, security, legal, procurement, support, implementation, and product gaps.
- Avoids unsupported compliance or SLA claims and asks for proof.
- Produces blocker levels, owner, buyer impact, and pilot rollout gates.
