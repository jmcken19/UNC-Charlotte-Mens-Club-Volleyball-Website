// PAGES – UNC Charlotte Men's Club Volleyball ("Game Day" direction). Rebuilt from the club's spring-2025 site
// (old-site/): Home, Roster, Schedule, Statistics, Apply, Donate. Words are the old site's, word for word, in
// content/text.json; rows (roster, staff, schedule) are listed in content/site.json and their words are text keys
// roster.<id>.*, staff.<id>.*, sched.<id>.*. Never invent facts, numbers or quotes.
import { e } from '../lib/core.mjs';
import { t, tBlock, tText } from '../lib/text.mjs';
import { heroSlideshow, spotImage } from '../parts/index.mjs';
import { ballIcon } from './layout.mjs';

const has = (ctx, key) => typeof ctx.text?.text?.[key] === 'string' || Array.isArray(ctx.text?.text?.[key]);
const today = (ctx) => ctx.today || new Date().toISOString().slice(0, 10);

/* ---------- shared pieces ---------- */

/** Big photo band at the top of an inner page (the photo is a photo spot: ✎ Change photo in the editor). */
function pageHero(ctx, spot, titleKey) {
  return `<section class="phero">
  ${spotImage(ctx, spot, { className: 'phero__img', width: 1400, height: 1050, sizes: '100vw', lazy: false })}
  <div class="wrap phero__in"><h1 class="phero__title">${t(ctx, titleKey)}</h1></div>
</section>`;
}

/** The schedule rows of one group (pre-season, home, ECVA), in date order. */
export function scheduleRows(ctx, group) {
  return (ctx.site.schedule || []).filter((r) => r.group === group).sort((a, b) => a.date.localeCompare(b.date));
}

/** Next match (first one not over yet), or – when the season is over – the last one played. */
export function nextMatch(ctx) {
  const rows = [...(ctx.site.schedule || [])].sort((a, b) => a.date.localeCompare(b.date));
  if (!rows.length) return null;
  const now = today(ctx);
  const up = rows.find((r) => (r.end || r.date) >= now);
  return up ? { row: up, upcoming: true } : { row: rows[rows.length - 1], upcoming: false };
}

function matchLine(ctx, r) {
  return `<span class="match__us">${t(ctx, 'sched.us')}</span> <span class="match__at" aria-hidden="true">@</span> <span class="match__opp">${t(ctx, `sched.${r.id}.opponent`)}</span>`;
}

function matchList(ctx, group, { next } = {}) {
  const rows = scheduleRows(ctx, group);
  if (!rows.length) return `<ul class="matches"><li class="match match--none">${t(ctx, 'schedGroup.none')}</li></ul>`;
  return `<ul class="matches">${rows.map((r) => `<li class="match${next && next.row.id === r.id ? ' is-next' : ''}">
    <time class="match__date" datetime="${e(r.date)}">${t(ctx, `sched.${r.id}.date`)}</time>
    <p class="match__teams">${matchLine(ctx, r)}</p>
  </li>`).join('')}</ul>`;
}

/* ---------- Home ---------- */

