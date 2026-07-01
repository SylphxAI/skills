## Desktop OS Integration Review — macOS + Windows

### 1) Release / Installer / Auto-Update

| Area | macOS | Windows | Audit Decision |
|---|---|---|---|
| Installer format | `.dmg` or signed `.pkg`; app in `/Applications` | MSI/MSIX/EXE installer; per-user or per-machine explicitly chosen | Define install scope and update scope together |
| Auto-update | Sparkle or equivalent; signed update feeds; EdDSA/signature validation | Squirrel, MSIX App Installer, custom updater, or enterprise-disabled updater | Updates must be code-signed and integrity-checked |
| Enterprise constraints | Support MDM deployment, Jamf/Intune, optional update suppression | Support SCCM/Intune/GPO, offline installer, update deferral | Provide admin controls: disable auto-update, set update channel, proxy support |
| Rollback | Keep previous version or allow reinstall | Same | Required for failed update recovery |
| Network | Respect system proxy and TLS validation | Same | No silent insecure fallback |

**Required controls**
- Signed installer and signed app binaries.
- Update metadata served over HTTPS.
- Update payload signature verified before install.
- Clear policy for per-user vs per-machine updates.
- No privilege escalation in updater unless strictly necessary and audited.

---

### 2) Code Signing, Notarization, Trust

| Area | macOS | Windows |
|---|---|---|
| App signing | Apple Developer ID Application cert | Authenticode signing with OV/EV certificate |
| Installer signing | Developer ID Installer for `.pkg` | Sign MSI/EXE/MSIX |
| Notarization | Required for distribution outside Mac App Store | N/A |
| Stapling | Staple notarization ticket to app/pkg/dmg | N/A |
| Hardened runtime | Enable unless incompatible | N/A |
| Entitlements | Minimal required entitlements only | N/A |
| SmartScreen | N/A | Reputation management; EV cert preferred |

**Audit checks**
- Verify signature after packaging.
- Verify notarization status before release.
- Timestamp signatures.
- Protect signing keys in CI using HSM/KMS or secured signing service.
- Maintain certificate rotation and revocation procedure.

---

### 3) Login Item / Startup Behavior

| macOS | Windows |
|---|---|
| Use modern Login Items / SMAppService where applicable | Use StartupApproved registry, scheduled task, or Run key carefully |
| User consent required | User consent required |
| Provide visible toggle in app settings | Provide visible toggle in app settings |

**Decision**
- Do not enable launch-at-login silently.
- Enterprise policy may preconfigure startup behavior.
- App must recover gracefully if login item is removed externally.

---

### 4) File Associations

| macOS | Windows |
|---|---|
| Declare document types in `Info.plist` | Register ProgID, extensions, icons, verbs |
| Use Launch Services | Use default app registration flow |
| Avoid hijacking common types | Avoid taking default without user action |

**Decision**
- Register supported extensions but do not force default ownership.
- Provide “Open With” support.
- Validate file input defensively.

---

### 5) Deep Links / URL Schemes

| macOS | Windows |
|---|---|
| Register custom URL scheme in `Info.plist` | Register protocol handler in registry/MSIX manifest |
| Validate incoming URLs | Validate incoming URLs |

**Controls**
- Authenticate sensitive actions after link open.
- Do not execute commands directly from URL parameters.
- Support allowlisted hosts/actions for universal/app links if used.
- Log invalid deep-link attempts without leaking secrets.

---

### 6) Drag-and-Drop

| Requirement |
|---|
| Support dragging files into app and app-specific objects out where applicable |
| Validate file type, size, path, and content |
| Handle cloud-backed files, aliases/symlinks, shortcuts, network paths |
| Avoid assuming local synchronous availability |

**Security decision**
- Treat dropped content as untrusted input.
- Do not follow symlinks into restricted locations without user intent.

---

### 7) Notifications

| macOS | Windows |
|---|---|
| Use UserNotifications framework | Use Windows toast notifications |
| Request permission at appropriate time | Register AppUserModelID where needed |
| Respect Focus / Do Not Disturb | Respect Focus Assist / notification settings |

**Decision**
- No critical workflows depend solely on notifications.
- Provide notification preferences inside app.
- Avoid sensitive content in notification body unless user opted in.

---

### 8) Tray / Menu Bar Integration

| macOS | Windows |
|---|---|
| Menu bar extra/status item | System tray icon |
| Must support quit, open, status, sync/update state | Same |
| Avoid hiding all exit paths | Same |

**Controls**
- If background agent exists, disclose it.
- Distinguish “close window” from “quit app.”
- Ensure tray/menu state updates after crash/restart.

---

### 9) Sandbox, Filesystem, and Permissions

| macOS | Windows |
|---|---|
| If sandboxed: define entitlements, app groups, security-scoped bookmarks | Respect UAC, user profile boundaries, Controlled Folder Access |
| Request Documents/Desktop/Downloads access only when needed | Avoid writing to Program Files after install |
| TCC permissions: camera/mic/contacts/calendar/files as needed | Windows privacy capabilities if MSIX |

**Decision**
- Use least privilege.
- Prefer user-selected file access over broad directory access.
- Provide clear permission rationale and degraded mode when denied.

---

### 10) Accessibility Permissions

| macOS | Windows |
|---|---|
| Requires user approval via TCC for Accessibility API | UI Automation may trigger enterprise/security scrutiny |
| Must explain purpose clearly | Must explain purpose clearly |

**Controls**
- Request only if feature truly requires it.
- App must work without accessibility permission, except for explicitly dependent features.
- No hidden keystroke capture or screen observation beyond declared purpose.

---

### 11) Crash Reporting and Diagnostics

| Requirement |
|---|
| Crash reporter initialized early |
| User consent and privacy notice required |
| Strip or redact PII, secrets, document contents, URLs, tokens |
| Support enterprise disablement |
| Include app version, OS version, architecture, install channel, update state |
| Symbolication pipeline for macOS dSYM and Windows PDB |

**Decision**
- Crash reporting must not block app startup.
- Offline queue bounded in size.
- Separate crash telemetry from product analytics where possible.

---

### 12) Enterprise Install Constraints

| Area | Requirement |
|---|---|
| Silent install | Supported with documented flags |
| Silent uninstall | Supported |
| Proxy/TLS inspection | Documented behavior; no disabling cert validation |
| Update policy | Disable, defer, pin, or channel-select via plist/GPO/registry/MDM |
| Install scope | Per-user and/or per-machine documented |
| Logging | Installer and updater logs accessible to admins |
| Network endpoints | Published for allowlisting |
| Data location | Document config/cache/log paths |
| Offline use | Define behavior without internet |
| VDI/Roaming profiles | Confirm support or limitations |

---

## Release Gate Checklist

- [ ] macOS app, helper tools, and installer signed.
- [ ] macOS notarization completed and stapled.
- [ ] Windows binaries and installer Authenticode signed and timestamped.
- [ ] Auto-update verifies signed payloads.
- [ ] Login item requires user/admin policy consent.
- [ ] File associations and URL schemes validated and non-invasive.
- [ ] Notifications permissioned and user-configurable.
- [ ] Tray/menu bar has clear quit/open/status behavior.
- [ ] Sandbox/TCC/UAC permissions are minimal and documented.
- [ ] Accessibility permission is justified and optional where possible.
- [ ] Crash reporting is privacy-reviewed and enterprise-controllable.
- [ ] Silent install/uninstall, update controls, logs, and endpoints documented.
- [ ] CI verifies signatures, notarization, installer integrity, and update feed integrity.
