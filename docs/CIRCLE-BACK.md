# Circle back – UNC Charlotte Men's Club Volleyball

Open items from the rebuild (2026-11-10). Nothing here was invented on the site; these need an answer from the club.

## Out of date (the old site is the spring-2025 class project)
- **Schedule** is the 2024–25 season. The home page strip therefore says "Last match" (Nationals, 4/17-21/2025).
  Add the new season's rows (content/site.json → `schedule` + the words in text.json `sched.<id>.*`).
- **"Until Nationals 2026:" countdown** pointed at 2026-04-02 – already past, so it is hidden. New date →
  `content/site.json → nationalsCountdownTo`.
- **Roster** heading says "2025 Men's Volleyball Roster" – players/years from spring 2025.
- **Footer** "©2025 UNC CHARLOTTE ATHLETICS / ALL RIGHTS RESERVED" copied as is. Is the club allowed to say this
  (it is a club, not UNC Charlotte Athletics)?

## Not published on purpose
- **Statistics:** the old "Stats" links all pointed to one PDF (`old-site/Stats/Stats (1).pdf`) whose first line says
  "Stats are AI Generated and are not real." It is not on the new site; the Statistics page lists the tournaments only.
  Real stats per tournament → add them later (a stats table part or a link per row).
- **University logos** (`allwhite.png` All-in-C, `Master_white.png`, favicon `All-in-C.png`) and the **NCVF logo** are
  not used: the school's club-sports/brand office (and NCVF) must approve them first. The footer links to
  charlotte.edu and ncvf.org as text. The old header's `sign.jpg` and `gradient.jpg` are not used either.

## Missing from the old site
- **Club email / phone / social links:** none on the old site. `content/site.json` still has the template placeholders
  `phone (555) 555-0100`, `email owner@example.com`, `contactFormTo owner@example.com` – not shown anywhere.
- **Apply form:** the old form went nowhere (`action="#"`). Set `content/site.json → applyFormTo` to the club's email to
  switch it on (FormSubmit; the first message asks that address to "Activate Form"). Until then the page says
  "Applications can't be sent from this page yet." (new wording – please confirm or change).
- **New wording added for things that work differently now** (please confirm): "Next match" / "Last match" (home strip),
  "Applications can't be sent from this page yet.", "Thank you! Your application was sent.", "Sorry, your application
  could not be sent right now. Please try again later.", footer link words "charlotte.edu" / "ncvf.org".
- **Photo alt text:** the old slideshow alts were "Entrance" / "Library" (wrong). New plain descriptions were written.
- **Players' consent** to show their names (and later photos) on the public site.
- The old README (class description) is kept in `old-site/README.md` only.

## Typos kept word for word (fix in the editor if wanted)
"Phoneix" (Phoenix), "James Maddison" (Madison), "Eastern Carolina University" (East Carolina), "Freshmen" (Freshman),
"Stuck with th sport", "mens volleyball", "highschool", "retreive" (weather error message).

## Privacy
- `old-site/images/IMG_4899.jpg` still contains GPS location data (it is already public on `main`). The copies the new
  site uses are stripped (`npm run photo`). Consider removing GPS from the old file / history.

## Later (editor)
- Adding/removing roster players, schedule rows or coaches in the editor is not built yet (words in every row ARE
  editable). Build it with the `editor-extend` skill (a "team"/"schedule" kind) when the club needs it.
