# Documentation

Trigger: writing or moving a durable fact, writing agent instructions, or
deciding where documentation belongs.

| Question | Authoritative home |
| --- | --- |
| Where does work, or a document, about one product happen? | that product's repository, opened or cloned from the portfolio record |
| What is this repository and how do I use it? | `README.md`, linking to deeper material |
| What product are we building, for whom, and within which boundaries? | that product's `docs/vision.md` |
| Which capabilities exist, in what state, and where is their code? | that product's `docs/capabilities.md` |
| Where do a platform service's vision and capabilities live? | the platform repository, `docs/services/<name>/vision.md` and `capabilities.md`; the platform's own are `docs/vision.md` and `docs/capabilities.md` |
| What exact interface and failure behavior bind? | the executable schema, protocol, and contract tests |
| Why does a material decision stand? | rationale beside the owning destination or contract |
| How is the system operated and recovered? | product runbooks, normally `docs/runbooks/` |
| What work is in progress? | the owning outcome record and PR, where one exists |

The company notebook holds only the view across
products: the portfolio, ownership, the standards every product meets, and how
products relate. A product fact sitting there is a wrong home - move it to the
owner rather than keeping two copies.

## Hard lines

- One home per fact. A product's destination, capability graph, runbooks,
  decisions, public documentation, and state live in that product's repository,
  because a product fact kept beside the company view drifts from the work that
  owns it.
- A claim names the layer it was established at, because local work is not
  landed source, landed source is not a released artifact, a released artifact
  is not a deployment, and a deployment is not a working product; a green check,
  an open pull request, and a health response each report their own layer only.
- A capability table distinguishes planned behavior, implemented source and
  verified deployment, with evidence appropriate to each claim.
- Use the runtime's supported instruction discovery or import syntax and verify
  which files the session actually loads.
- Remove obsolete instructions when their replacement is in place, so the
  active guidance describes the current path.

## Capability table

A product's `docs/capabilities.md` lists its capabilities in one table:

```text
ID | Capability | Status | Code | Depends on
```

`Status` is `supported`, `partial`, `broken`, `blocked-on-platform`, `planned`,
`retired`, or `rename-to:<ID>`. Use `supported` for behavior verified in its target environment,
`partial` for an incomplete implementation or acceptance result, `broken` for
implemented behavior failing its acceptance test, and `blocked-on-platform`
for a named platform dependency. `planned` states intended work. Every row
except `planned` and `retired` names the code path that implements it, and a
`retired` row names none. Where the repository provides capability checks, run them to validate named
paths and removal claims. Otherwise verify the affected paths directly.

An entry page summarizes and links to a fact; each fact keeps exactly one
authority. Git history preserves prior decisions.

## Document roles

Choose a structure that makes the reader's task easy. Link related material to
its authoritative home when repeating it would create competing copies.

| Type | Main purpose |
| --- | --- |
| Agent instructions | Shared commands, working constraints and links needed across sessions |
| Skill | A reusable scenario and chosen method |
| README | Repository introduction and navigation |
| Standard | A method, binding constraints and observable results |
| Decision record | A material choice, authority, rationale and replacement conditions |
| Research note | Sources, observations and competing hypotheses |
| History | Dated records of what happened |
| Runbook | An operation, its prerequisites and verification |
| Reference | Information arranged for lookup |

Keep entry pages concise enough to navigate. Move detailed domain material
to linked references when it obscures the common workflow. Apply the target
runtime's documented context limits.

## Skills and colocated reference standards

