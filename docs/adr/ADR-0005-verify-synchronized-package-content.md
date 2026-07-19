---
status: accepted
date: 2026-07-19
owners:
  - SylphxAI
---

# ADR-0005: Verify synchronized package content

## Context

The catalog digest proved which catalog a client intended to install, but a
matching manifest and package count could not detect a modified, incomplete, or
incorrectly copied package. Early package-level replacement also left a short
window where separate packages could belong to different revisions after a
crash or concurrent inspection. Synchronization must prove package bytes and
switch the managed set as one generation without touching unrelated Skills.

## Decision

1. The catalog records a deterministic digest for every Skill package.
2. A package digest covers a sorted, platform-neutral manifest of relative file
   paths and individual content hashes. Symbolic links and non-regular entries
   are rejected.
3. Synchronization verifies staged bytes before installing a package into the
   next managed generation. Status recomputes installed package digests instead
   of trusting the manifest alone.
4. Git checkouts use LF bytes, while frontmatter parsing accepts LF and CRLF.
5. Install or update the complete managed set as one whole-target generation:
   stage every desired package, removal, profile metadata, and the projected
   manifest in an ownership-proven generation journal; fence recovery, status,
   synchronization, and clear under one target-scoped writer lock; then
   atomically switch one managed-generation pointer shared by every package and
   the manifest. Unrelated third-party or hand-authored Skills never enter the
   managed journal and are never copied, moved, or deleted by the switch.
6. Do not add a hosted daemon, webhook relay, token, Control Plane dependency,
   or an additional CI workflow beyond the single integrity job.

## Consequences

- Added, changed, removed, and locally drifted packages are detected exactly.
- Crash recovery converges to one complete old or new generation rather than a
  mixed package set.
- Unrelated user-managed Skills remain outside the managed set.
- Active agent contexts may still hold previously loaded Skill text until the
  next normal runtime reload boundary; file convergence and model reload remain
  separate proofs.
- `status --json` reports whether the installed generation matches the source
  catalog and exposes the installed source commit, package version, and
  generation identity when present.
