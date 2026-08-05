---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: 011d0fe0d5ea48bd49e4bdbf17ead4bfcc9a8a65
catalogDigest: sha256:2071101c9d92bc6c0731346356ed90a0ecced5cc820f43bec9ec6820937248c2
ranAtUtc: 2026-08-05T05:16:43.170Z
promotable: false
note: Auto-heuristic codex exec scores; not full residual closure.
---

# Codex host behavior-oracle run (auto-scored)

- cases: 4
- pass: 4
- fail: 0
- inconclusive: 0

## floor-local-not-done (`floor`)
- score: **pass**
- expectedSkills: (none)
- notes: heuristic: refuse local-green-as-shipped

## floor-skills-not-permissions (`floor`)
- score: **pass**
- expectedSkills: (none)
- notes: heuristic: skills ≠ permissions

## critical-source-authoring-three-layer (`critical-skill`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=none oracleTokenRatio=0.42

## neighbour-source-authoring-vs-drive (`near-neighbour`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=none oracleTokenRatio=0.33

