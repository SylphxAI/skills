---
skillsCommit: c3c9ed7284b1a20a76479b6fa49ed29f9a33781a
ranAtUtc: 2026-08-05T03:45:00.000Z
promotable: false
---

# Host capability residual (Claude / Grok) @ skills tip lineage

## Claude Code

- CLI: present (`claude` 2.1.220)
- Auth probe: `claude auth status` → `loggedIn: false`, `authMethod: none`
- **Disposition:** host class present but **cannot support reliable behavior-oracle eval** without credentials (`tool_policy_gap`).

## Grok Build

- CLI: present (`grok` 0.2.118)
- Non-interactive probe: `API error (status 402 Payment Required): Grok Build usage balance exhausted`
- **Disposition:** host class present but **billing-exhausted** in this environment (`tool_policy_gap`).

## Codex

- Auto-heuristic sheets at tip lineage (floor, product-jobs, three-layer, near-neighbour): sibling files.
- Near-neighbour @ `c3c9ed7`: 9/10 then scorer fix for prototype framing (re-run single case on branch).
- Still `promotable: false` until human promotion + multi-host coverage.

## Residual language

Per `skill-utilization-eval-residual.md`, Claude/Grok are **host-incapable here**, not green utilization.
