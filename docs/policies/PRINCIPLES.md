# Sylphx Principles

> Principles few enough to remember; usage detailed enough to execute.

Universal doctrine for **any design work**: code, systems, products,
interfaces, operations, and business models — not engineering alone.

This file is the canonical full text. The compact always-on floor lives in
[`runtime/constitution.md`](../../runtime/constitution.md). The engineering
instantiation is the Quality North Star (`q-*`) under
[`build-product/references/engineering-standard`](../../skills/build-product/references/engineering-standard/README.md);
the commercial instantiation is
[`commercial-decision-standard`](../../skills/compose-product-portfolio/references/commercial-decision-standard/README.md).

This is doctrine, **not a parallel quality vocabulary**: the Quality North Star
remains the sole `q-*` vocabulary and this document maps onto it (see
[Relation to repo surfaces](#relation-to-repo-surfaces)).

## One line

**Deep basis, correct outcomes, minimal concepts — maximum capability; easy to
change, clear to see, fast under load; hard to kill, hard to breach, costs
priced in agent-native budgets.**

## Memory set (9)

Three layers, nine principles — English names only:

| Layer | Principles |
| --- | --- |
| **Think** | Depth · Correctness · Simplicity |
| **Build** | Evolvability · Observability · Performance & Velocity |
| **Operate** | Reliability · Security · Economy |

## Ambition and Simplicity

This doctrine is **ambitious**. Simplicity does **not** mean fewer features,
smaller vision, or shrinking the world to look clean.

- **Ambition** lives in *what capability surface we cover* — as much of the
  real problem as the basis can honestly hold.
- **Simplicity** lives in *how few concepts and systems cover that surface* —
  integrate and compose until one basis does more with less machinery.

Fewest systems. Maximum capability. Eating more of the world with one deep
basis is success; scattering the same ambition across many half-systems is
failure.

## The nine core principles

### 1. Depth (thinking)

- **Definition**: understand to first principles and root cause, not the
  surface. Find the basis that can honestly carry a large capability surface.
- **Not**: gold-plating, over-engineering, analysis paralysis.
- **Test**: "Is this a root-cause fix or a workaround?" "Can I state the
  principle behind this design, or did I copy a pattern?"
- **Rule**: **Depth is for thinking; Simplicity is for the artifact.** Deep
  thinking usually yields a simple implementation — depth is never an excuse
  for bloating the artifact.

### 2. Correctness (thinking)

- **Definition**: right results **and** evidence. Includes consistency /
  integrity: nothing missing, nothing duplicated, no silent rewinds, no wrong
  data under the stated failure model.
- **Not**: zero-bug theater. The floor is **evidence discipline**, not
  perfection.
- **Test**: "Where is the evidence — source / CI / deploy / live?" "What is
  the oracle? Can we re-run and observe the postcondition?"
- **Rule**: a contract, CI badge, or 200 OK is not behavioral proof by itself;
  issue the real action and verify the postcondition.
- **Facets**: testability, integrity, reproducibility, evidence.

### 3. Simplicity (thinking)

- **Definition**: **fewest concepts and systems covering the full capability
  ambition** — unify and compose; do not shrink capability to look clean.
- **Not**: fewer features as a virtue; YAGNI used to delete option value;
  "simple" as an excuse for a shallow shell.
- **Test**: "After simplifying, did any capability disappear?" If yes, the
  basis has not been found yet. "Could one integrated system cover more than
  these parallel ones?"
- **Rule**: cutting is the lazy path; integration is design. Simplicity
  reduces **concept count**, not **feature count** or ambition.

### 4. Evolvability (building)

- **Definition**: changeable, redirectable, severable. Includes
  maintainability (stays safe to change), readability (legible intent), and
  operability (deploy / upgrade / runbook).
- **Test**: "How many places must move for the next real requirement?"
  "After cutting a dual path, who is the sole writer?"
- **Rule**: a hard cut removes false authority and dual paths, not capability —
  after the cut, capability is held.
- **Facets**: maintainability, readability, operability.

### 5. Observability (building)

- **Definition**: when something breaks, you can see where, when, and why —
  logs, metrics, traces, state. **Production is the floor.**
- **Test**: "Within minutes, do I know where, when, and why?"
- **Rule**: a production system without observability is flying blind.

### 6. Performance & Velocity (building)

- **Definition**: system latency / throughput **and** delivery speed (idea to
  live). Scalability is the same principle under growth: still works when
  load or resources grow, with an acceptable cost curve.
- **Not**: speculative optimization without a budget or measurement.
- **Test**: "What is the SLO / load shape?" "What happens at 2×?" "How long
  until this change is live?"
- **Rule**: performance claims are explicit and measured, never guessed.
- **Facets**: latency, throughput, scalability, delivery velocity.

### 7. Reliability (running)

- **Definition**: stays right (reliability) + available when wanted
  (availability) + recovers when hit (resilience). Resilience includes small
  blast radius, graceful degradation, and recovery.
- **Test**: "If one part dies, what does the user see, and how long until
  healthy?"
- **Facets**: availability, resilience.

### 8. Security (running)

- **Definition**: least privilege; no silent leakage of secrets or data;
  auditable trust boundaries. Privacy is included. **A floor.**
- **Test**: "Is there a secret in the repo?" "Who can touch this, and what is
  the blast radius of a stolen credential?"
- **Rule**: security and privacy floors are never traded.
- **Facets**: privacy, least privilege, auditability.

### 9. Economy (running & paying)

- **Definition**: cost is priced in **agent-native budgets**, not human
  person-days or "dev effort" as the default yardstick. In an agent-native
  world, generating artifacts is cheap; the expensive parts are verification,
  entropy, attention, coordination, runtime, and reversal.
- **Agent-native budgets** (name which one on every cost claim):
  | Budget | Meaning |
  | --- | --- |
  | **Entropy** | every extra concept, path, or special case charges compound interest to every future agent and human |
  | **Verification** | oracles, proofs, evals, and re-runs that establish correctness |
  | **Attention** | human review, decision, and on-call focus |
  | **Runtime** | tokens, compute, latency, $ per action (also constrained under Performance) |
  | **Coordination** | multi-agent / multi-system collision, redo, false completion |
  | **Reversal** | cost to undo, migrate, hard-cut, or recover from a wrong path |
- **Not**: "saved eng time" as a complete cost story; "fewer features" as
  savings; treating human headcount as the primary cost unit for agent work.
- **Test** (mandatory on any cost claim):
  1. Which budget?
  2. How is it measured?
  3. Which principle was traded?
- **Rule**: any cost claim that cannot answer those three questions is
  incomplete. Runtime resource budgets stay under Performance; Economy is the
  decision lens for lifecycle / entropy / attention / coordination economics.

## Decision rules

1. **Correctness and Security are floors** — never traded. Correctness floor =
   evidence discipline; Security floor = least privilege.
2. **Other conflicts**: name the traded principle, why, and when it returns.
   Never concede silently.
3. **When unsure, default to Simplicity**: fewer concepts, **not** smaller
   ambition.
4. **Layer the states**: source / CI / deploy / live are never conflated;
   evidence is per layer. Designed ≠ implemented ≠ verified ≠ live.
5. **Ambition constraint**: expanding capability must not multiply parallel
   systems without an integration path to one basis.
6. **Cost claims** are incomplete unless Economy's three questions are answered
   in agent-native budgets.
7. **Situational defaults**:
   - Experiment / new territory → fast + simple; correctness via evidence gates
   - Production systems → observability + reliability + security as operating floors
   - User-facing / money-touching → correctness + security first

## Facet map (audit expansion)

Core principles stay at nine. The longer quality list is **not** a second
principle set — each item is a core or a facet:

| Core principle | Facets / related `q-*` |
| --- | --- |
| Depth | `q-depth` |
| Correctness | `q-correctness`, `q-testability`, integrity, evidence |
| Simplicity | `q-simplicity`, concept count |
| Evolvability | `q-evolvability`, `q-maintainability`, `q-readability` (alias), operability |
| Observability | `q-observability` |
| Performance & Velocity | `q-performance`, `q-scalability`, delivery velocity |
| Reliability | `q-reliability`, `q-availability`, `q-resilience` |
| Security | `q-security`, privacy |
| Economy | `q-economy` (agent-native budgets above) |

Do not flatten fourteen attributes into fourteen equal "principles." Principles
decide tradeoffs; facets audit coverage.

## Working with agents

- **Simplicity** → demand integrative simplicity and held capability; "fewer
  features" is not an explanation.
- **Economy** → demand budget + measurement in agent-native terms; override the
  default that cost means human development effort.
- **Done** → demand the layer: source / CI / deploy / live; no evidence is not
  done.
- **Depth** → demand the basis/principle, not only the delivered artifact.

## 60-second pre-flight (every design / code / product task)

1. Are the floors touched (Correctness, Security)?
2. Which two principles conflict — has the tradeoff been stated?
3. Which layer does the evidence sit on?
4. Is there anything to integrate rather than delete — without shrinking ambition?
5. If cost was mentioned: which agent-native budget, how measured, what traded?

## Relation to repo surfaces

| Surface | Role |
| --- | --- |
| `runtime/constitution.md` | Compact always-on floor of this doctrine (agent-installed) |
| `docs/policies/PRINCIPLES.md` | This file — canonical full text (human documentation) |
| `engineering-standard` (`q-*`) | Engineering instantiation under `build-product` |
| `commercial-decision-standard` | Business-model / pricing / packaging instantiation |

Mapping to the Quality North Star (`q-*`):

| Principle | North Star IDs |
| --- | --- |
| Depth | `q-depth` |
| Correctness | `q-correctness` (+ evidence floors in the constitution) |
| Simplicity | `q-simplicity` |
| Evolvability | `q-evolvability` (+ `q-maintainability`, `q-testability`) |
| Observability | `q-observability` |
| Performance & Velocity | `q-performance`, `q-scalability` (+ delivery velocity in `delivery-standard`) |
| Reliability | `q-reliability`, `q-availability`, `q-resilience` |
| Security | `q-security` |
| Economy | `q-economy` (agent-native lifecycle / entropy / attention / coordination cost) |

## Provenance

Adopted as universal doctrine in
[ADR-20260809](../history/adr/ADR-20260809-universal-principles-and-q-economy.md).
Refined for ambition-preserving Simplicity, agent-native Economy budgets, and
English-only presentation in
[ADR-20260811](../history/adr/ADR-20260811-principles-ambition-agent-economy.md).

This document is authoritative in English. Do not reintroduce non-English
slogans or parallel mnemonics into doctrine, constitution, or quality
vocabulary surfaces.
