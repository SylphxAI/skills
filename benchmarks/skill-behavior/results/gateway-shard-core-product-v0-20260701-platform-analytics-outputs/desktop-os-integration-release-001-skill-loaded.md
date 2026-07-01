OS targets:
- macOS: current supported macOS versions, universal binary if supporting Intel + Apple Silicon.
- Windows: Windows 10/11, x64/ARM64 if applicable.

Distribution:
- Direct download and enterprise deployment assumed.
- macOS: signed, notarized `.app` in `.dmg`/`.pkg`; MDM-compatible install path.
- Windows: signed `.msi`/`.exe` or MSIX where appropriate; enterprise silent install support; optional Store certification if distributed via Microsoft Store.

Integration matrix:
- Installers -> macOS: disclose install location, login item, helper tools, sandbox scope, update behavior, uninstall path. Support `/Applications` install and MDM deployment. Windows: disclose Program Files/AppData/ProgramData usage, services/tasks, startup entries, update service, uninstall path. Shared behavior: installer must be code signed, enterprise-friendly, support silent install/uninstall, and document logs/data locations.

- Auto-update -> macOS: signed/notarized update payloads; avoid breaking Gatekeeper/quarantine expectations. Windows: signed updates, update service/task documented, enterprise controls for disabling or pinning versions. Shared behavior: signature verification, staged rollout, rollback/recovery, visible update status, admin/non-admin behavior defined.

- Login item / startup -> macOS: use modern Login Items / Service Management APIs; show in app settings; disclose background agents. Windows: use Startup Task, scheduled task, registry Run key, or service only with clear purpose. Shared behavior: opt-in or clearly disclosed during onboarding/install; user can disable.

- Tray/menu bar -> macOS: menu bar item should show sync/account/failure state; Dock visibility should be intentional. Windows: tray icon with status, quick actions, pause/snooze, open app, quit. Shared behavior: include failure/offline state, quit/pause, notification controls.

- File associations -> macOS: declare document types and ask before becoming default. Windows: register associations safely; do not forcibly take defaults. Shared behavior: fail safely when app missing/outdated; enterprise admins can preconfigure.

- Deep links -> macOS: register URL schemes/universal links with bundle identity. Windows: register protocol handlers with signed app identity. Shared behavior: validate all inputs, require auth/context checks, handle malformed links safely.

- Drag-and-drop -> macOS: respect sandbox file access security-scoped bookmarks where needed. Windows: handle files from Explorer, Outlook, browsers, and network locations. Shared behavior: validate file type/size, show import progress/failure, avoid silently copying sensitive files.

- Sandbox permissions -> macOS: request Files/Desktop/Documents/Downloads, screen recording, automation, etc. only at point of value; provide recovery instructions. Windows: if MSIX/UWP-like capabilities are used, declare minimally; otherwise document filesystem/firewall prompts. Shared behavior: least privilege and clear degraded mode.

- Accessibility permissions -> macOS: explain why Accessibility is needed; deep link user to Settings; app must function partially without it. Windows: if UI Automation/global hooks are used, disclose purpose and enterprise controls. Shared behavior: request only when user enables features that need it.

- Notifications -> macOS: use categories/actions; respect Focus. Windows: use native toast notifications; support notification center behavior. Shared behavior: user settings for categories, quiet hours/snooze, critical/error-only mode.

- Credentials -> macOS: store tokens in Keychain. Windows: store tokens in Credential Manager/DPAPI-backed storage. Shared behavior: never store secrets in plain config/logs/crash reports.

- Local data, cache, logs -> macOS: use `~/Library/Application Support`, `Caches`, `Logs`; avoid user-visible clutter. Windows: use `%AppData%`, `%LocalAppData%`, `%ProgramData%` appropriately. Shared behavior: document paths, retention, backup/export, log redaction, support bundle export.

- Crash reporting -> macOS: disclose crash reporter, symbolication, data captured, opt-out if required. Windows: same, including minidumps/WER interaction. Shared behavior: redact PII/secrets, include consent/privacy notice, enterprise disable switch.

- Code signing / notarization -> macOS: Developer ID signing, hardened runtime, notarization, stable bundle ID. Windows: Authenticode signing, timestamping, reputation management, driver/service signing if relevant. Shared behavior: signing required for app, installer, updater, helpers.

- Uninstall -> macOS: remove app, login item, launch agents/helpers if user chooses; document remaining user data. Windows: remove services, scheduled tasks, registry entries, startup entries, shell extensions, associations where owned. Shared behavior: offer “remove local data” option; do not leave background agents.

- Enterprise install constraints -> macOS: support MDM deployment, configuration profiles, managed preferences, proxy/TLS inspection considerations, notarized packages. Windows: support MSI properties, Group Policy/Intune/SCCM deployment, per-machine install, proxy support, non-admin update policy. Shared behavior: admin docs for install, update rings, telemetry/crash disablement, data locations, firewall/proxy endpoints.

Blockers:
- No signed/notarized macOS build or unsigned Windows installer/updater.
- Auto-update lacks signature verification, rollback, or enterprise disable/pinning controls.
- Login item/background helper enabled without disclosure or user/admin control.
- Credentials stored outside Keychain/Credential Manager/DPAPI-backed storage.
- Accessibility/sandbox permissions requested at launch without clear feature need.
- File associations or deep links registered aggressively without user/admin consent.
- Crash reports/logs may contain document contents, tokens, or PII.
- Uninstall leaves services, agents, scheduled tasks, startup entries, or sensitive data unexpectedly.
- No documented local data/log/cache paths for support and enterprise review.
- No silent install/uninstall or managed configuration story for enterprise customers.

User-facing settings:
- Launch at login: on/off.
- Show menu bar/tray icon: on/off where applicable.
- Auto-update channel/status; check now; enterprise-managed indicator.
- Notification categories, quiet hours/snooze, error-only mode.
- File association/default app controls.
- Deep link enablement and account/workspace handling.
- Permission status page with recovery instructions.
- Accessibility-dependent feature toggle.
- Crash reporting/diagnostics opt-in or opt-out per policy.
- Export logs/support bundle with redaction.
- Clear cache/local data; uninstall data-retention choice.
- Proxy/network configuration if enterprise environments require it.
