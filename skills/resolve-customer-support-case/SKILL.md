---
name: resolve-customer-support-case
description: "Resolve one customer support case through a truthful outcome, authorized action, and verified closure."
---

# Resolve a Customer Support Case

Produce one **Customer Case Resolution Record** that makes a specific customer feel heard, receives an accurate and proportionate outcome, protects staff and the company, and leaves auditable evidence for follow-up and product learning.

## Scope

Own one case: evidence and identity check, issue and harm classification, response, remedy recommendation, pre-authorized action or owner handoff, compensation rationale, communication cadence, verification, appeal/reopen, and closure.

The support organization, payment/refund/entitlement truth, product-wide abuse
policy, legal conclusions, pricing, and canonical product state remain with
their owners. Consume those authorities and state exactly what remains unverified.

## Operating model

Routine cases should be resolved end to end by bounded automation: retrieve permitted context, classify, detect duplicates/incidents, draft in the customer's language, execute pre-authorized reversible remedies idempotently, update case state, verify the result, and route learning.

Money, durable entitlement, identity recovery, deletion, security, enforcement,
legal commitments, safety, and destructive recovery require the owning authority
and audit trail. The owner may be an automated policy service or authorized
specialist; every exception comes from that owner.

## Inputs and owners

Write the case record in markdown. Name owners and sources in prose. Reference
provider, ledger, entitlement, policy, incident, account, product, and prior-case
facts by stable IDs; their owning systems remain authoritative.

Read [Case decisions, remedies, and scenario playbooks](references/case-decisions-remedies-and-playbooks.md) for every case.

## Workflow

1. **Freeze the communication boundary.** Identify channel, sender, locale, deadline, requested outcome, whether a reply or action is authorized, and whether the task is draft-only. Sending, promising, refunding, granting, banning, deleting, and disclosing each require their corresponding authority.
2. **Verify safely.** Confirm enough identity and authorization for the requested action using approved channels. Retrieve product/version, account/tenant, plan/entitlement, transaction/provider, incident, prior contact, and policy context. Request only the minimum missing evidence through approved channels; passwords, one-time codes, full payment data, secrets, and irrelevant personal information stay with the customer or their secure owner.
3. **Build the timeline.** Separate customer statements, observed system state, owner-confirmed facts, assumptions, conflicts, and unknowns. Record event time, source, action, customer-visible effect, prior promise, and source reference. Treat confidence, sentiment, and CRM summaries as contextual inputs.
4. **Classify the case.** Assign reason, severity, actual and potential harm, company fault/contribution, urgency, vulnerability/age/accessibility considerations, repeat/incident linkage, abuse signal, legal/safety signal, and the owner of the next decision.
5. **Choose the outcome.** Start with the least burdensome remedy that actually restores the promised outcome: explain, guide, correct, restore, replace, refund/credit, compensate, exception, restrict, escalate, or decline. Separate customer remedy, goodwill, legal entitlement, payment truth, account consequence, and product correction.
6. **Run constrained risk/value reasoning when a real choice or exception remains.** Apply an authoritative cohort policy directly when one already governs materially equal facts. Otherwise, hard law, safety, rights, contractual/platform authority, privacy, truth, staff protection, and irreversible ruin floors pass first. Above those floors, compare expected retained value and trust repair against remedy cost, fraud leakage, precedent/consistency, operational load, and tail downside. Use a policy envelope that treats materially equal facts consistently regardless of threat volume or customer quietness.
7. **Draft the response.** Acknowledge the specific impact, state verified facts and uncertainty plainly, answer the request, explain the decision without internal evasion-sensitive detail, give the next action and owner/timeline, offer appeal/reply path, and close naturally. Adapt formality and directness to locale and customer preference without stereotyping or changing fairness.
8. **Execute or hand off.** Pre-authorized actions require stable idempotency key, reason code, before/after state, actor, policy version, cap, expiry/reversal, and authoritative readback. Otherwise emit a typed packet to payment/refund, identity/security, data, abuse, incident, safety, legal, engineering, sales/success, or another owner.
9. **Verify and close.** Confirm authoritative and customer-visible outcome, deliver the promised update even when unchanged, preserve unresolved dependencies, link systemic issues to feedback/product owners, and close only with resolution evidence. Reopen retains the prior timeline, decisions, messages, and reason the resolution failed.

