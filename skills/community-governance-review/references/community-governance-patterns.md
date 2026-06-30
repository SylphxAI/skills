# Community Governance Patterns

## Community governance state machine

```text
purpose_defined -> norms_published -> roles_assigned -> activity_started -> health_monitored -> issue_escalated -> decision_reviewed -> governance_updated
       |                 |                |                  |                 |                 |                  |
       v                 v                v                  v                 v                 v                  v
 vague_purpose     norms_missing     role_conflict       spam_growth      safety_incident   faction_capture    leader_burnout
```

## Rule IDs

- `community-gov-1` — Classify community type: support, creator ecosystem, open-source, game, ambassador, customer council, or marketplace.
- `community-gov-2` — Define purpose, member promise, non-goals, decision boundaries, and product feedback route.
- `community-gov-3` — Roles need authority, responsibility, escalation path, recognition, and safety boundaries.
- `community-gov-4` — Norms should include examples, enforcement ladder, appeal/contact route, and anti-harassment policy.
- `community-gov-5` — Incentives should reward helpfulness, quality, mentorship, and retained value, not volume or brigading.
- `community-gov-6` — Events need owner, code of conduct, moderation coverage, follow-up, and product/community goal.
- `community-gov-7` — Community feedback should be synthesized with support, research, analytics, and strategy.
- `community-gov-8` — Transparency updates should explain moderation, policy changes, roadmap boundaries, and governance changes.
- `community-gov-9` — Health metrics include participation quality, response time, safety reports, newcomer activation, leader load, and sentiment.
- `community-gov-10` — Leadership succession and burnout prevention are part of governance, not optional extras.

## Decision table

| Community risk | Governance response | Metric | Follow-up |
| --- | --- | --- | --- |
| Newcomers ignored | Onboarding roles and welcome path | First helpful response time | Mentor rotation |
| High volume, low quality | Incentive redesign | Helpful accepted answers | Reduce volume rewards |
| Creator faction capture | Representative council rules | Diversity of input | Decision ownership reminder |
| Harassment report | Safety escalation | Report resolution SLA | Transparency where safe |
| Leader burnout | Succession and boundaries | Moderator load | Recruit and recognize leaders |

## Governance checklist

- Purpose, promise, and product decision boundary are explicit.
- Roles, norms, enforcement, and appeals are documented.
- Incentives align with quality and trust.
- Events and feedback loops have owners and follow-up.
- Safety, transparency, and escalation are ready.
- Health metrics include quality, inclusion, safety, and leader sustainability.

## Event schema

Track: `community_member_joined`, `community_first_response_sent`, `community_role_assigned`, `community_event_held`, `community_policy_updated`, `community_report_submitted`, `community_issue_escalated`, `community_feedback_synthesized`, `community_health_reviewed`.

Recommended properties: `community_type`, `channel`, `member_segment`, `role`, `event_type`, `norm_rule`, `issue_type`, `severity`, `response_time_minutes`, `resolution_status`, `feedback_area`, `leader_load_bucket`, `sentiment_bucket`.
