'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  RINGS_PER_GAP,
  SEGMENT_VH,
  SETTLE_IDLE_MS,
  STATION_GAP,
  depthScale,
  followCamera,
  restingCamera,
  ringVisual,
  settleTarget,
  stationAt,
  stationVisuals,
  stationZ,
  yearAt,
  type Visual,
} from '@/lib/tunnel';
import { HUE_CYCLE, type Hue } from '@/data/portfolio';
import styles from './TimeTunnel.module.css';

export interface TunnelStation {
  id: string;
  /** short label for the station rail, e.g. "TCS" */
  label: string;
  /** caption under the HUD year, e.g. "Tata Consultancy Services" */
  caption: string;
  year: number;
  hue: Hue;
  content: ReactNode;
}

interface TimeTunnelProps {
  stations: TunnelStation[];
  presentYear: number;
}

const RINGS_BEFORE = 2;
const RINGS_AFTER = 4 * RINGS_PER_GAP;

/**
 * Places one tunnel object `d` px ahead of the camera. Everything sits on the tunnel's axis,
 * so perspective is a plain scale about the centre; nearer objects stack on top.
 */
function applyVisual(el: HTMLElement | null, v: Visual, d: number) {
  if (!el) return;
  // out of range → out of the layout entirely, so the browser keeps nothing around for it
  el.style.display = v.hidden ? 'none' : '';
  el.style.visibility = v.hidden ? 'hidden' : 'visible';
  if (v.hidden) return;
  el.style.transform = `translate(-50%, -50%) scale(${depthScale(d).toFixed(4)})`;
  el.style.zIndex = String(Math.round(20000 - d));
  el.style.opacity = v.opacity.toFixed(3);
}

const isTunnelMode = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('tunnel');

