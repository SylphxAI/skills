# Customer Community Events Patterns

## Customer Community Events Review state machine

```text
event_goal_defined -> audience_selected -> event_delivered -> feedback_captured -> followup_sent -> learning_routed
       |                   |                 |                  |                |
       v                   v                 v                  v                v
 vanity_metric       wrong_audience    moderation_issue   consent_gap      action_missing
```

## Rule IDs

- `community-events-1` — Define event job: onboarding, adoption, education, feedback, champion building, support recovery, retention, expansion, or community trust.
- `community-events-2` — Choose format by customer moment and interaction need: office hours, workshop, webinar, meetup, roundtable, cohort, or advisory session.
- `community-events-3` — Set audience criteria, capacity, timezone/language, accessibility, code of conduct, moderation, recording/quote consent, and privacy boundaries.
- `community-events-4` — Prepare run-of-show, speaker roles, demo assets, Q&A handling, escalation path, support/product owners, and follow-up owners.
- `community-events-5` — Capture structured feedback with source, segment, theme, evidence strength, consent, and routing to product/support/CS.
- `community-events-6` — Reuse content into docs, academy modules, help center, sales enablement, community posts, and release education when consent allows.
- `community-events-7` — Measure retained learning, activation, adoption, support reduction, community health, follow-up completion, and qualitative insight, not attendance alone.
- `community-events-8` — Review event fatigue, champion burden, regional representation, and whether events are masking product or docs problems.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Onboarding workshop | Teach first-value workflow | Activation blockers | Generic webinar |
| Roadmap roundtable | Set promise boundaries | Agenda and decision owner | Unapproved commitments |
| Recorded session | Capture consent and scope | Recording/quote approval | Privacy/trust issue |
| Office hours | Route recurring issues | Question themes | Support treadmill |
| Local meetup | Plan moderation and inclusion | Host/code of conduct | Unsafe community space |

## Community event checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `community_event_planned`, `community_event_invite_sent`, `community_event_attended`, `community_feedback_captured`, `community_followup_sent`, `community_learning_routed`, `community_event_retired`.

Recommended properties: `event_id, event_type, audience_segment, lifecycle_stage, locale, accessibility_need, consent_scope, attendance_count, feedback_theme, followup_owner, product_area, community_health_signal, decision`.
