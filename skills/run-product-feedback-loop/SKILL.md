---
name: run-product-feedback-loop
description: "Run product feedback learning loop: private feedback and public reviews."
---

# Run Product Feedback Loop

Turn authorized feedback and review signals into source-preserving evidence,
safe routing, validated product action, and truthful customer updates. Public
review solicitation lives in `references/review-solicitation-policy/`.

## Resource guide

Read [references/feedback-learning-loop.md](references/feedback-learning-loop.md)
for intake, consent, normalized signals, taxonomy, dedupe, evidence quality,
routing, authorized public-review ingestion and response, product action,
metrics, and privacy tests. Retrieve current provider/API authority before
ingesting or responding on an external platform.

## Composition contract

Write the feedback record in markdown. Name owners and sources in prose. Do
not add a parallel JSON envelope.

For a combined private-feedback/public-review request, produce two sibling
artifacts with distinct identities.
They may share exact upstream product and value-event inputs. Add a one-way
input edge only when this loop truly consumes a contract emitted by Review
Solicitation; public request eligibility can never consume private sentiment or
learning state, and the graph must remain acyclic.

## Workflow

1. Record the product scope, feedback and review sources, entry contexts,
   audiences, privacy/retention needs, support/safety owners, product decision
   owners, current external authority, and evidence gaps.
2. Define universal private intake with optional free text, minimal structured
   context, accessible entry points, attachment/diagnostic preview and consent,
   anonymity or account-link choice where feasible, contact permission,
   acknowledgement, offline retry/dedupe, retention, access, and deletion.
3. Ingest authorized feedback and public reviews without flattening provenance.
   Preserve source, locale, release, context, original evidence, selection bias,
   redaction, consent, identity confidence, and correction/deletion state.
4. Classify and dedupe by the underlying user problem and affected state, not
   exact wording, star value, payer value, loudness, or the user's proposed
   solution. Preserve contradictory and minority cohorts.
5. Route security, privacy, safety, abuse, crash, data loss, payment,
   entitlement, accessibility, refund, and urgent support signals immediately
   to their owners. A learning queue cannot delay incident or customer remedy.
6. Link each material cluster to prevalence denominators, severity, mechanism
   hypotheses, contradictory evidence, owner, proposed product/support/content/
   instrumentation action, independent validation, rollout, live outcome, and
   durable decision evidence.
7. Respond publicly only through a current authorized route and with verified,
   privacy-safe facts. Close private loops as received, clarifying,
   investigating, fixed, shipped, not planned, policy-limited, or
   support-resolved. Dates and features come from committed owners.
8. For a request that also asks when or how to solicit public reviews, invoke
   `references/review-solicitation-policy/` as a sibling. Return two independent, versioned
   artifacts with stable handoff IDs. Public request policy stays independent of
   feedback sentiment.


## Progressive disclosure

- [references/feedback-learning-loop.md](references/feedback-learning-loop.md) — open when needed for depth
- [references/review-solicitation-policy/](references/review-solicitation-policy/) — open when this topic applies

## Path

- Private feedback and help are universal and independent of review sentiment.
- Roadmap priority uses prevalence, severity, and mechanism. Stars, volume, payer value, model confidence, and praise are supporting context. Safety, law, accessibility, and trust stay floors.
- Endorsements use permission and disclosure. Reviewer identity, account data, public argument, rating requests, and unsupported fix claims stay out.
- The classifier or proposer is a proposer. Validation and promotion have a second owner.

## Boundaries

- `../review-domain/references/social-media-operations/` owns recurring official-account publishing, platform readback, listening, reply routing, crisis, impersonation, rights, recovery, and shutdown; this skill owns authorized feedback/review ingestion, public response evidence, product action, and close-loop.
- `../operate-customer-support/references/resolve-one-case/` owns one private customer's facts, remedy, reply, protected-action handoff, verification, and closure. Link the case without exposing private facts in a public response.
- Public review eligibility, prompt timing, native request surfaces, cooldowns, and platform solicitation policy live in `references/review-solicitation-policy/`.
- Support operations, refunds, analytics implementation, incident command, listing conversion, and store submission live with those owners.

## Output

Exact inputs, proof state, handoffs, and assumptions:

Scope, sources, authority, and evidence gaps:

Private feedback contract:

Normalized signal, taxonomy, and evidence-cluster contract:

Urgent support/safety routing:

Authorized review ingestion and response policy:

Product action, validation, rollout, and close-loop state:

Sibling handoffs:

Validation, unresolved authority, and next proof:

