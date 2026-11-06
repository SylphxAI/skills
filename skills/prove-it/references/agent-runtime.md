# Agent runtime evidence

Trigger: verifying workspace isolation or cleanup, shared instruction freshness,
retained/searchable history, or a tool mutation with an incomplete response.
Use the runtime's supported interfaces and the caller's own credentials. Keep
machine identities, paths and incident records in the owning workspace.

## Match each claim to its layer

| Claim | Evidence needed | Insufficient substitute |
| --- | --- | --- |
| Workspace isolation | Distinct working directories, Git worktree pointers and branches for the actual agents. | Distinct agent names or an intended directory scheme. |
| Shared repository storage | Read each worktree's Git common directory and the runtime's repository-cache ownership. | A cache directory merely exists. |
| Safe archive cleanup | Separate clean/pushed, dirty and unpushed fixtures; read lifecycle state, directory existence, Git status and unique bytes/commits after archive. | A source-only test, or a removed directory without checking unique work. |
| Fresh shared instructions | Current source revision, resolved mounts, generated text and the session's loaded context. | A valid shared symlink alone. |
| Complete retained history | Exact known message body or byte hash from the retention interface. | A search result, a summary or a positive prefix match. |
| Complete searchable history | Known early and late text found through the supported query interface, including relevant filters. | Raw storage contains the body. |
| Multi-runtime support | Actual execution receipts for every claimed maintained runtime and version. | Catalog membership, protocol tests or local doubles. |

For cleanup, preserve uncertain or unique work. When an expected removal does
not happen, collect the cleanup decision, Git exit status and stderr under the
runtime's execution identity before naming a cause. A local explicit-directory
success does not establish another placement route works. Record skipped and
uninstalled runtimes as gaps; do not switch a worker's model or repair its
running environment to manufacture acceptance.

## Disprove truncated-search acceptance

A delivery receipt can coexist with a truncated recovery projection. For
structured handoffs, retain the authoritative artifact's hash, record count and
identity fields, use a supported artifact transfer or smaller complete messages
when needed, and verify the receiver reconstructs the intended records. A partial
reconstruction leaves the missing records unknown.

Use an authorized disposable message with unique beginning and ending markers,
a non-ASCII marker when supported, and a body longer than the relevant projection
or index limit. Keep the fixture non-sensitive. Record its stable ID, exact
length, marker offsets and retention result before judging search.

1. Fetch the known body through the unfiltered retention route. If that route is
   paginated, follow continuation until the known ID is found or scope is complete.
2. Search for the beginning and ending independently. A successful beginning is
   the positive control, not proof the full body is indexed.
3. Exercise sender, direction and sequence/time filters on known matching and
   nonmatching records. Scope controls to the inbound message if an executor's
   legitimate reply repeats the markers.
4. Test exclusion with both early and late text. A late-term miss can affect
   negative filters as well as positive searches.
5. Compare raw and indexed lengths, normalisation and truncation in the governing
   code. Distinguish the source revision inspected from the deployed artifact.

**Wrong:** “The suffix search returned nothing, so the message was lost.”
**Right:** “The known body retains the suffix; the same scoped suffix query misses
it while the prefix control passes. Search coverage failed; raw retention did
not.” If retained text is absent too, investigate that separate failure rather
than assuming the index explains it. A complete repair must cover safe reindexing
of existing retained records, not just future inserts.

## Separate fresh files from fresh sessions

Read the shared source revision, resolve the mount, compare generated content
with the current source, then inspect loaded session context when available.
A file can become current on the next launch while a previous session still
contains old instructions. Capture before/after times on the same identity
population. Name unreadable homes and missing paths; neither is a positive pass.
A later refresh disproves a permanent stale-file claim, not the earlier dated
observation. Do not equate a generated-file census with consumed-context coverage.

## Recover uncertain mutations without duplicating work

A connection handshake is not a tool-result receipt. If a mutation returns only
initialization, times out or loses its response, inspect the target's state and
existing receipt before repeating it. Keep the original failure and any positive
postcondition as separate evidence. A read-only isolated reproduction can narrow
the location of a fault; failure to reproduce there does not erase the original
observation or establish its cause.

Idempotent replay may return the original saved response unchanged. Judge it by
the stable operation/message ID, sequence and stored effects, not an assumption
that a duplicate flag changes on replay. Sending to a dormant or archived agent
may itself reactivate execution: inspect the lifecycle semantics before sending,
and use an authorized disposable identity for such a test.
