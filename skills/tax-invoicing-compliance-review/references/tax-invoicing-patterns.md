# Tax Invoicing Patterns

## Invoice lifecycle state machine

```text
checkout_started -> tax_context_collected -> tax_calculated -> payment_completed -> receipt_or_invoice_issued -> refund_or_adjustment -> document_archived
       |                    |                  |                 |
       v                    v                  v                 v
 missing_tax_data     tax_engine_error   payment_failed   invoice_correction_requested
```

## Rule IDs

- `tax-invoice-1` — Identify seller of record and tax collection responsibility before designing documents.
- `tax-invoice-2` — Separate consumer receipt, B2B invoice, tax invoice, credit note, app-store receipt, and marketplace seller statement.
- `tax-invoice-3` — Capture required billing data before document issuance where needed: legal name, address, tax ID, currency, jurisdiction, buyer type.
- `tax-invoice-4` — Tax calculation, invoice generation, payment capture, ledger posting, and entitlement grants must reconcile.
- `tax-invoice-5` — App stores and merchant-of-record providers may own receipts and tax documents; product copy must route users correctly.
- `tax-invoice-6` — Refunds, partial refunds, credits, and chargebacks need document and ledger adjustments.
- `tax-invoice-7` — Invoice corrections need audit trail, requester authority, and finance approval.
- `tax-invoice-8` — Marketplace models need seller statements, fees, taxes, payouts, and buyer-facing receipt boundaries.
- `tax-invoice-9` — Support should have safe macros and cannot invent tax status.
- `tax-invoice-10` — Store retention, export, and deletion behavior must preserve legally required financial records.

## Decision table

| Scenario | Document | Owner | Common issue | Support response |
| --- | --- | --- | --- | --- |
| Consumer web purchase | Receipt or invoice by merchant | Product/finance | Missing billing info | Offer account invoice settings if allowed |
| B2B SaaS subscription | Invoice with tax metadata | Finance/billing system | Tax ID/address update | Route correction policy |
| Apple/Google IAP | Store receipt | App store | User asks app for invoice | Redirect to store receipt path |
| Marketplace purchase | Buyer receipt plus seller statement | Marketplace/finance | Who is seller of record | Explain model and document source |
| Refund/credit | Credit note/refund receipt | Finance/billing system | Partial refund mismatch | Reconcile ledger and document |
| Tax exemption/reverse charge | Specialized invoice treatment | Finance/legal | Missing proof | Request approved evidence path |

## Compliance checklist

- Seller of record and merchant of record are visible in internal docs.
- Checkout captures required invoice/tax fields without hurting consumer flow unnecessarily.
- Documents include stable IDs, dates, amounts, currency, taxes, seller/buyer details, and correction links where required.
- Refunds, disputes, credits, and plan changes update documents and ledger.
- Support macros route tax/legal questions to finance/legal owners.

## Event schema

Track: `tax_context_collected`, `tax_calculation_requested`, `tax_calculation_failed`, `invoice_issued`, `receipt_issued`, `invoice_correction_requested`, `invoice_correction_completed`, `credit_note_issued`, `tax_exemption_requested`, `financial_document_exported`.

Minimum properties: seller of record, merchant of record, buyer type, jurisdiction, currency, tax ID presence, document type, document ID, order ID, invoice ID, refund ID, finance owner, and correction reason.
