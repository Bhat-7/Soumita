import type { Profile } from '@/data/portfolio';
import { ThemeToggle } from './ThemeToggle';
import styles from './Header.module.css';

interface NavItem {
  label: string;
  href: string;
}

export function Header({ profile, nav }: { profile: Profile; nav: NavItem[] }) {
  return (
    <header className={styles.header}>
      <a href="#intro" className={styles.mark} aria-label={`${profile.name} — back to start`}>
        <span className={styles.quad} aria-hidden>
          <span data-hue="cobalt" />
          <span data-hue="tangerine" />
          <span data-hue="magenta" />
          <span data-hue="teal" />
        </span>
        <span className={styles.wordmark}>{profile.shortName.toLowerCase()}.</span>
      </a>

      <nav aria-label="Sections" className={styles.nav}>
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <ThemeToggle />
        <a className={styles.resume} href={profile.resumeHref} download>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
          </svg>
          <span className={styles.resumeText}>Résumé</span>
        </a>
      </div>
    </header>
  );
}
