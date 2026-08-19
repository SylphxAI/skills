# Security Assurance Operations

## Current source check

Security posture changes with products, environments, configurations, vendors,
audits, incidents, policies, and contracts. At use time retrieve the current
control/evidence register, product capability and configuration sources,
policies, data flows, architecture summaries, audit/certification artifacts,
approved penetration-test or vulnerability summaries, subprocessor register,
status/incident statements, legal terms, and existing customer commitments.

Record canonical location or revision, exact version/date, product and
environment scope, owner, evidence class, audience, sensitivity, caveat, review
or validity period, and supersession state. A copied prior questionnaire answer
is a lead to the canonical claim, not evidence itself.

## Claim and evidence model

Make each claim atomic enough to evaluate independently. Use one narrow answer
per claim with its exact scope and assurance basis.

### Claim record

```text
claim and canonical wording
allowed derived wording
classification
product / service / environment / region / tenant configuration / data class
control or requirement mapping
supporting sources and strength
effective date / observed period / review date / expiry
caveat / exception / customer action required
public / gated / named-account / internal-only audience
security / product / privacy / legal / contract owner
commitment status and obligation reference when applicable
supersession and refresh trigger
```

### Response basis

| Situation | Response |
| --- | --- |
| Current operating result | State the exact product scope and observation date |
| Independent assessment or certification | State the assessed scope, status, date, and limits |
| Customer-configured control | State the required configuration and current supporting result |
| Partial coverage | State the covered and open scope |
| Alternate current control | State its owner, effect, limits, and expiry |
| Approved plan | State it as a plan with owner and target date |
| Product gap | State the gap and route the product decision |
| Irrelevant requirement | State why it does not govern this product scope |
| Missing or conflicting current source | Open an exact owner request and hold the affected claim |
| Commitment or interpretation owned elsewhere | Supply the scoped facts to that owner |

Owner attestation, direct operating results, policy, independent reports,
certification, and contractual promises remain distinct sources.

## Operating method

- Scope the requester, decision, product environment, data, configuration,
  region, period, audience, and commitment before answering.
- Split compound questions into claims with one clear owner and product scope.
- Match each material claim to its current source, date, caveat, sensitivity,
  and permitted audience.
- Derive questionnaire, trust-center, sales, and support wording from the same
  scoped claim and current source.
- Protect sensitive material by identity, company, purpose, authorization,
  expiry, audit, revocation, and least disclosure.
- Route product gaps, alternate controls, remediation, roadmap, and commitments
  to their owners with an expiry or review date.
- Refresh affected claims after material product, architecture, configuration,
  vendor, policy, report, incident, or contract changes.
- Automate matching, freshness, conflict detection, access expiry, drafting,
  and recurring-question learning within the approved source and audience.
- Feed recurring verified requests into product and control-owner priorities.

## Question decomposition and response classes

Translate binary questionnaire wording into the actual decision boundaries:

| Ask | Decompose into |
| --- | --- |
| Encryption | data class, transit/at-rest/in-use boundary, service, key authority, exceptions |
| SSO/RBAC | plan/product, protocol, roles, enforcement point, default/configuration, audit |
| Logging | event types, actor/target, retention, customer visibility, integrity, export |
| Residency | data category, storage/processing/backup/log/support, region, vendor, exception |
| Retention/deletion | data class, trigger, period, backup/search/log propagation, legal hold |
| Incident response | operating process versus contract notice, scope, evidence, current owner |
| Vulnerability testing | method, assessor, dates, scope, exclusions, remediation status, shareability |
| Certification/compliance | scheme, certifying/assessment body, exact entity/product, period, limitations |
| AI data use | purpose, route/provider, retention/training, retrieval/memory, controls, opt-out |
| Subprocessors | current vendor, purpose, data category, location, effective/notice state |

Record whether the response is current, needs a scoped caveat, needs owner
follow-up, omits an unsupported claim, or keeps sensitive material inside its
approved audience. State the scoped claim and the sharing decision separately.

## Evidence strength, scope, and access

| Evidence | Strong for | Additional evidence required | Typical access |
| --- | --- | --- | --- |
| Current system/config readback | exact configured/deployed state | operating history and independent assurance | named internal/gated summary |
| Current control test/result | tested control and candidate scope | continuous operation across the required period | gated/internal |
| Policy/process record | approved obligation/process | execution readback | public or gated by sensitivity |
| Audit/certification report | independent scoped assessment and period | separate assessment for additional products, controls, or future states | gated and terms-bound |
| Pen-test summary/letter | exact assessment scope and date | broader vulnerability coverage through layered assurance | restricted gated |
| Architecture/data-flow artifact | designed/current boundaries if verified | operating-effectiveness tests | redacted/gated |
| Owner attestation | accountable statement and open facts | independent and continuous evidence | internal/gated with caveat |
| Customer contract/exception | accepted obligation for named scope | separate authority for platform-wide capability | named-account restricted |

