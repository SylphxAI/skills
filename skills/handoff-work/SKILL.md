---
name: handoff-work
description: "Safely persist in-progress state and write an actionable resumption brief for another machine, session, or developer. Use when handing off work, switching computers or workspaces, pausing mid-task, saving work-in-progress across environments, or transferring an unfinished objective. Do not use for routine status updates without environment transfer (use write-high-signal-update), fully completed deliverables ready to merge (use drive-to-delivery or work), or production cutovers (use execute-hard-cutover)."
---

# Handoff Work

A handoff transfers state across machines, sessions, or people without stranded work, leaked secrets, or missing context. An unfinished task on a remote branch is recoverable; work stranded on a local disk or in `git stash` is lost.

## State persistence and hygiene

- **Persist half-finished work to remote:** Do not abandon edits because tests fail or implementation is partial. Commit work-in-progress with a clear message (e.g. `wip: <what-is-done-and-what-is-broken>`) and push to a remote tracking branch.
- **Never rely on `git stash` for transfer:** Stash is host-local and invisible to other machines.
- **Filter before staging:** Run `git status -u` to audit untracked files. Never blindly `git add -A` or commit `.env`, credentials, local databases, or build caches. Add new environment variable names (without values) to `.env.example`.
- **Confirm the remote push:** A local commit without a successful `git push` leaves the successor stranded. Verify the remote branch receives the exact commit SHA.

## Environment and external state

Document any non-committed prerequisite the successor needs:
- Toolchain requirements, package installations, or local dependencies.
- New configuration keys or flags.
- Background daemons, emulators, or migrations required to reproduce current state.

Open [resumption brief template](references/resumption-brief-template.md) to format the handoff document or message.
