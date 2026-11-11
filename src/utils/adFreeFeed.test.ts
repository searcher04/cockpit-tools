import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { APIKEY_FUN_REGISTER_URL, normalizeApiKeyFunOfficialUrl } from './apikeyFunLinks.ts';

test('the fork announcement feed contains no advertising payload', () => {
  const feed = JSON.parse(readFileSync(new URL('../../announcements.json', import.meta.url), 'utf8'));
  assert.equal(feed.topRightAd, null);
  assert.equal(feed.topRightAdsEnabled, false);
  assert.deepEqual(feed.topRightAds, []);
  assert.equal(
    feed.announcements.some((item: { id?: string; action?: { target?: string } }) => (
      String(item.id ?? '').toLowerCase().startsWith('apikey-fan-')
      || String(item.action?.target ?? '').toLowerCase().includes('apikey.fan')
    )),
    false,
  );

  const apiKeyFun = feed.sponsorModule.sponsors.find((item: { id: string }) => item.id === 'apikey-fun');
  assert.ok(apiKeyFun?.integration?.enabled, 'keep the functional API relay integration');
  assert.equal(apiKeyFun.integration.baseUrl, 'https://api.apikey.fan/v1');
  assert.equal(apiKeyFun.url, 'https://apikey.fan');
  assert.equal(apiKeyFun.integration.website, 'https://apikey.fan');
  assert.equal(apiKeyFun.integration.apiKeyUrl, 'https://apikey.fan/register');
});

test('the API key manager keeps its official URL normalization behavior', () => {
  assert.equal(normalizeApiKeyFunOfficialUrl('https://apikey.fan/register'), APIKEY_FUN_REGISTER_URL);
});
