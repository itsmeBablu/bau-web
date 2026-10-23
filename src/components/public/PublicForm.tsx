'use client';

import { useState, type FormEvent } from 'react';
import type { Locale } from '@/lib/i18n';
import styles from './public.module.css';

export function PublicForm({
  endpoint,
  kind,
  locale,
}: {
  endpoint: string;
  kind: 'newsletter' | 'inquiry';
  locale: Locale;
}) {
  const de = locale === 'de';
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'unavailable' | 'error'>(
    'idle',
  );
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    setError('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setState('success');
        form.reset();
      } else if (response.status === 503 || response.status === 404) setState('unavailable');
      else {
        setState('error');
        setError(
          de
            ? 'Die Anfrage konnte nicht verarbeitet werden. Bitte versuchen Sie es später erneut.'
            : 'The request could not be processed. Please try again later.',
        );
      }
    } catch {
      setState('unavailable');
    }
  }
  const feedback =
    state === 'success'
      ? kind === 'newsletter'
        ? de
          ? 'Anfrage angenommen. Bitte prüfen Sie Ihre E-Mail, um die Anmeldung zu bestätigen.'
          : 'Request accepted. Check your email to confirm your subscription.'
        : de
          ? 'Ihre Anfrage wurde angenommen.'
          : 'Your inquiry has been accepted.'
      : state === 'unavailable'
        ? de
          ? 'Der Dienst ist momentan nicht verfügbar. Es wurden keine Daten als übermittelt bestätigt.'
          : 'The service is currently unavailable. Your data has not been confirmed as submitted.'
        : error;
  return (
    <form className={styles.form} onSubmit={submit}>
      <p className={styles.serviceNotice} role="note">
        {de
          ? 'Der Dienst ist derzeit nicht konfiguriert. Dieses Formular ist eine Vorschau; geben Sie keine sensiblen Informationen ein. Eine Übermittlung ist aktuell nicht möglich.'
          : 'This service is not currently configured. This form is a preview; do not enter sensitive information. Submission is currently unavailable.'}
      </p>
      {kind === 'newsletter' ? (
        <label>
          {de ? 'E-Mail-Adresse' : 'Email address'}
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
      ) : (
        <>
          <div className={styles.formRow}>
            <label>
              {de ? 'Name' : 'Name'}
              <input name="name" type="text" autoComplete="name" required maxLength={120} />
            </label>
            <label>
              {de ? 'Geschäftliche E-Mail' : 'Work email'}
              <input name="email" type="email" autoComplete="email" required maxLength={254} />
            </label>
          </div>
          <label>
            {de ? 'Organisation' : 'Organisation'}
            <input name="organisation" type="text" autoComplete="organization" maxLength={160} />
          </label>
          <label>
            {de ? 'Worum geht es?' : 'What would you like to discuss?'}
            <textarea name="message" rows={5} required maxLength={4000} />
          </label>
        </>
      )}
      {kind === 'newsletter' && (
        <label className={styles.consent}>
          <input name="consent" type="checkbox" required value="yes" />
          <span>
            {de
              ? 'Ich möchte Produktneuigkeiten erhalten und kann mich jederzeit abmelden.'
              : 'I agree to receive product news and can unsubscribe at any time.'}
          </span>
        </label>
      )}
      <button className="button button-primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending'
          ? de
            ? 'Wird gesendet…'
            : 'Sending…'
          : kind === 'newsletter'
            ? de
              ? 'Anmeldung anfragen'
              : 'Request subscription'
            : de
              ? 'Anfrage senden'
              : 'Send inquiry'}
      </button>
      <p
        className={styles.feedback}
        aria-live="polite"
        role={state === 'error' || state === 'unavailable' ? 'alert' : 'status'}
      >
        {feedback}
      </p>
    </form>
  );
}
