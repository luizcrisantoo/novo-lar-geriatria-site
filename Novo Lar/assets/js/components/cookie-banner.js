/**
 * components/cookie-banner.js — Banner de cookies / LGPD
 *
 * Exibe apenas uma vez (salva consentimento no localStorage).
 * Não coleta dados — apenas informa ao usuário.
 */

const CookieBanner = (() => {

  const STORAGE_KEY = 'novoLar_cookieConsent';

  function hasConsented() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'true');
    document.getElementById('cookieBanner')?.remove();
  }

  function init() {
    if (hasConsented()) return;

    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies e privacidade');

    const privLink = window.SITE_CONFIG ? 'privacidade.html' : '#';

    banner.innerHTML = `
      <div class="cookie-banner__content">
        <p>
          Usamos cookies para melhorar sua experiência. Ao continuar navegando,
          você concorda com nossa
          <a href="${privLink}" target="_blank" rel="noopener">Política de Privacidade</a>.
        </p>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn cookie-banner__btn--accept" id="cookieAccept">
            Aceitar e continuar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    document.getElementById('cookieAccept').addEventListener('click', accept);
  }

  return { init };

})();

window.CookieBanner = CookieBanner;
