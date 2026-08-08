# Sylphx Platform BaaS (maintained)

## Agent quickstart

1. Obtain `SYLPHX_TOKEN` (management) and/or runtime `sk_…`.
2. `export SYLPHX_API_URL=https://api.sylphx.com/v1` and `sylphx whoami --json`.
3. Open [../recipes.md](../recipes.md) for capability → curl/CLI proofs.
4. Prefer **shipped** services; treat Functions commercial path as non-default until GA.
5. Account-backed infrastructure — **not** no-login free internet.

## Positioning

PaaS + BaaS on Sylphx Platform. Customer apps get managed services behind management API + runtime API. Catalog SSOT in Platform repo: `docs/catalog/baas/*`.

## Planes

| Plane | Purpose | Auth | Base URL |
|---|---|---|---|
| Management | orgs, projects, envs, provision | `Authorization: Bearer svc_…` / `SYLPHX_TOKEN` | `https://api.sylphx.com/v1` |
| Runtime BaaS | app-side auth/kv/storage/… | SDK `sk_…` | `https://<tenant-slug>.api.sylphx.com/v1` |

CLI: `sylphx` from Platform `rust-sdk` (management dogfood). Example:

```bash
export SYLPHX_TOKEN=svc_...
export SYLPHX_API_URL=https://api.sylphx.com/v1   # optional
sylphx whoami --json
sylphx projects list --json
sylphx api GET /projects --json
```

## Service matrix (honesty)

Status flips; always re-check catalog pages before launch claims.

| Service | Typical jobs | Catalog note class |
|---|---|---|
| Auth | sign-up/in, session, OAuth, 2FA, WebAuthn | shipped |
| Billing | plans, checkout, metering | shipped (gaps possible) |
| Storage | upload, signed URL, quotas | S3-backed; multi-backend gaps possible |
| Email | send / templated | shipped |
| Realtime | channels, WS/SSE | shipped |
| AI Gateway | chat/embed via platform | shipped; **not free inference** |
| Webhooks | signed delivery | shipped |
| Consent/Privacy | GDPR export/delete | shipped |
| Monitoring / Error tracking | exceptions | shipped |
| Notifications | push/in-app | partial gaps possible |
| Flags | checkFlag / variants | shipped |
| Session Replay | recorder | verify PII posture |
| Referrals | codes | shipped |
| Search | Typesense-backed | shipped |
| KV | Valkey structures + TTL | shipped |
| Functions | isolate/OCI paths | **preview / commercial path gates** — not default |
| Tasks / Cron | jobs, schedules, callbacks | shipped |
| Sandbox | Kata VM exec | shipped; quotas/reap |
| Analytics | track/page/identify | shipped |
| Quotas / Rate limit | enforcement | shipped |

## Example runtime shapes (illustrative)

Storage (runtime):

```bash
BAAS="https://<tenant-slug>.api.sylphx.com/v1"
SK="Authorization: Bearer sk_..."
curl -X POST -H "$SK" "$BAAS/storage/uploads"
curl -H "$SK" "$BAAS/storage/files"
```

Management storage provision:

```bash
curl -X POST -H "Authorization: Bearer $SYLPHX_TOKEN" -H "Content-Type: application/json" \
  -d '{"envType":"production","name":"primary"}' \
  "$SYLPHX_API_URL/projects/{PROJECT_ID}/storage"
```

Sandbox: create via Platform SDK/API, then JWT to exec-server; prove with shell canary. See `provision-agent-workspace` for isolation job detail.

## Prefer / avoid

- **Prefer** as the maintained company backend for products on Sylphx.
- **Avoid** claiming no-login free BaaS; avoid using Functions while catalog says non-GA; avoid AI Gateway as “free tokens.”