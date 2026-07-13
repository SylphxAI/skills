---
name: customer-success-operations-review
description: "Design or audit an outcome-led customer success operating system across segmentation, onboarding after technical migration, activation, adoption, health, risk intervention, education, business reviews, renewal and expansion signals, champion or stakeholder change, playbooks, automation, and product-learning handoffs. Use when the primary artifact is the recurring post-sale customer-value system for B2B SaaS, developer tools, platforms, or enterprise products. Use customer-data-migration-review for import/cutover execution, customer-support-operations for reactive support queues, and enterprise-contract-operations-review for contractual obligations and renewal mechanics."
---

# Customer Success Operations Review

Produce one **Customer Success Operating Contract** that turns promised customer outcomes into observable milestones, honest account states, proportionate interventions, scalable learning, and durable value. Optimize for customer success that predicts retention—not retention tactics that trap an unsuccessful customer.

## Atomic boundary

Own the recurring post-sale operating model: segmentation, desired outcomes, onboarding/adoption milestones, multi-dimensional health, trigger-to-playbook rules, education, business reviews, risk recovery, value proof, expansion readiness, and feedback to product. Do not own technical data migration, ticket operations, billing/contract truth, product analytics schemas, campaign automation, or pricing decisions.

## When not to use

- Use `customer-data-migration-review` or `customer-support-operations` when the primary artifact is a technical data cutover or the reactive support operating model.
- Use `enterprise-contract-operations-review`, `product-analytics-instrumentation-review`, `marketing-automation-blueprint`, or `saas-subscription-pricing` for contract mechanics, measurement implementation, campaigns, or pricing decisions.

## Resource routing

- Read `references/outcomes-health-and-account-state.md` for every task.
- Read `references/playbooks-education-and-automation.md` when interventions, onboarding, QBRs/EBRs, education, automation, renewal risk, expansion, or program measurement matter.

## Source verification

Use current account, product, contract, support, billing, and customer evidence. Never fabricate health, sentiment, adoption, renewal likelihood, or customer commitments from missing signals.

## Operating rules

1. Label inputs `given`, `observed`, `customer-stated`, `assumed`, `hypothesis`, or `decision`. Separate CRM opinion, product behavior, support evidence, contractual state, and the customer's own outcome assessment.
2. Define segment, buyer, admins, operators, end users, champion, economic owner, decision process, promised outcome, time-to-value, critical workflows, renewal/decision date, and loss impact. One account can contain conflicting stakeholder states.
3. Model success as progress toward customer outcomes, not login volume. Use distinct dimensions for setup, activation, workflow adoption, breadth/depth, value realization, relationship coverage, support friction, reliability/trust, commercial state, and data confidence.
4. Preserve raw signals and missingness. A health model must explain which evidence changed each dimension, confidence, freshness, and which action follows. Never hide uncertainty behind one color or score.
5. Define lifecycle/account states with explicit entry, exit, expiry, evidence, owner, allowed automation, customer experience, and next safe action. Separate onboarding, adopting, realizing value, stable, at risk, recovery, renewal-ready, expansion-ready, churned, and dormant where useful.
6. Build playbooks from a falsifiable trigger to a customer-valued action, owner, timing, channel, success evidence, stop condition, escalation, and product-learning path. Do not turn every weak signal into outreach spam.
7. Design onboarding and education around real jobs and progressive competence: environment readiness, roles, workflows, sample-to-production path, practice, verification, searchable help, accessibility/localization, office hours/community where appropriate, and self-service recovery.
8. Treat business reviews as decision artifacts: outcomes promised, evidence achieved, gaps/root causes, joint priorities, risks, commitments, owners, dates, and next evidence. Do not use them as slide-heavy upsell theater.
9. Separate renewal risk, adoption risk, relationship risk, implementation debt, support debt, payment/contract state, and expansion readiness. An expansion signal is invalid if material value or trust gaps remain unresolved.
10. Automate data collection, state calculation, low-risk guidance, reminders, content selection, task routing, evidence packs, and stale-state detection. Preserve named authority for promises, concessions, legal/commercial changes, sensitive escalations, and communications where automation could misrepresent intent.
11. Build the scale-ready program now: event and source contracts, account graph, rule versions, playbook orchestration, suppression/dedupe, workload caps, multilingual/accessibility support, experimentability, audit trail, safe fallback, and closed-loop product routing. Human staffing is not a reason for manual-first design.
12. Measure causal program value with holdouts or credible comparison where feasible, plus countermetrics for customer effort, message fatigue, support load, false alarms, inequitable coverage, and churn displacement. Do not claim a playbook caused retention from survivor correlation.

