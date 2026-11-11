# Skills, plugins and AI instructions – what carries over to new repos

There are three places an AI assistant (Claude) picks up extra abilities or instructions. Only **one** of them
travels with the repo.

| Where it lives | Example | Copied into every client repo made from this template? | Works in every repo anyway? |
|---|---|---|---|
| **In the repo** – `AGENTS.md`, `CLAUDE.md`, `.claude/skills/<name>/SKILL.md`, `.claude/settings.json` | This template's `client-site` skill and rules | **Yes** – "Use this template" copies them | – |
| **Your Claude account** (claude.ai → Settings → Capabilities/Skills, plugins you added) | docs, pdf, xlsx, pptx, deep-research, social-media / UX plugins | No (not files in the repo) | **Yes** – they follow you into every chat and session |
| **Your computer's Claude Code install** (`~/.claude/skills/`, `~/.claude/plugins/`, `pip`/`npm` tools) | A tool installed only on your laptop | No | Yes **on that computer only** – not in cloud sessions or other machines |

## What this template includes
* `AGENTS.md` – the rules any assistant follows in a client repo (never invent facts, copy reviews word for word,
  run `npm test`, report exactly what changed…). `CLAUDE.md` points to it.
* Project skills in `.claude/skills/` (Claude picks the right one automatically):

  | Skill | When it's used | Comes with |
  |---|---|---|
  | `client-site` | Any work in a client repo: the playbook steps and the never-do list | – |
  | `codebase-care` | Any code change: orient, change safely, verify it's live, undo, update packages, port fixes template ↔ client | – |
  | `design-from-scratch` | Client has **no site and no inspiration** (sports club, restaurant, contractor…): brief, category research, pages per category, 3 original directions to pick from | `design/directions/` previews |
  | `ui-quality` | Anything visual: accessibility, mobile, type, contrast, motion, forms, the "no AI look" rules, editor UI rules | – |
  | `visual-check` | After visual changes: screenshot every page at phone + laptop size and actually look | `npm run shots` |
  | `dns-cutover` | Moving a domain / any DNS change: snapshot, compare, switch, verify – protects email | `npm run dns:snapshot` |
  | `editor-extend` | Letting an owner edit something new (another photo, hours, team, video…) safely: mark it with `editMark`, add its panel ([EDITOR.md](EDITOR.md)) | `npm run test:visual` |
  | `impeccable` | Design vocabulary + checks from [impeccable.style](https://impeccable.style) (v4.8.2, Apache-2.0): `/impeccable critique`, `audit`, `polish`, `typeset`, `layout`, `init` (PRODUCT.md), `document` (DESIGN.md)… | `npm run design:check`, a design hook in `.claude/settings.json`, the `Design check` GitHub workflow, 4 helper agents in `.claude/agents/` |


## Impeccable: updating it
The skill is a copy of `plugin/skills/impeccable` from github.com/pbakaus/impeccable, pinned with the `impeccable` npm
package (same version). To update: on your computer run `npx impeccable update` in the template, or copy the newer
`plugin/skills/impeccable` and `plugin/agents/*` over these folders and bump the `impeccable` version in package.json to
match `scripts/VERSION`'s engine. Then `npm test` and `npm run design:check`. Its own license and notices are in
`.claude/skills/impeccable/LICENSE` and `NOTICE.md`.

## To make another skill travel with every client repo
Put it in the template: `.claude/skills/<skill-name>/SKILL.md` (plus any files it needs), commit, push.
New client repos made from the template get it. **Existing** client repos don't update automatically – copy the
folder in by hand (same as any other template improvement).

## To make a skill available everywhere (not just client repos)
Add it to your Claude account (claude.ai → Settings → Skills / Capabilities, or a plugin). Then nothing needs copying.

## Checked Nov 9, 2026
* Account-level skills/plugins visible in this session: docs, docx, pdf, pptx, xlsx, deep-research, video-making,
  skill-creator, the Roblox/StonkCats skills, social-media-skills, vectorlab-ux-skills, code-review, posty, and more.
  These already work in any repo.
* **Graphify** was **not** found in the account skills/plugins or in Dan's repo. If you installed it in Claude Code
  on your laptop (e.g. `pip install` + a `/graphify` skill in `~/.claude/skills/`), it works in every repo **on that
  laptop** but not in cloud sessions. To have it everywhere, add it to your account; to pin it to client repos,
  copy its skill folder into this template's `.claude/skills/`.
