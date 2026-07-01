# partner-spiff-dispute-resolution-review behavior example

skill: partner-spiff-dispute-resolution-review

## Positive prompt

> Resolve a partner SPIF dispute involving duplicate attribution, late deal registration, referral commission calculation, reseller rebate cap, invoice/tax requirements, clawback risk, CRM evidence, partner appeal, fraud signals, approval authority, and partner communication.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines program terms, eligibility, attribution source order, evidence packet, payout calculation, approval authority, dispute SLA, partner communication, appeal route, clawback handling, fraud escalation, and program feedback.
- Separates eligibility disputes, duplicate attribution, late registration, calculation errors, clawbacks, tier disputes, fraud suspicion, appeals, and program learning paths.
- Flags relationship-pressure payouts, spreadsheet truth, evidence gaps, hidden eligibility rules, double payouts, fake leads, weak appeals, partner trust damage, and repeated dispute patterns.

It should also produce the artifact shape requested by `skills/partner-spiff-dispute-resolution-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review developer quota credit abuse.

The skill should not load for this prompt unless the user adds an explicit partner-spiff-dispute-resolution-review context.

## Expected behavior

- Defines program terms, eligibility, attribution source order, evidence packet, payout calculation, approval authority, dispute SLA, partner communication, appeal route, clawback handling, fraud escalation, and program feedback.
- Separates eligibility disputes, duplicate attribution, late registration, calculation errors, clawbacks, tier disputes, fraud suspicion, appeals, and program learning paths.
- Flags relationship-pressure payouts, spreadsheet truth, evidence gaps, hidden eligibility rules, double payouts, fake leads, weak appeals, partner trust damage, and repeated dispute patterns.
