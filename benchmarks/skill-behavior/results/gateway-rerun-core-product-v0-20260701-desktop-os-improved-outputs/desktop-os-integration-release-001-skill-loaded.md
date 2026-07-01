OS targets:
- macOS: supported current macOS versions, Intel and Apple Silicon/universal binary.
- Windows: Windows 10/11, x64; ARM64 only if explicitly supported and tested.

Distribution:
- Direct download and enterprise deployment assumed.
- macOS: signed `.app`/installer, hardened runtime, notarization, documented app bundle identity.
- Windows: signed installer/MSIX as applicable, Start menu integration, enterprise/silent install support, update policy controls.

Integration matrix:
- Installers -> macOS: disclose install location, app bundle ID, login item/helper behavior, sandbox/permission needs, uninstall path. Windows: disclose per-user vs machine-wide install, install path, services/tasks, Start menu entries, uninstall path. Shared behavior: installer must state update behavior, background components, and data retention.
- Auto-update -> macOS: signed updates, notarized app/helper, hardened runtime preserved, staged rollout, recovery from failed update. Windows: signed updater/service, UAC-safe update flow, proxy/TLS-inspection handling, staged rollout. Shared behavior: signature verification, rollback/recovery, channel controls, downgrade prevention, enterprise disable/pin version policy.
- Login item/startup -> macOS: use supported Login Items/SMAppService patterns; no hidden LaunchAgents unless justified. Windows: Startup Task/Run key/scheduled task/service must be visible and removable. Shared behavior: opt-in or clearly disclosed, user setting to disable.
- Tray/menu bar -> macOS: menu bar item with useful state, pause/sync/quit, error state; Dock behavior intentional. Windows: tray icon with status, quick actions, pause/quit, failure state. Shared behavior: background state must be visible and controllable.
- File associations -> macOS: request before becoming default handler; support Open With and document types safely. Windows: registry/MSIX associations must not steal defaults silently. Shared behavior: fail safely, validate opened files, handle unknown/corrupt files.
- Deep links -> macOS: registered URL schemes/universal links validate origin and parameters. Windows: URI protocol handler validates input and rejects unsafe commands. Shared behavior: no arbitrary command/file execution via link payloads.
- Drag-and-drop -> macOS: support local, network, cloud-placeholder files; sandbox-scoped access where needed. Windows: support local, UNC, OneDrive placeholder files; handle denied/locked files. Shared behavior: graceful errors, no data loss.
- Sandbox and permissions -> macOS: request files, accessibility, screen/automation permissions at point of value with recovery instructions. Windows: handle firewall, filesystem, notification, and accessibility-like APIs intentionally. Shared behavior: degraded mode for denied permissions; no repeated nagging.
- Accessibility permissions -> macOS: explain why required before prompting; provide System Settings recovery path and reset handling. Windows: document any UI automation/accessibility dependency and enterprise impact. Shared behavior: feature should degrade safely if unavailable.
- Notifications -> macOS: respect Focus, categories, activation behavior, notification settings. Windows: Action Center/toast activation, quiet hours/focus assist respect. Shared behavior: user controls for notification types.
- Credentials -> macOS: Keychain only. Windows: Credential Manager/DPAPI-backed storage. Shared behavior: no tokens/secrets in plain config, logs, crash reports, or support bundles.
- Local storage/logs/cache -> macOS: Application Support, Caches, Logs; backup behavior documented. Windows: AppData/LocalAppData/ProgramData as appropriate. Shared behavior: documented paths, retention policy, redacted diagnostics export.
- Crash reporting -> macOS: symbol upload, user/privacy disclosure, no sensitive payloads. Windows: symbol/PDB upload, minidump redaction. Shared behavior: opt-out/enterprise policy where required.
- Uninstall -> macOS: remove login items/helpers/LaunchAgents if installed; provide user-data retention choice. Windows: remove services/tasks/registry/startup/tray components; user-data choice. Shared behavior: no surprising background agents or sensitive leftovers.
- Enterprise constraints -> macOS: MDM deployment, notarization validation, policy plist/profile support, offline installer if required. Windows: silent install/uninstall, MSI/MSIX support if needed, GPO/Intune/SCCM compatibility, proxy support. Shared behavior: update disable/pin channel, diagnostics export, policy readback.

Blockers:
- No release without signed installers/apps/helpers, macOS hardened runtime and notarization, and trusted update channel.
- No release without auto-update signature verification, staged rollout, failed-update recovery, rollback path, and downgrade prevention.
- No release if login item/background behavior is hidden or cannot be disabled.
- No release if credentials are stored outside Keychain/Credential Manager/DPAPI-backed secure storage.
- No release without tested denied-permission flows for sandbox file access, accessibility, notifications, and degraded mode.
- No release if uninstall leaves background helpers, services, startup entries, or sensitive data without user intent.
- No release without enterprise silent install/update controls and proxy/offline behavior validation.
- No release without crash symbol upload and redacted support diagnostics.

User-facing settings:
- Launch at login: on/off.
- Tray/menu bar background operation: pause/resume/quit.
- Auto-update: status, channel where applicable, enterprise-managed indicator.
- File association/default handler management.
- Deep link handling visibility where applicable.
- Notifications: categories, sounds/badges, quiet behavior.
- Permissions page: current permission state and recovery links.
- Data/storage page: cache/log/export locations and clear-cache option.
- Crash reporting/diagnostics opt-out where policy permits.
- Uninstall/data retention guidance.

Regression test plan:
- Install/update/rollback/uninstall:
  - Clean install on each supported macOS/Windows version and architecture.
  - Upgrade from last supported versions.
  - Failed update recovery, rollback, downgrade prevention.
  - Signed updater verification and tampered package rejection.
  - Helper/service/login item cleanup on uninstall.
  - User-data retain/delete choice.
  - Enterprise silent install/uninstall, managed update disable/pin/channel policy.
- Permissions reset/degraded mode:
  - First-run and just-in-time permission prompts.
  - Denied accessibility, sandbox file access, notifications, automation/screen-related permissions where applicable.
  - Permission reset after OS settings change.
  - Recovery instructions open correct settings location.
  - App remains usable with clear degraded state and no nag loops.
- File association/deep link/drag-and-drop:
  - Open With and default-app behavior without silent takeover.
  - Registered document types open valid, corrupt, unknown, and oversized files safely.
  - Deep link validates scheme, parameters, authentication state, and unsafe payloads.
  - Drag-and-drop from local, network/UNC, external drive, and cloud-placeholder files.
- Login item/tray/menu bar/notifications:
  - Enable/disable startup persists correctly.
  - Tray/menu bar shows normal, paused, offline/error, updating states.
  - Quit fully stops expected background processes unless explicitly disclosed.
  - Notifications activate correct destination and respect Focus/quiet hours.
- Enterprise/silent install/support diagnostics:
  - Non-admin and admin installs where supported.
  - Proxy/TLS inspection and offline installer behavior.
  - MDM/GPO/Intune/SCCM deployment validation.
  - Policy readback visible in diagnostics.
  - Redacted support bundle includes app version, channel, OS, install path, update status, permission state, background state, logs path, and account/license state.
