---
name: select-dependency-versions
description: "Select dependency and runtime versions from live…"
---

# Select Dependency Versions

Never pick versions from model memory, stale templates, or old examples.

## When to use

- Adding a dependency
- Upgrading a runtime, framework, SDK, plugin, or generator
- Pinning versions in manifests or Docker/toolchains

## Workflow

1. **Name the package and ecosystem** (npm, crates.io, PyPI, Go module, GitHub release, distro, etc.).
2. **Query the live authoritative source** for current stable releases and support policy.
3. **Prefer the latest stable** that satisfies security and compatibility constraints of the active repo.
4. **Record the exact version** and source URL/command used.
5. **Apply pins** in the owning manifests; run install/build/tests required by the repo.
6. **Reject** versions chosen only because they appeared in training data or a tutorial.

## Gotchas

- "Latest" tags can move; pin immutable versions for production.
- Pre-release channels are opt-in only.
- Transitive resolution can still pull older vulnerable packages — check lockfiles.

## Validation

- Version came from a live registry/release API or official channel in this session
- Install/build/test commands from the repo pass or residuals are explicit

## Output

Chosen versions · sources · commands run · residuals

## Archived depth

If the thinner entry is insufficient, read [pre-v3-entry-method.md](references/pre-v3-entry-method.md).

