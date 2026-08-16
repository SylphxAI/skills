# Sylphx Agent Skills North Star

## Purpose

Give an agent one reusable, requestable method for each real job. The catalog
is an open source distribution of Agent Skills, not an agent runtime or a
control plane.

## Product promise

**Right job -> right method -> trust capped by current evidence.**

Every installable package has one semantic owner and one source contract:
`skills/<name>/SKILL.md`. Optional references, scripts, and assets deepen that
method; they do not create a second job manifest or instruction authority.

Qualification or evaluation evidence may describe confidence in a package, but
it never gates discovery or installation. An unassessed package remains usable,
and a green structural check is not a claim that the method improves outcomes.

## Boundary

The repository owns:

- current `SKILL.md` packages and their directly referenced depth;
- the compact runtime constitution and the full nine-principles source;
- source checks for the Agent Skills contract, local links, and bundled scripts;
- public source and release history.

The repository does not own a custom installer, AutoSync scheduler, generated
catalog, qualification control plane, live customer work, or host runtime
state. Codex, Claude Code, Grok, and other hosts own native discovery,
installation, update, and cache behavior. Consumer migrations and live
readback belong to the consuming product or host owner.

## Durable instruction authority

- [runtime/constitution.md](../runtime/constitution.md) is the compact
  always-on floor.
- [policies/PRINCIPLES.md](policies/PRINCIPLES.md) is the full source for the
  nine universal principles.
- [AGENTS.md](../AGENTS.md) contains only repository-local working
  agreement and points to those sources; it is not a competing doctrine.

## Delivery invariants

- Keep source, CI, landed, released, and live states separate.
- A merge check fails only on a real package or script defect.
- Use the owned `sylphx-linux-standard` runner for repository CI; do not fall
  back to GitHub-hosted labels.
- Preserve unique user bytes and history for custody, but do not replay a
  superseded branch or dirty worktree without current authority.
- A host cutover is complete only after the owning consumer reports the exact
  installed source and a successful native load; repository release alone is
  not live-install proof.

## Terminal for repository changes

A source change is locally complete when the changed package or workflow is
correct and its original check passes. It is landed or released only after the
corresponding Git and forge observation. Live distribution remains an explicit
consumer-owner readback, never an inference from a green repository check.
