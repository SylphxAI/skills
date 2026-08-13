# Capability model

The product identity is **Sylphx Verified Capabilities**. The **Product North
Star** is [`NORTH-STAR.md`](NORTH-STAR.md). Repo projection:
[`PROJECT.md`](../PROJECT.md) (Purpose · Product Vision · North Star Metric ·
Delivery · Links). Feature inventory: [`prd.md`](prd.md). Documentation altitude
(Vision · NSM · OKR · PRD · Spec · ADR · Diátaxis) is owned by
`skills/drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`.

A **Skill** is the host-standard package format that carries one **Capability**:
one portable user job with boundaries, inputs and outputs, required
tools/data/permissions, failure semantics, and an externally observable outcome
contract. That package is the **spec/detail** home for this product’s tools.

Every listing package under `skills/<id>/` is a capability and must carry:

- `SKILL.md` — short `name` + `description` for discovery, plus the procedure
  body (progressive disclosure: discover → body → references when the body
  says so);
- `capability.json` — the machine-readable capability contract
  ([schema](../schemas/capability-contract.schema.json));
- `qualification.json` — optional; only after a filed eval
  ([schema](../schemas/qualification-record.schema.json)); missing means
  `unqualified`;
- optional `references/` / `scripts/` / `assets/` for depth.

## Discovery is a floor

The always-on constitution directs every agent to **search the installed
capability catalog before acting** and to open the matching package. Skills are
checked first, not last; familiarity with the job is never a reason to skip
discovery.

## No hard catalog cap

Capability counts **grow** as real jobs accumulate. Some runtimes use small
metadata windows; others (including Spiron-style RAG discovery) support large
catalogs.

**Never use a fixed listing count (e.g. 15–25) as a merge/demote target.**
Organize by semantics: requestable job vs subordinate depth—not by compressing
until a number looks clean.

## When to list vs reference

**List** when the job is requestable, has an independent outcome, fills a real
agent gap, and has a specific procedure. Grain (industry: coherent unit, extract
from real tasks, neither mega-skill nor one-noun listings):
`skills/author-skill/references/skill-grain.md`.

**Reference** when the material is:

- a standard/policy/profile
- a shape/domain table under a real job (`design-product/references/app`)
- engine tooling under a product job (`build-product/references/keel-app`)
- long matrices/examples for an already-listed job

Merge only when job + artifact + acceptance authority are the same. Split when
they are not.

## Install reality

Installer copies `skills/*` only. Agent-needed depth must live under skill
packages. `docs/` is human git documentation.

## Constraint packs

Not listings. One owner skill each; others link. No standards bag skill.

## Dual-host authoring

- **Listing-budget hosts:** keep `name`+`description` short and
  discriminating; measure aggregate description size; front-load job language;
  run near-miss checks. Soft capacity may constrain description
  characters—not job existence.
- **RAG / large catalogs:** same descriptions as retrieval keys; do not dump
  foreign skill ids into bodies for routing; put domain maps in
  `references/INDEX.md` and open one pack at a time.
- **Every reference tree** under a skill should be reachable from that skill's
  body with an explicit when-to-open cue.

## Constraint pack authority

Constraint packs resolve only under applying skills. Never invent top-level
`skills/<pack>-standard/` listings for standards, profiles, or matrices.
Engineering quality vocabulary is the **Quality North Star** (`q-*`) owned by
`build-product/references/engineering-standard` (Meta + 14 primaries; Simplicity
= fewest concepts covering maximum capability; Economy = agent-native
entropy/verification/attention/runtime/coordination/reversal cost, not
person-days; default quality precedence; not a listing skill). Quality North
Star is an authoring quality vocabulary; it is **not** qualification evidence
and never substitutes for product evaluation claims (see `NORTH-STAR.md`).
