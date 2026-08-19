# Review Revenue Operations

Produce one **Revenue Operations Contract** that turns customer evidence into a trustworthy, auditable flow from demand through qualification, solution proof, commitment, forecast, handoff, and outcome. Treat CRM as an operating ledger with scoped authority—not a spreadsheet-shaped source of wishful thinking.

## Scope

Own revenue object semantics, lifecycle and pipeline states, decision criteria,
attribution and routing, qualification/discovery, solution/technical handoff,
forecast and capacity logic, incentives/commission control effects, automation,
reconciliation, and change governance. Campaign execution, pricing/package
decisions, contract interpretation, billing/ledger truth, product implementation,
and customer-success playbooks remain with their owners.

## References

- Read `revenue-system-and-crm-truth.md` when revenue objects, CRM state, routing, lifecycle, attribution, or reconciliation matter.
- Read `qualification-forecast-handoff-and-incentives.md` when discovery, qualification, solution proof, forecast, capacity, handoffs, quotas, commissions, or incentives matter.

## Current sources

Retrieve current CRM/provider capabilities, source schemas, employment/commission
requirements, privacy rules, contract policy, and accounting/forecast definitions
at execution. Vendor fields and legal rules come from their official sources; pipeline
outcomes come from observation.

## Domain principles

1. Separate customer statements, seller assertions, observed facts,
   assumptions, hypotheses, and owner decisions. Keep activity, source,
   stage, forecast category, commitment, signed contract, invoice, cash, and
   realized customer value distinct.
2. Define revenue motion, customer segments, buying/problem context, roles or autonomous agents, account hierarchy, products/offers, currencies/regions, sales/decision cycle, canonical systems, decision authorities, and downstream consumers before changing fields or dashboards.
3. Give each object and field one definition, owner, allowed writer, source, required state, quality rule, history, sensitivity, retention, and downstream dependency. CRM is canonical only for declared commercial workflow facts; product, contract, billing, finance, support, and customer-success truth remain with their owners.
4. Model lifecycle and opportunity states with entry evidence, exit evidence, permitted reversals, expiry/staleness, next action, owner/automation, and terminal reasons. Stage must reflect customer and evidence change, not internal activity volume or desired forecast.
5. Separate identity/account matching, source attribution, qualification, routing, engagement, opportunity, solution proof, commercial approval, contract, handoff, and outcome. The qualification owner creates a qualified opportunity from declared evidence.
6. Make discovery falsifiable: customer problem and impact, current alternative, affected users/workflow, stakeholders and authority, constraints, timing/trigger, desired outcome, evidence, risks, and disqualifiers. Preserve what is unknown and what the customer actually said.
7. Convert demos, POCs, integrations, security answers, roadmap requests, and bespoke commitments into typed evidence and handoffs with success criteria, caveats, owner, authority, due date, expiry, and customer-visible status. Notes remain evidence; product and contract promises require their owning authority.
8. Forecast from explicit definitions, time-indexed snapshots, evidence, stage transition behavior, amount confidence, date confidence, scenarios, capacity constraints, and calibration. Separate pipeline creation, forecast, bookings/contract, billing, cash, and revenue recognition.
9. Design incentives and commissions from desired customer/business outcomes plus gaming analysis. Separate eligibility, credit allocation, splits, attainment, approval, adjustment, dispute, payout, clawback, and audit; retrieve current legal/employment authority while finance remains the source of financial truth.
10. Automate reversible routine work now: capture, source-linked enrichment,
    dedupe, routing, input checks, next-action drafts, stale-state detection,
    forecast recomputation, handoff records, reconciliation, and quality repair.
    Human and agent data entry serves a product or decision use.
11. Authorize autonomous external actions through consent, approved claims, account and channel policy, authority, frequency, and risk. An agent may prepare supporting material and execute bounded workflows; customer intent, pricing, roadmap, legal and security claims, discounts, and binding commitments come from their owning authority.
12. Select validation and recovery controls from the affected truth, downstream
    effect, reversibility, blast radius, and risk. A local presentation-only
    field change may need schema/consumer tests, narrow readback, and revert;
    material state, attribution, forecast, routing, capacity, incentive, or
    authority changes require the applicable shadow calculations, replay,
    migration/backfill, downstream impact, fairness, calibration, gaming,
    duplicate/conflict, provider-failure, audit, rollback, and live readback.
    Select controls for the affected truth and decision; field completeness and
    checklist volume remain subordinate to semantic correctness.
