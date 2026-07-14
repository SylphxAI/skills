---
name: product-feedback-learning-loop
description: Design or audit universal private product feedback intake and the learning loop that ingests authorized private feedback and public reviews, preserves source evidence, clusters underlying problems, routes support and safety cases, links product actions, validates outcomes, publishes policy-safe review responses, and closes the loop truthfully. Use for apps, games, web products, services, and platforms when the requested artifact is feedback capture, review ingestion/response, qualitative evidence synthesis, product-learning operations, or customer status updates. Do not use for public rating or review request eligibility, prompt timing, native solicitation surfaces, or cooldowns; compose review-solicitation-policy only when public solicitation is also requested.
---

# Product Feedback Learning Loop

Turn authorized feedback and review signals into source-preserving evidence,
safe routing, validated product action, and truthful customer updates. Do not
turn this learning surface into a public-review funnel.

## Resource guide

Read [references/feedback-learning-loop.md](references/feedback-learning-loop.md)
for intake, consent, normalized signals, taxonomy, dedupe, evidence quality,
routing, authorized public-review ingestion and response, product action,
metrics, and privacy tests. Retrieve current provider/API authority before
ingesting or responding on an external platform.

## Composition contract

Begin a composed artifact with the
[product artifact envelope](references/product-artifact-envelope.schema.json).
Set `ownerSkill: product-feedback-learning-loop` and give the feedback/learning
artifact its own `artifactId`, `artifactVersion`, `artifactRevision`, and
`artifactState`. The top-level artifact never self-hashes.

Every typed input names the exact producer contract through
`fulfillsHandoffId`. A draft input carries identity/revision/state but no digest;
a sealed input additionally requires `artifactDigest` and
`digestRule: sha256-exact-bytes`. Never invent a digest or resolve a moving
“latest” alias.

For a combined private-feedback/public-review request, produce two sibling
artifacts with distinct identities and stable producer-owned `handoffId`s.
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
   support-resolved. Never promise an uncommitted feature or date.
8. For a request that also asks when or how to solicit public reviews, invoke
   `review-solicitation-policy` as a sibling. Return two independent, versioned
   artifacts with stable handoff IDs; never use feedback or inferred sentiment
   to gate its public request policy.

## When not to use

- For public review request eligibility, prompt timing, native solicitation,
  cooldown, or platform request policy, use `review-solicitation-policy`.
- For end-to-end support, refund, incident, analytics implementation, listing
  conversion, or store submission, route to the corresponding specialist and
  keep this skill limited to evidence-preserving product learning.

## Boundaries

- `social-media-operations-review` owns recurring official-account publishing, platform readback, listening, reply routing, crisis, impersonation, rights, recovery, and shutdown; this skill owns authorized feedback/review ingestion, public response evidence, product action, and close-loop.
- `customer-support-case-resolution` owns one private customer's facts, remedy, reply, protected-action handoff, verification, and closure. Link the case without exposing private facts in a public response.
- Do not own public review eligibility, prompt timing, native request surfaces,
  cooldowns, or platform solicitation policy.
- Never route happy users to public review and unhappy users to private
  feedback. Private feedback/help is universal and independent.
- Do not let stars, volume, payer value, model confidence, or praise dictate
  roadmap priority. Do not trade safety, law, accessibility, or trust through a
  universal score.
- Do not reuse praise as an endorsement without permission and disclosure,
  deanonymize reviewers, retaliate, reveal account data, argue publicly, ask for
  a higher rating, or publish unsupported fixes.
- The classifier or proposer cannot be its sole validator or promoter.
- Do not rebuild whole support operations, refunds, analytics implementation,
  incident command, listing conversion, or store submission.

## Output

Artifact envelope, exact inputs, proof state, stable handoff outputs, and
assumptions:

Scope, sources, authority, and evidence gaps:

Private feedback contract:

Normalized signal, taxonomy, and evidence-cluster contract:

Urgent support/safety routing:

Authorized review ingestion and response policy:

Product action, validation, rollout, and close-loop state:

Sibling handoffs:

Validation, unresolved authority, and next proof:
