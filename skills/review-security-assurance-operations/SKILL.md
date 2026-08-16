---
name: review-security-assurance-operations
description: "Review security assurance operations and produce one actionable assessment."
---

# Review Security Assurance Operations

Answer customer security questions from current scoped evidence, not confidence,
templates, sales pressure, or planned controls.

## Workflow

1. Define the requester, decision, deadline, product/environment/tenant scope,
   data classes, jurisdictions if relevant, requested assurance, distribution
   audience, confidentiality, and any proposed commitment.
2. Confirm current sources: control/evidence system of record, product and
   configuration facts, policies, diagrams, audit/certification reports,
   penetration-test summaries, subprocessor and data-flow registers, incident or
   status statements, legal terms, existing commitments, and evidence access rules.
3. Read `references/security-assurance-operations.md`.
4. Decompose every question into atomic claims. Classify each as current
   operating fact, independent assurance, customer-configurable, partial,
   alternate current control, approved plan, product gap, reason for omission,
   missing current source, or commitment owned elsewhere.
5. Map each material claim to exact evidence with scope, environment, version,
   date, evidence strength, sensitivity, caveat, owner, expiry, and permitted
   audience. Conflict or stale evidence blocks reuse.
6. Produce one canonical answer from the claim register, then derive public,
   gated, buyer-specific, sales-safe, and support-safe views without broadening
   scope or changing commitments.
7. Route gaps, security exceptions, legal interpretations, roadmap statements,
   and post-signature commitments to their owners with expiry and evidence due.
8. Define access, terms/NDA, approval, watermarking when appropriate, view/download
   audit, expiry, revocation, and follow-up for sensitive evidence.
9. Automate ingestion, claim matching, evidence-freshness checks, stale/conflict
   blocking, draft generation, access expiry, and recurring-question learning.
   Claims, commitments, certifications, and evidence require their designated
   human or system authority.
10. Produce the response packet, claim-evidence register, access package, gap and
    commitment handoffs, release decision, and stale-claim automation plan.

## Current sources

Use the current canonical control/evidence register and primary product,
configuration, policy, audit, certification, data-flow, subprocessor, incident,
legal, and commitment artifacts. Record exact scope, version, period, caveat,
owner, and audience. Copied questionnaire answers, marketing pages, and model
memory are not evidence.

## Routing boundaries

- `model-security-threats` owns threat and security-design contracts. The
  owning product repository owns implementation, testing, vulnerability
  remediation, and production proof.
- `run-incident-response` plus the current security/legal owners govern incident response,
  coordinated disclosure, customer notification, and exploit-sensitive wording.
- Auditors and certification authorities own independent assurance conclusions;
  this skill records their exact scope and status without interpreting beyond them.
- `review-enterprise-contract-operations` owns contract redlines and accepted
  obligations; this skill supplies exact current facts and flags unsupported asks.
- `design-privacy-lifecycle` owns privacy, retention, deletion, residency,
  subprocessor, and data-rights operating design; consume its current evidence.
- Trust-center UI, document portal implementation, IAM, and audit logging remain
  implementation work; this skill owns the claims, evidence, and access contract.

## Principles

- Yes means a current operating fact for this product, environment, and configuration.
- Certification, audit, penetration test, encryption, key management, SSO/RBAC, logging, retention, deletion, residency, subprocessor, incident, vulnerability, insurance, SLA, uptime, and AI-data-use facts come from scoped evidence.
- A report, policy, screenshot, attestation, or assessment keeps its product, environment, period, control, and caveats.
- Credentials, customer data, raw vulnerability details, exploit paths, unrestricted architecture, evidence-room links, and internal backlog stay inside the authorized audience.
- Sensitive reports travel with current identity, company, purpose, terms, authorization, expiry, and an auditable revocation path.
- Roadmap intent and gap mitigation become commitments only through the authorized contract owner and a durable obligation record.
- State what is known, what remains unverified, and any scoped caveat.

## Output

```text
Assurance decision and scope:
- requester / product-environment / data / audience / deadline / commitment risk

Claim-evidence register:
| Atomic claim | Classification | Scope | Evidence/version | Caveat | Sensitivity | Owner | Freshness | Release |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Response packet:
| Request | Approved response | Claims used | Evidence shared | Access tier | Follow-up |
| --- | --- | --- | --- | --- | --- |

Gaps, exceptions, and commitments:
- exact ask / current fact / risk / canonical owner / due / expiry / blocked wording

Automation and release:
- reuse / stale-conflict block / access expiry-revocation / derived surfaces
- release / release with caveat / follow-up required / decline
```
