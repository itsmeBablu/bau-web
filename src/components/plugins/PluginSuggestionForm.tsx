'use client';
import { useState, type FormEvent } from 'react';
import type { Locale } from '@/lib/i18n';
import styles from './plugins.module.css';
export function PluginSuggestionForm({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus('');
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/plugin-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
        }),
      });
      if (!response.ok) throw new Error('unavailable');
      setStatus(de ? 'Vorschlag wurde gesendet.' : 'Suggestion submitted.');
      event.currentTarget.reset();
    } catch {
      setStatus(
        de
          ? 'Der Einreichungsdienst ist derzeit nicht verfügbar. Es wurde nichts gespeichert.'
          : 'The submission service is currently unavailable. Nothing was stored.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <label>
        {de ? 'Idee oder Plugin-Name' : 'Idea or plugin name'}
        <input name="name" required minLength={2} maxLength={120} />
      </label>
      <label>
        {de ? 'Kontakt-E-Mail' : 'Contact email'}
        <input name="email" type="email" required maxLength={254} />
      </label>
      <button className="button button-primary" type="submit" disabled={busy}>
        {busy
          ? de
            ? 'Wird geprüft …'
            : 'Checking…'
          : de
            ? 'Vorschlag senden'
            : 'Submit suggestion'}
      </button>
      <p>
        {de
          ? 'Du erhältst eine klare Statusmeldung. Der Dienst ist noch nicht aktiviert.'
          : 'You will get an honest status message. The service is not active yet.'}
      </p>
      {status && (
        <p role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}
