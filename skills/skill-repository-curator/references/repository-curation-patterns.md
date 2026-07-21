# Skill Repository Curation Patterns

## The four separate verdicts

Never compress these questions into one score or lifecycle label:

1. **Job value** — Is this a recurring or strategically material job whose
   mishandling loses product quality, revenue, retention, trust, safety, or
   operating leverage?
2. **Package value** — Does the current package contain non-derivable decisions,
   state, checks, failure modes, or procedures, and can an agent execute it
   without hidden context or invented capability?
3. **Route value** — Would a user intentionally request this job, and can its
   artifact be accepted independently from neighbouring skills?
4. **Evidence state** — Is the route only authored or sponsored, or does exact
   current routing, behavior, adoption, or authority evidence exist?

A valuable job may have a weak generated package; rebuild it instead of
publishing the shell or declaring the job worthless. A strong package may be a
reference module rather than a separate route. A useful unproven candidate must
remain labelled unproven. Presence is not adoption or behavior proof.

## Responsibility model

- **Owner** — supplies company strategy, protected experience, risk appetite,
  and irreversible public or commercial decisions.
- **Curator agent** — discovers the full corpus, understands meaning, researches
  gaps, rewrites content, decides routine reversible dispositions, and delivers
  the result without asking the owner to micromanage names.
- **Repository** — keeps the canonical procedures, source lineage, decisions,
  and history so future agents do not depend on chat memory.
- **Validators** — check format, integrity, declared references, and delivery.
  They do not understand semantic value and cannot prove absorption by path or
  digest alone.

For material batch changes, use a second agent as a loss reviewer. Give it raw
hidden/rejected material and the proposed target, not the preferred conclusion.
If the agents materially disagree, inspect sources or forward-test; preserve the
uncertainty as a rewrite or investigation rather than forcing retirement.

## Content review

A strong package usually has:

- frontmatter that names concrete trigger language and nearby exclusions;
- one bounded job and a deliverable another agent can consume;
- a short procedure with decisions in execution order;
- explicit uncertainty, authority, and safety boundaries;
- references for detailed methods, matrices, examples, and volatile facts;
- scripts only for deterministic repeated work;
- positive and negative routing examples that resemble real requests.

Common failure modes:

- a topic summary with no reusable procedure;
- a generic project plan wrapped in skill language;
- mandatory control-plane, GitOps, attestation, or automation boilerplate that
  is unrelated to the user's job;
- overlapping skills differentiated only by nouns or headings;
- static volatile requirements presented as current authority;
- a long SKILL.md that loads every edge case for every request;
- references that repeat the entry point instead of adding depth.
- a batch retirement reason that substitutes missing demand or proof for a
  semantic review of the actual package;
- a destination path or file hash presented as evidence that old mechanisms
  are present;
- default-branch-only inventory that silently loses closed unmerged proposals;
- owner memory functioning as the only retrieval path for protected knowledge.

## Native discovery and thickness

Portable package discovery starts from `name` and `description`. Current Codex
and Claude document metadata-first semantic selection, may shorten or omit
descriptions under their listing/context budgets, and load `SKILL.md` only
after selection; other runtimes require their own documented verification.
Treat keyword examples as semantic anchors, not as a deterministic router
contract. On a metadata-selecting runtime, a correct body cannot rescue a
package whose description never gives enough evidence to select it.

For every material route, inspect:

- concrete user jobs and accepted artifact, expressed in natural language;
- positive, near-neighbour, compound, abstention, multilingual, ambiguous,
  correction, and misleading-keyword prompts;
- false negatives caused by vague or late trigger language;
- false positives caused by topic words without a job boundary; and
- behavior when the runtime shortens or omits descriptions under catalog
  pressure.

Keep the metadata compact because it competes for initial context. Keep the
entry procedure focused enough to load safely, but use references for rich
methods, matrices, examples, and volatile detail. Thickness is not a defect by
itself: split only when the extracted work is independently requested and has
an independent acceptance artifact. Do not split by file type, telemetry
medium, implementation layer, or noun alone.

Official current behavior must be verified against the supported runtime, not
remembered from an earlier release. Relevant authorities include the
[Agent Skills specification](https://agentskills.io/specification),
[OpenAI Skills documentation](https://learn.chatgpt.com/docs/build-skills), and
[Claude Code Skills documentation](https://code.claude.com/docs/en/skills).

## Collision decisions

Use job and artifact—not topic—as the merge test.

| Relationship | Decision |
| --- | --- |
| Same topic, different accepted artifacts | Keep both; clarify triggers and handoff |
| Same job and artifact, one package strictly stronger | Merge into the clearer owner |
| Shared sub-method only | Keep both; reference a canonical shared source if useful |
| Broad orchestrator and narrow specialist | Keep only if the orchestrator owns a distinct composition artifact |
| Generic advice with no knowledge delta | Retire without inventing a replacement |
| Plausible route with unknown demand or method | Time-box an investigation; do not publish a shell |

Before a merge, map every unique decision rule, state machine, failure mode,
example, helper, and eval assertion to its destination. If that map is
ambiguous, the merge is not ready.

Use these dispositions precisely:

| Finding | Disposition |
| --- | --- |
| Strong independent job, artifact, package, and boundary | Keep or publish as an honestly labelled candidate |
| Valuable job, weak or generated current bytes | Rebuild lead |
| Valuable mechanisms, same accepted artifact as a stronger owner | Absorb with mechanism-level mapping |
| Valuable capability owned by another canonical project | Transfer; verify that owner covers it |
| Plausible value or unresolved collision | Time-boxed investigation |
| No non-derivable procedure after semantic inspection | Archive implementation |

Retirement needs positive evidence for one of the last three rows. Missing
usage, owner attention, or current benchmark proof is not positive evidence that
the knowledge is generic.

## Repository shape

Prefer the repository's existing conventions. At minimum, installation should
have an unambiguous entry point per skill and retired names should not remain
discoverable. A README or generated catalog can help people browse, but it is a
projection—not the reason a skill is valuable.

Public versus private is normally simple:

- public repositories may be cloned or installed by anyone under their license;
- private repositories require ordinary repository access;
- neither choice requires a bespoke marketplace or control plane;
- repository visibility does not replace licensing, provenance, or secret
  handling.

## Curation report

For each route, record:

- name;
- realistic request;
- primary artifact;
- unique mechanisms;
- nearest neighbours;
- content problems;
- keep, rewrite, merge, retire, or investigate;
- exact files and validation affected.

Inventory active, incubating, retired, historical, and closed-unmerged sources.
End with a false-negative section: valuable capability the proposed target may
still hide, package quality versus topic value, reviewer disagreements, and the
next source or forward test that would resolve them.

End with a small collision map and an absorption map for actual merges. Keep
delivery truth separate: content patched, checks passed, committed, merged,
published, and install-verified are different states.
