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

## 2. Localized product-media handoff

`product-asset-production` owns the independently acceptable **Product Asset
Production Pack**: deterministic capture, source scenes, finished screenshots,
key/capsule art, trailers and channel variants, localization/accessibility,
rights/provenance, exact-file digests, and QA. Product Lifecycle owns only the
program coverage, dependency, and acceptance record for that pack.

When orchestrated, the planning Product Program Manifest revision supplies
release targets and stable handoff IDs. The selected Marketing branch and/or
Store Listing branch supplies its exact brief/request revision. Product Asset
Production consumes only those applicable revisions and returns accepted files
when exact media is required. Only selected downstream branches consume the
pack. Distribution owns upload, processing, submission, release, and live
readback when publication is selected. The later observed-state Program
Manifest revision indexes the applicable exact outputs without copying facts.

```text
[planning manifest revision] + App/Game truth
+ selected Marketing and/or Listing brief/request
-> Product Asset Production Pack when exact media is required
-> selected listing and/or campaign revision
-> Distribution Evidence Pack when publication is selected
-> observed-state manifest revision when orchestrated
```

Reject any same-revision back-reference. A changed downstream request creates a
new brief or pack revision. YouTube and X remain first-class requested outputs
when selected; their current API, format, disclosure, moderation, and
synthetic-media requirements are retrieved by the production/distribution
owners at execution rather than copied into this program reference.

## 3. Vendor-neutral SDK adapter registry

Consume semantic port, data, consent, startup and degradation requirements from the App/Game Design Blueprint. Product Lifecycle owns provider selection, versions, packaging, disclosure, conformance, replacement, and release evidence. Define ports before providers:

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