13. Treat customer records, seller/agent assertions, forecasts, capacity,
    incentives, commissions, routing, and internal quality/abuse signals as
    protected operating evidence. A customer, partner, board, or public view is
    a separate purpose-bound, audience-named, minimum allowlisted projection
    with tenant/account authorization where applicable and absence-of-leakage
    tests; its schema contains only fields required for that audience and purpose.

## Workflow

### 1. Establish revenue truth and decisions

Map motion, segments, customer journey, actors/agents, canonical systems, object graph, current problems, decision users, metrics, authority, privacy, and ruin boundaries. Identify which facts are evidence, prediction, commitment, or outcome.

### 2. Design objects, states, and quality

Define account, contact, buying-group, opportunity, product, quote, and handoff
objects as applicable; field contracts; lifecycle and pipeline transitions;
dedupe and merge; attribution; routing; permissions; history; quality;
stale or unknown behavior; and downstream joins.

### 3. Design qualification and proof flow

Specify discovery evidence, disqualifiers, routing, technical validation, demo/POC success, security/procurement dependencies, commitment controls, commercial approvals, solution-to-contract and post-sale handoffs, and customer-safe communication.

### 4. Design forecast, capacity, and incentives

Define forecast taxonomy and horizons, amount/date/scenario uncertainty, calibration, pipeline coverage limits, delivery/implementation capacity constraints, incentive/commission rules, gaming and conflict analysis, disputes, corrections, and finance boundaries.

### 5. Automate, migrate, and assure

Create the automation authority, event/reconciliation contracts, and
risk-selected migration/backfill, shadow/canary, alerting, change approval,
dashboard, data-quality repair, audit, incident, rollback, and observed-outcome
controls. Retire unused fields, stages, reports, and automations.

## Complete when

Acceptance conditions:

- objects, stages, amounts, dates, attribution, forecast categories, required
  evidence, writers, and canonical owners are defined;
- activity, seller confidence, lead score, meeting, proposal, verbal intent,
  signed contract, invoice, cash, and revenue retain distinct semantics;
- incentives reward customer and business outcomes with authorized commitments;
- CRM notes remain evidence while product, security, legal, pricing, contract,
  billing, and customer-success owners retain their truth;
- forecasts include scenarios, calibration, staleness, amount/date confidence,
  capacity, and change history;
- external outreach and commitments have source, consent, frequency, claim,
  privacy, and authority controls;
- field, stage, routing, and incentive changes classify affected truth,
  downstream effects, reversibility, and risk and apply the corresponding
  migration, replay/shadow, rollback, training/agent-contract, and reconciliation controls; and
- forecast accuracy, attribution causality, pipeline health, capacity, and
  revenue outcomes use complete observed data with declared cleaning.

## Output

Produce one **Revenue Operations Contract** containing:

1. artifact name and revision, scope, evidence labels, revenue motion, segments, actors/agents,
   canonical systems, authorities, decisions, definitions, ruin boundaries,
   audience/sensitivity, and authorized external projection contracts;
2. canonical object/relationship/field registry with writers, sources, quality, sensitivity, history, retention, and downstream consumers;
3. identity, account, attribution, lifecycle, pipeline, routing, dedupe, merge,
   stale or unknown, and terminal-reason transitions;
4. qualification/discovery evidence contract, disqualifiers, solution proof/POC, commitment controls, and owner handoff records;
5. forecast taxonomy, snapshots, scenarios, calibration, amount/date uncertainty, pipeline/capacity model, and decision rules;
6. incentive/commission eligibility, credit/split, attainment, approval, adjustment, dispute, payout boundary, gaming, and audit controls where applicable;
7. automation authority, privacy/consent, reconciliation, dashboards/metrics,
   data-quality, change-risk classification, applicable migration/backfill,
   change governance, incidents, and rollback;
8. validation/evidence plan with the applicable replay, shadow/canary,
   downstream tests, cohort and gaming review, live readback, reasons for
   omitted areas, and specialist handoffs.

The contract is complete when every commercial state and prediction can be traced to evidence, no downstream system is forced to treat CRM opinion as fact, and automation can operate without inventing authority.
