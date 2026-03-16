import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function applyBrandFeel(title: string): string {
  let newTitle = title;
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes('sigil') || lowerTitle.includes('resonance') || lowerTitle.includes('frequency') || lowerTitle.includes('ascension')) {
    return title;
  }

  newTitle = newTitle.replace(/Men[’'']s /ig, '');
  newTitle = newTitle.replace(/Women[’'']s /ig, '');
  newTitle = newTitle.replace(/Unisex /ig, '');
  
  newTitle = newTitle.replace(/\b(hoodie)s?\b/ig, 'Shroud');
  newTitle = newTitle.replace(/\b(t-shirt|tee|shirt)s?\b/ig, 'Base Frequency');
  newTitle = newTitle.replace(/\b(crewneck)s?\b/ig, 'Vessel');
  newTitle = newTitle.replace(/\b(sweatpants|pants)\b/ig, 'Foundation Layers');
  
  newTitle = newTitle.split(' ').map(word => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

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

function calculatePricing(priceStr: string | undefined, isShirt: boolean, isHoodie: boolean): string {
    if (isHoodie) return "108.00";
    if (isShirt) return "60.00";
    
    if (!priceStr) return "0.00";
    
    const parsed = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(parsed) || parsed === 0) return priceStr || "0.00"; 
    
    const markedUp = parsed * 1.30;
    return markedUp.toFixed(2);
}

async function main() {
  console.log('Seeding clothing database from full_clothing_data.json...');

  const attireCollection = await prisma.collection.upsert({
    where: { handle: 'ghost-and-bones' },
    update: {},
    create: {
      name: 'The Ghost and Bones Collection',
      handle: 'ghost-and-bones',
      description: 'Custom-engineered garments designed for the modern practitioner. Tuned to frequency.'
    }
  });

  const catalogPath = path.resolve('C:/Users/jayvi/OneDrive/Documents/antigravity worspace/resonance-custom/full_clothing_data.json');
  
  // Handle UTF-16LE encoding of the clothing payload
  let fileContent = fs.readFileSync(catalogPath, 'utf16le');
  
  let products: any[] = [];
  try {
    const startIndex = fileContent.indexOf('[');
    const endIndex = fileContent.lastIndexOf(']') + 1;
    if (startIndex !== -1 && endIndex !== -1) {
       fileContent = fileContent.substring(startIndex, endIndex);
    }
    products = JSON.parse(fileContent);
    console.log(`Successfully parsed ${products.length} clothing items.`);
  } catch (e) {
    console.error('Failed to parse catalog JSON.', e);
    // try standard utf8 fallback
    try {
        let fallback = fs.readFileSync(catalogPath, 'utf8');
        const sIndex = fallback.indexOf('[');
        const eIndex = fallback.lastIndexOf(']') + 1;
        if (sIndex !== -1 && eIndex !== -1) fallback = fallback.substring(sIndex, eIndex);
        products = JSON.parse(fallback);
        console.log(`Successfully parsed ${products.length} clothing items by fallback.`);
    } catch (e2) {
        console.error('Fallback failed.', e2);
        return;
    }
  }

  let count = 0;
  for (const p of products) {
    let brandFeltTitle = p.title;

    const lowerHandle = (p.handle || '').toLowerCase();
    
    const isHoodie = /\b(hoodie)s?\b/i.test(p.title) || /(^|-)(hoodie)($|-)/i.test(lowerHandle);
    const isShirt = /\b(t-shirt|tee|shirt)s?\b/i.test(p.title) || /(^|-)(tee|t-shirt|shirt)($|-)/i.test(lowerHandle);
    const isPants = /\b(sweatpants|pants)\b/i.test(p.title) || /(^|-)(sweatpants|pants)($|-)/i.test(lowerHandle);
    const isCrew = /\b(crewneck)s?\b/i.test(p.title) || /(^|-)(crewneck)($|-)/i.test(lowerHandle);

    brandFeltTitle = applyBrandFeel(p.title);
    const calculatedPrice = calculatePricing((p.price || '$0').toString(), isShirt, isHoodie);
    
    try {
      await prisma.product.upsert({
        where: { handle: p.handle },
        update: {
          title: brandFeltTitle,
          price: calculatedPrice,
          category: 'Apparel',
          image: p.image || '/assets/placeholder.png',
          description: p.description || '',
          type: 'clothing',
          status: 'active',
          collections: { connect: { id: attireCollection.id } }
        },
        create: {
          id: String(p.id || Date.now() + count),
          title: brandFeltTitle,
          price: calculatedPrice,
          category: 'Apparel',
          image: p.image || '/assets/placeholder.png',
          description: p.description || '',
          type: 'clothing',
          handle: p.handle,
          status: 'active',
          collections: { connect: { id: attireCollection.id } }
        }
      });
      count++;
    } catch (dbErr) {
        // Soft fail collisions
    }
  }

  console.log(`Seeding complete. Upserted ${count} explicit clothing products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
