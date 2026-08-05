---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: 0c97bf98d0fc6ac8683e51fa1ecac9fb094ec5f8
catalogDigest: sha256:70253849259ab22b40b294d0c33d893522c4c6d3136c52a7344f008754c178d8
ranAtUtc: 2026-08-05T02:51:43.998Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 4
- pass: 4
- fail: 0
- inconclusive: 0

## critical-pursue-product-objective (`critical-skill`)
- score: **pass**
- expectedSkills: pursue-product-objective
- notes: heuristic: pursue-objective framing

## neighbour-pursue-vs-better (`near-neighbour`)
- score: **pass**
- expectedSkills: pursue-product-objective
- notes: heuristic: pursue-objective framing

## critical-source-authoring-three-layer (`critical-skill`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=none oracleTokenRatio=0.50

## neighbour-source-authoring-vs-drive (`near-neighbour`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=source-authoring-standard oracleTokenRatio=0.83

