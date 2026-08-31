# Skills identity graph

**Status:** Identity registry. Not live proof.
**Scope:** Sylphx Agent Skills — reusable organization-neutral methods.
**Cite:** the **ID** column.

This file is the identity graph. It is not a PRD, ADR index, or live grade. Destination stays in [`vision.md`](vision.md). Field law stays in `skills/<name>/SKILL.md` and `specification` references. If this file conflicts with those, this file is wrong.

```text
ID | Identity | Fate | Depends on | Done when
```

## Graph

| ID | Identity | Fate | Depends on | Done when |
| --- | --- | --- | --- | --- |
| SKL-CATALOG | Installable agent methods catalog | live | — | Each package at `skills/<name>/SKILL.md` owns one semantic method; optional `references/`, `scripts/`, `assets/` deepen that method without creating a second manifest; host-native discovery/install (Codex, Claude Code, Grok) loads the named job via `SKILL.md` at the source layer. |
| SKL-QUALITY | No competing labor law in public packages | live | SKL-CATALOG | Public packages stay organization-neutral and self-contained: they do not cite `SylphxAI/owner`, copy company standards, or invent a second principle set, scheduler, or qualification control plane; company documentation homes and labor shape remain in `SylphxAI/owner`; a green structural check is not proof the method improves outcomes. |
| SKL-CONTROL | Custom installer/control plane | dead | — | No custom installer, scheduler, generated catalog, or qualification control plane is product authority; hosts own plugin cache and update flow. |

Edges are hard prerequisites. A catalog file count or `GET /healthz` is not the product oracle.

## Release boundary (GOV-017)

Declared per [ADR-030](https://github.com/SylphxAI/owner/blob/main/decisions/ADR-030-RELEASE-CONTROL-PLANE.md)
and [GOV-017](https://github.com/SylphxAI/owner/blob/main/runbook/GOVERNANCE-AUDIT-2026-08-28.md),
grounded in the rows above and the README. This is dest, not live proof.

- **Public probe.** Install through a host's native plugin interface
  (`codex plugin marketplace add SylphxAI/skills`, `claude plugin ...`,
  `grok plugin ...`) and invoke the named job: the host loads
  `skills/<name>/SKILL.md` from this public repository at the source layer
  (SKL-CATALOG).
- **Owned writers.** None. Plainly, this product owns no manifest, migration,
  or release-intent writers — no build, publish, or deployment writer exists
  (`check.yml` runs structural checks only). Hosts own plugin cache,
  installation, and update flow (SKL-CONTROL). The source tree at the exact
  SHA is the release identity.
- **Consumed receipts.** `check.yml` structural-check receipts (package
  contract, Agent Skills validation, links, bundled scripts) as source
  evidence. Installation and invocation receipts belong to the installing
  host, not to this product; it consumes no Deployment, Release, or Promote
  receipts.
- **Runtime effects.** None beyond consumers. Packages are inert source until
  a host installs and invokes them; no service runs and no data is written
  by this repository.
- **Forbidden writes.** Public packages stay organization-neutral and
  self-contained: they do not cite `SylphxAI/owner`, copy company standards,
  or invent a second principle set, scheduler, or qualification control
  plane (SKL-QUALITY); no custom installer, generated catalog, or
  qualification control plane is product authority (SKL-CONTROL);
  `SKILL.md` is the sole package contract — no second manifest; company
  documentation homes and labor shape stay in `SylphxAI/owner`.
