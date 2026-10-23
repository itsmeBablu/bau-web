import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PricingPage } from '@/components/public/PublicPages';
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
    '/pricing',
    locale === 'de' ? 'Preise' : 'Pricing',
    locale === 'de'
      ? 'Ein nicht freigegebener Entwurf der SmartBau-Pläne. Keine Zahlungen.'
      : 'An unapproved draft of SmartBau plans. No charging is enabled.',
  );
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PricingPage locale={locale} />;
}
