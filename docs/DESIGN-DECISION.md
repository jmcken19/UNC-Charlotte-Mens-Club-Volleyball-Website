# Design decision – UNC Charlotte Men's Club Volleyball

- **Date:** 2026-11-10 · **Chosen by:** James McKenna (dress-rehearsal client for the website business)
- **Direction:** "Game Day" (the first of the three directions in `.claude/skills/design-from-scratch` → worked example).
- **Content source:** the club's spring-2025 site (`old-site/`), copied word for word into `content/text.json`.

## The system
- **Colours** (from the old site's CSS): green `#005035`, gold `#A49665`, light gold `#F1E6B2`; plus near-black green
  `#0a1712` for the header, hero and footer. Contrast: white on green 9.6:1, ink `#0b1f17` on gold 5.8:1,
  gold on near-black 6.2:1. Gold is never used for small text on white (2.9:1) – `#7d6f40` is used there (5:1).
- **Type:** Barlow Condensed 600/700/800 (headings, menu, buttons – uppercase) + Barlow 400–700 (body). Free (OFL),
  self-hosted in `public/assets/fonts/`. Stand-in for the old site's Interstate Condensed (commercial font – not reused).
- **Photos:** full-bleed, darkened toward the bottom so white headings stay readable; every photo is the club's own.
- **Parts:** slideshow hero → next-match strip (gold) → club text + team photo → "Apply" call-out (green) → donate band
  → the old site's weather button. Inner pages: photo band with the page title, then content.
- **Icon:** a line volleyball (Lucide "volleyball", ISC licence). No university or league logo/mascot/wordmark is used
  (see CIRCLE-BACK).
