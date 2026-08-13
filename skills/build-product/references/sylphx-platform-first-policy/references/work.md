# Work

Work that outlives one request is a Platform Work Operation. Platform wakes
the `type=web` handler.

| Need | Resource |
| --- | --- |
| Time | `Schedule` |
| Bounded / fan-out | `BatchJob` |
| HTTP/event invoke | Functions pack when shipped, else web handler |
| Isolated exec | `Session` |
| Timers / compensation | `Workflow` |

Handler path is idempotent HTTP. Progress lives in Platform Data. Discover
create/watch verbs from current CLI/SDK. Preview Functions stay an honest gap.

Done: Operation reaches a typed terminal, or Session exec returns a canary.
