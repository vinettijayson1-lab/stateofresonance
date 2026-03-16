import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const productCount = await prisma.product.count();
    const collectionCount = await prisma.collection.count();
    const collections = await prisma.collection.findMany({
      select: { name: true, handle: true, _count: { select: { products: true } } }
    });

    return NextResponse.json({
      status: 'online',
      productCount,
      collectionCount,
      collections,
      databaseUrl: process.env.DATABASE_URL,
      workingDir: process.cwd(),
      nodeEnv: process.env.NODE_ENV
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({
      status: 'error',
      message,
      stack
    }, { status: 500 });
  }
}
