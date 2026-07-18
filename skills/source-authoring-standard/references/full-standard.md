# source-authoring-standard (canonical body)

**Authority:** binding Standard Skill package `source-authoring-standard` in `SylphxAI/skills` (`skills/source-authoring-standard/`).

**Cutover:** migrated from Doctrine `standards/source-authoring-standard.md` at digest `sha256:488ac649392a40cacc98a457ca52867e5917bb8c7369cbaab08a8e54c15a6192` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Source Authoring Standard

Agent-first source authoring for high-concurrency, sessionless development.
This standard owns the lifecycle from attributed mutable work to an immutable
source candidate and reconciled workspace. Delivery profiles own transport,
admission, landing, release, and deployment.

Composes with:

- [`mission-control-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/mission-control-standard/references/full-standard.md) for Work Items,
  claims, checkpoints, handoff, and proof-chain identity.
- [`autonomous-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/autonomous-execution-standard/references/full-standard.md) for
  execution graphs, delegation, collision cones, and evidence reporting.
- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for parallel ownership and machine-enforced governance.
- [`roleless-speculative-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/roleless-speculative-development-standard/references/full-standard.md)
  for immutable candidate selection and compare-and-swap landing when selected.
- [`ci-admission-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-admission-standard/references/full-standard.md) for exact-candidate
  proof and scarce verification capacity.
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for the active lane's landing
  and terminal delivered-state proof.

## Canonical lifecycle and vocabulary

```text
work -> attempt -> checkpoint -> exact source candidate
     -> profile-selected landing -> proof -> workspace reconciliation
```

- **Work Item:** the canonical coordination identity: objective, owning
  boundary, risk/effect class, acceptance evidence, and delivery target.
- **Attempt:** mutable execution against a declared base or frontier until its
  material is published. Published attempt material is immutable or append-only;
  a source change creates a new content-addressed generation. Several bounded
  attempts may compete; an attempt is not an admitted change.
- **Checkpoint:** durable recovery state sufficient for another authorized
  agent to continue or retire the attempt. It binds reachable source bytes or a
  content digest plus recovery locator; narrative alone is insufficient. It is
  not delivery evidence.
- **Exact source candidate:** an immutable tree or diff plus base/frontier,
  Work Item and attempt identity, changed scope, risk/effect declaration,
  active policy/profile digest, evidence digests, dependencies, and recovery
  contract. Admission evaluates this unit.
- **Commit:** a Git snapshot and message. It may encode a private checkpoint, a
  whole candidate, or one coherent state in a candidate sequence. Its role must
  come from typed state and reachability, never message inference.
- **Pull request:** a mutable compatibility-lane coordination and admission
  envelope containing successive immutable candidate generations. It may
  contain multiple commits and is not a candidate, canonical work identity, or
  proof that its current head is the final integration snapshot.
- **Worktree:** an ephemeral checkout/index isolation mechanism. It is not an
  identity, authority, tenancy, credential, hermeticity, or security boundary.

Branch names, commit subjects, pull requests, chat sessions, and worktree paths
MUST NOT become competing work ledgers. They carry portable locators back to the
canonical Work Item and exact evidence where the active adapter requires them.

## Semantic atomicity

An admitted candidate MUST be semantically atomic:

1. It advances one objective or invariant transition that can be accepted or
   rejected as a unit.
2. It includes the code, tests, schemas, migrations, documentation, generated
   artifacts, and compatibility work required to keep every landed state valid.
3. It excludes unrelated objectives, opportunistic cleanup, and unattributed
   state.
4. Its base/frontier, dependencies, evidence, risk/effects, and recovery path
   are explicit.
5. It can be reverted safely or has a typed forward-recovery contract for
   irreversible or externally observed effects.

Atomic does **not** mean one file, one commit, one pull request, a fixed line
count, independent deployability, or an all-at-once cross-repository
transaction. A large generated migration may be one semantic transition; a
three-line diff mixing two objectives is not atomic.

Dependent candidates form an explicit acyclic stack. Each landed prefix MUST be
valid and verified. Land in topological order and re-identify/re-prove any
candidate whose base, tree, generated output, or dependency digest changes.
Cross-repository changes use expand-contract and individually valid repository
candidates; they never simulate a distributed Git transaction.

