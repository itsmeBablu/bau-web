import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { UnsubscribeRequest } from '@/components/public/UnsubscribeRequest';
import styles from '@/components/public/public.module.css';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: locale === 'de' ? 'Newsletter-Abmeldung' : 'Unsubscribe',
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}/newsletter/unsubscribe`,
      languages: { en: '/en/newsletter/unsubscribe', de: '/de/newsletter/unsubscribe' },
    },
  };
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();
  const de = locale === 'de';
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.intro}>
        <span className="eyebrow">{de ? 'Newsletter' : 'Newsletter'}</span>
        <h1>{de ? 'Sie möchten sich abmelden?' : 'Would you like to unsubscribe?'}</h1>
        <p>
          {de
            ? 'Der Newsletter-Dienst ist nicht eingerichtet. Das Öffnen dieser Seite führt keine Abmeldung aus.'
            : 'The newsletter service is not configured. Opening this page does not unsubscribe you.'}
        </p>
      </header>
      <UnsubscribeRequest
        locale={locale}
        token={typeof query.token === 'string' ? query.token : ''}
      />
    </div>
  );
}
