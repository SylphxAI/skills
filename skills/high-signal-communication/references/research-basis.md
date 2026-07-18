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

Sources:

- [Google: Short sentences](https://developers.google.com/tech-writing/one/short-sentences)
- [Microsoft: Scannable content](https://learn.microsoft.com/en-us/style-guide/scannable-content/)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Liu et al.: Lost in the Middle](https://arxiv.org/abs/2307.03172)
