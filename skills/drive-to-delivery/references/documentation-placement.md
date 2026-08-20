# Documentation placement

Place each durable product fact in one authoritative home. The active
repository's declared documentation contract wins. When none exists, extend
the smallest nearby authority that can own the fact and make that ownership
discoverable from the repository's existing index or contributor path.

Read contributor instructions, the documentation index, and existing files
before choosing a path. Preserve a declared home.

Classify the fact — destination, problem and requirements, capability or
architecture, durable decision, operating procedure, or current change — and
keep one writable authority for that class. Link to it from README or other
indexes instead of copying the content.

If the repository has no declared structure, extend the nearest existing
document that already owns the same class of fact. Create one new document
only when mixing the fact into that authority would make ownership ambiguous;
name and place it like nearby files, and link it from the existing index.

Current implementation and review state stay on the change surface the
repository already uses, usually a pull request. Do not create a second
dashboard merely to restate them. Use Mermaid for durable diagrams and LaTeX
for durable mathematical notation when the renderer supports them.

| Need | Authority to discover or establish | Form |
| --- | --- | --- |
| Product destination | Existing strategy, product brief, or vision authority | Stable promise and boundaries |
| Product requirements | Existing requirements, specification, or PRD authority | Problem, users, requirements, scope, success, and risks |
| Capability architecture | Existing architecture or capability authority | Named capabilities, dependencies, and falsifiable done conditions |
| Durable decision | Existing decision-record convention | Context, decision, consequences, and supersession |
| Durable diagram | Owning document | Mermaid whose nodes match the authoritative terms |
| Durable math | Owning document | LaTeX in Markdown |

When a product is already being changed, fill only the documentation required
to make that change truthful. Do not add file-existence CI or run a fleet
rewrite of empty files. Historical decision records stay historical.

Catch-up order when the repository is thin: contributor instructions →
documentation index → destination → capability or requirements authority →
latest binding decision → code being changed.

This guide grants no tools, credentials, or permissions. Product repositories
own product facts and may declare different homes.
