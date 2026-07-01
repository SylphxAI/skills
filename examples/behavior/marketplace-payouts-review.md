# marketplace-payouts-review behavior example

skill: marketplace-payouts-review

## Positive prompt

> Audit marketplace payout flows for a plugin marketplace with revenue share, refunds, and chargebacks.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates ledger truth, displayed balances, provider states, holds, refunds, chargebacks, and payouts.
- Defines risk windows, reason-coded holds, payout failure recovery, and seller support evidence.
- Flags compliance-sensitive payout decisions for qualified review while preserving product state design.
- Covers reserves, hold release criteria, tax forms, withholding, sanctions/KYC state, country/provider eligibility, failed transfers, and negative balances for global marketplaces.
- Provides formal payout states including reversed earnings and negative balances plus audit invariants tying ledger, displayed balances, provider state, and support evidence together.

It should also produce the artifact shape requested by `skills/marketplace-payouts-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a mobile onboarding animation plan.

The skill should not load for this prompt unless the user adds an explicit marketplace-payouts-review context.

## Expected behavior

- Separates ledger truth, displayed balances, provider states, holds, refunds, chargebacks, and payouts.
- Defines risk windows, reason-coded holds, payout failure recovery, and seller support evidence.
- Flags compliance-sensitive payout decisions for qualified review while preserving product state design.
- Covers reserves, hold release criteria, tax forms, withholding, sanctions/KYC state, country/provider eligibility, failed transfers, and negative balances for global marketplaces.
- Provides formal payout states including reversed earnings and negative balances plus audit invariants tying ledger, displayed balances, provider state, and support evidence together.
