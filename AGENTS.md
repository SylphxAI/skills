# Repository guidance

Use standard industry vocabulary in skills, references, README text, and agent
instructions. Before naming a concept or replacing shorthand, read the
[clear-writing terminology glossary](skills/clear-writing/references/terminology.md).
Keep historical labels only in that glossary, with a replacement, a source, and
usage context. Preserve legitimate domain terms and exact API identifiers.
Do not create another glossary in a sibling skill.

Run `python3 scripts/verify-skills.py` before submitting changes. Validate
terminology with `python3 scripts/verify-terminology.py` as well.
