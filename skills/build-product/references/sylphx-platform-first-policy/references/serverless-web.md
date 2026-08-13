# Serverless web compute

Customer compute is a request-wake **web service**. Platform starts it for
HTTP, a Schedule fire, or a queue callback, and may stop it when idle.

```toml
[[services]]
name = "api"
type = "web"
port = 8080
path_prefixes = ["/healthz", "/readyz", "/api"]
[services.health]
mode = "http"
path = "/readyz"
liveness_path = "/healthz"
```

Each request reads Platform Auth and Data, returns, and leaves no required
state in process memory. Schema apply is a `[database.migrations]` Job
([data.md](data.md)). Work after the response is Platform Work
([work.md](work.md)).

Platform control-plane always-on web is not the customer template.

Prove: a product route succeeds, including after a cold start.
