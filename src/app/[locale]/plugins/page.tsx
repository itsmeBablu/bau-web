import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PluginDirectory } from '@/components/plugins/PluginDirectory';
import { pluginRoadmap } from '@/content/plugins';
import { isLocale, locales } from '@/lib/i18n';
import styles from '@/components/plugins/plugins.module.css';
import { PluginSuggestionForm } from '@/components/plugins/PluginSuggestionForm';
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
  return pageMetadata(
    locale,
    '/plugins',
    locale === 'de' ? 'Plugin-Roadmap' : 'Plugin roadmap',
    locale === 'de'
      ? 'Ein transparenter Ausblick auf mögliche SmartBau-Erweiterungen.'
      : 'A transparent look at potential SmartBau extensions.',
  );
}
export default async function PluginsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const de = value === 'de';
  return (
    <section className="container section">
      <header className="page-intro">
        <p className="eyebrow">{de ? 'Ökosystem' : 'Ecosystem'}</p>
        <h1>{de ? 'Plugins sind in Planung.' : 'Plugins are on the roadmap.'}</h1>
        <p>
          {de
            ? 'SmartBau hat derzeit keine installierbare Plugin-Laufzeit. Diese Seite ist ein Ausblick und kein App-Store.'
            : 'SmartBau does not currently have an installable plugin runtime. This page is a roadmap, not an app store.'}
        </p>
      </header>
      <div className={styles.callout}>
        <span aria-hidden="true">◈</span>
        <p>
          {de
            ? 'Hier gibt es keine Installation, keinen Drittanbieter-Zugriff und keine Plugin-Berechtigungen. Vorschläge werden nur als Anfrage entgegengenommen.'
            : 'There is no installation, third-party access, or plugin permission system here. Suggestions are accepted as requests only.'}
        </p>
      </div>
      <PluginDirectory locale={value} entries={pluginRoadmap} />
      <section className={styles.submit}>
        <div>
          <p className="eyebrow">{de ? 'Community' : 'Community'}</p>
          <h2>{de ? 'Eine Idee einreichen' : 'Suggest an idea'}</h2>
          <p>
            {de
              ? 'Der Einreichungsdienst ist vorbereitet, derzeit jedoch nicht verfügbar.'
              : 'The submission endpoint is prepared but currently unavailable.'}
          </p>
        </div>
        <PluginSuggestionForm locale={value} />
      </section>
    </section>
  );
}
