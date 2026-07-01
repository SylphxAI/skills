# app-store-policy-change-monitoring-review behavior example

skill: app-store-policy-change-monitoring-review

## Positive prompt

> Design app store policy change monitoring for a mobile subscription app affected by Apple and Google privacy label updates, subscription rules, UGC policy, age ratings, deadlines, remediation owners, evidence packages, and release timing.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Tracks store, source, policy area, effective date, affected products, commerce/privacy/content impact, owner, evidence, remediation, and release risk.
- Includes store-specific triage, product-behavior proof, privacy labels, IAP setup, screenshots, reviewer notes, release sequencing, and enforcement monitoring.
- Flags waiting for rejection, cross-store assumptions, unsupported metadata/privacy changes, single-person monitoring, and missed deadlines.

It should also produce the artifact shape requested by `skills/app-store-policy-change-monitoring-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review sales engineering handoff.

The skill should not load for this prompt unless the user adds an explicit app-store-policy-change-monitoring-review context.

## Expected behavior

- Tracks store, source, policy area, effective date, affected products, commerce/privacy/content impact, owner, evidence, remediation, and release risk.
- Includes store-specific triage, product-behavior proof, privacy labels, IAP setup, screenshots, reviewer notes, release sequencing, and enforcement monitoring.
- Flags waiting for rejection, cross-store assumptions, unsupported metadata/privacy changes, single-person monitoring, and missed deadlines.
