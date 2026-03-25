/**
 * components/whatsapp.js — Helper centralizado para links WhatsApp
 *
 * USO: WhatsApp.open('visita')  ou  WhatsApp.open('custom', 'Minha mensagem')
 * Centraliza todos os links para que uma mudança de número atualize o site todo.
 */

const WhatsApp = (() => {

  /**
   * Gera a URL do WhatsApp com mensagem pré-definida.
   * @param {string} context  - Contexto: 'default' | 'visita' | 'orcamento' | 'custom'
   * @param {string} [custom] - Mensagem personalizada (usado com context='custom')
   */
  function buildUrl(context = 'default', custom = '') {
    const cfg = window.SITE_CONFIG?.whatsapp;
    if (!cfg) { console.warn('WhatsApp: SITE_CONFIG não encontrado.'); return '#'; }

    const messages = {
      default:   cfg.defaultMessage,
      visita:    cfg.visitMessage,
      orcamento: cfg.quoteMessage,
      custom:    custom,
    };

    const msg = messages[context] || messages.default;
    return `https://wa.me/${cfg.number}?text=${encodeURIComponent(msg)}`;
  }

  /** Abre o WhatsApp em nova aba */
  function open(context = 'default', custom = '') {
    window.open(buildUrl(context, custom), '_blank', 'noopener');
  }

  /** Inicializa todos os elementos [data-wa] da página */
  function init() {
    document.querySelectorAll('[data-wa]').forEach(el => {
      const context = el.dataset.wa || 'default';
      const custom  = el.dataset.waMsg || '';
      const url     = buildUrl(context, custom);

      if (el.tagName === 'A') {
        el.href   = url;
        el.target = '_blank';
        el.rel    = 'noopener noreferrer';
      } else {
        el.addEventListener('click', () => open(context, custom));
        el.style.cursor = 'pointer';
      }
    });
  }

  return { buildUrl, open, init };

})();

window.WhatsApp = WhatsApp;
