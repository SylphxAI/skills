# Product Globalization, Assets, And SDKs

## 1. Globalization contract

Internationalization is an initial data and interface contract:

- stable message IDs and context; plural/select and grammatical variables;
- explicit fallback graph by language/script/region, not ad-hoc English fallback;
- Unicode/graphemes, fonts/glyphs, CJK, RTL/bidi, IME, sorting/search and text expansion;
- locale-aware date/time/time zone/calendar/number/currency/unit/address/name;
- localized product, payments/refunds, safety, support, privacy/legal, notification, store and marketing surfaces;
- pseudolocalization, missing-string and forbidden-literal checks, RTL/overflow visual tests, OCR and accessibility;
- glossary/style/terminology memory, translation provenance, confidence, independent model judgement and market feedback;
- cultural, legal, claim, age-rating and sensitive-topic review as explicit residual-risk states.

Use [Unicode CLDR/LDML](https://unicode.org/reports/tr35/), BCP 47 and [W3C Internationalization](https://www.w3.org/International/) as foundational routes, then map current platform locale codes at execution.

Agent translation scale does not prove native nuance. Preserve linguistic/cultural uncertainty and gather target-user evidence; never call model agreement native proof.

## 2. Localized asset factory

Create one canonical storyboard/capture manifest and derive channel/locale variants:

```text
asset_id, purpose, audience and claim-proof IDs:
source files, rights, licenses, music/voice/talent and AI provenance:
exact app/game build, fixture account, seed/state and capture script:
locale, territory, device, input, aspect, safe zones and accessibility:
screenshots, feature graphics, capsules, icons, trailers, short/long video:
captions, transcript, audio description, alt text and thumbnail:
store, website, YouTube, X and social transformations:
PII/secret/OCR, clipping, policy, age, claim and brand checks:
output digest, upload receipt, live URL/readback and expiry:
```

Automate deterministic scene setup, capture, crop/reflow, rendering, codec/size adaptation, captions, localization, QA, upload, status polling and readback. Do not hand-edit derived variants without updating the source manifest.

YouTube and X are first-class promotional outputs. Current APIs, access tiers, quotas, disclosure fields, moderation and synthetic-media rules are volatile; retrieve them live. Official routes: [YouTube videos.insert](https://developers.google.com/youtube/v3/docs/videos/insert), [X media upload](https://docs.x.com/x-api/media/upload-media), and [X create post](https://docs.x.com/x-api/posts/create-post).

## 3. Vendor-neutral SDK adapter registry

Define ports before providers:

```text
analytics | crash-diagnostics | consent | attribution | ads-mediation
commerce | auth-social | push | deep-links | remote-config
experimentation | AI-model | support | platform-services
```

Each adapter entry records:

```text
interface/schema version and conformance fixtures:
provider, fallback and replacement path:
package version, license, SBOM, provenance and update policy:
data collected/shared, purpose, destination, retention and deletion:
consent, age, territory, entitlement and device preconditions:
lazy initialization, startup budget and zero-cost dormant proof:
permissions, manifests/declarations, endpoints and background work:
offline/retry/idempotency/rate limits and event dedupe:
failure isolation, circuit breaker, kill switch and degradation:
privacy/security/store evidence and current authority record:
```

Rules:

- No vendor SDK becomes the canonical product event, consent, entitlement, experiment, or user-state model.
- Disabled means no initialization, permission, data collection, network, background job, public surface, or startup/runtime reservation.
- Consent withdrawal propagates to collection, storage, sharing, deletion and future initialization.
- SDK failure cannot block core startup unless it provides a declared correctness/security dependency.
- Replacement tests run against the port contract; provider-specific features remain isolated.
- Store privacy/data-safety disclosures derive from the same runtime SDK/data manifest and are freshness-gated.

Apple states developers are responsible for third-party SDK behavior and maintains living privacy-manifest/signature requirements: [third-party SDK requirements](https://developer.apple.com/support/third-party-SDK-requirements/). Retrieve Apple, Google and other store requirements for the exact versions at release.

## 4. Automation and evidence

```text
source/product change
-> determine affected strings/assets/SDK disclosures/channels
-> generate candidates with provenance
-> lint, pseudo, visual, accessibility, rights, privacy and policy checks
-> independent validation
-> exact-candidate build/capture/conformance test
-> bounded locale/channel canary
-> upload/reconcile/live readback
-> monitor defects, complaints, opt-outs, crashes and conversion
-> promote, halt, replace, compensate or roll back
```

Routine locale additions, release-note variants, screenshot/video exports, SDK updates and disclosure sync belong in this autonomous loop. External rights, partner, legal or store decisions remain typed authority gates.
