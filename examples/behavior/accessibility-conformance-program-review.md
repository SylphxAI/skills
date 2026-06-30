# accessibility-conformance-program-review behavior example

skill: accessibility-conformance-program-review

## Positive prompt

> Design an accessibility conformance program for SaaS with WCAG targets, VPAT evidence, assistive-tech testing, issue severity, remediation SLAs, and release gates.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines scope, standard, evidence, test matrix, severity, owners, remediation SLAs, exceptions, and release gates.
- Combines automated, keyboard, screen reader, focus, contrast, motion, zoom, touch, and workflow testing.
- Flags unsupported conformance claims, scanner-only audits, unowned remediation, stale VPATs, and critical blockers.

It should also produce the artifact shape requested by `skills/accessibility-conformance-program-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design an observability cost budget.

The skill should not load for this prompt unless the user adds an explicit accessibility-conformance-program-review context.

## Expected behavior

- Defines scope, standard, evidence, test matrix, severity, owners, remediation SLAs, exceptions, and release gates.
- Combines automated, keyboard, screen reader, focus, contrast, motion, zoom, touch, and workflow testing.
- Flags unsupported conformance claims, scanner-only audits, unowned remediation, stale VPATs, and critical blockers.
