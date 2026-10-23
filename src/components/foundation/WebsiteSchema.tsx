import { appUrl, siteUrl } from '@/lib/config';
import type { Locale } from '@/lib/i18n';
/** Public product identity only: no invented offers, ratings or company details. */
export function WebsiteSchema({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SmartBau',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web browser',
    inLanguage: locale,
    ...(siteUrl ? { url: `${siteUrl}/${locale}` } : {}),
    ...(appUrl ? { installUrl: appUrl } : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
