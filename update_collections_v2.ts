import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mapping: Record<string, string> = {
  'esoteric-manuscripts': 'Manuscripts',
  'sacred-smoke-artifacts': 'Sacred Smoke',
  'alchemical-elixirs-artifacts': 'Alchemy',
  'earth-relics-artifacts': 'Earth Minerals'
};

async function updateCollectionNames() {
  console.log('--- Standardizing Collection Names ---');
  
  for (const [handle, newName] of Object.entries(mapping)) {
     console.log(`Checking handle: ${handle}`);
     const col = await prisma.collection.findUnique({ where: { handle } });
     if (col) {
        console.log(`Updating: "${col.name}" -> "${newName}"`);
        await prisma.collection.update({
          where: { handle },
          data: { name: newName }
        });
     }
  }

  console.log('Update complete.');
}

updateCollectionNames().catch(console.error).finally(() => prisma.$disconnect());
