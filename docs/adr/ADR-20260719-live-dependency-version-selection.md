---
status: accepted
date: 2026-07-19
owners:
  - SylphxAI
---

# ADR-20260719: Select dependency versions from live authoritative sources

## Context

Agents frequently select framework and library versions from model training,
old templates, or an existing manifest range. The result can be several major
versions behind on the first commit even though the current release is publicly
resolvable. Hard-coding a version catalog in Skills would reproduce the same
staleness problem.

The engineering standard already requires newest eligible production releases
and reproducible locks, but its generic reference is not a precise native-
injection route for scaffolding, installation, and upgrade requests.

## Decision

1. Add `dependency-version-selection` as the procedure owner for project
   bootstrap, package addition, dependency migration, and currency review.
2. Resolve versions during the task from the ecosystem's authoritative live
   release source. Model memory, templates, existing ranges, and installed
   prevalence are not version-selection evidence.
3. New projects target the newest eligible stable production releases.
   Existing projects cross major versions and perform the required migration by
   default rather than treating the old range as a constraint.
4. Keep release selection and build reproducibility separate: mutable tags may
   discover a release, but committed manifests and lock graphs reproduce exact
   resolutions.
5. Treat preview channels and retained older direct versions as explicit,
   expiring evidenced exceptions with an owner, recheck trigger, and forward
   replacement condition. Do not silently downgrade or claim an older graph is
   current.

## Consequences

- No static per-library version list needs continuous editing.
- A newly generated project can be current on its first commit.
- Framework, runtime, plugin, and peer migrations are handled as one coherent
  change rather than deferred cleanup.
- Live registry access is required for a claim of currentness; offline work may
  use a locked graph but cannot newly claim that it is latest.

## Verification

- Validate the Skill package and all local links.
- Keep natural compound routing cases for project creation and modernization,
  plus a near-neighbour manifest edit that must not select versions. Authored
  cases are structural contracts; supported-runtime behavioral evaluation is
  separate evidence.
- Rebuild the deterministic catalog and run the repository test suite.
