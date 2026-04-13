<script setup lang="ts">
// About.vue
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  // Bypassing strict GSAP opacity lockouts to ensure iOS Safari compliance
})
</script>

<template>
  <div class="about-view header-padding">
    <div class="container">
      <div class="about-header" style="text-align: center; margin-bottom: 5rem; padding-top: 5vh;">
        <h1 class="hero-title" style="font-size: clamp(2.5rem, 6vw, 4.5rem); letter-spacing: 0.1em;">
          A WORD FROM OUR <span style="color: var(--color-gold);">CREATOR</span>
        </h1>
        <div class="hz-divider" style="margin: 2rem auto;"></div>
      </div>

      <div class="about-content" style="max-width: 800px; margin: 0 auto; color: rgba(255, 255, 255, 0.7); font-size: 1.15rem; line-height: 1.9; font-family: var(--font-body);">
        
        <div class="about-content-block" style="margin-bottom: 4rem;">
          <h2 style="font-family: var(--font-heading); color: var(--color-gold-muted); letter-spacing: 0.2em; font-size: 1rem; margin-bottom: 1.5rem; text-transform: uppercase;">La Quête de Soi (The Quest for Self)</h2>
          <p style="margin-bottom: 1.5rem;">
            For many years, I searched for something without ever really knowing what or why. I always carried an overwhelming feeling of emptiness in my soul—a great void that never seemed to fill. Yet, I had a happy childhood. There was nothing in my past I could point to and say, "Ah, that's why I feel this way." My parents loved me, I had a beautiful family, and I was always encouraged to give my best. Despite it all, the feeling of not being "enough" persisted.
          </p>
          <p style="margin-bottom: 1.5rem;">
            Around the age of 13, I discovered drugs and alcohol, and I fell in love instantly. I loved how the void disappeared; that awkwardness I felt around others simply evaporated. It became my solution, and it worked—despite the chaos it created, even when I nearly lost my life in a car crash at 18. The lure of that soothing feeling was stronger than facing the emptiness. And it worked for 30 years. 
          </p>
          <p style="margin-bottom: 1.5rem;">
            Until it didn't. Until the relief turned into disgust, shame, and despair. I was completely broken. That was until a profound experience where I was transformed into a single molecule, alone in the vast universe of void and darkness. I was shown I had reasons to live. I realized the only way out was up, and the only way to climb was to finally admit I needed help.
          </p>
          <p>
            November 21, 2024, was the last time I consumed drugs or alcohol. Entering rehabilitation taught me that addiction is an affliction of the emotions. Through my journey, and through expressing these visceral emotions as a <strong>poet, songwriter, and tarot reader</strong>, I learned to process them rather than numb them. Be honest with yourself, follow your heart, be true. Because what I was truly searching for was myself. The void can only be filled from the inside.
          </p>
        </div>

        <div class="about-content-block" style="margin-bottom: 4rem;">
           <h2 style="font-family: var(--font-heading); color: var(--color-gold-muted); letter-spacing: 0.2em; font-size: 1rem; margin-bottom: 1.5rem; text-transform: uppercase;">The Architecture of the Self</h2>
           <p style="margin-bottom: 1.5rem;">
             Through meditation and faith, I had a realization: I couldn't fill the void with anything from the outside. So, I turned inward. I spent years immersing myself in sacred geometry, alchemical design, and the mathematics of resonance. I studied how 432Hz acts as the heartbeat of the Earth, reducing chaos, and how the Solfeggio scale strictly aligns our inner biological states. I realized that if I wanted to bridge the gap between ancient esoteric wisdom and my modern physical reality, I had to build the bridge myself.
           </p>
           <p>
             I began to see fashion as the architecture of the self. I started looking closely at the details—the geometry of fit, the exact harmonic resonance of 450GSM heavyweight cotton. I didn't want to just make clothes; I wanted to create a modern uniform. Something that feels like luxury loungewear, but behaves like a sacred shroud to cleanse the soul and keep negative energy at bay.
           </p>

        <div class="freq-hz-grid" style="margin-top: 3rem;">
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">174 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>RELIEVING PAIN & STRESS : THE FOUNDATION</strong><br/>
              A natural anesthetic. It gives organs a sense of security, safety and love, encouraging them to function optimally.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">285 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>HEALING TISSUE & ORGANS : THE QUANTUM HEALER</strong><br/>
              Influencing energy fields. Sending messages to restructure damaged organs and tissue, leaving your body rejuvenated.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">396 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>LIBERATING GUILT & FEAR : THE CATALYST</strong><br/>
              Turning grief into joy. Cleansing the feeling of guilt and subconscious fears that hold back your true potential.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">417 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>UNDOING SITUATIONS : THE CLEARING</strong><br/>
              Facilitating change. Cleansing traumatic experiences from your past and making space for positive quantum shifts.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">528 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>TRANSFORMATION & MIRACLES : THE LOVE FREQUENCY</strong><br/>
              Facilitating DNA repair and restoration. Resonance with the core of the biological lifecycle, clearing the path 
              for cellular miracles and profound emotional healing.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">639 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>CONNECTING & RELATIONSHIPS : THE HARMONIZER</strong><br/>
              Re-establishing balance within relationships and spiritual connections. Enhancing communication, understanding, and tolerance.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">741 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>EXPRESSION & SOLUTIONS : THE AWAKENING</strong><br/>
              Cleansing the space and cells from viral, bacterial and electromagnetic toxins. Leading to pure, stable cellular expression.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">852 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>RETURNING TO SPIRITUAL ORDER : THE INTUITION</strong><br/>
              Awakening inner strength and self-realization. Seeing through the illusions of life to discover your divine purpose.
            </p>
          </div>
          <div class="hz-card glass">
            <div class="hz-header">
              <span class="hz-value">963 HZ</span>
              <span class="hz-status">SIGNAL: ACTIVE</span>
            </div>
            <div class="hz-divider"></div>
            <p class="hz-def">
              <strong>DIVINE CONSCIOUSNESS : THE FREQUENCY OF GODS</strong><br/>
              Awakening the crown chakra. Returning to Unity and original Oneness with the Source. The 963 Hz signal allows direct 
              connection to the divine and the "All" through the pineal gland.
            </p>
          </div>
        </div>
        </div>

        <div class="about-content-block" style="margin-bottom: 4rem;">
          <h2 style="font-family: var(--font-heading); color: var(--color-gold-muted); letter-spacing: 0.2em; font-size: 1rem; margin-bottom: 1.5rem; text-transform: uppercase;">The Philosophy</h2>
          <p style="margin-bottom: 1.5rem;">
            My philosophy today is simple: <strong>Matter must serve Spirit, and healing must come from within.</strong> 
          </p>
          <p style="margin-bottom: 1.5rem;">
            When we hold onto anger or resentment, we poison our own souls and trap our minds in endless loops. To break free, we must look inward. As the ancient Alchemical motto dictates: <em>V.I.T.R.I.O.L. — Visita Interiora Terrae Rectificando Invenies Occultum Lapidem</em> (Visit the interior of the earth, and by rectifying, you will find the hidden stone). That stone is your true self.
          </p>
          <p style="margin-bottom: 1.5rem;">
            <strong>State of Resonance</strong> was born from this rebirth. Every artifact, every garment, and every ritual tool we create is historically and materially calibrated to a specific frequency—whether it's the 432 Hz 'Heartbeat of the Earth' or the 963 Hz 'Frequency of the Gods'. They are not meant to magically fix your void; they are meant to reflect the resonance and honesty you are building from the inside out. 
          </p>
          <p style="margin-bottom: 2.5rem;">
            Life is still life, with its ups and downs, but it is infinitely sweeter when you can live 'just for today', in the present moment. State of Resonance is a synchronization point for seekers who are ready to elevate their own biological and spiritual frequencies, facing their reflections with absolute honesty.
          </p>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: var(--color-gold); font-style: italic;">— Jay</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  min-height: 100vh;
  background-color: var(--color-bg);
  padding-bottom: 10vh;
}
.hz-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold-muted), transparent);
  width: 150px;
  margin: 1rem 0;
}
.about-content p {
  color: rgba(255, 255, 255, 0.8);
}
.about-content strong {
  color: white;
  letter-spacing: 0.05em;
}

/* Solfeggio Grid Styles */
.freq-hz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.hz-card {
  padding: 2.5rem;
  text-align: left;
  border: 1px solid rgba(212, 175, 55, 0.1);
  transition: all 0.5s var(--ease-out-expo);
}
.hz-card:hover {
  border-color: var(--color-gold);
  background: rgba(212, 175, 55, 0.05);
  transform: translateY(-5px);
}
.hz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.hz-value {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-gold);
}
.hz-status {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: #4ade80;
}
.hz-def {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
}
@media (max-width: 968px) {
  .freq-hz-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
