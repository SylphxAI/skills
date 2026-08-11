# Acme App

Example TypeScript product repository used as an eval fixture for adopt-repo-standards.

- Lifecycle: incubating
- Layer: product
- Visibility: private
- Goals: maintain this repository on the Sylphx engineering baseline; keep one machine-readable fact authority.
- Non-goals: product features beyond current scaffolding; package publishing; production deployment.

## Boundaries

- Owns: acme-app product surface (scaffolding only).
- Does not own: SylphxAI/skills standards and profiles; CI infrastructure outside this repository.
- Dependencies: node >= 20 runtime.
- Public surfaces: none yet.

## Verification and delivery

- Conformance: `npm run check` - validates the manifest against the vendored canonical schema, verifies entrypoint wiring, and fails on legacy instruction markers.
- Terminal boundary: source landing with a schema-valid manifest and passing conformance checks (`deployable: false`).

## Links

- Machine manifest: project.manifest.json
- Runtime constitution: AGENTS.md
- Readme: README.md
- Canonical schema: https://github.com/SylphxAI/skills/blob/main/skills/adopt-repo-standards/references/project-manifest-standard/references/project-manifest.schema.json
- Docs homes (planned): docs/adrs/, docs/specs/, docs/catalog/, docs/runbooks/, docs/generated/
