import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Layers3, Route, Sparkles, Workflow } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { appUrl, getAppLink } from '@/lib/config';
import type { ReactNode } from 'react';
import HomeExperience from './HomeExperience';
import styles from './Home.module.css';

export type HomeCopy = {
  nav: string[];
  title: ReactNode;
  eyebrow: string;
  intro: string;
  start: string;
  watch: string;
  modelTag: string;
  modelCaption: string;
  meta: [string, string, string];
  storyLabel: string;
  storyAside: string;
  mepNote: string;
  stages: [string, string, string][];
  cue: string;
  platform: string;
  platformTitle: string;
  platformIntro: string;
  cards: [string, string, string][];
  processLabel: string;
  processTitle: string;
  process: [string, string][];
  closing: string;
  closingText: string;
  cta: string;
  explore: string;
  view: string;
  fine: string;
};

const copy: Record<Locale, HomeCopy> = {
  en: {
    nav: ['The method', 'Capabilities', 'For teams'],
    meta: ['Architecture', 'Engineering', 'In one model'],
    storyLabel: 'The building / 01—08',
    storyAside: 'One design. Eight perspectives.',
    mepNote: 'MEP / Systems',
    eyebrow: 'A clearer way to build',
    title: (
      <>
        From idea to
        <br />
        <em>intelligent building.</em>
      </>
    ),
    intro:
      'Bring architecture and building systems into one calm, connected workspace. SmartBau turns early ideas into clear, coordinated places to work.',
    start: 'Start designing',
    watch: 'View the demo',
    modelTag: 'Concept study · 01 / 08',
    modelCaption: 'A small building, assembled in layers.',
    stages: [
      [
        '01',
        'A place to begin',
        'Set the site, orientation and footprint. Start with the decisions that shape everything that follows.',
      ],
      [
        '02',
        'Walls with intention',
        'Lay out rooms and openings while the plan is still easy to change.',
      ],
      [
        '03',
        'Structure in context',
        'See the supporting frame alongside the spaces it makes possible.',
      ],
      [
        '04',
        'A roof that belongs',
        'Complete the envelope and read the building as one coherent whole.',
      ],
      [
        '05',
        'Systems in the open',
        'Trace ventilation and services through the model with engineering blue.',
      ],
      [
        '06',
        'Make room for life',
        'Place the essentials and understand scale before the details multiply.',
      ],
      [
        '07',
        'See it together',
        'Move from plan to a considered presentation, ready to share with your team.',
      ],
      [
        '08',
        'Your next project starts here',
        'A connected building model gives every next decision a clearer place to land.',
      ],
    ],
    cue: 'Scroll to move through the study',
    platform: 'One connected workspace',
    platformTitle: 'From first line to shared understanding.',
    platformIntro:
      'A project is easier to move forward when the plan, building and building systems speak the same language.',
    cards: [
      [
        'Plan with clarity',
        'Shape floor plans, walls and openings in a focused drawing space.',
        '01',
      ],
      [
        'Coordinate in 3D',
        'Read space, structure and systems together as the design develops.',
        '02',
      ],
      [
        'Share the thinking',
        'Give collaborators a clear view of the choices behind the model.',
        '03',
      ],
    ],
    processLabel: 'A working rhythm',
    processTitle: 'Less translation. More progress.',
    process: [
      ['01', 'Start with a plan'],
      ['02', 'Build in context'],
      ['03', 'Review together'],
    ],
    closing: 'Design smarter. Build better.',
    closingText: 'Step into a workspace made for the way buildings come together.',
    cta: 'Start designing',
    explore: 'Explore SmartBau',
    view: 'View demo',
    fine: 'Prepared demo · Illustrative geometry · No AI or live project data',
  },
  de: {
    nav: ['Die Methode', 'Möglichkeiten', 'Für Teams'],
    meta: ['Architektur', 'Technik', 'Ein Modell'],
    storyLabel: 'Das Gebäude / 01—08',
    storyAside: 'Ein Entwurf. Acht Perspektiven.',
    mepNote: 'TGA / Gebäudetechnik',
    eyebrow: 'Klarer planen und bauen',
    title: (
      <>
        Von der Idee zum
        <br />
        <em>intelligenten Gebäude.</em>
      </>
    ),
    intro:
      'Architektur und Gebäudetechnik in einem ruhigen, vernetzten Arbeitsbereich. SmartBau macht aus ersten Ideen klare, abgestimmte Räume.',
    start: 'Jetzt entwerfen',
    watch: 'Demo ansehen',
    modelTag: 'Konzeptstudie · 01 / 08',
    modelCaption: 'Ein kleines Gebäude, Schicht für Schicht.',
    stages: [
      [
        '01',
        'Ein Ort für den Anfang',
        'Lege Grundstück, Ausrichtung und Grundfläche fest. Beginne mit Entscheidungen, die alles Weitere prägen.',
      ],
      [
        '02',
        'Wände mit Absicht',
        'Ordne Räume und Öffnungen, solange sich der Grundriss leicht verändern lässt.',
      ],
      [
        '03',
        'Tragwerk im Zusammenhang',
        'Betrachte das Tragwerk gemeinsam mit den Räumen, die es ermöglicht.',
      ],
      [
        '04',
        'Ein passendes Dach',
        'Vervollständige die Hülle und erfasse das Gebäude als zusammenhängendes Ganzes.',
      ],
      [
        '05',
        'Technik offen sichtbar',
        'Führe Lüftung und Leitungen mit technischem Blau durch das Modell.',
      ],
      [
        '06',
        'Raum für das Leben',
        'Platziere das Wesentliche und prüfe den Maßstab, bevor die Details zunehmen.',
      ],
      [
        '07',
        'Alles gemeinsam betrachten',
        'Wechsle vom Grundriss zu einer klaren Präsentation für dein Team.',
      ],
      [
        '08',
        'Das nächste Projekt beginnt hier',
        'Ein vernetztes Gebäudemodell gibt jeder nächsten Entscheidung einen klaren Platz.',
      ],
    ],
    cue: 'Scrollen, um die Studie zu erkunden',
    platform: 'Ein vernetzter Arbeitsbereich',
    platformTitle: 'Von der ersten Linie zum gemeinsamen Verständnis.',
    platformIntro:
      'Ein Projekt kommt leichter voran, wenn Plan, Gebäude und Gebäudetechnik dieselbe Sprache sprechen.',
    cards: [
      [
        'Klar planen',
        'Entwirf Grundrisse, Wände und Öffnungen in einer fokussierten Zeichenumgebung.',
        '01',
      ],
      [
        'In 3D koordinieren',
        'Betrachte Raum, Tragwerk und Gebäudetechnik gemeinsam im Entwurf.',
        '02',
      ],
      [
        'Gedanken teilen',
        'Zeige deinem Team die Entscheidungen hinter dem Modell verständlich.',
        '03',
      ],
    ],
    processLabel: 'Ein klarer Arbeitsrhythmus',
    processTitle: 'Weniger übertragen. Mehr bewegen.',
    process: [
      ['01', 'Mit dem Plan beginnen'],
      ['02', 'Im Zusammenhang aufbauen'],
      ['03', 'Gemeinsam prüfen'],
    ],
    closing: 'Klarer entwerfen. Besser bauen.',
    closingText: 'Entdecke einen Arbeitsbereich, der Gebäude ganzheitlich denkt.',
    cta: 'Jetzt entwerfen',
    explore: 'SmartBau entdecken',
    view: 'Demo ansehen',
    fine: 'Vorbereitete Demo · Beispielgeometrie · Keine KI- oder Live-Projektdaten',
  },
};

