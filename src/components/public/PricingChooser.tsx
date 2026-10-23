'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { pricingConfig } from '@/content/pricing';
import styles from './public.module.css';

export function PricingChooser({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  return (
    <>
      <div
        className={styles.billingControl}
        role="group"
        aria-label={de ? 'Abrechnungszeitraum vergleichen' : 'Compare billing interval'}
      >
        <button
          type="button"
          aria-pressed={period === 'monthly'}
          onClick={() => setPeriod('monthly')}
        >
          {de ? 'Monatlich' : 'Monthly'}
        </button>
        <button
          type="button"
          aria-pressed={period === 'annual'}
          onClick={() => setPeriod('annual')}
        >
          {de ? 'Jährlich' : 'Annual'}
        </button>
        <span>
          {de
            ? `Entwurfsansicht · ${period === 'monthly' ? 'monatlich' : 'jährlich'}`
            : `Draft view · ${period}`}
        </span>
      </div>
      <div className={styles.plans}>
        {pricingConfig.plans.map((plan, index) => (
          <article
            key={plan.id}
            className={`${styles.plan} ${index === 1 ? styles.featuredPlan : ''}`}
          >
            <span className={styles.planLabel}>
              {de ? 'Entwurf · nicht freigegeben' : 'Draft · unapproved'}
            </span>
            <h2>{plan.name[locale]}</h2>
            <p className={styles.planPrice}>
              {period === 'monthly'
                ? de
                  ? 'Monatspreis: TBD'
                  : 'Monthly price: TBD'
                : de
                  ? 'Jahrespreis: TBD'
                  : 'Annual price: TBD'}
            </p>
            <p>
              {de
                ? `Vorgesehener Vergleichszeitraum: ${period === 'monthly' ? 'monatlich' : 'jährlich'}.`
                : `Draft comparison period: ${period}.`}
            </p>
            <ul>
              {plan.features[locale].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <dl className={styles.planLimits}>
              <div>
                <dt>{de ? 'Funktionslimits' : 'Feature limits'}</dt>
                <dd>{pricingConfig.featureLimits ? '—' : 'TBD'}</dd>
              </div>
              <div>
                <dt>{de ? 'KI-Credits' : 'AI credits'}</dt>
                <dd>{pricingConfig.aiCredits ? '—' : 'TBD'}</dd>
              </div>
            </dl>
            <span className={styles.draftCta}>
              {de ? 'Noch nicht verfügbar' : 'Not available yet'}
            </span>
          </article>
        ))}
      </div>
    </>
  );
}
