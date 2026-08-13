# PaaS deploy and preview

How to ship an app on Sylphx Platform.

## Intent in the repo

`sylphx.toml` is the customer declaration: project, services, build, health,
resource bindings, and `[database.migrations]`. Platform owns placement, image
build, rollout, and recovery.

## Operator path

```bash
sylphx doctor --json
sylphx whoami --json
sylphx link --project proj_…
sylphx deploy proj_… --env production   # or the current env flag from --help
sylphx status proj_…
sylphx logs --project proj_… --tail 100
```

Git auto-deploy is the same lifecycle: source snapshot → Build Operation →
digest Artifact → Deployment Operation → readiness → customer-visible check.
Preview environments use that lifecycle on a non-production env. Preview does
not write production deploy lights.

Discover exact flags from `sylphx deploy --help` and
`sylphx version-info --json`.

## Minutes-only public URL

A throwaway demo with no durable backend may use a temporary public host
(`deploy-ephemeral-web-preview`). A Sylphx product, dogfood app, or anything
with auth, data, or jobs uses this PaaS path.

## Custom domain

Attach domains through the public CLI/API (`sylphx domains …` when shipped).
Platform issues certificates and routes.

## Done

- Manifest matches the services you intend to run
- A Deployment Operation reached a typed terminal
- The public or preview URL serves the product route, not only `/`
- Source revision, Artifact digest, and observed deployment reconcile
