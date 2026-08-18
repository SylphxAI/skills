# Sylphx Platform Contract

Use this reference when a Sylphx product needs identity, data, asynchronous
work, message delivery, commerce, AI, or deployment. The company
[Platform standard](https://github.com/SylphxAI/owner/blob/main/standards/platform.md)
and [stack](https://github.com/SylphxAI/owner/blob/main/standards/stack.md)
remain source authority; the active product and Platform repositories own the
current API, bindings, versions, and live state.

## Route by product job

| Product job | Method owner | Terminal evidence |
| --- | --- | --- |
| Sign-in, session, recovery | `authenticate-app-users` | Real sign-in and protected-route behavior |
| Relational, KV, object, or search data | `persist-app-data` | Write then read through the injected binding |
| Schedule, batch, queue, invoke, durable workflow | `run-background-work` | Typed Work operation reaches its terminal |
| Email, webhook, realtime, push | `deliver-app-events` | Delivery operation plus receipt/readback |
| Payment, ledger, entitlement | `build-payment-readiness` | Provider event, ledger entry, and entitlement projection reconcile |
| Flags, analytics service, AI route, consent or another managed capability | `wire-managed-backend-services` | The real postcondition for the selected capability |
| Product deployment or binding declaration | Active Sylphx Platform contract and product delivery path | Exact deployed revision and owning readback when that layer is requested |

Product rules stay in the product. Platform owns resource lifecycle and
injected contracts. A health response, accepted operation, queued message, or
client callback is not the product postcondition.

## Data resources

- Declare the product data job, state class, write authority, privacy class,
  backup/restore contract, and schema owner.
- Use the injected relational, KV, object, or search binding. Do not hide
  required state in process memory.
- Apply relational schema through the declared Atlas migrations job and prove
  write then read. A second migrator or ORM push to live is not a fallback.

## Work resources

- Use `Schedule` for time, `BatchJob` for bounded or fan-out work, `Session`
  for isolated execution, and `Workflow` for timers or compensation when the
  current Platform contract exposes them.
- Keep product compute request-woken and stateless where the contract requires
  `type=web`; persist progress through owned data and make callbacks idempotent.
- Observe the typed operation terminal. Queue acceptance is only an
  intermediate state.

## Boundaries

- Customer Identity and operator IAM remain separate issuers.
- Product repositories do not own a deploy controller, runner, cluster
  database, second ledger, second model gateway, or Kubernetes writer.
- Missing Platform capability remains an exact Platform dependency. Do not
  hide it in a product-local long-running process, second service, or title
  workaround.
- Retrieve volatile schemas, provider limits, versions, endpoints, and live
  health from their current owners at execution.
