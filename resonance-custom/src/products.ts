export interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
  description: string;
  type: 'clothing' | 'esoteric';
  handle: string;
  collections?: string[];
  variantId?: string;
  available?: boolean;
  status?: 'active' | 'archived' | 'draft';
}

import { catalogProducts } from './catalog_products';
import { printfulProducts } from './printful_products';

export const products: Product[] = [
  ...catalogProducts,
  ...printfulProducts,
  // --- ATTIRE (Authentic Photoshoot Style) ---
  {
    id: 'pt-001',
    title: 'The 963Hz Ascension Tee',
    price: '$60.00',
    category: 'Solfeggio Layer',
    image: '/assets/attire_ascension_tee_v2.png',
    description: 'High-frequency ascension wear, tuned to 963Hz.',
    type: 'clothing',
    handle: 'the-963hz-ascension-tee'
  },
  {
    id: 'pt-002',
    title: 'Vibrational Frequency V-Neck',
    price: '$60.00',
    category: 'Resonance Layer',
    image: '/assets/attire_vneck_v2.png',
    description: 'Minimalist v-neck designed for vibrational feedback.',
    type: 'clothing',
    handle: 'vibrational-frequency-v-neck'
  },
  {
    id: 'pt-003',
    title: 'The Seed of Life" Hoodie',
    price: '$108.00',
    category: 'Sacred Geometry',
    image: '/assets/attire_seed_of_life_v2.png',
    description: 'The foundation of all that is. Her Resonance Collection.',
    type: 'clothing',
    handle: 'the-seed-of-life-hoodie-her-resonance-collection'
  },
  {
    id: 'pt-004',
    title: 'The Sigil Hoodie (Garment Dyed)',
    price: '$108.00',
    category: 'Esoteric Protection',
    image: 'https://files.cdn.printful.com/products/420/mockup_1707512102_420208515.png',
    description: 'Premium garment-dyed hoodie with the sigil of resonance.',
    type: 'clothing',
    handle: 'the-sigil-hoodie-garment-dyed'
  },
  {
    id: 'pt-005',
    title: 'The Sigil Hoodie',
    price: '$108.00',
    category: 'Esoteric Protection',
    image: 'https://files.cdn.printful.com/products/420/mockup_1707512102_420208515.png',
    description: 'Engineered for comfort and transcendence.',
    type: 'clothing',
    handle: 'the-sigil-hoodie'
  },
  {
    id: 'pt-006',
    title: 'The Sigil of Resonance Tee',
    price: '$60.00',
    category: 'Resonance Layer',
    image: '/assets/attire_sigil_tee_v2.png',
    description: 'The mark of alignment in soft cotton.',
    type: 'clothing',
    handle: 'the-sigil-of-resonance-tee'
  },
  {
    id: 'pt-007',
    title: 'The Trinity Hoodie',
    price: '$108.00',
    category: 'Sacred Geometry',
    image: '/assets/attire_trinity_hoodie_v2.png',
    description: 'The power of three in premium earth-tones.',
    type: 'clothing',
    handle: 'the-trinity-hoodie'
  },
  {
    id: 'pt-008',
    title: 'The Frequency of Nature | 432Hz',
    price: '$108.00',
    category: 'Natural Alignment',
    image: '/assets/attire_frequency_nature_v2.png',
    description: 'Limited edition 432Hz resonance wear.',
    type: 'clothing',
    handle: 'the-frequency-of-nature-432hz-limited-edition'
  },
  {
    id: 'pt-009',
    title: 'The 963 Solfeggio Pullover',
    price: '$108.00',
    category: 'Solfeggio Layer',
    image: '/assets/attire_solfeggio_pullover_v2.png',
    description: 'Divine frequency integrated into modern silhouette.',
    type: 'clothing',
    handle: 'the-963-solfeggio-pullover'
  },
  {
    id: 'pt-010',
    title: 'Écho Urbain" – Édition 108',
    price: '$60.00',
    category: 'Urban Esoterica',
    image: '/assets/gb-crewneck.png',
    description: 'Urban echoes for the conscious observer.',
    type: 'clothing',
    handle: 'echo-urbain-edition-108'
  },
  {
    id: 'pt-011',
    title: 'The Signature Resonance Tee',
    price: '$60.00',
    category: 'Resonance Layer',
    image: '/assets/attire_signature_tee_v2.png',
    description: 'The core identity of the State of Resonance.',
    type: 'clothing',
    handle: 'the-signature-resonance-tee'
  },
  {
    id: 'pt-012',
    title: 'The Frequency Tee',
    price: '$60.00',
    category: 'Vibrational Layer',
    image: '/assets/gb-crewneck.png',
    description: 'Listen to the signal.',
    type: 'clothing',
    handle: 'the-frequency-tee'
  },
  {
    id: 'pt-013',
    title: 'The Sigil Hoodie (Sport Grey)',
    price: '$108.00',
    category: 'Esoteric Protection',
    image: '/assets/attire_sigil_hoodie_black_v2.png',
    description: 'Sport Grey variant of the protective sigil hoodie.',
    type: 'clothing',
    handle: 'the-sigil-hoodie'
  },
  // --- PRINTFUL SYNCED PRODUCTS ---
  {
    id: 'pf-001',
    title: 'Urban garment-dyed hoodie',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Premium garment-dyed hoodie for urban resonance.',
    type: 'clothing',
    handle: 'urban-garment-dyed-hoodie'
  },
  {
    id: 'pf-002',
    title: 'Urban hoodie (Black)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Classic black hoodie engineered for daily alignment.',
    type: 'clothing',
    handle: 'urban-hoodie'
  },
  {
    id: 'pf-003',
    title: 'Urban hoodie (Minimal)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Minimalist edition of our core vibrational wear.',
    type: 'clothing',
    handle: 'urban-hoodie-1'
  },
  {
    id: 'pf-004',
    title: 'Urban garment-dyed hoodie (Burro)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Earth-toned garment-dyed hoodie with premium finish.',
    type: 'clothing',
    handle: 'urban-garment-dyed-hoodie-1'
  },
  {
    id: 'pf-005',
    title: 'Urban hoodie (Essential)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Essential black hoodie for the conscious observer.',
    type: 'clothing',
    handle: 'urban-hoodie-2'
  },
  {
    id: 'pf-006',
    title: 'Urban hoodie (Classic)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Timeless silhouette for frequency protection.',
    type: 'clothing',
    handle: 'urban-hoodie-3'
  },
  {
    id: 'pf-007',
    title: 'Unisex heavyweight t-shirt (Bay)',
    price: '$60.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Heavyweight t-shirt in Bay, designed for durability.',
    type: 'clothing',
    handle: 'unisex-garment-dyed-heavyweight-t-shirt'
  },
  {
    id: 'pf-008',
    title: 'Urban garment-dyed hoodie (Pigment Burro)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Unique pigment-dyed texture for individual alignment.',
    type: 'clothing',
    handle: 'urban-garment-dyed-hoodie-2'
  },
  {
    id: 'pf-009',
    title: 'Urban garment-dyed hoodie (Eclipse)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Deep eclipse tones in our signature garment-dyed hoodie.',
    type: 'clothing',
    handle: 'urban-garment-dyed-hoodie-3'
  },
  {
    id: 'pf-010',
    title: 'Men’s box tee (Obsidian)',
    price: '$60.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Obsidian black box tee with a relaxed fit.',
    type: 'clothing',
    handle: 'mens-box-tee'
  },
  {
    id: 'pf-011',
    title: 'Urban hoodie (Stealth)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Stealth black hoodie for low-frequency environments.',
    type: 'clothing',
    handle: 'urban-hoodie-4'
  },
  {
    id: 'pf-012',
    title: 'Urban hoodie (Void)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Void black edition of the urban resonance hoodie.',
    type: 'clothing',
    handle: 'urban-hoodie-5'
  },
  {
    id: 'pf-013',
    title: 'Urban hoodie (Shadow)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Shadow black texture for subtle vibrational presence.',
    type: 'clothing',
    handle: 'urban-hoodie-6'
  },
  {
    id: 'pf-014',
    title: 'Urban hoodie (Phantom)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Phantom black finish for the modern alchemist.',
    type: 'clothing',
    handle: 'urban-hoodie-7'
  },
  {
    id: 'pf-015',
    title: 'Men’s box tee (Shadow Black)',
    price: '$60.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Shadow black box tee for daily resonance.',
    type: 'clothing',
    handle: 'mens-box-tee-1'
  },
  {
    id: 'pf-016',
    title: 'Urban garment-dyed hoodie (Sovereign)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Sovereign design meets urban protection.',
    type: 'clothing',
    handle: 'urban-garment-dyed-hoodie-4'
  },
  {
    id: 'pf-017',
    title: 'Men’s box hoodie (Heritage Black)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Heritage black box hoodie for heavy-duty resonance.',
    type: 'clothing',
    handle: 'mens-box-hoodie'
  },
  {
    id: 'pf-018',
    title: 'Men’s box hoodie (Classic Void)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Classic void black box hoodie for supreme comfort.',
    type: 'clothing',
    handle: 'mens-box-hoodie-1'
  },
  {
    id: 'pf-019',
    title: 'Men’s premium heavyweight tee (Agave)',
    price: '$60.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Premium heavyweight tee in Agave, tuned to natural frequencies.',
    type: 'clothing',
    handle: 'mens-premium-heavyweight-tee'
  },
  {
    id: 'pf-020',
    title: 'Unisex heavyweight t-shirt (Coastal Bay)',
    price: '$60.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Coastal Bay heavyweight tee for fluid energy.',
    type: 'clothing',
    handle: 'unisex-garment-dyed-heavyweight-t-shirt-1'
  },
  {
    id: 'pf-021',
    title: 'Urban hoodie (Nocturnal)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Nocturnal black finish for the late-night seeker.',
    type: 'clothing',
    handle: 'urban-hoodie-nocturnal'
  },
  {
    id: 'pf-022',
    title: 'Urban hoodie (Obsidian Reverse)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Obsidian reverse print for multi-directional resonance.',
    type: 'clothing',
    handle: 'urban-hoodie-obsidian-reverse'
  },
  {
    id: 'pf-023',
    title: 'Unisex heavyweight t-shirt (Deep Black)',
    price: '$60.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Deep black heavyweight tee for core protection.',
    type: 'clothing',
    handle: 'unisex-garment-dyed-heavyweight-t-shirt-deep-black'
  },
  {
    id: 'pf-024',
    title: 'Urban garment-dyed hoodie (Zenith Burro)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Zenith alignment meets earthy burro tones.',
    type: 'clothing',
    handle: 'urban-garment-dyed-hoodie-zenith'
  },
  {
    id: 'pf-025',
    title: 'Urban sweatshirt (Purity White)',
    price: '$96.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Purity white sweatshirt for high-frequency clarity.',
    type: 'clothing',
    handle: 'urban-sweatshirt'
  },
  {
    id: 'pf-026',
    title: 'Urban hoodie (Ethereal White)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'Ethereal white hoodie for spiritual ascension.',
    type: 'clothing',
    handle: 'urban-hoodie-white'
  },
  {
    id: 'pf-027',
    title: 'Urban hoodie (Archetype Black)',
    price: '$108.00',
    category: 'Attire',
    image: '/assets/placeholder.png',
    description: 'The archetypal black hoodie for the State of Resonance.',
    type: 'clothing',
    handle: 'urban-hoodie-archetype'
  },
  {
    id: 'pf-028',
    title: 'Vibrational Frequency V-Neck (Solid Black)',
    price: '$60.00',
    category: 'Resonance Layer',
    image: '/assets/placeholder.png',
    description: 'Relaxed v-neck designed for vibrational feedback.',
    type: 'clothing',
    handle: 'vibrational-frequency-v-neck'
  },
  {
    id: 'pf-029',
    title: 'The Seed of Life" Hoodie (Cropped)',
    price: '$108.00',
    category: 'Sacred Geometry',
    image: '/assets/placeholder.png',
    description: 'Cropped edition of the Seed of Life hoodie. Her Resonance Collection.',
    type: 'clothing',
    handle: 'the-seed-of-life-hoodie-cropped'
  },
  {
    id: 'pf-030',
    title: 'The Sigil Hoodie (Midnight Navy)',
    price: '$108.00',
    category: 'Esoteric Protection',
    image: '/assets/placeholder.png',
    description: 'Midnight navy variant of the garment-dyed protective sigil hoodie.',
    type: 'clothing',
    handle: 'the-sigil-hoodie-midnight-navy'
  },
  {
    id: 'pf-031',
    title: 'The Sigil Hoodie (Void Edition)',
    price: '$108.00',
    category: 'Esoteric Protection',
    image: '/assets/placeholder.png',
    description: 'Void black edition of the core protective sigil hoodie.',
    type: 'clothing',
    handle: 'the-sigil-hoodie-void'
  },
  {
    id: 'pf-032',
    title: 'The Sigil Hoodie (Carbon Grey)',
    price: '$108.00',
    category: 'Esoteric Protection',
    image: '/assets/placeholder.png',
    description: 'Carbon grey box hoodie with the sigil of resonance.',
    type: 'clothing',
    handle: 'the-sigil-hoodie-carbon-grey'
  },
  {
    id: 'pf-033',
    title: 'The 963Hz Ascension Tee (Obsidian)',
    price: '$60.00',
    category: 'Solfeggio Layer',
    image: '/assets/placeholder.png',
    description: 'Obsidian black ascension tee, tuned to 963Hz.',
    type: 'clothing',
    handle: 'the-963hz-ascension-tee'
  },
  {
    id: 'pf-034',
    title: 'The Sigil of Resonance Tee (Faded Black)',
    price: '$60.00',
    category: 'Resonance Layer',
    image: '/assets/placeholder.png',
    description: 'Oversized faded black tee with the mark of alignment.',
    type: 'clothing',
    handle: 'the-sigil-of-resonance-tee-faded'
  },
  {
    id: 'pf-035',
    title: 'The Trinity Hoodie (Burro Alignment)',
    price: '$108.00',
    category: 'Sacred Geometry',
    image: '/assets/placeholder.png',
    description: 'Triad of power in earth-toned burro alignment.',
    type: 'clothing',
    handle: 'the-trinity-hoodie-burro'
  },
  {
    id: 'pf-036',
    title: 'The Frequency of Nature | 432Hz (Reverse)',
    price: '$108.00',
    category: 'Natural Alignment',
    image: '/assets/placeholder.png',
    description: 'Reverse print of the 432Hz natural alignment hoodie.',
    type: 'clothing',
    handle: 'the-frequency-of-nature-432hz-reverse'
  },
  {
    id: 'pf-037',
    title: 'The 963 Solfeggio Pullover (Midnight)',
    price: '$108.00',
    category: 'Solfeggio Layer',
    image: '/assets/placeholder.png',
    description: 'Divine frequency pullover in midnight navy.',
    type: 'clothing',
    handle: 'the-963-solfeggio-pullover-midnight'
  },
  {
    id: 'pf-038',
    title: 'Echo Urbain" – Edition 108 (Navy)',
    price: '$108.00',
    category: 'Urban Esoterica',
    image: '/assets/placeholder.png',
    description: 'Urban echoes in protective midnight navy.',
    type: 'clothing',
    handle: 'echo-urbain-edition-108-navy'
  },
  {
    id: 'pf-039',
    title: 'The Signature Resonance Tee (Pepper)',
    price: '$60.00',
    category: 'Resonance Layer',
    image: '/assets/placeholder.png',
    description: 'Pepper black signature tee for authentic presence.',
    type: 'clothing',
    handle: 'the-signature-resonance-tee-pepper'
  },
  {
    id: 'pf-040',
    title: 'The Frequency Tee (Pepper)',
    price: '$60.00',
    category: 'Vibrational Layer',
    image: '/assets/placeholder.png',
    description: 'Listen to the frequency in pepper black comfort.',
    type: 'clothing',
    handle: 'the-frequency-tee-pepper'
  },
  {
    id: 'pf-041',
    title: 'Eco Tote Bag',
    price: '$35.00',
    category: 'Accessories',
    image: '/assets/placeholder.png',
    description: 'Environmentally conscious tote for carrying your esoteric artifacts.',
    type: 'clothing',
    handle: 'eco-tote-bag'
  },

  // --- THE SANCTUARY (Ritual Tools & Divination) ---
  {
    id: 'e001',
    title: 'Skeleton Incense Holder',
    price: '$77.56',
    category: 'Ritual Tools',
    image: '/assets/skeleton-incense.png',
    description: 'A masterpiece of transition. Reclining skeleton within the earth.',
    type: 'esoteric',
    handle: 'ib1608-skeleton-incense-holder',
    collections: ['Sacred Smoke', 'Incense']
  },
  {
    id: 'e002',
    title: 'Obsidian Scrying Mirror',
    price: '$216.79',
    category: 'Divination',
    image: '/assets/obsidian_scrying_mirror_ritual.png',
    description: 'A black solar vortex for deep inner-sight and scrying rituals.',
    type: 'esoteric',
    handle: 'obsidian-scrying-mirror',
    collections: ['Ritual Tools']
  },
  {
    id: 'e003',
    title: 'Zodiac Tarot',
    price: '$93.74',
    category: 'Divination',
    image: '/assets/zodiac-tarot.png',
    description: 'Ancient celestial alignment in a modern divination deck.',
    type: 'esoteric',
    handle: 'zodiac-tarot'
  },
  {
    id: 'e004',
    title: 'Clarity Oracle Deck',
    price: '$77.56',
    category: 'Divination',
    image: '/assets/Clarity_Oracle_Deck.jpg',
    description: 'Clear the noise. Listen to the resonance of the universe.',
    type: 'esoteric',
    handle: 'clarity-oracle-deck'
  },
  {
    id: 'e005',
    title: 'Singing Bowl with Cushion',
    price: '$132.60',
    category: 'Ritual Tools',
    image: '/assets/Singing_Bowl.jpg',
    description: 'Hand-crafted bowl for vibrational alignment and meditation.',
    type: 'esoteric',
    handle: 'singing-bowl-cushion-striker'
  },
  {
    id: 'e006',
    title: 'Crown Chakra Tuning Fork',
    price: '$158.50',
    category: 'Ritual Tools',
    image: '/assets/Tuning_Fork.jpg',
    description: '8 1/2" fork tuned to the crown frequency for divine alignment.',
    type: 'esoteric',
    handle: 'ftfcro'
  },
  {
    id: 'e007',
    title: 'Orgonite Pyramid (3"x3")',
    price: '$64.29',
    category: 'Ritual Tools',
    image: '/assets/Orgonite_Pyramid.jpg',
    description: 'Bio-energetic converter for field purification.',
    type: 'esoteric',
    handle: 'orgonite-pyramid-stone'
  },

  // --- ALCHEMY (Elixirs & Oils) ---
  {
    id: 'a001',
    title: 'Resonance Drops',
    price: '$28.99',
    category: 'Alchemy',
    image: '/assets/resonance_drops_solar.png',
    description: 'Highly concentrated vibrational essence for solar alignment.',
    type: 'esoteric',
    handle: 'resonance-drops'
  },
  {
    id: 'a002',
    title: 'Breathwork Oil',
    price: '$28.99',
    category: 'Alchemy',
    image: '/assets/breathwork_oil_expansion.png',
    description: 'Essential blend designed to expand the respiratory field.',
    type: 'esoteric',
    handle: 'breathwork-alignment-oil'
  },

  // --- MANUSCRIPTS & JOURNALS ---
  {
    id: 'm001',
    title: 'Intention Journal',
    price: '$61.36',
    category: 'Manuscripts',
    image: '/assets/intention_journal_vessel.png',
    description: 'A vessel for your thoughts and manifestations.',
    type: 'esoteric',
    handle: 'intention-journal'
  },
  {
    id: 'm002',
    title: 'Pride Tarot',
    price: '$74.31',
    category: 'Manuscripts',
    image: '/assets/pride-tarot.png',
    description: 'A celebration of identity through the lens of the arcana.',
    type: 'esoteric',
    handle: 'pride-tarot'
  },
  // --- BEST SELLERS (Stylized Import) ---
  {
    id: 'bs-001',
    title: 'Obsidian Ritual Cauldron',
    price: '$35.46',
    category: 'Sanctuary',
    image: '/assets/ritual_cauldron_photoshoot.png',
    description: 'A heavy cast iron vessel for transformation. Forged for the modern alchemist.',
    type: 'esoteric',
    handle: 'icbr74-ritual-cauldron',
    collections: ['Ritual Tools']
  },
  {
    id: 'bs-002',
    title: 'Frankincense Tears',
    price: '$12.79',
    category: 'Alchemy',
    image: '/assets/frankincense_tears_photoshoot.png',
    description: 'Ancient resin granules for purification and ritual focus. The scent of eternity.',
    type: 'esoteric',
    handle: 'ig16frat-frankincense-tears',
    collections: ['Sacred Smoke', 'Incense']
  },
  {
    id: 'bs-003',
    title: 'Nag Champa Essence',
    price: '$9.56',
    category: 'Sanctuary',
    image: '/assets/nag_champa_cone_photoshoot.png',
    description: 'The world\'s most revered incense, redefined for seekers of alignment.',
    type: 'esoteric',
    handle: 'icnagc-nag-champa-cones',
    collections: ['Sacred Smoke', 'Incense']
  },
  {
    id: 'bs-004',
    title: 'Stability Sigil Amulet',
    price: '$35.46',
    category: 'Attire',
    image: '/assets/pentacle_amulet_photoshoot.png',
    description: 'A braided silver-tone anchor for your energy field. Stay grounded in the void.',
    type: 'esoteric',
    handle: 'awsta-stability-amulet',
    collections: ['Amulets & Talismans', 'Sacred Adornments']
  },
  {
    id: 'bs-005',
    title: 'Lavender Resonance Oil',
    price: '$28.99',
    category: 'Alchemy',
    image: '/assets/lavender_oil_photoshoot.png',
    description: 'Essential frequency of tranquility. Anointing oil for deep respiratory expansion.',
    type: 'esoteric',
    handle: 'o2elav-lavender-oil'
  },
  {
    id: 'bs-006',
    title: 'Triton Ritual Candles',
    price: '$14.57',
    category: 'Sanctuary',
    image: '/assets/ritual_candles_photoshoot_trio.png',
    description: 'A triad of intention. Passion, Purity, and Clarity in wax.',
    type: 'esoteric',
    handle: 'c6-ritual-candles',
    collections: ['All Candles & Candle Accessories', 'Candles']
  },
  // --- EXPANDED CATALOG: CANDLES ---
  {
    id: 'c-001',
    title: 'Pentacle Vigil | Frankincense',
    price: '$45.17',
    category: 'Candles',
    image: '/assets/candle_pentacle_vigil_v2.png',
    description: 'A 90-hour sentinel of light. Scented with ancient oils for deep ritual focus.',
    type: 'esoteric',
    handle: 'cjpen-90-hr-pentacle-frankincense-jar-candle',
    collections: ['Candles']
  },
  {
    id: 'c-002',
    title: 'The Seven Knobs | Obsidian',
    price: '$25.74',
    category: 'Candles',
    image: '/assets/candle_seven_knobs_v2.png',
    description: 'A phased ritual candle. Burn one knob per night to ground your frequency.',
    type: 'esoteric',
    handle: 'c7knb-7-knob-candle-black',
    collections: ['Candles']
  },
  {
    id: 'c-003',
    title: 'Solar Alignment Taper',
    price: '$4.50',
    category: 'Candles',
    image: '/assets/candle_solar_taper_v2.png',
    description: 'A golden beacon for solar plexus activation and manifestation.',
    type: 'esoteric',
    handle: 'cty-taper-candle-yellow',
    collections: ['Candles']
  },
  {
    id: 'c-004',
    title: 'Lunar Phase Taper',
    price: '$4.50',
    category: 'Candles',
    image: '/assets/candle_lunar_taper_v2.png',
    description: 'A silver-white pillar of purity for lunar rituals and clarity.',
    type: 'esoteric',
    handle: 'ctw-taper-candle-white',
    collections: ['Candles']
  },

  // --- EXPANDED CATALOG: AMULETS ---
  {
    id: 'am-001',
    title: 'Synchronicity Talisman',
    price: '$51.64',
    category: 'Amulets',
    image: 'https://www.azuregreen.net/images/ABRILF.jpg',
    description: 'An anchor for luck and social resonance. Measuring 1 3/4" in hand-forged pewter.',
    type: 'esoteric',
    handle: 'abrilf-bring-luck-friendship-amulet',
    collections: ['Amulets']
  },
  {
    id: 'am-002',
    title: 'Void Dragon Sigil',
    price: '$35.46',
    category: 'Amulets',
    image: 'https://www.azuregreen.net/images/ACCELD.jpg',
    description: 'Celestial draconic power captured in silver. A shield against energetic entropy.',
    type: 'esoteric',
    handle: 'acceld-celestial-dragon-amulet',
    collections: ['Amulets']
  },
  {
    id: 'am-003',
    title: 'Crescent Moon Amulet',
    price: '$35.46',
    category: 'Amulets',
    image: 'https://www.azuregreen.net/images/ACCELM.jpg',
    description: 'Alignment with the lunar cycle. A vessel for intuition and dream-work.',
    type: 'esoteric',
    handle: 'accelm-celtic-moon-celestial-amulet',
    collections: ['Amulets']
  },

  // --- EXPANDED CATALOG: MANUSCRIPTS ---
  {
    id: 'm-003',
    title: 'The Shadow Grimoire',
    price: '$106.70',
    category: 'Manuscripts',
    image: 'https://www.azuregreen.net/images/BBBL3275.jpg',
    description: 'Aged-paper leather volume with a brass latch. A heavy vessel for your deepest transmissions.',
    type: 'esoteric',
    handle: 'bbbl3275-book-of-shadows-aged-looking-paper-leather-w-latch',
    collections: ['Manuscripts']
  },
  {
    id: 'm-004',
    title: 'Chakra Alignment Journal',
    price: '$297.74',
    category: 'Manuscripts',
    image: 'https://www.azuregreen.net/images/BBBL675.jpg',
    description: 'Large 10" x 13" leather manuscript. Embossed with the sacred frequency centers.',
    type: 'esoteric',
    handle: 'bbbl675-10-x-13-chakra-leather-blank-book-w-latch',
    collections: ['Manuscripts']
  },
  {
    id: 'm-005',
    title: 'Lapis Sun Ledger',
    price: '$71.07',
    category: 'Manuscripts',
    image: 'https://www.azuregreen.net/images/BBBL2367.jpg',
    description: 'Blue leather journal featuring a central Lapis stone. For capturing wisdom under the sun.',
    type: 'esoteric',
    handle: 'bbbl2367-lapis-sun-leather-blank-journal',
    collections: ['Manuscripts']
  },

  // --- EXPANDED CATALOG: ALCHEMY ---
  {
    id: 'al-003',
    title: 'Transmutation Oil',
    price: '$21.36',
    category: 'Alchemy',
    image: 'https://www.azuregreen.net/images/OALC.jpg',
    description: 'A potent 1/2oz elixir for shifting personal frequency and space clearing.',
    type: 'esoteric',
    handle: 'oalc-alchemy-oil-1-2-oz',
    collections: ['Alchemy']
  },
  {
    id: 'al-004',
    title: 'Attraction Essence',
    price: '$21.36',
    category: 'Alchemy',
    image: 'https://www.azuregreen.net/images/OATT.jpg',
    description: 'Formulated to align your energetic field with the vibration of abundance.',
    type: 'esoteric',
    handle: 'oatt-attraction-oil-1-2-oz',
    collections: ['Alchemy']
  },
  // --- FINAL CATALOG EXPANSION: SACRED SMOKE ---
  {
    id: 's-004',
    title: 'Frankincense Cascades',
    price: '$9.56',
    category: 'Sacred Smoke',
    image: 'https://www.azuregreen.net/images/ICBSFRA.jpg',
    description: 'Backflow cones for the visual meditator. Smoke that flows like liquid light.',
    type: 'esoteric',
    handle: 'icbsfra-10-frankincense-backflow-cones-sree-vani',
    collections: ['Incense', 'Sacred Smoke']
  },
  {
    id: 's-005',
    title: 'Amber Flame Essence',
    price: '$19.27',
    category: 'Sacred Smoke',
    image: 'https://www.azuregreen.net/images/ICMAMBF.jpg',
    description: 'Sixteen vessels of warm, resinous amber smoke to ground the home field.',
    type: 'esoteric',
    handle: 'icmambf-16-pk-amber-flame-escential-essences-incense-cones',
    collections: ['Incense', 'Sacred Smoke']
  },
  {
    id: 's-006',
    title: 'Angelic Vision Incense',
    price: '$19.27',
    category: 'Sacred Smoke',
    image: 'https://www.azuregreen.net/images/ICMANGV.jpg',
    description: 'Floral high-frequency notes designed to lift the atmosphere into higher realms.',
    type: 'esoteric',
    handle: 'icmangv-16-pk-angelic-vision-escential-essences-incense-cones',
    collections: ['Incense', 'Sacred Smoke']
  },
  {
    id: 's-007',
    title: 'Bali Temple Smoke',
    price: '$19.27',
    category: 'Sacred Smoke',
    image: 'https://www.azuregreen.net/images/ICMBAL.jpg',
    description: 'Hibiscus and temple flowers captured in a slow-burning cone.',
    type: 'esoteric',
    handle: 'icmbal-16-pk-bali-escential-essences-incense-cones',
    collections: ['Incense', 'Sacred Smoke']
  },

  // --- FINAL CATALOG EXPANSION: AMULETS & TALISMANS ---
  {
    id: 'am-004',
    title: 'Wolf & Tree Sigil',
    price: '$28.00',
    category: 'Amulets',
    image: 'https://www.azuregreen.net/images/BBBL2803.JPG',
    description: 'Ancestral bond and growth. Forged for those who walk between worlds.',
    type: 'esoteric',
    handle: 'acc-wolf-tree-sigil',
    collections: ['Amulets']
  },
  {
    id: 'am-005',
    title: 'Seal of Solomon',
    price: '$24.00',
    category: 'Amulets',
    image: 'https://www.azuregreen.net/images/ACSOL.jpg',
    description: 'Ancient protection sigil in high-grade pewter. A shield of planetary alignment.',
    type: 'esoteric',
    handle: 'acsol-solomon-seal-amulet',
    collections: ['Amulets']
  },

  // --- FINAL CATALOG EXPANSION: ALCHEMY OILS ---
  {
    id: 'al-005',
    title: 'Prosperity Alchemy',
    price: '$9.56',
    category: 'Alchemy',
    image: 'https://www.azuregreen.net/images/OPRO.jpg',
    description: 'Tuned to the frequency of growth and expansion.',
    type: 'esoteric',
    handle: 'opro-prosperity-oil',
    collections: ['Alchemy']
  },
  {
    id: 'al-006',
    title: 'Psychic Shield Essence',
    price: '$21.36',
    category: 'Alchemy',
    image: 'https://www.azuregreen.net/images/OPSYS.jpg',
    description: 'An energetic barrier for empathic protection.',
    type: 'esoteric',
    handle: 'opsys-psychic-shield-oil',
    collections: ['Alchemy']
  },
  // --- FINAL BATCH: CANDLES ---
  {
    id: 'c-006',
    title: 'The Black Cat | Shadow Vigil',
    price: '$12.00',
    category: 'Candles',
    image: '/assets/candle_black_cat_v2.png',
    description: 'A totem of protection and mystery. Burn during the new moon to clear the path.',
    type: 'esoteric',
    handle: 'cblkcat-black-cat-candle',
    collections: ['Candles']
  },
  {
    id: 'c-007',
    title: 'Solar Pillar | Abundance',
    price: '$15.50',
    category: 'Candles',
    image: '/assets/candle_solar_pillar_v2.png',
    description: 'A heavy sun-gold pillar for vitality and success.',
    type: 'esoteric',
    handle: 'csun-sun-pillar-candle',
    collections: ['Candles']
  },
  {
    id: 'c-008',
    title: 'Lunar Pillar | Intuition',
    price: '$15.50',
    category: 'Candles',
    image: '/assets/candle_lunar_pillar_v2.png',
    description: 'A cool silver-white pillar for dream-work and subconscious exploration.',
    type: 'esoteric',
    handle: 'cmoon-moon-pillar-candle',
    collections: ['Candles']
  },

  // --- FINAL BATCH: MANUSCRIPTS ---
  {
    id: 'm-006',
    title: 'Wolf & Tree Ledger',
    price: '$48.00',
    category: 'Manuscripts',
    image: 'https://www.azuregreen.net/images/BBBL2803.JPG',
    description: 'Embossed leather manuscript with the sigil of nature\'s cycle.',
    type: 'esoteric',
    handle: 'bbbl803-wolf-tree-of-life-leather-blank-book',
    collections: ['Manuscripts']
  },
  {
    id: 'm-007',
    title: 'The Seven Stones Journal',
    price: '$65.00',
    category: 'Manuscripts',
    image: 'https://www.azuregreen.net/images/BBBL612.jpg',
    description: 'Triple-latched heavy leather volume, inlaid with semi-precious alignment stones.',
    type: 'esoteric',
    handle: 'bbbl612-7-stone-leather-blank-book-w-3-latch',
    collections: ['Manuscripts']
  },
  {
    id: 'm-008',
    title: 'Fairy Moon Tome',
    price: '$100.21',
    category: 'Manuscripts',
    image: 'https://www.azuregreen.net/images/BBBL276.jpg',
    description: 'A whimsical yet archival leather book for capturing ethereal transmissions.',
    type: 'esoteric',
    handle: 'bbbl276-fairy-moon-leather-blank-book-w-latch',
    collections: ['Manuscripts']
  },
  // --- FINAL ITEMS TO HIT 50+ TOTAL ---
  {
    id: 's-008',
    title: 'Buddhist Meditation Smoke',
    price: '$19.27',
    category: 'Sacred Smoke',
    image: 'https://www.azuregreen.net/images/ICMBUDT.jpg',
    description: 'Sandalwood and sacred herbs for grounding and presence.',
    type: 'esoteric',
    handle: 'icmbudt-16-pk-buddhist-escential-essences-incense-cones',
    collections: ['Incense', 'Sacred Smoke']
  },
  {
    id: 's-009',
    title: 'Cannabis & White Sage',
    price: '$19.27',
    category: 'Sacred Smoke',
    image: 'https://www.azuregreen.net/images/ICMCANWS.jpg',
    description: 'A heavy clearing blend for deep atmospheric reset.',
    type: 'esoteric',
    handle: 'icmcanws-16-pk-cannabis-white-sage-escential-essences-incense-cones',
    collections: ['Incense', 'Sacred Smoke']
  },
  {
    id: 'am-006',
    title: 'Howling Moon Talisman',
    price: '$35.46',
    category: 'Amulets',
    image: 'https://www.azuregreen.net/images/ACHOW.jpg',
    description: 'A sigil of wild alignment and vocal power.',
    type: 'esoteric',
    handle: 'achow-howling-moon-celestial-amulet',
    collections: ['Amulets']
  },
  {
    id: 'al-007',
    title: 'Healing Resonance Oil',
    price: '$9.56',
    category: 'Alchemy',
    image: 'https://www.azuregreen.net/images/OHEA.jpg',
    description: 'Tuned to the frequency of restoration and cellular alignment.',
    type: 'esoteric',
    handle: 'ohea-healing-oil',
    collections: ['Alchemy']
  }
];

