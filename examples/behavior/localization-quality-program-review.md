# localization-quality-program-review behavior example

skill: localization-quality-program-review

## Positive prompt

> Plan localization QA for a subscription mobile app launching Japanese, Korean, German, and Arabic across onboarding, checkout, cancellation, push notifications, help center, store listings, and support macros.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Scopes product UI, billing, cancellation, notifications, emails, help center, support macros, store listings, legal/privacy, marketing, and platform surfaces.
- Includes source readiness, pseudo-localization, glossary/style guide, translation memory, in-context review, functional LQA, RTL/accessibility, defect severity, and release gates.
- Flags translation-only launches, unsupported critical flows, placeholder/plural/truncation bugs, vendor-only review, and missing market feedback loops.

It should also produce the artifact shape requested by `skills/localization-quality-program-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit a data warehouse metrics layer for ARR and churn definitions.

The skill should not load for this prompt unless the user adds an explicit localization-quality-program-review context.

## Expected behavior

- Scopes product UI, billing, cancellation, notifications, emails, help center, support macros, store listings, legal/privacy, marketing, and platform surfaces.
- Includes source readiness, pseudo-localization, glossary/style guide, translation memory, in-context review, functional LQA, RTL/accessibility, defect severity, and release gates.
- Flags translation-only launches, unsupported critical flows, placeholder/plural/truncation bugs, vendor-only review, and missing market feedback loops.
