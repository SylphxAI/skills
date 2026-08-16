# Delivery Standard

Delivery proves the requested outcome beyond a local diff. Keep source
integration, project correctness, artifact/deployment, and live behavior as
separate owning boundaries.

## Authority

| Boundary | Authority |
| --- | --- |
| Work and objective | The declared work or coordination adapter, when available |
| Source | The Git repository and its contribution rules |
| Correctness | Repository-owned checks, review, and the configured aggregate CI verdict |
| Artifact and deployment | The declared release or platform provider |
| Live behavior | Runtime observations at the requested terminal |

A workspace, commit, pull request, CI check, build, deployment, and work record
are related observations, not interchangeable authorities.

## Truthful state ladder

Use the strongest state actually observed for the requested terminal:

```text
workspace
  -> locally verified source
  -> exact source revision
  -> landed
  -> released / published
  -> deployed
  -> live observed
```

| State | Required observation | Does not prove |
| --- | --- | --- |
| Local | Changed path is correct and its risk-appropriate check passes | Landing, release, deploy, or live behavior |
| Candidate | Exact revision is identified and the intended integration path is named | Landed source or a green provider run |
| Landed | Forge readback shows the exact revision on the repository's admitted branch | Release, deployment, or runtime behavior |
| Released | Provider readback shows the exact immutable artifact/version | Deployment or live behavior |
| Deployed | The declared runtime reports the exact artifact/revision as current | User-visible correctness without a behavior check |
| Live | Runtime or user-visible acceptance evidence is observed for the target | A different revision, environment, or time window |

Never upgrade one row into another from intent, a queued job, a branch name,
an upload response, or an exit code alone.

## Source integration

1. Read the product repository's contribution and delivery declaration.
2. Attribute existing changes and preserve unrelated user or agent custody.
3. Produce one coherent, semantically complete source candidate.
4. Use the repository's native landing path (for example, its protected PR
   and merge-queue path or an explicitly authorized direct-trunk path).
5. Read back the exact landed revision; do not infer it from branch intent.

Repository CI is a correctness signal for the exact Git revision. This Skills
repository uses the owned `sylphx-linux-standard` runner profile; a hosted
runner label is not a fallback. A runner label alone is still not a CI result.

## Artifact and deployment

The declared release provider is the sole production-artifact builder for a
deployable revision:

1. Resolve immutable source and dependency inputs.
2. Build one content-addressed production artifact.
3. Run packaging or runtime smoke against that artifact.
4. Promote the same digest through the declared environments.
5. Retain the digest and previous successful identity for rollback and
   provenance.

Bind every deployment to the exact source revision and immutable artifact
digest. Update desired/current pointers with compare-and-swap or generation
fencing, run readiness checks before declaring current, and retain or restore
the previous successful deployment after failed rollout health.

Do not use a mutable tag, raw branch name, unverified manual patch, or a
disposable CI production build as production identity. Repository CI may run a
test-profile compiler or bundle check; it must not create a second release
artifact that the provider will rebuild.

## Production and live verification

Use the repository's documented release and deployment path. Verify the
narrowest meaningful signal for the requested terminal, such as a smoke check,
health/readiness result, logs or traces, metrics, a canary verdict, or explicit
user-visible acceptance. A green rollout object or HTTP response by itself is
not proof of the requested behavior.

If production verification is blocked, report the current source, release,
deployment, and live states separately, name the owning provider, and give the
exact next action. Do not patch a cluster, weaken a check, or create a second
control plane to manufacture proof.

## External waits and reviewability

When only external CI, release, deployment, soak, approval, or live readback
can advance the requested terminal, checkpoint the exact revision and release
the worker/claim when the active work system supports that operation. Do not
keep a session alive to poll, and do not lower the terminal to a local
checkpoint.

Delivery evidence should let another authorized operator verify:

- exact source revision and integration event;
- configured aggregate CI verdict and its checks;
- immutable artifact digest and provenance;
- deployment record and environment;
- desired/current/previous identities;
- runtime health and user-visible behavior; and
- recovery or rollback result when exercised.

## Acceptance

- Source, CI, release, deployment, and live states remain distinct.
- One material invariant has one owning proof path.
- A failed correctness or health check cannot be relabeled as success.
- The normal deploy path builds once and promotes the exact artifact.
- The prior successful deployment remains recoverable after failed health.
- No ordinary path requires a workaround, compatibility shim, second writer,
  fake success, or hidden manual step.
- A source agent can checkpoint and release while an external delivery event
  continues.
