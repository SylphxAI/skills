---
name: customer-support-case-resolution
description: "Resolve or audit one customer-support case from verified facts through a humane response, remedy or compensation, protected-action handoff, legal or abuse escalation, follow-up, and closure evidence. Use when the independent artifact is one Customer Case Resolution Record containing a customer-ready reply when needed, including for a complaint, billing or refund request, trial request, goodwill or gift request, abusive contact, or legal threat. Use Customer Support Operations for the whole support system and Refund And Support Flow for the governing refund consequence state machine."
---

# Customer Support Case Resolution

Produce one **Customer Case Resolution Record** that makes a specific customer feel heard, receives an accurate and proportionate outcome, protects staff and the company, and leaves auditable evidence for follow-up and product learning.

## Atomic boundary

Own one case: evidence and identity check, issue and harm classification, response, remedy recommendation, pre-authorized action or typed handoff, compensation rationale, communication cadence, verification, appeal/reopen, and closure.

Do not redesign the support organization, invent payment/refund/entitlement truth, decide a product-wide abuse policy, act as legal counsel, change pricing, or turn a CRM note into canonical product state. Consume those authorities and state exactly what remains unverified.

## Agent-first invariant

Routine cases should be resolved end to end by bounded automation: retrieve permitted context, classify, detect duplicates/incidents, draft in the customer's language, execute pre-authorized reversible remedies idempotently, update case state, verify the result, and route learning.

Money, durable entitlement, identity recovery, deletion, security, enforcement, legal commitments, safety, and destructive recovery require the owning authority and audit trail. The owner may be an automated policy service or authorized specialist; the support model may not approve its own exception by improvisation.

## Composition contract

Use the [shared product artifact envelope](references/product-artifact-envelope.schema.json). The record carries `schemaVersion`, `artifactId`, `productId`, `artifactKind`, `ownerSkill`, `artifactVersion`, `artifactRevision`, `artifactState`, `inputArtifacts`, `canonicalFactsOwned`, `handoffOutputs`, `assumptions`, `proofState`, and `proofEvidence`, never its own `artifactDigest`. Every input names the producer contract through `fulfillsHandoffId`; a draft input has no digest, while a sealed input additionally carries `artifactDigest` and `digestRule: sha256-exact-bytes`. Reference provider, ledger, entitlement, policy, incident, account, product, and prior-case facts by stable IDs. Emit stable handoff IDs and do not copy those facts as new truth.

Read [Case decisions, remedies, and scenario playbooks](references/case-decisions-remedies-and-playbooks.md) for every case.

## Workflow

1. **Freeze the communication boundary.** Identify channel, sender, locale, deadline, requested outcome, whether a reply or action is authorized, and whether the task is draft-only. Never send, promise, refund, grant, ban, delete, or disclose without the corresponding authority.
2. **Verify safely.** Confirm enough identity and authorization for the requested action using approved channels. Retrieve product/version, account/tenant, plan/entitlement, transaction/provider, incident, prior contact, and policy context. Request only the minimum missing evidence; never ask for passwords, one-time codes, full payment data, secrets, or irrelevant personal information.
3. **Build the timeline.** Separate `customer-stated`, `system-observed`, `authority-confirmed`, `assumed`, `conflicting`, and `unknown`. Record event time, source, action, customer-visible effect, prior promise, and evidence ID. Do not treat confidence, sentiment, or a CRM summary as fact.
4. **Classify the case.** Assign reason, severity, actual and potential harm, company fault/contribution, urgency, vulnerability/age/accessibility considerations, repeat/incident linkage, abuse signal, legal/safety signal, and the owner of the next decision.
5. **Choose the outcome.** Start with the least burdensome remedy that actually restores the promised outcome: explain, guide, correct, restore, replace, refund/credit, compensate, exception, restrict, escalate, or decline. Separate customer remedy, goodwill, legal entitlement, payment truth, account consequence, and product correction.
6. **Run constrained risk/value reasoning when a real choice or exception remains.** Apply an authoritative cohort policy directly when one already governs materially equal facts. Otherwise, hard law, safety, rights, contractual/platform authority, privacy, truth, staff protection, and irreversible ruin floors pass first. Above those floors, compare expected retained value and trust repair against remedy cost, fraud leakage, precedent/consistency, operational load, and tail downside. Use a policy envelope; do not reward threat volume or punish quiet customers.
7. **Draft the response.** Acknowledge the specific impact, state verified facts and uncertainty plainly, answer the request, explain the decision without internal evasion-sensitive detail, give the next action and owner/timeline, offer appeal/reply path, and close naturally. Adapt formality and directness to locale and customer preference without stereotyping or changing fairness.
8. **Execute or hand off.** Pre-authorized actions require stable idempotency key, reason code, before/after state, actor, policy version, cap, expiry/reversal, and authoritative readback. Otherwise emit a typed packet to payment/refund, identity/security, data, abuse, incident, safety, legal, engineering, sales/success, or another owner.
9. **Verify and close.** Confirm authoritative and customer-visible outcome, deliver the promised update even when unchanged, preserve unresolved dependencies, link systemic issues to feedback/product owners, and close only with resolution evidence. Reopen retains the prior timeline, decisions, messages, and reason the resolution failed.

