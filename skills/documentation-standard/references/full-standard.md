# Documentation Standard

## Purpose

Documentation preserves intent and helps agents resolve authority; it must not
become a parallel implementation, live-state database, or duplicated standard.
Prefer executable contracts and generated projections wherever prose would
drift.

## Altitude map

| Question | Durable home |
| --- | --- |
| What is this repository and what does it own? | `PROJECT.md` + machine project manifest |
| Why was a material durable choice made? | Repo-owned ADR |
| What behavior/contract must implementation satisfy? | Spec, schema, test, or executable policy |
| How is an operation performed or recovered? | Runbook |
| What public capability exists? | Capability catalog derived from contracts/code where possible |
| What is the current work/adoption/incident state? | Sylphx Enact live record, linked from docs if useful |
| What static method applies across repositories? | Binding Skills package |
| What does an API/schema/CLI expose now? | Generated reference from the authoritative source |

Discussion, brainstorming, and research are evidence inputs. Promote only their
durable outcome into an ADR, spec, capability record, or work item; do not treat
raw chat history as the final decision authority.

## One semantic authority

Each fact has one writable source. A projection declares its source identity,
generation method, and freshness or is clearly labelled non-authoritative.
Never maintain the same standard, API field list, architecture rule, roadmap
state, or capability status manually in two places.

Static cross-repo instructions are authored under `skills/<id>/`. Product code,
contracts, ADRs, specs, and runbooks live with the owning product repository.
Sylphx Enact owns live work/adoption/incident/discussion state. Archived
repositories may be linked as historical evidence but never as current law.

## Publication and diagnostic boundaries

Public repositories, documentation sites, issue/PR bodies, release notes,
status pages, examples, support replies, and generated references are disclosure
sinks. Publication must be intentional; a useful internal evidence artifact is
not automatically a safe public document.

- Keep raw internal logs/traces, private topology, environment-specific runtime
  configuration, observed internal migration/cutover state, private
  identifiers/control knobs, security hypotheses, customer data, and
  unrestricted diagnostic attachments in the authorized operator/evidence
  boundary. Public OSS configuration, migration definitions/guides, and stable
  customer-selectable settings remain publishable when they are intentionally
  documented contracts and contain no private runtime values.
- Publish a separate minimum projection for the intended audience. It states
  purpose, audience, authority/source, allowlisted fields, redaction, freshness,
  and compatibility or correction semantics.
- Public API/protocol references document only deliberate stable fields. They
  do not mirror an internal struct merely because generation is convenient.
- Prefer opaque correlation identifiers that authorized operators can resolve
  to protected evidence. Never use public prose or attachments as a substitute
  for protected observability storage.
- Test examples, generated docs, errors, and status payloads with sentinel
  internal/secret/cross-tenant fields so projections fail on leakage.

## ADR rules

Create an ADR for a material decision that changes architecture, ownership,
public contracts, persistence, security/privacy posture, delivery semantics, or
a durable enterprise default. Do not create an ADR for ordinary implementation
detail already governed by an accepted decision or testable contract.

### Lifecycle and retrieval (ADR Lifecycle and Retrieval Contract)

Portfolio semantics for ADR lifecycle and retrieval are defined here. The
machine gate (normalized record schema, ApplicableDecisionBundle, fixtures,
reference checker) is owned by `specification-control-plane-standard`. Product
repositories may supply legacy format parsers; new work uses Markdown + YAML
frontmatter.

**Writable authority.** Repo-owned ADR records are the only writable decision
authority for why a durable choice exists. Derived graph, index, and merged
summaries are rebuildable non-authoritative projections.

**Authored status.** Source status is exactly `proposed`, `accepted`, or
`rejected`. Effective `superseded` is derived from outgoing `supersedes`
edges. Do not author `status: superseded`. Inverse relations are generated.

**Ownership fields.** Use singular `decision_owner` (accountable authority) and
optional `contributors`. Do not use ambiguous multi-owner arrays as the
authority field.

**Decision mode.** `decision_mode` is `complementary` or `exclusive`. Exclusive
decisions require a top-level `decision_key`. Complementary ADRs may share typed
scope without structural conflict.

**Typed scope.** `typed_scope` is a selector object:

- AND across declared facets;
- OR within values of the same facet;
- omitted facet on the selector means unconstrained;
- if a task lacks a facet the selector declares, applicability is unresolved;
- unknown `custom.*` namespaces required by a selector are unresolved and never
  silently ignored.

