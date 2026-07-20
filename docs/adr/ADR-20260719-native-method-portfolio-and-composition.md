---
status: accepted
date: 2026-07-19
owners:
  - SylphxAI
---

# ADR-20260719: Publish the useful method portfolio and compose native injection

## Context

Agent runtimes expose package metadata and inject relevant Skill bodies when a
trigger matches. A package therefore carries real metadata, collision,
evaluation, and maintenance cost, but unrelated work need not inherit its full
procedure. Optimizing for a small package count alone would hide useful,
independently requested methods; every package must instead justify that
portfolio cost with precise routing and independent value.

The actual composition risk is semantic collision. Several injected packages
previously acted as if each owned the whole response and independently required
an applicability, evidence, or compliance report. Compound tasks could then
produce duplicate artifacts or competing completion rules.

## Decision

1. Publish every researched method that has a recurring job, a precise trigger,
   a distinct independently useful artifact, and defensible source material.
2. Give a method its own Skill when users can request its artifact directly.
   Put a subordinate technique in the reference material of the Skill that owns
   the surrounding job.
3. Rely on each runtime's native Skill injection. Do not add a meta-router,
   manual selector, or central method orchestrator.
4. Accept that several relevant Skills may be injected together. The primary
   procedure owns each requested artifact; standards constrain that artifact
   and integrate only material obligations, evidence, deviations, and gaps.
   They do not emit separate compliance reports unless conformance is the job.
5. Keep neighbouring triggers explicit. Root-cause analysis, option
   generation, deliberation, selection, exact-candidate review, claim
   adjudication, and communication remain different jobs even when one task
   uses several of them.

The portfolio adds these independently requested methods:

- `structured-deliberation`
- `design-space-exploration`
- `evidence-synthesis`
- `requirements-engineering`
- `user-research-and-discovery`
- `agent-planning-system-review`
- `agent-context-engineering`
- `agent-system-improvement`
- `optimization-objective-review`
- `decision-optimization-modeling`
- `provenance-system-design`
- `semantic-taxonomy-design`
- `security-threat-modeling`
- `system-dynamics-analysis`
- `probabilistic-forecasting`
- `causal-inference-analysis`

`enact-work-coordination` is a product adapter. Portable claim, lease,
checkpoint, handoff, and recovery semantics remain in
`work-coordination-standard`; Enact API and product vocabulary do not
become universal method law.

Research-backed subordinate methods—including Bayesian updating, value of
information, ReAct-style action-observation traces, generative and formal
verification, metamorphic and differential testing, assurance cases, truth
maintenance, CRDT convergence, counterfactual evaluation, protected holdouts,
and coordination protocols—live as references under their natural owner.

## Consequences

- Agents can receive the complete useful method set without having to know or
  manually choose package names.
- More than one package may correctly inject for a compound task; this is not a
  routing failure when artifact ownership and constraints compose.
- Package count is not a quality metric. Value, trigger precision, artifact
  independence, contradiction rate, and observed behavior are.
- Adding a package still carries maintenance and collision cost. A method with
  no independent artifact stays a reference rather than becoming skill-count
  inflation.

## Verification

- Validate every package and reference link.
- Rebuild the catalog from source.
- Keep positive, near-neighbour, abstention, and compound boundary fixtures as
  an authored injection contract, and structurally reject duplicate artifact
  owners or per-standard reports. These fixtures do not prove runtime behavior.
- Prove behavioral injection separately against each supported runtime using
  `skill-eval-designer` when promotion or regression evidence requires it; do
  not build a repository-local router to test a router.
