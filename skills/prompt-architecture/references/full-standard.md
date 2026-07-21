# Prompt Architecture Standard

## Purpose

Prompts for agents are operating policy, not motivational prose. Optimize them
for deterministic execution, conflict resolution, delegation, future sessions,
and machine parsing. Human- and agent-facing output follows
[`high-signal-communication`](https://github.com/SylphxAI/skills/blob/main/skills/high-signal-communication/SKILL.md).

## Minimum Effective Policy

Use the smallest prompt that reliably changes behavior.

- Put always-on law in the tool's always-on instruction file (`AGENTS.md` /
  `CLAUDE.md`).
- Put detailed static standards and independently useful cross-runtime
  procedures in the governed [`SylphxAI/skills`](https://github.com/SylphxAI/skills)
  packages that own them.
- Put only vendor/runtime-specific commands and wrappers in that tool's local
  skills, commands, plugin, or registry layer.
- Put repo facts in the project's agent file (`AGENTS.md` / `CLAUDE.md`).
- Put durable task decisions in product-owned specs, ADRs, tests, evals, and
  changelogs, or in Sylphx Enact decision/evidence records when live work owns
  them. Runtime memory is a cache or pointer, never the sole decision home.

Do not duplicate the same rule across layers. An always-on projection states
the compact invariant and boundary; supported runtimes discover skill metadata
and activate or load matching bodies through their own supported mechanism.
Without Agent Skills, point to the owning canonical package on demand. Do not
add a meta-router or require manual skill selection. Runtime install bundles may
be packaged from canonical Skills when wire formats differ, but package bodies
and references are authored only under `skills/<id>/`.

### Instruction ownership

Choose the repository by semantic ownership, not by the `SKILL.md` filename:

| Surface | Canonical owner | Admission test |
| --- | --- | --- |
| Compact rules required before on-demand loading | Canonical always-on constitution source and its runtime projection | Omission can break the first meaningful action or every task |
| Detailed static standard or independently useful cross-runtime procedure | [`SylphxAI/skills`](https://github.com/SylphxAI/skills) | Admitted package with a clear trigger, boundary, predicates or artifact, and validation |
| Historical decision, profile lineage, or migration alias | Its owning decision/history repository | Must not duplicate or override current Skills semantics |
| Runtime-native command, permission, hook, MCP binding, or vendor integration | Owning runtime, plugin, or local configuration | Depends on a specific runtime capability and carries no shared policy |
| Repository fact, command, hazard, or validation note | Owning repository's local instruction surface | True only for that repository or machine boundary |

Project only the compact pre-loading subset into the always-on constitution;
keep the owning detailed standard in Skills. Historical instruction aliases may
preserve lineage but are not writable instruction authorities. Skills provide
method and artifacts, not runtime capability grants or current external
authority. Install and route packages according to their declared evidence
state rather than treating repository presence as proof.

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

The compact communication projection qualifies for the always-on kernel: lead
with the answer or strongest truthful state; omit repetition, routine process,
and raw logs; preserve material decisions, evidence, risk, uncertainty, and
next action. Keep the full compression method in `high-signal-communication`.

## Role Prompt Derivation

Agent role prompts are implementation adapters, not independent policy. The
canonical role taxonomy and operating protocol live in
[`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md);
role prompts must reference or be generated from that source.

A role prompt should define only:

- role purpose and non-goals;
- work discovery query or signal source;
- claim protocol and lease behavior;
- allowed write scope and escalation boundary;
- required artifacts: issue update, PR metadata, structured review, status check,
  ADR/spec, or production signal;
- verification and handoff evidence;
- delivery boundary from [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md).

Do not paste a giant static playbook into every role. When canonical
instructions change, affected role projections must be refreshed from their
owning source so the agent population does not fork the operating model.

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

## Runtime Constitution Contract

Use this when creating or refactoring an agent/tool prompt from the canonical
instruction system.

When the runtime supports Agent Skills, rely on native metadata discovery and
its supported activation or loading mechanism for matching canonical Skills.
Otherwise load the compact constitution and only the decisions, profiles, and
standards touched by the target work. Project the same semantic constitution
through the runtime's supported instruction surface; do not fork it.

The adapted prompt must:

- Link to each owning canonical source instead of a repository brand by default.
- Preserve current decisions, vocabulary, boundaries, approval gates, and
  on-demand package discovery.
- Keep the always-on layer compact but behaviorally complete: project the
  canonical operating kernel directly, plus tool-native execution mapping,
  skill discovery, and on-demand loading rules. Compact never means
  pointer-only; a rule needed before skill loading must remain
  explicit in the auto-loaded file. Do not cache detailed standard content.
- Map into the target tool's supported instruction hierarchy, files, commands,
  permissions, memory, and subagent model.
- Leave tool-specific skills, commands, permissions, and native wiring in the
  tool's own home.
- Put static standards and independently reusable cross-runtime methods in
  `SylphxAI/skills`; keep only runtime-native tooling, MCP bindings, and vendor
  wrappers in the plugin or runtime registry layer.
- Respect higher-priority host instructions instead of pretending company policy can
  override the tool's system or platform policy.

The adapted prompt must not:

- Rename shared domain concepts or create competing terminology.
- Copy standards into a per-tool fork.
- Add tool-specific frontmatter, permission grants, dynamic shell injection,
  hooks, model overrides, or runtime side effects to the portable
  portable Skills corpus.
- Weaken autonomy, delivery, boundary, SSOT, or validation requirements.
- Omit a supported on-demand path for detailed policy the tool may need.
- Invent unsupported syntax, folders, frontmatter, or lifecycle hooks.

Validation: a fresh agent reading the effective instruction surface should know
which rules are always on, how detailed policy is discovered on demand, where
to update its canonical package, when to ask or act, and what a local projection
cannot change.

### One semantic kernel, not one literal system prompt

The canonical constitution source owns one semantic always-on kernel. It is a
compact, behaviorally complete constitution: how to operate, where canonical
instructions live, and the compact projections that pass the promotion boundary
above. It is not pointer-only and does not restate detailed standard procedures
or replace progressive disclosure through canonical Skills.

One semantic kernel does **not** mean one literal cross-vendor system prompt.
Host system and platform instructions remain higher authority. Each runtime
projects the same kernel into its supported auto-loaded instruction file,
import, plugin, or registry, while tool-specific permissions, memory, commands,
and subagent wiring stay in that runtime's own layer. The filename and transport
may differ; the canonical behavioral meaning may not be weakened, renamed,
or forked.

The behavioral non-negotiables are authored once in the canonical constitution
source and projected compactly. Freshness remains Git plus runtime readback;
do not embed a second writable copy or mistake source availability for effective
loading.

### Effective convergence claims

A merged template, fresh generated corpus, working bootstrap renderer, or local
projection proves source availability, not that the intended runtimes are applying the
kernel. Before claiming effective convergence, declare the adoption unit and
migration class, then obtain current readback for the in-scope runtime targets
that binds the expected kernel and skill-catalog identity to the effective
loaded instruction surface, observation time, exceptions, and any higher-
authority conflict. A target without authoritative readback is `unverified`, not
implicitly converged.

This is migration and adoption evidence, not a return to continuous N-projection
auditing. The default remains: no embedded source SHA, no maintained
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
personality request. Route material drift-prone claims to the Decision Quality Standard
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
6. If the reusable procedure or standard is shared, update its canonical
   `skills/<id>/` package and rebuild only derived catalogs or install bundles.
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

A managed agent either already has the canonical instruction packages available
or it does not. When it does not, it needs a **bootstrap prompt** that installs
or refreshes the compact constitution and the required Skills packages.

The runtime bootstrap owner maintains its install/update templates and renderer.
Those assets may live with the runtime or distribution system; they are not a
second standard authoring source. Exact filenames are runtime facts and do not
belong in this cross-runtime standard.

Bootstrap prompts are prompt assets, not policy. Repository bootstrap belongs
to the owning repository/adoption procedure rather than this runtime-install
contract. Bootstrap prompts may:

- reference canonical package sources;
- clone or update an authenticated Skills checkout when required;
- install or update canonical Skills through the runtime's supported mechanism;
- write or rewrite a compact runtime-native instruction source that the runtime
  demonstrably auto-loads, such as `AGENTS.md`, a documented instruction import,
  or a managed-policy surface, and point it back to canonical sources. A skill
  body or skill manifest is not an Always-On instruction source.

Bootstrap prompts must not:

- copy standards, principles, or installed skills into the bootstrap
  prompt body;
- request elevated permissions, hooks, MCP servers, credential storage, dynamic
  shell injection, model overrides, third-party payload downloads, or anything
  outside the authenticated package install and constitution projection surface;
- silently overwrite per-repo `PROJECT.md`, `project.manifest.json`, or
  production evidence;
- invent unsupported tool syntax or tool-specific frontmatter for the portable
  corpus;
- weaken the autonomy, delivery, boundary, SSOT, or validation requirements
  of this standard or `agent-first-development-standard.md`.

The renderer's check mode should fail when templates, canonical sources, or the
placeholder contract drift. Hand-edited copies of rendered output are drift.

The bootstrap contract composes with this standard, `delivery-standard.md`,
and the runtime-constitution projection pattern:

1. A repo's compact `AGENTS.md`/`CLAUDE.md` directly carries the always-on law
   and points at canonical Skills for detailed policy.
2. A launcher or operator renders the install prompt and runs it on a fresh
   runtime to stand up the same surface without depending on a pre-existing
   cache or paste.
3. After install, the runtime discovers matching canonical Skills by
description and loads detailed standards only on demand.

The bootstrap mechanism is `new-default`/`optional-adoption`. Effective loading
of the compact constitution is separately `required-future` under the owning
instruction-evolution decision:
pointer-only legacy projections follow its declared compatibility window,
migration selector, readback proof, and recovery contract. Future changes become
required only through the owning instruction-evolution decision, never by implication.
