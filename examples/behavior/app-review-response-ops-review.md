# app-review-response-ops-review behavior example

skill: app-review-response-ops-review

## Positive prompt

> Handle an App Store rejection for a subscription app involving IAP metadata, screenshots, privacy labels, reviewer reproduction steps, appeal decision, launch timing, support messaging, and recurrence prevention.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies store, policy citation, rejected build, metadata, screenshots, privacy labels, commerce setup, release impact, evidence, response, appeal, and owner.
- Includes reviewer response, reproduction evidence, build or metadata fix, expedited review or fallback sequencing, support/marketing communication, and process prevention.
- Flags adversarial reviewer replies, speculative resubmissions, privacy/IAP mismatches, hidden launch delays, and one-off handling of recurring policy drift.

It should also produce the artifact shape requested by `skills/app-review-response-ops-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review enterprise plan migration.

The skill should not load for this prompt unless the user adds an explicit app-review-response-ops-review context.

## Expected behavior

- Classifies store, policy citation, rejected build, metadata, screenshots, privacy labels, commerce setup, release impact, evidence, response, appeal, and owner.
- Includes reviewer response, reproduction evidence, build or metadata fix, expedited review or fallback sequencing, support/marketing communication, and process prevention.
- Flags adversarial reviewer replies, speculative resubmissions, privacy/IAP mismatches, hidden launch delays, and one-off handling of recurring policy drift.
