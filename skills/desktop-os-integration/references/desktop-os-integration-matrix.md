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

## macOS details

Cover: app bundle identity, notarization expectation, sandbox if applicable, menu bar/dock behavior, login items, accessibility/screen recording/files permissions, keychain, app support directory, launch agents/daemons, universal binaries, and backup interaction.

## Windows details

Cover: installer/MSIX identity, code signing, Start menu, tray, startup tasks, registry/file associations, services, notifications, credential manager, AppData/ProgramData, firewall prompts, update service, uninstall cleanup, and Microsoft Store certification when relevant.

## Desktop support checklist

Support tools or docs should answer: app version, build channel, OS version, install path, update status, local data path, log export path, permission state, background process state, account/license state, backup/export status.
