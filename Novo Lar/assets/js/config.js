/**
 * config.js — Configurações globais do Novo Lar
 *
 * EDITE APENAS ESTE ARQUIVO para atualizar telefone, endereço,
 * horários e qualquer informação de contato em todo o site.
 */

const SITE_CONFIG = {

  /* ── Identidade ───────────────────────────────────────────────── */
  name:     'Novo Lar Geriátrico',
  shortName:'Novo Lar',
  tagline:  'Repouso Geriátrico',
  slogan:   'Um lar acolhedor para quem você mais ama',
  description: 'Instituição de Longa Permanência para Idosos (ILPI) em Recife, PE. Cuidado humanizado, estrutura completa e equipe especializada.',

  /* ── Contato ──────────────────────────────────────────────────── */
  phone: {
    display: '(81) 4042-2170',
    link:    'tel:+558140422170',
  },
  whatsapp: {
    number:  '5581996748011',
    display: '(81) 99674-8011',
    defaultMessage: 'Olá! Gostaria de mais informações sobre o Novo Lar Geriátrico.',
    visitMessage:   'Olá! Gostaria de agendar uma visita ao Novo Lar Geriátrico.',
    quoteMessage:   'Olá! Gostaria de saber o valor das mensalidades do Novo Lar.',
  },

  /* ── Endereço ─────────────────────────────────────────────────── */
  address: {
    street:  'Rua Diógenes Sampaio, 80',
    neighborhood: 'Várzea',
    city:    'Recife',
    state:   'PE',
    zip:     '50980-250',
    full:    'Rua Diógenes Sampaio, 80 – Várzea, Recife – PE',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.9862!2d-34.9486!3d-8.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18ae2a9d8c3d%3A0x7b9fa2d!2sR.%20Di%C3%B4genes%20Sampaio%2C%2080%20-%20V%C3%A1rzea%2C%20Recife%20-%20PE!5e0!3m2!1spt-BR!2sbr!4v1700000000',
    lat:  '-8.06',
    lng:  '-34.9486',
  },

  /* ── Horários ─────────────────────────────────────────────────── */
  hours: {
    general:  'Aberto todos os dias · 24 horas',
    visits:   'Todos os dias · 09:00h às 16:00h',
    office:   'Seg a Sex · 08h às 17h',
  },

  /* ── Redes sociais ────────────────────────────────────────────── */
  social: {
    instagram: 'https://www.instagram.com/novolargeriatrico/',
    instagramHandle: '@novolargeriatrico',
  },

  /* ── Avaliação Google ─────────────────────────────────────────── */
  googleRating: {
    score:   4.7,
    count:   13,
    display: '4.7 ★',
  },

  /* ── Números de destaque ──────────────────────────────────────── */
  stats: [
    { value: '+20',  label: 'Anos de experiência' },
    { value: '4.7★', label: 'Avaliação no Google' },
    { value: '24h',  label: 'Cuidado ininterrupto' },
    { value: '100%', label: 'Dedicação aos residentes' },
  ],

};

// Expõe globalmente para uso por outros módulos
window.SITE_CONFIG = SITE_CONFIG;
