import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pluginRoadmap } from '@/content/plugins';
import { isLocale, locales } from '@/lib/i18n';
import styles from '@/components/plugins/plugins.module.css';
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pluginRoadmap.map((plugin) => ({ locale, slug: plugin.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const item = pluginRoadmap.find((entry) => entry.slug === slug);
  return item
    ? {
        title: item.name[locale],
        description: item.summary[locale],
        alternates: {
          canonical: `/${locale}/plugins/${slug}`,
          languages: { en: `/en/plugins/${slug}`, de: `/de/plugins/${slug}` },
        },
      }
    : {};
}
export default async function PluginDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: value, slug } = await params;
  if (!isLocale(value)) notFound();
  const item = pluginRoadmap.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const de = value === 'de';
  return (
    <section className="container section">
      <Link className={styles.back} href={`/${value}/plugins`}>
        ← {de ? 'Plugin-Roadmap' : 'Plugin roadmap'}
      </Link>
      <header className="page-intro">
        <p className="eyebrow">
          {de
            ? item.category === 'Design tools'
              ? 'Designwerkzeuge'
              : item.category === 'Data exchange'
                ? 'Datenaustausch'
                : 'Workflow'
            : item.category}{' '}
          ·{' '}
          {item.status === 'Planned'
            ? de
              ? 'Geplant'
              : 'Planned'
            : de
              ? 'In Prüfung'
              : 'Exploring'}
        </p>
        <h1>{item.name[value]}</h1>
        <p>{item.summary[value]}</p>
      </header>
      <article className={`glass-card ${styles.detail}`}>
        <h2>{de ? 'Status und Zugriff' : 'Status and access'}</h2>
        <p>{item.permissions[value]}</p>
        <p>
          {de
            ? 'Dieser Eintrag beschreibt eine mögliche Richtung. Es gibt noch keine ausführbare Erweiterung oder Kompatibilitätszusage.'
            : 'This entry describes a possible direction. There is no executable extension or compatibility promise yet.'}
        </p>
        <Link className="button button-secondary" href={`/${value}/plugins`}>
          {de ? 'Alle Konzepte' : 'All concepts'}
        </Link>
      </article>
    </section>
  );
}
