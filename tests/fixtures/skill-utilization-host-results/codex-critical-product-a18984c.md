---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: a18984c5f55188abefb6f5741876d4136bb933a0
catalogDigest: sha256:566e8c68de01d192cac546565cc94471cbf2ac051d61de98037b8b7bd8fb9cc5
ranAtUtc: 2026-08-04T00:00:42.821Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 14
- pass: 14
- fail: 0
- inconclusive: 0

## critical-drive-to-delivery (`critical-skill`)
- score: **pass**
- expectedSkills: drive-to-delivery
- notes: heuristic: expectedMention=none oracleTokenRatio=0.33

## critical-select-next-work (`critical-skill`)
- score: **pass**
- expectedSkills: select-next-work
- notes: heuristic: expectedMention=select-next-work oracleTokenRatio=0.67

## critical-finish-product (`critical-skill`)
- score: **pass**
- expectedSkills: finish-product
- notes: heuristic: expectedMention=finish-product oracleTokenRatio=0.58

## critical-continuous-betterment-loop (`critical-skill`)
- score: **pass**
- expectedSkills: run-open-product-betterment
- notes: heuristic: expectedMention=none oracleTokenRatio=0.50

## critical-prototype-product (`critical-skill`)
- score: **pass**
- expectedSkills: prototype-product
- notes: heuristic: expectedMention=none oracleTokenRatio=0.40

## critical-build-product (`critical-skill`)
- score: **pass**
- expectedSkills: build-product
- notes: heuristic: expectedMention=none oracleTokenRatio=0.20

## critical-maintain-product (`critical-skill`)
- score: **pass**
- expectedSkills: maintain-product
- notes: heuristic: maintain framing; tools limited

## critical-expand-product (`critical-skill`)
- score: **pass**
- expectedSkills: expand-product
- notes: heuristic: expectedMention=none oracleTokenRatio=0.33

## critical-pursue-product-objective (`critical-skill`)
- score: **pass**
- expectedSkills: pursue-product-objective
- notes: heuristic: expectedMention=none oracleTokenRatio=0.08

## critical-author-skill (`critical-skill`)
- score: **pass**
- expectedSkills: author-skill
- notes: heuristic: expectedMention=author-skill oracleTokenRatio=0.50

## abstain-spelling (`abstention`)
- score: **pass**
- expectedSkills: (none)
- notes: heuristic: abstention

## abstain-time (`abstention`)
- score: **pass**
- expectedSkills: (none)
- notes: heuristic: abstention

## abstain-random-poem (`abstention`)
- score: **pass**
- expectedSkills: (none)
- notes: heuristic: abstention

## abstain-no-deploy-without-authority (`abstention`)
- score: **pass**
- expectedSkills: (none)
- notes: heuristic: abstention

