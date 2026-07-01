### API/AI Platform Credit & Quota Abuse Controls Review

**1. Identity, Trust Tiers & Anti-Multi-Accounting**
*   **Trust Tiers:** Implement a tiered progression.
    *   *Tier 0 (Unverified):* Email only. Strict hard rate limits. No access to expensive endpoints (e.g., heavy LLMs/GPU inference).
    *   *Tier 1 (Verified):* Validated phone (SMS) and credit card (auth hold). Free trial credits issued. Standard throttling applies.
    *   *Tier 2 (Production):* Historical spend threshold met. Eligible for elevated TPM/RPM (Tokens/Requests Per Minute).
*   **Multi-Accounting Controls:** Enforce strict velocity checks on IP ASN, device fingerprinting, and payment method hashing (PCI-compliant). Multiple Tier 1 accounts sharing a fingerprint or payment hash trigger automatic throttling and credit suspension pending manual review.

**2. Credit & Promo Controls**
*   **Free Trial & Promo Codes:** Trial credits have a strict time-to-live (TTL). Promo code redemption requires Tier 1 status. Promos are mathematically capped (e.g., max $50 credit) and restricted from covering the costs of premium/expensive endpoints to prevent immediate arbitrage.
*   **Real-time Ledger:** Token usage must decrement a real-time, atomic account ledger. If a request requires 10,000 tokens, the system pre-validates the balance, processes the request, and adjusts the ledger post-completion. 

**3. Throttling & Cost Guardrails**
*   **Throttling:** Implement multi-dimensional limits using a sliding window algorithm.
    *   *Standard endpoints:* RPM limits.
    *   *AI/Token endpoints:* TPM (Tokens Per Minute) and maximum tokens per request.
*   **Expensive Endpoints:** Require a positive prepaid balance (no trial credits allowed) and enforce strict per-request max token limits.
*   **Cost Guardrails:** Deploy automated circuit breakers. If an account exceeds 200% of its historical daily average spend in a single hour, the API auto-pauses, returning a `402 Payment Required` or `429 Too Many Requests` to prevent runaway loops and platform liability.

**4. Abuse Detection, Manual Review & Appeals**
*   **Automated Triggers:** Accounts are flagged for manual review if they exhibit bot-like RPM patterns, hit circuit breakers, or attempt to bypass geo-restrictions.
*   **Support Messaging:** All throttled or flagged API responses must include a `support_contact` field and a `flag_id` in the JSON payload (e.g., `{"error": "Account under review", "flag_id": "FLT-1234"}`).
*   **Appeals Process:** Developers use the `flag_id` in the support portal to appeal. Support staff can manually override trust tiers, reinstate credits, or permanently ban the identity hash. 

### Rubric-Critical Decision Matrix

| Control Area | Approved Mechanism | Trigger / Condition | Action |
| :--- | :--- | :--- | :--- |
| **Multi-Accounting** | Payment Hashing & Device Fingerprint | Duplicate hash detected on Tier 0/1 | Block promo activation; Throttle to Tier 0 |
| **Expensive Endpoints** | Endpoint Gating | Tier 0 / Free Trial Credits | HTTP 403 Forbidden (Upgrade Required) |
| **Runaway Costs** | Atomic Ledger & Circuit Breakers | Account spend > 2x daily avg / Insufficient balance | HTTP 429 / 402; Auto-pause key |
| **Throttling** | TPM / RPM Limits | Exceeding tier limits | HTTP 429 with `Retry-After` header |
| **Manual Review / Appeals** | Support ID in API Response | Bot-like velocity or cost spike | HTTP 403 with `support_ticket_id` |
