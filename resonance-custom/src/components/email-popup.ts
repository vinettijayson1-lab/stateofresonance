
export function initEmailPopup() {
  const popup = document.createElement('div');
  popup.id = 'email-popup';
  popup.className = 'email-popup-overlay';
  popup.innerHTML = `
    <div class="email-popup-content glass">
      <button class="popup-close">&times;</button>
      <div class="popup-inner">
        <h2 style="font-size: 2rem; color: var(--color-gold-muted);">The inner circle</h2>
        <p style="margin: 20px 0; opacity: 0.8; line-height: 1.6;">Receive transmissions of rare artifacts and exclusive invites to alchemical gatherings.</p>
        <div class="popup-form">
          <input type="email" placeholder="Your Digital Address" class="glass-input" />
          <button class="btn-premium">Subscribe</button>
        </div>
        <p style="font-size: 0.7rem; opacity: 0.4; margin-top: 20px;">We value silence. No spam, only signal.</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);

  const closeBtn = popup.querySelector('.popup-close');
  closeBtn?.addEventListener('click', () => {
    popup.classList.remove('visible');
  });

  // Delay appearance
  setTimeout(() => {
    if (!localStorage.getItem('resonance-popup-closed')) {
      popup.classList.add('visible');
    }
  }, 5000);

  // Close on backdrop click
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('visible');
      localStorage.setItem('resonance-popup-closed', 'true');
    }
  });
}
