---
name: app-store-distribution-readiness
description: Prepare mobile apps, desktop software, games, and utilities for distribution through App Store, Google Play, Steam, Microsoft Store, web, or direct download. Use when planning launch readiness, store metadata, screenshots, privacy disclosures, payments, subscriptions, store review, OS integration, updates, or release operations.
---

# App Store Distribution Readiness

Use this skill to prepare software for real-world distribution channels, not just a local build.

## Workflow

1. Identify product type and target channels.
2. Read `references/distribution-channel-matrix.md`.
3. Build channel-specific readiness: metadata, screenshots, payments, privacy, testing, review, release, support.
4. Identify OS integration requirements: permissions, notifications, storage, backup, update, file associations, startup behavior.
5. For subscription apps, map subscription disclosures, restore/refund/revoke states, server entitlement truth, reviewer evidence, and support ownership before submission.
6. Produce launch blockers, review risks, release checklist, and owner/evidence map.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not submit subscription apps without exact price, duration, renewal, trial end, cancellation, restore, and refund/support wording matched across app, store metadata, and screenshots.
- Do not treat local client state as entitlement truth; subscription entitlement must reconcile with App Store / Play events and server validation.
- Do not rely on store review notes alone; attach test accounts, sandbox products, reviewer steps, screenshots, support URLs, privacy evidence, and owner sign-off.
- Do not roll out broadly until crash, purchase, restore, refund/revoke, notification permission, and support-contact telemetry are readable.

## Output format

```text
Channels:
Product type:

Readiness matrix:
- <channel> — metadata, policy, payments, testing, release, support

OS/platform details:
- <detail>

Subscription and entitlement evidence:
- <item> -> owner, proof link/artifact

Review package:
- Apple:
- Google:

Launch blockers:
- <blocker and owner>
```
