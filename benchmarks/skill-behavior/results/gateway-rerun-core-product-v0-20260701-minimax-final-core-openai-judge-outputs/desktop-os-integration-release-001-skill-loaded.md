```text
OS targets: macOS 12+ (Intel + Apple Silicon universal), Windows 10/11 (x64; ARM64 if promised)
Distribution: Signed installer (PKG/MSI or MSIX) outside store; optional Store/MSIX channel for enterprise
```

## Integration matrix

- **Install/update/uninstall** → macOS: PKG, notarized, app bundle ID stable, hardened runtime, Sparkle or custom updater with EdDSA signature, uninstall via drag-to-Trash with helper cleanup. Windows: MSI/MSIX signed (Authenticode), per-user default, MSIX for enterprise, in-app updater writing to Program Files via elevation helper. Shared: staged rollout, rollback to last known good, update status surface.
- **Startup/login item** → macOS: SMAppService (LaunchAgent) registered opt-in, removable from app and System Settings. Windows: per-user Run registry key (HKCU) or Startup folder shortcut, no legacy RunOnce; disable via app settings or Task Manager Startup tab.
- **Menu bar/tray** → macOS: NSStatusItem with quick actions, quit, pause sync, error indicator. Windows: NotifyIcon with context menu, balloon for failures, never auto-launch tray on first run without consent.
- **File associations / drag-and-drop / deep links** → macOS: UTI declaration + LSItemContentTypes, custom URL scheme registered via Info.plist, prompt before default takeover. Windows: registry associations + `Software\Classes` for protocol, default-apps prompt on Windows 10/11. Shared: validate deep-link payloads, sandbox file URLs (security-scoped bookmarks on mac), safe failure on malformed input.
- **Notifications** → macOS: UserNotifications framework, categories, deliver-at focus off. Windows: Action Center via COM/Windows App SDK, toast XML, group policy suppression respected.
- **Permissions** → macOS: Accessibility, Screen Recording, Files & Folders, Automation, Notifications requested at moment of value with recovery to System Settings; Accessibility requires explicit re-enable after reinstall. Windows: Notifications, Defender/Firewall prompt justification, optional UAC for helper install.
- **Local storage** → macOS: `~/Library/Application Support/<bundleID>` (app data), `~/Library/Caches/<bundleID>` (purgeable), `~/Library/Logs` (rotated, capped). Windows: `%LOCALAPPDATA%\<App>\Data`, `%APPDATA%\<App>` for settings, `%LOCALAPPDATA%\<App>\Logs`. Shared: documented paths, never plaintext secrets.
- **Credentials** → macOS Keychain (kSecAttrAccessibleAfterFirstUnlock), Windows Credential Manager via Wincred or DPAPI. No tokens in JSON/plist.
- **Backup interaction** → Respect Time Machine exclusions for cache; exclude MachinePrefs/keychain. Windows: VSS-aware, skip Credential Manager and active log files.
- **Crash reporting** → macOS: Crashpad → Sentry/own backend, dSYM upload. Windows: minidump + symbols via Breakpad/Crashpad, PDB upload. Both: redacted PII, opt-out, symbol server with retention policy.
- **Code signing / notarization** → macOS: Developer ID + notarization ticket stapled; hardened runtime; library validation. Windows: EV or standard Authenticode; SmartScreen reputation plan; signing for updater and helper services.
- **Enterprise** → MSI/MSIX transform support, silent install flags, GROUP_POLICY registry/ADMX, MDM-friendly manifests, no background telemetry blocking GPO controls.

## Blockers

- Auto-update channel not signature-verified end-to-end (EdDSA/RSA + notarized channel) — cannot ship.
- Accessibility or Screen Recording permissions not re-promptable post-reinstall on macOS — block release until recovery doc tested.
- Login item registered without explicit user opt-in — must be off by default.
- Plaintext credentials in `~/Library/Application Support` or `%APPDATA%` — security gate.
- Windows helper service installed without elevation path or rollback on install failure — blocker.
- Deep link handler does not validate origin or payload size — security blocker.
- Uninstall leaves tray agent, login item, or notification source registered — must clean.

## User-facing settings

- Launch at login (default OFF, with first-run disclosure)
- Show in menu bar / system tray (default ON for productivity)
- Default file associations (per extension, with "Don't take over" choice)
- Notifications: categories, quiet hours/focus respect, per-channel toggle
- Auto-update: stable vs. insider channel; auto-download vs. notify
- Crash reporting opt-in/out; data retention window
- Permission status panel with "Open System Settings" deep links
- Diagnostics export (redacted support bundle) with version, channel, OS, paths

## Regression test plan

- **Install/update/rollback/uninstall**: clean install both OSes; upgrade from prior 2 versions; failed update (kill updater mid-write) recovers; downgrade prevented on schema bump; rollback to previous build; helper/LaunchAgent uninstalled; user-data choice dialog verified.
- **Permissions reset/degraded mode**: deny Accessibility, Files, Notifications, Automation; verify graceful degraded UX; reset via System Settings; reinstall preserves grant; no repeated nag loops.
- **File association / deep link / drag-and-drop**: cold-start file open, second-instance forward (Windows), URL scheme cold/warm, cloud placeholder drag (iCloud/OneDrive), security-scoped bookmark round-trip (mac), cross-volume move.
- **Login item / tray / menu bar / notifications**: enable-disable toggle, hidden tray recovery, menu bar quit, notification action callbacks, Focus Assist / Do Not Disturb suppression.
- **Enterprise / diagnostics**: silent install flags (`/quiet`, `/norestart`), MSI transform, ADMX policy read, MDM config profile; support bundle redaction; offline install path; proxy + TLS inspection; macOS Intel and Apple Silicon; Windows x64, admin and standard user.
- **Compat gate**: macOS 12–latest on Intel + AS, Windows 10 21H2+, Windows 11 latest.

Release gates: signing + notarization green, update signature check passing, crash-symbol upload verified, rollback drill signed off, permission reset tested on fresh OS image, enterprise silent install validated.
