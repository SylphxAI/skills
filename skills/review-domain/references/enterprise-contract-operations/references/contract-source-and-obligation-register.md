# Contract Source and Obligation Register

## Document graph

```text
master_agreement
  <- order_form(s)
  <- data_privacy_terms
  <- security_addendum
  <- sla_support_terms
  <- statement_of_work
  <- pricing_usage_exhibit
  <- amendment_or_side_letter(s)
  <- incorporated_policy(versioned)
```

Arrows indicate relationship, not universal precedence. Record clause-level replacement, supplement, conflict rule, effective date, and authority. Preserve unsigned draft and redline lineage but exclude them from executed truth.

## Source record

```text
document_id, family, parties, account_or_tenant, version, status,
effective_and_term_dates, signature_parties_and_times, parent_documents,
incorporated_refs_and_versions, precedence_rules, confidentiality,
canonical_location, integrity_identity, owner, superseded_by
```

## Obligation record

```text
obligation_id, exact_source_document_and_clause, extracted_text,
normalized_summary_and_review_state, obligated_party, beneficiary,
category, trigger, action_or_deliverable, scope, due_clock_or_recurrence,
owner, dependencies, expected_evidence, customer_visibility,
remedy_or_exposure, exception_or_waiver, effective_and_expiry,
status, observed_evidence, supersession
```

## Lifecycle state

```text
draft -> internal_review -> counterparty_review -> approved -> signature_pending -> executed
  |            |                 |               |              |
  v            v                 v               v              v
abandoned  authority_gap   deviation_pending  expired_approval incomplete_signature

executed -> active -> amendment_or_renewal -> notice_or_termination -> expired_archived
```

Obligations have a separate state: `not_yet_triggered`, `pending`, `due`, `at_risk`, `fulfilled_with_evidence`, `exception_pending`, `waived_with_authority`, `breached/disputed`, `superseded`, `expired`.

## Extraction assurance

Prioritize high-impact clauses and low-confidence extraction for authority review. Sample both extracted and apparently empty sections to detect omissions. Test tables, scanned pages, cross-references, negation, defined terms, date arithmetic, currency/units, conditional triggers, amendments, and incorporated links. A confidence number does not approve legal meaning.
