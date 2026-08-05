# Development flow simplification audit — 2026-07-30

> **Current-reading note (2026-08-05):** the Enact-specific coordination
> conclusion in the original audit is retired. Read
> [ADR-20260805](adr/ADR-20260805-retire-enact-from-active-instructions.md)
> for the active boundary; the source/deployment simplification findings below
> otherwise remain useful historical analysis.

## Verdict

The previous Platform Candidate / selected-snapshot / green-watermark design was
over-engineered for the customer capability it delivered. It moved repository
integration and CI orchestration into Platform without creating a stronger
project-correctness signal. The additional authorities and states increased
latency, recovery surface, and agent confusion.

The replacement is repository-native trunk integration plus the industry
standard `On Commit / After Verification / Off` deployment model defined by
[ADR-0027](adr/ADR-0027-repository-native-trunk-and-simple-auto-deploy.md).

## Differential audit

| Concern | Previous design | Evidence-based target | Disposition |
| --- | --- | --- | --- |
| Work coordination | Legacy external Work plus Platform Candidate lineage | Product-selected/native coordination with no source-admission dependency | Retire legacy integration; remove source-admission dependency |
| Source authority | Git plus Platform Candidate/landing controller | Git repository/forge only | Retire Platform source authority |
| Internal integration | Platform selects direct trunk or PR adapter | Repository policy; internal DT preferred where allowed | Remove central selection |
| External contribution | PR imported into private Candidate contract | Ordinary PR; no external coordination account/work ID | Simplify |
| PR safety | Treated as a policy lane | Collaboration/pre-merge feedback envelope | Do not overclaim |
| Merge queue | Compatibility serializer / broad default | Opt-in for measured contention on PR-required branches | Default off |
| CI | Candidate admission plus cumulative watermarks | Exact-SHA jobs plus one aggregate verdict | Simplify |
| Production build | Release build in CI plus Platform rebuild | Platform builds production artifact once; CI uses test-profile compilation | Delete duplicate build |
| Build/artifact/SHA | Presented as multiple proofs | Internal deployment-record invariants | Demote from product proof |
| Deploy | Selected verified snapshot | On Commit / After Verification / Off | Replace |
| Supersede | Selected-snapshot coalescing | Cancel obsolete CI/deploy work where safe | Use provider concurrency |
| Recovery | Several reconcilers in happy path | Event-driven path plus bounded missed-event recovery | Delete ordinary polling |
| Review | Candidate-selected central obligation | Exact-revision risk-matched review; PR optional | Decouple |

## PR decision

Pull requests remain supported.

- Internal Sylphx agents prefer direct trunk when they have write authority and
  the repository allows it.
- External contributors use pull requests.
- A repository may require pull requests for every writer.
- CI must not reject a valid change solely because it arrived by PR or direct
  trunk.

The policy is repository-level and static enough for agents to follow. It is
not a per-change Platform classification problem.

## Merge Queue decision

Merge Queue is not a company-wide workflow.

Enable it only for a repository that:

1. requires PRs;
2. has multiple ready PRs contending for the same branch;
3. suffers material stale-base or pairwise integration failures; and
4. measures a net benefit after merge-group CI cost and queue latency.

Direct-trunk and low-contention repositories keep it off.

## CI/CD decision

```text
exact tracked-branch SHA
  ├─ repository aggregate CI verdict
  └─ exact artifact build
       -> both success under After Verification
       -> deploy
       -> health/readiness
       -> current or rollback
```

- Start build and CI concurrently.
- Platform builds the production artifact once. CI may compile test-profile
  outputs but must not build and discard the same release/container artifact.
- Fail fast inside a run.
- Cancel safely superseded runs with provider-native PR/ref concurrency; a
  unique-SHA group does not cancel previous revisions.
- Use sound affected-test selection plus periodic full audits.
- Store one exact-SHA verification observation for audit/replay.
- Do not create a second cumulative watermark authority.

For PR-required or external contributions, presubmit protects collaboration and
the exact landed SHA remains deployment authority. Reuse a provider-native
exact landing observation when the forge supplies one. Otherwise keep the
external path affected, cached, and economical; do not create a custom
tree-equivalence or evidence-transfer control plane just to remove one rerun.

## Safety retained

- non-force Git integration;
- exact source revision and immutable artifact digest;
- build once and deploy the same immutable artifact, or once per explicitly
  declared environment profile where bytes necessarily differ;
- one sound aggregate CI verdict;
- least-privilege CI and untrusted-contribution isolation;
- idempotent/generation-fenced deployment pointer updates;
- readiness/health checks;
- previous-good rollback; and
- event deduplication and bounded missed-event recovery.

## Complexity explicitly rejected

- CI that blocks PR merely because direct trunk was preferred;
- Platform-selected landing adapters;
- private Candidate API as a source requirement;
- scoped green watermarks;
- selected-snapshot product/control-plane semantics;
- proof bundles that relabel build/artifact/SHA integrity as project quality;
- automatic merge queue without measured contention;
- public external-work IDs or legacy coordination-lineage checks in product repositories; and
- session polling while external delivery advances.

## Industry basis

- DORA: trunk-based development means small, frequent integration; it does not
  prescribe direct push versus PR.
- GitHub: merge queue validates queued PRs against the latest target and other
  queued changes; it is a high-velocity protected-branch tool, not a universal
  requirement.
- Render: `On Commit`, `After CI Checks Pass`, `Off`.
- Railway: auto-deploy with optional `Wait for CI`.
- Vercel: immutable deployments plus deployment checks before production
  assignment.

Primary links are recorded in ADR-0027.

## Implementation boundary

This Skills change corrects authoritative instructions and conformance tests.
Platform runtime cleanup remains owned by the Platform repository. Runtime
acceptance requires:

1. three public auto-deploy modes;
2. removal of Candidate/watermark/selected-snapshot happy-path write
   authorities;
3. no PR-vs-DT ingress rejection;
4. exact-SHA positive and negative deploy tests;
5. event-driven deploy dispatch with recovery-only reconciliation;
6. one production build per source/environment profile, with the same digest
   used for artifact smoke, deployment, promotion, and rollback;
7. provider-native supersede/cancellation and measured CI/build amplification;
8. live latency and rollback evidence; and
9. predecessor retirement, not aliases that keep two authorities.
