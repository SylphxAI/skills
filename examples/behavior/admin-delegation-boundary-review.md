# admin-delegation-boundary-review behavior example

skill: admin-delegation-boundary-review

## Positive prompt

> Review admin delegation boundaries for an enterprise SaaS product with tenant hierarchy, delegated customer admins, reseller-managed accounts, inherited permissions, billing/security actions, support impersonation, break-glass, audit logs, owner transfer, and privilege drift.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines tenant hierarchy, delegated scopes, role/action matrix, sensitive-action gates, approval chains, support/impersonation controls, audit events, drift review, and customer-visible recovery paths.
- Separates customer admin, reseller admin, marketplace seller admin, internal support, impersonation, break-glass, inherited access, and owner-transfer paths.
- Flags shadow superusers, source-of-truth conflict, overbroad inherited access, missing approval/audit evidence, stale delegation, and customer UI ambiguity.

It should also produce the artifact shape requested by `skills/admin-delegation-boundary-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Prepare board metrics for a quarterly board meeting.

The skill should not load for this prompt unless the user adds an explicit admin-delegation-boundary-review context.

## Expected behavior

- Defines tenant hierarchy, delegated scopes, role/action matrix, sensitive-action gates, approval chains, support/impersonation controls, audit events, drift review, and customer-visible recovery paths.
- Separates customer admin, reseller admin, marketplace seller admin, internal support, impersonation, break-glass, inherited access, and owner-transfer paths.
- Flags shadow superusers, source-of-truth conflict, overbroad inherited access, missing approval/audit evidence, stale delegation, and customer UI ambiguity.
