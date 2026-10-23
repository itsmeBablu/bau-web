'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { PluginRoadmap } from '@/content/plugins';
import styles from './plugins.module.css';
export function PluginDirectory({ locale, entries }: { locale: Locale; entries: PluginRoadmap[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const de = locale === 'de';
  const filtered = useMemo(
    () =>
      entries.filter((item) => {
        const categoryLabel = de
          ? item.category === 'Design tools'
            ? 'Designwerkzeuge'
            : item.category === 'Data exchange'
              ? 'Datenaustausch'
              : 'Workflow'
          : item.category;
        return (
          `${item.name[locale]} ${item.summary[locale]} ${item.category} ${categoryLabel}`
            .toLocaleLowerCase(locale)
            .includes(query.toLocaleLowerCase(locale)) &&
          (category === 'all' || category === item.category)
        );
      }),
    [entries, locale, query, category, de],
  );
  return (
    <>
      <div className={styles.toolbar}>
        <label>
          {de ? 'Plugins suchen' : 'Search plugins'}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={de ? 'Name oder Kategorie' : 'Name or category'}
          />
        </label>
        <label>
          {de ? 'Kategorie' : 'Category'}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">{de ? 'Alle Kategorien' : 'All categories'}</option>
            {Array.from(new Set(entries.map((x) => x.category))).map((x) => (
              <option key={x} value={x}>
                {de
                  ? x === 'Design tools'
                    ? 'Designwerkzeuge'
                    : x === 'Data exchange'
                      ? 'Datenaustausch'
                      : 'Workflow'
                  : x}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p aria-live="polite" className={styles.count}>
        {filtered.length} {de ? 'Konzepte' : 'concepts'}
      </p>
      <div className={styles.grid}>
        {filtered.map((plugin) => (
          <article className={`glass-card ${styles.card}`} key={plugin.slug}>
            <div className={styles.cardHead}>
              <span className="eyebrow">
                {de
                  ? plugin.category === 'Design tools'
                    ? 'Designwerkzeuge'
                    : plugin.category === 'Data exchange'
                      ? 'Datenaustausch'
                      : 'Workflow'
                  : plugin.category}
              </span>
              <span className={styles.badge}>
                {plugin.status === 'Planned'
                  ? de
                    ? 'Geplant'
                    : 'Planned'
                  : de
                    ? 'In Prüfung'
                    : 'Exploring'}
              </span>
            </div>
            <h2>
              <Link href={`/${locale}/plugins/${plugin.slug}`}>{plugin.name[locale]}</Link>
            </h2>
            <p>{plugin.summary[locale]}</p>
            <Link className="button button-secondary" href={`/${locale}/plugins/${plugin.slug}`}>
              {de ? 'Details' : 'Details'} →
            </Link>
          </article>
        ))}
      </div>
      {!filtered.length && <p>{de ? 'Keine passenden Konzepte.' : 'No matching concepts.'}</p>}
    </>
  );
}
