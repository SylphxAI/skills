# Source-To-Skill Patterns

Use this reference when source material spans several files, formats,
languages, or repositories.

## Select the reusable job

Start from requests that recur and produce an independently useful result.
Extract the source's distinctive mechanisms:

- decisions and the facts that drive them;
- actions, ordering, and tool use;
- output shape and quality criteria;
- domain terms, edge cases, and recovery behavior;
- attribution, license, privacy, and publication limits.

Source structure is an input. Organize the skill around the future user's job.
One skill serves one coherent job and output family. Distinct jobs with
independently accepted results become sibling skills.

## Choose package contents

Place the shortest complete procedure in `SKILL.md`. Keep detailed domain
material, variants, examples, and long tables in directly linked references.
Use scripts for deterministic work that recurs. Use assets for files copied or
adapted into results.

The frontmatter description states the concrete job and the circumstances that
should select it. Native skill discovery uses `name` and `description`, so the
description carries the routing meaning.

## Work across languages and formats

Preserve identifiers, commands, product names, legal terms, named error codes,
and source-language phrases that materially affect user intent. Write the
package in the repository's audience language and keep locale-specific nuance
in a reference when it changes behavior.

For repositories, use current behavior, tests, public interfaces, and owned
documentation together. Resolve conflicts through the source owner and record
the chosen basis in ordinary prose.

For audio or video, use an authorized transcript, subtitles, or notes as the
working source. For screenshots and scans, retain enough visual context to
distinguish observed interface behavior from interpretation.

## Preserve knowledge accurately

Compare the draft with the source and check:

- every distinctive decision rule and procedure has a destination;
- examples teach the mechanism rather than copy source prose;
- history and commentary stay contextual;
- public text is original synthesis with required attribution;
- sensitive or private material follows its publication boundary;
- links point directly from `SKILL.md` to each useful reference;
- the package can perform the job using the installed contents.

## Validate the package

Run the repository's native skill validator, resolve links, execute included
scripts, and try one representative request. Inspect whether the result follows
the extracted method, preserves meaning, and remains useful independently of
the original source.

For a material routing change, try realistic direct, adjacent, ambiguous, and
multilingual requests on the supported native runtimes. Use the results to
improve the frontmatter description and procedure.

## Report the distillation

Return:

1. package path and one-line job;
2. source, revision, ownership, license, and publication scope;
3. knowledge placed in `SKILL.md`, references, scripts, and assets;
4. representative task result and validator result;
5. source material that still needs owner input.
