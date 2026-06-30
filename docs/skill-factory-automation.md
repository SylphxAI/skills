# Skill Factory Automation

The repository should grow through an agent-assisted factory, not manual one-off writing. Automation should accelerate research, drafting, validation, and iteration while keeping quality and originality gates strict.

## Factory loop

```text
market signal -> topic brief -> source digestion -> original synthesis -> skill draft -> eval draft -> validation -> review -> publish -> demo -> usage feedback -> bounded improvement
```

## Inputs

| Input | What to extract | Guardrail |
| --- | --- | --- |
| App-store and marketplace reviews | user pain, refund/support issues, missing features, language patterns | do not copy review text into skills |
| Competitor pages | positioning, pricing models, feature taxonomy, proof style | synthesize patterns, do not clone wording |
| Product docs and platform policies | constraints, required states, review risks | verify current policies before launch use |
| Internal product incidents | failure modes, support burden, missing checks | remove secrets/customer data |
| Public launches and postmortems | what worked, what failed, channel-specific details | keep examples generic unless attribution/license is clear |

## Agent roles

| Role | Output | Quality gate |
| --- | --- | --- |
| Scout | Topic brief with demand, revenue leverage, failure cost, and existing skill overlap. | Must identify why the skill is worth adding. |
| Synthesizer | Original rules, state machines, decision tables, and event schemas. | No copied prose; must be Sylphx wording. |
| Skill author | `SKILL.md`, references, metadata, and eval YAML. | Passes static validation and follows progressive disclosure. |
| Evaluator | Positive prompts, negative prompts, expected behaviors, and before/after examples. | Demonstrates trigger correctness and behavior improvement. |
| Reviewer | Safety, originality, usefulness, concision, links, and installability. | Rejects prompt dumps and unsafe growth tactics. |
| Publisher | Registry generation, CI, changelog, demo, and marketplace listing. | Green validation and clear release note. |

## Automated checks

Already implemented:

- skill folder/frontmatter validation;
- local link validation;
- secret-pattern scan;
- generated registry check;
- eval schema and coverage validation;
- catalog visibility validation across README and `skills.sh.json`;
- reference quality validation for structured artifacts such as rule IDs, decision tables, state machines, event schemas, and checklists.

Next checks to add:

1. **Originality review checklist** — PR template asks whether third-party text/code/assets were copied.
2. **Behavior examples** — each skill has one before/after example or demo transcript.
3. **Skill scoring** — utility, concision, safety, eval coverage, and depth score.

## Auto-drafted PR workflow

1. Pick highest-scoring missing skill from `docs/sota-product-operating-matrix.md`.
2. Generate a topic brief with:
   - target users;
   - product decisions affected;
   - failure modes;
   - expected output artifacts;
   - overlap with existing skills.
3. Draft the skill folder:
   - compact `SKILL.md`;
   - one reference file with rule IDs and tables;
   - `agents/openai.yaml`;
   - `evals/<skill>.eval.yaml`.
4. Run:
   - `node scripts/generate-registry.mjs`;
   - `node scripts/validate-skills.mjs --check-registry`;
   - `node scripts/validate-evals.mjs`;
   - `node scripts/validate-catalog.mjs`;
   - `node scripts/validate-reference-quality.mjs`.
5. Open a PR with the topic brief, validation output, and screenshots/examples if available.
6. Merge only after review confirms usefulness, originality, safety, and concision.

## Improvement loop

Do not let skills become bloated. Improve them like trainable artifacts:

1. Run a realistic prompt with and without the skill.
2. Find the missing behavior.
3. Add or replace the smallest rule that fixes the behavior.
4. Add/adjust eval prompts.
5. Keep the edit only if validation and review improve.

## Marketplace flywheel

| Flywheel step | Repository artifact |
| --- | --- |
| Publish useful skill | skill folder + registry row |
| Show value | README example, demo, before/after output |
| Earn stars | clear install command, public roadmap, weekly releases |
| Attract contributors | contribution guide, topic requests, quality bar |
| Improve quality | evals, scoring, review gates, issue templates |
| Create business value | private registries, custom skill creation, enterprise packs |

## Near-term automation roadmap

| Priority | Automation | Why |
| --- | --- | --- |
| P0 | Eval coverage gate | Prevents skill drift without tests. |
| P0 | README/catalog coverage gate | Implemented; prevents invisible skills. |
| P1 | Static marketplace site | Makes the repo easier to browse and share. |
| P1 | Skill score report | Turns quality into a visible product metric. |
| P1 | Weekly topic scout | Keeps the roadmap tied to market demand. |
| P2 | Example/demo generator | Produces public proof for stars and adoption. |
| P2 | SkillOpt-style bounded editor | Improves skills from eval failures without bloat. |
