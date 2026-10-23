import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NewsletterPage } from '@/components/public/PublicPages';
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
    '/newsletter',
    locale === 'de' ? 'Newsletter' : 'Newsletter',
    locale === 'de'
      ? 'Produktneuigkeiten und ein belegtes Update-Archiv.'
      : 'Product news and a sourced updates archive.',
  );
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <NewsletterPage locale={locale} />;
}
