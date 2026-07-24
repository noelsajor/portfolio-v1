# Performance Baseline (Step 9)

Recorded against the production build (`pnpm build && pnpm start`), Lighthouse 13.4.1, desktop preset, localhost (no network latency — treat absolute numbers as a *relative* baseline for future regressions, not as representative of real-world conditions on the production domain).

## Scores (Performance / Accessibility / Best Practices / SEO)

| Route | Perf | A11y | BP | SEO | LCP | CLS | TBT | Total weight |
|---|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.5s | 0 | 0ms | 228 KiB |
| `/about` | 100 | 100 | 100 | 100 | 0.5s | 0 | 0ms | 224 KiB |
| `/work` | 100 | 100 | 100 | 100 | 0.5s | 0 | 0ms | 250 KiB |
| `/work/iotek` | 100 | 100 | 100 | 100 | 0.6s | 0 | 0ms | 236 KiB |
| `/contact` | 100 | 100 | 100 | 100 | 0.5s | 0 | 0ms | 224 KiB |
| `/` with GA4 enabled (`NEXT_PUBLIC_GA_MEASUREMENT_ID` set) | 100 | 100 | 100 | 100 | 0.5s | 0 | 0ms | 373 KiB |

Every route scores perfectly across all four Lighthouse categories, with or without Google Analytics loaded. GA's `afterInteractive` loading strategy (via `@next/third-parties`) adds ~145 KiB of third-party payload but produces zero measurable change to LCP/CLS/TBT/FCP.

## Findings reviewed and *not* actioned (no measurable benefit)

- **`render-blocking-insight` (score 0.5)**: flags the app's own ~5.9 KB CSS file as render-blocking. Lighthouse's own `metricSavings` for this finding is `{ FCP: 0, LCP: 0 }` — zero measured impact. CSS *should* block render here (prevents a flash of unstyled content); deferring or inlining it would add complexity for no measured gain.
- **`network-dependency-tree-insight` (score 0)**: the only chain is `HTML → CSS`, 35ms total. `metricSavings: { LCP: 0 }`, and Lighthouse itself reports "no additional origins are good candidates for preconnecting." Unavoidable for any page with an external stylesheet.
- **`unused-javascript` (~29 KiB on the homepage's largest chunk)**: traced to `react-dom` itself, not application code. Not addressable without an architecture change (out of scope), and not a real-world cost since it's shared framework code, not per-page bloat.
- **Fonts**: `--font-sans` declares `"Inter", "Geist Sans", ...` but neither is actually loaded (no `next/font`, no `<link>`) — the site currently renders in whatever system font matches, with zero font-loading cost. This is a **design-fidelity gap** (the intended typeface isn't being delivered), not a performance defect — the current zero-font-request state is in fact the best-case scenario for LCP/CLS. Wiring up `next/font` would *add* a network request and could only move these metrics in the wrong direction. Flagging as a product decision for a future step, not fixing here.
- **Images**: no real gallery image is live yet (`status: 'pending'` on every gallery item) — `next/image` is already used correctly in `work/[slug]/page.tsx` (explicit `width`/`height`/`alt`, default lazy-loading), but there's nothing to measure yet. Revisit once real images are added.

## Change made this step

- Removed an unused `.glass` CSS utility from `globals.css` (dead code, found during the Phase 6 CSS review — zero visual or behavioral effect, since nothing referenced it).

No other source changes were made. The architecture built up across Steps 1–8 (minimal client components, RSC-based MDX rendering, static generation everywhere applicable, deferred third-party scripts) already produces these results — this step's audit exists to confirm and document that, not to introduce speculative changes without measurable benefit.
