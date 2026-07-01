---
name: partner-renewal-health-review
description: Design and audit partner renewal health across reseller, implementation, technology, marketplace, and channel partners covering revenue contribution, pipeline, customer outcomes, support quality, certification status, compliance, co-marketing execution, enablement usage, dispute history, contract terms, renewal risk, expansion opportunities, and exit plans. Use when partner programs need renewal decisions based on evidence rather than relationship inertia.
---

# Partner Renewal Health Review

Use this skill to convert partner renewal health, channel partner renewal, reseller health, implementation partner renewal, technology partner review, co-marketing renewal, and partner scorecard questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify partner type, contract term, renewal date, revenue, pipeline, customer outcomes, support quality, certification, compliance, enablement usage, disputes, and executive owner.
2. Read `references/partner-renewal-health-patterns.md`.
3. Classify the situation as renew as-is, renew with remediation, expand tier, reduce tier, pause referrals, decertify, renegotiate terms, or exit partnership.
4. Define health score, evidence sources, renewal criteria, remediation plan, expansion plan, contract changes, owner actions, customer communication, and post-renewal monitoring.
5. Produce partner renewal health plan, state machine, decision table, event schema, scorecard checklist, remediation plan, and renewal decision memo.

## Guardrails

- Do not renew partners only because they are friendly, strategic-sounding, or historically important.
- Do not ignore customer harm, support burden, compliance gaps, or poor implementation quality because pipeline looks strong.
- Do not expand partner tier without enablement, certification, support, and customer outcome evidence.
- Do not exit or downgrade partners without transition planning for affected customers and pipeline.

## Output format

```text
Partner renewal context:
Audience / source of truth / risk boundary:

Partner renewal health plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Scorecard, evidence, renewal decision, remediation, expansion, transition, and monitoring:
- <trigger> -> <policy, metric, edge case, support note>
```
