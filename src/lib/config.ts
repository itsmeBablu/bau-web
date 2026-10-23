import type { Locale } from '@/lib/i18n';

export function readPublicUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

/** Optional public URL for an independently deployed SmartBau application. */
export const appUrl = readPublicUrl(process.env.NEXT_PUBLIC_APP_URL);

/** Optional canonical website origin, supplied by deployment configuration. */
export const siteUrl = readPublicUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Safe launch destination when the application deployment has not been configured. */
export function getAppLink(locale: Locale): string {
  return appUrl ?? `/${locale}/account`;
}