## Checkpoints and commit shape

Optimize for **continuous durable recoverability and semantically atomic
admitted candidates**, not continuous atomic commits.

Create a **local recovery point** during one live workspace when useful; it may
be a private local commit or patch and is not sessionless handoff. Create a
**durable checkpoint** when a coherent slice becomes recoverable, before a
risky rewrite, at handoff or likely context loss, and before a claim or
workspace lease can expire. It may use a pushed attempt ref or content-addressed
patch/artifact plus a Work Ledger event according to repository policy. It MUST
bind reachable source bytes (or content digest and durable recovery locator), the
base, owned scope, validation state, remaining work, and next safe action.

Private checkpoint commits MAY be imperfect, fail incomplete tests, or be
reorganized while they remain explicitly fenced from nomination and external
effects. Before candidate nomination, normalize the exact source state:

- Under direct-trunk selection, land one coherent commit or preserve a sequence
  in which every commit is coherent and valid. Landing is non-force
  fast-forward/compare-and-swap; a rebase or moved frontier creates a new
  candidate requiring affected reproof.
- Under a compatibility lane, each published pull-request head identifies one
  immutable candidate generation for feedback. If a merge queue synthesizes a
  base+head or merge-group snapshot, that exact snapshot—not the mutable PR—is
  the admission candidate and must run the required proof. Multiple commits are
  allowed. If the merge strategy preserves commits, each preserved state must
  be coherent; otherwise squash at admission. Bind the admitted head/tree or
  merge-group tree to the landed artifact when the forge rewrites the SHA.

Commit subjects state the durable result in imperative or outcome form. Add a
body only for non-obvious rationale, invariant, compatibility, risk, or recovery.
Do not encode live status, chat history, secrets, personal data, model identity,
or speculative claims. Add trailers only when an active machine policy consumes
them. Doctrine does not mandate Conventional Commits, a fixed subject length,
an agent signature trailer, or a commit-count target fleet-wide.

## Workspace admission and collision safety

Before mutation, establish an **admissible workspace**:

- repository, base/frontier, active delivery lane, Work Item, attempt, owning
  boundary, and Definition of Done are resolved;
- every existing change and untracked artifact is attributed;
- the attempt has exclusive mutable ownership of its declared files/semantic
  boundary, and active claims/candidates do not collide;
- shared refs, caches, generated outputs, credentials, services, databases,
  ports, deploy targets, and other effects have compatible ownership or fences.

A dirty workspace is not automatically unsafe. Continue in place when all state
is attributed to the same goal and exclusive ownership remains true. Use a new
worktree or clone when unknown/unrelated state, parallel mutation, base
incompatibility, or recovery risk makes separation the smallest safe action.
Never automatically stash, reset, clean, overwrite, relocate, or delete unknown
work to manufacture a clean status.

One exclusive mutable worktree SHOULD serve one active attempt/candidate stream.
Read-only reviewers may inspect it. A worktree does not isolate refs, objects,
repository configuration, caches, credentials, processes, ports, databases, or
external effects; coordinate those collision domains explicitly. Do not assume
that a new worktree makes untrusted code safe to execute.

## Reconciliation and retirement

Retire a workspace only after it is **reconciled**:

1. no unique tracked, untracked, ignored, or generated evidence will be lost;
2. needed commits are reachable from a durable named or pushed ref, or an
   equivalent content-addressed snapshot;
3. the Work Item records the selected candidate or durable checkpoint,
   validation state, delivery state, owner, and next safe action;
4. leases, claims, previews, services, ports, credentials, caches, and other
   effects are released, transferred, expired, or explicitly retained;
5. ordinary non-force removal succeeds, followed by administrative pruning if
   necessary.

Force-removing unknown or unique state is forbidden. A retained worktree MUST
have an owner, reason, expiry, and recovery locator; locking is a retention aid,
not proof of ownership. A failed or abandoned attempt is complete only when its
recoverable evidence is selected, handed off, or deliberately retired under an
authorized retention policy.

