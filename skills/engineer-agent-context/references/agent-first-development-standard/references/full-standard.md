# Agent-First Development Standard

## Purpose

Use this standard when autonomous agents perform most repository work. Optimize
for small batches, clear authority, high useful throughput, reliable evidence,
and low coordination cost—not imitation of a human organization.

## Authority

| Concern | Authority |
| --- | --- |
| Static method | `SylphxAI/skills` |
| Work coordination | the work ledger when available; otherwise the declared adapter |
| Source | Git repository and forge |
| CI correctness | Repository-owned checks |
| Build/deploy | Platform or declared release provider |
| Live behavior | Runtime provider observations |

A session is not a work ledger. Prompts and transcripts are disposable
execution context. Git is source truth, not Work truth. the work ledger is Work truth,
not source or deploy truth.

## Smallest complete loop

```text
signal or owner request
  -> propose/deduplicate/admit Work when coordination is required
  -> eligible agent claims one bounded outcome
  -> implement one coherent exact Git revision
  -> repository-native direct-trunk or PR integration
  -> exact-SHA CI and any risk-selected review
  -> worker release at external-only wait
  -> build/deploy/readback event completes or creates correction Work
```

Do not build a Platform Candidate/landing control plane around this loop.

## Work model

One Work Item owns one independently terminal outcome. A large programme is a
parent Work with a child outcome DAG. It is not one umbrella claim that
accumulates unrelated changes and delivery decisions.

Proposal, admission, and claim are distinct. The proposer does not implicitly
own the Work. Claims own outcomes, not files, branches, PRs, or worktrees.
Duplicate objectives are resolved in the work ledger when available; overlapping files
remain legal and are reconciled through Git.

Proposer, Executor, Reviewer, and Delivery/Re-entry are temporary perspectives
selected from a shared agent pool, not permanent roles or one-to-one pairs.

## Delegation

Semantic task type and material complexity come before role assignment. Atomic
reads, searches, commands, endpoint checks, and tightly coupled steps stay
local. A bounded child task is presumptively a leaf unless it discovers a new,
independently useful lane whose net benefit passes the same delegation test.
Do not require global tree-depth knowledge or a role-based fan-out quota.

## Source integration

Follow Agent-Native Queued Trunk
(../../../../../docs/history/adr/ADR-20260803-agent-native-queued-trunk.md)):

- one Work/outcome → one branch → one PR → Merge Queue → green main;
- draft PR immediately; arbitrary commits inside the PR; no phase-per-PR;
- ordinary agents do not direct-push main; break-glass only;
- claim/worker leases are not source admission.

CI must not reject a valid change solely because it used PR + Merge Queue.
Platform does not choose or execute the landing adapter.

Every landed change is semantically coherent: code, tests, schemas, migrations,
docs, and generated artifacts needed for one objective land together. Atomic
does not mean one file, one commit, or a fixed line count.

## Review

Review is an obligation selected from the exact revision's risk and evidence
contract, not from whether it has a PR.

- Run deterministic checks first.
- Use a separate reviewer only when independent judgment adds more value than
  its startup and coordination cost.
- The reviewer reads the Work contract, exact revision, and authorized durable
  evidence—not the Executor's private transcript.
- Publish a typed verdict, finding, attestation, or correction Work.
- A negative verdict identifies the failed contract and evidence; any eligible
  Executor may claim repair.
- Reviewer and Executor release after their active action. They do not wait on
  each other in private sessions.

Public PR review remains valid for external/community collaboration, but it is
not Work authority and does not require private Work ids.
PR titles, bodies, comments, labels, and trailers are collaboration surfaces,
not typed admission facts. Do not parse custom prose tokens from them to decide
risk, work ownership, reviewer independence, completion, or required controls.
An audience-safe projection may summarize an authoritative record, but it
cannot create or waive that record.

## CI

Repository CI owns what “pass” means. Use:

- one exact-SHA aggregate verdict;
- fast deterministic checks and sound affected tests;
- parallel jobs and fail-fast fan-in;
- periodic full runs to audit selector misses;
- cancellation of safely superseded default-branch runs;
- bounded flake quarantine with owner and expiry; and
- least-privilege, untrusted-input-safe workflows.

Do not add CI to prove work lineage, reject the ordinary PR+queue path, or recreate
Platform deployment state. Do not run the same heavy evidence twice without a
specific integration failure it prevents.

CI may compile test-profile code as a correctness oracle. Platform owns the
single production artifact build. Agents do not wait for a disposable CI
release build followed by a second Platform build.

## Delivery

Platform exposes:

