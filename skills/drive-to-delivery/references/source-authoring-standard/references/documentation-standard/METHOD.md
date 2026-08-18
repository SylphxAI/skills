# Documentation Standard

Place each durable product fact in one authoritative home without creating a
parallel status system. The active repository's declared documentation
contract wins. When none exists, use the smallest conventional structure that
keeps destination, requirements, architecture, decisions, and current work
distinct.

## Method

1. Read the repository's current contributor instructions, documentation
   index, and existing files before choosing a path. Preserve a declared home.
2. Classify the fact: destination, problem and requirements, capability or
   architecture, durable decision, operating procedure, or current change.
3. Use one writable authority for each fact. Link to it from README or other
   indexes instead of copying the content.
4. If the repository has no declared structure, prefer `docs/vision.md` for
   destination, `docs/prd.md` for a real product requirements document,
   `docs/capabilities.md` for a durable capability graph, and the repository's
   existing ADR convention for accepted decisions.
5. Keep current implementation and review state on the change surface the
   repository already uses, such as a pull request. Do not create a second
   dashboard merely to restate it.
6. Use Mermaid for durable diagrams and LaTeX for durable mathematical
   notation when the repository's renderer supports them.
7. State the action, authoritative home, and observable done condition. Keep
   neighbour exclusions short.

## Form

| Need | Default home when undeclared | Form |
| --- | --- | --- |
| Product destination | `docs/vision.md` | Stable promise and boundaries |
| Product requirements | `docs/prd.md` | Problem, users, requirements, scope, success, and risks |
| Capability architecture | `docs/capabilities.md` | IDs, dependencies, and falsifiable done conditions |
| Durable decision | Existing ADR convention | Context, decision, consequences, and supersession |
| Durable diagram | Owning document | Mermaid whose nodes match the authoritative terms |
| Durable math | Owning document | LaTeX in Markdown |

## Adopt while already touching the repo

When a product is already being changed, fill only the documentation required
to make that change truthful. Add a destination or capability document when
its fact is otherwise missing, point indexes at the authority, and keep
`docs/prd.md` only when it is a real PRD. Leave historical ADRs historical. Do
not add file-existence CI or run a fleet rewrite of empty files.

## Catch-up

Contributor instructions → documentation index → destination → capability or
requirements authority → latest binding decision → code being changed.

## Boundaries

- This standard grants no tools, credentials, or permissions.
- Product repositories own product facts and may declare different homes.
- A missing heading is not a product defect. A second writable
  destination is.
