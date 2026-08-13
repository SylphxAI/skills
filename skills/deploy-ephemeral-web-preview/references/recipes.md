# Agent recipes — ephemeral public web

Documented as of 2026-08-08. If a CLI flag or host moved, check current official docs with host search.

## A. Cloudflare temporary Worker (default L2)

**Requires:** Wrangler **≥ 4.102.0**. Flag `--temporary` is intentional for unauthenticated agent deploys.

```bash
# 1) Minimal Worker (if no project yet)
mkdir -p /tmp/ephemeral-hello && cd /tmp/ephemeral-hello
cat > wrangler.toml <<'TOML'
name = "ephemeral-hello"
main = "src/index.ts"
compatibility_date = "2026-08-01"
TOML
mkdir -p src
cat > src/index.ts <<'TS'
export default {
  async fetch() {
    return new Response("ok-ephemeral\n", { headers: { "content-type": "text/plain" } });
  },
};
TS

# 2) Deploy without a standing Cloudflare login
npx --yes wrangler@4.120.0 deploy --temporary
```

**Capture from CLI (required):**

- `https://…workers.dev` public URL  
- **Claim URL** (`https://dash.cloudflare.com/claim-preview?claimToken=…`) — **bearer ownership**  
- **Claim within: 60 minutes** (official default window; unclaimed resources expire)  
- Account created vs reused  

**Accept ToS implicitly** by using `--temporary` (CLI states ToS/Privacy acceptance).

**If already logged in:** `--temporary` is rejected — logout / unset `CLOUDFLARE_API_TOKEN` first, or deploy on the permanent account without `--temporary`.

**Proof:**

```bash
curl -sS -D- -o /tmp/body.txt "$PUBLIC_URL" | head
# expect 200 and body contains expected marker
```

**Platform backend (optional):**  
`POST https://api.cloudflare.com/client/v4/provisioning/previews/challenge` then create preview account (PoW). Keep `account.apiToken` server-side; return only preview + claim URLs to users. Docs: [Claim deployments](https://developers.cloudflare.com/workers/platform/claim-deployments/).

## B. Static assets via temporary Worker

```bash
# wrangler.toml
# name = "ephemeral-static"
# compatibility_date = "2026-08-01"
# assets = { directory = "./dist" }
npx --yes wrangler@4.120.0 deploy --temporary
```

## C. Cloudflare Drop (static demo L2)

Use when product surface is a static zip/folder drop (human or agent UI). Same **preview → claim** lifecycle class as temporary accounts; record expiry + claim link the same way. Prefer Wrangler temporary when you already have a Worker project.

## D. Surge (L3 — account/token)

```bash
# needs prior: npm i -g surge && surge login  (or token env per current Surge docs)
surge ./dist your-name-demo.surge.sh
curl -sI "https://your-name-demo.surge.sh" | head
```

## E. Fail closed

| Symptom | Action |
|---|---|
| No claim URL printed | Do not call deploy “owned”; treat as incomplete |
| 401/403 after ~60 min | Expired temporary account — redeploy or claim earlier |
| Secrets in Worker env | Rotate; temporary deploys are public-adjacent |
