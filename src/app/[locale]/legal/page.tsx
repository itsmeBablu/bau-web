import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale } from '@/lib/i18n';
import styles from '@/components/public/public.module.css';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === 'de' ? 'Rechtliches' : 'Legal',
    description:
      locale === 'de'
        ? 'Rechtliche Hinweise und Vorlagen für SmartBau.'
        : 'Legal information and draft notices for SmartBau.',
    alternates: { canonical: `/${locale}/legal`, languages: { en: '/en/legal', de: '/de/legal' } },
  };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const de = locale === 'de';
  const pages = de
    ? [
        ['Datenschutz', 'privacy'],
        ['Nutzungsbedingungen', 'terms'],
        ['Impressum', 'imprint'],
      ]
    : [
        ['Privacy notice', 'privacy'],
        ['Terms of use', 'terms'],
        ['Imprint', 'imprint'],
      ];
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.intro}>
        <span className="eyebrow">{de ? 'Rechtliches · Entwurf' : 'Legal · draft'}</span>
        <h1>{de ? 'Rechtliche Hinweise' : 'Legal information'}</h1>
        <p>
          {de
            ? 'Diese Seiten sind Vorlagen und müssen vor Veröffentlichung vom tatsächlichen Betreiber ergänzt und geprüft werden.'
            : 'These pages are drafts that must be completed and reviewed by the actual operator before publication.'}
        </p>
      </header>
      <div className={styles.legalIndex}>
        {pages.map(([label, slug], index) => (
          <Link className={styles.legalIndexLink} href={`/${locale}/legal/${slug}`} key={slug}>
            <span className={styles.index}>0{index + 1}</span>
            <span>{label}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
