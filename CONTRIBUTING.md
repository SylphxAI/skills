# Contributing

## Package shape

A skill is one recurring job that benefits from an opinion, gotcha, or
interface a capable model would otherwise miss. Create
`skills/<name>/SKILL.md` with the standard `name` and `description`
frontmatter. Put long material in `references/` and executable helpers in
`scripts/`, only when the body uses them.

Improving an existing skill is usually the best contribution. Add a package
when users request an independently meaningful job with its own loading
description.

## Writing

- Encode opinions and gotchas, not numbered recipes of ordinary work.
- Prefer one judgement heuristic that stays true over absolute rules that are
  not always true. Constrain only money, deletion, credentials, safety, or a
  public contract.
- Write a description that says what the skill does and when to use it,
  including phrases a user would type and nearby cases that should not trigger.
- Open references only when a stated condition holds.
- Prefer a script or short template when the job is fragile or needs a format.
- Use host-specific metadata only for a real consumed setting outside the
  `SKILL.md` contract.

## Verification

The pull-request workflow validates the Agent Skills format, local links, the
package contract (including the DSH catalog mount), and bundled scripts. For a
script change, also run its syntax check and tests. A failing check names the
broken skill contract, link, script, or test.

## Pull requests

Describe the job or behavior improved, the path you ran, and any user-visible
migration.
