# acme-app

Example product repository used as an evaluation fixture for the
`adopt-repo-standards` skill.

## Facts

- Lifecycle: incubating
- Visibility: private
- Language: TypeScript (node >= 20)
- CI: GitHub Actions stub
- Delivery boundary: source landing of baseline surfaces only; no package
  release, deployment, or store boundary applies
- Verification: `npm run check`

## Goals and non-goals

- Goals: land the engineering baseline (constitution projection, project
  facts, fences, conformance entrypoint) and retire the predecessor
  instruction layout.
- Non-goals: production product features, package publication, live
  deployments, or granting deploy/credential capability.

## Boundaries

- Owns: the repo-local engineering baseline surfaces.
- Does not own: live deployments, credentials, public contracts, or canonical
  product capabilities (no product code exists in this fixture).

## Links

- Machine manifest: `project.manifest.json`
- Fences: `fences.yaml`
- Conformance: `conformance/README.md`

## Adoption status

Migrating. Baseline surfaces are landing and verified by `npm run check`;
product-code architecture and delivery proof remain typed gaps recorded in
`project.manifest.json`.
