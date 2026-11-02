# Deploy the first DanPlays website to Cloudflare Pages

This **does not require a Cloudflare ChatGPT plugin**, a static home IP address, a purchased domain, or keeping the Stream Hub PC on. It deploys the static *layout preview*, not a functioning DanCoins store.

1. Sign in to [Cloudflare dashboard](https://dash.cloudflare.com/) with your own account.
2. Go to **Workers & Pages → Create application → Pages → Import an existing Git repository**.
3. Authorise GitHub for Cloudflare when prompted and select `dan-plays/danplays_tv-website`. Grant access to this repository; you do not need to deploy Football Results Studio.
4. Project name: `danplays-tv-website` (or another available name).
5. **Production branch:** `main`.
6. **Framework preset:** None.
7. **Build command:** leave blank, or enter `exit 0`.
8. **Build output directory:** `public`.
9. **Root directory:** repository root (leave default).
10. Click **Save and Deploy**.

Once connected, Cloudflare will give a `*.pages.dev` URL and redeploy on future pushes to `main`. The URL must be read from the Cloudflare dashboard after successful deployment — do not assume a particular subdomain is available.

*Security:* The deployed preview has a restrictive CSP and no forms or credential-taking endpoints. Do **not** publish Twitch client secrets to the repository. The `robots.txt` currently blocks search engine indexing while the design is a preview; change that when real functionality is ready.

*Cost:* Cloudflare's free tiers have resource limits. There is no promise of unlimited free hosting. For the static preview, no credit-based website builder is required.

## When the site becomes a real store

The website will need a database and server-side API for reward catalogue, Twitch OAuth and DanCoins transactions; the desktop hub will sync with that secure API over outbound HTTPS. Do not create rewards by committing a new GitHub file. Consult [integration plan](INTEGRATION-PLAN.md).
