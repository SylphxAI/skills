# partner-incentive-payout-governance-review behavior example

skill: partner-incentive-payout-governance-review

## Positive prompt

> Review partner incentive payout governance for referral commissions, reseller rebates, implementation bonuses, marketplace bounties, affiliate payouts, MDF, SPIFs, attribution conflicts, payout formulas, tax/invoice requirements, clawbacks, disputes, fraud controls, and ROI.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines incentive objective, eligible partners/actions/accounts, attribution source, payout formula, approval path, evidence, quality gates, invoice/tax requirements, clawbacks, disputes, fraud controls, communication, and ROI review.
- Separates referral, reseller, implementation, marketplace, affiliate, MDF, rebate, SPIF, renewal incentive, and disputed payout paths.
- Flags spreadsheet truth, duplicate claims, channel conflict, low-quality incentives, hidden clawbacks, tax/invoice gaps, payout abuse, margin leakage, and revenue-only optimization.

It should also produce the artifact shape requested by `skills/partner-incentive-payout-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Run a release readiness exception board.

The skill should not load for this prompt unless the user adds an explicit partner-incentive-payout-governance-review context.

## Expected behavior

- Defines incentive objective, eligible partners/actions/accounts, attribution source, payout formula, approval path, evidence, quality gates, invoice/tax requirements, clawbacks, disputes, fraud controls, communication, and ROI review.
- Separates referral, reseller, implementation, marketplace, affiliate, MDF, rebate, SPIF, renewal incentive, and disputed payout paths.
- Flags spreadsheet truth, duplicate claims, channel conflict, low-quality incentives, hidden clawbacks, tax/invoice gaps, payout abuse, margin leakage, and revenue-only optimization.
