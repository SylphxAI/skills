# Sylphx Verified Capabilities — Product North Star

**Audience:** humans and agents who author, curate, install, qualify, or sell
this repository’s capabilities.  
**Purpose:** decide *what this product wins at*, what evidence counts, and what
must never be optimized as a proxy.  
**Authority:** this file is the product North Star for `SylphxAI/skills`. It is
not the universal principles document and not the engineering quality
vocabulary.

---

## 1. One line

> **Agents load one trusted method for a real job—and never grant more trust
> than version-scoped evidence allows.**

In one breath: **right job → right method → trust capped by evidence.**

Everything below is elaboration of that line. If a proposal, metric, listing,
badge, or commercial claim cannot be read as serving that line without
distortion, it is not North Star work.

---

## 2. Why this product exists

### 2.1 The failure modes we refuse

Frontier agents can already write fluent procedures. The scarce goods are
different:

1. **Wrong method, confidently.** The agent invents a path (or loads a shallow
   one) that looks complete and fails at the delivery boundary—or worse, fails
   silently under live load.
2. **False trust.** A catalog, star count, CI badge, or “industry-aligned”
   label is treated as proof that a package improves outcomes, is safe in
   context, or is current.
3. **Unbounded surface.** Every team forges private skill piles; agents skip
   discovery; methods rot; dual standards and dual paths multiply entropy for
   every future agent.
4. **Unowned outcome.** Success is claimed at “tests green” or “PR merged”
   without an external oracle the user actually cares about.

This repository exists so that, when an agent has a real job, it can **select
the smallest sufficient trusted capability**, execute a specialized procedure,
and **prove** (or honestly fail to prove) the user’s outcome—without requiring
blind trust in the capability author, a marketplace curator, a model vendor, or
Sylphx itself.

### 2.2 Market context (direction, not authority)

Agent Skills are now a portable format across hosts. Catalog size and install
counts are commodity signals. Differentiation that survives is:

- **Job-shaped methods** with real procedures (not prompt wallpaper)
- **Honest, version-scoped evidence** of fitness and incremental value
- **Fail-closed distribution** so machines do not silently execute untrusted
  or demoted tips
- **Outcome contracts** that can be checked outside the author’s marketing

Stars, mirror repos, and self-graded quality checklists are not substitutes for
those four. They may accompany a win; they do not define it.

### 2.3 Ambition (held, not shrunk)

Ambition is **maximum real job coverage under one deep basis**, not a smaller
world that looks tidy:

- Cover the jobs agents actually need to do well for product, engineering,
  research, commercial, and ops work—without a hard listing cap.
- Keep **one product model** (Verified Capabilities) that composes across hosts
  and companies.
- Grow until the basis is stressed; then deepen the basis—do not fork a second
  product identity for every new vertical.

Simplicity here means **fewest product concepts** that still express that
ambition—not fewer capabilities as a virtue.

---

## 3. What this repository is (and is not)

### 3.1 Is — open foundation of Sylphx Verified Capabilities

| Surface | Role |
| --- | --- |
| **Capability packages** (`skills/<id>/`) | Portable, requestable jobs with procedure, contract, and honest qualification record |
| **Catalog** (`catalog.json`) | Projection of packages + qualification state—not a second truth source |
| **Qualification ledger & evals** | Human-readable and machine-bound evidence of package fitness |
| **Outcome-receipt schema** | Recording contract for live outcomes (oracle is never this repo) |
| **Install / AutoSync runtime** | Exact-revision sync to Codex, Claude Code, Grok Build under a release-tag channel |
| **Constraint packs under jobs** | Engineering, delivery, commercial, decision standards—composition depth, not separate product objects |

### 3.2 Is not

| Not this | Why |
| --- | --- |
| Marketplace or app store | No review board, ranking game, or paid listing identity here |
| Agent runtime or model host | Hosts discover and execute; we ship packages + contracts |
| Control Plane | Live activation, org policy, continuous private qualification, and receipt reconciliation are a **separate product** |
| “Biggest skill library” contest | Count is not value; false-qualified is worse than unqualified |
| Policy encyclopedia listing skills | Standards live under applying job skills (`docs/AUTHORITY-MAP.md`) |
| Fabricator of outcome receipts | User system owns the oracle; we only define the receipt shape |

### 3.3 Boundary with Control Plane and user systems

| Authority | Owns | Does not own |
| --- | --- | --- |
| **This repository** | Static packages, public qualification records, schemas, install/sync | Live work state, org adoption, hosted services |
| **Named evaluator / attestor** | Qualification *result* for a package version | Package content authorship |
| **User product / system** | Outcome **oracle** for the user’s actual result | Catalog or qualification truth |
| **Control Plane (paid assurance)** | Live recording, activation policy, private portfolios, reconciliation | Static open packages (this repo) |

