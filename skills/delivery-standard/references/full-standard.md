# Delivery Standard

This standard owns delivery outcomes and proof. The active delivery profile
owns the selected forge, transport, and release adapters; references to GitHub
below are the current profile's binding implementation, not a timeless
requirement of delivery itself.

[`source-authoring-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/source-authoring-standard/references/full-standard.md) owns the exact
source candidate, semantic atomicity, checkpoint, commit/worktree projection,
and workspace-reconciliation contract consumed by every delivery profile.

The parallel-change integration path separates landing from promotion: a raw
default-branch commit is not deployable evidence. Release and deployment consume
only immutable snapshots covered by the relevant scoped green watermark and
complete proof bundle.

## Unified Candidate delivery

The agent-facing delivery contract has one operation: publish one exact,
immutable, semantically atomic Candidate bound to its Enact Work/Attempt and
local evidence. The producer does **not** choose pull request versus direct
trunk, does not self-select review strength, and does not wait on a provider
merge envelope.

Platform is the delivery authority and performs one central admission:

1. resolve the repository declaration, exact base/head/tree, Work lineage, and
   policy generation;
2. derive semantic collision scopes, risk, required deterministic proof,
   independent-review, migration, public-contract, security, and effect
   obligations;
3. reject unknown or conflicting classification without converting it into
   agent discretion;
4. select, supersede, or coalesce the Candidate;
5. execute expected-head compare-and-swap through the configured landing
   adapter; and
6. verify cumulative selected snapshots and promote exact artifacts only from a
   complete green proof bundle.

The normal internal adapter is direct CAS landing to the default branch under
integrity fences. A provider pull request or merge queue is allowed only as:

- an external-contributor collaboration projection that is ingested as the
  same Candidate; or
- a typed, bounded compatibility obligation while a predecessor serializer,
  locator allocator, public-contract approval, or irreversible-effect control
  has not yet been replaced.

The PR does not make the change safer. Safety comes from the Candidate's
obligation set, trusted independent verdicts, exact-head CAS, and verified
promotion. Semantically equivalent internal and external inputs must receive
the same obligations. The adapter may add public discussion or provider
mechanics, but it cannot weaken or strengthen policy merely because the input
arrived as a PR.

### Migration and fail-closed behavior

Repository adoption is explicit:

- **Successor live:** agents publish Candidates only; any PR projection is
  controller-owned.
- **Compatibility live:** agents follow the current profile's existing
  provider adapter while recording the missing successor as a typed adoption
  gap. This is a migration state, not permission to keep two permanent
  workflows.
- **Unknown:** central admission rejects mutation. Agents do not guess a lane,
  force-push, disable a gate, or manually deploy.

Existing ordinary-direct-trunk manifests and PR fail-closed checks remain
migration inputs. The successor central obligation engine absorbs their
positive path facts, proves equivalent or stronger behavior, then retires the
agent-facing lane selector, ordinary-PR policing, and duplicated provider
metadata together.


## Ownership

Do not treat research, a workspace artifact, a local diff, a commit, or an opened
PR as done when the user's goal implies changed software, changed instructions, or
shipped behavior. Own the path to the repository's durable delivery boundary and,
when applicable, to production verification.

### Definition of done ladder

Use the strongest done state that matches the task **and active delivery lane**:

| Task kind | Minimum truthful done state | Not done yet |
| --- | --- | --- |
| Research / analysis only | Durable artifact, issue, ADR draft, or explicit summary committed or otherwise stored in the agreed SSOT | Private notes, chat-only summary, uncommitted files |
| Source Candidate submission | Immutable Candidate published with Work/Attempt lineage, exact source/tree identity, and local proof | Local diff, unpushed commit, handwritten lane choice, or PR-only state |
| External contribution intake | Provider PR exact head/base ingested as the same Candidate contract and centrally admitted | Treating the PR, review comments, or merge button as an alternate Work/safety authority |
| Integrated repository change | Central serializer landed the selected Candidate by expected-head CAS; any provider envelope is terminal and read back | Candidate merely published, PR open/queued, or raw branch push |
| Versioned package release | Release intent landed through the active lane, package published by the repository workflow, and registry/provenance readback recorded | Manual publish, human-owned version bump, or publish proof based only on workflow exit code |
| Deployable behavior change | Landed change promoted through the documented release path and verified by smoke checks, health checks, logs, metrics, or user-visible acceptance criteria | Landed but undeployed, deployed without proof, or proof based only on exit codes |
| GitOps / infrastructure change | Desired state committed, reconciled by the controller, and live state observed to match | Manual cluster mutation, unreconciled manifest, or unverified rollout |

The table defines the durable Work's terminal evidence, not how long one agent
must occupy a worker. The source agent may release capacity after its immutable
Candidate is accepted or landed at the declared source boundary with required
local proof. If the Work also requires verified promotion or
production evidence, leave it active with a durable delivery subscription and
checkpoint; release EffectLeases, claim, and Run; and let the delivery
controller or any eligible re-entry agent finish the stronger state. Incidents
and irreversible effects retain their stronger bar, but passive external waits
still use the same event-driven handoff.

If the user asks for implementation, the default answer is not "done" until the
change is committed, landed through the **active lane**, and advanced to the
strongest reachable done state. If policy, permissions, failed checks,
environment gates, or explicit user direction stop the path early, report the
exact blocker and next action instead of calling the work complete.

Default delivery path:

- Implement the change.
- Run risk-appropriate validation.
- Publish an exact semantically atomic Candidate with Work/Attempt lineage,
  source/tree identity, declared semantic scopes, local proof, and residual
  risk. Do not choose or manually open a delivery lane.
- Platform derives obligations and selects the expected-head CAS adapter.
  Internal direct landing, generated compatibility PR, imported external PR,
  and merge-queue projection all consume the same Candidate.
- If the repository has not yet activated the successor, use the currently
  declared compatibility command only as migration behavior and record the
  adoption gap; never claim this as the target steady state.
- Start the documented release/deploy path; under direct-trunk, promote only
  immutable verified snapshots (raw push is not deploy authority when freeze is
  active — re-query live mode/generation/denyingScope). When only the external
  delivery system can advance, subscribe and release worker capacity instead
  of synchronously polling.
- Verify deployment with smoke checks, health checks, logs, metrics, or
  user-visible acceptance criteria when the current Run owns an immediately
  actionable delivery phase; otherwise bind those checks to the delivery event
  or re-entry Run.
- Record the change in a product-owned changelog, release note, or ADR, or link
  the corresponding Enact decision/evidence, when it affects future work.
  Runtime memory may cache only a pointer or working context; it is not the
  sole durable release or decision authority.
- Reconcile the workspace without deleting unique or unattributed state.

A PR is an external or compatibility projection, not the finish line, review
authority, or agent-selected safety tier. Stop
early only when the active lane is blocked by a missing required status or policy
decision, failed checks outside the task scope, protected-environment
permissions, change windows, unclear production risk, or explicit user
direction. If a regulated or external approval is required, it must appear as a
required status, signed policy artifact, or documented environment gate; a person
reading a comment is not a delivery mechanism.

Never disable integrity fences, force-push protected branches, forge or
self-attest an external approval, deploy to production without a clear documented
path, or mutate shared infrastructure outside GitOps/IaC.

## Package Publication

If a repository publishes versioned packages, publication is production delivery.
The normal path is machine-readable release intent published as the same
immutable Candidate contract, centrally derived release and supply-chain
obligations, adapter-selected CAS landing, workflow-owned publication, then
registry and provenance readback. Versioning, changelog, registry-index, policy
sync, and other generated-source updates are internal Candidates; their
generator or bot never chooses a PR lane.

If central admission selects a provider version-PR compatibility envelope, a
dedicated least-privilege GitHub App/bot owns that projection. Do not use the
repository `GITHUB_TOKEN`: GitHub suppresses many downstream events from it,
and automation PR workflows may require human approval before running. The
envelope binds the exact Candidate and remains controller-owned until readback;
it is not a second release workflow or permanent reason to retain PR-first.
Each org designates one release App/bot identity for compatibility projections
and certifies it instead of creating duplicate identities.

JavaScript and TypeScript source products published to npm should use Changesets
for release intent, versioning, and changelog generation. A generated npm/npx
adapter for a native CLI instead derives its version and artifact mapping from
the CLI release identity under `software-distribution-readiness`; it must not
create a second release authority. Other ecosystems may use native equivalents
only when they preserve the same invariants: machine-readable intent,
Candidate with an adapter-owned version projection where required, generated
release notes, least-privilege publish identity,
provenance or attestation where applicable, and package-registry proof.

For npm publication, prefer trusted publishing through GitHub Actions OIDC over
long-lived npm tokens. The GitHub App/bot identity owns any adapter-selected
version projection and release statuses; the protected publish workflow owns registry
authentication and should use OIDC/provenance when the registry and package
scope support it. A long-lived registry token is a bounded fallback only: it
needs least privilege, owner, reason, expiry, rotation path, and readback proof.

Use the current package-release conformance capability to find package
producers, manifest gaps, unbound or agent-authored version projections,
missing release/provenance gates, token-only npm publishing, and missing
registry readback before claiming a package-release repository is adopted.

Do not publish packages manually from a workstation or from a human-owned token
as the standard path. After an immutable package version is published, recovery
is normally forward-fix, deprecate, or staged-channel halt; source revert alone
does not undo external consumption.

When the published product is a command-line executable, apply
`software-distribution-readiness` for target artifacts, installers,
package-manager selection, cross-channel identity, update/uninstall behavior,
and consumer-side installation proof. This standard continues to own the
generic publication and delivered-state ladder.

## Release Notes

Update a product-owned changelog, release note, or ADR, or link the
corresponding Enact decision/evidence, when the change affects future
development, operators, migration behavior, API contracts, user-facing
workflows, or production support. Runtime memory may retain a pointer or
working context, never the sole durable fact.

## Production Verification

Use the repository's documented release/deploy path. Verify with the narrowest meaningful production signal:

- Smoke checks
- Health checks
- Logs and traces
- Metrics
- Error dashboards
- Automated canary/SLO analysis verdicts
- Synthetic checks
- User-visible acceptance criteria

Readback uses the audience intended for the claim. Operator logs, traces,
topology, migration state, control knobs, and raw diagnostics stay in protected
operator channels. Public/customer verification may use only an intentional
versioned product, status, support, incident, audit, or protocol projection with
the correct authorization scope and minimum allowlisted fields. A delivery test
must not widen a public response contract merely to make internal evidence easy
to scrape.

If production verification is blocked, state the blocker, current deployment state, and exact next action.

For canary or progressive rollout, a green rollout object is not enough by
itself. Promotion should be backed by a machine-readable analysis verdict that
compares baseline and candidate cohorts against declared metrics, SLOs,
thresholds, analysis windows, and automatic rollback or pause policy.


## Package checklist

| Rule ID | Check |
| --- | --- |
| `delivery-sta-01` | Strongest relevant subset applied |
| `delivery-sta-02` | Facts in schema/test/ADR homes |
| `delivery-sta-03` | Proof layers separated |
| `delivery-sta-04` | Unknown authority fails closed |
| `delivery-sta-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
