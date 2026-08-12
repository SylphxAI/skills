# Documentation Standard

## Purpose

Documentation preserves intent and helps agents resolve authority; it must not
become a parallel implementation, live-state database, or duplicated standard.
Prefer executable contracts and generated projections wherever prose would
drift.

This standard is the **authority for where product and project facts live** in a
repository. It aligns with industry practice (product North Star metric ≠
goals/OKRs ≠ PRD/spec) and agent-native delivery (one product objective
authority; completable work slices; no second “sprint North Star”).

## Altitude map

| Question | Durable home |
| --- | --- |
| What is this repository / product, and what does it own? | `PROJECT.md` |
| What does this product win at, and how do we measure it? | **North Star** (short: one line + primary metric + anti-proxies) in `PROJECT.md` and/or `docs/NORTH-STAR.md` |
| What is the final product shape (end state)? | **End state** section in `PROJECT.md` or linked product design — not a second North Star |
| What completable outcomes move us toward end state *now*? | **Goals** in `PROJECT.md` (optional; always completable) |
| What user/agent jobs does the product provide? | **Capabilities** inventory in product design (`docs/PRODUCT.md` or design blueprint) |
| What tools / surfaces expose those capabilities? | **Tools / surfaces** table in product design |
| What are inputs, outputs, failures, limits for each tool or capability? | **Spec / schema / test / capability contract** (executable preferred) |
| Why was a material durable choice made? | Repo-owned ADR |
| How is an operation performed or recovered? | Runbook |
| What is current work / adoption / incident state? | Forge / live work system — not git prose as truth |
| What static method applies across repositories? | Binding Skills package |
| What does an API/schema/CLI expose *now*? | Generated reference from the authoritative source |

Discussion, brainstorming, and research are evidence inputs. Promote only their
durable outcome into North Star, end state, goal, design, ADR, spec, or work;
do not treat raw chat history as the final decision authority.

## Product repository documentation model

Use **fewest durable concepts**. Do not invent parallel Vision / Mission /
Strategy / Goals / North Star files that restate the same facts.

### Layer definitions (binding)

| Layer | Answers | Shape | Completable? |
| --- | --- | --- | --- |
| **Purpose** | What is this repo/product for? | Short prose | Identity, not a sprint |
| **North Star** | How do we know we are winning? | **One line** + **one primary metric** (stage-honest if needed) + anti-proxies | Long-lived compass |
| **End state** | What does the finished product look like / not look like? | Product shape, boundaries, non-goals — may be long | Product ambition; not “this PR done” |
| **Goals** | What completable outcomes do we ship next toward end state? | Bullet list of results | **Yes** — finish, drop, or replace |
| **Capabilities** | What requestable jobs does the product provide? | Inventory table (job → success → non-goals) | Design inventory |
| **Tools / surfaces** | How are capabilities exposed? | Tool ↔ capability map | Design inventory |
| **Contracts** | Exact behavior of each capability/tool | Spec, schema, test, OpenAPI, `capability.json`, … | Implementation truth |
| **ADR** | Why a material choice stands | Sparse decision records | Decision history |
| **Delivery** | What is landed / live proof? | Terminal boundary + verify command | Per change |

### Hard separation rules

1. **North Star ≠ Goal.** Goals complete; North Star steers. Never rename end
   state or North Star as “the goal” unless you drop the word Goal entirely.
2. **North Star ≠ End state.** North Star is compass + metric. End state is the
   construction target (documentation-first for builders). End state may live
   in the same file as North Star but **must be a distinct section**.
3. **North Star ≠ product design inventory.** Capabilities, tools, and field
   details do not belong in the North Star metric section.
4. **Goal ≠ ultimate product.** Agent-native work may pursue end state without
   a human sprint calendar, but **execution slices** remain goals/work with
   done criteria. Residual gaps are residuals, not a second North Star.
5. **One writable authority per fact.** `PROJECT.md` may project; it must not
   fight a longer North Star or design file. Link instead of duplicate lists.
6. **Quality North Star (`q-*`)** is engineering authoring vocabulary under
   `build-product` engineering-standard — **not** product North Star.
7. **Universal principles** (`docs/policies/PRINCIPLES.md` in Skills) are how
   any work trades off — not a per-product win metric.

### `PROJECT.md` skeleton (default for every durable product repo)

```markdown
# <Product or repository name>

## Purpose
…

## North Star
> One line: what we win at.
**Metric:** …
**Anti-proxy:** …

## End state
Final product shape, boundaries, explicit non-goals.
(Link to full design if long.)

## Goals
- Completable outcomes toward end state (optional section; omit if empty)

## Capabilities
(Short index or link to docs/PRODUCT.md / design blueprint)

## Delivery
Terminal boundary, verify command, lifecycle notes.

## Links
North Star full text, design, ADRs, specs, runbooks.
```

**Proportionality**

| Repo kind | Minimum |
| --- | --- |
| Tiny library / one-shot | Purpose + Delivery (+ North Star only if product claims exist) |
| Active product | Full skeleton; design file when capabilities/tools exceed a short table |
| Multi-surface commercial | Skeleton + `docs/NORTH-STAR.md` and/or design blueprint + generated API refs |

### Product design: capabilities, tools, details

When the product has more than a trivial surface, write design in one entry
(e.g. `docs/PRODUCT.md`, design blueprint from `design-product`, or shape pack
output). Required inventories:

#### Capabilities

User- or agent-**requestable jobs**, not internal module names:

| ID | Job | Success looks like | Non-goals |
| --- | --- | --- | --- |

#### Tools / surfaces

How capabilities are exposed (CLI, API, UI, bot, Skill listing, …):

| Tool / surface | Capabilities | Audience | Entry |

One capability may map to many tools; a tool must not silently own unlisted
capabilities.

#### Details (per capability or tool)

**Do not** expand full I/O tables inside North Star or Goals. Prefer:

1. schema / OpenAPI / protobuf / tests as truth;
2. Skill `capability.json` + references when the unit is a Skill package;
3. a short prose contract only when no executable home exists yet.

Minimum contract fields when prose is the temporary home: purpose, inputs,
outputs, failures, auth, side effects, limits, examples, non-goals, oracle.

### Documentation-first execution (agent-native)

```text
Write Purpose + North Star + End state (+ design inventories as needed)
  → optional Goals for current completable slices
  → implement toward end state (continuous; no second North Star)
  → prove Delivery; residual honestly if end state not yet met
```

Chat is draft. Promote durable outcomes into the altitude map homes above.

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

Product adoption guidance: `../../../../../../../docs/history/docs-reference/adr-lifecycle-product-adoption.md`.

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

In the Sylphx Verified Capabilities repository, each listing under `skills/<id>/`
is one capability (tool/method unit): `capability.json` owns the contract,
`SKILL.md` owns the procedure entry, `references/` owns depth. The catalog is a
projection, not a second authority.

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
- [ ] North Star, end state, goals, and design inventories are not collapsed into one unlabeled blob.
- [ ] Goals (if present) are completable; North Star remains the product compass.
- [ ] Tool/capability field lists live in contracts or generated refs, not duplicated hand tables.
- [ ] ADRs contain decisions and tradeoffs, not current mutable status.
- [ ] ADR frontmatter is structurally valid; projections remain non-authoritative.
- [ ] Enumerated API/schema/CLI facts are generated or freshness-checked.
- [ ] Raw discussion is linked as evidence only after its durable outcome is
      promoted to the correct authority.
- [ ] Every public/customer artifact is an intentional minimum projection, not
      raw internal evidence or an internal object serialized by convenience.
- [ ] Archived material is historical evidence, never an active fallback.
