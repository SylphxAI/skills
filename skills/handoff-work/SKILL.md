---
name: handoff-work
description: "Safely persist in-progress state and write an actionable resumption brief for another machine, session, or developer. Use when handing off work, switching computers or workspaces, pausing mid-task, saving work-in-progress across environments, or transferring an unfinished objective. Also use to write a short status, decision, or incident update that leads with the outcome. Do not use for fully completed deliverables ready to merge (use drive-to-delivery), or production cutovers (use execute-hard-cutover)."
---

# Handoff Work

A handoff transfers state across machines, sessions, or people without stranded work, leaked secrets, or missing context. An unfinished task on a remote branch is recoverable; work stranded on a local disk or in `git stash` is lost.

## State persistence and hygiene

Perfectionism that waits for tests to pass before committing strands work when switching environments. Commit in-progress work with a descriptive WIP message and push to a remote tracking branch.

`git stash` is host-local storage. It does not transfer across machines and creates false confidence that progress was saved.

Audit untracked files before staging (`git status -u`). Staging everything by reflex risks committing `.env`, local credential tokens, sqlite stores, or heavy build artifacts. Add newly introduced environment variable names to `.env.example` without secret values.

A commit without a successful `git push` leaves the successor stranded. Remote tracking confirmation is the completion proof of persistence.

## Environment and resumption

Document any non-committed prerequisite the successor needs to run: updated packages, new configuration flags, or background daemons.

Open [resumption brief template](references/resumption-brief-template.md) to format the handoff document or message.

Use `drive-to-delivery` when the deliverable is completed and ready to land.

## Status and decision updates

A status update reports where work stands without moving it; a handoff moves the work, so it also needs the persistence steps above. When the request is only a status, decision, or incident update, write it short:

- Lead with the outcome in the first line.
- Say live, deployed, or fixed only for a layer you observed; otherwise say merged, expected, or unverified.
- Label an inference or estimate as one; never state it as fact to make the update shorter.
- Add risks, blockers, and the next step only when the audience needs them.
