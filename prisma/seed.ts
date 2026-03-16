import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Esoteric renaming logic to give generic garments a "State of Resonance brand feel"
function applyBrandFeel(title: string): string {
  let newTitle = title;
  const lowerTitle = title.toLowerCase();

  // If already esoteric, leave it alone
  if (lowerTitle.includes('sigil') || lowerTitle.includes('resonance') || lowerTitle.includes('frequency') || lowerTitle.includes('ascension')) {
    return title;
  }

  // Strip generic prefixes
  newTitle = newTitle.replace(/Men[’'']s /ig, '');
  newTitle = newTitle.replace(/Women[’'']s /ig, '');
  newTitle = newTitle.replace(/Unisex /ig, '');
  
  // Transform garment names with word boundaries to prevent inner-word matching (e.g., velveteen)
  newTitle = newTitle.replace(/\b(hoodie)s?\b/ig, 'Shroud');
  newTitle = newTitle.replace(/\b(t-shirt|tee|shirt)s?\b/ig, 'Base Frequency');
  newTitle = newTitle.replace(/\b(crewneck)s?\b/ig, 'Vessel');
  newTitle = newTitle.replace(/\b(sweatpants|pants)\b/ig, 'Foundation Layers');
  
  // Capitalize properly
  newTitle = newTitle.split(' ').map(word => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  // Add esoteric flavor to totally generic names
  if (lowerTitle.includes('urban') && !newTitle.includes('Resonance')) {
    newTitle = newTitle.replace(/Urban /ig, 'Urban Echo ');
  }

  if (newTitle.trim() === 'Shroud') {
    newTitle = 'The Obsidian Shroud';
  } else if (newTitle.trim() === 'Base Frequency') {
    newTitle = 'The Core Base Frequency';
  } else if (!newTitle.toLowerCase().includes('the') && !newTitle.toLowerCase().includes('resonance') && !newTitle.toLowerCase().includes('ghost')) {
     const adjectives = ['Ethereal', 'Void', 'Astral', 'Alchemical', 'Sacred', 'Esoteric'];
     const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
     newTitle = `The ${adj} ${newTitle}`;
  }

  return newTitle.trim();
}

// Function to generate Esoteric Catalog Titles for Tools
function getEsotericCatalogName(category: string): string {
  if (!category) return 'Esoteric Artifacts';
  const cat = category.toLowerCase();
  
  if (cat.includes('botanical') || cat.includes('herb')) return 'Botanical Alchemy';
  if (cat.includes('book') || cat.includes('manuscript') || cat.includes('journal')) return 'Esoteric Manuscripts';
  if (cat.includes('tarot') || cat.includes('divination') || cat.includes('rune')) return 'Instruments of Foresight';
  if (cat.includes('jewelry') || cat.includes('pendant') || cat.includes('amulet')) return 'Sacred Adornments';
  if (cat.includes('candle') || cat.includes('incense') || cat.includes('smudge')) return 'Illuminations & Resins';
  if (cat.includes('ritual') || cat.includes('altar')) return 'Ritual Instruments';
  if (cat.includes('crystal') || cat.includes('stone') || cat.includes('gem')) return 'Ethereal Minerals';
  
  return `${category} Artifacts`;
}

// Ensure strict pricing rules: 30% margin on tools/non-specified, $60 for tees, $108 for hoodies
function calculatePricing(priceStr: string | undefined, isShirt: boolean, isHoodie: boolean): string {
    if (isHoodie) return "108.00";
    if (isShirt) return "60.00";
    
    if (!priceStr) return "0.00";
    
    const parsed = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(parsed) || parsed === 0) return priceStr || "0.00"; 
    
    // Apply 30% profit markup
    const markedUp = parsed * 1.30;
    return markedUp.toFixed(2);
}

