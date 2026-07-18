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
incorrectly copied package. Synchronization already replaces each managed
package atomically; a second whole-repository generation system would add much
more code and platform-specific recovery for little additional value.

## Decision

1. The catalog records a deterministic digest for every Skill package.
2. A package digest covers a sorted, platform-neutral manifest of relative file
   paths and individual content hashes. Symbolic links and non-regular entries
   are rejected.
3. Synchronization verifies staged bytes before replacing the installed
   package. Status recomputes installed package digests instead of trusting the
   manifest alone.
4. Git checkouts use LF bytes, while frontmatter parsing accepts LF and CRLF.
5. Keep package-level atomic replacement. Do not add a whole-target generation,
   pointer store, daemon, extra scheduler, or additional CI workflow.

## Consequences

- Added, changed, removed, and locally drifted packages are detected exactly.
- Unrelated user-managed Skills remain outside the managed set.
- A sync may still expose different package revisions for the few seconds in
  which separate packages are replaced. Supported agent runtimes load Skills at
  context boundaries, so this does not justify a larger transactional store.
