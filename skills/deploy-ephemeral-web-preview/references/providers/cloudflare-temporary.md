# Cloudflare Temporary Accounts / Drop

## Auth model

- **Temporary Account**: deploy without a standing Cloudflare dashboard login; complete ToS/PoW as prompted by current Wrangler.
- **Claim URL**: bearer of ownership. Claiming converts the temporary deployment into a normal account-owned resource.
- Not “forever free hosting without an account.”

## Free boundary (verify live; numbers drift)

- Typical public Workers temporary deploy lifetime on the order of **60 minutes** if unclaimed.
- Rate limits and abuse controls apply.
- Container/heavy plans are separate from temporary Workers demos.

## Install / surface

```bash
# Edge Worker from a project with wrangler config
npx wrangler@latest deploy --temporary
# Capture: workers.dev URL + claim URL from CLI output
```

Static Drop (when product surface is available): upload zip/folder per current Drop docs; record expiry and claim path the same way.

## Acceptance proof

1. CLI prints a public `*.workers.dev` (or Drop) URL.
2. Agent `curl -sI` (or browser) against that URL succeeds for the intended path.
3. Handoff includes **expiry** and **claim URL** (or explicit “no claim needed”).

## Prefer / avoid

- **Prefer** for agent demos, interview-style previews, temporary webhooks pointing at throwaway code.
- **Avoid** for customer PII, long soak, production DNS, or anything that must survive past the TTL without claim.
