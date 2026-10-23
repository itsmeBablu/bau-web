import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UpdatesPage } from '@/components/public/PublicPages';
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
    '/updates',
    locale === 'de' ? 'Neuigkeiten' : 'Updates',
    locale === 'de'
      ? 'Belegte Neuigkeiten aus der SmartBau-Entwicklung.'
      : 'Source-linked updates from SmartBau development.',
  );
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <UpdatesPage locale={locale} />;
}
