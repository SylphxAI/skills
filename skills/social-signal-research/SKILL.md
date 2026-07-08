---
name: social-signal-research
description: Research trends, complaints, launches, and audience language from public social and community surfaces (Reddit, X/Twitter, Product Hunt, Hacker News, LinkedIn public posts) to inform positioning, content, and growth decisions. Use when monitoring community sentiment, tracking competitor launches, finding discussion threads, or collecting public voice-of-customer signals without a paid social API.
---

# Social Signal Research

Use this skill to collect public community signals and convert them into actionable product and growth insight.

## Workflow

1. Define the query: brand, category, competitor, feature, launch, or pain phrase.
2. Read `references/social-signal-method.md`.
3. Select sources by intent: forums for pain, X for velocity, Product Hunt for launches, HN for technical buyers.
4. Collect a bounded sample with dates, URLs, and engagement context.
5. Extract themes: language, objections, alternatives, delight moments, and unmet needs.
6. Produce a synthesis with confidence level, blind spots, and recommended next actions.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Use public pages and search tools only; do not bypass authentication or rate limits aggressively.
- Paraphrase user content; do not republish large verbatim dumps.
- Separate organic discussion from promotional astroturfing where possible.
- State when sample size is too small for strategic conclusions.

## Output format

```text
Query:
Time window:
Sources:

Signal summary:
- Dominant themes:
- Objections:
- Alternatives mentioned:
- Language to reuse / avoid:

Evidence table:
| Theme | Example paraphrase | Source type | Confidence |
| --- | --- | --- | --- |

Implications:
- Positioning:
- Content:
- Product:

Follow-up collection:
- <next search or monitor action>
```
