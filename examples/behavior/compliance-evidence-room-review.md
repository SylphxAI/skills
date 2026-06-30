# compliance-evidence-room-review behavior example

skill: compliance-evidence-room-review

## Positive prompt

> Design a compliance evidence room for enterprise buyers with SOC reports, pen test summaries, DPAs, access approval, expiry, and audit logs.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies evidence by sensitivity, audience, scope, owner, version, and expiry.
- Includes gated access, requester identity, terms/NDA, audit trail, revocation, follow-up routing, and stale-document review.
- Flags uncontrolled report sharing, sales-uploaded evidence, expired compliance documents, and overbroad assurance claims.

It should also produce the artifact shape requested by `skills/compliance-evidence-room-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a lifecycle email onboarding sequence.

The skill should not load for this prompt unless the user adds an explicit compliance-evidence-room-review context.

## Expected behavior

- Classifies evidence by sensitivity, audience, scope, owner, version, and expiry.
- Includes gated access, requester identity, terms/NDA, audit trail, revocation, follow-up routing, and stale-document review.
- Flags uncontrolled report sharing, sales-uploaded evidence, expired compliance documents, and overbroad assurance claims.
