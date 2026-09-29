# Soumita Bhattacharya Sen — Prism variant

Next.js 16 (App Router) + React 19 + TypeScript. No runtime deps beyond Next/React. CSS Modules, no Tailwind.

Colourful take on the time-tunnel layout. **Light "Prism" theme is the default; dark uses the "Aurora" palette.** Every stop owns a hue (Wipro tangerine, TCS cobalt, toolkit teal, practice sun, certifications magenta …) that drives its pill, role band, chips, rail button and the progress bar. The tunnel rings are segmented like donut charts.

Scroll moves a camera through a 3D tunnel (CSS `perspective` + `preserve-3d`, no WebGL). Each career stop is a station on the depth axis; the camera dwells on a station, then eases to the next while the HUD year rolls (2014 → 2016 → now).

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # tunnel maths (vitest)
npm run typecheck
npm run build
```

## Structure

```
src/
  app/globals.css             theme tokens (light/dark) + [data-hue] mapping — change colours here
  app/layout.tsx              fonts, metadata, pre-paint boot script (theme + motion mode)
  app/page.tsx                station order → <TimeTunnel>
  data/portfolio.ts           all content, typed. Edit here.
  lib/tunnel.ts               pure camera/visibility/year maths (unit tested)
  components/tunnel/          TimeTunnel (client): sticky stage, rings, rails, HUD, rAF loop
  components/stations/        station content (server) + ContactForm (client, Formspree)
  components/header/          top bar + theme toggle
```

## How it works

- `html.tunnel` is added before first paint only when JS runs **and** `prefers-reduced-motion` is not set. Without it the same markup renders as a plain stacked page — that's the no-JS, reduced-motion and SEO path.
- One rAF-throttled scroll handler writes `transform` on the world and `opacity/visibility/filter/pointer-events` on stations and rings. No React re-render per frame; React only re-renders when the active station changes.
- Only the focal station takes pointer events. Tabbing into any station scrolls the camera to it. `←/→` or `[ ]` jump between stations. In-page anchors (`#contact`, etc.) are intercepted and mapped to scroll positions.
- Tuning knobs live at the top of `lib/tunnel.ts`: `STATION_GAP`, `SEGMENT_VH`, `DWELL`, `RINGS_PER_GAP`. `PERSPECTIVE` must match the CSS value in `TimeTunnel.module.css`.
- Removing all recommendations drops that station automatically.
- Theme: saved choice wins, otherwise light. Toggle in the header persists to localStorage.
- A stop's colour is its `hue` (roles and skill groups in `data/portfolio.ts`, the rest in `app/page.tsx`).
- The intro timeline chart is computed from the role dates, so it stays correct as time passes.

## Before shipping

Search the code for `VERIFY:` — content issues carried over from the live site.
