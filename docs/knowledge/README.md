# Knowledge location

Method knowledge that agents need is installed **with the owning skill package**
under `skills/<job>/references/`.

Constraint packs (`*-standard`, profiles, matrices) are **not** listing skills.
They live under the applying workflow skill (see [docs/MODEL.md](../MODEL.md)
and [docs/CURATION-LEDGER.md](../CURATION-LEDGER.md)).

There is **no** `sylphx-methods` bag and **no** docs-only agent binding depth.
`docs/` is human git documentation only.

Start from the job skill that owns the work, then open the referenced standard
or shape pack named by that skill body.
