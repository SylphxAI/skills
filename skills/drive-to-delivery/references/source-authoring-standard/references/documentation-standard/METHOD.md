# Documentation Standard

Place product facts in the locked industry homes. Company law is
[standards/docs.md](https://github.com/SylphxAI/owner/blob/main/standards/docs.md)
and [ADR-008-DOC-LOCK](https://github.com/SylphxAI/owner/blob/main/decisions/ADR-008-DOC-LOCK.md).
This method cites that law. It does not replace it and does not copy the owner
notebook.

## Method

1. Map the fact to one locked home in owner `standards/docs.md` **Industry
   layers**. One writable path per layer.
2. Write destination in `docs/vision.md` (`standards/docs.md` **Product
   Vision**). New destination files are only `docs/vision.md`. Existing
   `NORTH-STAR` filenames are migration input; converge them when that
   destination is next changed.
3. Put a North Star Metric only as a short section inside `docs/vision.md`,
   and only when one real customer-value quantity exists.
4. Write the capability DAG in `docs/capabilities.md`. The
   `ID | Depends on | Done when` table is authority. Current work lives on
   the product PR.
5. Keep PRD, spec, and ADR in their own homes. README and `PROJECT.md` only
   link.
6. Draw durable diagrams as Mermaid (`standards/docs.md` **Diagrams**). Write
   durable math as LaTeX (`standards/docs.md` **Mathematics**). Durable text
   is English (`standards/docs.md` **Writing language**).
7. Write the action, the home, and the done look (`standards/docs.md`
   **Write the path**). A "do not" is a neighbour, not a chapter.

## Form

| Need | Owner section | Form |
| --- | --- | --- |
| Durable diagram | Diagrams | Mermaid. A capability picture is a `flowchart` that names the same IDs as the table |
| Durable math | Mathematics | LaTeX in the `.md` |
| Durable prose | Writing language | English. Destination file is `docs/vision.md` |
| Instruction shape | Write the path | Positive path; neighbour exclusion is one line |

Open owner `standards/docs.md` for the locked map. This package does not
publish a second documentation law.

## Adopt while already touching the repo

When this product is already being changed, apply owner `standards/docs.md`
**Adoption**: add `docs/vision.md` if missing, point README at it, write
`docs/capabilities.md` when the graph is touched, and keep `docs/prd.md`
only when it is a real PRD. Leave historical ADRs historical. Do not add
file-existence CI or run a fleet rewrite of empty files.

## Catch-up

README → `docs/vision.md` → `docs/capabilities.md` → real PRD if the feature
has one → the latest binding ADR → the code you will change.

## Boundaries

- This standard grants no tools, credentials, or permissions.
- Product repositories own product facts. `SylphxAI/owner` owns company
  documentation law. This package does not invent a second map.
- A missing heading is not a product defect. A second writable
  destination is.
