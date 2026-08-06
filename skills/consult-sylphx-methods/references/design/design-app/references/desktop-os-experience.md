# Desktop OS Experience

Own user-visible and state-model semantics for a selected macOS or Windows app.
Distribution Readiness owns exact package, signing/notarization/certification,
submission, rollout, and live release evidence. This contract prevents release
work from inventing product behavior at the end.

## Desktop integration contract

```text
selected OS versions/architectures and app form:
window, Dock/taskbar, menu-bar/tray and quit semantics:
startup/login item, helper, service or scheduled work and controls:
permission/capability trigger, denial, degraded mode and recovery:
file association, protocol/deep link, drag/drop and default-app behavior:
notification categories, focus/quiet behavior and settings:
credential, local data, cache, log, export, backup and migration ownership:
update status, interruption, rollback/repair and user communication:
uninstall component/data choice and returning-user restoration:
support diagnostic fields, redaction and user consent:
```

## Rules

- `desktop-exp-1` — Disclose install location, privileges, background
  components, update behavior and uninstall path before they surprise users.
- `desktop-exp-2` — Startup/login items, helpers, services, scheduled tasks,
  tray/menu-bar presence and background network work are visible,
  user-controllable, and absent when disabled.
- `desktop-exp-3` — Tray/menu-bar state has useful glance status, relevant quick
  actions, pause/quit, degraded/failure state and a route to full settings.
- `desktop-exp-4` — Ask for permissions at the moment of value. Denial produces
  a usable degraded path and exact OS-settings recovery without repeated nagging.
- `desktop-exp-5` — File associations, protocol/deep links, shell actions and
  defaults require intent, validate untrusted input and fail without silently
  taking over or losing work.
- `desktop-exp-6` — Credentials use platform secure storage. Preferences, logs,
  registry/plist, crash dumps and support bundles do not become secret stores.
- `desktop-exp-7` — App data, cache, logs, exports, local databases and temporary
  files have explicit migration, backup, retention, deletion and support paths.
- `desktop-exp-8` — Notifications have purpose/category, focus or quiet-hour
  behavior, actionable deep-link recovery and per-category controls.
- `desktop-exp-9` — Update UX exposes current version/channel/state, verifies
  before commitment, survives interruption and offers rollback, repair or safe
  reinstall when the release mechanism permits.
- `desktop-exp-10` — Uninstall stops and removes owned background components and
  integrations; user data is removed or retained only through an explicit,
  supportable choice.

## Platform mapping

| Concern | macOS semantics | Windows semantics |
| --- | --- | --- |
| Native shell | menu bar, Dock, windows/restoration, shortcuts | Start/taskbar, tray, windows, shortcuts |
| Persistence | login item and disclosed helper/agent | startup task, service, scheduled task |
| Sensitive capabilities | files/folders, screen recording, accessibility, media and automation | admin/UAC, firewall, device/file capabilities and controlled integrations |
| Secure storage | Keychain-class contract | Credential Manager-class contract |
| Local state | App Support/cache/log/export ownership | AppData/ProgramData/cache/log/export ownership |
| Files and links | open-with/defaults, document types, URLs, drag/drop | associations, protocols, shell actions, drag/drop |
| Managed use | declared MDM/policy behavior where promised | declared enterprise/silent/policy behavior where promised |

Do not encode volatile OS APIs or store rules here. Retrieve the current
platform authority during implementation and release review.

## State machines

```text
feature_requested -> permission_needed
-> granted -> feature_enabled
-> denied -> degraded_mode -> recovery_instructions -> retry_or_remain_degraded

integration_off -> user_enables -> OS_registration_attempted
-> active_and_read_back | failed_with_recovery
active_and_read_back -> user_disables -> absent_and_read_back

update_available -> user_or_policy_accepts -> download
-> verification -> apply -> version_and_state_readback
verification_or_apply -> failure -> prior_version_preserved | repair | reinstall

uninstall_started -> background_stopped -> integrations_removed
-> user_data_choice -> uninstall_complete -> residue_readback
```

## Regression and support acceptance

Cover every selected OS/architecture and promised managed/offline mode:

- clean install, supported upgrade, interrupted update, rollback/repair,
  downgrade policy, uninstall and returning-user restoration;
- first-run and feature-timed permissions, denial, reset, degraded mode and no
  repeated prompt loop;
- enable/disable/readback for login/startup, tray/menu-bar, services/helpers,
  notifications, associations, deep links and drag/drop;
- local/network/cloud-placeholder files, sleep/wake, multi-window, offline,
  proxy and low-storage failure where applicable;
- redacted support export containing app/version/channel, OS/architecture,
  permission/integration/update state, data/log locations and crash IDs.

Emit `desktop_permission_result`, `desktop_integration_changed`,
`desktop_update_state_changed`, `desktop_uninstall_result`, and
`desktop_diagnostic_exported` only when the product analytics contract selects
them; this reference defines their decision semantics, not instrumentation.

Return selected behaviors, state owners, settings, failure/recovery paths,
regression acceptance tests, unresolved OS authority, and an exact Distribution
Readiness handoff for package/signing/update/certification/live proof.
