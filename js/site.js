'use strict';

/* Date of the next Nationals, for the countdown on the schedule page.
   Example: "2027-04-15T09:00:00". While it is null (or the date has passed) the countdown is hidden. */
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
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Nationals countdown
  const section = document.getElementById('countdown-section');
  if (section) {
    const target = NEXT_NATIONALS ? new Date(NEXT_NATIONALS).getTime() : NaN;
    if (target > Date.now()) {
      section.hidden = false;
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

  const wxBtn = document.getElementById('wx-btn');
  if (wxBtn) wxBtn.addEventListener('click', getWeather);
});

// Today's weather for campus (Open-Meteo, no key needed)
async function getWeather() {
  const box = document.getElementById('wx-box');
  const btn = document.getElementById('wx-btn');
  btn.disabled = true;
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.3076&longitude=-80.7351'
    + '&daily=temperature_2m_max,rain_sum,wind_speed_10m_max,uv_index_max'
    + '&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=America%2FNew_York';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    const d = (await res.json()).daily;
    box.innerHTML = `
      <table class="wx-table">
        <tbody>
          <tr><th scope="row">High</th><td>${Math.round(d.temperature_2m_max[0])} °F</td></tr>
          <tr><th scope="row">Rain</th><td>${d.rain_sum[0]} in</td></tr>
          <tr><th scope="row">Max wind</th><td>${Math.round(d.wind_speed_10m_max[0])} mph</td></tr>
          <tr><th scope="row">UV index</th><td>${Math.round(d.uv_index_max[0])}</td></tr>
        </tbody>
      </table>`;
  } catch (err) {
    box.innerHTML = '<p>Unable to retrieve the weather. Try again later or check your local weather app.</p>';
  } finally {
    btn.disabled = false;
  }
}
