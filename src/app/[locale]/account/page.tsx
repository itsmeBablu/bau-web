import Link from 'next/link';
import { appUrl, getAppLink } from '@/lib/config';
import { isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import styles from '@/components/integrations/integrations.module.css';

const copy = {
  en: {
    title: 'Your SmartBau account',
    intro:
      'Account services are provided by the SmartBau application. This website has no connected identity or account data.',
    status: 'Not connected',
    groups: [
      [
        'Subscription',
        'Subscription details are available only in a configured application account.',
      ],
      ['Credits', 'Credit balances are not available on this website.'],
      ['Models', 'Project and model data are not loaded or stored here.'],
    ],
    launch: 'Open SmartBau application',
    unconfigured: 'The application link has not been configured for this website.',
    help: 'Visit Help Center',
  },
  de: {
    title: 'Dein SmartBau-Konto',
    intro:
      'Kontodienste werden von der SmartBau-Anwendung bereitgestellt. Diese Website ist nicht mit einer Identität oder Kontodaten verbunden.',
    status: 'Nicht verbunden',
    groups: [
      [
        'Abonnement',
        'Abonnementdetails sind nur in einem eingerichteten Anwendungskonto verfügbar.',
      ],
      ['Guthaben', 'Guthabenstände sind auf dieser Website nicht verfügbar.'],
      ['Modelle', 'Projekt- und Modelldaten werden hier weder geladen noch gespeichert.'],
    ],
    launch: 'SmartBau-Anwendung öffnen',
    unconfigured: 'Der Anwendungslink ist für diese Website nicht eingerichtet.',
    help: 'Hilfezentrum besuchen',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale)
    ? pageMetadata(locale, '/account', locale === 'de' ? 'Konto' : 'Account', copy[locale].intro)
    : {};
}

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const text = copy[value];
  return (
    <div>
      <header className="page-intro">
        <span className="eyebrow">{text.status}</span>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
      </header>
      <section className="container" aria-label={text.title}>
        <div className={styles.accountGrid}>
          {text.groups.map(([title, description]) => (
            <article className={`card ${styles.accountSection}`} key={title}>
              <span className={styles.unavailable}>{text.status}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 36 }}>
          {appUrl ? (
            <a className="button button-primary" href={getAppLink(value)}>
              {text.launch} ↗
            </a>
          ) : (
            <span>{text.unconfigured} </span>
          )}
          <Link className="button button-secondary" href={`/${value}/help`}>
            {text.help}
          </Link>
        </p>
      </section>
    </div>
  );
}
