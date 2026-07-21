---
name: requirements-engineering
description: "Elicit, analyze, negotiate, specify, validate, trace, and govern stakeholder and user needs for a new or materially changed product, system, service, capability, or integration, producing a Requirements Contract. Use when functional behavior, quality attributes, constraints, scenarios, interfaces, acceptance evidence, and change impact must be agreed before or alongside design. Do not use for open-ended product discovery, architecture selection, implementation decomposition after requirements are stable, a trivial unambiguous edit, or final delivery verification."
---

# Requirements Engineering

Produce one **Requirements Contract** that states what outcome and observable
behavior the system must provide without prematurely hiding a design choice
inside a requirement. Read
[references/requirements-method.md](references/requirements-method.md) before
baselining the contract.

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

## Integrity rules

- Do not write implementation choices as requirements unless an external
  constraint or accepted decision truly fixes that choice.
- Avoid `fast`, `secure`, `scalable`, `user-friendly`, `robust`, or `best
  practice` without observable context and acceptance boundaries.
- Acceptance criteria are not complete requirements when purpose, context,
  affected parties, failure behavior, or quality constraints are missing.
- Do not make every conceivable quality attribute mandatory. Include what the
  outcome, environment, authority, or material risk justifies.
- Do not treat priority labels, stakeholder seniority, generated prose, or
  internal consistency as validation evidence.
- Do not publish raw stakeholder evidence, contract/security details, misuse
  cases, internal process state, or diagnostic sources merely because a
  Requirements Contract is committed. A public/customer derivative has a named
  audience, purpose, minimum allowlist, authorization where applicable, and
  negative leakage review; it points opaquely to protected evidence.
- Keep requirements, architecture decisions, work items, tests, and observed
  delivery as linked artifacts with distinct owners.

## Boundaries

- `user-research-and-discovery` and whole-product blueprint Skills own direct
  user evidence, opportunity, user promise, market fit, and capability
  selection before requirements stabilize.
- `decision-quality-standard` owns material option selection; architecture and
  engineering Skills own how accepted requirements are realized.
- `specification-control-plane-standard` owns executable implementation
  specifications and work/evaluation contracts after requirements establish
  the required behavior.
- `evidence-and-claims-standard` and `delivery-standard` own factual completion
  and delivered-state claims.
