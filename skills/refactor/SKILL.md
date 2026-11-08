---
name: refactor
description: "Use when splitting an oversized module or test suite, deduplicating implementations across packages or runtimes, deleting dead code or unused dependencies, removing completed compatibility layers, reducing scattered edits for one supported change, or restructuring a codebase while preserving its observable behavior. Use challenge for architecture-only advice without implementation. Use deliver-and-verify when the outcome adds features or changes product behavior."
---

# Refactor

Preserve the supported behavior while removing the named structural debt. Read [health.md](references/health.md) for deletion and duplication criteria and [code.md](../deliver-and-verify/references/code.md) for domain and I/O boundaries.

1. State the public contracts, workflows and affected test configurations that must keep working, and the structural problem to remove.
2. Split large modules along domain capabilities or test scenarios. Keep contracts, deterministic domain decisions and I/O adapters distinguishable within a capability. Keep scenario-specific setup near its tests and share focused fixtures where related scenarios use them.
3. Inventory the affected public entry points and consumers. Delete a superseded path after verifying that its consumers moved and supported behavior/data remain available. An accidentally unreachable capability is a regression to restore.
4. Use available language tooling when it adds coverage: `knip` and `jscpd` for JavaScript/TypeScript; `cargo machete`, `cargo +nightly udeps`, clippy and clone detection for Rust; appropriate static analysis for other languages. Tools supply candidates. Check public exports, generated/macro entry points, dynamic hooks and supported feature targets before deletion.
5. Consolidate copies of the same domain rule, parser or contract. Keep independent concepts separate when combining them would create a false abstraction. Collapse pass-through wrappers and unused compatibility paths when no supported contract or test boundary needs them.
6. Run the required and affected compiler, lint, type and behavior checks. Broaden coverage when shared interfaces or uncertain boundaries justify it. Judge the result by behavior preservation and clearer boundaries; a useful refactor can add explicit types or module declarations.

When sharing code across runtimes, check each consumer's dependency constraints
before choosing the owning package. A pure module still inherits its package's
unconditional dependencies. If a supported consumer cannot accept those
dependencies, extract a small package and re-export it from the existing API.
Keep adapters and optional features outside the default dependency graph where
the consumer contracts allow. Build a representative consumer with the intended
default features, inspect its resolved dependencies, and exercise supported
optional features separately. For a published package, verify a
[fresh registry-only consumer](../deliver-and-verify/references/dx.md#private-package-verification).
When every supported consumer already accepts the parent package's dependencies,
retain the simpler module boundary.
