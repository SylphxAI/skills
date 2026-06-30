# Windows Release Systems

Windows release quality depends on installer trust, privilege boundaries, update recovery, OS integration, uninstall hygiene, and diagnostics across many device policies.

## Rule IDs

- `windows-1` — Choose installer/MSIX/package identity intentionally; changing identity can break updates, shortcuts, data, and Store certification.
- `windows-2` — Code signing, publisher identity, and reputation strategy must match the distribution channel and user trust expectations.
- `windows-3` — Admin elevation should be avoided unless machine-wide services, drivers, firewall, or Program Files writes require it.
- `windows-4` — Startup tasks, services, scheduled tasks, tray apps, and background agents must be disclosed and user-controllable.
- `windows-5` — Registry changes, protocol handlers, file associations, shell extensions, and context menus must ask before taking over defaults and fail safely.
- `windows-6` — Credentials belong in Windows secure credential patterns, not plain config, logs, registry values, or crash dumps.
- `windows-7` — AppData, ProgramData, cache, logs, exports, and local databases need clear backup, migration, and uninstall behavior.
- `windows-8` — Auto-update must verify signatures, tolerate interrupted updates, and provide rollback/reinstall recovery.
- `windows-9` — Notifications, firewall prompts, and background network behavior should explain product value and allow settings control.
- `windows-10` — Support diagnostics should capture app version, package identity, OS edition/build, install scope, update state, permissions, logs, and crash IDs without secrets.

## Readiness decision table

| Area | Ready signal | Blocker signal | Proof |
| --- | --- | --- | --- |
| Installer/package | Stable identity and clean install | identity change breaks updates | install/upgrade readback |
| Signing/reputation | Publisher and signature visible | unsigned warnings or tampered update | signature verification |
| Privilege | Least privilege by default | unnecessary admin/UAC | privilege test matrix |
| OS integration | Startup/tray/files/protocols controlled | hidden background or hijacked default | settings and registry readback |
| Data/credentials | Supportable safe storage | secrets in files/logs/registry | data inventory and redaction |
| Updates | Signed recoverable update | interrupted update bricks app | update/rollback rehearsal |
| Uninstall | Removes components or asks about data | orphan services/tasks/rules | uninstall diff |

## State machine

```text
installer_started -> identity_checked -> install_scope_selected -> files_installed -> first_launch
first_launch -> integration_prompted -> integration_enabled_or_skipped
installed -> update_available -> update_downloaded -> signature_verified -> update_applied -> version_confirmed
update_applied -> update_failed -> rollback_or_repair
installed -> uninstall_started -> background_components_stopped -> user_data_choice -> uninstall_complete
crash_detected -> diagnostic_bundle_created -> support_ticket_ready
```

## Event schema

Recommended diagnostics/events:

- `windows_install_result`: installer_type, install_scope, app_version, os_build, elevated, result.
- `windows_integration_changed`: integration_type, enabled, user_initiated, registry_key_or_handler.
- `windows_update_result`: from_version, to_version, channel, signature_verified, result.
- `windows_service_state`: service_name, startup_type, running, user_visible_setting.
- `windows_crash_reported`: app_version, os_build, install_scope, last_update_age.
- `windows_diagnostic_exported`: includes_logs, includes_event_ids, redaction_version.

## Release checklist

- Installer/package identity, shortcuts, Start menu entries, icons, and versioning are stable.
- Code signing and publisher identity are visible; update packages are verified.
- Privilege model is least-privilege and tested for standard users.
- Startup, tray, services, scheduled tasks, firewall, file associations, and protocols are visible and controllable.
- Credentials, AppData/ProgramData, logs, backups, migrations, and uninstall data choices are documented.
- Auto-update, repair, rollback/reinstall, and interrupted update paths are tested.
- Microsoft Store certification requirements are mapped when that channel is used.
- Support can diagnose install scope, OS build, update state, integration state, logs, and crash IDs.
