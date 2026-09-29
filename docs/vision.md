# Vision

## Goal

Give an agent one reusable, requestable method for each real job. Sylphx Agent
Skills is an open-source catalog of [Agent Skills](https://agentskills.io/specification)
for product, engineering, operations, design, and research work, installed
through the native plugin path of Codex, Claude Code, Grok, and DeepSeek
Harness (DSH).

## For whom

Agents and people who need a specialized method for a recurring job.

## Principles

- Right job, right method: every package has one semantic owner and one
  contract, `skills/<name>/SKILL.md`. References, scripts, and assets deepen
  that method and never form a second manifest.
- Passive by design: no always-on instructions, hooks, scheduler, or
  background updater.
- Organization-neutral and self-contained: packages cite public or supplied
  authority, not company documents.

## Boundaries

This repository owns the `SKILL.md` packages, their referenced depth, its
checks, and its GitHub listing (description, homepage, topics) and
Discussions. Hosts own discovery, installation, update, and cache. There is no
custom installer, catalog generator, product website, or release channel; the
source tree at a commit is the release.

## Target metrics

- A real request discovers, loads, and performs the named job from
  `skills/<name>/SKILL.md` on every supported host.
- Every skill passes `skills-ref validate`, and every local link resolves.
- A skill improves outcomes over the same model without it; a passing
  structural check does not show that.
