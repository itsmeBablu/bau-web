'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Locale } from '@/lib/i18n';
import { motionDuration, motionEase } from '@/lib/motion';
import { appUrl, getAppLink } from '@/lib/config';
import type { HomeCopy } from './HomePage';
import styles from './Home.module.css';

const ArchitecturalScene = dynamic(() => import('./ArchitecturalScene'), {
  ssr: false,
  loading: () => null,
});

function motionSnapshot() {
  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  );
}
function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

export default function HomeExperience({ locale, t }: { locale: Locale; t: HomeCopy }) {
  const storyRef = useRef<HTMLElement>(null);
  const loadScene = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const [progress, setProgress] = useState(0);
  const activeStage = Math.min(7, Math.floor(progress));
  const appLink = getAppLink(locale);

  useEffect(() => {
    const root = storyRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>('[data-story-stage]')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let cleanup = () => {};
    let observer: IntersectionObserver | null = null;
    if (reduce) {
      const ratios = new Map<HTMLElement, number>();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) =>
            ratios.set(entry.target as HTMLElement, entry.intersectionRatio),
          );
          const current = cards.reduce(
            (best, card, index) =>
              (ratios.get(card) ?? 0) > (ratios.get(cards[best]) ?? 0) ? index : best,
            0,
          );
          setProgress(current);
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-22% 0px -28% 0px' },
      );
      cards.forEach((card) => observer?.observe(card));
    }
    if (!reduce) {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
        .then(([gsapModule, triggerModule]) => {
          if (disposed) return;
          const gsap = gsapModule.gsap;
          const ScrollTrigger = triggerModule.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);
          const context = gsap.context(() => {
            ScrollTrigger.create({
              trigger: root,
              start: 'top 70%',
              end: 'bottom 70%',
              onUpdate: (self) => setProgress(self.progress * 7),
            });
            cards.forEach((card) => {
              gsap.fromTo(
                card.querySelectorAll('[data-reveal]'),
                { y: 26, opacity: 0.25 },
                {
                  y: 0,
                  opacity: 1,
                  duration: motionDuration.reveal,
                  ease: motionEase.enter,
                  stagger: 0.08,
                  scrollTrigger: { trigger: card, start: 'top 76%', once: true },
                },
              );
            });
          }, root);
          cleanup = () => context.revert();
        })
        .catch(() => {
          if (disposed) return;
          const ratios = new Map<HTMLElement, number>();
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) =>
                ratios.set(entry.target as HTMLElement, entry.intersectionRatio),
              );
              const current = cards.reduce(
                (best, card, index) =>
                  (ratios.get(card) ?? 0) > (ratios.get(cards[best]) ?? 0) ? index : best,
                0,
              );
              setProgress(current);
            },
            { threshold: [0, 0.1, 0.25, 0.5], rootMargin: '-22% 0px -28% 0px' },
          );
          cards.forEach((card) => observer?.observe(card));
        });
    }
    return () => {
      disposed = true;
      observer?.disconnect();
      cleanup();
    };
  }, []);

  return (
    <>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}>
              <span className={styles.kickerDot} />
              {t.eyebrow}
            </div>
            <h1 id="home-title">{t.title}</h1>
            <p className={styles.heroIntro}>{t.intro}</p>
            <div className={styles.heroActions}>
              <Link
                className={styles.primaryButton}
                href={appLink}
                target={appUrl ? '_blank' : undefined}
                rel={appUrl ? 'noreferrer' : undefined}
              >
                {t.start}
                <ArrowUpRight size={17} />
              </Link>
              <a className={styles.textLink} href="#story">
                <span className={styles.playIcon}>
                  <ArrowDown size={15} />
                </span>
                {t.watch}
              </a>
            </div>
            <div className={styles.heroMeta}>
              <span>{t.meta[0]}</span>
              <i /> <span>{t.meta[1]}</span>
              <i /> <span>{t.meta[2]}</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.visualOrb} />
            <div className={styles.visualGrid} />
            <Image
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 55vw"
              className={styles.heroPoster}
              src="/home/atelier-poster.svg"
              alt={
                locale === 'de'
                  ? 'Architekturkonzept als Gebäudemodell'
                  : 'Architectural concept shown as a building model'
              }
            />
            <div className={styles.visualLabel}>
              <span>{t.modelTag}</span>
              <b>SB / 01</b>
            </div>
            <div className={styles.visualCoordinates}>
              48°08′N
              <br />
              11°34′E
            </div>
            <div className={styles.visualCaption}>{t.modelCaption}</div>
          </div>
        </div>
        <a href="#story" className={styles.scrollCue}>
          <span>{t.cue}</span>
          <span className={styles.scrollLine} />
        </a>
      </section>

      <section
        className={styles.story}
        id="story"
        ref={storyRef}
        data-story-progress={progress.toFixed(2)}
        data-active-stage={activeStage}
        aria-label={locale === 'de' ? 'Gebäude im Aufbau' : 'Building, assembled'}
      >
        <div className={styles.storyAside}>
          <div className={styles.storySticky}>
            <span className={styles.sectionIndex}>{t.storyLabel}</span>
            <div
              className={styles.storyModel}
              data-scene-host
              data-scene-ready="false"
              data-scene-progress={progress.toFixed(2)}
              data-scene-stage={activeStage}
              role="img"
              aria-label={t.modelCaption}
            >
              <Image
                fill
                priority
                unoptimized
                sizes="(max-width: 900px) 55vw, 35vw"
                className={styles.storyPoster}
                src="/home/atelier-poster.svg"
                alt=""
              />
              {loadScene && <ArchitecturalScene progress={progress} label={t.modelCaption} />}
            </div>
            <div className={styles.stageReadout}>
              <span>{t.stages[activeStage][0]}</span>
              <i />
              08
            </div>
            <p>{t.storyAside}</p>
            <div
              className={styles.stageDots}
              aria-label={locale === 'de' ? 'Projektphasen' : 'Project stages'}
            >
              {t.stages.map((stage, index) => (
                <a
                  key={stage[0]}
                  href={`#stage-${index + 1}`}
                  aria-label={`${stage[0]} ${stage[1]}`}
                  aria-current={activeStage === index ? 'step' : undefined}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.storyStages}>
          {t.stages.map((stage, index) => (
            <article
              className={styles.storyStage}
              id={`stage-${index + 1}`}
              data-story-stage
              key={stage[0]}
            >
              <span className={styles.stageNumber} data-reveal>
                {stage[0]} <i />
              </span>
              <h2 data-reveal>{stage[1]}</h2>
              <p data-reveal>{stage[2]}</p>
              {index === 4 && (
                <span className={styles.mepNote}>
                  <span />
                  {t.mepNote}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
