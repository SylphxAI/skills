# AGENTS.md — Runtime constitution (acme-app)

## Constitution projection

The Sylphx Agent Runtime Constitution is the binding always-on floor for this
repository:
<https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md>

This file is the repo-local runtime constitution. It holds only repo-local
commands, hazards, and authority additions. Detailed standards live in
`SylphxAI/skills`; do not copy or fork them here.

## Project facts

- `PROJECT.md` — concise orientation for agents and owners
- `project.manifest.json` — machine-readable fact authority (canonical schema)
- `fences.yaml` — repo boundary fences enforced by the conformance entrypoint

## Repo-local operations

- `npm run check` — conformance entrypoint; validates the constitution
  projection, manifest schema, fences, dependency fence, and legacy
  retirement. See `conformance/README.md`.

## Hazards

- This repository is an evaluation fixture. There are no live deployments,
  credentials, public contracts, or customer data.
- No deploy or credential authority exists here; nothing in this repository
  grants either capability.

## Authority

- The product repository owns its code, contracts, and local delivery
  declaration; this fixture owns the baseline surfaces only.
- The predecessor instruction layout is retired. Its content survives only as
  the dated, non-authoritative residual in `AGENTS.legacy.md`; it is not active
  instruction authority.
