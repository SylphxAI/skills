# Data

Durable data lives in Platform Data Resources. The web process uses injected
bindings and the runtime SDK.

```toml
[resources.database]
tier = "standard"
```

Use `DATABASE_URL` and documented peers. The app does not assemble hosts.

| Need | Proof |
| --- | --- |
| Relational | insert then select |
| KV | set then get |
| Objects | upload then download or signed URL |
| Search | index then query |

Relational schema: Atlas via `[database.migrations]` one-shot Job.

```toml
[database.migrations]
engine = "atlas"
command = "atlas migrate apply --dir file:///app/packages/db/migrations --url $MIGRATOR_DATABASE_URL --revisions-schema public --exec-order linear"
```

Confirm the exact admitted command. Health 200 is not data proof.
