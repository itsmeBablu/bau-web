import { unavailableIntegration } from './integrations';

const MAX_BODY_BYTES = 8 * 1024;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/** Validate bounded JSON without logging or retaining submitted personal data. */
export async function unavailablePost(
  request: Request,
  kind: 'newsletter' | 'inquiry' | 'plugin',
): Promise<Response> {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return json({ error: 'content_type_must_be_json' }, 415);
  }
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin)
        return json({ error: 'origin_not_allowed' }, 403);
    } catch {
      return json({ error: 'origin_not_allowed' }, 403);
    }
  }
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY_BYTES) return json({ error: 'request_too_large' }, 413);
  let raw = '';
  try {
    if (!request.body) return json({ error: 'invalid_json' }, 400);
    const reader = request.body.getReader();
    const decoder = new TextDecoder();
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: 'request_too_large' }, 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body))
    return json({ error: 'invalid_body' }, 400);
  const data = body as Record<string, unknown>;
  for (const [key, value] of Object.entries(data)) {
    if (
      !/^[a-zA-Z][a-zA-Z0-9_]{0,39}$/.test(key) ||
      typeof value !== 'string' ||
      value.length > 2000
    ) {
      return json({ error: 'invalid_fields' }, 400);
    }
  }
  if (typeof data.email !== 'string' || data.email.length > 254 || !EMAIL.test(data.email)) {
    return json({ error: 'invalid_email' }, 400);
  }
  if (kind === 'inquiry' && (typeof data.message !== 'string' || !data.message.trim()))
    return json({ error: 'invalid_message' }, 400);
  if (kind === 'plugin' && (typeof data.name !== 'string' || !data.name.trim()))
    return json({ error: 'invalid_name' }, 400);

  return json(
    unavailableIntegration(
      'This service is not configured yet. Your information was not sent or stored.',
    ),
    503,
  );
}