Canonical facets: `repository`, `capability_id`, `component_id`, `surface`, plus
namespaced `custom.<ns>.*`. Prefer project-manifest capability/component ids.
`decision_key` lives only at record top level.

**Relations.** Canonical outgoing relations are `amends`, `supersedes`, and
`relates`. Unqualified `supersedes` is full supersession within the
superseder's applicable scope. Partial supersession requires a machine-readable
`decision_key` (or typed partial selector). Prose that claims partial
supersession without that machine selector is unresolved, not automatic full
supersede. Supersession edges from accepted, scope-matching records do not
disappear when the superseder is later superseded (targets must not resurrect).

**Write path.**

1. Classify whether the change is a material durable decision.
2. If not, update executable authority (code/schema/tests) and any current-state
   surface only.
3. If yes, resolve the existing decision graph to `unchanged`, `amend`,
   `supersede`, or `new`.
4. Write the independently addressable decision record.
5. Only then change implementation.

Material semantic changes use a new record (amendment or supersession). In-place
edits are limited to non-semantic fixes (typo, broken link, format).

**Retrieval.** Agents compute an **ApplicableDecisionBundle** over an exact
source revision: ordered base and amendment **source references**, supersession
edges, unresolved and excluded sets, and provenance digests. Agents read those
source files. The resolver must not mint authoritative merged decision prose.
Lexicographic ids stabilize presentation order only; they do not award semantic
precedence between conflicting sibling amendments—those require an explicit
`amends` chain or become unresolved.

**Unknown handling.** Unresolved items that may own the same exclusive
`decision_key` or change the task's material action block that decision slice.
Non-intersecting unresolved items warn only. Inability to decide intersection
blocks that decision's applicability, not the entire repository.

**Not ADR authority.** Implementation completeness, candidate/CI/artifact
state, deployed/live behavior, and Work/claim/run state belong to
code/schema/tests, Git/CI/artifacts, GitOps/runtime evidence, and Enact
respectively. An accepted ADR never proves landed, deployed, or live.

**Identity.** The owning repository defines collision-safe identity. In this
repository the id is the ADR filename stem. Sequential numbers are acceptable
only when allocation cannot race; portable stems remain preferred under parallel
agents.

An ADR contains:

- stable collision-resistant identity and authored status;
- `decision_owner`, `decision_mode`, typed scope, and relations;
- context and forces;
- decision and owned scope;
- alternatives and material tradeoffs;
- consequences, migration/recovery, and verification intent;
- supersession/amendment links rather than rewritten history.

Accepted ADR history is amended or superseded, not silently rewritten.

## Specs, schemas, and generated references

- A spec defines observable behavior, invariants, failure semantics, and
  acceptance—not implementation narration.
- Schemas and executable policies own machine contracts. Prose links to them.
- Generated reference material is never hand-edited and must fail freshness
  validation when its source changes.
- Examples are conformance fixtures where practical; decorative examples must
  not contradict the contract.

## Capability documentation

Capability records use stable identity and may relate through a graph, facets,
and curated sets. Important detail attaches as sub-capability, behavior/rule,
invariant, contract, scenario, or surface. Work items link to capabilities but
do not replace capability truth; bugs and maintenance work may legitimately
have no capability relation.

## Minimal sufficient documentation

Write the smallest durable artifact that closes a real information gap. Do not
add prose because a template has a section, and do not omit material semantics
because code exists. Prefer:

1. names and types in code;
2. tests/schemas for enforceable behavior;
3. generated reference for enumerable current state;
4. focused prose for intent, tradeoffs, and operations.

## Validation

Check links, generated freshness, schema/examples, ownership, supersession, and
duplicate semantic authorities. Documentation presence alone never proves code
architecture, delivery, or migration completion.

### Authority checklist

- [ ] Each material fact has one named writable source.
- [ ] Projections identify source and freshness or say non-authoritative.
- [ ] ADRs contain decisions and tradeoffs, not current mutable status.
- [ ] ADR retrieval uses ApplicableDecisionBundle over exact sources; projections are non-authoritative.
- [ ] Enumerated API/schema/CLI facts are generated or freshness-checked.
- [ ] Raw discussion is linked as evidence only after its durable outcome is
      promoted to the correct authority.
- [ ] Every public/customer artifact is an intentional minimum projection, not
      raw internal evidence or an internal object serialized by convenience.
- [ ] Archived material is historical evidence, never an active fallback.
