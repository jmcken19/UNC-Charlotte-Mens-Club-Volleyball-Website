// THE PAGE LIST – one place that says which pages exist. Used by the website build AND by the
// editor's Preview, so a client's pages are defined only once.
// When rebuilding a client's site, list their pages here using their OLD addresses (paths).
import { layout } from './layout.mjs';
import * as P from './pages.mjs';

/** Every page of the site: { path, title, description?, render(ctx) }. */
export function routes(ctx) {
  // The old site's pages (old-site/*.html). Old addresses (/roster.html…) forward here: client.config.json → redirects.
  const list = [
    { path: '/', title: 'Home', render: P.homePage },
    { path: '/roster/', title: 'Roster', render: P.rosterPage },
    { path: '/schedule/', title: 'Schedule', render: P.schedulePage },
    { path: '/statistics/', title: 'Statistics', render: P.statisticsPage },
    { path: '/donate/', title: 'Donate', render: P.donatePage },
    { path: '/apply/', title: 'Apply', render: P.applyPage },
  ];
  return list;
}

/** Full HTML for one page. */
export function renderRoute(ctx, route) {
  return layout(ctx, { path: route.path, title: route.title, description: route.description, body: route.render(ctx) });
}

/** Full HTML for a path (used by the editor preview). Falls back to the home page. */
export function renderPath(ctx, path) {
  const all = routes(ctx);
  const r = all.find((x) => x.path === path) || all[0];
  return renderRoute(ctx, r);
}

export function notFoundHtml(ctx) {
  return layout(ctx, { path: '/404', title: 'Page not found', body: P.notFoundPage(ctx) });
}
