import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip paths that obviously aren't affiliate links to save performance
  // Add any other core folders you have here (like /faq, /terms, etc.)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/collection') ||
    pathname.startsWith('/product') ||
    pathname.includes('.') // Skips files like favicon.ico, robots.txt
  ) {
    return NextResponse.next();
  }

  try {
    // 2. Query Shopify Storefront API to see if this path is a registered redirect
    const response = await fetch(process.env.SHOPIFY_STOREFRONT_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      // We use next: { revalidate: 60 } so it caches the redirect for 60 seconds
      // instead of hitting Shopify on literally every single click
      next: { revalidate: 60 } 
    });

    // We have to append the query directly to the request body
    const queryResponse = await fetch(process.env.SHOPIFY_STOREFRONT_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query: `
            query getRedirect($query: String!) {
              urlRedirects(first: 1, query: $query) {
                edges {
                  node {
                    path
                    target
                  }
                }
              }
            }
          `,
          variables: {
            query: `path:${pathname}`, // Look for the exact path, e.g., "/jayson"
          },
        }),
      });

    const { data } = await queryResponse.json();
    const redirectNode = data?.urlRedirects?.edges[0]?.node;

    // 3. If Shopify found a match, redirect the user!
    if (redirectNode && redirectNode.path === pathname) {
      // This will convert something like "/discount/JAYSON15?redirect=/" 
      // into a full, proper URL for Next.js to route to.
      const redirectUrl = new URL(redirectNode.target, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error('Error fetching Shopify redirect:', error);
  }

  // 4. If no redirect is found, just continue loading the site normally
  return NextResponse.next();
}

// 5. Tell the middleware to only run on clean paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
