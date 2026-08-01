# Product Quality Loop Contract

## Contents

1. [Control model](#control-model)
2. [Contract structure](#contract-structure)
3. [Quality matrix](#quality-matrix)
4. [Observation, finding, Work, and coverage](#observation-finding-work-and-coverage)
5. [Scout triggers](#scout-triggers)
6. [Finding qualification and admission](#finding-qualification-and-admission)
7. [Execution and delivery readback](#execution-and-delivery-readback)
8. [Idle, wake, and continuation](#idle-wake-and-continuation)
9. [Parallelism and backpressure](#parallelism-and-backpressure)
10. [Loop observability](#loop-observability)
11. [Implementation topology](#implementation-topology)
12. [Worked task shapes](#worked-task-shapes)
13. [Research basis](#research-basis)

## Control model

Continuous product quality is a closed-loop control system over changing
product state. It is not a long checklist and not an instruction to keep one
agent alive forever.

```text
versioned product quality contract
  -> scoped scouts and operating signals
  -> immutable observations
  -> normalized, deduplicated findings
  -> policy admission and priority
  -> bounded Work
  -> source candidate and delivery
  -> original-oracle readback
  -> coverage update, correction, or idle
```

Separate three loops:

| Loop | Unit | Terminal |
| --- | --- | --- |
| Product quality | one finding or opportunity | outcome verified, rejected, deferred, deduplicated, or retained residual |
| Work execution | one accepted Work Item | repository/product delivery terminal satisfied or qualified blocked |
| Agent-system learning | one recurring agent failure class | intervention promoted, revised, or reverted against frozen evidence |

A product defect does not automatically justify a Skill change. Repeated agent
failure does not automatically justify product Work. Preserve the causal and
authority boundary.

## Contract structure

The Product Quality Loop Contract records:

| Section | Required semantics |
| --- | --- |
| Subject | project, product release or source revision, environment, capability, surface, journey |
| Quality intent | promise, hard floor, improvement objective, benchmark or retained residual |
| Oracle | required subject layer, observation method, decisive result, uncertainty, replay inputs, freshness |
| Signals | change, external event, live condition, scheduled refresh, owner request |
| Finding policy | normalization, identity, deduplication, disposition, invalidation |
| Admission | materiality, actionability, ownership, expected value, risk, authority, capacity |
| Work handoff | goal, non-goals, acceptance, evidence, relation, delivery terminal |
| Readback | exact delivered subject, original oracle, outcome comparison, correction transition |
| Operation | WIP, compute/time/cost budgets, idle and wake predicates, metrics, recovery |

The product repository stores the versioned contract or a manifest reference to
it. Operational records bind the exact contract revision instead of copying its
prose into a second writable source. Advance one current operational contract
head under predecessor CAS: historical revisions remain replayable, but stale
findings cannot use retired policy or WIP limits to create new Work.

## Quality matrix

Model quality as a matrix, not a scalar score:

```text
capability or surface x applicable quality dimension
  -> promise or objective
  -> oracle + required subject layer
  -> latest decisive evidence
  -> freshness
  -> residual or eligible finding
```

Common dimensions include:

- functional correctness and critical user journeys;
- interaction, information architecture, visual integrity, responsive behavior,
  and layout stability;
- accessibility and input modality;
- discoverability, metadata, crawlability, semantic structure, and public SEO;
- latency, throughput, resource use, and user-perceived performance;
- compatibility, API and data contracts, migration, and recovery;
- reliability, resilience, saturation, and degraded operation;
- security, privacy, tenancy, abuse resistance, and data lifecycle;
- content accuracy, localization, brand consistency, and trust;
- art direction, visual fidelity, motion/audio feel, 3D/asset quality where the
  product ships creative or spatial assets;
- game design quality: core loops, progression, economy coupling, fairness, and
  first-time experience where the product is a game or game-like system;
- operational diagnosability and audience-safe status projection;
- architecture, maintainability, dependency health, and lifecycle complexity;
- business-model and packaging quality, monetization integrity, and
  customer-outcome quality where applicable;
- growth, retention, referral, and notification-policy quality where those loops
  are product-owned;
- support, success, and recovery-path quality for customer-facing consequences.

Do not require every dimension for every surface. Record `not_applicable` with a
semantic reason. Do not collapse a failed accessibility floor into a higher
average performance score.

Classify each selected cell:

- **hard floor** — violation is unacceptable for the declared product state;
- **objective** — a measurable target with positive product value;
- **frontier opportunity** — better than the current target when expected value
  remains positive.

A known uncertainty or retained gap is a `residual` finding and coverage state,
not a fourth requirement class. An applicable cell still needs an oracle;
`not_applicable` is the only oracle-free cell state and requires a semantic
reason.

## Observation, finding, Work, and coverage

Keep four objects distinct.

### Quality Observation

An immutable evidence record containing:

- producer and method;
- exact subject identity: source revision, artifact digest, release, URL or
  environment as appropriate;
- capability, surface, journey, and dimension;
- timestamp and validity/freshness window;
- measurement, trace, screenshot, accessibility tree, failure, user signal, or
  other evidence locator;
- uncertainty, sampling and protected-data classification; and
- the contract/oracle revision used.

Successful tool execution is not automatically a healthy observation. Missing
or corrupt evidence is `unknown`. Each contract cell declares whether its
oracle covers a source revision, Candidate, artifact, or versioned live
resource. Evidence from one layer cannot silently satisfy another.

### Quality Finding

A normalized interpretation of one or more observations:

- stable finding identity and semantic deduplication key;
- affected subject, consequence, reach, and quality cell;
- violated floor/objective or positive opportunity;
- reproduction or measurement and disconfirming evidence;
- severity, confidence, reversibility, urgency, and staleness;
- owning capability and authority boundary;
- proposed acceptance oracle and expected quality delta;
- disposition: `open`, `admitted`, `deferred`, `residual`, `rejected`,
  `duplicate`, or `resolved`, with reason; and
- relations to source observations, predecessor findings, Work, incidents,
  feedback, decisions, and delivery evidence.

`Resolved` requires outcome readback. Closing a ticket or landing code is not
resolution evidence. The decisive passing observation must be new relative to
the admitted finding and backed by readback Evidence bound to that Work; an
old pass or unrelated artifact is not closure.

### Work

Work is an accepted action, not a signal. One Work Item owns one independently
terminal outcome and includes exact goal, non-goals, acceptance, risk,
evidence, delivery boundary, and relation to the finding. Several findings may
share one Work only when one owning cause and one terminal resolve them.

### Quality Coverage

Coverage is a rebuildable projection containing the latest decisive observation
and freshness for each selected matrix cell. It must expose `pass`, `fail`,
`unknown`, `stale`, `not_applicable`, and explicit residuals. It is not a second
contract or a writable verdict source.

## Scout triggers

Use complementary trigger classes.

### Change-triggered

Run affected, fast checks when a source candidate or artifact changes. Select
by changed capability, contract, surface, dependency, or failure model rather
than running every scout on every commit.

### Delivery-triggered

After release or deployment, run the minimum live readback required for the
changed promise: critical journey, public metadata, layout behavior, latency,
compatibility, or recovery state. Delivery success and product outcome remain
separate observations.

### Event-triggered

Ingest material service degradation, customer feedback, incident, security or
dependency advisory, provider rejection, support cluster, product analytics
change, or explicit owner signal through its authoritative connector.

### Scheduled

Refresh broad or slowly drifting surfaces such as accessibility, SEO,
cross-device visual quality, content, dependency health, architecture,
performance budgets, and stale coverage. Cadence follows volatility, exposure,
risk, cost, and freshness—not an arbitrary universal interval.

A scout should be stateless where practical. Durable cursor, deduplication,
backoff, and observation state belong to the operating system, not process
memory.

## Finding qualification and admission

Do not convert every warning into Work. A normal finding is eligible when:

```text
reproducible_or_measurable
and material
and actionable
and owned
and novel_or_meaningfully_changed
and has_a_decisive_oracle
and expected_value_positive
and integration_capacity_available
```

Hard-floor violations bypass ordinary opportunity ranking but still obey
effect authority, safety, legal, data, and irreversible-change boundaries.

Expected value considers:

- user or customer impact, reach, frequency, severity, and strategic value;
- confidence and expected quality delta;
- cost of delay and recurrence;
- agent-native implementation, verification, integration, operation, and
  recovery cost;
- collision and opportunity cost at current CI/deployment capacity;
- reversibility and downside risk; and
- whether a simpler existing mechanism owns the result.

Historical human typing effort is not the default cost model. Cheap agent
generation also does not erase lifecycle, review, state, operational, or
integration cost.

Use semantic idempotency keys over product, capability, surface, dimension,
owning cause, and relevant subject revision. Preserve rejected, duplicate,
deferred, and residual findings so unchanged evidence does not recreate them
indefinitely. Re-open only when the subject, evidence, contract, severity, or
disposition predicate materially changes.

## Execution and delivery readback

Create narrowly scoped, domain-named Work. For example, request keyboard
accessibility or checkout layout stability rather than instructing an agent to
“use all quality Skills.” Native discovery can then select the specialist
method without a repository-maintained router.

The Work path is:

```text
admitted finding
  -> bounded Work and claim
  -> specialist diagnosis and implementation
  -> repository-native source integration
  -> exact-candidate verification
  -> build/release/deploy by the delivery owner
  -> original-oracle readback on the exact delivered subject
  -> resolve, correct, or retain residual
```

Re-run the original oracle first. Additional evidence may strengthen the
verdict but cannot replace the failed promise with an easier proxy. If the fix
changes the intended promise or public contract, record the decision through
the owning product process rather than silently moving the target.

Rework is new related Work (`rework_of`, `follow_up_of`, or `reverts`) and does
not rewrite completed history.

## Idle, wake, and continuation

Absolute perfection is not falsifiable. A healthy idle frontier requires:

- every current hard-floor cell has fresh decisive evidence;
- no admitted critical or high-consequence finding remains without eligible
  Work or a qualified external blocker;
- selected coverage is fresh or explicitly residual;
- current source/CI/review/deployment WIP is within capacity;
- no remaining admissible opportunity has positive expected value under the
  declared objective and budgets; and
- the next wake triggers and recovery state are durable.

Idle is not permanent completion. Wake on a declared source, delivery, event,
freshness, contract, objective, or owner change. One bounded coordinator tick
may qualify and launch work, checkpoint, and exit. A scheduler or event can
later re-enter any eligible agent.

## Parallelism and backpressure

Parallelize only independent observations or Work whose expected gain exceeds
startup, context, compute, coordination, collision, review, and integration
cost. Bound active attempts by the scarcest downstream stage.

Do not recursively fan out agents merely because work is available. Prefer:

- parallel scouts over independent surfaces or dimensions;
- one Work per owning cause;
- bounded specialist review where distinct judgment changes assurance;
- shared immutable evidence rather than copied private transcripts; and
- release of workers at every external-only wait.

When CI, review, deploy, or outcome readback is saturated, stop creating source
WIP and clear the bottleneck.

## Loop observability

Measure the loop without reducing quality to one score:

- matrix coverage and freshness by product/surface/dimension;
- hard-floor pass/fail/unknown and open residuals;
- observation-to-finding and finding-to-Work conversion;
- duplicate, rejected, deferred, residual, stale, and false-positive rates;
- discovery-to-admitted, admitted-to-landed, landed-to-live, and live-to-
  verified latency;
- escaped defect, recurrence, reopen, rollback, and correction rates;
- verified quality delta and cost per resolved finding;
- WIP and queue age by delivery stage; and
- blind spots, unavailable scouts, and evidence integrity failures.

Dashboards are projections for decisions. They do not become finding, Work,
delivery, or product-quality authority. Never expose protected telemetry or
internal process state through public product contracts merely to make a loop
observable.

## Implementation topology

Prefer the existing modular product and operating-system boundaries:

```text
product repository: versioned quality intent and local oracles
Enact: observations, findings, Work, claims, Runs, relations, subscriptions
source provider: commit and collaboration facts
CI: exact-candidate deterministic verdicts
delivery platform: artifact, release, deploy, rollback, live delivery
specialist tools: evidence producers and bounded actions
```

Do not add a new queue, microservice, graph database, scheduler, or deployment
control plane when the existing owners can represent the contract. Add a
first-class Finding model when multiple producers, deduplication, disposition,
queries, and outcome lifecycle make it semantically distinct from Work; it may
remain a module in a modular monolith.

## Worked task shapes

### Interface stability

```text
Audit the signed-in dashboard at release R for layout shift, responsive
overflow, focus loss, and destructive-action recovery. Emit reproducible
findings with screenshots/interaction traces; admit only material distinct
causes; re-run the same journeys after delivery.
```

### Accessibility

```text
Refresh keyboard, semantics, contrast, zoom, and screen-reader coverage for
checkout at revision R. Automated rules are observations; user-task impact and
replayable acceptance determine findings and resolution.
```

### SEO and public discovery

```text
Crawl declared public pages, verify status/canonical/robots/metadata/structured
data/rendered content and critical performance, then create bounded Work only
for owned, material, reproducible gaps. Re-crawl the exact live release.
```

### Runtime quality

```text
Detect a breached journey SLO from protected telemetry, correlate the exact
release and trace evidence, route an incident when containment is urgent, and
create follow-up product Work only after the owning cause is established.
```

## Research basis

- IBM's autonomic-computing model separates monitor, analyze, plan, execute,
  and shared knowledge in a closed control loop:
  <https://www.research.ibm.com/publications/an-architectural-blueprint-for-autonomic-computing>
- The Deming Institute describes PDSA as prediction, evidence, learning, and
  iteration rather than activity repetition:
  <https://deming.org/explore/pdsa/>
- ISO/IEC 25010 defines a multidimensional product-quality model rather than one
  universal score:
  <https://www.iso.org/standard/78176.html>
- Google SRE distinguishes monitoring signals, actionable alerting, toil, SLOs,
  and recovery work:
  <https://sre.google/sre-book/monitoring-distributed-systems/>
- DORA links small-batch continuous delivery, fast feedback, and stability:
  <https://dora.dev/capabilities/continuous-delivery/>
- W3C accessibility conformance testing preserves rule applicability,
  expectations, and outcomes:
  <https://www.w3.org/WAI/standards-guidelines/act/>
- Google documents Core Web Vitals as user-centered field and lab signals:
  <https://web.dev/articles/vitals>
- OWASP ASVS defines verifiable application-security requirements:
  <https://owasp.org/www-project-application-security-verification-standard/>
- OpenTelemetry defines vendor-neutral traces, metrics, logs, and context, while
  product authority remains outside telemetry:
  <https://opentelemetry.io/docs/specs/>
