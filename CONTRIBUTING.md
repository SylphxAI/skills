# Contributing

## Package shape

A skill represents one recurring job that benefits from a reusable method.
Create `skills/<name>/SKILL.md` with the standard `name` and `description`
frontmatter. Put detailed material in references and executable helpers in
scripts only when the main method uses them.

The best contribution usually improves an existing semantic owner. A new
package is appropriate when users request an independently meaningful job with
its own loading description and output.

## Writing

- Lead with the action path and expected result.
- Use plain product and domain language.
- State the permitted path, owner, boundary, or selection condition directly.
- Open references only where they help the current task.
- Keep one source for each instruction or fact.
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
