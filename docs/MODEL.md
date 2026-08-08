# Agent Skills model

## Meaning

A **Skill** is a specialized package an agent loads for **one requestable job**:

- short `name` + `description` for discovery (listing metadata and/or RAG)
- procedure body
- optional `references/` / `scripts/` for depth

Progressive disclosure: discover → body → references when the body says so.

## No hard catalog cap

Skill counts **grow** as real jobs accumulate. Some runtimes use small metadata windows; others (including Spiron-style RAG discovery) support large catalogs.

**Never use a fixed listing count (e.g. 15–25) as a merge/demote target.**  
Organize by semantics: requestable job vs subordinate depth—not by compressing until a number looks clean.

## When to list vs reference

**List** when the job is requestable, has an independent outcome, fills a real agent gap, and has a specific procedure.

**Reference** when the material is:

- a standard/policy/profile
- a shape/domain table under a real job (`design-product/references/app`)
- engine tooling under a product job (`build-product/references/keel-app`)
- long matrices/examples for an already-listed job

Merge only when job + artifact + acceptance authority are the same. Split when they are not.

## Install reality

Installer copies `skills/*` only. Agent-needed depth must live under skill packages. `docs/` is human git documentation.

## Constraint packs

Not listings. One owner skill each; others link. No standards bag skill.

## Dual-host authoring

- **Listing-budget hosts:** keep `name`+`description` short and discriminating; measure aggregate description size; front-load job language; run near-miss checks. Soft capacity may constrain description characters—not job existence.
- **RAG / large catalogs:** same descriptions as retrieval keys; do not dump foreign skill ids into bodies for routing; put domain maps in `references/INDEX.md` and open one pack at a time.
- **Every reference tree** under a skill should be reachable from that skill's body with an explicit when-to-open cue.

## Constraint pack authority

Constraint packs resolve only under applying skills. Never invent top-level
`skills/<pack>-standard/` listings for standards, profiles, or matrices.
Engineering quality vocabulary is the **Quality North Star** owned by
`build-product/references/engineering-standard` (Meta + 13 primaries; Simplicity
= compose without cutting capability; default quality precedence; not a listing
skill).

