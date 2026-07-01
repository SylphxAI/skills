---
name: desktop-os-integration
description: Design and audit desktop OS integration for macOS and Windows apps, utilities, SaaS companions, developer tools, launchers, and games. Use when planning menu bar/tray behavior, installers, auto-update, startup/login items, permissions, file associations, notifications, local storage, keychain/credential storage, backup, uninstall, and OS-specific settings.
---

# Desktop OS Integration

Use this skill to make desktop software feel trustworthy on the user's machine.

## Workflow

1. Identify OS targets, distribution channel, install model, local data risk, and enterprise constraints.
2. Read `references/desktop-os-integration-matrix.md`.
3. Review install/update/uninstall, permissions, storage, credentials, notifications, startup, files, and backup.
4. Separate platform conventions from product-specific choices.
5. Define release gates for signing, notarization, updater safety, crash reporting, rollback, and enterprise controls.
6. Produce OS-specific readiness matrix, explicit regression test plan, and blockers.

## Guardrails

- Do not hide background behavior, startup persistence, or data retention.
- Do not store secrets in plain local files.
- Uninstall and backup behavior must be intentional.
- Do not approve release without update, rollback, permission reset, and cross-OS compatibility tests.

## Output format

```text
OS targets:
Distribution:

Integration matrix:
- <area> -> macOS, Windows, shared behavior

Blockers:
- <blocker>

User-facing settings:
- <setting>

Regression test plan:
- Install/update/rollback/uninstall:
- Permissions reset/degraded mode:
- File association/deep link/drag-and-drop:
- Login item/tray/menu bar/notifications:
- Enterprise/silent install/support diagnostics:
```