```text
On Commit | After Verification | Off
```

`After Verification` waits for the repository's aggregate CI verdict for the
same source SHA as the built artifact. Build and CI may run in parallel. Exact
SHA/digest identity, health, rollback, idempotency, and event recovery remain
binding; selected snapshots, cumulative watermarks, and proof-bundle product
semantics do not.

Build once and deploy the same immutable artifact across environments. When
frontend bytes necessarily contain environment-specific public configuration,
declare and measure the narrower build-once-per-environment-profile contract
instead of hiding rebuilds.

Source landing releases the producer when only external CI, build, deploy,
soak, or approval can advance the Work. Use the work ledger `work.defer` when available
to checkpoint, subscribe, release effects/claim/Run, and re-enter on the next
provider event. Waiting is not active execution.

## Parallel coordination

Before parallel mutation, identify:

- objective/semantic overlap;
- working-tree and generated-output ownership;
- shared Git refs;
- caches, ports, services, databases, and fixtures;
- credentials and rate-limited provider effects; and
- migrations or deployment targets.

Use worktrees only for mutable checkout isolation. They are not locks or
external-effect fences. Preserve unknown work; never stash, reset, clean, or
overwrite it to manufacture a clean state.

Use Git's native non-fast-forward/conflict behavior:

1. refresh trunk;
2. make a coherent revision;
3. run affected validation;
4. push without force or update the PR;
5. on conflict/rejection, reconcile and re-prove.

File locking is not an integration strategy. Effect leases are reserved for
scarce external mutations, not source files.

## Dependent and cross-repository changes

Use expand-contract and valid ordered revisions. Each landed prefix remains
valid. Cross-repository work has one Work graph but each repository has its own
source truth and independently valid landing. Do not simulate a distributed Git
transaction or hold one large mutable branch until every consumer is ready.

## Generated source and automation

Generators, dependency updaters, release tools, and policy sync follow the
repository's ordinary PR + Merge Queue policy. Use a dedicated
least-privilege App/bot where provider automation needs an identity. The bot is
not a reviewer and does not create a second source workflow.

Generated files are outputs, not coordination surfaces. Edit their source,
regenerate, and verify freshness.

## Security and effects

Use types, schemas, compiler/module boundaries, executable contracts, migration
replay, supply-chain provenance, least privilege, and risk-matched security
tests. Do not confuse maximum gate count with safety.

Credentials, destructive operations, public contracts, migrations, and
irreversible provider effects require explicit authority and appropriate
fencing. Source integration alone never authorizes an external effect.

## Completion and recovery

Report lifecycle states separately:

```text
workspace -> locally verified -> exact revision -> landed
          -> built/released/deployed -> live observed
```

A diff, commit, open PR, partial green set, or deployment without readback is a
checkpoint unless it satisfies the declared terminal. External-only waits use
durable defer/re-entry rather than an occupied agent.

A failure creates correction Work or re-entry from durable evidence. It does
not require the original author session to remain alive.

## Metrics

Measure:

- ready-to-claim and active-action ratios;
- source-to-trunk latency;
- PR age and merge-queue wait where applicable;
- conflict/retry rate;
- CI pickup, execution, cache, fan-in, cancellation, and flake rate;
- verification-success-to-deploy latency;
- escaped defects and rollback/forward-fix rate; and
- worker time spent waiting on external state.

Commit count is a diagnostic, not a quality metric. The optimization target is
verified outcome throughput and low recovery cost.

## Minimum adoption

An agent-first repository declares:

1. canonical source repository/default branch;
2. internal contribution preference and external PR path;
3. whether PRs are required;
4. whether merge queue is enabled and the evidence justifying it;
5. local validation commands and aggregate CI verdict;
6. auto-deploy mode and tracked branch;
7. package/deploy terminal where applicable; and
8. coordination adapter when the work ledger is unavailable.

No product-repo workflow may require Work ids or choose PR versus direct
trunk as a correctness gate.

## Acceptance

- Multiple agents claim Work from a shared pool rather than permanent pairs.
- Internal DT and external PR both work without ingress-only CI rejection.
- External contributors need no internal Work access.
- Merge Queue is the ordinary agent-native admission path.
- Source, CI, deployment, and Work authorities remain separate.
- Waiting agents release capacity and provider events cause re-entry.
- CI/deploy use exact SHA and artifact identity without Candidate/watermark
  services.

## Primary references

- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [DORA: Working in small batches](https://dora.dev/capabilities/working-in-small-batches/)
- [Git workflows](https://git-scm.com/docs/gitworkflows)
- [GitHub pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitHub merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