## Current sources

Retrieve the current product behavior, customer contract/plan, support entitlement, approved remedy envelope, payment/provider state, refund/cancellation rights, privacy and retention rules, incident status, abuse policy, applicable consumer/platform authority, and authorized legal route at use. Record source, owner/publisher, version, geography/jurisdiction, retrieval time, uncertainty, and expiry. Legal interpretation stays with authorized counsel, and remembered policy remains a discovery input until verified.

## Complete when

Acceptance conditions:

- Verify identity, material facts, authority, and conflicting evidence before issuing a confident answer.
- State refunds, credits, outages, entitlements, delivery times, legal positions, engineering commitments, and internal actions from their observed or authorized owner state.
- Route credible legal, regulator, safety, self-harm, security, privacy, or violence signals to the authorized owner with preserved context.
- Keep liability, rights, evidence, lawful escalation, and customer remedies within their authorized legal and policy paths.
- Base service and compensation on the case and approved remedy policy, independent of reviews, ratings, silence, complaint withdrawal, or social deletion.
- Preserve ordinary refund access, unrelated and user-created data, accurate balances, and a separate reviewed fraud determination.
- Apply gifts, trials, extensions, refunds, and exceptions through consistent eligibility and approval rules.
- Resolve the legitimate underlying issue while routing threats, harassment, discrimination, doxxing, fraud, and staff-safety harm through their own policy path.
- Use specific acknowledgment, verified facts, concrete action, and readback before marking the case resolved.
- Protect internal notes, credentials, personal data, fraud thresholds, security details, other tenants' state, and privileged material through audience-scoped disclosure.

## Output

Return one Customer Case Resolution Record containing only fields needed for the case:

Keep the record internal and proportionate. A low-risk, known-state case may use a lightweight record with case ID, verified facts, decision/source, action/readback, customer reply, and closure; high-risk cases require the fuller fields below. Customer messages contain only the safe facts, decisions, and actions required by their audience; internal schemas, notes, thresholds, and handoff metadata stay internal.

1. case/revision/state, channel, locale, task authority, customer/account/tenant references, request, deadline, and linked cases/incidents;
2. evidence timeline with labels, conflicts, missing facts, identity/authorization state, and current sources and owners;
3. reason, severity, harm, company contribution, vulnerability/accessibility, abuse, legal/safety, and owner classification;
4. requested outcome, eligible remedies, chosen decision, constrained risk/value rationale, consistency cohort, approval envelope, and rejected alternatives;
5. customer-ready response and optional internal note kept separate;
6. actions executed with idempotency/readback or typed owner handoffs with evidence, requested decision, SLA/update time, and fallback;
7. compensation/refund/trial/goodwill/exception details where applicable, including amount/value, eligibility, cap, expiry, reversal, accounting/entitlement owner, and abuse control;
8. verification, customer update, appeal/reopen, follow-up, systemic-feedback, product-fix, and closure evidence.

## Routing boundaries

- Use `operate-customer-support` for channels, taxonomy, queues, service objectives, knowledge, automation, QA, escalation architecture, staffing/capacity, and the whole feedback system.
- Use `review-refund-and-support-flow` for the product-wide consequence flow after refund, cancellation, revocation, dispute, or chargeback; use `build-payment-readiness` for provider, ledger, entitlement, settlement, and reconciliation truth.
- Use `review-product-abuse-risk` for the product-wide abuse policy and enforcement ladder; this skill applies the approved policy to one case.
- Use `review-account-recovery`, data-rights, incident, security, safety, marketplace, legal, sales, or customer-success owners for their protected decisions.
- Use `edit-preserving-voice` when the facts and decision are fixed and the only job is language quality; use `design-review-solicitation-policy` for public review eligibility.
- Keep public app-store, marketplace, or social review ingestion and public response records with `run-product-feedback-loop` unless the reviewer enters a private support case; then link the two artifacts without exposing private case facts publicly.

## Done

Complete only when the customer has a truthful answer and next step, every protected action has authoritative execution or an accepted handoff, every promise has an owner and time, the result is verified, and the case can be reopened or audited without reconstructing it from email prose.
