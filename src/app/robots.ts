import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: siteUrl ? '/' : undefined,
      disallow: siteUrl ? ['/api/', '/en/account', '/de/account'] : '/',
    },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
