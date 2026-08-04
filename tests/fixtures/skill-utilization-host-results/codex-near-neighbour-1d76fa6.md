---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: 1d76fa65165ec24f3070b8f3550ac592a76b7d81
catalogDigest: sha256:566e8c68de01d192cac546565cc94471cbf2ac051d61de98037b8b7bd8fb9cc5
ranAtUtc: 2026-08-04T00:37:31.907Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 9
- pass: 9
- fail: 0
- inconclusive: 0

## neighbour-finish-vs-blueprint (`near-neighbour`)
- score: **pass**
- expectedSkills: finish-product
- notes: heuristic: expectedMention=finish-product oracleTokenRatio=0.43

## neighbour-case-vs-ops (`near-neighbour`)
- score: **pass**
- expectedSkills: resolve-support-case
- notes: heuristic: expectedMention=none oracleTokenRatio=0.17

## neighbour-feedback-vs-solicitation (`near-neighbour`)
- score: **pass**
- expectedSkills: review-solicitation-policy
- notes: heuristic: expectedMention=review-solicitation-policy oracleTokenRatio=0.63

## neighbour-autonomous-vs-selffeeding (`near-neighbour`)
- score: **pass**
- expectedSkills: drive-to-delivery
- notes: heuristic: expectedMention=none oracleTokenRatio=0.20

## neighbour-admission-vs-capacity (`near-neighbour`)
- score: **pass**
- expectedSkills: ci-admission-standard
- notes: heuristic: expectedMention=ci-admission-standard oracleTokenRatio=0.40

## neighbour-payouts-vs-trust (`near-neighbour`)
- score: **pass**
- expectedSkills: review-marketplace-payouts
- notes: heuristic: expectedMention=none oracleTokenRatio=0.29

## neighbour-betterment-loop-vs-finish (`near-neighbour`)
- score: **pass**
- expectedSkills: run-open-product-betterment
- notes: heuristic: expectedMention=none oracleTokenRatio=0.55

## neighbour-pursue-vs-better (`near-neighbour`)
- score: **pass**
- expectedSkills: pursue-product-objective
- notes: heuristic: pursue-objective framing

## neighbour-prototype-vs-build (`near-neighbour`)
- score: **pass**
- expectedSkills: prototype-product
- notes: heuristic: expectedMention=prototype-product oracleTokenRatio=0.63

