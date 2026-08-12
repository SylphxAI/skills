---
status: accepted
date: 2026-08-12
owners:
  - SylphxAI/skills
---

# Select Atlas as the sole production database migration stack for every repository

## Context

The technology-stack profile selected Rust backend roles, TypeScript/Bun/Next
web roles, Protobuf/Connect contracts, CloudEvents, and OpenTelemetry, but did
not select a database migration engine. Agents then forked per repository
among ORM push tools, sqlx migrate, Flyway, Prisma migrate, and ad hoc SQL.

That fork reintroduces human-era “pick tools by project size/language”
thinking. Agent-native fleets design every product for maximum scale and must
not invent a second method for a small repository. Platform dogfood already
uses Atlas versioned migrations with a Drizzle schema SSOT; Skills must pin the
same authority class fleet-wide.

## Decision

Revision `2026-08-12.1` preserves every prior stack selection and adds one
digest-bound `database-migration-stack-requirement`:

1. **Atlas** is the sole production schema-change applicator for relational
   product databases, on every implementation language.
2. Production uses **versioned** migrations planned from a schema SSOT
   (ORM external schema loader, SQL, HCL, or composite schema).
3. **Ban** ORM push to live databases, a second production migration runner,
   unpinned floating Atlas CLI binaries, macOS hash commits applied on Linux,
   and `migrate down` as ordinary recovery.
4. **CI safety** always requires ephemeral full-history replay, a
   destructive/data-depend gate, and migration directory integrity. `atlas
   migrate lint` is required only when the admitted Atlas edition can evaluate
   the selected schema source.
5. Pin one **OS/arch-matching** Atlas CLI version for apply images and regenerate
   integrity hashes only with that binary.
6. Runtime query tools (sqlx, Drizzle, etc.) compile or check against the
   migration-derived schema; they never become a second apply authority.
7. Revert surfaces are PITR/snapshots, append-only business logs, forward repair
   migrations, and previous healthy deployments—not a retained predecessor
   product system.
8. Library versions still resolve live via `select-dependency-versions`.

No repository size, language, or “early stage” fork is admitted. Non-relational
stores require Profile review rather than a silent local engine.

## Consequences

- One migration method across the fleet; no per-project engine choice.
- Code and schema land as one main-green-safe unit through the ordinary PR +
  Merge Queue path.
- Platform multi-engine customer surfaces remain a product capability for
  *customer* apps only if explicitly productized; Sylphx-owned product repos
  follow this Profile.
- Hard-cut and temporary dual-write cutover procedure live under
  `execute-hard-cutover` and engineering-standard predicates; this Profile owns
  the tool, not cutover EV.

## Verification

- Profile schema accepts exactly one database-migration assertion.
- Digest covers the complete revised machine document.
- CI for this repository continues to build the catalog and pass package checks.
- Positive routing: relational schema change → Atlas versioned path.
- Negative routing: drizzle-kit push / second migrator / unpinned CLI → violation.

## Primary sources

- [Atlas versioned migrations](https://atlasgo.io/versioned/intro)
- [Atlas migrate lint](https://atlasgo.io/versioned/lint)
- [Declarative vs versioned](https://atlasgo.io/concepts/declarative-vs-versioned)
