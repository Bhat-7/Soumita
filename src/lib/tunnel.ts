/**
 * Pure maths for the scroll-driven tunnel. No DOM access here so it stays unit-testable.
 *
 * Coordinate model
 * ----------------
 * - Every object in the tunnel lives at a depth `z` (px, grows away from the viewer).
 * - The camera sits at depth `cam`. For any object, `d = z - cam` is its distance ahead of the camera.
 *   d > 0 → in front, d < 0 → already passed.
 * - Scroll maps to a continuous "station progress" p ∈ [0, stationCount - 1].
 *   Within each segment the camera dwells on the current station first, then eases to the next.
 */

export const STATION_GAP = 1800; // px of depth between two stations
export const PERSPECTIVE = 1000; // must match the CSS `perspective` on the stage
export const SEGMENT_VH = 115; // viewport-heights of scroll per station
export const DWELL = 0.38; // fraction of each segment where the camera holds still
export const RINGS_PER_GAP = 3;

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Eased position inside one segment: 0 while dwelling, then smooth travel to 1. */
export function segmentEase(t: number): number {
  if (t <= DWELL) return 0;
  return smoothstep(clamp((t - DWELL) / (1 - DWELL)));
}

/** Converts raw station progress into eased station units (fractional index). */
export function easedIndex(progress: number, stationCount: number): number {
  const max = Math.max(0, stationCount - 1);
  const p = clamp(progress, 0, max);
  const i = Math.min(Math.floor(p), max);
  return i + (i === max ? 0 : segmentEase(p - i));
}

export const cameraZ = (progress: number, stationCount: number) =>
  easedIndex(progress, stationCount) * STATION_GAP;

export const stationZ = (index: number) => index * STATION_GAP;

export interface Visual {
  /** true → skip rendering entirely (visibility: hidden) */
  hidden: boolean;
  opacity: number;
  blur: number;
  /** only the station in focus should receive pointer events */
  active: boolean;
}

/** How far ahead a station stays fully opaque before the fog starts. */
const SOLID_AHEAD = 0.6 * STATION_GAP;
/** How far past the camera a station survives. Short, so it never lingers as a magnified ghost. */
const PASSED_FADE = 0.3 * PERSPECTIVE;
/** A passed station stays solid this far, then fades over the rest — a quick, clean handover. */
const PASSED_HOLD = 0.15 * PERSPECTIVE;

/**
 * Stations: crisp at the focal plane, fading into fog ahead, fading out fast once passed.
 * Both ends matter when scrolling back: the station being left must stay solid so nothing
 * behind it shows through, and the one being returned to must only appear near its own
 * plane rather than as an oversized wash across the screen.
 */
export function stationVisual(d: number): Visual {
  const G = STATION_GAP;
  if (d > 3.2 * G || d < -PASSED_FADE) {
    return { hidden: true, opacity: 0, blur: 0, active: false };
  }
  let opacity: number;
  if (d >= 0) {
    // fully opaque while it's the next thing ahead, then fog out towards 3.2G
    opacity = 1 - smoothstep(clamp((d - SOLID_AHEAD) / (3.2 * G - SOLID_AHEAD)));
  } else {
    opacity = 1 - smoothstep(clamp((-d - PASSED_HOLD) / (PASSED_FADE - PASSED_HOLD)));
  }
  const blur = d > 0.25 * G ? Math.min(6, ((d - 0.25 * G) / G) * 3) : 0;
  return {
    hidden: opacity < 0.01,
    opacity: clamp(opacity),
    blur,
    active: Math.abs(d) < 0.2 * G,
  };
}

/**
 * Visuals for every station at once, given each one's distance from the camera.
 * A station that's passing through the camera (d < 0) is translucent, so whatever is
 * ahead of it would show through. Stations ahead are dimmed by however solid that
 * passing station is, which turns the handover into a clean cross-fade in both
 * scroll directions.
 */
export function stationVisuals(distances: number[]): Visual[] {
  const visuals = distances.map(stationVisual);
  const cover = Math.max(0, ...visuals.map((v, i) => (distances[i] < 0 ? v.opacity : 0)));
  if (cover === 0) return visuals;
  return visuals.map((v, i) => {
    if (distances[i] < 0 || v.hidden) return v;
    const opacity = v.opacity * (1 - cover);
    return { ...v, opacity, hidden: opacity < 0.01 };
  });
}

/** Rings: visible from far away, dissolve just before they wrap around the viewer. */
export function ringVisual(d: number): Visual {
  const G = STATION_GAP;
  if (d > 4.2 * G || d < -0.7 * PERSPECTIVE) {
    return { hidden: true, opacity: 0, blur: 0, active: false };
  }
  const far = 1 - smoothstep(clamp((d - 1.2 * G) / (3 * G)));
  const near = d < 0 ? 1 - smoothstep(clamp(-d / (0.7 * PERSPECTIVE))) : 1;
  const opacity = clamp(Math.min(far, near));
  return { hidden: opacity < 0.01, opacity, blur: 0, active: false };
}

/**
 * Year readout for the HUD. Interpolates between the years attached to stations using the same easing
 * as the camera so the counter rolls exactly while you travel.
 */
export function yearAt(progress: number, years: number[]): number {
  if (years.length === 0) return new Date().getFullYear();
  const e = easedIndex(progress, years.length);
  const i = Math.floor(e);
  const next = years[Math.min(i + 1, years.length - 1)];
  return Math.round(lerp(years[i], next, e - i));
}
