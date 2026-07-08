# GEO Visibility Patterns

GEO (Generative Engine Optimization) optimizes content to be **cited** in AI answers. Being cited is the new primary success signal for many discovery paths.

## Rule IDs

- `geo-visibility-1` — Start with whether AI crawlers can access the page and whether the page answers one clear question.
- `geo-visibility-2` — Use answer-first structure: direct answer in the first paragraph, then supporting detail.
- `geo-visibility-3` — Add authoritative citations and statistics where claims matter; cite sources, do not invent them.
- `geo-visibility-4` — Use FAQPage schema for high-intent question clusters when answers are factual and maintained.
- `geo-visibility-5` — Prefer fluent, expert tone and domain terminology over generic marketing copy.
- `geo-visibility-6` — Avoid keyword stuffing; it hurts both traditional and generative visibility.
- `geo-visibility-7` — Keep high-value pages fresh; stale pages lose citation share on time-sensitive topics.
- `geo-visibility-8` — Build branded authority for product-owned facts; third-party pages compete for generic queries.
- `geo-visibility-9` — Validate schema, rich results, and indexation before claiming technical readiness.
- `geo-visibility-10` — Measure citation proxies: branded AI mentions, referral traffic, assisted conversions, and refresh compliance.

## GEO method decision table

| Method | Typical lift signal | When to apply | Risk |
| --- | --- | --- | --- |
| Cite sources | High | Claims, comparisons, research pages | Broken or dead links |
| Statistics addition | High | Product proof, market pages | Invented numbers |
| Quotation addition | Medium | Expert-led categories | Unverifiable quotes |
| Authoritative tone | Medium | Category education | Overclaiming |
| Easy-to-understand | Medium | Complex product categories | Oversimplifying tradeoffs |
| Technical terms | Medium | Developer and specialist audiences | Jargon without definitions |
| FAQPage schema | High | Support, pricing, policy, how-it-works | Outdated answers |
| Keyword stuffing | Negative | Never | Visibility loss |

## Platform checklist

| Platform | Primary signal | Check |
| --- | --- | --- |
| ChatGPT | Branded authority, freshness, backlinks | Clear entity definition, recent updates |
| Perplexity | Semantic relevance, FAQ schema, PDF depth | PerplexityBot allowed, structured Q&A |
| Google AI Overview | E-E-A-T, schema, topical authority | Structured data, internal links, expert proof |
| Copilot/Bing | Bing index, speed, Microsoft ecosystem | Bing indexing, page speed under 2s |
| Claude | Factual density, structural clarity | Tables, lists, explicit definitions |

## Audit checklist

- [ ] robots.txt allows intended AI crawlers
- [ ] sitemap includes target URLs
- [ ] title, description, canonical, and OG tags present
- [ ] JSON-LD schema matches visible content
- [ ] H1 → H2 → H3 hierarchy is logical
- [ ] First paragraph answers the core question
- [ ] Lists/tables make facts extractable
- [ ] Internal links connect topic cluster
- [ ] Page speed and mobile usability acceptable
- [ ] Freshness owner and review date defined