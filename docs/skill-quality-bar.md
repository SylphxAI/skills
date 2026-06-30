# Skill Quality Bar

A Sylphx skill is an agent capability package. It is not a blog post, not a prompt dump, and not a hidden policy file.

## Required properties

- **Clear trigger**: the `description` says when to use the skill.
- **Compact method**: `SKILL.md` tells the agent how to proceed without flooding context.
- **Progressive disclosure**: detailed reusable knowledge is linked from `references/` and loaded only when needed.
- **Observable output**: the skill defines what good work looks like.
- **Safety**: scripts are deterministic, scoped, and understandable.
- **Original synthesis**: content is written in Sylphx's own structure, examples, and wording after understanding the domain. Attribute only direct quotes, third-party code/assets, or license-required excerpts.

## Rejection reasons

- vague descriptions like "helps with productivity";
- generic advice the base model already knows;
- copied expression, close paraphrases, or source structure laundering;
- unsafe shell commands or credential handling;
- dark patterns, deception, spam, or abusive automation;
- huge `SKILL.md` files that should be split into references.

## Review checklist

1. Would an agent know when to load it from metadata alone?
2. Does it improve output on at least one realistic prompt?
3. Does it avoid over-triggering on unrelated prompts?
4. Are references necessary and directly linked?
5. Is the skill clearly original synthesis rather than a lightly rewritten source?
6. Are scripts safe to inspect and run?
7. Is the skill maintainable by someone who did not write it?
