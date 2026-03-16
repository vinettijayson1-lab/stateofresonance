import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function audit() {
  console.log('--- Ghost and Bones Audit ---');
  const collection = await prisma.collection.findUnique({
    where: { handle: 'ghost-and-bones' },
    include: {
      products: {
        take: 20
      }
    }
  });

  if (!collection) {
    console.log('Collection not found!');
    return;
  }

  console.log(`Collection: ${collection.name}`);
  collection.products.forEach(p => {
    console.log(`- ${p.title} (${p.id})`);
    console.log(`  Image: ${p.image}`);
    console.log(`  Placeholder? ${p.image.includes('placeholder')}`);
    console.log('---');
  });
}

audit().catch(console.error).finally(() => prisma.$disconnect());
