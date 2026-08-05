---
skillsCommit: 011d0fe0d5ea48bd49e4bdbf17ead4bfcc9a8a65
ranAtUtc: 2026-08-05T05:20:00.000Z
promotable: false
---

# Host capability residual @ 011d0fe

## Claude Code
- `claude auth status` → `loggedIn: false`
- Disposition: **host-incapable** without login (`tool_policy_gap`).

## Grok Build
- Probe: **402 Payment Required** / usage balance exhausted (also 403 spending-limit).
- Disposition: **host-incapable** without credits/subscription (`tool_policy_gap`).

## Codex
- Runner + tip-pin sheets exist; auto-heuristic only; `promotable: false`.

Utilization residual remains **open** for promotable multi-host proof.
See `docs/reference/skill-utilization-host-runbook.md` promotion section.
