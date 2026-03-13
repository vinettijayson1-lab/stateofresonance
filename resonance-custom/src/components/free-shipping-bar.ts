
export function initFreeShippingBar() {
  const bar = document.createElement('div');
  bar.id = 'free-shipping-bar';
  bar.className = 'free-shipping-bar';
  
  const threshold = 120;
  let currentCartTotal = 0; // In a real app, this would come from a cart state
  
  function updateBar() {
    const remaining = Math.max(0, threshold - currentCartTotal);
    const progress = Math.min(100, (currentCartTotal / threshold) * 100);
    
    if (remaining > 0) {
      bar.innerHTML = `
        <div class="bar-content">
          <span>You're $${remaining.toFixed(2)} away from <strong>FREE SHIPPING</strong></span>
          <div class="progress-wrap">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
      `;
    } else {
      bar.innerHTML = `
        <div class="bar-content">
          <span>🎉 You've unlocked <strong>FREE SHIPPING</strong></span>
        </div>
      `;
    }
  }

  updateBar();
  document.body.prepend(bar);
}
