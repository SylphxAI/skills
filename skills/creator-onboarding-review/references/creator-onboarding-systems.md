# Creator Onboarding Systems

Creator onboarding converts capable creators into trusted supply. The product must teach standards, collect evidence, review fairly, and help creators improve.

## Rule IDs

- `creator-onboarding-1` — Define creator activation as first accepted listing, install, sale, contribution, or demand-side success.
- `creator-onboarding-2` — Submission requirements should be clear before creators invest effort.
- `creator-onboarding-3` — Profiles need trust signals: identity/brand, support route, changelog, policy status, and portfolio.
- `creator-onboarding-4` — Quality checklists should be embedded into the creation flow, not only rejection emails.
- `creator-onboarding-5` — Review feedback should be specific, actionable, reason-coded, and resubmittable.
- `creator-onboarding-6` — Payout, licensing, ownership, support, moderation, refunds, delisting, and update terms must be findable.
- `creator-onboarding-7` — Analytics should teach creators what quality and demand success mean.
- `creator-onboarding-8` — Abuse controls should cover spam submissions, copied content, malware, impersonation, fake reviews, and policy evasion.
- `creator-onboarding-9` — Different creator tiers may need different review depth and support.
- `creator-onboarding-10` — The marketplace should learn from rejection themes and improve templates, docs, and tooling.

## Decision table

| Stage | Creator question | Product answer | Risk |
| --- | --- | --- | --- |
| Signup | Am I eligible? | clear criteria and examples | low-quality supply |
| Create | What good looks like? | templates and checklist | rework frustration |
| Submit | What will be reviewed? | transparent requirements | surprise rejection |
| Review | Why was I rejected? | reason-coded feedback | creator churn |
| Publish | How do I grow? | analytics and best practices | spam tactics |
| Earn | When/how am I paid? | payout terms and support | trust disputes |

## State machine

```text
creator_signup -> eligibility_checked -> profile_created -> draft_started
 draft_started -> checklist_completed -> submitted -> automated_checks -> human_review
human_review -> approved -> published -> demand_feedback
human_review -> changes_requested -> resubmitted
published -> issue_reported -> fix_or_delist
published -> payout_or_reward_ready
```

## Event schema

Recommended events:

- `creator_signup_started`: source, creator_type, supply_type.
- `creator_profile_completed`: trust_fields_completed, support_route_present.
- `creator_submission_started`: supply_type, template_used, checklist_progress.
- `creator_review_decision`: decision, reason_codes, review_time, resubmission_allowed.
- `creator_published`: listing_id, category, quality_score, first_visibility_surface.
- `creator_quality_feedback`: listing_id, demand_signal, issue_theme, suggested_action.

## Checklist

- Activation milestone is first quality publication or demand success.
- Submission requirements, policies, licensing, payouts, and support are visible early.
- Review feedback is actionable and reason-coded.
- Quality templates reduce reviewer workload.
- Metrics cover creator activation, review cycle, rejection themes, creator retention, and demand-side success.
