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
| What is the current work/adoption/incident state? | Repository/forge Work or incident record, linked from docs if useful |
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
Live work/adoption/incident/discussion state lives in the product/forge systems that own it. Archived
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

### Lightweight ADR governance

This repository is public. ADR governance stays small and industry-comparable
(MADR / adr-tools class). It is **not** a retrieval control plane.

**Keep:**

- ADRs live in the owning repository and record **why** a durable choice exists.
- Current behavior authority remains code, schemas, tests, and product
  current-state surfaces—not ADR narrative status.
- Generated projections are non-authoritative.
- Minimal frontmatter: `id`, `status`, optional `date`, `decision_owner`,
  `supersedes`, `amends`, and optional `scope` hints.
- Status: `proposed | accepted | rejected | superseded`.
- Material changes amend or supersede; do not silently rewrite accepted history.
- Structural CI only: parseable YAML, stable identity, legal status, existing
  relation targets, no relation cycles, and `superseded` has a superseding ADR.

**Do not require:**

- ApplicableDecisionBundle as portfolio law
- mandatory `decision_mode` / `decision_key` calculus
- typed-scope AND/OR policy engines
- unresolved disposition / provenance digest law
- every product repository shipping a local resolver adapter

Agents retrieve ADRs with ordinary search/RAG over markdown at a known commit.
Future knowledge systems may index ADRs as derived consumers; they own ranking
and query provenance.

Product adoption guidance: `history/docs-reference/adr-lifecycle-product-adoption.md`.

An ADR contains:

- stable collision-resistant identity and status;
- context and forces;
- decision and owned scope;
- alternatives and material tradeoffs;
- consequences, migration/recovery, and verification intent;
- supersession links rather than rewritten history.

The owning repository defines its collision-safe identity mechanism. Sequential
numbers are acceptable only when allocation cannot race; portable slugs are
preferable in parallel agent workflows.

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
- [ ] ADR frontmatter is structurally valid; projections remain non-authoritative.
- [ ] Enumerated API/schema/CLI facts are generated or freshness-checked.
- [ ] Raw discussion is linked as evidence only after its durable outcome is
      promoted to the correct authority.
- [ ] Every public/customer artifact is an intentional minimum projection, not
      raw internal evidence or an internal object serialized by convenience.
- [ ] Archived material is historical evidence, never an active fallback.
