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

### Canonical deploy model (ADR-0022)

**Auto-deploy on verified selected snapshot** — not tip auto-deploy, not “PR
check green equals production.”

| Control | Default product contract |
| --- | --- |
| Environment `auto_deploy` | true → env may receive automated pointer updates |
| `promotion_mode` | `auto_when_green` |
| Production / pinned enforce | `require_green_watermark` + exact artifact digest match |
| Verification under load | selected-snapshot coalesce (running + latest eligible pending) |
| Rollback target | previous green-watermarked digest |

Agents do not babysit deploy. After Candidate accept/land, checkpoint and
`work.defer` when only external promote/soak can advance Work. Progressive
canary analysis (when configured) is machine-verdict auto promote/rollback —
not a human-in-the-loop gate.

## Unified Candidate delivery

The agent-facing delivery contract has one operation: publish one exact,
immutable, semantically atomic Candidate bound to its Enact Work/Attempt and
local evidence. The producer does **not** choose pull request versus direct
trunk, does not self-select review strength, and does not wait on a provider
merge envelope.

Platform is the delivery authority and performs one central admission:

1. **Classify the candidate paths.**
   - **Fenced / compatibility:** Skills/instruction/policy authority, credentials,
     security, database migrations, public/persistent contracts, irreversible
     external effects, or a repository that still requires PR/merge-queue admission.
   - **Ordinary reversible:** docs/evidence-only, tests-only, narrow reversible code
     that does not touch the fenced classes above, under integrity fences that
     already forbid delete + non-fast-forward.
2. **Read live admission signals.** Prefer direct-trunk for **internal ordinary**
   when **all** of these hold (guidance — not a CI reject of PRs):
   - org/repo rulesets do **not** require a PR for the default branch (only
     integrity fences: no delete / no non-fast-forward is the expected baseline);
   - private coordination / claim lineage is available where policy requires it;
   - the path set is ordinary reversible.
3. **Select the producer path (path-neutral admission).**
   - **Both PR and direct-trunk are valid** for ordinary reversible work
     (ADR-01KYM9PATHN3VTRXADM1SS1001). CI must not fail solely because ordinary
     work arrived as a PR.
   - **Prefer** FF/CAS direct-trunk for internal ordinary when rulesets allow
     (lower latency, less forge ceremony). Opening a PR for ordinary internal
     work is not a correctness defect; it is a latency/cost choice.
   - **External contributors always use PRs** — first-class Candidate import.
   - Any fenced class, missing delivery profile, or unresolved classification that
     could be fenced → stronger obligations (often compatibility envelope /
     merge-queue) until classification is clear. Platform selects the adapter.
4. **Bind Work first** for multi-agent / long-running objectives. Direct-trunk and
   PR lands both use private Candidate lineage where required — not public
   `Work: wi_…` trailers. Claims own work, not files.

The normal internal adapter is direct CAS landing to the default branch under
integrity fences. A provider pull request or merge queue is allowed only as:

### Ordinary vs fenced classification (not a PR ban)

Unknown, conflicting, or unclassified paths default to **stronger obligations**
(compatibility / review), not “ban PR”.

Positive ordinary classes (docs/evidence, tests-only, and similar low-risk
path classes Platform classifies as ordinary) may use DT CAS when Platform
selects it. Hard-fenced classes (workflows, ADR, migrations, credentials/security,
public contracts, instruction authority) never become ordinary via a path list alone.

Do **not** implement CI fail-closed “ordinary PR → must use DT”. That gate was
retired as a throughput and external-contributor defect.


## Ownership

Do not treat research, a workspace artifact, a local diff, a commit, or an opened
PR as done when the user's goal implies changed software, changed instructions, or
shipped behavior. Own the path to the repository's durable delivery boundary and,
when applicable, to production verification.

### Shippable state is a property, not a universal terminal

An exact Candidate is **shippable** when the requested change is coherent and
complete at its source boundary, carries risk-appropriate validation and
delivery metadata, and can advance through the repository's normal delivery
system without reconstructing hidden author state. In particular:

- every required source, generated artifact, schema, migration, test, and
  operator or user document is present in the immutable Candidate;
- no required behavior depends on an untracked file, private workspace state,
  temporary patch, disabled gate, undeclared manual implementation step, or
  workaround presented as the final design;
- known residuals, approvals, compatibility bounds, rollback needs, and
  downstream dependencies are explicit and do not contradict the declared
  terminal; and
- the Candidate has one exact identity and enough evidence for the active
  delivery authority to admit, land, release, deploy, reject, or request
  correction without interpreting a private session.

Shippable does **not** mean shipped. The active repository delivery declaration
selects the terminal and its evidence:

`workspace → locally verified source → immutable Candidate → admitted/landed → released or deployed → live-observed`

A task may legitimately end at an earlier state only when that state is the
declared terminal. A commit is a source checkpoint. A pull request is a
collaboration or landing adapter. Neither is a universal completion state.
Likewise, do not force a deployment for a source-only terminal, and do not stop
at landed source when the requested outcome is a published package,
production-visible behavior, reconciled infrastructure, or verified recovery.

### Definition of done ladder

Use the strongest done state that matches the task **and active delivery lane**:

| Task kind | Minimum truthful done state | Not done yet |
| --- | --- | --- |
| Research / analysis only | Durable artifact, issue, ADR draft, or explicit summary committed or otherwise stored in the agreed SSOT | Private notes, chat-only summary, uncommitted files |
| Ordinary reversible repo change | Landed Candidate on default branch via **DT CAS or merged PR** with validation evidence (path-neutral) | Local diff or unpushed commit only |
| PR preparation or submission explicitly requested (compatibility lane) | Branch pushed and PR opened/updated with validation evidence | Local diff, unpushed commit, workspace artifact |
| Integrated repo change (compatibility / fenced class) | PR merged through branch protection, required checks, policy gates, and merge queue where required | PR open, queued, or failing checks |
| Integrated repo change (direct-trunk ordinary) | Ordinary FF landed on default branch; deploy/release only via verified promotion | FF without required local proof, or treating raw push as deploy authority |
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

A PR is a valid Candidate ingress (always for external; optional for internal)
and a finish line only when it merges with required checks. Prefer DT for
internal ordinary latency; never treat “opened a PR for ordinary work” as
admission failure. Stop early only when blocked by a missing required status or
policy decision, failed checks outside the task scope, protected-environment
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
| `delivery-sta-05` | Shippable source is distinguished from the declared delivery terminal |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.

## Path-neutral central admission

Platform is the delivery authority and performs one central admission over one
immutable Candidate. An external pull request is an external-contributor collaboration projection into that same Candidate contract. Semantically equivalent internal and external inputs must receive the same obligations and landing rules; only the ingress adapter differs.
