# Mechanics catalogue

Trigger: designing a product, a feature, an offer, or a return loop.

The menu behind [mechanics](mechanics.md). These are known growth
and monetisation mechanisms, with the companies that use them and the evidence
we could find: a catalogue to review, not rules.

## How to use it

- **Review the relevant sections when designing growth, retention, or monetisation loops.** Pick what fits, skip what does not, and invent beyond it.
- **Record the chosen mechanics and material alternatives in the design doc** (no skip-bookkeeping ceremony is needed for unrelated features).
- **State target metrics first** - retention, conversion, revenue per user,
  payback - and judge the design by them after launch, never by which entries
  it contains ([growth.md](growth.md): test what changes a
  decision).
- **Limits live elsewhere.** What we allow and the few limits we keep are in
  "Practices we use" in
  the accepted risks record;
  law and stores are met per market
  ([commercial.md](commercial.md#legal-surface),
  [risk.md](risk.md)). This file does not repeat them.
- **Game-only mechanics** (table rules, genre modules, the deep game list)
  stay in the game-platform catalogue,
  `docs/standards/mechanics-catalogue.md`; a generic mechanism belongs here.

**Evidence column.** A figure carries its link and, where the figure is a
vendor's or a third party's, says so. `practice` means widely used by the named
companies with no figure we could source; treat it as a hypothesis to test.
Published lifts come from other people's products, audiences and dates: they
size the upside, they do not predict yours.

**Fits.** `G` game, `A` consumer app, `S` SaaS or B2B, `E` education,
`W` website, marketplace or commerce. `all` means any of them.

## Acquisition

| Mechanism | What it does | Who uses it | Evidence | Fits |
| --- | --- | --- | --- | --- |
| Two-sided referral reward | Both referrer and friend get a reward when the friend joins | Dropbox, Uber, Lyft, Airbnb | Dropbox credits referrals with about 35% of daily signups ([analysis](https://referralrock.com/blog/dropbox-referral-program/)); "3900% growth" is user growth 2008-10, not a referral lift | all |
| Reward on a qualifying action | Pay the reward only after the friend does something real (three card payments, first order) | Revolut, Uber | Revolut: 63% of new retail customers via referral or word of mouth in 2025 ([Growthcurve](https://growthcurve.co/revolut-marketing-spend-margin)) | A S W |
| Reward in product value | Pay in storage, credit, premium days or currency rather than cash | Dropbox (500 MB per friend, cap 16 GB), Duolingo | Dropbox: [analysis](https://referralrock.com/blog/dropbox-referral-program/) | all |
| Referral prompt at a value moment | Ask at peak satisfaction or at a limit, not at signup | Dropbox, Uber | practice | all |
| Referral cap and fraud checks | Cap rewards per user and per week; pay after verification | Lyft ($2,000 a week cap), Revolut | [Lyft terms](https://www.lyft.com/terms/referrals) | A W |
| Referred customers are worth more | Target referrers who are high-margin and unlikely to churn | German retail bank study | Referred customers 16% more valuable over six years, 25% net of acquisition cost ([Schmitt, Skiera, Van den Bulte 2011](https://faculty.wharton.upenn.edu/wp-content/uploads/2012/04/Schmitt-Skiera-vandenBulte-2011-Referral-Programs-Customer-Value.pdf)); one bank | A S W |
| Invite links and codes | A personal link or short code that attributes the signup | Clash Royale, Revolut, Notion | practice | all |
| Team invites | Product is better with colleagues, so the product asks for invites | Slack, Figma, Notion | practice | S |
| Contact-import invites | Find existing contacts on the product (opt-in) | Older social apps, Venmo | practice | A W |
| Share cards | A generated image or page of a result, score or achievement | Wordle, Spotify Wrapped, Strava | practice | all |
| Async challenge link | "Beat my score on today's seed" sent by chat | Wordle-style dailies | practice | G E A |
| Public profile and results pages | A page others can open without an account | Strava, Duolingo, GitHub | practice | A E W |
| Embeds and "made with" attribution | Output carries a link back on free plans | Notion, Typeform, Calendly | practice | S W |
| Gifting: send a subscription or item | Buyer pays, recipient redeems, often new to the product | Duolingo (gift Super), Fortnite, Steam | practice; gift only for new or free users in Duolingo's case ([Duolingo](https://www.duolingo.com/gift)) | all |
| Gift cards and prepaid balance | Prepaid value that is bought once and spent later | Apple, Steam, Roblox | practice | G A W |
| Group buy or split cost | Friends unlock a price together | Pinduoduo, group-buy commerce apps | practice | W |
| Programmatic pages | One template over a dataset yields many search pages | Zapier, Canva, Tripadvisor | Traffic estimates differ 2-5x by tool ([Practical Programmatic](https://practicalprogrammatic.com/examples/zapier)) | S W |
| User-generated content loop | Users create pages search engines index, which bring more users | Pinterest, Tripadvisor, Reddit | [First Round on Pinterest content loops](https://review.firstround.com/pinterest-and-grubhubs-former-growth-lead-on-building-content-loops/) | A W |
| Integration and template directory | Every integration or template is a landing page | Zapier, Canva, Shopify | Zapier directory pages over 60% of traffic (third-party estimate, [Practical Programmatic](https://practicalprogrammatic.com/examples/zapier)) | S W |
| Free tool as a lead magnet | A small useful free tool draws searchers to the product | HubSpot, Ahrefs, Canva | practice | S W |
| Comparison and alternatives pages | Pages for "X vs Y" and "alternatives to X" | Most SaaS | practice | S W |
| Open source with a hosted paid tier | The free code builds trust and distribution | GitLab, Supabase, Sentry | practice | S |
| Educational content and courses | Free teaching that leads to the product | HubSpot Academy, Khan Academy | practice | S E |
| App store optimisation per locale | Title, keywords, screenshots and ratings tuned per market | All top apps | practice | G A E |
| Custom product pages | Different store pages per ad audience or keyword | Apple custom product pages, Play custom listings | practice | G A |
| Store in-app events and promotional cards | Free store placements for events and offers | Apple In-App Events, Google Play LiveOps | practice | G A |
| Pre-registration and pre-order | Collect installs before launch | Play pre-registration, App Store pre-order | practice | G A |
| Soft launch in test markets | Measure retention and revenue before global spend | Supercell, Voodoo | practice | G A |
| Rating prompt after a success moment | Ask once, after a positive event, without gating on the answer | Most top apps | store rule in Practices we use | G A |
| Paid acquisition with value bidding | Bid for users predicted to pay, not for installs | Industry standard | practice; spend needs approval | all |
| Creative testing at scale | Many ad variants, keep the winners | Top user-acquisition teams | practice | G A |
| Playable and interactive ads | Ad is a short taste of the product | Casual and puzzle games | practice | G |
| Search ads on store and web | Pay for keyword intent | Apple Search Ads, Google Ads | practice | all |
| Influencer and creator programme | Creators get codes, early access or a revenue share | Supercell, Fortnite Support-a-Creator | practice | G A W |
| Affiliate programme | Partners are paid per sale or per subscriber | Shopify, Amazon Associates, Notion | practice | S W |
| Partner and OEM bundles | Preinstall or bundle with another product | Device makers, Dropbox early deals | practice | A S |
| Cross-promotion in own products | One product advertises another to its users | Supercell, Playrix, Voodoo | practice | all |
| Web game portals | Instant web build on a portal | Poki, CrazyGames | practice | G |
| Chat-platform mini apps | Product runs inside a messenger | Telegram mini apps, Discord Activities, LINE | practice | G A |
| Instant apps and app clips | Try a slice without installing | Play Instant, App Clips | practice | A W |
| Brand and IP collaborations | A famous brand lends audience | Fortnite, Honor of Kings | practice; licence cost | G A W |
| Owned audience | Email, community and social channels the product controls | Supercell Discord, Duolingo social accounts | practice | all |
| Waitlist with position and sharing | Move up the list by inviting | Superhuman, Robinhood, Gmail invites | practice | A S |
| Student and community ambassadors | Local users recruit for perks | Notion, Figma, Canva | practice | S E |
| Public leaderboards and rankings | Rankings people share and link | Speedtest, Kaggle | practice | G E S |
| Offline QR and events | Physical posters and events link to the product | Events, retail | practice | G A W |

## Activation

| Mechanism | What it does | Who uses it | Evidence | Fits |
| --- | --- | --- | --- | --- |
| Define the activation event | Find the action that best predicts retention and drive users to it | Facebook (7 friends in 10 days), Twitter (30 follows), Slack (2,000 messages) | Round numbers picked from a range, not tipping points ([Mode](https://mode.com/blog/facebook-aha-moment-simpler-than-you-think/), [Mixpanel](https://mixpanel.com/blog/magic-numbers-are-an-illusion/)) | all |
| Time to first value | Shorten the path from open to a real result | Duolingo (lesson before signup), Canva | practice | all |
| Try before signup | Let people use the core loop before creating an account | Duolingo, Canva, most web tools | practice | A E W |
| First-session win | Guarantee an early success | Casual games, Duolingo | practice | G E A |
| Progressive profiling | Ask questions only as they become useful | HubSpot, Notion | practice | S W |
| Personalised onboarding quiz | Ask goal and level, then tailor the first path | Duolingo, Airtable, Notion | practice | all |
| Placement test | Skip content the user already knows | Duolingo, Khan Academy, Brilliant | practice | E |
| Goal setting and daily target | User picks a pace, which sets expectations and reminders | Duolingo daily goal | practice | E A |
| Onboarding checklist | Visible steps with progress | Notion, Slack, Stripe | practice | S |
| Empty-state templates and samples | Start from a filled example, not a blank page | Notion, Canva, Figma | practice | S W |
| Guided tour and tooltips | Point at the next step in context | Most SaaS | practice | S |
| Import from a competitor | One-step migration of data | Notion, Linear | practice | S |
| Single sign-on and social login | Remove password friction | Most consumer products | practice | all |
| Permission priming | Explain a permission before the system prompt | Most iOS apps | practice | A G |
| Notification opt-in after value | Ask for push permission after the first success | Duolingo, most habit apps | practice | A E G |
| Founder or coach welcome message | A human or AI-persona message in the first days | Superhuman, Duolingo owl | practice | A S |
| Lifecycle onboarding emails | A sequence keyed to what the user has and has not done | HubSpot, Slack | practice | S A W |
| Free trial | Full access for a period, then charge | Most subscription apps | Median trial-to-paid 25% (gaming) to 43.5% (travel) ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps)) | A S E |
| Longer trial | 17 to 32 days rather than under 4 | Subscription apps | Median trial-to-paid 42.5% vs 25.5% under 4 days (same report) | A S E |
| Reverse trial | Start on the paid plan, downgrade to free at the end | Airtable, Notion, Canva, Asana | Verna reports 10-40% relative conversion lift from freemium; no published per-company figures ([Verna](https://www.elenaverna.com/p/reverse-trials-examples)) | S A E |
| Trial with card up front | Collect payment method at trial start | Most subscription apps | About 50% of paid conversions happen on day 0 ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps)) | A S |
| Trial without card | No payment method until upgrade | B2B SaaS, some freemium | practice | S |
| Trial reminder before charge | Message before the first bill | App Store and Play rules, Duolingo | practice | A E |
| Opinionated defaults | Pre-set the choices most users want | Apple, Notion | practice | all |
| Human onboarding for large accounts | A call or concierge set-up for high-value users | Most B2B SaaS | practice | S |
| Sandbox or demo data | Explore a filled product without risk | Stripe test mode, Shopify dev stores | practice | S W |
| First-run tutorial as play | Teach mechanics through the first levels | Most casual games | practice | G |
| Newcomer quest line | A short set of tasks with rewards over the first week | Chinese top grossers, Genshin | practice | G E |
| Pre-launch waitlist to activation | Turn waitlist signups into day-one users with a scheduled message | Most launches | practice | all |

## Engagement and habit

| Mechanism | What it does | Who uses it | Evidence | Fits |
| --- | --- | --- | --- | --- |
| Daily streak | Count of consecutive active days | Duolingo, Snapchat, Wordle, Peloton | Over 10 million Duolingo daily users had a 7-day-plus streak in Dec 2022 ([10-K](https://www.sec.gov/Archives/edgar/data/1562088/000156208823000052/duol-20221231.htm)); Duolingo names streaks a main growth lever ([Lenny's](https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth)) | all |
| Streak freeze | Earned or bought protection for one missed day | Duolingo, Snapchat | Users with freeze access keep streaks longer (vendor data, [Trophy](https://trophy.so/blog/streaks-feature-gamification-examples)) | all |
| Weekend protection | Automatic streak shield for weekends | Duolingo Weekend Amulet | +4% return after a week, 5% fewer lost streaks ([Duolingo](https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals/)) | E A |
| Streak wager | Stake currency on keeping the streak | Duolingo | Duolingo reports significant day 1, 7 and 14 retention gains ([Duolingo](https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals/)) | E A G |
| Streak repair | Pay or watch to restore a lost streak | Duolingo, Snapchat | practice | E A G |
| Streak count as a shared goal | Friend streaks, family streaks | Duolingo Friends Streak, Snapchat | practice | E A |
| Lenient streak rules | Any small action counts as the day | Duolingo (any lesson counts) | Reported 40% more learners on 7-day streaks (secondary source, unverified) | E A |
| Daily check-in calendar | Escalating login reward over a month | Genshin, Honor of Kings | practice | G |
| Make-up check-in | Fill a missed day for a price or a task | Chinese top grossers | practice | G |
| Daily rewards and free chest | A daily free item that resets | Clash Royale, Brawl Stars | practice | G |
| Daily and weekly missions | Small goals with rewards | Nearly all live games | practice | G E A |
| Daily seeded challenge | Same puzzle for everyone each day | Wordle, Slay the Spire | practice | G E |
| Achievements and badges | Permanent marks for milestones | Steam, Xbox, Duolingo | practice | G E A |
| Experience points and levels | A visible number that rises with use | Duolingo XP, Khan Academy energy points | practice | E G A |
| Progress bar and completion | Show how close the next milestone is | LinkedIn profile strength, Duolingo path | practice | all |
| Weekly leagues | Promotion and demotion in small groups by weekly points | Duolingo, FarmVille 2 origin | Introduced by the growth team that quadrupled daily users in four years ([Lenny's](https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth)); per-league lift figures are third-party | E A G |
| Friends leaderboard | Rank against people you know | Candy Crush, Wordle, Strava | practice | all |
| Global and regional leaderboards | Public ranks by country or city | Strava segments, Honor of Kings districts | practice | G E A |
| Skill-based matchmaking | Match opponents of similar strength | Most competitive games | practice | G |
| Seasonal ranked ladder | Ranked ladder with soft reset each season | Brawl Stars, Diablo | practice | G |
| Personalised notification timing | Send when this user usually opens | Braze, OneSignal, Duolingo | Per-user timing gained 23% over sending immediately and 10% over time-zone sending in vendor data ([OneSignal](https://onesignal.com/blog/increase-open-rates-by-up-to-23-percent-with-intelligent-delivery/), [Braze](https://www.braze.com/resources/articles/send-time-optimization)); independent gains are smaller | all |
| Notification template bandit | Learn which message wording brings users back | Duolingo | +0.5% daily users, +2% new users from the algorithm ([Duolingo paper](https://research.duolingo.com/papers/yancey.kdd20.pdf)) | A E G |
| Streak-at-risk reminder | A message only when something is about to be lost | Duolingo, Snapchat | Duolingo added streak-saver reminders as a core growth step ([Lenny's](https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth)) | E A G |
| Event-triggered notifications | Message on an action (cart, friend joined) not on a schedule | Amazon, Duolingo | Action-based push opens 5.5x time-based (Braze vendor claim, [Braze](https://www.braze.com/resources/articles/send-time-optimization)) | all |
| Notification frequency cap | Limit messages per day and per week | Duolingo (two save messages a day, secondary source) | practice | all |
| Local reminders | On-device scheduled reminder | Duolingo, meditation apps | practice | A E G |
| Email digest | A weekly summary of activity or progress | Duolingo, GitHub, LinkedIn | practice | A S E |
| Home-screen widget | Streak or progress on the home screen | Duolingo, weather-style apps | practice | A E G |
| Live Activities and lock-screen state | Ongoing state on the lock screen | Sports and delivery apps | practice | A G |
| In-app inbox and mailbox | Gifts and messages waiting inside the product | Most live games | practice | G A |
| Recap and year in review | A personal summary that is also a share card | Spotify Wrapped, Duolingo Year in Review | practice | A E |
| Collections and albums | Sets to complete with rewards for a full set | Monopoly Go, Pokemon GO, Coin Master | practice | G A |
| Seasons | Time-boxed themes with new content and a reset | Fortnite, Duolingo seasonal events | practice | G A E |
| Limited-time events | Short events with their own rewards | Nearly all live games | All top-500 games run limited-time offers ([App Developer Magazine](https://appdevelopermagazine.com/2025-mobile-gaming-report/)) | G A |
| Race and team events | A short race against a handful of players | Monopoly Go, Royal Match | practice | G |
| Community goal meter | Everyone's actions fill one shared meter | Pokemon GO global challenges | practice | G A |
| Daily story or episode | New content every day | Narrative and AI-character apps | practice | G A E |
| Rotating modes and content | Modes that change each day or week | Brawl Stars, Clash Royale | practice | G |
| Mystery visitor or merchant | A rare, time-limited offer or quest | Animal Crossing, Clash of Clans | practice | G |
| Timed chests or refill timers | A reward that fills over hours | Clash Royale | practice | G |
| Energy or lives | A cap on plays that refills over time | Candy Crush, Duolingo hearts | practice; see Practices we use | G E A |
| Spaced repetition | Resurface items just before forgetting | Anki, Duolingo, Brilliant | practice | E |
| Adaptive difficulty | Tune level to the user's performance | Duolingo, Khan Academy, casual games | practice | E G |
| Mastery levels per topic | Legendary or mastered levels for repeated practice | Duolingo, Khan Academy | Khan: 30+ minutes a week linked to about 20% greater learning gains; 9% of students reached it ([Khan Academy](https://blog.khanacademy.org/khan-academy-efficacy-results-november-2024/)) | E |
| Learning path and roadmap | A visible sequence of next steps | Duolingo path, Brilliant courses | practice | E |
| Habit anchors and scheduled sessions | User picks a time and gets a calendar slot | Headspace, Duolingo | practice | A E |
| Quests with friends | A time-boxed shared task | Duolingo Friends Quest | practice | E A |
| Rested bonus | Extra reward after time away, capped | World of Warcraft | practice | G |
| Idle income while away | Progress accrues while the app is closed, capped | Idle games | practice | G |
| Profile customisation | Avatars, frames and titles that show status | Honor of Kings, Steam | practice | G A |
| Collections of user content | Boards, playlists, libraries a user builds | Pinterest, Spotify | practice | A W |
| Saved progress and history | Long history raises switching cost | Strava, Spotify, Notion | practice | A S |
| Personalised feed | Ranked content per user | TikTok, Netflix | practice | A W |
| Curiosity teaser | Show what comes tomorrow | Genshin previews, Duolingo | practice | G E A |
| Secrets and easter eggs | Hidden codes and discoveries | Balatro, Hollow Knight | practice | G A |
| Quiet-hours and preferences centre | User controls which messages arrive and when | Most apps | practice; protects the channel ([Lenny's](https://www.lennysnewsletter.com/p/the-secret-to-duolingos-growth)) | all |

## Monetisation

| Mechanism | What it does | Who uses it | Evidence | Fits |
| --- | --- | --- | --- | --- |
| Freemium | Free core, paid upgrade | Spotify, Dropbox, Slack, Notion | Median download-to-paid 2.1% at day 35 ([RevenueCat 2026](https://www.revenuecat.com/blog/growth/hard-paywall-vs-freemium)) | A S E |
| Hard paywall | No use before paying | Fitness and utility apps | 10.7% vs 2.1% download-to-paid; revenue per install $2.32 vs $0.27 at day 14 ([RevenueCat](https://www.revenuecat.com/blog/growth/hard-paywall-vs-freemium)); Adapty measures the reverse on paywall-view conversion, so test | A E |
| Soft paywall at value moments | Show the offer when the user hits a limit or a premium feature | Duolingo, Spotify, Medium | Freemium wins where free users drive word of mouth ([RevenueCat](https://www.revenuecat.com/blog/growth/hard-paywall-vs-freemium)) | A E S |
| Metered free usage | N free articles, projects or items a month | NYT, Medium, Notion | practice | W S |
| Feature gating | Advanced features only on paid | Figma, Slack, Canva | practice | S A |
| Usage limits and quotas | Free tier with caps on seats, storage or history | Slack (history), Dropbox (storage) | practice | S A |
| Good-better-best tiers | Three or four plans with a middle default | Spotify, Duolingo (Super, Max), most SaaS | practice | all |
| Anchor plan | Show a higher tier to make the target plan look moderate | Most SaaS pricing pages | practice | S A W |
| Per-seat pricing | Price grows with team size | Slack, Notion, Figma | practice | S |
| Usage-based pricing | Charge by consumption | AWS, Twilio, Snowflake, OpenAI | About 60% of SaaS companies used some form in 2023 ([OpenView](https://openviewpartners.com/blog/state-of-usage-based-pricing/)) | S |
| Hybrid platform fee plus usage | Base subscription with included usage and overage | HubSpot, Autodesk | 46% of SaaS used hybrid models ([OpenView](https://openviewpartners.com/blog/state-of-usage-based-pricing/)) | S |
| Credits and token packs | Prepaid units for compute or AI | AI products, Midjourney | practice | S A |
| Pay-as-you-go top-up | Buy more when the balance runs out | Cloud platforms, telecoms | practice | S A |
| Auto-recharge | Top up automatically below a threshold | Cloud platforms, ride apps | practice | S A |
| Transaction fee or take rate | A cut of each sale or payment | Stripe, Etsy, Airbnb, app stores | practice | W S |
| Marketplace listing and promoted placement | Sellers pay for visibility | Etsy Ads, Amazon Sponsored | practice | W |
| Ads in a free tier | Ad-funded free plan | Spotify Free, casual games | practice | A G W |
| Rewarded ads | Opt-in ad for a reward or continue | Casual games, Coin Master | practice; legacy games only ([games.md](games.md#access-and-economy)) | G A |
| Interstitial and banner ads | Ads at natural breaks | Hyper-casual and casual games | practice; in games only legacy titles carry ads, through AdMob alone ([games.md](games.md#access-and-economy)) | G A W |
| Remove-ads purchase | One payment removes ads | Casual games and utilities | practice | G A |
| One-time full unlock | Free trial then a single purchase | Premium-to-free games, utilities | practice | G A |
| Lifetime plan | One payment, permanent access | Some utilities | Lowest revenue growth among plan types in RevenueCat data ([RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps)) | A S |
| Monthly plan | Low commitment, higher churn | All | Most churn at first renewal: 15-40% monthly ([RevenueCat](https://www.revenuecat.com/blog/growth/average-subscription-renewal-rates-by-app-category)) | A S E |
| Annual plan | Discount for a year up front | Duolingo, Notion, most apps | Monthly-equivalent framing lifted trial starts 30% in one LatAm test ([RevenueCat](https://www.revenuecat.com/state-of-subscription-apps)) | A S E |
| Weekly plan | Short billing period, high frequency | Utility, game and AI apps | Weekly plans renew worst in year one ([RevenueCat](https://www.revenuecat.com/blog/growth/average-subscription-renewal-rates-by-app-category)) | A G |
| Annual commitment paid monthly | 12-month term billed monthly | Apple monthly-with-commitment, Play installments | Worth testing where annual take is low ([RevenueCat](https://www.revenuecat.com/blog/engineering/monthly-subscription-12-month-commitment)) | A S |
| Family plan | Shared plan for a household | Spotify (6 accounts), Duolingo (5), Apple One | Duolingo: family about 20% of subscribers and retains longer (Q2 2024, [8-K](https://www.sec.gov/Archives/edgar/data/1562088/000156208824000203/q2fy24duolingo06-30x24shar.htm)) | A E |
| Duo and student plans | Discounted plans for a segment | Spotify (Duo, Student) | US prices $6.99 student to $21.99 family ([NerdWallet](https://www.nerdwallet.com/finance/learn/how-much-does-spotify-cost)) | A E |
| Team and enterprise plans | Admin, security and support at a higher price | Slack, Notion, Duolingo for Schools | practice | S E |
| Education and nonprofit discount | Reduced price for a verified segment | GitHub, Canva, Notion | practice | S E |
| Bundle across products | One subscription for several products | Apple One, Google One, Microsoft 365 | practice | A S |
| Add-ons and extra seats | Buy more of one thing | Slack, Zoom | practice | S |
| Premium AI or top-tier feature | A top plan built on the costliest feature | Duolingo Max | Duolingo revenue per subscriber up 7% with Max and family mix in Q3 2025 ([Duolingo](https://investors.duolingo.com/static-files/c9bf5861-b19d-4396-b060-c0dbeefd34f5)) | A E S |
| Price increase with grandfathering | Raise price, keep old price for current subscribers for a period | Spotify, Netflix | practice | A S |
| Price localisation | Prices set per country by purchasing power | App stores, Spotify, Netflix | Median revenue per install at day 60 about 5x higher in North America than India and SEA ([RevenueCat](https://www.revenuecat.com/state-of-subscription-apps)) | all |
| Paywall experiments | A/B test copy, price, plan order and timing | RevenueCat, Superwall, Adapty users | Test by region; aggregate results hide regional differences ([RevenueCat](https://www.revenuecat.com/state-of-subscription-apps)) | A E |
| Higher price points | Test upward before discounting | Subscription apps | Higher-priced apps converted download-to-trial about 2x (8.9% vs 4.4%) ([RevenueCat](https://www.revenuecat.com/state-of-subscription-apps)) | A S |
| Introductory price | First period cheaper | Apple and Google intro offers | practice | A E |
| Promo and offer codes | Codes for creators, partners and campaigns | Apple offer codes, Play promo codes | practice | A G |
| Currency pack ladder | Six or more price points; bonus grows with size | Nearly every F2P game | practice | G |
| Dual currency | Soft earned currency and hard premium currency | Nearly all F2P games | Premium currency and bundles in at least 90% of top-500 games ([App Developer Magazine](https://appdevelopermagazine.com/2025-mobile-gaming-report/)) | G A |
| First-purchase bonus | Double value on the first purchase | Clash Royale, Honor of Kings | practice | G A |
| Starter pack | Discounted bundle for new players, time-limited | Clash of Clans, Royal Match | Typically 5-10x the standard value, 24-72 hours ([Unity](https://unity.com/resources/in-app-purchases-guide)); day 0 was about 47% of payers in one study ([ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1875952126001175)) | G A |
| Payer conversion targets | Benchmarks for share of players who pay | F2P games | 2-5% healthy, top starters 6-8% ([Unity](https://unity.com/resources/in-app-purchases-guide)); Playtika 4.3% in Q3 2025 ([Playtika](https://investors.playtika.com/news-releases/news-release-details/playtika-holding-corp-reports-q3-2025-financial-results/)) | G |
| Triggered offers | Offer on level-up, low currency, return or a stuck moment | Candy Crush, Coin Master | practice | G A |
| Personalised offers and prices | Price and contents by segment | Top grossers with offer engines | practice | G A W |
| Rescue and out-of-currency offer | Offer at the moment the user cannot continue | Social casino, Candy Crush | practice | G |
| Milestone offers | Offer when a level or feature unlocks | RPGs, idle games | practice | G A |
| Daily deals and free daily item | A rotating discount plus a free item | Clash Royale, Brawl Stars | practice | G W |
| Flash and holiday sales | Real time-limited discounts | Steam, Black Friday, store sale events | practice | all |
| Bundles and bundle builder | Themed value bundles, user-assembled | All top grossers | practice | G W |
| Chain offers | Stepped chain of free and paid rewards | Monopoly Go, Royal Match | practice | G |
| Piggy bank | A bank fills as you play and is paid to open | Candy Crush, Slotomania | In 70% of top-100 social casino games ([Maf.ad](https://maf.ad/en/blog/piggy-banks-in-games/)) | G |
| Growth fund | Pay once, receive rewards at level milestones | Asian RPGs, idle games | practice | G |
| Monthly card | Pay once, receive a daily reward for 30 days | Genshin, Honor of Kings | practice | G |
| VIP tiers by spend | Status and perks rise with lifetime spend | Asian RPGs, social casino | practice; see Practices we use | G A |
| Accumulated and daily first top-up rewards | Rewards at spend thresholds or for the day's first purchase | Chinese and Taiwan top grossers | practice | G |
| Season or battle pass | Free and paid reward tracks over a season | Fortnite, Brawl Stars, Clash Royale | In about 60% of top-grossing mobile games ([GameRefinery](https://www.pocketgamer.biz/gamerefinery-battle-pass-implementation-in-top-grossing-mobile-games/)); 11% of revenue in Mob Control ([AppMagic](https://gamedevreports.substack.com/p/appmagic-mobile-games-monetization)) | G A |
| Premium pass tier | Pass plus level skips and cosmetics | Fortnite, PUBG Mobile | practice | G |
| Rotating cosmetic shop | Daily or weekly featured items | Fortnite, Valorant | practice | G |
| Tiered and upgradable cosmetics | Common to legendary skins that evolve | Honor of Kings, Valorant | practice | G |
| Trial cosmetics | Wear an item for 1-3 days, then buy | Honor of Kings | practice | G |
| Paid random draws and gacha | Purchased random rewards, optionally with pity | Genshin, Honkai Star Rail | Belgium blocks it; odds disclosure where required (Practices we use) | G |
| Lucky wheel and mystery box | Paid or free random reward | Social casino, Honor of Kings | practice | G A |
| Direct-buy alternative to random | Buy the featured item outright at a higher price | Many gacha titles | practice | G |
| Paid rerolls and enhancement | Pay to re-roll or upgrade an item | Diablo Immortal, Path of Exile | practice | G |
| Time skips | Pay to finish a timer | Clash of Clans, idle games | practice | G |
| Extra capacity | Slots, queues, storage | Clash of Clans, Dropbox | practice | G A S |
| Boosters and continues | Power-ups and extra moves to continue | Candy Crush, Royal Match | practice | G |
| Tournament and event entry | Currency or ticket for entry | Card games, esports | practice | G |
| Paid emotes, stickers, profile items | Expression items | Clash Royale, LINE | practice | G A |
| Buy a gift for a friend | Item or currency sent to another user | Fortnite, Honor of Kings, Steam | practice | G A |
| Creator codes and revenue share | A creator earns a share when fans use their code | Fortnite, Supercell | practice | G A |
| Merchandise and physical goods | Sell items tied to the brand | Supercell, Duolingo plush | practice | G A W |
| Premium expansions and DLC | Paid content packs | Narrative games, Steam | practice | G |
| Credits for AI generation | Buy generation runs for images, voice or text | AI apps, AI platform customers | practice | A S |
| Subscription with included currency | Recurring payout of in-app currency | Asian game subscriptions, Apple Arcade | practice | G A |
| Web shop and web checkout | Sell the same goods on your own checkout | Supercell Store, Playtika, Huuuge | Mobile game D2C hit $17 billion in 2025, about 15% of IAP ([Appcharge via PocketGamer.biz](https://www.pocketgamer.biz/report-mobile-game-d2c-revenues-reach-17bn-as-publishers-push-beyond-app-stores/)); Playtika D2C about 39% of revenue ([PocketGamer.biz](https://www.pocketgamer.biz/direct-to-consumer-sales-hit-record-levels-again-in-q4/)); vendor figures, US court rulings under appeal | G A |
| Web bonus for buying outside the store | Extra value for web purchases | Supercell Store, social casino | practice; vendors claim 10-16% revenue lift (Xsolla) | G A |
| Payment-method localisation | Local wallets, carrier billing, bank transfer | Apple Pay, GCash, Pix, Alipay users | practice | all |
| Buy now, pay later and instalments | Split payment | Klarna, Affirm, Apple monthly plans | practice | W A |
| Loyalty points | Earn points on spend, redeem for rewards | Starbucks, airlines, Amazon | Starbucks Rewards members drove nearly 60% of US company-operated revenue in FY2025 ([Starbucks](https://about.starbucks.com/press/2026/starbucks-reimagines-its-rewards-program-with-new-levels-and-exclusive-perks/)) | W A |
| Loyalty status tiers | Status levels with better earning and perks | Starbucks (Green, Gold, Reserve), airlines | Starbucks reintroduced tiers in March 2026 after years without ([Starbucks](https://about.starbucks.com/press/2026/starbucks-reimagines-its-rewards-program-with-new-levels-and-exclusive-perks/)) | W A |
| Paid membership | Annual fee for shipping or perks | Amazon Prime, Costco | CIRP: 91% of first-year Prime members renew, 96% in year three ([FierceRetail](https://www.fierceretail.com/operations/amazon-prime-retention-rate-hits-96)); outside estimates | W A |
| Cashback and credits | Return a share of spend as balance | Revolut, Shopify Balance | practice | W A |
| Subscribe-and-save | Repeat delivery at a discount | Amazon, Dollar Shave Club | practice | W |
| Upsell and cross-sell | Suggest a larger or related purchase at checkout | Amazon, Booking.com | practice | W S |
| Decoy and anchor pricing | Add a plan or price that makes the target look better | Economist, most pricing pages | practice | S A W |
| Scarcity and social proof on price | Real stock, real recent-buyer counts | Booking.com, Amazon | Descriptive norms raised hotel towel reuse 26% ([Goldstein, Cialdini, Griskevicius 2008](https://www.researchgate.net/publication/23547467_A_Room_With_a_Viewpoint_Using_Social_Norms_to_Motivate_Environmental_Conservation_in_Hotels)); UK CMA required accurate availability claims ([CMS](https://cms.law/en/gbr/legal-updates/CMA-secures-commitments-from-holiday-booking-sites-on-sales-practices)); true claims are a limit in Practices we use | W G A |
| Abandoned-cart and checkout recovery | Remind and offer after an unfinished purchase | Amazon, Shopify stores | practice | W |
| Payment retry and dunning | Retry failed cards and message the user | Stripe Smart Retries, Recurly | Google Play tunes grace periods per subscriber with ML ([Google](https://android-developers.googleblog.com/2026/09/unlocking-Google-play-subscription-growth.html)) | A S |
| Invoice and quote based sales | Sales-led contracts for large customers | Most B2B SaaS | practice | S |
| Free credits for early customers | Grant credits to get first usage | AWS Activate, startup programmes | practice | S |

## Retention and win-back

| Mechanism | What it does | Who uses it | Evidence | Fits |
| --- | --- | --- | --- | --- |
| Cancellation reason survey | Ask why, then route to the matching offer | Most subscription businesses | Well-built cancel flows save 15-30% (vendor benchmarks, [Userpilot](https://userpilot.com/blog/cancellation-flow-examples/)) | A S E |
| Pause instead of cancel | Offer a pause of 1-3 months | Google Play pause, Recurly customers, Codecademy | About 25% of would-be cancellers pause ([Recurly](https://recurly.com/blog/the-pause-button-your-best-retention-tool/)); 10-30% accept ([Chargebee](https://www.chargebee.com/blog/power-of-pause-subscription-retention-strategy/)); count only those who return | A S E |
| Downgrade offer | Move to a cheaper plan instead of leaving | Spotify, Duolingo | practice | A S E |
| Discount to stay | Time-limited reduction for price-driven cancellers | Most subscription businesses | Discount offers save 25-35% of price-driven cancels (vendor benchmark, [Userpilot](https://userpilot.com/blog/cancellation-flow-examples/)) | A S E |
| Retention message on the system cancel sheet | Offer shown by the store when the user cancels | Apple Retention Messaging API | practice | A |
| Billing grace and account hold | Keep access while the payment is fixed | Apple 28-day grace, Google Play hold | practice | A S |
| Fix-payment in-app message | Prompt the user to update the card | StoreKit billing messages, Play in-app messaging | practice | A |
| Win-back offers | Offer to past subscribers | Apple win-back offers (iOS 18+), Play offers | No platform-published rates; Apple caps five live per storefront per subscription ([Apple](https://developer.apple.com/news/?id=8utnewzk)) | A E |
| Lapse email sequence | Emails at days 7, 30, 60 and 90 with an offer per cancel reason | Most subscription businesses | 10-15% reactivation at one-fifth of new-customer cost (vendor claim, [Subscription Index](https://www.subscriptionindex.com/guides/win-back-campaigns)) | A S W |
| Returning-player welcome back | Rewards and catch-up on return | Most live games | practice | G |
| Tiered return rewards | Reward size grows with days away | Most live games | practice | G |
| Lapse-triggered push | One message when a habit breaks | Duolingo | practice | A E G |
| Churn prediction | Score users at risk and intervene | Top live-ops teams, SaaS customer success | practice | all |
| Customer success check-ins | A human touch on at-risk accounts | B2B SaaS | practice | S |
| Annual plan as retention | Move monthly payers to annual | Most subscription apps | Annual plans retain 36% for low-priced apps at year one vs 23% for high-priced ([RevenueCat](https://www.revenuecat.com/blog/growth/average-subscription-renewal-rates-by-app-category)) | A S E |
| Upgrade to annual prompt | Offer a discount at a satisfaction moment | Most subscription apps | practice | A S E |
| Renewal reminder | Notify before renewal | Required by stores in some markets | practice | A S E |
| Resubscribe button | One tap to return | Play Store | practice | A |
| Data export and archive on cancel | Keep data available for a period | Notion, Dropbox | practice | S A |
| Benefits that stay after a lapse | Cosmetics or history remain | Some games | practice | G |
| Switching cost through data | Users hold history, content and integrations | Notion, Strava, Spotify | practice | A S |
| Integrations and connected accounts | More connected tools, higher retention | Slack, Zapier | practice | S |
| Loyalty tiers with status kept | Status carries across periods | Airlines, Starbucks Gold (no expiry) | [Starbucks](https://about.starbucks.com/press/2026/starbucks-reimagines-its-rewards-program-with-new-levels-and-exclusive-perks/) | W A |
| Post-purchase onboarding | Help the buyer use what was bought | Shopify stores, Peloton | practice | W A |
| Community as retention | Forums, groups and events that bind users | Peloton, Strava clubs, Discord | practice | A S W |
| Milestone celebration | Celebrate anniversaries and totals | Duolingo, Spotify, Strava | practice | A E |
| Progress-based renewal proof | Show what the user achieved before the renewal | Strava, Duolingo | practice | A E |
| Involuntary churn recovery | Handle expired cards and failed payments | Stripe, Apple, Google | practice | A S |

## Social

| Mechanism | What it does | Who uses it | Evidence | Fits |
| --- | --- | --- | --- | --- |
| Friends list | Add and see friends | Nearly all social and game products | practice | all |
| Follow and like | One-way follows and reactions | Strava, Duolingo, Honor of Kings | practice | A E G |
| Friends from recent players | Suggest people you already met | Clash Royale, Honor of Kings | practice | G |
| Friend activity feed | See what friends did | Strava, Duolingo | practice | A E |
| Kudos and encouragement | Cheer a friend's activity | Strava, Duolingo | practice | A E |
| Nudge a friend | Send a reminder to a friend | Duolingo Friends Streak, Snapchat | practice | A E |
| Teams and clubs | Persistent groups with chat | Clash of Clans, Strava clubs, Discord | practice | G A |
| Team league or war | Groups compete against groups | Clash of Clans Clan War Leagues | practice | G |
| Donations and help requests | Group members share items | Clash Royale | practice | G |
| Co-op modes | Play together against the environment | Brawl Stars, raids | practice | G |
| Shared quests | A goal you complete with friends | Duolingo Friends Quest | practice | E A |
| Class and group management | A teacher or lead sets tasks and sees progress | Google Classroom, Khan Academy, Duolingo for Schools | practice | E S |
| Mentorship | An experienced user teaches a newcomer, both earn | Chinese MMOs, Honor of Kings | practice | G E |
| Peer review and answers | Users help each other | Stack Overflow, Brilliant community | practice | E W |
| Friend bonds | Relationship levels visible on both profiles | Honor of Kings | practice | G |
| Play-with-friends bonus | Extra reward when a friend is in the party | Honor of Kings, PUBG Mobile | practice | G |
| Party finder | Find people to play with | Destiny, Honor of Kings | practice | G |
| Spectate and replay | Watch friends and top players | Clash Royale TV | practice | G |
| Clip and highlight sharing | Share the moment, with a web viewer | Clash Royale, Twitch, Medal | practice | G A |
| Emotes and preset phrases | Safe expression | Clash Royale | practice | G |
| Presence and activity status | Show who is online | Discord, Steam | practice | A G S |
| Comments and discussion | Threads on content | YouTube, Reddit, Medium | practice | W A |
| Public profiles with badges and titles | Visible status | Steam, Duolingo, GitHub | practice | all |
| Visit a friend's space | See a friend's home, farm or city | Hay Day, Animal Crossing | practice | G |
| Seasonal gifting and red packets | Send small gifts on festivals | WeChat, Honor of Kings | practice | G A |
| Two-sided reviews | Both sides rate, revealed together | Airbnb | Simultaneous reveal removes retaliation ([Fradkin, Grewal, Holtz](https://andreyfradkin.com/assets/reviews_paper.pdf)) | W |
| Seller and buyer ratings | Reputation that carries across deals | Etsy, eBay, Uber | practice | W |
| Verified badges and identity checks | Trust marks | Airbnb, Uber, LinkedIn | practice | W A |
| Escrow and buyer protection | Hold money until delivery | Airbnb, eBay, Vinted | practice | W |
| Moderation and safety tools | Block, mute, report | All social products | store and law requirement in many markets | all |
| Behaviour score | Reputation from conduct, tied to matchmaking or perks | Honor of Kings, Overwatch | practice | G |
| Shared documents and real-time collaboration | Multiple users in one file | Figma, Notion, Google Docs | practice | S |
| Comment and share-out links | Guests can view or comment without an account | Figma, Notion, Loom | practice | S |
| Community goals and events | Events that many users join | Pokemon GO, Duolingo | practice | G A E |
| Creator tools and user-made content | Users publish levels, decks, courses or templates | Mario Maker, Roblox, Canva | practice | G A W |
| Marketplace for user content | Creators sell to other users | Roblox, Canva, Etsy | practice | G W |
| Private rooms and invitations | Play or work in a private space with friends | Board-game apps, Discord | practice | G A |
| Pass-and-play | Several players on one device | Board-game apps | practice | G |
| Nearby play | Same-room play by Wi-Fi, Bluetooth or QR | Local multiplayer games | practice | G |

## What the evidence says not to over-read

- **Engagement is not learning.** Gamified training raised engagement 60% but
  knowledge retention 9% in one study, and users can chase a streak instead of
  the skill ([Decision Lab](https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification));
  education products judge by learning gain as well as return
  ([Khan Academy's efficacy studies](https://blog.khanacademy.org/khan-academy-efficacy-results-november-2024/),
  [Khan Academy Kids trial](https://blog.khanacademy.org/khan-academy-kids-improves-pre-literacy-skills-in-preschoolers-research-confirms/)).
- **Vendor figures are marketing until replicated.** Send-time, cancel-flow and
  web-shop lifts come from vendors that sell the tool; test against a holdout.
- **Referral programmes capture existing word of mouth.** A third of Dropbox
  users came by referral before the programme, and companies rarely publish
  cost per referred customer ([Referral Rock](https://referralrock.com/blog/dropbox-referral-program/)).
- **Mix and market change the answer.** Hard paywalls beat freemium on revenue
  per install in RevenueCat's data and lose to soft paywalls on paywall-view
  conversion in Adapty's; the choice depends on whether free users bring
  others.
- **Compliance is per market.** Web checkout and store billing rules are moving
  (US court orders under appeal); follow the market's current rule
  ([commercial.md](commercial.md#legal-surface)).
