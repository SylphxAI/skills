---
name: engineer-testable-requirements
description: "Turn requirements into testable acceptance criteria with oracles."
---

# Engineer Testable Requirements

Produce one **Requirements Contract** that states what outcome and observable
behavior the system must provide without prematurely hiding a design choice
inside a requirement. Read
[references/requirements-method.md](references/requirements-method.md) before
baselining the contract.


## When to use
- Needs/requirements must become testable acceptance criteria with oracles and traceability
- Ambiguous adjectives (fast, secure, user-friendly) need observable context and boundaries
- Not for architecture shape (`decide-architecture-shape`) or user research (`research-user-needs`)

## Method

1. Define the subject, system boundary, lifecycle stage, intended outcomes,
   stakeholders, users and affected parties, operating contexts, external
   authorities, assumptions, constraints, and decision owners.
2. Elicit needs from current primary evidence: user research, existing behavior,
   incidents, contracts, policies, regulations, interfaces, operational data,
   and stakeholder input. Label observed need, requested preference, inferred
   need, assumption, and binding constraint separately.
3. Resolve terminology and model contexts, actors, goals, scenarios, state
   transitions, normal flows, alternatives, failures, recovery, misuse, and
   lifecycle events. Expose conflicts and missing authorities before drafting.
4. Derive uniquely identified requirements across functional behavior, data,
   interfaces, quality attributes, safety/security/privacy/accessibility,
   operations, migration, observability, support, retirement, and verification
   where applicable.
5. Make each requirement necessary, feasible, unambiguous, singular, consistent,
   solution-independent where choice remains open, and verifiable. Quantify a
   condition and success boundary when the requirement makes a measurable
   claim; do not invent a number without rationale.
6. Negotiate conflicts using user and stakeholder outcomes, hard authorities,
   risk, evidence, dependency, and lifecycle value. Record rejected or deferred
   needs with rationale rather than silently deleting them.
7. Validate the contract with scenario walkthroughs, examples and
   counterexamples, prototypes or models where useful, interface checks, and
   acceptance-test design. Requirements do not validate themselves.
8. Trace each accepted requirement backward to source need and authority, and
   forward to design owner, implementation evidence, test, release boundary,
   and delivered observation as those artifacts become available.
9. Baseline a version with change authority. For each proposed change, assess
   affected needs, requirements, interfaces, risks, designs, tests, migrations,
   operations, and downstream commitments before superseding the baseline.

## Output contract

Produce a **Requirements Contract** containing:

- artifact identity/version, subject and boundary, stakeholders/affected
  parties, contexts, outcomes, definitions, assumptions, constraints,
  authorities, non-goals, audience, sensitivity, authorized access, retention,
  and any separately versioned public/customer projection;
- stakeholder and user need register with source, rationale, evidence state,
  owner, conflicts, and disposition;
- scenario and state model covering normal, alternate, failure, recovery,
  misuse, migration, and retirement paths as applicable;
- requirement register with stable ID, type, normative statement, rationale,
  source need/authority, conditions, success boundary, verification method,
  owner, and status;
- interface and quality-attribute contracts with operating and failure
  envelopes rather than vague adjectives;
- conflict decisions, rejected alternatives, unresolved authority, risks, and
  exact downstream handoffs;
- bidirectional traceability from need to requirement to design/test/delivery
  evidence without making this artifact the owner of those downstream facts;
  and
- validation record, baseline/change authority, impact analysis, and
  supersession history.

## Path

- Requirements state observable behavior. An implementation choice lands only
  when an external constraint or accepted decision already fixes it.
- Measurable claims carry observable context and acceptance boundaries —
  including `fast`, `secure`, `scalable`, `user-friendly`, `robust`, and
  `best practice`.
- Acceptance criteria sit with purpose, context, affected parties, failure
  behavior, and quality constraints.
- Include the quality attributes the outcome, environment, authority, or
  material risk justifies.
- Validation is walkthroughs, examples, interface checks, and acceptance-test
  design. Priority labels, seniority, generated prose, and internal
  consistency stay inputs.
- A public or customer derivative has a named audience, purpose, allowlist,
  and leakage review. It points opaquely to protected evidence.
- Requirements, architecture decisions, work items, tests, and observed
  delivery stay linked artifacts with distinct owners.


## Progressive disclosure

- [references/requirements-method.md](references/requirements-method.md) — open when needed for depth
- [references/specification-control-plane-standard/](references/specification-control-plane-standard/) — open when this topic applies
- Industry doc homes (Vision · NSM · OKR · PRD vs interface **specs**):
  `../drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`
  — requirements/specs own field-level behavior; they do not replace the North Star Metric.

## Boundaries

- `research-user-needs` and whole-product blueprint Skills own direct
  user evidence, opportunity, user promise, market fit, and capability
  selection before requirements stabilize.
- Per-tool **details** land as requirements → specs/tests/contracts; the **PRD**
  owns the feature/capability **inventory**.
- `../record-structured-deliberation/references/decision-quality-standard/` owns material option selection; architecture and
  engineering Skills own how accepted requirements are realized.
- `references/specification-control-plane-standard/` owns executable implementation
  specifications and work/evaluation contracts after requirements establish
  the required behavior.
- `../drive-to-delivery/` owns driving an accepted objective. Open
  `../synthesize-evidence-brief/` when the job itself is a disputed or
  public claim. Completion stays at the asked requirements terminal.
