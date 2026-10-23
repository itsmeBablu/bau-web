import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShowcaseGallery } from '@/components/showcase/ShowcaseGallery';
import styles from '@/components/showcase/showcase.module.css';
import { showcaseModels } from '@/content/showcase';
import { isLocale, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    '/showcase',
    locale === 'de' ? 'Showcase' : 'Showcase',
    locale === 'de'
      ? 'Entdecke eine originale öffentliche Architekturdemonstration.'
      : 'Explore an original public architectural demonstration.',
  );
}
export default async function ShowcasePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const de = value === 'de';
  return (
    <section className="container section">
      <header className="page-intro">
        <p className="eyebrow">{de ? 'Öffentliche Projekte' : 'Public projects'}</p>
        <h1>{de ? 'Architektur, die man erkunden kann.' : 'Architecture you can explore.'}</h1>
        <p>
          {de
            ? 'Durchsuche ausgewählte Studien und öffne das leichte 3D-Modell erst, wenn du es möchtest. Öffentliche Beispiele erfordern kein Konto.'
            : 'Browse selected studies and load the lightweight 3D model only when you choose. Public examples need no account.'}
        </p>
      </header>
      <div className={styles.notice}>
        <strong>{de ? 'Demo-Galerie' : 'Demonstration gallery'}</strong>
        <span>
          {de
            ? 'Diese Seite zeigt ein originales, eigens erstelltes Beispielmodell. Uploads sind nicht verfügbar; es werden keine Dateien gespeichert.'
            : 'This page contains one original demonstration model. Uploads are unavailable; no files are stored.'}
        </span>
      </div>
      <ShowcaseGallery locale={value} models={showcaseModels} />
    </section>
  );
}
