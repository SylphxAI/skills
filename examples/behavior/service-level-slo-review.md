# service-level-slo-review behavior example

skill: service-level-slo-review

## Positive prompt

> Design SLOs and customer-facing service levels for a SaaS API with uptime, latency, data freshness, support targets, status page, and error budget policy.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates SLIs, SLOs, SLAs, support targets, RTO/RPO, maintenance windows, and status promises.
- Starts from user journeys and defines measurement windows, exclusions, error budget policy, alerting, and customer communication.
- Flags overpromised SLAs, green status during degradation, and sales/trust claims without measured evidence.

It should also produce the artifact shape requested by `skills/service-level-slo-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write partner webinar social copy.

The skill should not load for this prompt unless the user adds an explicit service-level-slo-review context.

## Expected behavior

- Separates SLIs, SLOs, SLAs, support targets, RTO/RPO, maintenance windows, and status promises.
- Starts from user journeys and defines measurement windows, exclusions, error budget policy, alerting, and customer communication.
- Flags overpromised SLAs, green status during degradation, and sales/trust claims without measured evidence.
