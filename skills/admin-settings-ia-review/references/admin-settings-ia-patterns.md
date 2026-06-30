# Admin Settings IA Patterns

## Admin settings state machine

```text
admin_intent -> setting_discovered -> permission_checked -> change_previewed -> change_confirmed -> audit_logged -> effect_verified
       |                 |                  |                  |                 |
       v                 v                  v                  v                 v
 no_access         search_or_support   blocked_by_policy   confirmation_cancelled   rollback_needed
```

## Rule IDs

- `admin-ia-1` — Define actor, scope, and risk before placing a setting.
- `admin-ia-2` — Separate personal settings, workspace settings, billing, security, data, integrations, and support access.
- `admin-ia-3` — Settings IA should match user jobs, not backend table names.
- `admin-ia-4` — Dangerous actions need consequence preview, explicit confirmation, permission gate, and audit log.
- `admin-ia-5` — Defaults must be visible, explainable, and safe for the product segment.
- `admin-ia-6` — Role changes, ownership transfer, SSO, deletion, export, billing, and API key changes require stronger proof and recovery.
- `admin-ia-7` — Policy inheritance should show source, override status, and conflict resolution.
- `admin-ia-8` — Empty, disabled, locked, inherited, and insufficient-permission states need copy and next action.
- `admin-ia-9` — Search and deep links should route to settings without bypassing permission checks.
- `admin-ia-10` — Support should see configuration history without becoming the settings owner.

## Decision table

| Setting type | Placement | Permission | Confirmation | Audit |
| --- | --- | --- | --- | --- |
| Profile preference | Personal settings | User | Usually none | Low |
| Team invite/member role | Members/admin | Workspace admin | For owner/admin roles | Required |
| Billing plan/payment method | Billing | Billing admin/owner | Required | Required |
| SSO/SCIM/security policy | Security | Security admin/owner | Required and tested | Required |
| API keys/webhooks | Developer/integrations | Admin/developer role | Reveal/rotate confirmation | Required |
| Data export/deletion | Data/privacy | Owner/admin plus verification | Strong confirmation | Required |
| Marketplace publishing controls | Creator/admin | Marketplace owner | Required for public changes | Required |

## IA checklist

- Every setting has actor, scope, owner, default, risk, and audit event.
- Section labels match customer language.
- Locked or unavailable settings explain plan, role, policy, or dependency.
- Dangerous actions show consequence, affected objects, and recovery.
- Mobile and desktop layouts preserve discoverability and safe controls.

## Event schema

Track: `settings_section_viewed`, `setting_searched`, `setting_permission_denied`, `setting_change_previewed`, `setting_changed`, `dangerous_action_confirmed`, `dangerous_action_cancelled`, `settings_policy_inherited`, `setting_audit_log_viewed`, `settings_support_case_opened`.

Minimum properties: actor role, setting key, section, scope, old value class, new value class, permission result, confirmation type, audit ID, and recovery path.
