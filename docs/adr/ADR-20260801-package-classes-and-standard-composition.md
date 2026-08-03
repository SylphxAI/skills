---
id: ADR-20260801-package-classes-and-standard-composition
status: accepted
date: 2026-08-01
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-0009-native-skill-discovery-and-package-boundaries
  - ADR-20260731-thin-dual-layer-progressive-instruction-system
scope:
  - static-instruction-packages
  - skill-authoring
  - runtime-constitution
---

# Package classes and where standards live

## Context

The public Agent Skills ecosystem ([agentskills.io](https://agentskills.io),
Codex Skills, Claude Code Skills, GitHub Copilot / Microsoft Agent Framework
Skills) defines **Skills** as portable on-demand packages of specialized
knowledge and **workflows**, loaded by progressive disclosure
(`name`/`description` first, body on activation, resources as needed).

Separately, the same ecosystems define **always-on project instructions**
(`AGENTS.md`, `CLAUDE.md`, repository custom instructions) for norms that
should apply broadly. Industry guidance is **compress always-on and put long
methods in Skills** — not a ban on project standards living in always-on files.

SylphxAI/skills installs ~112 on-demand packages, including many named
`*-standard`. That naming causes two failures:

1. People read "standard" as always-on excellence law, but Skills are on-demand.
2. Some packages are true procedures/loops packaged under a `-standard` suffix,
   so "find work", "drive work to done", and "product betterment" all sound
   like the same kind of object.

This ADR freezes an authoring model that follows industry **loading channels**
while still allowing workflows to compose binding standards. Content classes
are **Sylphx authoring labels**, not host Skill subtypes.

Independent adversarial review of the draft accepted the two-channel model and
rejected mega-merge/meta-router paths; it required the amendments below
(loop packages are not pure policy; thin L0 is Sylphx product policy; soft
composition under native discovery).

## Decision

### 1. Two industry loading channels (do not invent a third official Skill type)

| Channel | Industry home | Sylphx home | Content |
| --- | --- | --- | --- |
| Always-on instructions | `AGENTS.md` / `CLAUDE.md` / custom instructions / project rules | `runtime/constitution.md` (L0) for **public default**; product repos may add short local norms | Host-persistent text every turn |
| On-demand packages | Agent Skills / `SKILL.md` | `skills/<id>/` | Specialized procedures, reviews, policy packs, adapters |

There is **no** agentskills.io enum `type: standard | workflow`.  
Sylphx may label packages for authoring clarity, but labels do not change host
loading behavior: every `skills/*` package is on-demand.

**Industry vs Sylphx product policy:** Industry practice routinely keeps
coding conventions, build/test commands, and architecture notes in always-on
files. Sylphx **public default** keeps L0 at miss-class-A floors only
([ADR-20260731-thin-dual-layer-progressive-instruction-system](ADR-20260731-thin-dual-layer-progressive-instruction-system.md))
to defend progressive disclosure and listing budgets. That thinness is a
Sylphx architecture choice, not a claim that industry forbids project norms in
`AGENTS.md`.

Skills content is not limited to "workflows only": official language includes
workflows, best practices, domain expertise, and guidance. Policy/predicate
packs and review rubrics are valid Skill bodies. What industry rejects is
treating Skills as **always-on law**.

### 2. Sylphx package classes (authoring labels only)

Every package under `skills/` MUST be authored as exactly one **primary**
class (hybrids allowed only when explicitly documented as hybrid with a
named primary):

| Class | Meaning | User asks for | Primary artifact |
| --- | --- | --- | --- |
| `workflow` | Reusable multi-step job or operating loop | "Do X" / keep operating Y | Job artifact (contract, pass, report, package, loop state, effect plan) |
| `review` | Assessment/design audit job | "Audit/design X" | Assessment or design record |
| `policy` | Compose-on constraints / binding predicates | Often while doing another job; also standalone when conformance *is* the job | Predicates / conformance notes integrated into host artifact (or one domain conformance record) |
| `adapter` | Live system operations | "Operate Enact / harness goal / provider API" | Live readback / effect evidence |

**Primary-artifact test (prefer over suffix):**

- Multi-step job artifact is primary → workflow / review / adapter.
- Predicates applied to someone else's artifact are primary → policy.
- Both large and independently requested → two packages or a workflow with a
  thin policy extract — not one bloated hybrid named `*-standard` by prestige.

Naming guidance:

- Prefer job nouns for workflows (`finish-product`, `run-open-product-betterment`).
- `-review` for assessment jobs.
- `-standard` **only** for packages whose **primary** class is `policy`
  (binding predicates / profiles), not prestige for any important package.
- If a package is a procedure or loop, do not name it `-standard` merely to
  sound authoritative.
- Classes live in ADRs, authoring guides, PR checklists, and optional
  `references/` notes — **not** non-portable frontmatter beyond
  `name`/`description` (portable agentskills strict subset).

### 3. Workflows may and should follow standards

A workflow is not free of standards. Composition is required:

```text
always-on L0 floors (+ product-repo short local norms when present)
  + on-demand policy packages (when domain touched)
  + workflow/review procedure
  + adapter (when live tools present)
```

Rules:

1. **L0** holds only universal miss-class-A floors under Sylphx public default
   (authority, evidence, done boundaries, native discovery, non-fabrication,
   non-interference). Product repos may add short local norms in their own
   always-on files without expanding public L0.
2. **Policy packages** hold reusable excellence/validity predicates that are too
   large or too domain-specific for L0 (delivery proof model, tech-stack
   profile, source authoring, evidence grading, portable work-ledger semantics).
3. **Workflow packages** hold the job procedure and name which policy packages
   they compose.
4. **Tech stack / engineering excellence** defaults:
   - universal one-liners → L0 only if they pass L0 admission;
   - full stack profile / engineering method → `policy` skill
     (`technology-stack-profile`, `engineering-standard`) or product-repo
     always-on docs when repo-specific;
   - a product workflow must say "compose engineering-standard /
     technology-stack-profile when implementing", not copy the whole stack into
     every workflow.

#### Composition reliability (native discovery caveat)

Under [ADR-0009](ADR-0009-native-skill-discovery-and-package-boundaries.md)
there is **no portable Skill dependency graph**. Body loads after selection.
"Workflow body names `delivery-standard`" is **soft composition**, not
host-enforced load order. Material policy loads only if:

1. the workflow body explicitly tells the agent to open those packages /
   references and the agent complies, and/or
2. policy descriptions also match and the host co-selects them.

Authoring must therefore pair composition lists with description co-triggers
and explicit first-step "read composed policy packages" when obligations are
material. Class labels alone do not fix utilization.

### 4. Loop layers (hard split)

| Loop layer | Primary class | Owner package | Terminal |
| --- | --- | --- | --- |
| Product betterment | workflow | `run-open-product-betterment` | Idle frontier (not perfection) |
| Single-objective closure | **workflow** (execution method; may embed predicates) | `drive-to-delivery` | Delivery terminal for one accepted objective |
| Continuous work selection OS | **workflow** (work OS method; may embed predicates) | `select-next-work` | Tick/report; continuous by design |
| Portable coordination semantics | policy | `work-coordination-standard` | N/A (semantics) |
| Live coordination ops | adapter | `coordinate-enact-work` | Live Work effect/readback |
| Harness recovery | adapter (tool surface) + workflow binding | host Goal System via CPQ / execution workflows | Resume uncapped goal |

Do **not** treat product betterment, single-objective closure, and continuous
work selection as one package or one `-standard` prestige suffix.

**Rename note:** `drive-to-delivery` and `select-next-work` are
job-named **workflow** packages (ADR-0016 hard rename; no discoverable
`*-standard` alias). Their primary class is workflow (loop/execution method with
embedded binding predicates). If a pure predicate subset is needed later,
extract it into a separate policy pack — do not reintroduce a prestige
`*-standard` suffix on the workflow package.

### 5. What "automation" is not

A Skill named for automation or a policy about automation is **instruction
text**. It does not start a scheduler, set a harness Goal, or claim Work.
Runtime auto-loop requires Goal/Work/scheduler surfaces + an owning workflow
(for example `run-open-product-betterment` binding uncapped harness goals).

### 6. Catalog size and unify rules

- Catalog size is governed by **distinct requestable jobs / artifacts /
  acceptance authority** ([ADR-0009](ADR-0009-native-skill-discovery-and-package-boundaries.md)),
  not by a target package count.
- Prefer **core exposure + domain packs / explicit install** over mega-merging
  unrelated reviews into giant skills.
- Absorb only when job, artifact, acceptance authority, and essential mechanism
  materially coincide. First investigative candidate (not auto-merge):
  `enterprise-profile-standard` into `enterprise-control-plane-standard`;
  evaluate manifest/spec control-plane overlap separately.
- No meta-router Skill.

### 7. Change program

1. Land this ADR + authoring guide as accepted companions.
2. Prefer **reclass + description + composition wording** before renames.
3. Rename only when the suffix itself causes misroute or false always-on
   expectation; evidence-gate with routing cases.
4. Do not claim host utilization solved by ontology; utilization residual
   remains open without behavior-oracle evidence.
5. Do not market Sylphx thin L0 as universal industry SOTA; market it as
   Sylphx public dual-layer product policy on top of industry two-channel
   progressive disclosure.

## Consequences

- "Standard" stops meaning "important skill" and means "compose-on policy pack"
  (or always-on L0 floor when in the constitution).
- Workflows explicitly compose policy packs (delivery, engineering, stack,
  evidence, coordination) instead of restating them, with soft-load honesty.
- Loop engineering vocabulary splits by layer; execution/work-OS methods are
  workflows even when still named `*-standard`.
- Catalog may still be large; size is governed by distinct jobs/artifacts, not
  by turning every predicate set into a fake always-on law.

## Verification

- Authoring guide exists and matches this ADR.
- Reclass inventory lists packages with KEEP-policy / RENAMED-workflow /
  KEEP-separate / RETIRE-candidate, and records completed hard renames.
- New/changed packages declare primary class in PR notes / CONTRIBUTING
  checklist (docs only — not frontmatter).
- Descriptions for true policy packs use compose/not-workflow language.
- `run-open-product-betterment`, `drive-to-delivery`, and
  `select-next-work` descriptions exclude each other by layer.
- No claim that Skills are an industry "standard package type" distinct from
  workflows; Skills *are* the on-demand specialized-package channel.
- Industry claims distinguish public agentskills progressive disclosure from
  Sylphx thin-L0 product choice.

## Status

`accepted` after independent review concurrence with amendments landed.
