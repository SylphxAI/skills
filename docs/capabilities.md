# Capabilities

| ID | Capability | Status | Code | Depends on |
| --- | --- | --- | --- | --- |
| SKL-CATALOG | Installable skill catalog: one `SKILL.md` per job, loaded by Codex, Claude Code, Grok, and DSH through native plugin install | supported | `skills/`, `.claude-plugin/`, `.codex-plugin/`, `.agents/`, `lib/dsh/`, `dsh/` | - |
| SKL-CHECK | Structural checks: package contract, Agent Skills validation, local links, bundled script tests | supported | `.github/workflows/check.yml`, `tests/test_package_contract.py` | SKL-CATALOG |
