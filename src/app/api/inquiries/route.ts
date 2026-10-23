import { unavailablePost } from '@/lib/contracts/unavailable-handler';
export function POST(request: Request) {
  return unavailablePost(request, 'inquiry');
}
