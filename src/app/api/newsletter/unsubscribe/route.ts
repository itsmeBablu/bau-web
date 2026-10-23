import { unavailableIntegration } from '@/lib/contracts/integrations';

export function POST() {
  return Response.json(
    unavailableIntegration(
      'Unsubscribe requests are not configured on this website. No request was sent or stored.',
    ),
    {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
