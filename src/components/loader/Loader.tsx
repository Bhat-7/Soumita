'use client';

import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

/** Shortest time the mark stays up, so a fast load reads as a beat rather than a flash. */
const MIN_VISIBLE_MS = 1100;
/** How long the welcome line holds once loading finishes, unless the visitor skips it. */
const GREETING_MS = 9_000;
/** Matches the fade-out transition in Loader.module.css. */
const EXIT_MS = 500;

const SKIP_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchmove'] as const;

const pageLoaded = () =>
  document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));

/**
 * Full-screen splash with the header's four-petal mark. Server-rendered so it paints
 * before any JS; only shown while `html.loading` is set (added by the boot script, so
 * no-JS visitors never see it). Rendered after the page in <body>, so this effect runs
 * after the tunnel's own setup — by then the stage is ready to be revealed.
 *
 * Once ready, the wordmark gives way to a welcome line held by `html.greeting` (separate
 * from `loading`, so the boot script's 10s failsafe can't cut it short). Any click, key
 * or scroll skips straight to the site.
 */
export function Loader({ name }: { name: string }) {
  const [phase, setPhase] = useState<'loading' | 'greeting' | 'done'>('loading');

  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const exit = () => {
      clearTimeout(holdTimer);
      SKIP_EVENTS.forEach((e) => window.removeEventListener(e, exit));
      root.classList.remove('greeting');
      exitTimer = setTimeout(() => setPhase('done'), EXIT_MS);
    };

    const minDelay = new Promise((r) => setTimeout(r, Math.max(0, MIN_VISIBLE_MS - performance.now())));

    Promise.all([pageLoaded(), document.fonts?.ready, minDelay]).then(() => {
      if (cancelled) return;
      root.classList.add('greeting');
      root.classList.remove('loading');
      setPhase('greeting');
      holdTimer = setTimeout(exit, GREETING_MS);
      SKIP_EVENTS.forEach((e) => window.addEventListener(e, exit, { passive: true }));
    });

    return () => {
      cancelled = true;
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      SKIP_EVENTS.forEach((e) => window.removeEventListener(e, exit));
      root.classList.remove('greeting');
    };
  }, []);

  if (phase === 'done') return null;

  const greeting = phase === 'greeting';

  return (
    <div className={styles.loader} data-phase={phase} role="status" aria-live="polite">
      <span className={styles.mark} aria-hidden>
        <span data-hue="cobalt" />
        <span data-hue="tangerine" />
        <span data-hue="magenta" />
        <span data-hue="teal" />
      </span>
      {greeting ? (
        <p className={styles.greeting}>Hi. Welcome to my site.</p>
      ) : (
        <>
          <span className={styles.wordmark} aria-hidden>
            {name}.
          </span>
          <span className={styles.srOnly}>Loading {name}’s portfolio</span>
        </>
      )}
    </div>
  );
}