export function homePage(ctx) {
  const { site, url } = ctx;
  const inner = `<div class="wrap hero__wrap">
    <h1 class="hero__title">${t(ctx, 'home.title')}</h1>
    <p class="hero__lede">${t(ctx, 'home.lede')}</p>
    <p class="hero__actions"><a class="btn btn--gold" href="${url('/apply/')}">${t(ctx, 'nav.apply')}</a> <a class="btn btn--ghost" href="${url('/schedule/')}">${t(ctx, 'nav.schedule')}</a></p>
  </div>`;
  const hero = ctx.config.features?.slideshow !== false && site.heroSlides?.length
    ? heroSlideshow(ctx, { inner, label: tText(ctx, 'home.title'), className: 'hero--gameday' })
    : `<section class="hero hero--gameday hero--plain"><div class="hero__text">${inner}</div></section>`;
  const nx = nextMatch(ctx);
  const strip = nx ? `<section class="nextup" aria-labelledby="nextup-h">
  <div class="wrap nextup__in">
    <h2 id="nextup-h" class="nextup__label">${t(ctx, nx.upcoming ? 'next.upcoming' : 'next.latest')}</h2>
    <p class="nextup__match">${matchLine(ctx, nx.row)}</p>
    <p class="nextup__date"><time datetime="${e(nx.row.date)}">${t(ctx, `sched.${nx.row.id}.date`)}</time></p>
    <a class="nextup__link" href="${url('/schedule/')}">${t(ctx, 'nav.schedule')}<span aria-hidden="true"> →</span></a>
  </div>
</section>` : '';
  const links = site.links || {};
  return `${hero}
${strip}
<section class="club" aria-labelledby="club-h">
  <div class="wrap club__in">
    <div class="club__text">
      <h2 id="club-h" class="sr">${t(ctx, 'home.title')}</h2>
      <div class="club__lead">${tBlock(ctx, 'home.about')}</div>
      <div class="club__facts">
        <div class="fact">
          <h3 class="fact__title">${t(ctx, 'home.leagueTitle')}</h3>
          ${tBlock(ctx, 'home.league')}
        </div>
        <div class="fact">
          <h3 class="fact__title">${t(ctx, 'home.practiceTitle')}</h3>
          <p>${t(ctx, 'home.practice')}</p>
        </div>
      </div>
    </div>
    <figure class="club__photo">${spotImage(ctx, 'team', { className: 'club__img', width: 1400, height: 1050, sizes: '(min-width: 1000px) 560px, 100vw' })}</figure>
  </div>
</section>
<section class="join" aria-labelledby="join-h">
  <div class="wrap join__in">
    ${ballIcon('join__ball')}
    <h2 id="join-h" class="join__title">${t(ctx, 'apply.title')}</h2>
    <a class="btn btn--gold btn--big" href="${url('/apply/')}">${t(ctx, 'nav.apply')}</a>
  </div>
</section>
<section class="support" aria-labelledby="support-h">
  <div class="wrap support__in">
    <h2 id="support-h" class="support__title">${t(ctx, 'donate.title')}</h2>
    <p class="support__actions">${links.donate ? `<a class="btn btn--green" href="${e(links.donate)}">${t(ctx, 'donate.button')}</a>` : ''} <a class="textlink" href="${url('/donate/')}">${t(ctx, 'nav.donate')}<span aria-hidden="true"> →</span></a></p>
  </div>
</section>
${weatherBox(ctx)}`;
}

/** "Check Daily Weather" (the old site's Open-Meteo button). The labels are on the page; club.js fills the numbers. */
function weatherBox(ctx) {
  const w = ctx.site.weather;
  if (!w) return '';
  const row = (key, unit, name) => `<div class="weather__row"><dt>${t(ctx, key)}</dt><dd><span data-w="${name}">–</span>${unit ? ` ${t(ctx, unit)}` : ''}</dd></div>`;
  return `<section class="weather" aria-labelledby="weather-h" data-weather data-lat="${e(w.latitude)}" data-lon="${e(w.longitude)}">
  <div class="wrap weather__in">
    <h2 id="weather-h" class="weather__title">${t(ctx, 'weather.title')}</h2>
    <button class="btn btn--outline weather__btn" type="button">${t(ctx, 'weather.button')}</button>
    <div class="weather__out" aria-live="polite">
      <dl class="weather__list" hidden>
        ${row('weather.temp', 'weather.tempUnit', 'temp')}${row('weather.rain', 'weather.rainUnit', 'rain')}${row('weather.wind', 'weather.windUnit', 'wind')}${row('weather.uv', '', 'uv')}
      </dl>
      <p class="weather__error" hidden>${t(ctx, 'weather.error')}</p>
    </div>
  </div>
</section>`;
}

