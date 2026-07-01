## Desktop OS Integration Review — macOS + Windows Productivity App

### 1. Release/Installer Architecture

| Area | macOS | Windows | Review Decision |
|---|---|---|---|
| Installer | `.dmg` or `.pkg`; drag-install acceptable for consumer, `.pkg` preferred for enterprise | MSI/MSIX/EXE bootstrapper depending update model | Support **enterprise-friendly installer** path on both platforms |
| Install scope | Per-user default; system install only if needed | Per-user default; per-machine MSI for enterprise | Avoid admin requirement unless enterprise install |
| Auto-update | Sparkle 2 or native updater; signed updates | MSIX/App Installer, Squirrel, WinSparkle, custom signed updater | Updates must be signed, rollback-safe, proxy-aware |
| Enterprise controls | MDM profile, managed preferences, disable auto-update option | GPO/registry/Intune/SCCM deployment | Provide documented enterprise flags/policies |

---

## 2. Code Signing, Notarization, Trust

### macOS
- Sign app, helpers, login item, updater, extensions with hardened runtime.
- Notarize every distributed build.
- Staple notarization ticket to app/installer.
- Validate entitlements:
  - Network access.
  - File access if sandboxed.
  - Automation/Apple Events only if required.
  - Accessibility only if truly needed.
- Ensure updater preserves code signature and quarantine handling.

### Windows
- Authenticode-sign:
  - Installer.
  - Main executable.
  - Updater.
  - Helper processes.
  - DLLs if shipped.
- Prefer EV certificate for SmartScreen reputation, especially at launch.
- Timestamp all signatures.
- Ensure installer/updater do not trigger antivirus heuristics through self-modifying behavior.

**Gate:** No unsigned executable artifacts in release package.

---

## 3. Auto-Update Requirements

| Requirement | Expected Behavior |
|---|---|
| Security | Signed update manifests and signed payloads |
| Reliability | Resume/retry support, rollback on failed install |
| Enterprise | Auto-update disable switch; update channel control |
| UX | Notify before disruptive restart; no surprise relaunch |
| Network | Proxy/PAC support where possible |
| Permissions | Per-user update must not require elevation |

**Risk:** Updater is often the highest-privilege component. Treat it as security-critical.

---

## 4. Login Item / Startup Behavior

### macOS
- Use modern `SMAppService` login item APIs.
- Do not use deprecated background item mechanisms unless required for older macOS.
- User must explicitly enable startup behavior.
- Provide visible preference to disable.
- Validate behavior after app rename, move, or update.

### Windows
- Prefer registry `Run` key for per-user startup or StartupTask where packaged.
- Avoid scheduled task unless justified.
- Provide user-visible toggle.
- Do not auto-enable silently during install unless clearly disclosed.

---

## 5. File Associations and Default App Behavior

| Area | macOS | Windows |
|---|---|---|
| Registration | `Info.plist` document types / UTIs | ProgID, file extension registration, Default Apps flow |
| User control | Respect Launch Services | Respect Windows default app model |
| Testing | Open-with, double-click, Quick Look/Finder behavior | Open-with, double-click, default-app settings |

**Decision:** Register supported file types, but do not force default ownership without user action.

---

## 6. Deep Links / URL Schemes

- Register custom scheme, e.g. `appname://`.
- Validate and sanitize all parameters.
- Treat deep links as untrusted input.
- Prevent command injection, path traversal, token leakage.
- Support single-instance handoff if app is already running.
- Document URL formats for enterprise/admin usage if applicable.

**Security gate:** No privileged action may be triggered by unauthenticated deep link alone.

---

## 7. Drag-and-Drop

Test:
- Files from Finder/File Explorer.
- Text snippets.
- URLs.
- Attachments from browsers/mail clients.
- Network drive files.
- Cloud placeholder files: iCloud, OneDrive, Dropbox.

Requirements:
- Validate file type and size.
- Handle unavailable/cloud-only files gracefully.
- Avoid blocking UI on large drops.
- Preserve user intent: copy vs move vs link.

---

## 8. Notifications

### macOS
- Use UserNotifications framework.
- Request permission contextually.
- Support Focus/Do Not Disturb behavior.
- Provide notification settings and disable option.

### Windows
- Use Windows toast notifications.
- Ensure AppUserModelID is stable.
- Support notification activation/deep link routing.
- Handle disabled notifications gracefully.

**UX gate:** No notification spam; actionable notifications only.

---

## 9. Tray / Menu Bar Integration

### macOS
- Menu bar extra should be optional unless core to product.
- Support dark/light mode, Retina assets, keyboard navigation.
- Provide Quit and Preferences.

### Windows
- System tray icon with stable behavior across Explorer restarts.
- Provide Quit, Open, Preferences, status indicators.
- Avoid requiring tray for background operation unless disclosed.

---

## 10. Sandbox and Permissions

### macOS
- If Mac App Store: sandbox required.
- Outside MAS: sandbox optional but still minimize entitlements.
- File access should use security-scoped bookmarks where appropriate.
- Permissions to review:
  - Files and folders.
  - Camera/microphone if applicable.
  - Contacts/calendar/reminders if applicable.
  - Apple Events.
  - Accessibility.
  - Screen recording.

### Windows
- For MSIX: app container capabilities must be declared.
- For classic Win32: document filesystem, registry, network, and credential usage.
- Avoid writing to protected locations unless elevated installer path is used.

---

## 11. Accessibility Permissions

Only request if required for:
- Global shortcuts.
- UI automation.
- Screen interaction.
- Assistive overlays.

Requirements:
- Explain why permission is needed before OS prompt.
- Detect missing permission and degrade gracefully.
- Do not repeatedly nag.
- Provide remediation instructions:
  - macOS: System Settings → Privacy & Security → Accessibility.
  - Windows: document UIAccess only if required; sign and install in trusted location.

---

## 12. Crash Reporting and Telemetry

- Crash reporter must initialize early but avoid delaying startup.
- Obtain consent where legally/product-wise required.
- Scrub PII, file contents, document titles, tokens, URLs.
- Include app version, OS version, architecture, locale, update channel.
- Symbolication pipeline required:
  - macOS: dSYM upload.
  - Windows: PDB upload.
- Enterprise control to disable telemetry/crash upload.

---

## 13. Enterprise Install Constraints

Support:
- Silent install/uninstall.
- Per-machine install.
- No forced auto-update mode.
- Proxy/TLS inspection environments.
- Offline installer.
- MSI/MSIX deployment where applicable.
- Stable install paths.
- Registry/plist managed settings.
- License activation without interactive user where needed.
- Non-admin execution after install.

Minimum admin docs:
- Install commands.
- Uninstall commands.
- Update policy.
- Network endpoints.
- Data storage locations.
- Logs location.
- Required permissions.
- File associations and URL schemes.
- Security certificate/signing details.

---

## 14. Release Readiness Gates

Block release if any are true:

- macOS build is not signed, hardened, notarized, and stapled.
- Windows installer/executables are unsigned or untimestamped.
- Updater accepts unsigned or downgradeable payloads.
- Login item starts without user awareness.
- Deep links can trigger unsafe actions.
- Accessibility/screen permissions are requested without clear need.
- Crash reports may include sensitive document content.
- Enterprise cannot disable updates or telemetry.
- File associations override user defaults without consent.
- App fails install/update on standard non-admin user account.
