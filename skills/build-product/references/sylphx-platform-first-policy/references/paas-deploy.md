# PaaS deploy

`sylphx.toml` is customer intent. Platform owns build, rollout, and recovery.

```bash
sylphx link --project proj_…
sylphx deploy proj_… --env production
sylphx status proj_…
```

Confirm flags with `sylphx deploy --help`. Git auto-deploy is the same
lifecycle: snapshot → Build Operation → Artifact digest → Deployment →
readiness → customer route. Preview does not write production lights.

Minutes-only demos with no durable backend may use
`deploy-ephemeral-web-preview`. Product, dogfood, auth, data, or jobs use
this path.

Done: Deployment Operation terminal + product URL serves the real route.
