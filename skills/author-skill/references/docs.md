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
| What work is in progress? | the owning PR |

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
- A capability table is what a live end-to-end test measured, not what the code
  intends, because an unchecked table drifts and products have recorded
  capabilities as deleted while their code still ran.
- A repository keeps no `CLAUDE.md` that merely says "see AGENTS.md": only a
  file whose first line is `@AGENTS.md` imports the rules, and advice is not an
  import.
- Agent instructions name no retired system, because a "do not use X" line
  re-teaches X to every session.

## Capability table

A product's `docs/capabilities.md` lists its capabilities in one table:

```text
ID | Capability | Status | Code | Depends on
```

`Status` is `supported`, `partial`, `broken`, `blocked-on-platform`, `planned`,
`retired`, or `rename-to:<ID>`. A status is what a live end-to-end test measured,
not what the code intends: `broken` is built but failing for users, and
`blocked-on-platform` is built but waiting on a named platform issue. Every row
except `planned` and `retired` names the code path that implements it, and a
`retired` row names none. CI checks both directions: every named path exists,
and no code remains for a retired row. An unchecked table drifts; several
products marked capabilities deleted while their code still ran. A table in the
earlier `Fate` format is converted when it is next edited.

An entry page summarizes and links to a fact; each fact keeps exactly one
authority. Git history preserves prior decisions.

## What never belongs

Each type has a shape, and a document outgrowing its type asks for a split
rather than more space.

| Type | Never |
| --- | --- |
| Agent instructions | dated state, progress, records, retired-system warnings, runtime config values |
| Skill | copied facts with another home; a one-line pointer to a standard |
| README | agent instructions; facts with another home |
| Standard | procedures for one part of the tree; incident logs (name the incident inline instead) |
| Decision record | current state; analysis that led nowhere |
| Research note | decisions; instructions |
| History | guidance; forward claims |
| Runbook | explanation or reference (link them) |
| Reference | narrative; tutorials |

Sizes that hold today: agent instructions under 200 lines, a README one
screen, a skill thin enough that its body earns a load only when its trigger
fires. A standard much larger than its peers is a catalogue wearing a
standard's name: keep the three-layer standard and move the catalogue to
reference.

## Skills and colocated reference standards

A skill (`skills/<name>/SKILL.md`) is a reusable method: its YAML frontmatter
`description` names the concrete moment it applies (`Use when ...`) and what
adjacent skills to use instead, and its body carries the workflow steps.
Industry form (Anthropic Agent Skills, read 2026-10-18): a skill's metadata
loads in every session and its body loads only when triggered. Detailed
domain standards live directly inside that skill's `references/*.md` folder,
and `SKILL.md` lists which `references/*.md` file to load for each active
domain scenario (progressive disclosure).

Anything fitting no type above is one of the four Diátaxis forms — tutorial,
how-to guide, reference, explanation — and follows that form's rules
(diataxis.fr, read 2026-10-18).

## Claims stay inside their layer

A claim covers exactly the layer it was established at: local work is not landed
source, landed source is not a released artifact, a released artifact is not a
deployment, and a deployment is not a working product. State the layer with the
claim. A green check, an open pull request, and a health response each report
their own layer only.

State the goal, the material constraints, and what a finished result means.
Choose headings, prose, tables, and examples for clarity. Prefer concrete
language, and remove repetition and obsolete instructions.

## Agent instructions

A repository's agent instructions live in one root `AGENTS.md`, which every
harness loads automatically. For transitional Claude Code workers, a repository keeps no
`CLAUDE.md`, or one whose first line is `@AGENTS.md`, which imports the file.
A `CLAUDE.md` that merely says "see AGENTS.md" is advice, not an import.

The file loads into every session, so each line earns its place. It names no
retired system: a "do not use X" line re-teaches X to every session, and Git
history already keeps the lineage.

- Keep it under 200 lines. Hold what an agent needs in every session and cannot
  learn from the code: the owner, the commands, the gotchas, and the links to
  deeper material. A procedure or a fact about one part of the tree lives beside
  that part.
- Give each rule its reason in a clause. A current model generalizes from the
  reason, and the reason tells it when the rule stops applying.
- Write rules in plain, positive wording. Emphasis such as `MUST`, `NEVER`, or
  `CRITICAL` makes a current model over-apply the rule; reserve it for the one
  line agents keep missing.
- Leave out what current models already do: generic "verify your work" or
  "think carefully" instructions cause extra verification and thinking. Name
  the product's own post-deploy check instead.
- Keep dated state out. Instructions record how to work; progress lives in the
  owning pull request and the live system.

## Standards: guardrails, not rails

A standard gives an agent what it cannot infer: the goal, the reason, the few
hard lines, and how a result is judged. It does not script the work. A current
model follows literal rules too literally, so a long list of MUSTs produces
narrow, box-ticking work, while no guidance at all produces thin work. Write
each standard in three layers:

