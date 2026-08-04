---
skillsCommit: 1d76fa65165ec24f3070b8f3550ac592a76b7d81
ranAtUtc: 2026-08-04T01:01:05.899330+00:00
promotable: false
---

# Host capability residual (Claude / Grok)

## Claude Code

- CLI: present (`claude` 2.1.220)
- Auth probe: `claude auth status` → `loggedIn: false`, `authMethod: none`
- Non-interactive probe: `claude -p ...` → "Not logged in · Please run /login"
- **Disposition:** host class present but **cannot support reliable behavior-oracle eval in this environment** without credentials (`tool_policy_gap` / auth gap).

## Grok Build

- Symlink: `/home/codex/.local/bin/grok` → `/home/codex/.grok/bin/grok` → `../downloads/grok-0.2.118-linux-x86_64`
- Target binary: **missing** (`/home/codex/.grok/downloads/` empty)
- **Disposition:** host class **cannot support reliable eval** until binary is restored (`tool_policy_gap`).

## Codex

- Measured auto-heuristic slices at tip (floor, critical product, near-neighbour): see sibling sheets.
- Still `promotable: false` until human promotion criteria and multi-host coverage policy are satisfied.

## Residual language

Per `skill-utilization-eval-residual.md` exit criterion 2, Claude/Grok are recorded as **explicit host-incapable residuals in this environment**, not as green utilization.
