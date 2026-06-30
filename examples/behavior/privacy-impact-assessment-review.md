# privacy-impact-assessment-review behavior example

skill: privacy-impact-assessment-review

## Positive prompt

> Run a privacy impact assessment for a new AI analytics feature collecting behavioral events, support text, account metadata, vendor processing, cross-border transfer, retention, and user opt-out controls.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps data subjects, fields, sources, purposes, legal basis, retention, sharing, vendors, regions, security controls, and user controls.
- Includes minimization, notice/consent, DSAR/deletion, elevated review, vendor checks, risk scoring, mitigations, launch gates, and reopening triggers.
- Flags convenience collection, stale legal basis, AI/profiling risk, sensitive data without review, vendor misuse, and one-time checkbox privacy review.

It should also produce the artifact shape requested by `skills/privacy-impact-assessment-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Forecast support workforce coverage for launch week.

The skill should not load for this prompt unless the user adds an explicit privacy-impact-assessment-review context.

## Expected behavior

- Maps data subjects, fields, sources, purposes, legal basis, retention, sharing, vendors, regions, security controls, and user controls.
- Includes minimization, notice/consent, DSAR/deletion, elevated review, vendor checks, risk scoring, mitigations, launch gates, and reopening triggers.
- Flags convenience collection, stale legal basis, AI/profiling risk, sensitive data without review, vendor misuse, and one-time checkbox privacy review.
