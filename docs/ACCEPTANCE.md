# Acceptance

1. No hard listing-count gate in author-skill or MODEL
2. Independently requestable jobs are listings (not demoted for size)
3. Standards/domain shapes/engine tooling remain references where appropriate
4. `npm test` green; install ships all listings + their references
5. Knowledge preserved on move/restore
6. Every listing carries schema-valid `capability.json`. `qualification.json` is optional; catalog projects qualification state (missing = unqualified)
7. AutoSync and manual sync fail closed on qualified→unqualified downgrade; `status` surfaces qualification state
8. No package claims `qualified` without version-scoped, expiring evidence from a named evaluator
9. AutoSync applies only immutable annotated release tags with a verified promotion manifest; branch-following configs are retired and fail closed
