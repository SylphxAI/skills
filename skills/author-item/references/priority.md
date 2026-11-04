# Priority and scheduling standard

Trigger: ranking work items, deciding whether an incoming issue pre-empts in-flight work, or sizing support and retention budgets.

## The measure: value per unit of cost

Order ready work by **Cost of Delay divided by Duration ($\text{CD3} = \text{Cost of Delay} / \text{Duration}$)** ([Reinertsen, *The Principles of Product Development Flow*](https://www.worldcat.org/title/276340524)):
- **Cost of Delay (per week):** The expected weekly net revenue, retention contribution, or verified cost saving unlocked by completing the outcome—or the expected weekly loss prevented.
- **Duration:** The realistic time required to deliver and verify the outcome at its real surface.
- **Dependency inheritance:** A blocker that prevents a higher-scoring item from shipping inherits the blocked item's Cost of Delay.
- **Finish in-flight work within the same band:** Switching away from an item that is nearly verified wastes context and delays value realization; pre-empt in-flight work only for a genuine interrupt below.

## The size of an impact

Ground Cost of Delay in measured cohorts, funnel conversion, or infrastructure spend rather than subjective urgency labels:
- **Direct revenue and conversion:** Checkout, onboarding, paywall, and core loop improvements on active or launching products carry immediate Cost of Delay.
- **Engine and platform leverage:** Shared capabilities that unblock multiple downstream products sum the Cost of Delay of the products waiting on them.
- **Pre-launch vs. live:** For an unlaunched product with zero users, only work that reaches the first playable/useful paid loop carries immediate value; defer post-launch polish and discretionary hardening.

## Interrupts

Only a verified **active critical incident** pre-empts in-flight work across the team:
1. **Checkout or payment outage:** Customers cannot pay, or paid orders fail to grant entitlements.
2. **Core-journey outage on a live product:** Active users cannot sign in, launch, or use the primary product loop.
3. **Active data loss, corruption, or security exploit:** Customer data, account integrity, or real money is actively being lost or compromised.
4. **Red default branch or blocked merge/release queue:** The delivery pipeline itself is wedged, blocking all changes from shipping.
5. **Active storefront takedown or enforcement deadline:** An app store, payment processor, or regulator has issued a live removal or an immediate statutory deadline.

**What is NOT an interrupt:**
- Unverified user rumours, single-user complaints (which follow normal support pacing), speculative compliance or third-party ToS hypotheses (`../../self-challenge/references/risk.md`), or cosmetic regressions on non-core screens. Schedule non-emergency legal or regulatory filings by their actual statutory deadline.

## Support and compensation

Customer support and retention care serve long-term cohort net contribution (`../../customer-support/SKILL.md`, `../../ambassador/SKILL.md`):
- **Never stop taking money:** Keep checkout open and record every paid order; if a grant path is temporarily degraded, reconcile and deliver the owed entitlements idempotently as soon as it recovers (`../../self-challenge/references/commercial.md#always-take-the-money`).
- **Pre-approved care budgets:** Fulfill verified missing purchases immediately, and use pre-approved ambassador/support retention budgets to delight frustrated users without inventing per-case approval bottlenecks (`../../game-economy/references/offers-gifts-and-experiments.md#give-attention-repair-loss-and-budget-optional-care`).
