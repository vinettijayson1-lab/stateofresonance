import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Fetch products from the dedicated backend database
    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      include: {
        collections: true
      }
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch catalog from backend', details: error.message },
      { status: 500 }
    );
  }
}
