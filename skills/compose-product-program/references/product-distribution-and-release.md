# Product Distribution And Release

## 1. One planning revision, many channel adapters

Distribution consumes an immutable Product Program Manifest planning revision
with release targets and stable handoff IDs, then produces one Distribution
Evidence Pack through a common adapter state machine:

```text
prepare -> validate -> build -> attest -> sign
-> notarize_or_certify_if_required
-> upload -> poll_processing -> submit_review -> poll_review
-> stage -> promote | halt
-> live_readback -> supersede | withdraw
```

Each channel declares supported transitions and portal-only/external gates. Do not pretend every store offers rollback or complete API automation.

### Distribution release record

```text
planning manifest revision and handoff IDs:
product/channel/release IDs:
source commit and reproducible build inputs:
version/build and artifact digest:
SBOM, provenance and attestation:
signing identity reference and authority scope:
platform capability/permission/SDK/privacy inventory:
server/API/schema compatibility:
localized metadata and asset manifest IDs:
submission/reviewer/certification package:
rollout policy and health gates:
recovery, superseding build and live probes:
```

Build once and promote the exact artifact. Raw signing keys remain in a secrets broker, HSM, protected CI identity, or platform service—not agent context.

## 2. Channel capability matrix

For every relevant channel live-retrieve and record:

```text
channel and product format:
public API vs partner/portal-only transitions:
first-submission/account/agreement gate:
package, signing, notarization and certification:
identity, commerce, refund, social, achievement and cloud services:
metadata/assets/locales/territories:
testing tracks/branches and staged rollout:
halt/withdraw/rollback/supersede behavior:
official source, version, retrieved_at, expires_at and digest:
```

Canonical sweep:

- Apple App Store/TestFlight and applicable Apple platforms;
- Google Play tracks and Android direct/alternative distribution;
- Huawei AppGallery, Samsung Galaxy Store and Amazon Appstore where product/audience fit;
- HTML5/web/PWA and direct URL distribution;
- Microsoft Store plus signed Windows direct distribution;
- Mac App Store and notarized macOS direct distribution;
- Linux/direct packages where applicable;
- Steam and other PC storefronts such as Epic when relevant;
- Xbox, PlayStation and Nintendo Switch partner/certification routes for games or approved product formats;
- owned web, YouTube, X and other promotional publishing surfaces as asset consumers, not binary stores.

iOS and Android lanes are mandatory for a declared mobile product. HTML5/PWA is the default low-friction global route when semantic, security, performance, commerce and platform constraints permit it. Console adapters can be architecture-ready before partner access; release readiness cannot.

## 3. Automation semantics

Platform effects are external, asynchronous and often at-least-once:

- idempotency/dedupe and durable operation receipts;
- per-product/channel distributed lock and concurrency control;
- retry/backoff, quota handling, long-running polling and resumability;
- content checksum and processing validation;
- desired state versus observed live state reconciliation;
- portal/manual external gate represented as a typed state with evidence, not an invisible checklist;
- exact role/service account permissions, short-lived tokens and rotation;
- automated stale-policy/API/schema detection and adapter quarantine;
- readback of listing/build/version/territory/price/rollout and live purchase/restore probes.

Agents can prepare, submit, poll, answer machine-readable issues, open corrective candidates, halt and recover inside authority. They cannot approve platform agreements, invent certification, hide behavior from review, or bypass external partner decisions.

## 4. Rollout and recovery

```text
eligible cohort/territory/platform/version:
canary/stage size and maximum step:
observation window, hysteresis and cooldown:
crash/hang/startup/latency/error gates:
purchase/restore/refund/entitlement gates:
support/privacy/safety/complaint gates:
auto-promote, hold, halt, degrade and withdraw actions:
minimum-version and N-1/N/N+1 compatibility:
server kill switch and feature degradation:
superseding-build path and user communication:
```

Store rollback is not universally available. Plan rollout halt, remote degradation, server compatibility, data migration safety, and a forward superseding build. Rollback may not erase committed ledger facts, grants, user data or external state.

## 5. Official research routes

These routes were verified on 2026-07-11 and must be refreshed at use:

- [App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi) and [asset upload](https://developer.apple.com/documentation/appstoreconnectapi/uploading-assets-to-app-store-connect)
- [Google Play Developer API](https://developers.google.com/android-publisher), [Edits](https://developers.google.com/android-publisher/edits), and [Reporting API](https://developers.google.com/play/developer/reporting)
- [Huawei AppGallery Connect Publishing API](https://developer.huawei.com/consumer/en/doc/AppGallery-connect-Guides/agcapi-publish_api_overview-0000001158365043)
- [Samsung Galaxy Store Developer API](https://developer.samsung.com/galaxy-store/galaxy-store-developer-api.html)
- [Amazon App Submission API](https://developer.amazon.com/docs/app-submission-api/overview.html)
- [Microsoft Store Developer CLI](https://learn.microsoft.com/windows/apps/publish/msstore-dev-cli/overview) and [Submission API](https://learn.microsoft.com/windows/apps/publish/store-submission-api)
- [SteamPipe](https://partner.steamgames.com/doc/sdk/uploading) and [Steam review process](https://partner.steamgames.com/doc/store/review_process)
- [ID@Xbox publishing](https://developer.microsoft.com/en-us/games/publish/), [PlayStation Partners](https://partners.playstation.net/), and [Nintendo publishing process](https://developer.nintendo.com/the-process)
- [Android alternative distribution](https://developer.android.com/distribute/marketing-tools/alternative-distribution)
- [Apple notarization](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
- [Web App Manifest](https://www.w3.org/TR/appmanifest/), [Service Workers](https://www.w3.org/TR/service-workers/), and [Push API](https://www.w3.org/TR/push-api/)

Do not freeze fees, revenue shares, review times, API versions/quotas/scopes, asset dimensions, locale/territory lists, product formats, regional billing exceptions, or certification rules in the skill.
