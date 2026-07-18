# delivery-standard (canonical body)

**Authority:** binding Standard Skill package `delivery-standard` in `SylphxAI/skills` (`skills/delivery-standard/`).

**Cutover:** migrated from Doctrine `standards/delivery-standard.md` at digest `sha256:934c57e18a193516be2fdd321826ac9a45491232b89cf76e370a0ba0bf21d8e1` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Delivery Standard

This standard owns delivery outcomes and proof. The active delivery profile
owns the selected forge, transport, and release adapters; references to GitHub
below are the current profile's binding implementation, not a timeless
requirement of delivery itself.

[`source-authoring-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/source-authoring-standard/references/full-standard.md) owns the exact
source candidate, semantic atomicity, checkpoint, commit/worktree projection,
and workspace-reconciliation contract consumed by every delivery profile.

The roleless speculative path separates landing from promotion: a raw
default-branch commit is not deployable evidence. Release and deployment consume
only immutable snapshots covered by the relevant scoped green watermark and
complete proof bundle.

**Lane-aware delivery:** When live fleet policy selects
roleless direct-trunk for a repository class, ordinary reversible work lands by
ordinary fast-forward under integrity fences (deletion + non-fast-forward),
with local/narrowest verification and verified-only promotion for effects. PRs
and merge queues remain the **compatibility adapter for fenced classes**
(ADR authoring, Doctrine/policy authority, credentials, security, migrations,
public contracts, irreversible effects) until a successor PR-less ADR locator
authority is admitted with evidence. Conversely, do not project direct-trunk as
active where the resolved profile still selects compatibility admission.

## Ownership

Do not treat research, a workspace artifact, a local diff, a commit, or an opened
PR as done when the user's goal implies changed software, changed doctrine, or
shipped behavior. Own the path to the repository's durable delivery boundary and,
when applicable, to production verification.

### Definition of done ladder

Use the strongest done state that matches the task **and active delivery lane**:

| Task kind | Minimum truthful done state | Not done yet |
| --- | --- | --- |
| Research / analysis only | Durable artifact, issue, ADR draft, or explicit summary committed or otherwise stored in the agreed SSOT | Private notes, chat-only summary, uncommitted files |
| Ordinary reversible repo change (direct-trunk active) | Ordinary fast-forward to the default branch with local/narrowest validation evidence | Local diff, unpushed commit, or PR-only when FF is the live path |
| Ordinary reversible repo change (compatibility lane) | Branch pushed and PR opened/updated with validation evidence | Local diff, unpushed commit, workspace artifact |
| Integrated repo change (compatibility / fenced class) | PR merged through branch protection, required checks, policy gates, and merge queue where required | PR open, queued, or failing checks |
| Integrated repo change (direct-trunk ordinary) | Ordinary FF landed on default branch; deploy/release only via verified promotion | FF without required local proof, or treating raw push as deploy authority |
| Versioned package release | Release intent landed through the active lane, package published by the repository workflow, and registry/provenance readback recorded | Manual publish, human-owned version bump, or publish proof based only on workflow exit code |
| Deployable behavior change | Landed change promoted through the documented release path and verified by smoke checks, health checks, logs, metrics, or user-visible acceptance criteria | Landed but undeployed, deployed without proof, or proof based only on exit codes |
| GitOps / infrastructure change | Desired state committed, reconciled by the controller, and live state observed to match | Manual cluster mutation, unreconciled manifest, or unverified rollout |

If the user asks for implementation, the default answer is not "done" until the
change is committed, landed through the **active lane**, and advanced to the
strongest reachable done state. If policy, permissions, failed checks,
environment gates, or explicit user direction stop the path early, report the
exact blocker and next action instead of calling the work complete.

Default delivery path (resolve lane first):

- Implement the change.
- Run risk-appropriate validation.
- Nominate an exact semantically atomic source candidate; serialize it into
  commits and required trailers according to the active adapter.
- **Direct-trunk ordinary:** `git pull --rebase` then ordinary `git push`
  `HEAD:main` (never force); rebase and re-evaluate on stale tip.
- **Compatibility / fenced:** push a branch, open or update the PR, monitor CI,
  address actionable failures, and merge when branch protection, required checks,
  policy gates, and merge queue allow it.
- Follow the documented release/deploy path; under direct-trunk, promote only
  immutable verified snapshots (raw push is not deploy authority when freeze is
  active — re-query live mode/generation/denyingScope).
- Verify deployment with smoke checks, health checks, logs, metrics, or
  user-visible acceptance criteria.
- Record durable release notes, changelog entries, ADRs, or memory when the
  change affects future work.
- Reconcile the workspace without deleting unique or unattributed state.

A PR is an intermediate artifact on the compatibility lane, not the finish line
for every task, and not the ordinary path when direct-trunk is selected. Stop
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
The normal path is release intent in source control, a generated version PR owned
by a GitHub App or bot, release preflight and supply-chain gates, merge through
branch protection, workflow-owned publication, then registry readback.

Use a dedicated release GitHub App/bot token for generated version PRs. Do not
use the repository `GITHUB_TOKEN` as the normal release PR author: GitHub
suppresses many workflow-triggered events from `GITHUB_TOKEN`, and automation PR
workflows may require human approval before running. A GitHub App installation
token keeps the no-human path intact while preserving least privilege and audit
identity. Each org designates one release App/bot identity in org-level
configuration; certify and reuse it instead of creating duplicate bot
identities.

JavaScript and TypeScript packages published to npm should use Changesets for
release intent, versioning, and changelog generation. Other ecosystems may use
native equivalents only when they preserve the same invariants: machine-readable
intent, bot-owned version PR, generated release notes, least-privilege publish
identity, provenance or attestation where applicable, and package-registry proof.

For npm publication, prefer trusted publishing through GitHub Actions OIDC over
long-lived npm tokens. The GitHub App/bot identity owns generated version PRs
and release statuses; the protected publish workflow owns registry
authentication and should use OIDC/provenance when the registry and package
scope support it. A long-lived registry token is a bounded fallback only: it
needs least privilege, owner, reason, expiry, rotation path, and readback proof.

Use `scripts/package-release-conformance-audit.py` to find package producers,
manifest gaps, unsafe version-PR identity, missing release/provenance gates,
token-only npm publishing, and missing registry readback before claiming a
package-release repository is adopted.

Do not publish packages manually from a workstation or from a human-owned token
as the standard path. After an immutable package version is published, recovery
is normally forward-fix, deprecate, or staged-channel halt; source revert alone
does not undo external consumption.

## Release Notes

Update changelog, release notes, ADRs, or memory when the change affects future development, operators, migration behavior, API contracts, user-facing workflows, or production support.

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

If production verification is blocked, state the blocker, current deployment state, and exact next action.

For canary or progressive rollout, a green rollout object is not enough by
itself. Promotion should be backed by a machine-readable analysis verdict that
compares baseline and candidate cohorts against declared metrics, SLOs,
thresholds, analysis windows, and automatic rollback or pause policy.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `delivery-sta-01` | Strongest relevant subset applied |
| `delivery-sta-02` | Facts in schema/test/ADR homes |
| `delivery-sta-03` | Proof layers separated |
| `delivery-sta-04` | Unknown authority fails closed |
| `delivery-sta-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
