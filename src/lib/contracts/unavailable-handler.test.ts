import { describe, expect, it } from 'vitest';
import { readPublicUrl } from '../config';
import { unavailablePost } from './unavailable-handler';
import { helpTopics } from '../../content/help';

describe('public URL config', () => {
  it('accepts HTTP(S) and rejects unsafe or credentialed URLs', () => {
    expect(readPublicUrl('https://cad.example/path/')).toBe('https://cad.example/path');
    expect(readPublicUrl('javascript:alert(1)')).toBeNull();
    expect(readPublicUrl('https://user:pass@cad.example')).toBeNull();
    expect(readPublicUrl('/relative')).toBeNull();
  });
});

describe('unavailable integration endpoint', () => {
  const request = (body: string, headers: HeadersInit = {}) =>
    new Request('https://site.example/api/newsletter', {
      method: 'POST',
      body,
      headers: { 'content-type': 'application/json', ...Object.fromEntries(new Headers(headers)) },
    });

  it('returns 503 for valid data and never claims it was stored', async () => {
    const response = await unavailablePost(request('{"email":"person@example.com"}'), 'newsletter');
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({
      status: 'unavailable',
      code: 'integration_unavailable',
    });
  });

  it('rejects invalid email and cross-origin submissions', async () => {
    expect((await unavailablePost(request('{"email":"bad"}'), 'newsletter')).status).toBe(400);
    expect(
      (
        await unavailablePost(
          request('{"email":"a@b.com"}', { origin: 'https://attacker.example' }),
          'newsletter',
        )
      ).status,
    ).toBe(403);
  });

  it('stops reading chunked bodies once the byte limit is exceeded', async () => {
    const chunks: Uint8Array[] = [new Uint8Array(5000), new Uint8Array(4000)];
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(chunk);
        controller.close();
      },
    });
    const init: RequestInit & { duplex: 'half' } = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      duplex: 'half',
    };
    const request = new Request('https://site.example/api/newsletter', init);
    expect((await unavailablePost(request, 'newsletter')).status).toBe(413);
  });
});

describe('help source coverage', () => {
  it('covers core topics in both locales and pins links to the audited source revision', () => {
    for (const locale of ['en', 'de'] as const) {
      expect(helpTopics[locale].length).toBeGreaterThanOrEqual(12);
      expect(
        helpTopics[locale].every((topic) =>
          topic.href.startsWith('https://github.com/try-bau/SmartBau/'),
        ),
      ).toBe(true);
      expect(
        helpTopics[locale].every((topic) =>
          topic.href.includes('68e032702de7b4154cdb15e7c5a213f36ef5d009'),
        ),
      ).toBe(true);
    }
  });
});