export function renderProductCard(product: Product): string {
  // If product is explicitly marked as unavailable, we hide it.
  if (product.available === false) {
    return '';
  }

  const storeBaseUrl = 'https://stateofresonance.ca';
  // Use Shopify store URL if handle exists, otherwise fall back to local product page
  const targetUrl = product.handle ? `${storeBaseUrl}/products/${product.handle}` : `/product.html?id=${product.id}`;
  const isExternal = targetUrl.startsWith('http');
  
  return `
    <article class="product-card glass fade-in-scroll" data-id="${product.id}">
      <a href="${targetUrl}" ${isExternal ? 'target="_blank"' : 'rel="noopener"'} class="card-link" aria-label="View details for ${product.title}" style="text-decoration: none; color: inherit; display: block; position: absolute; inset: 0; z-index: 1;"></a>
      <div class="product-image-container skeleton">
        <img src="${product.image}" 
             alt="${product.title}" 
             class="product-image" 
             loading="lazy" 
             onload="this.parentElement.classList.remove('skeleton')"
             onerror="this.src='/assets/placeholder.png'; this.parentElement.classList.remove('skeleton')" />
      </div>
      <div class="product-info" style="position: relative; z-index: 2; pointer-events: none;">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">${product.price}</p>
        <button class="btn-premium small acquire-btn" 
                style="pointer-events: auto;" 
                data-product="${product.title}" 
                data-handle="${product.handle}" 
                data-variant="${product.variantId || ''}">
          Acquire
        </button>
      </div>
    </article>
  `;
}

