# Work (cron, jobs, functions, sessions)

How work that outlives one user request runs on Sylphx Platform.

Create a typed Platform Work Operation. Platform wakes the app’s `type=web`
HTTP handler (or a Functions invoke surface when that pack is shipped). The
handler does the unit of work and returns. Idle compute may scale to zero.

## Choose the Resource

| Need | Resource |
| --- | --- |
| Every night / every N minutes | `Schedule` |
| One bounded run, fan-out, or batch | `BatchJob` |
| HTTP or event invoke, scale-to-zero | Functions pack (when shipped) or the same web handler |
| Interactive isolated exec | `Session` (sandbox) |
| Timers, waits, compensation | `Workflow` |

Discover create/watch verbs from the current CLI/SDK (`sylphx` help, generated
client). Functions remain a product pack; if the current contract marks them
preview, use Schedule + web handler or record an honest gap.

## App side

1. Keep a `type=web` service with a documented callback path
   (for example `/internal/task-callback`).
2. Make that path idempotent. Retries with the same request identity do the
   work once.
3. Store progress and results in Platform Data. The process may die mid-wait.
4. Return a typed result so the Operation can reach a terminal.

Platform may own the queue consumer (stream invoker) and call the product
callback. The product service stays web.

## Sandbox / agent computer

Provision a `Session`, wait until ready, run a filesystem and exec canary, then
terminate. Quotas and TTL come from the current Session contract.

## Done

The Operation reaches a typed terminal (succeeded or failed). A schedule fire
produces a handler invocation. A Session exec returns a canary.
