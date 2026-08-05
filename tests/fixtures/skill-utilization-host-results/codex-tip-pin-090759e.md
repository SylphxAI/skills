---
host: codex
hostVersion: codex-cli 0.146.0
model: host-default (codex exec)
skillsCommit: 090759e1508478998398230873ae6fb5f9674a98
catalogDigest: sha256:2071101c9d92bc6c0731346356ed90a0ecced5cc820f43bec9ec6820937248c2
ranAtUtc: 2026-08-05T05:39:10.951Z
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
- notes: heuristic: expectedMention=none oracleTokenRatio=0.67

## neighbour-source-authoring-vs-drive (`near-neighbour`)
- score: **pass**
- expectedSkills: source-authoring-standard
- notes: heuristic: expectedMention=none oracleTokenRatio=0.42

