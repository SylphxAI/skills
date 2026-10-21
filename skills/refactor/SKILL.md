---
name: refactor
description: "Use when splitting an oversized file, module, or test suite (for example, breaking up a multi-thousand-line file or test module), deduplicating repeated code or parsers, deleting dead code and unused dependencies, removing legacy compatibility layers, or restructuring a codebase into clean vertical slices with a pure core while preserving exact observable behavior. Do NOT use when adding new features or changing product behavior (use deliver-and-verify)."
---

# Refactor (`refactor`)

When splitting an oversized file/module/test suite, eliminating duplication, deleting dead weight, or restructuring a codebase is the authorized outcome, execute this pass while preserving 100% of intended observable behavior. Load [references/health.md](references/health.md) for the repository health and zero-debt standard, and [../deliver-and-verify/references/code.md](../deliver-and-verify/references/code.md) for pure-core / imperative-shell boundaries.

*(If the task adds new user-facing features or changes observable product behavior rather than preserving behavior, use [`../deliver-and-verify/SKILL.md`](../deliver-and-verify/SKILL.md) instead.)*

## Workflow

1. **Stage 1 — Lock Observable Behavior & Invariants**:
   - Define the positive and negative acceptance test cases: existing public contracts, user-facing workflows, and test suites that must pass unchanged, plus the specific structural debt to eliminate (an oversized file/test module, duplicate parsers/helpers, dead code, or tangled layers).
2. **Splitting Oversized Files, Modules, or Test Suites (Cohesive Domain Seams)**:
   - When a source file or test module has grown too large (e.g., thousands of lines), split it along **domain capability or scenario seams**—never by arbitrary line counts or numbered shards (`part_01`, `part_02`).
   - For a large test module: group tests into focused submodules by feature behavior, state transition, or failure class, sharing a small `fixtures` / `helpers` module only for setup that every submodule genuinely uses.
   - For a large production module: separate **types/contracts**, **pure domain core** (deterministic decisions, calculations, state machines—zero I/O), and **imperative shell** (I/O, database, HTTP/RPC adapters).
3. **Capability Census (Delete Superseded Paths First)**:
   - List the repository's live capabilities (`docs/capabilities.md` or public entry points).
   - Anything retired, superseded by a platform service, or left over from a completed migration is deleted outright—never refactored or kept behind a dead config flag.
4. **Deterministic Dead-Code & Clone Census**:
   - Run language-appropriate static analysis tools to produce candidate lists—never guess by eye:
     - **TypeScript / JavaScript**: `knip` (unused files, exports, dependencies) and `jscpd` (copy-paste clones).
     - **Rust**: `cargo +nightly udeps` / `cargo machete`, `cargo clippy --all-targets`, and `jscpd`.
     - **Python / Go / Others**: `vulture` / `deadcode` / `staticcheck`.
   - Verify that an "unused" symbol or dependency is not a public SDK export, codegen entry point, or feature-gated target, then delete every verified dead symbol, file, and dependency in the same change.
5. **Eliminate Accidental Duplication (Single Source of Truth)**:
   - Consolidate clones (`jscpd`) when they represent the **same domain rule, parser, or contract** so every rule has a Single Source of Truth (SSOT) and one change updates one place.
   - Keep separate code that merely looks textually similar across independent domain concepts when coupling them would create a false abstraction.
6. **Vertical Slices with a Pure Core**:
   - Organize modules by **domain capability (vertical slice)** rather than technical layer (`controllers/`, `utils/`, `helpers/`, `misc/`).
   - Collapse single-implementation traits/interfaces, pass-through wrappers, and `v1`/`v2` compatibility shims when no external contract requires them.
7. **Stage 3 — Verify Behavior Preservation**:
   - Run the full compiler, linter, typechecker, and test suite, confirming zero behavioral regressions and a cleaner, smaller structure.
