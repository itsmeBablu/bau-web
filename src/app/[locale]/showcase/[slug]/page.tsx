import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/lib/i18n';
import { getShowcaseModel } from '@/content/showcase';
import { ShowcaseGallery } from '@/components/showcase/ShowcaseGallery';
import styles from '@/components/showcase/showcase.module.css';

export function generateStaticParams() {
  return locales.flatMap((locale) => [{ locale, slug: 'courtyard-pavilion' }]);
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const model = getShowcaseModel(slug);
  if (!model) return {};
  return {
    title: model.title[locale],
    description: model.description[locale],
    alternates: {
      canonical: `/${locale}/showcase/${slug}`,
      languages: { en: `/en/showcase/${slug}`, de: `/de/showcase/${slug}` },
    },
    openGraph: {
      type: 'article',
      title: model.title[locale],
      description: model.description[locale],
      images: [model.poster],
    },
  };
}
export default async function ShowcaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: value, slug } = await params;
  if (!isLocale(value)) notFound();
  const model = getShowcaseModel(slug);
  if (!model) notFound();
  const de = value === 'de';
  return (
    <section className="container section">
      <Link className={styles.backLink} href={`/${value}/showcase`}>
        ← {de ? 'Zum Showcase' : 'Back to showcase'}
      </Link>
      <header className="page-intro">
        <p className="eyebrow">
          {model.category} · {model.location[value]}
        </p>
        <h1>{model.title[value]}</h1>
        <p>{model.description[value]}</p>
      </header>
      <div className={styles.detailGrid}>
        <Image
          className={styles.detailPoster}
          src={model.poster}
          alt={
            de
              ? 'Architekturillustration des Hofpavillons'
              : 'Architectural illustration of the courtyard pavilion'
          }
          width={960}
          height={640}
        />
        <div className={`glass-card ${styles.infoCard}`}>
          <h2>{de ? 'Modelldetails' : 'Model information'}</h2>
          <dl>
            <div>
              <dt>{de ? 'Format' : 'Format'}</dt>
              <dd>GLB · {model.size}</dd>
            </div>
            <div>
              <dt>{de ? 'Zugriff' : 'Access'}</dt>
              <dd>{de ? 'Öffentlich' : 'Public'}</dd>
            </div>
            <div>
              <dt>{de ? 'Quelle' : 'Source'}</dt>
              <dd>{de ? 'Eigenes parametrisches Demo-Asset; CC0 1.0.' : model.attribution}</dd>
            </div>
          </dl>
          <p>
            {de
              ? 'Das 3D-Modell wird erst nach deiner Auswahl geladen. Der Viewer benötigt WebGL.'
              : 'The 3D model loads only after you choose to open it. The viewer requires WebGL.'}
          </p>
        </div>
      </div>
      <h2 className={styles.moreTitle}>{de ? 'Weitere Informationen' : 'More information'}</h2>
      <ShowcaseGallery locale={value} models={[model]} />
    </section>
  );
}
