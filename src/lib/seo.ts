import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { siteUrl } from '@/lib/config';

/** Build localized metadata without inventing a production origin. */
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const relative = `/${locale}${path}`;
  const absolute = (url: string) => (siteUrl ? new URL(url, `${siteUrl}/`).toString() : url);
  return {
    title,
    description,
    metadataBase: new URL(siteUrl || 'http://localhost:3100'),
    openGraph: {
      type: 'website',
      siteName: 'SmartBau',
      title,
      description,
      url: relative,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: 'SmartBau' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: siteUrl ? { index: true, follow: true } : { index: false, follow: false },
    alternates: {
      ...(siteUrl ? { canonical: absolute(relative) } : {}),
      languages: { en: absolute(`/en${path}`), de: absolute(`/de${path}`) },
    },
  };
}
