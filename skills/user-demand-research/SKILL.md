---
name: user-demand-research
description: Research unmet user demand from public forums, reviews, issue trackers, and social threads to validate product ideas, feature requests, and positioning wedges. Use when hunting feature requests, pain points, complaints, wishlists, category gaps, or demand signals before building a product or prioritizing roadmap bets.
---

# User Demand Research

Use this skill to turn noisy public user feedback into a ranked demand map with evidence.

## Workflow

1. Define the problem space, target user, geography, and product type.
2. Read `references/demand-research-method.md`.
3. Collect signals from public sources: forums, app reviews, GitHub issues, social threads, and community posts.
4. Normalize requests into jobs, pains, and desired outcomes.
5. Cluster duplicates, score frequency and intensity, and separate table stakes from differentiation.
6. Produce a demand report with validation experiments and build/no-build recommendation.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Use only public, ethically accessible sources; do not scrape behind login walls or violate terms of service.
- Label anecdotal evidence separately from repeated cross-source patterns.
- Do not treat loud minorities as market truth without breadth checks.
- Preserve user privacy: paraphrase and aggregate; do not publish identifiable private details.

## Output format

```text
Research scope:
- Category:
- Target user:
- Sources reviewed:

Demand map:
| Theme | Evidence count | Intensity | Segment fit | Build signal |
| --- | --- | --- | --- | --- |

Top opportunities:
1. <opportunity> — evidence, risk, fastest validation
2. <opportunity> — evidence, risk, fastest validation
3. <opportunity> — evidence, risk, fastest validation

Anti-bets (avoid):
- <pattern users complain about but do not pay for>

Next validation in 7 days:
- <smallest test>
```
