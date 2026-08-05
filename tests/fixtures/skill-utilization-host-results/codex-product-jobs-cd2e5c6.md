---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: cd2e5c66495589a239e966ba15567d56117a7cc2
catalogDigest: sha256:70253849259ab22b40b294d0c33d893522c4c6d3136c52a7344f008754c178d8
ranAtUtc: 2026-08-05T03:01:50.894Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 6
- pass: 6
- fail: 0
- inconclusive: 0

## critical-drive-to-delivery (`critical-skill`)
- score: **pass**
- expectedSkills: drive-to-delivery
- notes: heuristic: multi-phase terminal framing; tools limited

## critical-finish-product (`critical-skill`)
- score: **pass**
- expectedSkills: finish-product
- notes: heuristic: expectedMention=finish-product oracleTokenRatio=0.50

## critical-run-open-product-betterment (`critical-skill`)
- score: **pass**
- expectedSkills: run-open-product-betterment
- notes: heuristic: expectedMention=run-open-product-betterment oracleTokenRatio=0.50

## critical-build-product (`critical-skill`)
- score: **pass**
- expectedSkills: build-product
- notes: heuristic: build-product framing

## critical-source-authoring-three-layer (`critical-skill`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=none oracleTokenRatio=0.50

## neighbour-source-authoring-vs-drive (`near-neighbour`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=source-authoring-standard oracleTokenRatio=0.92