/* ---------- Roster ---------- */

export function rosterPage(ctx) {
  const ids = ctx.site.roster || [];
  const staff = ctx.site.staff || [];
  const cards = ids.map((id) => `<li class="pcard">
    <p class="pcard__num"><span class="sr">${t(ctx, 'roster.colNumber')}</span> ${t(ctx, `roster.${id}.number`)}</p>
    <h2 class="pcard__name">${t(ctx, `roster.${id}.name`)}</h2>
    <dl class="pcard__stats">
      <div><dt>${t(ctx, 'roster.colPosition')}</dt><dd>${t(ctx, `roster.${id}.position`)}</dd></div>
      <div><dt>${t(ctx, 'roster.colHeight')}</dt><dd>${t(ctx, `roster.${id}.height`)}</dd></div>
      <div><dt>${t(ctx, 'roster.colYear')}</dt><dd>${t(ctx, `roster.${id}.year`)}</dd></div>
    </dl>
    ${has(ctx, `roster.${id}.reason`) ? `<div class="pcard__why"><p class="pcard__q">${t(ctx, 'roster.reasonQ')}</p><p class="pcard__a">${t(ctx, `roster.${id}.reason`)}</p></div>` : ''}
  </li>`).join('');
  return `${pageHero(ctx, 'roster', 'roster.title')}
<section class="section">
  <div class="wrap">
    <ul class="roster">${cards}</ul>
  </div>
</section>
${staff.length ? `<section class="section section--wash" aria-labelledby="staff-h">
  <div class="wrap">
    <h2 id="staff-h" class="section-title">${t(ctx, 'staff.title')}</h2>
    <table class="staff">
      <thead><tr><th scope="col">${t(ctx, 'staff.colPosition')}</th><th scope="col">${t(ctx, 'staff.colName')}</th></tr></thead>
      <tbody>${staff.map((id) => `<tr><td>${t(ctx, `staff.${id}.position`)}</td><td>${t(ctx, `staff.${id}.name`)}</td></tr>`).join('')}</tbody>
    </table>
  </div>
</section>` : ''}`;
}

/* ---------- Schedule ---------- */

export function schedulePage(ctx) {
  const { site } = ctx;
  const nx = nextMatch(ctx);
  const groups = site.scheduleGroups || [];
  const target = site.nationalsCountdownTo;
  const showCountdown = target && Date.parse(target) > Date.now();
  const unit = (k, n) => `<div class="countdown__unit"><span class="countdown__num" data-cd="${n}">00</span><span class="countdown__label">${t(ctx, k)}</span></div>`;
  return `${pageHero(ctx, 'schedule', 'schedule.title')}
<section class="section">
  <div class="wrap sched">
    ${groups.map((g) => `<div class="sched__group">
      <h2 class="sched__title">${t(ctx, `schedGroup.${g}`)}</h2>
      ${matchList(ctx, g, { next: nx?.upcoming ? nx : null })}
    </div>`).join('')}
  </div>
</section>
${showCountdown ? `<section class="countdown" aria-labelledby="cd-h" data-countdown="${e(target)}">
  <div class="wrap countdown__in">
    <h2 id="cd-h" class="countdown__title">${t(ctx, 'countdown.title')}</h2>
    <div class="countdown__grid">${unit('countdown.days', 'days')}${unit('countdown.hours', 'hours')}${unit('countdown.minutes', 'minutes')}${unit('countdown.seconds', 'seconds')}</div>
  </div>
</section>` : ''}
${site.links?.league ? `<section class="section section--tight"><div class="wrap center"><a class="btn btn--green" href="${e(site.links.league)}">${t(ctx, 'schedule.league')}</a></div></section>` : ''}`;
}

/* ---------- Statistics ---------- */

