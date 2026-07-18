# doctrine-profile-standard (canonical body)

**Authority:** binding Standard Skill package `doctrine-profile-standard` in `SylphxAI/skills` (`skills/doctrine-profile-standard/`).

**Cutover:** migrated from Doctrine `standards/doctrine-profile-standard.md` at digest `sha256:939c5d7e8c41ba66291c4c69741c3eab7f3901f022fda7ff1a8e270238066c47` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Doctrine Profile Standard

## Purpose

Use this standard when a durable enterprise choice depends on current tooling,
ecosystem maturity, forge capability, operating mode, provider, protocol,
language, or other condition that can change without changing a constitutional
invariant.

Principles own timeless obligations. Domain standards own outcomes and proof.
Profiles own binding, time-bounded selections. Runtime adapters own invocation
syntax and integration mechanics. ADRs own why a profile was adopted,
superseded, or retired.

## Core rule

An active profile is binding wherever its typed selector matches. It is not
advisory. Its `authorityClass` determines where it enters the
[SOTA decision kernel](https://github.com/SylphxAI/doctrine/blob/main/standards/sota-execution-standard.md):

- `mandatory-governance` carries a standing authority or operating constraint
  at precedence item 3, below higher authority, ruin constraints, and
  correctness/security/privacy floors but before ordinary objective
  optimization;
- `selection-default` chooses a current tool or mechanism only at precedence
  item 8, after correctness floors, objective, risk, reversibility, and
  evidence. Stronger task evidence does not authorize silent deviation: use
  the declared exception contract or amend the profile centrally.

A runtime adapter may implement a profile; it may not weaken, rename, or
silently replace it. A technology selection can never be interpreted as a
`mandatory-governance` constraint or as outranking security/privacy floors.

No current vendor, language, protocol, SDK, database tool, forge, or dated
frontier claim belongs in `PRINCIPLES.md`. Move the choice into a profile while
leaving the durable obligation in the owning standard.

## Canonical profile contract

The enterprise scope registry conforms to
[`schemas/doctrine-scope.schema.json`](https://github.com/SylphxAI/doctrine/blob/main/schemas/doctrine-scope.schema.json).
It is itself an immutable, digest-bound revision: it owns organization
membership, selector vocabularies, required-profile ids, lifecycle dates, and
the profile-resolution ratchet. A material scope change adds a successor scope;
it never changes the meaning of `*` in an existing profile silently.

Every profile conforms to
[`schemas/doctrine-profile.schema.json`](https://github.com/SylphxAI/doctrine/blob/main/schemas/doctrine-profile.schema.json)
and declares:

Both canonical schemas are governed by the append-only per-version contract
policy in
[`profiles/artifact-schema-policy.json`](https://github.com/SylphxAI/doctrine/tree/main/profiles/artifact-schema-policy.json):
an admitted version's validation semantics cannot change in place, and every
future version must expand, reconcile, ratchet, and contract through an owned
decision and explicit compatibility window.

A `mandatory-governance` profile is binding only while one exact, digest-bound
grant in `profiles/mandatory-governance-authorities.json` covers its full
semantic digest and selected capability/default/task-surface set. Candidate and
withdrawn profile revisions are non-binding and do not inherit the incumbent's
grant. An active revision resolves exactly one currently valid grant for its
profile id and semantic digest; a deprecated or retired revision resolves the
matching immutable historical grant that covered its `activatedAt`. Retained
active-grant windows for a profile are immutable, non-overlapping, and exactly
day-contiguous; a known future gap fails immediately, while expired grants stay
as history instead of disappearing.

The current v1 registry and admitted grant prefix are immutable. `effectiveAt`
and `reviewAt` define lifecycle windows, not admission provenance. The audit
fails every successor-registry transition closed until a successor schema and
executable gate first admit a non-binding candidate and later bind activation
to an immutable `admissionCommit` in exact default-branch ancestry. A schema
branch or artifact-policy ratchet alone cannot manufacture retroactive
authority.

- stable profile id, immutable semantic digest, and digest-bound revision;
- candidate, active, deprecated, retired, or withdrawn lifecycle state;
- bootstrap/ratchet activation mode, exact registered attested activation/deprecation
  evidence, immutable lifecycle timestamps, and a bounded migration deadline for a
  deprecated/retired predecessor;
- typed authority class;
- owner and owning ADR slug;
- applicability selector;
- effective date and review date;
- explicit review triggers;
- declared defaults (binding only while the profile is active) with an explicit selection basis, decision provenance,
  applicability, exception contract, and exit criteria; structured comparative
  evidence is mandatory for future selection candidates but is not fabricated
  for preserved bootstrap defaults;
- migration and recovery behavior;
- a non-empty digest-bound replacement-profile set when deprecated or retired;
- an optional typed `coverageExit` decision for exact selector/default slices
  intentionally removed by the successor union;
- registered attested fleet-conformance evidence for coverage exit and retirement.

`candidate` is non-binding and may coexist with the current active predecessor
during expand/reconcile, including across scope revisions. Activation is a
typed `candidate → active` ratchet whose `activatedAt` equals the registered attested
verdict's server-observed date and whose verdict binds the full digest reference.
`bootstrap` is reserved to the ADR-173 initial corpus. The predecessor moves
`active → deprecated` only with evidence binding the full sorted active
successor set and a `deprecatedAt` date equal to that verdict's forge-observed
date. A
binding state cannot take effect before its lifecycle timestamp. Direct
`active → retired` is forbidden. Retirement is a
later `deprecated → retired` transition with resolvable readback evidence.
An abandoned experiment follows `candidate → withdrawn`; `withdrawn` is a
non-binding terminal history state and cannot be resolved as policy.
Selection freshness is evaluated against today only while a profile is a
candidate or active. Deprecated, retired, and withdrawn revisions still verify
their immutable evidence bytes, claim binding, and internal observation/review
window, but later wall-clock expiry cannot invalidate retained history.
Every replacement must already be active at predecessor deprecation. Profile
replacement is a set so a one-to-many split is legal; its union is checked over
the full Cartesian organization/lifecycle/layer/pool/capability/task-surface
domain and over every default/task-surface binding. Scope replacement remains
singular. Silent contraction fails. A legitimate contraction declares compact
typed selector/default slices, an ADR, `approvedAt`, and an exact registered
pre-deprecation coverage verdict. Scope vocabulary/organization/profile-id
removals use the equivalent exact typed contract.

Replacement graphs reject self/cycles, retired or merely candidate successors,
backwards effective dates, uncovered semantic tuples, a migration deadline more
than 180 days after deprecation or later than successor review, and attempts to
move an already-declared profile-resolution ratchet later. Retirement proof is
an exact `SylphxAI/doctrine` fleet-conformance verdict whose context contains
the full predecessor digest reference. Its successful record's per-result,
server-observed date must equal `retiredAt`. GitHub Check Runs do not expose
such a timestamp: `started_at`/`completed_at` are App-supplied, while the linked
Check Suite's forge-assigned `created_at` is only the suite epoch and may predate
a later run or rerequest. Schema v1 therefore treats the suite time as a
diagnostic lower bound and cannot authorize a lifecycle transition. A future
authority schema must bind the digest-attributed Check Run to a per-result forge
timestamp, such as a separately registered, cross-linked commit-status
`created_at` or a stronger equivalent. The commit must remain in current
default-branch ancestry, and the latest unambiguous matching record inside the
registered authority namespace must still be successful. Arbitrary
repository statuses, stale successes, prose, ADRs, issue labels, and URLs are
not fleet readback. Once assigned, lifecycle timestamps, migration deadline,
activation/deprecation evidence, replacement set, coverage exit, and retirement
evidence are immutable. Check-run and commit-status evidence share one canonical
resolver, but their history guarantees differ. Commit statuses are fully
paginated as a complete record stream. The commit-ref Check Runs endpoint is
paginated but bounded to runs from GitHub's 1,000 most recent Check Suites;
`filter=all` removes the default latest-by-`completed_at` filtering only inside
that bounded view. It cannot prove complete history and is diagnostic rather
than transition authority. A future binding contract must enumerate every
relevant suite and its runs or use a stronger complete record-stream primitive.
The commit must remain in current default ancestry, unresolved namespaces fail
closed, and only the latest numeric record inside the registered producer
identity may authorize a transition. Without a registered identity, duplicate
namespaces remain ambiguous; with one, foreign collisions are classified but
non-authoritative.

The authority contract above is future-facing and fail-closed. Status-evidence
registry schema v1 is `spec-only` and its authority list is empty. No profile or
scope may activate, deprecate, contract coverage, or retire from a repository-
local workflow, issue, comment, URL, or self-authored green status. A binding
transition requires a future authority-schema ratchet plus an external producer
whose App/integration identity, producer materials, exact claim/result/source
digests, forge timestamp, and ruleset binding are mechanically verified. The
external App check binds its exact result digest through `external_id`; its
registered source commit is verified in current default-branch ancestry,
without pretending the external App is also a GitHub Actions job. The commit
binds its repository tree and every declared producer material is re-read at
that commit. Every copied verdict input is compared byte-for-byte with the
declared original repository path and ancestral commit. A recorded branch name
is observation metadata: a later rename cannot invalidate immutable evidence
while the commit remains in current default ancestry. Same-context checks
outside the registered App are reported as foreign competitors but cannot gain
authority or veto the registered producer. All Check Run pages are requested
with `filter=all` for the strongest available bounded diagnostic; GitHub's
default `filter=latest` may additionally hide an older or newer run based on
App-supplied completion fields. Neither view is complete transition authority.

Profile review dates trigger reassessment; they never silently disable a
binding rule. In particular, expiry of the no-human profile cannot fall back to
human review. The current profile remains binding until a successor is accepted
through doctrine's normal policy delivery path.

## Selection and conflicts

Bootstrap selections and future evidence-qualified selections are different:

- `preserved-fleet-default` is available only to ADR-173 bootstrap-active
  selection profiles. It carries decision provenance and review triggers with
  `selectionEvidence: null`; it is not a claim that the default won a current
  empirical frontier comparison.
- `selection-evidence` is one immutable semantic basis across candidate and
  active lifecycle states. Its content-addressed artifact binds objective,
  constraints, exact selector/default claim, alternatives, captured measured
  and primary sources, outcome derivation, Pareto or best-under-constraints
  reasoning, freshness, falsification, recovery, and replacement thresholds.
  Schema v1 is a `spec-only` candidate claim. It may inform review but cannot
  authorize an active profile. Binding activation needs an attested producer in
  a future schema version and staged ratchet.

Keeping the basis immutable avoids an impossible lifecycle where activation
would have to rewrite the candidate's semantic digest.

1. Resolve the exact digest-bound enterprise scope and profile revisions named
   by the repository manifest, then resolve repository facts and typed
   profile/default task surfaces; prose `appliesWhen` may explain but cannot
   broaden the selector.
2. Apply `mandatory-governance` profiles at kernel item 3 and
   `selection-default` profiles only at item 8.
3. If two active defaults claim the same selection key for overlapping
   selectors, profile validation fails; an agent does not choose between them.
4. A repo may deviate only through the profile's declared exception contract.
   Each default declares `exceptionMode`; `forbidden` defaults cannot be
   excepted. A `decision-required` exception is content-addressed and binds the
   exact profile/default, a real repo ADR, evidence, recovery, issuance and
   expiry. It first lands non-effective as `proposed`; only after a registered
   attested producer publishes `doctrine/profile-exception/<id>` may a second PR
   set that exact identity `active`. Schema-v1 authority is unavailable, so the
   current system leaves every proposal non-effective and fail-closed. Expiry is no more than 90 days after issuance and never
   later than profile review. Renewal creates a new identity and admission.
5. Evidence that a profile default is dominated triggers a doctrine amendment;
   silent local replacement is drift.

## Lifecycle

Profile replacement follows expand → reconcile → ratchet → contract:

1. **Expand** — add a non-binding candidate successor and
   compatibility/migration path while the predecessor remains active.
2. **Reconcile** — select affected repositories and generate issues or PRs.
3. **Ratchet** — activate every successor and deprecate the predecessor only
   after coverage proof and migration producers exist.
4. **Contract** — retire the predecessor only after readback proves migration.

Do not edit history into a false continuous present. Immutable scope and profile
semantics are content-addressed: the digest prefix is part of the revision and
filename. A material semantic change therefore creates a new revision. The
predecessor may change only lifecycle state, immutable lifecycle timestamps,
bounded migration deadline, replacement set, typed contraction contract, and
evidence, then becomes deprecated or retired. The full active successor union
must cover the predecessor unless the exact exited slices have registered attested proof.

## Agent consumption

Profiles are generated into portable Agent Skills. Profile skills carry the
binding current selection; domain-standard skills carry the enduring outcome
and proof obligations. Agents load the relevant profile skill when making a
choice in that category, then record repo-local selections in the project's
declared manifest or ADR rather than copying the profile prose. The project
manifest's `profileResolution` binds the owning source repository, exact scope
reference and source, profile digest revisions, authority class, exceptions,
and migration packets. Exceptions use the two-phase content-addressed admission
above. Migration packets are content-addressed over issuance, same-repository
tracker, due date, and the sorted exact `from → to` transition set. Any semantic
change produces a new packet id and cannot reuse an earlier completion status.
The packet also binds status and completion proof; its due date is no later than
central migration/successor-review deadlines. Duplicate or unrelated transitions
fail; split replacement requires the full successor set. Completion requires
`doctrine/migration/<packetId>` at a commit in current default-branch ancestry;
issue or PR state alone is not completion. With the schema-v1 authority registry
empty, completion cannot yet become authoritative and must remain unresolved;
the canonical enterprise scope registry owns organization and selector
vocabulary. Absence is reported during the expansion window and becomes a
fail-closed conformance error on the scope's
`profileResolutionRequiredFrom` date.

## Validation

Run:

```sh
python3 scripts/doctrine-profile-audit.py
python3 scripts/generate-agent-skills.py --check
```

The profile audit executes the Draft 2020-12 schema, content/revision identity,
scope/profile content identity, selector and manifest resolution,
effective/review dates, immutable history transitions, Cartesian replacement
coverage, fail-closed registered evidence resolvers, selection-evidence replay,
duplicate keys, exception/exit contracts, and mandatory
no-human coverage.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `doctrine-pro-01` | Strongest relevant subset applied |
| `doctrine-pro-02` | Facts in schema/test/ADR homes |
| `doctrine-pro-03` | Proof layers separated |
| `doctrine-pro-04` | Unknown authority fails closed |
| `doctrine-pro-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
