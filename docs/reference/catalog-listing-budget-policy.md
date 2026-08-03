# Catalog listing-budget policy

## Purpose

Host runtimes preload Skill **names and descriptions** under a bounded listing
budget. Large catalogs can shorten descriptions or omit Skills from the initial
list. Progressive disclosure of bodies does not cancel listing pressure.

This policy is a product constraint for `SylphxAI/skills`. It does not invent a
meta-router.

## Host budget classes (non-portable, observed)

Treat these as capacity envelopes, not guarantees:

| Host class | Observed listing pressure |
| --- | --- |
| Codex | Skill list uses at most ~2% of model context, or ~8,000 characters when the window is unknown; shortens descriptions first; may omit Skills under large sets |
| Claude Code | Configurable listing budget fraction / per-description caps; overflow shortens or drops listing entries |
| Others | Assume a small metadata budget; measure per host before claiming full-catalog visibility |

Provider fields and budgets are runtime details (ADR-0011). Design for the
strictest common case when publishing one public catalog.

## Rules

1. **Front-load descriptions.** Put the requestable job, accepted artifact,
   material contexts, and nearest exclusions first. Keywords are anchors, not
   exact triggers.
2. **Prefer shorter descriptions that still route.** If a description cannot
   discriminate within a few hundred characters, fix package boundaries before
   lengthening endlessly.
3. **Package count is capacity.** Adding a Skill has listing cost even when the
   body loads later. Split only when job, artifact, and acceptance authority
   differ (ADR-0009).
4. **No mega-merge without eval.** Consolidation that creates vague mega-Skills
   can destroy discovery precision. Measure positive, near-neighbour,
   abstention, and compound cases before mass merges.
5. **Retire dead packages.** Unused or superseded Skills should leave the
   managed catalog so remaining descriptions keep budget share.
6. **Do not claim full-catalog visibility** from install counts alone. Status
   `110/110 installed` is distribution evidence, not listing effectiveness.
7. **Reporting.** When evaluating catalog pressure, record total description
   characters, package count, and the host budget class under test.

## Structural guardrails in this repository

- `catalog.json` remains the built discovery projection.
- Tests may enforce description max length and warn on aggregate description
  characters relative to the Codex 8k unknown-window class.
- Utilization and routing quality remain separate residuals
  (`skill-utilization-eval-residual.md`).

## Measured snapshot (authoring)

- Packages: 118
- Sum of description characters: 9940
- Ratio to Codex unknown-window 8k class: 1.24×
- Guard: per-description max 1024 enforced by `scripts/check.mjs`
- Action when >1.0×: prefer shorter agent-facing descriptions and retire dead packages before inventing routers

Re-measure after catalog changes; do not treat this section as utilization proof.

