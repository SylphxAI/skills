# AI Feature Risk Patterns

## AI feature state machine

```text
ai_use_case_defined -> risk_classified -> evals_ready -> limited_beta -> monitored_rollout -> broad_availability -> ongoing_review
        |                    |             |              |                 |
        v                    v             v              v                 v
 no_ai_needed        unsafe_scope    eval_gap      rollback_or_hold   model_or_policy_update
```

## Rule IDs

- `ai-risk-1` — Define the user job and why AI is better than deterministic UX.
- `ai-risk-2` — Classify autonomy: suggestion, draft, classification, ranking, workflow automation, or agentic action.
- `ai-risk-3` — Identify harm if wrong: financial, legal, safety, privacy, reputation, access, support, or productivity.
- `ai-risk-4` — Use evals that reflect real tasks, edge cases, refusal/fallback needs, and regression risk.
- `ai-risk-5` — UI must communicate uncertainty, source, editable state, and user responsibility where relevant.
- `ai-risk-6` — Sensitive actions need human review, confirmation, policy gates, or constrained tools.
- `ai-risk-7` — Track cost, latency, quality, abuse, user correction, support contacts, and rollback signals.
- `ai-risk-8` — Privacy boundaries must cover training, retention, logging, sharing, deletion, and enterprise controls.
- `ai-risk-9` — Abuse controls must handle prompt injection, spam, policy evasion, automated fraud, and unsafe content.
- `ai-risk-10` — Model/provider changes are product changes and need eval/readiness review.

## Decision table

| AI feature type | Primary risk | Product control | Eval focus |
| --- | --- | --- | --- |
| Writing assistant | Hallucination/tone | Editable draft, source context | Faithfulness and usefulness |
| Support classifier | Misrouting/escalation | Confidence threshold and queue review | Recall for high-risk cases |
| Recommendation/ranking | Fairness/filter bubble | Diversity and explainability signals | Long-term quality and complaints |
| Agentic workflow | Unsafe tool action | Tool scopes, approvals, audit logs | End-to-end task safety |
| Financial/legal summarizer | User harm from wrong claim | Strong disclaimers and source links | Accuracy and refusal boundaries |
| Content generator | Abuse/policy risk | Moderation and rate limits | Unsafe output prevention |

## Launch checklist

- AI value, non-AI fallback, and failure harm are explicit.
- Eval set covers common, edge, adversarial, and regression cases.
- UI communicates generated state, confidence/source, and editable/review needs.
- Monitoring covers quality, cost, latency, abuse, support, and rollback.
- Support can inspect input/output context and user-visible messages safely.

## Event schema

Track: `ai_feature_request_started`, `ai_feature_output_generated`, `ai_output_user_edited`, `ai_output_rejected`, `ai_confidence_low`, `ai_human_review_requested`, `ai_guardrail_triggered`, `ai_cost_threshold_hit`, `ai_feature_support_case_opened`, `ai_feature_eval_regression_found`.

Minimum properties: feature, model/provider, autonomy level, input class, output class, data sensitivity, confidence, latency, cost, guardrail result, user action, review state, and rollback flag.
