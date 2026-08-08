# Agent recipes — public research (no search engine required to start)

Use host web tools when available; otherwise these **direct endpoints**.

## A. Wikipedia (L1)

```bash
# summary
curl -sS "https://en.wikipedia.org/api/rest_v1/page/summary/Cloudflare" \
  -H "accept: application/json" | head -c 800; echo

# opensearch titles
curl -sS "https://en.wikipedia.org/w/api.php?action=opensearch&search=Cloudflare%20Workers&limit=5&format=json"
```

Cite `content_urls.desktop.page` or canonical title URL. Polite User-Agent if bulk.

## B. HN Algolia (L1)

```bash
curl -sS "https://hn.algolia.com/api/v1/search?query=cloudflare%20computer&hitsPerPage=5" \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print('\n'.join(f\"{h.get('points')} {h.get('title')} {h.get('url') or h.get('objectID')}\" for h in d.get('hits',[])))"
```

## C. Package registries (L1)

```bash
# npm
curl -sS "https://registry.npmjs.org/@cloudflare/computer/latest" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['version'], d.get('description','')[:120])"

# crates.io
curl -sS "https://crates.io/api/v1/crates/serde" -H "user-agent: agent-research/1.0 (local)" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['crate']['max_version'])"

# PyPI
curl -sS "https://pypi.org/pypi/requests/json" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['info']['version'])"

# jsDelivr file/CDN probe
curl -sSI "https://cdn.jsdelivr.net/npm/lodash/package.json" | head
```

## D. Structured facts (L1)

```bash
# Open-Meteo weather (no key)
curl -sS "https://api.open-meteo.com/v1/forecast?latitude=22.32&longitude=114.17&current=temperature_2m"

# Public IP (debug egress)
curl -sS "https://api.ipify.org?format=json"

# FX (Frankfurter class — if 301/HTML, treat host as moved and fall back)
curl -sS "https://api.frankfurter.app/latest?from=USD&to=HKD,EUR" | head -c 300; echo
```

**REST Countries:** legacy `v3.1` returned deprecation errors on 2026-08-08 probe — check https://restcountries.com/docs before depending; do not hardcode broken paths.

## E. Archive.org (L1)

```bash
# availability
curl -sS "https://archive.org/wayback/available?url=https://example.com"
```

Cite archived + original URL + timestamp.

## F. DuckDuckGo HTML (brittle L1)

```bash
# Often blocked/changed; on failure skip to official URLs / Wikipedia
curl -sS -A "Mozilla/5.0 (research-agent)" \
  "https://html.duckduckgo.com/html/?q=cloudflare+workers+temporary+account" | head -c 500
```

## G. Synthesis bar

1. Answer decision first.  
2. List URLs + UTC time + short excerpt.  
3. Label free path vs any L4 paid SERP.  
4. Gaps explicit.