## Workflow

### 1. Establish customer-value truth

Map segment, stakeholders, desired outcomes, promised scope, decision horizon, current journey, evidence sources, authority boundaries, and the exact operating decision. Define anti-goals such as unwanted outreach, hidden lock-in, or expansion before value.

### 2. Design milestones and health

Define outcome-linked setup, activation, adoption, proficiency, and value milestones. Create dimensions, signals, quality/freshness, normalization, confidence, state transitions, explainability, and actionability; validate against outcomes without turning correlation into certainty.

### 3. Build lifecycle and playbooks

For each meaningful state and trigger specify customer value, action sequence, channel, owner/automation, prerequisites, evidence, stop/suppression, escalation, handoff, recovery, and learning. Compose technical migration, support, contract, pricing, and product owners instead of copying their procedures.

### 4. Design education and joint governance

Create role- and job-based onboarding, academy/help paths, proficiency proof, reusable artifacts, accessibility/localization, and business-review cadence. Make commitments explicit and versioned; never invent roadmap, security, support, or commercial promises.

### 5. Validate and continuously improve

Define routing tests, shadow scoring, sampled account reviews, false-positive/negative analysis, workload/fatigue limits, playbook experiments, customer outcome evidence, model/rule drift, rollback, and retirement criteria. Feed recurring barriers to the canonical product owner with source-preserving evidence.

## Hard gates

Reject or redesign an output that:

- equates usage, NPS, one CSM opinion, payment status, or a single composite score with customer health;
- omits promised outcomes, stakeholders, missing data, confidence, evidence freshness, and next action;
- uses manipulative save tactics, surprise pressure, manufactured switching cost, or outreach that does not restore customer value;
- marks expansion-ready while critical outcome, support, trust, implementation, or relationship risks remain;
- lets AI make unsupported commitments, discounts, contract changes, roadmap promises, or sensitive customer communications;
- launches an unversioned health model or playbook without shadowing, auditability, suppression, rollback, and false-positive review;
- relies on manual spreadsheets, dashboard meetings, or future staffing as the normal scaled operating path;
- claims causal retention, renewal, expansion, or customer value from correlation, selected anecdotes, or invented evidence.

## Output contract

Produce one **Customer Success Operating Contract** containing:

1. artifact ID, scope, evidence labels, segments, stakeholder/account graph, outcomes, promises, decision horizons, authority, and anti-goals;
2. milestone model from setup through value realization and proficiency;
3. health dimensions, signal/source definitions, confidence/freshness, missingness, explainability, validation, and state transition rules;
4. lifecycle state machine and trigger-to-playbook decision table with actions, owners/automation, suppression, escalation, recovery, and proof;
5. onboarding, education, academy/help, business-review, champion-change, risk-recovery, renewal-readiness, and expansion-readiness designs;
6. typed handoffs to migration, support, product, analytics, contract, pricing, billing, security, and marketing owners;
7. automation, audit, privacy, accessibility, localization, workload, channel, and safe-fallback controls;
8. evaluation plan with outcome metrics, countermetrics, causal limits, experiments, drift, review cadence, and playbook retirement rules.

The contract is complete when every account state is explainable, actionable, customer-valued, scalable, reversible where appropriate, and grounded in evidence rather than optimism.
