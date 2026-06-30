# Release Health Patterns

## Release health state machine

```text
release_candidate -> preflight_passed -> staged_rollout -> health_monitoring -> expand_or_hold -> full_release -> post_release_review
        |                    |                 |                 |                |
        v                    v                 v                 v                v
 preflight_failed       blocked_channel    rollback_trigger  hotfix_needed   rollback_complete
```

## Rule IDs

- `rel-health-1` — Define release type and rollback constraints before choosing metrics.
- `rel-health-2` — Separate deploy success, user journey health, business health, support health, and store/channel health.
- `rel-health-3` — Use baselines and segments; global averages can hide fatal regressions.
- `rel-health-4` — Critical journeys should have explicit smoke, telemetry, and support signals.
- `rel-health-5` — Rollout expansion requires both no blockers and enough sample size.
- `rel-health-6` — Rollback criteria need owner, trigger, action, user communication, and verification.
- `rel-health-7` — Payment, entitlement, login, onboarding, and data-loss signals are higher priority than cosmetic regressions.
- `rel-health-8` — App stores, desktop auto-updaters, and game platforms need channel-specific status and adoption tracking.
- `rel-health-9` — Support ticket tags and reviews are part of release health, not afterthoughts.
- `rel-health-10` — Post-release review should update dashboards, runbooks, release notes, and test coverage.

## Decision table

| Signal | Segment | Action | Escalation | User comms |
| --- | --- | --- | --- | --- |
| Crash-free sessions drop | Version/device | Hold rollout or rollback | Release owner + engineering | Status if broad impact |
| Login or entitlement errors rise | Plan/region | Immediate rollback/hotfix | Auth/billing owner | Direct support macro |
| Checkout conversion drops | Channel/device | Hold expansion, inspect funnel | Growth/payments owner | Avoid promotional push |
| Support tickets spike | Tag/version | Triage and link to release | Support lead | Known issue article if repeated |
| Store review delayed/rejected | App store | Pause launch dependencies | Release manager | Update launch timeline |
| Auto-update adoption stalls | OS/channel | Check updater and signing | Desktop owner | Manual update instructions if needed |

## Dashboard checklist

- Show release version, rollout percentage, platforms, channels, and start time.
- Include reliability, core journeys, payments/entitlements, support, reviews, and adoption.
- Segment by version, platform, region, plan, acquisition channel, and device class where relevant.
- Link every alert to owner, runbook, rollback path, and communication template.
- Record gate decisions and post-release learnings.

## Event schema

Track: `release_candidate_created`, `release_preflight_passed`, `rollout_started`, `rollout_percentage_changed`, `release_health_signal_evaluated`, `rollout_hold_triggered`, `rollback_started`, `rollback_completed`, `hotfix_started`, `store_review_status_changed`, `post_release_review_completed`.

Minimum properties: release ID, version, platform, channel, rollout cohort, baseline window, metric, threshold, owner, gate decision, action taken, and verification result.
