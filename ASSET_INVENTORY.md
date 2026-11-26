# Asset replacement checklist

All initial artwork is deliberately designed placeholder illustration. It is not Devansh's portrait, a delivered client campaign, an actual film frame, or a photograph from his personal life. Replace files or update the image path in the owning data file; do not edit SVG source merely to change a project's content.

Local asset folders:

- `public/images/` — real portraits, project artwork, screenshots, and personal images.
- `public/videos/` — short optimized previews and original films.
- `public/placeholders/` — original SVG placeholder artwork.
- `public/music/` — optional owned/licensed artwork; no music is bundled.

## Source dimensions and display crops

The actual placeholder sources use these dimensions: portrait **720 × 880 (9:11)**; all project and Lab illustrations **1200 × 800 (3:2)**; racing **800 × 1000 (4:5)**; gaming, space, and books **1000 × 800 (5:4)**; album sleeve **720 × 720 (1:1)**. The interface applies responsive crops: homepage project images are approximately 1.45:1, case-study hero images are 16:10 on desktop, and Lab tiles intentionally vary. Source ratio and displayed crop are different concepts. Keep important subjects away from the edges and inspect both desktop and mobile after replacing media.

The tables below recommend same-ratio source exports. A different crop may still work, but it must be checked in each place the image appears. The only 16:9 recommendation is the optional video export, not the current SVG art.

## Core and featured work

| Replace                               | Current path                           | Suggested ratio        | Suggested resolution               | Edit                                 |
| ------------------------------------- | -------------------------------------- | ---------------------- | ---------------------------------- | ------------------------------------ |
| Personal portrait                     | `/placeholders/portrait.svg`           | 9:11 portrait          | 1080 × 1320                        | `siteConfig.portrait`                |
| Superteam Earn hero / thumbnail       | `/placeholders/earn.svg`               | 3:2 landscape          | 1800 × 1200                        | Project `superteam-earn.image`       |
| Creative experiments hero / thumbnail | `/placeholders/experiments.svg`        | 3:2 landscape          | 1800 × 1200                        | Project `creative-experiments.image` |
| CoinDCX hero / thumbnail              | `/placeholders/coindcx.svg`            | 3:2 landscape          | 1800 × 1200                        | Project `coindcx.image`              |
| Asgard Finance hero / thumbnail       | `/placeholders/asgard.svg`             | 3:2 landscape          | 1800 × 1200                        | Project `asgard-finance.image`       |
| VORLD project visual                  | Reuses `/placeholders/earn.svg`        | 3:2 landscape          | 1800 × 1200                        | Project `vorld.image`                |
| One Hand Clap project visual          | Reuses `/placeholders/coindcx.svg`     | 3:2 landscape          | 1800 × 1200                        | Project `one-hand-clap.image`        |
| Technical project visual              | Reuses `/placeholders/asgard.svg`      | 3:2 landscape          | 1800 × 1200                        | Project `technical-projects.image`   |
| Independent concepts visual           | Reuses `/placeholders/experiments.svg` | 3:2 landscape          | 1800 × 1200                        | Project `independent-concepts.image` |
| Optional exact licensed background    | CSS/SVG component by default           | Flexible / full-screen | At least 1920 px wide for a raster | `siteConfig.backgroundAsset`         |

Suggested additional media for the Superteam Earn case study: approved campaign screenshots, social posts, hackathon communication, marketing videos, and launch announcements. Confirm exact contribution and permission for every item. Performance evidence is content to verify, not artwork to manufacture.

Other case studies need approved social campaigns, post examples, campaign concepts, product narrative material, and process screenshots. Prefer full-resolution source artwork, then export optimized display versions. Never show placeholder illustrations as proof of delivered client work.

## The Lab

