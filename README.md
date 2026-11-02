# DanPlays Website

The public website for **danplays_tv**: a branded viewer reward store and a future moderator-only contests area.

> **Current state: design foundation / preview only.** This repository currently provides responsive static pages and interaction previews. Twitch sign-in, DanCoins balances, actual purchases, contest administration, the database, Stream Hub sync and automatic chat announcements are **not connected yet**. Preview redemption buttons are deliberately disabled. Do not confuse this with a working store.

## What's included

- Responsive landing page built around the actual DanPlays crest artwork supplied by the channel owner.
- Store presentation with example reward cards, category filters and search.
- Preview of a private moderator dashboard (no real moderator access is implemented or publicly exposed).
- Twitch link to [danplays_tv](https://www.twitch.tv/danplays_tv).
- Cloudflare Pages-compatible static files, security headers, and zero-dependency Node tests.

## Repository layout

```
public/
  index.html                    # Landing page, store preview, contests preview
  assets/danplays-logo.webp    # Optimised version of the user-supplied logo
  assets/site.css
  assets/site.js
  _headers                      # Security headers for Cloudflare Pages
  robots.txt                    # Block indexing while site is a preview
docs/
  DEPLOY-CLOUDFLARE.md
  INTEGRATION-PLAN.md
tests/
  site.test.mjs
package.json
```

## Local preview

Run `python -m http.server 8000 --directory public` in this repository, then open `http://localhost:8000`. Node is only needed for running `npm test`; there are **no npm dependencies** to install.

## Cloudflare Pages deployment

Use a Pages project connected to `dan-plays/danplays_tv-website`, production branch `main`, **build command blank (or `exit 0`)**, and **build output directory `public`**. See [deployment instructions](docs/DEPLOY-CLOUDFLARE.md).

GitHub is for website *code*, not for a separate commit each time a viewer redeems something. Once built, new rewards will sync from Stream Hub to a secured cloud API/database and then appear on the website automatically.

## Next development stages

1. Add an authenticated Cloudflare Pages Functions / Workers backend and D1 schema.
2. Configure Twitch OAuth securely; verify identity and actual moderator status server-side.
3. Build an authenticated Stream Hub sync bridge for reward catalogue and authoritative DanCoins balance/ledger.
4. Enable atomic redemption transactions, inventory management, idempotency keys, refunds and bot chat announcements.
5. Add contest creation, entry tracking, winner draws, prediction settlement and moderator audit logs.
6. Test with a separate test Twitch account before turning on real DanCoins deductions.

**Do not store Twitch client secrets, refresh tokens or administrator API keys in GitHub files or browser JavaScript.**

## Assets / banners

The site currently uses the supplied crest without needing a banner. Optional future images: a wide 1920×600 or 1920×700 hero banner, and square reward illustrations (800×800 or larger). They are not required to deploy this foundation.
