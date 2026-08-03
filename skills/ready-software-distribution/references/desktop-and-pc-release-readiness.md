# Desktop And PC Release Readiness

Use this module for exact release evidence after desktop/PC product semantics
have an owner-approved design. Consume the Desktop OS Experience Contract from
App Design when present; unresolved startup, permission, file, notification,
storage, credential, update, uninstall, or recovery behavior routes back to
that owner rather than being invented during release review.

## Common evidence record

```text
OS/storefront, versions, architectures, device classes and territories:
exact app/package/build/depot/branch identity and digest:
publisher/developer identity, signing/notarization/certification evidence:
install scope, privileges, background components and update channel:
declared OS integrations and user controls:
local data, credential, backup, migration and uninstall contract:
store/build claims, commerce, support and current authority:
smoke, upgrade, rollback/repair, diagnostics and live readback:
```

Common gates:

- stable identity and upgrade lineage;
- signed, provenance-bound packages and trusted update path;
- least privilege and disclosed, controllable persistence;
- safe permission denial and recovery;
- explicit local-data, backup, migration and uninstall choices;
- install, upgrade, interrupted update, rollback/repair and uninstall rehearsal;
- redacted diagnostics that identify version, channel, OS/architecture,
  permission/integration state, update state, crash IDs and support route;
- live readback of the exact released version, branch, territory and claims.

## macOS release evidence

| Area | Required proof | Blocker examples |
| --- | --- | --- |
| Identity | stable bundle ID, display/version/build, minimum OS and architectures | identity drift breaks data or update lineage |
| Trust | current signing, hardened runtime/entitlements, notarization and stapling where applicable | quarantine or signature state is unknown |
| Permissions | declared purpose, feature-timed request, denial/degraded mode and settings recovery | first-launch permission wall or hidden capability |
| Data/security | Keychain-class credential storage; App Support/cache/log/export ownership; backup and uninstall policy | secrets in preferences/logs or ambiguous retained data |
| Persistence/native shell | visible login item/helper/agent state; menu bar/Dock/window/shortcut/notification behavior | hidden helper or no quit/disable path |
| Update/recovery | verified update signature, interrupted-update handling, channel/version readback and rollback/reinstall path | updater can strand the app or corrupt state |

Test supported macOS versions and every promised architecture, including the
upgrade path from supported prior releases. Retrieve current Apple authority for
the selected distribution path; do not treat notarization submission as a
successful end-user install.

## Windows and direct-download release evidence

| Area | Required proof | Blocker examples |
| --- | --- | --- |
| Package/identity | intentional installer or MSIX identity, publisher, scope, version, architecture, shortcuts | upgrade identity changes or parallel ghost install |
| Trust/reputation | code-signing readback and channel-appropriate reputation/recovery plan | unsigned/tampered warning without safe route |
| Privilege | standard-user path; elevation only for named machine-wide need | unnecessary admin/UAC dependency |
| Integration | controllable startup/tray/service/task/firewall/file/protocol/shell behavior | hidden persistence or hijacked default |
| Data/security | Credential Manager-class storage, AppData/ProgramData inventory, migration and redacted logs | secrets in files, registry or crash dump |
| Update/uninstall | signed interrupted-update repair/rollback and component/data cleanup diff | orphan service/task/rule or unrecoverable update |

Test supported Windows editions/builds, x64/ARM64 when promised, standard and
admin users, proxy/TLS inspection, offline/direct install where offered, and
managed deployment where claimed.

## Microsoft Store addendum

Verify the current Store route separately from general Windows readiness:

- stable package/publisher/product identity, architectures, device family and
  install scope;
- least manifest capabilities with a capability-to-feature/privacy map;
- listing assets, locales, requirements, age/content, UGC, online, ads and
  purchase declarations matched to the exact build;
- IAP/subscription catalog, grant, restore/resync, refund/revoke and support
  readback when applicable;
- review notes for account, restricted capability, background task, external
  dependency and test path;
- install/launch/core workflow/purchase/restore/update/privacy-link/uninstall
  certification smoke;
- staged rollout, crash/install/review/support monitoring and replacement or
  withdrawal path.

```text
package_prepared -> manifest_reviewed -> local_smoke_passed
-> listing_and_review_package_ready -> submitted -> certification_review
-> approved -> staged_rollout -> live_readback
certification_review -> rejected -> finding_triaged
-> package_or_listing_fixed -> resubmitted
```

## Steam and PC-store addendum

Distribution owns exact build/store compatibility and live release evidence,
not wishlist strategy, listing conversion, rendered assets, creator outreach,
community operation, or the final cross-domain launch verdict.

Verify:

- exact app/build/depot/branch identities, build-account authority, upload
  receipts, processing/review state and released-branch readback;
- store claims against the build: supported OS, minimum hardware, settings,
  languages, controller/input, achievements, cloud saves, multiplayer/server,
  anti-cheat, demo scope, DLC and accessibility claims;
- install/update/uninstall, first-session crash/performance, save
  create/load/migrate/conflict/restore and rollback/hotfix paths;
- demo/playtest and release build separation, compatibility and data migration;
- current policy/partner evidence for pricing, discounts, DLC, keys, refunds,
  reviews and release operations—never policy from memory;
- exact handoffs to Store Listing for page promise, Product Asset Production
  for capsules/trailer/screenshots, Marketing for wishlist/creator/community,
  and Launch Readiness for go/no-go and first-week health.

```text
store_build_draft -> claims_reconciled -> candidate_uploaded
-> processing_or_partner_review -> release_branch_staged
-> release_live -> exact_branch_and_store_readback
release_live -> defect_or_claim_mismatch
-> hold_promotion | hotfix | rollback | supersede_build | correct_store_claim
```

## Regression and operating evidence

At minimum exercise:

- clean install, supported-version upgrade, failed/interrupted update,
  rollback/repair, downgrade policy, uninstall and remaining-data choice;
- denied/reset permissions, degraded mode, no repeated nagging;
- startup/login item, tray/menu bar, notifications, file associations, protocol
  links, drag/drop, background components and quit/disable behavior;
- store purchase/restore/revoke where used, offline/proxy/managed conditions,
  crash symbolication and redacted diagnostic export;
- live released identity, update adoption, crash/install failures, support issue
  mix and rollback/supersession result.

Recommended events preserve exact release identity: `desktop_install_result`,
`desktop_permission_result`, `desktop_integration_changed`,
`desktop_update_result`, `desktop_uninstall_result`, `pc_store_build_released`,
`pc_store_claim_checked`, `pc_store_save_integrity_checked`, and
`desktop_diagnostic_exported`.

Return one per-channel evidence matrix with pass/blocker, exact proof, owner,
next transition and live-readback result. A design declaration, local package,
portal upload, certification submission, or approved listing is not proof that
the exact build is available and healthy for users.
