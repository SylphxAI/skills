# Conformance entrypoint

`npm run check` runs `node conformance/check.mjs` — the single deterministic
verification entrypoint for this repository's engineering baseline.

It checks:

1. `fences.yaml` is well-formed and every declared fence resolves to an
   implemented check.
2. `AGENTS.md` is the sole active constitution and projects the Sylphx
   constitution by link (instruction-authority fence).
3. `project.manifest.json` validates against the canonical
   `project-manifest` schema and `PROJECT.md` is present (project-facts
   fence).
4. `package.json` declares no dependencies and its `check` script resolves to
   this entrypoint (dependency-fence).
5. The predecessor instruction layout exists only as the dated,
   non-authoritative `AGENTS.legacy.md` residual (legacy-retirement fence).

Exit code 0 means all declared checks passed on the exact current files;
non-zero means at least one fence or fact check failed.
