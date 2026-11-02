# App store review and privacy evidence

Trigger: checking a rejected store update, policy declaration, release status,
or privacy destination before reporting it resolved.

## Match the review to the thing reviewed

Read the app/package, version, build and review timeline. Enumerate the full
population when claiming a team-wide sweep; otherwise name the sampled scope.
On App Store Connect, inspect each review submission's items and their related
`appStoreVersion`. One submission can concern an event rather than a binary.
An approved event does not clear a rejected version. Distinguish a developer
withdrawal from a currently unresolved store rejection.

- **Bad:** “The newest submission is complete, so the rejected update passed.”
- **Good:** “The completed submission approved an event; the version's own
  review item remains rejected.”

Read the actual store message and deadline before proposing the remedy.
Developer-supplied review notes and state enums do not establish the store's
reason. If the authorized API lacks that message, use the authenticated
Console; if access is unavailable, report the exact missing view as unknown.
An unavailable policy view cannot establish that all packages are clean.

## Keep evidence layers separate

| Claim | Required evidence |
| --- | --- |
| Policy declaration is truthful | Actual Console answers compared with the exact artifacts on every distributed track; source-only answers establish a draft. |
| Rejection is resolved | The same review object's current state and applicable store response, not an unrelated later approval. |
| Update is public | A fresh public-store or authoritative live-track read for the relevant territories, build and rollout percentage. Approval or pending developer release is insufficient. |
| Store privacy field works | The field's destination, final HTTP result and policy content. |
| Shipped app's privacy button works | Exact original artifact or installed-build identity, actual destination and HTTP result. A working store field alone is insufficient. |

Matching version/build numbers in a source export help locate the candidate;
they do not by themselves bind that export to the shipped binary. A missing URL
literal may mean runtime configuration or unavailable source, not a broken link.
State that uncertainty rather than replacing the app to manufacture a pass.

A write-only declaration API does not supply a read of the completed
Console form. Read the current API resource and methods before treating an API
limitation as a reason to mutate or create a fresh edit.

For an authorized remedy, follow
[external-operation reconciliation](../../deliver-and-verify/SKILL.md#execute-and-verify)
and preserve any request already in flight. Report the exact issue, what
changed, what remains and the consequence if left. Distinguish measured lost
revenue from exposed sales; an older public version is not a full outage.

## Sources and replacement conditions

- [Apple ReviewSubmission](https://developer.apple.com/documentation/appstoreconnectapi/reviewsubmission),
  read 2026-11-02: review submissions group reviewable items, including app
  versions and events. Re-read its relationships and item schema if the API
  contract changes.
- [Android Publisher REST resources](https://developers.google.com/android-publisher/api-ref/rest),
  read 2026-11-02: select methods from the current contract rather than assuming
  that a declaration upload also provides policy-status or form reads. Revisit
  the Console fallback if a supported authoritative read becomes available.