## Use-case contract

| Use case | Required behavior |
| --- | --- |
| Ordinary reversible direct-trunk work | One exact semantically atomic candidate; narrow proof; non-force CAS/FF landing; verified-only effects. |
| Fenced ADR, policy, security, migration, credential, public-contract, or irreversible work | Compatibility-lane PR/admission envelope; exact-head checks; configured serialization and review. |
| Parallel agents in one repository | Separate claimed scopes and attempts; worktrees when mutable collision domains overlap; deterministic candidate selection. |
| Dirty checkout with unknown work | Preserve it untouched; use a known-base workspace; record the ownership gap instead of auto-cleaning. |
| Dependent stack | Explicit DAG, valid green prefixes, topological landing, descendant reproof after identity change. |
| Long experiment | Bounded attempt, periodic durable checkpoints, no nomination until coherent; explicit expiry and retention. |
| Generated migration or bulk refactor | Treat generated outputs and generator version as candidate evidence; split only on semantic boundaries, not line count. |
| CI burst or backpressure | Coalesce superseded attempt feedback; never coalesce away exact selected-candidate, global, release, or effect proof. |
| Failed or interrupted task | Durable checkpoint or intentional retirement; release claims/effects; never call an unlanded checkpoint delivered. |
| Cross-repository change | Expand-contract candidates per owning repo with explicit dependency digests and independently valid landing order. |
| Emergency fix beside unrelated work | Preserve the existing workspace and create an isolated attempt; urgency changes priority, not attribution, proof, or effect fences. |

## Evidence and metrics

For each nominated candidate, record Work Item/attempt identity, base/frontier,
tree or diff digest, active policy/profile digest, changed boundary, dependency
digests, risk/effect class, validation/proof bindings, landing result, and recovery contract. Report local,
candidate, admitted, landed, released/deployed, and live states separately.

The active adapter MUST serialize this evidence in a machine-readable candidate
record rather than prose alone. Roleless delivery uses the immutable
attempt/candidate artifacts owned by the roleless speculative standard;
compatibility delivery uses the admission manifest plus exact PR-head and, when
present, merge-group provenance. This standard defines their shared semantics,
not a competing universal storage schema.

Optimize and alert on candidate lead time, selected-to-landed verified rate,
proof latency, semantic risk/size distribution, CAS/rebase retries, collision
rate, stale workspace leases, orphan recovery time, rollback/forward-recovery
rate, and escaped defects. Commit count, commits per hour, line count, branch
count, pull-request count, and worktree count are observability facts only; they
MUST NOT be used as quality, productivity, or atomicity targets.

## Research basis

This contract is consistent with Git's definition of a commit as indexed
content plus a message, Git's recommendation to publish small logical changes
while allowing private history cleanup, Git worktree's documented shared-repo
model, Google's one-self-contained-change guidance without a line limit, and
DORA's small-batch/trunk outcomes. Those sources inform mechanics; Doctrine's
agent-first authority, exact-candidate evidence, and no-human effect boundaries
remain the governing requirements.

Primary references:

- [Git workflows](https://git-scm.com/docs/gitworkflows),
  [commit](https://git-scm.com/docs/git-commit),
  [worktree](https://git-scm.com/docs/git-worktree), and
  [push](https://git-scm.com/docs/git-push).
- [Google Engineering Practices: Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html)
  and [CL descriptions](https://google.github.io/eng-practices/review/developer/cl-descriptions.html).
- [DORA: Working in small batches](https://dora.dev/devops-capabilities/process/working-in-small-batches/)
  and [trunk-based development](https://dora.dev/devops-capabilities/technical/trunk-based-development/).
- [GitHub pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests),
  [merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue),
  and [Actions concurrency](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#concurrency).
- [Gerrit change model](https://gerrit-review.googlesource.com/Documentation/concept-changes.html).


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `source-autho-01` | Strongest relevant subset applied |
| `source-autho-02` | Facts in schema/test/ADR homes |
| `source-autho-03` | Proof layers separated |
| `source-autho-04` | Unknown authority fails closed |
| `source-autho-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
