---
name: domain-selection-review
description: Evaluate and shortlist domain names for new products, startups, and one-person companies across TLD fit, memorability, pronunciation, trademark risk, SEO ambiguity, registrar economics, and launch readiness. Use when choosing a domain, comparing .com vs .ai vs country TLDs, checking naming collisions, or planning a brand-safe web presence before launch.
---

# Domain Selection Review

Use this skill to choose a domain that supports positioning, recall, and long-term brand safety.

## Workflow

1. Define the product name candidates, category, audience, geography, and budget.
2. Read `references/domain-selection-patterns.md`.
3. Generate a shortlist with pronunciation, spelling, and meaning checks across target languages.
4. Screen for collisions: trademarks, existing brands, acronym confusion, and SERP ambiguity.
5. Compare TLD strategy, renewal cost, and registrar transfer risk.
6. Recommend a primary domain, backup options, and defensive registrations if justified.

## Guardrails

- Do not claim trademark clearance; flag items for legal review.
- Do not recommend cybersquatting or impersonation-adjacent names.
- Separate vanity domains from domains that help comprehension and trust.
- State availability assumptions explicitly when live checks were not run.

## Output format

```text
Naming goal:
Audience:
Budget posture:

Shortlist:
| Candidate | TLD | Memorability | Collision risk | TLD fit | Recommendation |
| --- | --- | --- | --- | --- | --- |

Primary pick:
- Domain:
- Why:
- Risks:
- Defensive registrations:

Launch checklist:
- <DNS, email, redirect, social handle alignment>
```