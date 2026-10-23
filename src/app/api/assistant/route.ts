import { unavailableIntegration } from '@/lib/contracts/integrations';
export function POST() {
  return Response.json(
    unavailableIntegration(
      'The assistant is not available on this website. Visit the Help Center for product information.',
    ),
    {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
