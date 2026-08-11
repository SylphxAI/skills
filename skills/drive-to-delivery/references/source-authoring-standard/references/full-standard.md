# Source Authoring Standard

Agent-first source authoring from attributed mutable work to coherent Git
history and a reconciled workspace. Git owns source identity; a work ledger may own
Work coordination; the repository owns its contribution path.

## Source model

```text
work/goal -> attributed attempt -> checkpoints -> coherent exact revision
          -> repository-native integration -> workspace reconciliation
```

- **Work Item:** optional canonical coordination identity for a substantive
  objective. It does not lock files, branches, PRs, or worktrees.
- **Attempt:** one mutable execution history.
- **Checkpoint:** durable recovery material plus base, validation state,
  remaining work, and next safe action. It is not delivered source.
- **Commit / exact revision:** Git's immutable content identity. It is the
  source unit consumed by CI and delivery.
- **Pull request:** machine-owned candidate envelope for one Work/outcome.
  Ordinary internal and external changes enter main only through PR + Merge
  Queue.
- **Worktree:** checkout/index isolation only; not a lock, identity, tenancy,
  security boundary, or external-effect fence.

Branch names, PRs, sessions, and worktree paths do not become competing work
ledgers. Do not require Work ids in public commits or PR bodies.

## Repository-native integration

Ordinary agent-native path follows
[ADR-20260803](../../../../../docs/history/adr/ADR-20260803-agent-native-queued-trunk.md)
(**Agent-Native Queued Trunk**):

- one Work = one complete outcome = one short-lived branch = one PR;
- open a draft PR immediately; commit at any frequency inside that PR;
- phases/checkpoints stay in the same PR until the Work terminal is met;
- enter Merge Queue only when the outcome is complete and main-green-safe;
- squash-merge through the queue; main stays always production-ready and green;
- ordinary agents do **not** direct-push the default branch;
- direct trunk is **break-glass only** (explicit incident authority);
- claim/worker leases and Work ids are not source admission;
- Platform does not select the landing adapter.

CI must not reject a valid change solely because it used the ordinary PR+queue
path. External contributors without write access use the same PR envelope.

## Three layers (batch work ≠ one Git object)

| Layer | Unit | Rule |
| --- | --- | --- |
| **L1 Implementation** | Session / admitted work batch | Do all high-value unblocked work you can toward the framed outcome(s). |
| **L2 History** | **Atomic commit** inside the PR | Each commit is one logical transition and leaves a **valid** tree. |
| **L3 Integration / revert** | **PR = one complete, independently revertible outcome** | Squash to main makes **one landed commit per PR**—that commit must be a safe revert unit. |

- **Batch implementation** does not mean one monocommit or one mixed bag on main.
- **Many atomic commits in one PR** is the default when an outcome has multiple logical steps.
- **Several PRs from one session** are correct when outcomes are independently revertible.
- Commit count and PR count are diagnostics, not progress KPIs.

## Semantic atomicity

### L3 — Landed PR / squash unit (revert boundary)

A landed source change (the PR outcome; after squash, the main commit) is
semantically atomic when it:

1. advances **one** coherent objective or invariant transition (one revert story);
2. includes code, tests, schemas, migrations, docs, and generated artifacts
   required to keep the landed state valid;
3. excludes unrelated work and unattributed state;
4. declares dependencies and material recovery needs; and
5. can be reverted safely as a whole **or** has an explicit forward-recovery
   contract; and
6. when it establishes a successor implementation or source authority,
   resolves predecessor disposition under the Engineering Standard instead of
   leaving an active-looking old path as optional cleanup.

**Revert test:** if this PR were wholly wrong, would `git revert` of its landed
main commit leave the product coherent? If no, split outcomes into separate PRs
before ready—or keep working until the PR is one coherent revert unit.

Atomic does not mean one file, one commit, one PR, or a fixed line count.
Dependent changes form a valid ordered stack; cross-repository changes use
expand-contract and independently valid repository states.

### L2 — Commits inside the PR

Every **preserved** commit on the PR branch:

1. records **one** logical step (one fix, one feature slice, one wiring, one
   schema step—not an unrelated grab bag);
2. leaves the tree **valid** for that step (build/tests appropriate to the
   change; no knowingly broken intermediate if that commit will remain);
3. has a subject that describes the durable result (body only for non-obvious
   rationale, compatibility, risk, or recovery);
4. excludes secrets, chat logs, live status, and model identity.

Recovery checkpoints may be temporary; before ready/merge, normalize history so
every preserved commit meets the above. Prefer a **sequence of atomic commits**
over a single monocommit when the outcome has multiple logical steps.

## Checkpoints and commits

Use local recovery commits or patches during risky work. Create a durable
checkpoint before handoff, likely context loss, or claim expiry. Preserve exact
bytes or a content digest and durable locator.

Before source integration, normalize into a **sequence of valid atomic commits**
(or one commit only when the whole outcome truly is a single logical step).

### Ordinary path (PR + Merge Queue)

