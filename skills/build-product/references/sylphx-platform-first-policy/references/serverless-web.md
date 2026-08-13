# Serverless web compute

How a customer app runs on Sylphx Platform.

Customer compute is a request-wake **web service**. Platform starts it for an
HTTP request, Schedule fire, or queue callback, and may stop it when idle.

## Declare the service

In repo-root `sylphx.toml`:

```toml
version = "1"

[project]
name = "example"

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

Add a `web` service the same way when the browser shell is a separate process.

## What “serverless” means here

- The process may exit between requests. Durable facts live in Platform
  Resources (see [data.md](data.md), [identity.md](identity.md)).
- Work that continues after the response returns is a Platform Work Operation
  that HTTP-wakes this service (see [work.md](work.md)).
- Schema apply is a one-shot `[database.migrations]` Job (see [data.md](data.md)).

Platform control-plane processes (`api`, `controller`) are always-on web HA.
That is Platform’s own shape, not the customer template.

## Handler shape

Each request:

1. reads identity from Platform Auth (or a documented public route);
2. reads and writes Platform Data / Commerce through bindings or the runtime SDK;
3. returns a typed result;
4. leaves no required state in process memory.

Health endpoints stay cheap and local so wake can succeed.

## Prove

After deploy, hit `/readyz` (or the declared path) and one product route. A
cold request succeeding is the serverless proof. Health 200 on a warm local
process is not delivery evidence.
