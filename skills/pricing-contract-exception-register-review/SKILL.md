---
name: pricing-contract-exception-register-review
description: Design and audit pricing and contract exception registers across custom discounts, non-standard price books, credits, minimum commits, ramp deals, usage caps, free periods, custom payment terms, renewal uplifts, grandfathering, contract clauses, approval owners, expiry dates, invoice mapping, revenue recognition, and renewal review. Use when commercial exceptions must be visible, controlled, and renewed intentionally.
---

# Pricing Contract Exception Register Review

Use this skill to convert pricing exception, contract exception, discount register, custom payment term, grandfathering, renewal uplift, credit, and commercial approval questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify account, exception type, standard policy, requested deviation, deal value, margin impact, approver, contract clause, billing mapping, expiry, and renewal trigger.
2. Read `references/pricing-contract-exception-register-patterns.md`.
3. Classify the situation as discount exception, price-book exception, credit, free period, ramp, minimum commit, usage cap, payment-term exception, renewal uplift exception, or grandfathered contract.
4. Define approval policy, register fields, evidence, invoice mapping, revenue impact, owner, expiry, renewal review, support/sales visibility, and exception cleanup path.
5. Produce contract exception register design, state machine, decision table, event schema, approval checklist, renewal audit plan, and cleanup backlog.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not let contract exceptions live only in PDFs, CRM notes, or sales memory.
- Do not approve discounts, credits, payment terms, or usage caps without margin, billing, revenue, and renewal impact.
- Do not create perpetual exceptions without expiry, owner, and customer communication plan.
- Do not let invoice, entitlement, CRM, and contract truth diverge.

## Output format

```text
Pricing contract exception context:
Audience / source of truth / risk boundary:

Exception register plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Policy deviation, approval, billing mapping, expiry, renewal, and cleanup:
- <trigger> -> <policy, metric, edge case, support note>
```
