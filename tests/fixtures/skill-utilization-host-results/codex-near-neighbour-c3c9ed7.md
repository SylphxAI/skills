---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: c3c9ed7284b1a20a76479b6fa49ed29f9a33781a
catalogDigest: sha256:85ec450693a8fd8289fea3f9e97323657761d94fee7fbe8614adc8621f597df8
ranAtUtc: 2026-08-05T03:20:01.595Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 10
- pass: 9
- fail: 1
- inconclusive: 0

## neighbour-finish-vs-blueprint (`near-neighbour`)
- score: **pass**
- expectedSkills: finish-product
- notes: heuristic: expectedMention=none oracleTokenRatio=0.29

## neighbour-case-vs-ops (`near-neighbour`)
- score: **pass**
- expectedSkills: resolve-support-case
- notes: heuristic: one-case resolution framing; tools limited

## neighbour-feedback-vs-solicitation (`near-neighbour`)
- score: **pass**
- expectedSkills: review-solicitation-policy
- notes: heuristic: expectedMention=none oracleTokenRatio=0.63

## neighbour-autonomous-vs-selffeeding (`near-neighbour`)
- score: **pass**
- expectedSkills: drive-to-delivery
- notes: heuristic: multi-phase terminal framing; tools limited

## neighbour-admission-vs-capacity (`near-neighbour`)
- score: **pass**
- expectedSkills: ci-admission-standard
- notes: heuristic: expectedMention=ci-admission-standard oracleTokenRatio=0.40

## neighbour-payouts-vs-trust (`near-neighbour`)
- score: **pass**
- expectedSkills: review-marketplace-payouts
- notes: heuristic: expectedMention=none oracleTokenRatio=0.57

## neighbour-betterment-loop-vs-finish (`near-neighbour`)
- score: **pass**
- expectedSkills: run-open-product-betterment
- notes: heuristic: expectedMention=run-open-product-betterment oracleTokenRatio=0.45

## neighbour-pursue-vs-better (`near-neighbour`)
- score: **pass**
- expectedSkills: pursue-product-objective
- notes: heuristic: pursue-objective framing

## neighbour-prototype-vs-build (`near-neighbour`)
- score: **fail**
- expectedSkills: prototype-product
- notes: heuristic: expectedMention=none oracleTokenRatio=0.13

## neighbour-source-authoring-vs-drive (`near-neighbour`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=none oracleTokenRatio=0.50

