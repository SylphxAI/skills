# sylphx-platform-first-policy

> Shared Platform how-to owned by `build-product` (not a listing). Verb
> listings open the matching recipe. See `author-skill/references/skill-grain.md`.

# Sylphx Platform customer method

How to implement deploy, auth, data, jobs, and delivery on Sylphx Platform.
Platform owns the live CLI/SDK contract — discover it at use.

## Classify, then open one recipe

| The job is… | Open |
| --- | --- |
| Deploy, preview, promote | [paas-deploy.md](references/paas-deploy.md) |
| HTTP API or web process | [serverless-web.md](references/serverless-web.md) |
| Sign-in, session, recovery | [identity.md](references/identity.md) |
| Database, KV, files, search | [data.md](references/data.md) |
| Cron, queue, job, sandbox | [work.md](references/work.md) |
| Email, webhook, realtime | [events.md](references/events.md) |
| Checkout, entitlement | [commerce.md](references/commerce.md) |
| Diagnose live harm | [observe.md](references/observe.md) |
| First CLI / token plane | [cli-and-planes.md](references/cli-and-planes.md) |
| Product rule (pricing copy, game mechanic) | stay in the product repo |

A feature often splits: session is Identity; “this plan unlocks this talent”
is product domain.

## Default customer shape

1. Declare intent in `sylphx.toml`.
2. Run compute as `type=web` with HTTP health.
3. Keep durable memory in Platform Data / Identity / Commerce. The process
   may exit.
4. Run work that outlives a request as Platform Work that HTTP-wakes web.
5. Prove with write-then-read or invoke-then-terminal on the public contract.

Open [full-standard.md](references/full-standard.md) when classifying a gap
or proving adoption.

## Composition and output

Apply as constraints on the requested artifact. See
`author-skill/references/composition-contract.md`.