Open foundation stays inspectable. Paid assurance prices **assurance scope and
qualification workload**, not downloads, seats, or file count. No price is
published from this repository without buyer research and observed willingness
to pay.

---

## 4. Three durable product concepts

Only three. Composition, catalogs, badges, dashboards, and agent listings are
**projections** of these authorities—never a fourth product object and never a
new source of truth.

### 4.1 Capability

**Meaning.** One portable **user job**: boundaries, inputs and outputs, required
tools/data/permissions, failure semantics, and an **externally observable
outcome contract**.

**Carrier.** A Skill is the host-standard package format (`SKILL.md` +
`capability.json` + `qualification.json` + optional `references/` /
`scripts/` / `assets/`).

**Truth authority.** Package source owns the **declaration**, never the truth
of its claims. A well-written capability is still unqualified until evidence
says otherwise.

**Listing rule.** List when the job is independently requestable, has its own
outcome, fills a real agent gap, and has a specific procedure. Put standards,
domain matrices, and engine tooling in `references/` under the applying job—not
as peer listings.

### 4.2 Qualification

**Meaning.** Reproducible, **version-scoped** evidence that a capability version
is safe, applicable, current, and **outcome-positive relative to baselines** in
declared environments (incremental value, compatibility, provenance, security
backstops, currentness).

**Truth authority.** A **named evaluator or attestor** owns the result. The
repository records and projects it; it does not invent it from CI green.

**Hard rules.**

- `unqualified` is the honest default.
- `qualified` requires named evaluator, digest-bound evidence, compatibility
  rows, and a future `expiresAt`.
- Any material byte change to what the agent loads invalidates matching
  qualification (package digest identity—see `docs/QUALIFICATION.md`).
- Structural/runtime CI proves **consistency**, never capability value.
- AutoSync **fails closed** on qualified → unqualified demotion unless an
  explicit override is recorded.

### 4.3 Outcome receipt

**Meaning.** Evidence that the user’s **actual** result satisfied the declared
oracle—or failed, recovered, or remained unresolved.

**Truth authority.** The **user’s product/system owns the oracle**. The Control
Plane owns live recording and reconciliation when that product is in use. This
repository owns only the **schema** (`schemas/outcome-receipt.schema.json`) and
never fabricates receipts.

**Why it is separate from qualification.** Qualification answers: “Is this
package version worth loading *in declared environments*?” Outcome answers:
“Did *this attempt* help the user’s real system under *its* oracle?” Conflating
them produces either false product wins (self-graded packages) or permanent
zero metrics (waiting for a Control Plane that is not this repo’s delivery
unit).

---

## 5. North Star metrics (stage-honest)

A North Star metric that cannot move under real work is decoration. A metric
that moves on vanity is a trap. This product therefore uses a **stage-honest
ladder**: one **active compass** at a time, with the eventual product truth
defined early so we do not invent a second identity later.

### 5.1 Stage A — active compass now (open foundation)

**Name: Trustworthy Job Coverage (TJC)**

Among **high-value requestable jobs** the portfolio intends to cover:

| Gate | Requirement |
| --- | --- |
| **Listed** | Independent listing with `capability.json` outcome contract |
| **Discoverable** | Host-facing `name` + `description` discriminate the job (near-miss safe) |
| **Honestly qualified** | Current package digest is `qualified` with unexpired, digest-bound evidence from a named evaluator |
| **Not false-qualified** | No `qualified` claim without evidence; demote on digest change |

**TJC improves only when** real jobs gain honest, current qualification—or when
false trust is removed. It does **not** improve by:

- adding unqualified wallpaper listings
- self-grading Quality vocabulary (`q-*`) audits
- inflating catalog count
- green `npm test` alone
- writing yield dashboards with zero receipts

**Repo-owned projections that feed TJC:**

- `catalog.json` → per-package `qualified` / `qualificationStatus` and
  top-level `qualification` block
- each package’s `qualification.json` + `docs/qualification/evals/` evidence
- `docs/qualification/LEDGER.md` human ledger
- package digests and promotion manifests that pin what machines install

**Floor (required, not North Star):** schema validity, integrity gates, test
green, release-tag AutoSync (`docs/PROMOTION.md`). Floors prevent rot; they do
not prove value.

### 5.2 Stage B — product truth when outcomes are recorded

**Name: Verified Capability Yield (VCY)**

\[
\text{VCY} =
\frac{\text{value-weighted externally verified successful outcomes}}
{\text{value-weighted eligible attempts}}
\]

**Eligible attempt** only if capability versions in use are:

1. **Current** (applied release matches intended channel tip; not a stale pin
   pretending to be live),
