import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { featureContent, pageCopy } from '@/content/public';
import { PricingChooser } from './PricingChooser';
import { PublicForm } from './PublicForm';
import { UpdatesArchive } from './UpdatesArchive';
import styles from './public.module.css';

function Intro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <header className={styles.intro}>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{intro}</p>
    </header>
  );
}

export function FeaturesPage({ locale }: { locale: Locale }) {
  const copy = featureContent[locale];
  const labels =
    locale === 'de'
      ? { available: 'Verfügbar', beta: 'Beta', planned: 'Geplant', source: 'Quelle' }
      : { available: 'Available', beta: 'Beta', planned: 'Planned', source: 'Source' };
  return (
    <div className={`container ${styles.page}`}>
      <Intro eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <figure className={styles.productEvidence}>
        <Image
          src="/product/cad-blocks-and-inspector.png"
          alt={
            locale === 'de'
              ? 'Tatsächlicher SmartBau-CAD-Arbeitsbereich mit Zeichnungsblöcken und Eigenschafteninspektor'
              : 'Actual SmartBau CAD workspace showing drawing blocks and the properties inspector'
          }
          width={1600}
          height={900}
          sizes="(max-width: 900px) 100vw, 1120px"
        />
        <figcaption>
          {locale === 'de'
            ? 'Tatsächliche Produktaufnahme · CAD-Refinement-Integration, 20. Oktober 2026.'
            : 'Actual product capture · CAD refinement integration, 20 October 2026.'}
        </figcaption>
      </figure>
      <p className={styles.note}>{copy.note}</p>
      <div className={styles.featureGrid}>
        {copy.features.map((item, index) => (
          <article
            className={`${styles.feature} ${item.accent === 'blue' ? styles.blue : ''}`}
            key={item.title}
          >
            <div className={styles.featureTop}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span
                className={`${styles.badge} ${item.status === 'Planned' ? styles.planned : item.status === 'Beta' ? styles.beta : ''}`}
              >
                {item.status === 'Available'
                  ? labels.available
                  : item.status === 'Beta'
                    ? labels.beta
                    : labels.planned}
              </span>
            </div>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <a href={item.href} target="_blank" rel="noreferrer">
              {labels.source} ↗
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PricingPage({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  return (
    <div className={`container ${styles.page}`}>
      <Intro
        eyebrow={de ? 'Preise' : 'Pricing'}
        title={de ? 'Ein klarer Blick auf den Plan.' : 'A clear view of the plan.'}
        intro={
          de
            ? 'Die Preise sind noch nicht freigegeben. Hier sehen Sie einen transparenten Entwurf der möglichen Planstruktur.'
            : 'Pricing has not been approved yet. This page shows a transparent draft of the plan structure.'
        }
      />
      <PricingChooser locale={locale} />
      <p className={styles.note}>
        {de
          ? 'Entwurf v1 · nicht zum Kauf · keine Zahlung wird ausgelöst. Plangruppen, Funktionslimits, KI-Kontingente und Abrechnung warten auf Freigabe.'
          : 'Draft v1 · not for purchase · no payment is taken. Plan groupings, feature limits, AI credits and billing await approval.'}
      </p>
      <div className={styles.faq}>
        <h2>{de ? 'Häufige Fragen' : 'Common questions'}</h2>
        <details>
          <summary>
            {de ? 'Kann ich SmartBau jetzt abonnieren?' : 'Can I subscribe to SmartBau now?'}
          </summary>
          <p>
            {de
              ? 'Nein. Es wurden keine offiziellen Preise oder Zahlungsabläufe freigegeben.'
              : 'No. Official prices and payment flows have not been approved.'}
          </p>
        </details>
        <details>
          <summary>
            {de
              ? 'Was bedeutet der Monats-/Jahresvergleich?'
              : 'What does the monthly/yearly comparison mean?'}
          </summary>
          <p>
            {de
              ? 'Er vergleicht nur den vorgesehenen Abrechnungszeitraum. Preise und mögliche Ersparnisse sind nicht festgelegt.'
              : 'It only compares the proposed billing interval. Prices and possible savings are not set.'}
          </p>
        </details>
        <details>
          <summary>
            {de
              ? 'Wie viele Funktionen oder KI-Credits sind enthalten?'
              : 'How many features or AI credits are included?'}
          </summary>
          <p>
            {de
              ? 'Funktionslimits und KI-Credits stehen auf „TBD“ und werden erst nach Freigabe ergänzt. Die Entwurfspläne setzen keine Funktionen oder Kontingente technisch durch.'
              : 'Feature limits and AI credits are TBD pending approval. These draft plans do not enforce feature access or quotas.'}
          </p>
        </details>
      </div>
    </div>
  );
}

export function UpdatesPage({ locale }: { locale: Locale }) {
  const copy = pageCopy.updates[locale];
  return (
    <div className={`container ${styles.page}`}>
      <Intro eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <UpdatesArchive locale={locale} entries={copy.entries} />
      <Link className="button button-secondary" href={`/${locale}/roadmap`}>
        {locale === 'de' ? 'Roadmap ansehen' : 'Explore the roadmap'} ↗
      </Link>
    </div>
  );
}

export function RoadmapPage({ locale }: { locale: Locale }) {
  const copy = pageCopy.roadmap[locale];
  const status: Record<string, string> =
    locale === 'de'
      ? { Shipped: 'Veröffentlicht', 'In progress': 'In Arbeit', Planned: 'Geplant' }
      : { Shipped: 'Shipped', 'In progress': 'In progress', Planned: 'Planned' };
  return (
    <div className={`container ${styles.page}`}>
      <Intro eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
      <div className={styles.roadmap}>
        {copy.groups.map((item, i) => (
          <article key={item.title} className={styles.roadmapItem}>
            <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <span
                className={`${styles.badge} ${item.status === 'Planned' ? styles.planned : item.status === 'In progress' ? styles.beta : ''}`}
              >
                {status[item.status]}
              </span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
      <a
        className={styles.sourceLink}
        href="https://github.com/try-bau/SmartBau/blob/68e032702de7b4154cdb15e7c5a213f36ef5d009/docs/architecture/collaboration.md"
        target="_blank"
        rel="noreferrer"
      >
        {locale === 'de' ? 'Architektur- und Statusquellen' : 'Architecture and status sources'} ↗
      </a>
    </div>
  );
}

export function NewsletterPage({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  return (
    <div className={`container ${styles.page}`}>
      <Intro
        eyebrow={de ? 'Auf dem Laufenden' : 'Stay in the loop'}
        title={
          de ? 'Updates, wenn es etwas zu sagen gibt.' : 'Updates when there is something to share.'
        }
        intro={
          de
            ? 'Die Newsletter-Anmeldung ist vorbereitet, der Dienst aber noch nicht konfiguriert. Das Archiv enthält nur veröffentlichte Produktnotizen.'
            : 'Newsletter signup is prepared, but its service is not configured yet. The archive contains published product notes only.'
        }
      />
      <section className={styles.formCard}>
        <span className={styles.formSymbol}>✳</span>
        <h2>{de ? 'SmartBau-Newsletter' : 'The SmartBau newsletter'}</h2>
        <p>
          {de
            ? 'Double-Opt-in ist vorgesehen; derzeit kann keine Anmeldung angenommen oder bestätigt werden.'
            : 'Double opt-in is planned; subscriptions cannot currently be accepted or confirmed.'}
        </p>
        <PublicForm endpoint="/api/newsletter" kind="newsletter" locale={locale} />
      </section>
      <div className={styles.unsubscribeLink}>
        <Link href={`/${locale}/newsletter/unsubscribe`}>
          {de ? 'Abmeldeseite öffnen' : 'Open unsubscribe page'}
        </Link>
        <p>
          {de
            ? 'Der Abmeldedienst ist noch nicht eingerichtet.'
            : 'The unsubscribe service is not configured yet.'}
        </p>
      </div>
      <section className={styles.newsletterArchive}>
        <h2>{de ? 'Archiv der Produktneuigkeiten' : 'Product news archive'}</h2>
        <p>
          {de
            ? 'Durchsuchbare, veröffentlichte Produktnotizen.'
            : 'Searchable published product notes.'}
        </p>
        <UpdatesArchive locale={locale} entries={pageCopy.updates[locale].entries} />
      </section>
    </div>
  );
}

export function PartnersPage({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  return (
    <div className={`container ${styles.page}`}>
      <Intro
        eyebrow={de ? 'Zusammenarbeit' : 'Working together'}
        title={de ? 'Gute Arbeit entsteht gemeinsam.' : 'Good work gets built together.'}
        intro={
          de
            ? 'Partnerschaftsanfragen sind willkommen, der Anfrage-Dienst ist jedoch noch nicht konfiguriert. Es werden keine Partnerschaften ohne Freigabe aufgeführt.'
            : 'Partnership conversations are welcome, but the inquiry service is not configured yet. No partnerships are listed without approval.'
        }
      />
      <div className={styles.partnerLayout}>
        <section className={styles.partnerNote}>
          <span className={styles.index}>01</span>
          <h2>{de ? 'Eine Partnerschaft vorschlagen' : 'Propose a partnership'}</h2>
          <p>
            {de
              ? 'Das Formular dient derzeit nur der Vorschau. Bitte geben Sie keine sensiblen Informationen ein.'
              : 'The form is currently a preview. Please do not enter sensitive information.'}
          </p>
          <p className={styles.note}>
            {de
              ? 'Aktuell sind keine Partnerlogos freigegeben.'
              : 'No partner logos have been approved for publication.'}
          </p>
        </section>
        <section className={styles.formCard}>
          <PublicForm endpoint="/api/inquiries" kind="inquiry" locale={locale} />
        </section>
      </div>
    </div>
  );
}

export function LegalPage({
  locale,
  type,
}: {
  locale: Locale;
  type: 'privacy' | 'terms' | 'imprint';
}) {
  const de = locale === 'de';
  const title =
    type === 'privacy'
      ? de
        ? 'Datenschutzhinweise'
        : 'Privacy notice'
      : type === 'terms'
        ? de
          ? 'Nutzungsbedingungen'
          : 'Terms of use'
        : de
          ? 'Impressum'
          : 'Imprint';
  const sections =
    type === 'privacy'
      ? de
        ? [
            [
              'Entwurfshinweis',
              'Diese Seite ist eine Vorlage und noch keine rechtlich geprüfte Datenschutzerklärung. Verantwortliche Stelle, Kontakt, Hosting, Analyse und Aufbewahrungsfristen müssen vor Veröffentlichung ergänzt und geprüft werden.',
            ],
            [
              'Formulare',
              'Newsletter- und Anfrageformulare senden Daten nur an die jeweils angegebene Website-Schnittstelle. Ein erfolgreicher Versand wird nur angezeigt, wenn der Dienst ihn bestätigt.',
            ],
            [
              'Ihre Rechte',
              'Ergänzen Sie hier die für den tatsächlichen Betreiber und die eingesetzten Dienste geltenden Rechte, Kontaktwege und Aufsichtsbehörden.',
            ],
          ]
        : [
            [
              'Draft notice',
              'This page is a template, not a legally reviewed privacy notice. The controller, contact details, hosting, analytics and retention periods must be completed and reviewed before publication.',
            ],
            [
              'Forms',
              'Newsletter and inquiry forms send data only to the stated website endpoint. A successful submission is shown only when the service confirms it.',
            ],
            [
              'Your rights',
              'Add the rights, contact channels and supervisory authority that apply to the actual operator and services here.',
            ],
          ]
      : type === 'terms'
        ? de
          ? [
              [
                'Entwurfshinweis',
                'Diese Nutzungsbedingungen sind ein unvollständiger Entwurf und keine Rechtsberatung. Sie müssen an den Betreiber, die angebotenen Dienste und geltendes Recht angepasst werden.',
              ],
              [
                'Produktstatus',
                'Funktionen und Verfügbarkeit können je nach Bereitstellung variieren. Statusangaben auf der Website ersetzen keine verbindliche Produktbeschreibung.',
              ],
              [
                'Kontakt',
                'Betreiberangaben und ein gültiger Kontaktweg müssen vor Veröffentlichung ergänzt werden.',
              ],
            ]
          : [
              [
                'Draft notice',
                'These terms are an incomplete draft and are not legal advice. They must be adapted to the operator, services and applicable law.',
              ],
              [
                'Product status',
                'Features and availability may vary by deployment. Website status labels are not a binding product specification.',
              ],
              [
                'Contact',
                'Operator details and a valid contact channel must be added before publication.',
              ],
            ]
        : de
          ? [
              [
                'Entwurfshinweis',
                'Diese Impressumsseite ist eine Vorlage. Sie enthält absichtlich keine erfundene Firmenanschrift oder Betreiberangaben.',
              ],
              [
                'Vor Veröffentlichung ergänzen',
                'Tragen Sie die vollständige rechtliche Bezeichnung, ladungsfähige Anschrift, Kontaktmöglichkeiten und alle gesetzlich erforderlichen Angaben des tatsächlichen Betreibers ein.',
              ],
            ]
          : [
              [
                'Draft notice',
                'This imprint page is a template. It intentionally contains no invented company address or operator details.',
              ],
              [
                'Complete before publication',
                'Add the full legal name, service address, contact details and any information required by law for the actual operator.',
              ],
            ];
  return (
    <article className={`container ${styles.page} ${styles.legal}`}>
      <Intro
        eyebrow={de ? 'Rechtliches · Entwurf' : 'Legal · draft'}
        title={title}
        intro={
          de
            ? 'Vorlage zur Prüfung durch den tatsächlichen Betreiber.'
            : 'Template for review by the actual operator.'
        }
      />
      <div className={styles.legalContent}>
        {sections.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
      <p className={styles.note}>
        {de
          ? 'Zuletzt aktualisiert: 23. Oktober 2026 · Vor Veröffentlichung rechtlich prüfen lassen.'
          : 'Last updated: 23 October 2026 · Obtain legal review before publication.'}
      </p>
    </article>
  );
}
