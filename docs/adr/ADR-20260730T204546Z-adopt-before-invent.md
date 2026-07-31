---
id: ADR-20260730T204546Z-adopt-before-invent
status: accepted
date: 2026-07-30
decision_owner: SylphxAI/skills
supersedes: []
amends: []
scope:
  - engineering-methods
---

# Adopt established mechanisms before custom invention

## Context

Agents can generate convincing terminology, diagrams, status models, gates, and
control layers faster than owners can evaluate them. This creates complexity
theatre: a familiar mechanism is renamed and wrapped in additional machinery,
while observable behavior, guarantees, and quality remain unchanged or regress.
The custom mechanism can then appear validated because its own statuses and
tests repeat its authored model.

Blindly requiring “industry standards” is not sufficient. Popular practice can
be obsolete or inapplicable, and combining every credible pattern creates the
same over-engineering in a different form. Product and domain innovation must
also remain possible.

Established architecture practice instead evaluates designs against declared
concerns and quality attributes. ISO/IEC/IEEE 42010 defines architecture
description around stakeholder concerns and rationale; ISO/IEC 25010 provides
product quality characteristics; SEI ATAM evaluates architecture choices
against quality-attribute goals and trade-offs. RFC 3439 states the Simplicity
Principle: complexity impedes efficient scaling and raises operational and
capital cost.

## Decision

1. **Adopt before invent.** Commodity engineering and operating mechanisms
   begin with the simplest applicable published standard, ecosystem-native
   primitive, provider capability, or established reference design.
2. An established baseline is the first credible option, not an automatic
   winner. Evidence may reject it when it cannot meet the declared requirement.
3. A custom concept, framework, service, state model, gate, queue, protocol,
   pipeline stage, or vocabulary is admissible only when the decision names:
   - the concrete unmet requirement;
   - the closest credible prior art and why it is insufficient;
   - the semantic or measurable quality delta;
   - added lifecycle and explanation cost; and
   - a standards-compatible boundary and exit or replacement path.
4. If behavior and guarantees are materially equivalent, or lifecycle quality
   is worse, use the simpler established baseline and its standard vocabulary.
5. Synthesis means one coherent baseline plus the minimum complementary
   mechanisms needed for distinct requirements. It does not mean the union of
   every relevant pattern.
6. A custom mechanism cannot prove itself only through its own authored
   statuses, terminology, diagrams, or gates. Compare it against the baseline
   with external behavior, contracts, benchmarks, failure/recovery evidence,
   operator comprehension, and lifecycle cost appropriate to the claim.
7. Product and domain novelty remains encouraged. Custom infrastructure and
   process machinery carries the higher burden because interoperability,
   tooling, recovery, and operator comprehension normally dominate novelty.
8. Compact miss-class-A invariants may live in the runtime constitution only under the thin dual-layer budget (ADR-20260731-thin-dual-layer-progressive-instruction-system). Decision Quality owns
   the comparison and burden of proof; Scope Discipline owns bounded
   application; Engineering owns code and runtime structure.

## Delivery correction

The prior deployment teaching vocabulary made ordinary continuous delivery
sound like a new architecture. ADR-0027 supersedes that model with the standard
sequence:

```text
verify exact revision -> build once -> deploy exact artifact -> live readback
```

Independent build and proof may run in parallel. Provider-native cancellation
or latest-wins queue coalescing is conditional on measured saturation. Custom
“green watermark” or “selected snapshot” terminology is not required to express
those established mechanisms. ADR-0022 remains historical rationale rather than
active teaching.

## CI correction

CI executes evidence; it is not a second architecture or policy authority.
Blocking admission is limited to a named material failure decided from the
authoritative compiler, schema, dependency/build graph, resolved artifact,
provider observation, public surface, or executable behavior.

Repository-wide vocabulary bans, PR-body classifiers, manifest-token presence,
workflow script-name coupling, and tests that assert standards prose are
presentational proxies. They may turn green without changing the claimed
architecture or product behavior and are therefore removed, replaced, moved
off the critical path, or retained only when exact bytes are themselves the
governed security/publication surface. The Skills repository applies this
decision by removing its own prose-presence, public-vocabulary, workflow-name,
and duplicated-policy tests while retaining catalog/schema and executable
runtime behavior proof.

### Deleted-test disposition

The deletion was reviewed against the parent revision rather than accepted from
the smaller test count:

| Removed surface | What it actually decided | Disposition |
| --- | --- | --- |
| `ci-runner-profile.test.mjs` | Workflow label strings and runner-standard prose | Retired proxy. Provider scheduling is the runtime fact; exact prose is not CI authority. |
| `delegation-policy.test.mjs` | A hand-authored classifier plus standards-text regexes | Retired self-proof. The cases remain non-blocking evaluation inputs; native selection is not claimed from them. |
| `method-portfolio.test.mjs` | Authored routing answers, fixture shape, and extensive standards-text presence | Retired as blocking authority. Catalog/package integrity remains executable; runtime routing needs separate behavioral evaluation. |
| `prompt-architecture.test.mjs` | A hand-authored specificity classifier plus prose presence | Retired self-proof. Its fixtures remain development inputs only. |
| `throughput-contract.test.mjs` | Cross-file regex assertions that selected sentences still exist | Retired prose coupling. It did not exercise work, delivery, CI, or Enact behavior. |
| Removed blocks in `runtime.test.mjs`, `system-architecture-standard.test.mjs`, and `catalog.test.mjs` | Product names, documentation wording, standards prose, and badge text | Retired presentation checks. Executable install, sync, recovery, schema, profile, digest, and catalog tests remain. |

No deleted test executed a product behavior, compiler boundary, schema
transition, package digest, installer mutation, recovery path, or provider
observation. Restoring those assertions would increase green counts without
restoring a lost semantic oracle.

## Rejected directions

### Ban every new idea

Rejected because standards may not cover a real product, domain, scale, or
failure requirement. The rule demands comparative evidence rather than
conformity for its own sake.

### Combine the best part of every standard

Rejected because pattern stacking multiplies state, coupling, failure modes,
and explanation cost. Each added mechanism must satisfy a distinct activation
predicate.

### Let the custom mechanism define its own success

Rejected because internal statuses can faithfully prove that steps executed
without proving that the system gained a capability, guarantee, or quality
improvement.

### Use complexity or novelty as evidence of frontier quality

Rejected because sophistication of presentation is not an observable outcome.

## Sources

- ISO/IEC/IEEE 42010:2022, *Software, systems and enterprise — Architecture
  description*: <https://www.iso.org/standard/74393.html>
- ISO/IEC 25010:2023, *Systems and software Quality Requirements and Evaluation
  (SQuaRE) — Product quality model*: <https://www.iso.org/standard/78176.html>
- Carnegie Mellon SEI, *Architecture Tradeoff Analysis Method Collection*:
  <https://www.sei.cmu.edu/library/architecture-tradeoff-analysis-method-collection/>
- RFC 3439, *Some Internet Architectural Guidelines and Philosophy*:
  <https://www.rfc-editor.org/rfc/rfc3439>
- DORA, *Trunk-based development*:
  <https://dora.dev/capabilities/trunk-based-development/>
