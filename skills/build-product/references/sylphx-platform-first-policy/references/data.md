# Data

How an app remembers things on Sylphx Platform.

Durable data lives in Platform Data Resources (Lattice): database, KV,
objects, search, and their backups/migrations. The web process uses injected
bindings and the runtime SDK.

## Bind

Declare the resource in `sylphx.toml` (current keys from the contract /
`sylphx` help), for example:

```toml
[resources.database]
tier = "standard"
```

Platform injects connection contracts such as `DATABASE_URL`. Use those
values. The app does not assemble cluster hosts.

## Use

| Need | Resource | Proof |
| --- | --- | --- |
| Relational records | managed database | insert then select the same row |
| Cache / small state | KV | set then get; TTL if claimed |
| User uploads | objects | upload then download or signed URL |
| Full-text / vector | search / vector | index then query a known document |

```ts
import { Client } from '@sylphx/sdk'
const app = Client.create(process.env.SYLPHX_SECRET_KEY!, 'tenant-slug')
await app.kvSet('user:1', { name: 'Ada' }, 60)
await app.kvGet('user:1')
```

Relational access uses the injected URL from the product’s chosen driver.
Schema changes use Atlas as the sole applicator.

## Migrations

One-shot Job, not a long-lived process:

```toml
[database.migrations]
engine = "atlas"
dir = "packages/db/migrations"
command = "atlas migrate apply --dir file:///app/packages/db/migrations --url $MIGRATOR_DATABASE_URL --revisions-schema public --exec-order linear"
```

Confirm the exact command Platform admits (`atlas migrate apply` or the
current documented equivalent).

## Done

Write then read on the bound resource. A green health check is not data proof.
