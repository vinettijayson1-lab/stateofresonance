
export function initChatWidget() {
  const chat = document.createElement('div');
  chat.id = 'chat-widget';
  chat.className = 'chat-widget';
  chat.innerHTML = `
    <div class="chat-bubble glass" id="chat-trigger">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </div>
    <div class="chat-window glass">
      <div class="chat-header">
        <strong>RESONANCE SUPPORT</strong>
        <span class="online-indicator"></span>
      </div>
      <div class="chat-body">
        <div class="message system">How can we assist your alignment today?</div>
      </div>
      <div class="chat-input-wrap">
        <input type="text" placeholder="Type a message..." class="chat-input" />
        <button class="chat-send">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(chat);

  const trigger = chat.querySelector('#chat-trigger');
  const window = chat.querySelector('.chat-window');

  trigger?.addEventListener('click', () => {
    window?.classList.toggle('visible');
  });
}
