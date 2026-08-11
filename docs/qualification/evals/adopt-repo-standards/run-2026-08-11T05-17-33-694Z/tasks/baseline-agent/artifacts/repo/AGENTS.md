# AGENTS.md - Acme App runtime constitution

Authority and entrypoints:

- Runtime constitution (Sylphx, always-on floors): https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md
- Project facts: PROJECT.md (human projection) and project.manifest.json (machine-readable fact authority)
- Conformance entrypoint: `npm run check` (node scripts/conformance-check.mjs)

Standing instructions:

1. Lead with evidence. Keep source, CI, deploy, and live states distinct; do not claim completion without proof at this repository's declared delivery boundary (source landing).
2. Respect the authority split: SylphxAI/skills owns standards and profiles; this repository owns its code, contracts, and delivery; project.manifest.json owns project facts.
3. Before claiming conformance, run `npm run check` and report its exact result.
4. Keep this repository on the baseline: no dual instruction files, no legacy check entrypoints, no second manifest. Update PROJECT.md whenever project.manifest.json facts change.
5. Do not publish packages, deploy, or operate production from this repository: it is scaffolding-only (`deployable: false` in project.manifest.json).
6. Record material decisions as ADRs under docs/adrs/ once they exist; until then, keep decisions and known gaps in project.manifest.json and PROJECT.md.
