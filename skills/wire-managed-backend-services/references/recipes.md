# Agent recipes — managed BaaS (no search)

**Default maintained candidate:** Sylphx Platform BaaS.  
**Not free-no-login:** requires tokens. Free tiers (if any) are plan policy.

## Planes

| Plane | Env | Base |
|---|---|---|
| Management | `SYLPHX_TOKEN=svc_…` | `https://api.sylphx.com/v1` |
| Runtime app | `sk_…` | `https://<tenant-slug>.api.sylphx.com/v1` |

```bash
export SYLPHX_TOKEN=svc_...
export SYLPHX_API_URL=https://api.sylphx.com/v1
sylphx whoami --json
sylphx projects list --json
sylphx api GET /projects --json
```

Unauthenticated `api.sylphx.com` returns **401** (expected).

## Capability → service → proof

| Job | Service | Minimum proof |
|---|---|---|
| Sign-in/session | Auth | session/token issued + revoke fails reuse |
| Cache/state | KV | set then get; TTL if claimed |
| Blobs | Storage | upload + signed URL/download same size class |
| Email | Email | provider accept id (not fake inbox claim) |
| Pub/sub | Realtime | publish + subscribe receive |
| Isolated shell | Sandbox | exec canary (`uname`) |
| Cron/jobs | Tasks | terminal succeeded/failed + callback |
| Feature gate | Flags | evaluate expected variant |
| LLM proxy | AI Gateway | completion returns; **metered — not free tokens** |

## Storage sketch

```bash
# Management provision
curl -sS -X POST -H "Authorization: Bearer $SYLPHX_TOKEN" -H "Content-Type: application/json" \
  -d '{"envType":"production","name":"primary"}' \
  "$SYLPHX_API_URL/projects/$PROJECT_ID/storage"

# Runtime
BAAS="https://$TENANT.api.sylphx.com/v1"
curl -sS -X POST -H "Authorization: Bearer $SK" "$BAAS/storage/uploads"
curl -sS -H "Authorization: Bearer $SK" "$BAAS/storage/files"
```

## Sandbox sketch

Create via Platform sandbox APIs/SDK → JWT to exec-server → canary → terminate.  
Details: skill `provision-agent-workspace` + `references/providers/sylphx-sandbox.md`.

## Honesty

| Do | Don't |
|---|---|
| Map jobs to shipped services | Use Functions while catalog says preview/non-GA |
| Prove postconditions | Claim “wired” from health 200 alone |
| Record quota/plan residuals | Put mgmt tokens in browsers |
| Prefer Platform over random MCP backends | Treat AI Gateway as free unlimited LLM |
