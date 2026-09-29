import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  HUE_CYCLE,
  type Hue,
  type Profile,
  type Recommendation,
  type Role,
  type SkillGroup,
} from '@/data/portfolio';
import { ContactForm } from './ContactForm';
import styles from './Stations.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (n: number) => String(n).padStart(2, '0');
const cycle = (i: number, offset = 0): Hue => HUE_CYCLE[(i + offset) % HUE_CYCLE.length];

function Pill({ index, children }: { index: number; children: ReactNode }) {
  return (
    <span className={styles.pill}>
      {pad(index)} · {children}
    </span>
  );
}

/**
 * Her photo cut to the logo's petal shape, ringed in the logo's four hues.
 * `size` is the rendered width in px; the source is served resized by next/image.
 */
function Portrait({
  profile,
  size,
  priority = false,
  className,
}: {
  profile: Profile;
  size: 'lg' | 'sm';
  priority?: boolean;
  className?: string;
}) {
  if (!profile.photo) return null;
  const px = size === 'lg' ? 132 : 64;
  return (
    <span className={`${styles.portrait} ${className ?? ''}`} data-size={size}>
      <Image
        src={profile.photo}
        alt={size === 'lg' ? `Portrait of ${profile.name}` : ''}
        width={px}
        height={px}
        sizes={`${px}px`}
        priority={priority}
      />
    </span>
  );
}

/** Bold the figures in a sentence ("50M+ rows") in the station's hue. */
function Emphasise({ text }: { text: string }) {
  const parts = text.split(/(\d[\d,.]*\s?[KMB]?\+?)/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p))}
    </>
  );
}

/* ───────── intro ───────── */

function monthIndex(d: { month: number; year: number }) {
  return d.year * 12 + (d.month - 1);
}

function Journey({ roles }: { roles: Role[] }) {
  const now = new Date();
  const nowIdx = now.getFullYear() * 12 + now.getMonth();
  const startIdx = monthIndex(roles[0].start);
  const span = Math.max(1, nowIdx - startIdx);
  const pct = (m: number) => `${(((m - startIdx) / span) * 100).toFixed(2)}%`;

  const firstYear = roles[0].start.year;
  // a tick every two years; every other one is "minor" and drops out on narrow screens
  const ticks: { label: string; left: string; minor: boolean }[] = [];
  for (let y = firstYear + 2; y < now.getFullYear(); y += 2) {
    ticks.push({ label: String(y), left: pct(y * 12), minor: (y - firstYear) % 4 === 2 });
  }

  return (
    <figure className={styles.journey} aria-label="Career timeline">
      <div className={styles.axis} aria-hidden>
        <span style={{ left: 0 }}>{firstYear}</span>
        {ticks.map((t) => (
          <span key={t.label} style={{ left: t.left }} className={styles.tick} data-minor={t.minor}>
            {t.label}
          </span>
        ))}
        <span style={{ right: 0 }}>Now</span>
      </div>
      {roles.map((r) => {
        const end = r.end === 'present' ? nowIdx : monthIndex(r.end);
        const from = monthIndex(r.start);
        return (
          <div key={r.id} className={styles.lane}>
            <span className={styles.laneLabel}>{r.short}</span>
            <span className={styles.laneTrack}>
              <span
                className={styles.bar}
                data-hue={r.hue}
                style={{ left: pct(from), width: `${(((end - from) / span) * 100).toFixed(2)}%` }}
                title={`${r.company}: ${formatRange(r)}`}
              />
            </span>
          </div>
        );
      })}
    </figure>
  );
}

export function IntroStation({
  profile,
  roles,
  firstStopId,
}: {
  profile: Profile;
  roles: Role[];
  firstStopId: string;
}) {
  // "Data Analyst" → "data analyst", but keep acronyms like "AI" / "BI"
  const soften = (t = '') =>
    t
      .split(' ')
      .map((w) => (w.length > 1 && w === w.toUpperCase() ? w : w.toLowerCase()))
      .join(' ');
  const [first, second, third] = profile.title.split('·').map((t) => t.trim());
  return (
    <div className={styles.stack}>
      <div className={styles.introHead}>
        <Pill index={0}>Start</Pill>
        <h1 className={styles.name}>{profile.name}</h1>
        <Portrait profile={profile} size="lg" priority className={styles.introPortrait} />
      </div>
      <p className={styles.roles}>
        <mark data-hue="cobalt">{first}</mark>, <mark data-hue="tangerine">{soften(second)}</mark> and{' '}
        <mark data-hue="magenta">{soften(third)}</mark>.
      </p>
      <p className={styles.body}>{profile.summary}</p>
      {roles.length > 0 && <Journey roles={roles} />}
      <div className={styles.actions}>
        <a className={styles.buttonContrast} href="#contact">
          Let’s talk data
        </a>
        <a className={styles.buttonSoft} href={`#${firstStopId}`}>
          Start the journey
          <Arrow />
        </a>
      </div>
    </div>
  );
}

