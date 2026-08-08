# Public search & fetch

## Patterns

1. **Query** → collect top candidate URLs (title, snippet, engine).
2. **Fetch** primary pages; strip chrome; keep excerpts short.
3. **Cross-check** at least two independent sources for high-stakes claims.

## DuckDuckGo HTML class

- No key; HTML parsing breaks when markup changes.
- On failure: fall back to known official URLs or Wikipedia, not endless retries.

## Wikipedia API

- `action=query` / REST summary endpoints.
- Good for definitions and timelines; still verify against primary standards docs for engineering claims.

## HN Algolia

- `http://hn.algolia.com/api/v1/search?query=...`
- Useful for practitioner reports; not formal authority.

## Archive.org

- Use when live page 404s or marketing pages rewrite history.
- Cite archived URL + original URL + archive timestamp.
