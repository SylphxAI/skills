# incident-status-page-ops-review behavior example

skill: incident-status-page-ops-review

## Positive prompt

> Design status page operations for a SaaS platform with component taxonomy, public incident updates, private enterprise notifications, maintenance windows, support macros, SLO impact, and post-incident follow-up.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines component taxonomy, declaration thresholds, update cadence, templates, subscriber channels, approval paths, support coordination, SLO impact, maintenance, and post-incident follow-up.
- Separates investigating, identified, monitoring, resolved, maintenance, degraded, partial outage, security-sensitive, and follow-up communications.
- Flags delayed acknowledgement, false uptime, speculative root cause, leaked security detail, contradictory messaging, and overdue updates.

It should also produce the artifact shape requested by `skills/incident-status-page-ops-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review revenue recognition for prepaid credits.

The skill should not load for this prompt unless the user adds an explicit incident-status-page-ops-review context.

## Expected behavior

- Defines component taxonomy, declaration thresholds, update cadence, templates, subscriber channels, approval paths, support coordination, SLO impact, maintenance, and post-incident follow-up.
- Separates investigating, identified, monitoring, resolved, maintenance, degraded, partial outage, security-sensitive, and follow-up communications.
- Flags delayed acknowledgement, false uptime, speculative root cause, leaked security detail, contradictory messaging, and overdue updates.
