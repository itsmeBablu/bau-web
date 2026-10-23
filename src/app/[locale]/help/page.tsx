import { notFound } from 'next/navigation';
import { HelpSearch } from '@/components/integrations/HelpSearch';
import { helpTopics } from '@/content/help';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale)
    ? pageMetadata(
        locale,
        '/help',
        locale === 'de' ? 'Hilfezentrum' : 'Help Center',
        locale === 'de' ? 'Durchsuche SmartBau-Hilfethemen.' : 'Search SmartBau help topics.',
      )
    : {};
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const heading =
    value === 'de'
      ? {
          title: 'SmartBau-Hilfezentrum',
          intro:
            'Durchsuche kurze Antworten aus der Produktdokumentation. Jeder Eintrag verweist auf seine Quelle.',
        }
      : {
          title: 'SmartBau Help Center',
          intro:
            'Search concise answers grounded in product documentation. Each topic links to its source.',
        };
  return (
    <div>
      <header className="page-intro">
        <span className="eyebrow">{value === 'de' ? 'Dokumentation' : 'Documentation'}</span>
        <h1>{heading.title}</h1>
        <p>{heading.intro}</p>
      </header>
      <HelpSearch topics={helpTopics[value]} locale={value} />
    </div>
  );
}
