---
name: review-operational-observability
description: "Review operational observability and produce one actionable assessment."
---

# Review Operational Observability

Produce one **Operational Observability Contract** that lets an authorized
operator explain service behavior, detect material degradation, diagnose causes,
act safely, and verify recovery without exposing raw internal evidence through
customer or public contracts.

## Scope

Own service/user journeys to signals, telemetry semantics and correlation,
collection and processing, SLIs/SLOs, alert-to-action routing, operator views,
diagnostic access, privacy/security, retention, cardinality/cost, fault
validation, and blind spots. Keep logs, metrics, traces, profiles, synthetics,
and events together when they answer the same operating questions; organize the
Skill around operator questions rather than telemetry medium.

Read [references/operational-observability-contract.md](references/operational-observability-contract.md)
for signal, audience, SLO, alert, validation, and public-boundary patterns.

## Workflow

1. Name the exact service boundary, owners, users/tenants, critical journeys,
   dependencies, deployment units, failure domains, data sensitivity, and
   operator decisions. Begin with operator questions, then select telemetry products.
2. For each material success, degradation, failure, retry, recovery, and
   saturation path, state the question an operator must answer and the minimum
   correlated signals required to answer it.
3. Define stable semantic fields, units, clocks, resource/service identity,
   version, environment, tenant/actor scope where safe, trace and request
   context, error taxonomy, causality, sampling, and missing-signal behavior.
4. Map service objectives to SLIs, SLOs or explicit operating thresholds,
   measurement windows, exclusions, data-quality requirements, burn or breach
   conditions, and action owners. Page only on conditions that require timely
   action; route the rest to review, automation, or backlog.
5. Design operator journeys from alert or report through correlated evidence,
   hypothesis, safe action, runbook, rollout/rollback, recovery verification,
   and incident handoff. A dashboard without a decision or action consumer is
   not an observability contract.
6. Classify every output by audience and purpose: protected operator,
   privileged support/security, authorized tenant/customer, public status, or
   external protocol. Raw internal telemetry remains protected. Customer or
   public state is a separate allowlisted product/status/protocol projection.
7. Bound collection and processing: redaction before export, access, tenancy,
   residency, retention/deletion, high-cardinality controls, tail/head sampling,
   ingestion failure, buffering/backpressure, cost budgets, provider failure,
   and observability-of-observability.
8. Prove the contract with schema/semantic checks, representative traffic,
   synthetic journeys, fault injection, missing/corrupt signal cases,
   alert/action tests, public negative-leakage tests, and recovery readback.

## Composition

- The owning product repository owns binding implementation predicates for
  durable product code, contracts, and runtime paths.
- `engineer-agent-context` and the owning runtime telemetry cover
  model, tool, and delegation traces plus agent-specific operator views.
- `run-incident-response` owns an active incident's severity, mitigation, recovery,
  communication, and postmortem lifecycle.
- `review-product-analytics-instrumentation` owns product behavior events and
  decision metrics, not service health or operator diagnostics.
- `review-data-quality-observability` owns dataset and pipeline reliability.
- `model-security-threats` owns a material new or changed diagnostic trust
  boundary or exposure threat model.

## Principles

- Observability is authorized inspectability.
- Public or customer responses use an intentional product, status, support, incident, audit, or protocol contract: named audience, authorization, allowlisted schema, stable semantics, and leakage tests.
- Public errors carry opaque correlation identifiers. Protected evidence stays inside the operator boundary.
- Debugging uses bounded, authorized traces. Secrets, unrestricted payloads, hidden chain-of-thought, and personal data stay out of the debug shortcut.
- Telemetry is evidence about system behavior. Payment, entitlement, permission, workflow, and domain-state authority stay with those owners.
- Health/readiness, successful rollout, and customer outcome are separate claims.
- Missing telemetry is `unknown`. Instrumentation failure is itself observable.

## Output

Return one Operational Observability Contract containing:

1. service boundary, critical journeys, dependencies, failure domains, owners,
   and operating questions;
2. selected applicable signal map across logs, metrics, traces, profiles,
   synthetics, events, and authoritative non-telemetry state, with a reasoned
   reason for omitting signal families outside the actual failure model;
3. semantic field/context/correlation/error/sampling contract;
4. SLI/SLO/threshold, alert, action, escalation, and recovery-verification map;
5. operator, support/security, tenant/customer, public-status, and protocol
   audience projections with access and minimum-disclosure rules;
6. collection pipeline, privacy/security, retention, residency, cardinality,
   cost, capacity, and failure behavior;
7. dashboards, queries, runbooks, automation, and incident handoffs; and
8. validation fixtures, fault cases, negative leakage tests, blind spots,
   rollout/readback, and ownership.

Complete only when material operating questions can be answered from correlated
authorized evidence, alerts lead to bounded actions, failure and recovery are
testable, and no raw internal process state is part of an unintended public or
customer contract.
