import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  // 1. Grab the discount code from the URL parameters
  const discountCode = params.code;

  // 2. Grab the redirect path (defaults to homepage if none is provided)
  const searchParams = request.nextUrl.searchParams;
  const redirectPath = searchParams.get('redirect') || '/';

  // 3. Create the redirect response
  const url = request.nextUrl.clone();
  url.pathname = redirectPath;
  url.search = ''; // Clear out the query parameters for a clean URL
  
  const response = NextResponse.redirect(url);

  // 4. Save the discount code in a cookie so your cart can access it later
  // We set it to expire in 7 days (adjust maxAge as needed)
  response.cookies.set('discount_code', discountCode, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, 
    sameSite: 'lax',
  });

  return response;
}
