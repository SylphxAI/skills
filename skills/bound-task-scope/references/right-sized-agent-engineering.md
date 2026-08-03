# Right-sized agent engineering: comparative source audit

This reference records the source review behind the right-sizing method. It is
research lineage, not a second procedure and not a requirement to install the
listed packages. The review used public source at the exact revisions below on
2026-07-30. Popularity was not treated as correctness evidence.

## Evaluation frame

Each method was assessed against four questions:

1. Does it change a recurring agent decision rather than only its tone?
2. Does it preserve the real correctness, security, maintainability, and
   delivery floor?
3. Does it reduce total lifecycle cost rather than only lines or output tokens?
4. Does it belong in an existing semantic owner, a conditional specialist
   procedure, an optional tool, or nowhere?

The resulting design is one compact solution ladder in `bound-task-scope`, with
reproduction, evidence, review, prompt, dependency, and communication mechanics
left in their existing owners.

## Source-by-source findings

### 1. Ponytail

Source:
[`DietrichGebert/ponytail@16f2980`](https://github.com/DietrichGebert/ponytail/tree/16f29800fd2681bdf24f3eb4ccffe38be3baec6b)
(MIT).

The durable mechanism is its ordered challenge: determine whether code needs to
exist, search the repository, prefer standard-library and native-platform
features, reuse installed dependencies, then write the minimum remaining code.
Its 2026-06-18 agentic benchmark is unusually useful because it corrected a
contaminated baseline and measured real repository diffs. Across twelve
Haiku 4.5 feature tasks with four runs per arm, it reported a 54% average LOC
reduction, concentrated in native-control substitutions; irreducible backend
tasks largely converged. Its six-task safety tier found that the bare
YAGNI-plus-one-liner arm dropped a guard once while the skill arm did not.

Absorbed: the ordered reuse/native/direct-implementation ladder, flow
understanding before minimization, and explicit protection of trust-boundary
validation. Rejected: universal one-line preference, raw LOC as quality, branded
debt comments, `ultra` as a default, and treating a deliberately reduced
request as completion. The benchmark is evidence for the tested task set, not a
universal 54% forecast or security proof.

### 2. Karpathy-style instruction file

Source:
[`multica-ai/andrej-karpathy-skills@2c60614`](https://github.com/multica-ai/andrej-karpathy-skills/tree/2c606141936f1eeef17fa3043a72095b4765b9c2)
(no repository license detected at review time). It is a third-party
interpretation inspired by comments attributed to Andrej Karpathy, not an
instruction file authored or endorsed by him.

Its useful kernel is: think before coding, prefer simple designs, keep changes
surgical, and define observable success. Those mechanisms already map to task
binding, the solution ladder, change classification, and evidence-backed
closure. The blanket form of “ask rather than guess” was not adopted: agents
first inspect authoritative sources, make safe reversible assumptions where
appropriate, and ask only for a material unresolved choice. “Every changed line
must be directly requested” was also narrowed because same-cause repairs and
positive-net in-boundary improvements can be necessary.

### 3. Bonsai

Source:
[`SUDARSHANCHAUDHARI/Bonsai@9b53873`](https://github.com/SUDARSHANCHAUDHARI/Bonsai/tree/9b53873ae37428d2bf6f22e88d72d2815b6b48fc)
(MIT).

Bonsai is substantially the same smallest-that-works/YAGNI mechanism and
credits Ponytail. Its repository includes a benchmark harness but no stronger
published evidence or distinct decision boundary was found. No separate route
was created. Its useful content is covered by the same ladder; its branded debt
markers and pure-minimum bias were rejected.

### 4. Razor and YAGNI harnesses

Source:
[`V-Songbird/razor@fee5c97`](https://github.com/V-Songbird/razor/tree/fee5c9740f433de5561b953b95865f5e1ede2e61)
(MIT).

Razor demonstrates a useful harness insight: challenge a dependency, file, or
search at the action boundary instead of relying only on a vague reminder.
However, its deny-once hooks, regex command parsing, partial import/manifest
parsing, and default file/search budgets are not semantic proof. They can add
friction, misread valid work, and optimize for a benchmark-shaped task.

Absorbed: dependency and native-alternative challenges in the decision method.
Rejected as general policy or CI: arbitrary file/search budgets, source-string
classification, and denial that cannot evaluate the resulting capability.
Optional local tooling remains permissible when a measured behavior justifies
it.

### 5. Numeric hard-constraint prompts

Examples such as “maximum N files,” “under 100 lines,” or “no new dependency”
are prompt techniques, not universal engineering standards. They are valuable
when the number comes from a protocol, package, performance, review, or resource
contract. Without that basis they are diagnostic pressure only: a hard cap can
prevent sprawl, but it can also force hidden coupling, omit tests, or cut a
safety guard. The standard therefore binds numeric limits to a named accepted
constraint.

### 6. `i-have-adhd`

Source:
[`ayghri/i-have-adhd@07684c4`](https://github.com/ayghri/i-have-adhd/tree/07684c4ab625dd7d1ea6e99e065f60bc0ac6a1ba)
(MIT).

The strongest contribution is its evaluation contract: correctness and
autonomy outrank concision, with actionability and safety protected. Result
first, numbered real sequences, matter-of-fact failures, and removal of
tangents are useful. The public source inspected contains an evaluation harness
and rubric, but no published result was treated as established effect evidence.

The communication owner absorbs those mechanics without medicalizing a general
writing preference. Fixed list limits, mandatory time estimates, state
restatement on every turn, and a forced next step or closing call-to-action were
rejected because they can create repetition, false precision, or incomplete
answers.

### 7. Caveman

Source:
[`JuliusBrussee/caveman@0d95a81`](https://github.com/JuliusBrussee/caveman/tree/0d95a81d35a9f2d123a5e9430d1cfc43d55f1bb0)
(MIT).

Its own `HONEST-NUMBERS.md` says the mechanism shortens output only, adds roughly
1,000–1,500 input tokens per turn, and can be net-negative for already terse
workloads. It reports a 65% average output reduction over ten prompts, while
noting that whole-session savings are smaller and one adverse measurement was
not reproduced.

Absorbed: remove filler, preserve exact code/commands/error strings, and measure
total-session value rather than output tokens alone. Rejected: telegraphic or
deliberately broken grammar, always-on injection of a large style body, and
automatic compression of policy or memory without semantic-equivalence proof.

### 8. “Absolute Mode”

No canonical author, versioned repository, evaluation set, or stable primary
source was identified for the circulating prompt under this name. Its useful
generic ideas—no ceremonial acknowledgement, hype, repeated conclusion, or
generic closer—are already covered by high-signal communication. The label and
unverifiable authority claim were not adopted.

### 9. Anti-slop prompts

Reviewed implementation:
[`JuliusBrussee/skills@e8048f0`](https://github.com/JuliusBrussee/skills/tree/e8048f01abe2b8e2563df2078d0d705c895eb09a)
(MIT), especially `fuck-slop`.

Direct claims, specific evidence, audience/genre fit, and removal of stock
openings or conclusions are useful editorial practices. Mechanical bans on
em dashes, sentence rhythm, contrast forms, or named words are not truth or
quality authorities. They can erase voice and create the same prose through a
different template. Such scans may assist an explicitly requested editing pass;
they must not become general CI, architecture gates, or a substitute for
meaning.

### 10. Grill-me

Sources:
[`JuliusBrussee/skills@e8048f0`](https://github.com/JuliusBrussee/skills/tree/e8048f01abe2b8e2563df2078d0d705c895eb09a)
and [Matt Pocock’s account](https://www.aihero.dev/my-grill-me-skill-has-gone-viral).

One-question-at-a-time pressure, a recommended answer, and an evolving decision
map are useful when a user explicitly requests an interview or deliberation.
They are inefficient as the default for autonomous execution: repository facts
should be inspected, and independent work should not wait behind a serial
questionnaire. Existing requirements, critical-analysis, and structured-
deliberation owners cover the conditional job.

### 11. Superpowers

Source:
[`obra/superpowers@44c9b2d`](https://github.com/obra/superpowers/tree/44c9b2d6e889982ac18c27d05a19fefe335194e1)
(MIT).

Its systematic-debugging, red-green contrast, verification-before-completion,
review-response, and independence tests for parallel work are valuable. They
already belong to reproduction-driven engineering, evidence and claims,
convergent review, and task-semantic delegation.

The portfolio is not adopted as one mandatory lifecycle. `using-superpowers`
routes on a one-percent possibility and says perceived overkill is not a reason
to abstain; brainstorming hard-gates even small creative work on design
approval; writing-plans decomposes into human-scale minute steps; and TDD is
presented as an iron law. Those defaults conflict with risk-matched ceremony,
agent autonomy, and direct execution for small reversible work.

### 12. Junior-to-senior

Source:
[`JuliusBrussee/skills@e8048f0`](https://github.com/JuliusBrussee/skills/tree/e8048f01abe2b8e2563df2078d0d705c895eb09a)
(MIT).

Useful mechanics are current code/source evidence, identifying plans that are
too vague or too granular, steelmanning before critique, and allowing a clean
review. The junior/senior persona, mandatory web research, fixed domain count,
mandatory subagent isolation, and always-two-artifact output are not required
for those mechanisms and can add status framing or resource cost. Existing
critical and convergent review owners absorb the evidence and altitude tests.

### 13. Spec, tickets, and Wayfinder flows

Source:
[`mattpocock/skills@2ab9580`](https://github.com/mattpocock/skills/tree/2ab958093e83e0ec752e6c1c5932da465bf23e0c)
(MIT).

Tracer-bullet vertical slices, dependency-aware work decomposition, and
observable ticket acceptance are useful. The reviewed workflow also serializes
interviews, treats issue trackers as the work map, enforces one ticket per
session, and separates planning from doing. Those are deployment choices, not
portable truths. They would duplicate live work authority and encourage phase
stops here, so only the vertical-slice and dependency-DAG mechanisms remain in
their existing architecture and work owners.

### 14. Anthropic instruction and context engineering

Primary sources:

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
- [Agent Skills specification](https://agentskills.io/specification)

The sources support a small high-signal context, simple interfaces, progressive
disclosure, removal of conflicting repeated rules, and more judgment for capable
models. The Agent Skills specification requires descriptions to say what a
skill does and when to use it, and loads resources on demand. These findings
support thin entrypoints, references for depth, native semantic discovery, and
outcome/constraint/evidence briefs rather than implementation transcripts.

### 15. Root-cause/no-patch rules

The useful rule is an ownership and evidence boundary, not a slogan: reproduce
the symptom, distinguish plausible causes, repair the owner, and retire
temporary containment. It is already owned by reproduction-driven engineering
and scope discipline. “Root cause” must not authorize unrelated redesign.

### 16. Goal-driven and test-first completion

Executable success criteria and baseline/candidate contrast are retained.
Universal unit-test-first ritual is not. A compiler, schema, property,
characterization, differential test, replay, simulation, or live observation
may be the lowest faithful oracle. The existing reproduction-driven standard
selects by failure model.

### 17. Surgical changes and non-goals

The valid boundary is semantic: requested terminal blockers, same-cause defects,
and selected positive-net improvements in the same owner may be changed.
Drive-by work with a different owner stays out. A literal “every line was
explicitly requested” rule would under-engineer legitimate owning fixes.

### 18. Context compression and memory pruning

Progressive disclosure, deduplicated durable decisions, and compact locators
reduce context cost. Automatic rewriting of instructions or memory can silently
change meaning; deletion needs an authoritative owner and equivalence or
retention proof. Compression is a projection, never a second authority.

### 19. Progressive disclosure

The Agent Skills specification and current Codex/Claude documentation support
metadata-first discovery and on-demand resource loading. This is already the
repository package model. It justifies references for this source audit, not a
new router or an always-loaded anthology.

### 20. Smaller system prompts

Anthropic reports removing more than 80% of Claude Code’s system prompt for
newer models without measured coding-evaluation loss. The transferable lesson
is to remove conflicting repetition, define simple interfaces, and keep only
non-missable invariants always on. It is not evidence that every prompt should
shrink by 80% or that domain constraints are obsolete.

### 21. Linters and architecture tests

Executable guards are strong when they observe the governed fact: compiler
visibility, schema validity, dependency cycles, public contracts, runtime
behavior, or a measured budget. Max-lines rules, regex source scanners, and
word bans are weak proxies unless those bytes or limits are the actual contract.
They remain diagnostics, not default merge authority.

### 22. Dependency and interface boundaries

Challenge new dependencies, isolate vendor-specific behavior behind the owned
contract when substitution is a real requirement, and never change public
contracts silently. Version selection remains live and registry-backed; this
reference does not create a static version catalog.

### 23. Loop plus independent verification

An implementation loop needs an observable terminal, bounded effects, and an
oracle capable of falsifying the claim. Independent perspectives are
risk-matched, not mandatory duplicates for every edit. Review ends after
material findings are integrated and declared checks pass; it must not
recursively build review machinery.

### 24. AI development pattern catalogs

Reviewed source:
[`PaulDuvall/ai-development-patterns@0c510b2`](https://github.com/PaulDuvall/ai-development-patterns/tree/0c510b2e0cf259397804b8f174ddfc9b32e2799c)
(MIT).

Its feedforward/feedback and computational/inferential harness distinctions,
progressive disclosure, bounded autonomy, and verification-reach framing are
useful lenses. The repository’s multi-stage catalog is a menu and learning
progression, not a requirement to instantiate every pattern. The specific
“under 100 lines, no new dependencies” wording attributed in secondary
summaries was not found as a stable primary-source rule and is therefore not
used as authority.

## Classic heuristics

YAGNI, KISS, DRY, Rule of Three, surgical change, root-cause repair, and
acceptance-first are heuristics with different failure modes:

- YAGNI rejects speculative behavior, not known extension boundaries with
  positive option value.
- KISS minimizes total explanatory and operational complexity, not necessary
  domain structure.
- DRY removes duplicated knowledge; similar code with different change reasons
  should not be forced behind one abstraction.
- Rule of Three is pressure against premature abstraction, not a mandatory
  count.
- Surgical change preserves bounded causality while still allowing same-cause
  repair.
- Root-cause repair and acceptance-first protect against a small but false
  implementation.

The [YAGNI explanation by Martin Fowler](https://martinfowler.com/bliki/Yagni.html)
is retained as a primary reference. No heuristic outranks the declared product
contract or material safety floor.

## Final synthesis

The portfolio does not justify twenty-four installed methods. It justifies:

- one smallest-complete solution ladder;
- risk-matched clarification, proof, review, and workflow;
- result-first, professional, decision-complete communication;
- native progressive disclosure; and
- executable semantic guards only where a material contract exists.

This keeps the useful mechanisms while avoiding route collisions, prompt
overload, branded jargon, arbitrary caps, and process systems larger than the
work they protect.
