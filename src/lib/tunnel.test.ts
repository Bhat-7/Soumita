import { describe, expect, it } from 'vitest';
import {
  CAMERA_MAX_SPEED,
  STATION_GAP,
  depthScale,
  followCamera,
  restingCamera,
  settleTarget,
  ringVisual,
  stationAt,
  stationVisual,
  stationVisuals,
  yearAt,
  type CameraState,
} from './tunnel';

/** Runs the camera spring at 60fps; returns every frame. */
function fly(from: number, to: number, seconds = 3): CameraState[] {
  const frames: CameraState[] = [];
  let cam: CameraState = restingCamera(from);
  for (let t = 0; t < seconds; t += 1 / 60) {
    cam = followCamera(cam, to, 1 / 60);
    frames.push(cam);
  }
  return frames;
}

describe('scroll → station', () => {
  it('clamps to the first and last station', () => {
    expect(stationAt(99, 5)).toBe(4);
    expect(stationAt(-3, 5)).toBe(0);
    expect(stationAt(2, 5)).toBe(2);
  });
});

describe('settling onto a station', () => {
  const seg = 800;
  it('moves on after a light swipe in either direction', () => {
    expect(settleTarget(3 * seg + 60, 3 * seg, seg, 8)).toBe(4);
    expect(settleTarget(3 * seg - 60, 3 * seg, seg, 8)).toBe(2);
  });
  it('springs back from a tiny nudge', () => {
    expect(settleTarget(3 * seg + 20, 3 * seg, seg, 8)).toBe(3);
    expect(settleTarget(3 * seg - 20, 3 * seg, seg, 8)).toBe(3);
  });
  it('after a long flick, lands on the next station in the direction of travel', () => {
    expect(settleTarget(0.4 * seg, 7 * seg, seg, 8)).toBe(0);
    expect(settleTarget(5.3 * seg, 0, seg, 8)).toBe(6);
  });
  it('stays put when already resting on a station, and never leaves the track', () => {
    expect(settleTarget(2 * seg, 0, seg, 8)).toBe(2);
    expect(settleTarget(99 * seg, 0, seg, 8)).toBe(7);
  });
});

describe('perspective', () => {
  it('is 1× at the focal plane, smaller ahead, bigger once passed', () => {
    expect(depthScale(0)).toBe(1);
    expect(depthScale(STATION_GAP)).toBeLessThan(0.4);
    expect(depthScale(-300)).toBeCloseTo(1.43, 2);
  });
});

describe('camera spring', () => {
  it('lands on the next station in under 0.9s and stops dead soon after, without overshooting', () => {
    const frames = fly(0, STATION_GAP);
    const arrived = frames.findIndex((f) => STATION_GAP - f.z < STATION_GAP * 0.01);
    const settled = frames.findIndex((f) => f.z === STATION_GAP);
    expect(arrived / 60).toBeLessThan(0.9);
    expect(settled).toBeGreaterThan(0);
    expect(settled / 60).toBeLessThan(1.2);
    expect(Math.max(...frames.map((f) => f.z))).toBeLessThanOrEqual(STATION_GAP);
  });
  it('eases in rather than lurching', () => {
    const frames = fly(0, STATION_GAP);
    const peak = Math.max(...frames.map((f) => Math.abs(f.v)));
    expect(Math.abs(frames[0].v)).toBeLessThan(peak * 0.1);
  });
  it('flies 07 → 00 at a capped speed in about two seconds, then lands on the start', () => {
    const frames = fly(7 * STATION_GAP, 0, 4);
    expect(frames.findIndex((f) => Math.abs(f.z) < STATION_GAP * 0.01) / 60).toBeLessThan(2.1);
    for (const f of frames) expect(Math.abs(f.v)).toBeLessThanOrEqual(CAMERA_MAX_SPEED * STATION_GAP);
    expect(frames[frames.length - 1]).toEqual(restingCamera(0));
  });
  it('shrugs off a stalled frame', () => {
    const cam = followCamera(restingCamera(0), STATION_GAP, 2);
    expect(cam.z).toBeLessThan(STATION_GAP);
  });
});

describe('visibility', () => {
  it('shows the focal station fully and interactively', () => {
    const v = stationVisual(0);
    expect(v).toMatchObject({ hidden: false, opacity: 1, active: true });
  });
  it('hides stations far ahead or already passed', () => {
    expect(stationVisual(10 * STATION_GAP).hidden).toBe(true);
    expect(stationVisual(-STATION_GAP).hidden).toBe(true);
  });
  it('fades stations with distance', () => {
    expect(stationVisual(STATION_GAP).opacity).toBeLessThan(1);
    expect(stationVisual(2 * STATION_GAP).opacity).toBeLessThan(stationVisual(STATION_GAP).opacity);
  });
  it('keeps the station being left solid so nothing behind bleeds through', () => {
    expect(stationVisual(0.5 * STATION_GAP).opacity).toBe(1);
  });
  it('drops a passed station before it is magnified into a full-screen ghost', () => {
    expect(stationVisual(-400).hidden).toBe(true);
    expect(stationVisual(-100).hidden).toBe(false);
  });
  it('cross-fades: stations ahead dim as a passing station turns solid', () => {
    const [passing, ahead] = stationVisuals([-30, STATION_GAP - 30]);
    expect(passing.opacity).toBeGreaterThan(0.9);
    expect(ahead.opacity).toBeLessThan(0.1);
    expect(passing.opacity + ahead.opacity).toBeLessThanOrEqual(1.01);
  });
  it('leaves stations alone when nothing is passing the camera', () => {
    expect(stationVisuals([0, STATION_GAP])).toEqual([stationVisual(0), stationVisual(STATION_GAP)]);
  });
  it('dissolves rings before they wrap the viewer', () => {
    expect(ringVisual(-900).hidden).toBe(true);
    // magnification is perspective / (perspective + d); keep passed rings under ~1.6×
    expect(ringVisual(-400).hidden).toBe(true);
  });
});

describe('yearAt', () => {
  const years = [2014, 2014, 2016, 2026];
  it('reads the station year when parked', () => {
    expect(yearAt(2, years)).toBe(2016);
    expect(yearAt(3, years)).toBe(2026);
  });
  it('rolls between years while travelling', () => {
    const mid = yearAt(2.7, years);
    expect(mid).toBeGreaterThan(2016);
    expect(mid).toBeLessThan(2026);
  });
});
