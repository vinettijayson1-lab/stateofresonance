import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> } // <-- 1. Type is now a Promise
) {
  // 2. Await the params object before using it (Required for Next.js 15+)
  const resolvedParams = await params;
  const discountCode = resolvedParams.code;

  // 3. Grab the redirect path (defaults to homepage if none is provided)
  const searchParams = request.nextUrl.searchParams;
  const redirectPath = searchParams.get('redirect') || '/';

  // 4. Create the redirect response
  const url = request.nextUrl.clone();
  url.pathname = redirectPath;
  url.search = ''; // Clear out the query parameters for a clean URL
  
  const response = NextResponse.redirect(url);

  // 5. Save the discount code in a cookie so your cart can access it later
  response.cookies.set('discount_code', discountCode, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, 
    sameSite: 'lax',
  });

  return response;
}