- **Hard lines**, few and stated once with their reason: what is criminal,
  loses customer data, takes money unfairly, or breaks a store or market rule
  we follow (the accepted risks record). Only this
  layer uses must or never.
- **A menu of options**, such as
  [the mechanics catalogue](../../self-challenge/references/mechanics-catalogue.md): known
  patterns, who uses them, and evidence. An agent reviews it once per design,
  may skip any entry, and may invent beyond it.
- **Outcomes**: the metric or observable result that says the work is good
  (retention, conversion, latency, a post-deploy check). A design is judged by
  its outcome, not by conformance.

Everything else is judgement, backed by context: who the product serves, what
the business needs, and what a big company in the same market does. Write for
the company's side ([conduct.md](../../self-challenge/references/conduct.md)). When a rule
exists only because of a past incident, name the incident so a reader can tell
when the rule no longer applies. Delete a rule that no longer earns its place.

## Plain language

Write for an engineer who knows the industry but not us. Use standard software,
operations, and product vocabulary in documents, comments, identifiers, commit
and pull request titles, and messages between agents. Do not coin a term, give
a metaphor a technical meaning, or use private shorthand: coined words make
every reader, human or agent, decode before they can act, and they spread by
copying.

Name the system, the action, and the result: "api 00611 has not been deployed
to production", not "the pin has not crossed". Spell out an abbreviation the
first time a file uses it, never reuse a severity label (P0) for a phase, and
refer to a decision by its title as well as its number. A file name states the
system and the symptom (a dated note named for the system and the symptom), not a
sentence.

Our product and company nouns (Cell, Release, Hands, Drive, Maintain) are
defined once, in the ownership record or
the portfolio record, and a term that is neither defined
there nor standard vocabulary is not used. Replace these coined terms on
sight; the column on the left names each coined term and the column on the right
the standard words to use instead:

| Instead of | Write |
| --- | --- |
| residual | legacy code, remaining work |
| honesty, honest | accurate status, fail-closed |
| dual-oracle | differential test |
| oracle (for a reference copy) | reference implementation |
| doorbell | wake-up webhook |
| the pin, pin moved | the deployed version |
| crossing, crosses release | deploy to production |
| polaris | target architecture |
| fence (outside fencing tokens) | lock, pause |
| ladder | order of preference |
| settled path | no-op path |
| clean cut, hard cut | breaking change |
| mint, seat (for a runner slot) | create, runner slot |
| effect writer, owning write | handler that changes state |
| gap fill | backfill |
| universe | catalog |
| seam | interface |
| denominator | inventory |
| evidence pack, proof-shaped | verification record, test environment |
| dens, densed, dens tip, dens-live | the specific thing: deployed version, promote, migrate, legacy BaaS runtime |
| readback | post-deploy check, production verification |
| class S | critical incident (the large-harm thresholds in priority.md) |
| stop-bleed | emergency mitigation |
| desk | our dev machine |
| feeder | dispatcher |
| lane | area, or queue where the industry word is queue |
| spawn gate | admission control |
| owner session | owner agent |
| service master | orchestrator |
| harness | coding agent |
| mailbox | inbox |
| dark scope | unpriced model tier |
| fused verdict, fused decision | consensus decision |
| land, landing (a change) | merge and deploy, merge |
| D-a, D-c, D-d, D-e, B1, the R0-R3 risk codes | state the rule directly: done means independently verified in production; blocking defect; the change category, such as docs or configuration, internal code, money or credential path, real-user or data change |

The shared `plain-language` action in the shared organization `.github` repository reports the
unambiguous entries (its `terms.tsv`) on changed lines; a repository calls it
rather than writing its own check. It runs in two modes. Advisory `warn` is
the default for ordinary documents: annotation on changed lines, because no
list of coined words is complete, so this rule and review still catch the
rest. It is enforcing, with `mode: fail`, on `AGENTS.md`, `CLAUDE.md` and
`.agents/skills/**`: a coined term
listed in `terms.tsv` on an added line there fails the check, and
`.github/workflows/plain-language.yml` runs it that way. A line that must keep
a term carries `plain-language: allow(<reason>; until=YYYY-MM-DD)`. The same
action's closed `product-names` list fails wherever it is called, as it does in
platform repositories.

## Documentation rot

- Evidence, receipts, audits, and progress notes are not committed as
  documentation; a claim links to the pull request, CI run, or production check
  that proves it. They grow without bound and bury the documents people need.
- CI checks every relative link and every repository path a Markdown file
  names, so a document cannot outlive the code it describes.
- A superseded or imported document is deleted, or keeps a single line pointing
  to its successor.
- Every deployed service has a short runbook for deploy, rollback, and
  restore, using commands that actually exist and following the
  [recovery ladder](../../deliver-and-verify/references/security.md#recovery-ladder).


## README visuals

When a repository includes a visual banner or status badges in its `README.md`,
prefer deterministic SVG assets or Mermaid diagrams over raster screenshots
that go stale. Keep partner-maintained repositories in the partner's own
branding.
