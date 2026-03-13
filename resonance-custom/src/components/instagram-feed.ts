
export function initInstagramFeed() {
  const esotericSection = document.getElementById('esoteric');
  const main = document.querySelector('main');
  
  const instaSection = document.createElement('section');
  instaSection.id = 'instagram-feed';
  instaSection.className = 'instagram-feed';
  instaSection.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 60px;">
        <h2 style="font-size: 2.5rem;">As Seen In The Void</h2>
        <p style="opacity: 0.5; letter-spacing: 0.3em; margin-top: 10px;">@STATEOFRESONANCE</p>
      </div>
      <div class="insta-grid">
        <div class="insta-item glass"><img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=400" alt="Esoteric Luxury" /></div>
        <div class="insta-item glass"><img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400" alt="Alchemical Tools" /></div>
        <div class="insta-item glass"><img src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400" alt="Premium Manuscripts" /></div>
        <div class="insta-item glass"><img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400" alt="Sacred Space" /></div>
      </div>
    </div>
  `;
  
  if (esotericSection) {
    esotericSection.after(instaSection);
  } else if (main) {
    main.appendChild(instaSection);
  }
}