2. **Qualified** for those versions, and
3. **Authorized** for the actual context (policy / host / tenant rules).

**Hard gates (not soft score penalties):**

- Unverifiable “success,” unresolved critical security condition, or
  false-success under the oracle → attempt is **ineligible for a positive
  result** (does not pad the numerator; often excludes the attempt from
  success attribution entirely).
- Correctness and Security floors from universal principles apply: evidence
  discipline and least privilege are not traded for a prettier yield.

**When Stage B activates.** When user systems and/or the Control Plane emit
real outcome receipts against the schema—not when this repository invents
synthetic receipts for dashboard theater.

**Relationship of stages.**

| Stage | Role |
| --- | --- |
| **A — TJC** | Steers *this repository’s* authoring, curation, qualification, and release honesty **today** |
| **B — VCY** | Steers *product system* success when live outcomes exist; TJC becomes a **leading** indicator of whether yield *can* be non-zero |

Do not run Stage B dashboards as the daily compass while receipts = 0. That is
flying blind with expensive instruments.

### 5.3 Dominated vanity metrics

These may be observed; they **never** define success:

| Proxy | Failure mode if optimized |
| --- | --- |
| Install / star count | Distribution without trust |
| Listing count | Wallpaper catalog |
| CI green | Consistency ≠ value |
| Self-graded `q-*` pass | Authoring quality ≠ qualification |
| “Docs feel complete” | Fluency ≠ oracle |
| Permanent dual-path “safety” | Entropy tax on every future agent |

---

## 6. How principles and quality vocabulary relate (no name collision)

Three layers. Do not flatten them.

| Layer | Name | Role | Document |
| --- | --- | --- | --- |
| **Universal how** | Principles (9) | Tradeoff floors for *any* design work | `docs/policies/PRINCIPLES.md` + compact `runtime/constitution.md` |
| **Product win** | **Product North Star** (this file) | What Verified Capabilities optimizes | `docs/NORTH-STAR.md` |
| **Engineering quality vocabulary** | Quality North Star (`q-*`) | How to author durable engineering *inside* packages and product code | `skills/build-product/references/engineering-standard/` |

**Rules of separation:**

1. Principles do not replace product metrics.
2. Quality North Star (`q-*`) is **self-graded authoring vocabulary**. A green
   quality pass is **never** qualification evidence and **never** VCY.
3. Only **Product North Star** uses the unqualified phrase “North Star” for
   *this product’s* win condition. In engineering prose, say **Quality North
   Star** or **`q-*` vocabulary** when you mean the engineering set.
4. Default quality precedence and pocket questions live under
   `quality-north-star-usage.md`; product stage metrics live only here.

**Universal principles one-liner** (how we work—not the product metric):

> Deep basis, correct outcomes, minimal concepts—maximum capability; easy to
> change, impossible to fly blind, fast under load; hard to kill, hard to
> breach, costs priced in agent-native budgets.

---

## 7. Design laws for this product (derived, binding)

These are product laws for Verified Capabilities—not a second principles list.

1. **Trust ceiling.** Trust granted to a package ≤ trust justified by current
   qualification + install authenticity. Never above.
2. **Honest default.** Unqualified packages remain installable (open
   foundation) but never claim with-skill value.
3. **One job, one listing.** No method-bag super-skills; no standards as fake
   jobs.
4. **Fewest product concepts.** Capability · Qualification · Outcome receipt.
   Resist meta-packs, claim-surface tiers, and parallel “trust scores.”
5. **Fail-closed distribution.** AutoSync applies only annotated release tags
   with verified promotion manifests; branch-following is retired.
6. **Digest is identity.** What the agent loads is what qualification binds;
   evidence metadata must not silently re-badge a different package.
7. **Oracle externality.** This repo never grades its own live outcomes.
8. **Ambition-preserving simplicity.** Grow real jobs; integrate standards
   under jobs; do not delete hard jobs to look clean.
9. **Agent-native economy.** Price entropy, verification, attention, runtime,
   coordination, and reversal—not human person-days as the default cost story
   for catalog and qualification work.
10. **Stage honesty.** TJC until receipts; VCY when receipts exist; no theater.

---

## 8. Current honest projection

*Snapshot for operators and agents. Update when qualification or receipt
reality changes; do not freeze vanity.*

