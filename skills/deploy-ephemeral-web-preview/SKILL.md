---
name: deploy-ephemeral-web-preview
description: "Publish a short-lived public web URL for demos or agent proof; record claim/expiry honesty."
---

# Deploy Ephemeral Web Preview

Ship a **public URL** so humans or other agents can hit a demo without SSH, Docker on their machine, or a permanent hosting account. Prefer no-login temporary platforms when the proof window is minutes to hours.

## When to use

- Prototype needs a shareable HTTP(S) surface
- Agent must prove “it loads on the public internet,” not only localhost
- Static site, Worker, or small full-stack preview with short TTL is enough

## When not to use

- Production traffic, customer data, long-lived domains, or secrets in the artifact
- Local-only visual QA → use `verify-local-web-preview` instead
- Durable multi-service backend → use `wire-managed-backend-services` or real PaaS/BaaS with account

## Method

**Open [references/recipes.md](references/recipes.md) first** — copy-paste endpoints/commands; do not web-search for these defaults.

### 1. Classify the artifact

- **Static files** (HTML/CSS/JS, zip of assets)
- **Edge Worker / single-file server**
- **App needing account-backed free tier** (Pages, Netlify, Vercel hobby)

Open [references/providers/INDEX.md](references/providers/INDEX.md) and pick the lowest-auth provider that fits.

### 2. Deploy with the lowest friction path that works

Default ladder (stop at first success):

1. **Cloudflare Temporary Account** — `npx wrangler@≥4.102 deploy --temporary` (see recipes). No permanent CF login. **Claim within 60 minutes** or resources expire.
2. **Cloudflare Drop** (or equivalent no-login static drop) when the artifact is static-only and supported by the current Drop surface.
3. **Account free static** (Surge, GitHub Pages, CF Pages free) when you already have credentials and need longer than ~1h.
4. **Hobby full-stack previews** (Vercel/Netlify free) when the app needs their build pipeline.

Record exact CLI output: public URL, claim URL (if any), expiry, and project/worker name.

### 3. Verify the live URL

- `curl -sI <url>` (or GET) from the agent host; note status and `server`/`cf-ray` headers when present.
- Prefer a real browser load when UI matters; do not claim “works” from a 200 on `/` alone if the product is a SPA that fails client-side.
- Never paste claim tokens into public chat logs if the channel is untrusted—treat claim URL as ownership bearer.

### 4. Honesty and handoff

- State **expiry** and **what happens if unclaimed**.
- Separate **preview** from **production**.
- If the human must claim ownership, give them the claim URL and steps; do not imply the temporary URL is durable.

## Done for this run

- Public URL obtained and probe recorded
- Provider + free class (L2 temporary vs L3 account free) stated
- Expiry/claim path documented or N/A
- Residuals: custom domain, secrets, durable data, auth

## Progressive disclosure

- [references/recipes.md](references/recipes.md) — **open first**: copy-paste deploy recipes
- [references/providers/INDEX.md](references/providers/INDEX.md) — choose provider
- [references/providers/cloudflare-temporary.md](references/providers/cloudflare-temporary.md) — CF temp Workers / Drop
- [references/providers/static-free.md](references/providers/static-free.md) — Surge / Pages / Tiiny class
- [references/acceptance.md](references/acceptance.md) — proof bar

## Boundaries

- Do not store production secrets in temporary deploys
- Temporary no-login is abuse-limited; expect rate limits and ToS enforcement
- Free tiers change; re-probe when claims matter
