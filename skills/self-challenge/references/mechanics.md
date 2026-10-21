# Mechanics standard

Trigger: designing a product, a feature, an offer, or a return loop.

A design reaches for known growth and monetisation mechanisms, measures them,
and keeps only what earns its place. The catalogue of those mechanisms, with
the companies that use them and the evidence, is
[the mechanics catalogue](mechanics-catalogue.md). It is a
menu: this standard sets the hard lines and how the result is judged, and adds
no rule the other standards do not already hold.

## Hard lines

- No false urgency, hidden costs, hard-to-find cancellation, review gating, or
  paid ratings; law and stores ban them. Cancellation, export, and deletion stay
  easy ([growth.md](growth.md#hard-lines)).
- A real-money effect launches only with a budget held in the ledger and no
  overdraft, and a virtual gift only with a unit cap, so a giveaway cannot
  outrun its cap or inflate an economy
  ([growth.md](growth.md#campaigns-and-gifts)).
- A "was" price is never typed; the reference price is computed from prices
  actually charged in that market, and an ended offer never returns as a "last
  chance" ([growth.md](growth.md#campaigns-and-gifts),
  the accepted risks record).
- A gift or discount is a ledger record or grant with a deterministic id per
  person, so a retried claim or replayed webhook gives once, and given value
  stays given ([commercial.md](commercial.md),
  [growth.md](growth.md#campaigns-and-gifts)).
- A marketing message reaches only a person who has the consent that market
  requires, with its quiet hours; gifts and inbox items seen inside the product
  are not marketing messages ([growth.md](growth.md#campaigns-and-gifts)).
- A paid random mechanic discloses its odds where the market requires it, and
  is not sold where the market blocks it
  (the accepted risks record); a
  player never loses purchased value and ranked play stays skill-based
  ([games.md](games.md#hard-lines)).
- A mechanic that ties a capability to tenure, spend, or engagement is a normal
  business tool, but the free path to what a customer already has stays open:
  free limits fall only for new accounts
  ([commercial.md](commercial.md#free-stays-free)).

## The menu

When designing an acquisition, activation, retention, progression, or monetisation loop, review the relevant sections of the [catalogue](mechanics-catalogue.md), pick what fits, skip what does not, and invent beyond it. Record the chosen mechanics, any material alternatives considered, and what you invented in the design doc (no skip-bookkeeping ceremony is needed for unrelated UI or internal features). State the target metrics first (retention, conversion, revenue per user, payback) and judge the design by them.

The catalogue carries the evidence column and the `Fits` key; a `practice` entry
is a hypothesis to test, and a published lift from another company sizes the
upside without predicting ours. Limits stay where they live: "Practices we use"
in the accepted risks record, each
market's law and store rules through [commercial.md](commercial.md#legal-surface)
and [risk.md](risk.md), and game-only mechanics in the game catalogue named
there.

## How it is judged

By the stated target metrics after launch, against a holdout where a real
decision hangs on the result: incremental retention, conversion, and revenue
net of refunds and the campaign's cost, never by which catalogue entries the
design contains. A result below the minimum sample counts as no evidence. A
mechanic that worsens payer retention, revenue or support complaints is
reverted, and nothing a player is used to is taken away without being measured
and offset first.
