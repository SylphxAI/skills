# acme-app — local agent notes only

Static engineering and delivery standards load from the active Skills runtime;
[SylphxAI/skills](https://github.com/SylphxAI/skills) is the binding instruction
SSOT. The predecessor instruction layout (ops-guild approval gate, single-file
rule accumulation, exclusive instruction source) is retired and must not be
restored; do not create a second instruction authority in this repository.

Local project facts: `PROJECT.md` (readable orientation) and
`project.manifest.json` (machine-readable fact authority). `README.md` is the
human entrypoint.

## Local operations

- Conformance: `npm run check` — validates `project.manifest.json` against the
  canonical manifest contract, verifies the required baseline surfaces
  (`AGENTS.md`, `PROJECT.md`, manifest, conformance entrypoint), and fails if
  the retired predecessor layout is resurrected.
- Runtime: TypeScript, Node.js >= 20.

## Local rules

- Keep this file compact: repo-local commands, hazards, and authority additions
  only; never copy detailed Skills standards into this repository.
- When product code lands, keep `project.manifest.json` architecture facts
  (capabilities, components, typed gaps) truthful and re-run `npm run check`.
- Report layers honestly: source · CI · merge · deploy · live proof.
- Never commit secrets, customer data, tokens, or private keys.
