# App Quality And Reach

## 1. Platform semantics before framework choice

Define one semantic product model and explicit platform ports. Shared business rules do not imply identical layouts, inputs, permissions, commerce, storage, lifecycle, or distribution.

| Surface | Mobile | Tablet/desktop | HTML5/PWA |
| --- | --- | --- | --- |
| Input | touch, gestures, keyboard/accessibility switch | keyboard, pointer, touch, shortcuts, windows | keyboard, pointer, touch, optional controller, assistive tech |
| Layout | portrait/landscape, insets, one-hand reach | resizable windows, density, multi-pane | responsive viewport, zoom, browser chrome, embeds |
| Lifecycle | background/foreground, interruptions, OS eviction | multi-window, sleep/wake, tray/menu as applicable | tab freeze/discard, navigation, refresh, storage eviction |
| Storage | sandbox, secure storage, backup rules | local files, user folders, cloud sync | IndexedDB/cache/storage quotas and clearing |
| Platform service | sign-in, notifications, share, billing | file associations, menus, notifications, store/direct | manifest, service worker, deep links, share/install/push availability |
| Distribution | app stores/direct where permitted | stores/direct installers | URL, PWA install where supported, search/discovery |

`platform-1` — Responsive means workflow and information hierarchy adapt to space and input. It is not a desktop canvas scaled down or a phone screen stretched wide.

`platform-2` — Preserve semantic state and entitlement across platforms while adapting interaction. State which capabilities differ and why.

`platform-3` — Use progressive enhancement. A missing browser/OS capability degrades to a useful alternative rather than blocking the whole app.

## 2. HTML5/PWA as a first-class target

For applicable products specify:

- Web App Manifest name/icons/start URL/scope/display/orientation and deep-link behavior;
- service-worker install/activate/update, cache versioning, offline shell/data, stale policy and eviction recovery;
- browser storage authority, quota/eviction detection, export and cloud reconciliation;
- navigation/history/refresh/back behavior, URL ownership, authentication return and multi-tab coordination;
- touch, pointer, keyboard, focus, shortcuts, text input/IME, zoom and optional gamepad/controller;
- progressive download, code/data splitting, media formats, WebAssembly/WebGL/WebGPU enhancement and fallback where relevant;
- installability, notifications, background, share, file, clipboard, payments and credential capability detection;
- low-bandwidth, data-saver, offline, captive portal, resume and interrupted update;
- browser/engine/version test matrix based on live support evidence, not the label “HTML5.”

`web-1` — URL access is the lowest-friction global route only if first render, accessibility, privacy, compatibility, content delivery, and degraded behavior are production-ready.

`web-2` — A service worker can improve offline behavior and also serve stale or broken assets indefinitely. Version, validate, activate, purge, roll back, and observe it as release-critical code.

`web-3` — Do not assume PWA install, push, background execution, WebGPU, payments, or storage persistence exists uniformly. Capability-test and provide a semantic fallback.

## 3. Startup and first-value performance

Measure separate milestones:

```text
process/navigation start
-> first non-blank stable render
-> first responsive input
-> first useful local state
-> first authoritative synced state
-> first completed value event
```

Set budgets from target users and representative minimum/mid/high devices, browsers, locales, networks, account/data sizes, cold/warm/resume paths. Do not invent one universal threshold.

Startup tactics:

- keep critical path small; lazy-load optional modules and third-party SDKs;
- use local/signed cached state safely while syncing authoritative data;
- precompute or stream non-critical content; avoid serial dependency waterfalls;
- make disabled modules zero-cost and permission-free;
- measure main-thread/input blocking, memory pressure, storage I/O, network bytes/round trips, energy and thermal behavior;
- include worst-case localized strings, accessibility modes, large accounts, expired credentials, offline and update migration.

`performance-1` — Optimize continuously from the first slice. “Low-end optimization later” is a forbidden architecture plan.

`performance-2` — Visual effects, analytics, ads, AI, experimentation, remote config, and support SDKs cannot delay first useful interaction or initialize without required consent/eligibility.

## 4. Runtime quality envelopes

Declare numeric assumptions and the representative evidence required for:

| Domain | Envelope |
| --- | --- |
| Client | startup milestones, interaction latency, frame/jank, memory, storage, bundle/download, crash/hang |
| Network | bytes, requests, p50/p95/p99, timeout, retries, offline queue, loss/jitter/bandwidth |
| Service | concurrency, QPS/jobs, tenant/account/object volume, regions, latency/error SLO, headroom, overload |
| Data | consistency, conflict, retention, residency, backup, restore, RPO/RTO, migration duration |
| Operations | alert/recovery time, queue age, moderation/support volume, dependency/API failure |

Define the required user-visible behavior under saturation, delay, duplication, disconnection, partial failure, and recovery. Record implementation constraints only where they protect that behavior; leave the owning engineering project free to choose and verify its mechanisms.

`scale-1` — Architecture claims do not earn `scale-verified`; representative measurement of sustained workload, migration, degraded conditions, and recovery against the declared envelope does.

## 5. Offline, sync, and recovery

