---
id: ADR-0015-task-semantic-resource-safe-delegation
status: accepted
date: 2026-07-26
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - agent-delegation
---

# ADR-0015: Select delegation from task semantics and positive net value

## Context

Agent delegation can reduce latency and improve independent coverage, but a
role-oriented “fan out whenever possible” instruction also makes atomic work
look delegable. Reading a few files, running one command, or checking one
endpoint can recursively become explorer, validator, and reviewer tasks. Each
child may repeat the same decomposition because agents do not reliably know
their global position in a delegation tree. The result consumes CPU, memory,
context, supervision, and integration capacity while slowing the actual
critical path.

A fixed recursion depth or global agent quota is the wrong control. It assumes
a central orchestrator and rejects cases where a child legitimately discovers a
new independent, complex lane. It also says nothing about whether the first
delegation was valuable.

## Decision

1. `drive-to-delivery` owns one local, task-semantic delegation
   predicate. A lane is eligible only when it is materially complex, bounded,
   independently useful, evidence-bound, collision-safe, capability-matched,
   and expected to improve total verified throughput after startup, compute,
   coordination, supervision, result-reading, and integration costs.
2. Atomic observations and tightly coupled immediate work stay local. Examples
   include one or a few file reads, one command, one endpoint check, a literal
   lookup, a short answer, and a narrow step whose result is immediately needed
   by the current agent.
3. A bounded child task is presumptively an execution leaf. A child may delegate
   only after discovering a new lane that independently passes the same full
   predicate. Child status neither forbids nor authorizes delegation.
4. Free slots and role names are not reasons to launch. “More confidence” alone
   is not an independent outcome. The feasible launch set, rather than each
   isolated lane, must have positive net value.
5. Host resource pressure, active-child load, integration backlog, collision
   risk, WIP, quota, and downstream capacity are part of eligibility. Under
   pressure, agents drain or integrate work and continue safe local actions
   before reconsidering fan-out.
6. The always-on constitution may carry only a miss-class-A compact floor if it still passes the L0 admission test and hard budget (ADR-20260731-thin-dual-layer-progressive-instruction-system). Full delegation calculus stays in Skills.
   `agent-first-development-standard` consumes the predicate when coordinating
   work that has already qualified.
7. Authored positive and negative cases may remain as a non-blocking evaluation
   corpus. They illustrate the decision boundary but do not prove routing,
   runtime enforcement, or observed agent behavior.


> **L0 membership:** always-on body membership and thickness are governed by [ADR-20260731-thin-dual-layer-progressive-instruction-system](ADR-20260731-thin-dual-layer-progressive-instruction-system.md) (miss-class-A floors only; hard budget). Domain procedures remain in Skills.

## Consequences

- Delegation remains available for genuinely valuable parallel research,
  implementation, validation, and remote monitoring.
- Recursive explosion is prevented by a rule every agent can apply locally,
  without global-depth knowledge.
- Small tasks avoid startup and integration overhead.
- There is no universal agent count, recursion ban, resident orchestrator, or
  new service.
- Runtime behavior still requires observation; authored cases or policy-text
  checks are not evidence that a host respected the resource envelope.

## Verification

- `tests/fixtures/delegation-policy-cases.json` is a non-blocking evaluation
  corpus.
- A promotable behavior claim requires an exact Skills revision native-agent run with
  host resource and delegation observations.
- Repository CI verifies package/catalog and executable runtime behavior; it
  does not manufacture a delegation verdict from the authored policy.
