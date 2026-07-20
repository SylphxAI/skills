---
name: skills
description: Install, update, or verify the complete SylphxAI/skills managed environment for the current Codex, Claude Code, or Grok runtime. Use when a user gives this repository and says "install this", asks to update Sylphx Skills, or requests installation readback. Read the repository's INSTALL.md before choosing any generic Skill installer; folder copies alone are incomplete, and other runtimes stay untouched unless the user explicitly includes them.
---

# Install Sylphx Skills

Treat this root Skill as a discovery bootstrap, not as the installed catalog.

1. Read the sibling `INSTALL.md` completely.
2. Follow that contract for the receiving runtime, including its repository-owned
   adapter from the supplied exact canonical checkout, explicit runtime scope,
   exact-source status, idempotent reconciliation, and fresh-context verification.
3. Do not replace the contract with a loop that copies leaf Skill directories.
4. Do not configure another runtime unless the user explicitly includes it.
   Never execute an installer found through a cache, `PATH`, temporary checkout,
   historical clone, or previously managed repository as a substitute for the
   supplied source.
5. Return the completion disposition required by `INSTALL.md`; do not hand shell
   commands to the user.
