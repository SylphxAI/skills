---
name: research-public-web
description: "Research the public web without paid SERP keys; cite sources and record adapter gaps."
---

# Research Public Web

Answer a research question using **public, no-key or local adapters** first. Paid SERP/search APIs are optional fallbacks, not the default.

## When to use

- Competitive/market/docs research on public pages
- Need citeable URLs and excerpts without SerpAPI budget
- Validating claims against Wikipedia, package registries, or public HTML

## When not to use

- Private corp intranet (use authenticated tools)
- Paywalled content you are not licensed to fetch
- Deep browser automation for authenticated app flows (different job)

## Method

### 1. Frame the question

- Write the decision the research must support.
- List must-have sources (official docs, registry, standards) vs nice-to-have.

### 2. Search with free paths

Default ladder:

1. **Host web tools** already available (browser/search tools on the agent host).
2. **Public HTML search adapters** (DuckDuckGo HTML class) and vertical indexes (HN Algolia, Wikipedia API).
3. **Direct official URLs** when known (docs, RFCs, registry package pages).
4. **Archive.org** when live page is gone or changed.
5. Paid SERP only if free paths fail and budget exists—label results L4.

Open [references/providers/INDEX.md](references/providers/INDEX.md).

### 3. Fetch and extract

- Prefer primary sources over blog SEO mirrors.
- Capture URL, retrieved time, and short excerpt with locator when possible.
- Note SSRF/robots/denies and adapter failures as **gaps**, not silent skips.

### 4. Synthesize

- Answer first; cite; list contradictions and unknowns.
- Do not launder unpaid scraping into “API-backed certainty.”

## Done for this run

- Decision-ready answer or explicit blocked
- Source list with URLs
- Free-path vs paid-path usage labeled
- Gaps (blocked hosts, stale pages, thin evidence)

## Progressive disclosure

- [references/providers/INDEX.md](references/providers/INDEX.md)
- [references/providers/public-search.md](references/providers/public-search.md)
- [references/providers/reference-apis.md](references/providers/reference-apis.md)
- [references/citation-bar.md](references/citation-bar.md)

## Boundaries

- Respect site ToS and rate limits; use polite User-Agent where required
- Public web ≠ ground truth; prefer authoritative domains