A skill (`skills/<name>/SKILL.md`) is a reusable method: its YAML frontmatter
`description` names the concrete moment it applies (`Use when ...`) and what
adjacent skills to use instead, and its body carries the workflow steps.
The [Agent Skills specification](https://agentskills.io/specification) describes
progressive disclosure: metadata supports discovery, the body supplies active
instructions, and referenced resources load when needed. Detailed
domain standards live directly inside that skill's `references/*.md` folder,
and `SKILL.md` lists which `references/*.md` file to load for each active
domain scenario (progressive disclosure).

For user documentation, choose the form that serves the reader: a tutorial
for learning, a how-to guide for a task, reference for lookup, or explanation
for understanding.

## Claims stay inside their layer

State the source, revision and layer of a claim. Use the evidence boundaries in
[Hard lines](#hard-lines); link the durable receipt when the reader needs it.

State the goal, the material constraints, and what a finished result means.
Choose headings, prose, tables, and examples for clarity. Prefer concrete
language, and remove repetition and obsolete instructions.

## Agent instructions

Put shared repository instructions in `AGENTS.md` and use the target runtime's
supported discovery or import mechanism. Nested instructions may describe a
subtree. Check the session's loaded context when diagnosing a missing rule.

Instruction text consumes context whenever loaded. Keep the current working
path there and preserve historical rationale in version control.

- Hold what an agent needs across sessions and cannot
  learn from the code: the owner, the commands, the gotchas, and the links to
  deeper material. A procedure or a fact about one part of the tree lives beside
  that part.
- Give each rule its reason in a clause. The reason explains when the rule stops applying.
- Write rules in plain, positive wording. Reserve emphatic wording for a documented binding
  constraint or a recurring failure that ordinary wording did not prevent.
- Name the product's post-deploy check and its expected result rather than
  repeating generic advice.
- Keep dated state out. Instructions record how to work; progress lives in the
  owning pull request and the live system.

## Standards: guardrails, not rails

A standard gives the reader the goal, chosen method, material constraints and
observable verdict. Explain why the method fits and what evidence would change
it. Use quantitative models when the inputs and decision support them; use
explicit qualitative comparisons when numbers would create false precision.

- **Constraints:** state binding legal, data, spend or contractual boundaries
  with their authority and scope. A default remains adjustable by its owner.
- **Method:** name the selected method and its assumptions. For an externally
  attributed method, cite the primary source read in the current session. A
  source table is useful when several methods need comparison; a short standard
  can cite the source beside the rule. Label a local formula as a chosen model.
- **Verdict:** name the outcome or metric that establishes success. Use the
  relevant [mechanics menu](../../self-challenge/references/mechanics-catalogue.md)
  when it helps the design, and compare material alternatives.

State the witnessed failure or binding requirement behind a control. Keep its
scope no tighter than that need, and remove it when it no longer earns its cost.
Current company scale, budget and portfolio belong in workspace instructions;
apply the reusable [conduct method](../../self-challenge/references/conduct.md)
within that context.

## Plain language

Write for an engineer who knows the industry but not us. Use standard software,
operations, and product vocabulary in documents, comments, identifiers, commit
and pull request titles, and messages between agents. Do not coin a term, give
a metaphor a technical meaning, or use private shorthand: coined words make
every reader, human or agent, decode before they can act, and they spread by
copying.

Name the system, the action, and the result: "the API version has not been deployed
to production", not a private deployment metaphor. Spell out an abbreviation the
first time a file uses it, never reuse a severity label (P0) for a phase, and
refer to a decision by its title as well as its number. A file name states the
system and the symptom (a dated note named for the system and the symptom), not a
sentence.

Use the [terminology glossary](../../clear-writing/references/terminology.md)
when translating internal shorthand or naming a new concept. It is the single
mapping from retired labels to sourced industry vocabulary. Product names belong
in the workspace ownership record, not in a reusable terminology standard.

## Documentation rot

- Keep progress in the owning work record. Link durable claims to their
  supporting evidence; retain a stable audit or recovery record when it is
  needed to operate the system or meet an obligation.
- Automate relative-link and named-path checks where possible, and run the
  repository's existing checks after moving documents.
- A superseded or imported document is deleted, or keeps a single line pointing
  to its successor.
- Every deployed service has a short runbook for deploy, rollback, and
  restore, using commands that actually exist and following the
  [recovery procedure](../../deliver-and-verify/references/security.md#recovery-procedure).


## README visuals

When a repository includes a visual banner or status badges in its `README.md`,
prefer deterministic SVG assets or Mermaid diagrams over raster screenshots
that go stale. Keep partner-maintained repositories in the partner's own
branding.