export default function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const appLink = getAppLink(locale);
  return (
    <div className={styles.home}>
      <HomeExperience locale={locale} t={t} />

      <section className={styles.platform} id="method">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionIndex}>{t.platform}</span>
          <h2>{t.platformTitle}</h2>
          <p>{t.platformIntro}</p>
        </div>
        <div className={styles.featureGrid}>
          {t.cards.map((card, index) => {
            const Icon = [Layers3, Workflow, Route][index];
            return (
              <article className={styles.featureCard} key={card[0]}>
                <div className={styles.featureTop}>
                  <span>{card[2]}</span>
                  <Icon size={22} strokeWidth={1.4} />
                </div>
                <h3>{card[0]}</h3>
                <p>{card[1]}</p>
                <span className={styles.cardRule} />
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.process} id="capabilities">
        <div className={styles.processIntro}>
          <span className={styles.sectionIndex}>{t.processLabel}</span>
          <h2>{t.processTitle}</h2>
        </div>
        <div className={styles.processSteps}>
          {t.process.map((step) => (
            <div className={styles.processStep} key={step[0]}>
              <span>{step[0]}</span>
              <p>{step[1]}</p>
              <ArrowRight size={16} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.closing} id="teams">
        <div className={styles.closingDecor}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.closingCopy}>
          <span className={styles.sectionIndex}>
            <Sparkles size={14} /> SMARTBAU WORKSPACE
          </span>
          <h2>{t.closing}</h2>
          <p>{t.closingText}</p>
          <div className={styles.closingLinks}>
            <Link
              href={appLink}
              target={appUrl ? '_blank' : undefined}
              rel={appUrl ? 'noreferrer' : undefined}
              className={styles.primaryButton}
            >
              {t.cta}
              <ArrowUpRight size={17} />
            </Link>
            <Link href={`/${locale}/features`} className={styles.closingLink}>
              {t.explore}
              <ArrowUpRight size={14} />
            </Link>
            <a href="#story" className={styles.closingLink}>
              {t.view}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <span className={styles.closingFine}>{t.fine}</span>
      </section>
    </div>
  );
}
