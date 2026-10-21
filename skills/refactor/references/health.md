# Health standard

Trigger: adding, replacing, or deleting code, tests, CI, or documentation.

Code is a cost; capability is the asset. A healthy repository delivers the most
capability with the least code a reader must understand. Fewer lines is the
result, not the goal: remove concepts, copies, and dead paths, and keep clarity;
compressing expressions or merging unrelated logic to cut a count makes a
repository less healthy. Every line is reached by something in production and
duplicated by nothing. A change is done when its obsolete leftovers are gone and
what it touched carries the best name, in the same outcome; remaining work that cannot
go yet is tracked in the work tracker.

## Hard lines

- **Prove no customer uses a capability before deleting it.** Unreached is not
  unused: check its API logs, calls from product repositories, and its
  capability row. A capability a cutover left unreached is a regression to
  re-serve. In September 2026 such deletions removed feature flags, KV, search,
  webhooks, realtime channels, end users and customer organizations from the API
  while customers still used them.

## Signals

Changes move the affected signals toward their targets. Generated code,
vendored code, fixtures, and data are counted apart from hand-written code.

| Signal | Measure | Target |
| --- | --- | --- |
| Reachability | hand-written code reachable from binaries, routes, and deployed entry points, over all hand-written code | close to 100% |
| One implementation | capabilities implemented more than once (second language, client, schema authority, per-entity copy) | 0 |
| Test signal | tests CI actually selects; tests that assert on source or doc text | all; 0 |
| CI cost | runner-minutes and wall time per landed pull request, and queue wait | falling, within the declared budget |
| Change cost | hand-written files over about 1,500 lines | falling to 0 |
| Documentation truth | broken links; capability rows that disagree with the code | 0; 0 |

## How it is judged

A pull request states its net change in hand-written lines, and one that adds a
second implementation names the change that deletes the first. CI enforces the
mechanical signals (a reachability-based dead-code check, one test selector
that includes every test, a link and path check, no step that cannot fail; see
[code.md](../../deliver-and-verify/references/code.md), [dx.md](../../deliver-and-verify/references/dx.md), [docs.md](../../author-skill/references/docs.md)). File size stays a
reported signal. The owning team fixes regressions found by those checks or while changing the
repository, and records what a repeated finding teaches here
(the quality record).
