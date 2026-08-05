---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: fe8d1532b94bad1945daaa7fb1ee8617d71fd8d1
catalogDigest: sha256:0e644cbc38e5f76eac239584ad4e6a8c50527d2d8dff86e5a363c052699e36da
ranAtUtc: 2026-08-05T03:51:11.417Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 8
- pass: 7
- fail: 0
- inconclusive: 1

## critical-ci-admission (`critical-skill`)
- score: **pass**
- expectedSkills: ci-admission-standard
- notes: heuristic: expectedMention=ci-admission-standard oracleTokenRatio=0.82

## critical-ci-runner-capacity (`critical-skill`)
- score: **pass**
- expectedSkills: ci-runner-capacity-standard
- notes: heuristic: expectedMention=ci-runner-capacity-standard oracleTokenRatio=0.44

## critical-marketplace-payouts (`critical-skill`)
- score: **pass**
- expectedSkills: review-marketplace-payouts
- notes: heuristic: expectedMention=review-marketplace-payouts oracleTokenRatio=0.45

## critical-marketplace-trust (`critical-skill`)
- score: **pass**
- expectedSkills: review-marketplace-trust-operations
- notes: heuristic: expectedMention=review-marketplace-trust-operations oracleTokenRatio=0.89

## critical-design-prompt-architecture (`critical-skill`)
- score: **pass**
- expectedSkills: design-prompt-architecture
- notes: heuristic: expectedMention=design-prompt-architecture oracleTokenRatio=0.44

## critical-skill-curator (`critical-skill`)
- score: **inconclusive**
- expectedSkills: curate-skill-repository
- notes: codex exit 1: Reading additional input from stdin...


## critical-source-to-skill (`critical-skill`)
- score: **pass**
- expectedSkills: distill-source-to-skill
- notes: heuristic: expectedMention=none oracleTokenRatio=0.45

## compound-finish-not-quality-loop (`compound`)
- score: **pass**
- expectedSkills: finish-product
- notes: heuristic: expectedMention=finish-product oracleTokenRatio=0.56

