# macOS Release Systems

macOS users judge desktop quality through trust surfaces: install friction, permission prompts, menu behavior, data safety, update reliability, and uninstall clarity.

## Rule IDs

- `macos-1` — App bundle identity, display name, bundle identifier, version, icon, supported architectures, and minimum OS must be intentional and stable.
- `macos-2` — Signing, hardened runtime, and notarization expectations must be satisfied for the chosen distribution path.
- `macos-3` — Sandbox entitlements and permissions should be the minimum needed and requested at the moment of value.
- `macos-4` — Explain recovery for denied permissions such as files/folders, screen recording, accessibility, microphone, camera, contacts, calendar, and notifications.
- `macos-5` — Secrets belong in keychain-style secure storage, not app support JSON, logs, or preferences.
- `macos-6` — App Support, caches, logs, exports, user documents, and temporary files need clear ownership, backup behavior, and uninstall behavior.
- `macos-7` — Login items, launch agents, menu bar agents, and background helpers must be disclosed and user-controllable.
- `macos-8` — Auto-update must verify signatures, handle interrupted updates, and expose current version/channel.
- `macos-9` — Native shell behavior should respect menu bar, Dock, keyboard shortcuts, window restoration, notifications, focus, and dark mode.
- `macos-10` — Support diagnostics should collect app version, OS version, architecture, permissions, update state, log bundle, and data path without exposing secrets.

## Readiness decision table

| Area | Ready signal | Blocker signal | Proof |
| --- | --- | --- | --- |
| Identity | Stable bundle ID/version/icon | Changing identity breaks updates/data | built app metadata readback |
| Signing/notarization | Gatekeeper-friendly install | unsigned/quarantined warning surprise | notarization/signing verification |
| Permissions | Prompt at moment of value | first-launch permission wall | permission walkthrough |
| Data | Supportable data/cache/log paths | secrets in logs or unclear backup | data inventory |
| Login/background | User can enable/disable | hidden persistent helper | settings and process check |
| Updates | Signed staged recovery | broken update bricks app | update/rollback rehearsal |
| Uninstall | Expected cleanup choices | lingering sensitive agents/data | uninstall checklist |

## State machine

```text
downloaded -> quarantine_checked -> first_launch -> permission_needed
permission_needed -> permission_granted -> feature_enabled
permission_needed -> permission_denied -> recovery_instructions_shown
installed -> login_item_enabled -> background_running
update_available -> update_downloaded -> signature_verified -> update_applied -> version_confirmed
update_applied -> update_failed -> rollback_or_reinstall_path
uninstall_started -> background_stopped -> user_data_choice -> uninstall_complete
```

## Event schema

Recommended diagnostics/events:

- `macos_first_launch`: app_version, os_version, architecture, distribution_channel.
- `macos_permission_prompted`: permission_type, trigger_feature, result, recovery_opened.
- `macos_login_item_changed`: enabled, source, user_initiated.
- `macos_update_result`: from_version, to_version, channel, signature_verified, result.
- `macos_crash_reported`: app_version, os_version, architecture, last_update_age.
- `macos_diagnostic_exported`: includes_logs, includes_permissions, redaction_version.

## Release checklist

- Bundle identity, icon, versioning, supported OS/architecture, and display names are stable.
- Signing, hardened runtime, notarization, and distribution instructions match the channel.
- Permission prompts are feature-timed and have recovery guidance.
- Keychain, app support, cache, logs, exports, backups, and uninstall behavior are documented.
- Login items/background helpers/menu bar behavior are visible and controllable.
- Auto-update and rollback/reinstall path are tested.
- Support can diagnose version, permissions, data path, update state, logs, and crash state.
