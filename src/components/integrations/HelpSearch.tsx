'use client';

import { useMemo, useState } from 'react';
import type { HelpTopic } from '@/content/help';
import styles from './integrations.module.css';

export function HelpSearch({ topics, locale }: { topics: HelpTopic[]; locale: 'en' | 'de' }) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return topics.filter((topic) =>
      words.every((word) =>
        `${topic.title} ${topic.summary} ${topic.source}`.toLocaleLowerCase().includes(word),
      ),
    );
  }, [query, topics]);
  const copy =
    locale === 'de'
      ? {
          label: 'Hilfe durchsuchen',
          placeholder: 'Thema eingeben',
          count: 'Themen gefunden',
          empty: 'Keine passenden Themen. Prüfe die Suchbegriffe.',
        }
      : {
          label: 'Search help',
          placeholder: 'Enter a topic',
          count: 'topics found',
          empty: 'No matching topics. Try another search.',
        };

  return (
    <div className={styles.helpSearch}>
      <label className={styles.searchLabel} htmlFor="help-query">
        {copy.label}
      </label>
      <input
        id="help-query"
        className={styles.searchInput}
        type="search"
        placeholder={copy.placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p className={styles.resultCount} aria-live="polite">
        {results.length} {copy.count}
      </p>
      {results.length ? (
        <div className={styles.topicGrid}>
          {results.map((topic) => (
            <article className={`card ${styles.topic}`} key={topic.title}>
              <h2>{topic.title}</h2>
              <p>{topic.summary}</p>
              <a href={topic.href} target="_blank" rel="noreferrer">
                {topic.source} ↗
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>{copy.empty}</p>
      )}
    </div>
  );
}
