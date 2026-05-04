<template>
  <div class="home-view">

    <!-- TRUST -->
    <div class="hero-trust-widget">
      <TrustBadge type="secure" />
      <TrustBadge type="orders" />
      <TrustBadge type="ssl" />
    </div>

    <!-- HERO -->
    <section class="fossil-hero">
      <div class="fossil-hero-bg">
        <img src="/images/lookbook/lookbook-hero.jpg" class="fossil-hero-img"erlay"></div>
      </div>

      <div class="fossil-hero-center">
        <h1 class="fossil-brand-wordmark">STATE OF RESONANCE</h1>

        <!-- ✅ ADDED VALUE PROP -->
        <p class="hero-value">
          Esoteric streetwear engineered for presence.
        </p>

        <router-link to="/best-sellers" class="btn-premium">
          SHOP COLLECTION →
        </router-link>
      </div>

      <div class="fossil-city-clock">
        MONTRÉAL: {{ clockTime }}
      </div>
    </section>

    <!-- TRUST BAR -->
    <div class="fossil-ticker">
      <span>✦ 450GSM HEAVYWEIGHT</span>
      <span>✦ DESIGNED IN CANADA</span>
      <span>✦ LIMITED DROPS</span>
      <span>✦ FREE SHIPPING $110+</span>
    </div>

    <!-- FEATURE PRODUCT -->
    <section class="fossil-gateway-section">
      <div class="gateway-container">

        <img
          class="gateway-image"