export function TimeTunnel({ stations, presentYear }: TimeTunnelProps) {
  const count = stations.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLElement | null)[]>([]);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const snapRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const yearRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const years = stations.map((s) => s.year);
  const ringStart = -RINGS_BEFORE;
  const ringEnd = (count - 1) * RINGS_PER_GAP + RINGS_AFTER;
  const rings = Array.from({ length: ringEnd - ringStart + 1 }, (_, i) => ringStart + i);

  // measured from the station markers, so JS and CSS always agree (100vh ≠ innerHeight on mobile)
  const segmentPx = () =>
    snapRefs.current[1]?.offsetTop || (window.innerHeight * SEGMENT_VH) / 100;

  /** Where the page last came to rest on a station, and whether we're gliding there now. */
  const settle = useRef({ restY: 0, gliding: false });

  const scrollToStation = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const i = Math.max(0, Math.min(count - 1, index));
      const id = stations[i]?.id;
      if (!isTunnelMode()) {
        document.getElementById(id)?.scrollIntoView({ behavior });
      } else {
        const top = (trackRef.current?.offsetTop ?? 0) + i * segmentPx();
        settle.current = { restY: top, gliding: behavior === 'smooth' };
        window.scrollTo({ top, behavior });
      }
      if (id) history.replaceState(null, '', `#${id}`);
    },
    [count, stations],
  );

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let last = 0;
    // null until the first frame, which places the camera without flying there
    let camera: ReturnType<typeof restingCamera> | null = null;

    const render = (now: number) => {
      frame = 0;
      if (!isTunnelMode()) return;
      const track = trackRef.current;
      if (!track) return;

      const progress = Math.max(0, (window.scrollY - track.offsetTop) / segmentPx());
      const target = stationAt(progress, count) * STATION_GAP;
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      camera = camera ? followCamera(camera, target, dt) : restingCamera(target);
      const cam = camera.z;
      const at = cam / STATION_GAP;

      const distances = stationRefs.current.map((_, i) => stationZ(i) - cam);
      const visuals = stationVisuals(distances);
      stationRefs.current.forEach((el, i) => {
        const v = visuals[i];
        applyVisual(el, v, distances[i]);
        if (el) {
          el.style.pointerEvents = v.active ? 'auto' : 'none';
          el.dataset.active = String(v.active);
        }
      });

      ringRefs.current.forEach((el, i) => {
        const d = (rings[i] * STATION_GAP) / RINGS_PER_GAP - cam;
        applyVisual(el, ringVisual(d), d);
      });

      if (yearRef.current) yearRef.current.textContent = String(yearAt(at, years));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, at / Math.max(1, count - 1))})`;
      }

      // keep animating until the camera has landed
      if (camera.z !== target || camera.v !== 0) schedule();
      else last = 0;

      const nearest = Math.round(at);
      if (nearest !== activeRef.current) {
        activeRef.current = nearest;
        setActive(nearest);
        // keep the address in step with the camera, so a reload or shared link lands here
        const id = stations[nearest]?.id;
        history.replaceState(null, '', nearest === 0 || !id ? location.pathname + location.search : `#${id}`);
      }
    };

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    const sizeRings = () => {
      const r = Math.max(420, Math.max(window.innerWidth, window.innerHeight) * 0.62);
      root.style.setProperty('--tunnel-r', `${Math.round(r)}px`);
      schedule();
    };

    const onMotionChange = () => {
      root.classList.toggle('tunnel', !reduce.matches);
      if (reduce.matches) {
        // hand control back to normal document flow
        stationRefs.current.forEach((el) => el?.removeAttribute('style'));
        camera = null;
      }
      schedule();
    };

    // Once scrolling goes quiet, glide onto a station so the camera never parks between two.
    let idle = 0;
    const settleNow = () => {
      const track = trackRef.current;
      if (!track || !isTunnelMode()) return;
      const seg = segmentPx();
      const y = window.scrollY - track.offsetTop;
      const i = settleTarget(y, settle.current.restY - track.offsetTop, seg, count);
      const top = track.offsetTop + i * seg;
      settle.current = { restY: top, gliding: Math.abs(window.scrollY - top) > 1 };
      if (settle.current.gliding) window.scrollTo({ top, behavior: 'smooth' });
    };
    const onScroll = () => {
      schedule();
      const s = settle.current;
      if (s.gliding) {
        // our own glide: done once it arrives
        if (Math.abs(window.scrollY - s.restY) < 1) s.gliding = false;
        return;
      }
      clearTimeout(idle);
      idle = window.setTimeout(settleNow, SETTLE_IDLE_MS);
    };
    // any new input from the visitor takes over from a glide in progress
    const takeOver = () => {
      settle.current.gliding = false;
    };
    const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;

    sizeRings();
    settle.current = { restY: window.scrollY, gliding: false };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', sizeRings);
    inputs.forEach((t) => window.addEventListener(t, takeOver, { passive: true }));
    reduce.addEventListener('change', onMotionChange);

    // deep links: /#contact
    const fromHash = stations.findIndex((s) => `#${s.id}` === window.location.hash);
    if (fromHash > 0) requestAnimationFrame(() => scrollToStation(fromHash, 'instant'));

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sizeRings);
      inputs.forEach((t) => window.removeEventListener(t, takeOver));
      reduce.removeEventListener('change', onMotionChange);
    };
    // rings/years are derived from `count`/`stations`; re-running on those is intended
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, stations, scrollToStation]);

  // In-page anchors (#contact, #intro …) can't use native jumping inside the sticky 3D stage.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !isTunnelMode()) return;
      const i = stations.findIndex((s) => `#${s.id}` === a.getAttribute('href'));
      if (i === -1) return;
      e.preventDefault();
      scrollToStation(i);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [stations, scrollToStation]);

  // ←/→ and [ ] jump between stations without stealing keys from form fields
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'ArrowRight' || e.key === ']') scrollToStation(activeRef.current + 1);
      if (e.key === 'ArrowLeft' || e.key === '[') scrollToStation(activeRef.current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [scrollToStation]);

  const trackStyle = { '--station-count': count, '--segment-vh': SEGMENT_VH } as CSSProperties;

  return (
    <>
      <div ref={trackRef} className={styles.track} style={trackStyle}>
        <div className={styles.stage}>
          <div className={styles.world}>
            {rings.map((k, i) => {
              const stationIndex = k % RINGS_PER_GAP === 0 ? k / RINGS_PER_GAP : -1;
              const station = stations[stationIndex];
              // four hue segments per ring, shifted every ring so the tunnel reads like stacked donut charts
              const seg = (n: number) => `var(--${HUE_CYCLE[(((k + n) % 5) + 5) % 5]})`;
              return (
                <div
                  key={`ring-${k}`}
                  ref={(el) => {
                    ringRefs.current[i] = el;
                  }}
                  aria-hidden
                  className={station ? `${styles.ring} ${styles.ringMajor}` : styles.ring}
                  style={
                    {
                      '--spin': `${k * 37}deg`,
                      '--s1': seg(0),
                      '--s2': seg(1),
                      '--s3': seg(2),
                      '--s4': seg(3),
                    } as CSSProperties
                  }
                >
                  {station && stationIndex > 0 && (
                    <span className={styles.ringLabel} data-hue={station.hue}>
                      <span className={styles.ringDot} />
                      {station.label} · {station.year >= presentYear ? 'now' : station.year}
                    </span>
                  )}
                </div>
              );
            })}

            {stations.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => {
                  stationRefs.current[i] = el;
                }}
                aria-label={s.caption}
                className={styles.station}
                data-hue={s.hue}
                onFocusCapture={() => {
                  if (isTunnelMode() && activeRef.current !== i) scrollToStation(i);
                }}
              >
                {s.content}
              </section>
            ))}
          </div>
          <div aria-hidden className={styles.fog} />
        </div>
        {/* one marker per station, a segment apart: where the page settles, and how long a segment is */}
        {stations.map((s, i) => (
          <span
            key={`snap-${s.id}`}
            aria-hidden
            ref={(el) => {
              snapRefs.current[i] = el;
            }}
            className={styles.snap}
            style={{ '--i': i } as CSSProperties}
          />
        ))}
      </div>

      <nav aria-label="Journey" className={styles.journey}>
        <ol>
          {stations.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-hue={s.hue}
                aria-label={`${String(i).padStart(2, '0')} ${s.label}`}
                aria-current={active === i ? 'step' : undefined}
              >
                <span className={styles.stepLabel}>{s.label}</span>
                <span className={styles.step}>{String(i).padStart(2, '0')}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={styles.readout} aria-hidden>
        <span ref={yearRef} className={styles.year}>
          {stations[0]?.year}
        </span>
        <span className={styles.caption}>
          <span className={styles.captionMain}>{stations[active]?.caption}</span>
          <span className={styles.captionStep}>
            stop {String(active).padStart(2, '0')} / {String(count - 1).padStart(2, '0')}
          </span>
        </span>
      </div>

      <div
        aria-hidden
        className={styles.hint}
        data-visible={active === 0}
      >
        Scroll to travel
        <span className={styles.hintLine} />
      </div>

      <div aria-hidden className={styles.progress} data-hue={stations[active]?.hue}>
        <div ref={barRef} className={styles.progressBar} />
      </div>
    </>
  );
}
