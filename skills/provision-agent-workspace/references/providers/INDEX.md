# Agent workspace providers

| Provider | Isolation | Auth | Free class | Notes |
|---|---|---|---|---|
| Host agent shell | process/sandbox policy of host | host session | L0 | Fastest; already paid for by host |
| `@cloudflare/computer` | DO SQLite FS + isolate/container backends | CF account (or temp deploy of your Worker) | L3 package OSS on CF substrate | **Preview**; APIs unstable |
| Sylphx Platform Sandbox | Kata CLH VM | Platform token / SDK key | L3/L4 plan quotas | Maintained BaaS; not no-login |
| E2B / similar microVM APIs | microVM | API key | L4 (credits/paid) | Strong isolation; not $0 default |
| just-bash / WASM runtimes | in-process | none | L0/L1 | Not full Linux |

Prefer host L0 unless isolation or multi-tenant policy demands more.
