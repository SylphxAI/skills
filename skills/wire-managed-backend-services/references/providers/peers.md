# Peer BaaS / managed backend classes

Use when the product is multi-cloud or customer chooses another host. Same job skill; different provider ref.

| Class | Examples | Auth | Notes |
|---|---|---|---|
| All-in-one app BaaS | Supabase, Appwrite, Firebase class | account | auth+db+storage bundles |
| Auth specialist | Clerk, Auth0 class | account | not full BaaS |
| Serverless cloud | AWS Amplify/Cognito stacks | account | high ops literacy |
| Edge KV/object | CF KV/R2, free tiers | account | combine with Workers |

Always document: which capability, which API, which quota, which proof.
