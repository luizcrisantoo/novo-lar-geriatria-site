/**
 * components/faq-accordion.js — Renderiza e anima o FAQ accordion
 *
 * Usa FAQ_DATA (data/faq.js) para gerar o HTML dinamicamente.
 * Acessível: usa summary/details nativos + aria.
 */

const FaqAccordion = (() => {

  function render(targetSelector = '#faqList') {
    const container = document.querySelector(targetSelector);
    if (!container) return;

    const items = window.FAQ_DATA || [];
    if (!items.length) {
      container.innerHTML = '<p>Nenhuma pergunta cadastrada.</p>';
      return;
    }

    container.innerHTML = items.map((item, i) => `
      <details class="faq-item" ${i === 0 ? 'open' : ''}>
        <summary class="faq-item__question" aria-expanded="${i === 0}">
          <span>${item.question}</span>
          <i class="fa-solid fa-chevron-down faq-item__icon" aria-hidden="true"></i>
        </summary>
        <div class="faq-item__answer">
          <p>${item.answer}</p>
        </div>
      </details>
    `).join('');

    // Fecha outros quando um é aberto (accordion behavior)
    container.querySelectorAll('details').forEach(details => {
      details.addEventListener('toggle', () => {
        if (details.open) {
          container.querySelectorAll('details').forEach(other => {
            if (other !== details) other.removeAttribute('open');
          });
        }
      });
    });
  }

  return { render };

})();

window.FaqAccordion = FaqAccordion;
