/**
 * main.js — Ponto de entrada principal
 *
 * Responsabilidade: inicializar componentes e orquestrar a página.
 * NÃO contém lógica de negócio — apenas chama os módulos corretos.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Componentes globais ────────────────────────────────── */
  WhatsApp.init();        // Hidrata todos os [data-wa] com URLs corretas
  CookieBanner.init();    // Banner LGPD (exibe 1x por visitante)
  FaqAccordion.render();  // Renderiza FAQ a partir dos dados
  Chatbot.init();         // Injeta chatbot no DOM

  /* ── 2. Preenche dados dinâmicos da config ─────────────────── */
  _fillConfigData();

  /* ── 3. Menu mobile ────────────────────────────────────────── */
  _initMobileMenu();

  /* ── 4. Animações de entrada (Intersection Observer) ──────── */
  _initScrollAnimations();

  /* ── 5. Scroll spy — destaca link ativo na nav ─────────────── */
  _initScrollSpy();

});

/* ================================================================
   FUNÇÕES PRIVADAS (prefixo _ = uso interno)
   ================================================================ */

/** Preenche telefone, endereço e outros dados dinâmicos via data-* */
function _fillConfigData() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // Elementos com [data-fill="phone"], [data-fill="address"], etc.
  document.querySelectorAll('[data-fill]').forEach(el => {
    const key = el.dataset.fill;
    switch (key) {
      case 'phone':      el.textContent = cfg.phone.display; break;
      case 'whatsapp':   el.textContent = cfg.whatsapp.display; break;
      case 'address':    el.textContent = cfg.address.full; break;
      case 'hours':      el.textContent = cfg.hours.general; break;
      case 'visits':     el.textContent = cfg.hours.visits; break;
      case 'instagram':  el.textContent = cfg.social.instagramHandle; break;
      case 'rating':     el.textContent = cfg.googleRating.display; break;
    }
  });
}

/** Menu hamburger mobile */
function _initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Fecha o menu ao clicar em link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/** Anima cards e elementos ao entrar na viewport */
function _initScrollAnimations() {
  const els = document.querySelectorAll(
    '.dif-card, .serv-card, .depo-card, .gallery__item, .socia-card, .faq-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

/** Destaca o link ativo na navbar conforme a seção visível */
function _initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (link) link.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}
