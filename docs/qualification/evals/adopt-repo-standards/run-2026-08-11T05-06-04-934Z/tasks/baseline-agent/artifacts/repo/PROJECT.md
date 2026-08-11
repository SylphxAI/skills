# Acme App

Machine-readable project authority: [`project.manifest.json`](./project.manifest.json).

Example TypeScript product repository (fixture) on the Sylphx engineering
baseline: projected constitution, machine-readable project facts, and a
conformance entrypoint.

## Goals

- Keep the repository on the active engineering baseline with one instruction
  authority: the active Skills runtime plus compact repo-local notes.
- Keep project facts machine-readable in `project.manifest.json` and readable
  in this file.

## Non-Goals

- Owning product capabilities beyond the example fixture surface.
- Maintaining a second instruction authority or a restored predecessor layout.

## Boundaries

Owned: `AGENTS.md`, `PROJECT.md`, `project.manifest.json`,
`scripts/check-conformance.mjs`, and this repository's delivery facts.

Public surfaces:

- Orientation: `README.md`
- Manifest contract: `project.manifest.json`
- Conformance CLI: `npm run check`

## Delivery

Terminal: source landing on `main` with the conformance check green. This
fixture has no package release or deployment boundary.

## Verification entrypoint

```bash
npm run check
```
