# contract-obligation-renewal-audit-review behavior example

skill: contract-obligation-renewal-audit-review

## Positive prompt

> Audit renewal obligations for an enterprise SaaS contract with MSA, DPA, SLA, security addendum, pricing exceptions, usage minimums, support commitments, auto-renew notice window, product promises, service credits, and expansion negotiation handoff.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines authoritative contract sources, obligation register, clause owners, notice windows, pricing exceptions, SLA/security/privacy/support/product commitments, evidence links, remediation owners, and renewal handoff.
- Separates legal interpretation, commercial policy, billing configuration, product capability, support operations, customer communication, and negotiation decisions.
- Flags hidden obligations, missed notice windows, weak evidence, owner gaps, expired exceptions, revenue leakage, unsupported product promises, and renewal handoff drift.

It should also produce the artifact shape requested by `skills/contract-obligation-renewal-audit-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design motion transitions for mobile UI.

The skill should not load for this prompt unless the user adds an explicit contract-obligation-renewal-audit-review context.

## Expected behavior

- Defines authoritative contract sources, obligation register, clause owners, notice windows, pricing exceptions, SLA/security/privacy/support/product commitments, evidence links, remediation owners, and renewal handoff.
- Separates legal interpretation, commercial policy, billing configuration, product capability, support operations, customer communication, and negotiation decisions.
- Flags hidden obligations, missed notice windows, weak evidence, owner gaps, expired exceptions, revenue leakage, unsupported product promises, and renewal handoff drift.
