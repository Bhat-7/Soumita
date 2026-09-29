import { describe, expect, it } from 'vitest';
import {
  DWELL,
  STATION_GAP,
  cameraZ,
  easedIndex,
  ringVisual,
  segmentEase,
  stationVisual,
  yearAt,
} from './tunnel';

describe('segmentEase', () => {
  it('holds still during the dwell window', () => {
    expect(segmentEase(0)).toBe(0);
    expect(segmentEase(DWELL)).toBe(0);
  });
  it('reaches the next station at the end of the segment', () => {
    expect(segmentEase(1)).toBe(1);
  });
  it('is monotonic', () => {
    let prev = -1;
    for (let t = 0; t <= 1; t += 0.01) {
      const v = segmentEase(t);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});

describe('camera', () => {
  it('parks on each station at integer progress', () => {
    expect(cameraZ(0, 5)).toBe(0);
    expect(cameraZ(2, 5)).toBe(2 * STATION_GAP);
  });
  it('clamps past the last station', () => {
    expect(easedIndex(99, 5)).toBe(4);
    expect(easedIndex(-3, 5)).toBe(0);
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
  it('dissolves rings before they wrap the viewer', () => {
    expect(ringVisual(-900).hidden).toBe(true);
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
