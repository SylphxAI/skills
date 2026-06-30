# User Research Repository Patterns

## User Research Repository Review state machine

```text
evidence_captured -> consent_checked -> redacted -> tagged -> synthesized -> decision_linked -> reviewed
        |                  |              |          |              |                 |
        v                  v              v          v              v                 v
     rejected        access_restricted  pii_found  duplicate   low_confidence     archived
```

## Rule IDs

- `research-repository-1` — Capture source, date, participant/segment, consent status, method, researcher, product area, and decision question for every evidence item.
- `research-repository-2` — Separate verbatim observations, researcher interpretation, synthesized insight, recommendation, and decision outcome.
- `research-repository-3` — Use taxonomy dimensions for persona, journey step, job-to-be-done, pain, feature area, severity, frequency, confidence, and revenue/support impact.
- `research-repository-4` — Redact personal data, sensitive customer details, and confidential account context before broad repository access.
- `research-repository-5` — Score insight confidence by evidence quality, recency, sample fit, triangulation, and contradiction rather than quote vividness.
- `research-repository-6` — Link insights to roadmap decisions, experiments, support fixes, design changes, and rejected requests.
- `research-repository-7` — Review stale insights and retire decisions when product, market, segment, or pricing context changes.
- `research-repository-8` — Close the loop with product, design, support, sales, and customer success so evidence improves operating decisions.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Interview notes | Tag with method, segment, consent, decision | Transcript/note and consent | Unsearchable anecdote |
| Support cluster | Aggregate and dedupe before insight | Ticket taxonomy and volume | Overreacting to one angry ticket |
| Sensitive quote | Redact or restrict access | Consent and data class | Privacy breach |
| Old insight | Mark stale or revalidate | Date and product context | Shipping from obsolete evidence |
| Conflicting evidence | Record contradiction and confidence | Source quality comparison | Cherry-picked conclusion |

## Research repository checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `research_evidence_captured`, `research_evidence_tagged`, `research_insight_created`, `research_insight_linked`, `research_insight_stale`, `research_access_restricted`, `research_decision_outcome_recorded`.

Recommended properties: `source_type, segment, method, consent_status, sensitivity, product_area, journey_step, confidence, evidence_count, contradiction_count, decision_id, owner_team, status, outcome`.
