---
name: refactor
description: "Run a repository slim-down or highest-standard structural refactor pass: audit what is still a live capability, census dead code, unused dependencies, and duplicate clones with deterministic tools, delete verified dead weight, and structure what remains as vertical slices with a pure core while preserving observable behavior. Use when restructuring a repository, removing legacy compatibility layers, or eliminating duplicated platform logic. Use deliver-and-verify when changing product behavior."
---

# Refactor (`refactor`)

When restructuring, slimming down, or cleaning up a codebase is the authorized outcome, execute this structural pass while preserving 100% of intended observable behavior. Load [references/health.md](references/health.md) for the repository health and zero-debt standard, and [../deliver-and-verify/references/code.md](../deliver-and-verify/references/code.md) for pure-core / imperative-shell boundaries.

## Workflow

1. **Stage 1 — Lock Observable Behavior & Invariants**:
   - Define the Stage 1 positive and negative acceptance test cases: existing public contracts, user-facing workflows, and test suites that must pass unchanged, plus the specific structural debt to eliminate (dead modules, compatibility shims, duplicated logic, or tangled layers).
2. **Capability Census (Before Touching Code)**:
   - List the repository's live capabilities (`docs/capabilities.md` or public entry points).
   - Anything retired, superseded by a platform service, or left over from a completed migration is marked for deletion—not refactoring.
3. **Deterministic Dead-Code & Clone Census (Candidate Discovery)**:
   - Run language-appropriate static analysis tools to produce candidate lists—never guess by eye:
     - **TypeScript / JavaScript**: `knip` (unused files, exports, dependencies) and `jscpd` (copy-paste clones).
     - **Rust**: `cargo +nightly udeps` / `cargo machete`, `cargo clippy --all-targets`, and `jscpd`.
     - **Python / Go / Others**: `vulture` / `deadcode` / `Staticcheck`.
   - Classify each candidate before deleting: verify that an "unused" symbol or dependency is not a public SDK export, framework/codegen entry point, dynamic reflection target, or feature-gated dependency. Delete every verified dead symbol, file, and dependency in the same change.
4. **Eliminate Accidental Duplication (Rule of Three & Domain Identity)**:
   - Inspect duplicate clones (`jscpd`) and parallel helper modules.
   - Consolidate clones when they represent the **same domain rule or contract** (so one change updates one place). Keep separate code that merely looks textually similar across independent domain concepts or vertical slices when coupling them would create a false abstraction.
5. **Vertical Slices with a Pure Core**:
   - Organize remaining code by **domain capability (vertical slice)** rather than technical layer (`controllers/`, `utils/`, `helpers/`, `misc/`).
   - Within each slice, separate the **pure core** (deterministic domain types, state machines, calculations, validation—zero I/O, testable in microseconds) from the **imperative shell** (HTTP handlers, database queries, external API adapters).
   - Collapse single-implementation traits/interfaces, pass-through wrapper layers, and `v1`/`v2` compatibility shims when no external plugin contract or boundary test seam requires them.
6. **Stage 3 — Verify Behavior Preservation**:
   - Run the full compiler, linter, typechecker, and test suite, plus the Stage 1 live-surface verification checks, confirming zero behavioral regressions and a net reduction in code and complexity.
