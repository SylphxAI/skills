# Delivery Standard

Delivery proves the requested outcome beyond a local diff. Keep source
integration, project correctness, and deployment as separate owning
boundaries.

## Authority

| Boundary | Authority |
| --- | --- |
| Work | the work ledger when available; otherwise the declared coordination adapter |
| Source | Git repository and its contribution rules |
| Correctness | Repository-owned tests, review, and aggregate CI verdict |
| Artifact and deployment | Platform or the declared release provider |
| Live behavior | Runtime observations at the requested terminal |

A pull request, direct-trunk push, CI check, build, deployment, and Work record
are related facts, not interchangeable authorities.

## Source integration

Follow Agent-Native Queued Trunk
([ADR-20260803](../../../history/adr/ADR-20260803-agent-native-queued-trunk.md)):

- ordinary changes use one Work → one branch → one PR → Merge Queue → main;
- do not land incomplete phases; main stays production-ready and green;
- ordinary agents do not direct-push main; break-glass only;
- never fail a valid ordinary change solely because it used PR + Merge Queue.

Platform does not select or execute a landing adapter. Merge Queue is the
ordinary forge admission mechanism for agent-native repositories, not an
optional afterthought.

## Simple auto-deploy model

Environments expose exactly:

| Mode | Behavior |
| --- | --- |
| `On Commit` | Build and deploy an admitted tracked-branch revision without waiting for external CI |
| `After Verification` | Build may start immediately; deploy only after the configured exact-SHA aggregate CI verdict succeeds |
| `Off` | No automatic deployment; use the declared manual/API/release path |

`After Verification` is the ordinary industry `Wait for CI` capability:

```text
tracked-branch revision
  ├─ Platform builds exact production artifact once
  └─ await configured CI verdict for the same SHA
       -> both success
       -> deploy exact artifact
       -> health/readiness
       -> current, or retain/restore previous current
```

Build success, artifact existence, and SHA/tree/digest binding are internal
deployment-record invariants. They are not separate project-quality green
lights. One durable CI verdict is sufficient when it represents the complete
configured verification set.

Normal transitions are event-driven. A low-frequency reconciler may recover a
missed webhook or interrupted transition, but it is not the happy-path
orchestrator. A newer revision may supersede obsolete undeployed revisions.

## Build once, deploy the artifact

The release provider is the sole production-artifact builder for a deployable
revision:

1. resolve immutable source and dependency inputs;
2. build one content-addressed production artifact;
3. run packaging/runtime smoke against that artifact;
4. promote the same digest through environments; and
5. retain the same digest for rollback and provenance.

Repository CI may compile or bundle test-profile outputs as semantic checks. It
must not create and discard a production/release artifact that Platform then
rebuilds. A release-profile or container-specific test consumes the
provider-built artifact instead of rebuilding equivalent source.

Environment-specific configuration is attached at release/run time where the
application contract permits. If public/client configuration is irreducibly
baked into frontend bytes, state the honest boundary as **build once per
declared environment profile**; do not claim one cross-environment artifact.
Prefer runtime configuration when it removes unnecessary environment-specific
rebuilds without weakening cache, security, or client behavior.

## Exact identity and rollback

- Bind every deployment to the exact source revision and immutable artifact
  digest.
- Build once and promote the same artifact across environments, or once per
  explicitly declared environment profile when bytes necessarily differ.
- Update desired/current pointers idempotently with compare-and-swap or
  generation fencing.
- Run readiness/health checks before declaring current.
- Preserve the previous successful deployment and automatically retain or
  restore it on failed rollout health.
- Do not use a mutable tag, raw branch name, or unverified manual patch as
  production identity.

These are implementation safety properties, not a customer-visible proof
bundle.

## Shippable state and terminal state

Shippable state is a property, not a universal terminal. Source is shippable
when:

- the change is coherent and semantically complete;
- required source, generated artifacts, schemas, migrations, tests, and docs
  are present;
- risk-appropriate local validation has run;
- no outcome depends on untracked author state or a hidden manual step; and
- exact source identity, known risk, and remaining delivery requirements are
  recorded.

Shippable does **not** mean shipped.

```text
workspace
  -> locally verified source
  -> exact source revision
  -> landed
  -> built/published/deployed
  -> live observed
```

A commit is a source checkpoint. A pull request is a collaboration or landing
adapter. Neither is a universal done state. The active repository delivery
declaration selects the terminal.

| Task kind | Minimum truthful done state |
| --- | --- |
| Analysis only | Durable requested artifact or self-contained answer |
| Source change | Validated exact revision landed on the default branch, unless the user explicitly requested only a branch/PR |
| Package release | Exact version/artifact published with registry/provenance readback |
| Deployable behavior | Exact artifact deployed and risk-appropriate live behavior observed |
| GitOps/infrastructure | Desired state landed, controller reconciled, live state read back |

## Worker release and event-driven re-entry

The durable Work terminal is separate from worker occupancy. When only external
CI, build, deployment, soak, or approval can advance a Work, checkpoint and use
the work ledger `work.defer` when available to register the typed wake-up, release effects
and the active claim/Run, and continue other ready work. Do not keep an agent
session alive to poll.

This rule avoids idle workers; it does not lower the declared terminal.

## Delivery procedure

1. Read the repository delivery declaration and current source state.
2. Attribute existing changes and avoid overwriting unrelated work.
3. Implement one coherent change and run risk-appropriate local checks.
4. Integrate through PR + Merge Queue (break-glass direct trunk only).
5. Read exact landed SHA; do not infer it from branch intent.
6. Let repository CI and Platform advance through events.
7. If active work remains but only an external event can advance it, defer and
   release worker capacity.
8. For a deployment-terminal task, verify exact source, digest, rollout, health,
   behavior, and rollback/recovery as applicable.
9. Report the strongest proven lifecycle state and any residual separately.

Do not force deploy, weaken checks, patch a cluster, create a second authority,
or use break-glass credentials merely to shorten a normal wait.

## Reviewability

Delivery evidence should allow another authorized agent to verify:

- exact source revision;
- repository integration event;
- aggregate CI verdict and configured check name;
- artifact digest and provenance;
- deployment record and environment;
- desired/current/previous identities;
- rollout health and user-visible behavior; and
- recovery or rollback result when exercised.

the work ledger may link these facts privately. Do not require Work ids in public commits
or PR bodies.

## Acceptance

- Product surfaces use `On Commit`, `After Verification`, and `Off`.
- Merge Queue landings feed the same exact-SHA build/deploy contract.
- Verification failure never deploys under `After Verification`.
- Build and verification can run in parallel.
- Verification success to deploy dispatch is event-driven and measured.
- The normal path creates one production artifact per source/environment
  profile and deploys that exact digest; CI does not perform a second
  disposable production build.
- Failed health retains or restores previous current.
- No ordinary path requires scoped watermarks, selected snapshots, proof
  bundles, policy epochs, or Platform-selected landing.
- A source agent can release while external delivery continues.

## Industry references

- [Render deploy modes](https://render.com/docs/deploys)
- [Railway Wait for CI](https://docs.railway.com/deployments/github-autodeploys)
- [Vercel Git deployments](https://vercel.com/docs/deployments/git)
- [Vercel deployment checks](https://vercel.com/docs/deployment-checks)
- [The Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run)
- [AWS Prescriptive Guidance: Build once, deploy many](https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/build-once-deploy-many.html)
