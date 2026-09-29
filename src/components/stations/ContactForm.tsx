'use client';

import { useState, type FormEvent } from 'react';
import styles from './Stations.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <p className={styles.formDone} role="status">
        Message received — expect a reply faster than a well-indexed query.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={2} required />
      </label>
      <div className={styles.formFoot}>
        <p className={styles.formError} role="alert">
          {status === 'error' ? 'That didn’t go through. Try again, or email directly.' : ''}
        </p>
        <button type="submit" className={styles.buttonPrimary} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  );
}
