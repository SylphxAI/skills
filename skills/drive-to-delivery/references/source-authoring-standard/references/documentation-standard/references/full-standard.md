# Documentation Standard

## Purpose

Documentation preserves intent and helps agents resolve authority.
Executable contracts and generated projections own facts that would drift
in prose.

This standard is the **authority for where product and project facts live**.
It follows **global industry practice** (not org-invented philosophy):

| Industry layer | Mainstream home |
| --- | --- |
| **Product Vision** | Vision doc / charter (what world we build) |
| **North Star Metric (NSM)** | Single metric of core customer value (+ optional one-line strategy) |
| **OKRs / Goals** | Time-bound, completable objectives |
| **PRD / product spec** | Features, capabilities, requirements, non-goals |
| **Specs / API reference** | Exact interface behavior (OpenAPI, schema, tests) |
| **ADR** | Why a material decision stands (in-repo) |
| **README** | Repo entry: what it is, how to run, links |
| **Diátaxis** | User-facing docs: tutorial · how-to · reference · explanation |

There is **no single ISO filename** for product docs. Industry alignment means
**these layers and purposes**, with familiar names—not a proprietary “End state”
taxonomy.

## Altitude map

| Question | Industry home | Typical path |
| --- | --- | --- |
| What is this repository? | **README** (+ optional short `PROJECT.md` projection) | `README.md`, `PROJECT.md` |
| What long-term product are we building? | **Product Vision** | `docs/vision.md` or PRD overview |
| How do we measure core customer value? | **North Star Metric** | `docs/NORTH-STAR.md` or vision/NS section (keep short) |
| What completable outcomes this period? | **OKRs / Goals** | OKR system or `PROJECT.md` Goals |
| What features/capabilities and requirements? | **PRD / product spec** | `docs/prd.md` |
| Exact tool/API behavior? | **Spec / API reference / tests** | OpenAPI, schema, tests |
| Why a durable technical/product choice? | **ADR** | `docs/adr/` (MADR/Nygard class) |
| How do I learn / do a task / look up facts? | **Diátaxis** | tutorial · how-to · reference · explanation |
| How do we operate or recover? | **Runbook** | ops docs |
| Current work / incident state? | **Work system / forge** | not git prose as truth |
| Cross-repo static methods? | **Skills packages** | installed skills |

Chat is draft. Promote durable outcomes into the homes above.

## Industry layers (binding definitions)

| Layer | Answers | Shape | Industry notes |
| --- | --- | --- | --- |
| **Product Vision** | What product world are we building; for whom; not doing what? | Qualitative; may be long | Not a metric; not a feature backlog |
| **North Star Metric** | Single metric that best captures core value delivered to customers | **One primary metric** in English, using an industry quantity | Amplitude/Sean Ellis: nights booked, weekly learning users |
| **OKRs / Goals** | What we commit to complete or move this period | Time-bound, completable | Implement strategy; may target NSM or input metrics |
| **PRD / product spec** | Problem, users, features/capabilities, requirements, non-goals | Inventory + requirements | Features live **here**, not in NSM |
| **Specs / API reference** | Exact I/O, failures, limits | Schema/OpenAPI/tests preferred | Field lists live here; Vision and NSM link |
| **ADR** | Why we chose A over B | Sparse, in-repo | Status is decision history, not live ops state |
| **README / PROJECT projection** | Entry + links | Short | Must not become a second PRD |

### Hard separation (industry consensus)

1. **Vision ≠ North Star Metric ≠ OKR ≠ PRD ≠ API reference.**
2. **NSM is one primary metric** of customer value (vanity proxies are not NSM).
   Name it in **English** with an **industry quantity** (information ratio,
   GGR, contribution margin, daily completers, weekly returning users,
   availability, completed public operations). Amplitude examples are
   phrases. Name the industry quantity. A predecessor private name lives
   in a historical ADR labeled retired.
3. **OKRs are time-bound**; completing an OKR ≠ fulfilling the whole vision.
4. **Feature/capability inventories belong in the PRD**, not the NSM document.
5. **Field-level tool details belong in specs/reference/tests.**
6. **ADRs record why**, not dashboards or backlog status.
7. **One writable authority per fact**; entry docs only link.
8. **Vision, NSM, OKRs, and the PRD use product language.** Delivery stages,
   instruction generations, quality rule IDs, and claim scores live in
   engineering or delivery homes.
9. **Quality vocabulary (`q-*`)** is engineering authoring under
   `build-product`. Say **Quality vocabulary** when the subject is
   engineering.

### Optional short strategy

A brief product strategy (how we win) may sit next to vision or NSM. It is not
a fourth parallel encyclopedia; keep it short.

## North Star Metric (naming)

Industry practice (Amplitude North Star Framework; Sean Ellis) is **one
customer-value metric**, described so a stranger understands it, plus 3–5
inputs. It is not a composite of unlike units.

**Write the industry quantity in words**, optionally with a window
(`weekly returning qualified wallets`, `daily users who finish today's
puzzle`). Established finance and reliability terms stay: GGR, NGR, IRR,
Sharpe, information ratio, contribution margin, availability, K-factor.

The industry name of the layer is **North Star Metric**. Write the win
condition as that English quantity. A predecessor private name lives in
a retired ADR; binding docs and public fields use English.

Evidence for a delivery claim uses **artifact / check / live**. Gap
inventories are inventories, not the NSM. Engineering quality follows
ISO/IEC 25010 or the nine English principles — not a second product
scoreboard.

## Evidence layers (industry)

Google SRE and conventional delivery use three layers:

