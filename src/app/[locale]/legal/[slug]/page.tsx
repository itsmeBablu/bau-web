import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/public/PublicPages';
import { isLocale } from '@/lib/i18n';
type LegalSlug = 'privacy' | 'terms' | 'imprint';
const slugs: LegalSlug[] = ['privacy', 'terms', 'imprint'];
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !slugs.includes(slug as LegalSlug)) return {};
  const de = locale === 'de';
  const title =
    slug === 'privacy'
      ? de
        ? 'Datenschutz'
        : 'Privacy'
      : slug === 'terms'
        ? de
          ? 'Nutzungsbedingungen'
          : 'Terms'
        : de
          ? 'Impressum'
          : 'Imprint';
  return {
    title,
    description: de
      ? `${title} · Entwurf zur rechtlichen Prüfung.`
      : `${title} · Draft for legal review.`,
    alternates: {
      canonical: `/${locale}/legal/${slug}`,
      languages: { en: `/en/legal/${slug}`, de: `/de/legal/${slug}` },
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !slugs.includes(slug as LegalSlug)) notFound();
  return <LegalPage locale={locale} type={slug as LegalSlug} />;
}
