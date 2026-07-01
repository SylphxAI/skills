# partner-support-enablement-review behavior example

skill: partner-support-enablement-review

## Positive prompt

> Design partner support enablement for implementation partners and resellers who need training, sandbox access, support boundaries, escalation paths, certification, release updates, customer handoffs, and quality metrics.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines partner type, support scope, allowed promises, access model, training, certification, escalation owners, and customer handoff rules.
- Includes least-privilege access, audit logs, runbooks, diagnostics, support macros, release update cadence, quality metrics, and revocation paths.
- Flags unsupported promises, bypassed support ownership, unchecked customer-impacting access, certification without evidence, and missing product feedback loops.

It should also produce the artifact shape requested by `skills/partner-support-enablement-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a release exception.

The skill should not load for this prompt unless the user adds an explicit partner-support-enablement-review context.

## Expected behavior

- Defines partner type, support scope, allowed promises, access model, training, certification, escalation owners, and customer handoff rules.
- Includes least-privilege access, audit logs, runbooks, diagnostics, support macros, release update cadence, quality metrics, and revocation paths.
- Flags unsupported promises, bypassed support ownership, unchecked customer-impacting access, certification without evidence, and missing product feedback loops.
