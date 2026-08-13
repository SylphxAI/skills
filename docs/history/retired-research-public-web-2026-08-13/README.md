# Retired: `research-public-web`

**Retired:** 2026-08-13  
**Reason:** Public-page lookup is a host search/fetch job. This listing
regressed agents off those tools onto shell `curl` recipes.

## Do not restore

Do **not** restore as:

- a catalog listing (`skills/research-public-web/`)
- a "use host search first" wrapper (no procedure beyond ordinary host tools)
- a no-key SERP / DuckDuckGo / Wikipedia-curl adapter skill

## What was wrong

The body opened `references/recipes.md` first, said **do not web-search**,
and shipped copy-paste `curl` as the concrete method. Qualification evals
repeated "open recipes.md first". Baseline agents without the skill used
host web search; with-skill agents used `curl`.

## Where leftover knowledge lives

| Mechanism | Destination |
|---|---|
| Package registry version URLs | `select-dependency-versions` |
| Cite URL + retrieval time; do not treat a snippet as a read page | `synthesize-evidence-brief` and ordinary evidence honesty |
| Unknown or moved official docs | host web search and fetch tools |

Historical qualification bundles stay under
`docs/qualification/evals/research-public-web/` (archaeology, not installable).
