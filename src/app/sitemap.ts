import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';
import { locales } from '@/lib/i18n';
import { showcaseModels } from '@/content/showcase';
import { pluginRoadmap } from '@/content/plugins';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const paths = [
    '',
    '/features',
    '/pricing',
    '/updates',
    '/roadmap',
    '/newsletter',
    '/partners',
    '/plugins',
    '/help',
    '/showcase',
    '/legal',
    '/legal/privacy',
    '/legal/terms',
    '/legal/imprint',
    ...showcaseModels.map((m) => `/showcase/${m.slug}`),
    ...pluginRoadmap.map((p) => `/plugins/${p.slug}`),
  ];
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: { languages: { en: `${siteUrl}/en${path}`, de: `${siteUrl}/de${path}` } },
    })),
  );
}
