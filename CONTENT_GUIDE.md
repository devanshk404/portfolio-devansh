# Make this corner of the internet yours

The portfolio uses local TypeScript data files. You do not need a CMS or database. Files in `public/` are served from the site root: `public/images/portrait.webp` becomes `/images/portrait.webp` in a data field.

Start the development server with `npm run dev`, keep the browser open, and save changes to see them update. Before shipping content, run `npm run lint`, `npm run typecheck`, and `npm run build`.

## Where everything lives

| Change                                                          | File                                     | What to edit                                                                        |
| --------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| Name, professional identity, location, metadata                 | `src/config/site.ts`                     | `siteConfig`                                                                        |
| Hero introduction, headline, discipline labels                  | `src/data/siteContent.ts`                | `siteContent.hero`                                                                  |
| Section headings, introductions, engineering note, closing line | `src/data/siteContent.ts`                | `siteContent.sectionCopy`                                                           |
| Brand strip names and visual treatments                         | `src/data/siteContent.ts`                | `siteContent.brands`                                                                |
| Capabilities                                                    | `src/data/siteContent.ts`                | `siteContent.capabilities`                                                          |
| Notes and draft essays                                          | `src/data/siteContent.ts`                | `siteContent.notes`                                                                 |
| Contact, Kitchen, Offscreen introduction                        | `src/data/siteContent.ts`                | Matching content object                                                             |
| Kitchen video collection                                       | `src/data/kitchenVideos.ts`              | `kitchenVideos`                                                                     |
| Project previews and entire case studies                        | `src/data/projects.ts`                   | `projects`                                                                          |
| Work history                                                    | `src/data/experience.ts`                 | `experience`                                                                        |
| Experiment gallery and detail dialogs                           | `src/data/experiments.ts`                | `experiments`                                                                       |
| Personal scrapbook entries and facts                            | `src/data/interests.ts`                  | `interests`, `personalDetails`                                                      |
| Email, social destinations, resume, playlist                    | `src/config/site.ts`                     | Matching configuration field                                                        |
| Background treatment                                            | `src/components/PortfolioBackground.tsx` | Reusable visual component; set `siteConfig.backgroundAsset` for replacement artwork |

## Hero and portrait

Edit `headline`, `intro`, `eyebrow`, and `disciplines` in `siteContent.hero`. Avoid making the headline substantially longer without checking the mobile layout.

Add a real portrait under `public/images/`, then set `siteConfig.portrait` to its root-relative path. The current portrait SVG is 720 × 880 (9:11); a same-ratio replacement around 1080 × 1320 pixels avoids changing its proportions. Other portrait crops can work but should be checked in the hero. The current SVG is an intentionally designed placeholder and does not represent a photograph of Devansh.

`siteContent.sectionCopy` contains the main section headings and supporting copy for Work, Capabilities, Experience, and Notes, as well as the engineering background and closing line. Edit those fields to change text without editing the homepage component. The Lab, Offscreen, and Contact introduction text remains in the matching top-level content objects.

`siteContent.brands` controls the names in the contribution strip. `style` selects an existing typographic treatment (`earn`, `asgard`, `coindcx`, `ohc`, or `vorld`); it does not reproduce an official brand logo. Add only organizations that accurately describe your work and keep agency account attribution clear in the related case study.

## Projects and case studies

Each object in `projects` powers its preview and a route at `/work/<slug>`. Keep slugs unique and use lowercase words separated by hyphens. Changing a slug changes its URL; update `experience.projectSlug` references too. The initial array includes all four featured case studies and four additional entries.

- Reorder objects to change the presentation order. Update `number` if the visible numbering should change.
- Set `featured: true` for a large Selected Work presentation, or `false` for a smaller archive entry.
- Change `image` to the path of a real campaign image. See `ASSET_INVENTORY.md` for recommended dimensions.
- Choose a `theme` from `lime`, `rust`, `blue`, or `violet` to set the accent treatment.
- Edit `overview`, `challenge`, `approach`, `execution`, `deliverables`, `outcomes`, and `reflection` to write the case study.
- `approach`, `execution`, `deliverables`, and `campaigns` are arrays of individual items. Keep empty arrays as `[]`, rather than deleting required fields.
- To add a project, duplicate an existing object and provide all `Project` fields. To remove one, remove its object and any related experience link.

