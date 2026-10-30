# Architecture conventions

Trigger: placing a new capability, module, boundary, or integration.

Goal: one change is understood in one focused read, and a mistake stops at its
boundary. The shape is feature-first vertical slices, a functional core inside
a slice that has invariants, ports only at external edges, and one deployable
per product until a named need. These answer different questions (grouping,
side effects, edges, deployment), so they combine. Agents copy what they find,
so fix recurring degraded patterns at their source and add a proportionate
regression check when it distinguishes the failure from valid designs.

Design fault isolation so a bad input, unpriced SKU or dead connection affects
its request or tenant while unrelated work can continue
([durable ownership](#durable-ownership-of-an-accepted-request)).

## Hard lines

For operational recovery and execution authorization, use [deliver-and-verify](../../deliver-and-verify/SKILL.md). The design defaults below apply within the workspace's current authority and hard lines.

Products trust each other no more than a stranger, so one product's compromise
or private shortcut never becomes another's breach.

Shared infrastructure provides neutral capabilities. Products consume its
published contracts using ordinary tenant permissions; the workspace records
which platform and delivery template it has adopted.

- Reach another product through its published API or events under the caller's
  scoped identity. Network location grants no authority; a private address does
  not replace authentication. Keep direct cross-product database access out of
  the integration.
- Keep credentials under their owning service's scoped secret management
  ([security.md](../../deliver-and-verify/references/security.md#practices)).
- Keep product-specific policy and privileged special cases out of shared
  mechanisms. Express tenant choices through the public configuration contract;
  keep a workspace's actual routing, ranking weights and service catalogue in
  their owning repositories.
- Platform-managed business state follows its public contract and supported
  recovery procedure. An outage does not create a parallel entitlement
  authority. Use already-granted supported controls for operational recovery;
  a missing product capability is repaired upstream rather than bypassed.

## Slices, core, and shell

- Group code by business capability. One slice holds ingress parsing, the
  decision, and transactional persistence. Keep coupling between slices minimal;
  inside a slice it is fine.
- A plain read or write is a transaction script; a slice with invariants gets a
  pure core.
- The core has no I/O, network, database, clock, or environment; time,
  configuration, and dependencies arrive as values, so core tests run in
  milliseconds.
- The shell authenticates, loads state, calls the core, commits atomically, and
  publishes an outbox record when a fact leaves the boundary. The chain from
  ingress to commit reads in one pass.

```text
feature/
  types.rs   # typed commands, events, errors, inputs
  core.rs    # decide(state, command) -> Result<events, DomainError>; evolve(state, event) -> state
  shell.rs   # authenticate -> load -> decide -> commit atomically with an outbox record
  tests.rs   # values into the core, plus the shell contract
```

## Dependencies and modules

- Dependencies point one way: adapters and delivery depend on the shell, the
  shell on the core. The core imports no framework.
- A port belongs at a true external edge (database, provider, queue, clock).
  Internal code calls internal code directly; pass-through use cases, mappers,
  and an interface per class add reading cost and no safety.
- A module is deep: a small public surface over substantial behavior, one entry
  point (`lib.rs`, `index.ts`, `pub(crate)`), everything else private, no
  cycles.
- Split by capability; merge pieces that change together. Keep I/O outside the
  functional core and use pure traits when they clarify the domain.
- For required multi-host execution, put narrow semantic ports at the host
  boundary and test every supported adapter against the same contract. A
  single-host service can keep persistence direct in its imperative shell.
- Define durable identity and tenancy before storing live state. Give
  tenant-owned records an organization scope; choose a stable ID scheme such as
  UUIDv7 where time ordering helps. Enforce required uniqueness and ordering at
  the authority rather than assuming the identifier alone supplies them.
- Where history must survive, commit the fact and authoritative current state in
  one transaction. Use constraints and conditional sequence checks for the
  actual invariants; use `SKIP LOCKED` for queue claims whose contract permits
  skipped locked rows, not for a general consistent view. Elsewhere,
  transactional current state and an outbox may be sufficient.
- Keep secondary search, analytics and UI views disposable where their replay
  value pays for the log. Account for event evolution, privacy deletion, replay
  and cutover costs.
- Keep capability cells independently understandable. Remove superseded code
  after owned callers move; retire old tables only after preserving authoritative
  live data and required history. Follow the declared compatibility rollout for
  published consumers that cannot move atomically.
- **Keep feature authoring simple.** Default to safe owned values and explicit
  domain transitions. Place low-level memory, synchronization and performance
  machinery behind safe shared interfaces when that improves clarity. Use
  borrowing, interior mutability or specialization where the domain or measured
  workload requires it; judge correctness, compile success and performance.
- **Use value transitions deliberately.** Explicit inputs and controlled effects
  make a core deterministic. Choose in-place updates, cloning or structurally
  shared persistent data from aliasing, snapshots and measured performance;
  owned values are the reference default rather than a ban on other structures.
- **Separate independently changing concerns.** Distinguish capability grants,
  execution state, relationships and outer scheduling. Test that an optional
  scheduler or relationship feature can be removed without disabling core
  execution where that independence is intended.
- **Reuse one execution primitive where invariants match.** Relationships and
  lifecycle state need not become separate agent subclasses. A different concept
  with different invariants can have a different type. Relationships express
  awareness and routing; any intended permission effect is explicit in the
  authorization contract and checked on the operation. Preserve history under
  the applicable retention and erasure rules.
- Start as a modular monolith with one composition root. Extract a service for
  a named need: scale, failure isolation, trust, data authority, release
  cadence, or placement.

## One source of truth

Every value (settings, prices, limits, weights, model ids, hostnames, feature
lists, secrets, docs, status words) has one place where it is set; every other
place reads or derives it. Two copies drift, and then nobody knows which is
live, what to test, or what to delete.

- Name the owner of each value: a manifest field, one database row, one
  registry file, or one contract. Code defaults, env rows, docs, and UI text
  read from it or are generated from it.
- Two competing authorities for the same setting (for example, an environment
  override silently shadowing a live database setting or manifest contract) is
  a defect: keep one authoritative source per setting. A single authority may
  provide a documented built-in default so a new workspace works out of the box
  with zero manual configuration; only required secrets or security guards fail
  closed when absent.
- Apply an input, acknowledge an intentional no-op, or reject it with a clear
  error. Idempotent replay can be a successful no-op.
- Documentation names and links the authority; generate displayed values where
  they must track it. Check generated or intentional replicas against that
  source.
- Converge competing authorities in the owning change, migrating their callers
  before deleting the superseded source.

## Scale

Challenge a persistent design at 10x and 100x the relevant users, data and
request rate, naming the first limit and the migration path. Jeff Dean's
[WSDM 2009 keynote](https://static.googleusercontent.com/media/research.google.com/en//people/jeff/WSDM09-keynote.pdf)
uses 10x design and pre-100x rewrite as a growth heuristic. Choose a scalable
partition and ownership model where the workload needs one; it does not make
every limit horizontal. Size physical capacity from measured use, demand, SLOs
and acquisition lead time. When initial costs are comparable, prefer the proven
target design before live state makes migration expensive.

- **On-demand is the default.** Start eligible services, workers and jobs when
  demand arrives and scale idle compute down. Account for retained storage,
  control planes and shared hardware when comparing total cost. Knative can
  scale serving replicas to zero; job admission through Kueue works with the
  cluster's separate node autoscaler. Record an always-on choice when measured
  latency, durability or operating cost justifies it.
- **Measure cold starts.** Measure image transfer, process start and readiness
  separately, and improve the span that consumes the service's latency target.
  Compare startup improvements and retained capacity by total cost. Keep active
  sessions running through supported drain and disruption handling.

## Real time: events first, resync as the safety net

Use events as the primary path for change propagation. For desired-state
control, an event triggers idempotent level-based reconciliation: read current
desired and observed state, coalesce wake-ups, and retain a slower resync for
missed events and reconnects
([Kubernetes controllers](https://kubectl.sigs.k8s.io/guides/introduction/resources_controllers)).
Durable business events still follow their own transition and ordering contract.

Use schedules for genuinely time-based work such as expiry, backoff and daily
reports. Where an external provider offers only polling, use its supported
bounded interface and measure freshness; a gap in an owned engine is fixed
upstream rather than hidden by a downstream poller.

Set latency and freshness targets at the user surface. Measure critical-path
spans and remove avoidable overhead when the benefit justifies total cost.
Retain capacity while demand is active; use the recorded exception process for
idle retained capacity. Subscribe clients where immediate changes matter, and
choose simpler refresh behavior when that meets the product's actual target.

## Durable ownership of an accepted request

Trigger: a path accepts a message, job, login or write from a person or another
service.

For asynchronous work or an accepted effect not complete at acknowledgment,
the system owns recovery to a visible terminal outcome. Record enough durable
state to resume after a crash or restart instead of requiring the person to
resubmit a recoverable internal failure
([Temporal](https://docs.temporal.io/evaluate/understanding-temporal),
[AWS retry guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html)).
A completed synchronous read or write needs no separate workflow record.

- **Stable identity for each effect.** Preserve the request identity across
  retries and derive distinct effect identities from the request and operation.
  Replaying the same effect returns its outcome; separate intended effects are
  not collapsed by a shared request key.
- **Recorded recovery state.** Keep completion state, the next action, due time
  and attempt count where the operation requires resumption. Replace dead
  connections and release unusable locks rather than waiting indefinitely.
- **At-least-once delivery with idempotent handlers.** The transport may deliver
  twice; the handler makes the second delivery a no-op (dedupe on the request
  id, a unique constraint at the authority, or a compare-and-set). A fact that
  leaves the boundary rides a transactional outbox ([code.md: transactions and
  idempotency](../../deliver-and-verify/references/code.md#transactions-and-idempotency)).
- **System-side retry with backoff and a visible end state.** Retries run by the
  system on a bounded, jittered, exponential backoff against the same
  dependency, and every request has an end state a person can see: running,
  waiting on a dependency with when it will next try, done with the result, or
  failed with the plain reason and what we are doing about it. Progress is
  visible where the person already is (in place, never a refresh).
- **Dead-letter with an owner.** After the retry budget, retain enough scoped
  recovery data to diagnose and resume, with appropriate retention and secret
  handling. Notify the owner with the request identity and reason. Repair and
  redrive it, or record the terminal failure and useful next step.
- **Ask for the action only the person can supply.** Retry recoverable internal
  faults automatically. Request new user authorization or corrected input when
  that is what the operation needs, explaining the specific step.
- **Test fault isolation.** Exercise invalid configuration, malformed input,
  expired credentials and held connections. Bound their effect to the relevant
  request or tenant, verify unrelated work continues, and make readiness reflect
  the capability actually affected.

The failure classes behind this method are repeated internal retries that
required a person to resubmit, invalid configuration that stopped unrelated
requests, and dead connections or held locks that disabled shared capacity.
Keep recovery durable and isolate each fault to the work it affects.

Compare a transactional request table and dispatcher with a durable execution
engine against the workload's dispatch latency, throughput, timer volume,
recovery and operating-cost targets. A request-table implementation can handle
work spanning many transactions; long duration alone does not decide the engine.
Use the simpler existing store when it meets the contract at lower lifecycle
cost, and choose a dedicated engine when measured requirements justify it
([Restate durable execution](https://docs.restate.dev/concepts/durable_execution)).
Keep the actual benchmark, selected engine and rollout state with the owning
system, and revisit when its workload or costs change.

## Between products: practices

- An app reaches the shared platform through its published SDK or API under
  the caller's scoped identity. A missing generic capability belongs with its
  upstream owner.
- Use the shared platform for the capabilities it has published. Build generic
  gaps upstream and consume the result; record the actual platform coverage and
  permitted external integrations in the workspace's platform map.
- Evaluate a tenant request against the public offer: the tenant can configure
  it, a generic defect needs repair, or a new capability needs its own product
  case. Protect affected consumers without expanding one tenant's incident into
  an unrelated platform rollout.
- Check published contracts against their supported compatibility promise.
  Migrate owned callers atomically where practical; otherwise declare a supported
  consumer floor, upgrade consumers and retire the old version when the floor
  is met. Use controlled version-pin updates and relevant validation.


### Injection defence is architectural, not a prompt rule

Treat an authenticated requester's instructions according to their grant.
Retrieved, quoted or attached content is data: it cannot expand that grant or
change system policy. Preserve its provenance across copies and summaries
([OWASP LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)).

- Give the agent the authority its outcome requires and enforce it on every
  operation ([security.md](../../deliver-and-verify/references/security.md)).
- Validate content-derived tool arguments against the operation's permissions
  and declared data-flow controls. [CaMeL](https://arxiv.org/abs/2503.18813)
  is one reference for separating untrusted data from privileged control flow.
- Meta's [Agents Rule of Two](https://ai.meta.com/blog/practical-ai-agent-security/)
  recommends at most two of these properties in a session: untrusted input,
  sensitive data or systems, and external communication or state changes. When
  all three are needed, its recommendation calls for supervision or another
  reliable validation mechanism. That reference design is separate from the
  requester's authorization: use privilege separation and runtime validation,
  and ask for additional authority only when the existing grant is insufficient.


## How it is judged

Prefer language and module boundaries plus targeted regression checks for
witnessed architectural failures. Keep the actual installed validators, covered
stacks, existing-violation baselines and rollout population in the owning
repository. A check reports the boundary it actually verifies. Judge a slice by
how easily a reader can understand one change and verify its invariants, using
measured test feedback rather than a universal millisecond deadline.

## Agent-first APIs and operations

Design APIs for agent callers and for people operating through agents. The
reference default is one authoritative Protobuf contract with Connect and
resource-oriented design informed by Google's API Improvement Proposals
([Google API design](https://cloud.google.com/apis/design)). Generate the
appropriate routes, server bindings, SDKs, CLI and tool declarations from that
contract, and verify that generated projections remain current.

Keep one coherent API design. A separate GraphQL surface is outside the default;
consider it when a measured client query need or binding contract justifies its
authorization, execution and maintenance cost. Record that decision with the
owning API. Vendor systems are references for specific capabilities, not proof
that every console action or generated projection follows this entire method.
- **The OpenAPI document is public**, served without a key, as Stripe and
  GitHub publish theirs.
- **Offer typed API access in code mode.** A remote MCP server can expose
  discovery over the generated SDK and sandboxed code execution under the
  caller's scope, with per-method tools for clients that need them. Keep both
  modes on one catalogue and measure their value on actual tasks
  ([Cloudflare code mode](https://blog.cloudflare.com/code-mode/)). Tool
  availability does not prescribe which valid path a model must take.
- **MCP writes follow the current grant.** Reuse sufficient authorization within
  its scope and lifetime ([experience.md](experience.md)). Follow the protocol's
  consent and step-up flow when authority is missing or expired. Declare tool
  annotations accurately; they are advisory metadata. Offer `validate_only`
  where a preview helps the caller assess the intended effect.
- **Support ad-hoc reads when needed.** For demonstrated reporting needs, a
  governed read-only query surface can expose authorized views under the same
  visibility rules as the API. Choose query/resource limits and storage placement
  from the workload. AWS Config advanced queries and Cloud Asset Inventory are
  examples of SQL-like query capabilities with their own scopes and constraints.
- **Keep operations in the API.** Permissioned, audited methods serve both agents
  and any needed human interface. Add a generated report or view when the
  product needs it rather than requiring a fixed back-office site. Follow the
  supported recovery path when a normal operation is blocked; a missing owned
  platform capability is repaired upstream instead of creating a parallel path.
- **Every method names its permission; roles grant permissions.** Validate
  permission declarations as part of contract generation. A role is a named bundle of
  permissions bound to a principal on an organization, project or resource, as
  in Google Cloud IAM and Kubernetes RBAC. There is no operator API, operator
  identity or operator key: the platform's own staff act through roles on the
  platform's organization, as any customer acts on its own, and a cross-tenant
  action is a permission granted on that scope. A size or limit a customer may not choose is bounded by its
  plan or quota grant, not by a privileged role. Docs, SDK and CLI are
  generated from the one contract. Check projection freshness and route coverage
  in the owning repository, and document what the installed checks verify.
- **Authorize every call.** Discovery helps a caller find a method; it does
  not grant permission. Filter discovery and existence responses where the
  metadata itself is sensitive, using the underlying visibility policy
  ([RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.4)).
- **Use a scoped identity.** Prefer delegated credentials for people and agents
  ([auth.md](../../deliver-and-verify/references/auth.md#agents-clis-and-mcp-clients))
  and workload identities for services. Where static API keys are supported,
  bind each to a scoped principal and a managed lifecycle.
- **Audit who acted for whom.** Record the acting principal and client, tenant,
  scope, operation and result. Include the delegated person when delegation
  exists; a workload call names its workload identity.

## Steering agents by environment

Steering means giving a model useful tools, clear architecture and documentation,
and feedback from the real result. Compare flexible agent loops and explicit
workflows on the actual task. Encode a required order when the contract,
authorization boundary or a witnessed failure makes that order necessary.
Anthropic's [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
describes both workflows and open-ended agents; Sutton's [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)
motivates comparison with general methods rather than proving that every
workflow is inferior.

Use names, descriptions, schemas and errors that make tools easy to use
([Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)).
Judge task success from the outcome in the environment. Use traces and tool-call
data to diagnose failures, and assert a specific path only where it is part of
the real contract or authority boundary. Measure latency and resource budgets
when they are acceptance requirements
([Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)).
- **Safety invariants** check that unauthorized effects never occur and
  protected data never appears in output. A refusal check is useful when it
  verifies that boundary.
- **Consistency** needs repeated trials. Per-trial pass rate reports individual
  success; `pass^k` estimates the probability that all `k` attempts succeed for
  a task. Choose `k` from the failure tolerance and evaluation cost, state the
  estimate's uncertainty, and compare models when portability or a model change
  is in scope.

### Separation of Concerns Between Model and Runtime

Within authorized tools and resource budgets, the model chooses its reasoning
and tool path. The runtime supplies the environment, enforces grants and honors
user cancellation. Reuse runtime mechanics where useful while keeping each agent
instance's identity, session, memory and grants scoped to that instance. Preserve
progress when work is interrupted.

When a turn feels slow, measure model generation, tool execution, transport,
startup and progress I/O before attributing the cause. Improve the measured
bottleneck and verify the result at the user's surface. A running stream is a
liveness signal; judge progress and completion from the task's actual outcome.

## Shared capacity pool

Compute nodes form one shared pool rather than idle per-team silos; importance
is expressed by workload priority and enforced resource envelopes (as in
Google's Borg). Latency-sensitive production services run with guaranteed
resource envelopes, while batch, build, and CI workloads share burst capacity
and yield first when protected demand rises. Capacity planning and hardware
scaling are driven by measured physical utilization (such as 7-day p95 CPU,
memory, and I/O), never by uncalibrated scheduler bookings alone.

## Method sources

| Term | Formula / Rule | Source | Replace when |
| --- | --- | --- | --- |
| Functional core and vertical slices | Keep deterministic domain decisions behind a small interface; the shell handles effects and transactions. | Gary Bernhardt, *Boundaries* (2012); David Parnas, *On the Criteria To Be Used in Decomposing Systems into Modules* (1972) | Measured correctness or change cost shows a better boundary. |
| Safe feature authoring and value transitions | Default to safe owned domain values; isolate low-level machinery, and choose borrowing or shared structures from actual needs. | [Rust borrowing rules](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html); Bernhardt, *Boundaries* | Correctness, compile feedback or workload cost supports another implementation. |
| Independent concerns and reusable agent instances | Separate grants, execution, relationships and scheduling; reuse a type where its invariants match. These are chosen design defaults, not consequences of every cited pattern. | Dijkstra, *THE Multiprogramming System*; Fowler, *Analysis Patterns*; the owning contract's invariants | A required invariant or measured coordination cost changes the boundary. |
| Queueing and capacity | Identify the actual binding constraint; use demand, measured physical use and SLOs to size capacity. | Goldratt, *The Goal*; Little (1961); Kingman (1961) | Workload topology or measured bottleneck changes. |
| On-demand execution and shared capacity | Scale eligible idle compute down; record retained capacity when its measured value justifies its cost. Kubernetes QoS classes govern resource-request and eviction behavior, not universal interference isolation. | [Knative scale-to-zero](https://knative.dev/docs/serving/autoscaling/scale-to-zero/); [Kubernetes QoS](https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/); Verma et al., *Borg* (2015) | Workload latency, durability or total cost changes the capacity choice. |
| Event-driven reconciliation | Use event-triggered idempotent reconciliation for desired-state control; retain resync recovery and use supported polling where the external contract requires it. | [Kubernetes controller pattern](https://kubectl.sigs.k8s.io/guides/introduction/resources_controllers) | The source contract or measured freshness/cost favors another trigger. |
| Durable accepted work | Keep recoverable state, effect identity and system-side retry for accepted work not yet complete. | Temporal and Restate durable execution; the operation's transaction and idempotency contract | The workload comparison favors another store or execution mechanism. |
| Outcome evaluation | Judge the actual result and required invariants; use traces as diagnostics and repeated trials when consistency matters. | [Anthropic agent evaluations](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | A validated evaluation better predicts real task outcomes. |
| Untrusted-data separation | External content cannot expand authority; validate content-derived operations against the requester's grant and data-flow controls. | [CaMeL](https://arxiv.org/abs/2503.18813); [OWASP LLM01:2025](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | Stronger validated isolation or authorization controls improve the relevant failure rate. |
