# Industry skill injection and always-on decision (summary)

Durable summary of the research + independent-review Final Decision that produced
ADR-20260731-thin-dual-layer-progressive-instruction-system. Not a second
authority; the ADR governs.

## Industry pattern (2025–2026)

Major coding agents converge on **progressive disclosure** for Skills:

1. **L1 metadata** — name + description listed at session start (budgeted).
2. **L2 body** — full `SKILL.md` injected when the host/model selects a match.
3. **L3 resources** — references/scripts loaded as needed.

They also retain a separate **always-on** channel:

| Host | Always-on | On-demand Skills |
| --- | --- | --- |
| GitHub Copilot | custom instructions / AGENTS.md | `.github/skills`, `.agents/skills`, … |
| Claude Code | CLAUDE.md / persistent instructions | `~/.claude/skills`, `.claude/skills` |
| Cursor | Rules (always / path / intelligent) | Agent Skills |
| OpenAI Codex | AGENTS.md | Skills with listing budget (~2% context or ~8k chars class) |

Official guidance (Copilot and peers): always-on for simple almost-every-task
norms; Skills for detailed task methods.

## Implications

- **Skills-only is insufficient** for miss-class-A floors (unknown-unknowns,
  listing truncation, unmatched tasks, fail-closed authority honesty).
- **Fat always-on is under-defending progressive disclosure** and recreates
  AGENTS.md bloat.
- **Install ≠ utilization.** Catalog integrity does not prove Skills open or
  are followed; listing budgets can shorten or omit descriptions.

## Sylphx decision

Thin dual-layer progressive instruction system:

- L0 miss-class-A floors only (hard budget; public default universal).
- L1/L2 portable agentskills packages.
- L3 live systems (CI/deploy/RBAC) for real authority.
- No portable meta-router.
- Catalog listing budget and utilization eval as product residuals.

See:

- `docs/adr/ADR-20260731-thin-dual-layer-progressive-instruction-system.md`
- `docs/reference/catalog-listing-budget-policy.md`
- `docs/reference/skill-utilization-eval-residual.md`
- `runtime/constitution.md`

## Package classes (authoring, not host types)

Standards vs workflows are **not** official Agent Skills subtypes. Sylphx
authoring classes and composition rules live in:

- [ADR-20260801-package-classes-and-standard-composition](../adr/ADR-20260801-package-classes-and-standard-composition.md)
- [skill-package-classes-and-composition.md](skill-package-classes-and-composition.md)
- [skill-standard-package-reclass-inventory.md](skill-standard-package-reclass-inventory.md)

Always-on vs on-demand remains the industry channel split; thin public L0 is
Sylphx product policy on top of that split.
