import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FeaturesPage } from '@/components/public/PublicPages';
import { isLocale } from '@/lib/i18n';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    '/features',
    locale === 'de' ? 'Funktionen' : 'Features',
    locale === 'de'
      ? 'Zeichen-, Gebäude- und Modellprüfungswerkzeuge von SmartBau.'
      : 'Explore SmartBau drawing, building and model review tools.',
  );
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FeaturesPage locale={locale} />;
}
