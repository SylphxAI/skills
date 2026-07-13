# Security Assurance Operations

## Contents

- [Current-authority protocol](#current-authority-protocol)
- [Claim and evidence model](#claim-and-evidence-model)
- [Operating state model](#operating-state-model)
- [Rule IDs](#rule-ids)
- [Question decomposition and response classes](#question-decomposition-and-response-classes)
- [Evidence strength, scope, and access](#evidence-strength-scope-and-access)
- [Freshness and conflict control](#freshness-and-conflict-control)
- [Gaps, exceptions, and commitments](#gaps-exceptions-and-commitments)
- [Agent-first assurance loop](#agent-first-assurance-loop)
- [Decision table and owner handoffs](#decision-table-and-owner-handoffs)
- [Operating measures](#operating-measures)

## Current-authority protocol

Security posture changes with products, environments, configurations, vendors,
audits, incidents, policies, and contracts. At use time retrieve the current
control/evidence register, product capability and configuration sources,
policies, data flows, architecture summaries, audit/certification artifacts,
approved penetration-test or vulnerability summaries, subprocessor register,
status/incident statements, legal terms, and existing customer commitments.

Record canonical location or artifact ID, exact version/date, product and
environment scope, owner, evidence class, audience, sensitivity, caveat, review
or validity period, and supersession state. A copied prior questionnaire answer
is a lead to the canonical claim, not evidence itself.

## Claim and evidence model

Make each claim atomic enough to prove or reject independently. Avoid compound
answers such as "we encrypt all data and are compliant".

### Claim record

```text
claim_id
canonical wording and allowed derived wording
classification
product / service / environment / region / tenant configuration / data class
control or requirement mapping
evidence IDs and evidence strength
effective date / observed period / review_at / expires_at
caveat / exception / customer action required
public / gated / named-account / internal-only audience
security / product / privacy / legal / contract owner
commitment status and obligation ID when applicable
supersedes / superseded_by / stale trigger
```

### Classifications

| Class | Meaning | Permitted response |
| --- | --- | --- |
| `current_operating_fact` | current scoped behavior has direct evidence | state exact scope and evidence date |
| `independently_assured` | external assessment/certification covers exact scope | quote status and limits only |
| `customer_configurable` | available only when customer configures it | state dependency and evidence |
| `partial` | some scope/control elements operate | state what does and does not |
| `compensating_control` | alternate current control addresses bounded risk | state owner, evidence, limits, expiry |
| `planned` | approved intent without current operation | never answer as implemented |
| `gap` | requested control/claim is unsupported | state truthfully; route decision |
| `not_applicable` | requirement genuinely does not apply to scoped product | give reason and authority |
| `unknown` | current authority unavailable or conflicting | block claim; open exact request |
| `owner_blocked` | interpretation or commitment needs another authority | supply facts, not conclusion |

An owner attestation is not equivalent to independent assurance or continuous
operating evidence. A design document is not proof that the control is deployed.

## Operating state model

```text
request_received -> scope_locked -> questions_decomposed -> claims_matched
claims_matched -> evidence_current_or_blocked -> response_derived -> release_decided
release_decided -> access_granted_if_needed -> sent -> followup_and_obligations_tracked

evidence_stale_or_conflicting -> claim_blocked -> owner_request
artifact_superseded -> access_revoked -> dependent_claims_rechecked
material_product_change -> claims_expired -> revalidation
```

## Rule IDs

- `security-assurance-1` — Lock requester, decision, product/environment, data,
  configuration, region, period, audience, and commitment scope before answering.
- `security-assurance-2` — Decompose compound questions into atomic versioned
  claims whose truth and evidence can be managed independently.
- `security-assurance-3` — Classify current fact, independent assurance,
  configurable, partial, compensating, planned, gap, N/A, unknown, and owner block.
- `security-assurance-4` — Map every material claim to exact evidence with scope,
  strength, date, caveat, owner, sensitivity, freshness, and permitted audience.
- `security-assurance-5` — Derive questionnaires, trust center, sales, support,
  and evidence-room views from one canonical claim register without widening scope.
- `security-assurance-6` — Keep owner attestation, direct operating evidence,
  policy, independent report, certification, and contractual promise distinct.
- `security-assurance-7` — Block stale, conflicting, missing, superseded, or
  wrong-scope evidence; unknown is safer than fabricated certainty.
- `security-assurance-8` — Gate sensitive evidence by identity, company, purpose,
  terms, authorization, expiry, audit, revocation, and least disclosure.
- `security-assurance-9` — Track gaps, compensating controls, exceptions,
  remediation, roadmap, and commitments as separate owner artifacts with expiry.
- `security-assurance-10` — Never convert approved answer wording into a new
  public, legal, contractual, compliance, or security commitment implicitly.
- `security-assurance-11` — Invalidate dependent claims after product,
  architecture, configuration, vendor, policy, report, incident, or contract change.
- `security-assurance-12` — Automate matching, freshness, conflict, access expiry,
  derived drafting, and recurring-question learning; not truth creation.
- `security-assurance-13` — Keep security implementation, audits, testing,
  incidents, disclosure, privacy operations, and contract redlines with their owners.
- `security-assurance-14` — Revoke superseded evidence and derived answers; never
  rely on a warning beside an artifact that remains shareable as current proof.
- `security-assurance-15` — Feed recurring verified asks into product and control
  owner priorities without letting deal pressure rewrite present truth.

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

Response states are `approved_current`, `approved_with_caveat`,
`followup_required`, `decline_to_claim`, and `decline_to_share`. A refusal to
share sensitive detail does not imply the control exists; provide the scoped
claim and reason separately.

## Evidence strength, scope, and access

| Evidence | Strong for | Cannot prove by itself | Typical access |
| --- | --- | --- | --- |
| Current system/config readback | exact configured/deployed state | historical operation or independent assurance | named internal/gated summary |
| Current control test/result | tested control and candidate scope | continuous operation outside sample | gated/internal |
| Policy/process record | approved obligation/process | actual execution | public or gated by sensitivity |
| Audit/certification report | independent scoped assessment and period | products/controls outside scope or future state | gated and terms-bound |
| Pen-test summary/letter | exact assessment scope and date | absence of all vulnerabilities | restricted gated |
| Architecture/data-flow artifact | designed/current boundaries if verified | operating effectiveness | redacted/gated |
| Owner attestation | accountable statement and open facts | independent or continuous proof | internal/gated with caveat |
| Customer contract/exception | accepted obligation for named scope | platform-wide capability | named-account restricted |

Access tiers:

1. `public` — approved summary safe for unauthenticated publication.
2. `authenticated_buyer` — gated to verified business identity and purpose.
3. `terms_bound` — NDA/terms plus owner authorization and expiry.
4. `named_account_restricted` — customer-specific evidence or commitment.
5. `internal_only` — exploit-sensitive, customer, credential, raw vulnerability,
   or security-operational material that must not be shared.

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

If two sources disagree, do not choose the more favorable answer. Block the
claim, identify the exact conflict, canonical owner, decision effect, and due
date. Preserve prior released wording and recipients so correction can be scoped.

## Gaps, exceptions, and commitments

| State | Assurance action | Owner handoff |
| --- | --- | --- |
| Documentation gap | block broad claim; request current evidence | security/product evidence owner |
| Current product gap | state unsupported scope and mitigation if verified | product/security decision |
| Compensating control | state exact current operation, evidence, limits, expiry | control/risk owner |
| Customer-specific exception | keep named scope, risk, evidence, expiry, renewal | security exception/contract owner |
| Planned remediation | label planned; do not promise unless authorized | roadmap/project owner |
| Contract ask | provide current facts and unsupported delta | `enterprise-contract-operations-review` |
| Independent assurance ask | provide exact current status or no-assurance statement | audit/compliance authority |

Every accepted commitment requires a durable obligation ID, exact wording,
account/product scope, owner, due/effective date, evidence required, renewal and
change triggers, and conflict mapping back to the claim register.

## Agent-first assurance loop

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
and update derived surfaces from approved claims. It must not approve itself as a
new source, infer control operation, remove caveats, expand audience, or create a
contract/public claim without authority.

## Decision table and owner handoffs

| Situation | Assurance decision | Canonical owner |
| --- | --- | --- |
| Current scoped claim and evidence agree | release exact bounded response | assurance claim owner |
| Evidence current but sensitive | release summary; gate exact artifact | evidence/access owner |
| Evidence stale, absent, or conflicting | block and request exact source | control/product owner |
| Buyer asks for unsupported commitment | state gap; no promise | enterprise contract owner |
| Question requires privacy interpretation | supply current facts only | `privacy-data-lifecycle-review` |
| Question requires security design or remediation | no implementation claim | security engineering/Doctrine |
| Incident/vulnerability wording requested | consume approved statement only | incident/security/legal owner |
| Trust-center content needs update | derive from approved current claims | trust content implementation owner |
| Evidence has been superseded | revoke and trace affected responses | evidence owner and assurance reconciler |

Each handoff includes request/claim ID, exact scope, current evidence, missing
decision, requested artifact, due date, affected response, and expiry.

## Operating measures

Measure time to scoped response, claim reuse from current evidence, stale/conflict
block rate, evidence refresh latency, unanswered/declined items, sensitive-access
expiry and revocation, repeated-question concentration, gap age, exception expiry,
commitment completion, correction/recall, and deal/support outcomes. Never optimize
the percentage of yes answers or response speed at the expense of truth.