1. Search open PRs for an overlapping candidate; reuse it when present.
2. Create/reuse a short-lived branch for this Work and open a draft PR
   immediately.
3. Commit atomic steps at any frequency; push; keep PR CI latest-wins within
   this PR.
4. Keep every phase, fix, test, schema, migration, doc, and generated artifact
   required by **this outcome** in the **same** PR.
5. If the session produced multiple **independently revertible** outcomes, open
   multiple PRs (one outcome each)—do not fuse unrelated revert stories.
6. Before ready: confirm direction and **project boundary**; clear independent
   separate-context review of material findings; required PR checks green (or
   will be required on the merge-group path).
7. Mark ready only when the Work/outcome is complete and main-green-safe—not a
   phase checkpoint.
8. Arm auto-merge / enter Merge Queue only after step 6–7. Auto-merge is a queue
   arm, not quality proof and not done. Never force-merge, skip required checks,
   or admin-bypass to enter main.
9. Let Merge Queue evaluate the merge-group SHA and squash-merge. On eject or
   red: repair the **owning project** and re-enter; do not bypass the gate.
10. Treat the resulting default-branch SHA—not the mutable PR head—as landed
    source truth. Plan reverts at **that** granularity. Continue to auto-deploy
    and live verification when the delivery terminal requires them.

### Break-glass direct trunk

Only with explicit incident/hotfix authority:

1. Refresh the current default branch.
2. Run required local/affected validation.
3. Create a coherent commit and push without force (or use an admin bypass).
4. Immediately restore queue/PR discipline for follow-up repair if needed.

## Workspace admission

Before mutation:

- resolve repository, goal/Work, base, owned boundary, and definition of done;
- attribute every existing tracked and untracked change;
- check for competing attempts and semantic collision;
- identify shared refs, generated outputs, caches, credentials, services,
  databases, ports, deploy targets, and other effect collisions; and
- preserve all unknown or unrelated state.

A dirty workspace is not automatically unsafe. Continue when all state belongs
to the same goal and ownership is clear. Use a new worktree or clone only when
unknown state, parallel mutation, incompatible base, or recovery risk makes it
the smallest safe action. Never stash, reset, clean, overwrite, or delete
unknown work to manufacture cleanliness.

One exclusive mutable worktree should normally serve one active attempt. It
does not isolate repository refs/config, caches, credentials, processes, ports,
databases, or provider effects.

## Parallel and duplicate work

Claims own objectives, not files. Overlapping files remain legal when agents
own different coherent outcomes and Git can reconcile them.

- Resolve duplicate objectives in the work ledger when one exists.
- Bound deliberately independent attempts.
- Select by acceptance evidence, not first-finish alone.
- Use Git conflict detection and non-force retries.
- Use effect fencing only for scarce external mutation boundaries.

Do not introduce file locks or a Platform source Candidate database to
simulate Git.

## Reconciliation and retirement

Retire a workspace only when:

1. no unique tracked, untracked, ignored, or generated evidence will be lost;
2. needed commits or patches are durably reachable;
3. Work/checkpoint state records validation, delivery state, owner, and next
   action where coordination applies;
4. claims, effects, previews, services, ports, credentials, and caches are
   released, transferred, expired, or explicitly retained; and
5. ordinary non-force removal succeeds.

Force-removing unique or unknown state is forbidden. A retained worktree needs
owner, reason, expiry, and recovery locator.

## Use cases

| Case | Required behavior |
| --- | --- |
| Internal repository work | One complete Work/outcome on one branch+PR; Merge Queue squash to main |
| External contribution | Normal PR; no account or Work id required |
| Risky migration/security/public contract | Same repository integration path plus stronger exact-revision evidence/review/effect authority |
| Parallel agents | Separate Work/attempt scopes; Git conflict recovery; worktrees only for mutable isolation |
| Dirty unknown checkout | Preserve it and use a known safe workspace |
| Generated/bulk change | Include generator version/output evidence; split on semantic boundaries |
| CI backpressure | Let CI cancel safely superseded runs; do not change source authority |
| Interrupted task | Durable checkpoint and released claims/effects; never call it delivered |
| Cross-repository change | Expand-contract with independently valid repository revisions |

## Evidence and metrics

Record the exact landed revision, base when relevant, changed boundary,
validation commands/results, material dependencies, and recovery needs. the work ledger
may privately link this source fact to Work. Platform does not need a duplicate
Candidate record to own source.

Measure source-to-trunk latency, conflict/non-fast-forward retries, PR age and
queue wait where applicable, CI feedback latency, escaped defects, and recovery
time. Commit/PR/worktree count is a diagnostic, not a quality target.

## Research basis

- [Git workflows](https://git-scm.com/docs/gitworkflows)
- [Git commit](https://git-scm.com/docs/git-commit)
- [Git worktree](https://git-scm.com/docs/git-worktree)
- [Git push](https://git-scm.com/docs/git-push)
- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [Google Engineering Practices: Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html)
- [GitHub pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