export function statisticsPage(ctx) {
  const groups = ctx.site.scheduleGroups || [];
  return `${pageHero(ctx, 'stats', 'stats.title')}
<section class="section">
  <div class="wrap sched">
    ${groups.map((g) => `<div class="sched__group">
      <h2 class="sched__title">${t(ctx, `statsGroup.${g}`)}</h2>
      ${matchList(ctx, g)}
    </div>`).join('')}
  </div>
</section>`;
}

/* ---------- Apply ---------- */

export function applyPage(ctx) {
  const { site } = ctx;
  const to = site.applyFormTo || '';
  const off = (!to || ctx.preview) && !ctx.editMode; // the editor keeps the button clickable (its words can be changed)
  const action = to ? ` action="https://formsubmit.co/${encodeURIComponent(to)}" method="post" data-ajax="https://formsubmit.co/ajax/${encodeURIComponent(to)}"` : '';
  const field = (name, key, type, opts) => `<div class="field"><label for="ap-${name}">${t(ctx, key)}</label><input id="ap-${name}" name="${name}" type="${type}" ${opts}></div>`;
  const area = (name, key) => `<div class="field"><label for="ap-${name}">${t(ctx, key)}</label><textarea id="ap-${name}" name="${name}" rows="5" maxlength="3000"></textarea></div>`;
  return `${pageHero(ctx, 'apply', 'apply.title')}
<section class="section">
  <div class="wrap apply">
    <form class="apply__form" data-apply${action}>
      ${!to ? `<p class="apply__note">${t(ctx, 'apply.notConnected')}</p>` : ''}
      ${field('name', 'apply.name', 'text', 'autocomplete="name" required maxlength="100"')}
      ${field('email', 'apply.email', 'email', 'autocomplete="email" required maxlength="200"')}
      ${field('phone', 'apply.phone', 'tel', 'autocomplete="tel" required maxlength="40"')}
      ${area('experience', 'apply.experience')}
      ${area('contribute', 'apply.contribute')}
      ${to ? `<input type="hidden" name="_subject" value="New application from the club website"><input type="hidden" name="_captcha" value="false"><div class="trap" aria-hidden="true"><label>Leave this empty<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>` : ''}
      <button class="btn btn--gold apply__send" type="submit"${off ? ' disabled' : ''}>${t(ctx, 'apply.submit')}</button>
      <p class="apply__status" role="status" aria-live="polite"></p>
      <p class="apply__msg" data-ok hidden>${t(ctx, 'apply.sent')}</p>
      <p class="apply__msg" data-bad hidden>${t(ctx, 'apply.failed')}</p>
    </form>
    <aside class="apply__side">
      <div class="fact fact--dark">
        <h2 class="fact__title">${t(ctx, 'home.practiceTitle')}</h2>
        <p>${t(ctx, 'home.practice')}</p>
      </div>
      <div class="fact fact--dark">
        <h2 class="fact__title">${t(ctx, 'home.leagueTitle')}</h2>
        ${tBlock(ctx, 'home.league')}
      </div>
    </aside>
  </div>
</section>`;
}

/* ---------- Donate ---------- */

export function donatePage(ctx) {
  const links = ctx.site.links || {};
  return `${pageHero(ctx, 'donate', 'nav.donate')}
<section class="section">
  <div class="wrap donate">
    <h2 class="donate__title">${t(ctx, 'donate.title')}</h2>
    <div class="donate__body prose">${tBlock(ctx, 'donate.body')}</div>
    ${links.donate ? `<p class="donate__cta"><a class="btn btn--gold btn--big" href="${e(links.donate)}">${t(ctx, 'donate.button')}</a></p>` : ''}
  </div>
</section>`;
}

/* ---------- 404 ---------- */

export function notFoundPage(ctx) {
  return `<div class="wrap page prose">
  <h1>${t(ctx, 'notFound.title')}</h1>
  <p>${t(ctx, 'notFound.before')} <a href="${ctx.url('/')}">${t(ctx, 'notFound.home')}</a>.</p>
</div>`;
}
