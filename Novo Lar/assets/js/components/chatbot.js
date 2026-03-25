/**
 * components/chatbot.js — Chatbot por regras com fallback para WhatsApp
 *
 * Arquitetura:
 *  - Desacoplado da página principal (injeta o próprio DOM)
 *  - Usa FAQ_DATA como base de conhecimento
 *  - Fallback automático para WhatsApp quando não entende
 *  - Zero dependências externas
 */

const Chatbot = (() => {

  /* ── Configurações ─────────────────────────────────────────── */
  const WELCOME_MESSAGE = 'Olá! 👋 Sou o assistente virtual do Novo Lar. Como posso ajudar você hoje?';
  const FALLBACK_MESSAGE = 'Não encontrei uma resposta exata para isso. Que tal falar diretamente com nossa equipe pelo WhatsApp? Eles vão te ajudar rapidinho! 😊';
  const TYPING_DELAY_MS  = 800;

  const QUICK_REPLIES = [
    { label: '💰 Valores e planos',    intent: 'valor' },
    { label: '🏠 Agendar visita',       intent: 'agendar' },
    { label: '👨‍⚕️ Cuidados médicos',  intent: 'médico' },
    { label: '🍽️ Alimentação',         intent: 'alimentação' },
    { label: '🎭 Atividades',           intent: 'atividade' },
    { label: '📍 Endereço',            intent: 'endereço' },
  ];

  /* ── Estado interno ───────────────────────────────────────── */
  let isOpen = false;
  let container, messagesEl, inputEl;

  /* ── Lógica de busca no FAQ ────────────────────────────────── */
  function findAnswer(query) {
    const q = query.toLowerCase().trim();
    const faq = window.FAQ_DATA || [];

    // 1. Busca por keywords exatas
    const match = faq.find(item =>
      item.keywords.some(kw => q.includes(kw))
    );
    if (match) return match.answer;

    // 2. Busca parcial no texto da pergunta
    const partial = faq.find(item =>
      item.question.toLowerCase().split(' ').some(word =>
        word.length > 4 && q.includes(word)
      )
    );
    if (partial) return partial.answer;

    return null;
  }

  /* ── Renderização de mensagens ─────────────────────────────── */
  function addMessage(text, sender = 'bot') {
    const msg = document.createElement('div');
    msg.className = `chat-msg chat-msg--${sender}`;
    msg.innerHTML = sender === 'bot'
      ? `<div class="chat-bubble">${text}</div>`
      : `<div class="chat-bubble">${text}</div>`;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-msg chat-msg--bot chat-typing';
    typing.id = 'chat-typing';
    typing.innerHTML = '<div class="chat-bubble"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    document.getElementById('chat-typing')?.remove();
  }

  function showQuickReplies() {
    // Remove anteriores
    document.querySelector('.chat-quick-replies')?.remove();

    const wrap = document.createElement('div');
    wrap.className = 'chat-quick-replies';
    QUICK_REPLIES.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'chat-quick-btn';
      btn.textContent = r.label;
      btn.addEventListener('click', () => {
        wrap.remove();
        handleUserMessage(r.intent);
      });
      wrap.appendChild(btn);
    });
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showWhatsAppFallback() {
    const cfg = window.SITE_CONFIG?.whatsapp;
    if (!cfg) return;
    const wa = document.createElement('a');
    wa.href = `https://wa.me/${cfg.number}?text=${encodeURIComponent(cfg.defaultMessage)}`;
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.className = 'chat-wa-btn';
    wa.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Falar pelo WhatsApp';
    messagesEl.appendChild(wa);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /* ── Processamento de mensagem ─────────────────────────────── */
  function handleUserMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');

    showTyping();

    setTimeout(() => {
      hideTyping();
      const answer = findAnswer(text);

      if (answer) {
        addMessage(answer, 'bot');
      } else {
        addMessage(FALLBACK_MESSAGE, 'bot');
        showWhatsAppFallback();
      }
    }, TYPING_DELAY_MS);
  }

  /* ── Construção do DOM ─────────────────────────────────────── */
  function buildDOM() {
    container = document.createElement('div');
    container.id = 'chatbot';
    container.className = 'chatbot';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-label', 'Assistente virtual do Novo Lar');

    container.innerHTML = `
      <!-- Botão de abrir -->
      <button class="chatbot__toggle" id="chatToggle" aria-label="Abrir chat de atendimento">
        <i class="fa-regular fa-comment-dots chatbot__icon-open"></i>
        <i class="fa-solid fa-xmark chatbot__icon-close" style="display:none"></i>
        <span class="chatbot__badge">?</span>
      </button>

      <!-- Janela do chat -->
      <div class="chatbot__window" id="chatWindow" style="display:none" role="dialog" aria-modal="true" aria-label="Chat de atendimento">

        <!-- Header -->
        <div class="chatbot__header">
          <div class="chatbot__header-info">
            <div class="chatbot__avatar" aria-hidden="true">
              <i class="fa-solid fa-house-heart"></i>
            </div>
            <div>
              <strong>Novo Lar</strong>
              <span>Assistente virtual · Online</span>
            </div>
          </div>
          <button class="chatbot__close" id="chatClose" aria-label="Fechar chat">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <!-- Mensagens -->
        <div class="chatbot__messages" id="chatMessages" aria-live="polite"></div>

        <!-- Input -->
        <div class="chatbot__footer">
          <input
            type="text"
            id="chatInput"
            class="chatbot__input"
            placeholder="Digite sua dúvida…"
            aria-label="Digite sua mensagem"
            autocomplete="off"
            maxlength="200"
          >
          <button class="chatbot__send" id="chatSend" aria-label="Enviar mensagem">
            <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(container);

    // Referências
    messagesEl = document.getElementById('chatMessages');
    inputEl    = document.getElementById('chatInput');

    // Eventos
    document.getElementById('chatToggle').addEventListener('click', toggle);
    document.getElementById('chatClose').addEventListener('click', close);
    document.getElementById('chatSend').addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
  }

  /* ── Controle de abertura/fechamento ───────────────────────── */
  function toggle() { isOpen ? close() : open(); }

  function open() {
    isOpen = true;
    const win = document.getElementById('chatWindow');
    win.style.display = 'flex';
    win.style.flexDirection = 'column';
    document.querySelector('.chatbot__icon-open').style.display = 'none';
    document.querySelector('.chatbot__icon-close').style.display = '';
    document.querySelector('.chatbot__badge').style.display = 'none';
    inputEl.focus();
  }

  function close() {
    isOpen = false;
    document.getElementById('chatWindow').style.display = 'none';
    document.querySelector('.chatbot__icon-open').style.display = '';
    document.querySelector('.chatbot__icon-close').style.display = 'none';
  }

  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    handleUserMessage(text);
  }

  /* ── Inicialização pública ─────────────────────────────────── */
  function init() {
    buildDOM();

    // Mensagem de boas-vindas com delay
    setTimeout(() => {
      addMessage(WELCOME_MESSAGE, 'bot');
      showQuickReplies();
    }, 600);
  }

  return { init, open, close };

})();

window.Chatbot = Chatbot;
