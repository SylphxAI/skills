# Architecture conventions

Trigger: placing a new capability, module, boundary, or integration.

Goal: one change is understood in one focused read, and a mistake stops at its
boundary. The shape is feature-first vertical slices, a functional core inside
a slice that has invariants, ports only at external edges, and one deployable
per product until a named need. These answer different questions (grouping,
side effects, edges, deployment), so they combine. Agents copy what they find,
so a degraded pattern spreads until a check stops it: fix the pattern and add
the check in the same change.

A fault stops at its boundary too: one bad input, one unpriced SKU or one dead
connection is isolated to what it touches, never to the whole service
([durable ownership](#durable-ownership-of-an-accepted-request)).

## Hard lines

When an operational path is slow or blocked, use a reversible workaround within existing grants, record its root-fix follow-up and removal trigger, and remove it when the fix lands. This does not authorize a product to work around or bypass our own engines or platform: the engine owner fixes the gap upstream first, and the product consumes the published capability. Spending approval remains required. Preserve unique user data and keep auth, tenant isolation, and ledger protections hard.

Products trust each other no more than a stranger, so one product's compromise
or private shortcut never becomes another's breach.

The platform path is in the repository's agent instructions: neutral
mechanism ships in the platform, the method is the replaceable delivery
template, and our own projects are ordinary customers on the public grant path
with no backdoor.

- A product reaches another only through its published API or events, with a
  key any customer could hold - not its database, tables, internal crates,
  cluster-local address, or an `/internal` route. Every call carries an
  identity; network position grants nothing.
- The platform holds no credential inside a tenant
  ([security.md](../../deliver-and-verify/references/security.md#practices)); each product holds its own keys.
- Shared platform and engine repositories name no downstream product: no product
  string, ID, namespace, domain, label, allowlist entry, or special case. A
  product's need becomes a capability every customer can configure through the
  public API, enforced by automated boundary checks.
- No method-specific kinds, routing, CD3 weights outside the ranker
  library, or share values are compiled into the platform.
- No hand edit or hand-made platform-managed object for a tenant, even during
  an outage. Follow the [recovery procedure](../../deliver-and-verify/references/security.md#recovery-procedure).

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
- Split by capability, not size; merge pieces that always change together.
  Keep domain rules in a pure functional core (`values in -> values out`, zero
  I/O or traits). When a shared engine or runtime runs across multiple hosts
  (such as a standalone CLI/TUI/Desktop on local SQLite and a cloud worker on
  Postgres), define a small number of narrow, semantic atomic ports at the host
  boundary (Alistair Cockburn, *Hexagonal Architecture*, 2005: purposeful
  conversations such as atomic session journal checkpoints or relationship
  graph edges — never a 1-to-1 CRUD `Repository` trait per database table), and
  implement both the `sqlite` and `postgres` adapters on Day 1 against one
  shared conformance test suite. Inside single-host cloud services (such as
  multi-tenant billing holds, RLS, and `FOR UPDATE SKIP LOCKED` dispatch queues
  that only run on Postgres), keep persistence direct in the imperative shell
  (`load -> decide -> atomic SQL commit` without speculative `Repository`
  traits).
- **Optimize for Agent-Native physics ($C_{\text{write}} \to 0$, $C_{\text{migration}} \gg C_{\text{write}}$): freeze irreversible semantics on Day 1 and make projections disposable**:
  - Never apply YAGNI or "Rule of Three" to identity, tenancy, authority, or
    known multi-host boundaries: every entity uses globally unique,
    time-sortable IDs (`<prefix>_<uuidv7>`) and carries `org_id` from Day 1 (a
    local CLI workspace uses a local `org_id` rather than a schema without
    tenancy).
  - Never use unlogged `UPDATE`-in-place tables that silently overwrite history
    or couple unrelated modules: every state transition on sessions, goals,
    capability grants, messages, or financial postings commits both an
    append-only fact row (with monotonic `seq`, `expected_seq` fencing, and
    `idempotency_key`) and the authoritative current-state row inside the same
    ACID transaction (preserving synchronous database invariants: `UNIQUE`
    constraints, foreign keys, and `FOR UPDATE SKIP LOCKED`), while treating
    secondary search, analytics, and UI read views as disposable projections
    rebuildable from the fact log so query or UI evolution never requires a
    multi-PR live data migration.
  - Keep vertical capability cells small enough to fit in a single agent's
    context window (`<3,000` lines) with composable extension hooks rather than
    central giant enums or shared route files that serialize 100 parallel
    agents in the merge queue. When a cell's design is superseded, replace it
    cleanly against its conformance test suite and delete the old code, tables,
    and compatibility shims in the same change (zero legacy residue).
- **Two-tier separation: high-hit-rate declarative authoring vs. extreme-optimized engine internals**:
  - **Upper tier (90% of code — products, games, SaaS, and business slices)**:
    Write pure, lifetime-free (`'static` owned types), safe
    (`#![forbid(unsafe_code)]`), declarative Rust (`struct`, `enum`, `Vec`,
    pure value transitions) so coding agents achieve a `>95%` first-pass
    compile and test hit rate. Never leak explicit lifetime parameters
    (`<'a>`), cross-module interior mutability (`Arc<Mutex<...>>`, `RefCell`),
    or manual arena/SIMD/GPU micro-optimization into feature slices.
  - **Lower tier (10% of code — shared UI, agent, and platform engines)**:
    Absorb all low-level performance complexity (WASM linear memory arenas,
    Structure-of-Arrays layout, tree/layout diffing, GPU instancing and
    frustum culling, SIMD, and connection pooling/batching) beneath a stable,
    high-level authoring contract.
- **Semantic immutability via Rust ownership and value semantics (never clone-heavy persistent collections)**:
  - Distinguish **database immutability** (append-only fact streams paired with
    in-transaction authoritative current-state rows and disposable secondary
    read projections) from **in-memory Rust immutability**: at
    module boundaries, pass owned values and return new state plus explicit
    effects (`fn decide(mut state: State, event: Event) -> (State, Vec<Effect>)`
    with `#[derive(Clone, PartialEq, Eq, Debug)]`), giving 100% deterministic
    unit tests (`assert_eq!`) and zero shared-reference mutation bugs while
    compiling to zero-copy, in-place LLVM/WASM machine code. Never import
    Flutter/JS-style persistent immutable collection wrappers (`im`, `rpds`) or
    deep-clone state on every transition unless a user-facing undo/time-travel
    feature explicitly requires structural sharing.
- **Unbraid orthogonal dimensions and run the layer ablation test before writing code**
  (Rich Hickey, *Simple Made Easy*, 2011; Edsger W. Dijkstra, *THE
  Multiprogramming System*, 1968; David L. Parnas, 1972): never confuse
  temporal co-occurrence in a workflow ("when the platform dispatches a ticket,
  it also spawns a sub-agent, sets a goal, and grants tools") with structural
  coupling. Separate **What** (tools & capability grants checked at invocation),
  **How** (per-session execution loop & goal state), **Who / Where**
  (relationship graph & awareness: `parent` edge or shared `group` / `team` /
  `workspace` roster), and **Why / When** (outer scheduler or ledger that
  configures a session). Every layer $L_i$ must pass the **ablation test**: if
  $L_i$ is deleted completely, layers $L_1 \dots L_{i-1}$ still work standalone
  with zero dead branches or `if` checks referencing $L_i$.
- **Keep nodes isomorphic; put roles on edges and lifecycles in state** (Carl
  Hewitt, *Actor Model*, 1973; Martin Fowler, *Party-Role Pattern*, 1997): do
  not turn role nouns (`assistant`, `sub-agent`, `parent`, `one-off worker`,
  `team member`) into entity subclasses, separate tables, or `kind` /
  `lifetime` columns that branch tool authority or loop execution. Keep every
  entity node structurally identical, represent relationships (`parent`,
  `team` / `group` / `workspace`) as graph edges that govern awareness and
  notification routing only, and represent lifecycle (`active`, `idle`,
  `paused`, `archived`) as a reversible state machine without destructive
  deletes.
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
- Accept an input and act on it, or refuse it with a clear error.
- Docs name the owner and link; where a doc must show a value, it is generated.
  A "live" status word has a probe behind it.
- An unavoidable copy (a generated client, a mirrored config) is regenerated in
  CI, which fails on any difference.
- When you find two values for one thing, delete the extra one in the change
  that found it.

## Scale

A design states how it holds at 10x and 100x its current users, data, and
request rate, and names what breaks first (Jeff Dean, WSDM 2009 keynote:
design for about 10x growth, plan to rewrite before about 100x). Choose the partition key and the
stateless edge up front, keep state behind one owner that can shard, and make
growth a matter of adding instances. Plan for scale; server purchases follow the
physical-use threshold, not
arriving requests or queues.

- **Nothing runs always-on.** Every service, worker, job and environment this
  company runs starts on demand (JIT) and scales to zero when unused (serverless,
  scale-to-zero): a request, an event, an admitted job or an open session keeps it
  up, and idle time costs nothing. Machines are a purchase, so idle replicas are
  paid for and wasted; the
  three ways to be on-demand
  pick the lowest option that fits (Knative `min-scale: 0`, Kueue for Jobs, a
  long-running Deployment only for a named always-on role), and a Hosting
  Service has no floor. A service stays always-on only by a recorded decision
  naming its reason on the owning item; an unrecorded floor is a blocking defect in
  review.
- **A slow cold start is fixed at the start, never by staying warm.** Measure the
  start as a span, set a target per service class and keep a probe on it
  .
  The span covers image pull as well as process start: the pull is a measured
  leg, cut by a node snapshotter's warm content store and a pull-through cache
  with split-horizon names, never by a bigger image and never assumed to be
  free. Holding a replica warm is not a fix: it pays idle money to hide the
  defect.
  Work already in use, such as a live match or an open socket, keeps running
  through drain and a disruption budget, not through a floor.

## Real time: events first, resync as the safety net

Every product, platform service and dev machine tool reacts to a change when it
happens, not on the next tick. The industry standard is the Kubernetes
controller pattern ([resources and controllers](https://kubectl.sigs.k8s.io/guides/introduction/resources_controllers)):
an event (watch and informer, a transactional outbox to an event bus,
webhooks, Postgres `LISTEN/NOTIFY`) only triggers reconciliation, and
reconciliation is level-based and idempotent: it reads the current desired
and observed state, not the event's transition, so several events coalesce
into one pass. A slow periodic resync triggers the same reconciliation, to
repair what missed events, reconnects and start-up gaps left behind.
Clients receive changes the same way (server-sent events or WebSockets).

- **The primary path is an event.** A design whose normal path is a poll,
  cron or sleep loop is a blocking defect in review. A schedule is right only for
  work that is genuinely time-based (a daily report, an expiry, a backoff).
- **The resync is the safety net.** It runs at a slow interval and goes
  through the same reconciliation as an event, so both converge on the same
  state. It repairs missed events; it is not how normal work progresses. If
  routine progress waits for the resync, the event path is broken and gets
  fixed.
- **Overhead is a defect.** Every wait on a critical path (queueing, cold
  start, upload, image pull, staleness, a sync interval) is its own measured
  span and targets zero. Capacity serves demand at once: a demand-sized warm
  pool replaces reservations and admission ticks. Bytes move once:
  content-addressed and incremental transfer, a node snapshotter's lazy,
  cached image content, pull-through caches with split-horizon names, and
  streaming instead of store-then-forward.
- **Clients never wait on a refresh.** A UI subscribes to the change and
  updates in place; it does not poll an API or ask the user to reload.

## Durable ownership of an accepted request

Trigger: a path accepts a message, job, login or write from a person or another
service.

Once the system has answered "yes, I have it" (a 2xx, a delivered webhook, a
claimed message), that request is ours until it ends. A fault anywhere under it
is retried or routed for repair by the system, never handed back to the person
to resubmit. This is durable execution in the Temporal sense: the request has a
recorded state, a next step and a resumption point, so a crash, a restart or a
slow dependency delays it instead of losing it ([durable
execution](https://docs.temporal.io/evaluate/understanding-temporal), [AWS
prescriptive guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html)).

- **One stable request identity.** Every accepted request carries an id
  (a message id, an idempotency key, an order id) that survives redelivery,
  retry and restart, and every write it causes is keyed on it. A client that
  retries the same request gets the same outcome, not a second effect.
- **A recorded next recovery step.** The durable record holds what has been
  done, what is next, when it is due, and the attempt count. A restart resumes
  from that record; nothing lives only in one process's memory, and a
  dead connection or a held lock is dropped and replaced, not waited on forever.
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
- **Dead-letter with an owner alert.** A request that outlives its retry budget
  is parked in a dead-letter store that keeps its full payload, and an alert
  reaches its owner (an item or a page) with the identity and the reason.
  Parking is not closure: the owner repairs the cause and the request is
  redriven, or the failure is recorded as a terminal fact with that reason. A
  poison row, an expired backlog or a dropped notification is never dropped
  silently.
- **Never the person's retry.** No surface says "please try again", "resend
  it", or "send it again" for a failure the system could retry itself; writing
  "retrying will not help" to an agent invites it to tell the person to start
  over. A request that cannot be retried is replaced by the system's own repair
  or by a plain answer that owns the failure.
- **One fault is not a service outage.** An unpriced SKU, a malformed row, one
  person's bad token or one held connection never takes a whole service, a pool
  or a queue out of service: the fault is held to its own request or tenant,
  the rest keeps serving, and readiness reflects what is broken, not that
  something is.

Today's cases that made this rule: one agent turn failing on the same internal
write on every retry, so the person was asked to send the message again; one
unpriced SKU holding the whole AI gateway unready for about two hours; the work
service and its connection pooler holding dead connections after a network
break; the OpenCode server half-booting on a database lock and taking every
owner agent down. The first deliverable is this rule; each case gets its own
change, test and post-deploy check.

**Where the durable state lives is decided on measured evidence, not taste.**
The two candidates are a durable execution engine (Temporal, or Restate
([durable execution](https://docs.restate.dev/concepts/durable_execution)) as
the Rust-native form) and the Postgres we already run: a request row with its
state, next step and due time advanced in the same transaction as the effect,
and a dispatcher that claims due rows. We take the Postgres path when its
measured p95 dispatch lag, throughput per core and recovery time on our
hardware meet the same targets on our own workload, because then it is one
fewer always-on system to operate, back up and page on. We take a separate
engine when the workflow outlives a database transaction with long waits and
timer storms the row-and-dispatcher model cannot hold at p95. The comparison
is run once, on the Workflows and Events dispatch workload, and recorded with
the decision; until it reports, the row-and-dispatcher path is the default and
no engine is bought.

## One shared capacity pool

The placement rules are in [the capacity-pool reference](#shared-capacity-pool).

## Between products: practices

- An app reaches the platform through the published SDK or the platform API gateway with one
  `sylphx_sk_` key. A service that cannot serve an app that way is a
  `platform-request`, not a private workaround.
- An app uses the platform for what the platform offers (hosting, data, workflows, events,
  notify, auth, AI, observability) instead of building or buying its own. A
  generic helper several products need is published once, in the SDK or a
  shared package. Exceptions to dogfooding are company decisions, listed with
  an owner in the decisions record
  ("Allowed third parties").
- The platform owns its product and commercial positioning and decides every
  tenant request with one test, before any reply: (1) the published offer
  already covers it, so the tenant does it itself with its own key; (2) it is a
  platform defect, fixed generically for every tenant; (3) neither, so decline,
  and file a real, market-worthy need as a `platform-request` for the platform
  to schedule. A tenant event protects that tenant's environment and the paths
  it depends on, not the whole platform.
- `buf breaking` gates every schema change, and event consumers are idempotent.
- A breaking change to anything other repositories call or present (a shared CI
  pipeline, a workload identity, a credential, a public contract) goes in order:
  declare the minimum supported consumer version (the floor); run a check that
  lists and fails every consumer below it; bump consumers until it is green;
  then retire the old side. Until then the provider accepts old and new.
  Consumers pin exact versions for supply-chain safety and never move on their
  own, which is why the floor and its check exist.

## Agents are steered by their environment

How an agent is steered is in [the agent-steering reference](#steering-agents-by-environment).

### Injection defence is architectural, not a prompt rule

Untrusted content is data, never instruction, and the boundary that keeps it
data is made of the system's own separation of privileges, not of a sentence
telling the model to be careful. Text, names, images, attachments, and tickets
that arrive from outside the company are data at every hop, including after a
person or a model copies them into a note, a ticket, a summary, an extracted
field, or a prompt. Isolating the first reader does not make the copy trusted,
and no later step executes instructions found in that content. Direct user input
and indirect content from an external source are the same class of untrusted
input: keep it separate and clearly marked
([OWASP Gen AI Security Project, LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)).

- **Least authority is the first control.** An agent holds the narrowest grant
  its job needs, so a hijacked session reaches nothing its task did not
  already cover ([security.md](../../deliver-and-verify/references/security.md), "Authority is checked on the
  server").
- **Untrusted content stays separated from decision and effect**: it cannot
  select an operation or fill a privileged parameter, and it is never
  interpolated into a command, a query or an instruction channel. Google
  DeepMind's [CaMeL](https://arxiv.org/abs/2503.18813) (2025) is the
  reference; a capability quirk must not let untrusted text name a privileged
  tool or argument.
- **The one case that asks a person is Meta's [Agents Rule of
  Two](https://ai.meta.com/blog/practical-ai-agent-security/) (2025)** when it
  holds in one session — untrusted input, sensitive data or systems, and an
  outside communication or state change — and the effect is outside the
  requester's grant or is irreversible; then flag it or split the session in
  two. Inside a grant, act and report with a receipt and an undo
  ([experience.md](experience.md): "A grant is the authorization..., no extra
  confirm argument" in [APIs and operations
  are agent-first](#agent-first-apis-and-operations)).

## APIs and operations are agent-first

The API rules are in [the agent-first API reference](#agent-first-apis-and-operations).

## How it is judged

Every boundary rule that can be checked fails CI with a file and line, for the
stack we build: crate and module visibility plus `cargo-deny` for the
dependency and licence bans, and the engine's own module boundary rule for a
Keel surface, so a dependency that crosses crate, module or package lines fails
the build where Rust and Keel are the only targets. A repository still on a
retired stack keeps its own boundary check until it is replaced; the shared
checks in the shared organization `.github` repository apply to every repository. A new rule starts from
a recorded list of existing violations that only shrinks; a rule that cannot
be checked is a review note. A slice is good when one change fits one focused
read and its core tests run in milliseconds.

## Agent-first APIs and operations

Agents are the main callers of our APIs, and people run operations by asking
an agent. The industry reference is Google Cloud and
Stripe: one machine-readable schema generates every client, the console is a
client of the public API, and every admin action is a documented, audited
call. The study, its sources and the rejected options are in
the research/api paradigms 2026 record.

- **One schema generates everything.** An API is written once, in Protobuf
  following Google's API Improvement Proposals (resource names, standard
  methods, AIP-160 filters, page tokens, field masks, long-running
  operations). The generator emits the HTTP/JSON routes and server stubs,
  gRPC, the OpenAPI document, the SDKs, the CLI, the MCP tools and the query
  views; CI refuses a route, tool, client or view written by hand beside it.
  A product's own API uses the same registry and generator.
- **No GraphQL**, as a contract or as a facade: it adds per-field
  authorization, resolvers and query-cost limits for a benefit agents get from
  code mode and the query endpoint. It is reopened only on the study's
  triggers (outside front-ends that need nested reads the SDK and the query
  endpoint cannot serve, measured by support requests, or a customer
  contract), and then only as a read-only facade generated from the schema.
- **The OpenAPI document is public**, served without a key, as Stripe and
  GitHub publish theirs.
- **Agents call the API through a remote MCP server in code mode**: `search`
  over the generated SDK's type declarations, and `execute`, which runs code
  against that SDK in a sandbox with network only to the API and the caller's
  own token, as Cloudflare's and AWS's MCP servers do. The per-method tools
  stay as the fallback for clients that cannot run code. Code mode is
  frontier: its gains are mostly vendor-measured and the sandbox is new attack
  surface, so both modes serve one catalogue and a client falls back with no
  API change.
- **MCP writes follow the granted scope**: a write scope the user granted at
  consent is the authorization ([experience.md](experience.md)), with no extra
  confirm argument or write step-up. The tool's destructive annotation lets
  the client show its own prompt, and `validate_only` gives a preview.
- **Ad-hoc questions go to one governed, read-only SQL endpoint**, as Stripe
  Sigma, AWS Config advanced query and Google Cloud Asset Inventory do: a
  `SELECT` subset over views generated from the schema, with row-level
  security that denies by default (a caller sees only rows its principal could
  List, and a view outside its scopes does not exist for it), time, row and
  bytes-scanned limits with the cost on every answer, served from a replica or
  the analytics store, never the primary. No agent or person gets a database
  connection for this.
- **Every admin read and action is an ordinary API method.** Each is a
  permissioned, audited method in the product's one contract, so an agent
  composes reports and views on demand. A back-office admin site exists for
  the rare times a person signs in, and is a client of that API. No new fixed
  admin tools (bots, dashboards, report pages, one-off scripts): a gap is
  fixed in the API. A direct data migration while that method is
  missing follows [code.md](../../deliver-and-verify/references/code.md#migrations); it never edits a
  platform-managed object or bypasses the recovery procedure.
- **Every method names its permission; roles grant permissions.** A method
  whose schema names no permission does not build. A role is a named bundle of
  permissions bound to a principal on an organization, project or resource, as
  in Google Cloud IAM and Kubernetes RBAC. There is no operator API, operator
  identity or operator key: the platform's own staff act through roles on the
  platform's organization, as any customer acts on its own, and a cross-tenant
  action is a permission granted on that scope. A size or limit a customer may not choose is bounded by its
  plan or quota grant, not by a privileged role. Docs, SDK and CLI are
  generated from the one contract, and a hand-written client is refused by the
  same CI check as a hand-written route.
- **Discovery is not authorization.** Every method sits in the one generated
  contract and is discoverable to a caller whose permissions cover it. A
  filtered discovery list is
  how a call is found, never how it is authorised: authorization is checked
  per call from the caller's grants, so an unfiltered list leaks names, not
  access (RFC 9110 §15.5.4 allows a 404 to conceal a resource; discovery
  filtering is usability, not the boundary).
- **Callers act as a person or a workload, never a shared static key.** An
  agent or CLI acts with the person's delegated token (device authorization or
  OAuth, per [auth.md](../../deliver-and-verify/references/auth.md#agents-clis-and-mcp-clients));
  a server workload acts under its workload identity. A shared static key is
  not an identity, cannot be scoped to one person or tenant, and is not used.
- **Every audit record names who acted for whom.** A record carries the
  acting agent or client, the delegated person, the scope used, the tenant and
  the operation, with its result ([experience.md](experience.md)
  on receipts). A call that cannot name them is not audited and is refused.
- **Every active project closes its gaps now.** Each actively maintained
  project meets these rules now, not at its next admin change; a project
  without real users gets no earlier deadline than the active ones.

## Steering agents by environment

Steering means building the environment so a good model chooses well: clear
tools, architecture and documentation, and a check that judges the result. An
instruction that scripts the model's steps asks a general method to compete
with our hand-built knowledge, and the hand-built side loses (Sutton, [The
Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html),
2019); the investment that pays is the agent-computer interface, not the
route through it (Anthropic, [Building effective
agents](https://www.anthropic.com/engineering/building-effective-agents),
2024-12-19; [Writing effective tools for
agents](https://www.anthropic.com/engineering/writing-tools-for-agents),
2025-09-11, whose tool-call, invalid-parameter and token counts are
diagnostics that improve a tool's name, description, schema and error, never
assertions about tool choice).

- **We design the environment: tools, architecture and docs.** A tool's name,
  description, parameter shape and error answer to a competent model's
  judgement; a rule about the order of a session's steps belongs in the
  tooling, not in prose. Anything enforced goes through the repository's
  agent-instruction and skill layer ([docs.md](../../author-skill/references/docs.md)) or a machine check,
  following "a rule broken once ships with its guard" ([work.md](../../author-item/references/work.md)).
- **A model picks its own tools and steps.** Many valid paths solve one task,
  so no check asserts, scores or times the path. An expected-tool assertion, a
  step transcript compared in CI, or a target number of tool calls is a
  finding, and the fix is deleting the check and repairing the tool or the
  environment it was standing in for.
- **An outcome eval or gate asserts what was produced, read from the
  environment as the user would see it** — the row written, the message sent,
  the run that finished — never the path taken (SWE-bench
  FAIL_TO_PASS/PASS_TO_PASS; tau-bench's end-state database comparison;
  Anthropic, [Demystifying evals for AI
  agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents),
  2026-01-09).
- **A safety-invariant eval asserts a property that must never hold**, such as
  a refused unauthorized effect or a secret absent from output. Injecting a
  known bad attempt and requiring the refusal is such an eval; it holds no
  expected answer inside the case.
- **A suite that gates runs across at least two models**, so nothing is tuned
  to one alias, version or provider route.
- **A consistency-critical agent gates on pass^k across k trials**, the share
  of trials where the whole run succeeds — not one run at temperature 0, which
  says nothing about the tenth run (tau-bench; Anthropic 2026-01-09).

### Separation of Concerns Between Model and Runtime

An agent's reasoning and tool path belong to the model; the environment and
its overhead belong to the platform. Keep that boundary in one direction.

- **Never constrain model autonomy.** Which tools an agent calls, how many
  tool rounds it takes, whether it uses bash or a sandbox/code-mode, and how
  deeply it reasons are model quality and autonomy. Never cap tool rounds,
  never ban sandbox/code-mode on chat turns, never inject canned
  acknowledgment text, and never kill an active stream while reasoning
  tokens flow. A step-order rule belongs in the tooling or a machine check,
  never in prose that prescribes the model's path.
- **Fix platform overhead, not the model.** When an agent feels slow, measure
  and fix the platform: sandbox startup latency (keep the scale-to-zero rule
  unless an explicit exception is recorded), per-tool preparation and progress
  I/O overhead, stream liveness during active reasoning deltas plus live
  progress-card status visibility, and immediate auto-backgrounding of
  in-flight tools when a new user message or steer arrives.

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
| Functional core, imperative shell & vertical slices | Pure deterministic domain core (`decide(state, cmd) -> events`) with zero I/O; imperative shell handles auth, storage, and transactional outbox per capability slice | Gary Bernhardt, *Boundaries* (2012); David L. Parnas, *On the Criteria To Be Used in Decomposing Systems into Modules* (1972) | Never replaced for stateful domain invariants. |
| Two-tier authoring & Rust value-semantic immutability | Upper 90% feature slices use `#![forbid(unsafe_code)]`, `'static` owned values, and `fn(mut State, Event) -> (State, Vec<Effect>)` (semantic immutability at boundaries, zero-copy in-place mutation in LLVM/WASM, no persistent-collection cloning); lower 10% engines absorb arenas, SIMD, and GPU/WASM internals; cells stay `<3,000` LOC and delete legacy paths on cutover | Niko Matsakis & Felix S. Klock II, *The Rust Language* (ACM HILT 2014, Aliasing XOR Mutability); Gary Bernhardt, *Boundaries* (2012) | Never replaced by shared mutable references across modules or clone-on-write collection wrappers in feature code. |
| Orthogonal de-complecting, layer ablation & actor/role isomorphism | Unbraid What (tools/grants), How (session loop/goal), Who (relationship edges), and Why (outer ledger); verify each layer $L_i$ passes the ablation test (deleting $L_i$ leaves $L_1 \dots L_{i-1}$ working with zero dead branches), and keep entity nodes 100% isomorphic with roles on edges and lifecycle in reversible state | Rich Hickey, *Simple Made Easy* (2011); Edsger W. Dijkstra, *THE Multiprogramming System* (CACM 1968); Carl Hewitt et al., *Actor Model* (IJCAI 1973); Martin Fowler, *Analysis Patterns* (1997); Dennis & Van Horn, *Object-Capability Model* (CACM 1966) | Never replaced; every boundary design must pass the ablation and node-isomorphism check. |
| Theory of Constraints (TOC) & queueing capacity | System throughput is bounded by the single bottleneck ($\min(r_1, \dots, r_n)$); scale hardware only on 7-day p95 physical utilization (`>70%` add, `<25%` consolidate) and fix downstream stalls rather than resizing non-bottlenecks | Eliyahu M. Goldratt, *The Goal* (1984); John D. C. Little (1961); J. F. C. Kingman (1961) | Measured workload telemetry establishes a tighter utilization threshold for a specific hardware class. |
| Scale-to-zero & shared-pool QoS tiering | Every service, worker, and job starts on demand and scales to zero when idle (`min-scale: 0`); shared nodes isolate incompressible resources via `Guaranteed`, `Burstable`, and `BestEffort` tiers | Verma et al., *Large-scale cluster management at Google with Borg* (EuroSys 2015); Kubernetes QoS classes | A workload records an explicit always-on exception backed by measured cold-start physics. |
| Level-triggered reconciliation | Events trigger idempotent reconciliation against desired vs. observed state; periodic resync is a safety net only | Kubernetes Controller Pattern (*Resources and Controllers*) | Never replaced by polling-primary loops. |
| Durable execution & transactional outbox | Accepted requests carry a stable idempotency identity, transactional outbox state, and system-side retry/dead-letter recovery | Temporal / Restate durable execution model; Martin Kleppmann, *Designing Data-Intensive Applications* (2017) | Workload benchmarks prove whether row-and-dispatcher Postgres or a dedicated durable engine wins at p95. |
| Environment-steered agents & outcome evaluation | Invest in the agent-computer interface (tools, schemas, diagnostics) rather than scripting model step order; evaluate end-state outcomes (`pass^k`), never tool-call transcripts | Richard Sutton, *The Bitter Lesson* (2019); SWE-bench / $\tau$-bench end-state evaluation | Empirical evaluation across $\ge 2$ models proves a better agent-environment contract. |
| Architectural prompt-injection defense | Separate untrusted data from privileged control flow via least-authority capability grants rather than prompt warnings | Google DeepMind, *CaMeL* (arXiv:2503.18813, 2025); Meta *Agents Rule of Two* (2025); OWASP *LLM01:2025* | Stronger formal capability-isolation primitives supersede current sandbox boundaries. |
