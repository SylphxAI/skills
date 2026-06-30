# Community Launch Patterns

## Community launch state machine

```text
community_purpose_defined -> platform_configured -> seed_members_invited -> launch_announced -> engagement_loop -> health_review -> scale_or_restructure
          |                         |                     |                  |
          v                         v                     v                  v
  no_clear_job             moderation_gap          support_overload     trust_incident
```

## Rule IDs

- `community-ops-1` — Define the community job: support, feedback, creators, beta, learning, belonging, or advocacy.
- `community-ops-2` — Design channels around jobs and escalation paths, not every possible topic.
- `community-ops-3` — Roles should clarify access, trust, responsibility, and progression.
- `community-ops-4` — Moderation policy, report path, and enforcement ladder must exist before public launch.
- `community-ops-5` — Support routing should state what is answered in community vs private support.
- `community-ops-6` — Feedback loops need triage, tags, owner, status updates, and close-the-loop posts.
- `community-ops-7` — Events and content cadence should create repeatable value, not notification spam.
- `community-ops-8` — Seed members need onboarding and norms before broad promotion.
- `community-ops-9` — Measure health: retained contributors, helpful answers, signal quality, moderation load, response time, sentiment, and safety incidents.
- `community-ops-10` — Community learnings should feed product roadmap, docs, support macros, and launch narrative.

## Decision table

| Community job | Channel design | Owner | Risk | Health metric |
| --- | --- | --- | --- | --- |
| Beta feedback | Release notes, bugs, feedback, known issues | Product/community | Duplicates/noise | Actionable reports closed |
| Developer tool support | Help, showcase, releases, API status | DevRel/support | Unofficial support promises | Time to helpful answer |
| Game community | Announcements, events, bugs, spoilers, clans | Community/live ops | Toxicity/spoilers/scams | Retained active members |
| Marketplace creators | Submissions, best practices, payouts, policy | Marketplace ops | Trust/payout disputes | Creator activation and quality |
| SaaS power users | Workflow tips, roadmap, office hours | CS/product | Feature-request overload | Useful insights and retention |
| Public launch buzz | Announcements, questions, demos | Marketing/community | One-time spike then decay | Qualified signups and retained discussion |

## Launch checklist

- Purpose, audience, value proposition, and non-goals are explicit.
- Channels, roles, permissions, bots, pinned docs, and escalation routes are configured.
- Moderation policy, report path, and owner coverage are live.
- Content/event calendar has first four weeks of durable value.
- Feedback triage and public status update rhythm are defined.

## Event schema

Track: `community_platform_configured`, `community_member_joined`, `community_onboarding_completed`, `community_post_created`, `community_answer_marked_helpful`, `community_feedback_triaged`, `community_event_hosted`, `community_report_submitted`, `community_moderation_action_taken`, `community_health_review_completed`.

Minimum properties: platform, channel, member segment, role, topic, product area, feedback status, moderation reason, owner, response time, and health outcome.
