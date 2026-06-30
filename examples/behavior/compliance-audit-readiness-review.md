# compliance-audit-readiness-review behavior example

skill: compliance-audit-readiness-review

## Positive prompt

> Prepare SOC 2 and ISO audit readiness for a SaaS company with control owners, evidence calendar, auditor samples, walkthroughs, exceptions, trust center claims, and remediation tracking.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines audit scope, control matrix, evidence sources, owners, collection cadence, sample workflow, walkthrough prep, gap register, remediation SLA, and claim approval.
- Synchronizes audit evidence with trust center, security questionnaires, DPAs, subprocessors, policies, and sales claims.
- Flags unsupported certifications, deadline evidence scrambles, altered evidence, ownerless controls, stale claims, and hidden exceptions.

It should also produce the artifact shape requested by `skills/compliance-audit-readiness-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Forecast support staffing for a product launch.

The skill should not load for this prompt unless the user adds an explicit compliance-audit-readiness-review context.

## Expected behavior

- Defines audit scope, control matrix, evidence sources, owners, collection cadence, sample workflow, walkthrough prep, gap register, remediation SLA, and claim approval.
- Synchronizes audit evidence with trust center, security questionnaires, DPAs, subprocessors, policies, and sales claims.
- Flags unsupported certifications, deadline evidence scrambles, altered evidence, ownerless controls, stale claims, and hidden exceptions.
