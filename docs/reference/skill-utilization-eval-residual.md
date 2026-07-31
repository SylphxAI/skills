# Skill utilization eval residual

## Status

**Open residual.** Architecture (thin dual-layer progressive instructions) is
decided. Acceptable automatic Skill utilization is **not** proven and must not
be claimed from installation, AutoSync green, catalog integrity, or authored
fixtures alone (ADR-0009, ADR-0011,
ADR-20260731-thin-dual-layer-progressive-instruction-system).

## Goal

Measure whether agents **behave** as if the correct Skill method was applied,
on pinned Skills revisions and host versions.

## Non-goals

- Proving L0 token optimality
- Replacing host native discovery with a meta-router
- Using model self-report ("I opened the skill") as a pass
- Flaky full-catalog perfection as a hard release gate

## Metric hierarchy

1. **Primary — behavior oracles.** Tasks require a Skill-unique, non-obvious
   mandatory step that is not present in L0. Score whether the agent performs
   that step (or correctly abstains).
2. **Secondary — load traces.** When a host exposes Skill open/load events,
   record them. Absence of traces does not forbid behavior-oracle eval.
3. **Not sufficient alone:** install status, package digests, fixture corpora.

## Suites

| Suite | Intent |
| --- | --- |
| Floor | L0 miss-class-A invariants hold without loading domain Skills |
| Critical skill | Top binding methods open/follow under positive prompts |
| Near-neighbour | Discriminate adjacent Skills |
| Abstention | Do not load an irrelevant Skill / do not invent authority |
| Compound | Multi-domain tasks load the needed subset without dumping the catalog |

## Pinning

Every run records:

- Exact Skills source commit / package digests
- Host product and version (Codex / Claude / Grok)
- Model identity when available
- Prompt fixtures and oracle definitions

## Pass language

- **May claim:** measured behavior-oracle pass rate for a named suite at a
  pinned revision.
- **Must not claim:** "utilization solved," "agents always load Skills," or
  catalog-wide automatic use without suite coverage and pins.

## Exit criteria for closing this residual

1. Documented fixture set with behavior oracles for floor, critical-skill, and
   abstention suites.
2. At least one green run per supported host class at a pinned Skills SHA, or
   an explicit residual that a host cannot support reliable eval.
3. Failure taxonomy: L0 miss vs Skill miss vs tool/policy gap vs model limit.

Until exit criteria land, utilization remains an honest open residual.