Example of updating media:

```ts
image: "/images/superteam-earn/campaign-cover.webp",
```

The initial case-study copy is an editorial draft. In particular, campaign names for Superteam Earn are candidate archive slots, not a claim that Devansh individually led every campaign. Confirm each contribution and credit collaborators. CoinDCX work is explicitly attributed to the One Hand Clap role, not a separate full-time job.

### Case-study media galleries and publication status

Add the optional `media` array to any project to show multiple actual visuals in its Selected visuals & deliverables section. Reorder the array to reorder the gallery; omit it or use `[]` while media is unavailable. Each entry has `src`, `alt`, `caption`, and a `type` of `image` or `video`. Videos can also include `poster`.

```ts
image: "/images/superteam-earn/campaign-cover.webp",
imageAlt: "Describe the actual approved campaign cover here",
media: [
  {
    src: "/images/superteam-earn/selected-post.webp",
    alt: "Describe what the selected post shows",
    caption: "Add the actual campaign context and contribution credit",
    type: "image",
  },
  {
    src: "/videos/campaign-film.mp4",
    alt: "Describe the film and provide an equivalent transcript where needed",
    caption: "Add the actual film title, contribution, and credits",
    type: "video",
    poster: "/images/superteam-earn/film-poster.webp",
  },
],
```

All current projects default to draft status. Set `isDraft: false` only after replacing the draft copy, pending deliverable text, and placeholder visuals with reviewed content. This disables the template's draft/media-pending notices for the real case study. It does not automatically rewrite pending phrases inside your data: review those fields yourself. Supply `imageAlt` describing the real hero image. While the project remains a draft, leave `isDraft` omitted or set it to `true`.

Do not replace pending outcomes with estimates. Add only verified campaign-specific figures with the measurement timeframe, source, and team context. Do not use platform-wide growth as an individual achievement. Remove draft/pending text only after replacing it with the actual details.

## Experience and overlapping roles

Edit the exact organization, role, dates, description, and contributions in `experience.ts`. Current roles intentionally overlap. Preserve the supplied dates rather than forcing each role into a mutually exclusive timeline. `projectSlug` links an entry to an existing project; omit that field if there is no related case study. `monogram` is a text logo placeholder, not a reproduced brand mark.

Before all this: the engineering background is part of the site's narrative. Add specific technical project details to the `technical-projects` entry rather than inventing academic dates or expanding into a long résumé.

## Kitchen videos from X

Add a `postUrl` to `kitchenVideos` to update the homepage carousel and `/kitchen` together. Array order controls display order. Add a short `title` when available.

