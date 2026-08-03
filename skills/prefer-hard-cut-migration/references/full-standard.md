# Hard-cut migration policy (detail)

## Exception bar (must meet all)

| Gate | Required evidence |
| --- | --- |
| Scale | Named large user cohort, traffic share, or data volume |
| Impact | Concrete failure mode if hard-cut now (not hypothetical “someone”) |
| Value | Dual path EV > cost of maintain + test matrix + residual risk |
| Exit | Calendar or metric retirement + owner + delete proof |

If any gate fails → **hard-cut**.

## Forbidden residuals

- Forever feature flags for old behavior
- Undated compatibility shims
- Dual public packages for the same job (`foo` + `foo-legacy` without retire plan)
- “Support both” docs without a contract terminal
- Keeping predecessor after destination is sole writer

## Skill portfolio

When retiring a Skill: delete the package, rewrite neighbors, update fixtures,
rebuild catalog, reinstall. Do not leave alias packages for comfort.

## Relation to expand-contract

`eng-migrate-01` still allows expand-contract for **demonstrated live**
compatibility/state/effect risk. This policy sets the **default** and forbids
stopping at “expand” without **contract**.
