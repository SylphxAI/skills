# Source-To-Skill Patterns

Use this reference when source material spans several files, formats,
languages, repositories, or historical states.

## Evidence boundary

Record what was read, what was unavailable, what is inferred, and which source
owns conflicting claims before writing instructions. For a repository, inspect
current behavior, tests, public interfaces, active proposals, relevant history,
and closed-unmerged work when the requested recovery needs them. Historical
presence proves neither current truth nor permission to republish.

## Mechanism card

```text
Name:
Source and revision:
Source language:
Trigger phrases:
User job:
Decision rule:
Procedure:
Output contract:
Quality signal:
Failure mode:
Package location:
Keep / merge / discard:
```

Keep mechanisms that change future agent behavior: decisions and their inputs,
action order, tool use, output shape, domain terms, edge cases, recovery, and
validation. Discard prose that only explains the topic or source structure.

## Package shape

| Shape | Use when | Avoid when |
| --- | --- | --- |
| Single procedural skill | One recurring job with one accepted output family | The source contains unrelated jobs |
| One skill with modes | The root job and acceptance authority stay the same | Modes hide different triggers or artifacts |
| Skill plus reference | Rules, examples, rubrics, or locale detail are useful but long | The body never links or selects the reference |
| Skill plus script | Repeated extraction, transformation, or checking is mechanical | The work requires judgment or synthesis |
| Separate sibling skills | Jobs are independently requested and accepted | They only differ by noun, file type, or implementation layer |

Source structure is an input. Organize around the future user's job. A new
listing reads the target repository's contribution contract and existing
descriptions first so one semantic owner remains.

## Discovery and behavior examples

The frontmatter description carries routing meaning before the body loads.
Front-load the concrete job, result, and closest useful exclusion in natural
language. Use keywords as semantic anchors, not as a synonym list.

For material route changes include:

- direct positive requests;
- nearby requests owned by another skill;
- ambiguous and misleading-keyword requests;
- compound requests that need composition;
- correction turns; and
- source-language or code-switched requests likely to recur.

Evaluate the requested artifact or observable decision, not whether an output
copies wording from `SKILL.md`. A static example is evidence of package intent,
not proof that a native host selected the route.

## Languages and formats

- Preserve code, commands, identifiers, product names, model names, filenames,
  URLs, and exact error tokens.
- Preserve source-language trigger phrases only when they affect future
  selection or behavior. State what was translated, normalized, or retained.
- Keep CJK/RTL punctuation, pluralization, politeness, code-switching, and
  locale-specific edge cases in a reference when they would crowd the main
  procedure.
- Audio and video need an authorized transcript, subtitles, or notes.
  Screenshots and scans need enough visual context to separate observation from
  interpretation.

## Loss and publication review

Before finalizing, check that:

- every distinctive decision rule, state, failure mode, example, and oracle has
  one destination;
- current authority, history, commentary, and proposals remain distinct;
- public text is original synthesis with required attribution;
- private or sensitive details are non-reconstructable from the package;
- every reference is linked from `SKILL.md` with a condition for opening it;
- the package can perform its job without the original source in context; and
- repository-native format, links, scripts, and representative behavior pass,
  or the skipped proof is stated precisely.