| Signal | State (as of 2026-08-13; catalog/LEDGER win over this snapshot) |
| --- | --- |
| Capability packages | **56** |
| Qualified (version-scoped, expiring) | **39** (see catalog / LEDGER; some digests may demote on content change) |
| Unqualified (honest default or demoted) | **17** including core jobs whose digests churned (e.g. `build-product`, `drive-to-delivery` when engineering depth changed) |
| Native-activation selection evidence | Subset of qualified only (see LEDGER); selection remains host/model contextual |
| Outcome receipts recorded in this repo | **0** (by design—external oracle) |
| Verified Capability Yield | **Undefined / no eligible attempts** until real receipts exist |
| Active compass | **Stage A — TJC** (raise honest current qualification of high-value jobs; zero false-qualified) |
| Structural CI | Consistency floor only—not value |

Re-read `catalog.json`, `docs/qualification/LEDGER.md`, and the latest
`skills-v*` promotion for machine-current numbers. Narrative snapshots lag
git; **catalog and tags win**.

---

## 9. What work raises the North Star (and what does not)

### 9.1 Raises Stage A (TJC)

- Qualify or re-qualify high-value jobs with real with-skill vs baseline
  evidence (`design-skill-evals`, `docs/QUALIFICATION.md`)
- Demote false or stale qualified claims immediately on digest change
- Improve discoverability of real jobs (description discrimination, not SEO
  spam)
- Keep install/promotion channel honest so “qualified on main” equals “what
  agents can apply”
- Merge redundant dual methods into one sole-writer procedure (capability
  held)

### 9.2 Raises Stage B (VCY) — when available

- Emit and reconcile real outcome receipts under external oracles
- Improve authorization/currentness so attempts become eligible
- Remove false-success paths that would corrupt the numerator

### 9.3 Does not raise either (do not prioritize as North Star work)

- Meta-framework docs that do not change package evidence
- Expanding listing count without jobs or contracts
- Self-attestation badges
- Synthetic receipts
- Parallel quality slogan lists
- Permanent dual-write “just in case” systems in product code this repo teaches

---

## 10. Open foundation and commercial edge

| Layer | Offer | Price basis |
| --- | --- | --- |
| **Open foundation (this repo)** | Portable contracts, packages, public qualification evidence, install tooling | Free and inspectable |
| **Paid assurance (Control Plane)** | Private portfolios, continuous context-specific qualification, org policy/evidence projections, assurance support | Assurance scope + qualification workload—not seats or file count |

Public product narrative may lead with the promise of trusted methods and
proven outcomes; **engineering and delivery claims** still separate local /
landed / live and refuse fabricated receipts. Marketing does not rewrite this
North Star; this North Star constrains what marketing may honestly imply about
*this repository’s* delivered surface.

---

## 11. Kill criteria — what would change this North Star

Review live with evidence—not annually by slogan.

| Evidence | Pivot |
| --- | --- |
| Repeat-use shows authored methods alone drive durable outcome lift and paid retention without qualification machinery | Premium curated-library product becomes credible; slim qualification theater |
| Cross-runtime qualification fails to transfer, or currentness cost exceeds risk it protects | Vertical outcome product with fewer portable claims |
| Host-neutral standard absorbs interoperable qualification + provenance as commodity | Specialize in a valuable domain; stop duplicating the commodity layer |
| Usage concentrates in one workflow with a defensible oracle and buyer | That vertical becomes the commercial spear; foundation remains shared substrate |
| Stage A plateaus because agents never select installed skills | Fix discovery/activation product problems before more qualification spend |

---

## 12. Operating checklist (agents and humans)

Before claiming North Star progress:

1. Which stage compass is active (A or B), and why?
2. What exact evidence moved (catalog digest, qualification record, receipt id)?
3. Did trust increase **above** evidence? If yes, stop—regression.
4. Did we add a fourth product concept or vanity metric? If yes, delete or
   demote it.
5. Economy: which agent-native budget did this spend or save, how measured,
   which principle traded?

---

## 13. Related authorities

| Document | Relationship |
| --- | --- |
| `docs/policies/PRINCIPLES.md` | Universal principles (9); how we work |
| `docs/MODEL.md` | Capability package model and listing rules |
| `docs/QUALIFICATION.md` | How qualification is earned and filed |
| `docs/PROMOTION.md` | Release-tag AutoSync channel |
| `docs/AUTHORITY-MAP.md` | Constraint pack owners + Verified Capabilities boundary |
| `docs/history/adr/ADR-20260810-verified-capabilities-model.md` | Original clean-break product identity |
| `docs/history/adr/ADR-20260812-stage-honest-product-north-star.md` | Stage-honest TJC + VCY ladder (this redefinition) |
| `skills/build-product/references/engineering-standard/` | Quality North Star (`q-*`) engineering vocabulary |
| `schemas/outcome-receipt.schema.json` | Outcome receipt contract |

---

*Product North Star ends here. Engineering quality vocabulary continues under
Quality North Star (`q-*`). Universal principles continue under PRINCIPLES.md.
Do not merge the three into one slogan document.*
