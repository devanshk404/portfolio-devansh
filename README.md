# Devansh Kaushik — Portfolio, volume 02

A complete editorial portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Motion for React, and Lucide. Includes selected work, eight case-study routes, capabilities, overlapping work history, the Kitchen video gallery, a personal scrapbook, draft notes, and contact configuration.

## Run locally

Requires Node.js 20.9 or newer and npm. Node 24 was used during implementation.

```sh
npm install
npm run dev
```

Open the Local URL printed in the terminal, normally http://127.0.0.1:3000.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` runs the production build; run `npm run build` first. Dependencies are locked in `package-lock.json`; use `npm ci` for repeatable installs. Fonts are installed locally; normal page rendering and the generated PNG sharing image do not require a font CDN.

## Make it yours

- [CONTENT_GUIDE.md](CONTENT_GUIDE.md): where to change text, projects, dates, media, playlist, and links.
- [ASSET_INVENTORY.md](ASSET_INVENTORY.md): every placeholder, source dimensions, and replacement recommendations.
- `src/config/site.ts`: actual email, social links, résumé, portrait, playlist, production origin, and optional background asset.
- `src/data/`: all main page copy, projects, experience, experiments, and interests.

The initial artwork is original SVG placeholder illustration, not client campaign evidence or personal photography. Case studies and notes are explicitly drafts. Results are pending verification. Contact destinations remain unavailable until real values are supplied. Music never plays automatically; configuring a valid Spotify playlist enables the load control, then Spotify's own playback controls.

## Routes and structure

The homepage lives at `src/app/page.tsx`. Reusable components are in `src/components/`. The `PortfolioBackground` component independently recreates the charcoal, fine-grid, sparse-star direction from the supplied reference, and can be swapped for an approved asset later.

The homepage Kitchen carousel and the full collection at `/kitchen` share `src/data/kitchenVideos.ts`.

`src/app/work/[slug]/page.tsx` statically generates a page for each project in the data file. Unknown routes show the custom 404. Native dialogs support keyboard focus containment, Escape, and return to the triggering element. Motion effects and optional muted hover previews respect reduced-motion preferences.

The initial work routes are `/work/superteam-earn`, `/work/creative-experiments`, `/work/coindcx`, `/work/asgard-finance`, `/work/vorld`, `/work/one-hand-clap`, `/work/technical-projects`, and `/work/independent-concepts`.

## Deployment

The repository is configured for the Next.js framework on Vercel. Import this branch, use `npm run build`, and let the Next.js preset handle `.next`. This implementation does not deploy or alter the existing production site. There is no database, CMS, API key, or required environment variable.

Before public release, set `siteConfig.url` to the real HTTPS origin. This provides the correct sharing metadata and sitemap URLs; the local fallback is localhost. Add real contact details, approved media, and reviewed case-study copy when ready. The generated `/opengraph-image` route provides PNG sharing artwork. `/robots.txt` and `/sitemap.xml` are generated from the configuration.

## Earlier water prototype

The earlier water prototype lives in `index.html`, `styles.css`, and `water.js` at the repository root. Use the npm commands above to build and run version 2.
