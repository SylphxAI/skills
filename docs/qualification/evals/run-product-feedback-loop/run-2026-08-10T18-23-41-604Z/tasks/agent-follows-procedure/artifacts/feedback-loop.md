# Feedback Learning Loop — Onboarding flow confusion

## Product artifact envelope

- `schemaVersion`: 2
- `artifactId`: `sylphx.onboarding.feedback-loop.v1`
- `productId`: `sylphx.onboarding`
- `artifactKind`: `feedback-loop`
- `ownerSkill`: `run-product-feedback-loop`
- `artifactVersion`: `2026.08.1`
- `artifactRevision`: `r1`
- `artifactState`: `draft`
- `proofState`: `hypothesis`

Inputs: none — this is the root feedback artifact for the signal set; no upstream handoff fulfilled.

Canonical facts owned:

- Onboarding flow confusion is an intake-classified feedback cluster sourced from in-app survey free-text and support-ticket reasons.
- The active decision authority for product action on onboard is the product owner.
- Intake, classification, dedupe, and routing follow `run-product-feedback-loop`; urgent support/safety route is out of this artifact's authority.

## 1. Scope, sources, authority, and evidence gaps

Scope: the onboarding funnel of Sylphx onboarding (entry surfaces: first-run, account setup, first-task activation). This artifact covers private feedback only; no public review ingestion or public response is in scope here.

Sources and context:

- In-app survey: free-text and/or structured "confused / unclear" tags submitted post-onboarding or from settings/help entry. Selection bias: only users who reach the survey surface; survivors of the flow are overrepresented.
- Support tickets: support-reason routing/categories naming onboarding confusion, plus ticket body summaries. Bias: only users willing to contact support; may skew to higher-severity or account-blocking outcomes.

Authority:

- Product action and close-loop decision owner: product owner (named decision owner for onboarding).
- Support/safety routing owner: current support owner (out of this artifact's direct authority; handoff only).
- Skill authority: `run-product-feedback-loop` for intake/classification/routing and close-loop states.

Evidence gaps:

- No funnel/instrumentation denominator is available yet (drop-off rate, per-step completion, retry counts).
- No `occurred` timestamps or product release/version captured on the survey source yet.
- Support-ticket confidence (verification of the "confused" reason) and whether tickets were resolved by support is unmeasured.
- No linguistic/redaction quality check has been run on the free text.
- Contradictory cohorts (users who completed onboard successfully and rated it clearly) have not yet been surfaced.

## 2. Private feedback contract

Inline with the skill's private feedback contract, applied to the in-app survey:

- Entry surface and context: in-app survey linked from settings/help and from the onboarding exit/success surface, with visible framing that feedback is about the onboarding task, not a star rating.
- Anonymous/account-linked choice: offer both; default pre-selected anonymous; anonymous feedback must remain unlinkable beyond declared anti-abuse needs.
- Type/product area/goal/expected|actual result and severity: minimal optional fields — product area (onboarding), goal, expected vs actual result, severity (low/med/high). No mandatory rating.
- Optional free text and attachment: free text optional; attachments/diagnostics optional with explicit preview and consent.
- Explicit diagnostics content/consent/preview/redaction: any requested diagnostic (screens, logs, steps) requires opt-in preview and redaction; never silently expand scope.
- Contact/follow-up permission and preferred channel: optional checkbox and channel choice; defaults to no contact.
- Offline/retry/dedupe and receipt: offline-first write with retry; dedupe by (survey instance, source_object_id) to avoid double-submit; ack receipt shown on submit.
- Privacy/retention/access/deletion: retention default per product privacy policy; access and deletion via standard data-subject flow; deletion propagates into derived stores.
- Status vocabulary and close-loop promise: received, needs clarification, routed to support, investigating, reproduced, candidate validated, fixed in exact version, shipped and read back, not planned, policy-limited, duplicate, unable to reproduce, support-resolved.

Support tickets: intake reasons and ticket bodies are separate source objects; they follow the support case contract for private facts, and only a link (case id) is kept here, not duplicated private content.

## 3. Normalized signal, taxonomy, and evidence-cluster contract

Normalized signal (per source object):

- `signal_id`, `source` (`in-app survey` | `support ticket`), `source_object_id`
- `received` and `occurred` time where available; product release/version (gap on survey until instrumentation added)
- User job, product area (`onboarding`), object/workflow (`first-run`, `account setup`, `first-task activation`)
- `type`: `usability` (primary); may also be `bug` if a step errors; keep both tags distinct
- `severity`, `urgency`, `reversibility`
- Platform/locale/device/accessibility/network context where supplied
- Segment/lifecycle/entitlement only where allowed and necessary
- Raw evidence reference, redaction state, consent
- `duplicate_cluster_id`, evidence links, owner, route, status, follow-up permission
- Support-specific: case id, resolution state (via link, not duplicated)

Taxonomy (dedupe by underlying user problem and affected state):

- Cluster key = user problem + affected flow state, not exact wording, star value, payer value, or proposed solution.
- Candidate confusion clusters (to be confirmed against raw evidence): "don't know what the next step is" (guidance gap), "form field unclear or validation confusing" (input clarity), "step order or hierarchy confusing" (structure/navigation), "lost after completing a step" (progress/feedback gap), and support-specific "engagement/recovery unclear (blocked, unable to proceed)".
- Preserve contradictory cohorts: users who completed onboard clearly.

Evidence cluster:

- Cluster + mechanism hypothesis (e.g., no in-progress guidance → users stall after first step).
- Source diversity and selection bias (survey survivors vs support high-severity).
- Frequency/prevalence estimate with denominator (gap: denominator absent until instrumentation).
- Severity, affected outcome, reversibility.
- Quality/safety/commercial/support impact.
- Strategic/product-promise relevance.
- Confidence and contradictory evidence.
- Instrumentation/research gap.
- Linked decision/action candidates (see §6).
- Validation/rollout/live-outcome evidence (empty until product action).

## 4. Urgent support/safety routing

Route immediately (a learning queue may not delay incident or customer remedy):

- Security/privacy/safety/abuse/severe abuse → protected incident/safety owner; containment, evidence, support/appeal.
- Crash/data loss/payment/entitlement outage → incident/engineering plus support; reproduce, mitigate, status, correction.
- Refund/chargeback/access consequence → refund/payment specialist; ledger/entitlement evidence.
- Accessibility blocker → accessibility/product owner; affected-flow proof and equivalent access.
- Repeated usability confusion → app/interface owner (this is the primary lane for the onboarding-confusion cluster); observation, flow hypothesis, documentation/support fix.
- All other lanes: safety, time-boxed routing owned by support owner; this artifact does not hold escalation authority.

Urgency triggers for immediate routing: any signal mentioning blocked account access, unrecoverable data, payment/entitlement, or safety/privacy. Anything that is purely "confused about a step" stays in the usability/product lane unless it also meets an urgent trigger.

## 5. Authorized review ingestion and response policy

No public review ingestion or public response is in scope for this artifact. Onboard feedback here is private (in-app survey + support tickets). Any future public-review eligibility, prompt timing, native request surfaces, or solicitation policy belongs to the sibling `review-solicitation-policy` skill and is explicitly out of this artifact's authority.

If a public review path is later opened for onboarding, the current platform adapters (Apple App Store Connect Customer Reviews, Google Play Publisher reply-to-reviews, Steam GetReviews) must be re-verified for read/reply/delete/quotas/roles before any ingestion or response. Default is: do not ingest or respond publicly until those routes are verified.

Public response constraints (if later authorized): respond only to acknowledge/clarify/explain a verified fix+version/provide a safe support route/correct a material misunderstanding; never reveal account data, argue, market, spam, ask for a higher rating, or promise an uncommitted feature/date. Private feedback and public reviews never gate each other.

## 6. Product action, validation, rollout, and close-loop state

Sequence: ingest → redact → classify → dedupe → enrich → cluster → route urgent support/safety → form falsifiable hypothesis → reproduce with exact context → propose candidate → independent validation → canary/holdout → live readback → promote/rollback → update users where permitted → archive with version/evidence.

Current state: intake and classification expected; no candidate yet. The cluster hypothesis is a falsifiable product hypothesis, not a commitment: "onboarding users stall at the first post-account step because in-flow guidance is missing." Validate before any change.

Proposed action candidates (to be validated independently, never auto-promoted):

- Guidance/progressive disclosure on the ambiguous step (no-scope content candidate).
- Field/label/validation clarification (input clarity candidate).
- Progress/structure fix (navigation candidate).
- Documentation/support "how do I continue" fix (support candidate).
- Instrumentation add (drop-off + step completion + exit "confused" flag) as the enabling measure for a real prevalence denominator.

Independent validation rule: the classifier/proposer cannot be its sole validator or promoter; candidate mutation authority cannot change evaluation gates, source evidence, platform policy, or protected response rights.

Rollout: canary/holdout with live readback before promote; promote only on verified outcome; rollback/forward-fix on regression; compensation/status only per the relevant policy.

Close-loop states (truthful, evidence-linked): received, needs clarification, routed to support/safety, investigating, reproduced, candidate validated, rolling out, fixed in exact version, shipped and read back, not planned, policy-limited, duplicate, unable to reproduce, support-resolved. Never imply commitment from triage status. Private loops close with the user only where contact permission was given.

## 7. Sibling handoffs

No sibling artifact is produced for this request: onboarding feedback is private only, and no public review solicitation was requested, so the `review-solicitation-policy` sibling is not invoked.

Handoff this artifact emits (stable producer-owned id): `sylphx.onboarding.feedback-loop.v1.handoff.product-action` → consumerSkill `govern`/product-owner decision lane, artifactKind `feedback-loop`, intended for the product action + validation step upon confirmed clusters. Acceptance test: cluster has a non-empty denominator or explicit provenance gap; a falsifiable hypothesis is stated; the proposer is separate from the validator.

Support linkage handoff: `sylphx.onboarding.feedback-loop.v1.handoff.support` → consumerSkill `operate-customer-support`, holding case-id links and escalating any urgent trigger; case details stay in the support case owner, not duplicated in the public/learning surface.

## 8. Validation, unresolved authority, and next proof

Validation status:

- Artifact `proofState`: `hypothesis` — a product hypothesis, not yet design-validated or implemented.
- Classifier/proposer cannot self-validate. Next proof must come from an independent validator and from a live-measured outcome, not from triage status or survey volume alone.

Unresolved authority:

- Onboarding product-decision owner: product owner (named). Because the owner is named but not yet engaging on this artifact, the decision lane is claimed-by-artifact, not owner-confirmed.
- Instrumentation/data owner for the funnel denominator: not yet confirmed; needed before prevalence can be stated honestly.
- Public-review ingestion/response authority: intentionally not confirmed here (out of scope).

Next proof to run:

1. Add a non-intrusive funnel instrumentation (step completion, drop-off, exit "confused" flag) to supply a denominator and falsify the prevalence claim.
2. Independent reproduction of the top confusion cluster with exact context (locale, release, step) to convert "confused" into a reproducible flow gap.
3. Independent validation + canary/live readback of any chosen candidate before promote; record the validated outcome and the fixed version.
4. Record contradictory-cohort signal (users who completed onboard clearly) so a candidate that helps some does not harm others.

Assumptions:

- Survey and support sources are authorized for intake under product policy (assumption `A1`, status `unverified`).
- Intake provenance can be preserved and redacted to product privacy standard (assumption `A2`, status `unverified`).
- Product owner is the active decision authority for onboarding and will confirm this artifact's direction (assumption `A3`, status `unverified`).
