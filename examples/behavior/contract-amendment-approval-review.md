# contract-amendment-approval-review behavior example

skill: contract-amendment-approval-review

## Positive prompt

> Review a contract amendment request for an enterprise SaaS customer changing pricing, term length, SLA credits, DPA language, data residency, AI data-use commitments, support response time, product roadmap promises, billing setup, approvals, and renewal impact.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines amendment scope, clause/source documents, risk tier, approval matrix, legal/commercial/security/privacy/product/support impact, obligation register updates, billing/provisioning mapping, verification, and renewal effects.
- Separates legal interpretation, commercial policy, finance/margin, product capability, support/SLA, privacy/security, billing, provisioning, customer communication, and renewal review work.
- Flags hidden obligations, side-letter bypass, authority gaps, unsupported product promises, unmapped billing/support impact, register gaps, system mismatch, and renewal surprises.

It should also produce the artifact shape requested by `skills/contract-amendment-approval-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review release freeze change control.

The skill should not load for this prompt unless the user adds an explicit contract-amendment-approval-review context.

## Expected behavior

- Defines amendment scope, clause/source documents, risk tier, approval matrix, legal/commercial/security/privacy/product/support impact, obligation register updates, billing/provisioning mapping, verification, and renewal effects.
- Separates legal interpretation, commercial policy, finance/margin, product capability, support/SLA, privacy/security, billing, provisioning, customer communication, and renewal review work.
- Flags hidden obligations, side-letter bypass, authority gaps, unsupported product promises, unmapped billing/support impact, register gaps, system mismatch, and renewal surprises.
