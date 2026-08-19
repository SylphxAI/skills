---
name: govern-enterprise-access
description: 'Govern who may grant, inherit, exercise, review, recover, and revoke administrative authority across customer tenants. Use when identity assertions are inputs to product permission, not a substitute for it.'
---

# Govern Enterprise Access

Answer who may grant, inherit, exercise, review, recover, and revoke administrative authority inside and across customer tenants.

## Method

1. Treat identity-provider assertions as inputs. Tenant and permission semantics stay in the product.
2. Give every grant a ledger entry: who granted, to whom, which permission, why, expiry, and how it ends. Join is not permission. A mover is not “join plus later cleanup.”
3. Break-glass is a logged, time-bounded grant with a removal predicate, not a standing admin role.
4. Access review is a decision with evidence, not a dashboard. Same evidence bar for strategic customers and small ones.
5. Open [access authority lifecycle](references/access-authority-lifecycle.md) and [privileged evidence](references/privileged-evidence-operations.md).

Authentication protocol and account recovery stay with their owners.

## Output

Access governance contract: grant ledger, JML, break-glass, review decision, and audit coverage.
