---
name: revenue-operations-review
description: "Design or audit a trustworthy revenue operating system across account/contact/opportunity data, lifecycle and pipeline stages, source attribution, qualification and discovery, owner/agent routing, technical-sales handoffs, forecast and capacity, required evidence, automation, incentives or commissions, reporting, data quality, permissions, and change governance. Use when the primary artifact is the end-to-end go-to-market revenue truth and decision system. Use marketing-automation-blueprint for demand generation, enterprise-contract-operations-review for contract obligations, customer-success-operations-review for post-sale value, and saas-subscription-pricing for packaging and price."
---

# Revenue Operations Review

Produce one **Revenue Operations Contract** that turns customer evidence into a trustworthy, auditable flow from demand through qualification, solution proof, commitment, forecast, handoff, and outcome. Treat CRM as an operating ledger with scoped authority—not a spreadsheet-shaped source of wishful thinking.

## Atomic boundary

Own revenue object semantics, lifecycle/pipeline states, evidence gates, attribution and routing, qualification/discovery, solution/technical handoff, forecast and capacity logic, incentives/commission control effects, automation, reconciliation, and change governance. Do not own campaign execution, pricing/package decisions, contract interpretation, billing/ledger truth, product implementation, or customer-success playbooks.

## When not to use

- Use `marketing-automation-blueprint`, `saas-subscription-pricing`, or `payment-platform-readiness` when the primary artifact is demand generation, price/package choice, or payment/ledger correctness.
- Use `enterprise-contract-operations-review` or `customer-success-operations-review` when the primary artifact is executable contract obligations or recurring post-sale customer value rather than revenue pipeline truth.

## Resource routing

- Read `references/revenue-system-and-crm-truth.md` for every task.
- Read `references/qualification-forecast-handoff-and-incentives.md` when discovery, qualification, solution proof, forecast, capacity, handoffs, quotas, commissions, or incentives matter.

## Source verification

Retrieve current CRM/provider capabilities, source schemas, employment/commission requirements, privacy rules, contract policy, and accounting/forecast definitions at execution. Never hardcode vendor fields, legal rules, or claim pipeline outcomes not observed.

## Operating rules

1. Label facts `given`, `observed`, `customer-stated`, `seller-or-agent-asserted`, `assumed`, `hypothesis`, or `decision`. Keep activity, evidence, stage, forecast category, commitment, signed contract, invoice, cash, and realized customer value distinct.
2. Define revenue motion, customer segments, buying/problem context, roles or autonomous agents, account hierarchy, products/offers, currencies/regions, sales/decision cycle, canonical systems, decision authorities, and downstream consumers before changing fields or dashboards.
3. Give each object and field one definition, owner, allowed writer, source, required state, quality rule, history, sensitivity, retention, and downstream dependency. CRM is canonical only for declared commercial workflow facts; product, contract, billing, finance, support, and customer-success truth remain with their owners.
4. Model lifecycle and opportunity states with entry evidence, exit evidence, permitted reversals, expiry/staleness, next action, owner/automation, and terminal reasons. Stage must reflect customer and evidence change, not internal activity volume or desired forecast.
5. Separate identity/account matching, source attribution, qualification, routing, engagement, opportunity, solution proof, commercial approval, contract, handoff, and outcome. A lead score or meeting cannot silently create a qualified opportunity.
6. Make discovery falsifiable: customer problem and impact, current alternative, affected users/workflow, stakeholders and authority, constraints, timing/trigger, desired outcome, evidence, risks, and disqualifiers. Preserve what is unknown and what the customer actually said.
7. Convert demos, POCs, integrations, security answers, roadmap requests, and bespoke commitments into typed evidence and handoffs with success criteria, caveats, owner, authority, due date, expiry, and customer-visible status. Never let notes become product or contract promises.
8. Forecast from explicit definitions, time-indexed snapshots, evidence, stage transition behavior, amount confidence, date confidence, scenarios, capacity constraints, and calibration. Separate pipeline creation, forecast, bookings/contract, billing, cash, and revenue recognition.
9. Design incentives and commissions from desired customer/business outcomes plus gaming analysis. Separate eligibility, credit allocation, splits, attainment, approval, adjustment, dispute, payout, clawback, and audit; retrieve current legal/employment authority and never let compensation fields redefine finance truth.
10. Automate reversible routine work now: capture, enrichment with provenance, dedupe, routing, evidence checks, next-action drafts, stale-state detection, forecast recomputation, handoff packets, reconciliation, and quality repair. Do not create low-value human or agent data-entry merely to feed reports.
11. Gate autonomous external actions by consent, approved claims, account/channel policy, authority, frequency, and risk. An agent may prepare evidence and execute bounded workflows; it may not invent customer intent, pricing, roadmap, legal/security claims, discounts, or binding commitments.
12. Validate changes through shadow calculations, replay, migration/backfill, downstream impact, cohort fairness, workload/capacity, forecast calibration, incentive gaming, duplicate/conflict cases, provider failure, audit, rollback, and live readback. Never optimize field completeness at the expense of truth.