| Experiment                            | Current path                      | Useful replacement format          | Suggested resolution                 |
| ------------------------------------- | --------------------------------- | ---------------------------------- | ------------------------------------ |
| The Wizard's Crystal Ball             | `/placeholders/lab-crystal.svg`   | 3:2 poster + optional MP4          | 1800 × 1200 poster, 1280 × 720 video |
| Experimental Indian Wedding Film      | `/placeholders/lab-wedding.svg`   | 3:2 key frame + optional MP4       | 1800 × 1200                          |
| Underground Gaming Club               | `/placeholders/lab-gaming.svg`    | 3:2 key frame + optional MP4       | 1800 × 1200                          |
| World Cup Anime                       | `/placeholders/lab-anime.svg`     | 3:2 poster or concept frame        | 1800 × 1200                          |
| Arjuna Cinematic Concept              | `/placeholders/lab-arjuna.svg`    | 3:2 cinematic frame + optional MP4 | 1800 × 1200                          |
| AI Character Experiments              | `/placeholders/lab-character.svg` | 3:2 character study                | 1800 × 1200                          |
| Autonomous Creative Agent Experiments | `/placeholders/lab-agent.svg`     | 3:2 prototype screenshot / diagram | 1800 × 1200                          |
| Technical Prototypes                  | `/placeholders/lab-code.svg`      | 3:2 prototype screenshot           | 1800 × 1200                          |

Edit each corresponding object in `src/data/experiments.ts`. Image crops vary by gallery position; leave breathing room around the focal point and check both the tile and detail dialog. All initial Lab source SVGs are 3:2; a same-ratio image is a safe general replacement. Add `video` only when the real file exists. Default entries intentionally omit that field.

## Offscreen scrapbook

| Interest             | Current path               | Suggested ratio | Suggested resolution | Notes                                                                         |
| -------------------- | -------------------------- | --------------- | -------------------- | ----------------------------------------------------------------------------- |
| Formula 1 / racing   | `/placeholders/racing.svg` | 4:5 portrait    | 1200 × 1500          | Use owned or licensed photography; thumbnail uses a tighter crop              |
| Gaming               | `/placeholders/gaming.svg` | 5:4 landscape   | 1500 × 1200          | Personal setups or permitted imagery                                          |
| Science and space    | `/placeholders/space.svg`  | 5:4 landscape   | 1500 × 1200          | Check source attribution and usage rights                                     |
| Books and philosophy | `/placeholders/books.svg`  | 5:4 landscape   | 1500 × 1200          | Add actual books only after supplying titles                                  |
| Music / playlist     | `/placeholders/album.svg`  | 1:1 square      | 800 × 800            | Real playlist configured in `siteConfig.spotifyPlaylistUrl`; no audio bundled |

Edit `src/data/interests.ts`. These categories come from the supplied brief; the site makes no claim about a favorite artist, album, driver, game achievement, or specific book.

## Other pending items

- [ ] Real contact email, X/Twitter, LinkedIn, and GitHub destinations.
- [ ] Résumé PDF and `siteConfig.resumeUrl`.
- [ ] Real Spotify playlist URL, if desired.
- [ ] Real deployment origin in `siteConfig.url`.
- [ ] Approved brand logos if replacing text monograms; otherwise keep monograms.
- [ ] Case-study project-specific media and verified results.
- [ ] Actual production tools, credits, and process notes for Lab experiments.
- [ ] Current reading title and a real personal fact.
- [ ] Review all draft notes before publication.
- [ ] Optional approved background asset; independently built background already works without one.

## Export guidance

Prefer WebP or AVIF for photographic images. Use SVG for original vector artwork. Aim for approximately 150–400 KB per normal image and under 1 MB for a large detailed hero where practical. Keep explicit dimensions and use a sharp source image to avoid layout shifts and blur. Do not upload enormous original camera files directly.

For video previews, use short H.264 MP4 files around 720p or 1080p, with a static poster and no automatic audio. Aim for under 5 MB per short preview. Add captions/transcripts for meaningful spoken or auditory content in the final films. Retain source files elsewhere; this repository should contain web-ready exports.

Replace or update asset paths, run a production build, and check the homepage and the relevant `/work/<slug>` route after each batch of changes. Favicon and sharing graphics should keep the real name/initials and must not contain invented social handles or metrics.
