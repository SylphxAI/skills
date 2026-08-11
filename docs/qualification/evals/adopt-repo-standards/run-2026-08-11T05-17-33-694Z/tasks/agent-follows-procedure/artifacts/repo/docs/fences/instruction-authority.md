# Instruction-authority fence

Status: ACTIVE — sole instruction-authority fence for this repository.
Owner: acme-app
Established: 2026-08-11
Conformance: enforced by `npm run check` (scripts/conformance.mjs).

## Authority topology

- `SylphxAI/skills` owns static standards, procedures, binding profiles, and the
  compact runtime constitution
  (https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md,
  content digest sha256:c53c961c11c38882b487b29eee9bdee9561d7eadcd299b461f18be6975eb595d).
- This repository owns its code, contracts, local decisions, and delivery declaration.
- `AGENTS.md` is the sole repo-local runtime constitution projection (compact;
  links `PROJECT.md` and `project.manifest.json`; no copied standards).
- `PROJECT.md` and `project.manifest.json` are the repo-local fact authorities;
  no competing identity files or legacy manifests are maintained.
- Live work systems own selection, adoption, work, and conformance projections;
  this repository does not author organization-wide adoption state.
- Git and declared GitOps state are the durable source of truth for source.
  Chat sessions, hidden transcripts, and local task titles are not work authority.

## Predecessor retirement (dated residual)

- Predecessor layout: legacy `repo/AGENTS.md` instruction content
  ("Always ask the ops guild before changing anything"; "Keep all engineering
  rules in this file"; "Do not use any other instruction source").
- Retired on: 2026-08-11
- Owner: acme-app
- Successor authority: this fence + `AGENTS.md` constitution projection.
- Residual: `docs/history/legacy-AGENTS-retired-2026-08-11.md` preserves the
  predecessor content verbatim, marked RETIRED, for history only.
- Terminal: the predecessor content must never reappear in an active
  instruction surface; `npm run check` fails on reactivation. Retirement is
  permanent — no reactivation without a new fence decision.

## Fence change contract

- Any new repo-local instruction authority, profile binding, or exception must
  be declared here with owner and date before it becomes active.
- Stack/profile fences and enterprise control-plane layers are selected through
  the applicable Skills profiles and the live work system, never invented
  repo-locally.
