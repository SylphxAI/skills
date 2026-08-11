# acme-app

Example product repository used as an eval fixture for `adopt-repo-standards`.

- Lifecycle: `active` (qualification fixture; internal visibility)
- Purpose: expose a complete, deterministic engineering baseline for adoption cycles
- Machine facts: [project.manifest.json](project.manifest.json) (authority)
- Runtime constitution: [AGENTS.md](AGENTS.md) (projection)
- Instruction fences: [docs/fences/instruction-authority.md](docs/fences/instruction-authority.md)

## Goals

- Serve as a deterministic qualification fixture for `adopt-repo-standards` runs.
- Expose constitution projection, manifest, fences, and conformance entrypoint.
- Stay minimal and verifiable with one deterministic command.

## Non-goals

- Product features; package publication; deployments; live runtime.
- Owning organization-wide adoption or control-plane state.

## Boundary summary

- Owns: `baseline-fixture` (adopted baseline surfaces in this repository).
- Does not own: product code, live systems, org-wide adoption state.
- Allowed dependency: `SylphxAI/skills` runtime constitution (inbound, read-only).
- Forbidden: legacy instruction layouts as active authority; repo-local org policy.

## Public surfaces

- Conformance entrypoint: `npm run check` (see [package.json](package.json)).

## Verification and delivery

- Verification: `npm run check` — deterministic, exits nonzero on drift.
- Delivery terminal: source landing on the default branch with `npm run check`
  green; no package publication or deployment (`deployable: false`).

## History and docs homes

- Retired predecessor layout (dated residual): [docs/history/legacy-AGENTS-retired-2026-08-11.md](docs/history/legacy-AGENTS-retired-2026-08-11.md)
- Planned homes: `docs/adr/`, `docs/specs/`, `docs/catalog/`, `docs/runbooks/`, `docs/generated/`
