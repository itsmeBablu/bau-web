import { WebsiteSchema } from '@/components/foundation/WebsiteSchema';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/foundation/SiteShell';
import { isLocale, locales } from '@/lib/i18n';
import '../globals.css';
import { pageMetadata } from '@/lib/seo';

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
  const title =
    locale === 'de'
      ? 'SmartBau — Klarer entwerfen. Besser bauen.'
      : 'SmartBau — Design smarter. Build better.';
  const description =
    locale === 'de'
      ? 'Architektur, präzise Zeichnungen und Gebäudetechnik in einem vernetzten Arbeitsbereich.'
      : 'Architecture, precision drawing and building systems in one connected workspace.';
  return {
    ...pageMetadata(locale, '', title, description),
    title: { default: title, template: '%s | SmartBau' },
    icons: { icon: '/icon.svg' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  return (
    <html lang={value} suppressHydrationWarning>
      <body>
        <WebsiteSchema locale={value} />
        <SiteShell locale={value}>{children}</SiteShell>
      </body>
    </html>
  );
}