| Layer | Means | Is not |
| --- | --- | --- |
| **Artifact** | Source, image digest, schema | Live behaviour |
| **Check** | CI, tests, linters, contract gates | Customer value |
| **Live** | Production readback of the postcondition | A residual JSON grade |

## `PROJECT.md` / README entry (projection only)

Industry default entry is **README**. This org also uses **`PROJECT.md`** as a
**short agent/human projection**—not a PRD.

```markdown
# <Product or repository name>

## Purpose
What this repository is (one short block).

## Product Vision
(or link docs/vision.md)
Long-term product shape, users, boundaries, non-goals.

## North Star Metric
> Optional one-line strategy / value promise
**Metric:** <single primary NSM in English industry quantity>
**Inputs:** leading quantities that feed the NSM, named as inputs

## Goals
- Optional OKR-style completable outcomes (omit if empty)

## Delivery
Terminal boundary, verify command, lifecycle notes.

## Links
| Doc | Role |
| --- | --- |
| docs/prd.md | PRD — capabilities, features, requirements |
| docs/vision.md | Full vision if not inlined |
| docs/NORTH-STAR.md | NSM depth if not inlined |
| docs/adr/* | ADRs |
| OpenAPI / schema / specs | Interface contracts |
| User docs | Diátaxis-structured docs if any |
```

`PROJECT.md` / README link the PRD and specs. Capability inventories,
tool matrices, and API field tables live there.

### Proportionality

| Repo kind | Minimum |
| --- | --- |
| Tiny library | README: purpose + how to run + delivery |
| Active product | README/`PROJECT.md` projection + vision + NSM + PRD + specs as needed |
| Multi-surface commercial | Above + generated API refs + ADR discipline |

## PRD / product spec

Canonical path: **`docs/prd.md`** (industry name: PRD).  
Legacy alias `docs/PRODUCT.md` may redirect with one line; do not maintain two
inventories.

Typical PRD contents (industry templates converge on):

- Problem / opportunity / purpose  
- Target users and use cases  
- Goals / success metrics for the scope of the PRD  
- **Features / capabilities** (what the product provides)  
- Functional and quality requirements  
- Non-goals / out of scope  
- Links to specs, designs, ADRs  

### Features / capabilities and tools

| ID | User/agent job | Success | Non-goals |
| --- | --- | --- | --- |

| Tool / surface | Capabilities | Audience | Entry | Contract |
| --- | --- | --- | --- | --- |

One capability may map to many surfaces. Each surface owns only listed
capabilities.

### Details

Prefer schema / OpenAPI / protobuf / tests for product interfaces. Skill
packages use `SKILL.md` + `references/` (industry Agent Skills). Prose
contracts only when no executable home exists yet (purpose, inputs, outputs,
failures, auth, side effects, limits, examples, non-goals, oracle).

## Diátaxis (user-facing technical docs)

When writing docs for product users (not strategy law), separate:

| Type | Need |
| --- | --- |
| **Tutorial** | Learn by doing |
| **How-to** | Achieve a concrete goal |
| **Reference** | Accurate lookup (often generated) |
| **Explanation** | Understanding / background |

Keep each Diátaxis type in its own artifact.

## ADRs

Create an ADR for material decisions that change architecture, ownership,
public contracts, persistence, security/privacy, delivery semantics, or durable
defaults. Lightweight MADR/Nygard class; store under the owning repo
(e.g. `docs/adr/`). Current behavior authority remains code, schema, and tests.

### Keep

- Context, decision, consequences, supersession  
- Structural validity of frontmatter when used  

### Enough for a product ADR

Context, decision, consequences, and supersession in the owning repo.

## Specs, schemas, and generated references

- Specs define observable behavior and acceptance—not implementation narration.
- Generated reference is never hand-edited; freshness must fail closed.
- Examples should not contradict contracts.

## Capability packages (this repository)

In Sylphx Verified Capabilities, each `skills/<id>/` listing is one capability
unit for the PRD inventory: `SKILL.md` owns the job and procedure,
`references/` the depth. `catalog.json` is a projection. Do not add
`capability.json`.

## Documentation-first delivery

```text
Vision + North Star Metric (+ PRD when building features)
  → OKRs/Goals as completable slices
  → implement; specs/tests own interface truth
  → ADRs for material forks
  → prove delivery; residual if vision not yet met
```

One North Star Metric per product. Period outcomes live in OKRs/Goals.

## One semantic authority

Each fact has one writable source. Projections declare source and freshness or
are labelled non-authoritative. Skills own cross-repo methods; product repos own
code, PRD, ADRs, specs; live systems own work/incident state.

## Publication and diagnostic boundaries

Public surfaces are intentional disclosure sinks. Keep raw logs, private
topology, secrets, customer data, and unrestricted diagnostics in authorized
operator stores. Public API docs expose only deliberate stable fields. Test
projections against sentinel leaks.

## Minimal sufficient documentation

Write the smallest durable artifact that closes a real gap:

1. names and types in code;
2. tests/schemas for enforceable behavior;
3. generated reference for enumerable current state;
4. focused prose for vision, tradeoffs, and operations.

## Validation checklist

- [ ] Vision, NSM, OKRs/goals, PRD, and specs each have a home  
- [ ] NSM is one customer-value metric in English industry quantity
- [ ] Evidence claims use artifact / check / live
- [ ] Vision, NSM, OKRs, and the PRD use product language
- [ ] Gap inventories (if any) are inventory only
- [ ] OKRs/goals are completable when present  
- [ ] Feature/capability inventory lives in the PRD  
- [ ] Interface field lists live in contracts/generated refs  
- [ ] ADRs record decisions  
- [ ] README/`PROJECT.md` links the PRD  
- [ ] Each Diátaxis type has its own artifact when user docs exist  
- [ ] Active law is the current generation  
