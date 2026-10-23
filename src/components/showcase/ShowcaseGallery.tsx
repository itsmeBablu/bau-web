'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type SyntheticEvent,
} from 'react';
import type { Locale } from '@/lib/i18n';
import type { ShowcaseModel } from '@/content/showcase';
import styles from './showcase.module.css';

type ViewerProps = { locale: Locale; model: ShowcaseModel; onClose: () => void };
type ViewerComponent = ComponentType<ViewerProps>;

export function ShowcaseGallery({ locale, models }: { locale: Locale; models: ShowcaseModel[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState<ShowcaseModel | null>(null);
  const [Viewer, setViewer] = useState<ViewerComponent | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const de = locale === 'de';
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (active && !element.open) element.showModal();
    else if (!active && element.open) element.close();
  }, [active]);
  const closeViewer = () => {
    setActive(null);
    setViewer(null);
  };
  const filtered = useMemo(
    () =>
      models.filter((model) => {
        const categoryLabel = de
          ? model.category === 'Civic'
            ? 'Öffentlich'
            : 'Wohnen'
          : model.category;
        const search =
          `${model.title[locale]} ${model.location[locale]} ${model.category} ${categoryLabel} ${model.description[locale]}`.toLocaleLowerCase(
            locale,
          );
        return (
          search.includes(query.toLocaleLowerCase(locale)) &&
          (category === 'all' || model.category === category)
        );
      }),
    [models, locale, query, category, de],
  );

  async function openViewer(model: ShowcaseModel) {
    setActive(model);
    setViewer(null);
    setLoading(true);
    try {
      const viewerModule = await import('./Viewer');
      setViewer(() => viewerModule.Viewer);
    } catch {
      setShareMessage(
        de ? 'Der 3D-Viewer konnte nicht geladen werden.' : 'The 3D viewer could not be loaded.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function share(model: ShowcaseModel) {
    const url = `${window.location.origin}/${locale}/showcase/${model.slug}`;
    try {
      if (navigator.share) await navigator.share({ title: model.title[locale], url });
      else {
        await navigator.clipboard.writeText(url);
        setShareMessage(de ? 'Öffentlicher Link kopiert.' : 'Public link copied.');
      }
    } catch {
      setShareMessage(de ? 'Link konnte nicht kopiert werden.' : 'Could not copy the link.');
    }
  }

  async function copyEmbed(model: ShowcaseModel) {
    const src = `${window.location.origin}/${locale}/showcase/${model.slug}`;
    try {
      await navigator.clipboard.writeText(
        `<iframe src="${src}" title="${model.title[locale]}" loading="lazy" allowfullscreen></iframe>`,
      );
      setShareMessage(
        de
          ? 'Einbettungscode für die öffentliche Modelldetailseite kopiert.'
          : 'Embed code for the public model details page copied.',
      );
    } catch {
      setShareMessage(
        de ? 'Einbettungscode konnte nicht kopiert werden.' : 'Could not copy the embed code.',
      );
    }
  }

  return (
    <>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          {de ? 'Modelle suchen' : 'Search models'}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={de ? 'Name oder Thema' : 'Name or topic'}
          />
        </label>
        <label className={styles.category}>
          {de ? 'Kategorie' : 'Category'}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">{de ? 'Alle' : 'All'}</option>
            <option value="Civic">{de ? 'Öffentlich' : 'Civic'}</option>
            <option value="Residential">{de ? 'Wohnen' : 'Residential'}</option>
          </select>
        </label>
      </div>
      <p className={styles.resultCount} aria-live="polite">
        {filtered.length} {de ? 'Modelle' : filtered.length === 1 ? 'model' : 'models'}
      </p>
      {filtered.length ? (
        <div className={styles.grid}>
          {filtered.map((model) => (
            <article className={`glass-card ${styles.card}`} key={model.slug}>
              <Link
                className={styles.posterLink}
                href={`/${locale}/showcase/${model.slug}`}
                aria-label={`${de ? 'Details ansehen:' : 'View details:'} ${model.title[locale]}`}
              >
                <Image
                  className={styles.poster}
                  src={model.poster}
                  alt={
                    de
                      ? 'Architekturillustration des Hofpavillons'
                      : 'Architectural illustration of the courtyard pavilion'
                  }
                  width={960}
                  height={640}
                />
              </Link>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>
                  <span className={styles.eyebrow}>
                    {de ? (model.category === 'Civic' ? 'Öffentlich' : 'Wohnen') : model.category}
                  </span>
                  <h2>
                    <Link href={`/${locale}/showcase/${model.slug}`}>{model.title[locale]}</Link>
                  </h2>
                  <p>{model.location[locale]}</p>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => openViewer(model)}
                  >
                    {de ? '3D ansehen' : 'View in 3D'}
                  </button>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => void share(model)}
                  >
                    {de ? 'Teilen' : 'Share'}
                  </button>
                  <button
                    className={styles.textButton}
                    type="button"
                    onClick={() => void copyEmbed(model)}
                  >
                    {de ? 'Detailseite einbetten' : 'Embed details'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          {de ? 'Keine Modelle für diese Suche gefunden.' : 'No models match this search.'}
        </p>
      )}
      {shareMessage && (
        <p role="status" className={styles.status}>
          {shareMessage}{' '}
          <button type="button" onClick={() => setShareMessage('')}>
            {de ? 'Schließen' : 'Dismiss'}
          </button>
        </p>
      )}
      <dialog
        ref={dialog}
        className={styles.viewerDialog}
        aria-labelledby="showcase-viewer-title"
        onCancel={(event: SyntheticEvent<HTMLDialogElement>) => {
          event.preventDefault();
          closeViewer();
        }}
        onClose={closeViewer}
      >
        {active && (
          <>
            <h2 id="showcase-viewer-title" className={styles.srOnly}>
              {active.title[locale]}
            </h2>
            {loading && (
              <p className={styles.viewerMessage}>
                {de ? 'Viewer wird geladen …' : 'Loading viewer…'}
              </p>
            )}
            {Viewer && <Viewer locale={locale} model={active} onClose={closeViewer} />}
            {!loading && !Viewer && (
              <div role="alert" className={styles.viewerMessage}>
                <p>{shareMessage}</p>
                <button className="button button-secondary" type="button" onClick={closeViewer}>
                  {de ? 'Schließen' : 'Close'}
                </button>
              </div>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
