# partner-renewal-health-review behavior example

skill: partner-renewal-health-review

## Positive prompt

> Review partner renewal health for a channel and implementation partner with sourced pipeline, customer outcomes, support burden, certification status, compliance gaps, dispute history, co-marketing commitments, contract renewal, expansion tier request, and possible exit plan.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines partner type, renewal date, revenue/pipeline, customer outcomes, support quality, certification, compliance, enablement usage, disputes, contract terms, owner, and renewal decision.
- Balances business value with customer trust through remediation, tier expansion, downgrade, referral pause, renegotiation, decertification, or exit paths.
- Flags relationship-inertia renewals, pipeline-over-trust bias, tier expansion without evidence, ignored compliance gaps, and exits without transition plans.

It should also produce the artifact shape requested by `skills/partner-renewal-health-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review release evidence pack.

The skill should not load for this prompt unless the user adds an explicit partner-renewal-health-review context.

## Expected behavior

- Defines partner type, renewal date, revenue/pipeline, customer outcomes, support quality, certification, compliance, enablement usage, disputes, contract terms, owner, and renewal decision.
- Balances business value with customer trust through remediation, tier expansion, downgrade, referral pause, renegotiation, decertification, or exit paths.
- Flags relationship-inertia renewals, pipeline-over-trust bias, tier expansion without evidence, ignored compliance gaps, and exits without transition plans.
