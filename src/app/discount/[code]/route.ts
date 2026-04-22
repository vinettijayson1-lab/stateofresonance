import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  // Await params — required for Next.js 15+
  const resolvedParams = await params;
  const discountCode = resolvedParams.code;

  // Grab the redirect path (defaults to homepage if none is provided)
  const searchParams = request.nextUrl.searchParams;
  const redirectPath = searchParams.get('redirect') || '/';

  // Build a clean redirect URL (302 required by Shopify Collabs domain validation)
  const url = request.nextUrl.clone();
  url.pathname = redirectPath;
  url.search = '';

  const response = NextResponse.redirect(url, { status: 302 });

  // Save the discount code in a cookie so the cart can apply it at checkout
  response.cookies.set('discount_code', discountCode, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  });

  return response;
}
