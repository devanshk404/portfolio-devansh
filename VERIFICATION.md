# Verification — portfolio version 2

Verified locally on 4 November 2026, on branch `codex/portfolio-version_2`.

## Build checks

| Check | Result |
| --- | --- |
| `npm run lint` | Passed, no warnings |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; homepage and all eight case studies generated |
| Production server, `npm start` | Started successfully on loopback; homepage HTTP 200 |

## Routes and assets

The homepage, all eight `/work/<slug>` routes, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image` returned HTTP 200. The sharing image returned `image/png`. An intentionally unknown URL returned HTTP 404 and displayed the custom not-found page. All 18 placeholder SVG files returned HTTP 200. Loaded homepage images had no broken-image failures.

The sitemap intentionally contains no production URLs until `siteConfig.url` is supplied. The existing production deployment was not changed.

## Browser checks

- Checked the homepage at widths 1440, 1024, 768, 390, and 360 pixels. No horizontal document overflow or offscreen content elements were found after the final fixes.
- Visually reviewed the desktop hero, work preview, scrapbook, case study, and narrow mobile homepage/case-study layouts.
- Verified mobile menu opening, section navigation, closing, Escape handling, and hiding the mobile menu after resizing to desktop.
- Verified homepage-to-case-study navigation and the Superteam Earn case study's rendered title.
- Verified Lab, note, and interest dialogs. Escape closes the native dialog and returns focus to the original trigger; the close button receives focus on opening.
- Observed no runtime errors or warnings in the inspected homepage, case study, and dialog browser console logs.
- Saved screenshots to `artifacts/portfolio-desktop.jpg` and `artifacts/portfolio-mobile.jpg` (local artifacts, ignored by Git).

## Content and integration limits

The media is intentionally original placeholder illustration. Case-study prose, outcomes, personal details, and notes remain explicitly drafts where information is missing. CoinDCX work is attributed to the One Hand Clap role; overlapping roles retain their supplied dates. The earlier uncommitted water prototype files are preserved.

No actual email, social, résumé, or music destinations were supplied. Their unavailable states were checked; real external destinations and Spotify playback cannot be verified until configured. Optional video fields and real case-study galleries are supported, but no finished video was invented or bundled. Reduced-motion handling is implemented in CSS and Motion; an OS-level reduced-motion setting was not toggled during this run.

See `CONTENT_GUIDE.md` and `ASSET_INVENTORY.md` for the remaining content replacements.
