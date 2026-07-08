---
name: partner-spiff-dispute-resolution-review
description: Design and audit partner SPIF dispute resolution for channel, reseller, referral, marketplace, and sales incentive programs covering eligibility, deal registration, attribution conflicts, payout calculations, evidence packets, approval authority, clawbacks, fraud signals, partner communication, SLA, appeals, program learning, and ROI. Use when incentive disputes risk channel trust or payout abuse.
---

# Partner SPIF Dispute Resolution Review

Use this skill to convert partner SPIF dispute, channel incentive dispute, referral payout conflict, reseller rebate dispute, deal registration conflict, attribution claim, payout calculation, clawback, and partner appeal questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify program terms, partner claim, eligible action, deal/account, attribution source, payout formula, evidence packet, approval authority, dispute SLA, fraud indicators, clawback state, communication owner, and learning path.
2. Read `references/partner-spiff-dispute-resolution-patterns.md`.
3. Classify the situation as eligibility dispute, duplicate attribution claim, payout calculation dispute, late deal registration, clawback dispute, partner tier dispute, fraud suspicion, or appeal after denial.
4. Define dispute intake, evidence requirements, source-of-truth order, reviewer/approver roles, calculation audit, partner communication, SLA, appeal route, clawback handling, fraud escalation, and program feedback.
5. Produce SPIF dispute resolution review, state machine, decision table, event schema, evidence checklist, partner communication plan, and incentive-program learning loop.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not resolve disputes from relationship pressure instead of program terms, evidence, and independent approval.
- Do not let sales notes or spreadsheets override the incentive source of truth without exception approval.
- Do not surprise partners with undisclosed eligibility, clawback, tax, invoicing, or timing rules during a dispute.
- Do not treat disputes as one-off noise; feed patterns back into program terms, attribution, partner education, and fraud controls.

## Output format

```text
Partner SPIF dispute context:
Audience / source of truth / risk boundary:

Dispute resolution plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Eligibility, attribution, evidence, calculation, approval, communication, appeal, clawback, and program learning:
- <trigger> -> <policy, metric, edge case, support note>
```
