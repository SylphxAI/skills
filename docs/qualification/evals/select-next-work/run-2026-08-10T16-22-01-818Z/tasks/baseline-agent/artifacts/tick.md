# Tick

Claimed (2 of 2 WIP):
1. fix login bug (high) — first: user-facing blocker, highest impact.
2. investigate flaky CI (high) — second: erodes delivery trust and blocks other work.

Unclaimed:
- add export (medium) — queued; blocked by nothing, but lower than the two highs.
- refactor auth (low) — queued; do not touch while login bug is in flight to avoid overlapping auth changes.

Rationale: priority-first selection under the WIP limit of 2. Claim exactly the two high-priority items and stop; the medium/low items wait until a slot frees.
