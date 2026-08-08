---
name: share-ephemeral-artifact
description: "Share a non-secret file or log via short-lived public URL with retention and ToS limits."
---

# Share Ephemeral Artifact

Publish a **non-secret** file, log, screenshot, or build output to a short-lived public URL for debugging or handoff.

## When to use

- Need a link for a human or another system to download a log/bundle
- Artifact is already scrubbed of secrets

## When not to use

- Tokens, private keys, customer PII, `.env`, heap dumps with secrets
- Long-term product storage → use managed object storage (`wire-managed-backend-services` / BaaS Storage)
- Source of truth for releases (use real artifact registry)

## Method

1. **Scrub**: redact secrets; prefer minimized logs.
2. **Choose host** from [references/providers/INDEX.md](references/providers/INDEX.md) (L1/L2 hobby hosts).
3. **Upload** via documented CLI/curl; capture URL + retention.
4. **Verify** GET the URL once; note Content-Type/size.
5. **Handoff** with expiry and “do not put secrets” reminder.

## Done for this run

- URL + retention/expiry
- Size and content class stated
- Explicit statement that content is non-secret
- Provider reliability residual (hobby hosts fail)

## Progressive disclosure

- [references/providers/INDEX.md](references/providers/INDEX.md)
- [references/providers/file-hosts.md](references/providers/file-hosts.md)
- [references/safety.md](references/safety.md)

## Boundaries

- Public paste/file hosts are hostile; assume crawlers
- No production custody; no compliance archive
