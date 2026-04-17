<script setup lang="ts">
// Poetry.vue
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const expanded = ref<Record<number, boolean>>({})

const toggle = (index: number) => {
  expanded.value[index] = !expanded.value[index]
}

const poems = [
  {
     title: "The Final Piece",
     preview: "\"You must have been so bright that you blinded me<br>'Cause I was too blind, too blind to see...\"",
     full: "\"You must have been so bright that you blinded me<br>'Cause I was too blind, too blind to see<br>The truth was right in front of me<br>You got scared of my intensity<br>Ran for the door to save yourself but you saved me<br>I'm evicting you, no more rent-free.<br>I realized that you weren't for me<br>After all the shit you said to me<br>You don't deserve the good in me<br>My blinding light was too bright for thee.<br>The loving lover, the father, the vulnerability—<br>Are integrally part of me.<br>That's just the beginning, you see,<br>I'm forgiving, understanding, the student and the teacher,<br>A partner—not to mention the loyalty.<br>Those are just some of my values that you'll never see,<br>There are just too many traits to name.<br>Sayonara. Peace.\"",
     date: "March 27, 2026"
  },
  {
     title: "The Vessel & The Singularity",
     preview: "\"Only when the soul burns brighter than the sun will we shed our vessels and return to the one...\"",
     full: "\"Only when the soul burns brighter than the sun will we shed our vessels and return to the one... the singularity.<br>Until then I will tune to the frequencies of nature and let my vibes Resonate.<br>Enter the State of Resonance.\"",
     date: "March 27, 2026"
  },
  {
     title: "L'Addiction Suprême",
     preview: "J'ai pris un petit détour durant mon séjour<br>pour faire face à l'amour ; la peur m'a pris<br>et j'ai dû faire demi-tour...",
     full: "J'ai pris un petit détour durant mon séjour pour faire face à l'amour ; la peur m'a pris et j'ai dû faire demi-tour. J'ai réalisé à quel point cette émotion est forte : elle ne se compare qu'à l'addiction aux drogues les plus dures. J'en ai conclu que l'amour doit absolument être essentiel à la survie de l'être humain.<br><br>Connaissez-vous une autre émotion qui vous hante matin, midi et soir ? C'est vraiment puissant. Quand le coup de foudre frappe, on ne pense plus qu'à ça. Tu te réveilles le matin et tu penses tout de suite à cette personne — c'est ta première pensée. Puis, pour un rien, tu y repenses encore. Tu regardes ton téléphone pour voir si elle a vu ton message, tu attends, ton cœur se serre... et quand elle répond, il bat plus vite ; l'anticipation est palpable.<br><br>Tu ne dors plus, tu n'as plus faim, c'est fou. Puis, quand ça ne marche pas, c'est comme si tu étais en manque. Je crois que c'est littéralement comme être privé de sa substance préférée : on y pense sans arrêt. Je ne connais aucune autre réaction biologique qui cause de pareils symptômes.<br><br>C'est là que le deuil s'installe, et c'est peut-être la phase la plus brutale. Le deuil, ce n'est pas seulement la fin d'une histoire, c'est le sevrage forcé d'une partie de soi-même. C'est le vide qui hurle là où il y avait du plein. On ne pleure pas seulement l'autre, on pleure l'avenir qu'on avait imaginé. Mais rappelez-vous : votre valeur ne diminue pas parce que quelqu'un ne l'a pas vue. Vous étiez entier avant, vous le serez encore.<br><br>Le « jeûne » de cette émotion est sensiblement le même ; pour moi, il a fallu au moins deux semaines avant que les choses se replacent, et je suis sûr que pour d'autres, c'est encore plus long. Si je suis totalement honnête, je crois qu'il a été plus dur, mentalement et physiquement, de renoncer à l'espoir qu'elle se rende compte de son erreur que d'arrêter de boire.<br><br>Aujourd'hui, je peux regarder cela d'un point de vue neutre et prendre un pas de recul. C'est ainsi que je suis venu à la conclusion que personne ne peut renoncer à l'amour. Inconsciemment et biologiquement, c'est ancré en nous comme rien d'autre. C'est essentiel à notre survie, à notre bien-être. Et comme une drogue, même quand ça fait mal, on y retournerait en sachant très bien que cela risque de nous détruire.",
     date: "March 23, 2026"
  },
  {
     title: "Le Coût Caché du Ressentiment",
     preview: "Ne laissez pas le ressentiment empoisonner votre âme. C'est véritablement le chemin le plus court vers le malheur...",
     full: "Ne laissez pas le ressentiment empoisonner votre âme. C'est véritablement le chemin le plus court vers le malheur. Quand vous éprouvez du ressentiment envers quelqu'un ou quelque chose, l'unique personne qui en souffre, c'est vous. Pensez-y : en vous accrochant à cette colère, vous rejouez la situation en boucle dans votre esprit. Cette répétition crée un cycle dans votre cerveau qui renforce les émotions négatives et vous garde prisonnier du passé.<br><br>Pendant ce temps, la personne qui vous a blessé n'y pense probablement même plus. Comme le dit si bien le proverbe : « Le ressentiment, c'est comme boire du poison en espérant que l'autre personne en meure. »<br><br>C'est tellement plus sain pour votre âme de lâcher prise. Le pardon n'est pas pour eux ; c'est pour vous. Vous n'avez même pas besoin de leur dire.<br>#1 Vous pardonnez pour vous-même.<br>#2 Vous vous pardonnez à vous-même.<br><br>C'est ainsi que vous retrouvez votre pouvoir et votre dignité. Vous apprenez, vous fixez des limites pour que cela ne se reproduise plus, et vous grandissez. Dépassez l'amertume — grandissez, aimez, vivez.",
     date: "March 26, 2026"
  }
]

