# Microsoft Store Systems

Microsoft Store readiness combines Windows package quality, listing truth, certification risk, privacy/support completeness, and rollout operations.

## Rule IDs

- `msstore-1` — Package identity, publisher identity, app name, version, architecture, and install scope must remain stable across releases.
- `msstore-2` — Manifest capabilities should be minimal, justified by product value, and reflected in privacy/support docs when sensitive.
- `msstore-3` — Store listing assets should match the Windows experience: screenshots, device family, languages, feature claims, and system requirements.
- `msstore-4` — Age rating, content descriptors, user-generated content, online interaction, ads, and purchases must match shipped behavior.
- `msstore-5` — In-app purchases or subscriptions need catalog consistency, entitlement grant/revoke, restore path, and support visibility.
- `msstore-6` — External account, sign-in, licensing, or payment dependencies should be explained in review notes and user-facing copy.
- `msstore-7` — Certification-risk areas include crashes, hangs, privacy link failures, restricted capabilities, malware-like behavior, broken uninstall, and misleading metadata.
- `msstore-8` — Update behavior must preserve identity, local data, shortcuts, file associations, and user settings.
- `msstore-9` — Support links, privacy policy, contact route, changelog, and known limitations should be ready before submission.
- `msstore-10` — Rollout should include staged release, telemetry, crash monitoring, review monitoring, and rollback/replacement plan.

## Submission decision table

| Area | Ready signal | Blocker signal | Evidence |
| --- | --- | --- | --- |
| Package identity | Stable name, publisher, version, architecture | identity drift breaks upgrades | package manifest readback |
| Capabilities | Minimal and justified | broad restricted permissions | capability-to-feature matrix |
| Listing | truthful assets and requirements | screenshots or claims mismatch app | listing/build review |
| Monetization | catalog and entitlement tested | payment works but restore/revoke absent | purchase sandbox proof |
| Quality | crash-free smoke and install/update/uninstall | startup crash, hang, broken privacy link | certification smoke |
| Support | support/privacy links work | dead links or no contact route | link and macro check |

## State machine

```text
package_prepared -> manifest_reviewed -> local_smoke_passed -> store_listing_ready
store_listing_ready -> submission_created -> certification_review -> approved -> staged_rollout
certification_review -> rejected -> issue_triaged -> package_or_listing_fixed -> resubmitted
staged_rollout -> telemetry_monitored -> full_rollout_or_pause
approved -> user_issue_reported -> support_triage -> hotfix_or_listing_update
```

## Event schema

Recommended telemetry/support events:

- `msstore_first_launch`: package_version, os_build, architecture, install_source, device_family.
- `msstore_capability_used`: capability, feature, permission_state, failure_reason.
- `msstore_purchase_result`: product_id, purchase_state, entitlement_state, restore_available.
- `msstore_submission_issue`: issue_type, build_version, policy_area, reviewer_note_needed.
- `msstore_rollout_metric`: ring, version, crash_rate, install_fail_rate, rating_delta.
- `msstore_support_contact`: app_version, install_source, category, store_order_or_license_present.

## Review checklist

- Package identity, versioning, architectures, install/update/uninstall, and data preservation are tested.
- Listing assets, languages, device support, privacy, support, and feature claims match the build.
- Capabilities, background behavior, account dependencies, purchases, ads, UGC, and online features are disclosed consistently.
- Certification smoke covers install, launch, core workflow, purchase/restore if used, update, crash, privacy/support links, and uninstall.
- Rollout has telemetry, crash monitoring, review monitoring, support macros, and rollback/hotfix path.