/* ───────── roles ───────── */

function formatRange(role: Role) {
  const start = `${MONTHS[role.start.month - 1]} ${role.start.year}`;
  const end = role.end === 'present' ? 'Present' : `${MONTHS[role.end.month - 1]} ${role.end.year}`;
  return `${start} — ${end}`;
}

const HIGHLIGHT_ICONS = [
  // bar chart
  <path key="a" d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  // target
  <g key="b">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
  </g>,
  // trend
  <path key="c" d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
];

export function RoleStation({ role, index }: { role: Role; index: number }) {
  return (
    <article className={styles.role}>
      <header className={styles.band}>
        <span className={styles.bandPill}>
          {pad(index)} · {formatRange(role).toUpperCase()}
        </span>
        <h2 className={styles.bandTitle}>{role.company}</h2>
        <p className={styles.bandRole}>{role.role}</p>
      </header>
      <div className={styles.stack}>
        <p className={styles.body}>{role.description}</p>
        <ul className={styles.highlights}>
          {role.highlights.map((h, i) => (
            <li key={h}>
              <span className={styles.hlIcon} data-hue={i === 0 ? role.hue : cycle(i, 2)} aria-hidden>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                </svg>
              </span>
              <span>
                <Emphasise text={h} />
              </span>
            </li>
          ))}
        </ul>
        <ul className={styles.chips} aria-label="Tools">
          {role.technologies.map((t, i) => (
            <li key={t} data-hue={cycle(i)}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ───────── skills ───────── */

export function SkillsStation({
  index,
  label,
  title,
  groups,
}: {
  index: number;
  label: string;
  title: string;
  groups: SkillGroup[];
}) {
  return (
    <div className={styles.stack}>
      <Pill index={index}>{label}</Pill>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.groups}>
        {groups.map((g) => (
          <section key={g.id} data-hue={g.hue} className={styles.group}>
            <h3 className={styles.groupLabel}>
              <span className={styles.groupDot} aria-hidden />
              {g.label}
              <span className={styles.groupCount}>{g.items.length}</span>
            </h3>
            <ul className={styles.chips}>
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ───────── certifications ───────── */

export function CertificationsStation({ index, items }: { index: number; items: string[] }) {
  return (
    <div className={styles.stack}>
      <Pill index={index}>Credentials</Pill>
      <h2 className={styles.title}>Certified</h2>
      <ol className={styles.certs}>
        {items.map((c, i) => {
          const [issuer, name] = c.includes(': ') ? c.split(': ') : [c.split(' ')[0], c];
          return (
            <li key={c} data-hue={cycle(i, 2)}>
              <span className={styles.certBadge}>{pad(i + 1)}</span>
              <span className={styles.certText}>
                <span className={styles.certName}>{name}</span>
                <span className={styles.certIssuer}>{issuer}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ───────── recommendations ───────── */

export function RecommendationsStation({
  index,
  items,
}: {
  index: number;
  items: Recommendation[];
}) {
  return (
    <div className={styles.stack}>
      <Pill index={index}>In their words</Pill>
      <div className={styles.quotes}>
        {items.map((r, i) => (
          <figure key={r.id} className={styles.quote} data-hue={cycle(i, 1)}>
            <span className={styles.quoteMark} aria-hidden>
              “
            </span>
            <blockquote>{r.text}</blockquote>
            <figcaption>
              <strong>{r.name}</strong>
              <span>{r.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ───────── contact ───────── */

export function ContactStation({
  index,
  profile,
  endpoint,
}: {
  index: number;
  profile: Profile;
  endpoint: string;
}) {
  const { contact } = profile;
  return (
    <div className={styles.stack}>
      <Pill index={index}>Arrival · present day</Pill>
      <div className={styles.contactHead}>
        <Portrait profile={profile} size="sm" />
        <h2 className={styles.title}>Let’s solve it.</h2>
      </div>
      <p className={styles.body}>
        A dashboard that doesn’t put people to sleep, a Power BI vs Tableau debate, or just a hello — no
        query is too complex, unless it’s missing a JOIN.
      </p>
      <ContactForm endpoint={endpoint} />
      <footer className={styles.footer}>
        <a href={`mailto:${contact.email}`} data-hue="cobalt">
          {contact.email}
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" data-hue="teal">
          LinkedIn
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" data-hue="magenta">
          GitHub
        </a>
        <span className={styles.credit}>
          © {new Date().getFullYear()} {profile.name} · Built by{' '}
          <a href={profile.builtBy.href} target="_blank" rel="noreferrer">
            {profile.builtBy.label}
          </a>
        </span>
      </footer>
    </div>
  );
}

function Arrow() {
  return (
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
