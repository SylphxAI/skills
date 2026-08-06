# Data Inventory, Purpose, and Controls

## Core lifecycle

```text
proposed -> purpose_validated -> collection_eligible -> collected -> used_or_shared
    |             |                    |               |             |
    v             v                    v               v             v
 rejected    authority_pending    choice_denied   quarantined   misuse_detected
                                      |
                                      v
                         retained -> held -> deleted_or_anonymized -> proof_expired
```

Collection eligibility and downstream use are separate decisions. A later destination or purpose must not inherit eligibility silently.

## Purpose register

| Field | Required question |
| --- | --- |
| Purpose ID | What exact outcome or obligation is served? |
| Subject value | What does the person receive or reasonably expect? |
| Necessity | Why cannot less data, less precision, lower frequency, shorter retention, or on-device processing work? |
| Authority | Which current, scoped authority permits this use, and who validates it? |
| Compatibility | Is a later use compatible, separately chosen, or prohibited? |
| Harm | What can go wrong through collection, inference, access, combination, breach, or decision? |
| Proof | Which observed events show eligibility, enforcement, suppression, and terminal action? |

## Data-element map

For each raw or derived element record:

```text
element_id, subject_type, source, collection_surface, precision, frequency,
sensitivity, purpose_ids, authority_ref, age_region_eligibility,
first_party_systems, processor_ids, derived_elements, access_roles,
retention_start, retention_duration_or_event, terminal_action,
hold_classes, rights_behavior, evidence_owner
```

Never hide a family of fields behind “telemetry,” “metadata,” “AI data,” or “service improvement.” Expand it to decision-relevant elements and destinations.

## Minimization ladder

Evaluate in order:

1. eliminate the data-dependent behavior;
2. compute locally or ephemerally;
3. use a coarser or pseudonymous value;
4. reduce collection frequency or population;
5. separate identity from content and limit joins;
6. shorten retention and access;
7. add user control, transparency, and contestability;
8. accept only residual risk with an accountable owner and exposure ceiling.

## Control plane, not control theater

A valid control has:

- a versioned policy or decision;
- a machine-readable subject/account state;
- enforcement at collection and every downstream destination;
- idempotent propagation, retry, reconciliation, and conflict behavior;
- an observed proof event and mismatch alert;
- a support and recovery path;
- a tested disabled/ineligible state with zero undeclared activity.

## Risk dimensions

Assess likelihood, severity, reversibility, detectability, affected population, vulnerable groups, power asymmetry, sensitivity, inference, combination, monitoring, identity linkage, decision consequence, transfer, vendor concentration, retention, and expectation mismatch. Do not collapse them to one score before preserving the scenario and evidence.
