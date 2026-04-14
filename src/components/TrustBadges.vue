<template>
  <div class="trust-badges-strip">
    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <div class="badge-copy">
        <span class="badge-title">SECURE CHECKOUT</span>
        <span class="badge-sub">256-bit SSL encryption</span>
      </div>
    </div>

    <div class="trust-divider"></div>

    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <div class="badge-copy">
        <span class="badge-title">30-DAY RETURNS</span>
        <span class="badge-sub">No questions asked</span>
      </div>
    </div>

    <div class="trust-divider"></div>

    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"/></svg>
      <div class="badge-copy">
        <span class="badge-title">FREE SHIPPING</span>
        <span class="badge-sub">Orders over $110 CAD</span>
      </div>
    </div>

    <div class="trust-divider"></div>

    <div class="trust-badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
      <div class="badge-copy">
        <span class="badge-title">SAFE PAYMENT</span>
        <span class="badge-sub">Visa · MC · Amex · PayPal</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trust-badges-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  margin-top: 2rem;
}

.trust-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
  min-width: 120px;
}

.trust-badge svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: #d4af37;
  opacity: 0.8;
}

.badge-copy {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.badge-title {
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.8);
  font-weight: 600;
}

.badge-sub {
  font-size: 0.55rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.05em;
}

.trust-divider {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.07);
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .trust-divider { display: none; }
  .trust-badge { min-width: 45%; }
}
</style>
