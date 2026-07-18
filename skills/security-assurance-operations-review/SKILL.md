---
name: security-assurance-operations-review
description: "Prepare or audit one truthful customer security-assurance packet and its claim-evidence operating loop across questionnaires, procurement responses, trust-center content, gated reports, control mappings, gaps, exceptions, commitments, freshness, access, and revocation. Use when the primary artifact is what the company may say and prove about current security. Do not use for security implementation, threat modeling, penetration testing, vulnerability remediation, incident response, compliance audit execution, or contract redlining."
---

# Security Assurance Operations Review

Answer customer security questions from current scoped evidence, not confidence,
templates, sales pressure, or planned controls.

## Workflow

1. Define the requester, decision, deadline, product/environment/tenant scope,
   data classes, jurisdictions if relevant, requested assurance, distribution
   audience, confidentiality, and any proposed commitment.
2. Establish current authority: control/evidence system of record, product and
   configuration facts, policies, diagrams, audit/certification reports,
   penetration-test summaries, subprocessor and data-flow registers, incident or
   status statements, legal terms, existing commitments, and evidence access rules.
3. Read `references/security-assurance-operations.md`.
4. Decompose every question into atomic claims. Classify each as current
   operating fact, independent assurance, customer-configurable, partial,
   compensating control, planned, gap, not applicable, unknown, or owner-blocked.
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
   Never auto-invent a claim, commitment, certification, or new evidence.
10. Produce the response packet, claim-evidence register, access package, gap and
    commitment handoffs, release decision, and stale-claim automation plan.

## Source verification

Use the current canonical control/evidence register and primary product,
configuration, policy, audit, certification, data-flow, subprocessor, incident,
legal, and commitment artifacts. Record exact scope, version, period, caveat,
owner, and audience. Copied questionnaire answers, marketing pages, and model
memory are not evidence.

## Routing boundaries

- The owning engineering/security boundary and `engineering-standard` own control design, implementation,
  threat modeling, testing, vulnerability remediation, and production proof.
- `incident-standard` plus the current security/legal owners govern incident response,
  coordinated disclosure, customer notification, and exploit-sensitive wording.
- Auditors and certification authorities own independent assurance conclusions;
  this skill records their exact scope and status without interpreting beyond them.
- `enterprise-contract-operations-review` owns contract redlines and accepted
  obligations; this skill supplies exact current facts and flags unsupported asks.
- `privacy-data-lifecycle-review` owns privacy, retention, deletion, residency,
  subprocessor, and data-rights operating design; consume its current evidence.
- Trust-center UI, document portal implementation, IAM, and audit logging remain
  implementation work; this skill owns the claims, evidence, and access contract.

## Guardrails

- Never answer yes because a control is common, planned, partially implemented,
  enabled for another product, or true only for one customer configuration.
- Never invent or overstate certification, audit, penetration test, encryption,
  key management, SSO/RBAC, logging, retention, deletion, residency, subprocessor,
  incident, vulnerability, insurance, SLA, uptime, or AI-data-use facts.
- Never broaden a report, policy, screenshot, owner attestation, or independent
  assessment beyond its product, environment, period, control, and caveats.
- Never expose credentials, customer data, raw vulnerability details, exploit
  paths, unrestricted architecture, evidence-room links, or internal backlog.
- Never send sensitive reports without current identity, company, purpose,
  terms, authorization, expiry, and an auditable revocation path.
- Never turn roadmap intent or gap mitigation into a contractual commitment
  without the authorized contract owner and a durable obligation record.
- Prefer `unknown`, `not_verified`, or a scoped caveat to fabricated certainty.

## Output

```text
Assurance decision and scope:
- requester / product-environment / data / audience / deadline / commitment risk

Claim-evidence register:
| Claim ID | Atomic claim | Classification | Scope | Evidence/version | Caveat | Sensitivity | Owner | Freshness | Release |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Response packet:
| Request | Approved response | Claim IDs | Evidence shared | Access tier | Follow-up |
| --- | --- | --- | --- | --- | --- |

Gaps, exceptions, and commitments:
- exact ask / current fact / risk / canonical owner / due / expiry / blocked wording

Automation and release:
- reuse / stale-conflict block / access expiry-revocation / derived surfaces
- release / release with caveat / follow-up required / decline
```
