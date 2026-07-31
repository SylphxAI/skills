---
id: ADR-0026-agent-native-durable-progress
status: accepted
date: 2026-07-30
decision_owner: SylphxAI/skills
supersedes: []
amends: []
scope:
  - durable-progress
---

# Optimize for agent-native durable progress

## Context

Two opposite failure modes prevent agent work from reaching its real terminal.
Maximum-caution execution tries to eliminate every imaginable possibility,
adds evidence and waiting after the decision can no longer change, and turns
ordinary reversible work into an open-ended assurance programme. Locally fast
execution can create the opposite failure: a workaround, duplicate authority,
weak intermediate architecture, or partial migration makes one check green but
predictably transfers an owning repair and cleanup to the next attempt. Work
then oscillates between apparent progress and regression.

Human-era cost estimates amplify both failures. File count, boilerplate,
repetitive editing, generated clients, typed models, routine migrations, and
sequential review hours once dominated implementation choices. Current agents,
automation, deterministic generation, machine verification, and
integration-safe parallelism can make that work cheap. The remaining scarce
costs are semantic ambiguity, weak oracles, shared-write and integration
bottlenecks, exact proof, irreversible effects, public/data compatibility,
permanent operating surfaces, recovery, compute, context, coordination, and
wall-clock behavior that cannot be simulated credibly.

The repository already has one owner for each concern. Adding a generic
“work faster”, “work attitude”, or “SOTA execution” Skill would collide with
Decision Quality, Scope Discipline, Autonomous Execution, and Risk-Matched
Verification.

## Decision

1. `decision-quality-standard` owns the universal decision kernel. The kernel
   applies to every task, while ceremony scales with materiality and
   reversibility. It prices critical-path elapsed time and durable lifecycle
   cost through current agent capabilities instead of person-hours or typing
   proxies.
2. Agent-native repricing treats mechanically generatable and verifiable code,
   modules, adapters, migrations, projections, tests, and bounded review as
   comparatively cheap. It still prices semantic error, integration,
   verification, irreversible exposure, permanent operations, recovery,
   compute, context, and coordination as real.
3. `scope-discipline` owns bounded application. Evidence covers the declared
   material boundary and escalates only while residual uncertainty is
   plausible, decision-changing, and positive-value. It does not require a
   mechanical pass through every proof method or elimination of every logical
   possibility.
4. Future-proofing is selected when a known variation, expensive retrofit, or
   stable semantic boundary can be handled now at low agent-native lifecycle
   cost without creating an unjustified permanent operating surface.
   Speculative product behavior, imagined threats, and unused runtime machinery
   remain excluded.
5. A workaround is containment only when a demonstrated external constraint
   currently makes the owning fix impossible. It stays visible, owned,
   expiring, and paired with replacement; it never satisfies the owning
   terminal.
6. `autonomous-execution-standard` owns durable progress. Every accepted
   material step closes a terminal predicate or selected positive-net
   investment while preserving already proven material predicates. A rollback
   may restore known-good state after falsifying evidence, but it does not make
   an obsolete method the destination.
7. `risk-matched-verification-standard` starts with the least-cost decisive
   proof for the actual failure model. Ordinary deterministic reversible work
   does not inherit simulation, canary, independent-review, or broad evidence
   machinery intended for high-blast-radius or irreducibly uncertain behavior.
8. The compact agent-native cost, decision-changing evidence, owning-fix, and
   anti-regression invariants remain always active in
   `runtime/constitution.md`. Detailed methods stay in their existing Skills.

## Rejected directions

### Optimize for speed alone

Rejected because local mutation rate can increase future repair, duplicate
truth, and migration cost while reducing verified progress.

### Keep maximum caution and add more parallel agents

Rejected because parallelism cannot make non-decision-changing investigation
valuable. It can also multiply correlated work, consume host resources, and
increase integration backlog.

### Treat more files or richer typed architecture as expensive by default

Rejected because these are human-era proxies when current agents can generate
and verify them cheaply. The decision turns on semantic and lifecycle value,
not authored byte count.

### Make every task produce a decision matrix

Rejected because the decision kernel is universal but its artifact ceremony is
not. Trivial reversible work uses the direct fast path.

### Add a new generic execution Skill

Rejected because it would duplicate existing semantic owners, worsen automatic
Skill selection, and make contradictions more likely.

## Consequences

- Agents can move quickly on reversible work without weakening evidence-bound
  completion claims.
- Strong typed and modular architecture is not rejected by obsolete human
  effort assumptions.
- High-risk and irreversible work retains proportionate proof.
- Workarounds and weak intermediate targets stop masquerading as forward
  progress.
- Rollback remains available as recovery without becoming architectural
  backsliding.
- The standards optimize terminal-reaching verified throughput rather than
  caution, activity, agent count, or theoretical perfection.

## Verification

- Contract tests assert the always-on agent-native repricing and durable
  progress invariants.
- Tests assert bounded decision-changing proof, the ordinary deterministic fast
  path, owning-boundary repair, and anti-regression semantics across the four
  existing owners.
- Catalog generation, repository validation, tests, package dry-run, and
  whitespace validation run against the exact Candidate.
