// Club-only behaviour (the shared parts live in site.js): the "Check Daily Weather" button, the Nationals
// countdown and the Apply form. Everything still reads fine without JavaScript. All words are on the page
// (content/text.json) – this file only fills in numbers and shows/hides them.
(function () {
  // Daily weather from Open-Meteo (free, no key) – the old site's button.
  document.querySelectorAll('[data-weather]').forEach(function (box) {
    var btn = box.querySelector('.weather__btn');
    var list = box.querySelector('.weather__list');
    var err = box.querySelector('.weather__error');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-busy') === 'true') return;
      btn.setAttribute('aria-busy', 'true');
      var api = 'https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(box.dataset.lat) + '&longitude=' + encodeURIComponent(box.dataset.lon) +
        '&daily=temperature_2m_max,wind_speed_10m_max,uv_index_max,rain_sum&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&timezone=auto';
      fetch(api).then(function (r) { if (!r.ok) throw new Error('weather'); return r.json(); }).then(function (d) {
        var day = d.daily;
        var set = function (k, v) { var el = box.querySelector('[data-w="' + k + '"]'); if (el) el.textContent = v; };
        set('temp', day.temperature_2m_max[0]); set('rain', day.rain_sum[0]); set('wind', day.wind_speed_10m_max[0]); set('uv', day.uv_index_max[0]);
        list.hidden = false; err.hidden = true;
      }).catch(function () { list.hidden = true; err.hidden = false; })
        .then(function () { btn.removeAttribute('aria-busy'); });
    });
  });

  // Countdown (hidden once the date has passed).
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.dataset.countdown).getTime();
    var put = function (k, v) { var el = cd.querySelector('[data-cd="' + k + '"]'); if (el) el.textContent = String(v).padStart(2, '0'); };
    var tick = function () {
      var left = target - Date.now();
      if (!(left > 0)) { cd.hidden = true; return false; }
      put('days', Math.floor(left / 864e5)); put('hours', Math.floor(left / 36e5) % 24);
      put('minutes', Math.floor(left / 6e4) % 60); put('seconds', Math.floor(left / 1e3) % 60);
      return true;
    };
    if (tick()) var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000);
  }

  // Apply form: sends without leaving the page (only when an address is set up – otherwise the button is off).
  document.querySelectorAll('form[data-apply][data-ajax]').forEach(function (form) {
    var btn = form.querySelector('.apply__send');
    var ok = form.querySelector('[data-ok]'), bad = form.querySelector('[data-bad]');
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      if (btn.disabled) return;
      if (form._honey && form._honey.value) return;
      btn.disabled = true; ok.hidden = true; bad.hidden = true;
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
      fetch(form.dataset.ajax, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error('failed'); form.reset(); ok.hidden = false; })
        .catch(function () { bad.hidden = false; btn.disabled = false; });
    });
  });
})();
