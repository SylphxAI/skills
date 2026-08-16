# Product Feedback Learning Loop

Use private feedback, support signals, product observations, and authorized
public reviews to identify user problems, make product decisions, and close the
loop truthfully.

## Signal sources

Combine sources while preserving provenance:

- in-product free text and contextual feedback;
- customer-support cases and conversation themes;
- usability research and customer interviews;
- accessibility reports;
- crash, error, performance, and abandonment context;
- cancellation, downgrade, refund, dispute, and churn reasons;
- sales, customer-success, community, and partner observations;
- authorized public app-store, marketplace, and review-platform sources.

Each source has selection, participation, visibility, and survivorship bias.
Quiet users and inaccessible intake paths remain part of the uncertainty.

Private intake should be easy to find, accessible, and proportionate. Ask for
the smallest useful set of fields: the user's goal, what happened, expected
result, impact, affected surface or version, and optional contact permission.
Add screenshot, logs, trace, account, or device context when the user consents
and the problem needs it.

## Signal record

For each signal, preserve:

- source and source-specific identifier;
- observed time and ingestion time;
- original text or media reference under its retention policy;
- locale, platform, product version, surface, and journey state;
- customer segment, lifecycle, and entitlement when authorized and relevant;
- user goal, problem, expected outcome, impact, and frequency;
- privacy class, consent, retention, access, and deletion owner;
- links to related support, incident, payment, experiment, or product records;
- taxonomy, duplicate cluster, confidence, owner, decision, and close-loop state.

Derived summaries link back to original evidence. Preserve access control and
retention across both raw and derived records.

## Taxonomy and deduplication

Classify by the underlying user problem and affected state:

- defect, reliability, data loss, performance, or compatibility;
- usability, comprehension, accessibility, or localization;
- capability gap, workflow friction, or integration need;
- price, value, billing, entitlement, refund, or cancellation;
- safety, security, privacy, abuse, moderation, or policy;
- support, documentation, onboarding, or communication;
- praise, use story, or outcome achieved.

Cluster duplicates by user goal, affected state, observed behavior, and impact.
Keep distinct root causes, platforms, locales, permissions, and audience modes
visible inside a cluster.

Prioritize with explicit decision factors: severity, affected users, frequency,
reproducibility, strategic fit, legal or safety urgency, accessibility,
customer value, revenue and refund impact, confidence, effort, reversibility,
and learning value. The product owner chooses the tradeoff and records the
reason plus evidence that could change it.

## Urgent and specialist routing

| Signal | Primary owner | Required response |
| --- | --- | --- |
| Security, privacy, safety, or severe abuse | Protected incident or safety owner | Containment, evidence preservation, support or appeal, applicable policy |
| Crash, data loss, payment, or entitlement outage | Incident/engineering and support | Reproduce, mitigate, communicate status, correct or compensate |
| Refund, chargeback, or access consequence | Refund/payment owner | Ledger evidence, entitlement state, support, reason feedback |
| Accessibility barrier | Accessibility and product owner | Affected-flow observation and equivalent access |
| Repeated usability confusion | Product/interface owner | Observation, flow hypothesis, product or documentation correction |
| Capability request | Product discovery owner | Problem cluster, current alternatives, decision state |
| Price or value objection | Commercial owner | Segment, context, retention, and refund evidence |
| Praise or use story | Research/marketing with permission | Preserve authentic wording and usage rights |
| Public review response | Authorized reputation owner | Verified, concise, privacy-safe response |

Urgent signals enter their incident, safety, security, payment, refund, privacy,
or accessibility path immediately. The feedback system retains the product
learning link and final outcome.

## Authorized public-review ingestion

Use the platform's current official read API, export, notification, or portal
route under the authorized account. Record platform, listing or product,
territory, locale, rating when present, text, review time, version, developer
response state, edit history exposed by the platform, and ingestion time.

The owning adapter defines pagination, rate limits, freshness, retries,
deletions, edits, and historical coverage from current platform documentation.
Reconcile edits and removals according to the product's retention and audit
policy.

Respond publicly when a response can acknowledge the issue, clarify a verified
fact, explain a released fix, provide a safe next step, or correct a material
misunderstanding. Public responses use public facts and direct account-specific
work to a protected support channel. The authorized reputation owner controls
publishing; product, incident, legal, safety, and support owners supply the
underlying facts.

Public-review solicitation uses the current policy of each platform. Apply one
eligibility rule across sentiment, provide private feedback independently, and
keep rating or review actions voluntary.

## Product action and close-loop

Move a signal or cluster through plain product states:

- received;
- investigating;
- product decision made;
- planned;
- implemented locally;
- released;
- observed live;
- closed with explanation;
- retained as an open residual.

Each state records the responsible owner and the actual product layer reached.
Triage status communicates investigation, while implementation and release
states communicate the stronger product claims.

When contact permission exists, close the loop with what changed, the affected
version or availability, any required user action, remaining limits, and a
route to continue the conversation. Group communication by an approved cohort
when an incident or systemic defect affects many users.

## Measurement

Use the measures required by the product question:

- intake reach and accessibility;
- time to acknowledge, route, decide, correct, release, and close;
- cluster volume, severity, affected journeys, versions, platforms, and locales;
- reproducibility and root-cause confirmation;
- reopened cases and recurrence after release;
- refund, cancellation, support, trust, and accessibility impact;
- representative user outcome after the correction;
- public-review issue mix and response quality.

Interpret counts with channel and selection bias. Product outcome and recurrence
matter more than maximizing ratings, response volume, or closure speed.

## Privacy and trust

- Preview collected context and provide relevant consent controls.
- Keep anonymous feedback unlinkable beyond declared abuse-prevention needs.
- Apply purpose limitation, retention, access control, deletion, and regional
  handling to raw and derived records.
- Use praise or use stories for marketing after obtaining the required rights
  and preserving authentic context.
- Keep reviewer identity, account behavior, refund rights, warranty, appeal,
  chargeback, moderation, and entitlement decisions with their lawful owners.
- Public replies contain public-safe facts and protected support routes.

## Completion

The loop is operational when signals enter through accessible routes, retain
their provenance, reach the appropriate owner, support a product decision,
track the actual implementation and release layer, and close with the user or
affected cohort when authorized.
