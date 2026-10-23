import { pageMetadata } from '@/lib/seo';
import { isLocale } from '@/lib/i18n';
import HomePage from '@/components/home/HomePage';

import type { Locale } from '@/lib/i18n';

type Props = { params: Promise<{ locale: Locale }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(
    locale,
    '',
    locale === 'de' ? 'Klarer entwerfen. Besser bauen.' : 'Design smarter. Build better.',
    locale === 'de'
      ? 'Von der Idee zum intelligenten Gebäude. Architektur und Gebäudetechnik in SmartBau.'
      : 'From idea to intelligent building. Explore architecture and engineering with SmartBau.',
  );
}
