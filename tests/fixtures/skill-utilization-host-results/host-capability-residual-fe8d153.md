---
skillsCommit: fe8d1532b94bad1945daaa7fb1ee8617d71fd8d1
ranAtUtc: 2026-08-05T04:20:00.000Z
promotable: false
---

# Host capability residual @ fe8d153 lineage

## Claude Code
- CLI present; `claude auth status` → loggedIn false.
- Disposition: **host-incapable** without login.

## Grok Build
- CLI present (`grok` 0.2.118).
- Probe: HTTP **403** spending-limit / credits exhausted (prior 402).
- Disposition: **host-incapable** without billing/credits.

## Codex
- Auto-heuristic sheets cover full fixture id set across tip lineage (including
  `codex-remaining-critical-fe8d153` 7/0/1).
- **promotable: false** until human promotion + multi-host policy.

Utilization residual remains **open**.
