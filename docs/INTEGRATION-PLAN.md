# Stream Hub ↔ DanPlays Website: implementation plan

**Status: planned, not implemented in this initial website layout.**

## Architecture

- **Static frontend on Cloudflare Pages:** the public website at a free `*.pages.dev` address.
- **Server-only API on Cloudflare Pages Functions or Workers:** Twitch OAuth callbacks, role verification, catalogue reads, store purchases, contest administration and audit logs. Client secrets remain in server-side bindings, never browser JS.
- **D1 (or compatible managed database):** reward definitions, stock, purchase orders, user accounts, balance ledger and contests. Design transactions so they are atomic, retry safe, and do not double-charge.
- **Desktop Stream Hub:** runs an outbound authenticated HTTPS sync worker (no purchased static IP / inbound home router port). It can push reward edits and consume purchase/contest events while online. No need to push the GitHub repo for each changed reward.
- **Bot/Twitch:** the existing bot sends verified chat announcements while connected. A future separate cloud Twitch integration could announce when the PC is offline, if configured with suitable scopes and refresh-token handling.

## Identity and access

- Viewer logs in through Twitch OAuth using a server-side state check, secure HttpOnly/SameSite cookies and appropriate OAuth flow.
- Store views/redeems belong to the verified Twitch user ID, never a username submitted by the browser.
- Contest admin endpoints must verify the Twitch channel owner or *current* moderator privileges server-side on **each privileged operation** (with short-lived cache only where safe). Do not trust localStorage, client flags or a publicly visible dashboard route.
- Channel owner exclusively manages catalogue rewards, mod permissions and service credentials.
- Record moderator actions and contest outcomes for audit.

## DanCoins: one authoritative source

Decide and implement a **single** source of truth. Recommended: migrate balances to the cloud transaction ledger, then have chat-based earning/spending in Stream Hub use that same ledger. If retaining the desktop balance store temporarily, treat web redemptions as pending until safely reserved/settled — avoid overspending while desktop is offline.

- Invariant: every deduction has unique transaction ID; replaying a request cannot charge twice.
- Use server-side price and stock validation. Ignore prices or currency totals provided by the browser.
- On failed fulfillment, refund exactly once (idempotently).
- No viewer redemption or payout should be accepted before the ledger sync design is tested.
- Store redemptions, prices and availability in the database; GitHub should only contain website/source code.

## Store sync

1. Owner creates/edits/removes a reward in Stream Hub.
2. Hub sends authenticated, versioned reward updates to the API or syncs changes through a secure queue.
3. Database upserts the reward with version checks. Page reads the current catalogue.
4. Viewer buys with Twitch login. API validates user, limits/stock/price and DanCoins transaction.
5. API queues a purchase event with retry key. Hub pulls it when connected, logs and announces purchase in chat when able.
6. Hub acknowledges event; API preserves state for tracking and retry.

## Contest moderation

- Public pages: explanation/entry rules, optionally read-only active contests.
- Moderator-only pages: create/open/close giveaway, draw winners, open/settle prediction, view audit history.
- Entry should continue through existing Twitch bot chat commands as desired by the owner.
- Prediction balances and payouts use the same authoritative ledger as the store.

## Before enabling production purchases

- Configure Cloudflare, Twitch developer app and domain allow-listed redirect URLs.
- Implement OAuth state verification, CSRF defence, rate limiting, abuse controls, balance migration, transaction tests and safe role handling.
- Verify Twitch API rate limits and permission requirements.
- Test a purchase twice with the same request ID and prove only one deduction occurs.
- Simulate Stream Hub offline, repeated webhook/poll delivery, refunds and a moderator demotion.
- Remove placeholder reward examples and use real database catalogue only.
