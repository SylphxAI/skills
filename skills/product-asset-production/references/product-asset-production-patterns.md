# Product Asset Production Patterns

## 1. Input and ownership record

Create the record before generating or capturing anything.

| Input | Canonical owner | Required content |
| --- | --- | --- |
| Product truth | App/Game design and exact build/runtime sources | shipped behavior, states, platform/input modes, age and territory modes |
| Orchestrated release target and handoffs, when present | planning revision of `product-lifecycle-architect` | product/build identity, selected channels, locales, audience modes, stable handoff IDs |
| Campaign brief, when the Marketing branch is selected | `marketing-automation-blueprint` or campaign specialist | audience, job, message, proof-backed claims, placement, variant hypothesis |
| Listing request, when the Store Listing branch is selected | `store-listing-optimization` | narrative beat, asset role, sequence intent, disclosure, channel and experiment need |
| Standalone production/audit request | direct request owner | stable local request/artifact identity; for audit, exact observed file/pack and source identities without a fabricated upstream handoff |
| Brand and rights | declared brand/legal/rights owner | marks, typography, voice, source licenses, talent/UGC permissions, expiry |
| Destination authority | selected platform/channel | current technical, policy, disclosure, localization, and accessibility requirements |

`asset-1` — Reject a request whose current revision depends on the output pack.
A downstream correction creates a new brief or pack revision; it never rewrites
the dependency history.

`asset-2` — A product claim without exact proof may be a clearly labeled concept
hypothesis, never a truth-claiming screenshot, demo, trailer, or comparison.

## 2. Production state machine

```text
requested
-> inputs_reconciled
-> authority_refreshed
-> source_ready
-> captured_or_created
-> transformed
-> independently_validated
-> accepted | rejected_for_revision | blocked_by_authority
-> handed_off
-> superseded_or_retired
```

Upload, processing, review, release, and live readback are downstream states.
Do not add them to the pack merely because a file exists locally.

Every transition records actor/tool, input revisions, output IDs, timestamp,
reason, QA result, and recoverable prior state. Failed transformations do not
invalidate already accepted source masters.

## 3. Asset-family coverage matrix

| Family | Typical outputs | Production risks | Required alternatives |
| --- | --- | --- | --- |
| Product capture | screenshots, UI sequences, gameplay/workflow footage, device/input variants | unreleased state, PII, debug UI, misleading crop, wrong quality tier | localized state, text-free master where useful, reduced-motion footage |
| Identity/key art | icon, logo lockup, key/capsule/feature art, thumbnail | illegibility, trademark collision, false product depiction, unsafe generative similarity | small-size test, light/dark/context variants, provenance record |
| Motion | store trailer, demo, tutorial, short/long social video, YouTube/X exports | slow opening, false pacing, unsafe flash, missing audio meaning, codec drift | captions, transcript, audio description, thumbnail, reduced-flash edit |
| Static campaign | website hero, social/display cards, creator/press kit | claim drift, text density, crop/safe-zone loss, fatigue | locale/aspect variants, alt text, source/editable master |
| Store package | screenshots, capsule/icon, preview/trailer, promotional art | channel mismatch, unsupported device frame, wrong sequence | exact channel variants and listing-request trace |
| Support/update | release visual, feature education, migration or recovery guide | stale UI, missing old-device path, coercive message | prior-version and accessible guidance where required |

The brief selects families by audience mechanism and destination. Cheap
generation is not a reason to flood every surface with low-value variants.

## 4. Deterministic capture and source creation

`asset-3` — Define exact source identity:

```text
source_id and source_revision:
commit/build/artifact and product-data schema:
fixture account, seed/save, permissions, entitlement and locale:
device/GPU/browser/input, viewport, quality/accessibility mode:
scene, navigation script, camera and timing:
network/server/environment and external dependencies:
PII/secret/debug sanitization:
expected visual assertions and reshoot predicate:
```

Use scripted scene setup and stable fixtures where the product permits. Freeze
randomness or record the seed. Capture the declared minimum-quality path as well
as premium presentation when both are marketed. Never show a high-end effect as
universal if low-end tiers materially differ.

For illustration, key art, music, voice, or generated material, preserve prompt
or direction, tool/model/version, source references, licenses, edits, contributor
or talent permissions, similarity/IP review, disclosure status, and export
settings. A generator's confidence is not a rights verdict.

## 5. Localization and cultural adaptation

Localization begins from meaning and layout intent, not raster replacement:

- bind visible text to stable message IDs and approved translations;
- support expansion, CJK line breaking, RTL/bidi, font/glyph fallback, IME and
  locale-specific number/date/currency presentation;
- adapt composition, reading order, imagery, gestures, humor, voice, music,
  sensitive topics, pricing and age treatment for the named market;
- keep product UI, captions, transcript, audio description, alt text,
  disclosures, metadata handoff, and support destination semantically aligned;
- run pseudolocalization, OCR, overflow/clipping, glyph, RTL, subtitle timing,
  pronunciation, and native functional/cultural review.

