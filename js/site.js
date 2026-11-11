'use strict';

/* Next Nationals date for the countdown on the schedule page.
   Set to an ISO date string (e.g. "2027-04-15T09:00:00") once it's announced;
   while it is null or already past, the countdown shows a "coming soon" note. */
const NEXT_NATIONALS = null;

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { btn.click(); btn.focus(); }
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Scroll reveal
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Roster filter
  const chips = document.querySelectorAll('.chip[data-filter]');
  const players = document.querySelectorAll('.player[data-pos]');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    const f = chip.dataset.filter;
    players.forEach((p) => { p.hidden = f !== 'all' && !p.dataset.pos.split(' ').includes(f); });
  }));

  // Countdown
  const cd = document.getElementById('countdown');
  if (cd) {
    const target = NEXT_NATIONALS ? new Date(NEXT_NATIONALS).getTime() : NaN;
    const note = document.getElementById('countdown-note');
    if (!target || target <= Date.now()) {
      cd.hidden = true;
      if (note) note.hidden = false;
    } else {
      const set = (id, v) => { document.getElementById(id).textContent = String(v).padStart(2, '0'); };
      const tick = () => {
        const t = Math.max(0, target - Date.now());
        set('cd-days', Math.floor(t / 864e5));
        set('cd-hours', Math.floor(t / 36e5) % 24);
        set('cd-minutes', Math.floor(t / 6e4) % 60);
        set('cd-seconds', Math.floor(t / 1e3) % 60);
      };
      tick();
      setInterval(tick, 1000);
    }
  }

  // Outdoor court weather (Open-Meteo, no key needed)
  const wxBtn = document.getElementById('wx-btn');
  if (wxBtn) wxBtn.addEventListener('click', getWeather);
});

async function getWeather() {
  const box = document.getElementById('wx-box');
  const btn = document.getElementById('wx-btn');
  btn.disabled = true;
  btn.textContent = 'Checking…';
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.3076&longitude=-80.7351'
    + '&daily=temperature_2m_max,wind_speed_10m_max,uv_index_max,precipitation_probability_max'
    + '&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&timezone=America%2FNew_York';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const d = (await res.json()).daily;
    const temp = Math.round(d.temperature_2m_max[0]);
    const wind = Math.round(d.wind_speed_10m_max[0]);
    const uv = Math.round(d.uv_index_max[0]);
    const rain = d.precipitation_probability_max[0];
    let verdict = 'Looks like a good day for sand or grass.';
    if (rain >= 60) verdict = 'Rain is likely today. Indoor at the SAC might be the move.';
    else if (temp < 50) verdict = 'Chilly out there. Bring layers or head indoors.';
    else if (wind >= 18) verdict = 'Windy today. Expect the ball to move on you.';
    else if (temp >= 92) verdict = 'Hot one. Bring water and sunscreen.';
    box.innerHTML = `
      <div class="weather-grid">
        <div class="wx"><small>High</small><b>${temp}°F</b></div>
        <div class="wx"><small>Chance of rain</small><b>${rain ?? '–'}%</b></div>
        <div class="wx"><small>Max wind</small><b>${wind} mph</b></div>
        <div class="wx"><small>UV index</small><b>${uv}</b></div>
        <p class="wx-verdict">${verdict}</p>
      </div>`;
    btn.textContent = 'Refresh forecast';
  } catch (err) {
    box.innerHTML = '<p>We couldn’t load the forecast right now. Try again in a minute, or check your weather app.</p>';
    btn.textContent = 'Try again';
  } finally {
    btn.disabled = false;
  }
}
