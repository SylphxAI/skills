---
status: accepted
date: 2026-07-18
owners:
  - SylphxAI
---

# ADR-0001: Public agent instruction source with minimal distribution tooling

## Context

The repository accumulated private-portfolio admission, hidden benchmark,
model-evidence, trust-root, organization-wide state, and retired-history machinery around a much
smaller durable responsibility: publish the static instructions used by
agents. That machinery increased cost and obscured the product boundary.

Sylphx wants its working methods and Platform guidance to be public. Public
visibility is intentional disclosure and promotion; it is not a claim that the
content must be vendor-neutral or that MIT text remains commercially exclusive.

## Decision

1. `skills/<id>/` is the only semantic authoring root.
2. The repository is public and MIT licensed.
3. Codex and Claude Code are the initial supported runtime destinations.
4. A small repository-owned CLI performs install, update, status, clear, and
   optional OS-native auto-sync without depending on an upstream Skills CLI,
   Control Plane, tokens, or a long-running service.
5. CI has one integrity job. It validates package shape, local references,
   obvious current-tree secrets, catalog determinism, and installer behavior.
6. Raw benchmark runs, model outputs, hidden-evaluation authority, admission
   systems, live state, and retired copies are removed. They may be recreated
   in an owning evaluation or operational boundary when there is current value.
7. Existing relevant Skill-authoring commits are preserved through a filtered
   history. The complete predecessor source is recoverable from the private
   `SylphxAI/skills-history-archive` repository and the pre-cutover bundle.

Decision 4's initial hourly schedule and the later hook experiment are
superseded by [ADR-0003](ADR-0003-configurable-scheduled-synchronization.md).
The boundary remains a repository-owned adapter with no hosted service, token,
or Control Plane dependency.

## Consequences

- Public users can inspect, install, and reuse Sylphx working methods.
- Sylphx-specific guidance such as `sylphx-platform-first` remains a legitimate
  public product surface.
- Repository checks become proportional to static package integrity.
- Commercial value moves to maintained releases, automatic distribution,
  enterprise/private packages, integrations, verification, and support.
- Historical private-portfolio and benchmark systems are not steady-state
  dependencies of the instruction source.
