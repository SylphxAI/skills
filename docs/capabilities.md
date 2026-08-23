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
| SKL-QUALITY | Skills cite Owner — no competing labor law | live | SKL-CATALOG | Packages cite `SylphxAI/owner` standards as law without inventing a second principle set, scheduler, or qualification control plane; a green structural check is not proof the method improves outcomes. |
| SKL-CONTROL | Custom installer/control plane | dead | — | No custom installer, scheduler, generated catalog, or qualification control plane is product authority; hosts own plugin cache and update flow. |

Edges are hard prerequisites. A catalog file count or `GET /healthz` is not the product oracle.
