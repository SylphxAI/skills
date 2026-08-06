# run-product-feedback-loop

> **Sylphx company method** (folder inside `sylphx-methods`; open from INDEX).
> Former package class in old catalog → now progressive documentation under this skill's `references/` tree.
>
> **Job summary:** Run feedback learning loop: private feedback and public reviews, cluster, route, product actions, truthful close.

Open deeper files in this folder only when needed.

---

# Run Product Feedback Loop

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
Set `ownerSkill: run-product-feedback-loop` and give the feedback/learning
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

## Boundaries

- `review-social-media-operations` owns recurring official-account publishing, platform readback, listening, reply routing, crisis, impersonation, rights, recovery, and shutdown; this skill owns authorized feedback/review ingestion, public response evidence, product action, and close-loop.
- `resolve-support-case` owns one private customer's facts, remedy, reply, protected-action handoff, verification, and closure. Link the case without exposing private facts in a public response.
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

## Soft composition

- When landing source: compose `source-authoring-standard` — **L1** batch, **L2** atomic commits, **L3** revert-safe PR outcome(s).
