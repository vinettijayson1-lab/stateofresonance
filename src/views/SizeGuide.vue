<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Size Guide | State of Resonance'
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.setAttribute('content', 'State of Resonance size guide for hoodies, tees, and crewnecks. All pieces are cut oversized — see measurements in inches and centimetres.')
})
</script>

<template>
  <div class="size-guide-page container" style="padding: 18vh 0 12vh; max-width: 900px; margin: 0 auto;">

    <!-- Hero -->
    <div style="text-align: center; margin-bottom: 5rem;">
      <p style="font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--color-gold-muted); margin-bottom: 1.5rem;">FIT GUIDE</p>
      <h1 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #fff; margin-bottom: 1.5rem;">
        Size <span style="color: var(--color-gold);">Guide</span>
      </h1>
      <p style="font-size: 1rem; color: rgba(255,255,255,0.55); line-height: 1.7; max-width: 560px; margin: 0 auto;">
        All State of Resonance pieces are cut <strong style="color: rgba(255,255,255,0.85);">oversized and boxy</strong>. If you prefer a more fitted silhouette, size down one. When in doubt, go true to size for the intended look.
      </p>
    </div>

    <!-- Fit Note -->
    <div class="glass fit-note" style="padding: 1.5rem 2rem; margin-bottom: 3rem; border: 1px solid rgba(212,175,55,0.2); display: flex; gap: 1rem; align-items: flex-start;">
      <span style="font-size: 1.2rem; flex-shrink: 0; margin-top: 2px;">💡</span>
      <p style="font-size: 0.85rem; line-height: 1.7; color: rgba(255,255,255,0.7);">
        <strong style="color: #fff;">Sizing tip:</strong> Our hoodies and crewnecks are pre-shrunk heavyweight cotton (400 GSM). They will not shrink after washing. All measurements below are body measurements, not garment measurements.
      </p>
    </div>

    <!-- Hoodies & Crewnecks -->
    <div class="glass" style="padding: 3rem; margin-bottom: 2rem; border: 1px solid rgba(212,175,55,0.12);">
      <h2 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; margin-bottom: 2rem;">
        Hoodies &amp; Crewnecks
      </h2>
      <div class="table-wrapper">
        <table class="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (in)</th>
              <th>Chest (cm)</th>
              <th>Length (in)</th>
              <th>Length (cm)</th>
              <th>Sleeve (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="size-label">S</td>
              <td>38–40</td><td>97–102</td>
              <td>27</td><td>68.5</td>
              <td>33</td>
            </tr>
            <tr>
              <td class="size-label">M</td>
              <td>40–43</td><td>102–109</td>
              <td>28</td><td>71</td>
              <td>34</td>
            </tr>
            <tr>
              <td class="size-label">L</td>
              <td>43–46</td><td>109–117</td>
              <td>29</td><td>73.5</td>
              <td>35</td>
            </tr>
            <tr>
              <td class="size-label">XL</td>
              <td>46–50</td><td>117–127</td>
              <td>30</td><td>76</td>
              <td>36</td>
            </tr>
            <tr>
              <td class="size-label">2XL</td>
              <td>50–54</td><td>127–137</td>
              <td>31</td><td>78.5</td>
              <td>37</td>
            </tr>
            <tr>
              <td class="size-label">3XL</td>
              <td>54–58</td><td>137–147</td>
              <td>32</td><td>81</td>
              <td>38</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tees -->
    <div class="glass" style="padding: 3rem; margin-bottom: 2rem; border: 1px solid rgba(212,175,55,0.12);">
      <h2 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; margin-bottom: 2rem;">
        Graphic Tees
      </h2>
      <div class="table-wrapper">
        <table class="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (in)</th>
              <th>Chest (cm)</th>
              <th>Length (in)</th>
              <th>Length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="size-label">S</td>
              <td>36–38</td><td>91–97</td>
              <td>27</td><td>68.5</td>
            </tr>
            <tr>
              <td class="size-label">M</td>
              <td>38–40</td><td>97–102</td>
              <td>28</td><td>71</td>
            </tr>
            <tr>
              <td class="size-label">L</td>
              <td>40–43</td><td>102–109</td>
              <td>29</td><td>73.5</td>
            </tr>
            <tr>
              <td class="size-label">XL</td>
              <td>43–47</td><td>109–119</td>
              <td>30</td><td>76</td>
            </tr>
            <tr>
              <td class="size-label">2XL</td>
              <td>47–51</td><td>119–130</td>
              <td>31</td><td>78.5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- How to Measure -->
    <div class="glass" style="padding: 3rem; margin-bottom: 4rem; border: 1px solid rgba(255,255,255,0.06);">
      <h2 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #fff; margin-bottom: 2rem;">How to Measure</h2>
      <div class="measure-grid">
        <div class="measure-item">
          <p class="measure-title">Chest</p>
          <p class="measure-desc">Measure around the fullest part of your chest, keeping the tape horizontal under your arms.</p>
        </div>
        <div class="measure-item">
          <p class="measure-title">Length</p>
          <p class="measure-desc">Measure from the highest point of your shoulder down to where you want the hem to fall.</p>
        </div>
        <div class="measure-item">
          <p class="measure-title">Sleeve</p>
          <p class="measure-desc">Measure from the centre back of your neck, over your shoulder, to your wrist.</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align: center;">
      <p style="font-size: 0.7rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin-bottom: 2rem; text-transform: uppercase;">Not sure? We'll help.</p>
      <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <router-link to="/contact" class="btn-gold">Ask Us Anything</router-link>
        <router-link to="/best-sellers" class="btn-outline">Shop the Collection</router-link>
      </div>
    </div>

  </div>
</template>

<style scoped>
.size-guide-page {
  min-height: 100vh;
}

.fit-note {
  border-radius: 2px;
}

.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.size-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}

.size-table th {
  font-size: 0.55rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold-muted);
  opacity: 0.7;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(212,175,55,0.15);
  text-align: left;
  white-space: nowrap;
}

.size-table td {
  padding: 1rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.7);
}

.size-table tr:hover td {
  background: rgba(212,175,55,0.03);
}

.size-table tr:last-child td {
  border-bottom: none;
}

.size-label {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: #fff !important;
  letter-spacing: 0.05em;
}

.measure-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.measure-item {
  padding: 1.5rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
}

.measure-title {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.measure-desc {
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(255,255,255,0.5);
}

@media (max-width: 768px) {
  .measure-grid {
    grid-template-columns: 1fr;
  }
}
</style>
