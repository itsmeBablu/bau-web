'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';
import styles from './public.module.css';

export function UnsubscribeRequest({ locale, token }: { locale: Locale; token: string }) {
  const de = locale === 'de';
  const [state, setState] = useState<'idle' | 'sending' | 'accepted' | 'unavailable'>('idle');
  async function request() {
    setState('sending');
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      setState(response.ok ? 'accepted' : 'unavailable');
    } catch {
      setState('unavailable');
    }
  }
  return (
    <section className={styles.formCard}>
      <span className={styles.formSymbol}>↗</span>
      <h2>{de ? 'Newsletter-Abmeldung' : 'Newsletter unsubscribe'}</h2>
      <p role="status" aria-live="polite">
        {state === 'sending'
          ? de
            ? 'Anfrage wird geprüft…'
            : 'Checking request…'
          : state === 'accepted'
            ? de
              ? 'Die Anfrage wurde angenommen. Prüfen Sie die Bestätigungs-E-Mail; der Abmeldestatus ist noch nicht bestätigt.'
              : 'The request was accepted. Check your confirmation email; unsubscribe status is not yet confirmed.'
            : de
              ? 'Der Abmeldedienst ist nicht konfiguriert. Es wurde keine Abmeldung durchgeführt.'
              : 'The unsubscribe service is not configured. No unsubscribe has been completed.'}
      </p>
      <button
        className="button button-secondary"
        type="button"
        onClick={request}
        disabled={state === 'sending'}
      >
        {de ? 'Abmeldung anfragen' : 'Request unsubscribe'}
      </button>
      <p className={styles.note}>
        {de
          ? 'Die Anfrage wird nur bestätigt, wenn der Dienst sie erfolgreich annimmt.'
          : 'The request is confirmed only if the service accepts it successfully.'}
      </p>
    </section>
  );
}
