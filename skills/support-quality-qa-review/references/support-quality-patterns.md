# Support Quality Patterns

## Support QA state machine

```text
ticket_closed -> qa_sampled -> qa_reviewed -> calibration_checked -> coaching_or_macro_update -> product_feedback_logged -> quality_tracked
      |              |              |                    |
      v              v              v                    v
 high_risk_queue   skipped_reason  disagreement       urgent_escalation
```

## Rule IDs

- `support-qa-1` — Segment QA by case risk: billing/refund, safety/trust, technical, account access, marketplace, game economy, or general help.
- `support-qa-2` — Score accuracy, policy, evidence, tone, ownership, resolution, escalation, and prevention separately.
- `support-qa-3` — High-risk cases need stronger sampling and reviewer calibration.
- `support-qa-4` — Macro quality is part of QA; stale macros create repeated failures.
- `support-qa-5` — AI-assisted responses need review thresholds, hallucination checks, and evidence links.
- `support-qa-6` — Speed metrics cannot override fairness, safety, billing correctness, or privacy.
- `support-qa-7` — QA findings should become coaching, macro changes, help-center updates, or product fixes.
- `support-qa-8` — Disagreements between QA reviewers need calibration examples and policy clarification.
- `support-qa-9` — Redact customer private data in training artifacts.
- `support-qa-10` — Quality metrics should link to customer outcomes: reopen rate, escalation success, refund fairness, CSAT, trust incidents, and time to resolution.

## Scorecard table

| Dimension | Good signal | Risk signal | Follow-up |
| --- | --- | --- | --- |
| Accuracy | Correct policy/product answer | Wrong entitlement/refund/access info | Coach and macro fix |
| Evidence | Uses timeline/order/logs | Unsupported assertion | Add tooling/support field |
| Empathy/tone | Clear and human | Blame, threat, or vague apology | Coaching example |
| Escalation | Routes high-risk case correctly | Keeps safety/billing case in wrong tier | Escalation policy fix |
| Resolution | Next action and owner clear | Customer left stuck | Workflow improvement |
| Prevention | Root cause tagged | Same issue repeats | Product/help-center backlog |

## QA checklist

- Sampling includes random, high-risk, new macro, new agent, AI-assisted, reopened, and escalated cases.
- QA reviewers calibrate with examples and disagreement handling.
- Macro changes have owner, version, effective date, and monitoring.
- Product feedback has issue owner and evidence threshold.
- Reports distinguish agent coaching from product/system defects.

## Event schema

Track: `support_ticket_closed`, `support_ticket_sampled_for_qa`, `support_qa_review_completed`, `support_qa_disagreement_logged`, `support_agent_coaching_assigned`, `support_macro_quality_issue_found`, `support_macro_updated`, `support_product_feedback_logged`, `support_quality_trend_reviewed`.

Minimum properties: channel, case type, risk class, agent/team, macro ID, QA reviewer, score dimensions, escalation result, customer outcome, root cause tag, and product owner.
