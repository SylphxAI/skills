# Desktop OS Integration Matrix

## Rule IDs

- `desktop-1` — Installers must clearly state install location, permissions, background services, update behavior, and uninstall path.
- `desktop-2` — Auto-update needs signature verification, staged rollout, rollback/recovery, and a user-visible status when appropriate.
- `desktop-3` — Startup/login-item behavior must be opt-in or clearly disclosed, with a setting to disable it.
- `desktop-4` — Menu bar/tray apps need useful glance state, quick actions, quit/pause, and failure status.
- `desktop-5` — File associations and deep links must ask before taking over defaults and must fail safely.
- `desktop-6` — Local data locations, cache, logs, exports, and backups must be documented and supportable.
- `desktop-7` — Credentials belong in platform secure storage such as keychain/credential vault patterns, not plain config.
- `desktop-8` — Permissions should be requested at the moment of value with recovery instructions for denied permission.
- `desktop-9` — Notifications need categories, quiet hours/focus respect, and settings.
- `desktop-10` — Uninstall should not leave surprising background agents, launch entries, or sensitive data without user intent.
- `desktop-11` — Release integrity requires signed installers/apps/helpers, macOS hardened runtime and notarization, trusted update channels, crash-symbol upload, rollback, and enterprise update controls.
- `desktop-12` — Every release needs a regression plan covering install, update, rollback, uninstall, permission reset, degraded mode, file associations, deep links, drag-and-drop, startup, tray/menu bar, notifications, and enterprise deployment on every supported OS/architecture.

## macOS details

Cover: app bundle identity, notarization expectation, sandbox if applicable, menu bar/dock behavior, login items, accessibility/screen recording/files permissions, keychain, app support directory, launch agents/daemons, universal binaries, and backup interaction.

## Windows details

Cover: installer/MSIX identity, code signing, Start menu, tray, startup tasks, registry/file associations, services, notifications, credential manager, AppData/ProgramData, firewall prompts, update service, uninstall cleanup, and Microsoft Store certification when relevant.

## Desktop support checklist

Support tools or docs should answer: app version, build channel, OS version, install path, update status, local data path, log export path, permission state, background process state, account/license state, backup/export status.

## Regression test matrix

Minimum release tests:

- Install/update/rollback/uninstall: clean install, upgrade from supported previous versions, failed update recovery, downgrade prevention, rollback path, helper/service cleanup, and remaining user-data choice.
- Permissions: first-run prompts, denied permissions, OS settings recovery, permission reset, degraded mode, and no repeated nagging for accessibility, screen recording, file access, notifications, and automation.
- Desktop affordances: login item/startup enable-disable, tray/menu bar status and quit behavior, notification activation, file association open-with/default-app behavior, deep link validation, drag-and-drop from local, network, and cloud-placeholder files.
- Compatibility: macOS Intel/Apple Silicon and supported macOS versions; Windows 10/11, x64/ARM64 when promised, admin and non-admin users, proxy/TLS inspection, offline installer, and managed/MDM deployment.
- Observability/support: crash reporter symbol upload, redacted support bundle, logs path, update status, background process state, enterprise policy readback, and support diagnostics export.