## Source verification

Retrieve the current product behavior, customer contract/plan, support entitlement, approved remedy envelope, payment/provider state, refund/cancellation rights, privacy and retention rules, incident status, abuse policy, applicable consumer/platform authority, and authorized legal route at use. Record source, owner/publisher, version, geography/jurisdiction, retrieval time, uncertainty, and expiry. This skill does not provide legal advice or turn a remembered policy into authority.

## Hard gates

Reject or revise a resolution that:

- sends a confident answer before identity, material facts, authority, or conflicting evidence is resolved;
- fabricates a refund, credit, outage, entitlement, delivery time, legal position, engineering commitment, or internal action;
- ignores a credible legal, regulator, safety, self-harm, security, privacy, or violence signal, or argues the merits without the authorized owner;
- admits liability, waives rights, threatens, retaliates, deletes evidence, or instructs the customer to stop lawful escalation without authority;
- rewards positive reviews, silence, complaint withdrawal, social deletion, or five-star ratings with service or compensation;
- auto-bans an ordinary refund, holds unrelated or user-created data hostage, creates surprise debt, or treats disputed provider state as fraud;
- gives arbitrary gifts, trials, extensions, refunds, or exceptions based on persistence, follower count, status, culture, or how loudly the customer complains;
- lets abusive language erase a legitimate underlying issue, or lets a legitimate issue excuse threats, harassment, discrimination, doxxing, fraud, or staff-safety harm;
- uses fake empathy, blame shifting, policy dumping, repeated apologies without action, or “resolved” as a synonym for “reply sent”;
- leaks internal notes, credentials, personal data, fraud thresholds, security details, another tenant's state, or privileged material.

## Output contract

Return one Customer Case Resolution Record containing only fields needed for the case:

Keep the record internal and proportionate. A low-risk, known-state case may use a lightweight record with case ID, verified facts, decision/source, action/readback, customer reply, and closure; high-risk cases require the fuller fields below. Never expose internal schemas, notes, thresholds, or handoff metadata in the customer message.

1. case/revision/state, channel, locale, task authority, customer/account/tenant references, request, deadline, and linked cases/incidents;
2. evidence timeline with labels, conflicts, missing facts, identity/authorization state, and current-authority register;
3. reason, severity, harm, company contribution, vulnerability/accessibility, abuse, legal/safety, and owner classification;
4. requested outcome, eligible remedies, chosen decision, constrained risk/value rationale, consistency cohort, approval envelope, and rejected alternatives;
5. customer-ready response and optional internal note kept separate;
6. actions executed with idempotency/readback or typed owner handoffs with evidence, requested decision, SLA/update time, and fallback;
7. compensation/refund/trial/goodwill/exception details where applicable, including amount/value, eligibility, cap, expiry, reversal, accounting/entitlement owner, and abuse control;
8. verification, customer update, appeal/reopen, follow-up, systemic-feedback, product-fix, and closure evidence.

## Routing boundaries

- Use `customer-support-operations` for channels, taxonomy, queues, service objectives, knowledge, automation, QA, escalation architecture, staffing/capacity, and the whole feedback system.
- Use `refund-and-support-flow-review` for the product-wide consequence state machine after refund, cancellation, revocation, dispute, or chargeback; use `payment-platform-readiness` for provider, ledger, entitlement, settlement, and reconciliation truth.
- Use `product-abuse-risk-review` for the product-wide abuse policy and enforcement ladder; this skill applies the approved policy to one case.
- Use `account-recovery-review`, data-rights, incident, security, safety, marketplace, legal, sales, or customer-success owners for their protected decisions.
- Use `voice-preserving-editor` when the facts and decision are fixed and the only job is language quality; use `review-solicitation-policy` for public review eligibility.
- Keep public app-store, marketplace, or social review ingestion and public response records with `product-feedback-learning-loop` unless the reviewer enters a private support case; then link the two artifacts without exposing private case facts publicly.

## Completion check

Complete only when the customer has a truthful answer and next step, every protected action has authoritative execution or an accepted handoff, every promise has an owner and time, the result is verified, and the case can be reopened or audited without reconstructing it from email prose.