## Workflow

### 1. Establish revenue truth and decisions

Map motion, segments, customer journey, actors/agents, canonical systems, object graph, current problems, decision users, metrics, authority, privacy, and ruin boundaries. Identify which facts are evidence, prediction, commitment, or outcome.

### 2. Design objects, states, and quality

Define account/contact/buying-group/opportunity/product/quote/handoff objects as applicable; field contracts; lifecycle and pipeline state machines; dedupe/merge; attribution; routing; permissions; history; quality; stale/unknown behavior; and downstream joins.

### 3. Design qualification and proof flow

Specify discovery evidence, disqualifiers, routing, technical validation, demo/POC success, security/procurement dependencies, commitment controls, commercial approvals, solution-to-contract and post-sale handoffs, and customer-safe communication.

### 4. Design forecast, capacity, and incentives

Define forecast taxonomy and horizons, amount/date/scenario uncertainty, calibration, pipeline coverage limits, delivery/implementation capacity constraints, incentive/commission rules, gaming and conflict analysis, disputes, corrections, and finance boundaries.

### 5. Automate, migrate, and assure

Create automation authority, event/reconciliation contracts, migration/backfill, shadow/canary, alerting, change approvals, dashboards with definitions, data-quality repair, audit, incident and rollback paths, and observed outcome review. Retire unused fields, stages, reports, and automations.

## Hard gates

Reject or redesign an output that:

- has undefined objects, stages, amounts, dates, attribution, forecast categories, required evidence, allowed writers, or canonical owners;
- treats activity, seller confidence, lead score, meeting, proposal, verbal intent, signed contract, invoice, cash, and revenue as interchangeable;
- rewards stage inflation, overselling, bad-fit deals, hidden renewal pressure, low-quality pipeline, or commitments without authority;
- lets CRM notes create product, security, legal, pricing, contract, billing, or customer-success truth;
- publishes one forecast without scenarios, calibration, staleness, amount/date confidence, capacity, and change history;
- automates external outreach or commitments without source, consent, frequency, claim, privacy, and authority controls;
- changes fields/stages/routing/incentives without migration, downstream impact, replay/shadow, rollback, training or agent-contract update, and reconciliation;
- claims forecast accuracy, attribution causality, pipeline health, capacity, or revenue outcome from invented or selectively cleaned data.

## Output contract

Produce one **Revenue Operations Contract** containing:

1. artifact ID, scope, evidence labels, revenue motion, segments, actors/agents, canonical systems, authorities, decisions, definitions, and ruin boundaries;
2. canonical object/relationship/field registry with writers, sources, quality, sensitivity, history, retention, and downstream consumers;
3. identity/account, attribution, lifecycle, pipeline, routing, dedupe/merge, stale/unknown, and terminal-reason state machines;
4. qualification/discovery evidence contract, disqualifiers, solution proof/POC, commitment controls, and typed handoff records;
5. forecast taxonomy, snapshots, scenarios, calibration, amount/date uncertainty, pipeline/capacity model, and decision rules;
6. incentive/commission eligibility, credit/split, attainment, approval, adjustment, dispute, payout boundary, gaming, and audit controls where applicable;
7. automation authority, privacy/consent, reconciliation, dashboards/metrics, data-quality, migration/backfill, change governance, incidents, and rollback;
8. validation/evidence plan with replay, shadow/canary, downstream tests, cohort and gaming review, live readback, and specialist handoffs.

The contract is complete when every commercial state and prediction can be traced to evidence, no downstream system is forced to treat CRM opinion as fact, and automation can operate without inventing authority.