async function main() {
  console.log('Seeding resonance database from catalog_products.ts...');

  // Create Categories
  const attireCollection = await prisma.collection.upsert({
    where: { handle: 'ghost-and-bones' },
    update: {},
    create: {
      name: 'The Ghost and Bones Collection',
      handle: 'ghost-and-bones',
      description: 'Custom-engineered garments designed for the modern practitioner. Tuned to frequency.'
    }
  });

  // Keep a map of dynamic tool collections
  const toolCollections = new Map<string, { id: string }>();

  // Read catalog_products.ts
  const catalogPath = path.resolve(__dirname, '../../resonance-custom/src/catalog_products.ts');
  const fileContent = fs.readFileSync(catalogPath, 'utf8');
  
  // Extract the JS array
  const arrayStr = fileContent.substring(fileContent.indexOf('['), fileContent.lastIndexOf(']') + 1);
  
interface ProductEntry {
  id?: string;
  title: string;
  price?: string;
  category?: string;
  image?: string;
  description?: string;
  type?: string;
  handle: string;
  available?: boolean;
}

  let products: ProductEntry[] = [];
  try {
    // Evaluate the array directly to handle trailing commas which break JSON.parse
    products = new Function('return ' + arrayStr)() as ProductEntry[];
    console.log(`Successfully parsed ${products.length} products.`);
  } catch (e) {
    console.error('Failed to parse catalog JSON.', e);
    return;
  }

  let count = 0;
  for (const p of products) {
    let type = p.type || 'esoteric';
    let brandFeltTitle = p.title;

    const lowerHandle = p.handle.toLowerCase();
    
    const isHoodie = /\b(hoodie)s?\b/i.test(p.title) || /(^|-)(hoodie)($|-)/i.test(lowerHandle);
    const isShirt = /\b(t-shirt|tee|shirt)s?\b/i.test(p.title) || /(^|-)(tee|t-shirt|shirt)($|-)/i.test(lowerHandle);
    const isPants = /\b(sweatpants|pants)\b/i.test(p.title) || /(^|-)(sweatpants|pants)($|-)/i.test(lowerHandle);
    const isCrew = /\b(crewneck)s?\b/i.test(p.title) || /(^|-)(crewneck)($|-)/i.test(lowerHandle);

    const isApparel = p.category === 'Apparel' || isHoodie || isShirt || isPants || isCrew;

    if (isApparel) {
      type = 'clothing';
      brandFeltTitle = applyBrandFeel(p.title);
    }
    
    const calculatedPrice = calculatePricing(p.price, isShirt, isHoodie);
    
    // Connect to correct collection
    let collectionId = attireCollection.id;

    if (type !== 'clothing') {
        // Resolve Tool Catalog Array
        const catalogName = getEsotericCatalogName(p.category || '');
        const catalogHandle = catalogName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        let toolColId: string;
        const cachedCol = toolCollections.get(catalogHandle);
        
        if (cachedCol) {
            toolColId = cachedCol.id;
        } else {
           const newCol = await prisma.collection.upsert({
              where: { handle: catalogHandle },
              update: {},
              create: {
                name: catalogName,
                handle: catalogHandle,
                description: `Curated ${catalogName.toLowerCase()} for the sanctuary.`
              }
           });
           toolCollections.set(catalogHandle, { id: newCol.id });
           toolColId = newCol.id;
        }
        collectionId = toolColId;
    }

    try {
      await prisma.product.upsert({
        where: { handle: p.handle },
        update: {
          title: brandFeltTitle,
          price: calculatedPrice,
          category: p.category || 'Artifact',
          image: p.image || '/assets/placeholder.png',
          description: p.description || '',
          type: type,
          status: p.available ? 'active' : 'draft',
          collections: { connect: { id: collectionId } }
        },
        create: {
          id: String(p.id) || p.handle,
          title: brandFeltTitle,
          price: calculatedPrice,
          category: p.category || 'Artifact',
          image: p.image || '/assets/placeholder.png',
          description: p.description || '',
          type: type,
          handle: p.handle,
          status: p.available ? 'active' : 'draft',
          collections: { connect: { id: collectionId } }
        }
      });
      count++;
      if (count % 500 === 0) console.log(`Seeded ${count} items...`);
    } catch {
       console.log(`Skipping duplicate or errored item: ${p.handle}`);
    }
  }

  console.log(`Seeding complete. Upserted ${count} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
