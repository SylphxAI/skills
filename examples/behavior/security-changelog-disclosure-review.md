# security-changelog-disclosure-review behavior example

skill: security-changelog-disclosure-review

## Positive prompt

> Plan a security changelog disclosure for a dependency vulnerability fix affecting older self-hosted versions with severity triage, affected scope, customer mitigation, trust center update, support macros, embargo concerns, and monitoring.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies severity, exploitability, affected versions, customer exposure, remediation state, disclosure type, embargo constraints, and customer action.
- Includes approved wording, trust center and release-note updates, support/sales alignment, mitigation guidance, monitoring, and post-disclosure review.
- Flags exploit-enabling detail, vague customer-impacting notes, overstated remediation, divergent messaging, and uncertain scope.

It should also produce the artifact shape requested by `skills/security-changelog-disclosure-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design marketplace dispute resolution.

The skill should not load for this prompt unless the user adds an explicit security-changelog-disclosure-review context.

## Expected behavior

- Classifies severity, exploitability, affected versions, customer exposure, remediation state, disclosure type, embargo constraints, and customer action.
- Includes approved wording, trust center and release-note updates, support/sales alignment, mitigation guidance, monitoring, and post-disclosure review.
- Flags exploit-enabling detail, vague customer-impacting notes, overstated remediation, divergent messaging, and uncertain scope.
