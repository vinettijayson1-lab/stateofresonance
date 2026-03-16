import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mapping: Record<string, string> = {
  'shrine-artifacts-artifacts': 'Tabernacle Relics',
  'sacred-smoke-artifacts': 'Consecrated Smokes',
  'mystic-curiosities-artifacts': 'Curiosities of the Void',
  'earth-relics-artifacts': 'Terrestrial Talismans',
  'illuminations-artifacts': 'Illuminations of the Work',
  'sacred-adornments-artifacts': 'Sacred Adornments'
};

async function renameCollections() {
  console.log('--- Enhancing Collection Esoteric Names ---');
  
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

  console.log('Rename complete.');
}

renameCollections().catch(console.error).finally(() => prisma.$disconnect());