State the intended audience and access requirements for each item: public
summary, authenticated business recipient, terms-protected recipient,
customer-specific recipient, or authorized internal roles. Apply owner
authorization, purpose, expiry, and least disclosure appropriate to that
audience.

Watermarking may deter uncontrolled redistribution but is not access control.
Record views/downloads only within current privacy and retention authority.

## Freshness and conflict control

Expire or revalidate claims on both cadence and change triggers:

- product, environment, region, plan, or configuration changes;
- architecture, encryption/key, identity, logging, retention, backup, or data-flow changes;
- model/provider, subprocessor, or hosting changes;
- audit/certification start/end, new report, exception, or finding;
- vulnerability, incident, status, remediation, or disclosure change;
- policy, law, contract, SLA, insurance, or customer obligation change;
- evidence owner departure or canonical source replacement.

If two sources disagree, block the claim and identify the exact conflict,
canonical owner, decision effect, and due date. Preserve prior released wording
and recipients so correction can be scoped.

## Gaps, exceptions, and commitments

| State | Assurance action | Owner handoff |
| --- | --- | --- |
| Documentation gap | block broad claim; request current evidence | security/product evidence owner |
| Current product gap | state unsupported scope and mitigation if verified | product/security decision |
| Compensating control | state exact current operation, evidence, limits, expiry | control/risk owner |
| Customer-specific exception | keep named scope, risk, evidence, expiry, renewal | security exception/contract owner |
| Planned remediation | label planned; promise only with explicit authority | roadmap/project owner |
| Contract ask | provide current facts and unsupported delta | `review-domain` (`enterprise-contract-operations`) |
| Independent assurance ask | provide exact current status or no-assurance statement | audit/compliance authority |

Every accepted commitment requires a durable obligation ID, exact wording,
account/product scope, owner, due/effective date, evidence required, renewal and
change triggers, and conflict mapping back to the claim register.

## Assurance workflow

```text
request_ingested -> scope_and_question_normalized -> claim_candidates_matched
claim_candidates_matched -> evidence_version_and_access_checked
checked -> draft_or_blocked -> authorized_release -> access_and_followup_tracked
source_change -> dependent_claims_staled -> derived_surfaces_blocked_or_recalled
recurring_question -> canonical_claim_or_product_gap_proposed
```

Automation may parse questionnaire rows, decompose compound asks, map claim IDs,
retrieve permitted evidence metadata, detect scope conflict or staleness, generate
bounded drafts, route exact gaps, enforce access expiry, revoke superseded links,
and update derived surfaces from approved claims. Source approval, control
operation, caveat changes, audience expansion, and contract or public claims
require their designated owner authority.

## Decision table and owner handoffs

| Situation | Assurance decision | Canonical owner |
| --- | --- | --- |
| Current scoped claim and evidence agree | release exact bounded response | assurance claim owner |
| Evidence current but sensitive | release summary; provide exact artifact through its access-controlled path | evidence/access owner |
| Evidence stale, absent, or conflicting | request exact current source | control/product owner |
| Buyer asks for unsupported commitment | state gap; commitment remains pending owner approval | enterprise contract owner |
| Question requires privacy interpretation | supply current facts | `design-privacy-lifecycle` |
| Question requires security design or remediation | state the assessment boundary | owning product repository and security engineering owner |
| Incident/vulnerability wording requested | consume approved statement only | incident/security/legal owner |
| Trust-center content needs update | derive from approved current claims | trust content implementation owner |
| Evidence has been superseded | revoke and trace affected responses | evidence owner and assurance reconciler |

Each handoff includes request/claim ID, exact scope, current evidence, missing
decision, requested artifact, due date, affected response, and expiry.

## Operating measures

Measure time to scoped response, claim reuse from current evidence, stale/conflict
block rate, evidence refresh latency, unanswered/declined items, sensitive-access
expiry and revocation, repeated-question concentration, gap age, exception expiry,
commitment completion, correction/recall, and deal/support outcomes. Truth takes
precedence over the percentage of yes answers and response speed.
