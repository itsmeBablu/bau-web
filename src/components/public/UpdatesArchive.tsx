'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import styles from './public.module.css';

type Entry = { date: string; title: string; body: string; href: string };
export function UpdatesArchive({ locale, entries }: { locale: Locale; entries: readonly Entry[] }) {
  const de = locale === 'de';
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale === 'de' ? 'de-DE' : 'en-US');
    if (!term) return entries;
    return entries.filter((entry) =>
      `${entry.title} ${entry.body} ${entry.date}`
        .toLocaleLowerCase(locale === 'de' ? 'de-DE' : 'en-US')
        .includes(term),
    );
  }, [entries, locale, query]);
  return (
    <>
      <label className={styles.searchField}>
        {de ? 'Updates durchsuchen' : 'Search updates'}
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder={de ? 'Titel, Inhalt oder Datum' : 'Title, text or date'}
        />
      </label>
      {filtered.length ? (
        <div className={styles.timeline}>
          {filtered.map((entry) => (
            <article key={entry.title} className={styles.timelineEntry}>
              <time dateTime={entry.date}>
                {new Date(`${entry.date}T12:00:00Z`).toLocaleDateString(
                  locale === 'de' ? 'de-DE' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
                )}
              </time>
              <div>
                <h2>{entry.title}</h2>
                <p>{entry.body}</p>
                <a href={entry.href} target="_blank" rel="noreferrer">
                  {de ? 'Quelländerung ansehen' : 'View source change'} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyArchive} role="status">
          {query
            ? de
              ? 'Keine Updates entsprechen Ihrer Suche.'
              : 'No updates match your search.'
            : de
              ? 'Das Archiv enthält derzeit keine Einträge.'
              : 'The archive has no entries yet.'}
        </p>
      )}
    </>
  );
}
