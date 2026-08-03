# Operational Observability Contract Patterns

## Work from decisions, not telemetry volume

For each critical journey, record:

```text
journey / success outcome / failure and saturation modes / user impact /
operator question / source of truth / signals / correlation key / SLI or threshold /
alert or review route / authorized audience / action / recovery proof / owner
```

A signal earns its cost when it changes diagnosis, action, verification, or a
declared product/status fact. “Collect everything” is neither a contract nor a
retention policy.

## Signal roles

| Signal | Best use | Frequent failure |
| --- | --- | --- |
| Traces | request/job causality, dependency latency, critical-path breakdown | unbounded attributes, broken context, sampled-away failures |
| Metrics | rates, distributions, saturation, objectives, alert evaluation | unstable units, unbounded labels, averages hiding tails |
| Logs | discrete diagnostic evidence and structured error context | prose blobs, secrets/payloads, missing correlation |
| Profiles | CPU, allocation, lock, and runtime hot paths | continuous high-cost collection without a question |
| Synthetics | known journey availability and boundary checks | testing only the health endpoint |
| Events | material lifecycle transitions and changes | becoming an ungoverned second business event bus |
| Authoritative state | exact desired/observed/domain/deploy facts | treating a dashboard projection as authority |

Use exemplars or shared correlation keys to move between aggregate symptoms and
high-cardinality evidence. Preserve W3C Trace Context across supported boundaries
and constrain baggage because it propagates downstream and can leak data.

## Semantic contract

Every governed signal family names:

- service/resource identity, environment, version or commit, and deployment;
- operation or span name, outcome, duration/unit, error class and cause;
- trace/span/request/job/message identifiers and causation where relevant;
- tenant/actor/object scope only when purpose, authorization, and cardinality
  permit it;
- source clock, event time, observation time, ordering limits, and freshness;
- owner, schema/semantic revision, retention, residency, access class, and
  deletion behavior; and
- sampling or aggregation policy plus how missing data changes interpretation.

Prefer shared semantic conventions over local synonyms. A renamed field or
changed unit is a contract migration, not a dashboard edit.

## Objectives and alerting

Choose indicators from user- or consumer-observable outcomes: availability,
correctness, latency distributions, durability, freshness, throughput, queue
age, or another explicit service promise. Separate indicators from targets and
targets from alert policies.

An actionable alert defines:

```text
condition / window / severity / affected scope / minimum evidence /
dedupe and suppression / owner / automated action / runbook /
escalation / stop or rollback / recovery and close predicate
```

Use multi-window burn or equivalent rate-and-impact logic when an SLO applies.
Page for urgent user harm or exhaustion that needs immediate action; create a
ticket/review for slow trends; automate deterministic reversible responses.
Alerting on every anomaly creates noise and hides real incidents.

## Audience and disclosure matrix

| Audience | Typical content | Default exclusions |
| --- | --- | --- |
| Protected operator | correlated service telemetry and deployment/runtime facts | secrets, unrestricted payloads, unnecessary personal data |
| Privileged support/security | scoped case or threat evidence with audited access | other tenants, irrelevant raw evidence, hidden reasoning |
| Authorized tenant/customer | own job/deploy/import/sync/usage/audit state and safe diagnostics | internal topology, control knobs, other tenants, exploit-enabling detail |
| Public status/incident | approved service availability, affected region/capability, updates | raw logs/traces, unresolved internal hypotheses, host/process details |
| External protocol | fields required or deliberately standardized by that protocol | internal migration state or private extensions without a contract |

Public and customer-visible projections require all of:

1. legitimate product, status, support, incident, audit, legal, or protocol purpose;
2. explicit audience and access rule, with tenant/subject authorization when
   the projection contains tenant- or subject-scoped facts;
3. allowlisted versioned schema and minimum necessary detail;
4. stable semantics and compatibility handling;
5. negative tests for internal, cross-tenant, secret, and exploit-enabling fields.

Examples of legitimate external facts include OAuth-defined error fields,
`Retry-After`, documented rate limits, opaque request IDs, a tenant's own job
status, public incident updates, and customer-owned telemetry in an observability
product. Their legitimacy does not authorize a catch-all `debug`, `metadata`,
`honesty`, or `internal` object.

## Cost, cardinality, and retention

- Set budgets for ingestion rate, storage, query latency, label/attribute
  cardinality, retention, egress, and provider failure.
- Aggregate stable dimensions; move high-cardinality identity into protected
  trace/log evidence or bounded exemplars.
- Use deterministic or probability sampling only with a declared decision
  impact. Preserve errors, rare outcomes, and representative cohorts; measure
  sampling bias.
- Redact or tokenize before telemetry leaves the process/trust boundary.
- Retention follows purpose and data class. Append-only storage does not waive
  deletion, legal, residency, or minimization duties.

## Verification matrix

| Claim | Decisive check |
| --- | --- |
| Critical journey is observable | synthetic or replayed journey produces the declared correlated evidence |
| Failure is diagnosable | fault injection yields the expected error class, dependency edge, and bounded cause path |
| Alert is useful | threshold/burn fixture fires, routes once, names an action, and clears only on recovery evidence |
| Public contract is safe | schema allowlist plus negative leakage fixtures reject internal/cross-tenant fields |
| Sampling is safe | known rare/error cases survive and aggregate estimates remain within declared error |
| Pipeline is reliable | loss, delay, backpressure, exporter/provider failure, and recovery are injected and measured |
| Recovery is proven | service outcome and governing signal return to the declared state; silence alone is insufficient |

## Primary sources

- [OpenTelemetry specification](https://opentelemetry.io/docs/specs/otel/)
- [OpenTelemetry semantic conventions](https://opentelemetry.io/docs/specs/semconv/)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)
- [W3C Baggage](https://www.w3.org/TR/baggage/)
- [Google SRE Workbook: Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [RFC 6749 OAuth 2.0 error response](https://www.rfc-editor.org/rfc/rfc6749#section-5.2)
