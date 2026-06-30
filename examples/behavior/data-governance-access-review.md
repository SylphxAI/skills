# data-governance-access-review behavior example

skill: data-governance-access-review

## Positive prompt

> Design data governance for analytics, support, and AI datasets with classification, approvals, least privilege, audit logs, retention, and break-glass access.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies data sensitivity, purpose, residency, retention, and customer impact before granting access.
- Includes request workflow, owner approval, duration, least privilege, audit logs, access reviews, offboarding, and break-glass policy.
- Flags permanent broad access, raw PII copies, AI dataset leakage, and missing stale-access revocation.

It should also produce the artifact shape requested by `skills/data-governance-access-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a partner co-marketing webinar.

The skill should not load for this prompt unless the user adds an explicit data-governance-access-review context.

## Expected behavior

- Classifies data sensitivity, purpose, residency, retention, and customer impact before granting access.
- Includes request workflow, owner approval, duration, least privilege, audit logs, access reviews, offboarding, and break-glass policy.
- Flags permanent broad access, raw PII copies, AI dataset leakage, and missing stale-access revocation.
