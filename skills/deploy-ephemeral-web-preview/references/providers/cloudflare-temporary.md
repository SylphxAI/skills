# Cloudflare Temporary Accounts / Drop

**Docs (authoritative):** https://developers.cloudflare.com/workers/platform/claim-deployments/  
**Design context:** Temporary Cloudflare Accounts for AI agents (Cloudflare blog/docs linked from claim page).

## Auth model

| Mode | Auth |
|---|---|
| Temporary preview | No permanent dashboard login; Wrangler solves PoW + prints claim URL |
| After claim | Normal Cloudflare account owns resources |
| Permanent CI/CD | `wrangler login` or API token — **not** `--temporary` |

## Free / lifetime boundary

- **Claim within ~60 minutes** (CLI: `Claim within: 60 minutes`).
- Unclaimed temporary account and its deployments expire.
- Cached credentials live in the OS user Wrangler config dir — **do not share that dir across multi-tenant platform users**.
- Rate limits / compliance regions may refuse temporary accounts.
- Abuse and ToS enforcement apply.

## Agent CLI surface

```bash
npx wrangler@≥4.102 deploy --temporary
```

Unauthenticated deploy without the flag prints guidance to **rerun with `--temporary`**.

### Expected success fields

```
Temporary account ready:
Account: <name> (created|reused)
Claim within: 60 minutes
Claim URL: https://dash.cloudflare.com/claim-preview?claimToken=<TOKEN>
…
https://<worker>.<account>.workers.dev
```

### Gotchas

- Already authenticated → remove `--temporary` or log out.
- Claim URL is a **bearer** — only show intended user; never log to public channels if avoidable.
- `wrangler login` / `logout` clears temporary cache.

## REST provisioning (platforms)

1. `POST /client/v4/provisioning/previews/challenge`  
2. Solve PoW (`k`,`g`, SHA-256 checkpoint chain; reject if `k*g > 64_000_000`)  
3. Create temporary account with solution  
4. Deploy with returned token  
5. Return **preview URL + claim URL only** to UI  

## Acceptance proof

1. Public `workers.dev` (or Drop) URL.  
2. Agent HTTP probe success for intended path.  
3. Claim window + claim URL recorded (or explicit permanent-account path).  

## Prefer / avoid

- **Prefer:** agent demos, interview previews, throwaway webhooks.  
- **Avoid:** customer PII, multi-day soak without claim, production DNS.
