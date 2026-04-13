import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { klaviyoService } from '../services/klaviyo';

export interface Manifestation {
  id: string;
  seeker: string;
  tier: string;
  frequency: string;
  content: string;
  timestamp: string;
}

export interface ResonanceState {
  tier: '396_HZ' | '417_HZ' | '528_HZ' | '639_HZ' | '741_HZ' | '852_HZ' | '963_HZ' | 'RESONANCE_ACHIEVED' | null;
  energy: string | null;
  detectedFrequency: string | null;
  recommendedArtifact: string | null;
  lastSync: string | null;
  ownedArtifacts: string[];
  manifestations: Manifestation[];
  resonancePoints: number;
  email: string | null;
  referralId: string | null;
  referrals: number;
}

export const useResonanceStore = defineStore('resonance', {
  state: () => ({
    persistence: useLocalStorage<ResonanceState>('sor_resonance_state', {
      tier: null,
      energy: null,
      detectedFrequency: null,
      recommendedArtifact: null,
      lastSync: null,
      ownedArtifacts: [],
      manifestations: [],
      resonancePoints: 0,
      email: null,
      referralId: null,
      referrals: 0
    })
  }),
  
  getters: {
    tier: (state) => state.persistence.tier,
    energy: (state) => state.persistence.energy,
    detectedFrequency: (state) => state.persistence.detectedFrequency,
    isCalibrated: (state) => !!state.persistence.tier,
    isOwner: (state) => (handle: string) => state.persistence.ownedArtifacts.includes(handle),
    resonancePoints: (state) => state.persistence.resonancePoints,
    referralId: (state) => state.persistence.referralId,
    referrals: (state) => state.persistence.referrals,
    memberDiscount: (state) => {
      const mapping: Record<string, number> = {
        '396_HZ': 0,
        '417_HZ': 0.05,
        '528_HZ': 0.10,
        '639_HZ': 0.15,
        '741_HZ': 0.20,
        '852_HZ': 0.25,
        '963_HZ': 0.30,
        'RESONANCE_ACHIEVED': 0.35
      };
      return mapping[state.persistence.tier || ''] || 0;
    }
  },

  actions: {
    commitResonance(data: Partial<ResonanceState>) {
      this.persistence = {
        ...this.persistence,
        ...data,
        lastSync: new Date().toISOString()
      };
      
      this.checkAscension();
      this.pushToDatabase();
    },

    async handshake(email: string) {
      this.persistence.email = email;
      try {
        const referredBy = localStorage.getItem('sor_referred_by');
        let url = `/api/seeker?email=${encodeURIComponent(email)}`;
        if (referredBy) {
          url += `&referredBy=${encodeURIComponent(referredBy)}`;
        }
        
        const res = await fetch(url);
        if (res.ok) {
          const dbState = await res.json();
          // Sync down from DB
          this.persistence.tier = dbState.tier;
          this.persistence.resonancePoints = dbState.resonanceScore;
          this.persistence.referralId = dbState.referralCode;
          this.persistence.referrals = dbState.invitesSuccess;
          
          
          // Clear it so we don't accidentally credit again if handshaking a DIFFERENT email later (unlikely but safe)
          if (referredBy) localStorage.removeItem('sor_referred_by');
        }
      } catch (err) {
        console.error('Handshake failed:', err);
      }
    },

    async pushToDatabase() {
      if (!this.persistence.email) return;
      try {
        await fetch('/api/seeker', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.persistence.email,
            forceTier: this.persistence.tier,
            addPoints: 0 // Just forcing a tier resync here
          })
        });
      } catch (err) {
        // Silent fail on local
      }
    },

    syncArtifact(handle: string) {
      if (!this.persistence.ownedArtifacts.includes(handle)) {
        this.persistence.ownedArtifacts.push(handle);
        this.addPoints(100);
      }
    },

    async addPoints(amount: number) {
      this.persistence.resonancePoints += amount;
      this.checkAscension();
      
      if (this.persistence.email) {
        try {
          await fetch('/api/seeker', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: this.persistence.email,
              addPoints: amount
            })
          });
        } catch (err) {}
      }
    },

    initializeReferral() {
      if (!this.persistence.referralId) {
        this.persistence.referralId = 'SR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      }
    },

    recordReferral() {
      this.persistence.referrals++;
      this.persistence.resonancePoints += 50; // Bonus points for each soul brought to the Circle
      
      // --- KLAVIYO SYNC ---
      if (this.persistence.referralId) {
        klaviyoService.syncReferralMetadata(this.persistence.referralId, this.persistence.referrals);
        
        // Track specific milestones
        if (this.persistence.referrals === 1) klaviyoService.trackReferralMilestone('First Soul Recruited', 1);
        if (this.persistence.referrals === 3) klaviyoService.trackReferralMilestone('Circle Catalyst', 3);
        if (this.persistence.referrals === 6) klaviyoService.trackReferralMilestone('Grand Magnetism', 6);
        if (this.persistence.referrals === 10) klaviyoService.trackReferralMilestone('Omniscient Recruiter', 10);
      }
      
      this.checkAscension();
    },

    checkAscension() {
      const artifacts = this.persistence.ownedArtifacts;
      const points = this.persistence.resonancePoints;
      const oldTier = this.persistence.tier;
      
      // Ascension Ladder
      if (artifacts.includes('the-omniscience-artifact') || points >= 963) {
        this.persistence.tier = 'RESONANCE_ACHIEVED';
      } else if (points >= 500) {
        this.persistence.tier = '963_HZ';
      } else if (points >= 400) {
        this.persistence.tier = '852_HZ';
      } else if (points >= 300) {
        this.persistence.tier = '741_HZ';
      } else if (points >= 200) {
        this.persistence.tier = '639_HZ';
      } else if (points >= 100) {
        this.persistence.tier = '528_HZ';
      } else if (points >= 50) {
        this.persistence.tier = '417_HZ';
      } else {
        if (this.persistence.tier !== 'RESONANCE_ACHIEVED' && this.persistence.tier !== '963_HZ') {
          this.persistence.tier = '396_HZ';
        }
      }

      // --- KLAVIYO ASCENSION TRIGGER ---
      if (oldTier && this.persistence.tier && oldTier !== this.persistence.tier) {
         klaviyoService.trackTierAscension(this.persistence.tier, points);
      }
    },

    addManifestation(content: string) {
      const entry: Manifestation = {
        id: Math.random().toString(36).substring(2, 9),
        seeker: 'Seeker-' + Math.random().toString(36).substring(2, 5).toUpperCase(),
        tier: this.tier || '396_HZ',
        frequency: this.detectedFrequency || '432',
        content,
        timestamp: new Date().toISOString()
      };
      this.persistence.manifestations.unshift(entry);
    },
    
    resetResonance() {
      this.persistence = {
        tier: null,
        energy: null,
        detectedFrequency: null,
        recommendedArtifact: null,
        lastSync: null,
        ownedArtifacts: [],
        manifestations: [],
        resonancePoints: 0,
        email: null,
        referralId: null,
        referrals: 0
      };
    }
  }
});
