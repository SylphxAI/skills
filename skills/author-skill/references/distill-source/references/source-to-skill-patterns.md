# Source-To-Skill Distillation Patterns

Use this reference when source material is larger than a short pasted method, spans multiple languages or files, or must become an installable skill package.

## Rule IDs

- `source-skill-1` — Evidence first. Record what was read, what was unavailable, and which claims are inferred before writing instructions.
- `source-skill-2` — Mechanisms beat summaries. Keep decision rules, procedures, outputs, quality signals, and failure modes; discard prose that only explains the topic.
- `source-skill-3` — Discovery metadata is a semantic contract. The frontmatter description must front-load the concrete job, artifact, material contexts, and nearby exclusions; trigger words are anchors, not a literal router.
- `source-skill-4` — Default to one skill. Split only when source tasks are independently requestable and have distinct accepted artifacts and acceptance authorities; never add a meta-router.
- `source-skill-5` — Progressive disclosure keeps the skill usable. Put long language notes, rubrics, examples, edge cases, and source inventories in references.
- `source-skill-6` — Scripts are for deterministic repeat work. Do not script judgment, taste, or synthesis that an agent must reason through.
- `source-skill-7` — Public skills require original synthesis. Do not copy source structure or close paraphrases into the package.
- `source-skill-8` — Multilingual evidence needs two maps: source-language signals and output-language expectations.
- `source-skill-9` — Evals must test behavior, over-triggering, and artifact shape, not whether the skill name appears.
- `source-skill-10` — Validation is part of the artifact. A generated skill is not delivery-ready until repo-local checks or an explicit dry-run boundary exist.

## State Machine

```text
source_received -> evidence_boundary_named -> language_map_created
language_map_created -> mechanism_cards_extracted -> package_shape_selected
package_shape_selected -> skill_authored -> references_linked -> evals_added
evals_added -> repo_validation_run -> failures_triaged
failures_triaged -> fixed -> repo_validation_run
repo_validation_run -> pass -> delivery_ready
repo_validation_run -> blocked -> dry_run_report
```

## Source Mode Decision Table

| Source situation | Mode | Required artifact | Stop condition |
| --- | --- | --- | --- |
| Short pasted method | Quick brief | One mechanism card and concise `SKILL.md` draft | User asks for installable files |
| Multiple docs, transcripts, or repos | Source audit | Source inventory, language map, mechanism cards, package plan | Evidence boundary is unclear |
| User asks for repo or installable package | Package build | Skill folder, reference, eval, behavior example, validation result | Public push or publication gate |
| Existing skill summarizes but does not guide action | Repair | Failure diagnosis, minimal patch, retest prompt | Source or failing behavior unavailable |
| Video/audio without transcript | Blocked source | Request for transcript, subtitles, notes, or extraction permission | Do not infer from metadata |
| Multilingual or RTL source | Language-aware build | Language map plus preserved trigger terms and locale risks | Output language changes public semantics |

## Language And Format Matrix

| Source language or format | Preserve | Normalize | Watch for |
| --- | --- | --- | --- |
| English | Domain terms, examples, claims, command names | Bloated prose into rules | Generic management-speak becoming instructions |
| Cantonese / Traditional Chinese | 粵語 trigger phrases, code-switching, local examples, tone when user-facing | Public skill body can be English if repo convention requires it | Losing the actual future trigger by converting everything to formal written Chinese |
| Simplified Chinese | User intent phrases, workflow verbs, terms of art | Script can be normalized only when output convention says so | Treating translation as evidence rather than marking it as normalized |
| Japanese | Register, honorific intent, product terms, examples | Mechanisms into concise English or target output language | Literal English order or lost politeness constraints |
| Korean | Speech level, honorifics, product vocabulary | Workflow rules into target output language | Flattening nuanced user roles or customer context |
| Spanish, French, German, Portuguese | Regional variant, formal/informal address, gender/number constraints | Source examples into mechanism cards | Assuming one regional variant covers all markets |
| Arabic and RTL scripts | Directionality, register, named entities, culturally specific phrases | Package body into target output language with RTL notes in references | Broken punctuation direction or invented idiom |
| Mixed technical copy | API names, model names, file paths, commands, package managers | Surrounding prose into rules | Translating identifiers, error messages, or code tokens |
| Code repositories | Language runtime, framework, package manager, tests, CLI commands, public exports | Repo behavior into skill workflow only when repeated | Treating code comments as authoritative over tests or docs |

## Mechanism Card Schema

```text
id:
source_evidence:
source_language:
trigger_phrases:
user_job:
decision_rule:
procedure:
output_contract:
quality_signal:
failure_mode:
package_location: SKILL.md | references | scripts | evals | discard
status: keep | merge | discard
```

## Package Shape Decision Table

| Shape | Use when | Avoid when |
| --- | --- | --- |
| Single procedural skill | One repeated job with one output family | Source has unrelated domains |
| One skill with modes | Same root job, different evidence depth or artifact targets | Modes hide unrelated triggers |
| Skill plus reference | Rules or language matrices are useful but too long for `SKILL.md` | Reference is never linked or needed |
| Skill plus script | Validation, extraction, or fixture comparison is mechanical | Synthesis is judgment-heavy |
| Separate sibling skills | Independent user intents have distinct accepted artifacts and acceptance authorities | A shared job can use one Skill with modes or references |
| Public repository package | User asks for open-source distribution or marketplace readiness | User only needs a local skill draft |

## Output Event Schema

Use this schema when reporting or logging a conversion:

```text
source_to_skill_conversion:
  source_boundary:
    read:
    unavailable:
    languages:
    assumptions:
  package:
    skill_name:
    shape:
    files:
    validation:
  quality:
    mechanisms_kept:
    mechanisms_discarded:
    positive_prompts:
    negative_prompts:
    residual_risks:
```

## Review Checklist

- Evidence boundary separates read evidence, user claims, inference, and unavailable material.
- At least one mechanism card changes future agent behavior.
- Frontmatter description includes concrete "Use when" trigger text.
- Frontmatter does not rely on the body to explain the route or stuff a synonym list.
- `SKILL.md` can run without the original source in context.
- Every reference is linked directly from `SKILL.md`.
- Multilingual source terms are preserved only when they affect triggering, examples, or locale behavior.
- Generated public text is original synthesis, not close paraphrase.
- Eval fixture includes positive prompts, nearby negative prompts, and expected behavior assertions.
- Behavior example contrasts weak baseline with skill-shaped output.
- Repo-local validators and generators pass, or the final report labels the result as dry-run.
