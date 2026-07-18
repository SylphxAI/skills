# prompt-architecture (canonical body)

**Authority:** binding Standard Skill package `prompt-architecture` in `SylphxAI/skills` (`skills/prompt-architecture/`).

**Cutover:** migrated from Doctrine `standards/prompt-architecture.md` at digest `sha256:48af049edfd91c4c3d50ca20692000416426ebb5273f37579733eda01f02d010` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Prompt Architecture Standard

## Purpose

Prompts for agents are operating policy, not motivational prose. Optimize them
for deterministic execution, conflict resolution, delegation, future sessions,
and machine parsing. Human-facing output follows the human-first communication
contract in
[`autonomous-execution-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/autonomous-execution-standard.md).

## Minimum Effective Policy

Use the smallest prompt that reliably changes behavior.

- Put always-on law in the tool's always-on instruction file (`AGENTS.md` /
  `CLAUDE.md`).
- Put detailed Doctrine policy in this repository's `standards/` and generated
  Doctrine projections under `.agents/skills/`.
- Put independently useful, reusable cross-runtime job procedures in the
  governed [`SylphxAI/skills`](https://github.com/SylphxAI/skills) portfolio.
- Put only vendor/runtime-specific commands and wrappers in that tool's local
  skills, commands, plugin, or registry layer.
- Put repo facts in the project's agent file (`AGENTS.md` / `CLAUDE.md`).
- Put task decisions in specs, ADRs, tests, evals, changelogs, or memory.

Do not duplicate the same rule across layers. An always-on projection states
the compact invariant and boundary; supported runtimes discover skill metadata
and activate or load matching bodies through their own supported mechanism.
Without Agent Skills, point to the owning Doctrine source on demand. Do not add a
meta-router or require manual skill selection.
Doctrine-owned Agent Skills are generated artifacts. Edit `PRINCIPLES.md`,
`ADR.md`, `standards/*.md`, or `skills/registry.json`, then run
`python3 scripts/generate-agent-skills.py`. Do not hand-edit generated
`.agents/skills/*` files or copy them into a tool-specific fork.

### Doctrine versus reusable Skills ownership

Choose the repository by semantic ownership, not by the `SKILL.md` filename:

| Surface | Canonical owner | Admission test |
| --- | --- | --- |
| Cross-task constitutional law, decision boundaries, and enterprise governance | `SylphxAI/doctrine` principles, standards, profiles, or ADRs | Must govern before skill loading or define binding policy |
| Agent Skill projection of Doctrine policy | Generated `.agents/skills/` in `SylphxAI/doctrine` | Generated from an owning Doctrine source; never independently authored |
| Independently useful reusable cross-runtime job procedure—engineering, product, design, business, operations, or otherwise—with its own trigger and artifact | [`SylphxAI/skills`](https://github.com/SylphxAI/skills) | Independent recurring job; passes that repository's admission, routing, evidence, risk, and lifecycle controls |
| Runtime-native command, permission, hook, MCP binding, or vendor integration | Owning runtime, plugin, or local configuration | Depends on a specific runtime capability and carries no shared policy |
| Repository fact, command, hazard, or validation note | Owning repository's local instruction surface | True only for that repository or machine boundary |

Never move a cross-task law into `SylphxAI/skills`, because it may not load
before the decision it governs. Never place a reusable job skill in Doctrine,
because that turns governance into a product-procedure catalog. A Doctrine
generated skill is a transport projection of policy, not a portfolio candidate;
a portfolio skill may depend on Doctrine but may not copy or redefine it.
Skills provide method and artifacts, not runtime capability grants or current
external authority. Install portfolio candidates intentionally under their own
evidence state; do not bulk-install or auto-route an unproven catalog merely
because a runtime can discover it.

### Always-on promotion boundary

Importance alone does not make a rule always-on. Promote a rule into the
canonical always-on kernel only when all of these are true:

- it governs the first meaningful action, nearly every task, or a mutation,
  delegation, synchronous wait, authority, or completion decision that can fail
  before the matching skill or reference can be safely loaded;
- the expected cost of omission exceeds the attention, ambiguity, and conflict
  cost of keeping the rule active in every task; and
- its trigger, required action, and boundary can be projected compactly without
  copying the owning algorithm.

Promote only that compact behavioral projection. Keep predicates, procedures,
examples, tool mechanics, exception handling, and evaluation detail in the
owning standard and generated skill. If the compact projection cannot preserve
the rule's authority and stop boundaries, keep it on demand and strengthen its
skill description or on-demand reference instead. When a projection is promoted,
consolidate or replace weaker always-on wording rather than appending a second
version or increasing prompt size by default.

## Role Prompt Derivation

Agent role prompts are implementation adapters, not independent policy. The
canonical role taxonomy and operating protocol live in
[`agent-first-development-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/agent-first-development-standard.md);
role prompts must reference or be generated from that source.

A role prompt should define only:

- role purpose and non-goals;
- work discovery query or signal source;
- claim protocol and lease behavior;
- allowed write scope and escalation boundary;
- required artifacts: issue update, PR metadata, structured review, status check,
  ADR/spec, or production signal;
- verification and handoff evidence;
- delivery boundary from [`delivery-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/delivery-standard.md).

Do not paste a giant static playbook into every role. When doctrine changes,
role prompts must be regenerated or patched from the doctrine source so the
agent fleet does not fork the operating model.

## Delegation Brief Granularity

The `autonomous-execution-standard.md` "Subagent Use" section owns when to
delegate and the outcome-owned brief contract. This standard owns prompt
specificity: a per-task delegation brief is a transfer of bounded outcome
ownership, not a miniature implementation plan or a copy of the parent's
reasoning trace.

Use progressive specificity. Start with outcome, boundary, binding constraints,
acceptance evidence, and discoverability pointers. Add method or sequence only
when omitting it would change correctness, safety, reproducibility, collision
control, or a machine-consumed artifact. Separate mandatory constraints from
optional context, hypotheses, examples, and suggestions so a capable subagent
can challenge assumptions and replan as evidence changes.

Do not compensate for uncertainty by adding an exhaustive checklist. Excess
detail can anchor the child to an unverified diagnosis, hide the actual goal,
and turn environmental change into a false blocker. Conversely, "investigate"
without a bounded outcome, scope, or evidence contract is not autonomy; it is
an incomplete brief.

Structural order may be mandatory for a safety-critical procedure without
making the surrounding prompt immutable. Exact bytes bind only a named segment
of an explicitly versioned process/eval artifact with a digest-bound evaluation
contract. Mark that segment and reason; a long role prompt alone is not an
exception. Outside it, runtime-tuned budgets, priority ordering, execution
roadmap, analysis, and replanning stay adaptive. Public interface shape and
shared-write serialization are boundaries, not permission to dictate the
child's whole roadmap.

## Doctrine Runtime Constitution Contract

Use this when creating or refactoring an agent/tool prompt from this doctrine.

When the runtime supports Agent Skills, rely on native metadata discovery and
its supported activation or loading mechanism for matching generated Doctrine
skills. Otherwise load `AGENTS.md` and only the principles, ADRs, profiles, and
standards touched by the target work. Project the canonical constitution
through the runtime's supported instruction surface; do not fork Doctrine.

The adapted prompt must:

- Link back to this repository as the upstream SSOT.
- Preserve Doctrine decisions, vocabulary, boundaries, approval gates, and
  on-demand policy discovery.
- Keep the always-on layer compact but behaviorally complete: project the
  canonical operating kernel directly, plus tool-native execution mapping,
  skill discovery, and on-demand loading rules. Compact never means
  pointer-only; a rule needed before skill loading must remain
  explicit in the auto-loaded file. Do not cache detailed doctrine content.
- Map into the target tool's supported instruction hierarchy, files, commands,
  permissions, memory, and subagent model.
- Leave tool-specific skills, commands, permissions, and native wiring in the
  tool's own home.
- Use generated Doctrine skills only for Doctrine-owned policy projections.
  Put independently reusable cross-runtime job methods in `SylphxAI/skills`;
  keep only runtime-native tooling, MCP bindings, and vendor wrappers in the
  plugin or runtime registry layer.
- Respect higher-priority host instructions instead of pretending doctrine can
  override the tool's system or platform policy.

The adapted prompt must not:

- Rename shared domain concepts or create competing terminology.
- Copy standards into a per-tool fork.
- Add tool-specific frontmatter, permission grants, dynamic shell injection,
  hooks, model overrides, or runtime side effects to the portable
  `.agents/skills` corpus.
- Weaken autonomy, delivery, boundary, SSOT, or validation requirements.
- Omit a supported on-demand path for detailed policy the tool may need.
- Invent unsupported syntax, folders, frontmatter, or lifecycle hooks.

Validation: a fresh agent reading the effective instruction surface should know
where Doctrine lives, which law is always on, how detailed policy is discovered
on demand, when to ask or act, how to update Doctrine, and what a local
projection cannot change.

### One semantic kernel, not one literal system prompt

Doctrine owns one semantic always-on kernel in the canonical constitution template
([`templates/AGENTS.md`](https://github.com/SylphxAI/doctrine/blob/main/templates/AGENTS.md)). It is a compact,
behaviorally complete always-on constitution: how to operate, where doctrine
lives, and the compact projections that pass the promotion boundary above. It
is not pointer-only. It does not restate detailed principle or standard
procedures, carry a `Doctrine-Source` commit SHA, or replace progressive
disclosure through the generated Agent Skills corpus.

One semantic kernel does **not** mean one literal cross-vendor system prompt.
Host system and platform instructions remain higher authority. Each runtime
projects the same kernel into its supported auto-loaded instruction file,
import, plugin, or registry, while tool-specific permissions, memory, commands,
and subagent wiring stay in that runtime's own layer. The filename and transport
may differ; the Doctrine-owned behavioral meaning may not be weakened, renamed,
or forked.

The behavioral non-negotiables a runtime constitution must honor (link back to doctrine;
never fork, weaken, or rename; SSOT; standards-on-demand; intentional startup;
Evidence First; aggressive execution with conservative claims; current evidence and active resolution; P-EVOLUTION future-proof
execution; root-cause closure; done-means-delivered; autonomy boundary; GitOps;
boundary ownership; the no-human delivery model; adversarial decision review;
work-conserving execution; bounded speculation before scarce proof and effects;
outcome-owned delegation; human-first
communication) are authored once in the
canonical template.
`tests/test_agent_template_invariants.py` verifies that one source — a
doctrine-self-quality check, not a continuous conformance audit of N
agent-authored runtime projections.

Freshness remains Git: keep the local doctrine clone current with `git pull` or
`scripts/doctrine-cache-freshness-audit.py`, rather than embedding a pinned SHA
inside every projection. Correctness of a runtime projection rests on the agent's
capability and the complete canonical template it consumes. An agent that cannot
configure itself in its own runtime remains a defective tool, not a reason to
restore a maintained per-tool policy cache. See
[ADR-98](https://github.com/SylphxAI/doctrine/blob/main/docs/adr/ADR-98-agent-skills-corpus-and-adapters.md) and
[ADR-160](https://github.com/SylphxAI/doctrine/blob/main/docs/adr/ADR-160-skills-first-adapter-model.md).

### Effective convergence claims

A merged template, fresh generated corpus, working bootstrap renderer, or local
projection proves source availability, not that a runtime or fleet is applying the
kernel. Before claiming effective convergence, declare the adoption unit and
migration class, then obtain current readback for the in-scope runtime targets
that binds the expected kernel and skill-catalog identity to the effective
loaded instruction surface, observation time, exceptions, and any higher-
authority conflict. A target without authoritative readback is `unverified`, not
implicitly converged.

This is migration and adoption evidence, not a return to continuous N-projection
auditing. ADR-160's default remains: no embedded source SHA, no maintained
per-tool policy cache, and no permanent completeness scan of agent-owned
projections. Re-run proportionate readback only when making a convergence claim
after a kernel, runtime mapping, bootstrap path, migration selector, or observed
effective-state change. Report source convergence and effective convergence as
separate states.

## Agent-Readable Shape

Prefer this structure:

- Scope: where this applies.
- Role: what the agent owns.
- Triggers: when to apply the rule.
- Action: what to do.
- Boundaries: when to stop or ask.
- Source of truth: where durable facts live.
- Validation: how success is proven.
- Output: what the user or next agent receives.

Use short headings, direct verbs, stable vocabulary, and concrete conditions. Avoid relying on tone, vibes, or implicit human context.

## Good Rules

Good prompt rules are:

- Actionable: "For non-trivial API changes, write or update an ADR before implementation."
- Triggered: "When reviewing code, findings come first."
- Bounded: "Ask before destructive VCS, database, or infrastructure changes."
- Verifiable: "Report validation run and skipped checks."
- Composable: "Read the relevant standard only when the task touches that domain."

For current-state and autonomy rules, encode a decision boundary rather than a
personality request. Route material drift-prone claims to the SOTA decision
kernel and require one of its typed resolution states. A useful compact rule
says which facts need current authority, what reversible evidence action is
allowed, and makes a stop depend on a bounded opportunity scan rather than a
convenient losing option. It does not say merely "be proactive" or "be
cautious."

## Bad Rules

Avoid rules that are:

- Aspirational only: "Be perfect" without execution criteria.
- Absolute without risk boundary: "Never ask questions."
- Duplicated across files.
- Tool-specific when the tool does not officially support the mechanism.
- Contradictory: "Always act autonomously" plus "Ask whenever uncertain" without a decision boundary.
- Conservative by tone: "When in doubt, wait", "ask if unsure", or "do nothing
  unless certain" without a materiality, authority, reversibility, and
  qualified-stop contract.
- Freshness theatre: forcing every fact through a network lookup, or treating a
  failed lookup as proof that a thing is absent or current.
- Overloaded: one prompt trying to be constitution, handbook, workflow, memory, and task brief.

## Refactoring Existing Prompts

When migrating instructions from an existing tool's native instruction file, project templates, or old dotfiles:

1. Extract durable intent before preserving wording.
2. Remove unsupported frontmatter or tool-specific syntax unless the target tool recognizes it.
3. Convert values into behavior: "craftsmanship" becomes naming, tests, observability, root-cause closure, and delivery criteria.
4. Convert broad rules into triggers and boundaries.
5. Move details to standards or skills when they are not always needed.
6. If the reusable procedure is Doctrine-owned, update the source standard or
   `skills/registry.json` and regenerate `.agents/skills`.
7. Delete stale, duplicate, or conflicting rules.
8. Commit the prompt change like code.

## MEP Check

Before keeping a prompt line, ask:

- Does this change behavior in a future session?
- Is this the highest-correct source of truth for the rule?
- Is the trigger clear enough for an agent to apply without hidden context?
- Does it conflict with autonomy, safety, delivery, or project instructions?
- Can success or failure be observed?

If the answer is no, rewrite it, move it, or delete it.

## Bootstrap Prompt Distribution

A Doctrine-consuming agent either already has a Doctrine cache available or it
does not. When it does not, the agent needs a **bootstrap prompt** it can
execute or hand to a launcher, so that the Doctrine pointer pattern stops being
a bootstrap problem.

Doctrine owns the bootstrap prompt contract through three artifacts:

- `templates/install-agent.md` — install prompt source: clone or update the
  Doctrine cache, optionally install generated Doctrine projections where the
  runtime supports Agent Skills, and write or refresh a compact runtime-native
  constitution projection.
- `templates/update-agent.md` — update prompt source: idempotent re-render of
  the install flow using whatever the cache already has.
- `scripts/render-agent-bootstrap.py` — the only authority that materializes an
  install or update prompt with auditable substitution, freshness, and
  placeholder lint.

Bootstrap prompts are prompt assets, not policy. (The repo bootstrap
runbook, `templates/bootstrap-repo.md`, stands up a repository rather than an
agent runtime and is outside this section's three-artifact contract.) They
may:

- reference the upstream Doctrine repository URL (`https://github.com/SylphxAI/doctrine`);
- clone or `git pull` the cache into a path the operator chooses;
- install or update generated Agent Skills when the runtime's installer
  supports that convention;
- write or rewrite a compact runtime-native instruction source that the runtime
  demonstrably auto-loads, such as `AGENTS.md`, a documented instruction import,
  or a managed-policy surface, and point it back to the Doctrine cache. A skill
  body or skill manifest is not an Always-On instruction source.

Bootstrap prompts must not:

- copy Doctrine standards, principles, or generated skills into the bootstrap
  prompt body;
- request elevated permissions, hooks, MCP servers, credential storage, dynamic
  shell injection, model overrides, third-party payload downloads, or anything
  outside the cache, generated skills, and constitution projection surface;
- silently overwrite per-repo `PROJECT.md`, `.doctrine/project.json`, or
  production evidence;
- invent unsupported tool syntax or tool-specific frontmatter for the portable
  corpus;
- weaken the autonomy, delivery, boundary, SSOT, or validation requirements
  of this standard or `agent-first-development-standard.md`.

The renderer's `--check` mode is a freshness gate that fails CI when the
installed templates, the canonical upstream URL, or the placeholder whitelist
drift. `tests/test_agent_bootstrap.py` enforces the contract: every bootstrap
prompt must reference upstream Doctrine, declare its placeholders, link back to
this standard, and stay below the size budget that signals prompt-policy
duplication. Hand-edited copies of the rendered output are drift and must be
rejected in CI.

The bootstrap contract composes with this standard, `delivery-standard.md`,
and the runtime-constitution projection pattern:

1. A repo's compact `AGENTS.md`/`CLAUDE.md` directly carries the always-on law
   and points at Doctrine for detailed policy.
2. A launcher or operator renders the install prompt and runs it on a fresh
   runtime to stand up the same surface without depending on a pre-existing
   cache or paste.
3. After install, the runtime discovers matching generated Doctrine skills by
   description and loads detailed standards only on demand.

The bootstrap mechanism is `new-default`/`optional-adoption`. Effective loading
of the compact constitution is separately `required-future` under ADR-188:
pointer-only legacy projections follow its declared compatibility window,
migration selector, readback proof, and recovery contract. Future changes become
required only through the Doctrine Evolution Standard, never by implication.
