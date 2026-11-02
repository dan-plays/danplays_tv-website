import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = read('public/index.html');
const css = read('public/assets/site.css');
const js = read('public/assets/site.js');
test('homepage includes correct DanPlays identity and asset', () => {
  assert.match(html, /DanPlays \| Community Store &amp; Contests|DanPlays \| Community Store & Contests/);
  assert.match(html, /twitch\.tv\/danplays_tv/);
  assert.match(html, /assets\/danplays-logo\.webp/);
  assert.ok(existsSync(new URL('../public/assets/danplays-logo.webp', import.meta.url)));
});
test('site exposes store and contests content without pretending functionality is live', () => {
  assert.match(html, /id="store"/);
  assert.match(html, /id="contests"/);
  assert.match(html, /NOT ENABLED YET/);
  assert.match(html, /<button[^>]+disabled[^>]*>Coming soon<\/button>/);
  assert.match(html, /no live redemptions yet/);
});
test('preview keeps credentials and live purchase hooks out of browser JavaScript', () => {
  assert.doesNotMatch(js, /client_secret|access_token|refresh_token|localStorage|fetch\(/i);
  assert.match(js, /aria-expanded/);
  assert.match(js, /aria-pressed/);
  assert.match(css, /@media\(max-width:760px\)/);
});
test('static hosting settings are ready for Cloudflare Pages', () => {
  const headers = read('public/_headers');
  assert.match(headers, /Content-Security-Policy:/);
  assert.match(headers, /connect-src 'none'/);
  assert.match(read('docs/DEPLOY-CLOUDFLARE.md'), /Build output directory:\*\* \x60public\x60/);
});
