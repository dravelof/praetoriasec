/* ============================================================
   Praetoria Cyber Security — Consentimiento de cookies + GA4
   Se carga en todas las páginas estáticas. GA4 solo se activa
   tras consentimiento explícito, con la misma clave que usa la
   portada React (localStorage 'pr_cookie_consent').
   ============================================================ */
(function () {
  var GTAG_ID = 'G-ZWJDXEKYPE';
  var KEY = 'pr_cookie_consent';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadGA() {
    if (window.__praetoriaGA) return;
    window.__praetoriaGA = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GTAG_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GTAG_ID);
  }

  function removeBanner() {
    var b = document.getElementById('pr-consent');
    if (b) b.parentNode.removeChild(b);
  }

  function showBanner() {
    if (document.getElementById('pr-consent')) return;
    var wrap = document.createElement('div');
    wrap.id = 'pr-consent';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Aviso de cookies');
    wrap.innerHTML =
      '<div class="pr-consent-in">' +
        '<p class="pr-consent-txt">Usamos cookies de análisis (Google Analytics) para entender el uso del sitio y mejorarlo. Puede aceptarlas o rechazarlas. Consulte nuestra <a href="/politica-de-cookies/">política de cookies</a>.</p>' +
        '<div class="pr-consent-btns">' +
          '<button type="button" class="pr-consent-btn pr-consent-reject" id="pr-consent-reject">Rechazar</button>' +
          '<button type="button" class="pr-consent-btn pr-consent-accept" id="pr-consent-accept">Aceptar</button>' +
        '</div>' +
      '</div>';
    var css = document.createElement('style');
    css.textContent =
      '#pr-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;background:#0E1B36;color:rgba(255,255,255,.92);border:1px solid rgba(184,146,83,.4);border-radius:14px;box-shadow:0 12px 40px rgba(5,11,26,.5);font-family:"Akzidenz-Grotesk BQ","Helvetica Neue",Arial,sans-serif;font-weight:300}' +
      '#pr-consent .pr-consent-in{max-width:1080px;margin:0 auto;padding:18px 22px;display:flex;gap:22px;align-items:center;justify-content:space-between;flex-wrap:wrap}' +
      '#pr-consent .pr-consent-txt{margin:0;font-size:13.5px;line-height:1.55;flex:1;min-width:260px}' +
      '#pr-consent a{color:#B89253}' +
      '#pr-consent .pr-consent-btns{display:flex;gap:10px;flex-wrap:wrap}' +
      '#pr-consent .pr-consent-btn{cursor:pointer;font-family:inherit;font-weight:500;font-size:13px;letter-spacing:.04em;padding:9px 18px;border-radius:10px;border:1px solid transparent;transition:all .15s ease}' +
      '#pr-consent .pr-consent-accept{background:#B89253;color:#0E1B36}' +
      '#pr-consent .pr-consent-accept:hover{background:#c9a468}' +
      '#pr-consent .pr-consent-reject{background:transparent;color:rgba(255,255,255,.85);border-color:rgba(255,255,255,.35)}' +
      '#pr-consent .pr-consent-reject:hover{background:rgba(255,255,255,.08)}';
    document.head.appendChild(css);
    document.body.appendChild(wrap);
    document.getElementById('pr-consent-accept').addEventListener('click', function () {
      save('accepted'); removeBanner(); loadGA();
    });
    document.getElementById('pr-consent-reject').addEventListener('click', function () {
      save('rejected'); removeBanner();
    });
  }

  // Permite al usuario revocar/cambiar su decisión en cualquier momento.
  function resetConsent() {
    try { localStorage.removeItem(KEY); } catch (e) {}
    window.location.reload();
  }
  function mountManage() {
    var rows = document.querySelectorAll('.copy .legal, nav.legalnav');
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.querySelector('[data-cookie-manage]')) continue;
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-cookie-manage', '');
      b.textContent = 'Configurar cookies';
      b.style.cssText = 'background:none;border:none;color:inherit;font:inherit;cursor:pointer;padding:0;text-decoration:underline';
      b.addEventListener('click', resetConsent);
      b.__cm = 1;
      row.appendChild(b);
    }
    var pre = document.querySelectorAll('[data-cookie-manage]');
    for (var j = 0; j < pre.length; j++) {
      if (!pre[j].__cm) { pre[j].__cm = 1; pre[j].addEventListener('click', function (e) { e.preventDefault(); resetConsent(); }); }
    }
  }

  function init() {
    mountManage();
    var v = stored();
    if (v === 'accepted') { loadGA(); return; }
    if (v === 'rejected') { return; }
    showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
