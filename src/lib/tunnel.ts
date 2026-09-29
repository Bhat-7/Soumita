/**
 * Pure maths for the scroll-driven tunnel. No DOM access here so it stays unit-testable.
 *
 * Coordinate model
 * ----------------
 * - Every object in the tunnel lives at a depth `z` (px, grows away from the viewer).
 * - The camera sits at depth `cam`. For any object, `d = z - cam` is its distance ahead of the camera.
 *   d > 0 → in front, d < 0 → already passed.
 * - Every object is centred on the tunnel's axis, so perspective is just a uniform scale about
 *   the centre: `depthScale(d)`. That lets the tunnel render with plain 2D transforms — no
 *   preserve-3d, whose layer splitting and huge rasters are what garbled the screen.
 * - When scrolling stops the page settles onto a station (`settleTarget`). The camera doesn't
 *   copy the scroll position; it follows it with a critically damped spring (`followCamera`),
 *   which sets the pace of every trip however the scroll got there — wheel notch, trackpad
 *   flick or a rail click.
 */

export const STATION_GAP = 1800; // px of depth between two stations
export const PERSPECTIVE = 1000; // viewer distance from the focal plane, in the same px as depth
export const SEGMENT_VH = 100; // viewport-heights of scroll per station (one snap point each)
export const RINGS_PER_GAP = 3;

/**
 * Camera timing. The target is first eased (`CAMERA_AIM`, 1/s) and a critically damped spring
 * (`CAMERA_OMEGA`, rad/s) follows it, so every trip eases in and out with no overshoot even when
 * the scroll jumps. Tuned for: one station lands in ~0.87s (within 1%), starts at <10% of its
 * peak speed, three stations take ~1.1s and a full 07 → 00 fly-back ~1.9s.
 */
export const CAMERA_OMEGA = 10;
export const CAMERA_AIM = 10;
/** Speed limit in stations per second, so a long flick back reads as a fly-back, not a blur. */
export const CAMERA_MAX_SPEED = 5;

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Scroll progress (in segments) → where the camera should end up, as a station index. */
export const stationAt = (progress: number, stationCount: number) =>
  clamp(progress, 0, Math.max(0, stationCount - 1));

export const stationZ = (index: number) => index * STATION_GAP;

/** Scrolling this far (px) past a station is enough to mean "take me to the next one". */
export const SETTLE_NUDGE = 40;
/** Quiet time (ms) after the last scroll event before the page settles onto a station. */
export const SETTLE_IDLE_MS = 140;

/**
 * Which station the page should settle on once scrolling stops.
 * `y` is the scroll position within the track, `restY` where it last rested, `seg` px per station.
 * Direction-aware, so a light trackpad swipe moves on instead of springing back — only a nudge
 * smaller than SETTLE_NUDGE returns to where it came from.
 */
export function settleTarget(y: number, restY: number, seg: number, stationCount: number): number {
  const max = Math.max(0, stationCount - 1);
  const p = clamp(y / seg, 0, max);
  const lo = Math.floor(p);
  const hi = Math.ceil(p);
  if (lo === hi) return lo;
  const forward = y >= restY;
  const target = forward
    ? y - lo * seg > SETTLE_NUDGE ? hi : lo
    : hi * seg - y > SETTLE_NUDGE ? lo : hi;
  return clamp(target, 0, max);
}

/** On-screen scale of something `d` px ahead of the camera. 1 at the focal plane. */
export const depthScale = (d: number) => PERSPECTIVE / (PERSPECTIVE + d);

export interface CameraState {
  /** depth, px */
  z: number;
  /** px per second */
  v: number;
  /** eased target the spring is chasing, px */
  aim: number;
}

export const restingCamera = (z: number): CameraState => ({ z, v: 0, aim: z });

/** One step of the camera towards `target` (px of depth), `dt` in seconds. */
export function followCamera(cam: CameraState, target: number, dt: number): CameraState {
  const step = Math.min(dt, 1 / 20); // a stalled frame shouldn't fling the camera
  const aim = cam.aim + (target - cam.aim) * (1 - Math.exp(-CAMERA_AIM * step));
  const w = CAMERA_OMEGA;
  const accel = w * w * (aim - cam.z) - 2 * w * cam.v;
  const limit = CAMERA_MAX_SPEED * STATION_GAP;
  const v = clamp(cam.v + accel * step, -limit, limit);
  const z = cam.z + v * step;
  // within 2px of depth the difference is invisible; stop instead of creeping
  if (Math.abs(target - z) < 2 && Math.abs(v) < 30) return restingCamera(target);
  return { z, v, aim };
}

export interface Visual {
  /** true → skip rendering entirely (display: none) */
  hidden: boolean;
  opacity: number;
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
    return { hidden: true, opacity: 0, active: false };
  }
  let opacity: number;
  if (d >= 0) {
    // fully opaque while it's the next thing ahead, then fog out towards 3.2G
    opacity = 1 - smoothstep(clamp((d - SOLID_AHEAD) / (3.2 * G - SOLID_AHEAD)));
  } else {
    opacity = 1 - smoothstep(clamp((-d - PASSED_HOLD) / (PASSED_FADE - PASSED_HOLD)));
  }
  return {
    hidden: opacity < 0.01,
    opacity: clamp(opacity),
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

/** How far past the camera a ring survives. */
const RING_PASSED = 0.35 * PERSPECTIVE;

/** Rings: visible from far away, dissolve just before they wrap around the viewer. */
export function ringVisual(d: number): Visual {
  const G = STATION_GAP;
  // gone before it's magnified much past 1.5×
  if (d > 4.2 * G || d < -RING_PASSED) {
    return { hidden: true, opacity: 0, active: false };
  }
  const far = 1 - smoothstep(clamp((d - 1.2 * G) / (3 * G)));
  const near = d < 0 ? 1 - smoothstep(clamp(-d / RING_PASSED)) : 1;
  const opacity = clamp(Math.min(far, near));
  return { hidden: opacity < 0.01, opacity, active: false };
}

/** Year readout for the HUD at a (fractional) station index, rolling as the camera travels. */
export function yearAt(at: number, years: number[]): number {
  if (years.length === 0) return new Date().getFullYear();
  const e = stationAt(at, years.length);
  const i = Math.floor(e);
  const next = years[Math.min(i + 1, years.length - 1)];
  return Math.round(lerp(years[i], next, e - i));
}
