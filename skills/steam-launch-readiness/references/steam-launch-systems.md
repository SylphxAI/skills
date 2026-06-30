# Steam Launch Systems

A Steam launch is a funnel from first impression to wishlist to purchase to first-session satisfaction to review. Treat each surface as part of one operating system.

## Rule IDs

- `steam-1` — Capsule art, short description, trailer, screenshots, and tags must communicate the same genre promise within seconds.
- `steam-2` — The first trailer segment should show real gameplay, not only mood or logos, unless the genre convention strongly supports it.
- `steam-3` — Wishlists need reasons to accumulate: demo, festival, dev updates, influencer beat, launch date, or feature proof.
- `steam-4` — Demo and playtest builds should teach the core loop quickly and set expectations for final quality.
- `steam-5` — Store tags should match player search intent and expectation; misleading tags increase refund and negative review risk.
- `steam-6` — Cloud saves, achievements, controller support, language support, and system requirements must match the shipped build.
- `steam-7` — Launch discount and pricing should be intentional, region-aware, and compatible with future discount strategy.
- `steam-8` — Community hub, bug reports, patch notes, and moderation need an owner before traffic arrives.
- `steam-9` — Review-risk issues such as crashes, performance, save loss, confusing onboarding, and missing settings are launch blockers.
- `steam-10` — First-week operations should include hotfix path, known issues, support macros, sentiment triage, and patch cadence.

## Readiness decision table

| Area | Ready signal | Blocker signal | Evidence |
| --- | --- | --- | --- |
| Store promise | Assets show real loop and audience fit | Trailer/screens misrepresent game | Store draft review and player test |
| Wishlist funnel | Clear beats before launch | No reason to wishlist before release | demo/festival/update calendar |
| Demo/playtest | Teaches loop and captures feedback | Confusing tutorial or unstable build | completion, crash, survey, forum themes |
| Platform features | Achievements/cloud/controller work | Claims not matched by build | test matrix and user-facing settings |
| Support/community | Bug report and moderation flow exists | No owner for launch-week traffic | macros, triage board, response SLA |
| Pricing | Price matches value and region expectations | Discount trains immediate waiting | pricing rationale and launch discount rule |

## State machine

```text
store_page_draft -> store_page_reviewed -> coming_soon_live -> wishlist_growth
wishlist_growth -> demo_released -> feedback_collected -> launch_build_locked
launch_build_locked -> release_live -> first_week_triage -> patch_or_hotfix
release_live -> refund_or_negative_review_risk -> known_issue_response
first_week_triage -> review_response -> post_launch_roadmap_update
```

## Event schema

Track or request these metrics when available:

- `store_page_viewed`: source, country, language, tag set, device class.
- `wishlist_added`: source, campaign, demo_exposed, festival_exposed.
- `demo_started`: build, source, session_length, tutorial_completed.
- `purchase_started`: country, price, discount, wishlist_age_days.
- `first_session_completed`: crash, settings_changed, achievement_unlocked, save_created.
- `refund_signal`: playtime_bucket, reason_theme, crash_or_performance_related.
- `review_theme_logged`: sentiment, theme, build_version, response_needed.

## Launch checklist

- Store page assets align: capsule, trailer, screenshots, description, tags, languages.
- Build supports claimed OS, controller, cloud save, achievements, localization, and settings.
- Demo/playtest feedback is triaged into must-fix, expectation-setting, and roadmap buckets.
- Launch discount, regional pricing, and future sale posture are documented.
- Community hub has pinned known issues, bug report format, moderation rules, and patch-note cadence.
- Hotfix path is rehearsed, including rollback or save-migration safety.
