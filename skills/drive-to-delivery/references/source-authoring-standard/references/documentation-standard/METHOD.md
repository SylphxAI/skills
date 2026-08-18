# Documentation Placement Method

Place each durable product fact in one authoritative home without creating a
parallel status system. The active repository's declared documentation
contract wins. When none exists, extend the smallest nearby authority that can
own the fact and make that ownership discoverable from the repository's
existing index or contributor path.

## Method

1. Read the repository's current contributor instructions, documentation
   index, and existing files before choosing a path. Preserve a declared home.
2. Classify the fact: destination, problem and requirements, capability or
   architecture, durable decision, operating procedure, or current change.
3. Use one writable authority for each fact. Link to it from README or other
   indexes instead of copying the content.
4. If the repository has no declared structure, extend the nearest existing
   document that already owns the same class of fact. Create one new document
   only when mixing the fact into that authority would make it ambiguous; name
   and place it consistently with the repository's current layout and link it
   from the existing index.
5. Keep current implementation and review state on the change surface the
   repository already uses, such as a pull request. Do not create a second
   dashboard merely to restate it.
6. Use Mermaid for durable diagrams and LaTeX for durable mathematical
   notation when the repository's renderer supports them.
7. State the action, authoritative home, and observable done condition. Keep
   neighbour exclusions short.

## Form

| Need | Authority to discover or establish | Form |
| --- | --- | --- |
| Product destination | Existing strategy, product brief, or vision authority | Stable promise and boundaries |
| Product requirements | Existing requirements, specification, or PRD authority | Problem, users, requirements, scope, success, and risks |
| Capability architecture | Existing architecture or capability authority | Named capabilities, dependencies, and falsifiable done conditions |
| Durable decision | Existing decision-record convention | Context, decision, consequences, and supersession |
| Durable diagram | Owning document | Mermaid whose nodes match the authoritative terms |
| Durable math | Owning document | LaTeX in Markdown |

## Adopt while already touching the repo

When a product is already being changed, fill only the documentation required
to make that change truthful. Add or split a document only when no existing
authority can own the fact clearly, point the repository's existing index at
the authority, and leave historical decision records historical. Do not add
file-existence CI or run a fleet rewrite of empty files.

## Catch-up

Contributor instructions → documentation index → destination → capability or
requirements authority → latest binding decision → code being changed.

## Boundaries

- This standard grants no tools, credentials, or permissions.
- Product repositories own product facts and may declare different homes.
- A missing heading is not a product defect. A second writable
  destination is.