onMounted(() => {
  gsap.from('.poetry-block', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: 'expo.out'
  })
})
</script>

<template>
  <div class="poetry-view header-padding">
    <div class="container">
      <div class="poetry-header" style="text-align: center; margin-bottom: 5rem; padding-top: 18vh;">
        <h1 class="hero-title" style="font-size: clamp(2.5rem, 6vw, 4.5rem); letter-spacing: 0.1em; position: relative; z-index: 1;">
          THE <span style="color: var(--color-gold);">TRANSMISSIONS</span>
        </h1>
        <p style="color: var(--color-gold-muted); letter-spacing: 0.2em; font-size: 1rem; margin-top: 1rem; text-transform: uppercase;">
          Poetry & Songwriting by Jayson Vinetti
        </p>
        <div class="hz-divider" style="margin: 2rem auto;"></div>
      </div>

      <div class="poetry-content" style="max-width: 900px; margin: 0 auto; color: rgba(255, 255, 255, 0.85); font-size: 1.1rem; line-height: 2; font-family: var(--font-body); text-align: center;">

        <!-- YouTube Music Link -->
        <div class="poetry-block" style="margin-bottom: 5rem;">
          <h2 style="font-family: var(--font-heading); color: var(--color-gold); letter-spacing: 0.1em; font-size: 1.5rem; margin-bottom: 2rem; text-transform: uppercase;">Acoustic Frequencies (YouTube Music)</h2>
          <div style="background: rgba(10, 10, 15, 0.8); border: 1px solid rgba(212, 175, 55, 0.1); padding: 3rem; border-radius: 12px;">
            <p style="margin-bottom: 2rem;">Listen to the complete State of Resonance musical discography directly on YouTube Music.</p>
            <a href="https://music.youtube.com/search?q=state+of+resonance" target="_blank" style="display: inline-block; padding: 1rem 2.5rem; background: transparent; border: 1px solid var(--color-gold); color: white; text-decoration: none; text-transform: uppercase; font-family: var(--font-heading); letter-spacing: 0.1em; transition: all 0.3s ease;" onmouseover="this.style.background='var(--color-gold)'; this.style.color='black';" onmouseout="this.style.background='transparent'; this.style.color='white';">
              Stream on YouTube Music
            </a>
          </div>
        </div>

        <!-- YouTube Link/Embed -->
        <div class="poetry-block" style="margin-bottom: 5rem;">
          <h2 style="font-family: var(--font-heading); color: var(--color-gold); letter-spacing: 0.1em; font-size: 1.5rem; margin-bottom: 2rem; text-transform: uppercase;">Visual Transmissions</h2>
          <div style="background: rgba(10, 10, 15, 0.8); border: 1px solid rgba(212, 175, 55, 0.1); padding: 3rem; border-radius: 12px;">
            <p style="margin-bottom: 2rem;">Explore the alchemical videos, sigil magic, and visual poetry on our official broadcast channel.</p>
            <a href="https://www.youtube.com/@stateofresonance" target="_blank" style="display: inline-block; padding: 1rem 2.5rem; background: transparent; border: 1px solid var(--color-gold); color: white; text-decoration: none; text-transform: uppercase; font-family: var(--font-heading); letter-spacing: 0.1em; transition: all 0.3s ease;" onmouseover="this.style.background='var(--color-gold)'; this.style.color='black';" onmouseout="this.style.background='transparent'; this.style.color='white';">
              Visit @stateofresonance on YouTube
            </a>
          </div>
        </div>

        <!-- Suno AI Audio Links -->
        <div class="poetry-block" style="margin-bottom: 5rem;">
          <h2 style="font-family: var(--font-heading); color: var(--color-gold); letter-spacing: 0.1em; font-size: 1.5rem; margin-bottom: 2rem; text-transform: uppercase;">Sonic Poetry (Suno)</h2>
          <div style="background: rgba(10, 10, 15, 0.8); border: 1px solid rgba(212, 175, 55, 0.1); padding: 3rem; border-radius: 12px;">
            <p style="margin-bottom: 2rem;">Listen to the emotionally raw, generative musical poetry I have composed and recorded as an extension of my spiritual journey.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="https://suno.com/@vinettijayson1" target="_blank" style="display: inline-block; padding: 1rem 2.5rem; background: transparent; border: 1px solid var(--color-gold); color: white; text-decoration: none; text-transform: uppercase; font-family: var(--font-heading); letter-spacing: 0.1em; transition: all 0.3s ease;" onmouseover="this.style.background='var(--color-gold)'; this.style.color='black';" onmouseout="this.style.background='transparent'; this.style.color='white';">
                Listen on Suno (@vinettijayson1)
              </a>
              <a href="https://suno.com/@jayvin80" target="_blank" style="display: inline-block; padding: 1rem 2.5rem; background: transparent; border: 1px solid var(--color-gold); color: white; text-decoration: none; text-transform: uppercase; font-family: var(--font-heading); letter-spacing: 0.1em; transition: all 0.3s ease;" onmouseover="this.style.background='var(--color-gold)'; this.style.color='black';" onmouseout="this.style.background='transparent'; this.style.color='white';">
                Listen on Suno (@jayvin80)
              </a>
            </div>
          </div>
        </div>
        
        <!-- Interactive Poetry -->
        <div style="margin-bottom: 3rem; margin-top: 6rem;">
          <h2 style="font-family: var(--font-heading); color: var(--color-gold-muted); letter-spacing: 0.2em; font-size: 1rem; text-transform: uppercase;">Written Poetry & Lyrics</h2>
          <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem; letter-spacing: 0.1em; margin-top: 0.5rem; text-transform: uppercase;">Click on a transmission to reveal its entirety</p>
          <div class="hz-divider" style="margin: 1rem auto 3rem;"></div>
        </div>

        <div 
          v-for="(poem, index) in poems" 
          :key="index"
          class="poetry-block interactive-poem" 
          :class="{ 'is-expanded': expanded[index] }"
          @click="toggle(index)"
          style="margin-bottom: 5rem; padding: 3rem; background: rgba(10, 10, 15, 0.8); border: 1px solid rgba(212, 175, 55, 0.1); cursor: pointer; position: relative;"
        >
          <div class="expand-icon" style="position: absolute; right: 2rem; top: 2rem; color: var(--color-gold); font-size: 1.5rem; transition: transform 0.4s ease;">
            {{ expanded[index] ? '−' : '+' }}
          </div>
          <h2 style="font-family: var(--font-heading); color: white; letter-spacing: 0.1em; font-size: 1.5rem; margin-bottom: 2rem; text-transform: uppercase;">{{ poem.title }}</h2>
          
          <p v-if="!expanded[index]" style="margin-bottom: 1rem; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; opacity: 0.8;" v-html="poem.preview"></p>
          
          <p v-if="expanded[index]" class="fade-in-text" style="margin-bottom: 1rem; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem;" v-html="poem.full"></p>

          <div style="margin-top: 2rem; color: var(--color-gold-muted); font-size: 0.9rem; font-family: var(--font-body); letter-spacing: 0.1em; text-transform: uppercase;">
            {{ poem.date }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.poetry-view {
  min-height: 100dvh;
  background-color: var(--color-bg);
  padding-bottom: 10vh;
  background-image: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 60%);
}
.hz-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold-muted), transparent);
  width: 150px;
}
.poetry-block {
  transition: transform 0.4s ease, border-color 0.4s ease;
}
.poetry-block:hover {
  border-color: rgba(212, 175, 55, 0.4) !important;
}
.interactive-poem:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.interactive-poem.is-expanded {
  border-color: rgba(212, 175, 55, 0.5) !important;
  background: rgba(15, 15, 20, 0.9) !important;
}
.interactive-poem.is-expanded .expand-icon {
  transform: rotate(180deg);
}
.fade-in-text {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
