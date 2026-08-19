# Contributing

## Package shape

A skill represents one recurring job that benefits from a particular opinion,
gotcha, or interface a capable model would otherwise miss. Create
`skills/<name>/SKILL.md` with the standard `name` and `description`
frontmatter. Put long material in references and executable helpers in
scripts only when the body uses them.

The best contribution usually improves an existing semantic owner. A new
package is appropriate when users request an independently meaningful job with
its own loading description.

## Writing

- Encode particular opinions and gotchas, not numbered recipes of ordinary work.
- Prefer one judgement heuristic that stays true over absolute rules that are
  not always true. Constrain only money, deletion, credentials, safety, or a
  public contract.
- Write a description that says what the skill does and when to use it,
  including phrases a user would type and nearby cases that should not trigger.
- Open references only when a stated condition holds.
- Prefer a script or a short template when the job is fragile or needs a format.
- Do not constrain judgement except money, deletion, credentials, safety, or a
  public contract.
- Use host-specific metadata for a real consumed setting outside the
  `SKILL.md` contract.

## Verification

Run the check that exercises the changed behavior. For Markdown-only changes,
the pull-request workflow validates the Agent Skills format and local links.
For bundled scripts, run their syntax check and tests as well.

CI remains one fast commit build. A failing merge check identifies a broken
skill contract, resource link, script, or script test.

## Pull requests

Describe the job or behavior improved, the changed path you ran, and any user
visible migration. Local, landed, released, and live state are reported as
separate facts.
