# Demand Research Method

## Rule IDs

- `demand-research-1` — Start from a job-to-be-done, not a feature idea.
- `demand-research-2` — Prefer repeated cross-source pain over single viral threads.
- `demand-research-3` — Separate "nice to have" from "blocking pain" and "money on the table."
- `demand-research-4` — Capture the user's words as evidence tags, then synthesize in your own wording.
- `demand-research-5` — Compare incumbent complaints with substitute workarounds users already tolerate.
- `demand-research-6` — Score demand by frequency, intensity, willingness-to-pay proxy, and strategic fit.
- `demand-research-7` — Flag geographic, language, and platform-specific demand separately.
- `demand-research-8` — End with a build/no-build stance and the cheapest validation experiment.
- `demand-research-9` — Do not overfit to developer forums when the buyer is non-technical.
- `demand-research-10` — Document source limitations and recency so conclusions can be revisited.

## Source decision table

| Source type | Best for | Weakness | Collection note |
| --- | --- | --- | --- |
| Subreddit / forum threads | Unfiltered pain, workarounds | Vocal minorities | Search by problem phrases, not brand names only |
| App store reviews | Mobile UX and reliability pain | Star-rating bias | Read 1–3 star clusters by theme |
| GitHub issues / discussions | Developer workflow gaps | Not representative of all buyers | Weight by stars, activity, and maintainer response |
| Social posts | Emerging trends, language | Ephemeral, noisy | Capture date and engagement context |
| Product Hunt / launch comments | Positioning reactions | Early-adopter skew | Compare with post-launch retention signals if available |
| Support macros / public FAQs | Recurring operational pain | May lag product reality | Treat as secondary confirmation |

## Evidence scoring checklist

- [ ] At least three independent sources or ten consistent datapoints for a "strong" claim
- [ ] Pain described as blocking, expensive, frequent, or emotionally charged
- [ ] Users already pay for partial substitutes or manual workarounds
- [ ] Incumbent solutions receive repeated complaints on the same axis
- [ ] Segment fit matches intended buyer, not just researchers or hobbyists
- [ ] Counter-evidence captured (users who are satisfied and why)
- [ ] Fast validation path identified (landing page, concierge, prototype, waitlist)

## State machine

`scope -> collect -> normalize -> cluster -> score -> recommend -> validate`

Each transition should record: source list, date range, confidence level, and open questions.