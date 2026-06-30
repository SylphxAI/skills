# User Preferences Patterns

## Preference state machine

```text
default_loaded -> preference_viewed -> preference_changed -> saved -> synced -> applied_everywhere
       |                 |                  |          |
       v                 v                  v          v
 inherited_policy   disabled_unavailable  save_failed  sync_conflict
```

## Rule IDs

- `prefs-1` — Define preference scope: user, device, account, workspace, browser, locale, or session.
- `prefs-2` — Separate preference, consent, security control, billing/admin setting, and entitlement gate.
- `prefs-3` — Defaults should be safe, explainable, and appropriate for new users.
- `prefs-4` — Disabled, inherited, locked, or unavailable states need reason and next action.
- `prefs-5` — Preferences should sync predictably or state clearly when local-only.
- `prefs-6` — Reset to default, export, deletion, and migration behavior should be intentional.
- `prefs-7` — Notification, privacy, accessibility, language, region, and AI personalization preferences need higher trust copy.
- `prefs-8` — Experiments must not silently override durable user choices.
- `prefs-9` — Settings search and deep links should preserve permission checks and context.
- `prefs-10` — Preference analytics should avoid collecting sensitive choices unnecessarily.

## Decision table

| Preference | Scope | Default | Risk | UX requirement |
| --- | --- | --- | --- | --- |
| Theme | User/device | System or light/dark | Low | Preview and instant apply |
| Language/region | User/account | Locale detection | Medium | Date/currency impact explained |
| Notifications | User/channel/device | Conservative | Medium | Channels, quiet hours, unsubscribe |
| Privacy personalization | User/account | Clear opt-in or policy default | High | Consent copy and data use |
| Accessibility motion/text | User/device | System-respecting | High | Never hidden behind experiments |
| AI memory/personalization | User/account | Transparent default | High | View/reset/delete controls |
| Workspace policy override | Workspace/admin | Admin-defined | Medium/high | Show inherited source |

## Preferences checklist

- Every setting has scope, default, persistence, sync, and reset behavior.
- Copy explains user impact, not internal config names.
- Sensitive preferences have auditability and support visibility where appropriate.
- Import/export/delete flows cover preference data.
- Tests cover disabled, inherited, offline, migration, and sync-conflict states.

## Event schema

Track: `preference_viewed`, `preference_changed`, `preference_save_failed`, `preference_synced`, `preference_reset_to_default`, `preference_inherited_from_policy`, `preference_disabled_viewed`, `preference_exported`, `preference_deleted`, `preference_migration_applied`.

Minimum properties: preference key, scope, old value class, new value class, default source, device/platform, policy source, sync state, privacy sensitivity, and user-visible outcome.
