// LAYOUT – UNC Charlotte Men's Club Volleyball, "Game Day" direction (docs/DESIGN-DECISION.md).
// Header (wordmark + menu with Apply as the call-out), page body, footer. Every visible word goes through t()
// (src/lib/text.mjs) so the owner can change it in the editor; the words live in content/text.json.
// The pieces marked "keep" come from the template: they power the editor, the testing banner, SEO and accessibility.
import { e } from '../lib/core.mjs';
import { headTags, testingBanner } from '../parts/index.mjs';
import { t } from '../lib/text.mjs';

/** Main menu (the old site's menu: Roster, Schedule, Statistics, More → Donate, Apply – flattened, Apply as the button). */
export function nav(ctx) {
  return ctx.config.nav || [
    { href: '/roster/', key: 'roster' },
    { href: '/schedule/', key: 'schedule' },
    { href: '/statistics/', key: 'statistics' },
    { href: '/donate/', key: 'donate' },
    { href: '/apply/', key: 'apply', cta: true },
  ];
}

/** A volleyball line icon (Lucide "volleyball", ISC licence – lucide.dev). Decorative; no school or league logo is used. */
export const ballIcon = (cls = 'ball') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4"/><path d="M12 12a12.6 12.6 0 0 1-8.7 5"/><path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5"/><path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10"/><path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5"/><circle cx="12" cy="12" r="10"/></g></svg>`;

export function layout(ctx, { path, title, description, body }) {
  const { site, url } = ctx;
  const fullTitle = path === '/' ? (site.homeTitle || site.name) : `${title} | ${site.name}`;
  const items = nav(ctx).map((n) => {
    const current = n.href === '/' ? path === '/' : path.startsWith(n.href);
    return `<li${n.cta ? ' class="site-nav__cta"' : ''}><a href="${url(n.href)}"${current ? ' aria-current="page"' : ''}>${t(ctx, `nav.${n.key}`)}</a></li>`;
  }).join('');
  const links = site.links || {};
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(fullTitle)}</title>
<meta name="description" content="${e(description || site.metaDescription || '')}">
<meta property="og:title" content="${e(fullTitle)}">
<meta property="og:description" content="${e(description || site.metaDescription || '')}">
<meta name="theme-color" content="${e(ctx.config.themeColor || '#005035')}">
${headTags(ctx, { path })}
<script src="${url('/assets/js/club.js')}?v=${ctx.buildId}" defer></script>
</head>
<body>
<a class="skip" href="#main">${t(ctx, 'layout.skip')}</a>
${testingBanner(ctx)}
<header class="site-header">
  <div class="wrap site-header__in">
    <a class="brand" href="${url('/')}">${ballIcon('brand__ball')}<span class="brand__words"><span class="brand__school">${t(ctx, 'brand.school')}</span> <span class="brand__name">${t(ctx, 'brand.name')}</span></span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-btn__bars" aria-hidden="true"></span>${t(ctx, 'layout.menu')}</button>
    <nav id="site-nav" class="site-nav" aria-label="Main"><ul>${items}</ul></nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap site-footer__in">
    <a class="site-footer__brand" href="${url('/')}">${ballIcon('brand__ball')}<span class="brand__words"><span class="brand__school">${t(ctx, 'brand.school')}</span> <span class="brand__name">${t(ctx, 'brand.name')}</span></span></a>
    <ul class="site-footer__nav">${nav(ctx).map((n) => `<li><a href="${url(n.href)}">${t(ctx, `nav.${n.key}`)}</a></li>`).join('')}</ul>
    <ul class="site-footer__ext">
      ${links.school ? `<li><a href="${e(links.school)}">${t(ctx, 'footer.school')}</a></li>` : ''}
      ${links.ncvf ? `<li><a href="${e(links.ncvf)}">${t(ctx, 'footer.ncvf')}</a></li>` : ''}
    </ul>
    <p class="site-footer__small">${t(ctx, 'footer.rights')}<br>${t(ctx, 'footer.reserved')}</p>
  </div>
</footer>
</body>
</html>`;
}
