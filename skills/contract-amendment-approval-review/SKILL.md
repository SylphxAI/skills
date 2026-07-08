---
name: contract-amendment-approval-review
description: Design and audit contract amendment approval workflows covering amendment scope, clause changes, pricing, term, SLA, DPA, security, data residency, AI/data-use commitments, support obligations, billing impact, product capability, approval authority, obligation register updates, and renewal effects. Use when commercial teams need controlled amendment decisions without hidden obligations.
---

# Contract Amendment Approval Review

Use this skill to convert contract amendment, addendum, side letter, order form change, SLA change, DPA update, pricing amendment, support obligation, data residency commitment, AI data-use term, and approval workflow questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify customer/account, amendment type, clause/source documents, requested change, business rationale, legal/commercial/security/privacy/product/support impact, approval authority, billing/provisioning changes, renewal effects, and evidence source.
2. Read `references/contract-amendment-approval-patterns.md`.
3. Classify the situation as pricing amendment, term extension, SLA/support amendment, DPA/privacy amendment, security addendum, product commitment, usage/minimum change, data residency commitment, or side-letter risk.
4. Define intake form, risk tier, approval matrix, obligation update path, billing/provisioning mapping, customer communication, exception expiry, and post-signature verification.
5. Produce contract amendment approval review, state machine, decision table, event schema, approval checklist, obligation-update plan, and renewal impact summary.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not provide legal advice or decide legal acceptability; route interpretation and drafting to qualified counsel.
- Do not approve amendments whose obligations cannot be mapped to product, billing, support, security, privacy, or finance owners.
- Do not let side letters or email promises bypass the obligation register and renewal review.
- Do not treat signed approval as complete until billing, provisioning, support, and evidence systems reflect the amendment.

## Output format

```text
Contract amendment context:
Audience / source of truth / risk boundary:

Amendment approval plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Scope, approvals, obligation owners, billing/product impact, verification, and renewal effects:
- <trigger> -> <policy, metric, edge case, support note>
```
