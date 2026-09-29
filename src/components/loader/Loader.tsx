'use client';

import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

/** Shortest time the mark stays up, so a fast load reads as a beat rather than a flash. */
const MIN_VISIBLE_MS = 1100;
/** Matches the fade-out transition in Loader.module.css. */
const EXIT_MS = 500;

const pageLoaded = () =>
  document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));

/**
 * Full-screen splash with the header's four-petal mark. Server-rendered so it paints
 * before any JS; only shown while `html.loading` is set (added by the boot script, so
 * no-JS visitors never see it). Rendered after the page in <body>, so this effect runs
 * after the tunnel's own setup — by then the stage is ready to be revealed.
 */
export function Loader({ name }: { name: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const minDelay = new Promise((r) => setTimeout(r, Math.max(0, MIN_VISIBLE_MS - performance.now())));

    Promise.all([pageLoaded(), document.fonts?.ready, minDelay]).then(() => {
      if (cancelled) return;
      document.documentElement.classList.remove('loading');
      setTimeout(() => setDone(true), EXIT_MS);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (done) return null;

  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.mark} aria-hidden>
        <span data-hue="cobalt" />
        <span data-hue="tangerine" />
        <span data-hue="magenta" />
        <span data-hue="teal" />
      </span>
      <span className={styles.wordmark} aria-hidden>
        {name}.
      </span>
      <span className={styles.srOnly}>Loading {name}’s portfolio</span>
    </div>
  );
}
