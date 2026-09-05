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
| SKL-CATALOG | Installable agent methods catalog | live | — | Each package at `skills/<name>/SKILL.md` owns one semantic method; optional `references/`, `scripts/`, `assets/` deepen that method without creating a second manifest; packages stay passive (no always-on injection, hooks, or default-install); host-native discovery/install (Codex, Claude Code, Grok, DSH) loads the named job via `SKILL.md` at the source layer. GitHub listing description matches the README one-sentence purpose; homepage is this repository URL; preview is none; issue and discussion host options include Codex, Claude Code, Grok, and DSH. |
| SKL-QUALITY | No competing labor law in public packages | live | SKL-CATALOG | Public packages stay organization-neutral and self-contained: they do not cite `SylphxAI/owner`, copy company standards, or invent a second principle set, scheduler, or qualification control plane; company documentation homes and labor shape remain in `SylphxAI/owner`; a green structural check is not proof the method improves outcomes. |
| SKL-CONTROL | Custom installer/control plane | dead | — | No custom installer, scheduler, generated catalog, or qualification control plane is product authority; hosts own plugin cache and update flow. README, Discussions, issue templates, and wiki do not present `npx github:SylphxAI/skills sync`, auto-sync, or a qualification score as install or update authority. GitHub Releases are not dest; leftover Verified Capabilities tags and the v7 Latest release are occupancy to unpublish. Wiki is not a documentation home. |

Edges are hard prerequisites. A catalog file count or `GET /healthz` is not the product oracle.

## Release identity

Grounded in the rows above and the README. This is dest, not live proof.

- **Public probe.** Browse this GitHub repository and install through a
  host's native plugin interface (`codex plugin marketplace add
  SylphxAI/skills`, `claude plugin ...`, `grok plugin ...`,
  `dsh plugin ...`) and invoke the named job: the host loads
  `skills/<name>/SKILL.md` from this public repository at the source
  layer (SKL-CATALOG). README is the public install text. GitHub
  description matches that one-sentence purpose. Homepage is this
  repository URL. Preview is none.
- **Owned writers.** This repository's source tree, GitHub listing
  (description, homepage, topics), and this repository's Discussions.
  No build, publish, deployment, or GitHub Releases writer exists as
  dest (`check.yml` runs structural checks only). Hosts own plugin
  cache, installation, and update flow (SKL-CONTROL). The source tree
  at the exact SHA is the release identity.
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
  plane (SKL-QUALITY); no custom installer, generated catalog,
  qualification control plane, `npx` sync, auto-sync, GitHub Releases
  channel, or wiki documentation home is product authority (SKL-CONTROL);
  `SKILL.md` is the sole package contract — no second manifest; company
  documentation homes and labor shape stay in `SylphxAI/owner`.