import gsap from 'gsap';
import { trackEvent } from './analytics';

export function initCheckoutLinks() {
  document.querySelectorAll('.acquire-btn').forEach(btn => {
    // Remove old listeners by cloning
    const newBtn = btn.cloneNode(true) as HTMLElement;
    btn.parentNode?.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const el = newBtn as HTMLElement;
      const handle = el.dataset.handle;
      const variantId = el.dataset.variant;
      
      // Get quantity if available
      const qtyInput = document.querySelector('.qty-input') as HTMLInputElement;
      const qty = qtyInput ? parseInt(qtyInput.value) : 1;

      const feedback = document.createElement('div');
      feedback.style.position = 'fixed';
      feedback.style.bottom = '40px';
      feedback.style.right = '40px';
      feedback.style.padding = '20px 40px';
      feedback.style.zIndex = '10000';
      feedback.style.color = '#ffffff';
      feedback.style.background = 'rgba(197, 160, 89, 0.9)';
      feedback.style.border = '1px solid #c5a059';
      feedback.style.backdropFilter = 'blur(10px)';
      feedback.style.fontFamily = 'var(--font-body)';
      feedback.style.fontSize = '0.8rem';
      feedback.style.letterSpacing = '0.1em';
      feedback.innerHTML = `INITIATING TRANSFER...`;
      
      document.body.appendChild(feedback);
      
      gsap.from(feedback, { y: 100, opacity: 0, duration: 0.5, ease: "power3.out" });

      let checkoutUrl = `https://stateofresonance.ca/products/${handle}`;
      if (variantId) {
          checkoutUrl = `https://stateofresonance.ca/cart/${variantId}:${qty}`;
          feedback.innerHTML = `ADDING ${qty} ARTIFACT(S) TO CART...`;
          trackEvent('AddToCart', {
            content_name: el.dataset.product,
            content_ids: [variantId],
            content_type: 'product',
            value: 0, 
            currency: 'CAD',
            quantity: qty
          });
      } else {
          trackEvent('InitiateCheckout', {
            content_name: el.dataset.product,
            content_category: 'Direct',
            value: 0,
            currency: 'CAD',
            quantity: qty
          });
      }
      
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 1200);

      gsap.to(newBtn, { boxShadow: "0 0 30px #c5a059", duration: 0.3, yoyo: true, repeat: 1 });
    });
  });
}
