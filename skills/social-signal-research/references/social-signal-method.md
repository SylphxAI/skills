# Social Signal Method

## Rule IDs

- `social-signal-1` — Choose the source by information goal: pain (forums), velocity (X), launch reception (Product Hunt), technical buyers (HN).
- `social-signal-2` — Always record date, source type, and engagement context with each signal.
- `social-signal-3` — Search problem language before brand language to avoid founder-biased results.
- `social-signal-4` — Cluster paraphrased evidence; do not treat one viral post as market proof.
- `social-signal-5` — Capture exact phrases users repeat for positioning and landing page copy tests.
- `social-signal-6` — Flag promotional posts, affiliate funnels, and coordinated launch hype.
- `social-signal-7` — Compare competitor praise with complaint axes to find wedge opportunities.
- `social-signal-8` — Note geographic and platform bias explicitly in the synthesis.
- `social-signal-9` — End with follow-up monitors, not a one-off snapshot, for fast-moving categories.
- `social-signal-10` — Keep evidence lightweight: links + paraphrase + theme, not full thread dumps.

## Platform decision table

| Platform | Best signal | Query pattern | Caveat |
| --- | --- | --- | --- |
| Reddit | Detailed pain, workarounds | `site:reddit.com "<problem phrase>"` | Subreddit culture skew |
| X / Twitter | Breaking news, founder discourse | Brand, competitor, category hashtags | Short context, bot noise |
| Product Hunt | Launch positioning reactions | Product name, maker comments | Early-adopter bias |
| Hacker News | Technical buyer objections | `site:news.ycombinator.com <topic>` | Developer-heavy |
| LinkedIn (public) | B2B language, buyer titles | Role + problem keywords | Professional polish bias |
| GitHub Discussions | Implementation friction | Repo + feature keywords | Contributor-heavy |

## Collection checklist

- [ ] Query scoped to audience, geography, and time window
- [ ] At least two source types when making strategic claims
- [ ] Top posts sorted by relevance and recency, not engagement alone
- [ ] Promotional content tagged separately
- [ ] User phrases extracted for copy testing
- [ ] Counter-signals captured
- [ ] Confidence level stated (low / medium / high)
- [ ] Follow-up monitor defined for fast-moving topics

## Event schema (monitoring)

```text
events:
  - social_signal_collected
  - social_theme_clustered
  - social_promo_flagged
  - social_synthesis_published
```

Each event should include: `source`, `theme`, `confidence`, `time_window`, `query`.