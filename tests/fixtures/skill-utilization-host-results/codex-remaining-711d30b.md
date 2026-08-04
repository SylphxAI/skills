---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: 711d30b10a22b6c30be1a6c977b30224dcb85096
catalogDigest: sha256:566e8c68de01d192cac546565cc94471cbf2ac051d61de98037b8b7bd8fb9cc5
ranAtUtc: 2026-08-04T01:04:39.253Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 3
- pass: 3
- fail: 0
- inconclusive: 0

## critical-run-open-product-betterment (`critical-skill`)
- score: **pass**
- expectedSkills: run-open-product-betterment
- notes: heuristic: expectedMention=none oracleTokenRatio=0.75

## critical-run-open-product-betterment-uncapped-continuity (`critical-skill`)
- score: **pass**
- expectedSkills: run-open-product-betterment
- notes: heuristic: expectedMention=none oracleTokenRatio=0.58

## compound-delivery-and-autonomous (`compound`)
- score: **pass**
- expectedSkills: drive-to-delivery, delivery-standard
- notes: heuristic: multi-phase terminal framing; tools limited

