# Web Discovery, PWA, And Global Reach

## Contents

1. Public-web discovery contract
2. SEO and social metadata
3. PWA decision
4. Performance and resilience
5. Responsive, accessible and global reach
6. Current-authority sources

## 1. Public-web discovery contract

SEO is useful only for content that should be found, understood, and revisited publicly. Separate:

- indexable acquisition, educational, documentation, reference, integration, template, and public artifact pages;
- public but non-indexable authentication, temporary campaign, duplicate/filter, preview, and operational routes;
- authenticated, personalized, tenant, billing, admin, support, internal-search, and secret routes that should remain private.

For every public route define intent, unique value, canonical source, stable URL, status codes/redirects, semantic heading/link structure, title/description, canonical and locale alternates, render strategy, cache/freshness, structured data disposition, social preview, sitemap membership, robots behavior, analytics consent, update owner, expiry, and deletion/redirect behavior.

Do not use `robots.txt` as access control. Do not publish private content and hope `noindex` keeps it secret. Authorization belongs at the data and route boundary.

## 2. SEO and social metadata

### Technical and content contract

- Serve meaningful semantic HTML and accessible link relationships.
- Use stable descriptive URLs, one preferred canonical where duplicates exist, and correct redirects/status codes.
- Generate truthful unique titles and descriptions from approved content truth.
- Keep navigation and important content discoverable without fragile client-only interaction.
- Publish XML sitemaps for selected canonical public URLs and keep removed URLs out.
- Use `hreflang` only for real localized equivalents with reciprocal relationships and a deliberate fallback.
- Add structured data only when visible page content and current eligibility support the exact type; validate it and never promise a rich result.
- Set Open Graph and applicable platform card metadata from an approved social-preview artifact; define image dimensions, alt/description, locale, URL and fallback.
- Separate public site search from authenticated product search and prevent internal search/filter explosions from becoming indexable inventory.
- Define JavaScript rendering, hydration failure, bot/user parity, pagination, infinite scroll fallback, canonicalization and content freshness deliberately.
- Use truthful `200`, redirect, `404`, `410`, error and temporary-unavailable behavior; a branded error page with a success status is still a false response.

### Outcome measurement

Measure qualified discovery through indexed canonical coverage, crawl/render errors, query/page intent, click-to-value, activation quality, retained value, conversion, support/refund/trust outcomes, and content decay. Rankings, impressions, clicks, content volume and AI citations are diagnostics, not product outcomes.

### Failure actions

Withdraw or correct pages when claims are stale, content is duplicated/thin, structured data is unsupported, locales drift, private data leaks, status codes lie, or traffic grows while retained value and trust deteriorate.

## 3. PWA decision

Responsive, accessible, secure, fast web is the universal baseline. PWA is a product capability, not a badge.

| Select PWA when | Usually keep conventional web when |
| --- | --- |
| repeated task frequency makes installability useful | use is occasional, informational, or acquisition-only |
| offline/local-first reading or creation has real value | authoritative work cannot safely proceed offline |
| resumable background or interrupted workflows matter | simple request/response pages are enough |
| push or OS-level re-engagement serves an opted-in user job | notifications would mainly manufacture engagement |
| share/file/protocol/device integration improves the core job | browser capability adds little beyond URL access |
| one installable cross-platform product is strategically valuable | native/desktop semantics dominate and web is a companion |

If selected, define:

- install criteria, manifest identity, icons, display modes, scope, start URL, deep links and uninstall/data expectations;
- capability detection and semantic fallback for install, push, storage persistence, background work, share targets, files, payments and device APIs;
- service-worker registration, versioning, cache namespaces, navigation/data strategies, integrity, update discovery, activate-now vs finish-work behavior, multi-tab coordination and rollback;
- offline read/write eligibility, local queue, idempotency, conflict, authoritative actions that must stay online, stale indicators, retry, partial sync and recovery;
- storage quota/eviction, local encryption where appropriate, logout/account switch, device sharing, corruption and clear-data behavior;
- browser/OS matrix, accessibility, keyboard/touch/pointer, low-memory and low-bandwidth proof.

Never cache authenticated HTML, tenant data, secrets, billing results, or mutation responses with a generic public strategy. Never let a stale service worker strand users on incompatible client/server versions. An installed PWA is still a web product with browser and platform variation.

## 4. Performance and resilience

Set product-specific budgets and test real distributions. As retrieved on 2026-07-14, the current Core Web Vitals “good” thresholds are LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1 at the 75th percentile of page visits, segmented across mobile and desktop. Refresh these values at execution and do not substitute them for end-to-end task performance.

Budget and observe:

```text
DNS/TLS/connection and first response
critical HTML/CSS/font/image bytes
JavaScript download, parse, execute and hydration
largest content render and layout stability
interaction latency and long tasks
route transition and data fetch
memory, storage, CPU, battery and background work
API/database/queue latency and error tails
cache hit, stale, eviction and update outcomes
```

Use progressive enhancement for public and core workflows where feasible. Prioritize server-rendered or pre-rendered public content, streamed/partial authenticated states where useful, code/data splitting by user job, responsive images, font fallbacks, stable geometry, bounded third parties, cancellation of obsolete work, and honest degraded states.

Test cold/warm/repeat visits, first-time and returning users, signed-out/in, low-end devices, slow/high-latency/offline networks, long/RTL content, large tenants, dependency failures, expired sessions, disabled JavaScript where the route promises a baseline, service-worker update, and restored tabs.

## 5. Responsive, accessible and global reach

### Responsive and input

Recompose by task priority across compact, medium and wide layouts. Account for safe areas, virtual keyboards, zoom, text expansion, pointer precision, hover absence, keyboard shortcuts, focus restoration, multiple windows/tabs, printing and reduced motion. Do not shrink a desktop layout or hide essential actions behind viewport assumptions.

### Accessibility

Use the current applicable accessibility authority and test semantics, name/role/value, focus, keyboard, screen-reader flows, contrast, reflow, text spacing/zoom, target size, motion, time limits, errors, status messages, authentication, media alternatives and cognitive clarity. Automated scanning is one signal, not conformance proof.

### Internationalization and culturalization

Externalize user-visible content and message templates. Support Unicode, fonts, fallback, line breaking, plural/gender rules, locale-aware numbers/dates/timezones/currencies, RTL/bidi isolation, address/name formats, sorting/search, input methods, translated metadata, images with text, support channels and legal/commerce differences. Keep translation source IDs and product versions traceable.

Locale availability may be gated by translation quality, font/input, support, payment, legal, moderation, and operational readiness—not by a hidden half-localized fallback. Define fallback and withdrawal behavior.

## 6. Current-authority sources

Retrieve current requirements rather than treating these links as frozen rules:

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Schema.org](https://schema.org/)
- [Open Graph protocol](https://ogp.me/)
- [MDN Progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [MDN PWA installability](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [web.dev Core Web Vitals](https://web.dev/articles/vitals)
- [W3C Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG22/)

Record source, retrieval date, browser/search/platform scope, version, and the product decision it supports.
