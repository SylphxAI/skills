# Qualification ledger

Repo-wide, version-scoped qualification state for Sylphx Verified Capabilities.
This is a **projection** of the per-package `qualification.json` records plus
filed evidence; it is not a separate source of truth.

## Current state (2026-08-10)

- Capability packages: **57**
- Qualified: **0**
- Outcome receipts recorded: **0** (receipts are recorded by user systems and
  the Control Plane against `schemas/outcome-receipt.schema.json`; the
  repository does not fabricate them)
- Verified Capability Yield: no eligible attempts (eligibility requires
  current + qualified + authorized; unverified success is not eligible)

No package may be marked `qualified` without filed, version-scoped evidence.
Until then every package stays `unqualified` — this is the honest default, not
a failure of authoring.

## Updating this ledger

1. Follow [`docs/QUALIFICATION.md`](../QUALIFICATION.md) and
   `skills/design-skill-evals`.
2. Update the per-package `qualification.json`, add evidence under
   `evals/`, then run `npm run build:catalog && npm test`.
3. Record here: capability id, version/digest, evaluator, qualifiedAt,
   expiresAt, and evidence locator. The catalog `qualification` block must
   match this ledger.

## Evaluation evidence

- [`evals/utilization-residual.md`](evals/utilization-residual.md) — the open
  multi-host utilization residual: structural tests and Codex auto-heuristic
  slices are not promotable qualification evidence; Claude/Grok host proof is
  not yet closed.

## Known distribution residuals (honest gaps, not silently covered)

- No `sylphx-skills` npm package is published (requires registry credentials);
  the GitHub install prompt is the current distribution surface.
- The external skills.sh projection is not owned by this repository; install
  claims here are bound to this repo's exact revisions, not third-party counts.
- Host runtime integration (Claude/Grok live selection) is not closed; see
  `evals/utilization-residual.md`. Python helpers get a CI syntax floor only.
