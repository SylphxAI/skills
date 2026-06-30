# contract-lifecycle-renewal-review behavior example

skill: contract-lifecycle-renewal-review

## Positive prompt

> Design a contract renewal workflow for enterprise SaaS with auto-renewal notice windows, expansion offers, downgrade requests, true-ups, billing handoff, and entitlement changes.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates renewal, expansion, downgrade, cancellation, true-up, collections, and amendment workflows with explicit owners.
- Includes contract source of truth, notice windows, health signals, procurement/legal timing, billing/provisioning handoff, and customer communication.
- Flags surprise auto-renewal, CRM-only entitlement changes, unsupported discount promises, and dark-pattern cancellation risk.

It should also produce the artifact shape requested by `skills/contract-lifecycle-renewal-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a localization QA plan for a mobile app release.

The skill should not load for this prompt unless the user adds an explicit contract-lifecycle-renewal-review context.

## Expected behavior

- Separates renewal, expansion, downgrade, cancellation, true-up, collections, and amendment workflows with explicit owners.
- Includes contract source of truth, notice windows, health signals, procurement/legal timing, billing/provisioning handoff, and customer communication.
- Flags surprise auto-renewal, CRM-only entitlement changes, unsupported discount promises, and dark-pattern cancellation risk.
