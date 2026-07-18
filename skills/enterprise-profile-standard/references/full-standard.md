# Enterprise Profile Standard

**Authority:** binding Standard Skill package `enterprise-profile-standard` in
`SylphxAI/skills`. Historical predecessor records are lineage only.

## Purpose

Profiles hold current, changeable enterprise selections—language versions,
toolchains, providers, protocols, operating modes, and architecture
generations—without mixing dated choices into timeless engineering standards.

Standards own durable outcomes and predicates. Profiles choose current defaults.
Repository manifests bind the selections that apply locally. Control Plane owns
resolved live fleet state and adoption progress.

## Profile contract

Rule IDs:

- `profile-identity-01` — every revision has stable identity and immutable content.
- `profile-selector-01` — selectors resolve deterministically without overlapping defaults.
- `profile-exception-01` — deviations are typed, owned, expiring, and recoverable.
- `profile-retire-01` — predecessor steady state retires after selected convergence.

Every profile declares:

- stable id, immutable revision/content digest, owner, and decision reference;
- lifecycle: `candidate`, `active`, `deprecated`, `retired`, or `withdrawn`;
- typed selector over explicit fleet facts;
- authority class: governance constraint or selection default;
- concrete defaults and why they were selected;
- effective/review dates and evidence-based review triggers;
- exception mode, owner, expiry, recovery, and replacement condition;
- predecessor/successor relations and migration terminal.

A selector match is deterministic. Two active profiles may not claim the same
selection key for overlapping selectors. Unknown or conflicting resolution
fails closed rather than asking an agent to improvise.

## Authority and use

- `candidate` informs evaluation but is non-binding.
- `active` is binding for matching selectors.
- `deprecated` remains readable only for migration compatibility.
- `retired` and `withdrawn` are historical and never selected.
- A runtime adapter may project a profile but cannot rename or weaken it.
- Repository-specific deviation uses the profile's typed, expiring exception;
  silent local replacement is drift.

Technology defaults never outrank correctness, security, privacy, legal, or
explicit task authority. Evidence that a default is dominated triggers a
profile successor, not a permanent repo-local fork.

## Lifecycle

The lifecycle state machine is:

```text
candidate -> active -> deprecated -> retired
     \-----------> withdrawn <-----/
```

Only `active` participates in default selection. A withdrawn or retired
revision cannot reactivate; a changed choice is a new immutable revision.

Use expand/reconcile/ratchet/contract only where compatibility risk actually
requires overlap:

1. admit a non-binding successor candidate;
2. evaluate and select the affected denominator;
3. activate the successor and migrate selected repositories;
4. retire the predecessor once machine-readable convergence is true.

During development, when no live compatibility or irreversible state exists,
prefer one-step cutover with exhaustive static/test evidence. Calendar waiting
is not evidence. Permanent multi-profile steady state is forbidden.

## Exceptions

An exception is a temporary control, not an alternate standard. It binds the
exact profile/default and selector, rationale, owner, evidence, recovery,
expiry, and replacement action. `forbidden` defaults cannot be excepted.
Renewal creates a new decision; expiry never silently becomes acceptance.

## Verification

Verify profile schema, content identity, selector determinism, collision freedom,
review freshness, exception validity, successor coverage, and repository
readback. Keep these layers distinct:

- Skills source/profile admitted;
- repository manifest resolved;
- migration delivered;
- Control Plane live fleet convergence observed.

No layer may manufacture the next one from prose or an authored `complete` flag.
