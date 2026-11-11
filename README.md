# UNC Charlotte Men's Club Volleyball

The club's website: plain HTML, CSS and JavaScript, no build step.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Roster | `roster.html` |
| Schedule | `schedule.html` |
| Stats | `statistics.html` |
| Support / donate | `donate.html` |
| Join the team | `apply.html` |

- Styles: `css/site.css` (club colours are the variables at the top). Scripts: `js/site.js`.
- Web-sized photos live in `images/web/` (`<name>.jpg` 1800 px, `<name>-sm.jpg` 900 px).
- Nationals countdown: set `NEXT_NATIONALS` at the top of `js/site.js` once the date is announced.
- Hosting: every push to `main` deploys to GitHub Pages (`.github/workflows/pages.yml`).
  One-time setup: repo Settings > Pages > Source = "GitHub Actions".

Originally built as the ITCS-3135 final project (Spring 2025).
