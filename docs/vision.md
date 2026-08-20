# Sylphx Agent Skills

This file is the product destination. It is not a North Star Metric.
The identity graph is [capabilities.md](capabilities.md).

## What finished is

Give an agent a lightweight, requestable guide for each real job: particular
opinions, gotchas, and current interfaces a capable model's training would
otherwise miss. Skills exist because model knowledge lags live APIs and
writing standards. This repository is an open-source catalog of Agent Skills,
not an agent runtime or a control plane.

## For whom

Agents and people who need a specialized guide for a recurring product,
engineering, operations, design, or research job.

## Not doing

- A custom installer, scheduler, generated catalog, or qualification
  control plane
- A second company stack or a second principle set
- A required North Star Metric, capability count, or house score
- File-existence CI for documentation headings

## Oracle

A real request can discover, load, and perform the named job from
`skills/<name>/SKILL.md` under the [Agent Skills
specification](https://agentskills.io/specification). Hosts own discovery
and installation. A green structural check is not proof that the guide
improves outcomes.

## Product promise

**Right job -> right guide -> trust capped by current evidence.**

Every installable package has one semantic owner and one source contract:
`skills/<name>/SKILL.md`. Optional references, scripts, and assets deepen
that guide; they do not create a second job manifest.

## Boundary

The repository owns current `SKILL.md` packages, their directly referenced
depth, public source history, and the repository's own checks. Codex,
Claude Code, Grok, and other hosts own native discovery, installation,
update, and cache behavior.

Organization, project, and runtime policy stays with its owning repository or
host. A generic package must not require hidden company context to perform its
job.