`asset-4` — Machine translation or multi-model agreement may produce a candidate;
it cannot certify native nuance, legal meaning, child suitability, or a
high-stakes purchase/privacy/safety claim.

## 6. Accessibility and sensory quality

For static files validate legibility at actual placement size, contrast, text
inside images, reading order, non-color-only meaning, and useful alt text. Alt
text describes the informative content and product state; it does not repeat a
promotional slogan.

For motion validate captions, speaker and meaningful sound identification,
transcript, audio description where needed, flash thresholds, motion intensity,
camera shake, safe zones, UI/text dwell time, loudness, clipping, intelligibility,
and reduced-motion/reduced-flash alternatives. Do not burn inaccessible text
into video when a destination supports semantic captions.

## 7. Rights, privacy, and truth ledger

Each source and file records:

```text
rights_owner, license, territory, channel, usage, modification and expiry:
talent/voice/music/UGC/third-party releases:
AI or synthetic-media provenance and required disclosure:
person/face/name/contact/device/account data and consent:
claim IDs, exact product evidence and availability window:
reviewer, decision, limitation and renewal action:
```

`asset-5` — Unknown rights, expired consent, unresolved secret/PII detection, or
an unproved material claim blocks acceptance of that file. It is not a warning
that can be offset by expected conversion.

## 8. QA and acceptance matrix

| Gate | Checks | Evidence |
| --- | --- | --- |
| Source truth | exact build/state, no debug/unreleased UI, product semantics, low/high tier honesty | scripted replay, build ID, state assertion, reviewer result |
| Brief fidelity | intended audience/job/message/placement/sequence, no added claim | brief-to-file trace and diff |
| Technical | dimensions, duration, codec/container, color, alpha, audio, size, safe zones, compression | deterministic probe output and current destination rule |
| Visual/audio | crop, hierarchy, text size, artifacts, pacing, intelligibility, thumbnail/first-frame quality | reference render and independent review |
| Localization | correct locale/state, OCR, overflow, glyphs, RTL, subtitle/voice sync, cultural meaning | automated fixtures plus qualified review status |
| Accessibility | captions, transcript, audio description/alt text, contrast, flash/motion, non-color meaning | accessibility test record and alternative file IDs |
| Rights/privacy | licenses, releases, disclosures, PII/secrets, brand/IP | rights ledger and scanner/reviewer evidence |
| Cross-file | names, prices, UI, claims, dates, disclosures, sequence, version | pack-level consistency report |
| Reproducibility | source IDs, recipe/tool versions, deterministic or tolerance rule, exact bytes | regeneration result and per-file SHA-256 |

Use independent validators for claim truth, rights, locale/culture, and final
acceptance. The producing model or pipeline cannot approve itself.

## 9. Automation and recovery

```text
input or authority change
-> compute affected source and derivative graph
-> regenerate candidates with provenance
-> run deterministic technical/privacy/claim checks
-> run independent visual/accessibility/locale/rights gates
-> compare with accepted pack and reject unintended drift
-> accept exact files and notify downstream consumers
-> monitor downstream rejection or stale input
-> reshoot, supersede, withdraw request, or retain prior accepted version
```

Cache only by exact input and tool identity. Bound concurrency, render cost,
retries, nondeterminism tolerance, and corrupted-output quarantine. A partial
failure must not publish an incomplete locale or mix old and new claims.

## 10. Current-authority routes

Retrieve exact requirements at execution. Useful canonical starting routes:

- [Apple product page optimization](https://developer.apple.com/app-store/product-page-optimization/) and [App Store Connect Help](https://developer.apple.com/help/app-store-connect/);
- [Google Play store listing documentation](https://support.google.com/googleplay/android-developer/topic/3450986) and [store listing experiments](https://support.google.com/googleplay/android-developer/answer/6227309);
- [Steam graphical asset rules](https://partner.steamgames.com/doc/store/assets) and [trailers](https://partner.steamgames.com/doc/store/trailer);
- [YouTube video upload](https://developers.google.com/youtube/v3/docs/videos/insert);
- [X media upload](https://docs.x.com/x-api/media/upload-media) and [post creation](https://docs.x.com/x-api/posts/create-post);
- [W3C media accessibility requirements](https://www.w3.org/WAI/media/av/).

Do not freeze pixel sizes, durations, codecs, upload limits, text rules, API
fields, synthetic-media disclosures, or console partner requirements in durable
skill text. Store publisher, canonical URL, scope, retrieval/effective/expiry
dates, and exact decision impact with the production pack.

## Completion checklist

- Inputs are exact, owned, acyclic, and current enough for the decision.
- Every selected destination/locale/audience/accessibility mode has an accepted
  file or an exact authority blocker.
- Every file is truthful to the named build and traces to one approved brief.
- Source, rights, consent, tools, transforms, QA, digest, and supersession are
  reproducible and reviewable.
- Marketing, Store Listing, and Distribution receive only the files and facts
  they own downstream; Product Lifecycle can index the graph without copying it.