For every object/action define:

```text
local authority and cache TTL:
server authority:
offline create/update/delete behavior:
idempotency/dedupe key:
ordering and conflict policy:
user-visible stale/pending/conflict state:
retry, cancellation, undo, and support evidence:
schema/version compatibility:
```

Prefer domain-specific resolution over blanket last-write-wins. Preserve both versions when silent merge could destroy user work. Purchases, entitlements, deletion, role changes, sharing, and security state need stronger authority than preferences.

## 6. Accessibility and age-appropriate modes

Cover perceivable, operable, understandable, and robust interaction:

- semantic structure, labels, roles, states, errors and live regions;
- keyboard-only navigation, visible focus, logical order, no traps, shortcut discoverability;
- screen readers, switch/voice input, zoom/reflow, text scaling, contrast and non-color cues;
- captions/transcripts, audio descriptions where needed, haptic/visual alternatives;
- reduced motion/transparency/flashing, timing controls and pause/stop;
- cognitive clarity, plain language, consistent navigation, error prevention/recovery;
- motor target size, alternatives to precision/complex gestures and adjustable timing;
- accessibility in authentication, payment, consent, support, deletion, offline and error paths.

All-age reach means explicit audience modes:

- age/guardian/consent/territory determination with data minimization;
- child modes with private defaults, no behavioral advertising, no vulnerability profiling, no open stranger communication, and age-appropriate commerce/social behavior;
- adult-only capabilities built modularly but unavailable to ineligible modes;
- family/guardian controls that do not expose private content or create unsafe surveillance.

Retrieve current child/privacy/store authority for each territory. Never infer that “family friendly” proves compliance.

## 7. Internationalization and culturalization

Internationalize the data, UI, content, commerce, support, and asset contracts before copy:

- stable message IDs, context, plural/select, grammatical variables and fallbacks;
- separate language, script, region, currency, price, law, content and account/server settings;
- Unicode, grapheme-safe processing, normalization, fonts/glyph coverage, emoji and user names;
- RTL/bidirectional layout, CJK, IME/composition, line breaking, text expansion and vertical text where relevant;
- locale-aware date/time/time zone/calendar/number/currency/unit/address/name/sort/search;
- pseudolocalization, missing-string gates, overflow/clipping visual tests, RTL tests, OCR and screenshots;
- localized onboarding, permission copy, payment/refund, safety, support, privacy/legal, notifications, store metadata and promotional assets;
- cultural review of imagery, gestures, humor, claims, social defaults, age expectations and regulated content.

Machine translation and multi-model judging can scale coverage; neither proves native meaning or cultural safety. Preserve residual risk and use user evidence where humans are the subject.

## 8. Privacy, security, SDKs, and dormant state

The App Design Blueprint owns the semantic port: which product capability exists, what data/consent/startup behavior it permits, and how the app degrades. `product-lifecycle-architect` owns the cross-platform provider/version/disclosure/replacement and release registry. Do not maintain those provider facts in both artifacts.

For each semantic first- or third-party SDK port record:

```text
capability interface and provider/fallback:
data collected/shared, purpose, destination, retention:
consent/age/territory/entitlement preconditions:
lazy initialization and dormant-state proof:
permissions, network endpoints and background behavior:
offline/retry/idempotency and failure isolation:
version/license/SBOM/provenance/privacy manifest:
conformance/replacement test and kill switch:
```

Use typed ports for analytics, crash/diagnostics, consent, attribution, ads, commerce, auth/social, push, deep links, remote config, experimentation, AI, and support. Product semantics must not depend directly on one vendor. Emit provider-registry requirements as Product Lifecycle handoffs rather than copying the chosen provider inventory here.

Security sweep: threat model identity/session/recovery, secrets, local storage, APIs, webhooks, uploads, sharing, roles, admin/support tools, dependencies, supply chain, abuse, deletion, backup, logs/analytics, and incident response. Raw signing or production secrets never become general agent context.

## 9. Research and authority routes

Reachable or source-verified on 2026-07-11; living authority must be re-fetched:

- [Android adaptive app quality](https://developer.android.com/docs/quality-guidelines/adaptive-app-quality) — adaptive layout/input/window quality route.
- [Android offline-first architecture](https://developer.android.com/topic/architecture/data-layer/offline-first) — offline data-layer patterns.
- [Android app startup](https://developer.android.com/topic/performance/vitals/launch-time) and [Apple launch-time guidance](https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time) — measured startup routes.
- [Web App Manifest](https://www.w3.org/TR/appmanifest/) and [Service Workers](https://www.w3.org/TR/service-workers/) — install metadata and programmable offline/network foundations.
- [web.dev Baseline](https://web.dev/baseline) — current cross-browser capability route; retrieve current status.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — web accessibility requirements and principles.
- [W3C Internationalization](https://www.w3.org/International/) and [Unicode CLDR/LDML](https://unicode.org/reports/tr35/) — internationalization techniques and locale data.
- [Apple third-party SDK requirements](https://developer.apple.com/support/third-party-SDK-requirements/) — living SDK privacy/signature authority.
