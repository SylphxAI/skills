# Source Authoring Standard

Agent-first source authoring for high-concurrency, sessionless development.
This standard owns the lifecycle from attributed mutable work to an immutable
source candidate and reconciled workspace. Delivery profiles own transport,
admission, landing, release, and deployment.

The source author always publishes the same Candidate contract and never
chooses PR versus direct trunk. Platform owns adapter selection.

Composes with:

- [`work-coordination-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/work-coordination-standard/references/full-standard.md) for Work Items,
  claims, checkpoints, handoff, and proof-chain identity.
- [`autonomous-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/autonomous-execution-standard/references/full-standard.md) for
  execution graphs, delegation, collision cones, and evidence reporting.
- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for parallel ownership and machine-enforced governance.
- [`parallel-change-integration-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/parallel-change-integration-standard/references/full-standard.md)
  for immutable candidate selection and compare-and-swap landing when selected.
- [`ci-admission-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-admission-standard/references/full-standard.md) for exact-candidate
  proof and scarce verification capacity.
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for central Candidate admission,
  adapter-selected landing, and terminal delivered-state proof.

## Canonical lifecycle and vocabulary

```text
work -> attempt -> checkpoint -> exact source candidate
     -> central obligation derivation -> CAS landing -> proof -> workspace reconciliation
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
- **Pull request:** a mutable provider projection for an imported external
  contribution or a typed, bounded compatibility obligation. Platform ingests
  or generates it from immutable Candidate generations. It is not a Candidate,
  canonical Work identity, review authority, safety tier, or proof that its
  current head is the final integration snapshot.
- **Worktree:** an ephemeral checkout/index isolation mechanism. It is not an
  identity, authority, tenancy, credential, hermeticity, or security boundary.

Branch names, commit subjects, pull requests, chat sessions, and worktree paths
MUST NOT become competing work ledgers. They carry portable locators back to the
canonical Work Item and exact evidence where the active adapter requires them.

Source-control and forge surfaces may be public. Candidate, checkpoint, review,
and evidence records therefore carry only the minimum metadata needed for
coordination and verification. Raw internal logs/traces, private topology,
environment-specific runtime configuration, observed internal migration state,
control knobs, customer data, secrets, and unrestricted diagnostic attachments
remain in an authorized evidence store; commits, PRs, issues, and public
artifacts link to a redacted or opaque evidence identity. Public OSS
configuration and migration definitions/guides remain legitimate source when
they are intentional contracts rather than observed private runtime state.
Evidence durability never authorizes disclosure.

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
effects. Before Candidate nomination, normalize one coherent commit or a
sequence in which every preserved commit is coherent and valid. Platform
selects the landing adapter and applies non-force expected-head CAS. A rebase or
moved frontier creates a new Candidate identity requiring affected reproof. If
a compatibility merge queue synthesizes base+head or a merge-group snapshot,
that exact snapshot—not the mutable PR—is the admitted Candidate. Bind any
forge-rewritten landed SHA back to the admitted tree.

Commit subjects state the durable result in imperative or outcome form. Add a
body only for non-obvious rationale, invariant, compatibility, risk, or recovery.
Do not encode live status, chat history, secrets, personal data, model identity,
or speculative claims. Add trailers only when an active machine policy consumes
them. This standard does not mandate Conventional Commits, a fixed subject length,
an agent signature trailer, or a commit-count target organization-wide.

## Workspace admission and collision safety

Before mutation, establish an **admissible workspace**:

- repository, base/frontier, Candidate publication contract, Work Item, attempt, owning
  boundary, and Definition of Done are resolved;
- every existing change and untracked artifact is attributed;
- claims own Work rather than files; the attempt declares its semantic write
  and collision scopes, and overlapping Candidates remain legal for central
  selection/CAS;
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
| Internal repository work | Publish one exact semantically atomic Candidate; central obligations; non-force CAS landing; verified-only effects. |
| External contributor PR | Ingest exact base/head as the same Candidate; derive the same obligations; retain PR only as the public collaboration projection. |
| Fenced ADR, policy, security, migration, credential, public-contract, or irreversible work | Central admission derives stronger review/effect obligations; a temporary compatibility PR is adapter-owned until its successor is proven. |
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

Platform MUST serialize this evidence in one machine-readable Candidate record
rather than prose alone. An imported external PR adds exact head/base and, when
present, merge-group provenance to the same record. A generated compatibility
PR projects that record; it does not create a second schema. This standard
defines authoring semantics, not a competing Platform storage authority.

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
DORA's small-batch/trunk outcomes. Those sources inform mechanics; the binding
Skills standards, exact-candidate evidence, and no-human effect boundaries
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


## Package checklist

| Rule ID | Check |
| --- | --- |
| `source-autho-01` | Strongest relevant subset applied |
| `source-autho-02` | Facts in schema/test/ADR homes |
| `source-autho-03` | Proof layers separated |
| `source-autho-04` | Unknown authority fails closed |
| `source-autho-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
