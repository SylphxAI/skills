# Store Review Policy Risk Systems

Store review risk is highest when product truth, metadata, data practices, monetization, permissions, and reviewer instructions diverge.

## Rule IDs

- `store-risk-1` — Store metadata, screenshots, videos, age rating, privacy forms, data safety forms, and in-app behavior must tell the same truth.
- `store-risk-2` — Payment flows must match channel rules for digital goods, subscriptions, IAP, external payments, restore, cancellation, and refunds.
- `store-risk-3` — Sensitive permissions need just-in-time product value, fallback for denial, and reviewer instructions when the feature is not obvious.
- `store-risk-4` — UGC, chat, profiles, reviews, marketplaces, or creator content need reporting, blocking, moderation, takedown, and escalation paths.
- `store-risk-5` — Children, health, finance, gambling-like, crypto-like, AI, location, background, or safety-sensitive claims require extra review and current-policy verification.
- `store-risk-6` — Ads and promotions must match disclosures, age settings, consent, frequency, reward clarity, and deceptive-design guardrails.
- `store-risk-7` — Subscriptions need clear price, trial, renewal, cancellation route, restore, entitlement state, refund support, and metadata consistency.
- `store-risk-8` — Reviewer notes should include demo credentials, test data, hidden feature paths, purchase test instructions, and special environment needs.
- `store-risk-9` — Do not ship dark patterns: fake scarcity, hidden fees, coerced consent, disguised ads, obstructed cancellation, or misleading claims.
- `store-risk-10` — Rejections should become product feedback: classify root cause, fix metadata/build/policy, update support macros, and prevent recurrence.

## Risk decision table

| Risk area | Typical blocker | Evidence to prepare | Mitigation |
| --- | --- | --- | --- |
| Payments/subscriptions | wrong channel payment or unclear renewal | product catalog, screenshots, restore path | align flow and metadata |
| Privacy/data | forms do not match SDK behavior | data inventory and SDK list | update forms or remove collection |
| Permissions | broad permission without value | prompt timing and fallback | feature-timed prompt and reviewer note |
| UGC/community | no report/block/moderation | moderation workflow | add controls and policy links |
| Ads/promotions | deceptive reward or disclosure | ad placement map | consent, labeling, caps |
| Regulated claims | unsupported health/finance/safety claims | claim evidence and disclaimers | narrow copy and review manually |
| Children/family | ads/data/UGC mismatch | age and content matrix | stricter defaults and verification |

## State machine

```text
feature_inventory -> risk_classified -> evidence_collected -> submission_ready
risk_classified -> blocker_found -> product_or_metadata_fix -> evidence_collected
submission_ready -> review_submitted -> approved
review_submitted -> rejected -> rejection_triaged -> fix_or_appeal -> resubmitted
approved -> policy_change_or_user_report -> risk_reaudit
```

## Event schema

Recommended tracking:

- `store_risk_identified`: channel, feature, policy_area, blocker_level, owner.
- `store_evidence_ready`: channel, feature, evidence_type, reviewer_note_needed.
- `store_submission_result`: channel, build_version, result, rejection_area, reviewer_message_theme.
- `store_rejection_triaged`: root_cause, fix_type, resubmission_date, support_impact.
- `store_policy_reaudit`: channel, trigger, impacted_features, action_required.

## Review checklist

- Metadata, screenshots, privacy/data forms, age rating, purchases, ads, and in-app behavior are consistent.
- Payment, subscription, restore, cancellation, and refund flows match channel expectations.
- Permissions, UGC, children/family, health/finance, location/background, and AI claims are audited as high risk.
- Reviewer notes include demo account, test paths, purchase instructions, special setup, and hidden features.
- Rejection response plan includes root-cause classification, product fix, metadata fix, support macro, and resubmission owner.