Open the post in [X Publish](https://publish.x.com/) and verify that **Embedded Video** plays without the surrounding post. Set `media.width` and `media.height` to the video’s native dimensions to enable the inline player. An optional `media.poster` can use X’s existing video preview image. A URL without verified `media` opens the original post on X. Use `showPostLink: false` to hide the small original-post link on a playable card.

## Archived experiments

Each object in `experiments` has a unique `id`, title, type, concept, image, tools, notes, and status. Items open a detail view. All initial entries are drafts with media or process details pending.

Add a video under `public/videos/`, then configure the optional field:

```ts
image: "/images/lab/crystal-ball-poster.webp",
video: "/videos/crystal-ball-preview.mp4",
tools: ["List only tools actually used"],
status: "Published", // use an honest status for this specific experiment
```

Use an H.264 MP4 with a poster image and a short muted preview. Aim for 720p or 1080p, ideally under 5 MB for a short preview. Avoid large autoplay downloads. The default artwork has no video configured, so no fake play action is presented. Preview behavior is designed for muted, intentional interaction; never add automatic audio playback.

Update `notes` with the real process, collaborators, and credits. If a film contains speech or meaningful sound, supply accessible captions or an equivalent transcript alongside the media before publishing the final piece. Do not label a draft as finished solely because a placeholder image exists.

## Offscreen and personal details

Replace the interest artwork via `interests[].image`, and change `title` or `caption` to add your own words. The racing, gaming, space, and books artwork is original placeholder illustration, not personal photography or copyrighted game/album imagery.

`personalDetails` contains obvious placeholders for a current book and a personal fact. Replace these with things that are actually true. No reading list, favorite driver, favorite team, album, or gaming history has been invented.

## A real music playlist

Set `siteConfig.spotifyPlaylistUrl` to the full HTTPS URL of a real Spotify playlist you control or are entitled to share. Use a normal playlist URL from Spotify's Share action. The player is intentionally a static coming-soon state until a valid source is configured. Music must begin only after visitor interaction. No copyrighted audio is bundled or downloaded by this project.

## Contact and social links

Set `siteConfig.email` to your real email address; use just the address, without `mailto:`. Set the `href` for each item in `socials` to the full HTTPS destination. Add the résumé PDF under `public/` and configure `resumeUrl`, for example `/resume.pdf`.

Empty values are intentional: they produce labeled unavailable states instead of fake destinations. Do not use `#` or a made-up username as a substitute. Check each configured link in a browser before release.

Set `siteConfig.url` to the actual deployed site's HTTPS origin when known. Keep it empty during initial local development rather than inventing a production domain. This value is available for canonical and sharing metadata.

## Notes

Edit title, excerpt, and `body` paragraphs in `siteContent.notes`. The three initial pieces are clearly marked editable drafts and were not previously published articles. Add or remove objects to change the collection. Keep `slug` values unique. Review voice, facts, and examples before treating a draft as your own finished writing.

## Background replacement

The current midnight-black/grid/star treatment is independently implemented in `PortfolioBackground`. It follows the reference's visual direction without copying source code or protected artwork. If you later provide an exact licensed asset, place it in `public/images/`, set `siteConfig.backgroundAsset`, and confirm its display and crop in the component. Preserve the original appearance when using an approved asset. Check text contrast, file size, and mobile composition after changing it.

## Before release

- Replace the portrait and selected project media; review `ASSET_INVENTORY.md`.
- Review every draft case study, attribution, and campaign contribution.
- Add verified results only where evidence exists.
- Fill actual email, social, résumé, and optional playlist destinations.
- Review the personal fact and reading placeholders.
- Check desktop and mobile navigation, case-study URLs, dialogs, media, focus states, and reduced-motion behavior.
- Run the lint, type check, and production build commands.

The code is ready to hold your real content; missing media and unverified claims should remain visibly pending until you supply them.

## Colour palette

Edit the CSS design tokens at the top of `src/app/globals.css`. The current palette uses Midnight Black (`#030407`) for the continuous background, Electric Cobalt Blue (`#1558C9`) for primary actions, and Acid Lime (`#D4FF24`) for text accents, focus rings, and details. Cobalt buttons use offwhite text; lime surfaces use midnight text for readable contrast. Case-study surfaces and dialog panels use cool near-black shades. The favicon, sharing graphics, and main placeholder illustrations have matching colours.

## Animated background dots

`src/components/BackgroundParticles.tsx` draws the decorative dots and cursor connections on a lightweight canvas. Adjust `AREA_PER_DOT` / `MAX_DOTS` for density, `CONNECTION_RADIUS` for proximity, and `MAX_CONNECTIONS` for the maximum faint lines to the cursor tip. Speeds and dot opacity are set in `makeParticle()`. No extra animation dependency is needed.

The animation pauses in hidden tabs. Reduced-motion mode shows stationary dots without cursor lines. Touch input does not leave cursor connections behind. The canvas never captures pointer events, and supplying `siteConfig.backgroundAsset` replaces the effect with your chosen background asset.
