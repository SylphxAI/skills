# Source Authoring Standard

Agent-first source authoring from attributed mutable work to coherent Git
history and a reconciled workspace. Git owns source identity; Enact may own
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
- **Pull request:** forge collaboration and integration envelope, normally for
  external contribution or a repository that requires PRs.
- **Worktree:** checkout/index isolation only; not a lock, identity, tenancy,
  security boundary, or external-effect fence.

Branch names, PRs, sessions, and worktree paths do not become competing work
ledgers. Do not require Enact Work ids in public commits or PR bodies.

## Repository-native integration

Follow the repository's declared source policy:

- internal authorized agents prefer small non-force direct-trunk commits when
  allowed;
- external contributors use pull requests;
- repositories may require pull requests for every writer; and
- merge queue is optional only for measured contention on a PR-required branch.

Both PR and direct trunk are valid. CI must not reject a valid source change
solely because it used either supported ingress. Platform does not select the
landing adapter.

## Semantic atomicity

A landed source change is semantically atomic when it:

1. advances one coherent objective or invariant transition;
2. includes code, tests, schemas, migrations, docs, and generated artifacts
   required to keep the landed state valid;
3. excludes unrelated work and unattributed state;
4. declares dependencies and material recovery needs; and
5. can be reverted safely or has a forward-recovery contract; and
6. when it establishes a successor implementation or source authority,
   resolves predecessor disposition under the Engineering Standard instead of
   leaving an active-looking old path as optional cleanup.

Atomic does not mean one file, one commit, one PR, or a fixed line count.
Dependent changes form a valid ordered stack; cross-repository changes use
expand-contract and independently valid repository states.

## Checkpoints and commits

Use local recovery commits or patches during risky work. Create a durable
checkpoint before handoff, likely context loss, or claim expiry. Preserve exact
bytes or a content digest and durable locator.

Before source integration, normalize the intended result into a coherent commit
or a sequence where every preserved commit is valid. Commit subjects describe
the durable result. Add a body only for non-obvious rationale, compatibility,
risk, or recovery. Do not encode chat history, live status, model identity,
secrets, or personal data.

### Direct trunk

1. Refresh the current default branch.
2. Run the repository's required local/affected validation.
3. Create a coherent commit.
4. Push without force.
5. On non-fast-forward rejection, fetch, reconcile semantic conflicts, re-run
   affected validation, and retry.

### Pull request

1. Keep the branch short-lived and the change coherent.
2. Push and open/update the PR.
3. Run repository checks and any required review.
4. If configured, let merge queue evaluate the merge-group SHA.
5. Treat the resulting default-branch SHA—not the mutable PR head—as landed
   source truth.

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

- Resolve duplicate objectives in Enact when available.
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
| Internal repository work | Small coherent revision; non-force direct trunk when allowed, otherwise native PR |
| External contribution | Normal PR; no Enact account or Work id required |
| Risky migration/security/public contract | Same repository integration path plus stronger exact-revision evidence/review/effect authority |
| Parallel agents | Separate Work/attempt scopes; Git conflict recovery; worktrees only for mutable isolation |
| Dirty unknown checkout | Preserve it and use a known safe workspace |
| Generated/bulk change | Include generator version/output evidence; split on semantic boundaries |
| CI backpressure | Let CI cancel safely superseded runs; do not change source authority |
| Interrupted task | Durable checkpoint and released claims/effects; never call it delivered |
| Cross-repository change | Expand-contract with independently valid repository revisions |

## Evidence and metrics

Record the exact landed revision, base when relevant, changed boundary,
validation commands/results, material dependencies, and recovery needs. Enact
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
