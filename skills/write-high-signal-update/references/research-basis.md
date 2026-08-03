# Research basis

The standard combines established technical-writing practice with current
agent context engineering:

- Google Technical Writing reports that shorter documentation reads faster,
  is easier to maintain, and has fewer failure points. It recommends one idea
  per sentence, direct verbs, lists for embedded sets, and removing filler.
- Microsoft Writing Style Guide recommends leading with the most important
  information, using short headings, sentences, and paragraphs, and applying
  consistent patterns so readers can scan quickly.
- Anthropic treats context as a finite attention budget and defines good
  context engineering as the smallest set of high-signal tokens that achieves
  the intended behavior. It warns that minimal does not mean insufficient and
  recommends preserving decisions and unresolved problems while discarding
  redundant tool output during compaction.
- *Lost in the Middle* found that retrieval can degrade when relevant facts are
  buried inside long contexts. This supports front-loading the answer and
  material constraints, not repeating them throughout a document.

These sources inform the method; they do not create rigid sentence, paragraph,
or token limits. Semantic completeness remains the stop condition.

## Comparative agent-output methods

The following public packages were inspected at exact source revisions on
2026-07-30. Their mechanisms were evaluated against total context cost,
correctness, autonomy, actionability, accessibility, and professional clarity,
not output length alone.

### `i-have-adhd`

Source:
[`ayghri/i-have-adhd@07684c4`](https://github.com/ayghri/i-have-adhd/tree/07684c4ab625dd7d1ea6e99e065f60bc0ac6a1ba)
(MIT).

Its strongest contribution is an explicit weighted evaluation rubric:
correctness 35%, autonomy 25%, actionability 20%, safety 10%, and concision 10%,
with blockers for material error, unsafe instruction, output-contract failure,
or autonomy regression. This correctly makes brevity subordinate to a usable,
truthful answer. The standard adopts result-first ordering, numbered real
sequences, matter-of-fact errors, and removal of tangents.

It does not adopt a universal five-item limit, mandatory time estimate,
repetition of current state on every turn, or a forced next action. Those rules
can omit material peers, create false precision, repeat context, or add an
unwanted closer. A general communication method also should not present a
medical condition as the default identity or quality model; “ADHD-friendly”
remains a discoverable user request, while the output contract is framed in
functional terms.

### Caveman

Source:
[`JuliusBrussee/caveman@0d95a81`](https://github.com/JuliusBrussee/caveman/tree/0d95a81d35a9f2d123a5e9430d1cfc43d55f1bb0)
(MIT).

The project reports 65% average output-token reduction over ten prompts, but its
own `HONEST-NUMBERS.md` says the injected method adds roughly 1,000–1,500 input
tokens per turn, can be net-negative for already terse coding work, does not
reduce request-priced usage, and has smaller whole-session savings. It also
records an adverse Cursor measurement that it could not reproduce.

The standard adopts filler removal and exact preservation of code, commands,
identifiers, and errors. It rejects intentionally broken or telegraphic grammar
and always-on injection of a large output-style body. Reading time, total
session cost, comprehension, and correctness matter more than one output-token
counter.

### Anti-slop and “Absolute Mode”

Reviewed anti-slop implementation:
[`JuliusBrussee/skills@e8048f0`](https://github.com/JuliusBrussee/skills/tree/e8048f01abe2b8e2563df2078d0d705c895eb09a)
(MIT).

Direct claims, concrete evidence, audience/register fit, and deletion of stock
openings, puffery, recap conclusions, and engagement bait are useful. Regex
bans on em dashes, contrast forms, cadence, or named words are not reliable
meaning or quality tests; they may support an explicitly requested editing
pass, but must not become general writing or CI authority.

No canonical author, repository, stable version, or evaluation set was found
for the circulating “Absolute Mode” prompt. Its generic useful ideas—omit
ceremonial acknowledgement, hype, repetition, and generic closers—are already
covered without importing the label or implying unsupported provenance.

## Adoption boundary

`write-high-signal-update` remains the single owner. It is not split into
medical, caveman, absolute, or anti-slop variants because those variants produce
the same primary artifact and share one acceptance authority. Detailed source
lineage stays here under progressive disclosure; the entrypoint carries only
the decision-complete communication method.

Sources:

- [Google: Short sentences](https://developers.google.com/tech-writing/one/short-sentences)
- [Microsoft: Scannable content](https://learn.microsoft.com/en-us/style-guide/scannable-content/)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
- [Agent Skills specification](https://agentskills.io/specification)
- [Liu et al.: Lost in the Middle](https://arxiv.org/abs/2307.03172)
