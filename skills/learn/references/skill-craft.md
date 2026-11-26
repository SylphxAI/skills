# Craft reusable skills

A skill gives a future agent a chosen method and the evidence behind it, not a script or a catalog of options. Keep the [mechanism separate from policy](../../challenge/references/architecture.md#mechanism-domain-boundaries-and-causal-guards): bind checks to exact prerequisites, keep caller-specific policy in configuration, and use synthetic, role-neutral examples.

## Five authoring laws

1. **Constrain the boundary, not the reasoning.** Specify the objective and what must not be sacrificed, the primary evidence to read before deciding, and the hard invariants. Leave intermediate reasoning and expression open. “Be safe” omits the boundary; a mandatory paragraph template constrains the wrong thing.
2. **Explain the failure mode and decision variables.** Show why the tempting action fails and what changes the decision. An HTTP 200 response does not establish a working checkout; verify the user-visible outcome rather than prescribing the same sequence of commands for every service.
3. **Teach what the agent would not reliably infer.** Keep verified blind spots, counterintuitive economics and asymmetric trade-offs. Omit textbook material and unsupported guesses. For quantitative guidance, state the population, units, objective and measured inputs; derive thresholds instead of copying product values. Preserve sourced binding limits and label synthetic numbers.
4. **Do not disguise a local bug fix as a general method.** Keep repair steps in the owning repository’s tests and runbooks. Extract at most a few sentences of genuinely transferable mechanism. Try the rule in a different product or domain and on an unrelated negative case. If it still needs the original incident, leave it local.
5. **Replace and prune before adding.** Refine the owning method in place, remove superseded text and reconcile sibling links. Use one sharp bad/good contrast instead of a lecture. State the causal rationale, assumptions, and observable result that would overturn the rule; label unproven causes as hypotheses. Correct the observed failure without sacrificing the original goal, adding unnecessary approval gates, or wrapping a direct check in another service.

**Bad:** Copy a support incident into a skill and require approval before every reply. **Good:** Bind the recipient to authoritative conversation context before sending private details; a public account identifier is not proof of identity. Verify the same rule in another product, and keep the incident and product bindings with their owner.

## Author and verify a trigger

- Follow the [Agent Skills specification](https://agentskills.io/specification). Match the lower-case, hyphenated directory name and keep the YAML `description` within 1,024 characters. Start it with “Use when” and name the observable moment, symptom or action. End with an explicit exclusion or neighboring skill. Use this metadata for discovery; do not add redundant runtime hooks or reminders.
- Keep `SKILL.md` under 500 lines and well below that limit when possible. Link each colocated reference from the body with the reason to read it. If a skill was missed, inspect the description, actual loaded context and reference links before adding a rule. Fix the missing moment or missing guidance in the existing skill before creating another.
- Add or update the colocated `trigger-cases.json`: version 1, at least three positive and three negative prompts. Each case quotes its applicable description clause. A negative case names the neighboring skill in `route_to`, or uses `null` for an explicit direct-work or no-skill boundary. Cover similar-looking tasks the skill should not claim, not just unrelated prompts.
- Run `python3 scripts/verify-skills.py` to validate YAML, links, anchors, reference coverage, cases and any caller-supplied content policy. Separately evaluate held-out prompts blind on the affected model and runtime when available. Withhold expected decisions and quoted clauses; record the prompts, model, runtime, decisions and errors. Static checks establish contract consistency, not routing accuracy; a metadata-only comparison does not prove automatic loading.

## Documentation

Use the [clear-writing method](../../clear-writing/SKILL.md) and [terminology glossary](../../clear-writing/references/terminology.md). Name the system, action and observed result in standard language. Expand abbreviations on first use. Keep workspace identities, domains, file paths, incident records and product values with their owners; preserve exact public identifiers and attributed sources.

| Reader’s question | Authoritative source |
| --- | --- |
| What is the repository and how do I start? | `README.md`, linking to details |
| Who is the product for and what can it do? | The owning product’s vision and capabilities documentation, typically `docs/vision.md` and `docs/capabilities.md`; platform services can use `docs/services/<name>/` |
| What interface and failure behavior bind? | Executable schemas and contract tests |
| Why does a decision stand? | A decision record beside the owning component or contract, with rationale and replacement conditions |
| How do I operate or recover the system? | The owning runbook, with prerequisites, real deploy/rollback/restore commands and a [recovery check](../../deliver-and-verify/references/security.md#recovery-procedure) |
| What applies across the organization? | The organization’s ownership records and standards, linking to product facts rather than copying them |
| What work is in progress? | The owning work record or pull request, not standing instructions |

- Keep facts in one place. Index and link the owning revision from shared knowledge rather than copying repository-local facts. Preserve the audit record in version history; delete obsolete guidance or point readers to its successor. Check links and named paths when moving it.
- Report only the state proved: planned, implemented, released, deployed, or verified working. A capability inventory should list a stable identifier, behavior, status, implementation path and dependencies. Check the referenced code and dependencies; confirm a removed capability has no live path. Reserve “supported” for verified behavior in the target environment.
- Keep shared repository instructions in `AGENTS.md`, scoped instructions near the subtree, role duties in role definitions, and discovery summaries in metadata. Use the runtime’s supported discovery syntax and verify what the session loads. Include only cross-session constraints, commands, owners and links not obvious from the code. Explain the reason and scope of each rule.
- Give standards a goal, chosen method, sourced constraints and an observable verdict. Cite the primary source for an attributed method; use a qualitative comparison rather than false precision. State which evidence would change the method, and remove controls when their cost no longer serves a witnessed failure or binding requirement.
- Choose the right form: tutorial to teach, how-to guide to complete a task, reference to look up details, explanation to develop understanding. Keep entry pages concise. For README visuals, use maintainable vector assets or diagrams and respect the repository owner’s branding.
